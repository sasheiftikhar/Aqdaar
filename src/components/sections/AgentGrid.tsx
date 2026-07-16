"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import BrandTile from "@/components/ui/BrandTile";
import Reveal from "@/components/ui/Reveal";

type Base = "running" | "completed";

type Agent = {
  name: string;
  task: string;
  color: string;
  base: Base;
};

/* 18 solutions = exactly 3 rows on the 6-column desktop grid. The `base` status
   is the calm resting state — "Live" (green) or "In build" (orange); only the
   1–2 boxes the controller activates ever animate or cycle. */
const AGENTS: Agent[] = [
  { name: "Zairen", task: "Pilgrimage platform", color: "#635bff", base: "completed" },
  { name: "Manufacturing ERP", task: "Industrial operations", color: "#2ca01c", base: "running" },
  { name: "Admin LMS", task: "Learning administration", color: "#f38b00", base: "completed" },
  { name: "CRM", task: "Customer relations", color: "#00a8e0", base: "running" },
  { name: "AI-native GRC", task: "Governance & risk", color: "#e2211c", base: "completed" },
  { name: "Trainings Portal", task: "Bootcamps & courses", color: "#ffb200", base: "running" },
  { name: "Events Platform", task: "Registrations & tickets", color: "#ff5a5f", base: "running" },
  { name: "Founder OS", task: "Startup workspace", color: "#c7c7c7", base: "completed" },
  { name: "Payments", task: "Billing & payouts", color: "#635bff", base: "running" },
  { name: "Analytics", task: "Growth dashboards", color: "#0072ce", base: "completed" },
  { name: "Onboarding", task: "User provisioning", color: "#f6c944", base: "running" },
  { name: "Marketplace", task: "List your solution", color: "#8c6239", base: "running" },
  { name: "Spaces", task: "Physical + digital", color: "#125740", base: "completed" },
  { name: "Community", task: "Members & mentors", color: "#ff3d57", base: "running" },
  { name: "Content Studio", task: "Brand & campaigns", color: "#7b3f98", base: "running" },
  { name: "Talent Cloud", task: "Hiring & teams", color: "#f45d48", base: "completed" },
  { name: "Compliance", task: "Audit-ready records", color: "#008fd3", base: "running" },
  { name: "Support Desk", task: "Tickets & SLAs", color: "#0071dc", base: "completed" },
];

/* Sequence timings (ms) — deliberately slow so the motion reads as calm. */
const RUN_MS = 3400; // green line fills
const DONE_MS = 1100; // lingers on "Completed"
const HIDDEN_MS = 3000; // slot sits blank
const RETURN_MS = 700; // settle back in

type Phase = "idle" | "run" | "done" | "hidden" | "return";

function AgentCard({
  agent,
  active,
  onRelease,
}: {
  agent: Agent;
  active: boolean;
  onRelease: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const releaseRef = useRef(onRelease);
  releaseRef.current = onRelease;

  useEffect(() => {
    if (!active) {
      setPhase("idle");
      return;
    }
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const push = (fn: () => void, ms: number) =>
      timers.push(setTimeout(() => !cancelled && fn(), ms));

    setPhase("run");
    push(() => setPhase("done"), RUN_MS);
    push(() => setPhase("hidden"), RUN_MS + DONE_MS);
    push(() => setPhase("return"), RUN_MS + DONE_MS + HIDDEN_MS);
    push(() => {
      setPhase("idle");
      releaseRef.current();
    }, RUN_MS + DONE_MS + HIDDEN_MS + RETURN_MS);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active]);

  // Resolve what the card should show for the current phase.
  const hidden = phase === "hidden";
  const done =
    phase === "done" ||
    phase === "return" ||
    (phase === "idle" && agent.base === "completed");
  const running = phase === "run" || (phase === "idle" && agent.base === "running");

  const statusColor = done ? "#B4D9CE" : "#AFA3BF";
  const statusLabel = done ? "Live" : "In build";

  // Bar width: fills during the active run, otherwise reflects resting state.
  const barWidth =
    phase === "run"
      ? "100%"
      : done
        ? "100%"
        : running
          ? "92%"
          : "100%";

  return (
    // Outer cell is ALWAYS present — reserves the slot so nothing reflows.
    <div className="min-h-[128px]">
      <motion.div
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hidden ? 0.96 : 1,
          filter: hidden ? "blur(2px)" : "blur(0px)",
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="h-full overflow-hidden rounded-2xl border border-border bg-surface/60 p-4 backdrop-blur-sm"
      >
        <div className="flex items-start gap-3">
          <BrandTile label={agent.name} color={agent.color} />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-fg">
              {agent.name}
            </p>
            <p className="truncate text-[13px] text-muted">{agent.task}</p>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full"
            animate={{
              backgroundColor: statusColor,
              scale: running ? [1, 1.35, 1] : 1,
            }}
            transition={
              running
                ? { scale: { duration: 1.4, repeat: Infinity } }
                : { duration: 0.3 }
            }
          />
          <span
            className="text-[13px] font-medium"
            style={{ color: statusColor }}
          >
            {statusLabel}
          </span>
        </div>

        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-border">
          <motion.div
            key={phase === "run" ? "filling" : "static"}
            className="h-full rounded-full"
            initial={{ width: phase === "run" ? "0%" : barWidth }}
            animate={{ width: barWidth, backgroundColor: statusColor }}
            transition={{
              width: {
                duration: phase === "run" ? RUN_MS / 1000 : 0.4,
                ease: phase === "run" ? "linear" : "easeOut",
              },
              backgroundColor: { duration: 0.3 },
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

const MAX_ACTIVE = 2; // never more than two boxes mid-sequence at once

export default function AgentGrid() {
  const [active, setActive] = useState<Set<number>>(new Set());

  const release = useCallback((i: number) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.delete(i);
      return next;
    });
  }, []);

  useEffect(() => {
    const activate = () => {
      setActive((prev) => {
        if (prev.size >= MAX_ACTIVE) return prev;
        const candidates: number[] = [];
        for (let i = 0; i < AGENTS.length; i++) {
          if (!prev.has(i)) candidates.push(i);
        }
        if (candidates.length === 0) return prev;
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        const next = new Set(prev);
        next.add(pick);
        return next;
      });
    };

    // Stagger the first pick, then check in slowly.
    const kickoff = setTimeout(activate, 900);
    const interval = setInterval(activate, 2800);
    return () => {
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="solutions" className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <Reveal>
          <h2 className="display max-w-4xl text-4xl font-bold sm:text-6xl">
            Industrial Solutions.{" "}
            <span className="text-muted">Built and deployed.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Industrial-grade platforms — from AI-native GRC to manufacturing
            ERPs — designed, built, and shipped under Aqdaar. From first build to
            live and scaling.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {AGENTS.map((agent, i) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              active={active.has(i)}
              onRelease={() => release(i)}
            />
          ))}
        </div>

        <Reveal delay={0.15}>
          <a
            href="#solutions"
            className="mt-10 inline-flex items-center gap-2 font-medium text-accent"
          >
            Explore All Solutions →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

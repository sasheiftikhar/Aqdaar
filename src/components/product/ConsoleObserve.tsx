"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";

const TABS = ["Payments", "Export", "Customers", "Products"];

const PAYMENTS = [
  { amount: "$142.50", email: "maria@acme.co", status: "Completed", tone: "green" },
  { amount: "$89.00", email: "leo@northwind.io", status: "Processing", tone: "amber" },
  { amount: "$1,240.00", email: "priya@acme.co", status: "Completed", tone: "green" },
  { amount: "$75.00", email: "sam@vertex.dev", status: "Completed", tone: "green" },
];

const tone: Record<string, string> = {
  green: "bg-done/15 text-done",
  amber: "bg-[#AFA3BF]/15 text-[#AFA3BF]",
};

function LiveAgentView() {
  const [row, setRow] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setRow((r) => (r + 1) % PAYMENTS.length), 1500);
    return () => clearInterval(iv);
  }, []);

  return (
    <BrowserFrame url="duke-energy.com/payments" className="h-full">
      <div className="p-4">
        <div className="flex gap-4 border-b border-border pb-3 text-[13px]">
          <span className="font-semibold text-done">Payments</span>
          {TABS.slice(1).map((t) => (
            <span key={t} className="text-muted">
              {t}
            </span>
          ))}
          <span className="ml-auto flex items-center gap-1.5 text-[11px] text-done">
            <motion.span
              className="h-1.5 w-1.5 rounded-full bg-done"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Live
          </span>
        </div>

        <div className="relative mt-2">
          <div className="grid grid-cols-[1fr_1.6fr_1fr] gap-2 border-b border-border py-2 text-[10px] uppercase tracking-wide text-faint">
            <span>Amount</span>
            <span>Customer</span>
            <span>Status</span>
          </div>
          {PAYMENTS.map((p, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-[1fr_1.6fr_1fr] items-center gap-2 py-2.5 text-[13px]"
              animate={{
                backgroundColor:
                  row === i ? "rgba(180,217,206,0.06)" : "rgba(0,0,0,0)",
              }}
            >
              <span className="font-mono text-fg">{p.amount}</span>
              <span className="truncate text-muted">{p.email}</span>
              <span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tone[p.tone]}`}
                >
                  {p.status}
                </span>
              </span>
            </motion.div>
          ))}

          <motion.div
            className="pointer-events-none absolute left-[30%] z-10 flex items-center gap-1"
            animate={{ top: 40 + row * 40 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#CABFE1">
              <path d="M4 2l16 9-7 2-3 7z" />
            </svg>
            <span className="rounded bg-accent px-1.5 py-0.5 text-[9px] font-semibold text-black">
              Agent
            </span>
          </motion.div>
        </div>
      </div>
    </BrowserFrame>
  );
}

function SessionReplay() {
  const [t, setT] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setT((v) => (v >= 100 ? 0 : v + 2)), 90);
    return () => clearInterval(iv);
  }, []);

  const secs = Math.floor((t / 100) * 42);
  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-muted">
          Sessions › <span className="font-mono text-fg">run_7f3b2e</span>
        </span>
        <span className="rounded-full bg-done/15 px-2 py-0.5 text-[11px] font-medium text-done">
          Completed
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col rounded-xl border border-border bg-black/50 p-4">
        <div className="mb-3 flex items-center gap-2 text-[11px] text-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          acehotel.com
        </div>
        <p className="text-[11px] uppercase tracking-wide text-faint">
          Agent reasoning
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Located the confirmations table under Reservations, then read each row
          into the output schema.
        </p>

        {/* scrubber */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-faint">
            <span>
              {mm}:{ss}
            </span>
            <span>00:42</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${t}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConsoleObserve() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Design agents in minutes.{" "}
              <span className="text-muted">Watch them work in real time.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted">
              The Aqdaar Console is the control plane for your agents. Design
              agents with natural language prompts, run tasks manually, on a
              schedule, or from the API — and observe every action your agents
              take.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col">
              <LiveAgentView />
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-fg">Live agent view</h4>
                <p className="mt-1 text-sm text-muted">
                  Watch your agents operate in real time. See what they see,
                  follow their decision-making, and intervene if something goes
                  wrong. Every session streams live to the console.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <div className="flex h-full flex-col">
              <SessionReplay />
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-fg">Session replay</h4>
                <p className="mt-1 text-sm text-muted">
                  Review any completed session. Timestamped screenshots, agent
                  reasoning traces, and full execution logs. Understand exactly
                  what happened and why.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";

const TABS = ["Overview", "Design", "Build", "Ship"];

const CANDIDATES = [
  { name: "Zairen", role: "Product Design", stage: "Handoff", status: "Shipped", tone: "green" },
  { name: "Manufacturing ERP", role: "System Build", stage: "QA", status: "In Build", tone: "amber" },
  { name: "Admin LMS", role: "Web App", stage: "Prototype", status: "Review", tone: "blue" },
  { name: "GRC Suite", role: "AI-native", stage: "Discovery", status: "Planning", tone: "amber" },
];

const toneMap: Record<string, string> = {
  amber: "bg-[#AFA3BF]/15 text-[#AFA3BF]",
  green: "bg-done/15 text-done",
  blue: "bg-[#4c8dff]/15 text-[#4c8dff]",
};

function AppMock() {
  const [active, setActive] = useState(1);
  // cursor hops between the candidate rows
  const [row, setRow] = useState(0);

  useEffect(() => {
    const rowLoop = setInterval(
      () => setRow((r) => (r + 1) % CANDIDATES.length),
      1600
    );
    return () => clearInterval(rowLoop);
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-gradient-to-b from-[#0c140f] to-black p-4">
      {/* tab bar */}
      <div className="flex gap-1.5 border-b border-border pb-3">
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`rounded-md px-2.5 py-1 text-xs transition-colors ${
              active === i
                ? "bg-surface text-done"
                : "text-muted hover:text-fg"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* sub nav */}
      <div className="flex gap-5 py-3 text-[13px]">
        <span className="font-semibold text-done">Aqdaar Studio</span>
        <span className="text-muted">Dashboard</span>
        <span className="text-fg">Projects</span>
        <span className="text-muted">Clients</span>
      </div>

      {/* table */}
      <div className="relative">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_0.8fr] gap-2 border-b border-border pb-2 text-[10px] uppercase tracking-wide text-faint">
          <span>Project</span>
          <span>Type</span>
          <span>Stage</span>
          <span>Status</span>
        </div>

        {CANDIDATES.map((c, i) => (
          <motion.div
            key={c.name}
            className="relative grid grid-cols-[1.4fr_1fr_1fr_0.8fr] items-center gap-2 py-3 text-[13px]"
            animate={{
              backgroundColor:
                row === i ? "rgba(180,217,206,0.06)" : "rgba(0,0,0,0)",
            }}
          >
            <span className="text-fg">{c.name}</span>
            <span className="text-muted">{c.role}</span>
            <span className="text-muted">{c.stage}</span>
            <span>
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${toneMap[c.tone]}`}
              >
                {c.status}
              </span>
            </span>
          </motion.div>
        ))}

        {/* agent cursor */}
        <motion.div
          className="pointer-events-none absolute left-[36%] z-20 flex items-center gap-1"
          animate={{ top: 34 + row * 44 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#CABFE1">
            <path d="M4 2l16 9-7 2-3 7z" />
          </svg>
          <span className="rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-black">
            Aqdaar Design
          </span>
        </motion.div>
      </div>
    </div>
  );
}

/* Right side: a tall column of project tiles scrolling upward forever. */
const AGENT_TILES = [
  "Zairen · Product design",
  "Manufacturing ERP · System build",
  "Admin LMS · Web app",
  "CRM · Platform",
  "GRC Suite · AI-native",
  "Brand Identity · Design",
  "Founder OS · Product",
  "Events Platform · Web app",
  "Trainings Portal · LMS",
  "Payments · Fintech",
  "Analytics · Dashboards",
  "Marketplace · Platform",
  "Community · App",
  "Content Studio · Brand",
  "Talent Cloud · HR tech",
  "Support Desk · SaaS",
];

function AgentSwarm() {
  const doubled = [...AGENT_TILES, ...AGENT_TILES];
  return (
    <div className="relative h-[420px] overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-[#0c140f] to-black p-3">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-black to-transparent" />
      <motion.div
        className="grid grid-cols-2 gap-2.5"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((tile, i) => {
          const [app, task] = tile.split(" · ");
          return (
            <div
              key={i}
              className="rounded-lg border border-border bg-surface/40 p-3"
            >
              <div className="mb-2 flex items-center gap-1.5 text-[10px] text-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-done" />
                project-{1369 + (i % AGENT_TILES.length)}
              </div>
              <p className="text-[13px] font-medium text-fg">{app}</p>
              <p className="text-[11px] text-muted">{task}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function AgentsOperate() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              Your Tangible Product
              <br />
              Idea, Our Design.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted">
              From product renders to shipped platforms — we design and build the
              things founders imagine. Watch a project move from discovery to
              live, one stage at a time.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <AppMock />
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <AgentSwarm />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <h4 className="text-xl font-semibold text-fg">
                We design any product
              </h4>
              <p className="mt-2 text-muted">
                Web apps, platforms, brand systems, or physical spaces — if you
                can imagine it, we can design and build it. Renders, prototypes,
                and production-ready systems.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h4 className="text-xl font-semibold text-fg">
                One project or a portfolio
              </h4>
              <p className="mt-2 text-muted">
                From a single tangible idea to an entire product line — we scale
                with your ambition, taking each project from discovery to launch.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <a
            href="#portfolio"
            className="mt-10 inline-flex items-center gap-2 font-medium text-accent"
          >
            View Full Portfolio →
          </a>
        </Reveal>
      </div>
    </section>
  );
}

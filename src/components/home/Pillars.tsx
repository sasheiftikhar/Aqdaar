"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";

/* ------------------------------------------------------------------ */
/* Dhundo — Discover & Plan: a query types out, opportunities surface  */
/* ------------------------------------------------------------------ */

const OPPORTUNITIES = [
  { name: "Industrial ERP demand", score: "92" },
  { name: "EdTech / LMS gap", score: "88" },
  { name: "Local CRM adoption", score: "81" },
];

function DhundoMock() {
  const query = "market gaps · Pakistan";
  const [typed, setTyped] = useState(0);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      setTyped(0);
      setShown(0);
      const typer = setInterval(() => {
        setTyped((n) => {
          if (n >= query.length) {
            clearInterval(typer);
            let k = 0;
            const reveal = setInterval(() => {
              k += 1;
              if (cancelled) return;
              setShown(k);
              if (k >= OPPORTUNITIES.length) clearInterval(reveal);
            }, 420);
            return n;
          }
          return n + 1;
        });
      }, 70);
    };
    run();
    const loop = setInterval(run, 4600);
    return () => {
      cancelled = true;
      clearInterval(loop);
    };
  }, []);

  return (
    <MockShell>
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-black/40 px-3 py-2 text-[12px]">
          <span className="text-faint">🔍</span>
          <span className="text-fg">{query.slice(0, typed)}</span>
          {typed < query.length && (
            <span className="inline-block h-3.5 w-px animate-pulse bg-accent" />
          )}
        </div>
        <p className="mb-2 mt-3 text-[10px] uppercase tracking-wide text-faint">
          Opportunities mapped
        </p>
        <div className="space-y-2">
          {OPPORTUNITIES.map((o, i) => (
            <motion.div
              key={o.name}
              animate={{ opacity: i < shown ? 1 : 0.15, x: i < shown ? 0 : -6 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 rounded-lg border border-border bg-black/40 p-2.5"
            >
              <span className="flex-1 text-[12px] text-fg">{o.name}</span>
              <span className="text-[11px] font-semibold text-accent">
                {o.score}% match
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */
/* Banao — Build & Produce: modules assemble one by one, bar fills     */
/* ------------------------------------------------------------------ */

const MODULES = ["Foundation", "Core systems", "Interface", "Ship"];

function BanaoMock() {
  const [built, setBuilt] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setBuilt((b) => (b >= MODULES.length ? 0 : b + 1));
    }, 900);
    return () => clearInterval(iv);
  }, []);

  return (
    <MockShell>
      <div className="flex h-full flex-col justify-center gap-2.5">
        {MODULES.map((m, i) => {
          const state = i < built ? "done" : i === built ? "run" : "pending";
          return (
            <div key={m} className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center">
                {state === "done" && (
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <circle cx="12" cy="12" r="10" fill="rgba(180,217,206,0.15)" />
                    <path
                      d="M7 12.5l3 3L17 8"
                      stroke="#B4D9CE"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
                {state === "run" && (
                  <motion.span
                    className="h-3.5 w-3.5 rounded-full border-2 border-accent border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                )}
                {state === "pending" && (
                  <span className="h-2 w-2 rounded-full bg-border" />
                )}
              </span>
              <span
                className="flex-1 text-[13px] transition-colors"
                style={{
                  color:
                    state === "done"
                      ? "#8a8a92"
                      : state === "run"
                        ? "#f4f4f5"
                        : "#56565c",
                }}
              >
                {m}
              </span>
            </div>
          );
        })}
        <div className="mt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${(built / MODULES.length) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */
/* Becho — Sell & Scale: a bar chart trends up, reach counts up        */
/* ------------------------------------------------------------------ */

const BARS = [34, 48, 42, 60, 55, 74, 68, 88];

function BechoMock() {
  const [reach, setReach] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setReach(Math.round(eased * 2.4 * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <MockShell>
      <div className="flex h-full flex-col">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold text-fg">{reach.toFixed(1)}M</p>
            <p className="text-[10px] uppercase tracking-wide text-faint">
              Reach
            </p>
          </div>
          <span className="rounded-full bg-done/15 px-2 py-0.5 text-[11px] font-semibold text-done">
            ↑ 38%
          </span>
        </div>
        <div className="mt-auto flex items-end gap-1.5">
          {BARS.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-sm bg-accent/70"
              initial={{ height: 4 }}
              animate={{ height: [4, h, h * 0.82, h] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 0.08,
                ease: "easeInOut",
              }}
              style={{ maxHeight: "100%" }}
            />
          ))}
        </div>
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */

function MockShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[260px] rounded-2xl border border-border bg-surface/40 p-4">
      {children}
    </div>
  );
}

const PILLARS = [
  {
    title: "Dhundo",
    label: "Discover & Plan",
    big: "Planning Big.",
    body: "Research, discovery, and opportunity-mapping that sets the direction for everything Aqdaar builds.",
    dri: "Hammad Hussain",
    mock: <DhundoMock />,
  },
  {
    title: "Banao",
    label: "Build & Produce",
    big: "Producing Big.",
    body: "Turning strategy into products, platforms, and systems engineered to last.",
    dri: "Anas Imtiaz",
    mock: <BanaoMock />,
  },
  {
    title: "Becho",
    label: "Sell & Scale",
    big: "Selling Big.",
    body: "Positioning, partnerships, and growth that make sure the work reaches the people it's built for.",
    dri: "Faseeh Asghar",
    mock: <BechoMock />,
  },
];

export default function Pillars() {
  return (
    <section id="about" className="relative overflow-hidden py-28">
      <SoftGlow />
      <div className="relative mx-auto max-w-[1300px] px-6">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              Three Divisions.{" "}
              <span className="text-muted">One Direction.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted">
              Aqdaar runs on three divisions pulling in one direction — from
              discovery, to build, to scale.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className="grid items-center gap-8 rounded-3xl border border-border-soft bg-surface/20 p-6 lg:grid-cols-2 lg:p-10"
            >
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                    {p.label}
                  </span>
                  <h3 className="mt-3 text-3xl font-bold text-fg sm:text-4xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xl font-semibold text-fg/90">
                    {p.big}
                  </p>
                  <p className="mt-4 text-muted">{p.body}</p>
                  <div className="mt-6 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted">
                    <span className="text-faint">DRI</span>
                    <span className="font-medium text-fg">{p.dri}</span>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                {p.mock}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

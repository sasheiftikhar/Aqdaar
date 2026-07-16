"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const CATEGORIES = [
  "All",
  "Industrial Data",
  "Academic Data",
  "Domestic User Interest",
] as const;

type Category = (typeof CATEGORIES)[number];

type Solution = {
  name: string;
  owner: string;
  roadmap: string;
  category: Exclude<Category, "All">;
};

const SOLUTIONS: Solution[] = [
  {
    name: "Zairen — AI-native GRC Platform",
    owner: "Aquib ul Haq",
    roadmap: "Governance, Risk & Compliance",
    category: "Industrial Data",
  },
  {
    name: "Manufacturing ERP",
    owner: "Hafiz Ebad Jabbar",
    roadmap: "Industrial Data",
    category: "Industrial Data",
  },
  {
    name: "Admin LMS",
    owner: "Hammad Khan",
    roadmap: "Academic Data",
    category: "Academic Data",
  },
  {
    name: "CRM — Import & Consumption Database",
    owner: "Syed Shahmeer Shah",
    roadmap: "Domestic User Interest",
    category: "Domestic User Interest",
  },
  {
    name: "Teacher LMS — STEM & HEAL Gamified Platform",
    owner: "Munaaf / Chairman Pasha",
    roadmap: "Training Pakistani Youth",
    category: "Academic Data",
  },
  {
    name: "Dexter Lab Franchise",
    owner: "Industrialists (Saleemuddin, HMR, SEW, etc.)",
    roadmap: "Franchise / Expansion",
    category: "Industrial Data",
  },
];

export default function SolutionsGrid() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? SOLUTIONS
      : SOLUTIONS.filter((s) => s.category === active);

  return (
    <section
      id="solutions"
      className="relative py-28"
    >
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              Explore solutions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted">
              A growing marketplace of platforms across industry, academia, and
              domestic markets. Browse by category — full solution pages are on
              the way.
            </p>
          </Reveal>
        </div>

        {/* Category filter bar */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  active === c
                    ? "border-accent bg-accent/10 text-fg"
                    : "border-border bg-surface/40 text-muted hover:border-accent/40 hover:text-fg"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Solutions grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div
                key={s.name}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6 transition-colors hover:border-accent/40"
              >
                <span className="inline-flex w-fit items-center rounded-full border border-border bg-black/30 px-2.5 py-0.5 text-[11px] text-muted">
                  {s.category}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-fg">{s.name}</h3>
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs uppercase tracking-wide text-faint">
                    Owner
                  </p>
                  <p className="text-sm text-muted">{s.owner}</p>
                </div>
                <div className="mt-3 space-y-1.5">
                  <p className="text-xs uppercase tracking-wide text-faint">
                    Roadmap alignment
                  </p>
                  <p className="text-sm text-muted">{s.roadmap}</p>
                </div>
                <a
                  href="#"
                  className="group mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                >
                  Learn More
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

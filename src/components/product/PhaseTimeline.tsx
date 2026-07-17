"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const PHASES = [
  {
    n: "01",
    week: "Weeks 1–2",
    title: "Dhundo",
    sub: "Discover & plan",
    tone: "#cabfe1",
    points: [
      "Discovery & strategy call",
      "Market and competitor mapping",
      "Opportunity sized and scoped",
      "A direction everyone agrees on",
    ],
  },
  {
    n: "02",
    week: "Weeks 3–8",
    title: "Banao",
    sub: "Build & produce",
    tone: "#b4d9ce",
    points: [
      "Design and prototype",
      "Production support",
      "Built to last, not to demo",
      "Shipped with a documented API",
    ],
  },
  {
    n: "03",
    week: "Week 9+",
    title: "Becho",
    sub: "Sell & scale",
    tone: "#f5efd3",
    points: [
      "Positioning and go-to-market",
      "Partnerships and pilots",
      "Growth motion in place",
      "It reaches the people it's for",
    ],
  },
];

export default function PhaseTimeline() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Reveal>
            <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
              How a project runs
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-4xl font-bold text-fg sm:text-5xl">
              Three phases. One direction.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              From the first call to a product in the market — here&apos;s exactly
              how it goes.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* connecting line that draws itself across the phases */}
          <motion.div
            aria-hidden
            className="bg-primary-gradient absolute left-0 right-0 top-[38px] hidden h-px origin-left lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />

          <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.18 } },
            }}
          >
            {PHASES.map((p) => (
              <motion.div
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="relative"
              >
                {/* node on the line */}
                <motion.span
                  className="relative z-10 mb-8 flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-border bg-surface text-2xl font-bold"
                  style={{ color: p.tone }}
                  whileHover={{ scale: 1.06, rotate: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 14 }}
                >
                  {p.n}
                </motion.span>

                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="group h-full rounded-3xl border border-border bg-surface/50 p-8 transition-colors hover:border-accent/40"
                >
                  <span
                    className="text-[10.5px] font-bold uppercase tracking-[0.16em]"
                    style={{ color: p.tone }}
                  >
                    {p.week}
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-fg">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.sub}</p>

                  <ul className="mt-6 space-y-3">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <span
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: p.tone }}
                        />
                        <span className="text-[13.5px] leading-relaxed text-muted">
                          {pt}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

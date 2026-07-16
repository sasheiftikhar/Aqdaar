"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { PROCESS } from "@/components/consultation/consultation-data";
import { PROCESS_ICONS } from "@/components/consultation/icons";

/**
 * Discovery Call → Assessment → Roadmap → Ongoing Support.
 *
 * A four-up row with a rule under each step that draws itself in as the
 * section arrives, so the sequence reads left-to-right rather than as four
 * unrelated features.
 */
export default function Process() {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="text-center">
          <Reveal>
            <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
              Our process
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mt-4 text-4xl font-bold text-fg sm:text-5xl">
              Four steps, no
              <br />
              mystery in between.
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s, i) => {
            const Icon = PROCESS_ICONS[i];
            return (
              <Reveal key={s.n} delay={i * 0.1} className="h-full">
                <div className="group flex h-full flex-col items-center text-center">
                  {/* icon plate */}
                  <motion.div
                    className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-border bg-surface/40"
                    whileHover={{ y: -6, scale: 1.04 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-3xl opacity-[0.14]"
                      style={{
                        background: `radial-gradient(circle at 50% 20%, ${s.tone}, transparent 70%)`,
                      }}
                      animate={{ opacity: [0.1, 0.22, 0.1] }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        delay: i * 0.6,
                        ease: "easeInOut",
                      }}
                    />
                    <Icon className="relative h-9 w-9" />
                    <span
                      className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-[9.5px] font-bold text-black/70"
                      style={{ background: s.tone }}
                    >
                      {s.n}
                    </span>
                  </motion.div>

                  <h3 className="mt-6 text-lg font-bold text-fg">{s.title}</h3>

                  {/* the rule draws in under each step */}
                  <motion.span
                    className="mt-3 h-[2px] w-14 origin-left rounded-full"
                    style={{ background: s.tone }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                      duration: 0.6,
                      delay: 0.25 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />

                  <p className="mt-4 text-[13px] leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

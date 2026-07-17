"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

const QUOTES = [
  {
    quote:
      "We came in with a rough idea and left with a validated market, a shipped product, and our first pilot partners. One team carried it end to end.",
    name: "Client Name",
    role: "Founder, Startup",
    initials: "CN",
  },
  {
    quote:
      "The groundwork that used to take our team a full quarter now lands in a couple of weeks — and it's sharper than what we were producing ourselves.",
    name: "Partner Name",
    role: "Head of Ops, Institution",
    initials: "PN",
  },
  {
    quote:
      "Studio found a gap we'd genuinely never noticed in our own market, then built the thing that filled it. That's the whole value in one sentence.",
    name: "Industrialist Name",
    role: "Director, Manufacturing",
    initials: "IN",
  },
];

export default function ValueProps() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <Reveal>
            <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
              Worth more than
              <br />
              the hours it saves.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
              The teams building with Aqdaar don&apos;t just move faster — they
              move on the right things.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          {QUOTES.map((q) => (
            <motion.figure
              key={q.name}
              variants={{
                hidden: { opacity: 0, y: 26 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={{ y: -5 }}
              className="flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-7 transition-colors hover:border-accent/40"
            >
              <span className="text-3xl leading-none text-accent">“</span>
              <blockquote className="mt-3 flex-1 text-[14.5px] leading-relaxed text-fg/90">
                {q.quote}
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                  {q.initials}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-fg">
                    {q.name}
                  </span>
                  <span className="block text-xs text-muted">{q.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

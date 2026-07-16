"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "What exactly is Aqdaar Studio?",
    a: "It's how we run every engagement — the engine behind our three divisions. Dhundo finds and validates the opportunity, Banao builds the product, and Becho takes it to market. You get all three under one roof instead of stitching together three vendors.",
  },
  {
    q: "Do I have to use all three phases?",
    a: "No. Plenty of teams come to us with the plan already settled and only need Banao, or come with a finished product that isn't selling and only need Becho. You can start at any phase — the rest is there when you need it.",
  },
  {
    q: "How long does a typical project take?",
    a: "Discovery usually runs one to two weeks, the build six weeks or so depending on scope, and go-to-market starts from there. We'll give you a real timeline after the first call rather than a number now.",
  },
  {
    q: "Who actually does the work?",
    a: "A directly responsible individual owns each area — Hammad on Dhundo, Anas on Banao, Faseeh on Becho — with the wider team behind them. You always know exactly who to talk to.",
  },
  {
    q: "What does it cost?",
    a: "It depends entirely on scope. We start with a free consultation to understand what you're building, then scope a plan and price that fit the stage you're at.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're based in Karachi and work with founders and institutions across time zones. We take a limited number of projects each quarter, so it's worth reaching out early.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="text-[17px] font-medium text-fg transition-colors group-hover:text-accent">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-2xl leading-none text-accent"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-12 text-[14.5px] leading-relaxed text-muted">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductFaq() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal>
          <h2 className="display mb-12 text-center text-4xl font-bold text-fg sm:text-5xl">
            Questions, answered.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            {FAQS.map((f) => (
              <Item key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const FAQS = [
  {
    q: "What does Aqdaar actually do?",
    a: "Aqdaar takes founders and organizations from idea to market under one roof — discovery and planning (Dhundo), building products and platforms (Banao), and go-to-market and scale (Becho).",
  },
  {
    q: "How is Dhundo/Banao/Becho different from a regular agency?",
    a: "A typical agency delivers one deliverable and leaves. Our three divisions cover the full journey — strategy, build, and growth — so the work is engineered to reach the people it's built for, not just shipped.",
  },
  {
    q: "Can I just hire Aqdaar for one service (e.g. only Trainings)?",
    a: "Yes. You can engage any single offering — Trainings, Consultation, or Solutions — or combine them across the Dhundo/Banao/Becho journey.",
  },
  {
    q: "How much does a project/consultation cost?",
    a: "It depends on scope. We start with a free consultation to understand your goals, then scope a plan and pricing that fit the stage you're at.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. We're based in Karachi, Pakistan, and work with founders and institutions across time zones.",
  },
  {
    q: "How do I list my own solution on Aqdaar?",
    a: "Reach out through the consultation form and our Solutions team will walk you through onboarding and deployment under Aqdaar.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 ${
          open ? "text-mint" : "text-fg hover:text-accent"
        }`}
      >
        <span className="text-lg font-medium">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={`shrink-0 text-xl transition-colors duration-200 ${
            open ? "text-mint" : "text-faint group-hover:text-accent"
          }`}
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
            <p className="pb-5 pr-10 text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal>
          <h2 className="display mb-10 text-center text-4xl font-bold sm:text-5xl">
            Frequently asked questions
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

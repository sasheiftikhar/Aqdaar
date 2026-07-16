"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/* The systems the copy names, plus the one that hasn't shown up yet */
const TOOLS = [
  { label: "ERP", tone: "#cabfe1" },
  { label: "CRM", tone: "#b4d9ce" },
  { label: "LMS", tone: "#f5efd3" },
  { label: "Data", tone: "#cabfe1" },
  { label: "Next", tone: "#635c72", pending: true },
];

/** Each system drops a line into the same documented API. */
function ApiBus() {
  return (
    <div className="mx-auto mt-14 w-full max-w-[620px]">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {TOOLS.map((t, i) => (
          <motion.div
            key={t.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.09, duration: 0.45 }}
          >
            <span
              className={`flex h-11 w-full items-center justify-center rounded-xl border text-[11px] font-semibold sm:text-[12px] ${
                t.pending ? "border-dashed" : ""
              }`}
              style={{
                borderColor: t.pending ? "#2f2840" : `${t.tone}59`,
                background: t.pending ? "transparent" : `${t.tone}12`,
                color: t.pending ? "#635c72" : t.tone,
              }}
            >
              {t.pending ? "+ Next" : t.label}
            </span>

            {/* connector carrying that system down into the API */}
            <span
              className="relative h-8 w-px"
              style={{
                background: t.pending
                  ? "repeating-linear-gradient(to bottom, #2f2840 0 3px, transparent 3px 6px)"
                  : `linear-gradient(to bottom, ${t.tone}59, ${t.tone}1a)`,
              }}
            >
              {!t.pending && (
                <motion.span
                  className="absolute left-1/2 h-1.5 w-1.5 rounded-full"
                  style={{ background: t.tone, translate: "-50% -50%" }}
                  animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeIn",
                    delay: i * 0.35,
                  }}
                />
              )}
            </span>
          </motion.div>
        ))}
      </div>

      {/* the one thing everything we build ships with */}
      <motion.div
        className="relative overflow-hidden rounded-xl border border-accent/30 bg-surface/60 py-3.5 text-center"
        initial={{ opacity: 0, scaleX: 0.85 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.5 }}
      >
        <motion.span
          className="bg-primary-gradient absolute inset-y-0 w-1/3 opacity-[0.09]"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="relative font-mono text-[11.5px] tracking-wide text-accent">
          Documented API
        </span>
      </motion.div>
    </div>
  );
}

function PlugIcon() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 2v6M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
      <path d="M12 17v5" />
    </svg>
  );
}

export default function Extensibility() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[860px] px-6 text-center">
        <Reveal>
          <motion.span
            className="bg-primary-gradient on-accent mx-auto flex h-14 w-14 items-center justify-center rounded-2xl"
            whileHover={{ scale: 1.1, rotate: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 14 }}
          >
            <PlugIcon />
          </motion.span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="display mt-8 text-4xl font-bold text-fg sm:text-5xl">
            Extend it to anything.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-muted">
            Studio plugs into the tools you already run on — your ERP, your CRM,
            your LMS, your data. Anything we build for you ships with a clean,
            documented API, so it connects to whatever comes next.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href="/solutions"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            Explore our solutions
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </Reveal>

        <Reveal delay={0.2}>
          <ApiBus />
        </Reveal>
      </div>
    </section>
  );
}

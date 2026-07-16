"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

/* Icons — stroke-based, inherit the card's brand colour via currentColor */

function PlanIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16.5L12 21l8-4.5" />
    </svg>
  );
}

function SellIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" />
      <rect x="4" y="13" width="3.5" height="5" rx="1" />
      <rect x="10.25" y="9" width="3.5" height="9" rx="1" />
      <rect x="16.5" y="5" width="3.5" height="13" rx="1" />
      <path d="M4 8l5-4 4 3 6-5" />
    </svg>
  );
}

const PAINS = [
  {
    q: "Idea hai lekin planning confuse hai?",
    color: "#cabfe1",
    icon: <PlanIcon />,
  },
  {
    q: "Product banane mein resources ki kami?",
    color: "#b4d9ce",
    icon: <BuildIcon />,
  },
  {
    q: "Bana toh liya, bech nahi paa rahe?",
    color: "#f5efd3",
    icon: <SellIcon />,
  },
];

function Arrow({ color }: { color: string }) {
  return (
    <motion.div
      className="flex shrink-0 items-center justify-center py-1 lg:px-3 lg:py-0"
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={color}
        className="rotate-90 lg:rotate-0"
      >
        <path d="M6 3l12 9-12 9z" />
      </svg>
    </motion.div>
  );
}

export default function Problem() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1150px] px-6">
        <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
          {PAINS.map((p, i) => (
            <Fragment key={p.q}>
              <Reveal delay={i * 0.12} className="flex-1">
                <motion.div
                  className="group flex h-full flex-col items-center rounded-[2rem] border bg-transparent px-7 py-10 text-center"
                  initial={{ borderColor: `${p.color}33` }}
                  whileHover={{ borderColor: p.color, y: -4 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-300 ease-out group-hover:scale-125"
                    style={{ color: p.color, borderColor: `${p.color}55` }}
                  >
                    {p.icon}
                  </span>

                  <p className="mt-6 text-lg font-semibold leading-snug text-fg">
                    {p.q}
                  </p>
                </motion.div>
              </Reveal>

              {i < PAINS.length - 1 && <Arrow color={PAINS[i + 1].color} />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

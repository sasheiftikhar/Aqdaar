"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";

/* ---- icons (stroke-based, inherit colour from the tile) ---- */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CompassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16.5L12 21l8-4.5" />
    </svg>
  );
}

function GrowthIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M3 20h18" />
      <path d="M4 16l5-5 3.5 3.5L20 6" />
      <path d="M15 6h5v5" />
    </svg>
  );
}

function TrainingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M12 4L2.5 9 12 14l9.5-5L12 4z" />
      <path d="M6.5 11.5V17c0 1 2.5 2.5 5.5 2.5s5.5-1.5 5.5-2.5v-5.5" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </svg>
  );
}

type Dri = {
  area: string;
  name: string;
  body: string;
  icon: ReactNode;
};

const DRIS: Dri[] = [
  {
    area: "Dhundo · Discover & Plan",
    name: "Hammad Hussain",
    body: "Research, discovery, and opportunity-mapping. Start here if you have an idea but the plan isn't clear yet.",
    icon: <CompassIcon />,
  },
  {
    area: "Banao · Build & Produce",
    name: "Anas Imtiaz",
    body: "Design, prototyping, and production. Reach out to turn a strategy into a product that actually ships.",
    icon: <BuildIcon />,
  },
  {
    area: "Becho · Sell & Scale",
    name: "Faseeh Asghar",
    body: "Positioning, partnerships, and growth. Talk to us when it's built but not reaching the right people.",
    icon: <GrowthIcon />,
  },
  {
    area: "Trainings",
    name: "Mr. Shoaib",
    body: "Bootcamps, skills series, and short courses. Get in touch about schedules, seats, and custom cohorts.",
    icon: <TrainingIcon />,
  },
  {
    area: "Consultation",
    name: "Jamaluddin Ahmed Siddiqui",
    body: "Strategic advisory for founders and organizations building products, platforms, or ecosystems.",
    icon: <ChatIcon />,
  },
  {
    area: "Solutions",
    name: "Aquib ul Haq",
    body: "Industrial-grade platforms — from AI-native GRC to manufacturing ERPs, built and deployed under Aqdaar.",
    icon: <GridIcon />,
  },
];

export default function TeamDirectory() {
  return (
    <section className="relative overflow-hidden bg-bg py-24">
      <SoftGlow />

      <div className="relative mx-auto max-w-[1200px] px-6">
        {/* header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
              Team Directory
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display mt-5 text-4xl font-bold text-fg sm:text-5xl">
              Reach the right person, directly.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-muted">
              Know exactly who you need? Every area has a directly responsible
              individual — go straight to them for a faster, focused reply.
            </p>
          </Reveal>
        </div>

        {/* cards — stagger in on scroll, lift + glow on hover */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {DRIS.map((d) => (
            <motion.div
              key={d.name}
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover="hover"
              className="group relative h-full"
            >
              {/* soft pastel glow that fades in behind the card on hover */}
              <motion.div
                aria-hidden
                className="bg-primary-gradient pointer-events-none absolute -inset-px rounded-2xl opacity-0 blur-md"
                variants={{ hover: { opacity: 0.28 } }}
                transition={{ duration: 0.35 }}
              />

              <motion.div
                className="relative flex h-full flex-col items-center rounded-2xl border border-border bg-surface/70 p-8 text-center backdrop-blur-sm"
                variants={{ hover: { y: -6, borderColor: "rgba(202,191,225,0.5)" } }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* icon tile — pops and tilts on hover */}
                <motion.span
                  className="bg-primary-gradient on-accent flex h-12 w-12 items-center justify-center rounded-xl"
                  variants={{ hover: { scale: 1.12, rotate: -6 } }}
                  transition={{ type: "spring", stiffness: 320, damping: 14 }}
                >
                  {d.icon}
                </motion.span>

                <span className="mt-6 text-[10.5px] font-bold uppercase tracking-[0.14em] text-mint">
                  {d.area}
                </span>

                <h3 className="mt-2 text-xl font-bold text-fg">{d.name}</h3>

                <p className="mt-3 mb-8 text-[13.5px] leading-relaxed text-muted">
                  {d.body}
                </p>

                {/* mb-8 above guarantees breathing room; mt-auto keeps buttons aligned */}
                <motion.a
                  href="mailto:aqdaar.jamal@gmail.com"
                  className="mt-auto flex w-full max-w-[200px] items-center justify-center gap-1.5 rounded-full border border-border px-6 py-3 text-[13px] font-semibold text-fg"
                  variants={{
                    hover: {
                      borderColor: "rgba(202,191,225,0.9)",
                      color: "#cabfe1",
                    },
                  }}
                  transition={{ duration: 0.25 }}
                >
                  Get in touch
                  <motion.span
                    variants={{ hover: { x: 4 } }}
                    transition={{ duration: 0.25 }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

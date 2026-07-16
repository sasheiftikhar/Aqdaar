"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";
import { ROUTES } from "@/lib/nav";

const TONES = ["#cabfe1", "#b4d9ce", "#f5efd3"];

/* ------------------------------------------------------------------ */
/* Animated icons — one per offering, looping in the brand palette     */
/* ------------------------------------------------------------------ */

/* Trainings — capability bars growing, staggered */
function TrainingsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      {[0, 1, 2].map((i) => {
        const heights = [12, 22 + i * 9, 12];
        return (
          <motion.rect
            key={i}
            x={11 + i * 16}
            width={9}
            rx={3}
            fill={TONES[i]}
            animate={{ height: heights, y: heights.map((h) => 50 - h) }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              delay: i * 0.22,
              ease: "easeInOut",
            }}
          />
        );
      })}
      <rect x={8} y={53} width={48} height={2.5} rx={1.25} fill="#635c72" />
    </svg>
  );
}

/* Consultation — a compass needle sweeping for direction */
function ConsultationIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <circle
        cx={32}
        cy={32}
        r={21}
        fill="none"
        stroke={TONES[0]}
        strokeWidth={2}
        strokeOpacity={0.45}
        strokeDasharray="4 5"
      />
      <motion.g
        style={{ transformOrigin: "32px 32px" }}
        animate={{ rotate: [-38, 38, -38] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M32 13 L37 32 L32 51 L27 32 Z" fill={TONES[1]} />
      </motion.g>
      <circle cx={32} cy={32} r={3.4} fill={TONES[2]} />
    </svg>
  );
}

/* Solutions — layered platforms floating into a stack */
function SolutionsIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      {[2, 1, 0].map((i) => (
        <motion.path
          key={i}
          d="M32 4 L56 17 L32 30 L8 17 Z"
          fill={TONES[i]}
          opacity={0.95 - i * 0.14}
          animate={{ y: [10 + i * 11, 5 + i * 11, 10 + i * 11] }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: i * 0.26,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

const OFFERINGS = [
  {
    title: "Trainings",
    body: "Bootcamps, skills series, and short courses that turn ambition into capability.",
    dri: "Mr. Shoaib",
    cta: "Explore Trainings",
    href: ROUTES.trainings,
    icon: <TrainingsIcon />,
  },
  {
    title: "Consultation",
    body: "Strategic advisory for founders and organizations building products, platforms, spaces, or ecosystems.",
    dri: "Jamaluddin Ahmed Siddiqui",
    cta: "Book Consultation",
    href: ROUTES.consultation,
    icon: <ConsultationIcon />,
  },
  {
    title: "Solutions",
    body: "Industrial-grade platforms — from AI-native GRC to manufacturing ERPs — built and deployed under Aqdaar.",
    dri: "Aquib ul Haq",
    cta: "View Solutions",
    href: ROUTES.solutions,
    icon: <SolutionsIcon />,
  },
];

export default function Offerings() {
  return (
    <section id="offerings" className="relative overflow-hidden py-28">
      <SoftGlow />
      <div className="relative mx-auto max-w-[1150px] px-6">
        <Reveal>
          <h2 className="display mx-auto max-w-3xl text-center text-4xl font-bold sm:text-5xl">
            Our Offerings
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-3 lg:gap-16">
          {OFFERINGS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.12}>
              <div className="group">
                <div className="transition-transform duration-300 ease-out group-hover:scale-110">
                  {o.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold text-fg">{o.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {o.body}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <span className="text-faint">DRI</span>
                  <span className="font-medium text-fg">{o.dri}</span>
                </div>

                <a
                  href={o.href}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent"
                >
                  {o.cta}
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

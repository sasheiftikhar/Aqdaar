"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

const CATEGORIES = [
  "All",
  "Industrial Data",
  "Academic Data",
  "Domestic User Interest",
] as const;

type Category = (typeof CATEGORIES)[number];

const TONES = ["#cabfe1", "#b4d9ce", "#f5efd3"];

/* Each category carries its own brand tone, so the icon, tag and hover
   state of a card all read as one colour family. */
const CATEGORY_TONE: Record<Exclude<Category, "All">, string> = {
  "Industrial Data": "#cabfe1",
  "Academic Data": "#b4d9ce",
  "Domestic User Interest": "#f5efd3",
};

/* ------------------------------------------------------------------ */
/* Animated icons — one per solution, looping in the brand palette      */
/* ------------------------------------------------------------------ */

/* Zairen — a shield with a compliance check drawing itself in */
function ShieldIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <path
        d="M32 6 L54 15 V32 C54 45 44 54 32 58 C20 54 10 45 10 32 V15 Z"
        fill="none"
        stroke={c}
        strokeWidth="2.4"
        strokeOpacity="0.55"
        strokeLinejoin="round"
      />
      <motion.path
        d="M21 32 l8 8 L44 24"
        fill="none"
        stroke={TONES[1]}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{
          duration: 3.2,
          times: [0, 0.4, 0.78, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
}

/* Manufacturing ERP — two meshing gears turning against each other */
function Gear({
  cx,
  cy,
  r,
  c,
  dir,
  dur,
}: {
  cx: number;
  cy: number;
  r: number;
  c: string;
  dir: number;
  dur: number;
}) {
  const teeth = 8;
  return (
    <motion.g
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      animate={{ rotate: dir * 360 }}
      transition={{ duration: dur, repeat: Infinity, ease: "linear" }}
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth="2.4" />
      {Array.from({ length: teeth }).map((_, i) => {
        const a = (i / teeth) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r}
            y1={cy + Math.sin(a) * r}
            x2={cx + Math.cos(a) * (r + 4)}
            y2={cy + Math.sin(a) * (r + 4)}
            stroke={c}
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={r / 3} fill={c} fillOpacity="0.45" />
    </motion.g>
  );
}

function GearsIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <Gear cx={24} cy={25} r={11} c={c} dir={1} dur={9} />
      <Gear cx={44} cy={42} r={8} c={TONES[1]} dir={-1} dur={7} />
    </svg>
  );
}

/* Admin LMS — dashboard rows filling and emptying */
function DashboardIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <rect
        x={8}
        y={12}
        width={48}
        height={40}
        rx={5}
        fill="none"
        stroke={c}
        strokeWidth="2.4"
        strokeOpacity="0.5"
      />
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={16}
          y={23 + i * 9}
          height={4}
          rx={2}
          fill={TONES[i % TONES.length]}
          animate={{ width: [8, 32 - i * 6, 8], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
}

/* CRM — a database taking records in, bands pulsing */
function DatabaseIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <motion.circle
        cx={32}
        r={2.6}
        fill={TONES[2]}
        animate={{ cy: [2, 14], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn" }}
      />
      <ellipse cx={32} cy={18} rx={15} ry={5.5} fill="none" stroke={c} strokeWidth="2.4" />
      <path
        d="M17 18 V44 C17 47 23.7 49.5 32 49.5 C40.3 49.5 47 47 47 44 V18"
        fill="none"
        stroke={c}
        strokeWidth="2.4"
      />
      {[28, 38].map((y, i) => (
        <motion.ellipse
          key={i}
          cx={32}
          cy={y}
          rx={15}
          ry={5.5}
          fill="none"
          stroke={TONES[1]}
          strokeWidth="2"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.45 }}
        />
      ))}
    </svg>
  );
}

/* Teacher LMS — a gamified star badge, pulsing with sparkles */
function StarIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <motion.polygon
        points="32,11 38.5,24.5 53,26.5 42.5,36.5 45,51 32,44 19,51 21.5,36.5 11,26.5 25.5,24.5"
        fill={c}
        style={{ transformOrigin: "32px 31px" }}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 7, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {[
        [12, 14],
        [53, 17],
        [51, 49],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={2.2}
          fill={TONES[(i + 1) % TONES.length]}
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.3, 0.6] }}
          transition={{ duration: 1.9, repeat: Infinity, delay: i * 0.45 }}
        />
      ))}
    </svg>
  );
}

/* Dexter Lab — a flask with bubbles rising */
function FlaskIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14">
      <path
        d="M26 9 v13 L14.5 45 C13 48.4 15.5 52 19.3 52 h25.4 c3.8 0 6.3-3.6 4.8-7 L38 22 V9"
        fill="none"
        stroke={c}
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <line x1={23} y1={9} x2={41} y2={9} stroke={c} strokeWidth="2.4" strokeLinecap="round" />
      {[
        [26, 45],
        [32, 48],
        [38, 44],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          r={2.4}
          fill={TONES[i % TONES.length]}
          animate={{ cy: [y, y - 17], opacity: [0, 1, 0] }}
          transition={{
            duration: 2.3,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */

type Solution = {
  name: string;
  owner: string;
  roadmap: string;
  category: Exclude<Category, "All">;
  Icon: (props: { c: string }) => React.ReactElement;
};

const SOLUTIONS: Solution[] = [
  {
    name: "Zairen — AI-native GRC Platform",
    owner: "Aquib ul Haq",
    roadmap: "Governance, Risk & Compliance",
    category: "Industrial Data",
    Icon: ShieldIcon,
  },
  {
    name: "Manufacturing ERP",
    owner: "Hafiz Ebad Jabbar",
    roadmap: "Industrial Data",
    category: "Industrial Data",
    Icon: GearsIcon,
  },
  {
    name: "Admin LMS",
    owner: "Hammad Khan",
    roadmap: "Academic Data",
    category: "Academic Data",
    Icon: DashboardIcon,
  },
  {
    name: "CRM — Import & Consumption Database",
    owner: "Syed Shahmeer Shah",
    roadmap: "Domestic User Interest",
    category: "Domestic User Interest",
    Icon: DatabaseIcon,
  },
  {
    name: "Teacher LMS — STEM & HEAL Gamified Platform",
    owner: "Munaaf / Chairman Pasha",
    roadmap: "Training Pakistani Youth",
    category: "Academic Data",
    Icon: StarIcon,
  },
  {
    name: "Dexter Lab Franchise",
    owner: "Industrialists (Saleemuddin, HMR, SEW, etc.)",
    roadmap: "Franchise / Expansion",
    category: "Domestic User Interest",
    Icon: FlaskIcon,
  },
];

export default function SolutionsGrid() {
  const [active, setActive] = useState<Category>("All");

  const filtered =
    active === "All"
      ? SOLUTIONS
      : SOLUTIONS.filter((s) => s.category === active);

  return (
    <section id="solutions" className="relative py-28">
      <div className="mx-auto max-w-[1150px] px-6">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-5xl">
              Explore solutions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-muted">
              A growing marketplace of platforms across industry, academia, and
              domestic markets. Browse by category — full solution pages are on
              the way.
            </p>
          </Reveal>
        </div>

        {/* Category filter bar */}
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
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

        {/* Solutions — icon-led columns */}
        <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => {
              const tone = CATEGORY_TONE[s.category];
              return (
                <motion.div
                  key={s.name}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group"
                >
                  <div className="transition-transform duration-300 ease-out group-hover:scale-110">
                    <s.Icon c={tone} />
                  </div>

                  <span
                    className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: tone }}
                  >
                    {s.category}
                  </span>

                  <h3 className="mt-2 text-lg font-bold leading-snug text-fg">
                    {s.name}
                  </h3>

                  <div className="mt-3 space-y-1 text-sm leading-relaxed text-muted">
                    <p>
                      <span className="text-faint">Owner · </span>
                      {s.owner}
                    </p>
                    <p>
                      <span className="text-faint">Roadmap · </span>
                      {s.roadmap}
                    </p>
                  </div>

                  {/* No per-solution page exists, so this opens the
                      conversation about one rather than sitting dead. */}
                  <a
                    href={ROUTES.contact}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                  >
                    Learn More
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

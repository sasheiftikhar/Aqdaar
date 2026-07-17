"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

const SIDEBAR = [
  "Guman 2.0",
  "Pakistan Startup Worldcup",
  "Young Entrepreneurs Summit",
  "Founders Meetup",
  "Skills Bootcamp",
  "Investor Night",
  "Demo Day",
];

const TASK_LABELS = [
  "New registration",
  "Ticket booked",
  "Seat confirmed",
  "Team signed up",
  "Speaker added",
  "RSVP received",
];

type Run = {
  id: number;
  label: string;
  status: "running" | "completed";
  ms: number;
};

function ConsoleMock() {
  const [runs, setRuns] = useState<Run[]>([
    { id: 1, label: "New registration", status: "completed", ms: 4.5 },
    { id: 2, label: "Ticket booked", status: "completed", ms: 3.1 },
    { id: 3, label: "Seat confirmed", status: "completed", ms: 5.2 },
  ]);
  const idRef = useRef(4);

  // A new run streams in at the top, runs, then completes — a live feed.
  useEffect(() => {
    let cancelled = false;
    const addRun = () => {
      const id = idRef.current++;
      const label = TASK_LABELS[id % TASK_LABELS.length];
      setRuns((prev) =>
        [{ id, label, status: "running" as const, ms: 0 }, ...prev].slice(0, 3)
      );
      setTimeout(() => {
        if (cancelled) return;
        setRuns((prev) =>
          prev.map((r) =>
            r.id === id
              ? { ...r, status: "completed", ms: +(2 + Math.random() * 4).toFixed(1) }
              : r
          )
        );
      }, 1700);
    };
    const iv = setInterval(addRun, 3400);
    return () => {
      cancelled = true;
      clearInterval(iv);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0b0b0d] shadow-2xl">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded bg-black/40 px-2 py-0.5 text-[11px] text-faint">
          🔒 events.aqdaar.org
        </span>
      </div>

      {/* A fixed 180px rail would leave the event itself ~150px on a phone, so
          below sm the sidebar drops and the content takes the full width. */}
      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr]">
        {/* sidebar */}
        <div className="hidden border-r border-border bg-black/40 p-3 sm:block">
          <p className="mb-3 text-sm font-bold tracking-tight text-fg">AQDAAR</p>
          <p className="mb-2 text-[10px] uppercase tracking-wide text-faint">
            Events
          </p>
          <ul className="space-y-1">
            {SIDEBAR.map((s, i) => (
              <li
                key={s}
                className={`flex items-center gap-1.5 truncate rounded-md px-2 py-1.5 text-[12px] ${
                  i === 0 ? "bg-surface text-fg" : "text-muted"
                }`}
              >
                {i === 0 && (
                  <motion.span
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-done"
                    animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                )}
                <span className="truncate">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* main */}
        <div className="relative p-5">
          <div className="flex items-center gap-2">
            <p className="text-[11px] uppercase tracking-wide text-faint">
              Event
            </p>
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
              style={{ background: "var(--color-butter)", color: "#7a6f3a" }}
            >
              Featured
            </span>
          </div>
          <p className="mt-1 text-lg font-semibold text-fg">
            Guman 2.0 — Leadership Conference
          </p>
          <p className="mt-1 flex items-center text-[13px] text-muted">
            August · Liaquat National Hospital
            <motion.span
              className="ml-0.5 inline-block h-3.5 w-px bg-accent"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
            />
          </p>

          <div className="mt-4 flex gap-2">
            <motion.button
              whileHover={{ y: -2 }}
              className="relative overflow-hidden rounded-lg bg-done px-4 py-2 text-sm font-medium text-black"
            >
              {/* sheen sweeping across the primary button */}
              <motion.span
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                }}
                animate={{ x: ["-120%", "120%"] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4 }}
              />
              <span className="relative">Register</span>
            </motion.button>
            <button className="rounded-lg border border-border px-4 py-2 text-sm text-fg">
              Details
            </button>
          </div>

          <p className="mt-6 mb-3 text-sm font-medium text-fg">
            Recent registrations
          </p>
          {/* fixed height keeps the panel from jumping as rows stream */}
          <div className="h-[132px] space-y-2 overflow-hidden">
            <AnimatePresence initial={false}>
              {runs.map((r) => (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: -14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface/40 px-3 py-2 text-[13px]"
                >
                  {r.status === "running" ? (
                    <span className="flex items-center gap-1.5 text-[#AFA3BF]">
                      <motion.span
                        className="h-3 w-3 rounded-full border-[1.5px] border-[#AFA3BF] border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Booking
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-done">
                      <span className="h-1.5 w-1.5 rounded-full bg-done" />
                      Confirmed
                    </span>
                  )}
                  <span className="text-muted">{r.label}</span>
                  <span className="ml-auto font-mono text-[11px] text-faint">
                    {r.status === "running" ? "…" : `${r.ms}s`}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Console() {
  return (
    <section id="events" className="relative py-28">
      {/* grid-cols-1 compiles to minmax(0, 1fr) and pins the track to the
          container; a bare `grid` would size the column to the mock. */}
      <div className="mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              Upcoming Events
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-muted">
              Conferences, qualifiers, and summits that bring founders,
              investors, and builders together. Guman 2.0, Pakistan Startup
              Worldcup, Young Entrepreneurs Summit and more — seats filling live.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={ROUTES.events}
              className="mt-6 inline-flex items-center gap-2 font-medium text-accent"
            >
              See all events →
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ConsoleMock />
        </Reveal>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import PostImage from "@/components/events/PostImage";
import { FLAGSHIP } from "@/components/events/eventData";

/**
 * The one large banner slot, Kickstarter-style: big image, pitch, a filled-seats
 * bar, and a countdown.
 *
 * The flagship is whichever post carries `flagship: true` in eventData — right
 * now the Dexter Lab, because it's the only one still open to join.
 *
 * TARGET and SEATS are the two numbers this section can't read off a creative:
 * the applications deadline and the intake size. Both are placeholders until
 * they're confirmed; set them here and the countdown and bar go live.
 */
const TARGET = "2026-09-06T18:00:00+05:00";
const SEATS = { filled: 0, total: 100 };

export default function FlagshipSpotlight() {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
          Flagship event
        </p>
        <h2 className="display mt-4 text-4xl font-bold text-fg sm:text-5xl">
          The one to <span className="text-gradient">back.</span>
        </h2>
        <p className="mt-4 max-w-2xl text-[14px] text-muted">
          The one thing on this page you can still get into.
        </p>

        <div className="mt-10 grid overflow-hidden rounded-3xl border border-border bg-surface/30 lg:grid-cols-[1.15fr_1fr]">
          {/* the creative at its native square — no crop on the flagship */}
          <div className="p-3">
            <PostImage
              src={FLAGSHIP.image}
              alt={FLAGSHIP.title}
              ratio="1:1"
              href={FLAGSHIP.url}
              sizes="(max-width: 1024px) 100vw, 640px"
            />
          </div>

          <div className="flex flex-col p-8 lg:py-10">
            <span className="w-fit rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted">
              {FLAGSHIP.category}
            </span>

            <h3 className="mt-4 text-[26px] font-bold leading-tight text-fg">
              {FLAGSHIP.title}
            </h3>
            <p className="mt-2 text-[13px] text-accent">
              {FLAGSHIP.date} · {FLAGSHIP.location}
            </p>

            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
              {FLAGSHIP.caption}
            </p>

            <SeatsBar />
            <Countdown />

            <a
              href="mailto:events@aqdaar.org"
              className="bg-primary-gradient on-accent group mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
            >
              Back This Event / Register Now
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeatsBar() {
  const pct = Math.round((SEATS.filled / SEATS.total) * 100);
  return (
    <div className="mt-7">
      <div className="flex items-baseline justify-between text-[12.5px]">
        <span className="text-muted">
          Seats filled —{" "}
          <span className="font-semibold text-fg">
            [{SEATS.filled}] of [{SEATS.total}]
          </span>
        </span>
        <span className="font-mono text-[11px] text-faint">{pct}%</span>
      </div>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="bg-primary-gradient h-full rounded-full transition-[width] duration-700"
          style={{ width: `${Math.max(pct, 2)}%` }}
        />
      </div>
    </div>
  );
}

type Parts = { days: number; hours: number; mins: number; secs: number };

function remaining(): Parts {
  const ms = Math.max(0, new Date(TARGET).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    mins: Math.floor(ms / 60_000) % 60,
    secs: Math.floor(ms / 1000) % 60,
  };
}

function Countdown() {
  // Starts null so the server and the first client render agree; the real clock
  // takes over on mount.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(remaining());
    const id = setInterval(() => setParts(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const cells: [string, number | null][] = [
    ["Days", parts?.days ?? null],
    ["Hours", parts?.hours ?? null],
    ["Mins", parts?.mins ?? null],
    ["Secs", parts?.secs ?? null],
  ];

  return (
    <div className="mt-6">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
        Starts in — [placeholder target date]
      </p>
      <div className="mt-2.5 grid grid-cols-4 gap-2">
        {cells.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-surface-2 px-2 py-3 text-center"
          >
            <div className="font-mono text-[20px] font-bold tabular-nums text-fg">
              {value === null ? "––" : String(value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-faint">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

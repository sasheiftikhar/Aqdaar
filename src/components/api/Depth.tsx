"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";

/* Card 1: storage & extraction — a document parsed into fields */
const EXTRACTED = [
  { label: "Account", value: "8841-002" },
  { label: "Usage", value: "612 kWh" },
  { label: "Amount due", value: "$142.50" },
  { label: "Due date", value: "Aug 1" },
];

function ExtractionCard() {
  const [reveal, setReveal] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      setReveal(0);
      let n = 0;
      const t = setInterval(() => {
        n += 1;
        if (cancelled) return;
        setReveal(n);
        if (n >= EXTRACTED.length) clearInterval(t);
      }, 550);
    };
    run();
    const loop = setInterval(run, 5200);
    return () => {
      cancelled = true;
      clearInterval(loop);
    };
  }, []);

  return (
    <DepthCard
      title="Storage & extraction"
      body="Capture PDFs, statements, and documents, then pull them apart into clean, structured fields."
    >
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="relative flex flex-col gap-1.5 rounded-lg border border-border-soft bg-black/50 p-3">
          <span className="text-[10px] uppercase tracking-widest text-faint">
            energy-bill.pdf
          </span>
          {[70, 90, 55, 80, 40].map((w, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full bg-muted/25"
              style={{ width: `${w}%` }}
            />
          ))}
          <motion.div
            className="pointer-events-none absolute inset-x-2 h-6 rounded"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(202,191,225,0.2), transparent)",
            }}
            animate={{ top: ["8%", "82%", "8%"] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="space-y-1.5">
          {EXTRACTED.map((f, i) => (
            <motion.div
              key={f.label}
              animate={{
                opacity: i < reveal ? 1 : 0.25,
                x: i < reveal ? 0 : -4,
              }}
              transition={{ duration: 0.3 }}
              className="rounded-md border border-border-soft bg-black/40 px-2.5 py-1.5"
            >
              <p className="text-[10px] text-faint">{f.label}</p>
              <p className="text-[12px] font-medium text-fg">{f.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </DepthCard>
  );
}

/* Card 2: event destinations — a webhook firing to services */
const DESTINATIONS = ["Webhook", "S3", "Snowflake", "Kafka", "Postgres"];

function EventDestinationsCard() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const loop = setInterval(
      () => setPulse((p) => (p + 1) % DESTINATIONS.length),
      1100
    );
    return () => clearInterval(loop);
  }, []);

  return (
    <DepthCard
      title="Event destinations"
      body="Stream every completed run to your webhooks, warehouse, or queue the moment it finishes."
    >
      <div className="flex h-full flex-col justify-center gap-2">
        <div className="mb-2 flex items-center gap-2 text-[11px] text-muted">
          <motion.span
            className="h-2 w-2 rounded-full bg-accent"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.1, repeat: Infinity }}
          />
          run.completed
        </div>
        {DESTINATIONS.map((d, i) => (
          <motion.div
            key={d}
            animate={{
              borderColor: pulse === i ? "#CABFE1" : "#1f1f22",
              backgroundColor:
                pulse === i ? "rgba(202,191,225,0.06)" : "rgba(0,0,0,0.4)",
            }}
            className="flex items-center justify-between rounded-md border px-3 py-1.5"
          >
            <span className="font-mono text-[11.5px] text-muted">{d}</span>
            <motion.span
              animate={{ opacity: pulse === i ? 1 : 0 }}
              className="text-[11px] text-done"
            >
              → delivered
            </motion.span>
          </motion.div>
        ))}
      </div>
    </DepthCard>
  );
}

/* Card 3: interactions — request a step-up MFA code from the end user */
function InteractionsCard() {
  const [digits, setDigits] = useState<number[]>([]);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      setDigits([]);
      const code = [4, 8, 2, 1];
      code.forEach((d, i) => {
        setTimeout(() => {
          if (!cancelled) setDigits((prev) => [...prev, d]);
        }, 600 + i * 450);
      });
    };
    run();
    const loop = setInterval(run, 4200);
    return () => {
      cancelled = true;
      clearInterval(loop);
    };
  }, []);

  return (
    <DepthCard
      title="Interactions"
      body="When a flow needs a human, request a code or approval from the end user mid-run — without breaking the session."
    >
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted">Enter the code sent to your phone</p>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex h-11 w-9 items-center justify-center rounded-lg border border-accent/40 bg-black/50 text-lg font-semibold text-fg"
            >
              <AnimatePresence>
                {digits[i] !== undefined && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {digits[i]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <AnimatePresence>
          {digits.length === 4 && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 text-sm text-done"
            >
              ✓ Verified
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </DepthCard>
  );
}

/* Card 4: stealth mode — passing a bot check */
function StealthCard() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loop = setInterval(() => setChecked((v) => !v), 2400);
    return () => clearInterval(loop);
  }, []);

  return (
    <DepthCard
      title="Stealth mode"
      body="Realistic browsing fingerprints clear bot detection and CAPTCHAs so your agents keep running."
    >
      <div className="flex h-full items-center justify-center">
        <div className="flex items-center gap-3 rounded-lg border border-border bg-black/60 px-4 py-3">
          <motion.span
            className="flex h-6 w-6 items-center justify-center rounded border"
            animate={{
              backgroundColor: checked ? "#B4D9CE" : "#0a0a0b",
              borderColor: checked ? "#B4D9CE" : "#1f1f22",
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              animate={{ opacity: checked ? 1 : 0 }}
            >
              <path
                d="M5 12.5l4 4L19 6"
                stroke="#000"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.span>
          <span className="text-sm text-muted">Verify you are human</span>
        </div>
      </div>
    </DepthCard>
  );
}

function DepthCard({
  title,
  body,
  children,
}: {
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5">
      <div className="h-[200px] overflow-hidden rounded-xl border border-border-soft bg-black/30 p-4">
        {children}
      </div>
      <h4 className="mt-5 text-lg font-semibold text-fg">{title}</h4>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}

export default function Depth() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
        <Reveal>
          <h2 className="display text-4xl font-bold sm:text-6xl">
            Depth when
            <br />
            you need it
          </h2>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Reveal className="h-full">
            <ExtractionCard />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <EventDestinationsCard />
          </Reveal>
          <Reveal delay={0.16} className="h-full">
            <InteractionsCard />
          </Reveal>
          <Reveal delay={0.24} className="h-full">
            <StealthCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

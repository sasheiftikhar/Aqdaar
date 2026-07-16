"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrandTile from "@/components/ui/BrandTile";
import Reveal from "@/components/ui/Reveal";

/* ------------------------------------------------------------------ */
/* Authenticate — four apps whose locks turn to checks one by one      */
/* ------------------------------------------------------------------ */

const APPS = [
  { name: "Workday", color: "#f38b00", note: "Leads · Opportunities" },
  { name: "QuickBooks", color: "#2ca01c", note: "Invoices · Expenses" },
  { name: "Rippling", color: "#f6c944", note: "Board · Sprints" },
  { name: "Time Off", color: "#4c8dff", note: "Vacation request" },
];

function AuthenticateMock() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setDone((d) => (d >= APPS.length ? 0 : d + 1));
    }, 900);
    return () => clearInterval(iv);
  }, []);

  return (
    <MockShell>
      <div className="grid h-full grid-cols-2 gap-3">
        {APPS.map((a, i) => {
          const isDone = i < done;
          return (
            <div
              key={a.name}
              className="flex flex-col justify-between rounded-xl border border-border bg-black/40 p-3"
            >
              <div className="flex items-center gap-2">
                <BrandTile label={a.name} color={a.color} size={26} />
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-medium text-fg">
                    {a.name}
                  </p>
                  <p className="truncate text-[10px] text-muted">{a.note}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-1.5">
                <motion.span
                  className="flex h-4 w-4 items-center justify-center rounded-full"
                  animate={{
                    backgroundColor: isDone
                      ? "rgba(180,217,206,0.18)"
                      : "rgba(255,255,255,0.06)",
                  }}
                >
                  {isDone ? (
                    <motion.svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <path
                        d="M5 12.5l4 4L19 6"
                        stroke="#B4D9CE"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  ) : (
                    <span className="text-[8px] text-faint">🔒</span>
                  )}
                </motion.span>
                <span
                  className="text-[10px]"
                  style={{ color: isDone ? "#B4D9CE" : "#8a8a92" }}
                >
                  {isDone ? "Authenticated" : "Locked"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */
/* Operate — a billing portal the agent pays, then returns JSON        */
/* ------------------------------------------------------------------ */

function OperateMock() {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => setPaid((v) => !v), 2600);
    return () => clearInterval(iv);
  }, []);

  return (
    <MockShell>
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="flex flex-col rounded-xl border border-border bg-black/40 p-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-fg">Duke Energy</span>
            <motion.span
              className="rounded-full px-2 py-0.5 text-[9px] font-semibold"
              animate={{
                backgroundColor: paid ? "rgba(180,217,206,0.15)" : "rgba(240,147,43,0.15)",
                color: paid ? "#B4D9CE" : "#AFA3BF",
              }}
            >
              {paid ? "Paid" : "Past Due"}
            </motion.span>
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-wide text-faint">
            Balance
          </p>
          <p className="text-2xl font-semibold text-fg">$142.50</p>
          <p className="mt-1 text-[10px] text-muted">Due Jul 28 · 12 Oak St</p>
          <motion.div
            className="mt-auto flex h-8 items-center justify-center rounded-lg text-[12px] font-medium"
            animate={{
              backgroundColor: paid ? "rgba(180,217,206,0.15)" : "#CABFE1",
              color: paid ? "#B4D9CE" : "#000",
            }}
          >
            {paid ? "✓ Payment sent" : "Pay account"}
          </motion.div>
        </div>
        <div className="flex flex-col rounded-xl border border-border bg-black/40 p-3">
          <p className="mb-2 text-[10px] text-faint">{"// extracted"}</p>
          <pre className="font-mono text-[10px] leading-relaxed text-muted">
            {`{
  "account": "DK-4471",
  "balance": 142.50,
  "status": "${paid ? "paid" : "past_due"}",
  "due": "2026-07-28"
}`}
          </pre>
        </div>
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */
/* Extract — schema-validated JSON typing out line by line             */
/* ------------------------------------------------------------------ */

const EXTRACT_LINES = [
  "{",
  '  "invoice_id": "INV-8841",',
  '  "vendor": "Northwind Ltd",',
  '  "amount_due": 4820.00,',
  '  "currency": "USD",',
  '  "line_items": 7,',
  '  "status": "unpaid"',
  "}",
];

function ExtractMock() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let typer: ReturnType<typeof setInterval>;
    const run = () => {
      setCount(0);
      typer = setInterval(() => {
        setCount((c) => {
          if (c >= EXTRACT_LINES.length) {
            clearInterval(typer);
            return c;
          }
          return c + 1;
        });
      }, 260);
    };
    run();
    const loop = setInterval(run, EXTRACT_LINES.length * 260 + 2200);
    return () => {
      clearInterval(loop);
      clearInterval(typer);
    };
  }, []);

  return (
    <MockShell>
      <div className="flex h-full items-center">
        <pre className="font-mono text-[12px] leading-relaxed text-muted">
          {EXTRACT_LINES.slice(0, count).map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className={l.includes(":") ? "text-fg" : "text-faint"}
            >
              {l}
            </motion.div>
          ))}
          {count < EXTRACT_LINES.length && (
            <span className="inline-block h-3.5 w-1.5 animate-pulse bg-accent" />
          )}
        </pre>
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */
/* Orchestrate — a task flow that progresses step by step              */
/* ------------------------------------------------------------------ */

const STEPS = [
  "Logging into QuickBooks…",
  "Navigating to Invoices › Unpaid",
  "3 invoices extracted",
  "Output streamed to webhook",
  "Session closed · VM terminated",
];

function OrchestrateMock() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setStep((s) => (s >= STEPS.length ? 0 : s + 1));
    }, 1100);
    return () => clearInterval(iv);
  }, []);

  return (
    <MockShell>
      <div className="flex h-full flex-col justify-center gap-2.5">
        {STEPS.map((s, i) => {
          const state = i < step ? "done" : i === step ? "run" : "pending";
          return (
            <div key={s} className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center">
                {state === "done" && (
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <circle cx="12" cy="12" r="10" fill="rgba(180,217,206,0.15)" />
                    <path
                      d="M7 12.5l3 3L17 8"
                      stroke="#B4D9CE"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
                {state === "run" && (
                  <motion.span
                    className="h-3.5 w-3.5 rounded-full border-2 border-[#AFA3BF] border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                )}
                {state === "pending" && (
                  <span className="h-2 w-2 rounded-full bg-border" />
                )}
              </span>
              <span
                className="text-[13px] transition-colors"
                style={{
                  color:
                    state === "done"
                      ? "#8a8a92"
                      : state === "run"
                        ? "#f4f4f5"
                        : "#56565c",
                }}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </MockShell>
  );
}

/* ------------------------------------------------------------------ */

function MockShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[260px] rounded-2xl border border-border bg-surface/40 p-4">
      {children}
    </div>
  );
}

type Feature = {
  eyebrow: string;
  title: string;
  body: string;
  mock: React.ReactNode;
};

const FEATURES: Feature[] = [
  {
    eyebrow: "Authenticate",
    title: "Log in like a human, everywhere",
    body: "Your agents authenticate like humans to access sources without APIs. They use the login form, surface MFA requests, and solve CAPTCHAs. Credentials are encrypted in Aqdaar Vault and never returned to your backend.",
    mock: <AuthenticateMock />,
  },
  {
    eyebrow: "Operate",
    title: "Navigate any interface",
    body: "Agents navigate interfaces the way a human would. Web apps, legacy systems — if your team uses it today, Aqdaar can access it, fetch information, fill out forms, and even make payments.",
    mock: <OperateMock />,
  },
  {
    eyebrow: "Extract",
    title: "Deterministic, schema-validated JSON",
    body: "Every task returns deterministic, schema-validated JSON. Define the output shape you need and Aqdaar delivers it consistently, regardless of how the source renders its data. Documents, images, and files come alongside structured output.",
    mock: <ExtractMock />,
  },
  {
    eyebrow: "Orchestrate",
    title: "Run in real time or async",
    body: "Run agents in real-time or perform tasks asynchronously once your users authenticate. Results stream to webhooks, SQS, Pub/Sub, or any event destination. Aqdaar provisions isolated sessions on demand and tears them down on completion.",
    mock: <OrchestrateMock />,
  },
];

export default function Capabilities() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              One platform. <span className="text-muted">Any software.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-muted">
              Aqdaar is the infrastructure for building, running, and observing
              computer use agents. Your agents authenticate as users, operate any
              software, and access data locked behind a login.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 space-y-6">
          {FEATURES.map((f, i) => (
            <div
              key={f.eyebrow}
              className="grid items-center gap-8 rounded-3xl border border-border-soft bg-surface/20 p-6 lg:grid-cols-2 lg:p-10"
            >
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div>
                  <span className="text-sm font-semibold text-accent">
                    {f.eyebrow}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold text-fg sm:text-3xl">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-muted">{f.body}</p>
                </div>
              </Reveal>
              <Reveal delay={0.1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                {f.mock}
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

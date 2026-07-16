"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrowserFrame from "@/components/ui/BrowserFrame";
import Reveal from "@/components/ui/Reveal";

const PHASES = ["login", "mfa", "session", "data"] as const;
type Phase = (typeof PHASES)[number];

const RESERVATIONS = [
  { conf: "ACE-20482", hotel: "Ace Hotel New York", nights: "Apr 1 – Apr 5", cost: "$1,240.00" },
  { conf: "ACE-19775", hotel: "Ace Hotel London", nights: "May 3 – May 6", cost: "$980.00" },
  { conf: "ACE-21120", hotel: "Ace Hotel Kyoto", nights: "Jun 8 – Jun 11", cost: "$1,410.00" },
];

const JSON_OUT = `{
  "confirmation_number": "ACE-20482",
  "hotel_name": "Ace Hotel New York",
  "check_in": "2026-04-01",
  "check_out": "2026-04-05",
  "total_cost": 1240.00
}`;

export function LoginBrowser() {
  const [phase, setPhase] = useState<Phase>("login");

  useEffect(() => {
    const order: Phase[] = ["login", "mfa", "session", "data"];
    let i = 0;
    const iv = setInterval(() => {
      i = (i + 1) % order.length;
      setPhase(order[i]);
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  return (
    <BrowserFrame url="acehotel.com" className="h-full">
      <div className="relative h-[300px] p-5">
        <AnimatePresence mode="wait">
          {phase === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mx-auto flex h-full max-w-xs flex-col justify-center space-y-3"
            >
              <p className="text-center text-sm font-semibold text-fg">
                Sign in to Ace Hotel
              </p>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-faint">
                  Email
                </span>
                <div className="flex h-10 items-center rounded-lg border border-border bg-surface px-3 text-sm text-fg">
                  maria@acmecorp.com
                  <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-accent" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wide text-faint">
                  Password
                </span>
                <div className="flex h-10 items-center rounded-lg border border-border bg-surface px-3 tracking-[0.3em] text-muted">
                  ••••••••••
                </div>
              </div>
            </motion.div>
          )}

          {phase === "mfa" && (
            <motion.div
              key="mfa"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex h-full flex-col items-center justify-center"
            >
              <p className="mb-3 text-sm text-muted">Two-factor authentication</p>
              <div className="flex gap-2">
                {[4, 8, 2, 1].map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.18 }}
                    className="flex h-12 w-10 items-center justify-center rounded-lg border border-accent/40 bg-surface text-lg font-semibold text-fg"
                  >
                    {d}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "session" && (
            <motion.div
              key="session"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.4 }}
              className="flex h-full flex-col items-center justify-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 16 }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-done/15"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <motion.path
                    d="M4 12.5l5 5L20 6"
                    stroke="#B4D9CE"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  />
                </svg>
              </motion.div>
              <p className="text-sm font-medium text-done">Session established</p>
            </motion.div>
          )}

          {phase === "data" && (
            <motion.div
              key="data"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="h-full"
            >
              <p className="mb-3 text-[13px] font-medium text-fg">
                Your reservations
              </p>
              <div className="overflow-hidden rounded-lg border border-border">
                <div className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr] gap-2 border-b border-border bg-surface/50 px-3 py-2 text-[10px] uppercase tracking-wide text-faint">
                  <span>Conf #</span>
                  <span>Hotel</span>
                  <span>Dates</span>
                  <span className="text-right">Cost</span>
                </div>
                {RESERVATIONS.map((r, i) => (
                  <motion.div
                    key={r.conf}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.12 }}
                    className="grid grid-cols-[1fr_1.4fr_1fr_0.8fr] items-center gap-2 px-3 py-2 text-[11px]"
                  >
                    <span className="font-mono text-accent">{r.conf}</span>
                    <span className="truncate text-fg">{r.hotel}</span>
                    <span className="text-muted">{r.nights}</span>
                    <span className="text-right text-muted">{r.cost}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </BrowserFrame>
  );
}

export function JsonPanel() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-5">
      <div className="mb-3 flex items-center gap-2 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Schema-validated output
      </div>
      <div className="flex flex-1 items-center rounded-xl border border-border bg-black/50 p-4">
        <pre className="font-mono text-[12.5px] leading-relaxed text-muted">
          {JSON_OUT}
        </pre>
      </div>
    </div>
  );
}

export default function VaultDemo() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-[1300px] px-6">
        <Reveal>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted">
            Aqdaar Vault
          </div>
        </Reveal>
        <div className="grid items-stretch gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="h-full">
            <LoginBrowser />
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <JsonPanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

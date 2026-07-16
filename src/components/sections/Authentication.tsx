"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrandTile from "@/components/ui/BrandTile";
import Reveal from "@/components/ui/Reveal";

/* ------------------------------------------------------------------ */
/* Left panel: a login flow that cycles username → code → connected    */
/* ------------------------------------------------------------------ */

const AUTH_STEPS = ["credentials", "verify", "connected"] as const;

function AuthFlowPanel() {
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(0);
  const email = "maria@acmecorp.com";

  useEffect(() => {
    const cycle = setInterval(() => {
      setStep((s) => (s + 1) % (AUTH_STEPS.length + 1));
    }, 2200);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    if (step !== 0) return;
    setTyped(0);
    const t = setInterval(() => {
      setTyped((n) => (n < email.length ? n + 1 : n));
    }, 55);
    return () => clearInterval(t);
  }, [step]);

  const phase = AUTH_STEPS[Math.min(step, AUTH_STEPS.length - 1)];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-5">
      <div className="mb-4 flex items-center gap-2 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Aqdaar GRC · access &amp; controls
      </div>

      {/* flex-1 so the panel fills whatever height the taller sibling sets */}
      <div className="relative flex flex-1 flex-col justify-center rounded-xl border border-border bg-black/50 p-6">
        <AnimatePresence mode="wait">
          {phase === "credentials" && (
            <motion.div
              key="credentials"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              <label className="block text-[11px] uppercase tracking-wide text-faint">
                Email
              </label>
              <div className="flex h-10 items-center rounded-lg border border-border bg-surface px-3 text-sm text-fg">
                {email.slice(0, typed)}
                <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-accent" />
              </div>
              <label className="block text-[11px] uppercase tracking-wide text-faint">
                Password
              </label>
              <div className="flex h-10 items-center rounded-lg border border-border bg-surface px-3 tracking-[0.3em] text-muted">
                ••••••••••
              </div>
            </motion.div>
          )}

          {phase === "verify" && (
            <motion.div
              key="verify"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              <p className="mb-3 text-center text-sm text-muted">
                Enter verification code
              </p>
              <div className="flex justify-center gap-2">
                {[3, 9, 1, 6].map((d, i) => (
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

          {phase === "connected" && (
            <motion.div
              key="connected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3"
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
              <p className="text-sm font-medium text-done">Connected</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-3 right-4 text-[11px] text-faint">
          🔒 Secured by Aqdaar
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Right panel: credential vault where a new session pops in           */
/* ------------------------------------------------------------------ */

const VAULT = [
  { name: "Con Edison", note: "Session active · renewed 2h ago", color: "#0072ce" },
  { name: "Rippling", note: "Session active", color: "#f6c944" },
  { name: "Workday", note: "SSO · Okta", color: "#f38b00" },
];

function CredentialVaultPanel() {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const loop = setInterval(() => setJoined((v) => !v), 2600);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-5">
      <div className="mb-4 flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Data Vault · encrypted, scoped per user
        </span>
        <span className="rounded bg-done/15 px-2 py-0.5 text-[10px] font-semibold text-done">
          AES-256
        </span>
      </div>

      <div className="flex flex-1 flex-col rounded-xl border border-border bg-black/50 p-3">
        <div className="mb-3 flex items-center gap-2 px-1 text-sm text-fg">
          <span className="h-6 w-6 rounded-full bg-accent/80" />
          maria@acmecorp.com
        </div>
        <div className="space-y-2">
          {VAULT.map((v) => (
            <div
              key={v.name}
              className="flex items-center gap-3 rounded-lg border border-border bg-surface/70 p-3"
            >
              <BrandTile label={v.name} color={v.color} size={30} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-fg">{v.name}</p>
                <p className="truncate text-xs text-muted">{v.note}</p>
              </div>
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-done" />
            </div>
          ))}

          {/* Slot is ALWAYS reserved — only the contents fade, so the panel
              height never changes as the row appears/disappears. */}
          <div className="h-[62px]">
            <motion.div
              animate={{ opacity: joined ? 1 : 0, y: joined ? 0 : 6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex h-full items-center gap-3 rounded-lg border border-accent/40 bg-accent/5 p-3"
            >
              <BrandTile label="Ace Hotel" color="#111827" size={30} />
              <div>
                <p className="text-sm font-medium text-fg">Ace Hotel</p>
                <p className="text-xs text-accent">Just connected</p>
              </div>
              <span className="ml-auto h-1.5 w-1.5 animate-ping rounded-full bg-accent" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Box 1: built-in auth — password fills, then an API response drops in */
/* ------------------------------------------------------------------ */

function BuiltInAuthCard() {
  const [dots, setDots] = useState(0);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      setDots(0);
      setOk(false);
      const typer = setInterval(() => {
        setDots((d) => {
          if (d >= 10) {
            clearInterval(typer);
            if (!cancelled) setTimeout(() => setOk(true), 350);
            return d;
          }
          return d + 1;
        });
      }, 120);
    };
    run();
    const loop = setInterval(run, 4600);
    return () => {
      cancelled = true;
      clearInterval(loop);
    };
  }, []);

  return (
    <FeatureBox
      title="Access control, built-in"
      body="Role-based access and single sign-on baked into every platform we ship. Your app and your users are protected from day one."
    >
      <div className="space-y-1.5 font-mono text-[12px]">
        <p className="text-faint">Password</p>
        <div className="flex h-8 items-center rounded-md border border-border bg-black/60 px-3 tracking-[0.25em] text-accent">
          {"•".repeat(dots)}
          {dots < 10 && (
            <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-accent" />
          )}
        </div>
        <motion.div
          className="flex h-5 items-center justify-center rounded-md bg-accent/90 text-black"
          animate={{ opacity: ok ? 1 : 0.25 }}
        >
          {ok ? "✓" : ""}
        </motion.div>
        <div className="flex items-center gap-2 text-faint">
          <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] text-accent">
            POST
          </span>
          /v2/connections
        </div>
        {/* Reserved space so the card never grows when the response arrives */}
        <div className="h-[74px]">
          <motion.div
            animate={{ opacity: ok ? 1 : 0, y: ok ? 0 : 6 }}
            transition={{ duration: 0.35 }}
            className="space-y-1"
          >
            <span className="inline-block rounded bg-done/15 px-1.5 py-0.5 text-[10px] text-done">
              ● 201 Created
            </span>
            <pre className="rounded-md border border-border bg-black/60 p-2 text-faint">
              {`{\n  "id": "con_7F3a",\n  "status": "active"\n}`}
            </pre>
          </motion.div>
        </div>
      </div>
    </FeatureBox>
  );
}

/* ------------------------------------------------------------------ */
/* Box 2: credential vault rows with a scanning line top → bottom      */
/* ------------------------------------------------------------------ */

const VAULT_ROWS = [
  { color: "#ff5a5f", label: "A" },
  { color: "#00a8e0", label: "C" },
  { color: "#ff9900", label: "S" },
  { color: "#cabfe1", label: "X" },
];

function CredentialVaultCard() {
  return (
    <FeatureBox
      title="Encrypted data vault"
      body="Sensitive records encrypted at rest and in transit, scoped per user, with built-in rotation, audit logs, and revocation."
    >
      <div className="relative space-y-2 overflow-hidden rounded-lg p-1">
        <motion.div
          className="pointer-events-none absolute inset-x-0 z-10 h-10 rounded-full"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(202,191,225,0.18), transparent)",
          }}
          animate={{ top: ["-10%", "100%"] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        {VAULT_ROWS.map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md border border-border bg-black/50 p-2"
          >
            <span
              className="flex h-6 w-6 items-center justify-center rounded-md text-[12px] font-bold text-black"
              style={{ background: r.color }}
            >
              {r.label}
            </span>
            <span className="tracking-[0.25em] text-muted">••••••••••</span>
            <span className="ml-auto text-faint">🔒</span>
          </div>
        ))}
      </div>
    </FeatureBox>
  );
}

/* ------------------------------------------------------------------ */
/* Box 3: every factor — fingerprint scan, captcha, SMS code           */
/* ------------------------------------------------------------------ */

function EveryFactorCard() {
  const [factor, setFactor] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => setFactor((f) => (f + 1) % 3), 2600);
    return () => clearInterval(loop);
  }, []);

  return (
    <FeatureBox
      title="Every factor, every check"
      body="Aqdaar handles MFA, CAPTCHA, and complex login flows, completing credential challenges automatically."
    >
      <div className="flex h-full items-center justify-center">
        <AnimatePresence mode="wait">
          {factor === 0 && (
            <motion.div
              key="fp"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative flex flex-col items-center gap-2"
            >
              <div className="relative h-16 w-16 overflow-hidden">
                <svg viewBox="0 0 48 48" className="h-16 w-16" fill="none">
                  {[6, 11, 16, 21].map((r, i) => (
                    <circle
                      key={i}
                      cx="24"
                      cy="26"
                      r={r}
                      stroke="#8a8a92"
                      strokeWidth="1.6"
                      strokeDasharray="4 6"
                    />
                  ))}
                </svg>
                <motion.div
                  className="absolute inset-x-0 h-0.5 bg-accent shadow-[0_0_8px_#CABFE1]"
                  animate={{ top: ["6%", "88%", "6%"] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-faint">
                Passkey
              </span>
            </motion.div>
          )}

          {factor === 1 && (
            <motion.div
              key="captcha"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-3 rounded-lg border border-border bg-black/60 px-4 py-3"
            >
              <motion.span
                className="flex h-6 w-6 items-center justify-center rounded border border-border"
                animate={{
                  backgroundColor: ["#0a0a0b", "#B4D9CE"],
                  borderColor: ["#1f1f22", "#B4D9CE"],
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 1.7,
                }}
              >
                <motion.svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  animate={{ opacity: [0, 1] }}
                  transition={{ delay: 0.7, repeat: Infinity, repeatDelay: 1.7 }}
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
              <span className="text-sm text-muted">I&apos;m not a robot</span>
            </motion.div>
          )}

          {factor === 2 && (
            <motion.div
              key="sms"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-3"
            >
              <span className="text-[11px] uppercase tracking-widest text-faint">
                SMS code
              </span>
              <div className="flex gap-1.5">
                {[7, 2, 0, 4].map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * i }}
                    className="flex h-9 w-7 items-center justify-center rounded-md border border-accent/40 bg-black/60 text-sm font-semibold text-fg"
                  >
                    {d}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FeatureBox>
  );
}

/* ------------------------------------------------------------------ */

function FeatureBox({
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
      {/* Fixed-height media area: animations swap/vanish inside it, but the
          box itself never resizes. */}
      <div className="h-[220px] overflow-hidden rounded-xl border border-border-soft bg-black/30 p-4">
        {children}
      </div>
      <h4 className="mt-5 text-lg font-semibold text-fg">{title}</h4>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </div>
  );
}

export default function Authentication() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              Secure by design.
              <br />
              Enterprise-grade.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted">
              Every platform we build — from AI-native GRC to manufacturing ERPs
              — ships with encryption, access controls, and compliance baked in.
              Your data and your users, protected end to end.
            </p>
          </Reveal>
        </div>

        {/* items-stretch (grid default) + h-full Reveals keep both panels equal */}
        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <AuthFlowPanel />
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <CredentialVaultPanel />
          </Reveal>
        </div>

        <div className="mt-4 grid items-stretch gap-4 md:grid-cols-3">
          <Reveal className="h-full">
            <BuiltInAuthCard />
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <CredentialVaultCard />
          </Reveal>
          <Reveal delay={0.16} className="h-full">
            <EveryFactorCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

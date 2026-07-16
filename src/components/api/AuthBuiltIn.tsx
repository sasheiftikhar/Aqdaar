"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrandTile from "@/components/ui/BrandTile";
import Reveal from "@/components/ui/Reveal";

const STEPS = [
  "Credential Retrieval",
  "Login",
  "MFA Challenge",
  "Session Established",
];

/* Left: the four-step auth flow lighting up in sequence */
function AuthFlowDiagram() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const loop = setInterval(() => setActive((a) => (a + 1) % STEPS.length), 1400);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6">
      <div className="mb-6 flex items-center gap-2 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        End-to-end auth flow · Aqdaar Vault
      </div>

      <div className="flex flex-1 flex-col justify-center gap-3">
        {STEPS.map((step, i) => {
          const done = i < active;
          const isActive = i === active;
          return (
            <div key={step} className="flex items-center gap-3">
              <motion.span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold"
                animate={{
                  backgroundColor: isActive
                    ? "rgba(202,191,225,0.15)"
                    : done
                    ? "rgba(180,217,206,0.15)"
                    : "rgba(255,255,255,0.02)",
                  borderColor: isActive
                    ? "#CABFE1"
                    : done
                    ? "#B4D9CE"
                    : "#1f1f22",
                  color: isActive ? "#CABFE1" : done ? "#B4D9CE" : "#56565c",
                }}
                transition={{ duration: 0.3 }}
              >
                {done ? "✓" : i + 1}
              </motion.span>

              <div className="flex-1">
                <div className="flex items-center justify-between rounded-lg border border-border bg-black/40 px-3 py-2.5">
                  <span
                    className={`text-sm transition-colors ${
                      isActive || done ? "text-fg" : "text-faint"
                    }`}
                  >
                    {step}
                  </span>
                  {isActive && (
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between text-[11px] text-faint">
        <span>🔒 Encrypted credential storage</span>
        <span>AES-256</span>
      </div>
    </div>
  );
}

/* Right: credential vault, scoped per end-user */
const VAULT = [
  { name: "Con Edison", note: "Session active · renewed 2h ago", color: "#0072ce" },
  { name: "Rippling", note: "SSO · Okta", color: "#f6c944" },
  { name: "Workday", note: "Session active", color: "#f38b00" },
  { name: "Chase", note: "MFA verified", color: "#117aca" },
];

function CredentialVault() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6">
      <div className="mb-6 flex items-center justify-between text-xs text-muted">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Credential vault · scoped per end-user
        </span>
        <span className="rounded bg-done/15 px-2 py-0.5 text-[10px] font-semibold text-done">
          Encrypted
        </span>
      </div>

      <div className="relative flex-1 space-y-2 overflow-hidden rounded-xl border border-border bg-black/40 p-3">
        <motion.div
          className="pointer-events-none absolute inset-x-0 z-10 h-10"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(202,191,225,0.16), transparent)",
          }}
          animate={{ top: ["-12%", "100%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />
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
      </div>

      <p className="mt-6 text-[11px] text-faint">
        Securely store thousands to millions of end-user credentials.
      </p>
    </div>
  );
}

export default function AuthBuiltIn() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6 lg:px-10">
        <Reveal>
          <span className="mb-3 inline-block text-sm font-medium text-accent">
            Built in
          </span>
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              Authentication
              <br />
              built in
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted">
              Aqdaar handles the complete authentication lifecycle — from
              encrypted credential storage to login, MFA, CAPTCHA, and session
              management.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-stretch gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <AuthFlowDiagram />
          </Reveal>
          <Reveal delay={0.1} className="h-full">
            <CredentialVault />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

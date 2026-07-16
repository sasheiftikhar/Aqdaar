"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CODE_LINES = [
  { t: "import", c: "text-[#c9f14a]" },
  { t: " { Aqdaar } ", c: "text-fg" },
  { t: "from", c: "text-[#c9f14a]" },
  { t: " '@aqdaar/sdk'", c: "text-accent" },
];

const SNIPPET = `const aqdaar = new Aqdaar({ apiKey });

const run = await aqdaar.agents.run({
  target: "https://portal.acme.com",
  task: "Fetch the latest invoice",
  schema: {
    invoice_id: "string",
    amount: "number",
    due_date: "string",
  },
});`;

const RESPONSE = `{
  "invoice_id": "inv_9F3a2",
  "amount": 142.5,
  "due_date": "2026-08-01",
  "status": "structured"
}`;

export default function ApiHero() {
  const [typed, setTyped] = useState(0);
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = () => {
      setTyped(0);
      setShowResponse(false);
      const typer = setInterval(() => {
        setTyped((n) => {
          if (n >= SNIPPET.length) {
            clearInterval(typer);
            if (!cancelled) setTimeout(() => setShowResponse(true), 400);
            return n;
          }
          return n + 3;
        });
      }, 16);
    };
    run();
    const loop = setInterval(run, 7000);
    return () => {
      cancelled = true;
      clearInterval(loop);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28"
    >
      {/* Ambient glow + dotted texture */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute right-[-6%] top-[-6%] h-[560px] w-[760px] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(202,191,225,0.12), transparent)",
          }}
          animate={{ opacity: [0.45, 0.8, 0.45], scale: [1, 1.05, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="dot-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1300px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-muted"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Aqdaar API
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="display text-balance text-5xl font-bold sm:text-6xl lg:text-7xl"
          >
            Computer-use agents
            <br />
            designed for scale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 max-w-lg text-lg text-muted"
          >
            Point an agent at any website and get deterministic, structured
            results back. Aqdaar handles authentication, sessions, and execution
            so you ship in a single API call.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex items-center gap-3"
          >
            <a
              href="#cta"
              className="group flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-medium text-black transition-transform hover:-translate-y-0.5"
            >
              Read the docs
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#"
              className="rounded-xl border border-border bg-surface/50 px-6 py-3 font-medium text-fg transition-colors hover:bg-surface-2"
            >
              Get API key
            </a>
          </motion.div>
        </div>

        {/* Animated code + response window */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-border bg-surface/60 shadow-2xl backdrop-blur"
        >
          <div className="flex items-center gap-2 border-b border-border bg-black/40 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-faint">index.ts</span>
          </div>

          <div className="p-5 font-mono text-[12.5px] leading-relaxed">
            <p className="mb-2">
              {CODE_LINES.map((seg, i) => (
                <span key={i} className={seg.c}>
                  {seg.t}
                </span>
              ))}
            </p>
            <pre className="whitespace-pre-wrap text-muted">
              {SNIPPET.slice(0, typed)}
              {typed < SNIPPET.length && (
                <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-accent align-middle" />
              )}
            </pre>

            <div className="mt-4 h-[150px]">
              <motion.div
                animate={{ opacity: showResponse ? 1 : 0, y: showResponse ? 0 : 8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded bg-done/15 px-2 py-0.5 text-[10px] font-semibold text-done">
                    ● 200 OK
                  </span>
                  <span className="text-xs text-faint">Response</span>
                </div>
                <pre className="whitespace-pre-wrap rounded-lg border border-border-soft bg-black/50 p-3 text-faint">
                  {RESPONSE}
                </pre>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

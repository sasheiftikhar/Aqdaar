"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

/**
 * Syntax palette, drawn from the site's three accents in globals.css:
 * lavender for keywords, butter for strings, mint for identifiers. Kept as
 * named roles so a token's colour can't drift out of the palette by accident.
 */
const T = {
  keyword: "#cabfe1", // lavender
  string: "#f5efd3", // butter
  ident: "#b4d9ce", // mint
  method: "#d4ede1", // mint-light
  type: "#f4f4f5",
  punct: "#56565c",
  dim: "#8a8a92",
};

const CODE_LINES = [
  [{ t: 'import ', c: T.keyword }, { t: "Aqdaar ", c: T.type }, { t: "from ", c: T.keyword }, { t: '"@aqdaar/sdk"', c: T.string }, { t: ";", c: T.punct }],
  [{ t: "const ", c: T.keyword }, { t: "aqdaar ", c: T.ident }, { t: "= ", c: T.punct }, { t: "new ", c: T.keyword }, { t: "Aqdaar", c: T.type }, { t: "({ apiKey: process.env.AQDAAR_API_KEY });", c: T.dim }],
  [{ t: "const ", c: T.keyword }, { t: "run ", c: T.ident }, { t: "= ", c: T.punct }, { t: "await ", c: T.keyword }, { t: "aqdaar.tasks.", c: T.type }, { t: "run", c: T.method }, { t: '("task_x9y8z7", {', c: T.dim }],
  [{ t: "  connection_id: ", c: T.ident }, { t: '"conn_a1b2c3d4"', c: T.string }, { t: ",", c: T.punct }],
  [{ t: "  input: { check_in: ", c: T.ident }, { t: '"2026-04-01"', c: T.string }, { t: ", check_out: ", c: T.ident }, { t: '"2026-04-05"', c: T.string }, { t: " }", c: T.punct }],
  [{ t: "});", c: T.dim }],
];

const RESPONSE = `{
  "status": "completed",
  "runtime_ms": 4523,
  "output": {
    "hotel": "Ace Hotel",
    "confirmation": "HLT-849271",
    "total_cost": 847.50
  }
}`;

/* Lavender→mint aurora behind the glass code panel (no image needed). Dark
   stops are the palette's own accents, dropped to surface luminance. */
function AuroraBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #3f3557 0%, #322b46 28%, #241f30 52%, #24413a 74%, #17302a 100%)",
        }}
      />
      <motion.div
        className="absolute -top-1/4 left-1/5 h-64 w-64 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(202,191,225,0.5), transparent)",
        }}
        animate={{ x: [0, 34, 0], y: [0, 22, 0], opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-22%] right-1/5 h-72 w-72 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(180,217,206,0.5), transparent)",
        }}
        animate={{ x: [0, -26, 0], y: [0, -18, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* faint diagonal contour over the wash */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 7px)",
        }}
      />
    </div>
  );
}

function CodeMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 p-5 shadow-2xl sm:p-8">
      <AuroraBackdrop />

      {/* glassmorphic code panel floating over the aurora */}
      <div className="relative overflow-hidden rounded-xl border border-white/15 bg-black/40 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[11px] text-white/60">
            run-task.ts
          </span>
        </div>

        <div className="p-5 font-mono text-[12.5px] leading-relaxed">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 * i, duration: 0.4 }}
            className="whitespace-pre"
          >
            {line.map((tok, j) => (
              <span key={j} style={{ color: tok.c }}>
                {tok.t}
              </span>
            ))}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-5 border-t border-white/10 pt-4"
        >
          <p className="mb-2 text-white/40">{"// Response"}</p>
          <pre className="text-white/60">{RESPONSE}</pre>
        </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function EmbedApi() {
  return (
    <section className="relative py-28">
      <div className="mx-auto grid max-w-[1300px] items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <CodeMock />
        </Reveal>
        <div>
          <Reveal>
            <h2 className="display text-4xl font-bold sm:text-6xl">
              Built on a
              <br />
              robust core
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-muted">
              Every Aqdaar solution ships with a clean, documented API — so your
              platforms, integrations, and partners connect to structured,
              reliable data from day one.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href={ROUTES.solutions}
              className="mt-6 inline-flex items-center gap-2 font-medium text-accent"
            >
              Explore All Solutions →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

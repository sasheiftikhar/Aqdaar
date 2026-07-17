"use client";

import { motion } from "framer-motion";
import { LoginBrowser, JsonPanel } from "@/components/product/VaultDemo";

export default function ProductHero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-[-6%] h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(202,191,225,0.12), transparent)",
          }}
          animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="dot-grid absolute inset-0 opacity-30" />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1300px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
        {/* Left — content */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 text-sm text-muted"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Coming Soon
          </motion.div>

          <h1 className="display text-balance text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="block"
            >
              Industrial Solutions
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block bg-gradient-to-r from-accent to-[#c9f14a] bg-clip-text text-transparent"
            >
              Powering Pakistan&apos;s Businesses
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-8 max-w-lg text-lg text-muted"
          >
            A curated marketplace of industrial, academic, and domestic-focused
            platforms built for Pakistan. Launching soon — be the first to
            explore what&apos;s coming.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex items-center gap-3"
          >
            <a
              href="#list-your-solution"
              className="group flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-medium text-black transition-transform hover:-translate-y-0.5"
            >
              Notify Me
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#solutions"
              className="rounded-xl border border-border bg-surface/50 px-6 py-3 font-medium text-fg transition-colors hover:bg-surface-2"
            >
              Explore Solutions
            </a>
          </motion.div>
        </div>

        {/* Right — animation (browser demo + schema output) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted">
            Aqdaar Vault
          </div>
          <LoginBrowser />
          <JsonPanel />
        </motion.div>
      </div>
    </section>
  );
}

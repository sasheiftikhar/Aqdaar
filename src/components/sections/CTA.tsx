"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";

type CTAProps = {
  id?: string;
  title?: ReactNode;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTA({
  id = "cta",
  title = (
    <>
      Give Your Agents
      <br />a Computer
    </>
  ),
  subtitle = "Start building with Aqdaar today.",
  primaryLabel = "Get Started",
  primaryHref = "#",
  secondaryLabel = "Talk to Sales",
  secondaryHref = "#",
}: CTAProps) {
  return (
    <section
      id={id}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Dense dotted field, full width, running bottom → top and fading up */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1.4px)",
          backgroundSize: "11px 11px",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 12%, transparent 88%)",
          maskImage:
            "linear-gradient(to top, black 0%, black 12%, transparent 88%)",
        }}
      />

      {/* Soft central glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(202,191,225,0.10), transparent)",
        }}
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <h2 className="display text-5xl font-bold sm:text-7xl lg:text-8xl">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg text-muted">{subtitle}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-center justify-center gap-3">
            <a
              href={primaryHref}
              className="group flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-medium text-black transition-transform hover:-translate-y-0.5"
            >
              {primaryLabel}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={secondaryHref}
              className="rounded-xl border border-border bg-surface/50 px-6 py-3 font-medium text-fg transition-colors hover:bg-surface-2"
            >
              {secondaryLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

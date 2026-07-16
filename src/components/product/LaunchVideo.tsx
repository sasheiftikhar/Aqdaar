"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";

export default function LaunchVideo() {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1000px] px-6 text-center">
        <Reveal>
          <h2 className="display text-2xl font-bold text-fg sm:text-3xl">
            Watch the full launch video
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            whileHover="hover"
            className="group relative mt-8 cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface/60"
          >
            {/* pastel wash standing in for the video still */}
            <div className="bg-soft-gradient absolute inset-0 opacity-[0.14]" />
            <div className="dot-grid absolute inset-0 opacity-20" />

            {/*
              VIDEO SLOT — the launch film drops in here when it's ready.
              Replace this block with the player (<video> / embed iframe); the
              aspect-video wrapper already reserves the exact space, so nothing
              around it will shift.
            */}
            <div className="relative flex aspect-video flex-col items-center justify-center gap-6">
              <div className="relative flex items-center justify-center">
                {/* play button with a pulsing ring */}
                <motion.span
                  className="absolute h-20 w-20 rounded-full border border-accent/40"
                  animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.span
                  className="bg-primary-gradient relative flex h-20 w-20 items-center justify-center rounded-full"
                  variants={{ hover: { scale: 1.08 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#33304a">
                    <path d="M8 5l12 7-12 7z" />
                  </svg>
                </motion.span>
              </div>

              <motion.span
                className="rounded-full border border-border bg-black/40 px-3.5 py-1.5 text-[11px] tracking-wide text-faint"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                Launch film lands here
              </motion.span>
            </div>

            {/* caption bar */}
            <div className="relative flex items-center justify-between border-t border-border px-6 py-4 text-left">
              <div>
                <p className="text-sm font-semibold text-fg">
                  Aqdaar Studio — the launch
                </p>
                <p className="text-xs text-muted">Dhundo → Banao → Becho, in 4 minutes</p>
              </div>
              <span className="font-mono text-xs text-faint">04:12</span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

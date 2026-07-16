"use client";

import { motion } from "framer-motion";

const LOGOS = [
  "Habib University",
  "NED",
  "KU",
  "GMS Consultant",
  "Skillvention",
  "Lp92.org",
  "Startup Grind Lahore",
  "NIC Karachi",
  "Katalyst Lab",
];

export default function DeployedAt() {
  return (
    <section className="relative bg-bg py-16">
      <p className="mb-8 text-center text-[13px] font-bold uppercase tracking-[0.18em] text-muted">
        Trusted company-wide at
      </p>

      <div className="relative overflow-hidden">
        {/* edges fade to black */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

        <motion.div
          className="flex w-max gap-14 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
        >
          {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map(
            (l, i) => (
              <span
                key={i}
                className="text-lg font-bold tracking-tight text-white/25 transition-colors hover:text-white/60"
              >
                {l}
              </span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";

const NAV = [
  "About",
  "Services",
  "Solutions",
  "Trainings",
  "Consultation",
  "Events",
  "Blog",
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 bg-black"
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a href="#top" className="group flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Aqdaar"
            className="h-8 w-auto transition-transform group-hover:scale-[1.03]"
          />
        </a>

        <div className="flex items-center gap-7">
          <div className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <a
                key={item}
                href="#"
                className="text-[15px] text-muted transition-colors hover:text-fg"
              >
                {item}
              </a>
            ))}
          </div>

          <span className="hidden h-5 w-px bg-border lg:block" />

          <a
            href="#consult"
            className="bg-primary-gradient on-accent rounded-lg px-4 py-2 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
          >
            Book a Consultation
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

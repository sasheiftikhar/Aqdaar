"use client";

import { motion } from "framer-motion";
import { CONSULT_HREF, PRIMARY_NAV, ROUTES } from "@/lib/nav";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 bg-black"
    >
      <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <a href={ROUTES.home} className="group flex items-center">
          {/* compact mark — the full wordmark with the signature script is the
              footer's; at 32px tall the script would be illegible */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aqdaar-logo.png"
            alt="Aqdaar"
            className="h-8 w-auto transition-transform group-hover:scale-[1.03]"
          />
        </a>

        <div className="flex items-center gap-5 xl:gap-7">
          {/* eight items — tighter until xl has room to breathe */}
          <div className="hidden items-center gap-4 lg:flex xl:gap-6">
            {PRIMARY_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[14px] text-muted transition-colors hover:text-fg xl:text-[15px]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <span className="hidden h-5 w-px bg-border lg:block" />

          <a
            href={CONSULT_HREF}
            className="bg-primary-gradient on-accent rounded-lg px-4 py-2 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 xl:text-[15px]"
          >
            Book a Consultation
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

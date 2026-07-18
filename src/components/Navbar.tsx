"use client";

/**
 * Fixed top nav.
 *
 * Eight links don't fit a phone, so below `lg` they collapse behind a menu
 * button — without it the site has no navigation at all on mobile or tablet.
 *
 * The menu arrives the way a page does: the staircase drops, the menu is
 * swapped in behind it, and the stairs lift to reveal it. That's the same
 * cover -> swap -> reveal sequence `PageTransition` runs, for the same reason —
 * nothing has to animate in or out, it's just uncovered. Closing runs it again
 * in the other direction.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  StairColumns,
  stairContainer,
  useStairCount,
} from "@/components/transition/stairs";
import { CONSULT_HREF, PRIMARY_NAV, ROUTES } from "@/lib/nav";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Same shape as the page transition's, minus the route it has no need for. */
type Sweep = "resting" | "covering" | "covered" | "revealing";

export default function Navbar() {
  /** Whether the menu is actually mounted — flips behind the black. */
  const [open, setOpen] = useState(false);
  /** What the user asked for. Drives the icon, so it answers the tap at once. */
  const [intent, setIntent] = useState(false);
  const [sweep, setSweep] = useState<Sweep>("resting");
  const stairCount = useStairCount();

  /** Read at `covered`, where the closure over `intent` would be stale. */
  const pending = useRef(false);
  const pathname = usePathname();

  const toggle = () => {
    // Mid-sweep taps would leave the stairs and the menu disagreeing.
    if (sweep !== "resting") return;
    const next = !open;
    pending.current = next;
    setIntent(next);
    setSweep("covering");
  };

  function onColumnComplete(definition: unknown) {
    if (definition === "covering") {
      setSweep("covered");
      setOpen(pending.current);
    } else if (definition === "revealing") {
      setSweep("resting");
    }
  }

  /* Covered: swap done, lift on the next painted frame. */
  useEffect(() => {
    if (sweep !== "covered") return;
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setSweep("revealing"));
    });
    return () => {
      cancelAnimationFrame(first);
      cancelAnimationFrame(second);
    };
  }, [sweep]);

  /* Landing on a new page should never leave the menu hanging open. */
  useEffect(() => {
    setOpen(false);
    setIntent(false);
    setSweep("resting");
    pending.current = false;
  }, [pathname]);

  /* The page behind an open menu isn't meant to scroll under it. */
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open || sweep !== "resting") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      pending.current = false;
      setIntent(false);
      setSweep("covering");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, sweep]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 bg-black"
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <a href={ROUTES.home} className="group flex items-center">
            {/* compact mark — the full wordmark with the signature script is the
                footer's; at 32px tall the script would be illegible. `priority`
                because it's in the header on every page, above the fold — the one
                image that should never wait. */}
            <Image
              src="/aqdaar-logo.png"
              alt="Aqdaar"
              width={337}
              height={96}
              priority
              className="h-8 w-auto transition-transform group-hover:scale-[1.03]"
            />
          </a>

          <div className="flex items-center gap-3 sm:gap-5 xl:gap-7">
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

            {/* On the narrowest phones this would crowd out the logo, so there
                it lives at the foot of the menu instead. */}
            <a
              href={CONSULT_HREF}
              className="bg-primary-gradient on-accent hidden rounded-lg px-4 py-2 text-[14px] font-semibold transition-transform hover:-translate-y-0.5 sm:inline-block xl:text-[15px]"
            >
              Book a Consultation
            </a>

            <button
              type="button"
              onClick={toggle}
              aria-expanded={intent}
              aria-controls="mobile-nav"
              aria-label={intent ? "Close menu" : "Open menu"}
              className="-mr-2 flex h-10 w-10 items-center justify-center text-fg lg:hidden"
            >
              {/*
                Bars sit at 0/7/14 in a 16px box. Open sends the outer two to the
                middle and crosses them. Position comes from `top-*` and motion
                from `y`/`rotate`, so framer's transform never fights a utility
                class for the same property.
              */}
              <span className="relative block h-4 w-5">
                <motion.span
                  className="absolute left-0 top-0 block h-[1.5px] w-full rounded-full bg-current"
                  animate={intent ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-1.75 block h-[1.5px] w-full rounded-full bg-current"
                  animate={{ opacity: intent ? 0 : 1 }}
                  transition={{ duration: 0.22, ease: EASE }}
                />
                <motion.span
                  className="absolute left-0 top-3.5 block h-[1.5px] w-full rounded-full bg-current"
                  animate={intent ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.22, ease: EASE }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/*
        Sits under the header rather than over it, so the close button stays
        reachable the whole way through — including mid-sweep.
      */}
      {(open || sweep !== "resting") && (
        <div className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-hidden lg:hidden">
          {open && (
            <nav
              id="mobile-nav"
              aria-label="Mobile"
              className="flex h-full flex-col overflow-y-auto bg-black px-6 pb-10 pt-4"
            >
              {PRIMARY_NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="border-b border-border-soft py-4 text-xl font-medium text-fg"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={CONSULT_HREF}
                className="bg-primary-gradient on-accent mt-8 rounded-xl px-4 py-3.5 text-center font-semibold"
              >
                Book a Consultation
              </a>
            </nav>
          )}

          {sweep !== "resting" && (
            <motion.div
              aria-hidden
              variants={stairContainer}
              initial="resting"
              animate={sweep}
              className="absolute inset-0 overflow-hidden"
            >
              <StairColumns
                count={stairCount}
                onColumnComplete={onColumnComplete}
                active
              />
            </motion.div>
          )}
        </div>
      )}
    </>
  );
}

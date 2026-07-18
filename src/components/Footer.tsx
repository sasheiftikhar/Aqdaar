import Image from "next/image";
import { FOOTER_LEGAL, FOOTER_OFFERINGS, FOOTER_SITEMAP } from "@/lib/nav";

/* Socials stay on "#" until the real handles are confirmed. */
const SOCIALS = ["LinkedIn", "Instagram", "Facebook"];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-black">
      <div className="dot-grid absolute inset-x-0 top-0 h-24 opacity-40" />
      <div className="relative mx-auto max-w-[1300px] px-6 pt-24">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {/* Col 1 — Sitemap */}
          <div>
            <h5 className="mb-4 text-sm font-semibold text-fg">Sitemap</h5>
            <ul className="space-y-2.5">
              {FOOTER_SITEMAP.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Offerings */}
          <div>
            <h5 className="mb-4 text-sm font-semibold text-fg">Offerings</h5>
            <ul className="space-y-2.5">
              {FOOTER_OFFERINGS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Newsletter */}
          <div>
            <h5 className="mb-4 text-sm font-semibold text-fg">Newsletter</h5>
            <p className="mb-3 text-sm text-muted">
              Get the latest from Aqdaar.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="you@email.com"
                className="rounded-lg border border-border bg-surface/60 px-3 py-2 text-sm text-fg placeholder:text-faint focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary-gradient on-accent rounded-lg px-3 py-2 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Col 4 — Contact & Social */}
          <div>
            <h5 className="mb-4 text-sm font-semibold text-fg">Contact</h5>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <a href="tel:03357493653" className="hover:text-fg">
                  0335-7493653
                </a>
              </li>
              <li>
                <a
                  href="mailto:aqdaar.jamal@gmail.com"
                  className="hover:text-fg"
                >
                  aqdaar.jamal@gmail.com
                </a>
                <span className="block text-xs text-faint">General</span>
              </li>
              <li>
                <a href="mailto:events@aqdaar.org" className="hover:text-fg">
                  events@aqdaar.org
                </a>
                <span className="block text-xs text-faint">Events</span>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/*
        Full-width brand wordmark, directly above the copyright bar.

        The signature script rides above the letters and the "q" descends below
        them, so this block deliberately does NOT clip: no overflow-hidden and
        no vertical nudge. `w-full h-auto` scales the artwork proportionally at
        every width — never stretched, cropped, or distorted — and the px-6 /
        max-w-[1300px] pair matches the footer columns above it exactly.
      */}
      <div className="pointer-events-none relative mt-16 w-full select-none px-6 pb-10">
        {/*
          Sits at the very foot of every page, so it's never the LCP element and
          never above the fold — loading it lazily keeps a 261KB PNG off the
          critical path, and next/image serves it as a sized WebP besides.
          `sizes` caps the request at the 1300px it's ever displayed at.
        */}
        <Image
          src="/aqdaar-wordmark.png"
          alt="Aqdaar"
          width={1556}
          height={443}
          sizes="(max-width: 1300px) 100vw, 1300px"
          loading="lazy"
          className="mx-auto block h-auto w-full max-w-[1300px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1300px] px-6">
        <div className="flex flex-col items-center gap-3 border-t border-border py-6 text-sm text-muted md:flex-row md:justify-between">
          <span>© 2026 Aqdaar. All rights reserved. Karachi, Pakistan.</span>
          <div className="flex items-center gap-5">
            {FOOTER_LEGAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-fg"
              >
                {link.label}
              </a>
            ))}
          </div>
          <span
            className="text-base text-accent"
            style={{ fontFamily: "var(--font-script)" }}
          >
            Creating What History Can&apos;t Ignore
          </span>
        </div>
      </div>
    </footer>
  );
}

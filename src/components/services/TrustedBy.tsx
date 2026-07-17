import Reveal from "@/components/ui/Reveal";

/**
 * The logo strip under the hero.
 *
 * These are the partners already named across the Events creatives — the ones
 * Aqdaar has actually shared a room with. They're set as wordmarks rather than
 * images because no logo files have been supplied yet; drop real SVGs in and
 * swap the <span> for an <img> when they land.
 */
const PARTNERS = [
  "National Incubation Center",
  "Nextwave",
  "IIADP",
  "Startup Grind",
  "GMS Consultants",
];

export default function TrustedBy() {
  return (
    <section className="relative bg-bg pb-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <p className="text-center text-[13px] text-faint">
            Trusted by the rooms we build in — from Karachi outward.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/*
            Flex, not the hairline grid this used to be. Five names divide into
            neither two columns nor three, so on a phone and a tablet the grid
            left an empty cell — and because that grid drew its hairlines by
            showing a `bg-border` container through 1px gaps, the empty cell
            showed that violet as a solid panel. Separate cards can't leak a
            background they don't sit on, and `justify-center` keeps the short
            last row centred rather than hard left.
          */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {PARTNERS.map((name) => (
              <div
                key={name}
                // Basis accounts for the gaps: two up loses half a gap each,
                // three up loses two gaps across three, five up four across five.
                className="flex min-h-[72px] basis-[calc(50%-0.375rem)] items-center justify-center rounded-2xl border border-border bg-surface/30 px-4 py-4 text-center transition-colors hover:border-accent/40 sm:basis-[calc(33.333%-0.5rem)] lg:basis-[calc(20%-0.6rem)]"
              >
                <span className="text-[12.5px] font-semibold text-muted">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

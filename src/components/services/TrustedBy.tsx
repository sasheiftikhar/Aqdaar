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
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-5">
            {PARTNERS.map((name) => (
              <div
                key={name}
                className="flex min-h-[76px] items-center justify-center bg-bg px-4 py-5 text-center"
              >
                <span className="text-[12.5px] font-semibold text-muted transition-colors hover:text-fg">
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

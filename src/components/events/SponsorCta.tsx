import Reveal from "@/components/ui/Reveal";

export default function SponsorCta() {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="dot-grid relative overflow-hidden rounded-3xl border border-border bg-surface/40 px-8 py-14 text-center sm:px-14">
            <h2 className="display text-3xl font-bold text-fg sm:text-4xl">
              Put your name on the{" "}
              <span className="text-gradient">next one.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-muted">
              Sponsors and partners get their brand in the room where the work
              gets shown — and in front of everyone who turns up for it.
            </p>
            <a
              href="mailto:events@aqdaar.org?subject=Sponsorship%20%2F%20Partnership"
              className="bg-primary-gradient on-accent group mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Become a Sponsor / Partner
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

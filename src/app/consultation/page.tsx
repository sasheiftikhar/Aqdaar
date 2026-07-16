import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Consultation | Aqdaar",
  description:
    "Start with a free consultation. Strategic advisory for founders and organizations building products, platforms, spaces, or ecosystems.",
};

const STEPS = [
  {
    n: "01",
    title: "You reach out",
    body: "Tell us what you're building and where it's stuck. A paragraph is plenty — no brief, no deck required.",
  },
  {
    n: "02",
    title: "We talk it through",
    body: "A free call to understand the stage you're at. You leave with a straight answer on whether we're the right fit.",
  },
  {
    n: "03",
    title: "You get a scoped plan",
    body: "A real timeline and price against a defined scope — not a number pulled before we understood the problem.",
  },
];

const BRING = [
  "An idea that needs validating before you spend on it",
  "A product built but not reaching the right people",
  "A market you suspect has a gap you can't quite name",
  "An internal system that has outgrown the way it was built",
];

export default function ConsultationPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Consultation"
          title={
            <>
              Start with a
              <br />
              <span className="text-gradient">conversation.</span>
            </>
          }
          subtitle="The first call is free and there is no pitch attached. We take a limited number of projects each quarter, so it is worth reaching out early."
        >
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={ROUTES.contact}
              className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Book a Consultation
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <span className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-5 py-3.5 text-sm">
              <span className="text-faint">DRI</span>
              <span className="font-medium text-fg">
                Jamaluddin Ahmed Siddiqui
              </span>
            </span>
          </div>
        </PageHero>

        {/* how the first call goes */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                How the first call goes.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.1} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-surface/50 p-8">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface text-xl font-bold text-accent">
                      {s.n}
                    </span>
                    <h3 className="mt-6 text-xl font-bold text-fg">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* what to bring */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 lg:grid-cols-2">
            <div>
              <Reveal>
                <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                  Worth a call if&hellip;
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
                  Any of these sound like where you are. If none of them do and
                  you still want to talk, reach out anyway.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <a
                  href={ROUTES.services}
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                >
                  See everything we do
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <ul className="space-y-3">
                {BRING.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface/50 px-5 py-4"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-[14px] leading-relaxed text-muted">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

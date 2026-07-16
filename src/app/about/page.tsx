import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Team from "@/components/about/Team";
import Principles from "@/components/about/Principles";
import { ROUTES } from "@/lib/nav";

export const metadata: Metadata = {
  title: "About | Aqdaar",
  description:
    "Aqdaar is a product studio in Karachi. Dhundo finds the opportunity, Banao builds the product, Becho takes it to market — one team, end to end.",
};

const DIVISIONS = [
  {
    name: "Dhundo",
    meaning: "Find it",
    body: "Market and competitor mapping, opportunity sizing, and a direction everyone agrees on before anything gets built.",
    tone: "#cabfe1",
  },
  {
    name: "Banao",
    meaning: "Build it",
    body: "Design, prototyping, and production. Built to last rather than to demo, and shipped with a documented API.",
    tone: "#b4d9ce",
  },
  {
    name: "Becho",
    meaning: "Sell it",
    body: "Positioning, partnerships, and pilots — the work that gets a finished product to the people it was built for.",
    tone: "#f5efd3",
  },
];

const PARTNERS = [
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

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="About Aqdaar"
          title={
            <>
              A studio that carries
              <br />
              the work <span className="text-gradient">all the way.</span>
            </>
          }
          subtitle="We are a product studio in Karachi. Most teams can find an opportunity, or build a product, or take one to market. Doing all three without dropping the thread between them is the whole idea."
        >
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={ROUTES.consultation}
              className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Book a Consultation
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={ROUTES.product}
              className="rounded-xl border border-border bg-surface/50 px-7 py-3.5 font-medium text-fg transition-colors hover:bg-surface-2"
            >
              See how a project runs
            </a>
          </div>
        </PageHero>

        {/* the three divisions */}
        <section className="relative bg-bg py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                Three words. One direction.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                Our divisions are named for what they do, in the language the
                work actually happens in.
              </p>
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {DIVISIONS.map((d, i) => (
                <Reveal key={d.name} delay={i * 0.1} className="h-full">
                  <div className="flex h-full flex-col rounded-3xl border border-border bg-surface/50 p-8 transition-colors hover:border-accent/40">
                    <span
                      className="text-[10.5px] font-bold uppercase tracking-[0.16em]"
                      style={{ color: d.tone }}
                    >
                      {d.meaning}
                    </span>
                    <h3
                      className="display mt-3 text-4xl font-extrabold"
                      style={{ color: d.tone }}
                    >
                      {d.name}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-muted">
                      {d.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Principles />

        <Team />

        {/* partners */}
        <section className="relative bg-bg py-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                Who we build alongside.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                Universities, incubators, and operators across Pakistan — the
                network that makes the context behind every project real.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-12 flex flex-wrap gap-3">
                {PARTNERS.map((p) => (
                  <span
                    key={p}
                    className="rounded-xl border border-border bg-surface/50 px-5 py-3 text-[14px] text-muted transition-colors hover:border-accent/40 hover:text-fg"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* the line the whole place runs on */}
        <section className="relative overflow-hidden bg-bg py-24">
          <div className="mx-auto max-w-[900px] px-6 text-center">
            <Reveal>
              <p className="text-[14.5px] leading-relaxed text-muted">
                We take a limited number of projects each quarter, and every one
                of them has a name attached to it. That is the whole promise.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className="mt-8 text-3xl text-accent sm:text-4xl"
                style={{ fontFamily: "var(--font-script)" }}
              >
                Creating What History Can&apos;t Ignore
              </p>
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

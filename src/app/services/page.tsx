import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Services | Aqdaar",
  description:
    "Discovery and strategy, design and production, go-to-market, trainings, consultation, and industrial solutions — everything it takes to go from idea to market.",
};

const SERVICES = [
  {
    phase: "Dhundo",
    title: "Discovery & Strategy",
    body: "Market and competitor mapping, opportunity sizing, and a scoped direction everyone agrees on before a line of work gets built.",
    dri: "Hammad Hussain",
    points: ["Discovery call", "Gap analysis", "Opportunity sizing", "Scoped plan"],
    href: ROUTES.product,
    cta: "See how a project runs",
  },
  {
    phase: "Banao",
    title: "Design & Production",
    body: "Design, prototyping, and production support. Built to last rather than to demo, and shipped with a documented API.",
    dri: "Anas Imtiaz",
    points: ["Design & prototype", "Production build", "Documented API", "Handover"],
    href: ROUTES.solutions,
    cta: "Explore our solutions",
  },
  {
    phase: "Becho",
    title: "Go-to-Market",
    body: "Positioning, partnerships, and pilots — the work that gets a finished product in front of the people it was built for.",
    dri: "Faseeh Asghar",
    points: ["Positioning", "Partnerships", "Pilot programs", "Growth motion"],
    href: ROUTES.consultation,
    cta: "Talk to us",
  },
];

const ALSO = [
  {
    title: "Trainings",
    body: "Bootcamps, skills series, and short courses that turn ambition into capability.",
    dri: "Mr. Shoaib",
    href: ROUTES.trainings,
  },
  {
    title: "Consultation",
    body: "Strategic advisory for founders and organizations building products, platforms, spaces, or ecosystems.",
    dri: "Jamaluddin Ahmed Siddiqui",
    href: ROUTES.consultation,
  },
  {
    title: "Solutions",
    body: "Industrial-grade platforms — from AI-native GRC to manufacturing ERPs — built and deployed under Aqdaar.",
    dri: "Aquib ul Haq",
    href: ROUTES.solutions,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="What we do"
          title={
            <>
              Everything it takes to go
              <br />
              from <span className="text-gradient">idea to market.</span>
            </>
          }
          subtitle="Three divisions under one roof. Start at any phase — the rest is there when you need it."
        >
          <a
            href={ROUTES.consultation}
            className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
          >
            Book a Consultation
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </PageHero>

        {/* the three divisions, as services */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-5 lg:grid-cols-3">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1} className="h-full">
                  <div className="group flex h-full flex-col rounded-3xl border border-border bg-surface/50 p-8 transition-colors hover:border-accent/40">
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-mint">
                      {s.phase}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-fg">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-[14px] leading-relaxed text-muted">
                      {s.body}
                    </p>

                    <ul className="mt-6 space-y-2.5">
                      {s.points.map((p) => (
                        <li key={p} className="flex items-start gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span className="text-[13.5px] text-muted">{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-7">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-faint">DRI</span>
                        <span className="font-medium text-fg">{s.dri}</span>
                      </div>
                      <a
                        href={s.href}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                      >
                        {s.cta}
                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* the standalone offerings */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                And everything alongside it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-2xl text-[14.5px] leading-relaxed text-muted">
                Not every engagement is a full build. These run on their own,
                whenever you need them.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
              {ALSO.map((a) => (
                <a
                  key={a.title}
                  href={a.href}
                  className="group flex flex-col bg-bg p-8 transition-colors hover:bg-surface/40"
                >
                  <h3 className="text-xl font-bold text-fg transition-colors group-hover:text-accent">
                    {a.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                    {a.body}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-sm">
                    <span className="text-faint">DRI</span>
                    <span className="font-medium text-fg">{a.dri}</span>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Learn more
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Trainings | Aqdaar",
  description:
    "Bootcamps, skills series, short courses, and custom cohorts — training that turns ambition into capability.",
};

const PROGRAMS = [
  {
    kind: "Bootcamp",
    title: "Product Build Bootcamp",
    body: "Eight weeks from a rough idea to something you can put in front of users. Runs in the evenings so working teams can attend.",
    meta: ["8 weeks", "Evenings", "Karachi + remote"],
  },
  {
    kind: "Skills series",
    title: "Market Research & Gap Analysis",
    body: "The Dhundo method, taught the way we run it — how to size an opportunity and find what a market is actually missing.",
    meta: ["4 sessions", "Weekends", "Remote"],
  },
  {
    kind: "Short course",
    title: "Go-to-Market Essentials",
    body: "Positioning, pricing, and pilots for teams with a product built but not yet reaching the right people.",
    meta: ["2 weeks", "Evenings", "Karachi"],
  },
  {
    kind: "Custom cohort",
    title: "For your institution",
    body: "A curriculum shaped around your department, your stack, and your timelines. We have run these on campus and on factory floors.",
    meta: ["Scoped to fit", "On-site", "Nationwide"],
  },
];

const FOR_WHO = [
  "Universities running build sprints and capstone tracks",
  "Companies upskilling a team on a new stack or method",
  "Founders who want the method, not the outsourcing",
  "Institutions rolling training out across departments",
];

export default function TrainingsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Trainings"
          title={
            <>
              Turn ambition into
              <br />
              <span className="text-gradient">capability.</span>
            </>
          }
          subtitle="Bootcamps, skills series, and short courses — taught by the same people who run the projects, using the same method."
        >
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={ROUTES.contact}
              className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
            >
              Ask about the next cohort
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <span className="flex items-center gap-2 rounded-xl border border-border bg-surface/50 px-5 py-3.5 text-sm">
              <span className="text-faint">DRI</span>
              <span className="font-medium text-fg">Mr. Shoaib</span>
            </span>
          </div>
        </PageHero>

        {/* programs */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2">
              {PROGRAMS.map((p) => (
                <div key={p.title} className="flex flex-col bg-bg p-8">
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-mint">
                    {p.kind}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-fg">{p.title}</h2>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-muted">
                    {p.body}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.meta.map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* who it's for */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto grid max-w-[1200px] items-start gap-12 px-6 lg:grid-cols-2">
            <div>
              <Reveal>
                <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                  Who these are for.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-[14.5px] leading-relaxed text-muted">
                  Seats are limited so every cohort keeps a real instructor
                  ratio. Custom cohorts are scheduled around you.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <ul className="space-y-3">
                {FOR_WHO.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-border bg-surface/50 px-5 py-4"
                  >
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span className="text-[14px] leading-relaxed text-muted">
                      {f}
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

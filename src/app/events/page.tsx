import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Events | Aqdaar",
  description:
    "Build sprints, founder sessions, and demo nights — where the Aqdaar community meets. Upcoming and past events.",
};

/* Placeholder listings — swap for the real calendar when it's confirmed. */
const UPCOMING = [
  {
    date: "AUG 02, 2026",
    title: "Karachi Build Sprint",
    venue: "NIC Karachi",
    body: "One weekend, one brief, no clear answer. Teams ship something demoable by Sunday evening.",
    tag: "Sprint",
  },
  {
    date: "AUG 19, 2026",
    title: "Founder Session: Finding Your Gap",
    venue: "Habib University",
    body: "An open walkthrough of the Dhundo method, using a live market the room picks on the night.",
    tag: "Session",
  },
  {
    date: "SEP 06, 2026",
    title: "Demo Night — Q3 Cohort",
    venue: "Katalyst Lab",
    body: "The autumn cohort puts what they built in front of a room of operators, partners, and pilots.",
    tag: "Demo",
  },
];

const PAST = [
  { date: "JUN 21, 2026", title: "Startup Grind Lahore", venue: "Lahore" },
  { date: "MAY 30, 2026", title: "Skillvention Workshop", venue: "Karachi" },
  { date: "APR 12, 2026", title: "NED Product Teardown", venue: "NED University" },
];

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Events"
          title={
            <>
              Where the work
              <br />
              gets <span className="text-gradient">shown.</span>
            </>
          }
          subtitle="Build sprints, founder sessions, and demo nights across Karachi, Lahore, and campuses nationwide. Open to anyone building something."
        >
          <a
            href="mailto:events@aqdaar.org"
            className="bg-primary-gradient on-accent group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5"
          >
            events@aqdaar.org
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </PageHero>

        {/* upcoming */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                Coming up.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-3">
              {UPCOMING.map((e) => (
                <div key={e.title} className="flex flex-col bg-bg p-8">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                      {e.date}
                    </span>
                    <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted">
                      {e.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[22px] font-bold leading-tight text-fg">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-[13px] text-accent">{e.venue}</p>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                    {e.body}
                  </p>
                  <a
                    href="mailto:events@aqdaar.org"
                    className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                  >
                    Register interest
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* past */}
        <section className="relative bg-bg py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
                Already happened.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 overflow-hidden rounded-3xl border border-border">
                {PAST.map((e, i) => (
                  <div
                    key={e.title}
                    className={`flex flex-col gap-1 bg-surface/30 px-7 py-5 sm:flex-row sm:items-center sm:gap-6 ${
                      i > 0 ? "border-t border-border" : ""
                    }`}
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint sm:w-36">
                      {e.date}
                    </span>
                    <span className="flex-1 text-[15px] font-semibold text-fg">
                      {e.title}
                    </span>
                    <span className="text-[13px] text-muted">{e.venue}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

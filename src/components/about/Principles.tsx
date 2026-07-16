"use client";

import Reveal from "@/components/ui/Reveal";

/* How we work — each one is a claim the rest of the site has to live up to. */
const PRINCIPLES = [
  {
    n: "01",
    title: "One team, end to end",
    body: "Discovery, build, and go-to-market run under one roof. Nothing gets lost in a handover between three vendors who have never met.",
  },
  {
    n: "02",
    title: "A name, not a queue",
    body: "Every area has a directly responsible individual. You always know exactly who owns your project and how to reach them.",
  },
  {
    n: "03",
    title: "Start at any phase",
    body: "Come with the plan settled and only need the build. Come with a finished product that isn't selling and only need go-to-market. The rest is there when you need it.",
  },
  {
    n: "04",
    title: "Built to last, not to demo",
    body: "Everything we ship comes with a documented API, so it connects to whatever comes next — with or without us in the loop.",
  },
  {
    n: "05",
    title: "Limited projects per quarter",
    body: "The DRI model doesn't scale by piling projects onto the same people. So we cap the quarter instead. It costs us revenue; it's the difference between a studio and a queue.",
  },
  {
    n: "06",
    title: "The groundwork is the work",
    body: "Research, teardowns, and first drafts are not a formality before the real project. They are what stops the real project being a guess.",
  },
];

export default function Principles() {
  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <span className="text-[11.5px] font-bold uppercase tracking-[0.2em] text-accent">
            How we work
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mt-5 text-4xl font-bold text-fg sm:text-5xl">
            Six things we don&apos;t bend on.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="flex flex-col bg-bg p-8">
              <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                {p.n}
              </span>
              <h3 className="mt-4 text-xl font-bold text-fg">{p.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

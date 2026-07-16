"use client";

import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";

const REVIEWS = [
  {
    name: "Client Name",
    role: "Founder, Startup",
    quote:
      "Aqdaar took us from a rough idea to a launched product — the Dhundo phase alone reshaped our whole direction.",
    initials: "CN",
  },
  {
    name: "Trainee Name",
    role: "Bootcamp Graduate",
    quote:
      "The trainings turned my ambition into an actual, hireable skillset. Practical, intense, and worth every hour.",
    initials: "TN",
  },
  {
    name: "Partner Name",
    role: "Head of Ops, Institution",
    quote:
      "Their consultation gave us the strategy and the systems to scale. A genuine kingmaker for our team.",
    initials: "PN",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-accent" aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-28">
      <SoftGlow />
      <div className="relative mx-auto max-w-[1300px] px-6">
        <Reveal>
          <h2 className="display text-4xl font-bold sm:text-5xl">
            What people say
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface/40 p-6">
                <Stars />
                <blockquote className="mt-4 flex-1 text-fg/90">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                    {r.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-fg">
                      {r.name}
                    </span>
                    <span className="block text-xs text-muted">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

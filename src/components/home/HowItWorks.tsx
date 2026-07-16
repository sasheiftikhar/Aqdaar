"use client";

import Reveal from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Dhundo", body: "Discovery & strategy call." },
  { n: "02", title: "Banao", body: "Design, prototype & production support." },
  { n: "03", title: "Becho", body: "Go-to-market, sales & scale." },
];

export default function HowItWorks() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <Reveal>
          <h2 className="display text-4xl font-bold sm:text-5xl">
            How it works
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative h-full rounded-2xl border border-border bg-surface/40 p-8">
                <span className="display text-5xl font-bold text-border">
                  {s.n}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-fg">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
                {i < STEPS.length - 1 && (
                  <span className="absolute right-6 top-8 hidden text-2xl text-accent md:block">
                    →
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

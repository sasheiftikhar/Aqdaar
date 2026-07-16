"use client";

import Reveal from "@/components/ui/Reveal";

const PAINS = [
  "Idea hai lekin planning confuse hai?",
  "Product banane mein resources ki kami?",
  "Bana toh liya, bech nahi paa rahe?",
];

export default function Problem() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {PAINS.map((p, i) => (
            <Reveal key={p} delay={i * 0.1}>
              <div className="flex h-full items-center gap-4 rounded-2xl border border-border bg-surface/40 p-6">
                <span className="text-3xl leading-none text-accent">“</span>
                <p className="text-lg font-medium text-fg">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

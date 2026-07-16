"use client";

import Reveal from "@/components/ui/Reveal";
import SoftGlow from "@/components/ui/SoftGlow";

const OFFERINGS = [
  {
    title: "Trainings",
    body: "Bootcamps, skills series, and short courses that turn ambition into capability.",
    dri: "Mr. Shoaib",
    cta: "Explore Trainings",
    href: "#trainings",
  },
  {
    title: "Consultation",
    body: "Strategic advisory for founders and organizations building products, platforms, spaces, or ecosystems.",
    dri: "Jamaluddin Ahmed Siddiqui",
    cta: "Book Consultation",
    href: "#consult",
  },
  {
    title: "Solutions",
    body: "Industrial-grade platforms — from AI-native GRC to manufacturing ERPs — built and deployed under Aqdaar.",
    dri: "Aquib ul Haq",
    cta: "View Solutions",
    href: "#solutions",
  },
];

export default function Offerings() {
  return (
    <section
      id="offerings"
      className="relative overflow-hidden py-28"
    >
      <SoftGlow />
      <div className="relative mx-auto max-w-[1300px] px-6">
        <Reveal>
          <h2 className="display text-4xl font-bold sm:text-5xl">
            Our Offerings
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {OFFERINGS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.1}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-surface/40 p-8 transition-colors hover:border-accent/40">
                <h3 className="text-2xl font-bold text-fg">{o.title}</h3>
                <p className="mt-4 flex-1 text-muted">{o.body}</p>
                <div className="mt-6 flex items-center gap-2 text-sm text-muted">
                  <span className="text-faint">DRI</span>
                  <span className="font-medium text-fg">{o.dri}</span>
                </div>
                <a
                  href={o.href}
                  className="mt-6 inline-flex items-center gap-2 font-medium text-accent"
                >
                  {o.cta} →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

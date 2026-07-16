"use client";

import Reveal from "@/components/ui/Reveal";

export default function Harness() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[900px] px-6 text-center">
        <Reveal>
          <h2 className="display text-4xl font-bold sm:text-5xl">
            You define the what.{" "}
            <span className="text-muted">Aqdaar handles the how.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Most agent platforms hand you a model or a scripting language and
            wish you luck. The Aqdaar Agent Harness stacks infrastructure,
            intelligence, and intent — learning across all customers, tasks, and
            sources to close every gap.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

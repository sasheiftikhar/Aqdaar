"use client";

import Reveal from "@/components/ui/Reveal";

export default function ContactMap() {
  return (
    <section className="relative bg-bg pb-24">
      <div className="mx-auto max-w-[1000px] px-6">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-border shadow-2xl">
            <iframe
              title="Aqdaar location — Karachi, Pakistan"
              src="https://maps.google.com/maps?q=National+Incubation+Center+Karachi+Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="420"
              style={{ display: "block", border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

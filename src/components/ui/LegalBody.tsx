import type { ReactNode } from "react";

/**
 * Prose shell for the legal pages. They share one rhythm so Privacy and Terms
 * never drift apart typographically.
 */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[760px] px-6">{children}</div>
    </section>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-border py-9 first:border-t-0 first:pt-0">
      <h2 className="text-xl font-bold text-fg">{heading}</h2>
      <div className="mt-4 space-y-4 text-[14.5px] leading-relaxed text-muted">
        {children}
      </div>
    </div>
  );
}

import Reveal from "@/components/ui/Reveal";
import { ROUTES } from "@/lib/nav";

/**
 * The bento — three divisions on the top row, the three standalone offerings
 * below them.
 *
 * The split is the point: the top row is the pipeline (a project moves through
 * Dhundo → Banao → Becho), the bottom row is what you can book on its own. Same
 * card language for both so the page reads as one set, different weight so the
 * hierarchy is obvious.
 */

const DIVISIONS = [
  {
    phase: "Dhundo",
    title: "Discovery & Strategy",
    body: "Market and competitor mapping, opportunity sizing, and a scoped direction everyone agrees on before a line of work gets built.",
    dri: "Hammad Hussain",
    points: ["Discovery call", "Gap analysis", "Opportunity sizing", "Scoped plan"],
    href: ROUTES.product,
    icon: "search",
  },
  {
    phase: "Banao",
    title: "Design & Production",
    body: "Design, prototyping, and production support. Built to last rather than to demo, and shipped with a documented API.",
    dri: "Anas Imtiaz",
    points: ["Design & prototype", "Production build", "Documented API", "Handover"],
    href: ROUTES.solutions,
    icon: "build",
  },
  {
    phase: "Becho",
    title: "Go-to-Market",
    body: "Positioning, partnerships, and pilots — the work that gets a finished product in front of the people it was built for.",
    dri: "Faseeh Asghar",
    points: ["Positioning", "Partnerships", "Pilot programs", "Growth motion"],
    href: ROUTES.consultation,
    icon: "launch",
  },
] as const;

const OFFERINGS = [
  {
    title: "Trainings",
    body: "Bootcamps, skills series, and short courses that turn ambition into capability.",
    dri: "Mr. Shoaib",
    href: ROUTES.trainings,
    icon: "book",
  },
  {
    title: "Consultation",
    body: "Strategic advisory for founders and organizations building products, platforms, spaces, or ecosystems.",
    dri: "Jamaluddin Ahmed Siddiqui",
    href: ROUTES.consultation,
    icon: "compass",
  },
  {
    title: "Solutions",
    body: "Industrial-grade platforms — from AI-native GRC to manufacturing ERPs — built and deployed under Aqdaar.",
    dri: "Aquib ul Haq",
    href: ROUTES.solutions,
    icon: "layers",
  },
] as const;

export default function ServicesGrid() {
  return (
    <section id="services" className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* header — heading left, pill CTA right, as in the reference */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <div>
              <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                <StarIcon />
                Services
              </span>
              <h2 className="display mt-4 text-4xl font-bold text-fg sm:text-5xl">
                Browse what we
                <br />
                actually <span className="text-gradient">do.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={ROUTES.consultation}
              className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface/60 py-2 pr-2 pl-6 text-[12px] font-bold uppercase tracking-[0.12em] text-fg transition-colors hover:border-accent/50"
            >
              Book a Consultation
              <span className="bg-primary-gradient on-accent flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          </Reveal>
        </div>

        {/* top row — the pipeline */}
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {DIVISIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <a
                href={s.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-surface/50 p-8 transition-colors hover:border-accent/40"
              >
                <span className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-mint">
                  {s.phase}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-fg">{s.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  {s.body}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="text-[13.5px] text-muted">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-faint">DRI</span>
                    <span className="font-medium text-fg">{s.dri}</span>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface-2 text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <Icon name={s.icon} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* bottom row — book these on their own */}
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {OFFERINGS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.08} className="h-full">
              <a
                href={o.href}
                className="group flex h-full flex-col rounded-3xl border border-border bg-surface/30 p-7 transition-colors hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-fg transition-colors group-hover:text-accent">
                    {o.title}
                  </h3>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                    <Icon name={o.icon} />
                  </span>
                </div>
                <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                  {o.body}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm">
                  <span className="text-faint">DRI</span>
                  <span className="font-medium text-fg">{o.dri}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
      <path d="M12 2l2.4 6.5L21 11l-6.6 2.5L12 20l-2.4-6.5L3 11l6.6-2.5L12 2z" />
    </svg>
  );
}

const PATHS: Record<string, string> = {
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm5 12l4 4",
  build: "M4 20h16M6 16V8m6 8V4m6 12v-6",
  launch: "M5 19l4-1 8-8a2.8 2.8 0 1 0-4-4l-8 8-1 4zM14 5l4 4",
  book: "M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2V4zm2 0v14",
  compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm3.5 5.5l-2 5-5 2 2-5 5-2z",
  layers: "M12 3l9 5-9 5-9-5 9-5zm9 11l-9 5-9-5",
};

function Icon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

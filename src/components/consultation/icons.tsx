/**
 * Line icons for the consultation areas and the process row.
 *
 * Stroked with `currentColor` at 1.5 so they sit at the same visual weight as
 * the rest of the page — set the colour on the wrapper, not here.
 */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ── areas ─────────────────────────────────────────────────────── */

/** Strategy & Planning — a target being aimed at. */
export function StrategyIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <path d="M12 3.5V1M12 23v-2.5M3.5 12H1M23 12h-2.5" />
    </svg>
  );
}

/** Leadership Development — a figure ahead of the group. */
export function LeadershipIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="6" r="3" />
      <path d="M6.5 20v-1.5A5.5 5.5 0 0 1 12 13a5.5 5.5 0 0 1 5.5 5.5V20" />
      <path d="M4 10.5a2 2 0 1 0 0-.1M20 10.5a2 2 0 1 0 0-.1" />
      <path d="M1.5 20v-.8a3.5 3.5 0 0 1 2.8-3.4M22.5 20v-.8a3.5 3.5 0 0 0-2.8-3.4" />
    </svg>
  );
}

/** Market Entry — a door opened into new ground. */
export function MarketIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 21V4.5A1.5 1.5 0 0 1 4.5 3h8A1.5 1.5 0 0 1 14 4.5V21" />
      <path d="M1.5 21h21" />
      <path d="M10.5 12.5v1" />
      <path d="M17.5 21v-7.5h4V21" />
      <path d="M17.5 10.5 19.5 7l2 3.5" />
    </svg>
  );
}

/** Growth Advisory — a line breaking upward. */
export function GrowthIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 20V4" />
      <path d="M3 20h18" />
      <path d="m6.5 15.5 4-4.5 3.5 3 5.5-6.5" />
      <path d="M15.5 7.5h4v4" />
    </svg>
  );
}

/* ── process ───────────────────────────────────────────────────── */

/** Discovery Call. */
export function CallIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h2.2a1 1 0 0 1 1 .8l.7 3a1 1 0 0 1-.5 1.1L7.4 9.8a11 11 0 0 0 5.3 5.3l.9-1.5a1 1 0 0 1 1.1-.5l3 .7a1 1 0 0 1 .8 1v2.2a1.5 1.5 0 0 1-1.5 1.5A13.5 13.5 0 0 1 4 5.5Z" />
      <path d="M15 4.5a5 5 0 0 1 4.5 4.5" />
      <path d="M14.5 8a2 2 0 0 1 1.6 1.6" />
    </svg>
  );
}

/** Assessment. */
export function AssessIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M8 3.5h8a1.5 1.5 0 0 1 1.5 1.5v14A1.5 1.5 0 0 1 16 20.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5Z" />
      <path d="M9.5 8.5h5M9.5 12h5M9.5 15.5h2.5" />
      <circle cx="16.5" cy="15.5" r="3.5" />
      <path d="m19 18 2.5 2.5" />
    </svg>
  );
}

/** Roadmap. */
export function RoadmapIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M5 8v4a3 3 0 0 0 3 3h8a3 3 0 0 1 3 3" />
      <path d="M9.5 6h9M9.5 6l2-2M9.5 6l2 2" />
    </svg>
  );
}

/** Ongoing Support. */
export function SupportIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="m6 6 3.5 3.5M18 6l-3.5 3.5M6 18l3.5-3.5M18 18l-3.5-3.5" />
    </svg>
  );
}

export const AREA_ICONS: Record<
  string,
  (p: IconProps) => React.JSX.Element
> = {
  strategy: StrategyIcon,
  leadership: LeadershipIcon,
  "market-entry": MarketIcon,
  growth: GrowthIcon,
};

export const PROCESS_ICONS: ((p: IconProps) => React.JSX.Element)[] = [
  CallIcon,
  AssessIcon,
  RoadmapIcon,
  SupportIcon,
];

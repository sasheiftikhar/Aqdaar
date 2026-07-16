/**
 * Everything the Consultation page renders, in one place.
 *
 * The four areas, the three flagship programs, the process, and the case
 * studies all live here so copy edits never mean touching a component.
 */

export type Area = {
  slug: string;
  label: string;
  title: string;
  blurb: string;
  tone: string;
  points: string[];
};

/** The four areas we consult on — these drive the icon rail and the detail panel. */
export const AREAS: Area[] = [
  {
    slug: "strategy",
    label: "Strategy & Planning",
    title: "Strategy & Planning",
    blurb:
      "Before anything gets built or spent on, we get the direction right — where you play, what you win on, and what you deliberately say no to.",
    tone: "#cabfe1",
    points: [
      "Positioning and a sharpened value proposition",
      "12-month roadmap with sequenced, costed bets",
      "Business model and unit-economics pressure test",
      "The metric that actually tells you it's working",
    ],
  },
  {
    slug: "leadership",
    label: "Leadership Development",
    title: "Leadership Development",
    blurb:
      "Growth stalls at the level of the people running it. We build the operating rhythm, the bench, and the accountability that carries the next stage.",
    tone: "#b4d9ce",
    points: [
      "Founder and executive one-on-one advisory",
      "Org design with a named owner per outcome",
      "Decision and meeting cadence that holds",
      "Hiring plans and succession for key seats",
    ],
  },
  {
    slug: "market-entry",
    label: "Market Entry",
    title: "Market Entry",
    blurb:
      "A new market punishes assumptions. We validate demand, map the regulatory and channel reality, then land you with a plan you can fund.",
    tone: "#f5efd3",
    points: [
      "Demand validation before the spend",
      "Competitor and channel landscape mapping",
      "Regulatory, pricing, and partner groundwork",
      "A first-90-days entry plan with real numbers",
    ],
  },
  {
    slug: "growth",
    label: "Growth Advisory",
    title: "Growth Advisory",
    blurb:
      "You have traction and it has plateaued. We find the constraint that's actually holding the line flat and build the engine past it.",
    tone: "#afa3bf",
    points: [
      "Funnel and retention diagnostic, end to end",
      "Go-to-market and sales motion rebuild",
      "Pricing and packaging revisions",
      "Quarterly operating reviews with your team",
    ],
  },
];

export type Program = {
  slug: string;
  title: string;
  kicker: string;
  dri: string;
  partner: string;
  timeline: string;
  venue: string;
  tone: string;
};

/** Flagship programs and events we run alongside the advisory work. */
export const PROGRAMS: Program[] = [
  {
    slug: "guman",
    title: "Guman 2.0 Leadership Conference",
    kicker: "Leadership",
    dri: "Priety Khatri",
    partner: "Lp92.org",
    timeline: "August",
    venue: "Liaquat National Hospital (on-site)",
    tone: "#cabfe1",
  },
  {
    slug: "startup-worldcup",
    title: "Pakistan Startup Worldcup — Qualifier",
    kicker: "Startups",
    dri: "Aatir Faruki",
    partner: "Startup Grind Lahore",
    timeline: "July + August",
    venue:
      "NIC Karachi, Bahria University, IOBM, IBA, PSX Trading Den, NIC Hyderabad, Katalyst Lab",
    tone: "#b4d9ce",
  },
  {
    slug: "yes-youth-parliament",
    title: "Young Entrepreneurs Summit — Youth Parliament",
    kicker: "Youth",
    dri: "Aquib ul Haq",
    partner: "GMS Consultant",
    timeline: "12 August 2022",
    venue: "PC Hotel, Zevar Banquet",
    tone: "#f5efd3",
  },
];

export type Step = {
  n: string;
  title: string;
  body: string;
  tone: string;
};

/** Discovery Call → Assessment → Roadmap → Ongoing Support. */
export const PROCESS: Step[] = [
  {
    n: "01",
    title: "Discovery Call",
    body: "A free call to understand the stage you're at. You leave with a straight answer on whether we're the right fit — no deck required.",
    tone: "#cabfe1",
  },
  {
    n: "02",
    title: "Assessment",
    body: "We go through the business as it actually runs — numbers, team, market — and name the constraint holding growth back.",
    tone: "#b4d9ce",
  },
  {
    n: "03",
    title: "Roadmap",
    body: "A sequenced plan against a defined scope, with a real timeline and price. Every step has an owner and a way to tell it worked.",
    tone: "#f5efd3",
  },
  {
    n: "04",
    title: "Ongoing Support",
    body: "We stay on through execution — quarterly reviews, a line to your DRI, and course correction when the market moves.",
    tone: "#afa3bf",
  },
];

export type Scenario = {
  area: string;
  title: string;
  situation: string;
  body: string;
  outcome: string[];
};

/**
 * Illustrative engagement scenarios — NOT case studies.
 *
 * These describe how the work actually runs in each area. They deliberately
 * make no claim about a specific client or a specific number, because none of
 * that has been supplied or signed off yet, and the section is labelled as
 * illustrative on the page to match.
 *
 * When real case studies land: give each entry a client, a sector, and a
 * verified result, swap the section heading back to "Case studies", and drop
 * the illustrative note in CaseStudies.tsx. Quotes go in only with the
 * client's written approval and their real name attached.
 */
export const SCENARIOS: Scenario[] = [
  {
    area: "Strategy & Planning",
    title: "The plan that hasn't survived its own numbers",
    situation: "Growth targets set, no model underneath them",
    body: "A team arrives with an ambitious plan and a spreadsheet that only works if every assumption lands. The assessment usually finds the target was set before the unit economics were understood — so we rebuild the model first, then re-sequence the roadmap against what the business can actually fund.",
    outcome: [
      "A costed roadmap you can defend to a board or a lender",
      "The two or three bets that matter, and the ones dropped",
      "One metric per bet that tells you early if it's working",
    ],
  },
  {
    area: "Market Entry",
    title: "The market that looked open from the outside",
    situation: "A new city, segment, or country on the table",
    body: "The assumption that rarely survives contact is that demand transfers. We test it before the spend — talking to buyers in the target market, mapping the channel and regulatory reality, and pricing against who's already there. Sometimes the honest answer is that the entry shouldn't happen yet.",
    outcome: [
      "Demand validated — or disproven — before the capital goes out",
      "Channel, partner, and regulatory groundwork mapped",
      "A first-90-days plan with real numbers against it",
    ],
  },
  {
    area: "Leadership Development",
    title: "The founder who is still the bottleneck",
    situation: "Every decision routes through one person",
    body: "The business has outgrown the way it's run: the founder is in every call, nothing ships without them, and good people are leaving because they own nothing. The work is org design with a named owner per outcome, plus the decision cadence that makes delegation stick instead of quietly reverting.",
    outcome: [
      "A DRI on every outcome, not a committee",
      "An operating rhythm that holds without the founder in the room",
      "Hiring and succession mapped for the seats that matter",
    ],
  },
  {
    area: "Growth Advisory",
    title: "The line that went flat and stayed flat",
    situation: "Real traction, plateaued",
    body: "Traction is real but the curve has gone horizontal, and the instinct is to spend more on acquisition. More often the constraint is retention, pricing, or a sales motion that stopped fitting the segment. We diagnose the funnel end to end before anyone touches the ad budget.",
    outcome: [
      "The actual constraint named, with evidence",
      "Pricing and packaging revised against what buyers value",
      "Quarterly operating reviews with your team, not a slide deck",
    ],
  },
];

/** The lead consultant and the people behind him. */
export const LEAD = {
  name: "Jamaluddin Ahmed Siddiqui",
  role: "Lead Consultant · Consultation",
  initials: "JS",
  bio: "Jamaluddin leads every consulting engagement at Aqdaar. He takes the discovery call himself, owns the assessment, and stays the name on the account through delivery — you are never handed to a queue.",
  credentials: [
    "Takes the first call personally — not an account manager",
    "Owns the assessment and the roadmap end to end",
    "Stays on the account through execution",
    "Backed by DRIs across Dhundo, Banao, and Becho",
  ],
};

export const SUPPORTING = [
  { name: "Hammad Hussain", role: "Dhundo · Discover & Plan", initials: "HH" },
  { name: "Anas Imtiaz", role: "Banao · Build & Produce", initials: "AI" },
  { name: "Faseeh Asghar", role: "Becho · Sell & Scale", initials: "FA" },
  { name: "Aquib ul Haq", role: "Solutions", initials: "AH" },
];

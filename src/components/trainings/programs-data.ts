/**
 * The training catalogue — one source of truth.
 *
 * The filter chips, the card grid, the detail panel, and the batch calendar all
 * read from here, so a program can never show one timeline in the grid and a
 * different one in the calendar.
 *
 * PRICING IS PLACEHOLDER. `fee` and `earlyBird` below are written to be
 * replaced — swap in the real numbers and deadlines before this page ships.
 */

export type Category = "Bootcamps" | "Skills Series" | "Short Courses";

export const CATEGORIES: Category[] = [
  "Bootcamps",
  "Skills Series",
  "Short Courses",
];

export type Program = {
  slug: string;
  category: Category;
  /** "Dexter Lab" — the line above the program name on a card. */
  family: string;
  title: string;
  blurb: string;
  /** Directly responsible individual — the person who owns the cohort. */
  dri: string;
  driRole: string;
  driBio: string;
  partner: string;
  timeline: string;
  location: string;
  /** Palette tone this program is keyed to across the page. */
  tone: string;
  curriculum: { week: string; title: string; body: string }[];
  batches: { label: string; when: string; note: string }[];
  fee: string;
  earlyBird: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "startup-bootcamp",
    category: "Bootcamps",
    family: "Dexter Lab",
    title: "Startup Bootcamp",
    blurb:
      "Take an idea from rough to real. The bootcamp runs the full Aqdaar arc — find the gap, scope the build, then put it in front of buyers — on your own idea, not a case study.",
    dri: "Faseeh Asghar",
    driRole: "Becho · Sell & Scale",
    driBio:
      "Faseeh runs Becho, the division that takes finished products to market. He has spent the last several years on the side of the work most bootcamps skip — pricing, positioning, and getting a first pilot signed. He teaches the bootcamp the way he runs client engagements.",
    partner: "GMS Consultant",
    timeline: "July",
    location: "Online",
    tone: "#cabfe1",
    curriculum: [
      {
        week: "Week 01",
        title: "Dhundo — start with the market",
        body: "Size the opportunity before you fall in love with the idea. Map who already serves this market and where they leave people stranded.",
      },
      {
        week: "Week 02",
        title: "Gap analysis on your own idea",
        body: "Run the method on the thing you actually came in with. Most people leave this week pointed somewhere different than they arrived.",
      },
      {
        week: "Week 03",
        title: "Banao — scope the smallest real build",
        body: "Write the cut list: what ships, what waits, what dies. Then defend the cuts to a room that wanted more.",
      },
      {
        week: "Week 04",
        title: "Becho — price it and sell it",
        body: "Positioning that survives a sales call, and pricing a first pilot without guessing. Ends with a demo to a real panel.",
      },
    ],
    batches: [
      {
        label: "Batch 01",
        when: "July · Evenings",
        note: "Online · open for enrolment",
      },
      {
        label: "Batch 02",
        when: "August · Evenings",
        note: "Online · waitlist",
      },
    ],
    fee: "Fee on request",
    earlyBird: "Early-bird pricing open until the batch fills",
  },
  {
    slug: "ai-for-everyone",
    category: "Skills Series",
    family: "AI for Everyone",
    title: "AI Skills Series",
    blurb:
      "AI without the hype. What the tools actually do, where they quietly break, and how to put them to work in the job you already have — run across three campuses with Skillvention.",
    dri: "Mr. Shoaib",
    driRole: "Trainings",
    driBio:
      "Shoaib owns training at Aqdaar and scopes every custom cohort himself. He has run this series on campuses and on factory floors, which is why it assumes no background and still gets to something useful by the second session.",
    partner: "Skillvention",
    timeline: "July + August",
    location: "Dreamworld, CEGA, Ashrei Tech Academy",
    tone: "#b4d9ce",
    curriculum: [
      {
        week: "Session 01",
        title: "What these tools actually are",
        body: "No jargon and no hype. What a model can do, what it only appears to do, and how to tell the difference in your own work.",
      },
      {
        week: "Session 02",
        title: "Putting AI into your day job",
        body: "The tasks worth handing over and the ones you should not. Built around the work the room actually does.",
      },
      {
        week: "Session 03",
        title: "Where it breaks",
        body: "Confident wrong answers, quiet failures, and the checks that catch them before someone else does.",
      },
      {
        week: "Session 04",
        title: "Build something small",
        body: "Leave with one working thing you made yourself — not a certificate saying you watched.",
      },
    ],
    batches: [
      {
        label: "Campus 01",
        when: "July",
        note: "Dreamworld · open for enrolment",
      },
      { label: "Campus 02", when: "July", note: "CEGA · open for enrolment" },
      {
        label: "Campus 03",
        when: "August",
        note: "Ashrei Tech Academy · enrolling",
      },
    ],
    fee: "Fee on request",
    earlyBird: "Early-bird rate for institutional groups",
  },
  {
    slug: "digital-short-courses",
    category: "Short Courses",
    family: "Dexter Lab",
    title: "Digital Short Courses",
    blurb:
      "Short, onsite, one skill at a time. Pick the course your team needs, block two weeks, and leave with the skill — not a folder of slides nobody opens again.",
    dri: "Mr. Shoaib",
    driRole: "Trainings",
    driBio:
      "Shoaib owns training at Aqdaar and scopes every custom cohort himself. The short courses exist because teams kept asking for one specific piece of the bootcamp rather than the whole eight weeks.",
    partner: "GMS Consultant",
    timeline: "August onward",
    location: "Onsite",
    tone: "#f5efd3",
    curriculum: [
      {
        week: "Course 01",
        title: "Market research, condensed",
        body: "The Dhundo method in two weeks: size an opportunity, map the operators, and find what the market is missing.",
      },
      {
        week: "Course 02",
        title: "Scoping a build that ships",
        body: "Cut a brief down to the smallest thing worth building, and hold the line when everyone wants more.",
      },
      {
        week: "Course 03",
        title: "Go-to-market essentials",
        body: "Positioning, pricing, and pilots for a team with a product built but not yet reaching the right people.",
      },
      {
        week: "Course 04",
        title: "APIs your team can actually use",
        body: "Designing and documenting an API as part of the build, not as the project nobody gets around to.",
      },
    ],
    batches: [
      { label: "Intake 01", when: "August", note: "Onsite · enrolling" },
      { label: "Intake 02", when: "September", note: "Onsite · scheduling" },
      { label: "Intake 03", when: "October onward", note: "Onsite · by request" },
    ],
    fee: "Fee on request",
    earlyBird: "Early-bird rate when two or more courses are booked together",
  },
];

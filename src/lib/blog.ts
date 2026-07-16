/**
 * Blog content source.
 *
 * Dummy posts for now — swap this array for the real CMS/MDX source when it
 * lands. Everything downstream (listing, filters, RSS feed) reads from here,
 * so the shape below is the only contract that matters.
 *
 * The first post carrying `featured: true` gets the large hero card; each
 * category falls back to its most recent post if none is flagged.
 */

import { BODIES } from "@/lib/blog-bodies";

export type Category =
  | "Dispatch"
  | "Case Studies"
  | "Company"
  | "Community"
  | "Engineering";

export const CATEGORIES: Category[] = [
  "Dispatch",
  "Case Studies",
  "Company",
  "Community",
  "Engineering",
];

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO — formatted for display at render time
  author: string;
  category: Category;
  featured?: boolean;
  /** Small line above the title on the hero card's visual. */
  kicker?: string;
  /** Big text on the hero card's visual, when no cover image exists yet. */
  visualTitle?: string;
  /** Article body. A plain string is a paragraph; "## " marks a heading. */
  body: string[];
};

/** Listing metadata. Bodies live in blog-bodies.ts and are attached below. */
const POSTS_META: Omit<Post, "body">[] = [
  {
    slug: "one-studio-behind-every-project",
    title: "One Studio Behind Every Aqdaar Project",
    excerpt:
      "Dhundo, Banao, and Becho now run as a single engine — discover the opportunity, build the product, and take it to market without handing off between teams.",
    date: "2026-07-08",
    author: "Hammad Hussain",
    category: "Company",
    featured: true,
    kicker: "Introducing",
    visualTitle: "Aqdaar Studio",
  },
  {
    slug: "dispatch-14",
    title: "Aqdaar Dispatch #14",
    excerpt:
      "Studio opens to outside teams, two pilot partners go live in Karachi logistics, and the training cohort doubles for the autumn intake.",
    date: "2026-07-15",
    author: "Faseeh Asghar",
    category: "Dispatch",
  },
  {
    slug: "karachi-logistics-gap",
    title: "How a Karachi Logistics Startup Found Its Gap in Two Weeks",
    excerpt:
      "Fourteen operators mapped, three underserved routes surfaced, and a scoped MVP — what the first two weeks of Dhundo actually produced.",
    date: "2026-07-14",
    author: "Hammad Hussain",
    category: "Case Studies",
  },
  {
    slug: "documented-api-by-default",
    title: "Every Product We Ship Comes With a Documented API",
    excerpt:
      "Why we treat the API as part of the build rather than a follow-up project, and what that means the day you want to connect something new.",
    date: "2026-07-13",
    author: "Anas Imtiaz",
    category: "Engineering",
  },
  {
    slug: "startup-grind-lahore",
    title: "Startup Grind Lahore: What Founders Kept Asking Us",
    excerpt:
      "Three questions came up at almost every table — about validation, cost, and who actually owns the build. Here are the answers we gave.",
    date: "2026-07-11",
    author: "Faseeh Asghar",
    category: "Community",
  },
  {
    slug: "context-window-design",
    title: "Designing the Context Window Behind Studio",
    excerpt:
      "Market research, past projects, brand, and our partner network feed one shared context. Here's how we keep it current without keeping it noisy.",
    date: "2026-07-09",
    author: "Anas Imtiaz",
    category: "Engineering",
  },
  {
    slug: "manufacturer-erp-rebuild",
    title: "Rebuilding a Manufacturer's ERP Without Stopping the Line",
    excerpt:
      "A six-week Banao engagement on a factory floor that couldn't afford downtime — what we cut, what we kept, and what shipped first.",
    date: "2026-07-04",
    author: "Aquib ul Haq",
    category: "Case Studies",
  },
  {
    slug: "dispatch-13",
    title: "Aqdaar Dispatch #13",
    excerpt:
      "The gap-mapping method gets written down, Becho picks up two institutional partners, and we open Q3 slots earlier than planned.",
    date: "2026-07-01",
    author: "Faseeh Asghar",
    category: "Dispatch",
  },
  {
    slug: "habib-university-build-sprint",
    title: "Inside the Habib University Build Sprint",
    excerpt:
      "Forty students, one weekend, and a brief with no clear answer. What campus teams get right that funded startups often miss.",
    date: "2026-06-27",
    author: "Mr. Shoaib",
    category: "Community",
  },
  {
    slug: "q3-project-slots",
    title: "Aqdaar Opens Q3 Project Slots",
    excerpt:
      "We take a limited number of projects each quarter so every engagement keeps a directly responsible owner. Here's what's open and how to reach us.",
    date: "2026-06-23",
    author: "Jamaluddin Ahmed Siddiqui",
    category: "Company",
  },
];

export const POSTS: Post[] = POSTS_META.map((p) => ({
  ...p,
  body: BODIES[p.slug] ?? [],
}));

/** Newest first — the order every surface renders in. */
export function getPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Up to `limit` other posts, newest first — for the "keep reading" row. */
export function getRelated(slug: string, limit = 3): Post[] {
  const current = getPost(slug);
  if (!current) return [];

  const others = getPosts().filter((p) => p.slug !== slug);
  const sameCategory = others.filter((p) => p.category === current.category);
  return [...sameCategory, ...others.filter((p) => p.category !== current.category)]
    .slice(0, limit);
}

/** "2026-07-15" → "JULY 15, 2026", the meta line's format. */
export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`)
    .toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    })
    .toUpperCase();
}

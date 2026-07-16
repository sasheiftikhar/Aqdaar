/**
 * The five Instagram posts the Events page is built around.
 *
 * Titles, dates, and venues are read off the creatives themselves. Captions are
 * written from what each creative says — swap in the real Instagram caption text
 * when you want the wording to match post-for-post. `interested` / `going` are
 * still placeholders: Instagram doesn't expose those numbers, so they need to be
 * filled in by hand or wired to whatever RSVP system ends up behind the button.
 *
 * `status` is derived from the printed date against today. Two of these are the
 * same event (posts 1 and 4 are both the Eco-Compute Summit — the summit itself
 * and its organising-team announcement), which is why the feed shows both but
 * the recap treats them as one story.
 */

export type EventStatus = "Upcoming" | "Ongoing" | "Past";
export type EventCategory =
  | "Trainings"
  | "Consultation"
  | "Community"
  | "Meetups";

export type EventPost = {
  post: number;
  url: string;
  image: string;
  status: EventStatus;
  category: EventCategory;
  title: string;
  date: string;
  location: string;
  caption: string;
  interested: string;
  going: string;
  comments: { name: string; text: string }[];
  flagship?: boolean;
};

export const STATUSES: EventStatus[] = ["Upcoming", "Ongoing", "Past"];
export const CATEGORIES: EventCategory[] = [
  "Trainings",
  "Consultation",
  "Community",
  "Meetups",
];

export const EVENT_POSTS: EventPost[] = [
  {
    post: 3,
    url: "https://www.instagram.com/p/DaIGIXuDaAI/",
    image: "/post3.jpg",
    status: "Ongoing",
    category: "Trainings",
    title: "The Dexter Lab — Applications Are Open",
    date: "Rolling intake",
    location: "Karachi",
    caption:
      "Where startups are engineered for growth. Ideas, build, impact — applications are open for founders who want a room, a brief, and people who'll tell them the truth about it.",
    interested: "[X]",
    going: "[Y]",
    comments: [
      { name: "[Commenter]", text: "[Comment line from Post 3]" },
      { name: "[Commenter]", text: "[Comment line from Post 3]" },
    ],
    flagship: true,
  },
  {
    post: 2,
    url: "https://www.instagram.com/p/DaDA_0osA0R/",
    image: "/post2.jpg",
    status: "Upcoming",
    category: "Trainings",
    title: "Startup Bootcamp — Aqdaar Ventures × GMS Consultants",
    date: "[Date needed — not on the creative]",
    location: "[Venue needed — not on the creative]",
    caption:
      "A hands-on experience for aspiring founders, innovators, and builders ready to move beyond ideas and start building real ventures. Hands-on learning, founder mindset, real ventures.",
    interested: "[X]",
    going: "[Y]",
    comments: [
      { name: "[Commenter]", text: "[Comment line from Post 2]" },
      { name: "[Commenter]", text: "[Comment line from Post 2]" },
    ],
  },
  {
    post: 1,
    url: "https://www.instagram.com/p/DaiUdA6HGeD/",
    image: "/post1.jpg",
    status: "Past",
    category: "Community",
    title: "The Pakistan Eco-Compute & Smart Cities Summit 2026",
    date: "Tue, 14 July 2026 · 2:00–5:30 PM",
    location: "National Incubation Center (NIC), Karachi",
    caption:
      "A national platform for AI infrastructure, green computing, renewable energy and sustainable urban innovation — building sustainable, environmentally smart and resilient cities for the future.",
    interested: "[X]",
    going: "[Y]",
    comments: [
      { name: "[Commenter]", text: "[Comment line from Post 1]" },
      { name: "[Commenter]", text: "[Comment line from Post 1]" },
    ],
  },
  {
    post: 4,
    url: "https://www.instagram.com/p/DasSCiPKOj2/",
    image: "/post4.webp",
    status: "Past",
    category: "Community",
    title: "Eco-Compute Summit — Organising Team",
    date: "Tue, 14 July 2026 · 2:00–5:30 PM",
    location: "National Incubation Center (NIC), Karachi",
    caption:
      "Jamaluddin Siddiqui, Founder & CEO of Aqdaar, on the organising team for the Pakistan Eco-Compute & Smart Cities Summit 2026.",
    interested: "[X]",
    going: "[Y]",
    comments: [
      { name: "[Commenter]", text: "[Comment line from Post 4]" },
      { name: "[Commenter]", text: "[Comment line from Post 4]" },
    ],
  },
  {
    post: 5,
    url: "https://www.instagram.com/p/DahK1booXpJ/",
    image: "/post5.webp",
    status: "Past",
    category: "Meetups",
    title: "Startup Grind Lahore — Startup World Cup Briefing",
    date: "Thu, 9 July 2026 · 2:00–4:00 PM",
    location: "NIC Karachi",
    caption:
      "Jamaluddin Ahmed Siddiqui briefing startup founders for the Startup World Cup, Pakistan Edition — powered by Startup Grind and Pegasus Tech Ventures.",
    interested: "[X]",
    going: "[Y]",
    comments: [
      { name: "[Commenter]", text: "[Comment line from Post 5]" },
      { name: "[Commenter]", text: "[Comment line from Post 5]" },
    ],
  },
];

/** Newest-first order for the hero's rotating stack. */
export const HERO_POSTS = EVENT_POSTS;

export const PAST_POSTS = EVENT_POSTS.filter((e) => e.status === "Past");

export const FLAGSHIP = EVENT_POSTS.find((e) => e.flagship) ?? EVENT_POSTS[0];

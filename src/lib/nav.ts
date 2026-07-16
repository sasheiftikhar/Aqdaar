/**
 * Every route on the site, in one place.
 *
 * Navbar and Footer both read from here, so a page can never end up linked in
 * one and missing from the other. Adding a page? Add it to ROUTES, then drop it
 * into whichever groups below should surface it.
 */

export const ROUTES = {
  home: "/",
  about: "/about",
  product: "/product",
  services: "/services",
  solutions: "/solutions",
  trainings: "/trainings",
  consultation: "/consultation",
  events: "/events",
  blog: "/blog",
  contact: "/contact",
  api: "/api",
  forBusiness: "/for-business",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type NavLink = { label: string; href: string };

/** Top-level nav. Kept to the pages a first-time visitor is looking for. */
export const PRIMARY_NAV: NavLink[] = [
  { label: "About", href: ROUTES.about },
  { label: "Product", href: ROUTES.product },
  { label: "Services", href: ROUTES.services },
  { label: "Solutions", href: ROUTES.solutions },
  { label: "Trainings", href: ROUTES.trainings },
  { label: "Consultation", href: ROUTES.consultation },
  { label: "Events", href: ROUTES.events },
  { label: "Blog", href: ROUTES.blog },
];

export const FOOTER_SITEMAP: NavLink[] = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Aqdaar Studio", href: ROUTES.product },
  { label: "Services", href: ROUTES.services },
  { label: "Solutions", href: ROUTES.solutions },
  { label: "Blog", href: ROUTES.blog },
  { label: "Events", href: ROUTES.events },
  { label: "Contact", href: ROUTES.contact },
];

export const FOOTER_OFFERINGS: NavLink[] = [
  { label: "Trainings", href: ROUTES.trainings },
  { label: "Consultation", href: ROUTES.consultation },
  { label: "Solutions", href: ROUTES.solutions },
  { label: "For Business", href: ROUTES.forBusiness },
  { label: "Developer API", href: ROUTES.api },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy Policy", href: ROUTES.privacy },
  { label: "Terms of Service", href: ROUTES.terms },
];

/** The button in the navbar and the primary action on every CTA block. */
export const CONSULT_HREF = ROUTES.consultation;

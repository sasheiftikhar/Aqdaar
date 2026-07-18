/**
 * Canonical facts about the site, in one place.
 *
 * `SITE_URL` is what every absolute URL is built from — the sitemap, robots,
 * canonical tags, and Open Graph. It must be the real public origin Google will
 * index, with no trailing slash. Override it per-environment with
 * NEXT_PUBLIC_SITE_URL (e.g. the temporary Hostinger URL while testing) so the
 * production domain stays the default without a code change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://aqdaar.org"
).replace(/\/$/, "");

export const SITE_NAME = "Aqdaar";

export const SITE_TAGLINE = "Dhundo. Banao. Becho.";

export const SITE_DESCRIPTION =
  "Aqdaar partners with founders, leaders, and organizations who want to define categories, not follow them — from discovery, to build, to market.";

/** Absolute URL for a path, for anywhere a relative one won't do (OG, sitemap). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

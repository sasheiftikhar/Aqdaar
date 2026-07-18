import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPosts } from "@/lib/blog";
import { ROUTES } from "@/lib/nav";

/**
 * The sitemap Google reads to discover every page.
 *
 * Static routes come from ROUTES — the same table the nav and footer use, so a
 * new page can't be linked on the site yet missing here. Blog posts are appended
 * from the post source, each dated by its own publish date so crawlers know
 * what's fresh.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Priority is relative, not absolute: the home page leads, the pages a
  // first-time visitor wants sit just under it, legal pages trail.
  const priorityFor = (path: string): number => {
    if (path === ROUTES.home) return 1;
    if (path === ROUTES.privacy || path === ROUTES.terms) return 0.3;
    if (path === ROUTES.blog) return 0.7;
    return 0.8;
  };

  const staticRoutes: MetadataRoute.Sitemap = Object.values(ROUTES).map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: path === ROUTES.blog ? "weekly" : "monthly",
      priority: priorityFor(path),
    }),
  );

  const posts: MetadataRoute.Sitemap = getPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...posts];
}

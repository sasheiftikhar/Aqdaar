import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * robots.txt — lets every crawler in, but keeps them off the mail endpoint
 * (nothing to index there, and no reason to advertise it), and points them at
 * the sitemap so discovery doesn't depend on following links.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}

import type { NextConfig } from "next";

/**
 * Baseline security headers, sent on every response.
 *
 * These are the low-risk, high-value ones that don't need per-page tuning — no
 * Content-Security-Policy here, because a real CSP has to enumerate every script
 * and style source and would break framer-motion's inline styles and the fonts
 * without careful work. That's a deliberate follow-up, not part of this pass.
 */
const securityHeaders = [
  // Don't let the site be framed elsewhere — clickjacking protection.
  { key: "X-Frame-Options", value: "DENY" },
  // Trust the declared content types; don't let a browser sniff its own.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin on cross-origin navigations, the full path same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Deny powerful APIs this site never uses.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;

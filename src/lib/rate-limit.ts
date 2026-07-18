/**
 * A minimal fixed-window rate limiter, kept in process memory.
 *
 * No Redis, no external store — this runs as a single Node process on Hostinger,
 * so a Map is enough and adds no infrastructure. The tradeoffs that comes with:
 * the counts reset on redeploy or restart, and if the app is ever scaled to more
 * than one instance each keeps its own window. For throttling a contact form
 * that's fine; it is a speed bump against floods, not an access-control system.
 *
 * Windows are swept lazily on each call rather than on a timer, so an idle
 * process holds nothing and there is no interval to leak.
 */

type Window = { count: number; resetAt: number };

const hits = new Map<string, Window>();

/** Drop windows that have already expired, so the Map can't grow without bound. */
function sweep(now: number) {
  for (const [key, window] of hits) {
    if (window.resetAt <= now) hits.delete(key);
  }
}

export type RateLimitResult = {
  ok: boolean;
  /** Requests still allowed in the current window. */
  remaining: number;
  /** Seconds until the window resets — handed back as Retry-After on a block. */
  retryAfter: number;
};

/**
 * Record one hit for `key` and report whether it's within the limit.
 *
 * @param key      what to bucket by — usually the caller's IP
 * @param limit    requests allowed per window
 * @param windowMs window length in milliseconds
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();

  // Cheap enough to run every call at this volume, and it keeps the Map bounded
  // by the number of *active* keys rather than every key ever seen.
  if (hits.size > 500) sweep(now);

  const existing = hits.get(key);

  if (!existing || existing.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetAt - now) / 1000);

  if (existing.count > limit) {
    return { ok: false, remaining: 0, retryAfter };
  }
  return { ok: true, remaining: limit - existing.count, retryAfter };
}

/**
 * Best-effort client IP from the proxy headers Hostinger sets.
 *
 * `x-forwarded-for` is a comma-separated chain; the first entry is the original
 * client. Falls back to a single bucket when nothing is present, so a missing
 * header fails closed into "everyone shares one limit" rather than into no limit
 * at all.
 */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}

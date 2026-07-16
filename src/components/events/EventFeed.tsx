"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PostImage from "@/components/events/PostImage";
import {
  CATEGORIES,
  EVENT_POSTS,
  STATUSES,
  type EventCategory,
  type EventPost,
  type EventStatus,
} from "@/components/events/eventData";

/**
 * Filter tabs + the LinkedIn-style feed.
 *
 * Status and category filter independently: a status tab is always active, and
 * categories toggle off to mean "all". Both live here rather than in the page
 * so the tabs and the list they drive can't drift apart.
 */
export default function EventFeed() {
  const [status, setStatus] = useState<EventStatus>("Upcoming");
  const [category, setCategory] = useState<EventCategory | null>(null);

  const shown = EVENT_POSTS.filter(
    (e) => e.status === status && (!category || e.category === category),
  );

  return (
    <section id="feed" className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* status tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              aria-pressed={status === s}
              className={`rounded-xl px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                status === s
                  ? "bg-primary-gradient on-accent"
                  : "border border-border bg-surface/40 text-muted hover:text-fg"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* category chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            Category
          </span>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(category === c ? null : c)}
              aria-pressed={category === c}
              className={`rounded-lg border px-3.5 py-1.5 text-[12.5px] transition-colors ${
                category === c
                  ? "border-accent bg-surface-2 text-fg"
                  : "border-border bg-surface/30 text-muted hover:text-fg"
              }`}
            >
              {c}
            </button>
          ))}
          {category && (
            <button
              type="button"
              onClick={() => setCategory(null)}
              className="ml-1 text-[12px] text-faint underline-offset-4 hover:text-fg hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* feed */}
        {shown.length === 0 ? (
          <p className="mt-14 rounded-2xl border border-dashed border-border bg-surface/30 px-6 py-12 text-center text-[13.5px] text-muted">
            Nothing under {status}
            {category ? ` · ${category}` : ""} right now. Try another tab —
            or write to us and we&apos;ll tell you what&apos;s next.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((e) => (
              <FeedCard key={e.post} event={e} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeedCard({ event }: { event: EventPost }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface/30"
    >
      {/* the creative, square — the native ratio of most of the posts */}
      <div className="p-3 pb-0">
        <PostImage
          src={event.image}
          alt={event.title}
          ratio="1:1"
          href={event.url}
        />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted">
            {event.category}
          </span>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
            {event.status}
          </span>
        </div>

        <h3 className="mt-4 text-[19px] font-bold leading-tight text-fg">
          {event.title}
        </h3>
        <p className="mt-2 text-[12.5px] text-accent">
          {event.date} · {event.location}
        </p>

        <p className="mt-3 line-clamp-3 text-[13px] leading-relaxed text-muted">
          {event.caption}
        </p>

        {/* engagement counters */}
        <div className="mt-5 flex items-center gap-1.5 border-t border-border pt-4 text-[12.5px] text-muted">
          <span className="font-semibold text-fg">{event.interested}</span>
          <span>Interested</span>
          <span className="text-faint">·</span>
          <span className="font-semibold text-fg">{event.going}</span>
          <span>Going</span>
        </div>

        {/* comments preview — visual filler until the real ones land */}
        <div className="mt-4 space-y-2">
          {event.comments.map((c, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-surface-2" />
              <p className="text-[12px] leading-relaxed text-faint">
                <span className="font-semibold text-muted">{c.name}</span>{" "}
                {c.text}
              </p>
            </div>
          ))}
        </div>

        <a
          href="mailto:events@aqdaar.org"
          className="bg-primary-gradient on-accent mt-6 block rounded-xl px-5 py-3 text-center text-[14px] font-semibold transition-transform hover:-translate-y-0.5"
        >
          RSVP / Register
        </a>
      </div>
    </motion.article>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { CATEGORIES, formatDate, type Category, type Post } from "@/lib/blog";

const ALL = "All articles" as const;
type Filter = typeof ALL | Category;

const FILTERS: Filter[] = [ALL, ...CATEGORIES];

function RssIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="6.2" cy="17.8" r="2.2" />
      <path
        d="M4 10.2a9.8 9.8 0 0 1 9.8 9.8M4 4.2A15.8 15.8 0 0 1 19.8 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
      {formatDate(post.date)} · {post.author}
    </p>
  );
}

function Tag({ label }: { label: Category }) {
  return (
    <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted">
      {label}
    </span>
  );
}

/* ---------- hero card: cover visual + the post's own meta ---------- */

function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      className="group grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-2"
      whileHover="hover"
    >
      {/*
        COVER SLOT — the post's artwork drops in here when it's ready.
        Replace the gradient wash with an <img> / next/image; the aspect ratio
        below already reserves the space, so nothing around it will shift.
      */}
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-bg lg:aspect-auto lg:min-h-[340px]">
        <div className="bg-soft-gradient absolute inset-0 opacity-[0.18]" />
        <div className="dot-grid absolute inset-0 opacity-25" />
        <motion.div
          className="bg-soft-gradient absolute inset-0 opacity-0"
          variants={{ hover: { opacity: 0.08 } }}
          transition={{ duration: 0.4 }}
        />
        <div className="relative px-8 text-center">
          {post.kicker && (
            <p className="text-[15px] font-semibold text-fg/80">
              {post.kicker}
            </p>
          )}
          <p className="display mt-1 text-4xl font-extrabold text-fg sm:text-5xl">
            {post.visualTitle ?? post.title}
          </p>
        </div>
      </div>

      {/* the write-up */}
      <div className="flex flex-col justify-center bg-bg p-8 sm:p-10">
        <Meta post={post} />
        <h2 className="display mt-4 text-3xl font-bold text-fg transition-colors group-hover:text-accent sm:text-[2.6rem]">
          {post.title}
        </h2>
        <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-7">
          <Tag label={post.category} />
        </div>
      </div>
    </motion.a>
  );
}

/* ---------- one cell in the hairline grid ---------- */

function PostCard({ post }: { post: Post }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col bg-bg p-8 transition-colors hover:bg-surface/40"
    >
      <Meta post={post} />
      <h3 className="mt-3.5 text-[22px] font-bold leading-tight text-fg transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
        {post.excerpt}
      </p>
      <div className="mt-7">
        <Tag label={post.category} />
      </div>
    </motion.a>
  );
}

/* ---------- page body ---------- */

export default function BlogIndex({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>(ALL);

  // Within the active filter: the flagged post leads, everything else follows
  // in date order. Falling back to the newest keeps every tab looking complete.
  const { featured, rest } = useMemo(() => {
    const list =
      filter === ALL ? posts : posts.filter((p) => p.category === filter);
    if (list.length === 0) return { featured: null, rest: [] as Post[] };

    const lead = list.find((p) => p.featured) ?? list[0];
    return { featured: lead, rest: list.filter((p) => p !== lead) };
  }, [posts, filter]);

  return (
    <div className="mx-auto max-w-[1200px] px-6">
      {/* filter bar */}
      <Reveal>
        <div className="flex items-center justify-between gap-6">
          <div className="scrollbar-none -mx-1 flex items-center gap-1 overflow-x-auto px-1 py-1">
            {FILTERS.map((f) => {
              const active = f === filter;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 text-[14px] transition-colors ${
                    active ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="blog-filter-pill"
                      className="absolute inset-0 rounded-full border border-border bg-surface-2"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>

          <a
            href="/blog/rss.xml"
            aria-label="RSS feed"
            title="RSS feed"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface/60 text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <RssIcon />
          </a>
        </div>
      </Reveal>

      {/* hero card */}
      {featured && (
        <Reveal delay={0.05}>
          <div className="mt-10">
            <FeaturedCard key={featured.slug} post={featured} />
          </div>
        </Reveal>
      )}

      {/* the rest, as a hairline grid — gap-px over a border-toned bed */}
      {rest.length > 0 && (
        <Reveal delay={0.1}>
          <motion.div
            layout
            className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Reveal>
      )}

      {!featured && (
        <p className="mt-16 text-center text-[14.5px] text-muted">
          Nothing published under {filter} yet — check back soon.
        </p>
      )}
    </div>
  );
}

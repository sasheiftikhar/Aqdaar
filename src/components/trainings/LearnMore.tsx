"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import { formatDate, type Post } from "@/lib/blog";
import { ROUTES } from "@/lib/nav";

function PostCard({ post }: { post: Post }) {
  return (
    <motion.a
      href={`${ROUTES.blog}/${post.slug}`}
      className="group block"
      whileHover="hover"
    >
      {/*
        COVER SLOT — same contract as the blog index: swap the wash for an
        <img> / next/image when artwork lands. The ratio is already reserved.
      */}
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface/40">
        <div className="bg-soft-gradient absolute inset-0 opacity-[0.12]" />
        <div className="dot-grid absolute inset-0 opacity-20" />
        <motion.div
          className="bg-soft-gradient absolute inset-0 opacity-0"
          variants={{ hover: { opacity: 0.1 } }}
          transition={{ duration: 0.4 }}
        />
        <span className="relative rounded-md border border-border bg-black/40 px-2.5 py-1 text-[10.5px] font-medium text-muted">
          {post.category}
        </span>
      </div>

      <h3 className="mt-5 text-[15px] font-bold leading-snug text-fg transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2.5 line-clamp-3 text-[13px] leading-relaxed text-muted">
        {post.excerpt}
      </p>
      <p className="mt-3 font-mono text-[10.5px] uppercase tracking-[0.14em] text-faint">
        {formatDate(post.date)}
      </p>
    </motion.a>
  );
}

export default function LearnMore({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="relative bg-bg py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <Reveal>
          <h2 className="display text-center text-4xl font-bold text-fg sm:text-5xl">
            Learn more about Aqdaar
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

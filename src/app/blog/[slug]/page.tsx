import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import SoftGlow from "@/components/ui/SoftGlow";
import Reveal from "@/components/ui/Reveal";
import { formatDate, getPost, getPosts, getRelated } from "@/lib/blog";
import { ROUTES } from "@/lib/nav";

type Props = { params: Promise<{ slug: string }> };

/** Every post is known at build time — prerender the lot. */
export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  const url = `/blog/${post.slug}`;
  return {
    // The layout's title template appends "| Aqdaar", so just the post title.
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    // A per-post canonical stops the filter/query variants of the blog index
    // competing with the post for the same ranking.
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(`${post.date}T00:00:00Z`).toISOString(),
      authors: [post.author],
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRelated(slug);

  return (
    <>
      <Navbar />
      <main>
        {/* header */}
        <section className="relative overflow-hidden bg-bg pt-36 pb-10">
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
          <SoftGlow position="top" />

          <div className="relative mx-auto max-w-[760px] px-6">
            <a
              href={ROUTES.blog}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              All articles
            </a>

            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
              {formatDate(post.date)} · {post.author}
            </p>

            <h1 className="display mt-4 text-4xl font-extrabold tracking-[-0.03em] text-fg sm:text-5xl">
              {post.title}
            </h1>

            <p className="mt-6 text-[16px] leading-relaxed text-muted">
              {post.excerpt}
            </p>

            <div className="mt-7">
              <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-medium text-muted">
                {post.category}
              </span>
            </div>
          </div>
        </section>

        {/*
          COVER SLOT — the post's artwork drops in here when it's ready.
          The aspect ratio already reserves the space, so adding an image
          won't shift anything below it.
        */}
        <section className="relative bg-bg py-6">
          <div className="mx-auto max-w-[900px] px-6">
            <div className="relative flex aspect-[21/9] items-center justify-center overflow-hidden rounded-3xl border border-border bg-surface/60">
              <div className="bg-soft-gradient absolute inset-0 opacity-[0.14]" />
              <div className="dot-grid absolute inset-0 opacity-25" />
              <p className="display relative px-8 text-center text-3xl font-extrabold text-fg/80 sm:text-4xl">
                {post.visualTitle ?? post.category}
              </p>
            </div>
          </div>
        </section>

        {/* body */}
        <article className="relative bg-bg py-12">
          <div className="mx-auto max-w-[760px] px-6">
            {post.body.map((block, i) =>
              block.startsWith("## ") ? (
                <h2
                  key={i}
                  className="mt-12 text-2xl font-bold text-fg first:mt-0"
                >
                  {block.slice(3)}
                </h2>
              ) : (
                <p
                  key={i}
                  className="mt-5 text-[15.5px] leading-[1.75] text-muted first:mt-0"
                >
                  {block}
                </p>
              )
            )}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
              <p className="text-sm text-muted">
                Written by <span className="font-medium text-fg">{post.author}</span>
              </p>
              <a
                href={ROUTES.consultation}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                Talk to us about your project
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </div>
        </article>

        {/* keep reading */}
        {related.length > 0 && (
          <section className="relative bg-bg py-16">
            <div className="mx-auto max-w-[1200px] px-6">
              <Reveal>
                <h2 className="display text-3xl font-bold text-fg sm:text-4xl">
                  Keep reading.
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
                  {related.map((r) => (
                    <a
                      key={r.slug}
                      href={`${ROUTES.blog}/${r.slug}`}
                      className="group flex flex-col bg-bg p-8 transition-colors hover:bg-surface/40"
                    >
                      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
                        {formatDate(r.date)}
                      </p>
                      <h3 className="mt-3.5 text-[20px] font-bold leading-tight text-fg transition-colors group-hover:text-accent">
                        {r.title}
                      </h3>
                      <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-muted">
                        {r.excerpt}
                      </p>
                      <span className="mt-6 w-fit rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted">
                        {r.category}
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>
        )}

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

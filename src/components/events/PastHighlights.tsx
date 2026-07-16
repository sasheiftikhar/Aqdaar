import PostImage from "@/components/events/PostImage";
import Reveal from "@/components/ui/Reveal";
import { PAST_POSTS } from "@/components/events/eventData";

/**
 * Recap cards for the posts marked `status: "Past"` in eventData.
 *
 * The stats and the testimonial are the parts no creative carries — they need
 * real numbers and a real quote per event before this section stops reading as
 * a mock-up.
 */
export default function PastHighlights() {
  return (
    <section className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="display text-4xl font-bold text-fg sm:text-5xl">
            Already happened.
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-2xl text-[14px] text-muted">
            The rooms we&apos;ve already filled this month.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PAST_POSTS.map((e) => (
            <Reveal key={e.post} delay={0.1}>
              <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface/30">
                <div className="p-3 pb-0">
                  <PostImage
                    src={e.image}
                    alt={e.title}
                    ratio="1:1"
                    href={e.url}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 pt-5">
                  <h3 className="text-[18px] font-bold leading-tight text-fg">
                    {e.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] text-accent">
                    {e.date} · {e.location}
                  </p>

                  {/* key stats */}
                  <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                    {[
                      ["[X]", "Attended"],
                      ["[X]", "Sessions"],
                      ["[X]", "Partners"],
                    ].map(([value, label]) => (
                      <div key={label} className="bg-surface-2 px-2 py-3 text-center">
                        <div className="text-[16px] font-bold text-fg">
                          {value}
                        </div>
                        <div className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-faint">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* testimonial */}
                  <blockquote className="mt-5 flex-1 border-l-2 border-accent pl-4">
                    <p className="text-[13px] leading-relaxed text-muted italic">
                      “[Testimonial quote for {e.title} — one or two lines from
                      an attendee.]”
                    </p>
                    <footer className="mt-2 text-[11.5px] text-faint not-italic">
                      — [Attendee name], [role]
                    </footer>
                  </blockquote>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";

/* Count-up that runs once the block scrolls into view. */
function Counter({ to, duration = 1400 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return <span ref={ref}>{n.toLocaleString()}</span>;
}

/* A dense grid of agent dots, a few pulsing to feel alive. */
const CELLS = Array.from({ length: 96 });

function AgentSwarmGrid() {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-6">
      <div className="mb-5 flex items-center gap-6">
        <div>
          <p className="text-3xl font-semibold text-fg">
            <Counter to={6} />
          </p>
          <p className="text-xs uppercase tracking-wide text-[#AFA3BF]">
            running
          </p>
        </div>
        <div>
          <p className="text-3xl font-semibold text-fg">
            <Counter to={847} />
          </p>
          <p className="text-xs uppercase tracking-wide text-done">completed</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-2">
        {CELLS.map((_, i) => {
          const running = i % 17 === 3 || i % 23 === 5;
          return (
            <motion.span
              key={i}
              className="aspect-square rounded-[4px]"
              style={{
                background: running
                  ? "rgba(240,147,43,0.8)"
                  : "rgba(180,217,206,0.35)",
              }}
              animate={
                running
                  ? { opacity: [1, 0.4, 1], scale: [1, 0.9, 1] }
                  : { opacity: 1 }
              }
              transition={
                running
                  ? { duration: 1.6, repeat: Infinity, delay: (i % 5) * 0.2 }
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Scale() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <h2 className="display text-4xl font-bold sm:text-6xl">
                One agent or thousands.{" "}
                <span className="text-muted">Same platform.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg text-muted">
                Aqdaar provisions agent sandboxes in seconds. Design a single
                task that works across many sources to streamline setup. Your
                agents run in parallel across credentials, sources, and
                timezones.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <AgentSwarmGrid />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <h4 className="text-xl font-semibold text-fg">
                One task, many sources
              </h4>
              <p className="mt-2 text-muted">
                Tasks in Aqdaar outline an objective, and your agent performs it
                across any source that supports it. Return consistent information
                across varied sources.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h4 className="text-xl font-semibold text-fg">Always on</h4>
              <p className="mt-2 text-muted">
                Agents don&apos;t have office hours. Run tasks on a schedule,
                trigger them from events, or let workflows chain them
                automatically.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BrandTile from "@/components/ui/BrandTile";
import Reveal from "@/components/ui/Reveal";

const CASES = [
  { name: "Agentic Payments", sub: "Pay any bill from any account, automatically." },
  { name: "Bill Fetch", sub: "Pull statements and invoices on a schedule." },
  { name: "Card Switch", sub: "Move a card on file across every merchant." },
  { name: "User Migration", sub: "Port accounts and data between platforms." },
  { name: "Onboarding", sub: "Provision users across your whole stack." },
  { name: "Product Integrations", sub: "Ship integrations without waiting on APIs." },
  { name: "Spend Management", sub: "Categorize and reconcile spend continuously." },
  { name: "Ticket Transfer", sub: "Move and resolve tickets across tools." },
];

const ACCOUNTS = [
  { name: "Duke Energy", amount: "$142.50", color: "#0072ce" },
  { name: "Amazon Store Card", amount: "$89.00", color: "#ff9900" },
  { name: "T-Mobile", amount: "$75.00", color: "#e20074" },
];

function PhoneMock({ activeSub }: { activeSub: string }) {
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const loop = setInterval(() => setPaid((v) => !v), 2800);
    return () => clearInterval(loop);
  }, []);

  return (
    <div className="relative mx-auto w-[280px] overflow-hidden rounded-[2rem] border border-border bg-black p-2 shadow-2xl">
      {/* soft landscape backdrop */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(180deg, #1a2a4a 0%, #16324a 40%, #1f5f3a 100%)",
        }}
      />
      <div className="relative rounded-[1.6rem] bg-black/85 p-4 backdrop-blur">
        <p className="text-center text-sm font-semibold text-fg">
          Make a payment
        </p>
        <p className="mb-4 text-center text-[11px] text-muted">
          Select an account
        </p>
        <div className="space-y-2">
          {ACCOUNTS.map((a) => (
            <div
              key={a.name}
              className="flex items-center gap-2 rounded-xl border border-border bg-surface/70 p-2.5"
            >
              <BrandTile label={a.name} color={a.color} size={26} />
              <span className="text-[13px] text-fg">{a.name}</span>
              <span className="ml-auto text-[13px] text-muted">{a.amount}</span>
            </div>
          ))}
        </div>
        <motion.button
          className="mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-black"
          animate={{ scale: paid ? 0.97 : 1 }}
        >
          <AnimatePresence mode="wait">
            {paid ? (
              <motion.span
                key="done"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1 text-done"
              >
                ✓ Paid
              </motion.span>
            ) : (
              <motion.span
                key="pay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Pay account
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
        <p className="mt-3 h-4 text-center text-[10px] text-faint">{activeSub}</p>
      </div>
    </div>
  );
}

export default function UseCases() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const loop = setInterval(
      () => setActive((a) => (a + 1) % CASES.length),
      2400
    );
    return () => clearInterval(loop);
  }, []);

  return (
    <section className="relative py-28">
      <div className="mx-auto grid max-w-[1300px] items-center gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <PhoneMock activeSub={CASES[active].sub} />
        </Reveal>

        <div>
          <Reveal>
            <h2 className="display mb-8 text-4xl font-bold sm:text-6xl">
              Endless use cases
              <br />
              for your business
            </h2>
          </Reveal>
          <ul className="space-y-1">
            {CASES.map((c, i) => (
              <li key={c.name}>
                <button
                  onMouseEnter={() => setActive(i)}
                  className="group flex w-full items-center gap-3 py-1.5 text-left"
                >
                  <span
                    className={`text-2xl font-semibold transition-colors sm:text-3xl ${
                      active === i ? "text-fg" : "text-faint hover:text-muted"
                    }`}
                  >
                    {c.name}
                  </span>
                  <motion.span
                    className="text-accent"
                    animate={{
                      opacity: active === i ? 1 : 0,
                      x: active === i ? 0 : -8,
                    }}
                    transition={{ duration: 0.25 }}
                  >
                    →
                  </motion.span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

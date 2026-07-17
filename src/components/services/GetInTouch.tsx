"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

/**
 * The closing form — pitch on the left, fields on the right.
 *
 * Posts to the same /api/contact route the contact page uses, with subject
 * pinned to Services so enquiries from here are identifiable in the inbox. The
 * route requires name, email, and message; everything else is optional, and the
 * inputs mark that rather than making you find out by submitting.
 */

type State = "idle" | "sending" | "sent" | "error";

export default function GetInTouch() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;

    const data = new FormData(e.currentTarget);
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          subject: "Services enquiry",
          message: data.get("message"),
        }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || "Something went wrong.");
      setState("sent");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative bg-bg py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid grid-cols-1 gap-12 rounded-3xl border border-border bg-surface/30 p-6 sm:p-12 lg:grid-cols-2 lg:gap-16">
          {/* the pitch */}
          <Reveal>
            <div>
              <h2 className="display text-3xl font-bold leading-tight text-fg sm:text-4xl">
                Whether you&apos;re launching a product, a platform, or a whole
                venture —{" "}
                <span className="text-gradient">we&apos;re here to help.</span>
              </h2>

              <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted">
                We take on a limited number of projects each quarter, so reach
                out early. Tell us what you&apos;re building and we&apos;ll tell
                you straight whether we&apos;re the right people for it.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="bg-primary-gradient flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold text-[#33304a]">
                  JS
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-fg">
                    Jamaluddin Ahmed Siddiqui
                  </p>
                  <p className="text-[12px] text-faint">Founder &amp; CEO, Aqdaar</p>
                </div>
              </div>

              <div className="mt-8 space-y-1.5 text-[13px] text-muted">
                <p>
                  <a
                    href="tel:03357493653"
                    className="transition-colors hover:text-accent"
                  >
                    0335-7493653
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:aqdaar.jamal@gmail.com"
                    className="transition-colors hover:text-accent"
                  >
                    aqdaar.jamal@gmail.com
                  </a>
                </p>
                <p className="text-faint">Karachi, Pakistan — working globally</p>
              </div>
            </div>
          </Reveal>

          {/* the form */}
          <Reveal delay={0.1}>
            <div>
              <h3 className="text-2xl font-bold text-fg">Get in Touch</h3>

              {state === "sent" ? (
                <div className="mt-8 rounded-2xl border border-mint/40 bg-surface-2 p-8 text-center">
                  <p className="text-[15px] font-semibold text-fg">
                    Thanks — that&apos;s with us.
                  </p>
                  <p className="mt-2 text-[13px] text-muted">
                    We read every one of these. Expect a reply from a named
                    person, not a ticket number.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                  <Field
                    label="Your name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                  />
                  <Field
                    label="Company"
                    name="company"
                    placeholder="Optional"
                  />

                  <div>
                    <label
                      htmlFor="message"
                      className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint"
                    >
                      Tell us about your project *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="What are you building, and what's in the way?"
                      className="mt-2 w-full resize-none border-0 border-b border-border bg-transparent pb-3 text-[14px] text-fg placeholder:text-faint focus:border-accent focus:outline-none"
                    />
                  </div>

                  {state === "error" && (
                    <p className="text-[13px] text-fg/90" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="bg-primary-gradient on-accent group inline-flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 font-semibold transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {state === "sending" ? "Sending…" : "Send it over"}
                    {state !== "sending" && (
                      <span className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="text-[11px] font-bold uppercase tracking-[0.14em] text-faint"
      >
        {label} {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-0 border-b border-border bg-transparent pb-3 text-[14px] text-fg placeholder:text-faint focus:border-accent focus:outline-none"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";

const INTERESTS = [
  "Trainings",
  "Consultation",
  "Solutions",
  "Services",
  "Partnership",
  "Other",
];

const SOCIALS = ["LinkedIn", "Instagram", "Facebook"];

/* ---------------- direct info cards ---------------- */

function InfoCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface/40 p-5">
      <p className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.14em] text-faint">
        {label}
      </p>
      <div className="text-[13px] leading-relaxed text-fg/80">{children}</div>
    </div>
  );
}

function DirectInfo() {
  return (
    <div>
      <span className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-accent">
        Direct contact
      </span>
      <h2 className="display mt-3 text-3xl font-bold text-fg sm:text-4xl">
        Talk to people who actually get it.
      </h2>
      <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-muted">
        From Karachi, working globally. A question, an idea, or a project you
        haven&apos;t found the right partner for — send it our way. We take on a
        limited number of projects each quarter, so reach out early.
      </p>

      <div className="mt-9 grid gap-3 sm:grid-cols-2">
        <InfoCard label="Based in">
          Karachi, Pakistan
          <br />
          <span className="text-muted">Working globally</span>
        </InfoCard>

        <InfoCard label="Phone">
          <a href="tel:03357493653" className="transition-colors hover:text-accent">
            0335-7493653
          </a>
        </InfoCard>

        <InfoCard label="Email">
          <a
            href="mailto:aqdaar.jamal@gmail.com"
            className="transition-colors hover:text-accent"
          >
            aqdaar.jamal@gmail.com
          </a>
          <span className="block text-xs text-faint">General</span>
          <a
            href="mailto:events@aqdaar.org"
            className="mt-2 block transition-colors hover:text-accent"
          >
            events@aqdaar.org
          </a>
          <span className="block text-xs text-faint">Events</span>
        </InfoCard>

        <InfoCard label="Availability">
          Limited projects
          <br />
          <span className="text-muted">per quarter</span>
        </InfoCard>
      </div>

      <p className="mt-9 mb-4 text-sm font-semibold text-fg">Follow us</p>
      <div className="flex gap-3">
        {SOCIALS.map((s) => (
          <a
            key={s}
            href="#"
            className="rounded-lg border border-border bg-surface/50 px-3.5 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-fg"
          >
            {s}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ---------------- form ---------------- */

type Status = { type: "idle" | "error" | "success"; msg: string };

const inputClass =
  "w-full rounded-lg border border-border bg-surface/60 px-3.5 py-2.5 text-sm text-fg placeholder:text-faint transition-colors focus:border-accent focus:outline-none";

function ContactForm() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle", msg: "" });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const interest = String(fd.get("interest") || "").trim();
    const message = String(fd.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus({
        type: "error",
        msg: "Please fill in your name, email and message.",
      });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ type: "error", msg: "Please enter a valid email address." });
      return;
    }

    setSending(true);
    setStatus({ type: "idle", msg: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          // the email API reads `subject` — carry the interest through it
          subject: interest ? `Interest: ${interest}` : "",
          message,
        }),
      });
      const result = await res.json().catch(() => ({}));

      if (res.ok && result.ok) {
        setStatus({
          type: "success",
          msg: "Thanks! Your message has been sent — we'll get back to you soon.",
        });
        form.reset();
      } else {
        setStatus({
          type: "error",
          msg: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        msg: "Network error. Please check your connection and try again.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-surface/60 p-8 sm:p-10">
      <h3 className="text-2xl font-bold text-fg">Send us a message</h3>
      <p className="mt-2 text-sm text-muted">
        Tell us what you&apos;re building and how we can help.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-7 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-muted">
              Name
            </span>
            <input name="name" type="text" placeholder="Your name" className={inputClass} />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-muted">
              Phone
            </span>
            <input name="phone" type="tel" placeholder="Phone" className={inputClass} />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-muted">
              Email
            </span>
            <input
              name="email"
              type="email"
              placeholder="you@email.com"
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-muted">
              Interest
            </span>
            <select name="interest" defaultValue="Consultation" className={inputClass}>
              {INTERESTS.map((i) => (
                <option key={i} value={i} className="bg-surface text-fg">
                  {i}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-2 block text-xs font-medium text-muted">
            Message
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your idea, project, or question…"
            className={`${inputClass} resize-y`}
          />
        </label>

        <button
          type="submit"
          disabled={sending}
          className="bg-primary-gradient on-accent w-full rounded-xl py-3.5 text-sm font-bold transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {sending ? "Sending…" : "Send Message"}
        </button>

        {status.msg && (
          <p
            role="status"
            aria-live="polite"
            className="text-center text-[13px] leading-relaxed"
            style={{
              color: status.type === "error" ? "#ff9b9b" : "var(--color-mint)",
            }}
          >
            {status.msg}
          </p>
        )}
      </form>
    </div>
  );
}

export default function ContactBody() {
  return (
    <section className="relative bg-bg py-20">
      <div className="mx-auto grid max-w-[1200px] items-start gap-14 px-6 lg:grid-cols-2">
        <Reveal>
          <DirectInfo />
        </Reveal>
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

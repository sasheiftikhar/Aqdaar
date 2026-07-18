import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO || "aqdaar.jamal@gmail.com";

/* This endpoint sends mail and takes no auth, so it's an open relay unless it's
   throttled: five submissions per IP per ten minutes is generous for a human
   and useless to a flood. */
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/* The name of a field the form renders off-screen. A real person never sees it
   and leaves it blank; a bot fills every input it finds. A filled value is the
   clearest bot signal there is, so we drop it — quietly, as a success, rather
   than telling the bot which field gave it away. */
const HONEYPOT_FIELD = "website";

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request) {
  const ip = clientIp(request.headers);
  const limit = rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a little while." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field means a bot. Answer 200 so it thinks it
  // succeeded and doesn't retry or adapt — but send nothing.
  if ((body[HONEYPOT_FIELD] || "").toString().trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").toString().trim();
  const company = (body.company || "").toString().trim();
  const phone = (body.phone || "").toString().trim();
  const email = (body.email || "").toString().trim();
  const subject = (body.subject || "").toString().trim();
  const message = (body.message || "").toString().trim();

  // Required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required." },
      { status: 400 }
    );
  }

  // Basic email sanity check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP environment variables are not configured.");
    return NextResponse.json(
      { error: "Email service is not configured yet. Please try again later." },
      { status: 500 }
    );
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // true for 465, false for 587/25 (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const cleanSubject = subject || "New contact form submission";

  const textLines = [
    `Name: ${name}`,
    company ? `Company: ${company}` : null,
    phone ? `Phone: ${phone}` : null,
    `Email: ${email}`,
    `Subject: ${cleanSubject}`,
    "",
    "Message:",
    message,
  ].filter(Boolean);

  const html = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #1a1a1a; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New contact form submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
      ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(cleanSubject)}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: process.env.CONTACT_FROM || `Aqdaar Website <${SMTP_USER}>`,
      to: TO,
      replyTo: `${name} <${email}>`,
      subject: `[Contact] ${cleanSubject}`,
      text: textLines.join("\n"),
      html,
    });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}

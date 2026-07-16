"use client";
import "../extensor.css";
import { useEffect } from "react";
import { CONTACT_MARKUP } from "./contact-markup";
import Navbar from "@/components/Navbar";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const form = document.querySelector("[data-contact-form]");
    if (!form) return;

    const statusEl = form.querySelector("[data-form-status]");
    const btn = form.querySelector("[data-submit-btn]");
    const btnLabel = form.querySelector("[data-btn-label]");

    const setStatus = (msg, type) => {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.style.display = msg ? "block" : "none";
      statusEl.style.color =
        type === "error"
          ? "#ff8b8b"
          : type === "success"
          ? "#b4d9ce"
          : "rgba(220,213,238,.6)";
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const interest = form.interest?.value.trim() || "";
      const data = {
        name: form.name?.value.trim() || "",
        phone: form.phone?.value.trim() || "",
        email: form.email?.value.trim() || "",
        interest,
        // Map the chosen interest into `subject` so the email API keeps working
        subject: interest ? `Interest: ${interest}` : "",
        message: form.message?.value.trim() || "",
      };

      if (!data.name || !data.email || !data.message) {
        setStatus("Please fill in your name, email and message.", "error");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        setStatus("Please enter a valid email address.", "error");
        return;
      }

      btn.disabled = true;
      btn.style.opacity = "0.7";
      btn.style.cursor = "not-allowed";
      if (btnLabel) btnLabel.textContent = "Sending…";
      setStatus("", "");

      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json().catch(() => ({}));

        if (res.ok && result.ok) {
          setStatus(
            "Thanks! Your message has been sent — we'll get back to you soon.",
            "success"
          );
          form.reset();
        } else {
          setStatus(
            result.error || "Something went wrong. Please try again.",
            "error"
          );
        }
      } catch {
        setStatus(
          "Network error. Please check your connection and try again.",
          "error"
        );
      } finally {
        btn.disabled = false;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        if (btnLabel) btnLabel.textContent = "Send message";
      }
    };

    form.addEventListener("submit", handleSubmit);
    return () => form.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <>
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: CONTACT_MARKUP }} />
      <CTA />
      <Footer />
    </>
  );
}

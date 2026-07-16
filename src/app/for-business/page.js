"use client";
import "../extensor.css";
import { useEffect } from "react";
import { FORBUSINESS_MARKUP } from "./for-business-markup";
import Navbar from "@/components/Navbar";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

// Structured data (Schema Markup) — SoftwareApplication + Breadcrumbs, for SEO / AI search
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Quinn — WhatsApp Commerce for Shopify",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "Quinn connects your Shopify store to WhatsApp — a unified inbox with order context, nightly RFM segmentation, signal-triggered campaigns, and AI support that resolves queries 24/7. Retain more, message smarter, scale without adding headcount.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "3400" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://extensorlabs.com/" },
        { "@type": "ListItem", position: 2, name: "For Business", item: "https://extensorlabs.com/for-business" },
      ],
    },
  ],
};

export default function ForBusinessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Fade-up reveal for [data-reveal-up] blocks
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.style.transition =
              "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)";
            en.target.style.opacity = "1";
            en.target.style.transform = "translateY(0)";
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    document.querySelectorAll("[data-reveal-up]").forEach((el) => io.observe(el));

    // 3D tilt hover — ditto of the landing "Meet the expert" card, applied to every [data-tilt]
    const MAX = 9; // degrees
    const tiltHandlers = [];
    document.querySelectorAll("[data-tilt]").forEach((card) => {
      const move = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        const rotY = -(px - 0.5) * 2 * MAX;
        const rotX = (py - 0.5) * 2 * MAX;
        card.style.transition = "transform .08s linear, box-shadow .2s ease";
        card.style.transform =
          "translateY(0) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg)";
        card.style.boxShadow = "0 40px 90px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.08)";
      };
      const leave = () => {
        card.style.transition = "transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s ease";
        card.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg)";
        card.style.boxShadow = "0 30px 80px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)";
      };
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      tiltHandlers.push({ card, move, leave });
    });

    // "Book demo" → open a mail to support@extensorlabs.com, prefilled with the
    // visitor's typed work email in the body. (Anchor already has a base mailto,
    // so it still works if JS is off; this just enriches it with their address.)
    const demoBtn = document.querySelector("[data-book-demo]");
    const demoEmail = document.querySelector("[data-demo-email]");
    const onDemo = (e) => {
      const email = (demoEmail?.value || "").trim();
      const subject = encodeURIComponent("Demo request — Quinn");
      const body = encodeURIComponent(
        `Hi Extensor team,\n\nI'd like to book a demo of Quinn.\n\nMy work email: ${email || "(add your email)"}\n\nThanks!`
      );
      if (e) e.preventDefault();
      window.location.href = `mailto:support@extensorlabs.com?subject=${subject}&body=${body}`;
    };
    if (demoBtn) demoBtn.addEventListener("click", onDemo);

    return () => {
      if (demoBtn) demoBtn.removeEventListener("click", onDemo);
      io.disconnect();
      tiltHandlers.forEach(({ card, move, leave }) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: FORBUSINESS_MARKUP }} />
      <CTA />
      <Footer />
    </>
  );
}

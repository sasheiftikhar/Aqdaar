"use client";
import "../extensor.css";
import { useEffect } from "react";
import { ABOUT_MARKUP } from "./about-markup";
import Navbar from "@/components/Navbar";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);

    const questions = [
      "How does Extensor Labs handle real-time analytics across COD and WhatsApp orders?",
      "What ROI can we expect from Extensor Labs' automation?",
      "How does Extensor Labs automate everyday commerce operations?",
      "Can Extensor Labs integrate with the tools and data sources we already use?",
      "Do we need a technical team to run Extensor Labs?",
      "How is Extensor Labs different from Western platforms like Shopify or Zoho?",
    ];

    const el = document.querySelector("[data-typewriter]");
    if (!el) return;

    let qi = 0, ci = 0, deleting = false, timer = null;

    const tick = () => {
      const q = questions[qi];
      if (!deleting) {
        ci++;
        el.textContent = q.slice(0, ci);
        if (ci === q.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 52);
      } else {
        ci--;
        el.textContent = q.slice(0, ci);
        if (ci === 0) {
          deleting = false;
          qi = (qi + 1) % questions.length;
          timer = setTimeout(tick, 380);
          return;
        }
        timer = setTimeout(tick, 22);
      }
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: ABOUT_MARKUP }} />
      <CTA />
      <Footer />
    </>
  );
}

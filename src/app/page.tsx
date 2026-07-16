import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/home/Problem";
import Pillars from "@/components/home/Pillars";
import HowItWorks from "@/components/home/HowItWorks";
import Offerings from "@/components/home/Offerings";
import AgentsOperate from "@/components/sections/AgentsOperate";
import Console from "@/components/sections/Console";
import AgentGrid from "@/components/sections/AgentGrid";
import Authentication from "@/components/sections/Authentication";
import EmbedApi from "@/components/sections/EmbedApi";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero + Partners strip (marquee) */}
        <Hero />
        {/* Problem / Agitation */}
        <Problem />
        {/* Solution — The 3 Pillars */}
        <Pillars />
        {/* How It Works */}
        <HowItWorks />
        {/* Our Offerings */}
        <Offerings />
        {/* Services Showcase — "Your Tangible Product Idea, Our Design" */}
        <AgentsOperate />
        {/* Upcoming Events */}
        <Console />
        {/* Industrial Solutions — grid, security, and technical core */}
        <AgentGrid />
        <Authentication />
        <EmbedApi />
        {/* Testimonials */}
        <Testimonials />
        {/* FAQ */}
        <Faq />
        {/* Final CTA */}
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

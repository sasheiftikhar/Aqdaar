import Navbar from "@/components/Navbar";
import ApiHero from "@/components/api/ApiHero";
import AuthBuiltIn from "@/components/api/AuthBuiltIn";
import InProduction from "@/components/api/InProduction";
import Depth from "@/components/api/Depth";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function ApiPage() {
  return (
    <>
      <Navbar />
      <main>
        <ApiHero />
        <AuthBuiltIn />
        <InProduction />
        <Depth />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

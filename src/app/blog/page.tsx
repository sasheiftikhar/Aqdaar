import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import BlogHero from "@/components/blog/BlogHero";
import BlogIndex from "@/components/blog/BlogIndex";
import { getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Aqdaar",
  description:
    "Dispatches, case studies, and engineering notes from the team behind Dhundo, Banao, and Becho.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <BlogHero />
        <section className="relative bg-bg pb-24">
          <BlogIndex posts={getPosts()} />
        </section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

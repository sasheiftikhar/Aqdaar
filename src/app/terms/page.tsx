import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import PageHero from "@/components/ui/PageHero";
import { LegalBody, LegalSection } from "@/components/ui/LegalBody";
import { ROUTES } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Terms of Service",
  alternates: { canonical: "/terms" },
  description:
    "The terms that apply when you use the Aqdaar website and the material on it.",
};

const UPDATED = "July 16, 2026";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={`Last updated ${UPDATED}`}
          title="Terms of Service"
          subtitle="The ground rules for using this website. Project work runs on a separate signed agreement, not on this page."
        />

        <LegalBody>
          <LegalSection heading="Using this site">
            <p>
              You are welcome to browse, read, and share anything here. Please do
              not attempt to disrupt the site, access parts of it you have not
              been given access to, or use it to break the law.
            </p>
          </LegalSection>

          <LegalSection heading="This site is not an offer">
            <p>
              Descriptions of our services, timelines, and phases on this site
              are informational. They are not a quote, a contract, or a
              guarantee of availability. Scope, timeline, and price for any
              engagement are agreed in writing after a{" "}
              <a
                href={ROUTES.consultation}
                className="text-accent hover:underline"
              >
                consultation
              </a>
              , and that signed agreement is what governs the work.
            </p>
          </LegalSection>

          <LegalSection heading="Our content">
            <p>
              The text, design, code, and branding on this site belong to Aqdaar
              unless stated otherwise. You may quote or link to it with
              attribution. Republishing it wholesale, or passing it off as your
              own, is not permitted.
            </p>
          </LegalSection>

          <LegalSection heading="Your content">
            <p>
              Anything you send us through a form or by email stays yours. You
              give us permission to read it and reply to it. We handle it as
              described in our{" "}
              <a href={ROUTES.privacy} className="text-accent hover:underline">
                Privacy Policy
              </a>
              . Please do not send confidential material through this site before
              we have an agreement in place.
            </p>
          </LegalSection>

          <LegalSection heading="Links out">
            <p>
              Where we link to partners, events, or other organizations, we do
              not control those sites and are not responsible for what is on
              them.
            </p>
          </LegalSection>

          <LegalSection heading="No warranty">
            <p>
              This site is provided as-is. We work to keep it accurate and
              available, but we do not warrant that it will be error-free or
              uninterrupted, and we are not liable for decisions made solely on
              the basis of what is written here.
            </p>
          </LegalSection>

          <LegalSection heading="Governing law">
            <p>
              These terms are governed by the laws of Pakistan, and the courts of
              Karachi have jurisdiction over any dispute arising from them.
            </p>
          </LegalSection>

          <LegalSection heading="Changes and contact">
            <p>
              We may update these terms; the date at the top changes when we do.
              Questions go to{" "}
              <a
                href="mailto:aqdaar.jamal@gmail.com"
                className="text-accent hover:underline"
              >
                aqdaar.jamal@gmail.com
              </a>
              .
            </p>
          </LegalSection>
        </LegalBody>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

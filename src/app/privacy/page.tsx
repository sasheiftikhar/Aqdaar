import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCta from "@/components/home/FinalCta";
import PageHero from "@/components/ui/PageHero";
import { LegalBody, LegalSection } from "@/components/ui/LegalBody";
import { ROUTES } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy" },
  description:
    "How Aqdaar collects, uses, and protects the information you share with us.",
};

const UPDATED = "July 16, 2026";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow={`Last updated ${UPDATED}`}
          title="Privacy Policy"
          subtitle="What we collect, why we collect it, and what we do with it. In plain words, because that is the whole point of a policy."
        />

        <LegalBody>
          <LegalSection heading="Who we are">
            <p>
              Aqdaar is a product studio based in Karachi, Pakistan. This policy
              covers this website and the forms on it. If you engage us on a
              project, the agreement we sign for that work governs it, and it
              takes precedence over this page wherever the two differ.
            </p>
          </LegalSection>

          <LegalSection heading="What we collect">
            <p>
              We only collect what you hand us directly. That means the email
              address you enter into the newsletter form, and the name, email,
              and message you send through the{" "}
              <a href={ROUTES.contact} className="text-accent hover:underline">
                contact form
              </a>{" "}
              or by emailing us.
            </p>
            <p>
              We do not ask for payment details on this site, and we do not run
              advertising trackers or sell data to anyone.
            </p>
          </LegalSection>

          <LegalSection heading="Why we use it">
            <p>
              Your email is used to reply to you, and — if you subscribed — to
              send occasional updates about what we are building. Nothing else.
              Every newsletter carries an unsubscribe link, and unsubscribing
              removes you from that list immediately.
            </p>
          </LegalSection>

          <LegalSection heading="Who else sees it">
            <p>
              We use third-party services to host this site and deliver email.
              Those providers process your information only to provide that
              service to us. We do not share your information with anyone else
              unless you ask us to, or unless the law requires it.
            </p>
          </LegalSection>

          <LegalSection heading="How long we keep it">
            <p>
              Enquiries are kept while the conversation is live and for a
              reasonable period afterwards in case you come back to us.
              Newsletter subscriptions are kept until you unsubscribe.
            </p>
          </LegalSection>

          <LegalSection heading="Your choices">
            <p>
              You can ask us what we hold about you, ask us to correct it, or ask
              us to delete it. Email{" "}
              <a
                href="mailto:aqdaar.jamal@gmail.com"
                className="text-accent hover:underline"
              >
                aqdaar.jamal@gmail.com
              </a>{" "}
              and we will action it. You do not need a reason.
            </p>
          </LegalSection>

          <LegalSection heading="Changes to this policy">
            <p>
              If this policy changes, the date at the top of the page changes
              with it. Material changes will be called out rather than slipped
              in quietly.
            </p>
          </LegalSection>

          <LegalSection heading="Contact">
            <p>
              Questions about any of this go to{" "}
              <a
                href="mailto:aqdaar.jamal@gmail.com"
                className="text-accent hover:underline"
              >
                aqdaar.jamal@gmail.com
              </a>
              , or reach us through the{" "}
              <a href={ROUTES.contact} className="text-accent hover:underline">
                contact page
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

import type { Metadata } from "next";
import TftShell, { EmailCard, JsonLd, Section, TFT } from "../_components/TftShell";

const PAGE_URL = `${TFT.siteUrl}${TFT.basePath}/support`;
const TITLE = "TFT Meta Guide Support – Help, FAQ & Contact";
const DESCRIPTION =
  "Support page for TFT Meta Guide. Answers about outdated data, loading problems and ads, plus how to contact us.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: PAGE_URL, siteName: TFT.name, title: TITLE, description: DESCRIPTION },
};

const FAQS: { icon: string; q: string; a: string }[] = [
  {
    icon: "📘",
    q: "What does this app provide?",
    a: "TFT Meta Guide provides team compositions, item recommendations, champion builds, and strategy references for Teamfight Tactics players.",
  },
  {
    icon: "🔄",
    q: "Why is some data outdated?",
    a: "TFT updates frequently with new patches and balance changes. Some content may require a short time to sync with the latest patch.",
  },
  {
    icon: "📶",
    q: "Why is content not loading?",
    a: "Please check your internet connection and restart the app. Some features require an active network connection.",
  },
  {
    icon: "⚠️",
    q: "Ads or rewards are not working.",
    a: "Ads depend on device and network availability. Please try again later if an ad fails to load.",
  },
];

export default function SupportPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <TftShell
      active="support"
      eyebrow="Help Center"
      title="TFT Meta Guide Support"
      intro={
        <p>
          Questions, feedback or problems while using the app? Find answers below, or contact us
          anytime.
        </p>
      }
    >
      <JsonLd data={faqJsonLd} />

      <section className="space-y-3">
        <h2 className="px-1 text-xl font-bold text-white md:text-2xl">Frequently Asked Questions</h2>
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 open:border-yellow-400/30 open:bg-white/[0.06]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white">
              <span>
                <span className="mr-2">{f.icon}</span>
                {f.q}
              </span>
              <span className="text-slate-400 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-7 text-slate-300">{f.a}</p>
          </details>
        ))}
      </section>

      <Section icon="💌" title="Contact Us">
        <p>
          For support, bug reports, or business inquiries, email us. Please include your device
          model, OS version and app version to help us solve your issue faster.
        </p>
        <EmailCard note="We usually respond within 24–48 hours." />
      </Section>
    </TftShell>
  );
}

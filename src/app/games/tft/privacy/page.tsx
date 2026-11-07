import type { Metadata } from "next";
import TftShell, { EmailCard, JsonLd, Section, TFT } from "../_components/TftShell";

const PAGE_URL = `${TFT.siteUrl}${TFT.basePath}/privacy`;
const TITLE = "TFT Meta Guide Privacy Policy";
const DESCRIPTION =
  "Read the TFT Meta Guide privacy policy. The app does not require an account and does not collect personal information. Learn how ads, children's privacy and data security are handled.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["TFT Meta Guide", "TFT Meta Guide privacy policy", "Teamfight Tactics app privacy"],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: { type: "website", url: PAGE_URL, siteName: TFT.name, title: TITLE, description: DESCRIPTION, locale: "en_US" },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

const TOC = [
  { id: "collect", label: "Information We Collect" },
  { id: "advertising", label: "Advertising" },
  { id: "children", label: "Children’s Privacy" },
  { id: "security", label: "Data Security" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    dateModified: TFT.lastUpdatedIso,
    about: { "@type": "MobileApplication", name: TFT.name },
    publisher: { "@type": "Organization", name: TFT.name, email: TFT.email },
  };

  return (
    <TftShell
      active="privacy"
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <>
          <p>
            {TFT.name} respects your privacy. This Privacy Policy explains how we handle
            information when you use our app.
          </p>
          <p className="mt-2 text-sm text-slate-400">Last updated: {TFT.lastUpdated}</p>
        </>
      }
    >
      <JsonLd data={jsonLd} />

      <nav aria-label="Table of contents" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">On this page</p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {TOC.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-slate-300 hover:text-yellow-300">
                <span className="mr-2 text-yellow-400">{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="collect" icon="📋" title="Information We Collect">
        <p>
          We do <strong className="text-white">not collect, store, or share</strong> any personal
          information.
        </p>
        <p>
          {TFT.name} can be used without creating an account or providing any personal data. The
          app may download public game reference data (such as champions, items and team
          compositions) from our servers; this does not involve any information about you.
        </p>
      </Section>

      <Section id="advertising" icon="📢" title="Advertising">
        <p>
          The app may display ads provided by third-party ad networks (such as Google AdMob). These
          services may use anonymous identifiers to serve relevant ads. We do not control or access
          this data.
        </p>
        <p>
          You can learn more in{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 underline underline-offset-4"
          >
            Google’s Privacy Policy
          </a>
          , and you can reset or limit ad tracking in your device settings.
        </p>
      </Section>

      <Section id="children" icon="🧒" title="Children’s Privacy">
        <p>
          We do not knowingly collect personal information from children under 13. If you believe a
          child has provided us with personal information, please contact us and we will address it.
        </p>
      </Section>

      <Section id="security" icon="🔒" title="Data Security">
        <p>
          Since we do not collect personal data, there is no risk of personal data leakage from our
          app.
        </p>
      </Section>

      <Section id="changes" icon="📝" title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with an updated date.
        </p>
      </Section>

      <Section id="contact" icon="💌" title="Contact Us">
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <EmailCard />
      </Section>
    </TftShell>
  );
}

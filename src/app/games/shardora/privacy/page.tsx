import type { Metadata } from "next";
import ShardoraShell, {
  EmailCard,
  JsonLd,
  Section,
  Shape,
  SHARDORA,
} from "../_components/ShardoraShell";

const PAGE_URL = `${SHARDORA.siteUrl}${SHARDORA.basePath}/privacy`;
const TITLE = "Shardora Privacy Policy";
const DESCRIPTION =
  "Read the Shardora privacy policy. Shardora does not collect, store or share personal information. Learn how ads, children's privacy and data security are handled.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Shardora",
    "Shardora privacy policy",
    "Shardora privacy",
    "Shardora data",
    "puzzle game privacy policy",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: SHARDORA.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
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
    dateModified: "2026-10-11",
    about: { "@type": "VideoGame", name: SHARDORA.name },
    publisher: { "@type": "Organization", name: SHARDORA.name, email: SHARDORA.email },
  };

  return (
    <ShardoraShell
      active="privacy"
      eyebrow="Legal"
      title="Privacy Policy"
      intro={
        <>
          <p>
            {SHARDORA.name} respects your privacy. This Privacy Policy explains
            how we handle information when you play our game.
          </p>
          <p className="mt-2 text-sm text-slate-400">Last updated: {SHARDORA.lastUpdated}</p>
        </>
      }
    >
      <JsonLd data={jsonLd} />

      <nav
        aria-label="Table of contents"
        className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          On this page
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {TOC.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-slate-300 hover:text-sky-300">
                <span className="mr-2 text-sky-400">{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="collect" icon={<Shape name="circle" />} title="Information We Collect">
        <p>
          We do <strong className="text-white">not collect, store, or share</strong> any
          personal information.
        </p>
        <p>
          {SHARDORA.name} can be played without creating an account or providing
          any personal data. Your game progress is kept on your device only.
        </p>
      </Section>

      <Section id="advertising" icon={<Shape name="triangle" />} title="Advertising">
        <p>
          Our game may display ads provided by third-party ad networks (such as
          Google AdMob). These services may use anonymous identifiers to serve
          relevant ads. We do not control or access this data.
        </p>
        <p>
          You can learn more in{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300 underline underline-offset-4"
          >
            Google’s Privacy Policy
          </a>
          , and you can reset or limit ad tracking in your device settings.
        </p>
      </Section>

      <Section id="children" icon={<Shape name="square" />} title="Children’s Privacy">
        <p>
          {SHARDORA.name} is suitable for all ages. We do not knowingly collect
          personal information from children under 13.
        </p>
      </Section>

      <Section id="security" icon={<Shape name="diamond" />} title="Data Security">
        <p>
          Since we do not collect personal data, there is no risk of personal
          data leakage from our game.
        </p>
      </Section>

      <Section id="changes" icon={<Shape name="rectangle" />} title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated date.
        </p>
      </Section>

      <Section id="contact" icon={<Shape name="hexagon" />} title="Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:
        </p>
        <EmailCard />
      </Section>
    </ShardoraShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import TftShell, {
  JsonLd,
  Section,
  StoreBadges,
  TFT,
} from "./_components/TftShell";

const PAGE_URL = `${TFT.siteUrl}${TFT.basePath}`;
const TITLE = "TFT Meta Guide – Team Comps, Items & Champions";
const DESCRIPTION =
  "TFT Meta Guide gives Teamfight Tactics players team compositions, item recommendations, champion builds and strategy references, kept up to date with each patch.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "TFT Meta Guide",
    "Teamfight Tactics",
    "TFT comps",
    "TFT team compositions",
    "TFT items",
    "TFT champions",
    "TFT tier list",
    "TFT meta",
    "DTCL",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: TFT.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export const dynamic = "force-static";

const FEATURES = [
  { icon: "🏆", name: "Team compositions", text: "Browse strong team comps and see which champions and traits make them work." },
  { icon: "🗡️", name: "Item recommendations", text: "Know which items to build, and how to combine components into the right ones." },
  { icon: "🧙", name: "Champion builds", text: "Check each champion's traits, abilities and best items at a glance." },
  { icon: "🔗", name: "Synergies & augments", text: "Keep traits and augment references close while you plan your game." },
  { icon: "🔄", name: "Patch-aware", text: "Content is refreshed as new patches and balance changes land." },
  { icon: "🧠", name: "Strategy references", text: "Quick references to help you decide faster and climb with confidence." },
];

export default function TftHome() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: TFT.name,
    description: DESCRIPTION,
    url: PAGE_URL,
    applicationCategory: "GameApplication",
    operatingSystem: "Android, iOS",
    publisher: { "@type": "Organization", name: TFT.name, email: TFT.email },
    sameAs: [TFT.playStoreUrl, TFT.appStoreUrl].filter(Boolean),
  };

  return (
    <TftShell
      active="home"
      eyebrow="Teamfight Tactics Companion"
      title="TFT Meta Guide"
      intro={
        <>
          <p>{TFT.tagline}</p>
          <p className="mt-2 text-base text-slate-400">
            Team compositions, item recommendations, champion builds and strategy references for
            Teamfight Tactics players.
          </p>
          <div className="mt-6">
            <StoreBadges />
          </div>
        </>
      }
    >
      <JsonLd data={appJsonLd} />

      <Section icon="📘" title="What is TFT Meta Guide?">
        <p>
          TFT Meta Guide is a companion app for Teamfight Tactics. It brings the information you
          check between rounds, like comps, items, champions and synergies, into one clean place so
          you can plan your game faster.
        </p>
        <p>
          You can also browse the same guides on the web at{" "}
          <Link href={TFT.webPath} className="font-semibold text-yellow-300 underline underline-offset-4">
            dtclmeta.vn/tft
          </Link>
          .
        </p>
      </Section>

      <Section icon="✨" title="Features">
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="font-bold text-white">
                <span className="mr-2">{f.icon}</span>
                {f.name}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-300">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
        <p className="text-2xl font-bold text-white">Ready to climb?</p>
        <div className="mt-4">
          <StoreBadges />
        </div>
        <p className="mt-5 text-sm text-slate-400">
          Need help? Visit{" "}
          <Link href={`${TFT.basePath}/support`} className="font-semibold text-white underline underline-offset-4">
            Support
          </Link>{" "}
          or read the{" "}
          <Link href={`${TFT.basePath}/privacy`} className="font-semibold text-white underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </TftShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import StackFactoryShell, {
  ALL_CRATES,
  Crate,
  JsonLd,
  Section,
  STACK_FACTORY,
  StoreBadges,
} from "./_components/StackFactoryShell";

const PAGE_URL = `${STACK_FACTORY.siteUrl}${STACK_FACTORY.basePath}`;
const TITLE = "Stack Factory – Crate-Pushing Puzzle Game";
const DESCRIPTION =
  "Stack Factory is a crate-pushing puzzle game. Control a factory worker, push falling crates into full horizontal rows and watch them collapse before the stack reaches the top.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Stack Factory",
    "crate pushing game",
    "box stacking puzzle",
    "falling blocks game",
    "line clear puzzle",
    "factory puzzle game",
    "casual puzzle game",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: STACK_FACTORY.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export const dynamic = "force-static";

const CRATES: { name: (typeof ALL_CRATES)[number]; label: string; text: string }[] = [
  { name: "wood", label: "Wooden", text: "Standard and easy to push." },
  { name: "cardboard", label: "Cardboard", text: "Light and easy to move around." },
  { name: "steel", label: "Steel", text: "Heavy: takes more effort to shift." },
  { name: "ice", label: "Ice", text: "Slides until it hits something." },
  { name: "tnt", label: "TNT", text: "Blasts nearby crates when a row clears." },
  { name: "gold", label: "Gold", text: "Clear it for bonus points." },
];

const FEATURES = [
  { icon: "👷", name: "Simple controls", text: "Move your worker left and right and push crates into place. Easy to pick up, tricky to master." },
  { icon: "🧱", name: "Satisfying row clears", text: "Fill a whole horizontal row and watch it collapse. Clear several at once for a combo bonus." },
  { icon: "📦", name: "6 crate types", text: "Wooden, cardboard, steel, ice, TNT and gold crates each behave differently." },
  { icon: "⏱️", name: "Quick sessions", text: "Perfect for a short break: jump in, clear some lines and beat your best." },
  { icon: "📴", name: "No account needed", text: "Start playing right away. Your progress is saved on your device." },
];

export default function StackFactoryHome() {
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: STACK_FACTORY.name,
    description: DESCRIPTION,
    genre: ["Puzzle", "Casual", "Arcade"],
    gamePlatform: ["Android", "iOS"],
    applicationCategory: "Game",
    url: PAGE_URL,
    publisher: { "@type": "Organization", name: STACK_FACTORY.name, email: STACK_FACTORY.email },
    sameAs: [STACK_FACTORY.playStoreUrl, STACK_FACTORY.appStoreUrl].filter(Boolean),
  };

  return (
    <StackFactoryShell
      active="home"
      eyebrow="Crate Puzzle Game"
      title="Stack Factory"
      intro={
        <>
          <p>{STACK_FACTORY.tagline}</p>
          <p className="mt-2 text-base text-zinc-400">
            The factory never stops. Push falling crates into full rows and keep the warehouse
            from overflowing.
          </p>
          <div className="mt-6">
            <StoreBadges />
          </div>
        </>
      }
    >
      <JsonLd data={gameJsonLd} />

      <Section icon={<Crate name="cardboard" />} title="About the Game">
        <p>
          Crates of every kind pour down from the conveyor chutes, and it&apos;s your job as the
          floor worker to keep things in order.
        </p>
        <p>
          Push the crates into place, complete full rows to make them collapse, and keep the
          warehouse from overflowing for as long as you can.
        </p>
      </Section>

      <Section icon={<Crate name="wood" />} title="How to Play">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Crates fall from the top of the factory and land on the stack.</li>
          <li>Move your worker and <strong className="text-white">push crates</strong> sideways to fill the gaps.</li>
          <li>Fill a whole <strong className="text-white">horizontal row</strong> to make it collapse and score points.</li>
          <li>Don&apos;t let the crates pile up to the top, or the level is over.</li>
        </ol>
      </Section>

      <Section icon={<Crate name="steel" />} title="Meet the Crates">
        <div className="grid gap-3 sm:grid-cols-2">
          {CRATES.map((c) => (
            <div key={c.name} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4">
              <Crate name={c.name} size={40} />
              <div>
                <p className="font-bold text-white">{c.label}</p>
                <p className="text-sm text-zinc-300">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={<Crate name="gold" />} title="Game Features">
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.name} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <p className="font-bold text-white">
                <span className="mr-2">{f.icon}</span>
                {f.name}
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-300">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
        <p className="text-2xl font-bold text-white">Ready to clear the line?</p>
        <div className="mt-4">
          <StoreBadges />
        </div>
        <p className="mt-5 text-sm text-zinc-400">
          Need help? Visit{" "}
          <Link href={`${STACK_FACTORY.basePath}/support`} className="font-semibold text-white underline underline-offset-4">
            Support
          </Link>{" "}
          or read the{" "}
          <Link href={`${STACK_FACTORY.basePath}/privacy`} className="font-semibold text-white underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </StackFactoryShell>
  );
}

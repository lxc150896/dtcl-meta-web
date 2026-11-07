import type { Metadata } from "next";
import Link from "next/link";
import ShardoraShell, {
  ALL_SHAPES,
  JsonLd,
  Section,
  Shape,
  SHARDORA,
  StoreBadges,
} from "./_components/ShardoraShell";

const PAGE_URL = `${SHARDORA.siteUrl}${SHARDORA.basePath}`;
const TITLE = "Shardora – Cosmic Shape-Matching Puzzle Game";
const DESCRIPTION =
  "Shardora is a cosmic shape-matching puzzle game. Match identical shards to rebuild galaxies, planets and nebulae shattered by a great collision, across thousands of levels with evolving space hazards.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Shardora",
    "shape matching puzzle",
    "match pairs game",
    "space puzzle game",
    "galaxy puzzle",
    "tile matching game",
    "casual puzzle game",
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
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export const dynamic = "force-static";

const FEATURES = [
  { icon: "🔷", name: "Simple to learn", text: "Tap two shards with the same shape to fuse them and score. Easy to start, hard to master." },
  { icon: "🎯", name: "Mission-based levels", text: "Every level reveals its goals: collect specific shapes or clear marked cells before moves or time run out." },
  { icon: "🪐", name: "Living universe", text: "Gravity shifts rows, unstable zones collapse lines, and black holes and nebulae scramble the board." },
  { icon: "🌌", name: "Thousands of levels", text: "Travel across galaxies, planets, nebulae and black holes with new mechanics and steadily rising difficulty." },
  { icon: "📴", name: "Play anywhere", text: "No account needed. Jump in, restore a corner of the cosmos, and put the game down whenever you like." },
  { icon: "✨", name: "Fresh content", text: "We keep adding new levels and mechanics in updates." },
];

export default function ShardoraHome() {
  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: SHARDORA.name,
    description: DESCRIPTION,
    genre: ["Puzzle", "Casual", "Matching"],
    gamePlatform: ["Android", "iOS"],
    applicationCategory: "Game",
    url: PAGE_URL,
    publisher: { "@type": "Organization", name: SHARDORA.name, email: SHARDORA.email },
    sameAs: [SHARDORA.playStoreUrl, SHARDORA.appStoreUrl].filter(Boolean),
  };

  return (
    <ShardoraShell
      active="home"
      eyebrow="Cosmic Puzzle Game"
      title="Shardora"
      intro={
        <>
          <p>{SHARDORA.tagline}</p>
          <p className="mt-2 text-base text-slate-400">
            A great collision shattered the universe into glowing shards. Match them, fuse them,
            and rebuild every galaxy.
          </p>
          <div className="mt-6">
            <StoreBadges />
          </div>
        </>
      }
    >
      <JsonLd data={gameJsonLd} />

      <Section icon={<Shape name="diamond" />} title="The Story">
        <p>
          A colossal collision tore through the universe. Galaxies crashed into one another,
          planets cracked apart, and even black holes, white holes and nebulae shattered into
          countless glowing shards scattered across space.
        </p>
        <p>
          You are the one who can put it all back together. Find matching shards, fuse them, and
          restore each galaxy, one level at a time.
        </p>
      </Section>

      <Section icon={<Shape name="circle" />} title="How to Play">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Check the level goals shown at the start of each level.</li>
          <li>Tap a shard, then tap another shard with the <strong className="text-white">same shape</strong>.</li>
          <li>Matching shards fuse together and earn you points.</li>
          <li>Complete every goal to restore the area and unlock the next level.</li>
        </ol>
        <div className="grid grid-cols-3 gap-3 pt-2 sm:grid-cols-6">
          {ALL_SHAPES.map((s) => (
            <div key={s} className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-black/30 py-3">
              <Shape name={s} size={30} />
              <span className="text-xs capitalize text-slate-400">{s}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={<Shape name="hexagon" />} title="Game Features">
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
        <p className="text-2xl font-bold text-white">Ready to restore the cosmos?</p>
        <div className="mt-4">
          <StoreBadges />
        </div>
        <p className="mt-5 text-sm text-slate-400">
          Need help? Visit{" "}
          <Link href={`${SHARDORA.basePath}/support`} className="font-semibold text-white underline underline-offset-4">
            Support
          </Link>{" "}
          or read the{" "}
          <Link href={`${SHARDORA.basePath}/privacy`} className="font-semibold text-white underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </ShardoraShell>
  );
}

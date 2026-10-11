import type { Metadata } from "next";
import ShardoraShell, {
  ALL_SHAPES,
  EmailCard,
  JsonLd,
  Section,
  Shape,
  SHARDORA,
} from "../_components/ShardoraShell";

const PAGE_URL = `${SHARDORA.siteUrl}${SHARDORA.basePath}/support`;
const TITLE = "Shardora Support – Help, FAQ & Contact";
const DESCRIPTION =
  "Get help with Shardora, the cosmic shape-matching puzzle game. Learn how to match shards, beat planetary hazards across thousands of levels, and contact our support team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Shardora",
    "Shardora support",
    "Shardora help",
    "Shardora FAQ",
    "shape matching puzzle",
    "match pairs game",
    "space puzzle game",
    "galaxy puzzle",
    "tile matching game",
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

const FAQS: { icon: string; q: string; a: string }[] = [
  {
    icon: "🎮",
    q: "How do I play Shardora?",
    a: "Each level shows a board of cells, and every cell holds cosmic shards in different shapes: circles, triangles, squares, diamonds, hexagons and rectangles. Tap two shards with the same shape to fuse them back together and earn points. Complete the level's goals to restore that corner of the galaxy.",
  },
  {
    icon: "🎯",
    q: "What are level goals?",
    a: "At the start of a level, the board reveals its missions, such as collecting a certain number of a specific shape or clearing a set of cells. Finish every mission before you run out of moves or time to complete the level.",
  },
  {
    icon: "🪐",
    q: "Why do the cells move, shift or collapse?",
    a: "As you travel through the universe, planets and cosmic phenomena bring their own forces: gravity can shift rows, unstable zones can collapse lines, and black holes or nebulae can scramble the board. These mechanics are part of the challenge. Watch the board closely and plan your matches around them.",
  },
  {
    icon: "🌌",
    q: "How many levels are there?",
    a: "Shardora has thousands of levels spread across many galaxies, planets, nebulae and black holes. Difficulty grows gradually, and new mechanics are introduced along the way. We keep adding new levels in updates.",
  },
  {
    icon: "💾",
    q: "Will I lose my progress?",
    a: "Your progress is saved on your device. Uninstalling the game or clearing the app's data may reset it. Please keep the game updated to the latest version to avoid issues.",
  },
  {
    icon: "⚠️",
    q: "An ad did not load or I didn't get my reward.",
    a: "Ads depend on your network connection and ad availability in your region. Please check your internet connection and try again later. If the problem continues, contact us with your device model and game version.",
  },
  {
    icon: "🐞",
    q: "The game crashes or runs slowly.",
    a: "Try restarting the game and your device, make sure you have free storage, and update to the latest version. If it still happens, email us with your device model, OS version and a short description of what happened.",
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

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: SHARDORA.name,
    description:
      "A cosmic shape-matching puzzle game. Match identical shards to rebuild galaxies, planets and nebulae shattered by a great collision, across thousands of levels.",
    genre: ["Puzzle", "Casual", "Matching"],
    gamePlatform: ["Android", "iOS"],
    applicationCategory: "Game",
    url: PAGE_URL,
    publisher: { "@type": "Organization", name: SHARDORA.name, email: SHARDORA.email },
  };

  return (
    <ShardoraShell
      active="support"
      eyebrow="Help Center"
      title="Shardora Support"
      intro={
        <p>
          Need a hand restoring the cosmos? Find answers to common questions
          below, or reach out to us anytime.
        </p>
      }
    >
      <JsonLd data={faqJsonLd} />
      <JsonLd data={gameJsonLd} />

      <Section icon={<Shape name="diamond" />} title="The Story">
        <p>
          A colossal collision tore through the universe. Galaxies crashed into
          one another, planets cracked apart, and even black holes, white holes
          and nebulae shattered into countless glowing shards scattered across
          space.
        </p>
        <p>
          You are the one who can put it all back together. Find matching
          shards, fuse them, and restore each galaxy, one level at a time.
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
            <div
              key={s}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-black/30 py-3"
            >
              <Shape name={s} size={30} />
              <span className="text-xs capitalize text-slate-400">{s}</span>
            </div>
          ))}
        </div>
      </Section>

      <section className="space-y-3">
        <h2 className="px-1 text-xl font-bold text-white md:text-2xl">
          Frequently Asked Questions
        </h2>
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 open:border-sky-400/30 open:bg-white/[0.06]"
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

      <Section icon={<Shape name="hexagon" />} title="Contact Us">
        <p>
          For bug reports, feedback, suggestions or business inquiries, email
          us. To help us solve your issue faster, please include your device
          model, OS version and game version.
        </p>
        <EmailCard note="We usually respond within 24–48 hours." />
      </Section>
    </ShardoraShell>
  );
}

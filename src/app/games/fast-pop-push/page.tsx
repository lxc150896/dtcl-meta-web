import type { Metadata } from "next";
import Image from "next/image";
import BubblinkShell, {
  BUBBLINK,
  COLORS,
  headingFont,
  JsonLd,
  Section,
  StoreBadges,
} from "./_components/BubblinkShell";

const PAGE_URL = `${BUBBLINK.siteUrl}${BUBBLINK.basePath}`;
const OG_IMAGE = `${BUBBLINK.siteUrl}${BUBBLINK.img}/og.jpg`;
const TITLE = "Bubblink: Fidget Bubble Pop – Pop It Game";
const DESCRIPTION =
  "Bubblink is a satisfying pop it game. Pop every glowing bubble before time runs out across 30 levels and 6 ranks, or relax in Zen, Memory, Daily and Endless modes.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Bubblink",
    "Bubblink: Fidget Bubble Pop",
    "pop it game",
    "fidget bubble pop",
    "bubble pop game",
    "fidget toy game",
    "relaxing game",
    "reflex game",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: BUBBLINK.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1200, height: 581, alt: "Pastel pop it fidget toys" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export const dynamic = "force-static";

const MODES = [
  { icon: "⚡", name: "Levels", color: COLORS.pink, text: "Pop every glowing bubble before the timer runs out. 30 levels across 6 ranks, from Rookie to Pop God." },
  { icon: "♾️", name: "Endless", color: COLORS.peach, text: "One more bubble and a little faster every round. How far can you go?" },
  { icon: "📅", name: "Daily", color: COLORS.yellow, text: "A fresh level every day. Keep your streak going and earn bonus coins." },
  { icon: "🧘", name: "Zen", color: COLORS.mint, text: "No timer, no lives. Tap or slide to pop and just relax." },
  { icon: "🧠", name: "Memory", color: COLORS.blue, text: "Watch the bubbles glow, then pop the ones you remember." },
  { icon: "🎨", name: "Shop", color: COLORS.lavender, text: "Spend coins on themes, shapes, colors and pop sounds: Galaxy, Donut Shop, Honeycomb, 8-bit and more." },
];

export default function BubblinkHome() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": ["VideoGame", "MobileApplication"],
    name: BUBBLINK.storeName,
    alternateName: BUBBLINK.name,
    description: DESCRIPTION,
    image: OG_IMAGE,
    url: PAGE_URL,
    genre: ["Casual", "Puzzle", "Arcade"],
    applicationCategory: "GameApplication",
    operatingSystem: "Android, iOS",
    gamePlatform: ["Android", "iOS"],
    inLanguage: "en",
    sameAs: [BUBBLINK.playStoreUrl, BUBBLINK.appStoreUrl].filter(Boolean),
  };

  return (
    <BubblinkShell
      active="home"
      hero={
        <div className="text-center">
          <div className="overflow-hidden rounded-[28px] border-2 border-white/25 shadow-[0_10px_0_rgba(20,0,50,0.3)]">
            <Image
              src={`${BUBBLINK.img}/feature.webp`}
              alt="Pastel pop it fidget toys in star, circle and square shapes"
              width={1200}
              height={581}
              priority
              className="h-auto w-full"
            />
          </div>
          <h1 className={`${headingFont} mt-8 text-4xl font-bold text-white md:text-5xl`}>
            {BUBBLINK.name}
            <span className="block text-2xl md:text-3xl" style={{ color: COLORS.yellow }}>Fidget Bubble Pop</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-pink-50/90 md:text-lg">
            The satisfying pop it toy, now a game. Test your reflexes, train your memory, or just pop
            and unwind.
          </p>
          <div className="mt-6">
            <StoreBadges />
          </div>
        </div>
      }
    >
      <JsonLd data={appJsonLd} />

      <Section icon="🫧" title="Ways to Play" accent={COLORS.pink}>
        <div className="grid gap-3 sm:grid-cols-2">
          {MODES.map((m) => (
            <div key={m.name} className="rounded-2xl border-2 bg-black/15 p-4" style={{ borderColor: `${m.color}88` }}>
              <p className={`${headingFont} text-lg font-bold`} style={{ color: m.color }}>
                {m.icon} {m.name}
              </p>
              <p className="mt-1 text-sm leading-6">{m.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon="👑" title="No Ads Pass" accent={COLORS.yellow}>
        <p>Prefer to skip the ads? The optional No Ads Pass (monthly or yearly) gives you:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Rewards straight away without ads: extra lives, continues and ×2 coins</li>
          <li>Unlimited lives: play as much as you like</li>
          <li>100 free coins every day</li>
        </ul>
      </Section>

    </BubblinkShell>
  );
}

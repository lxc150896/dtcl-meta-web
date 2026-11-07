import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LeapLickShell, {
  COLORS,
  headingFont,
  JsonLd,
  LEAP_LICK,
  Section,
  StoreBadges,
} from "./_components/LeapLickShell";

const PAGE_URL = `${LEAP_LICK.siteUrl}${LEAP_LICK.basePath}`;
const OG_IMAGE = `${LEAP_LICK.siteUrl}${LEAP_LICK.img}/og.jpg`;
const TITLE = "Leap & Lick: Frog Platformer – Two Buddies, One Tongue";
const DESCRIPTION =
  "Leap & Lick is a co-op style platformer where you control two buddies at once. Leap the frog jumps far, Lizi the frog jumps high, and their stretchy tongues pull each other across gaps in 15 levels over 5 worlds. Download on the App Store.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Leap & Lick",
    "Leap and Lick",
    "Leap & Lick: Frog Platformer",
    "frog platformer",
    "co-op platformer",
    "two character platformer",
    "two frog game",
    "tongue puzzle platformer",
    "casual platformer game",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: LEAP_LICK.name,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: OG_IMAGE, width: 1024, height: 500, alt: "Leap & Lick: two frog buddies leap across a canyon with a stretchy tongue" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export const dynamic = "force-static";

const FEATURES = [
  { icon: "👆👆", color: COLORS.leap, name: "Two thumbs, two heroes", text: "Guide both buddies at the same time: left thumb for Leap, right thumb for Lizi." },
  { icon: "👅", color: COLORS.tongue, name: "Stretchy tongue teamwork", text: "Lick, grab and pull your partner across gaps and up ledges they can't reach alone." },
  { icon: "🗺️", color: COLORS.lizi, name: "5 worlds, 15 levels", text: "Desert, Jungle, Ice, Volcano and Space, each with its own tricks and hazards." },
  { icon: "⭐", color: "#FFD23F", name: "Earn up to 3 stars", text: "The fewer times your buddies fall, the more stars you earn. Replay to perfect every level." },
  { icon: "🍄", color: "#FFB84D", name: "Power-ups", text: "Star Coins for a super-long jump and Mega Mushrooms to grow huge and smash through crates." },
  { icon: "🚩", color: COLORS.sky, name: "Checkpoints for both", text: "Flags save progress once both buddies touch them. Stick together to stay safe." },
];

const WORLDS = [
  { key: "desert", name: "Desert", emoji: "🏜️", color: "#F2B45A", text: "Quicksand, sinkholes, sandstorms and temple cannons firing rolling boulders." },
  { key: "jungle", name: "Jungle", emoji: "🌿", color: COLORS.leap, text: "Swinging vines, falling trees that become bridges, poison mushrooms and bouncy shrooms." },
  { key: "ice", name: "Ice", emoji: "❄️", color: COLORS.sky, text: "Slippery ice, launching slopes, falling icicles and sinking ice floes." },
  { key: "volcano", name: "Volcano", emoji: "🌋", color: "#FF5A3C", text: "Hot rocks, erupting volcanoes, lavafalls and rising lava." },
  { key: "space", name: "Space", emoji: "🪐", color: "#B48CFF", text: "Low gravity, meteor showers, gravity vortexes, portals and lasers." },
];

export default function LeapLickHome() {
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": ["VideoGame", "MobileApplication"],
    name: LEAP_LICK.storeName,
    alternateName: LEAP_LICK.name,
    description: DESCRIPTION,
    image: OG_IMAGE,
    url: PAGE_URL,
    genre: ["Platformer", "Puzzle", "Casual"],
    applicationCategory: "GameApplication",
    operatingSystem: "Android, iOS, iPadOS",
    gamePlatform: ["Android", "iOS"],
    contentRating: "13+",
    inLanguage: "en",
    author: { "@type": "Organization", name: LEAP_LICK.developer, email: LEAP_LICK.email },
    publisher: { "@type": "Organization", name: LEAP_LICK.developer, email: LEAP_LICK.email },
    sameAs: [
      LEAP_LICK.appStoreLive && LEAP_LICK.appStoreUrl,
      LEAP_LICK.playStoreLive && LEAP_LICK.playStoreUrl,
    ].filter(Boolean),
  };

  return (
    <LeapLickShell
      active="home"
      hero={
        <div className="text-center">
          <div className="relative overflow-hidden rounded-3xl border-2 border-white/15 shadow-[0_10px_0_rgba(0,0,0,0.3)]">
            <Image
              src={`${LEAP_LICK.img}/feature.webp`}
              alt="Lizi licks Leap with a stretchy tongue and pulls him across a canyon gap"
              width={1024}
              height={500}
              priority
              className="h-auto w-full"
            />
          </div>
          <h1 className={`${headingFont} mt-8 text-4xl font-bold text-white md:text-5xl`}>
            Leap &amp; Lick
            <span className="block text-2xl md:text-3xl" style={{ color: COLORS.lizi }}>
              Frog Platformer
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-violet-100/85 md:text-lg">
            {LEAP_LICK.tagline} Control two buddies at once and use their stretchy tongues to
            pull each other through five wild worlds.
          </p>
          <div className="mt-6">
            <StoreBadges />
          </div>
        </div>
      }
    >
      <JsonLd data={appJsonLd} />

      <Section icon="💚" title="Meet the Buddies" accent={COLORS.leap}>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { name: "Leap", species: "frog", img: "hero-leap", color: COLORS.leap, skill: "Long jumper", text: "A lanky green frog with long orange feet. Leap clears gaps nobody else can." },
            { name: "Lizi", species: "frog", img: "hero-lizi", color: COLORS.teal, skill: "High jumper", text: "A round, bubbly teal frog and a natural climber. Lizi reaches ledges others can only dream of." },
          ].map((b) => (
            <div
              key={b.name}
              className="flex items-center gap-4 rounded-3xl border-2 p-4"
              style={{ borderColor: `${b.color}66`, background: `linear-gradient(160deg, ${b.color}26, transparent 70%)` }}
            >
              <Image src={`${LEAP_LICK.img}/${b.img}.webp`} alt={`${b.name} the ${b.species}`} width={96} height={96} className="h-[96px] w-[96px] shrink-0 rounded-2xl object-cover" />
              <div>
                <p className={`${headingFont} text-2xl font-bold`} style={{ color: b.color }}>{b.name}</p>
                <p className="text-sm text-violet-200/70">{b.species}</p>
                <p className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-[#2b1658]" style={{ background: b.color }}>{b.skill}</p>
                <p className="mt-2 text-sm leading-6 text-violet-100/85">{b.text}</p>
              </div>
            </div>
          ))}
        </div>
        <p>
          Two best friends, five wild lands. Alone, neither can make it. Together, with their
          stretchy tongues, no gap is ever too far.
        </p>
      </Section>

      <Section icon="🎮" title="Game Features" accent={COLORS.sky}>
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.name} className="rounded-2xl border-2 bg-black/15 p-4" style={{ borderColor: `${f.color}66` }}>
              <p className={`${headingFont} text-lg font-bold`} style={{ color: f.color }}>
                {f.icon} {f.name}
              </p>
              <p className="mt-1 text-sm leading-6">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon="🌍" title="5 Worlds to Explore" accent={COLORS.lizi}>
        <figure className="overflow-hidden rounded-2xl border-2 border-white/10 bg-black/25">
          <Image
            src={`${LEAP_LICK.img}/level-select.webp`}
            alt="Leap & Lick level select screen with 15 levels across Desert, Tropical Forest and Ice worlds"
            width={1280}
            height={589}
            className="h-auto w-full"
          />
          <figcaption className="px-4 py-2 text-center text-xs text-violet-200/60">
            Pick a level, earn up to 3 stars each, and unlock the next world.
          </figcaption>
        </figure>
        <div className="grid gap-4 sm:grid-cols-2">
          {WORLDS.map((w, i) => (
            <article
              key={w.key}
              className={`overflow-hidden rounded-2xl border-2 bg-black/25 ${i === WORLDS.length - 1 ? "sm:col-span-2" : ""}`}
              style={{ borderColor: `${w.color}55` }}
            >
              <Image
                src={`${LEAP_LICK.img}/world-${w.key}.webp`}
                alt={`${w.name} world gameplay in Leap & Lick`}
                width={640}
                height={360}
                className="aspect-video h-auto w-full object-cover"
              />
              <div className="p-4">
                <h3 className={`${headingFont} text-xl font-bold`} style={{ color: w.color }}>
                  {w.emoji} {w.name}
                </h3>
                <p className="mt-1 text-sm leading-6">{w.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section icon="👑" title="Free to Play, VIP Optional" accent={COLORS.tongue}>
        <p>Leap &amp; Lick is free to download, with levels 1 and 2 always free and 3 free plays every day after that. Want to play without limits? The optional VIP subscription (monthly or yearly) gives you:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>No ads</li>
          <li>Unlimited plays</li>
          <li>Unlimited lives</li>
        </ul>
      </Section>

      <div className="rounded-3xl border-2 border-white/10 bg-white/[0.06] p-6 text-center">
        <p className={`${headingFont} text-2xl font-bold text-white`}>Ready to leap?</p>
        <div className="mt-4">
          <StoreBadges />
        </div>
        <p className="mt-5 text-sm text-violet-200/70">
          Need help? Visit{" "}
          <Link href={`${LEAP_LICK.basePath}/support`} className="font-semibold text-white underline underline-offset-4">
            Support
          </Link>{" "}
          or read the{" "}
          <Link href={`${LEAP_LICK.basePath}/privacy`} className="font-semibold text-white underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </LeapLickShell>
  );
}

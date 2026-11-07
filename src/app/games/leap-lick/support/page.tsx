import type { Metadata } from "next";
import Image from "next/image";
import LeapLickShell, {
  COLORS,
  EmailCard,
  headingFont,
  JsonLd,
  LEAP_LICK,
  Section,
  StoreBadges,
} from "../_components/LeapLickShell";

const PAGE_URL = `${LEAP_LICK.siteUrl}${LEAP_LICK.basePath}/support`;
const OG_IMAGE = `${LEAP_LICK.siteUrl}${LEAP_LICK.img}/og.jpg`;
const TITLE = "Leap & Lick Support – Controls, FAQ & Contact";
const DESCRIPTION =
  "Help for Leap & Lick: Buddy Platformer. Learn the two-thumb controls, how to use the tongue to pull your buddy across, stars, lives, daily plays, VIP and Restore Purchases, or contact support.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Leap & Lick",
    "Leap and Lick",
    "Leap & Lick support",
    "Leap & Lick help",
    "Leap & Lick FAQ",
    "Buddy Platformer",
    "co-op platformer",
    "two character platformer",
    "two frog game",
    "platformer game help",
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
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const WORLDS = [
  {
    key: "desert",
    name: "Desert",
    emoji: "🏜️",
    color: "#F2B45A",
    levels: "Scorching Trail · Quicksand Valley · Sandstorm Temple",
    hazards: "Quicksand, sinkholes, sandstorms, sand jets and ancient temple cannons firing rolling boulders.",
  },
  {
    key: "jungle",
    name: "Jungle",
    emoji: "🌿",
    color: COLORS.leap,
    levels: "Canopy Path · Spore Hollow · Rapids",
    hazards: "Swinging vines, falling trees that become bridges, poison mushrooms, popping thorn bushes and bouncy mushrooms.",
  },
  {
    key: "ice",
    name: "Ice",
    emoji: "❄️",
    color: COLORS.sky,
    levels: "Frozen Lake · Icicle Cave · Frost Tide",
    hazards: "Slippery ice, ice slopes that launch you further, falling icicles, rising ice spikes and sinking ice floes.",
  },
  {
    key: "volcano",
    name: "Volcano",
    emoji: "🌋",
    color: "#FF5A3C",
    levels: "Ember Steps · Magma Ladder · Crater Heart",
    hazards: "Hot rocks that burn if you stand still, erupting volcanoes, lavafalls, rising lava and lava geysers.",
  },
  {
    key: "space",
    name: "Space",
    emoji: "🪐",
    color: "#B48CFF",
    levels: "Orbital Foundry · Vortex Drift · Supernova",
    hazards: "Low gravity, meteor showers, drifting rocks that carry you, gravity vortexes, teleport portals and lasers.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I control two characters at once?",
    a: "Use both thumbs. The left side of the screen controls Leap the frog and the right side controls Lizi the frog. Each buddy has Left, Right and Jump buttons. Tap a direction for a short step, or hold it to speed up into a run.",
  },
  {
    q: "How does the tongue work?",
    a: "When a buddy is facing their partner, press the Tongue button to lick, grab and pull the partner over to them. Use it to bring your buddy across gaps or up ledges they can't reach alone.",
  },
  {
    q: "How do I jump higher or further?",
    a: "Hold Jump for a higher jump, or release it early for a short hop. Run first and then jump right away to keep your momentum and fly further. In the Ice world, jumping off an ice slope sends you even further.",
  },
  {
    q: "I'm stuck on a wide gap or a high ledge. What should I do?",
    a: "Use each buddy's strength. Leap jumps further, so he can cross wide gaps and then pull Lizi over with his tongue. Lizi jumps higher, so she can climb tall ledges and then pull Leap up. Star coins also give each buddy one super-long jump.",
  },
  {
    q: "How do I finish a level?",
    a: "Bring both Leap and Lizi into the exit gate. A level is not complete until both buddies are inside.",
  },
  {
    q: "Why didn't the checkpoint save?",
    a: "A checkpoint only saves when both buddies have touched the flag. Make sure Leap and Lizi both reach it.",
  },
  {
    q: "How are stars calculated?",
    a: "Each level gives up to 3 stars, based on how many times your buddies die. Replay a level with fewer deaths to earn more stars.",
  },
  {
    q: "What is the difference between lives and plays?",
    a: "Each play gives you 3 lives. If you lose them all, you can watch an ad to restore 3 lives and continue from the last checkpoint. Plays are how many times you can start a level you haven't beaten yet.",
  },
  {
    q: "How many free plays do I get?",
    a: "Levels 1 and 2 are always free. From level 3 on, you get 3 free plays per day for levels you haven't beaten yet. Pressing Next after a win and replaying levels you've already beaten does not use a play. When you're out of plays, watch an ad for +1 play or get VIP.",
  },
  {
    q: "I changed my device clock but my plays didn't reset.",
    a: "To keep things fair, the game checks the real time from the internet instead of trusting the device clock. Free plays refill on the next real day.",
  },
  {
    q: "What does VIP include?",
    a: "VIP is a monthly or yearly subscription that removes all ads and gives you unlimited plays and unlimited lives.",
  },
  {
    q: "I reinstalled the game or changed devices. How do I get VIP back?",
    a: "Open the game and tap Restore Purchases while signed in to the same Apple ID or Google account you used to subscribe. Note that level progress, stars and settings are stored only on your device, so they are not restored after uninstalling.",
  },
  {
    q: "How do I cancel my VIP subscription?",
    a: "Subscriptions are managed by the store. On iPhone or iPad, go to Settings → your name → Subscriptions. On Android, open Google Play → Profile → Payments & subscriptions → Subscriptions. Uninstalling the game does not cancel a subscription.",
  },
  {
    q: "The ad didn't load or I didn't get my reward.",
    a: "Ads depend on your internet connection and ad availability in your region. Check your connection and try again in a moment. If it keeps happening, email us with your device model and game version.",
  },
  {
    q: "How do I change my ad consent choice?",
    a: "If you are in the EEA, the UK or Switzerland, you can review or change your ad consent at any time from the game's Settings screen. On iOS you can also change tracking permission in Settings → Privacy & Security → Tracking.",
  },
  {
    q: "Is Leap & Lick suitable for children?",
    a: "Leap & Lick is rated for ages 13 and up. It has gentle cartoon action with no violence, no chat and no user-generated content, but it is not designed for young children.",
  },
];

function Buddy({
  name,
  species,
  img,
  color,
  skill,
  text,
}: {
  name: string;
  species: string;
  img: string;
  color: string;
  skill: string;
  text: string;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-3xl border-2 p-4"
      style={{ borderColor: `${color}66`, background: `linear-gradient(160deg, ${color}26, transparent 70%)` }}
    >
      <Image src={img} alt={`${name} the ${species}`} width={96} height={96} className="h-[96px] w-[96px] shrink-0 rounded-2xl object-cover" />
      <div>
        <p className={`${headingFont} text-2xl font-bold`} style={{ color }}>
          {name}
        </p>
        <p className="text-sm text-violet-200/70">{species}</p>
        <p className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-[#2b1658]" style={{ background: color }}>
          {skill}
        </p>
        <p className="mt-2 text-sm leading-6 text-violet-100/85">{text}</p>
      </div>
    </div>
  );
}

function Key({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className={`${headingFont} inline-flex h-11 min-w-11 items-center justify-center rounded-2xl px-3 text-lg font-bold text-[#2b1658] shadow-[0_4px_0_rgba(0,0,0,0.3)]`}
      style={{ background: color }}
    >
      {children}
    </span>
  );
}

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

  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": ["VideoGame", "MobileApplication"],
    name: LEAP_LICK.storeName,
    alternateName: LEAP_LICK.name,
    description:
      "A co-op style platformer where you control two buddies at once: Leap the frog jumps far, Lizi the frog jumps high, and their stretchy tongues pull each other across gaps through 15 levels in 5 worlds.",
    image: OG_IMAGE,
    url: PAGE_URL,
    genre: ["Platformer", "Puzzle", "Casual"],
    applicationCategory: "GameApplication",
    operatingSystem: "Android, iOS, iPadOS",
    gamePlatform: ["Android", "iOS"],
    contentRating: "13+",
    author: { "@type": "Organization", name: LEAP_LICK.developer, email: LEAP_LICK.email },
    publisher: { "@type": "Organization", name: LEAP_LICK.developer, email: LEAP_LICK.email },
    sameAs: [LEAP_LICK.appStoreLive && LEAP_LICK.appStoreUrl, LEAP_LICK.playStoreLive && LEAP_LICK.playStoreUrl].filter(Boolean),
  };

  return (
    <LeapLickShell
      active="support"
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
          <p className={`${headingFont} mt-8 text-sm font-semibold uppercase tracking-[0.25em]`} style={{ color: COLORS.leap }}>
            Help Center
          </p>
          <h1 className={`${headingFont} mt-2 text-4xl font-bold text-white md:text-5xl`}>
            Leap &amp; Lick <span style={{ color: COLORS.lizi }}>Support</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-violet-100/85 md:text-lg">
            Stuck on a tricky gap? Questions about lives, plays or VIP? Find the
            answers below, or send us a message anytime.
          </p>
          <div className="mt-6">
            <StoreBadges />
          </div>
        </div>
      }
    >
      <JsonLd data={faqJsonLd} />
      <JsonLd data={appJsonLd} />

      <Section icon="💚" title="Meet the Buddies" accent={COLORS.leap}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Buddy
            name="Leap"
            species="frog"
            img={`${LEAP_LICK.img}/hero-leap.webp`}
            color={COLORS.leap}
            skill="Long jumper"
            text="A lanky green frog with long orange feet. Leap clears gaps nobody else can."
          />
          <Buddy
            name="Lizi"
            species="frog"
            img={`${LEAP_LICK.img}/hero-lizi.webp`}
            color={COLORS.teal}
            skill="High jumper"
            text="A round, bubbly teal frog and a natural climber. Lizi reaches ledges others can only dream of."
          />
        </div>
        <p>
          Two best friends set off on an adventure across five wild lands. Alone,
          neither of them could make it. Together, with their stretchy tongues,
          no gap is ever too far.
        </p>
      </Section>

      <Section icon="🎮" title="How to Play" accent={COLORS.sky}>
        <p>
          Leap &amp; Lick is a landscape platformer where you guide{" "}
          <strong className="text-white">both buddies at the same time</strong>,
          one with each thumb.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border-2 bg-black/20 p-4" style={{ borderColor: `${COLORS.leap}55` }}>
            <p className="mb-3 text-sm font-semibold" style={{ color: COLORS.leap }}>
              Left thumb → Leap
            </p>
            <div className="flex gap-2">
              <Key color={COLORS.leap}>◀</Key>
              <Key color={COLORS.leap}>▶</Key>
              <Key color={COLORS.leap}>⤒</Key>
            </div>
          </div>
          <div className="rounded-2xl border-2 bg-black/20 p-4" style={{ borderColor: `${COLORS.teal}55` }}>
            <p className="mb-3 text-sm font-semibold" style={{ color: COLORS.teal }}>
              Right thumb → Lizi
            </p>
            <div className="flex gap-2">
              <Key color={COLORS.teal}>◀</Key>
              <Key color={COLORS.teal}>▶</Key>
              <Key color={COLORS.teal}>⤒</Key>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border-2 bg-black/20 p-4" style={{ borderColor: `${COLORS.tongue}55` }}>
          <Key color={COLORS.tongue}>👅</Key>
          <p>
            <strong style={{ color: COLORS.tongue }}>Tongue:</strong> when a buddy
            faces their partner, tap it to lick, grab and pull the partner over.
          </p>
        </div>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong className="text-white">Tap</strong> a direction for a short step; <strong className="text-white">hold</strong> it to build up into a run.</li>
          <li><strong className="text-white">Hold Jump</strong> to jump higher; release early for a small hop.</li>
          <li><strong className="text-white">Run, then jump</strong> straight away to keep your momentum and fly further.</li>
          <li>Get <strong className="text-white">both buddies</strong> into the exit gate to clear the level.</li>
          <li>Checkpoint flags save only when <strong className="text-white">both buddies</strong> touch them.</li>
          <li>Earn up to <strong className="text-white">3 ⭐</strong> per level. The fewer deaths, the more stars.</li>
        </ul>
      </Section>

      <Section icon="🗺️" title="5 Worlds, 15 Levels" accent={COLORS.lizi}>
        <p>Each world brings new hazards, and the challenge ramps up as you go. Beat a level to unlock the next.</p>
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
                <p className="text-xs text-violet-200/60">{w.levels}</p>
                <p className="mt-2 text-sm leading-6">{w.hazards}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section icon="✨" title="Power-ups" accent="#FFD23F">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-yellow-300/30 bg-black/20 p-4">
            <p className={`${headingFont} text-lg font-bold text-yellow-300`}>⭐ Star Coin</p>
            <p className="mt-1 text-sm leading-6">Gives each buddy one super-long jump.</p>
          </div>
          <div className="rounded-2xl border-2 border-amber-300/30 bg-black/20 p-4">
            <p className={`${headingFont} text-lg font-bold text-amber-300`}>🍄 Mega Mushroom</p>
            <p className="mt-1 text-sm leading-6">Grow huge, smash wooden crates and stomp thorn bushes and poison mushrooms flat.</p>
          </div>
        </div>
      </Section>

      <Section icon="❤️" title="Lives, Plays & VIP" accent={COLORS.tongue}>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong className="text-white">Lives:</strong> every play starts with 3 lives. Out of lives? Watch an ad to restore 3 and continue from your last checkpoint.</li>
          <li><strong className="text-white">Plays:</strong> levels 1–2 are always free. From level 3, you get 3 free plays a day for levels you haven&apos;t beaten yet. Out of plays? Watch an ad for +1 play.</li>
          <li><strong className="text-white">Free replays:</strong> tapping Next after a win and replaying beaten levels never uses a play.</li>
          <li><strong className="text-white">VIP</strong> (monthly or yearly): no ads, unlimited plays and unlimited lives.</li>
        </ul>
      </Section>

      <section className="space-y-3">
        <h2 className={`${headingFont} px-1 text-2xl font-bold text-white md:text-[28px]`}>
          Frequently Asked Questions
        </h2>
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border-2 border-white/10 bg-white/[0.06] p-5 open:border-[#8BE04A]/50"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white">
              <span>{f.q}</span>
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold text-[#2b1658] transition group-open:rotate-45"
                style={{ background: COLORS.leap }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-7 text-violet-100/85">{f.a}</p>
          </details>
        ))}
      </section>

      <Section id="contact" icon="💌" title="Contact Us" accent={COLORS.tongue}>
        <p>
          Found a bug, have feedback or a business inquiry? Email us. To help us
          fix things faster, please include your device model, OS version, game
          version and the level where it happened.
        </p>
        <EmailCard note="We usually respond within 24–48 hours." />
      </Section>
    </LeapLickShell>
  );
}

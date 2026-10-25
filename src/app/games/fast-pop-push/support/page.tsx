import type { Metadata } from "next";
import BubblinkShell, {
  BUBBLINK,
  BubbleRow,
  COLORS,
  EmailCard,
  headingFont,
  JsonLd,
  Section,
} from "../_components/BubblinkShell";

const PAGE_URL = `${BUBBLINK.siteUrl}${BUBBLINK.basePath}/support`;
const OG_IMAGE = `${BUBBLINK.siteUrl}${BUBBLINK.img}/og.jpg`;
const TITLE = "Support – Bubblink";
const DESCRIPTION =
  "Help for Bubblink: Fidget Bubble Pop. How to play, stars and ranks, lives and coins, the No Ads Pass, Restore purchases, and how to contact support.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Bubblink",
    "Bubblink support",
    "Bubblink help",
    "Bubblink FAQ",
    "Bubblink: Fidget Bubble Pop",
    "pop it game",
    "fidget bubble pop",
    "No Ads Pass",
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
    images: [{ url: OG_IMAGE, width: 1200, height: 581 }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE] },
};

export const dynamic = "force-static";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I play Bubblink?",
    a: "Each round lights up some bubbles. Pop every glowing bubble before the timer bar runs out. Tapping the wrong bubble or running out of time ends the run, so be quick and accurate.",
  },
  {
    q: "How do stars work?",
    a: "You earn the 1st star for popping 40% of a level's bubbles, the 2nd for 70%, and the 3rd for clearing every round. A level with at least 1 star counts as cleared and unlocks the next one.",
  },
  {
    q: "How do I unlock the next rank?",
    a: "There are 30 levels across 6 ranks: Rookie, Popper, Pro, Expert, Master and Pop God. Collect 8 stars in a rank to open the next one.",
  },
  {
    q: "What are the other game modes?",
    a: "Endless gets faster every round and saves your best score. Daily is one new level each day and doesn't cost a life. Zen has no timer and no lives, so you can just pop and relax. Memory shows glowing bubbles, hides them, and asks you to pop the ones that glowed.",
  },
  {
    q: "How do lives work?",
    a: "You can hold up to 5 lives, and 1 life refills every hour. Each Level or Endless run uses 1 life, but continuing to the next level right after a win is free. Out of lives? Watch an ad for +2 lives or spend 30 coins for +1 life.",
  },
  {
    q: "I changed my device clock but my lives didn't refill.",
    a: "To keep things fair, the game checks the real time from the internet when it can. Lives refill based on the real time that has passed.",
  },
  {
    q: "How do I earn and spend coins?",
    a: "Earn coins from new stars, the Daily challenge and Endless runs, and double them by watching an ad after a game. Spend them on extra lives, continues, and new themes, shapes, colors and sounds in the Shop.",
  },
  {
    q: "What is the No Ads Pass?",
    a: "An optional monthly or yearly subscription. While it's active you get rewards (extra lives, continues and ×2 coins) straight away without watching ads, unlimited lives, and 100 free coins every day.",
  },
  {
    q: "I reinstalled the game or changed phones. How do I get my No Ads Pass back?",
    a: "Open the Shop and tap Restore purchases while signed in to the same Apple ID or Google account you subscribed with. Note that progress, stars and coins are stored only on your device and are not restored after uninstalling.",
  },
  {
    q: "How do I cancel the No Ads Pass?",
    a: "Cancel at least 24 hours before the current period ends. On iPhone or iPad: Settings → your name → Subscriptions. On Android: Google Play → Profile → Payments & subscriptions → Subscriptions. You can also tap Manage subscription in the game's Shop. Uninstalling the game does not cancel it.",
  },
  {
    q: "The ad didn't load or I didn't get my reward.",
    a: "Ads depend on your internet connection and ad availability. Check your connection and try again. If ads fail several times in a row, the game gives you the reward anyway.",
  },
  {
    q: "How do I turn off sound or vibration?",
    a: "Open Settings from the main menu and toggle Sound or Vibration.",
  },
];

const RANKS = [
  { name: "Rookie", color: COLORS.mint },
  { name: "Popper", color: COLORS.blue },
  { name: "Pro", color: COLORS.lavender },
  { name: "Expert", color: COLORS.yellow },
  { name: "Master", color: COLORS.peach },
  { name: "Pop God", color: COLORS.pink },
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
    <BubblinkShell
      active="support"
      hero={
        <div className="text-center">
          <p className={`${headingFont} text-sm font-semibold uppercase tracking-[0.25em]`} style={{ color: COLORS.yellow }}>
            Help Center
          </p>
          <h1 className={`${headingFont} mt-2 text-4xl font-bold text-white md:text-5xl`}>Bubblink Support</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-pink-50/90 md:text-lg">
            Need help with lives, stars or the No Ads Pass? Find quick answers below, or send us a
            message anytime.
          </p>
          <div className="mt-6">
            <BubbleRow />
          </div>
        </div>
      }
    >
      <JsonLd data={faqJsonLd} />

      <Section icon="🎮" title="How to Play" accent={COLORS.mint}>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>Each round lights up some bubbles.</li>
          <li>Pop <strong className="text-white">every glowing bubble</strong> before the timer bar runs out.</li>
          <li>A wrong tap or running out of time ends the run.</li>
          <li>Earn up to <strong className="text-white">3 ⭐</strong> per level: 40%, 70% and every round cleared.</li>
        </ol>
        <div className="flex flex-wrap gap-2 pt-1">
          {RANKS.map((r) => (
            <span
              key={r.name}
              className={`${headingFont} rounded-full px-3 py-1 text-sm font-semibold text-[#3A1466]`}
              style={{ background: r.color }}
            >
              {r.name}
            </span>
          ))}
        </div>
        <p className="text-sm text-pink-100/75">30 levels in 6 ranks. Get 8 stars in a rank to open the next.</p>
      </Section>

      <section className="space-y-3">
        <h2 className={`${headingFont} px-1 text-2xl font-bold text-white md:text-[28px]`}>Frequently Asked Questions</h2>
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group rounded-3xl border-2 border-white/15 bg-white/[0.08] p-5 open:border-[#FFE07A]/60"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white">
              <span>{f.q}</span>
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg font-bold text-[#3A1466] transition group-open:rotate-45"
                style={{ background: `radial-gradient(circle at 35% 30%, #fff 0%, ${COLORS.yellow} 55%)` }}
                aria-hidden="true"
              >
                +
              </span>
            </summary>
            <p className="mt-3 leading-7 text-pink-50/90">{f.a}</p>
          </details>
        ))}
      </section>

      <Section id="contact" icon="💌" title="Contact Us" accent={COLORS.pink}>
        <p>
          For bug reports, feedback or business inquiries, email us. Please include your device
          model, OS version and the game version (shown at the bottom of Settings).
        </p>
        <EmailCard note="We usually respond within 24–48 hours." />
      </Section>
    </BubblinkShell>
  );
}

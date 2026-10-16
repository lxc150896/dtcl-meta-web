import type { Metadata } from "next";
import StackFactoryShell, {
  ALL_CRATES,
  Crate,
  EmailCard,
  JsonLd,
  Section,
  STACK_FACTORY,
} from "../_components/StackFactoryShell";

const PAGE_URL = `${STACK_FACTORY.siteUrl}${STACK_FACTORY.basePath}/support`;
const TITLE = "Stack Factory Support – Help, FAQ & Contact";
const DESCRIPTION =
  "Get help with Stack Factory, the crate-pushing puzzle game. Learn how to push falling crates into full rows, handle special crates, and contact our support team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Stack Factory",
    "Stack Factory support",
    "Stack Factory help",
    "Stack Factory FAQ",
    "crate pushing game",
    "box stacking puzzle",
    "falling blocks game",
    "line clear puzzle",
    "factory puzzle game",
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
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const CRATE_INFO: Record<(typeof ALL_CRATES)[number], string> = {
  wood: "Wooden",
  cardboard: "Cardboard",
  steel: "Steel",
  ice: "Ice",
  tnt: "TNT",
  gold: "Gold",
};

const FAQS: { icon: string; q: string; a: string }[] = [
  {
    icon: "🎮",
    q: "How do I play Stack Factory?",
    a: "Crates keep dropping from the factory chutes onto the floor. Move your worker left and right, push crates into the gaps, and line them up. When a horizontal row is completely filled, it collapses and you score points. Don't let the stack reach the top!",
  },
  {
    icon: "📦",
    q: "What are the different crate types?",
    a: "Wooden and cardboard crates are standard and easy to push. Steel crates are heavy and take more effort to move. Ice crates slide until they hit something. TNT crates blast nearby crates when a row clears, and gold crates give bonus points.",
  },
  {
    icon: "🧱",
    q: "When does a row collapse?",
    a: "A row collapses as soon as every cell in that horizontal line is filled with crates. Clearing several rows at once gives a combo bonus, so try to set up multiple lines before closing the last gap.",
  },
  {
    icon: "💥",
    q: "How do I lose a level?",
    a: "The level ends if the crates stack up to the top of the factory, or if your worker gets trapped under a falling crate. Keep an eye on where the next crate will land and leave yourself room to move.",
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
    name: STACK_FACTORY.name,
    description:
      "A crate-pushing puzzle game. Control a factory worker, push falling crates into full horizontal rows and watch them collapse before the stack reaches the top.",
    genre: ["Puzzle", "Casual", "Arcade"],
    gamePlatform: ["Android", "iOS"],
    applicationCategory: "Game",
    url: PAGE_URL,
    publisher: { "@type": "Organization", name: STACK_FACTORY.name, email: STACK_FACTORY.email },
  };

  return (
    <StackFactoryShell
      active="support"
      eyebrow="Help Center"
      title="Stack Factory Support"
      intro={
        <p>
          Stuck under a pile of crates? Find answers to common questions below,
          or reach out to us anytime.
        </p>
      }
    >
      <JsonLd data={faqJsonLd} />
      <JsonLd data={gameJsonLd} />

      <Section icon={<Crate name="cardboard" />} title="About the Game">
        <p>
          The factory never stops. Crates of every kind pour down from the
          conveyor chutes, and it&apos;s your job as the floor worker to keep
          things in order.
        </p>
        <p>
          Push the crates into place, complete full rows to make them collapse,
          and keep the warehouse from overflowing for as long as you can.
        </p>
      </Section>

      <Section icon={<Crate name="wood" />} title="How to Play">
        <ol className="list-decimal space-y-2 pl-5">
          <li>Crates fall from the top of the factory and land on the stack.</li>
          <li>Move your worker and <strong className="text-white">push crates</strong> sideways to fill the gaps.</li>
          <li>Fill a whole <strong className="text-white">horizontal row</strong> to make it collapse and score points.</li>
          <li>Don&apos;t let the crates pile up to the top, or the level is over.</li>
        </ol>
        <div className="grid grid-cols-3 gap-3 pt-2 sm:grid-cols-6">
          {ALL_CRATES.map((c) => (
            <div
              key={c}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-black/30 py-3"
            >
              <Crate name={c} size={32} />
              <span className="text-xs text-zinc-400">{CRATE_INFO[c]}</span>
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
            className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 open:border-amber-400/30 open:bg-white/[0.06]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-white">
              <span>
                <span className="mr-2">{f.icon}</span>
                {f.q}
              </span>
              <span className="text-zinc-400 transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-7 text-zinc-300">{f.a}</p>
          </details>
        ))}
      </section>

      <Section icon={<Crate name="gold" />} title="Contact Us">
        <p>
          For bug reports, feedback, suggestions or business inquiries, email
          us. To help us solve your issue faster, please include your device
          model, OS version and game version.
        </p>
        <EmailCard note="We usually respond within 24–48 hours." />
      </Section>
    </StackFactoryShell>
  );
}

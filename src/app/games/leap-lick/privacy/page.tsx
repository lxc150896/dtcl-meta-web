import type { Metadata } from "next";
import Image from "next/image";
import LeapLickShell, {
  COLORS,
  EmailCard,
  headingFont,
  JsonLd,
  LEAP_LICK,
  Section,
} from "../_components/LeapLickShell";

const PAGE_URL = `${LEAP_LICK.siteUrl}${LEAP_LICK.basePath}/privacy`;
const OG_IMAGE = `${LEAP_LICK.siteUrl}${LEAP_LICK.img}/og.jpg`;
const TITLE = "Leap & Lick Privacy Policy";
const DESCRIPTION =
  "Privacy policy for Leap & Lick: Buddy Platformer. No account, no analytics, progress stored on your device. Learn how Google AdMob rewarded ads and RevenueCat subscriptions handle data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Leap & Lick",
    "Leap & Lick privacy policy",
    "Leap and Lick privacy",
    "Buddy Platformer privacy",
    LEAP_LICK.bundleId,
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
    images: [{ url: OG_IMAGE, width: 1024, height: 500 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const TOC = [
  { id: "collect", label: "Information We Collect" },
  { id: "device", label: "Data Stored on Your Device" },
  { id: "third-party", label: "Third-Party Services" },
  { id: "ads", label: "Advertising & Your Choices" },
  { id: "purchases", label: "Purchases & Subscriptions" },
  { id: "time", label: "Time Verification" },
  { id: "children", label: "Children’s Privacy" },
  { id: "rights", label: "Retention & Your Rights" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const SUMMARY = [
  { icon: "🙅", text: "No account or login" },
  { icon: "📊", text: "No analytics or tracking tools" },
  { icon: "📱", text: "Progress stays on your device" },
  { icon: "🎬", text: "Rewarded ads only (Google AdMob)" },
  { icon: "👑", text: "VIP purchases via the store & RevenueCat" },
  { icon: "🚫", text: "We never sell your data" },
];

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4" style={{ color: COLORS.leap }}>
      {children}
    </a>
  );
}

function Provider({
  name,
  color,
  data,
  purpose,
  links,
}: {
  name: string;
  color: string;
  data: string;
  purpose: string;
  links: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border-2 bg-black/20 p-4" style={{ borderColor: `${color}55` }}>
      <p className={`${headingFont} text-lg font-bold`} style={{ color }}>
        {name}
      </p>
      <dl className="mt-2 space-y-1.5 text-sm leading-6">
        <div>
          <dt className="inline font-semibold text-white">Data: </dt>
          <dd className="inline">{data}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-white">Purpose: </dt>
          <dd className="inline">{purpose}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-white">Learn more: </dt>
          <dd className="inline">{links}</dd>
        </div>
      </dl>
    </div>
  );
}

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    dateModified: LEAP_LICK.lastUpdatedIso,
    inLanguage: "en",
    about: { "@type": "VideoGame", name: LEAP_LICK.storeName },
    publisher: { "@type": "Organization", name: LEAP_LICK.developer, email: LEAP_LICK.email },
  };

  return (
    <LeapLickShell
      active="privacy"
      hero={
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <Image
            src={`${LEAP_LICK.img}/icon-art.webp`}
            alt="Leap & Lick game art"
            width={160}
            height={160}
            priority
            className="h-32 w-32 shrink-0 rounded-[28px] border-4 border-white/15 shadow-[0_8px_0_rgba(0,0,0,0.3)] md:h-40 md:w-40"
          />
          <div>
            <p className={`${headingFont} text-sm font-semibold uppercase tracking-[0.25em]`} style={{ color: COLORS.lizi }}>
              Legal
            </p>
            <h1 className={`${headingFont} mt-2 text-4xl font-bold text-white md:text-5xl`}>Privacy Policy</h1>
            <p className="mt-3 text-base leading-7 text-violet-100/85 md:text-lg">
              {LEAP_LICK.storeName} (“the game”) is made by {LEAP_LICK.developer} (“we”, “us”).
              We respect your privacy. This policy explains what information is
              handled when you play the game, and the choices you have.
            </p>
            <p className="mt-2 text-sm text-violet-200/60">Last updated: {LEAP_LICK.lastUpdated}</p>
          </div>
        </div>
      }
    >
      <JsonLd data={jsonLd} />

      <section
        aria-label="Privacy at a glance"
        className="rounded-3xl border-2 p-5 md:p-6"
        style={{ borderColor: `${COLORS.leap}55`, background: `linear-gradient(135deg, ${COLORS.leap}1a, ${COLORS.lizi}14)` }}
      >
        <h2 className={`${headingFont} mb-4 text-xl font-bold text-white`}>At a glance</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {SUMMARY.map((s) => (
            <li key={s.text} className="flex items-center gap-3 rounded-2xl bg-black/20 px-3 py-2 text-sm text-violet-50">
              <span className="text-lg" aria-hidden="true">{s.icon}</span>
              {s.text}
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Table of contents" className="rounded-3xl border-2 border-white/10 bg-white/[0.06] p-5">
        <p className={`${headingFont} mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-200/60`}>
          On this page
        </p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {TOC.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-violet-100 hover:text-white">
                <span className="mr-2 font-bold" style={{ color: COLORS.lizi }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="collect" icon="🔍" title="Information We Collect" accent={COLORS.leap}>
        <p>
          We do <strong className="text-white">not</strong> ask for, collect or
          store your name, email address, phone number, contacts, photos or
          location. You can play without creating an account or signing in, and
          the game does not include any analytics or statistics tools.
        </p>
        <p>
          Some limited data is handled by the third-party services described
          below (Google AdMob for ads and RevenueCat for subscriptions), and by
          Apple and Google when you make a purchase.
        </p>
      </Section>

      <Section id="device" icon="📱" title="Data Stored on Your Device" accent={COLORS.sky}>
        <p>
          Your level progress, stars, settings and remaining plays are saved{" "}
          <strong className="text-white">only on your device</strong>. They are
          not uploaded to us or to any cloud service.
        </p>
        <p>
          Deleting the game removes this data and cannot be undone. A VIP
          subscription is not lost, though: you can get it back with{" "}
          <strong className="text-white">Restore Purchases</strong>.
        </p>
      </Section>

      <Section id="third-party" icon="🤝" title="Third-Party Services" accent={COLORS.lizi}>
        <p>The game uses the following services, which handle data under their own privacy policies:</p>
        <div className="space-y-3">
          <Provider
            name="Google AdMob"
            color={COLORS.leap}
            data="Device advertising identifier (Android Advertising ID / iOS IDFA, where permitted), IP address, device and app information, and ad interactions."
            purpose="Showing rewarded ads, measuring ads, limiting how often ads repeat, and preventing fraud."
            links={
              <>
                <ExtLink href="https://policies.google.com/privacy">Google Privacy Policy</ExtLink>
                {" · "}
                <ExtLink href="https://policies.google.com/technologies/partner-sites">
                  How Google uses data from apps
                </ExtLink>
              </>
            }
          />
          <Provider
            name="RevenueCat"
            color={COLORS.lizi}
            data="A random, anonymous app user ID, purchase and subscription history (store receipts), and basic device/platform information. No account is required."
            purpose="Validating your VIP subscription, unlocking VIP benefits and restoring purchases."
            links={<ExtLink href="https://www.revenuecat.com/privacy">RevenueCat Privacy Policy</ExtLink>}
          />
          <Provider
            name="Apple App Store & Google Play"
            color={COLORS.tongue}
            data="Payment and billing details for purchases, handled entirely by Apple or Google."
            purpose="Processing VIP subscription payments. We never receive your card or payment details."
            links={
              <>
                <ExtLink href="https://www.apple.com/legal/privacy/">Apple Privacy Policy</ExtLink>
                {" · "}
                <ExtLink href="https://policies.google.com/privacy">Google Privacy Policy</ExtLink>
              </>
            }
          />
        </div>
      </Section>

      <Section id="ads" icon="🎬" title="Advertising & Your Choices" accent={COLORS.leap}>
        <p>
          The game currently shows <strong className="text-white">rewarded ads only</strong>:
          you choose to watch an ad to get +1 play or restore 3 lives. If we add
          other ad formats in the future, this policy will be updated. VIP
          members do not load any ads.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">iOS (App Tracking Transparency):</strong>{" "}
            before any ad is loaded, we ask for your permission to track. If you
            decline, ads are still shown but they are not personalized. You can
            change this anytime in Settings → Privacy &amp; Security → Tracking.
          </li>
          <li>
            <strong className="text-white">EEA, UK and Switzerland:</strong> we ask
            for your consent through Google&apos;s consent form (User Messaging
            Platform) as required by the GDPR. You can review or change your
            choice anytime from the game&apos;s Settings screen.
          </li>
          <li>
            <strong className="text-white">Android:</strong> you can reset or
            delete your advertising ID in your device settings (Settings → Privacy
            → Ads, or Settings → Google → Ads).
          </li>
        </ul>
      </Section>

      <Section id="purchases" icon="👑" title="Purchases & Subscriptions" accent="#FFD23F">
        <p>
          VIP is an optional monthly or yearly auto-renewing subscription sold
          through the App Store or Google Play. It removes ads and gives you
          unlimited plays and lives.
        </p>
        <p>
          Subscriptions are billed and managed by Apple or Google. You can cancel
          anytime in your App Store or Google Play subscription settings.
          Uninstalling the game does not cancel a subscription. Refunds are
          handled by the store under its own policies.
        </p>
      </Section>

      <Section id="time" icon="⏰" title="Time Verification" accent={COLORS.sky}>
        <p>
          To stop free plays from being refilled by changing the device clock,
          the game reads the current standard time from the &quot;Date&quot; header
          returned by a simple request to google.com, apple.com or cloudflare.com.
        </p>
        <p>
          No personal data is sent in these requests. As with any internet
          request, those servers can see your IP address; we do not receive or
          store it.
        </p>
      </Section>

      <Section id="children" icon="🧒" title="Children’s Privacy" accent={COLORS.tongue}>
        <p>
          Leap &amp; Lick is intended for players aged{" "}
          <strong className="text-white">13 and older</strong>. It is not directed
          at children and is not part of any Kids or Families program. We do not
          knowingly collect personal information from children under 13.
        </p>
        <p>
          If you believe a child under 13 has provided personal information
          through the game, please contact us and we will help remove it.
        </p>
      </Section>

      <Section id="rights" icon="🛡️" title="Retention, Security & Your Rights" accent={COLORS.leap}>
        <p>
          Because we do not run our own servers for player data, we do not hold
          personal data about you. Game data on your device is kept until you
          delete the game. Data handled by AdMob, RevenueCat, Apple and Google is
          kept according to their own policies, and may be processed in countries
          other than your own.
        </p>
        <p>
          Depending on where you live (for example under the GDPR in Europe or
          the CCPA in California), you may have rights to access, correct or
          delete your data, or to object to its use. We{" "}
          <strong className="text-white">do not sell or share</strong> your
          personal information for money. To exercise your rights, use the
          controls described above or contact us and we will help you reach the
          relevant provider.
        </p>
        <p>
          We use reputable providers and the security of the official app stores,
          but no method of transmission over the internet is 100% secure.
        </p>
      </Section>

      <Section id="changes" icon="📝" title="Changes to This Policy" accent={COLORS.lizi}>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          posted on this page with a new “Last updated” date. Continuing to play
          after an update means you accept the revised policy.
        </p>
      </Section>

      <Section id="contact" icon="💌" title="Contact Us" accent={COLORS.tongue}>
        <p>If you have any questions about this Privacy Policy or your data, please contact us at:</p>
        <EmailCard />
      </Section>
    </LeapLickShell>
  );
}

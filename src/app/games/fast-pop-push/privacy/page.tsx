import type { Metadata } from "next";
import Image from "next/image";
import BubblinkShell, {
  BUBBLINK,
  COLORS,
  EmailCard,
  headingFont,
  JsonLd,
  Section,
} from "../_components/BubblinkShell";

const PAGE_URL = `${BUBBLINK.siteUrl}${BUBBLINK.basePath}/privacy`;
const OG_IMAGE = `${BUBBLINK.siteUrl}${BUBBLINK.img}/og.jpg`;
const TITLE = "Privacy Policy – Bubblink";
const DESCRIPTION =
  "Privacy policy for Bubblink: Fidget Bubble Pop. No account, no analytics, all progress stays on your device. Learn about rewarded Google AdMob ads and the No Ads Pass subscription.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: ["Bubblink", "Bubblink privacy policy", "Bubblink: Fidget Bubble Pop", "pop it game privacy", BUBBLINK.bundleId],
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

const TOC = [
  { id: "collect", label: "Information We Collect" },
  { id: "device", label: "Data Stored on Your Device" },
  { id: "ads", label: "Advertising" },
  { id: "pass", label: "No Ads Pass Subscription" },
  { id: "network", label: "Other Network Connections" },
  { id: "children", label: "Children’s Privacy" },
  { id: "security", label: "Data Security & Your Rights" },
  { id: "changes", label: "Changes to This Policy" },
  { id: "contact", label: "Contact Us" },
];

const SUMMARY = [
  { icon: "🙅", text: "No account or login" },
  { icon: "📊", text: "No analytics or tracking tools" },
  { icon: "📱", text: "Progress stays on your device" },
  { icon: "🎬", text: "Optional rewarded ads, non-personalized" },
  { icon: "💳", text: "Payments handled by Apple / Google" },
  { icon: "🚫", text: "We never sell your data" },
];

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4" style={{ color: COLORS.yellow }}>
      {children}
    </a>
  );
}

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    dateModified: BUBBLINK.lastUpdatedIso,
    inLanguage: "en",
    about: { "@type": "VideoGame", name: BUBBLINK.storeName },
  };

  return (
    <BubblinkShell
      active="privacy"
      hero={
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
          <Image
            src={`${BUBBLINK.img}/icon.webp`}
            alt="Bubblink app icon"
            width={144}
            height={144}
            priority
            className="h-28 w-28 shrink-0 rounded-[28px] border-4 border-white/30 shadow-[0_8px_0_rgba(20,0,50,0.3)] md:h-36 md:w-36"
          />
          <div>
            <p className={`${headingFont} text-sm font-semibold uppercase tracking-[0.25em]`} style={{ color: COLORS.yellow }}>
              Legal
            </p>
            <h1 className={`${headingFont} mt-2 text-4xl font-bold text-white md:text-5xl`}>Privacy Policy</h1>
            <p className="mt-3 text-base leading-7 text-pink-50/90 md:text-lg">
              {BUBBLINK.name} respects your privacy. This Privacy Policy explains how
              information is handled when you play {BUBBLINK.storeName} (“the game”).
            </p>
            <p className="mt-2 text-sm text-pink-100/70">Last updated: {BUBBLINK.lastUpdated}</p>
          </div>
        </div>
      }
    >
      <JsonLd data={jsonLd} />

      <section
        aria-label="Privacy at a glance"
        className="rounded-[28px] border-2 p-5 md:p-6"
        style={{ borderColor: `${COLORS.mint}88`, background: `linear-gradient(135deg, ${COLORS.mint}22, ${COLORS.blue}22)` }}
      >
        <h2 className={`${headingFont} mb-4 text-xl font-bold text-white`}>At a glance</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {SUMMARY.map((s) => (
            <li key={s.text} className="flex items-center gap-3 rounded-2xl bg-black/20 px-3 py-2 text-sm text-white">
              <span className="text-lg" aria-hidden="true">{s.icon}</span>
              {s.text}
            </li>
          ))}
        </ul>
      </section>

      <nav aria-label="Table of contents" className="rounded-[28px] border-2 border-white/15 bg-white/[0.08] p-5">
        <p className={`${headingFont} mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-pink-100/70`}>On this page</p>
        <ol className="grid gap-2 sm:grid-cols-2">
          {TOC.map((t, i) => (
            <li key={t.id}>
              <a href={`#${t.id}`} className="text-pink-50 hover:text-white">
                <span className="mr-2 font-bold" style={{ color: COLORS.yellow }}>{String(i + 1).padStart(2, "0")}</span>
                {t.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="collect" icon="🔍" title="Information We Collect" accent={COLORS.pink}>
        <p>
          We do <strong className="text-white">not collect, store, or share</strong> any personal
          information. There is no account to create and no sign-in: you can play {BUBBLINK.name}{" "}
          without giving us your name, email address or any other personal data.
        </p>
        <p>
          The game does not include any analytics, statistics or crash-reporting tools, and we do
          not run any server that receives player data.
        </p>
      </Section>

      <Section id="device" icon="📱" title="Data Stored on Your Device" accent={COLORS.blue}>
        <p>
          Your game progress, stars, coins, lives, unlocked themes and skins, best scores and
          settings (sound, vibration) are saved <strong className="text-white">only on your device</strong>.
          Nothing is uploaded to us or to any cloud service.
        </p>
        <p>
          Uninstalling the game <strong className="text-white">deletes all of this data</strong> and it
          cannot be recovered. An active No Ads Pass is not lost: use{" "}
          <strong className="text-white">Restore purchases</strong> in the Shop to get it back.
        </p>
      </Section>

      <Section id="ads" icon="🎬" title="Advertising" accent={COLORS.peach}>
        <p>
          The game uses <strong className="text-white">rewarded ads from Google AdMob</strong>. Ads are
          always optional: you choose to watch one to get extra lives, continue a run or double
          your coins. There are no banner ads or ads that interrupt play.
        </p>
        <p>
          The game requests <strong className="text-white">non-personalized ads only</strong>, so ads are
          not based on your interests or past behavior. Google AdMob may still use your device’s
          advertising identifier (Android Advertising ID or iOS IDFA, where available), IP address
          and basic device information to prevent fraud, limit how often ads repeat and measure ad
          performance. We do not control or have access to this data.
        </p>
        <p>
          Learn more in{" "}
          <ExtLink href="https://policies.google.com/privacy">Google’s Privacy Policy</ExtLink> and{" "}
          <ExtLink href="https://policies.google.com/technologies/partner-sites">
            How Google uses information from apps that use its services
          </ExtLink>
          . You can reset or delete your advertising ID in your device settings.
        </p>
      </Section>

      <Section id="pass" icon="👑" title="No Ads Pass Subscription" accent={COLORS.yellow}>
        <p>
          The <strong className="text-white">No Ads Pass</strong> is an optional subscription, available
          monthly or yearly. While it is active you get rewards without watching ads, unlimited
          lives and 100 free coins every day.
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">Payment</strong> is processed entirely by Apple (App Store) or
            Google (Google Play). The game never receives your card or payment details.
          </li>
          <li>
            <strong className="text-white">Auto-renewal:</strong> the subscription renews automatically at
            the same price until cancelled. Payment is charged to your App Store or Google Play
            account when you confirm the purchase.
          </li>
          <li>
            <strong className="text-white">How to cancel:</strong> cancel at least 24 hours before the
            current period ends in your store account settings. On iPhone or iPad: Settings → your
            name → Subscriptions. On Android: Google Play → Profile → Payments &amp; subscriptions →
            Subscriptions. You can also tap <em>Manage subscription</em> in the game’s Shop.
            Uninstalling the game does not cancel a subscription.
          </li>
          <li>
            To check your subscription, the game asks the store which subscriptions are active and
            keeps that status on your device. Refunds are handled by Apple or Google under their
            own policies.
          </li>
        </ul>
      </Section>

      <Section id="network" icon="🌐" title="Other Network Connections" accent={COLORS.mint}>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong className="text-white">Standard time:</strong> to calculate life refills fairly, the
            game reads the current time from the response header of a simple request to google.com
            or cloudflare.com. No personal data is sent.
          </li>
          <li>
            <strong className="text-white">Update check:</strong> the game checks whether a newer version
            is available so it can offer you the update.
          </li>
        </ul>
        <p>As with any internet request, these servers can see your IP address. We do not receive or store it.</p>
      </Section>

      <Section id="children" icon="🧸" title="Children’s Privacy" accent={COLORS.lavender}>
        <p>
          {BUBBLINK.name} is suitable for all ages. We do not knowingly collect personal information
          from children under 13. If you believe a child has provided personal information through
          the game, please contact us and we will help remove it.
        </p>
      </Section>

      <Section id="security" icon="🛡️" title="Data Security & Your Rights" accent={COLORS.blue}>
        <p>
          Since we do not collect personal data, there is no risk of personal data leakage from our
          own systems. Data handled by Google AdMob, Apple and Google Play is protected and retained
          under their own policies.
        </p>
        <p>
          We <strong className="text-white">do not sell or share</strong> personal information. If you
          have questions about your rights under laws such as the GDPR or CCPA, contact us and we
          will help.
        </p>
      </Section>

      <Section id="changes" icon="📝" title="Changes to This Policy" accent={COLORS.peach}>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this
          page with a new “Last updated” date.
        </p>
      </Section>

      <Section id="contact" icon="💌" title="Contact Us" accent={COLORS.pink}>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <EmailCard />
      </Section>

    </BubblinkShell>
  );
}

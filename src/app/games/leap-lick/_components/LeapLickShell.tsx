import Image from "next/image";
import Link from "next/link";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const LEAP_LICK = {
  name: "Leap & Lick",
  storeName: "Leap & Lick: Buddy Platformer",
  tagline: "Two buddies. One stretchy tongue. No gap too far.",
  developer: "Hanisoft",
  email: "lxc150896@gmail.com",
  siteUrl: "https://dtclmeta.vn",
  basePath: "/games/leap-lick",
  img: "/images/leap-lick",
  bundleId: "com.hanisoft.leaplick",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.hanisoft.leaplick",
  // Per-store flags. Flip playStoreLive to true once Android is public.
  appStoreLive: true,
  playStoreLive: false,
  appStoreUrl: "https://apps.apple.com/us/app/leap-lick-frog-platformer/id6825873395",
  lastUpdated: "October 23, 2026",
  lastUpdatedIso: "2026-10-23",
};

export const COLORS = {
  leap: "#8BE04A",
  lizi: "#FF9A2A",
  teal: "#35C9E8",
  tongue: "#FF6F9F",
  purple: "#4A2A8A",
  sky: "#5BC8F5",
};

export const headingFont = fredoka.className;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Section({
  id,
  icon,
  title,
  accent = COLORS.leap,
  children,
}: {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-6 rounded-3xl border-2 border-white/10 bg-white/[0.06] p-5 shadow-[0_8px_0_rgba(0,0,0,0.25)] md:p-7"
    >
      <h2
        className={`${headingFont} mb-4 flex items-center gap-3 text-2xl font-bold text-white md:text-[28px]`}
      >
        {icon && (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-xl"
            style={{ background: `${accent}26`, boxShadow: `inset 0 0 0 2px ${accent}80` }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-7 text-violet-100/85 md:text-base">
        {children}
      </div>
    </section>
  );
}

export function StoreBadges() {
  const badge = (label: string, sub: string, href: string) => {
    const className =
      "flex min-w-[170px] items-center gap-3 rounded-2xl border-2 border-white/15 bg-black/40 px-4 py-2.5 text-left transition";
    const content = (
      <>
        <span className="text-2xl" aria-hidden="true">
          {label === "Google Play" ? "▶" : "🍎"}
        </span>
        <span className="leading-tight">
          <span className="block text-[11px] uppercase tracking-wider text-white/60">{sub}</span>
          <span className={`${headingFont} block text-lg font-semibold text-white`}>{label}</span>
        </span>
      </>
    );
    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${className} hover:border-white/40 hover:bg-black/60`}>
        {content}
      </a>
    ) : (
      <div className={`${className} opacity-80`}>{content}</div>
    );
  };

  const { playStoreLive, appStoreLive } = LEAP_LICK;
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badge("App Store", appStoreLive ? "Download on the" : "Coming soon to", appStoreLive ? LEAP_LICK.appStoreUrl : "")}
      {badge("Google Play", playStoreLive ? "Get it on" : "Coming soon to", playStoreLive ? LEAP_LICK.playStoreUrl : "")}
    </div>
  );
}

export function EmailCard({ note }: { note?: string }) {
  return (
    <div
      className="rounded-3xl border-2 p-6 text-center"
      style={{
        borderColor: `${COLORS.tongue}66`,
        background: `linear-gradient(135deg, ${COLORS.leap}1f, ${COLORS.tongue}1f, ${COLORS.lizi}1f)`,
      }}
    >
      <p className={`${headingFont} text-sm font-semibold uppercase tracking-[0.2em]`} style={{ color: COLORS.tongue }}>
        Contact us
      </p>
      <a
        href={`mailto:${LEAP_LICK.email}?subject=${encodeURIComponent(`${LEAP_LICK.name} Support`)}`}
        className="mt-2 inline-block break-all text-lg font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white md:text-xl"
      >
        📧 {LEAP_LICK.email}
      </a>
      {note && <p className="mt-3 text-sm text-violet-200/70">{note}</p>}
    </div>
  );
}

export default function LeapLickShell({
  active,
  hero,
  children,
}: {
  active: "home" | "support" | "privacy";
  hero: React.ReactNode;
  children: React.ReactNode;
}) {
  const navItem = (key: "home" | "support" | "privacy", label: string) => (
    <Link
      href={key === "home" ? LEAP_LICK.basePath : `${LEAP_LICK.basePath}/${key}`}
      aria-current={active === key ? "page" : undefined}
      className={`${headingFont} rounded-full px-4 py-1.5 text-sm font-semibold transition ${
        active === key ? "text-[#2b1658]" : "text-violet-100 hover:bg-white/10"
      }`}
      style={active === key ? { background: COLORS.leap } : undefined}
    >
      {label}
    </Link>
  );

  return (
    <div
      className="relative min-h-screen overflow-hidden text-violet-50"
      style={{
        background: `radial-gradient(circle at 15% 0%, ${COLORS.purple} 0%, #2b1658 45%, #1a0d38 100%)`,
      }}
    >
      {/* Soft playful blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl" style={{ background: `${COLORS.leap}26` }} />
        <div className="absolute -right-24 top-[28rem] h-80 w-80 rounded-full blur-3xl" style={{ background: `${COLORS.lizi}26` }} />
        <div className="absolute bottom-10 left-1/4 h-72 w-72 rounded-full blur-3xl" style={{ background: `${COLORS.tongue}1f` }} />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-5 md:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href={LEAP_LICK.basePath} aria-label={`${LEAP_LICK.name} home`}>
            <Image
              src={`${LEAP_LICK.img}/logo.webp`}
              alt={`${LEAP_LICK.name} logo`}
              width={100}
              height={71}
              priority
            />
          </Link>
          <nav aria-label={`${LEAP_LICK.name} pages`} className="flex gap-1 rounded-full border-2 border-white/10 bg-black/25 p-1">
            {navItem("home", "Home")}
            {navItem("support", "Support")}
            {navItem("privacy", "Privacy")}
          </nav>
        </header>

        <div className="mt-8 md:mt-10">{hero}</div>

        <div className="mt-10 space-y-5">{children}</div>

        <footer className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-violet-200/60">
          <p>
            © {new Date().getFullYear()} {LEAP_LICK.developer}. {LEAP_LICK.name}: {LEAP_LICK.tagline}
          </p>
          <p className="mt-2 flex justify-center gap-4">
            <Link href={`${LEAP_LICK.basePath}/support`} className="hover:text-white">
              Support
            </Link>
            <Link href={`${LEAP_LICK.basePath}/privacy`} className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-white">

              All apps

            </Link>
            <a href={`mailto:${LEAP_LICK.email}`} className="hover:text-white">
              Contact
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

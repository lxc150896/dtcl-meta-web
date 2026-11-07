import Image from "next/image";
import Link from "next/link";
import { Fredoka } from "next/font/google";

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// URL stays /games/fast-pop-push: it is already declared in the app and on the stores.
export const BUBBLINK = {
  name: "Bubblink",
  storeName: "Bubblink: Fidget Bubble Pop",
  tagline: "Pop, relax, repeat.",
  email: "lxc150896@gmail.com",
  siteUrl: "https://dtclmeta.vn",
  basePath: "/games/fast-pop-push",
  img: "/images/bubblink",
  bundleId: "com.lxc150896.popitpro",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.lxc150896.popitpro",
  appStoreUrl: "https://apps.apple.com/us/app/bubblink-fidget-bubble-pop/id6756809220",
  lastUpdated: "October 25, 2026",
  lastUpdatedIso: "2026-10-25",
};

// Pastel palette taken from the Bubblink logo.
export const COLORS = {
  pink: "#FF8FC7",
  peach: "#FFB38A",
  yellow: "#FFE07A",
  mint: "#7EE0B8",
  blue: "#7CC4FF",
  lavender: "#B99BFF",
  ink: "#3A1466",
};

export const PASTELS = [COLORS.pink, COLORS.peach, COLORS.yellow, COLORS.mint, COLORS.blue, COLORS.lavender];

export const headingFont = fredoka.className;

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Row of pastel "pop-it" bubbles used as a decorative divider. */
export function BubbleRow({ size = 18 }: { size?: number }) {
  return (
    <div className="flex justify-center gap-2" aria-hidden="true">
      {PASTELS.map((c) => (
        <span
          key={c}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at 35% 30%, #fff 0%, ${c} 45%, ${c} 100%)`,
            boxShadow: `0 3px 0 rgba(0,0,0,0.18), 0 0 12px ${c}88`,
          }}
        />
      ))}
    </div>
  );
}

export function Section({
  id,
  icon,
  title,
  accent = COLORS.pink,
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
      className="scroll-mt-6 rounded-[28px] border-2 border-white/15 bg-white/[0.08] p-5 shadow-[0_8px_0_rgba(20,0,50,0.25)] md:p-7"
    >
      <h2 className={`${headingFont} mb-4 flex items-center gap-3 text-2xl font-bold text-white md:text-[28px]`}>
        {icon && (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl"
            style={{
              background: `radial-gradient(circle at 35% 30%, #ffffffcc 0%, ${accent} 60%)`,
              boxShadow: `0 3px 0 rgba(0,0,0,0.2)`,
            }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-7 text-pink-50/90 md:text-base">{children}</div>
    </section>
  );
}

export function StoreBadges() {
  const badge = (icon: string, label: string, href: string) => {
    const base =
      "flex min-w-[170px] items-center gap-3 rounded-2xl border-2 border-white/20 bg-black/30 px-4 py-2.5 text-left transition";
    const inner = (
      <>
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <span className="leading-tight">
          <span className="block text-[11px] uppercase tracking-wider text-white/60">
            {href ? "Get it on" : "Coming soon to"}
          </span>
          <span className={`${headingFont} block text-lg font-semibold text-white`}>{label}</span>
        </span>
      </>
    );
    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} hover:border-white/50 hover:bg-black/45`}>
        {inner}
      </a>
    ) : (
      <div className={`${base} opacity-80`}>{inner}</div>
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badge("▶", "Google Play", BUBBLINK.playStoreUrl)}
      {badge("🍎", "App Store", BUBBLINK.appStoreUrl)}
    </div>
  );
}

export function EmailCard({ note }: { note?: string }) {
  return (
    <div
      className="rounded-[28px] border-2 p-6 text-center"
      style={{
        borderColor: `${COLORS.pink}88`,
        background: `linear-gradient(135deg, ${COLORS.pink}2a, ${COLORS.lavender}2a, ${COLORS.blue}2a)`,
      }}
    >
      <p className={`${headingFont} text-sm font-semibold uppercase tracking-[0.2em]`} style={{ color: COLORS.yellow }}>
        Contact us
      </p>
      <a
        href={`mailto:${BUBBLINK.email}?subject=${encodeURIComponent(`${BUBBLINK.name} Support`)}`}
        className="mt-2 inline-block break-all text-lg font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white md:text-xl"
      >
        📧 {BUBBLINK.email}
      </a>
      {note && <p className="mt-3 text-sm text-pink-100/70">{note}</p>}
    </div>
  );
}

type PageKey = "home" | "support" | "privacy";

export default function BubblinkShell({
  active,
  hero,
  children,
}: {
  active: PageKey;
  hero: React.ReactNode;
  children: React.ReactNode;
}) {
  const href = (key: PageKey) => (key === "home" ? BUBBLINK.basePath : `${BUBBLINK.basePath}/${key}`);
  const navItem = (key: PageKey, label: string) => (
    <Link
      href={href(key)}
      aria-current={active === key ? "page" : undefined}
      className={`${headingFont} rounded-full px-3.5 py-1.5 text-sm font-semibold transition sm:px-4 ${
        active === key ? "bg-white text-[#3A1466]" : "text-pink-50 hover:bg-white/15"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div
      className="relative min-h-screen overflow-hidden text-pink-50"
      style={{ background: "linear-gradient(160deg, #E8407A 0%, #B03BA8 38%, #6A2BC2 75%, #3A1466 100%)" }}
    >
      {/* Floating pastel bubbles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {[
          { c: COLORS.yellow, s: 120, t: "8%", l: "-30px" },
          { c: COLORS.mint, s: 90, t: "34%", l: "88%" },
          { c: COLORS.blue, s: 160, t: "62%", l: "-60px" },
          { c: COLORS.peach, s: 70, t: "82%", l: "80%" },
        ].map((b, i) => (
          <span
            key={i}
            className="absolute rounded-full opacity-30 blur-[2px]"
            style={{
              width: b.s,
              height: b.s,
              top: b.t,
              left: b.l,
              background: `radial-gradient(circle at 35% 30%, #fff 0%, ${b.c} 50%, transparent 72%)`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-5 md:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href={BUBBLINK.basePath} aria-label={`${BUBBLINK.name} home`}>
            <Image src={`${BUBBLINK.img}/logo.webp`} alt={`${BUBBLINK.name} logo`} width={150} height={33} priority />
          </Link>
          <nav aria-label={`${BUBBLINK.name} pages`} className="flex gap-1 rounded-full border-2 border-white/20 bg-black/20 p-1">
            {navItem("home", "Home")}
            {navItem("support", "Support")}
            {navItem("privacy", "Privacy")}
          </nav>
        </header>

        <div className="mt-8 md:mt-10">{hero}</div>

        <div className="mt-10 space-y-5">{children}</div>

        <footer className="mt-14 border-t border-white/15 pt-6 text-center text-sm text-pink-100/70">
          <BubbleRow size={12} />
          <p className="mt-4">
            © {new Date().getFullYear()} {BUBBLINK.name}. {BUBBLINK.tagline}
          </p>
          <p className="mt-2 flex justify-center gap-4">
            <Link href={`${BUBBLINK.basePath}/support`} className="hover:text-white">Support</Link>
            <Link href={`${BUBBLINK.basePath}/privacy`} className="hover:text-white">Privacy Policy</Link>
            <Link href="/" className="hover:text-white">

              All apps

            </Link>
            <a href={`mailto:${BUBBLINK.email}`} className="hover:text-white">Contact</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

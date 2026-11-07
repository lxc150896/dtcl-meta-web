import Link from "next/link";

export const TFT = {
  name: "TFT Meta Guide",
  tagline: "Comps, items and champions for every patch.",
  email: "lxc150896@gmail.com",
  siteUrl: "https://dtclmeta.vn",
  basePath: "/games/tft",
  // Fill these in once the app is live on the stores.
  playStoreUrl: "",
  appStoreUrl: "",
  lastUpdated: "November 7, 2026",
  lastUpdatedIso: "2026-11-07",
};

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
  children,
}: {
  id?: string;
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7"
    >
      <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-white md:text-2xl">
        {icon && <span aria-hidden="true">{icon}</span>}
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-7 text-slate-300 md:text-base">
        {children}
      </div>
    </section>
  );
}

export function StoreBadges() {
  const badge = (icon: string, label: string, href: string) => {
    const base =
      "flex min-w-[170px] items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-left transition";
    const inner = (
      <>
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <span className="leading-tight">
          <span className="block text-[11px] uppercase tracking-wider text-slate-400">
            {href ? "Get it on" : "Coming soon to"}
          </span>
          <span className="block text-lg font-bold text-white">{label}</span>
        </span>
      </>
    );
    return href ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} hover:border-yellow-300/60 hover:bg-white/10`}>
        {inner}
      </a>
    ) : (
      <div className={`${base} opacity-80`}>{inner}</div>
    );
  };
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badge("▶", "Google Play", TFT.playStoreUrl)}
      {badge("🍎", "App Store", TFT.appStoreUrl)}
    </div>
  );
}

export function EmailCard({ note }: { note?: string }) {
  return (
    <div className="rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 via-sky-500/10 to-indigo-500/10 p-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-yellow-300">Contact us</p>
      <a
        href={`mailto:${TFT.email}?subject=${encodeURIComponent(`${TFT.name} Support`)}`}
        className="mt-2 inline-block break-all text-lg font-bold text-white underline decoration-yellow-400/50 underline-offset-4 hover:decoration-yellow-300 md:text-xl"
      >
        📧 {TFT.email}
      </a>
      {note && <p className="mt-3 text-sm text-slate-400">{note}</p>}
    </div>
  );
}

export function Disclaimer() {
  return (
    <p className="text-xs leading-5 text-slate-500">
      {TFT.name} isn&apos;t endorsed by Riot Games and doesn&apos;t reflect the views or opinions
      of Riot Games or anyone officially involved in producing or managing Riot Games properties.
      Riot Games and all associated properties are trademarks or registered trademarks of Riot
      Games, Inc.
    </p>
  );
}

export default function TftShell({
  active,
  eyebrow,
  title,
  intro,
  children,
}: {
  active: "home" | "support" | "privacy";
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  const navItem = (key: "home" | "support" | "privacy", label: string) => (
    <Link
      href={key === "home" ? TFT.basePath : `${TFT.basePath}/${key}`}
      aria-current={active === key ? "page" : undefined}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
        active === key
          ? "bg-yellow-400 text-slate-900"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b17] text-slate-200">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-24 h-96 w-96 rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="absolute -right-24 top-48 h-80 w-80 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-6 md:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href={TFT.basePath} className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">⚔️</span>
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-300 to-sky-300 bg-clip-text text-xl font-black tracking-wide text-transparent">
              {TFT.name.toUpperCase()}
            </span>
          </Link>
          <nav aria-label="TFT Meta Guide pages" className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {navItem("home", "Home")}
            {navItem("support", "Support")}
            {navItem("privacy", "Privacy")}
          </nav>
        </header>

        <div className="mt-12 text-center md:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-300">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">{title}</h1>
          <div className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            {intro}
          </div>
        </div>

        <div className="mt-12 space-y-5">{children}</div>

        <footer className="mt-14 space-y-3 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {TFT.name}. {TFT.tagline}
          </p>
          <p className="flex justify-center gap-4">
            <Link href={TFT.basePath} className="hover:text-slate-300">Home</Link>
            <Link href={`${TFT.basePath}/support`} className="hover:text-slate-300">Support</Link>
            <Link href={`${TFT.basePath}/privacy`} className="hover:text-slate-300">Privacy Policy</Link>
            <a href={`mailto:${TFT.email}`} className="hover:text-slate-300">Contact</a>
          </p>
          <Disclaimer />
        </footer>
      </div>
    </div>
  );
}

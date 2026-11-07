import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, type Product } from "./games/_registry";

const SITE_URL = "https://dtclmeta.vn";
const EMAIL = "lxc150896@gmail.com";
const TITLE = "Hanisoft – Mobile Games & Apps";
const DESCRIPTION =
  "Hanisoft is an indie studio building mobile games and apps, including Leap & Lick, Bubblink, Shardora, Stack Factory and the TFT Meta Guide companion app. Download for iOS and Android.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Hanisoft",
    "DTCL Meta",
    "mobile games",
    "TFT Meta Guide",
    "Leap & Lick",
    "Bubblink",
    "Shardora",
    "Stack Factory",
  ],
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Hanisoft",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [{ url: `${SITE_URL}/images/leap-lick/og.jpg`, width: 1024, height: 500, alt: "Leap & Lick" }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [`${SITE_URL}/images/leap-lick/og.jpg`] },
};

export const dynamic = "force-static";

function StoreButton({ store, url, name }: { store: "ios" | "android"; url: string; name: string }) {
  const label = store === "ios" ? "App Store" : "Google Play";
  const icon = store === "ios" ? "🍎" : "▶";
  const base =
    "flex flex-1 min-w-[140px] items-center gap-2.5 rounded-xl border px-3 py-2 text-left transition";
  const inner = (
    <>
      <span className="text-xl" aria-hidden="true">{icon}</span>
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-wider text-white/60">
          {url ? (store === "ios" ? "Download on the" : "Get it on") : "Coming soon"}
        </span>
        <span className="block text-sm font-bold text-white">{label}</span>
      </span>
    </>
  );
  return url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download ${name} on ${label}`}
      className={`${base} border-white/25 bg-white/10 hover:border-white/60 hover:bg-white/20`}
    >
      {inner}
    </a>
  ) : (
    <div
      aria-disabled="true"
      title={`${name} is coming soon to ${label}`}
      className={`${base} cursor-not-allowed border-dashed border-white/15 bg-white/[0.03] opacity-60`}
    >
      {inner}
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  const comingSoon = !p.appStoreUrl && !p.playStoreUrl;
  return (
    <article
      className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5"
      style={{ boxShadow: `inset 0 3px 0 ${p.accent}` }}
    >
      <div className="flex items-start gap-4">
        <Link href={p.href} aria-label={`${p.name} details`} className="shrink-0">
          {p.icon ? (
            <Image
              src={p.icon}
              alt={`${p.name} icon`}
              width={72}
              height={72}
              className="h-[72px] w-[72px] rounded-2xl border border-white/15 object-cover"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-white/15 text-4xl"
              style={{ background: `${p.accent}26` }}
            >
              {p.emoji}
            </span>
          )}
        </Link>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-white">
              <Link href={p.href} className="hover:underline">{p.name}</Link>
            </h3>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-black"
              style={{ background: p.accent }}
            >
              {p.kind}
            </span>
          </div>
          <p className="text-sm text-zinc-400">{p.genre}</p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-[15px] leading-7 text-zinc-300">{p.description}</p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <StoreButton store="ios" url={p.appStoreUrl} name={p.name} />
        <StoreButton store="android" url={p.playStoreUrl} name={p.name} />
      </div>
      {comingSoon && (
        <p className="mt-2 text-xs text-zinc-500">Store links coming soon.</p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-sm">
        <Link href={p.href} className="font-semibold text-white hover:underline">
          Details →
        </Link>
        <span className="flex gap-3 text-zinc-400">
          {p.slug === "tft" && (
            <Link href="/tft" className="hover:text-white">Web version</Link>
          )}
          <Link href={`${p.href}/support`} className="hover:text-white">Support</Link>
          <Link href={`${p.href}/privacy`} className="hover:text-white">Privacy</Link>
        </span>
      </div>
    </article>
  );
}

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hanisoft – Mobile Games & Apps",
    itemListElement: PRODUCTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${SITE_URL}${p.href}`,
    })),
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0a12] text-zinc-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute -right-24 top-64 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-10 md:px-6">
        <header className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
            Games &amp; Apps
          </p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">Hanisoft</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
            We build mobile games and apps. Explore what we&apos;ve made so far and download it on
            iOS and Android, with more on the way.
          </p>
        </header>

        <main className="mt-12">
          <h2 className="sr-only">Our apps and games</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </main>

        <footer className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Hanisoft. All rights reserved.</p>
          <p className="mt-2">
            Contact:{" "}
            <a href={`mailto:${EMAIL}`} className="text-zinc-300 hover:text-white">
              {EMAIL}
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

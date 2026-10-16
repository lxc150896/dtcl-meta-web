import Link from "next/link";

export const STACK_FACTORY = {
  name: "Stack Factory",
  tagline: "Push the crates. Clear the line.",
  email: "lxc150896@gmail.com",
  siteUrl: "https://dtclmeta.vn",
  basePath: "/games/stack-factory",
  lastUpdated: "October 16, 2026",
};

export type CrateName = "wood" | "cardboard" | "steel" | "ice" | "tnt" | "gold";

const CRATE_COLORS: Record<CrateName, { fill: string; stroke: string }> = {
  wood: { fill: "#b45309", stroke: "#f59e0b" },
  cardboard: { fill: "#a16207", stroke: "#fde68a" },
  steel: { fill: "#475569", stroke: "#cbd5e1" },
  ice: { fill: "#0e7490", stroke: "#67e8f9" },
  tnt: { fill: "#b91c1c", stroke: "#fca5a5" },
  gold: { fill: "#ca8a04", stroke: "#fef08a" },
};

export function Crate({ name, size = 28 }: { name: CrateName; size?: number }) {
  const { fill, stroke } = CRATE_COLORS[name];

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="3"
        fill={fill}
        stroke={stroke}
        strokeWidth="2.5"
      />
      {name === "wood" && (
        <g stroke={stroke} strokeWidth="2" strokeLinecap="round">
          <line x1="7" y1="7" x2="25" y2="25" />
          <line x1="25" y1="7" x2="7" y2="25" />
        </g>
      )}
      {name === "cardboard" && (
        <g stroke={stroke} strokeWidth="2">
          <line x1="16" y1="3" x2="16" y2="13" />
          <line x1="3" y1="13" x2="29" y2="13" />
        </g>
      )}
      {name === "steel" && (
        <g fill={stroke}>
          <circle cx="8" cy="8" r="1.8" />
          <circle cx="24" cy="8" r="1.8" />
          <circle cx="8" cy="24" r="1.8" />
          <circle cx="24" cy="24" r="1.8" />
        </g>
      )}
      {name === "ice" && (
        <g stroke={stroke} strokeWidth="2" strokeLinecap="round">
          <line x1="16" y1="7" x2="16" y2="25" />
          <line x1="8" y1="11.5" x2="24" y2="20.5" />
          <line x1="24" y1="11.5" x2="8" y2="20.5" />
        </g>
      )}
      {name === "tnt" && (
        <text
          x="16"
          y="20.5"
          textAnchor="middle"
          fontSize="10"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          fill="#fff"
        >
          TNT
        </text>
      )}
      {name === "gold" && (
        <polygon
          points="16,7 18.6,13 25,13.4 20,17.6 21.6,24 16,20.5 10.4,24 12,17.6 7,13.4 13.4,13"
          fill={stroke}
        />
      )}
    </svg>
  );
}

export const ALL_CRATES: CrateName[] = ["wood", "cardboard", "steel", "ice", "tnt", "gold"];

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
        {icon}
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-7 text-zinc-300 md:text-base">
        {children}
      </div>
    </section>
  );
}

export function EmailCard({ note }: { note?: string }) {
  return (
    <div className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 p-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-amber-300">Contact us</p>
      <a
        href={`mailto:${STACK_FACTORY.email}?subject=${encodeURIComponent(`${STACK_FACTORY.name} Support`)}`}
        className="mt-2 inline-block break-all text-lg font-bold text-white underline decoration-amber-400/50 underline-offset-4 hover:decoration-amber-300 md:text-xl"
      >
        📧 {STACK_FACTORY.email}
      </a>
      {note && <p className="mt-3 text-sm text-zinc-400">{note}</p>}
    </div>
  );
}

function HazardStripe() {
  return (
    <div
      aria-hidden="true"
      className="h-2 w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, #facc15 0 14px, #18181b 14px 28px)",
      }}
    />
  );
}

export default function StackFactoryShell({
  active,
  eyebrow,
  title,
  intro,
  children,
}: {
  active: "support" | "privacy";
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}) {
  const navItem = (key: "support" | "privacy", label: string) => (
    <Link
      href={`${STACK_FACTORY.basePath}/${key}`}
      aria-current={active === key ? "page" : undefined}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
        active === key
          ? "bg-amber-400 text-zinc-900"
          : "text-zinc-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#121214] text-zinc-200">
      <HazardStripe />

      {/* Factory backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute -right-24 top-60 h-80 w-80 rounded-full bg-orange-600/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-6 md:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`${STACK_FACTORY.basePath}/support`} className="flex items-center gap-2">
            <Crate name="wood" size={30} />
            <span className="text-xl font-black tracking-wide text-amber-300">
              {STACK_FACTORY.name.toUpperCase()}
            </span>
          </Link>
          <nav
            aria-label="Stack Factory pages"
            className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1"
          >
            {navItem("support", "Support")}
            {navItem("privacy", "Privacy")}
          </nav>
        </header>

        <div className="mt-12 text-center md:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
            {eyebrow}
          </p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">{title}</h1>
          <div className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
            {intro}
          </div>
          <div className="mt-6 flex justify-center gap-1" aria-hidden="true">
            {ALL_CRATES.map((c) => (
              <Crate key={c} name={c} size={30} />
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-5">{children}</div>

        <footer className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          <p>
            © {new Date().getFullYear()} {STACK_FACTORY.name}. {STACK_FACTORY.tagline}
          </p>
          <p className="mt-2 flex justify-center gap-4">
            <Link href={`${STACK_FACTORY.basePath}/support`} className="hover:text-zinc-300">
              Support
            </Link>
            <Link href={`${STACK_FACTORY.basePath}/privacy`} className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <a href={`mailto:${STACK_FACTORY.email}`} className="hover:text-zinc-300">
              Contact
            </a>
          </p>
        </footer>
      </div>

      <div className="absolute bottom-0 w-full">
        <HazardStripe />
      </div>
    </div>
  );
}

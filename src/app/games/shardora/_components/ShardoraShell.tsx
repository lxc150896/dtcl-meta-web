import Link from "next/link";

export const SHARDORA = {
  name: "Shardora",
  tagline: "Match the shards. Restore the galaxies.",
  email: "lxc150896@gmail.com",
  siteUrl: "https://dtclmeta.vn",
  basePath: "/games/shardora",
  lastUpdated: "October 11, 2026",
};

export type ShapeName =
  | "circle"
  | "triangle"
  | "square"
  | "diamond"
  | "hexagon"
  | "rectangle";

const SHAPE_COLORS: Record<ShapeName, string> = {
  circle: "#38bdf8",
  triangle: "#f472b6",
  square: "#a78bfa",
  diamond: "#facc15",
  hexagon: "#34d399",
  rectangle: "#fb923c",
};

export function Shape({ name, size = 28 }: { name: ShapeName; size?: number }) {
  const color = SHAPE_COLORS[name];
  const common = {
    fill: `${color}33`,
    stroke: color,
    strokeWidth: 2.5,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      aria-hidden="true"
      style={{ filter: `drop-shadow(0 0 6px ${color}99)` }}
    >
      {name === "circle" && <circle cx="16" cy="16" r="11" {...common} />}
      {name === "triangle" && <polygon points="16,4 28,27 4,27" {...common} />}
      {name === "square" && <rect x="6" y="6" width="20" height="20" rx="2" {...common} />}
      {name === "diamond" && <polygon points="16,3 29,16 16,29 3,16" {...common} />}
      {name === "hexagon" && (
        <polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" {...common} />
      )}
      {name === "rectangle" && <rect x="3" y="9" width="26" height="14" rx="2" {...common} />}
    </svg>
  );
}

export const ALL_SHAPES: ShapeName[] = [
  "circle",
  "triangle",
  "square",
  "diamond",
  "hexagon",
  "rectangle",
];

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
      className="scroll-mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm md:p-7"
    >
      <h2 className="mb-3 flex items-center gap-3 text-xl font-bold text-white md:text-2xl">
        {icon}
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-7 text-slate-300 md:text-base">
        {children}
      </div>
    </section>
  );
}

export function EmailCard({ note }: { note?: string }) {
  return (
    <div className="rounded-2xl border border-sky-400/30 bg-gradient-to-br from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 p-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Contact us</p>
      <a
        href={`mailto:${SHARDORA.email}?subject=${encodeURIComponent(`${SHARDORA.name} Support`)}`}
        className="mt-2 inline-block break-all text-lg font-bold text-white underline decoration-sky-400/50 underline-offset-4 hover:decoration-sky-300 md:text-xl"
      >
        📧 {SHARDORA.email}
      </a>
      {note && <p className="mt-3 text-sm text-slate-400">{note}</p>}
    </div>
  );
}

export default function ShardoraShell({
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
      href={`${SHARDORA.basePath}/${key}`}
      aria-current={active === key ? "page" : undefined}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
        active === key
          ? "bg-white text-slate-900"
          : "text-slate-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05060f] text-slate-200">
      {/* Cosmic backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-fuchsia-600/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20px 30px, #fff, transparent), radial-gradient(1px 1px at 120px 80px, #cbd5e1, transparent), radial-gradient(1.5px 1.5px at 200px 160px, #fff, transparent), radial-gradient(1px 1px at 260px 40px, #93c5fd, transparent), radial-gradient(1px 1px at 60px 200px, #f0abfc, transparent)",
            backgroundSize: "300px 240px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-16 pt-6 md:px-6">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`${SHARDORA.basePath}/support`} className="flex items-center gap-2">
            <Shape name="hexagon" size={30} />
            <span className="bg-gradient-to-r from-sky-300 via-violet-300 to-fuchsia-300 bg-clip-text text-xl font-black tracking-wide text-transparent">
              {SHARDORA.name.toUpperCase()}
            </span>
          </Link>
          <nav aria-label="Shardora pages" className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
            {navItem("support", "Support")}
            {navItem("privacy", "Privacy")}
          </nav>
        </header>

        <div className="mt-12 text-center md:mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-300">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-5xl">{title}</h1>
          <div className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
            {intro}
          </div>
          <div className="mt-6 flex justify-center gap-3" aria-hidden="true">
            {ALL_SHAPES.map((s) => (
              <Shape key={s} name={s} size={26} />
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-5">{children}</div>

        <footer className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} {SHARDORA.name}. {SHARDORA.tagline}
          </p>
          <p className="mt-2 flex justify-center gap-4">
            <Link href={`${SHARDORA.basePath}/support`} className="hover:text-slate-300">
              Support
            </Link>
            <Link href={`${SHARDORA.basePath}/privacy`} className="hover:text-slate-300">
              Privacy Policy
            </Link>
            <a href={`mailto:${SHARDORA.email}`} className="hover:text-slate-300">
              Contact
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

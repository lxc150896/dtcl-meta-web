import { BUBBLINK } from "./fast-pop-push/_components/BubblinkShell";
import { LEAP_LICK } from "./leap-lick/_components/LeapLickShell";
import { SHARDORA } from "./shardora/_components/ShardoraShell";
import { STACK_FACTORY } from "./stack-factory/_components/StackFactoryShell";
import { TFT } from "./tft/_components/TftShell";

export type Product = {
  slug: string;
  name: string;
  kind: "App" | "Game";
  genre: string;
  description: string;
  href: string; // intro page
  icon?: string; // image path; falls back to emoji
  emoji: string;
  accent: string;
  appStoreUrl: string; // "" = not available yet
  playStoreUrl: string;
};

// Order = order on the home page. A store link left empty renders a disabled "Coming soon" button.
export const PRODUCTS: Product[] = [
  {
    slug: "tft",
    name: TFT.name,
    kind: "App",
    genre: "Teamfight Tactics companion",
    description:
      "Team comps, item builds, champions, synergies and augments for Teamfight Tactics, updated every patch.",
    href: TFT.basePath,
    icon: "/favicon-192x192.png",
    emoji: "⚔️",
    accent: "#FACC15",
    appStoreUrl: TFT.appStoreUrl,
    playStoreUrl: TFT.playStoreUrl,
  },
  {
    slug: "leap-lick",
    name: LEAP_LICK.name,
    kind: "Game",
    genre: "Co-op platformer",
    description:
      "Control two frog buddies at once and pull each other across gaps with stretchy tongues through 5 worlds and 15 levels.",
    href: LEAP_LICK.basePath,
    icon: `${LEAP_LICK.img}/icon-192.png`,
    emoji: "🐸",
    accent: "#8BE04A",
    appStoreUrl: LEAP_LICK.appStoreLive ? LEAP_LICK.appStoreUrl : "",
    playStoreUrl: LEAP_LICK.playStoreLive ? LEAP_LICK.playStoreUrl : "",
  },
  {
    slug: "bubblink",
    name: BUBBLINK.name,
    kind: "Game",
    genre: "Pop it fidget game",
    description:
      "The satisfying pop it toy as a game: 30 levels, Zen, Memory, Daily and Endless modes, and lots of themes to unlock.",
    href: BUBBLINK.basePath,
    icon: `${BUBBLINK.img}/icon-192.png`,
    emoji: "🫧",
    accent: "#FF7AC8",
    appStoreUrl: BUBBLINK.appStoreUrl,
    playStoreUrl: BUBBLINK.playStoreUrl,
  },
  {
    slug: "shardora",
    name: SHARDORA.name,
    kind: "Game",
    genre: "Cosmic matching puzzle",
    description:
      "Match identical shards to rebuild galaxies, planets and nebulae across thousands of levels with shifting space hazards.",
    href: SHARDORA.basePath,
    emoji: "🔷",
    accent: "#38BDF8",
    appStoreUrl: SHARDORA.appStoreUrl,
    playStoreUrl: SHARDORA.playStoreUrl,
  },
  {
    slug: "stack-factory",
    name: STACK_FACTORY.name,
    kind: "Game",
    genre: "Crate-pushing puzzle",
    description:
      "Push falling crates into full rows and watch them collapse before the stack reaches the top of the factory.",
    href: STACK_FACTORY.basePath,
    emoji: "📦",
    accent: "#F59E0B",
    appStoreUrl: STACK_FACTORY.appStoreUrl,
    playStoreUrl: STACK_FACTORY.playStoreUrl,
  },
];

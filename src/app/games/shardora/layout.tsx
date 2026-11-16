import type { Metadata } from "next";

// Shardora favicon for every page under /games/shardora.
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/images/shardora/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/shardora/apple-icon.png", sizes: "180x180" }],
  },
};

export default function ShardoraLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from "next";

// Leap & Lick favicon for every page under /games/leap-lick.
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/images/leap-lick/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/leap-lick/apple-icon.png", sizes: "180x180" }],
  },
};

export default function LeapLickLayout({ children }: { children: React.ReactNode }) {
  return children;
}

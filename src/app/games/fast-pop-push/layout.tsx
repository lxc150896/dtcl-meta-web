import type { Metadata } from "next";

// Bubblink favicon for every page under /games/fast-pop-push.
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/images/bubblink/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/bubblink/apple-icon.png", sizes: "180x180" }],
  },
};

export default function BubblinkLayout({ children }: { children: React.ReactNode }) {
  return children;
}

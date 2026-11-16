import type { Metadata } from "next";

// Stack Factory favicon for every page under /games/stack-factory.
export const metadata: Metadata = {
  icons: {
    icon: [{ url: "/images/stack-factory/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/images/stack-factory/apple-icon.png", sizes: "180x180" }],
  },
};

export default function StackFactoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}

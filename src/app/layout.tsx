import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import HeaderMenu from "@/components/ui/HeaderMenu";
import ClientLayoutHelper from "@/components/ClientLayoutHelper";
import { CEO_META_DATA } from "@/constants";
import HeaderSearch from "@/components/ui/HeaderSearch";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = CEO_META_DATA.menu;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HMZL0SS7ZX"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HMZL0SS7ZX');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DataProvider>
          <HeaderSearch />
          <HeaderMenu />

          <div className="flex justify-center bg-black">
            {/* Banner trái - chỉ hiện ở màn hình md trở lên */}
            <div className="hidden lg:block">
              {/* <img src="/ads-left.png" alt="Ad Left" className="sticky top-4" /> */}
            </div>

            {/* Nội dung chính */}
            <main className="max-w-5xl w-full">
              <ClientLayoutHelper />
              <div className="mx-0 md:mx-4">
                {children}
              </div>
            </main>

            {/* Banner phải - chỉ hiện ở màn hình md trở lên */}
            <div className="hidden lg:block">
              {/* <img src="/ads-right.png" alt="Ad Right" className="sticky top-4" /> */}
            </div>
          </div>
        </DataProvider>
      </body>
    </html>
  );
}

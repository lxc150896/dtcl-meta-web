import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/context/DataContext";
import HeaderMenu from "@/components/ui/HeaderMenu";
// import ClientLayoutHelper from "@/components/ClientLayoutHelper";
import { CEO_META_DATA } from "@/constants";
import HeaderSearch from "@/components/ui/HeaderSearch";
import Script from "next/script";

const roboto = Roboto({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = CEO_META_DATA.menu;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${roboto.variable}`}>
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png" />
        <link rel="apple-touch-icon" href="/favicon-192x192.png" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Meta Đấu Trường Chân Lý mùa 15 | Cập nhật đội hình mạnh" />
        <meta property="og:description" content="Cập nhật meta mới nhất ĐTCL mùa 15, top đội hình mạnh, cách chơi, xoay bài và ghép đồ chuẩn." />
        <meta property="og:image" content="https://dtclmeta.vn/images/banner.webp" />
        <meta property="og:url" content="https://dtclmeta.vn" />
        <meta property="og:site_name" content="DTCL Meta" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meta Đấu Trường Chân Lý mùa 15 | Cập nhật đội hình mạnh" />
        <meta name="twitter:image" content="https://dtclmeta.vn/images/banner.webp" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body>
        <DataProvider>
          <HeaderSearch />
          <HeaderMenu />

          <div className="flex justify-center bg-black">
            {/* Banner trái - chỉ hiện ở màn hình md trở lên */}
            <div className="hidden lg:block">
              {/* <img src="/ads-left.png" alt="Ad Left" className="sticky top-4" /> */}
            </div>

            {/* Nội dung chính */}
            <main className="max-w-[1080px] w-full">
              {/* <ClientLayoutHelper /> */}
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

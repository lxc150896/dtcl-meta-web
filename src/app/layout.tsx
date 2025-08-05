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

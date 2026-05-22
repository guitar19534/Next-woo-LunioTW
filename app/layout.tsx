import "./globals.css";

import { Suspense } from "react";
import { Noto_Sans_TC } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { CartProvider } from "@/components/shop";
import { NavWrapper } from "@/components/layout/nav-wrapper";
import { Footer } from "@/components/layout/footer";
import { PurchasePopup } from "@/components/shared/PurchasePopup";
import { AddToCartHandler } from "@/components/shop/AddToCartHandler";
import Script from "next/script";

import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";

const font = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.site_name} — 為了更好的睡眠品質`,
    template: `%s | ${siteConfig.site_name}`,
  },
  description: siteConfig.site_description,
  icons: {
    icon: "/Lunio-favicon.webp",
    shortcut: "/Lunio-favicon.webp",
    apple: "/Lunio-favicon.webp",
  },
  metadataBase: new URL(siteConfig.site_domain),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: siteConfig.site_domain,
    siteName: siteConfig.site_name,
    title: `${siteConfig.site_name} — 為了更好的睡眠品質`,
    description: siteConfig.site_description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.site_name} — 為了更好的睡眠品質`,
    description: siteConfig.site_description,
  },
  keywords: [
    "床墊", "乳膠床墊", "石墨烯床墊", "枕頭", "寢具",
    "Lunio", "睡眠", "天然乳膠", "獨立筒", "台灣床墊",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MM84H3V');`,
          }}
        />
      </head>
      <body className={cn("min-h-screen font-sans antialiased", font.variable)}>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MM84H3V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <NavWrapper />
            {children}
            <Footer />
            <PurchasePopup />
            <Suspense fallback={null}>
              <AddToCartHandler />
            </Suspense>
          </CartProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

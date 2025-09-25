import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";
import { ThemeSwitcher } from "./_components/theme-switcher";
import { LanguageSwitcher } from "./_components/language-switcher";
import { CartDisplay } from "./_components/cart-display";
import { Footer } from "./_components/footer";
import { CartProvider } from "@/contexts/CartContext";
import { SITE_CONFIG } from "@/lib/constants";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com'),
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.metaDescription,
  keywords: [
    'TMT配件', '叉车配件', '叉车零部件', '工业配件', '配件销售', '叉车维修',
    'forklift parts', 'TMT parts', 'industrial parts', 'forklift accessories',
    'запчасти для погрузчиков', 'TMT запчасти', 'детали погрузчиков',
    'フォークリフト部品', 'TMT部品', 'フォークリフトパーツ',
    'Gabelstaplerteile', 'TMT Teile', 'Staplerteile',
    'pièces de chariot élévateur', 'TMT pièces', 'accessoires chariot',
    'repuestos montacargas', 'TMT repuestos', 'partes montacargas',
    'peças empilhadeira', 'TMT peças', 'acessórios empilhadeira'
  ],
  authors: [{ name: 'TMT Parts Sale' }],
  creator: 'TMT Parts Sale',
  publisher: 'TMT Parts Sale',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.metaDescription,
    siteName: SITE_CONFIG.title,
    images: [
      {
        url: '/assets/og-image.jpg',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.metaDescription,
    images: ['/assets/og-image.jpg'],
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || 'your-google-verification-code',
    yandex: process.env.YANDEX_VERIFICATION_CODE || 'your-yandex-verification-code',
    yahoo: process.env.YAHOO_VERIFICATION_CODE || 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://parts.toomotoo.com',
    languages: {
      'zh-CN': 'https://parts.toomotoo.com',
      'en-US': 'https://parts.toomotoo.com/en',
      'ru-RU': 'https://parts.toomotoo.com/ru',
      'ja-JP': 'https://parts.toomotoo.com/ja',
      'de-DE': 'https://parts.toomotoo.com/de',
      'fr-FR': 'https://parts.toomotoo.com/fr',
      'es-ES': 'https://parts.toomotoo.com/es',
      'pt-BR': 'https://parts.toomotoo.com/pt',
      'x-default': 'https://parts.toomotoo.com',
    },
  },
  other: {
    'google-site-verification': process.env.GOOGLE_VERIFICATION_CODE || '',
    'yandex-verification': process.env.YANDEX_VERIFICATION_CODE || '',
    'msvalidate.01': process.env.BING_VERIFICATION_CODE || '',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "dark:bg-slate-900 dark:text-slate-400")}
        suppressHydrationWarning
      >
        <CartProvider>
          <div className="absolute right-4 top-4 z-40 flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <CartDisplay />
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}

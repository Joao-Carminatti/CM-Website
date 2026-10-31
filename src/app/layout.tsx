import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { PointerEffects } from "@/components/ui/PointerEffects";
import { Analytics } from "@/components/analytics/Analytics";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

const newsreader = localFont({
  src: [
    { path: "./fonts/newsreader-normal.woff2", style: "normal", weight: "200 800" },
    { path: "./fonts/newsreader-italic.woff2", style: "italic", weight: "200 800" },
  ],
  variable: "--font-newsreader",
  display: "swap",
});

const hanken = localFont({
  src: "./fonts/hanken-grotesk.woff2",
  weight: "100 900",
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nome} | ${siteConfig.cargo}`,
    template: `%s | ${siteConfig.nome}`,
  },
  description: siteConfig.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: siteConfig.nome,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1d2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${hanken.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#conteudo"
          className="bg-ink text-paper sr-only rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60]"
        >
          Ir para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <PointerEffects />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}

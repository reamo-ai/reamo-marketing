import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, DM_Sans } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "300", "400", "500", "600", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reamo.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reamo — The Real Estate Agent Middle Office",
  description:
    "Reamo connects to your business phone system and handles call notes, CRM updates, calendar management, and follow-ups automatically — while you talk.",
  openGraph: {
    type: "website",
    siteName: "Reamo",
    title: "Reamo — The Real Estate Agent Middle Office",
    description:
      "Reamo connects to your business phone system and handles call notes, CRM updates, calendar management, and follow-ups automatically — while you talk.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reamo — The Real Estate Agent Middle Office",
    description:
      "Reamo connects to your business phone system and handles call notes, CRM updates, calendar management, and follow-ups automatically — while you talk.",
  },
  // Favicon (app/icon.png), Apple touch icon (app/apple-icon.png), the social
  // share card (app/opengraph-image.png / app/twitter-image.png) and the web
  // manifest (app/manifest.ts) are all wired up automatically via Next.js file
  // conventions, so no explicit `icons` entry is needed here.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071020",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${dmSans.variable}`}>
      <body className="bg-near-black">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

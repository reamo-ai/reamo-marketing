import type { Metadata } from "next";
import { Inter, Montserrat, DM_Sans } from "next/font/google";
import RootLayoutClient from "./RootLayoutClient";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "600", "700"],
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reamo.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Reamo — The Real Estate Agent Middle Office",
  description:
    "Reamo connects to your existing business phone system and creates real estate-specific notes, calendar updates, and CRM-ready sheets — automatically while you talk.",
  openGraph: {
    type: "website",
    siteName: "Reamo",
    title: "Reamo — The Real Estate Agent Middle Office",
    description:
      "Reamo connects to your existing business phone system and creates real estate-specific notes, calendar updates, and CRM-ready sheets — automatically while you talk.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reamo — The Real Estate Agent Middle Office",
    description:
      "Reamo connects to your existing business phone system and creates real estate-specific notes, calendar updates, and CRM-ready sheets — automatically while you talk.",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${dmSans.variable}`}>
      <body className="pt-[var(--nav-height)]">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}

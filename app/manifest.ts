import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reamo — AI Middle Office for Real Estate Agents",
    short_name: "Reamo",
    description:
      "Reamo connects to your business phone system and handles call notes, CRM updates, calendar management, and follow-ups automatically — while you talk.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}

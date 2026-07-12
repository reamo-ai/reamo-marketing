import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reamo.ai";

// Public, indexable routes. Keep in sync with the app/ route folders; omit
// utility pages like /unsubscribe that shouldn't surface in search.
const routes: Array<{ path: string; priority: number }> = [
  { path: "/", priority: 1 },
  { path: "/waitlist", priority: 0.8 },
  { path: "/contact-us", priority: 0.5 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-of-service", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}

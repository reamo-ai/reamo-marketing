import { NextRequest, NextResponse } from "next/server";
import { GEO_COOKIE } from "@/lib/consent";

// Records the visitor's country (from Cloudflare's CF-IPCountry header, since
// reamo.ai is fronted by Cloudflare) in a non-httpOnly cookie so the client
// consent code can choose an opt-in vs opt-out default. If the header is absent
// (e.g. Cloudflare IP Geolocation not enabled, or local dev), the value is "XX"
// which the client treats as opt-in — the conservative fallback.
//
// The cookie is only (re)written when missing or changed, so most responses
// carry no Set-Cookie and stay edge-cacheable.
export function middleware(req: NextRequest) {
  const country = (req.headers.get("cf-ipcountry") || "XX").toUpperCase();
  const existing = req.cookies.get(GEO_COOKIE)?.value;

  const res = NextResponse.next();
  if (existing !== country) {
    res.cookies.set(GEO_COOKIE, country, {
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day — refresh so travelers/VPN changes are picked up
      sameSite: "lax",
    });
  }
  return res;
}

export const config = {
  // Run on page routes only; skip static assets and Next internals.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|txt|xml|json|webmanifest)$).*)",
  ],
};

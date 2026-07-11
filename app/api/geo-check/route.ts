import { NextRequest, NextResponse } from 'next/server';
import { regimeForCountry } from '@/lib/consent';

// Diagnostic: confirms at runtime whether Cloudflare is forwarding the
// CF-IPCountry header to the origin. The geo-aware consent default depends on
// it — if the header is absent (Cloudflare IP Geolocation not enabled), every
// visitor silently falls back to the opt-in regime and the US opt-out default
// never activates. Hit this on the deployed site (e.g. GET https://reamo.ai/api/geo-check)
// to verify the header is present.
//
// Reads per-request headers, so it must never be statically cached.
export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  const raw = req.headers.get('cf-ipcountry');
  // Cloudflare sends "XX" (unknown) or "T1" (Tor) when it can't geolocate;
  // those are forwarded-but-unusable, distinct from the header being absent.
  const headerPresent = raw !== null;
  const usable = headerPresent && raw !== '' && raw !== 'XX' && raw !== 'T1';

  return NextResponse.json(
    {
      headerPresent,
      country: raw,
      usableForGeo: usable,
      // The regime this caller would receive. When the header is missing/unknown
      // this is the opt-in fallback (tracking off until explicit consent).
      regime: regimeForCountry(usable ? raw : null),
      ok: headerPresent,
      hint: headerPresent
        ? undefined
        : 'CF-IPCountry not received — enable IP Geolocation in Cloudflare so US visitors get the opt-out default; until then all visitors fall back to opt-in.',
    },
    // 200 when working; 503 signals the misconfiguration to uptime checks.
    { status: headerPresent ? 200 : 503 },
  );
}

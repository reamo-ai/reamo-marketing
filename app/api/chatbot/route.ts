import { getClientIp } from '@/lib/rate-limit';

/**
 * Thin server-side proxy for the RAG chatbot.
 *
 * The browser talks to this same-origin route; this route streams the request through to the
 * Railway Express endpoint (`/api/chatbot/message`), which does all the real work (embedding,
 * pgvector retrieval, Claude generation, guardrails). Keeping the backend behind this proxy means:
 *   - the backend origin + any secrets stay server-side (never shipped to the browser),
 *   - the browser never deals with cross-origin CORS,
 *   - the real visitor IP is forwarded via the trusted `X-Reamo-Client-IP` header (same mechanism
 *     as auth) so the backend's Redis rate limiter keys on the visitor, not this proxy.
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const BACKEND_URL = (
  process.env.CHATBOT_BACKEND_URL ?? 'https://reamo-production.up.railway.app'
).replace(/\/$/, '');

export async function POST(req: Request): Promise<Response> {
  let body: { message?: unknown; sessionId?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'bad_request' }, { status: 400 });
  }

  const message = typeof body?.message === 'string' ? body.message : '';
  if (!message.trim()) {
    return Response.json({ error: 'empty_message' }, { status: 400 });
  }
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId : undefined;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const proxySecret = process.env.AUTH_PROXY_SECRET?.trim();
  const clientIp = getClientIp(req);
  if (proxySecret && clientIp && clientIp !== 'unknown') {
    headers['X-Reamo-Client-IP'] = clientIp;
    headers['X-Reamo-Auth-Proxy-Secret'] = proxySecret;
  }

  let upstream: Response;
  try {
    upstream = await fetch(`${BACKEND_URL}/api/chatbot/message`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ message, sessionId }),
    });
  } catch {
    return Response.json({ error: 'upstream_unreachable' }, { status: 502 });
  }

  // Non-streaming responses (400/429/503/etc.) pass straight through, preserving Retry-After.
  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    const resHeaders: Record<string, string> = {
      'Content-Type': upstream.headers.get('content-type') ?? 'application/json',
    };
    const retryAfter = upstream.headers.get('retry-after');
    if (retryAfter) resHeaders['Retry-After'] = retryAfter;
    return new Response(text || JSON.stringify({ error: 'upstream_error' }), {
      status: upstream.status,
      headers: resHeaders,
    });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

import { unsubscribeFromAudience } from '@/lib/resend-audience';
import { parseUnsubscribeBody } from '@/lib/newsletter-validation';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`unsubscribe:${ip}`)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = parseUnsubscribeBody(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { ok: false, message: parsed.message },
        { status: 400 }
      );
    }

    const result = await unsubscribeFromAudience(parsed.email);

    if (result === 'not_found') {
      return NextResponse.json({
        ok: true,
        message: 'If that address was on our list, it has been removed.',
      });
    }

    if (result === 'already_unsubscribed') {
      return NextResponse.json({
        ok: true,
        message: "You're already unsubscribed from Reamo updates.",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "You've been unsubscribed from Reamo product updates.",
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

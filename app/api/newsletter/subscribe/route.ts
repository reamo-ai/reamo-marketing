import { addSubscriberToAudience } from '@/lib/resend-audience';
import {
  isHoneypotSubmit,
  parseSubscribeBody,
} from '@/lib/newsletter-validation';
import { sendWelcomeEmail } from '@/lib/resend';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`subscribe:${ip}`)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parsed = parseSubscribeBody(body);

    if (!parsed.ok) {
      return NextResponse.json(
        { ok: false, message: parsed.message },
        { status: 400 }
      );
    }

    if (isHoneypotSubmit(parsed.data)) {
      return NextResponse.json({ ok: true, message: 'Thanks for subscribing!' });
    }

    const result = await addSubscriberToAudience(parsed.data);

    if (result.outcome === 'already_subscribed') {
      return NextResponse.json({
        ok: true,
        message: "You're already subscribed. We'll keep you posted.",
      });
    }

    try {
      await sendWelcomeEmail(parsed.data.firstName, parsed.data.email);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
      return NextResponse.json(
        {
          ok: false,
          message:
            "You're on our list, but we couldn't send a confirmation email. Please try again or contact support@reamo.ai.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'Thanks for subscribing! Check your inbox for a confirmation.',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

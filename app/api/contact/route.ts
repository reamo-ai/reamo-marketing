import { getResendClient } from '@/lib/resend';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUPPORT_EMAIL = 'support@reamo.ai';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function parseContactBody(
  body: unknown
):
  | {
      ok: true;
      data: {
        firstName: string;
        lastName: string;
        email: string;
        subject: string;
        message: string;
      };
    }
  | { ok: false; message: string }
  | { ok: true; honeypot: true } {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Invalid request body' };
  }

  const record = body as Record<string, unknown>;
  const honeypot = typeof record.website === 'string' ? record.website.trim() : '';
  if (honeypot) {
    return { ok: true, honeypot: true };
  }

  const firstName = typeof record.firstName === 'string' ? record.firstName.trim() : '';
  const lastName = typeof record.lastName === 'string' ? record.lastName.trim() : '';
  const email = typeof record.email === 'string' ? record.email.trim() : '';
  const subject = typeof record.subject === 'string' ? record.subject.trim() : '';
  const message = typeof record.message === 'string' ? record.message.trim() : '';

  if (!firstName || firstName.length > 80) {
    return { ok: false, message: 'Please enter your first name' };
  }

  if (!lastName || lastName.length > 80) {
    return { ok: false, message: 'Please enter your last name' };
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, message: 'Please enter a valid email address' };
  }

  if (!subject || subject.length > 200) {
    return { ok: false, message: 'Please enter a subject' };
  }

  if (!message || message.length > 5000) {
    return { ok: false, message: 'Please enter a message' };
  }

  return { ok: true, data: { firstName, lastName, email, subject, message } };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`contact:${ip}`)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const parsed = parseContactBody(await request.json());

    if (!parsed.ok) {
      return NextResponse.json(
        { ok: false, message: parsed.message },
        { status: 400 }
      );
    }

    if ('honeypot' in parsed) {
      return NextResponse.json({ ok: true, message: "Thank you! We'll be in touch." });
    }

    const { firstName, lastName, email, subject, message } = parsed.data;
    const from = process.env.RESEND_FROM_EMAIL;
    if (!from) {
      throw new Error('RESEND_FROM_EMAIL is not configured');
    }

    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from,
      to: SUPPORT_EMAIL,
      replyTo: email,
      subject: `Contact form: ${subject}`,
      html: `
        <h2>New contact form message</h2>
        <p><strong>From:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <hr />
        <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error('Contact email failed:', error);
      return NextResponse.json(
        { ok: false, message: 'Something went wrong. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Thank you! We'll be in touch.",
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

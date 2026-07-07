import { getResendClient } from '@/lib/resend';
import { getClientIp, isRateLimited } from '@/lib/rate-limit';
import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ADMIN_EMAIL = 'admin@reamo.ai';

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type RequestAccessData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  teamSize: string;
  phoneSystem: string;
  crm: string;
  transactionPlatform: string;
  notes: string;
};

function parseRequestAccessBody(
  body: unknown
):
  | { ok: true; data: RequestAccessData }
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

  const str = (key: string) => (typeof record[key] === 'string' ? (record[key] as string).trim() : '');

  const firstName = str('firstName');
  const lastName = str('lastName');
  const email = str('email');
  const phone = str('phone');
  const company = str('company');
  const role = str('role');
  const teamSize = str('teamSize');
  const phoneSystem = str('phoneSystem');
  const crm = str('crm');
  const transactionPlatform = str('transactionPlatform');
  const notes = str('notes');

  if (!firstName || firstName.length > 80) {
    return { ok: false, message: 'Please enter your first name' };
  }
  if (!lastName || lastName.length > 80) {
    return { ok: false, message: 'Please enter your last name' };
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, message: 'Please enter a valid email address' };
  }
  if (!phone || phone.length > 40) {
    return { ok: false, message: 'Please enter a valid phone number' };
  }
  if (!company || company.length > 150) {
    return { ok: false, message: 'Please enter your company or brokerage name' };
  }
  if (!role || role.length > 80) {
    return { ok: false, message: 'Please select your role' };
  }
  if (!teamSize || teamSize.length > 40) {
    return { ok: false, message: 'Please select your team size' };
  }
  if (!phoneSystem || phoneSystem.length > 120) {
    return { ok: false, message: 'Please tell us your phone system' };
  }
  if (!crm || crm.length > 120) {
    return { ok: false, message: 'Please tell us your CRM' };
  }
  if (!transactionPlatform || transactionPlatform.length > 120) {
    return { ok: false, message: 'Please tell us your transaction platform' };
  }
  if (notes.length > 2000) {
    return { ok: false, message: 'Please shorten your message' };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      phone,
      company,
      role,
      teamSize,
      phoneSystem,
      crm,
      transactionPlatform,
      notes,
    },
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`request-access:${ip}`)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const parsed = parseRequestAccessBody(await request.json());

    if (!parsed.ok) {
      return NextResponse.json({ ok: false, message: parsed.message }, { status: 400 });
    }

    if ('honeypot' in parsed) {
      return NextResponse.json({ ok: true, message: "Thanks! We'll be in touch." });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      role,
      teamSize,
      phoneSystem,
      crm,
      transactionPlatform,
      notes,
    } = parsed.data;

    const from = process.env.RESEND_FROM_EMAIL;
    if (!from) {
      throw new Error('RESEND_FROM_EMAIL is not configured');
    }

    const resend = getResendClient();
    const { error } = await resend.emails.send({
      from,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `Access request: ${company} (${firstName} ${lastName})`,
      html: `
        <h2>New access request</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Company / Brokerage:</strong> ${escapeHtml(company)}</p>
        <p><strong>Role:</strong> ${escapeHtml(role)}</p>
        <p><strong>Team size:</strong> ${escapeHtml(teamSize)}</p>
        <p><strong>Phone system:</strong> ${escapeHtml(phoneSystem)}</p>
        <p><strong>CRM:</strong> ${escapeHtml(crm)}</p>
        <p><strong>Transaction platform:</strong> ${escapeHtml(transactionPlatform)}</p>
        ${
          notes
            ? `<hr /><p><strong>Notes:</strong></p><p style="white-space:pre-wrap;">${escapeHtml(notes)}</p>`
            : ''
        }
      `,
    });

    if (error) {
      console.error('Request access email failed:', error);
      return NextResponse.json(
        { ok: false, message: 'Something went wrong. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: "Thanks! We'll be in touch shortly." });
  } catch (error) {
    console.error('Request access form error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

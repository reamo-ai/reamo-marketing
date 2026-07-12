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

type PartnerApplicationData = {
  companyName: string;
  contactName: string;
  email: string;
  companyWebsite: string;
  category: string;
  productDescription: string;
  integrationGoals: string;
  userBase: string;
};

function parsePartnerApplicationBody(
  body: unknown
):
  | { ok: true; data: PartnerApplicationData }
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

  const companyName = str('companyName');
  const contactName = str('contactName');
  const email = str('email');
  const companyWebsite = str('companyWebsite');
  const category = str('category');
  const productDescription = str('productDescription');
  const integrationGoals = str('integrationGoals');
  const userBase = str('userBase');

  if (!companyName || companyName.length > 150) {
    return { ok: false, message: 'Please enter your company name' };
  }
  if (!contactName || contactName.length > 120) {
    return { ok: false, message: 'Please enter your name' };
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, message: 'Please enter a valid work email address' };
  }
  if (!companyWebsite || companyWebsite.length > 200) {
    return { ok: false, message: 'Please enter your company website' };
  }
  if (!category || category.length > 60) {
    return { ok: false, message: 'Please select a product category' };
  }
  if (!productDescription || productDescription.length > 2000) {
    return { ok: false, message: 'Please describe your product' };
  }
  if (!integrationGoals || integrationGoals.length > 2000) {
    return { ok: false, message: "Please tell us what you'd want the integration to do" };
  }
  if (userBase.length > 40) {
    return { ok: false, message: 'Please select a valid user base range' };
  }

  return {
    ok: true,
    data: {
      companyName,
      contactName,
      email,
      companyWebsite,
      category,
      productDescription,
      integrationGoals,
      userBase,
    },
  };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`partner-application:${ip}`)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const parsed = parsePartnerApplicationBody(await request.json());

    if (!parsed.ok) {
      return NextResponse.json({ ok: false, message: parsed.message }, { status: 400 });
    }

    if ('honeypot' in parsed) {
      return NextResponse.json({ ok: true, message: "Thanks! We'll be in touch." });
    }

    const {
      companyName,
      contactName,
      email,
      companyWebsite,
      category,
      productDescription,
      integrationGoals,
      userBase,
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
      subject: `Partner application: ${companyName} (${contactName})`,
      html: `
        <h2>New integration partner application</h2>
        <p><strong>Company:</strong> ${escapeHtml(companyName)}</p>
        <p><strong>Contact:</strong> ${escapeHtml(contactName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Website:</strong> ${escapeHtml(companyWebsite)}</p>
        <p><strong>Category:</strong> ${escapeHtml(category)}</p>
        ${userBase ? `<p><strong>Estimated user base:</strong> ${escapeHtml(userBase)}</p>` : ''}
        <hr />
        <p><strong>Product:</strong></p>
        <p style="white-space:pre-wrap;">${escapeHtml(productDescription)}</p>
        <p><strong>What they want the integration to do:</strong></p>
        <p style="white-space:pre-wrap;">${escapeHtml(integrationGoals)}</p>
      `,
    });

    if (error) {
      console.error('Partner application email failed:', error);
      return NextResponse.json(
        { ok: false, message: 'Something went wrong. Please try again later.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: "Thanks! We'll be in touch shortly." });
  } catch (error) {
    console.error('Partner application form error:', error);
    return NextResponse.json(
      { ok: false, message: 'Something went wrong. Please try again later.' },
      { status: 500 }
    );
  }
}

import type { SubscribeInput } from './newsletter-types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseSubscribeBody(
  body: unknown
): { ok: true; data: SubscribeInput } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Invalid request body' };
  }

  const record = body as Record<string, unknown>;
  const firstName = typeof record.firstName === 'string' ? record.firstName.trim() : '';
  const lastName = typeof record.lastName === 'string' ? record.lastName.trim() : '';
  const email = typeof record.email === 'string' ? record.email.trim() : '';
  const honeypot = typeof record.website === 'string' ? record.website.trim() : '';

  if (honeypot) {
    return { ok: true, data: { firstName: '', lastName: '', email: 'honeypot@invalid.local' } };
  }

  if (!firstName || firstName.length > 80) {
    return { ok: false, message: 'Please enter your first name' };
  }

  if (!lastName || lastName.length > 80) {
    return { ok: false, message: 'Please enter your last name' };
  }

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, message: 'Please enter a valid email address' };
  }

  return { ok: true, data: { firstName, lastName, email } };
}

export function parseUnsubscribeBody(
  body: unknown
): { ok: true; email: string } | { ok: false; message: string } {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Invalid request body' };
  }

  const record = body as Record<string, unknown>;
  const email = typeof record.email === 'string' ? record.email.trim() : '';

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, message: 'Please enter a valid email address' };
  }

  return { ok: true, email };
}

export function isHoneypotSubmit(data: SubscribeInput) {
  return data.email === 'honeypot@invalid.local';
}

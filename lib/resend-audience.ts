import type { SubscribeInput } from './newsletter-types';
import { getResendClient } from './resend';

export type AudienceSubscribeResult =
  | { outcome: 'created' }
  | { outcome: 'reactivated' }
  | { outcome: 'already_subscribed' };

function getAudienceId() {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!audienceId) {
    throw new Error('RESEND_AUDIENCE_ID is not configured');
  }
  return audienceId;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function addSubscriberToAudience(
  input: SubscribeInput
): Promise<AudienceSubscribeResult> {
  const audienceId = getAudienceId();
  const resend = getResendClient();
  const email = normalizeEmail(input.email);

  const { error: createError } = await resend.contacts.create({
    email,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    audienceId,
    unsubscribed: false,
  });

  if (!createError) {
    return { outcome: 'created' };
  }

  const { data: existing, error: getError } = await resend.contacts.get({
    email,
    audienceId,
  });

  if (getError || !existing) {
    throw new Error(createError.message);
  }

  if (!existing.unsubscribed) {
    return { outcome: 'already_subscribed' };
  }

  const { error: updateError } = await resend.contacts.update({
    email,
    audienceId,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    unsubscribed: false,
  });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { outcome: 'reactivated' };
}

export async function unsubscribeFromAudience(
  email: string
): Promise<'unsubscribed' | 'not_found' | 'already_unsubscribed'> {
  const audienceId = getAudienceId();
  const resend = getResendClient();
  const normalized = normalizeEmail(email);

  const { data: existing, error: getError } = await resend.contacts.get({
    email: normalized,
    audienceId,
  });

  if (getError || !existing) {
    return 'not_found';
  }

  if (existing.unsubscribed) {
    return 'already_unsubscribed';
  }

  const { error: updateError } = await resend.contacts.update({
    email: normalized,
    audienceId,
    unsubscribed: true,
  });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return 'unsubscribed';
}

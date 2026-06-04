import { Resend } from 'resend';

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://reamo.ai';
}

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Resend is not configured');
  }
  return new Resend(apiKey);
}

export function buildWelcomeEmailHtml(firstName: string, email: string) {
  const siteUrl = getSiteUrl();
  const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:system-ui,-apple-system,sans-serif;color:#ffffff;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:32px 16px;">
      <tr>
        <td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#14141e;border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:32px;">
            <tr>
              <td>
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#00d4a0;">Reamo</p>
                <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#ffffff;">You&apos;re on the list${firstName ? `, ${firstName}` : ''}.</h1>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#9999aa;">
                  Thanks for signing up. We&apos;ll send you updates about new integrations and features in Reamo as we ship them.
                </p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#9999aa;">
                  Questions or feedback? Reply to this email or reach us at
                  <a href="mailto:support@reamo.ai" style="color:#00d4a0;">support@reamo.ai</a>.
                  We&apos;d love to hear from you.
                </p>
                <p style="margin:24px 0 0;font-size:12px;line-height:1.6;color:#6b6b7a;">
                  Reamo LLC<br />
                  <a href="${unsubscribeUrl}" style="color:#00d4a0;">Unsubscribe</a> from product updates at any time.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();
}

export async function sendWelcomeEmail(
  firstName: string,
  email: string
): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL;
  if (!from) {
    throw new Error('RESEND_FROM_EMAIL is not configured');
  }

  const resend = getResendClient();
  const { error } = await resend.emails.send({
    from,
    to: email,
    subject: "You're on the list — Reamo updates",
    html: buildWelcomeEmailHtml(firstName, email),
  });

  if (error) {
    throw new Error(error.message);
  }
}

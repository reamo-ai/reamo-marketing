import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface LeadPayload {
  email: string;
  monthlyAdminHours: number;
  monthlyOpportunityCost: number;
  annualOpportunityCost: number;
  annualROI: number;
  roiMultiple: number;
  inputs: {
    callsPerWeek: number;
    followUpMins: number;
    avgCommission: number;
    closingsPerMonth: number;
  };
}

const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export async function POST(req: NextRequest) {
  try {
    const body: LeadPayload = await req.json();
    const { email, monthlyAdminHours, monthlyOpportunityCost, annualOpportunityCost, annualROI, roiMultiple, inputs } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (process.env.RESEND_CALCULATOR_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: process.env.RESEND_CALCULATOR_AUDIENCE_ID,
        unsubscribed: false,
      });
    }

    await resend.emails.send({
      from: "Reamo <updates@reamo.ai>",
      to: "josh@reamo.ai",
      subject: `New calculator lead: ${email}`,
      html: `
        <h2>New Calculator Lead</h2>
        <p><strong>Email:</strong> ${email}</p>
        <hr />
        <h3>Their Numbers</h3>
        <ul>
          <li>Calls/week: ${inputs.callsPerWeek}</li>
          <li>Admin mins/call: ${inputs.followUpMins}</li>
          <li>Avg commission: ${fmt(inputs.avgCommission)}</li>
          <li>Closings/month: ${inputs.closingsPerMonth}</li>
        </ul>
        <hr />
        <h3>Output</h3>
        <ul>
          <li>Monthly admin hours: ${monthlyAdminHours} hrs</li>
          <li>Monthly opportunity cost: ${fmt(monthlyOpportunityCost)}</li>
          <li>Annual opportunity lost: ${fmt(annualOpportunityCost)}</li>
          <li>Annual ROI with Reamo: ${fmt(annualROI)}</li>
          <li>Return multiple: ${roiMultiple}x</li>
        </ul>
      `,
    });

    await resend.emails.send({
      from: "Josh at Reamo <updates@reamo.ai>",
      to: email,
      subject: `Your admin time is costing you ${fmt(annualOpportunityCost)}/year`,
      html: `
        <!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /></head>
        <body style="margin:0;padding:0;background:#0a0a0f;font-family:'DM Sans',Arial,sans-serif;color:#ffffff;">
          <div style="max-width:600px;margin:0 auto;padding:48px 32px;">
            <p style="font-family:Montserrat,Arial,sans-serif;font-weight:800;font-size:22px;color:#00d4a0;margin:0 0 40px;">Reamo</p>
            <h1 style="font-family:Montserrat,Arial,sans-serif;font-size:28px;font-weight:800;line-height:1.2;margin:0 0 16px;letter-spacing:-0.02em;">Here&apos;s what your admin time<br/>is actually costing you.</h1>
            <p style="color:#9999aa;font-size:15px;line-height:1.6;margin:0 0 40px;">Based on the numbers you entered, here&apos;s your full breakdown.</p>
            <div style="background:#14141e;border:1px solid #1e1e2e;border-radius:16px;padding:32px;margin-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="padding-bottom:24px;"><p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#9999aa;">Monthly admin hours</p><p style="margin:0;font-family:Montserrat,Arial,sans-serif;font-size:32px;font-weight:800;color:#ffffff;">${monthlyAdminHours} hrs</p></td></tr>
                <tr><td style="padding-bottom:24px;border-top:1px solid #1e1e2e;padding-top:24px;"><p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#00a07a;">Monthly opportunity cost</p><p style="margin:0;font-family:Montserrat,Arial,sans-serif;font-size:32px;font-weight:800;color:#00d4a0;">${fmt(monthlyOpportunityCost)}</p></td></tr>
                <tr><td style="border-top:1px solid #1e1e2e;padding-top:24px;"><p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#9999aa;">Annual opportunity lost</p><p style="margin:0;font-family:Montserrat,Arial,sans-serif;font-size:32px;font-weight:800;color:#ffffff;">${fmt(annualOpportunityCost)}</p></td></tr>
              </table>
            </div>
            <div style="background:linear-gradient(135deg,#0d1f1a 0%,#14141e 100%);border:1px solid rgba(0,212,160,0.25);border-radius:16px;padding:24px 32px;margin-bottom:40px;">
              <p style="margin:0 0 8px;font-size:13px;color:#00a07a;">With Reamo at $78/mo, your return is:</p>
              <p style="margin:0;font-family:Montserrat,Arial,sans-serif;font-size:28px;font-weight:800;color:#00d4a0;">${roiMultiple}x &mdash; ${fmt(annualROI)} net/year</p>
            </div>
            <p style="font-size:15px;line-height:1.7;color:#ccccdd;margin:0 0 16px;">Hey — Josh here. I built Reamo after watching agents (including my own mom, who&apos;s still actively selling) spend hours every week on admin that should be automated.</p>
            <p style="font-size:15px;line-height:1.7;color:#ccccdd;margin:0 0 16px;">Those ${fmt(monthlyOpportunityCost)} a month aren&apos;t a rounding error — they&apos;re real commission hours you&apos;re not getting back.</p>
            <p style="font-size:15px;line-height:1.7;color:#ccccdd;margin:0 0 32px;">I&apos;d love to show you exactly how Reamo handles your post-call admin in real time. 15 minutes, no pitch deck — just a live demo on your actual workflow.</p>
            <a href="https://reamo.ai/demo" style="display:inline-block;background:#00d4a0;color:#0a0a0f;font-family:Montserrat,Arial,sans-serif;font-weight:700;font-size:15px;padding:14px 32px;border-radius:8px;text-decoration:none;">Book a 15-Minute Demo →</a>
            <p style="margin:48px 0 0;font-size:12px;color:#333344;">Reamo · reamo.ai · You&apos;re receiving this because you used our free Admin Time Calculator.<br/><a href="https://reamo.ai/unsubscribe" style="color:#555566;">Unsubscribe</a></p>
          </div>
        </body></html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[calculator-lead] error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

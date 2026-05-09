import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const AGENCY_EMAIL = "dtvacationandtravel@gmail.com";
const FROM_EMAIL = process.env.EMAIL_FROM ?? "DT's Vacation <onboarding@resend.dev>";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not configured.");
  return new Resend(key);
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // ── 1. Save to Supabase ────────────────────────────────────────────────
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey) {
      const res = await fetch(`${supabaseUrl}/rest/v1/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({ email }),
      });

      // Ignore 409 (already subscribed) — treat as success
      if (!res.ok && res.status !== 409) {
        console.error("Supabase insert error:", res.status);
      }
    }

    // ── 2. Send thank-you email to subscriber ─────────────────────────────
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "🌴 Welcome to DT's Vacation & Travel — You're In!",
      html: subscriberWelcomeHtml(email),
    });

    // ── 3. Notify agency ──────────────────────────────────────────────────
    await getResend().emails.send({
      from: FROM_EMAIL,
      to: AGENCY_EMAIL,
      subject: `New Newsletter Subscriber: ${email}`,
      html: agencySubscriberNotifyHtml(email),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe API error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Email Templates
// ─────────────────────────────────────────────────────────────────────────────

function subscriberWelcomeHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to DT's Vacation & Travel</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.12);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#000C1C 0%,#002D62 60%,#003380 100%);padding:50px 40px 40px;text-align:center;">
            <p style="margin:0 0 8px;color:#D4A017;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;">DT's Vacation &amp; Travel Ltd.</p>
            <h1 style="margin:0 0 12px;color:#ffffff;font-size:32px;font-weight:800;letter-spacing:-0.5px;line-height:1.2;">You're on the List! 🌴</h1>
            <p style="margin:0;color:rgba(255,255,255,0.65);font-size:15px;line-height:1.6;">Welcome to your exclusive travel insider community.</p>
          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td style="background:#ffffff;padding:44px 40px 32px;">
            <p style="margin:0 0 20px;color:#1a2840;font-size:16px;line-height:1.7;">Thank you for subscribing with <strong>${email}</strong>! ✨</p>
            <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">As a member of our exclusive list, you'll be the first to hear about:</p>

            <!-- Benefits -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              ${[
                ["🏨","Premium Hotel Deals","Handpicked stays at 5-star resorts across Jamaica and beyond"],
                ["🚢","Exclusive Cruise Packages","Members-only pricing on luxury cruise voyages"],
                ["💍","Destination Weddings","Dreamy venues curated for unforgettable celebrations"],
                ["🌍","Tour Adventures","Immersive guided experiences from Dunn's River to the Sahara"],
              ].map(([icon, title, desc]) => `
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:44px;vertical-align:top;font-size:22px;">${icon}</td>
                    <td style="vertical-align:top;">
                      <p style="margin:0 0 2px;color:#000C1C;font-size:14px;font-weight:700;">${title}</p>
                      <p style="margin:0;color:#64748b;font-size:13px;">${desc}</p>
                    </td>
                  </tr></table>
                </td>
              </tr>`).join("")}
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr><td align="center">
                <a href="https://dt-s-vacation.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#D4A017,#f0b922);color:#000C1C;text-decoration:none;font-size:14px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;padding:16px 40px;border-radius:50px;">
                  Explore Our Packages ✈️
                </a>
              </td></tr>
            </table>

            <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.7;text-align:center;">
              You're receiving this because you subscribed at dts-vacation.vercel.app.<br/>
              <a href="mailto:dtvacationandtravel@gmail.com" style="color:#D4A017;">Contact us</a> anytime with questions.
            </p>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#000C1C;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 4px;color:#D4A017;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">DT's Vacation &amp; Travel Ltd.</p>
            <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">&copy; ${new Date().getFullYear()} All rights reserved.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function agencySubscriberNotifyHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Subscriber</title></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:#000C1C;padding:28px 32px;text-align:center;">
            <p style="margin:0;color:#D4A017;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;">Newsletter Notification</p>
            <h2 style="margin:8px 0 0;color:#fff;font-size:22px;">New Subscriber 📬</h2>
          </td>
        </tr>
        <tr>
          <td style="background:#fff;padding:32px;">
            <p style="margin:0 0 16px;color:#475569;font-size:15px;">A new person has joined your mailing list:</p>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin-bottom:16px;">
              <p style="margin:0;font-size:18px;font-weight:700;color:#000C1C;">📧 ${email}</p>
              <p style="margin:6px 0 0;font-size:12px;color:#94a3b8;">Subscribed on ${new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</p>
            </div>
            <p style="margin:0;color:#94a3b8;font-size:13px;">This subscriber has been automatically saved to your records.</p>
          </td>
        </tr>
        <tr>
          <td style="background:#000C1C;padding:16px 32px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">&copy; ${new Date().getFullYear()} DT's Vacation &amp; Travel Ltd.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

import nodemailer from "nodemailer";
import { Resend } from "resend";

export const AGENCY_EMAIL = "dtvacationandtravel@gmail.com";

interface SendMailParams {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, replyTo, subject, html }: SendMailParams): Promise<{ success: boolean; provider: string; error?: string }> {
  try {
    // 1. Check for Resend API Key (Priority 1: HTTPS Port 443, unaffected by cloud SMTP blocks)
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey && resendKey.trim() !== "") {
      try {
        const resend = new Resend(resendKey.trim());
        const fromEmail = process.env.EMAIL_FROM ?? "DT's Vacation <onboarding@resend.dev>";

        const { data, error } = await resend.emails.send({
          from: fromEmail,
          to,
          replyTo: replyTo ?? AGENCY_EMAIL,
          subject,
          html,
        });

        if (error) {
          console.error("Resend API error:", error.message || error);
        } else {
          console.log(`✓ Email sent via Resend to ${to} (ID: ${data?.id})`);
          return { success: true, provider: "resend" };
        }
      } catch (resendErr: any) {
        console.error("Resend dispatch exception:", resendErr?.message || resendErr);
      }
    }

    // 2. Fallback: Check for Direct Gmail / SMTP (Nodemailer)
    const gmailPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;
    const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER || AGENCY_EMAIL;

    if (gmailPassword && gmailPassword.trim() !== "") {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          connectionTimeout: 4000,
          greetingTimeout: 4000,
          socketTimeout: 4000,
          auth: {
            user: gmailUser,
            pass: gmailPassword.replace(/\s+/g, ""), // handle copy-pasted 4x4 spaces
          },
        });

        await transporter.sendMail({
          from: `"DT's Vacation & Travel Ltd." <${gmailUser}>`,
          to,
          replyTo: replyTo ?? gmailUser,
          subject,
          html,
        });

        return { success: true, provider: "gmail-smtp" };
      } catch (smtpErr: any) {
        console.error("Gmail SMTP dispatch failed:", smtpErr?.message || smtpErr);
      }
    }

    // 3. Dev / Preview fallback
    console.log(`ℹ️ [FALLBACK EMAIL DISPATCH] To: ${to} | Subject: ${subject}`);
    return { success: true, provider: "dev-console" };
  } catch (err: any) {
    console.error("sendEmail fatal error:", err?.message || err);
    return { success: false, provider: "failed", error: err?.message };
  }
}

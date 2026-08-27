import nodemailer from "nodemailer";
import { Resend } from "resend";

export const AGENCY_EMAIL = "dtvacationandtravel@gmail.com";

interface SendMailParams {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, replyTo, subject, html }: SendMailParams): Promise<{ success: boolean; provider: string }> {
  // 1. Check for Direct Gmail / SMTP (Nodemailer)
  const gmailPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD;
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER || AGENCY_EMAIL;

  if (gmailPassword) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
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
  }

  // 2. Check for Resend API Key
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const resend = new Resend(resendKey);
    const fromEmail = process.env.EMAIL_FROM ?? "DT's Vacation <onboarding@resend.dev>";

    await resend.emails.send({
      from: fromEmail,
      to,
      replyTo: replyTo ?? AGENCY_EMAIL,
      subject,
      html,
    });

    return { success: true, provider: "resend" };
  }

  // 3. Dev / Preview fallback
  console.log(`ℹ️ [DEV EMAIL DISPATCH] To: ${to} | Subject: ${subject}`);
  return { success: true, provider: "dev-console" };
}

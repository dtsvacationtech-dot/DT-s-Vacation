import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { sendEmail, AGENCY_EMAIL } from "@/lib/emailSender";
import { generateCustomerReplyHtml } from "@/lib/emailTemplates";
import { getPromotions, updateEnquiryStatus, getEnquiries } from "@/lib/db";

export async function POST(req: NextRequest) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { enquiryId, to, customerName, subject, messageBody, serviceType, promotionId, statusUpdate } = body;

    if (!to || !to.includes("@")) {
      return NextResponse.json({ error: "Valid recipient email is required." }, { status: 400 });
    }

    if (!messageBody || messageBody.trim() === "") {
      return NextResponse.json({ error: "Message body cannot be empty." }, { status: 400 });
    }

    // Lookup promotion if attached
    let attachedPromotion = null;
    if (promotionId) {
      const allPromos = await getPromotions();
      attachedPromotion = allPromos.find((p) => p.id === promotionId) || null;
    }

    const emailSubject = subject || `Regarding Your ${serviceType || "Travel"} Enquiry — DT's Vacation & Travel`;
    const html = generateCustomerReplyHtml({
      customerName: customerName || "Traveler",
      subject: emailSubject,
      messageBody,
      serviceType: serviceType || "Travel",
      attachedPromotion,
    });

    // Send email via configured provider (Gmail SMTP / Resend)
    const emailResult = await sendEmail({
      to,
      replyTo: AGENCY_EMAIL,
      subject: emailSubject,
      html,
    });

    if (!emailResult.success) {
      console.error("Reply dispatch error:", emailResult.error);
      return NextResponse.json({ error: "Failed to dispatch email: " + (emailResult.error || "Unknown error") }, { status: 500 });
    }

    // Update enquiry record status and timestamp
    if (enquiryId) {
      const now = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
      const enquiries = await getEnquiries();
      const existing = enquiries.find((e) => e.id === enquiryId);
      const existingNotes = existing?.notes ? `${existing.notes}\n` : "";
      const newNote = `${existingNotes}[${now}] Replied via Admin: "${emailSubject}"`;

      await updateEnquiryStatus(enquiryId, {
        status: statusUpdate || "contacted",
        repliedAt: new Date().toISOString(),
        notes: newNote,
      });
    }

    return NextResponse.json({
      success: true,
      provider: emailResult.provider,
      message: `Email reply successfully delivered to ${to}.`,
    });
  } catch (err: any) {
    console.error("Admin reply enquiry route error:", err);
    return NextResponse.json({ error: "Failed to send email. " + (err?.message || "") }, { status: 500 });
  }
}

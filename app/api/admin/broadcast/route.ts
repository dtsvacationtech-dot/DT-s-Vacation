import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { sendEmail, AGENCY_EMAIL } from "@/lib/emailSender";
import { generateBroadcastCampaignHtml } from "@/lib/emailTemplates";
import { getPromotions, getSubscribers, getEnquiries, saveBroadcastLog, getBroadcastLogs } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const logs = await getBroadcastLogs();
    return NextResponse.json({ success: true, logs });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to retrieve broadcast logs: " + (err?.message || "") }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      headline,
      previewText,
      editorialMessage = "",
      imageUrl,
      promotionId,
      targetAudience = "subscribers", // 'subscribers' | 'leads' | 'all' | 'category'
      serviceCategory,
      ctaText,
      ctaUrl,
      isTest = false,
      testEmail,
    } = body;

    if (!headline || headline.trim() === "") {
      return NextResponse.json({ error: "Campaign headline is required." }, { status: 400 });
    }

    // 1. Resolve Attached Promotion
    let promotion = null;
    if (promotionId) {
      const allPromos = await getPromotions();
      promotion = allPromos.find((p) => p.id === promotionId) || null;
    }

    // 2. Build HTML Template
    const html = generateBroadcastCampaignHtml({
      headline,
      previewText,
      editorialMessage,
      imageUrl,
      promotion,
      ctaText,
      ctaUrl,
    });

    // 3. Handle Test Send
    if (isTest) {
      const targetTestEmail = testEmail || AGENCY_EMAIL;
      const testResult = await sendEmail({
        to: targetTestEmail,
        replyTo: AGENCY_EMAIL,
        subject: `[TEST PREVIEW] ${headline}`,
        html,
      });

      return NextResponse.json({
        success: testResult.success,
        message: testResult.success
          ? `Test email successfully dispatched to ${targetTestEmail}.`
          : `Test dispatch error: ${testResult.error}`,
      });
    }

    // 4. Resolve Target Recipients List
    const recipientEmails = new Set<string>();

    if (targetAudience === "subscribers" || targetAudience === "all") {
      const subs = await getSubscribers();
      subs
        .filter((s) => s.status === "active" && s.email.includes("@"))
        .forEach((s) => recipientEmails.add(s.email.toLowerCase().trim()));
    }

    if (targetAudience === "leads" || targetAudience === "all") {
      const leads = await getEnquiries();
      leads
        .filter((l) => l.email && l.email.includes("@"))
        .forEach((l) => recipientEmails.add(l.email.toLowerCase().trim()));
    }

    if (targetAudience === "category" && serviceCategory) {
      const leads = await getEnquiries();
      leads
        .filter((l) => l.serviceType?.toLowerCase() === serviceCategory.toLowerCase() && l.email.includes("@"))
        .forEach((l) => recipientEmails.add(l.email.toLowerCase().trim()));
    }

    const emailList = Array.from(recipientEmails);

    if (emailList.length === 0) {
      return NextResponse.json({ error: "No recipients found for the selected audience." }, { status: 400 });
    }

    // 5. Batch Send (Chunks of 5 with 300ms delay)
    let successCount = 0;
    let failedCount = 0;
    const chunkSize = 5;

    for (let i = 0; i < emailList.length; i += chunkSize) {
      const chunk = emailList.slice(i, i + chunkSize);
      const results = await Promise.allSettled(
        chunk.map((to) =>
          sendEmail({
            to,
            replyTo: AGENCY_EMAIL,
            subject: headline,
            html,
          })
        )
      );

      for (const res of results) {
        if (res.status === "fulfilled" && res.value.success) {
          successCount++;
        } else {
          failedCount++;
        }
      }

      if (i + chunkSize < emailList.length) {
        await new Promise((res) => setTimeout(res, 300));
      }
    }

    // 6. Save Broadcast Log
    await saveBroadcastLog({
      subject: headline,
      targetAudience: targetAudience === "category" ? `Category: ${serviceCategory}` : targetAudience,
      recipientCount: emailList.length,
      successCount,
      failedCount,
      promotionId: promotion?.id,
      promotionTitle: promotion?.title,
    });

    return NextResponse.json({
      success: true,
      recipientCount: emailList.length,
      successCount,
      failedCount,
      message: `Broadcast completed: ${successCount} sent successfully (${failedCount} failed).`,
    });
  } catch (err: any) {
    console.error("Broadcast handler error:", err);
    return NextResponse.json({ error: "Broadcast failed. " + (err?.message || "") }, { status: 500 });
  }
}

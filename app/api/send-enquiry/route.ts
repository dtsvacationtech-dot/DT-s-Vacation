import { NextRequest, NextResponse } from "next/server";
import { sendEmail, AGENCY_EMAIL } from "@/lib/emailSender";
import { saveEnquiry } from "@/lib/db";

// ─── Type for all enquiry forms ───────────────────────────────────────────────
interface EnquiryPayload {
  // Common fields
  name?: string;          // GlobalEnquiryModal
  firstName?: string;     // Future booking forms
  lastName?: string;
  email: string;
  phone: string;
  serviceType?: string;   // Hotels | Cruises | Tours | Wedding | Corporate
  destination?: string;
  travelDateStart?: string;
  travelDateEnd?: string;
  guests?: number | string;
  message?: string;

  // Promotion-specific fields
  promotionId?: string;
  promotionTitle?: string;
  promoCode?: string;
  discountTag?: string;
  savingsEstimate?: string;
  badge?: string;

  // Cruise-specific
  adults?: number | string;
  children?: number | string;
  duration?: string;
  departurePort?: string;
  destinations?: string[];
  date?: string;
}

export async function POST(req: NextRequest) {
  try {
    let data: EnquiryPayload;
    try {
      data = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
    }

    if (!data.email?.includes("@")) {
      return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
    }

    // Extract promotion title if provided directly or parsed from message
    const promoTitle =
      data.promotionTitle ||
      (data.message?.match(/\[Promo:\s*([^\]]+)\]/i)?.[1]?.trim()) ||
      undefined;

    const enrichedData: EnquiryPayload = {
      ...data,
      promotionTitle: promoTitle,
    };

    // ── 1. Save to SQLite Database ────────────────
    try {
      await saveEnquiry({
        firstName: data.firstName ?? (data.name ? data.name.split(" ")[0] : ""),
        lastName: data.lastName ?? (data.name ? data.name.split(" ").slice(1).join(" ") : ""),
        name: data.name ?? `${data.firstName || ""} ${data.lastName || ""}`.trim(),
        email: data.email,
        phone: data.phone,
        serviceType: data.serviceType ?? "General",
        destination: data.destination ?? data.destinations?.join(", ") ?? "",
        travelDateStart: data.travelDateStart ?? data.date ?? null,
        travelDateEnd: data.travelDateEnd ?? null,
        adults: Number(data.adults ?? data.guests ?? 1),
        children: Number(data.children ?? 0),
        guests: Number(data.guests ?? data.adults ?? 1),
        duration: data.duration,
        departurePort: data.departurePort,
        message: data.message ?? "",
        promotionId: data.promotionId,
        promotionTitle: promoTitle,
        status: "new",
      });
    } catch (saveErr) {
      console.error("Enquiry storage save error (non-fatal):", saveErr);
    }

    // ── 2 & 3. Dispatch Emails (Direct Gmail SMTP or Resend) ───────────────
    const customerName = data.firstName ?? data.name ?? "Traveler";

    try {
      const agencySubject = promoTitle
        ? `🔥 [SPECIAL PROMO: ${promoTitle}] New Enquiry [${data.serviceType ?? "General"}] from ${customerName}`
        : `New Enquiry [${data.serviceType ?? "General"}] from ${customerName}`;

      const customerSubject = promoTitle
        ? `We've Received Your Promo Enquiry: ${promoTitle} — DT's Vacation & Travel`
        : "We've Received Your Enquiry — DT's Vacation & Travel";

      const [customerResult, agencyResult] = await Promise.allSettled([
        // Customer confirmation
        sendEmail({
          to: data.email,
          subject: customerSubject,
          html: customerConfirmationHtml(customerName, enrichedData),
        }),
        // Agency notification
        sendEmail({
          to: AGENCY_EMAIL,
          replyTo: data.email,
          subject: agencySubject,
          html: agencyEnquiryHtml(customerName, enrichedData),
        }),
      ]);

      if (customerResult.status === "rejected") {
        console.error("Customer email error:", customerResult.reason);
      }
      if (agencyResult.status === "rejected") {
        console.error("Agency email error:", agencyResult.reason);
      }
    } catch (emailErr) {
      console.error("Enquiry email dispatch error (non-fatal):", emailErr);
    }

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });
  } catch (err: any) {
    console.error("Send-enquiry API error:", err?.message || err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// Customer Confirmation Email
// ─────────────────────────────────────────────────────────────────────────────
function customerConfirmationHtml(name: string, data: EnquiryPayload): string {
  const service = data.serviceType ?? "Travel";
  const dateRange = data.travelDateStart
    ? `${data.travelDateStart}${data.travelDateEnd ? ` → ${data.travelDateEnd}` : ""}`
    : data.date ?? "Flexible";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Enquiry Confirmed</title></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.12);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#000C1C 0%,#002D62 55%,#003380 100%);padding:50px 40px 44px;text-align:center;">
            <p style="margin:0 0 20px;color:#D4A017;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;">DT's Vacation &amp; Travel Ltd.</p>
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 20px;">
              <tr>
                <td width="72" height="72" style="background:rgba(212,160,23,0.18);border-radius:50%;text-align:center;vertical-align:middle;">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:block;margin:0 auto;">
                    <circle cx="12" cy="12" r="12" fill="rgba(212,160,23,0.25)"/>
                    <path d="M6.5 12.5L10 16L17.5 8.5" stroke="#D4A017" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </td>
              </tr>
            </table>
            <h1 style="margin:0 0 10px;color:#ffffff;font-size:28px;font-weight:800;line-height:1.2;">Enquiry Received!</h1>
            <p style="margin:0;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.6;">We'll be in touch as soon as possible.</p>
          </td>
        </tr>


        <!-- GREETING -->
        <tr>
          <td style="background:#ffffff;padding:40px 40px 0;">
            <p style="margin:0 0 16px;color:#1a2840;font-size:16px;line-height:1.7;">Dear <strong>${name}</strong>,</p>
            <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.7;">
              Thank you for reaching out to us! We've successfully received your <strong>${service}</strong> enquiry and our specialist team will review your details and contact you as quickly as possible — typically within <strong>24–48 hours</strong>.
            </p>
          </td>
        </tr>

        <!-- ENQUIRY SUMMARY -->
        <tr>
          <td style="background:#ffffff;padding:0 40px 32px;">
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px 28px;">
              <p style="margin:0 0 16px;color:#000C1C;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">Your Enquiry Summary</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${data.promotionTitle ? `
                <tr>
                  <td colspan="2" style="padding:0 0 14px 0;border-bottom:1px solid #f1f5f9;">
                    <div style="background:#FFFBEB;border:1px solid #FCD34D;border-radius:12px;padding:12px 16px;">
                      <p style="margin:0 0 3px;color:#92400E;font-size:11px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;">🔥 Selected Special Promotion</p>
                      <p style="margin:0;color:#000C1C;font-size:15px;font-weight:800;">${data.promotionTitle}</p>
                      ${data.promoCode ? `<p style="margin:4px 0 0;color:#B45309;font-size:12px;font-family:monospace;font-weight:700;">Promo Code: <strong>${data.promoCode}</strong>${data.discountTag ? ` &bull; ${data.discountTag}` : ""}</p>` : ""}
                    </div>
                  </td>
                </tr>` : ""}
                ${buildSummaryRow("Service Type", service)}
                ${buildSummaryRow("Travel Dates", dateRange)}
                ${data.destination || data.destinations?.length ? buildSummaryRow("Destination", data.destination ?? data.destinations?.join(", ") ?? "") : ""}
                ${data.guests || data.adults ? buildSummaryRow("Travelers", formatTravelers(data)) : ""}
                ${data.duration ? buildSummaryRow("Duration", data.duration) : ""}
                ${data.departurePort ? buildSummaryRow("Departure Port", data.departurePort) : ""}
                ${data.message ? buildSummaryRow("Your Message", data.message) : ""}
              </table>
            </div>
          </td>
        </tr>

        <!-- WHAT'S NEXT -->
        <tr>
          <td style="background:#ffffff;padding:0 40px 40px;">
            <p style="margin:0 0 16px;color:#000C1C;font-size:14px;font-weight:700;">What happens next?</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${[
                ["1","Review","Our specialists review your travel preferences"],
                ["2","Get in Touch","We contact you via email or WhatsApp to finalize details"],
                ["3","Custom Proposal","We craft a personalized itinerary &amp; pricing for you"],
              ].map(([num, title, desc]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td style="width:36px;vertical-align:top;padding-top:2px;">
                      <div style="width:26px;height:26px;background:#000C1C;border-radius:50%;text-align:center;line-height:26px;color:#D4A017;font-size:12px;font-weight:800;">${num}</div>
                    </td>
                    <td style="vertical-align:top;padding-left:8px;">
                      <p style="margin:0 0 2px;color:#000C1C;font-size:14px;font-weight:700;">${title}</p>
                      <p style="margin:0;color:#64748b;font-size:13px;">${desc}</p>
                    </td>
                  </tr></table>
                </td>
              </tr>`).join("")}
            </table>
          </td>
        </tr>

        <!-- CONTACT -->
        <tr>
          <td style="background:#f8fafc;padding:28px 40px;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 12px;color:#64748b;font-size:14px;">Need immediate assistance?</p>
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:16px;">
                <a href="https://wa.me/18768569812" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 20px;border-radius:50px;">💬 WhatsApp Us</a>
              </td>
              <td>
                <a href="mailto:dtvacationandtravel@gmail.com" style="display:inline-block;background:#000C1C;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 20px;border-radius:50px;">✉️ Email Us</a>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#000C1C;padding:24px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:#D4A017;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">DT's Vacation &amp; Travel Ltd.</p>
            <p style="margin:0 0 4px;color:rgba(255,255,255,0.5);font-size:12px;">📞 +1 (876) 856-9812 &nbsp;|&nbsp; ✉️ dtvacationandtravel@gmail.com</p>
            <p style="margin:0;color:rgba(255,255,255,0.3);font-size:11px;">&copy; ${new Date().getFullYear()} All rights reserved. Jamaica.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Agency Notification Email — Full Details
// ─────────────────────────────────────────────────────────────────────────────
function agencyEnquiryHtml(name: string, data: EnquiryPayload): string {
  const service = data.serviceType ?? "General";
  const dateRange = data.travelDateStart
    ? `${data.travelDateStart}${data.travelDateEnd ? ` → ${data.travelDateEnd}` : ""}`
    : data.date ?? "Not specified";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>New Enquiry</title></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,0.12);">

        <!-- HEADER -->
        <tr>
          <td style="background:linear-gradient(135deg,#000C1C 0%,#002D62 100%);padding:36px 40px;text-align:center;">
            <p style="margin:0 0 6px;color:#D4A017;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;">
              ${data.promotionTitle ? "🔥 Special Promotion Lead" : "New Customer Enquiry"}
            </p>
            <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;">
              ${data.promotionTitle ? `🏷️ ${data.promotionTitle}` : `🗺️ ${service} Request`}
            </h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">${new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}</p>
          </td>
        </tr>

        <!-- SPECIAL PROMOTION CARD (IF APPLICABLE) -->
        ${data.promotionTitle ? `
        <tr>
          <td style="background:#fff;padding:32px 40px 0;">
            <div style="background:linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 100%);border:2px solid #D4A017;border-radius:16px;padding:22px 24px;box-shadow:0 4px 16px rgba(212,160,23,0.15);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-block;background:#D4A017;color:#000C1C;font-size:10px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;padding:4px 10px;border-radius:20px;margin-bottom:8px;">
                      🔥 Customer Interested in Special Promotion
                    </div>
                    <h2 style="margin:0 0 6px;color:#000C1C;font-size:20px;font-weight:800;line-height:1.3;">
                      ${data.promotionTitle}
                    </h2>
                    ${data.discountTag ? `<p style="margin:0 0 8px;color:#B45309;font-size:14px;font-weight:700;">🏷️ Offer: ${data.discountTag}</p>` : ""}
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:10px;border-top:1px dashed #F59E0B;padding-top:10px;">
                ${data.promoCode ? `
                <tr>
                  <td style="padding:4px 0;width:38%;color:#78350F;font-size:12px;font-weight:700;text-transform:uppercase;">Promo Code:</td>
                  <td style="padding:4px 0;color:#000C1C;font-size:13px;font-weight:800;font-family:monospace;">
                    <span style="background:#000C1C;color:#FDE68A;padding:3px 8px;border-radius:6px;">${data.promoCode}</span>
                  </td>
                </tr>` : ""}
                ${data.savingsEstimate ? `
                <tr>
                  <td style="padding:4px 0;width:38%;color:#78350F;font-size:12px;font-weight:700;text-transform:uppercase;">Savings / Estimate:</td>
                  <td style="padding:4px 0;color:#92400E;font-size:13px;font-weight:700;">${data.savingsEstimate}</td>
                </tr>` : ""}
                ${data.badge ? `
                <tr>
                  <td style="padding:4px 0;width:38%;color:#78350F;font-size:12px;font-weight:700;text-transform:uppercase;">Tier / Badge:</td>
                  <td style="padding:4px 0;color:#1E293B;font-size:13px;">${data.badge}</td>
                </tr>` : ""}
              </table>
            </div>
          </td>
        </tr>
        ` : ""}

        <!-- CUSTOMER INFO -->
        <tr>
          <td style="background:#fff;padding:32px 40px 24px;">
            <p style="margin:0 0 16px;color:#000C1C;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;border-bottom:2px solid #D4A017;padding-bottom:8px;">👤 Customer Information</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${buildSummaryRow("Name", name)}
              ${buildSummaryRow("Email", `<a href="mailto:${data.email}" style="color:#002D62;">${data.email}</a>`)}
              ${buildSummaryRow("Phone / WhatsApp", `<a href="https://wa.me/${data.phone?.replace(/\D/g,"")}" style="color:#25D366;">${data.phone}</a>`)}
            </table>
          </td>
        </tr>

        <!-- TRAVEL DETAILS -->
        <tr>
          <td style="background:#fff;padding:0 40px 24px;">
            <p style="margin:0 0 16px;color:#000C1C;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;border-bottom:2px solid #D4A017;padding-bottom:8px;">✈️ Travel Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${data.promotionTitle ? buildSummaryRow("Target Promotion", `<strong style="color:#D4A017;">${data.promotionTitle}</strong>`) : ""}
              ${buildSummaryRow("Service Type", `<strong style="color:#002D62;">${service}</strong>`)}
              ${buildSummaryRow("Travel Dates", dateRange)}
              ${data.destination || data.destinations?.length ? buildSummaryRow("Destination", data.destination ?? data.destinations?.join(", ") ?? "") : ""}
              ${data.guests || data.adults ? buildSummaryRow("Travelers", formatTravelers(data)) : ""}
              ${data.duration ? buildSummaryRow("Duration", data.duration) : ""}
              ${data.departurePort ? buildSummaryRow("Departure Port", data.departurePort) : ""}
            </table>
          </td>
        </tr>

        <!-- MESSAGE -->
        ${data.message ? `
        <tr>
          <td style="background:#fff;padding:0 40px 32px;">
            <p style="margin:0 0 12px;color:#000C1C;font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;border-bottom:2px solid #D4A017;padding-bottom:8px;">💬 Customer's Message</p>
            <div style="background:#f8fafc;border-left:4px solid #D4A017;border-radius:0 12px 12px 0;padding:16px 20px;">
              <p style="margin:0;color:#334155;font-size:14px;line-height:1.7;">${data.message}</p>
            </div>
          </td>
        </tr>` : ""}

        <!-- QUICK ACTIONS -->
        <tr>
          <td style="background:#f8fafc;padding:24px 40px;border-top:1px solid #e2e8f0;">
            <p style="margin:0 0 12px;color:#000C1C;font-size:13px;font-weight:700;">Reply to customer:</p>
            <table cellpadding="0" cellspacing="0"><tr>
              <td style="padding-right:12px;">
                <a href="mailto:${data.email}?subject=${encodeURIComponent(`Re: Your enquiry for ${data.promotionTitle || service} — DT's Vacation & Travel`)}" style="display:inline-block;background:#000C1C;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 20px;border-radius:50px;">✉️ Reply by Email</a>
              </td>
              <td>
                <a href="https://wa.me/${data.phone?.replace(/\D/g,"")}?text=${encodeURIComponent(
                  data.promotionTitle
                    ? `Hi ${name}, thank you for contacting DT's Vacation & Travel regarding the ${data.promotionTitle} promotion! Denis here, how can we assist you with your booking?`
                    : `Hi ${name}, thank you for contacting DT's Vacation & Travel! Denis here, how can we assist you?`
                )}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-size:13px;font-weight:700;padding:10px 20px;border-radius:50px;">💬 Reply on WhatsApp</a>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background:#000C1C;padding:16px 40px;text-align:center;">
            <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">&copy; ${new Date().getFullYear()} DT's Vacation &amp; Travel Ltd. — Internal Notification</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function buildSummaryRow(label: string, value: string): string {
  if (!value || value === "undefined" || value === "null") return "";
  return `
  <tr>
    <td style="padding:8px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;width:38%;">
      <span style="color:#94a3b8;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">${label}</span>
    </td>
    <td style="padding:8px 0 8px 12px;border-bottom:1px solid #f1f5f9;vertical-align:top;">
      <span style="color:#1e293b;font-size:14px;">${value}</span>
    </td>
  </tr>`;
}

function formatTravelers(data: EnquiryPayload): string {
  if (data.adults !== undefined) {
    const a = Number(data.adults);
    const c = Number(data.children ?? 0);
    return c > 0 ? `${a} Adult${a > 1 ? "s" : ""}, ${c} Child${c > 1 ? "ren" : ""}` : `${a} Adult${a > 1 ? "s" : ""}`;
  }
  return `${data.guests} Guest${Number(data.guests) > 1 ? "s" : ""}`;
}

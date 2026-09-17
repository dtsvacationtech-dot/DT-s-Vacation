import { ExtendedPromotion } from "./db";
import { formatDateDisplay } from "./dateUtils";

// --- Base Styles & Theme Tokens ---
const BRAND_PRIMARY = "#000C1C";
const BRAND_ACCENT = "#D4A017";
const BRAND_BLUE = "#002D62";
const AGENCY_NAME = "DT's Vacation & Travel Ltd.";
const AGENCY_PHONE = "+1 (876) 856-9812";
const AGENCY_WHATSAPP_LINK = "https://wa.me/18768569812";
const AGENCY_EMAIL = "dtvacationandtravel@gmail.com";
const WEBSITE_URL = "https://dt-s-vacation.vercel.app";

// --- 1. Customer Direct Reply Email Template ---
export interface ReplyEmailParams {
  customerName: string;
  subject: string;
  messageBody: string; // Markdown or paragraphs
  serviceType?: string;
  attachedPromotion?: ExtendedPromotion | null;
  agentName?: string;
}

export function generateCustomerReplyHtml({
  customerName,
  subject,
  messageBody,
  serviceType = "Travel",
  attachedPromotion,
  agentName = "Denis & DT's Vacation Travel Concierge",
}: ReplyEmailParams): string {
  // Convert newlines in messageBody to html paragraphs/breaks
  const formattedBody = messageBody
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.75;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 12px 40px rgba(0,12,28,0.08);border:1px solid #e2e8f0;">

          <!-- LUXURY HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_PRIMARY} 0%, ${BRAND_BLUE} 100%);padding:40px 36px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
                <tr>
                  <td style="background:rgba(212,160,23,0.15);border:1px solid rgba(212,160,23,0.4);border-radius:30px;padding:6px 18px;">
                    <span style="color:${BRAND_ACCENT};font-size:11px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">VIP Travel Concierge</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:800;letter-spacing:-0.5px;">${AGENCY_NAME}</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:13px;">Re: Your ${serviceType} Enquiry</p>
            </td>
          </tr>

          <!-- MAIN CONTENT BODY -->
          <tr>
            <td style="padding:36px 36px 24px;">
              <p style="margin:0 0 18px;color:${BRAND_PRIMARY};font-size:17px;font-weight:700;">
                Dear ${customerName || "Valued Traveler"},
              </p>

              <div style="margin-bottom:28px;">
                ${formattedBody}
              </div>

              <!-- ATTACHED PROMOTION (IF ANY) -->
              ${
                attachedPromotion
                  ? `
              <div style="margin:30px 0;background:linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);border:1px solid #cbd5e1;border-left:4px solid ${BRAND_ACCENT};border-radius:16px;padding:24px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <span style="background:${BRAND_PRIMARY};color:${BRAND_ACCENT};font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;padding:4px 10px;border-radius:20px;">
                        ${attachedPromotion.badge || "Featured Deal"}
                      </span>
                      <h3 style="margin:10px 0 6px;color:${BRAND_PRIMARY};font-size:18px;font-weight:800;">${attachedPromotion.title}</h3>
                      <p style="margin:0 0 12px;color:#64748b;font-size:13px;">${attachedPromotion.subtitle || attachedPromotion.description}</p>
                      ${
                        attachedPromotion.discountTag
                          ? `<p style="margin:0 0 14px;color:${BRAND_ACCENT};font-size:15px;font-weight:800;">🏷️ ${attachedPromotion.discountTag} ${attachedPromotion.promoCode ? `(Code: ${attachedPromotion.promoCode})` : ""}</p>`
                          : ""
                      }
                      <a href="${WEBSITE_URL}" style="display:inline-block;background:linear-gradient(135deg, ${BRAND_ACCENT}, #e5ab19);color:${BRAND_PRIMARY};text-decoration:none;font-size:12px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;padding:10px 22px;border-radius:30px;">
                        View Special Deal →
                      </a>
                    </td>
                  </tr>
                </table>
              </div>
              `
                  : ""
              }

              <!-- CALL TO ACTION BUTTONS -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:32px 0 20px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-right:12px;">
                          <a href="${AGENCY_WHATSAPP_LINK}?text=${encodeURIComponent(`Hi Denis, I'm following up on our email conversation regarding ${subject}`)}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:40px;box-shadow:0 4px 12px rgba(37,211,102,0.25);">
                            💬 Chat on WhatsApp
                          </a>
                        </td>
                        <td>
                          <a href="mailto:${AGENCY_EMAIL}" style="display:inline-block;background:${BRAND_PRIMARY};color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:12px 24px;border-radius:40px;">
                            ✉️ Reply to Email
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- AGENT SIGNATURE -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:30px;padding-top:24px;border-top:1px solid #e2e8f0;">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;color:${BRAND_PRIMARY};font-size:15px;font-weight:800;">${agentName}</p>
                    <p style="margin:0 0 2px;color:${BRAND_ACCENT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Luxury Travel Concierge Specialist</p>
                    <p style="margin:0;color:#64748b;font-size:13px;">${AGENCY_NAME} &bull; Jamaica & Global Destinations</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- LUXURY FOOTER -->
          <tr>
            <td style="background:${BRAND_PRIMARY};padding:24px 36px;text-align:center;">
              <p style="margin:0 0 6px;color:${BRAND_ACCENT};font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">${AGENCY_NAME}</p>
              <p style="margin:0 0 4px;color:rgba(255,255,255,0.6);font-size:12px;">📞 ${AGENCY_PHONE} &nbsp;|&nbsp; ✉️ ${AGENCY_EMAIL}</p>
              <p style="margin:0;color:rgba(255,255,255,0.3);font-size:11px;">&copy; ${new Date().getFullYear()} All rights reserved. Registered Jamaica Travel Agency.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// --- 2. Promotional Broadcast Campaign Template ---
export interface BroadcastEmailParams {
  headline: string;
  previewText?: string;
  editorialMessage: string;
  promotion?: ExtendedPromotion | null;
  ctaText?: string;
  ctaUrl?: string;
}

export function generateBroadcastCampaignHtml({
  headline,
  previewText,
  editorialMessage,
  promotion,
  ctaText = "Claim Special Offer Now",
  ctaUrl,
}: BroadcastEmailParams): string {
  const formattedEditorial = editorialMessage
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 16px;color:#334155;font-size:15px;line-height:1.75;">${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");

  const finalCtaUrl = ctaUrl || (promotion?.actionTarget && promotion.actionType === "link" ? promotion.actionTarget : AGENCY_WHATSAPP_LINK);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${headline}</title>
</head>
<body style="margin:0;padding:0;background-color:#0b1320;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <!-- PREHEADER -->
  <div style="display:none;font-size:1px;color:#0b1320;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
    ${previewText || headline}
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1320;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);">

          <!-- HERO BANNER -->
          <tr>
            <td style="background:linear-gradient(135deg, ${BRAND_PRIMARY} 0%, ${BRAND_BLUE} 60%, #001f4d 100%);padding:48px 40px 40px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
                <tr>
                  <td style="background:rgba(212,160,23,0.18);border:1px solid rgba(212,160,23,0.5);border-radius:50px;padding:6px 20px;">
                    <span style="color:${BRAND_ACCENT};font-size:11px;font-weight:800;letter-spacing:0.3em;text-transform:uppercase;">🌟 VIP Travel Insider Special</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:0 0 12px;color:#ffffff;font-size:28px;font-weight:800;line-height:1.25;letter-spacing:-0.5px;">${headline}</h1>
              <p style="margin:0;color:rgba(255,255,255,0.75);font-size:15px;line-height:1.6;">${AGENCY_NAME} &bull; Exclusive Member Offer</p>
            </td>
          </tr>

          <!-- PROMOTION FLYER CARD (IF PROMO SELECTED) -->
          ${
            promotion
              ? `
          <tr>
            <td style="background:#ffffff;padding:36px 40px 12px;">
              <div style="background:linear-gradient(135deg, #000c1c 0%, #0a1b33 100%);border-radius:20px;padding:28px 24px;border:1px solid rgba(212,160,23,0.3);box-shadow:0 10px 30px rgba(0,0,0,0.15);color:#ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:12px;">
                      <span style="background:${BRAND_ACCENT};color:${BRAND_PRIMARY};font-size:10px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;padding:4px 12px;border-radius:30px;">
                        ${promotion.badge || "Exclusive Deal"}
                      </span>
                    </td>
                    <td align="right" style="padding-bottom:12px;">
                      ${promotion.validUntil ? `<span style="color:rgba(255,255,255,0.6);font-size:11px;">Valid Until: ${formatDateDisplay(promotion.validUntil)}</span>` : ""}
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h2 style="margin:0 0 6px;color:#ffffff;font-size:22px;font-weight:800;">${promotion.title}</h2>
                      <p style="margin:0 0 16px;color:${BRAND_ACCENT};font-size:14px;font-weight:700;">${promotion.subtitle || ""}</p>
                      
                      ${
                        promotion.discountTag || promotion.promoCode
                          ? `
                      <div style="background:rgba(255,255,255,0.06);border:1px dashed rgba(212,160,23,0.5);border-radius:12px;padding:12px 16px;margin-bottom:18px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <span style="color:${BRAND_ACCENT};font-size:15px;font-weight:800;">🏷️ ${promotion.discountTag || "Special Discount"}</span>
                            </td>
                            ${promotion.promoCode ? `<td align="right"><span style="background:#ffffff;color:${BRAND_PRIMARY};font-family:monospace;font-size:12px;font-weight:800;padding:4px 10px;border-radius:6px;">PROMO: ${promotion.promoCode}</span></td>` : ""}
                          </tr>
                        </table>
                      </div>`
                          : ""
                      }

                      <p style="margin:0 0 18px;color:#cbd5e1;font-size:14px;line-height:1.65;">${promotion.description}</p>

                      ${
                        promotion.highlights && promotion.highlights.length > 0
                          ? `
                      <div style="margin-bottom:18px;">
                        <p style="margin:0 0 8px;color:${BRAND_ACCENT};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">What's Included:</p>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          ${promotion.highlights
                            .map(
                              (h) => `
                          <tr>
                            <td style="padding:4px 0;color:#e2e8f0;font-size:13px;">
                              <span style="color:${BRAND_ACCENT};font-weight:bold;margin-right:6px;">✓</span> ${h}
                            </td>
                          </tr>`
                            )
                            .join("")}
                        </table>
                      </div>`
                          : ""
                      }

                      ${
                        promotion.savingsEstimate
                          ? `
                      <p style="margin:0 0 18px;color:#38bdf8;font-size:13px;font-weight:700;">
                        💰 ${promotion.savingsEstimate}
                      </p>`
                          : ""
                      }
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>`
              : ""
          }

          <!-- EDITORIAL MESSAGE -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px 36px;">
              ${formattedEditorial ? `<div style="margin-bottom:28px;">${formattedEditorial}</div>` : ""}

              <!-- CTA BUTTON -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${finalCtaUrl}" style="display:inline-block;background:linear-gradient(135deg, ${BRAND_ACCENT} 0%, #f1b924 100%);color:${BRAND_PRIMARY};text-decoration:none;font-size:15px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;padding:18px 44px;border-radius:50px;box-shadow:0 8px 25px rgba(212,160,23,0.35);">
                      ${ctaText} ✈️
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- WHAT WE DO QUICK ICONS -->
          <tr>
            <td style="background:#f8fafc;padding:28px 40px;border-top:1px solid #e2e8f0;">
              <p style="margin:0 0 16px;text-align:center;color:#64748b;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">
                Our Bespoke Travel Specialties
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="font-size:12px;color:${BRAND_PRIMARY};font-weight:700;">🏨 Luxury Hotels</td>
                  <td align="center" style="font-size:12px;color:${BRAND_PRIMARY};font-weight:700;">🚢 Ocean Cruises</td>
                  <td align="center" style="font-size:12px;color:${BRAND_PRIMARY};font-weight:700;">💍 Destination Weddings</td>
                  <td align="center" style="font-size:12px;color:${BRAND_PRIMARY};font-weight:700;">🌴 Island Tours</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:${BRAND_PRIMARY};padding:28px 40px;text-align:center;">
              <p style="margin:0 0 6px;color:${BRAND_ACCENT};font-size:12px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">${AGENCY_NAME}</p>
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.6);font-size:12px;">📞 ${AGENCY_PHONE} &nbsp;|&nbsp; ✉️ ${AGENCY_EMAIL}</p>
              <p style="margin:0 0 12px;color:rgba(255,255,255,0.4);font-size:11px;">You are receiving this email because you are a subscriber or client of DT's Vacation & Travel Ltd.</p>
              <p style="margin:0;color:rgba(255,255,255,0.25);font-size:10px;">&copy; ${new Date().getFullYear()} All rights reserved. Montego Bay & Kingston, Jamaica.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

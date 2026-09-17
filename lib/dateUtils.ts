/**
 * Safe Date Utilities for DT's Vacation & Travel Ltd.
 * Timezone-safe formatting and ISO conversions for date inputs.
 */

/**
 * Converts a date string (e.g. "May 15, 2026", "2026-05-15") to "YYYY-MM-DD"
 * suitable for HTML5 <input type="date">.
 * Returns empty string for invalid, ongoing, or empty inputs.
 */
export function toISODateString(str?: string | null): string {
  if (!str) return "";
  const trimmed = str.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
  if (/ongoing/i.test(trimmed)) return "";
  if (!/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|\d{1,2}[\/\-\.])/i.test(trimmed)) {
    return "";
  }
  const d = new Date(trimmed);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Formats an ISO string (YYYY-MM-DD) or human date into a readable string like "May 15, 2026".
 * Parsing YYYY-MM-DD locally avoids negative UTC offset shifts (e.g. Kingston UTC-5).
 */
export function formatDateDisplay(dateStr?: string | null, fallback = "Ongoing Season"): string {
  if (!dateStr) return fallback;
  const trimmed = dateStr.trim();
  if (!trimmed) return fallback;
  if (/ongoing/i.test(trimmed)) return trimmed;
  if (/^[A-Za-z]+\s+\d{1,2},\s+\d{4}$/.test(trimmed)) return trimmed;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split("-").map(Number);
    const localD = new Date(y, m - 1, d);
    return localD.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  }

  const d = new Date(trimmed);
  if (isNaN(d.getTime())) return trimmed;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/**
 * Returns true if the expiry date has passed as of the end of that day.
 */
export function isDateExpired(dateStr?: string | null): boolean {
  if (!dateStr) return false;
  const trimmed = dateStr.trim();
  if (!trimmed || /ongoing/i.test(trimmed)) return false;

  let expiryDate: Date;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split("-").map(Number);
    // End of the day (23:59:59.999)
    expiryDate = new Date(y, m - 1, d, 23, 59, 59, 999);
  } else {
    expiryDate = new Date(trimmed);
    expiryDate.setHours(23, 59, 59, 999);
  }

  if (isNaN(expiryDate.getTime())) return false;
  return expiryDate.getTime() < Date.now();
}

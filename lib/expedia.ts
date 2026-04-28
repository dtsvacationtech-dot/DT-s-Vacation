// lib/expedia.ts
const TAAP_TRACKING_CODE = "WS92784";

export interface ExpediaSearchParams {
  destination: string;       // e.g. "Montego Bay, Jamaica"
  checkIn?: string;          // YYYY-MM-DD
  checkOut?: string;         // YYYY-MM-DD
  adults?: number;           // default 2
  children?: number;         // default 0
  rooms?: number;            // default 1
}

export function buildExpediaHotelUrl(params: ExpediaSearchParams): string {
  // Expedia TAAP deep-link format
  // Assuming 'affcid' is the correct parameter. This might need to be adjusted based on TAAP documentation.
  const base = "https://www.expedia.com/Hotel-Search";
  
  const queryObj: Record<string, string> = {
    destination: params.destination,
    adults: String(params.adults ?? 2),
    children: String(params.children ?? 0),
    rooms: String(params.rooms ?? 1),
    affcid: TAAP_TRACKING_CODE,
    utm_source: "dts-travel",
    utm_medium: "referral",
    utm_campaign: "hotel-search",
  };

  if (params.checkIn) queryObj.startDate = params.checkIn;
  if (params.checkOut) queryObj.endDate = params.checkOut;

  const query = new URLSearchParams(queryObj);
  
  return `${base}?${query.toString()}`;
}

// Pre-built URLs for curated collections (no dates — opens Expedia to browse)
export function buildExpediaCollectionUrl(destination: string): string {
  return buildExpediaHotelUrl({ destination });
}

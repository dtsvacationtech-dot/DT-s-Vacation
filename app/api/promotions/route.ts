import { NextResponse } from "next/server";
import { getActivePromotions } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

export async function GET() {
  try {
    const promotions = await getActivePromotions();
    return NextResponse.json(
      {
        success: true,
        promotions: Array.isArray(promotions) ? promotions : [],
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (err: any) {
    console.error("Public promotions fetch error:", err);
    return NextResponse.json(
      {
        success: false,
        promotions: [],
        error: "Failed to fetch promotions",
      },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}

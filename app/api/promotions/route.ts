import { NextResponse } from "next/server";
import { getActivePromotions } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const FAST_CACHE_HEADERS = {
  "Cache-Control": "public, max-age=15, stale-while-revalidate=60",
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const isForceBust = searchParams.has("_t");
    const headers = isForceBust ? NO_CACHE_HEADERS : FAST_CACHE_HEADERS;

    const promotions = await getActivePromotions();
    return NextResponse.json(
      {
        success: true,
        promotions: Array.isArray(promotions) ? promotions : [],
      },
      { headers }
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

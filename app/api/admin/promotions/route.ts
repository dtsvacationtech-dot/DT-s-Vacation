import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { getPromotions, savePromotion, deletePromotion, togglePromotion } from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

// Guard helper
function requireAuth(req: NextRequest) {
  return getAdminSessionFromRequest(req);
}

function triggerRevalidations() {
  try {
    revalidatePath("/api/promotions");
    revalidatePath("/");
    revalidatePath("/corporate");
    revalidatePath("/hotels");
    revalidatePath("/cruises");
    revalidatePath("/tours");
    revalidatePath("/weddings");
  } catch (err) {
    console.error("Revalidation error:", err);
  }
}

// GET: Fetch all promotions
export async function GET(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const promotions = await getPromotions();
    return NextResponse.json({ success: true, promotions }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    console.error("Fetch promotions error:", err);
    return NextResponse.json({ error: "Failed to fetch promotions" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// POST: Create promotion
export async function POST(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const body = await req.json();
    if (!body.title || body.title.trim() === "") {
      return NextResponse.json({ error: "Promotion title is required." }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    const saved = await savePromotion(body);
    triggerRevalidations();
    return NextResponse.json({ success: true, promotion: saved }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    console.error("Create promotion error:", err);
    return NextResponse.json({ error: "Failed to create promotion" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// PUT: Update or toggle promotion
export async function PUT(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Promotion ID is required." }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    // Check if it's a quick toggle action
    if (body.action === "toggle" && typeof body.active === "boolean") {
      const updated = await togglePromotion(body.id, body.active);
      triggerRevalidations();
      return NextResponse.json({ success: true, promotion: updated }, { headers: NO_CACHE_HEADERS });
    }

    const updated = await savePromotion(body);
    triggerRevalidations();
    return NextResponse.json({ success: true, promotion: updated }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    console.error("Update promotion error:", err);
    return NextResponse.json({ error: "Failed to update promotion" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

// DELETE: Delete promotion
export async function DELETE(req: NextRequest) {
  if (!requireAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: NO_CACHE_HEADERS });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Promotion ID is required." }, { status: 400, headers: NO_CACHE_HEADERS });
    }

    const deleted = await deletePromotion(id);
    triggerRevalidations();
    return NextResponse.json({ success: true, deleted }, { headers: NO_CACHE_HEADERS });
  } catch (err: any) {
    console.error("Delete promotion error:", err);
    return NextResponse.json({ error: "Failed to delete promotion" }, { status: 500, headers: NO_CACHE_HEADERS });
  }
}

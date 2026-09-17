import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { getSubscribers, deleteSubscriber } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscribers = await getSubscribers();
    return NextResponse.json({ success: true, subscribers });
  } catch (err: any) {
    console.error("Fetch subscribers error:", err);
    return NextResponse.json({ error: "Failed to fetch subscribers." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Subscriber ID is required." }, { status: 400 });
    }

    const deleted = await deleteSubscriber(id);
    return NextResponse.json({ success: true, deleted });
  } catch (err: any) {
    console.error("Delete subscriber error:", err);
    return NextResponse.json({ error: "Failed to delete subscriber." }, { status: 500 });
  }
}

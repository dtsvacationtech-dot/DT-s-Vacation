import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { getEnquiries, updateEnquiryStatus, deleteEnquiry } from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const enquiries = await getEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (err: any) {
    console.error("Fetch enquiries error:", err);
    return NextResponse.json({ error: "Failed to fetch enquiries." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!getAdminSessionFromRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes, repliedAt } = body;

    if (!id) {
      return NextResponse.json({ error: "Enquiry ID is required." }, { status: 400 });
    }

    const updated = await updateEnquiryStatus(id, { status, notes, repliedAt });
    if (!updated) {
      return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (err: any) {
    console.error("Update enquiry error:", err);
    return NextResponse.json({ error: "Failed to update enquiry." }, { status: 500 });
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
      return NextResponse.json({ error: "Enquiry ID is required." }, { status: 400 });
    }

    const deleted = await deleteEnquiry(id);
    return NextResponse.json({ success: true, deleted });
  } catch (err: any) {
    console.error("Delete enquiry error:", err);
    return NextResponse.json({ error: "Failed to delete enquiry." }, { status: 500 });
  }
}

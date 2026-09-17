import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import { getSecurityLogs } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const auditLogs = await getSecurityLogs();
    return NextResponse.json({ success: true, auditLogs });
  } catch (err: any) {
    console.error("Fetch security audit logs error:", err);
    return NextResponse.json({ error: "Failed to fetch audit logs." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest, verifyPassword, hashPassword, getClientIp } from "@/lib/auth";
import { getAdminPasswordHash, setAdminPasswordHash, recordSecurityAudit } from "@/lib/db";

export async function POST(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const clientIp = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
    }

    const currentHash = await getAdminPasswordHash();
    if (!verifyPassword(currentPassword, currentHash)) {
      return NextResponse.json({ error: "Incorrect current password." }, { status: 400 });
    }

    const newHash = hashPassword(newPassword);
    await setAdminPasswordHash(newHash);
    await recordSecurityAudit("password_change", clientIp, session.username, userAgent);

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (err: any) {
    console.error("Change password error:", err);
    return NextResponse.json({ error: "Failed to update password." }, { status: 500 });
  }
}

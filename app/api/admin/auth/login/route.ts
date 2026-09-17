import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  recordFailedAttempt,
  recordSuccessfulLogin,
  verifyPassword,
  createSessionToken,
  getClientIp,
  DEFAULT_ADMIN_USERNAME,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/auth";
import { getAdminPasswordHash, recordSecurityAudit } from "@/lib/db";

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);
  const userAgent = req.headers.get("user-agent") || "unknown";

  try {
    // 1. Check Rate Limit & Lockout
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      await recordSecurityAudit("lockout", clientIp, undefined, userAgent);
      return NextResponse.json(
        {
          error: `Security Lockout Active. Too many failed attempts. Please wait ${rateLimit.remainingSeconds} seconds.`,
          remainingSeconds: rateLimit.remainingSeconds,
          isLocked: true,
          attemptsLeft: 0,
        },
        { status: 429 }
      );
    }

    // 2. Parse payload
    let body: { username?: string; password?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request format." }, { status: 400 });
    }

    const { username = "", password = "" } = body;
    const cleanUsername = username.trim();

    if (!cleanUsername || !password) {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    // 3. Verify Username and Password
    const storedHash = await getAdminPasswordHash();
    const isUsernameMatch = cleanUsername.toLowerCase() === DEFAULT_ADMIN_USERNAME.toLowerCase();
    const isPasswordMatch = isUsernameMatch && verifyPassword(password, storedHash);

    if (!isPasswordMatch) {
      const failInfo = recordFailedAttempt(clientIp);
      await recordSecurityAudit("login_failed", clientIp, cleanUsername, userAgent);

      // Apply exponential throttling delay if needed
      if (failInfo.delayMs > 0) {
        await new Promise((res) => setTimeout(res, failInfo.delayMs));
      }

      if (failInfo.isLocked) {
        await recordSecurityAudit("lockout", clientIp, cleanUsername, userAgent);
        return NextResponse.json(
          {
            error: `Maximum login attempts exceeded. Your IP is locked for ${failInfo.remainingSeconds} seconds.`,
            remainingSeconds: failInfo.remainingSeconds,
            isLocked: true,
            attemptsLeft: 0,
          },
          { status: 429 }
        );
      }

      return NextResponse.json(
        {
          error: `Invalid username or password. ${failInfo.attemptsLeft} attempt${failInfo.attemptsLeft === 1 ? "" : "s"} remaining before lockout.`,
          attemptsLeft: failInfo.attemptsLeft,
          isLocked: false,
        },
        { status: 401 }
      );
    }

    // 4. Success — Reset failed count & Create Session
    recordSuccessfulLogin(clientIp);
    await recordSecurityAudit("login_success", clientIp, cleanUsername, userAgent);

    const token = createSessionToken(cleanUsername);
    const isProduction = process.env.NODE_ENV === "production";

    const response = NextResponse.json({
      success: true,
      user: { username: cleanUsername, role: "admin" },
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (err: any) {
    console.error("Admin Login Error:", err);
    return NextResponse.json({ error: "Authentication system error. Please try again." }, { status: 500 });
  }
}

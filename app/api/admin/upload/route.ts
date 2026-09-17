import { NextRequest, NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/auth";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const session = getAdminSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    // Validate mime type
    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/svg+xml"];
    if (!validMimes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image." }, { status: 400 });
    }

    // Size limit: 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 10MB limit." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize extension and name
    const originalExt = path.extname(file.name) || ".webp";
    const cleanBaseName = path
      .basename(file.name, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "_")
      .substring(0, 30);
    const uniqueFileName = `promo_${Date.now()}_${cleanBaseName}${originalExt}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);

    const backendUrl = process.env.PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL || "https://67-205-178-226.sslip.io";
    const publicUrl = `${backendUrl}/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: uniqueFileName,
      size: file.size,
    });
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json({ error: "Failed to upload image. " + (err?.message || "") }, { status: 500 });
  }
}

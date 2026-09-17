import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ...(process.env.OUTPUT_EXPORT === "true" ? { output: "export", trailingSlash: true } : { output: "standalone" }),
  serverExternalPackages: ["nodemailer", "better-sqlite3"],
  // Standalone mode is configured for self-hosted deployment on Digital Gateway / VPS / Docker
  images: {
    unoptimized: true,
    qualities: [85],
  },
};

export default nextConfig;

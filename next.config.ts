import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: 'output: export' has been REMOVED intentionally.
  // This project deploys to Vercel and uses API Routes for:
  //   - Newsletter subscriptions (Supabase)
  //   - Customer enquiry emails (Resend)
  // Static export mode disables API routes entirely. Do NOT add it back.
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [85],
  },
};

export default nextConfig;

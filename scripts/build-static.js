const { execSync } = require("child_process");
const fs = require("fs");

console.log("=== 1. Starting Static Site Export for App Platform ===");

const hasApi = fs.existsSync("app/api");
if (hasApi) {
  console.log("Stashing app/api outside build tree...");
  fs.renameSync("app/api", "api_backend_stash");
}

try {
  process.env.OUTPUT_EXPORT = "true";
  process.env.NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://67-205-178-226.sslip.io";
  console.log("API Target:", process.env.NEXT_PUBLIC_API_URL);

  execSync("npx next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      OUTPUT_EXPORT: "true",
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://67-205-178-226.sslip.io"
    }
  });
  console.log("=== 2. Static export successfully generated in /out directory! ===");
} catch (err) {
  console.error("Build failed:", err);
  process.exit(1);
} finally {
  if (hasApi && fs.existsSync("api_backend_stash")) {
    fs.renameSync("api_backend_stash", "app/api");
    console.log("Restored app/api to source tree.");
  }
}

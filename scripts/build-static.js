const { execSync } = require("child_process");
const fs = require("fs");

console.log("=== 1. Starting Static Site Export for App Platform ===");

function cleanGeneratedFromPublic() {
  const generatedDirs = [
    "public/_next",
    "public/_not-found",
    "public/404",
    "public/about",
    "public/admin",
    "public/contact",
    "public/corporate",
    "public/cruises",
    "public/hotels",
    "public/privacy",
    "public/terms",
    "public/tours",
    "public/weddings",
  ];
  for (const dir of generatedDirs) {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  }
  if (fs.existsSync("public")) {
    const files = fs.readdirSync("public");
    for (const file of files) {
      if (file.endsWith(".html") || file.endsWith(".txt")) {
        fs.rmSync(`public/${file}`, { force: true });
      }
    }
  }
}

cleanGeneratedFromPublic();

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
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
  });

  console.log("=== 2. Static export successfully generated in /out directory! ===");

  // Copy build to public and dist so App Platform works regardless of Output Directory setting (out, public, or dist)
  console.log("Populating public and dist directories for App Platform compatibility...");
  fs.cpSync("out", "public", { recursive: true });
  fs.cpSync("out", "dist", { recursive: true });
  console.log("=== 3. Static deployment package ready for all output directory configurations! ===");
} catch (err) {
  console.error("Build failed:", err);
  process.exit(1);
} finally {
  if (hasApi && fs.existsSync("api_backend_stash")) {
    fs.renameSync("api_backend_stash", "app/api");
    console.log("Restored app/api to source tree.");
  }
}

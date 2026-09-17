const { execSync } = require("child_process");

const isBackend = process.env.IS_BACKEND_SERVER === "true";

if (isBackend) {
  console.log("=== Building Standalone Server for Droplet ===");
  execSync("npx next build", { stdio: "inherit" });
} else {
  console.log("=== Building Static Export for App Platform ===");
  require("./build-static.js");
}

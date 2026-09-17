"use client";

import { useEffect } from "react";

function isExtensionError(text?: string | null): boolean {
  if (!text) return false;
  const t = String(text).toLowerCase();
  return (
    t.includes("chrome-extension://") ||
    t.includes("moz-extension://") ||
    t.includes("safari-extension://") ||
    t.includes("inpage.js") ||
    t.includes("nkbihfbeogaeaoehlefnkodbefgpgknn") ||
    t.includes("metamask") ||
    t.includes("failed to connect to metamask") ||
    t.includes("metamask extension not found") ||
    t.includes("ethereum") ||
    t.includes("solana") ||
    t.includes("phantom") ||
    t.includes("coinbase")
  );
}

// Run immediately upon module load if in browser
if (typeof window !== "undefined") {
  const origError = console.error;
  console.error = (...args: any[]) => {
    const fullText = args
      .map((a) => {
        try {
          return typeof a === "object" ? JSON.stringify(a) : String(a);
        } catch {
          return String(a);
        }
      })
      .join(" ");

    if (isExtensionError(fullText)) {
      return;
    }
    return origError.apply(console, args);
  };
}

export default function ExtensionErrorSuppressor() {
  useEffect(() => {
    const handleWindowError = (event: ErrorEvent) => {
      const combined = `${event.message || ""} ${event.filename || ""} ${event.error?.stack || ""}`;
      if (isExtensionError(combined)) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg = typeof reason === "string" ? reason : reason?.message || "";
      const stack = reason?.stack || "";
      const combined = `${msg} ${stack}`;
      if (isExtensionError(combined)) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    window.addEventListener("error", handleWindowError, true);
    window.addEventListener("unhandledrejection", handleUnhandledRejection, true);

    return () => {
      window.removeEventListener("error", handleWindowError, true);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection, true);
    };
  }, []);

  return null;
}

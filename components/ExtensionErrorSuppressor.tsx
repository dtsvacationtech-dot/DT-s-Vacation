"use client";

import { useEffect } from "react";

export default function ExtensionErrorSuppressor() {
  useEffect(() => {
    const isExtensionError = (msg?: string, filename?: string, stack?: string) => {
      const text = `${msg || ""} ${filename || ""} ${stack || ""}`.toLowerCase();
      return (
        text.includes("chrome-extension://") ||
        text.includes("moz-extension://") ||
        text.includes("metamask") ||
        text.includes("inpage.js") ||
        text.includes("failed to connect to metamask")
      );
    };

    const handleWindowError = (event: ErrorEvent) => {
      if (
        isExtensionError(
          event.message,
          event.filename,
          event.error?.stack
        )
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const msg = typeof reason === "string" ? reason : reason?.message || "";
      const stack = reason?.stack || "";
      if (isExtensionError(msg, "", stack)) {
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

// Dual-Redundancy Backend Resolver (Primary Domain + Direct Droplet SSL Fallback)
export const PRIMARY_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.dtvacationandtravel.com";
export const FALLBACK_API_URL = "https://67-205-178-226.sslip.io";

export const API_BASE_URL = PRIMARY_API_URL;

const ACTIVE_BACKEND_STORAGE_KEY = "dts_active_backend";
let memoryActiveBaseUrl: string | null = null;

function isLocalOrDropletHost(): boolean {
  if (typeof window === "undefined") return false;
  const hostname = window.location.hostname;
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local") ||
    hostname.startsWith("api.") ||
    hostname.includes("sslip.io") ||
    hostname === "67.205.178.226"
  );
}

export function getActiveBackendUrl(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || PRIMARY_API_URL;
  }
  if (memoryActiveBaseUrl !== null) return memoryActiveBaseUrl;

  const hostname = window.location.hostname;
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local");

  // In local development, use relative path ""
  if (isLocalhost) {
    memoryActiveBaseUrl = "";
    return "";
  }

  // If accessed directly on droplet backend domain / IP
  if (hostname.startsWith("api.") || hostname.includes("sslip.io") || hostname === "67.205.178.226") {
    memoryActiveBaseUrl = "";
    return "";
  }

  // Running on static frontend (e.g. www.dtvacationandtravel.com, vercel.app):
  // Check sessionStorage for last working remote backend (must NOT be "")
  try {
    const saved = sessionStorage.getItem(ACTIVE_BACKEND_STORAGE_KEY);
    if (saved && (saved === PRIMARY_API_URL || saved === FALLBACK_API_URL)) {
      memoryActiveBaseUrl = saved;
      return saved;
    }
    // Clean bad saved value if it was set to ""
    if (saved === "") {
      sessionStorage.removeItem(ACTIVE_BACKEND_STORAGE_KEY);
    }
  } catch {}

  // Explicit env var if set and non-empty
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim() !== "") {
    memoryActiveBaseUrl = process.env.NEXT_PUBLIC_API_URL.trim();
    return memoryActiveBaseUrl;
  }

  // Default for production frontend
  memoryActiveBaseUrl = PRIMARY_API_URL;
  return PRIMARY_API_URL;
}

export function setActiveBackendUrl(url: string): void {
  // Never save empty string as active backend if we are on a static frontend
  if (!url || url === "") {
    if (!isLocalOrDropletHost()) {
      url = PRIMARY_API_URL;
    }
  }
  memoryActiveBaseUrl = url;
  if (typeof window !== "undefined") {
    try {
      if (url) {
        sessionStorage.setItem(ACTIVE_BACKEND_STORAGE_KEY, url);
      } else {
        sessionStorage.removeItem(ACTIVE_BACKEND_STORAGE_KEY);
      }
    } catch {}
  }
}

export function getApiUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path : "/" + path;

  if (typeof window !== "undefined") {
    const base = getActiveBackendUrl();
    return base ? `${base}${cleanPath}` : cleanPath;
  }
  return cleanPath;
}

export const ADMIN_TOKEN_KEY = "dts_admin_token";

export function getAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || sessionStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  } catch {}
}

export function clearAdminToken(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  } catch {}
}

export function getAuthHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
  const headers: Record<string, string> = { ...extraHeaders };
  const token = getAdminToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Resilient fetch with automatic failover between primary domain and direct droplet SSL.
 * Automatically handles DNS propagation lag (NXDOMAIN) or network timeouts.
 */
export async function apiFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const isAbsolute = path.startsWith("http://") || path.startsWith("https://");
  const cleanPath = isAbsolute ? "" : path.startsWith("/") ? path : "/" + path;

  const currentBase = getActiveBackendUrl();
  const primaryUrl = isAbsolute ? path : (currentBase ? `${currentBase}${cleanPath}` : cleanPath);

  // If in browser and calling relative same-origin endpoint (currentBase === "")
  if (typeof window !== "undefined" && !isAbsolute && !currentBase) {
    return await fetch(cleanPath, options);
  }

  // If in browser and calling remote backend with potential failover
  if (typeof window !== "undefined" && !isAbsolute && currentBase) {
    const isMutation = options.method === "POST" || options.method === "PUT" || options.method === "DELETE";
    const timeoutMs = isMutation ? 15000 : 8000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(primaryUrl, {
        ...options,
        signal: options.signal || controller.signal,
      });
      clearTimeout(timeoutId);
      return res;
    } catch (primaryErr) {
      clearTimeout(timeoutId);
      const alternateBase = currentBase === PRIMARY_API_URL ? FALLBACK_API_URL : PRIMARY_API_URL;
      const fallbackUrl = `${alternateBase}${cleanPath}`;
      console.warn(`[API] Fast failover from ${primaryUrl} to ${fallbackUrl}...`);

      try {
        const fallbackRes = await fetch(fallbackUrl, {
          ...options,
        });
        setActiveBackendUrl(alternateBase);
        console.info(`[API] Failover successful! Active backend set to: ${alternateBase}`);
        return fallbackRes;
      } catch (fallbackErr) {
        console.error(`[API] Both primary and fallback endpoints failed:`, fallbackErr);
        // Only attempt same-origin if running on an environment where same-origin handles API
        if (isLocalOrDropletHost()) {
          console.warn(`[API] Local/droplet host fallback to same-origin: ${cleanPath}`);
          return await fetch(cleanPath, options);
        }
        throw primaryErr;
      }
    }
  }

  return await fetch(primaryUrl, options);
}

/**
 * Authenticated fetch that automatically attaches Bearer token & includes credentials
 */
export async function adminFetch(path: string, options: RequestInit = {}): Promise<Response> {
  const authHeaders = getAuthHeaders();
  let mergedHeaders: Record<string, string> = { ...authHeaders };

  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        mergedHeaders[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      for (const [key, value] of options.headers) {
        mergedHeaders[key] = value;
      }
    } else {
      mergedHeaders = { ...mergedHeaders, ...(options.headers as Record<string, string>) };
    }
  }

  return apiFetch(path, {
    ...options,
    credentials: "include",
    headers: mergedHeaders,
  });
}


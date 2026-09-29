// Dual-Redundancy Backend Resolver (Primary Domain + Direct Droplet SSL Fallback)
export const PRIMARY_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.dtvacationandtravel.com";
export const FALLBACK_API_URL = "https://67-205-178-226.sslip.io";

export const API_BASE_URL = PRIMARY_API_URL;

const ACTIVE_BACKEND_STORAGE_KEY = "dts_active_backend";
let memoryActiveBaseUrl: string | null = null;

export function getActiveBackendUrl(): string {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL || "";
  }
  if (memoryActiveBaseUrl !== null) return memoryActiveBaseUrl;

  const hostname = window.location.hostname;
  const isLocalhost =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local");

  // In local development or standalone same-origin deployment, default to relative path ""
  if (isLocalhost) {
    memoryActiveBaseUrl = "";
    return "";
  }

  // If explicit NEXT_PUBLIC_API_URL is provided, prioritize it
  if (process.env.NEXT_PUBLIC_API_URL) {
    memoryActiveBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    return process.env.NEXT_PUBLIC_API_URL;
  }

  try {
    const saved = sessionStorage.getItem(ACTIVE_BACKEND_STORAGE_KEY);
    if (saved !== null && (saved === PRIMARY_API_URL || saved === FALLBACK_API_URL || saved === "")) {
      memoryActiveBaseUrl = saved;
      return saved;
    }
  } catch {}

  // If running on the production domain or VPS (co-located Next.js fullstack standalone server),
  // same-origin relative calls avoid CORS and DNS failures.
  if (hostname && !hostname.startsWith("api.")) {
    memoryActiveBaseUrl = "";
    return "";
  }

  memoryActiveBaseUrl = PRIMARY_API_URL;
  return PRIMARY_API_URL;
}

export function setActiveBackendUrl(url: string): void {
  memoryActiveBaseUrl = url;
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(ACTIVE_BACKEND_STORAGE_KEY, url);
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

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
        const fallbackRes = await fetch(fallbackUrl, options);
        setActiveBackendUrl(alternateBase);
        console.info(`[API] Failover successful! Active backend set to: ${alternateBase}`);
        return fallbackRes;
      } catch {
        // Fallback to local same-origin as final safeguard
        console.warn(`[API] Remote endpoints failed, falling back to same-origin: ${cleanPath}`);
        try {
          const sameOriginRes = await fetch(cleanPath, options);
          setActiveBackendUrl("");
          return sameOriginRes;
        } catch {
          console.warn(`[API] All endpoints failed for ${path}`);
          throw primaryErr;
        }
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


// Dual-Redundancy Backend Resolver (Primary Domain + Direct Droplet SSL Fallback)
export const PRIMARY_API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.dtvacationandtravel.com";
export const FALLBACK_API_URL = "https://67-205-178-226.sslip.io";

export const API_BASE_URL = PRIMARY_API_URL;

const ACTIVE_BACKEND_STORAGE_KEY = "dts_active_backend";
let memoryActiveBaseUrl: string | null = null;

export function getActiveBackendUrl(): string {
  if (typeof window === "undefined") return PRIMARY_API_URL;
  if (memoryActiveBaseUrl) return memoryActiveBaseUrl;

  try {
    const saved = sessionStorage.getItem(ACTIVE_BACKEND_STORAGE_KEY);
    if (saved && (saved === PRIMARY_API_URL || saved === FALLBACK_API_URL)) {
      memoryActiveBaseUrl = saved;
      return saved;
    }
  } catch {}

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
    return `${base}${cleanPath}`;
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
  const primaryUrl = isAbsolute ? path : `${currentBase}${cleanPath}`;

  try {
    const res = await fetch(primaryUrl, options);
    return res;
  } catch (primaryErr) {
    // If running in browser and URL is relative to backend, try failover
    if (typeof window !== "undefined" && !isAbsolute) {
      const alternateBase = currentBase === PRIMARY_API_URL ? FALLBACK_API_URL : PRIMARY_API_URL;
      const fallbackUrl = `${alternateBase}${cleanPath}`;
      console.warn(`[API] Connection to ${primaryUrl} failed. Trying failover to ${fallbackUrl}...`);

      try {
        const fallbackRes = await fetch(fallbackUrl, options);
        // Fallback succeeded! Remember this backend for subsequent calls
        setActiveBackendUrl(alternateBase);
        console.info(`[API] Failover successful! Active backend set to: ${alternateBase}`);
        return fallbackRes;
      } catch (fallbackErr) {
        console.error(`[API] Both primary and fallback endpoints failed.`, fallbackErr);
        throw primaryErr;
      }
    }
    throw primaryErr;
  }
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


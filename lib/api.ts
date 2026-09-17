// API Target Resolver for Static Frontend <-> Droplet Backend
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://67-205-178-226.sslip.io";

export function getApiUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const cleanPath = path.startsWith("/") ? path : "/" + path;
  
  // When running in client browser, point to Droplet backend
  if (typeof window !== "undefined" && API_BASE_URL) {
    return `${API_BASE_URL}${cleanPath}`;
  }
  return cleanPath;
}

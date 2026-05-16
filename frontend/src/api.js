const rawBase = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
const base = rawBase.replace(/\/$/, "");

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!base) return p;
  return `${base}${p}`;
}

export function mediaUrl(relativePath) {
  if (!relativePath) return "";
  const p = String(relativePath).replace(/^\/+/, "");
  return apiUrl(`/${p}`);
}

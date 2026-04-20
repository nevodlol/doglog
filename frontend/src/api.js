/**
 * База для API в браузере.
 * Пустой VITE_API_BASE_URL (по умолчанию) — относительные пути /dogs/..., /uploads/...
 * (на проде за тем же доменом через reverse proxy или при dev — Vite proxy).
 * Если фронт и API на разных хостах — задайте VITE_API_BASE_URL=https://api.example.com
 */
const rawBase = (import.meta.env.VITE_API_BASE_URL ?? "").trim();
const base = rawBase.replace(/\/$/, "");

export function apiUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (!base) return p;
  return `${base}${p}`;
}

/** Путь к файлу от корня бэкенда: uploads/foo.jpg → тот же хост, что и API */
export function mediaUrl(relativePath) {
  if (!relativePath) return "";
  const p = String(relativePath).replace(/^\/+/, "");
  return apiUrl(`/${p}`);
}

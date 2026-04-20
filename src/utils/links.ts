export function withBase(path = "") {
  const base = import.meta.env.BASE_URL;
  const normalizedPath = path.replace(/^\/+/, "");

  return normalizedPath ? `${base}${normalizedPath}` : base;
}

export function absoluteSiteUrl(path: string, site: URL) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return new URL(withBase(path), site).toString();
}

export function resolveInPageHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;

  // Always return absolute path with hash to prevent Next.js from appending hashes (e.g. /#proyek#layanan)
  return `/${href}`;
}

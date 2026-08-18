export function resolveInPageHref(href: string) {
  if (!href.startsWith("#")) return href;

  // Always return absolute path with hash to prevent Next.js from appending hashes (e.g. /#proyek#layanan)
  return `/${href}`;
}

export function sanitizeInternalRedirect(value: string | null) {
  if (!value?.startsWith("/") || value.startsWith("//")) {
    return "/";
  }

  try {
    const baseUrl = new URL("https://mawmaw.internal");
    const targetUrl = new URL(value, baseUrl);

    if (targetUrl.origin !== baseUrl.origin) {
      return "/";
    }

    return `${targetUrl.pathname}${targetUrl.search}${targetUrl.hash}`;
  } catch {
    return "/";
  }
}

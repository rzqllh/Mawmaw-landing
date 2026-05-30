export function resolveInPageHref(href: string, pathname: string) {
  if (!href.startsWith("#")) return href;

  return pathname === "/" ? href : `/${href}`;
}

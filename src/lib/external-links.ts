export function openConfirmedWhatsappLink(href: string) {
  const opened = window.open(href, "_blank", "noopener,noreferrer");

  if (!opened) {
    window.location.assign(href);
    return false;
  }

  return true;
}
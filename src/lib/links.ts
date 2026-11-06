const WEB_ADDRESS = /^https?:\/\//;

/** Web addresses (WhatsApp, social accounts) open in a new tab; page links, phone and email stay in this one. */
export function opensInNewTab(href: string): boolean {
  return WEB_ADDRESS.test(href);
}

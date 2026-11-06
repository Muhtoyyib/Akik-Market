/**
 * A Google Maps search link: https://developers.google.com/maps/documentation/urls/get-started. On phones it opens the
 * maps app when one is installed, and the browser otherwise, with directions one tap away.
 */
export function directionsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

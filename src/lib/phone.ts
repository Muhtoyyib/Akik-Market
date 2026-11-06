// Nigeria's country code; local numbers write it as a leading 0 instead.
const COUNTRY_CODE = "234";

const digits = (number: string) => number.replace(/\D/g, "");

/** "2347065470198" as "0706 547 0198", the way the number is written and read out locally. */
export function localPhone(number: string): string {
  const local = `0${digits(number).slice(COUNTRY_CODE.length)}`;
  return `${local.slice(0, 4)} ${local.slice(4, 7)} ${local.slice(7)}`;
}

/** A tel: link in the international format, so it dials from any network. */
export function telHref(number: string): string {
  return `tel:+${digits(number)}`;
}

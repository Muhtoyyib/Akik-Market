import {siteConfig} from "@/lib/site-config";

// Set in type until the owner supplies a vector logo.
export function WordmarkLink() {
  return (
    <a
      href="/"
      className="rounded-sm type-h3 font-semibold text-brand-navy outline-offset-4 outline-brand-navy focus-visible:outline-2 focus-visible:outline-solid"
    >
      {siteConfig.name}
    </a>
  );
}

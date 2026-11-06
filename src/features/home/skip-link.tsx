export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-ink px-5 py-3 type-small font-semibold text-on-dark outline-offset-2 outline-brand-navy focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:outline-2 focus-visible:outline-solid"
    >
      Skip to content
    </a>
  );
}

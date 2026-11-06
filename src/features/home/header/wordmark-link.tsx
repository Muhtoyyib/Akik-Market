// The owner's logo, redrawn as a vector from his flyer (public/akik-logo.svg) until he supplies the original file.
// 1000x340 is the SVG's viewBox, so the browser reserves the right space before it loads.
export function WordmarkLink() {
  return (
    <a href="/" className="rounded-sm outline-offset-4 outline-brand-navy focus-visible:outline-2 focus-visible:outline-solid">
      <img src="/akik-logo.svg" alt="Akik Market home" width={1000} height={340} className="h-10 w-auto md:h-12" />
    </a>
  );
}

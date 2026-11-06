import {Button} from "@/components/button/button";
import {Frame} from "@/components/frame/frame";

type ProjectEnquiryProps = {heading: string; action: string; href: string};

const HEADING_ID = "enquiry-heading";

/** Obvious's closing block (frame 11) without the photo, so the primary pill sits on a light surface. */
export function ProjectEnquiry({heading, action, href}: ProjectEnquiryProps) {
  return (
    <section aria-labelledby={HEADING_ID} className="pt-24 md:pt-36">
      <Frame>
        <div className="flex flex-col items-center rounded-lg bg-card px-6 py-16 text-center md:py-24">
          <h2 id={HEADING_ID} className="max-w-3xl type-h2 text-ink">
            {heading}
          </h2>
          <div className="mt-8">
            <Button href={href}>{action}</Button>
          </div>
        </div>
      </Frame>
    </section>
  );
}

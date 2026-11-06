import {render} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {Divisions} from "@/features/home/divisions/divisions";
import {Founder} from "@/features/home/founder/founder";
import {News} from "@/features/home/news/news";
import {Proof} from "@/features/home/proof/proof";
import {Stories} from "@/features/home/stories/stories";
import {Trust} from "@/features/home/trust/trust";
import {homeContent} from "@/lib/content/home";
import {siteContent} from "@/lib/content/site";

// Spec (page-shell, "Section with no content"): a section whose list is empty is left out entirely, so its
// neighbours keep one section gap between them (each section carries its own top spacing).
const {divisions, proof, stories, trust, news, founder} = homeContent;
const {whatsapp} = siteContent;

describe("a Home section with nothing to show", () => {
  it("leaves out the divisions with no businesses", () => {
    const {container} = render(<Divisions eyebrow={divisions.eyebrow.value} heading={divisions.heading.value} cards={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("leaves out the proof with no customer columns", () => {
    const {container} = render(<Proof heading={proof.heading.value} lead={proof.lead.value} columns={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("leaves out customer stories with no stories", () => {
    const {container} = render(<Stories heading={stories.heading.value} tabs={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("leaves out Buy with confidence with no promises", () => {
    const {container} = render(
      <Trust heading={trust.heading.value} image={trust.image.value} rows={[]} whatsappHref={whatsapp.main.href} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("leaves out the news with no posts", () => {
    const {container} = render(<News eyebrow={news.eyebrow.value} heading={news.heading.value} posts={[]} action={news.action} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("leaves out the founder with no photos", () => {
    const {container} = render(<Founder photos={[]} heading={founder.heading.value} story={founder.story.value} link={founder.link} />);
    expect(container).toBeEmptyDOMElement();
  });
});

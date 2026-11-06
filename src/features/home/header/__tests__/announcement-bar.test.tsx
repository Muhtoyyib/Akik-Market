import {render} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {AnnouncementBar} from "@/features/home/header/announcement-bar";

describe("AnnouncementBar", () => {
  it("is left out when there is no announcement", () => {
    const {container} = render(<AnnouncementBar announcement={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("is left out when the announcement text is empty", () => {
    const {container} = render(<AnnouncementBar announcement={{text: "", href: "/"}} />);
    expect(container).toBeEmptyDOMElement();
  });
});

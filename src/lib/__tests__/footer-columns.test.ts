import {describe, expect, it} from "vite-plus/test";
import {visibleColumns} from "@/lib/footer-columns";

const built = (path: string) => path === "/about";

describe("visibleColumns", () => {
  it("leaves out links to pages that aren't built yet", () => {
    const [company] = visibleColumns(
      [
        {
          heading: "Company",
          links: [
            {label: "About", href: "/about"},
            {label: "News", href: "/news"},
          ],
        },
      ],
      built
    );
    expect(company?.links).toEqual([{label: "About", href: "/about"}]);
  });

  it("keeps links to other sites, which always exist", () => {
    const [follow] = visibleColumns(
      [{heading: "Follow", links: [{label: "Instagram", href: "https://www.instagram.com/akikmarket/"}]}],
      built
    );
    expect(follow?.links).toHaveLength(1);
  });

  it("leaves out a column left with no links", () => {
    const columns = visibleColumns(
      [
        {heading: "Legal", links: [{label: "Privacy", href: "/privacy"}]},
        {heading: "Company", links: [{label: "About", href: "/about"}]},
      ],
      built
    );
    expect(columns.map((column) => column.heading)).toEqual(["Company"]);
  });
});

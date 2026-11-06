import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {News} from "@/features/home/news/news";

const image = {value: {src: "/post.jpg", alt: "", width: 960, height: 640}};
const posts = [
  {date: "2026-11-06", title: {value: "New phones landed"}, image},
  {date: "2026-10-14", title: {value: "Interiors finished"}, image},
  {date: "2026-09-22", title: {value: "Cars arrived"}, image},
];
const instagram = {label: "Follow us on Instagram", href: "https://www.instagram.com/akikmarket/"};

function renderNews(props: Partial<{posts: typeof posts; action: typeof instagram}> = {}) {
  return render(<News eyebrow="News" heading="What's new at Akik" posts={props.posts ?? posts} action={props.action ?? instagram} />);
}

describe("News", () => {
  it("is a section named by its heading", () => {
    renderNews();
    expect(screen.getByRole("region", {name: "What's new at Akik"})).toBeInTheDocument();
  });

  it("shows each date as 6 NOV 2026 with a matching machine-readable value", () => {
    const {container} = renderNews();
    expect([...container.querySelectorAll("time")].map((time) => [time.dateTime, time.textContent])).toEqual([
      ["2026-11-06", "6 NOV 2026"],
      ["2026-10-14", "14 OCT 2026"],
      ["2026-09-22", "22 SEP 2026"],
    ]);
  });

  it("shows the cards without links and follows them with Instagram until the News page exists", () => {
    renderNews();
    expect(screen.getAllByRole("link").map((link) => [link.textContent, link.getAttribute("href")])).toEqual([
      ["Follow us on Instagram", "https://www.instagram.com/akikmarket/"],
    ]);
  });

  it("makes each card one link to its post once the News page exists", () => {
    renderNews({posts: posts.map((post, index) => ({...post, href: `/news/post-${index}`})), action: {label: "More news", href: "/news"}});
    expect(screen.getByRole("link", {name: "New phones landed"})).toHaveAttribute("href", "/news/post-0");
  });
});

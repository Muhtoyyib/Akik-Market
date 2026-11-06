import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vite-plus/test";
import {Proof} from "@/features/home/proof/proof";

const lead = {before: "They found me my car.", highlight: "I trust them.", source: "TUNDE A. · CUSTOMER"};
const columns = [
  {key: "phones" as const, quote: {value: "Original phone."}, source: {value: "PHONES & GADGETS · CUSTOMER SINCE 2023"}},
  {key: "engineering" as const, quote: {value: "Clean papers."}, source: {value: "ENGINEERING & REAL ESTATE · CUSTOMER SINCE 2024"}},
  {key: "autos" as const, quote: {value: "Inspected car."}, source: {value: "AUTOS · CUSTOMER SINCE 2025"}},
];
const renderProof = () => render(<Proof heading="What customers say" lead={lead} columns={columns} />);

describe("Proof", () => {
  it("is a section named for screen readers", () => {
    renderProof();
    expect(screen.getByRole("region", {name: "What customers say"})).toBeInTheDocument();
  });

  it("marks up every quote as a quotation with its source in a caption", () => {
    const {container} = renderProof();
    const figures = [...container.querySelectorAll("figure")];
    expect(figures.map((figure) => [!!figure.querySelector("blockquote"), figure.querySelector("figcaption")?.textContent])).toEqual([
      [true, "TUNDE A. · CUSTOMER"],
      [true, "PHONES & GADGETS · CUSTOMER SINCE 2023"],
      [true, "ENGINEERING & REAL ESTATE · CUSTOMER SINCE 2024"],
      [true, "AUTOS · CUSTOMER SINCE 2025"],
    ]);
  });

  it("emphasises the highlighted phrase, not only colours it", () => {
    const {container} = renderProof();
    expect(container.querySelector("blockquote em")).toHaveTextContent("I trust them.");
  });

  it("orders the columns as the business grew, each in its business's accent", () => {
    const {container} = renderProof();
    expect([...container.querySelectorAll("li[data-division]")].map((column) => column.getAttribute("data-division"))).toEqual([
      "phones",
      "engineering",
      "autos",
    ]);
  });
});

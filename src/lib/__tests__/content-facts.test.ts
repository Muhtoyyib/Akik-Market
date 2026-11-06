import {describe, expect, it} from "vite-plus/test";
import {fromFacts, listPlaceholders, placeholder, real} from "@/lib/content-facts";

describe("facts", () => {
  it("marks a placeholder", () => {
    expect(placeholder(2023)).toEqual({value: 2023, placeholder: true});
  });

  it("marks a real fact", () => {
    expect(real("Iwo Road")).toEqual({value: "Iwo Road", placeholder: false});
  });

  it("makes a value built from a placeholder a placeholder too", () => {
    expect(fromFacts([real("Ibadan"), placeholder(2023)], "Ibadan since 2023").placeholder).toBe(true);
  });

  it("keeps a value built only from real facts real", () => {
    expect(fromFacts([real("Ibadan")], "In Ibadan").placeholder).toBe(false);
  });
});

describe("listPlaceholders", () => {
  it("lists every placeholder with its path, and no real facts", () => {
    const content = {
      hero: {heading: placeholder("Phones, homes and cars"), address: real("Iwo Road")},
      news: [{title: real("Real post")}, {title: placeholder("New stock")}],
    };
    expect(listPlaceholders(content)).toEqual([
      {path: "hero.heading", value: "Phones, homes and cars"},
      {path: "news.1.title", value: "New stock"},
    ]);
  });

  it("ignores plain values that are not facts", () => {
    expect(listPlaceholders({id: "hero", count: 3, empty: null})).toEqual([]);
  });

  it("looks inside an object that has a value key but no placeholder flag", () => {
    expect(listPlaceholders({price: {value: placeholder("₦450,000"), currency: "NGN"}})).toEqual([
      {path: "price.value", value: "₦450,000"},
    ]);
  });

  it("does not take an object with more keys than a fact for a fact", () => {
    expect(listPlaceholders({item: {value: "x", placeholder: true, note: "not a fact"}})).toEqual([]);
  });
});

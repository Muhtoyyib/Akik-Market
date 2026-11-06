import {siteConfig} from "@/lib/site-config";

export function HomeView() {
  return (
    <main>
      <h1>{siteConfig.name}</h1>
      <ul>
        {siteConfig.divisions.map((division) => (
          <li key={division.slug}>{division.name}</li>
        ))}
      </ul>
    </main>
  );
}

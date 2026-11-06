import {NewsCard} from "@/components/news-card/news-card";
import type {Post} from "@/lib/content/news";

type NewsGridProps = {posts: readonly Post[]; level: 2 | 3};

/** Three columns from 1024px, two from 768px, one on phones; each card one link to its post (post-grid spec). */
export function NewsGrid({posts, level}: NewsGridProps) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post.slug}>
          <NewsCard {...post} level={level} />
        </li>
      ))}
    </ul>
  );
}

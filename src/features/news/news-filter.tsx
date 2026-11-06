import {PillTabs} from "@/components/pill-tabs/pill-tabs";
import {useTabParam} from "@/components/pill-tabs/use-tab-param";
import {NewsGrid} from "@/features/news/news-grid";
import {business, type BusinessKey} from "@/lib/content/business";
import type {Post} from "@/lib/content/news";

type NewsFilterProps = {posts: readonly Post[]; businesses: readonly BusinessKey[]};

/** "All" and a tab per business with posts, kept in ?business= (design D2); with one business there are no tabs. */
export function NewsFilter({posts, businesses}: NewsFilterProps) {
  const {tab, select} = useTabParam("business", businesses, "all");
  if (businesses.length < 2) return <NewsGrid posts={posts} level={2} />;
  const tabs = [
    {value: "all", label: "All", panel: <NewsGrid posts={posts} level={2} />},
    ...businesses.map((key) => ({
      value: key,
      label: business(key).tab,
      panel: (
        <div data-division={key}>
          <NewsGrid posts={posts.filter((post) => post.business === key)} level={2} />
        </div>
      ),
    })),
  ];
  return <PillTabs label="News by business" tabs={tabs} value={tab} onValueChange={select} />;
}

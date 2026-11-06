import {Frame} from "@/features/home/frame";
import {LinkColumns} from "@/features/home/footer/link-columns";
import {Wordmark} from "@/features/home/footer/wordmark";
import type {FooterColumn} from "@/lib/footer-columns";

type Counter = {figure: string; label: string};
type FooterProps = {counters: Counter[]; columns: FooterColumn[]; legal: string; wordmark: string};

/**
 * Matic P11: a navy box inside the gutters with static figures, link columns, the legal line and a giant cropped
 * wordmark. The space above comes from main's bottom padding (the section rhythm); the box keeps 16px to the page end.
 */
export function Footer({counters, columns, legal, wordmark}: FooterProps) {
  return (
    <footer>
      <Frame className="pb-4">
        <div className="overflow-hidden rounded-lg bg-brand-navy p-6 text-on-dark md:p-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
            {/* Each figure and label sit in one list item, so a screen reader reads "1,000+ Phones sold" once. */}
            <ul aria-label="Akik in numbers" className="flex flex-col gap-8 lg:col-span-5">
              {counters.map((counter) => (
                <li key={counter.label}>
                  <span className="block type-figure">{counter.figure}</span> <span className="mt-1 block type-label">{counter.label}</span>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-7">
              <LinkColumns columns={columns} />
            </div>
          </div>
          <p className="mt-16 type-small">{legal}</p>
          <Wordmark text={wordmark} />
        </div>
      </Frame>
    </footer>
  );
}

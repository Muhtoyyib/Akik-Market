import {useEffect, useState} from "react";
import {tabFromSearch, withTab} from "@/lib/tab-param";

/**
 * The selected tab, kept in the address under `param` (projects, listings and news design D1/D2). The prerendered page
 * shows the fallback tab; a shared link's tab is selected once the page is running, so the first render matches the
 * HTML. Back and forward follow the address.
 */
export function useTabParam(param: string, tabs: readonly string[], fallback: string) {
  const [tab, setTab] = useState(fallback);

  useEffect(() => {
    const follow = () => setTab(tabFromSearch(location.search, {param, tabs, fallback}));
    follow();
    addEventListener("popstate", follow);
    return () => removeEventListener("popstate", follow);
  }, [param, tabs, fallback]);

  function select(next: string) {
    setTab(next);
    history.pushState(history.state, "", withTab(location.href, next, {param, tabs}));
  }

  return {tab, select};
}

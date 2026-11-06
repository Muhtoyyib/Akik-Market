import {useEffect, useState} from "react";
import {typeFromSearch} from "@/lib/projects";

const ALL = "all";

/**
 * The tab kept in `?type=` (projects design D1). The prerendered page always shows "All"; a shared link's tab is
 * selected once the page is running, so the first render matches the HTML. Back and forward follow the address.
 */
export function useTypeParam(types: readonly string[]) {
  const [type, setType] = useState(ALL);

  useEffect(() => {
    const follow = () => setType(typeFromSearch(location.search, types));
    follow();
    addEventListener("popstate", follow);
    return () => removeEventListener("popstate", follow);
  }, [types]);

  function select(next: string) {
    setType(next);
    const url = new URL(location.href);
    if (next === ALL) url.searchParams.delete("type");
    else url.searchParams.set("type", next);
    history.pushState(history.state, "", url);
  }

  return {type, select};
}

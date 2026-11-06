import {useEffect, useState} from "react";
import {typeFromSearch, withType} from "@/lib/type-param";

/**
 * The selected tab, kept in `?type=` (projects and listings design D1). The prerendered page shows the fallback tab; a
 * shared link's tab is selected once the page is running, so the first render matches the HTML. Back and forward
 * follow the address.
 */
export function useTypeParam(types: readonly string[], fallback: string) {
  const [type, setType] = useState(fallback);

  useEffect(() => {
    const follow = () => setType(typeFromSearch(location.search, types, fallback));
    follow();
    addEventListener("popstate", follow);
    return () => removeEventListener("popstate", follow);
  }, [types, fallback]);

  function select(next: string) {
    setType(next);
    history.pushState(history.state, "", withType(location.href, next, types));
  }

  return {type, select};
}

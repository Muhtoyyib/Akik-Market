import {useEffect, useRef, useState} from "react";
import {business, businesses, email, type BusinessKey} from "@/lib/content/business";
import {enquiryErrors, enquiryMailto, enquiryText, type Enquiry, type EnquiryErrors} from "@/lib/enquiry";
import {tabFromSearch} from "@/lib/tab-param";
import {whatsappHref} from "@/lib/whatsapp";

const EMPTY: Enquiry = {business: "", name: "", topic: "", message: ""};
// The fields that can be wrong, in the form's order: focus goes to the first one with an error.
const CHECKED = ["business", "name", "message"] as const;
// Fixed at load: a list made during render would change every render and re-run the effect below without end.
const KEYS = businesses.map((entry) => entry.key);

type Channel = "whatsapp" | "email";

/** The form's state and its send action (enquiry-form spec). Errors show after the first send and then follow typing. */
export function useEnquiry() {
  const [enquiry, setEnquiry] = useState(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [tried, setTried] = useState(false);
  const fields = useRef<Partial<Record<(typeof CHECKED)[number], HTMLElement | null>>>({});

  // Spec ("Opened from the Autos page"): the prerendered form has no choice, so the first render matches the HTML.
  useEffect(() => {
    const chosen = tabFromSearch(location.search, {param: "business", tabs: KEYS, fallback: ""});
    // The URL is outside React, and the first render must match the prerendered HTML, so this can't be initial state.
    // oxlint-disable-next-line react/set-state-in-effect
    if (chosen !== "") setEnquiry((current) => ({...current, business: chosen as BusinessKey})); // chosen is one of KEYS
  }, []);

  function update(change: Partial<Enquiry>) {
    const next = {...enquiry, ...change};
    setEnquiry(next);
    if (tried) setErrors(enquiryErrors(next));
  }

  function send(channel: Channel) {
    const found = enquiryErrors(enquiry);
    setTried(true);
    setErrors(found);
    const first = CHECKED.find((field) => found[field]);
    if (first) return fields.current[first]?.focus();
    const {name, number} = business(enquiry.business as BusinessKey); // no business error, so one is chosen
    const text = enquiryText(enquiry, name);
    if (channel === "whatsapp") open(whatsappHref(number.value, text), "_blank", "noopener,noreferrer");
    else location.href = enquiryMailto(email.value, name, text);
  }

  /** A ref callback that remembers a field, so a send with errors can focus it. */
  const register = (field: (typeof CHECKED)[number]) => (element: HTMLElement | null) => {
    fields.current[field] = element;
  };

  return {enquiry, errors, register, update, send};
}

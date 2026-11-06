// What the shell on every page reads: the announcement bar, the WhatsApp action and the footer.
import {placeholder} from "@/lib/content-facts";
import {mainWhatsapp, social, startYear} from "@/lib/content/business";
import {footer} from "@/lib/content/footer";

export const siteContent = {
  startYear,
  whatsapp: {main: mainWhatsapp},
  announcement: placeholder({text: "New phones arrive every week. See what just came in", href: social.instagram.value}),
  footer,
} as const;

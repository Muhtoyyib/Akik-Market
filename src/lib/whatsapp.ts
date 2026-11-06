/** A WhatsApp click-to-chat link: https://faq.whatsapp.com/5913398998672934 (digits only, international format). */
export function whatsappHref(number: string, message: string): string {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

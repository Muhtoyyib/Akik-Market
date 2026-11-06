import {CircleAlert} from "lucide-react";

/** Spec (form-fields, "Errors"): text under the field, with an icon so colour isn't the only sign. */
export function FieldError({id, message}: {id: string; message?: string}) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-2 type-small text-brand-red">
      <CircleAlert aria-hidden size={16} strokeWidth={1.5} />
      {message}
    </p>
  );
}

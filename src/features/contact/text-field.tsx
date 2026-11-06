import {cn} from "cn";
import type {Ref} from "react";
import {FieldError} from "@/features/contact/field-error";

type TextFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
  error?: string;
  /** A text area for longer writing. */
  multiline?: boolean;
  maxLength?: number;
  autoComplete?: string;
  ref?: Ref<HTMLInputElement & HTMLTextAreaElement>;
};

// Matic's P11 field (contact design D2): no box, an underline that darkens on focus, and the standard focus outline.
const CONTROL =
  "mt-2 block min-h-11 w-full border-0 border-b border-line bg-transparent py-2 type-body text-ink outline-offset-2 outline-brand-navy transition-colors ease-standard focus:border-ink focus-visible:outline-2 focus-visible:outline-solid aria-invalid:border-brand-red";

/** The ids that describe a field: its hint, then its error, when it has them. */
function describedBy(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

/** A labelled text input or text area. "required" is in the label's own words, and the hint and error are read with it. */
export function TextField(props: TextFieldProps) {
  const {id, label, value, onChange, required = false, hint, error, multiline = false, maxLength, autoComplete = "off", ref} = props;
  const shared = {
    id,
    ref,
    value,
    maxLength,
    required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(id, hint, error),
  };
  return (
    <div>
      <label htmlFor={id} className="type-small font-semibold text-ink">
        {label}
        {required && " (required)"}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 type-small text-ink-muted">
          {hint}
        </p>
      )}
      {multiline ? (
        <textarea {...shared} rows={6} onChange={(event) => onChange(event.target.value)} className={cn(CONTROL, "resize-y")} />
      ) : (
        <input {...shared} type="text" autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} className={CONTROL} />
      )}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

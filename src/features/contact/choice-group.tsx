import type {Ref} from "react";
import {FieldError} from "@/features/contact/field-error";

type Option = {value: string; label: string};
type ChoiceGroupProps = {
  name: string;
  legend: string;
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  ref?: Ref<HTMLFieldSetElement>;
};

/**
 * One choice of several, as pills (form-fields spec). Native radios underneath, so arrow keys move the choice and
 * screen readers announce the group; the pill shows the checked state and the focus ring.
 */
export function ChoiceGroup({name, legend, options, value, onChange, error, ref}: ChoiceGroupProps) {
  const errorId = `${name}-error`;
  return (
    <fieldset ref={ref} tabIndex={-1} aria-describedby={error ? errorId : undefined} className="outline-none">
      <legend className="type-small font-semibold text-ink">{legend} (required)</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="relative">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-ink px-5 type-small font-semibold text-ink transition-colors ease-standard outline-offset-2 outline-brand-navy peer-checked:bg-ink peer-checked:text-on-dark peer-focus-visible:outline-2 peer-focus-visible:outline-solid hover:bg-ink/5 peer-checked:hover:bg-ink/85">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}

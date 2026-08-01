"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * Brand wrapper around shadcn/Base UI Select.
 *
 * Replaces the native <select>, which cannot be styled to match the design
 * system and renders as an OS wheel on iOS. Base UI renders a hidden input for
 * `name`, so FormData submission still works exactly as before.
 *
 * Per CONVENTIONS.md this wraps rather than modifies components/ui/select.tsx.
 */
export function FormSelect({
  name,
  value,
  onChange,
  options,
  placeholder,
  invalid,
  id,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
  invalid?: boolean;
  id?: string;
}) {
  return (
    <Select
      name={name}
      value={value || null}
      onValueChange={(v) => onChange((v as string) ?? "")}
    >
      <SelectTrigger
        id={id}
        className={cn(
          "h-12 w-full rounded-xl border-line bg-surface px-4 text-[15px]",
          "data-[popup-open]:border-brand-400",
          invalid && "border-danger",
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-72 rounded-xl border-line bg-surface">
        {options.map((o) => (
          <SelectItem key={o} value={o} className="text-[14.5px]">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

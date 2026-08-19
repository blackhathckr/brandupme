import { ChevronDown } from "lucide-react";
import { UaeFlag } from "./uae-flag";
import { cn } from "@/lib/utils";

/**
 * The form vocabulary used across every registration flow and dashboard form.
 *
 * Deliberately plain elements rather than a controlled component library: these
 * screens are a click-through prototype today and will be handed to server
 * actions in the backend phase. Keeping them uncontrolled means wiring them up
 * later is adding a `name` and an action, not a rewrite.
 */

export function Panel({
  title,
  step,
  description,
  action,
  children,
  className,
}: {
  title?: React.ReactNode;
  /** The "1." / "2." prefix the mockups put before section titles. */
  step?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-rule bg-white p-6 shadow-p1",
        className,
      )}
    >
      {title ? (
        <header className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[17px] font-bold text-slate-ink">
              {step ? <span className="mr-1.5">{step}</span> : null}
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-[13.5px] text-slate-3">{description}</p>
            ) : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function Field({
  label,
  required,
  hint,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-[13.5px] font-semibold text-slate-2"
      >
        {label}
        {required ? <span className="ml-0.5 text-alert">*</span> : null}
      </label>
      {children}
      {hint ? <p className="mt-1.5 text-xs text-slate-3">{hint}</p> : null}
    </div>
  );
}

const CONTROL =
  "h-11 w-full rounded-lg border border-rule bg-white px-3.5 text-sm text-slate-ink outline-none transition-colors placeholder:text-slate-4 focus:border-iris-500 focus:ring-3 focus:ring-iris-100";

export function TextInput({
  icon,
  className,
  ...props
}: React.ComponentProps<"input"> & { icon?: React.ReactNode }) {
  if (!icon) return <input className={cn(CONTROL, className)} {...props} />;

  return (
    <div className="relative">
      <span
        aria-hidden
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-4 [&>svg]:size-4"
      >
        {icon}
      </span>
      <input className={cn(CONTROL, "pl-10", className)} {...props} />
    </div>
  );
}

export function TextArea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(CONTROL, "h-auto min-h-[104px] py-2.5", className)}
      {...props}
    />
  );
}

export function SelectInput({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(CONTROL, "appearance-none pr-10", className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-4"
      />
    </div>
  );
}

/** The +971 phone control with the flag chip, exactly as drawn. */
export function PhoneInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div
      className={cn(
        "flex h-11 w-full items-center rounded-lg border border-rule bg-white transition-colors focus-within:border-iris-500 focus-within:ring-3 focus-within:ring-iris-100",
        className,
      )}
    >
      <span className="flex h-full items-center gap-1.5 border-r border-rule px-3 text-sm text-slate-2">
        <UaeFlag />
        <span className="font-medium">+971</span>
        <ChevronDown aria-hidden className="size-3.5 text-slate-4" />
      </span>
      <input
        type="tel"
        placeholder="50 123 4567"
        className="h-full min-w-0 flex-1 rounded-r-lg bg-transparent px-3.5 text-sm text-slate-ink outline-none placeholder:text-slate-4"
        {...props}
      />
    </div>
  );
}

/** Primary / secondary buttons. `as` keeps them usable as links. */
export function PrimaryButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-iris-700 px-6 text-[15px] font-semibold text-white shadow-iris transition-colors hover:bg-iris-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none",
        className,
      )}
      {...props}
    />
  );
}

export function GhostButton({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-rule bg-white px-5 text-[15px] font-semibold text-slate-2 transition-colors hover:bg-paper",
        className,
      )}
      {...props}
    />
  );
}

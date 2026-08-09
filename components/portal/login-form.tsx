"use client";

import { useActionState } from "react";
import { login, type AuthState } from "@/lib/auth/actions";

const initial: AuthState = { ok: false };

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction, pending] = useActionState(login, initial);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {next && <input type="hidden" name="next" value={next} />}

      <div>
        <label htmlFor="email" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[13.5px] text-ink
            outline-none transition-colors placeholder:text-ink-3 focus-visible:border-brand-400"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-[12.5px] font-semibold text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="h-11 w-full rounded-xl border border-line bg-white px-3.5 text-[13.5px] text-ink
            outline-none transition-colors focus-visible:border-brand-400"
        />
      </div>

      {state.error && (
        <p role="alert" className="rounded-xl bg-red-50 px-3.5 py-2.5 text-[12.5px] font-medium text-red-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-11 items-center justify-center rounded-full bg-brand-600 px-6
          text-[14px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

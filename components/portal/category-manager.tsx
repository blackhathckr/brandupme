"use client";

import { useActionState, useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import {
  addRelationship,
  removeRelationship,
  updateCategory,
  type CategoryState,
} from "@/app/admin/categories/actions";

/**
 * Category catalogue editor.
 *
 * Groups are collapsed by default. 21 groups of sub-categories rendered open at
 * once is several thousand form fields, which makes the page slow and the thing
 * you are looking for impossible to find.
 */

const initial: CategoryState = { ok: false };

type Sub = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  status: string;
  listingCount: number;
  related: { id: number; name: string; strength: number }[];
};

type Group = {
  id: number;
  name: string;
  slug: string;
  icon: string | null;
  status: string;
  children: Sub[];
};

export function CategoryManager({
  groups,
  allSubCategories,
}: {
  groups: Group[];
  allSubCategories: { id: number; name: string }[];
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {groups.map((g) => (
        <section key={g.id} className="rounded-2xl border border-line bg-white shadow-e1">
          <button
            type="button"
            onClick={() => setOpen(open === g.id ? null : g.id)}
            aria-expanded={open === g.id}
            className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
          >
            <span>
              <span className="font-display text-[15px] font-bold tracking-[-0.02em] text-ink">
                {g.name}
              </span>
              <span className="ml-2 text-[12px] text-ink-3">
                {g.children.length} sub-categories
              </span>
            </span>
            <ChevronDown
              className={`size-4 shrink-0 text-ink-3 transition-transform ${
                open === g.id ? "rotate-180" : ""
              }`}
              strokeWidth={2.5}
              aria-hidden
            />
          </button>

          {open === g.id && (
            <div className="border-t border-line px-5 py-4">
              <ul className="flex flex-col gap-4">
                {g.children.map((sub) => (
                  <li key={sub.id}>
                    <SubCategoryRow sub={sub} allSubCategories={allSubCategories} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function SubCategoryRow({
  sub,
  allSubCategories,
}: {
  sub: Sub;
  allSubCategories: { id: number; name: string }[];
}) {
  const [updateState, updateAction, updating] = useActionState(updateCategory, initial);
  const [addState, addAction, adding] = useActionState(addRelationship, initial);
  const [, removeAction] = useActionState(removeRelationship, initial);

  return (
    <div className="rounded-xl border border-line bg-surface-2 p-4">
      <form action={updateAction} className="flex flex-wrap items-end gap-3">
        <input type="hidden" name="categoryId" value={sub.id} />

        <div className="min-w-[180px] flex-1">
          <label
            htmlFor={`name-${sub.id}`}
            className="mb-1 block text-[11px] font-semibold text-ink-3"
          >
            Name
          </label>
          <input
            id={`name-${sub.id}`}
            name="name"
            defaultValue={sub.name}
            className="h-9 w-full rounded-lg border border-line bg-white px-2.5 text-[12.5px] outline-none focus-visible:border-brand-400"
          />
        </div>

        <div className="w-32">
          <label
            htmlFor={`icon-${sub.id}`}
            className="mb-1 block text-[11px] font-semibold text-ink-3"
          >
            Icon
          </label>
          <input
            id={`icon-${sub.id}`}
            name="icon"
            defaultValue={sub.icon ?? ""}
            placeholder="Target"
            className="h-9 w-full rounded-lg border border-line bg-white px-2.5 text-[12.5px] outline-none focus-visible:border-brand-400"
          />
        </div>

        <label className="flex h-9 items-center gap-2 text-[12px] text-ink-2">
          <input
            type="checkbox"
            name="hidden"
            defaultChecked={sub.status === "hidden"}
            className="size-4 rounded border-line accent-brand-600"
          />
          Hidden
        </label>

        <span className="text-[11.5px] text-ink-3">
          /{sub.slug} &middot; {sub.listingCount} listed
        </span>

        <button
          type="submit"
          disabled={updating}
          className="ml-auto inline-flex h-9 items-center rounded-full bg-brand-600 px-4 text-[12px] font-bold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
        >
          {updating ? "Saving…" : "Save"}
        </button>
      </form>

      {updateState.message && (
        <p className="mt-2 text-[11.5px] font-medium text-green-text">
          {updateState.message}
        </p>
      )}

      <div className="mt-3 border-t border-line pt-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-3">
          Businesses you may also need
        </p>

        {sub.related.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {sub.related.map((r) => (
              <li key={r.id}>
                <form action={removeAction} className="inline">
                  <input type="hidden" name="categoryId" value={sub.id} />
                  <input type="hidden" name="relatedCategoryId" value={r.id} />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[11.5px] text-ink-2">
                    {r.name}
                    <span className="text-[10px] font-bold text-green-text">{r.strength}</span>
                    <button
                      type="submit"
                      aria-label={`Remove ${r.name}`}
                      className="text-ink-3 transition-colors hover:text-red-600"
                    >
                      <X className="size-3" strokeWidth={3} aria-hidden />
                    </button>
                  </span>
                </form>
              </li>
            ))}
          </ul>
        )}

        <form action={addAction} className="mt-3 flex flex-wrap items-end gap-2">
          <input type="hidden" name="categoryId" value={sub.id} />

          <div className="min-w-[200px] flex-1">
            <label
              htmlFor={`rel-${sub.id}`}
              className="mb-1 block text-[11px] font-semibold text-ink-3"
            >
              Add recommendation
            </label>
            <select
              id={`rel-${sub.id}`}
              name="relatedCategoryId"
              defaultValue=""
              required
              className="h-9 w-full rounded-lg border border-line bg-white px-2 text-[12px] outline-none focus-visible:border-brand-400"
            >
              <option value="" disabled>
                Choose a category
              </option>
              {allSubCategories
                .filter((c) => c.id !== sub.id)
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="w-24">
            <label
              htmlFor={`strength-${sub.id}`}
              className="mb-1 block text-[11px] font-semibold text-ink-3"
            >
              Strength
            </label>
            <input
              id={`strength-${sub.id}`}
              name="strength"
              type="number"
              min={1}
              max={10}
              defaultValue={7}
              className="h-9 w-full rounded-lg border border-line bg-white px-2.5 text-[12px] outline-none focus-visible:border-brand-400"
            />
          </div>

          <button
            type="submit"
            disabled={adding}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-[12px] font-bold text-ink-2 transition-colors hover:border-brand-300 hover:text-green-text disabled:opacity-60"
          >
            <Plus className="size-3.5" strokeWidth={3} aria-hidden />
            Add
          </button>
        </form>

        {addState.message && (
          <p className={`mt-2 text-[11.5px] font-medium ${addState.ok ? "text-green-text" : "text-red-600"}`}>
            {addState.message}
          </p>
        )}
      </div>
    </div>
  );
}

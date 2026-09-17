"use client";

import { useEffect } from "react";
import type { FiltersState } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";
import { FilterFields } from "./FilterFields";
import { useMediaQuery } from "@/lib/useMediaQuery";

export function FilterSheet({
  open,
  filters,
  onChange,
  onClose,
}: {
  open: boolean;
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onClose: () => void;
}) {
  // The sheet is CSS-hidden (not unmounted) above md, so its scroll lock
  // must only engage when it is the actual mobile presentation, or opening
  // filters would silently lock scrolling on desktop too.
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isActive = open && isMobile;

  useEffect(() => {
    if (!isActive) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isActive]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      <div
        role="dialog"
        aria-label="Filter events"
        aria-modal="true"
        className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-2xl bg-white shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-zinc-100 px-5 py-4">
          <h2 className="text-base font-semibold text-zinc-900">Filters</h2>
          <button
            type="button"
            onClick={() => onChange(DEFAULT_FILTERS)}
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
          >
            Reset
          </button>
        </div>

        <div className="h-[68vh] shrink-0 overflow-y-auto px-5 py-5">
          <FilterFields filters={filters} onChange={onChange} />
        </div>

        <div className="shrink-0 border-t border-zinc-100 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

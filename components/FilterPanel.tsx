import type { FiltersState } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";
import { FilterFields } from "./FilterFields";

export function FilterPanel({
  filters,
  onChange,
  onClose,
}: {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Filter events"
      className="absolute left-0 top-full z-30 mt-2 hidden w-80 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl md:block"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Filters</h2>
        <button
          type="button"
          onClick={() => onChange(DEFAULT_FILTERS)}
          className="text-sm font-medium text-zinc-500 hover:text-zinc-900"
        >
          Reset
        </button>
      </div>

      <div className="mt-4">
        <FilterFields filters={filters} onChange={onChange} />
      </div>

      <button
        type="button"
        onClick={onClose}
        className="mt-6 w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
      >
        Apply filters
      </button>
    </div>
  );
}

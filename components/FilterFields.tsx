import type { DayFilter, FiltersState } from "@/lib/types";

const DAY_OPTIONS: { value: DayFilter; label: string }[] = [
  { value: "any", label: "Any day" },
  { value: "today", label: "Today" },
  { value: "tomorrow", label: "Tomorrow" },
  { value: "weekend", label: "This weekend" },
];

export function FilterFields({
  filters,
  onChange,
}: {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <fieldset>
        <legend className="text-sm font-semibold text-zinc-900">Day</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {DAY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={filters.day === opt.value}
              onClick={() => onChange({ ...filters, day: opt.value })}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                filters.day === opt.value
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="max-price" className="flex justify-between text-sm font-semibold text-zinc-900">
          <span>Max price</span>
          <span className="font-normal text-zinc-500">
            {filters.maxPrice >= 150 ? "Any price" : `$${filters.maxPrice}`}
          </span>
        </label>
        <input
          id="max-price"
          type="range"
          min={0}
          max={150}
          step={5}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="mt-3 w-full accent-zinc-900"
        />
      </div>

      <div>
        <label htmlFor="max-distance" className="flex justify-between text-sm font-semibold text-zinc-900">
          <span>Max distance</span>
          <span className="font-normal text-zinc-500">
            {filters.maxDistance >= 10 ? "Any distance" : `${filters.maxDistance} mi`}
          </span>
        </label>
        <input
          id="max-distance"
          type="range"
          min={1}
          max={10}
          step={1}
          value={filters.maxDistance}
          onChange={(e) => onChange({ ...filters, maxDistance: Number(e.target.value) })}
          className="mt-3 w-full accent-zinc-900"
        />
      </div>
    </div>
  );
}

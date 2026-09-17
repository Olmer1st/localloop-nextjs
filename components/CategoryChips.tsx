import { CATEGORIES, CATEGORY_STYLE } from "@/lib/categories";
import type { Category } from "@/lib/types";

export function CategoryChips({
  selected,
  onSelect,
}: {
  selected: Category | "All";
  onSelect: (category: Category | "All") => void;
}) {
  const items: (Category | "All")[] = ["All", ...CATEGORIES];

  return (
    <div className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {items.map((item) => {
        const isActive = item === selected;
        const activeClass =
          item === "All"
            ? "bg-zinc-900 text-white border-zinc-900"
            : CATEGORY_STYLE[item].chipActive;
        return (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            aria-pressed={isActive}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
              isActive
                ? activeClass
                : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
            }`}
          >
            {item === "All" ? "All" : `${CATEGORY_STYLE[item].icon} ${item}`}
          </button>
        );
      })}
      {/* trailing spacer: some browsers clip end padding in a scrollable flex row */}
      <div aria-hidden className="shrink-0" style={{ width: "1px" }} />
    </div>
  );
}

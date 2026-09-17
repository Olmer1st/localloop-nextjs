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
    <div className="relative -mx-4 px-4">
      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
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
      </div>
      <div
        aria-hidden
        className="absolute right-4 top-0 bottom-1 w-16 bg-gradient-to-l from-white to-transparent md:hidden"
      />
    </div>
  );
}

import { CATEGORY_STYLE } from "@/lib/categories";
import type { Category } from "@/lib/types";

const ASPECT_CLASS = {
  wide: "aspect-[16/10]",
  square: "aspect-[4/3]",
  tall: "aspect-[3/4]",
} as const;

export function EventImage({
  category,
  aspect,
  className = "",
}: {
  category: Category;
  aspect: keyof typeof ASPECT_CLASS;
  className?: string;
}) {
  const style = CATEGORY_STYLE[category];
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-t-2xl bg-gradient-to-br ${style.gradient} ${ASPECT_CLASS[aspect]} ${className}`}
    >
      <span aria-hidden className="text-4xl drop-shadow-sm sm:text-5xl">
        {style.icon}
      </span>
      <span className="absolute left-2 top-2 rounded-full bg-black/25 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
        {category}
      </span>
    </div>
  );
}

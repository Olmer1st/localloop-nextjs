import type { Category } from "./types";

export const CATEGORIES: Category[] = [
  "Music",
  "Food",
  "Family",
  "Sports",
  "Arts",
  "Outdoors",
  "Nightlife",
];

export const CATEGORY_STYLE: Record<
  Category,
  { icon: string; gradient: string; chipActive: string }
> = {
  Music: {
    icon: "🎵",
    gradient: "from-fuchsia-500 to-purple-600",
    chipActive: "bg-fuchsia-600 text-white border-fuchsia-600",
  },
  Food: {
    icon: "🍜",
    gradient: "from-orange-400 to-red-500",
    chipActive: "bg-orange-500 text-white border-orange-500",
  },
  Family: {
    icon: "🎡",
    gradient: "from-emerald-400 to-teal-500",
    chipActive: "bg-emerald-600 text-white border-emerald-600",
  },
  Sports: {
    icon: "⚽",
    gradient: "from-sky-500 to-blue-600",
    chipActive: "bg-sky-600 text-white border-sky-600",
  },
  Arts: {
    icon: "🎨",
    gradient: "from-amber-400 to-pink-500",
    chipActive: "bg-amber-500 text-white border-amber-500",
  },
  Outdoors: {
    icon: "🏕️",
    gradient: "from-lime-500 to-emerald-600",
    chipActive: "bg-lime-600 text-white border-lime-600",
  },
  Nightlife: {
    icon: "🌙",
    gradient: "from-indigo-500 to-violet-700",
    chipActive: "bg-indigo-600 text-white border-indigo-600",
  },
};

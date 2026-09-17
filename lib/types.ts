export type Category =
  | "Music"
  | "Food"
  | "Family"
  | "Sports"
  | "Arts"
  | "Outdoors"
  | "Nightlife";

export type DayFilter = "any" | "today" | "tomorrow" | "weekend";

export type SortOption = "date" | "distance" | "price";

export interface FiltersState {
  day: DayFilter;
  maxPrice: number;
  maxDistance: number;
}

export const DEFAULT_FILTERS: FiltersState = {
  day: "any",
  maxPrice: 150,
  maxDistance: 10,
};

export interface LocalEvent {
  id: string;
  title: string;
  venue: string;
  category: Category;
  isoDate: string;
  dayLabel: string;
  timeLabel: string;
  price: number | null;
  distanceMiles: number;
  imageAspect: "wide" | "square" | "tall";
  description: string;
  isFeatured?: boolean;
}

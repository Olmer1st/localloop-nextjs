"use client";

import { useMemo, useState } from "react";
import type { Category, FiltersState, LocalEvent, SortOption } from "@/lib/types";
import { DEFAULT_FILTERS } from "@/lib/types";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { CategoryChips } from "./CategoryChips";
import { SortControl } from "./SortControl";
import { EventGrid } from "./EventGrid";
import { EventModal } from "./EventModal";
import { FilterPanel } from "./FilterPanel";
import { FilterSheet } from "./FilterSheet";
import { useFavorites } from "./FavoritesProvider";

const DAY_TO_DATES: Record<string, string[]> = {
  today: ["2026-09-18"],
  tomorrow: ["2026-09-19"],
  weekend: ["2026-09-19", "2026-09-20", "2026-09-21"],
};

export function DiscoverApp({ events }: { events: LocalEvent[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>("date");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<LocalEvent | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const { isFavorite, count: favoritesCount } = useFavorites();

  const featured = useMemo(() => events.find((e) => e.isFeatured) ?? events[0], [events]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const allowedDates = filters.day === "any" ? null : DAY_TO_DATES[filters.day];

    const result = events.filter((event) => {
      if (category !== "All" && event.category !== category) return false;
      if (showFavoritesOnly && !isFavorite(event.id)) return false;
      if (query) {
        const haystack = `${event.title} ${event.venue}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      if (allowedDates && !allowedDates.includes(event.isoDate)) return false;
      const priceValue = event.price ?? 0;
      if (priceValue > filters.maxPrice) return false;
      if (event.distanceMiles > filters.maxDistance) return false;
      return true;
    });

    const sorted = [...result].sort((a, b) => {
      if (sortBy === "date") return a.isoDate.localeCompare(b.isoDate);
      if (sortBy === "distance") return a.distanceMiles - b.distanceMiles;
      return (a.price ?? 0) - (b.price ?? 0);
    });

    return sorted;
  }, [events, category, showFavoritesOnly, isFavorite, searchQuery, filters, sortBy]);

  return (
    <>
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        favoritesCount={favoritesCount}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly((v) => !v)}
        onOpenFilters={() => setFiltersOpen(true)}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <Hero event={featured} onOpen={setSelectedEvent} />

        <CategoryChips selected={category} onSelect={setCategory} />

        <div className="flex items-center justify-between gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setFiltersOpen((v) => !v)}
              className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
            >
              <span aria-hidden>⚙️</span>
              Filters
            </button>
            {filtersOpen && (
              <FilterPanel filters={filters} onChange={setFilters} onClose={() => setFiltersOpen(false)} />
            )}
          </div>

          <SortControl value={sortBy} onChange={setSortBy} />
        </div>

        <p className="text-sm text-zinc-500">
          {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"} found
        </p>

        <EventGrid events={filteredEvents} onOpen={setSelectedEvent} />
      </main>

      <FilterSheet
        open={filtersOpen}
        filters={filters}
        onChange={setFilters}
        onClose={() => setFiltersOpen(false)}
      />

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
}

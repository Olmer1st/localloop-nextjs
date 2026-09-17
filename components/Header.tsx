"use client";

import { useState } from "react";

const CITIES = ["Austin, TX", "Denver, CO", "Portland, OR", "Raleigh, NC"];

export function Header({
  searchQuery,
  onSearchChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onOpenFilters,
}: {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onOpenFilters: () => void;
}) {
  const [city, setCity] = useState(CITIES[0]);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <span className="text-lg font-bold tracking-tight text-zinc-900">
          Local<span className="text-fuchsia-600">Loop</span>
        </span>

        {/* Desktop: location selector */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => setCityMenuOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            <span aria-hidden>📍</span>
            {city}
            <span aria-hidden className="text-xs text-zinc-400">▾</span>
          </button>
          {cityMenuOpen && (
            <ul
              role="listbox"
              className="absolute left-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg"
            >
              {CITIES.map((c) => (
                <li key={c}>
                  <button
                    type="button"
                    onClick={() => {
                      setCity(c);
                      setCityMenuOpen(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm text-zinc-700 hover:bg-zinc-50"
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop: search */}
        <div className="hidden flex-1 md:block">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, venues..."
            aria-label="Search events"
            className="w-full max-w-sm rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          />
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 md:flex-none">
          {/* Mobile: search toggle */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Search events"
            aria-pressed={mobileSearchOpen}
            className="rounded-full border border-zinc-200 p-2 text-zinc-600 md:hidden"
          >
            <span aria-hidden>🔍</span>
          </button>

          {/* Mobile: filters */}
          <button
            type="button"
            onClick={onOpenFilters}
            aria-label="Open filters"
            className="rounded-full border border-zinc-200 p-2 text-zinc-600 md:hidden"
          >
            <span aria-hidden>⚙️</span>
          </button>

          <button
            type="button"
            onClick={onToggleFavoritesOnly}
            aria-pressed={showFavoritesOnly}
            aria-label="Show favorites"
            className={`relative rounded-full border p-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
              showFavoritesOnly
                ? "border-rose-300 bg-rose-50 text-rose-500"
                : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
            }`}
          >
            <span aria-hidden>{showFavoritesOnly ? "♥" : "♡"}</span>
            {favoritesCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-semibold text-white">
                {favoritesCount}
              </span>
            )}
          </button>

          <div
            aria-hidden
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white"
          >
            VM
          </div>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-zinc-100 px-4 py-3 md:hidden">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events, venues..."
            aria-label="Search events"
            autoFocus
            className="w-full rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          />
        </div>
      )}
    </header>
  );
}

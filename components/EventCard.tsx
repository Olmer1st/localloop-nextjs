"use client";

import type { LocalEvent } from "@/lib/types";
import { useFavorites } from "./FavoritesProvider";
import { EventImage } from "./EventImage";

function formatPrice(price: number | null) {
  return price === null ? "Free" : `$${price}`;
}

export function EventCard({
  event,
  onOpen,
}: {
  event: LocalEvent;
  onOpen: (event: LocalEvent) => void;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(event.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => onOpen(event)}
        className="text-left focus:outline-none"
        aria-label={`View details for ${event.title}`}
      >
        <EventImage category={event.category} aspect="square" />
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {event.dayLabel} &middot; {event.timeLabel}
        </p>

        <div className="flex items-start justify-between gap-2">
          <button
            type="button"
            onClick={() => onOpen(event)}
            className="min-w-0 flex-1 text-left"
          >
            <h3 className="line-clamp-2 min-w-0 text-base font-semibold leading-snug text-zinc-900 focus:outline-none">
              {event.title}
            </h3>
          </button>

          <button
            type="button"
            onClick={() => toggleFavorite(event.id)}
            aria-pressed={favorited}
            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
            className="shrink-0 rounded-full border border-zinc-200 p-1.5 text-lg leading-none text-zinc-400 transition-colors hover:border-rose-300 hover:text-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
          >
            <span aria-hidden>{favorited ? "♥" : "♡"}</span>
          </button>
        </div>

        <p className="truncate text-sm text-zinc-500">{event.venue}</p>

        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="text-zinc-500">{event.distanceMiles.toFixed(1)} mi</span>
          <span className="font-semibold text-zinc-900">{formatPrice(event.price)}</span>
        </div>
      </div>
    </article>
  );
}

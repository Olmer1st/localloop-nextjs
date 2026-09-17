"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { LocalEvent } from "@/lib/types";
import { useFavorites } from "./FavoritesProvider";
import { EventImage } from "./EventImage";

function formatPrice(price: number | null) {
  return price === null ? "Free" : `$${price}`;
}

export function EventModal({
  event,
  onClose,
}: {
  event: LocalEvent | null;
  onClose: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Body scroll lock, scoped to this effect's own lifetime so it always
  // releases in step with the modal actually being open.
  useEffect(() => {
    if (!event) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [event]);

  useEffect(() => {
    if (!event) return;
    closeButtonRef.current?.focus();
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [event]);

  useEffect(() => {
    if (!event) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  const favorited = isFavorite(event.id);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close event details"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        className="relative flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-zinc-700 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
        >
          ✕
        </button>

        <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto">
          <EventImage category={event.category} aspect={event.imageAspect} className="rounded-none" />

          <div className="flex flex-col gap-4 p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold leading-snug text-zinc-900">{event.title}</h2>
              <button
                type="button"
                onClick={() => toggleFavorite(event.id)}
                aria-pressed={favorited}
                aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                className="shrink-0 rounded-full border border-zinc-200 p-2 text-xl leading-none text-zinc-400 transition-colors hover:border-rose-300 hover:text-rose-500"
              >
                <span aria-hidden>{favorited ? "♥" : "♡"}</span>
              </button>
            </div>

            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-zinc-500">Date &amp; time</dt>
                <dd className="font-medium text-zinc-900">
                  {event.dayLabel}, {event.timeLabel}
                </dd>
              </div>
              <div>
                <dt className="text-zinc-500">Venue</dt>
                <dd className="font-medium text-zinc-900">{event.venue}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Distance</dt>
                <dd className="font-medium text-zinc-900">{event.distanceMiles.toFixed(1)} mi</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Price</dt>
                <dd className="font-medium text-zinc-900">{formatPrice(event.price)}</dd>
              </div>
            </dl>

            <p className="text-sm leading-relaxed text-zinc-600">{event.description}</p>
          </div>
        </div>

        <div className="shrink-0 border-t border-zinc-100 p-4">
          <button
            type="button"
            className="w-full rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Get Tickets
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

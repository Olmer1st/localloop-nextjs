import type { LocalEvent } from "@/lib/types";
import { EventCard } from "./EventCard";

export function EventGrid({
  events,
  onOpen,
}: {
  events: LocalEvent[];
  onOpen: (event: LocalEvent) => void;
}) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-16 text-center">
        <p className="text-base font-medium text-zinc-700">No events match your filters</p>
        <p className="mt-1 text-sm text-zinc-500">Try widening your price, day, or distance filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} event={event} onOpen={onOpen} />
      ))}
    </div>
  );
}

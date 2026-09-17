import type { LocalEvent } from "@/lib/types";
import { CATEGORY_STYLE } from "@/lib/categories";

export function Hero({ event, onOpen }: { event: LocalEvent; onOpen: (event: LocalEvent) => void }) {
  const style = CATEGORY_STYLE[event.category];
  return (
    <section
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${style.gradient} px-6 py-10 text-white sm:px-10 sm:py-14`}
    >
      <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
        Featured this weekend
      </p>
      <h1 className="mt-2 max-w-xl text-2xl font-bold leading-tight sm:text-4xl">{event.title}</h1>
      <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">
        {event.dayLabel} &middot; {event.timeLabel} &middot; {event.venue}
      </p>
      <button
        type="button"
        onClick={() => onOpen(event)}
        className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        View details
      </button>
    </section>
  );
}

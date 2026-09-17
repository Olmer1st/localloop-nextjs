import { DiscoverApp } from "@/components/DiscoverApp";
import { EVENTS } from "@/lib/events";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50">
      <DiscoverApp events={EVENTS} />
    </div>
  );
}

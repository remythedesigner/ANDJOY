import VCard from '../molecules/VCard';
import SectionHeader from '../atoms/SectionHeader';
import type { Event } from '../../utils/types';

interface EventsSectionProps {
  iconSrc: string;
  title: string;
  events: Event[];
  id?: string;
  onCardClick?: () => void;
}

export default function EventsSection({ iconSrc, title, events, id, onCardClick }: EventsSectionProps) {
  return (
    <section className="flex flex-col gap-0 py-6" aria-labelledby={id}>
      <SectionHeader icon={iconSrc} title={title} />

      {/* Horizontal scroll list */}
      <div
        className="flex gap-4 pl-6 pr-6 pt-3 pb-5 -mb-5 overflow-x-auto scrollbar-hide"
        role="list"
      >
        {events.map((event) => (
          <div key={event.id} role="listitem">
            <VCard event={event} onClick={onCardClick} />
          </div>
        ))}
      </div>
    </section>
  );
}

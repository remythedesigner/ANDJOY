import type { Review } from '../../utils/types';

interface ReviewCardProps {
  review: Review;
  onEventClick?: () => void;
}

export default function ReviewCard({ review, onEventClick }: ReviewCardProps) {
  const { author, authorImage, authorGradient, timeAgo, emoji, text, eventTitle, eventImage } = review;

  return (
    <article
      className="bg-[#FDFAF9] rounded-[24px] shrink-0 w-[280px] p-4 flex flex-col gap-0"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div
          className="rounded-full p-[2.5px] shrink-0"
          style={{ background: authorGradient }}
        >
          <div className="border-[2px] border-white rounded-full size-10 overflow-hidden">
            <img
              src={authorImage}
              alt={author}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-sans font-bold text-[14px] text-dark leading-tight block">{author}</span>
          <span className="font-sans text-[12px] text-muted leading-tight">{timeAgo}</span>
        </div>
        <span className="text-[22px] leading-none shrink-0" role="img" aria-label="reaction">{emoji}</span>
      </div>

      {/* Review text */}
      <p className="font-['Bodoni_Moda'] text-[14px] leading-[1.6] text-dark/80 mt-3 mb-4">
        {text}
      </p>

      {/* Event link card */}
      <button
        onClick={onEventClick}
        className="mt-auto relative rounded-[16px] overflow-hidden w-full h-[88px] active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary text-left"
      >
        <img
          src={eventImage}
          alt={eventTitle}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="relative flex flex-col justify-center h-full px-4 gap-1">
          <p className="font-sans font-bold text-[13px] leading-tight text-white">
            {eventTitle}
          </p>
          <p className="font-sans text-[11px] font-semibold text-white/70">
            Voir l'événement →
          </p>
        </div>
      </button>
    </article>
  );
}

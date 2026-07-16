import type { Review } from '../../utils/types';

interface ReviewCardProps {
  review: Review;
  onEventClick?: () => void;
  onAuthorClick?: () => void;
}

export default function ReviewCard({ review, onEventClick, onAuthorClick }: ReviewCardProps) {
  const { author, authorImage, authorGradient, timeAgo, emoji, text, eventTitle, eventImage } = review;

  return (
    <article
      className="bg-surface rounded-3xl shrink-0 w-[280px] p-4 flex flex-col gap-0"
    >
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onAuthorClick}
          disabled={!onAuthorClick}
          className={`rounded-full shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-70 transition-opacity ${onAuthorClick ? 'p-[2.5px]' : ''} disabled:pointer-events-none`}
          style={onAuthorClick ? { background: 'linear-gradient(135deg, #8B5CF6 0%, rgba(139,92,246,0.25) 100%)' } : undefined}
          aria-label={`Voir le profil de ${author}`}
        >
          <div className={`${onAuthorClick ? 'border-[2px] border-white' : ''} rounded-full size-10 overflow-hidden`}>
            <img
              src={authorImage}
              alt={author}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </button>
        <div className="flex-1 min-w-0">
          <span className="typo-title text-dark block">{author}</span>
          <span className="typo-caption text-muted">{timeAgo}</span>
        </div>
        <span className="text-[22px] leading-none shrink-0" role="img" aria-label="reaction">{emoji}</span>
      </div>

      {/* Review text */}
      <p className="typo-review text-dark-warm mt-3 mb-4">
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
          <p className="typo-title text-white">
            {eventTitle}
          </p>
          <p className="typo-micro text-white/70">
            Voir l'événement →
          </p>
        </div>
      </button>
    </article>
  );
}

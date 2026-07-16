interface PriceBadgeSProps {
  price: string;
  originalPrice?: string;
  className?: string;
  /** Backdrop the badge sits on — controls the old-price text color so it stays legible. */
  surface?: 'photo' | 'card';
}

export default function PriceBadgeS({ price, originalPrice, className = '', surface = 'photo' }: PriceBadgeSProps) {
  if (originalPrice) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="bg-accent-coral text-white typo-chip px-2 py-1 rounded-[14px] whitespace-nowrap">
          {price}
        </span>
        <span className={`font-sans font-semibold text-[10px] line-through whitespace-nowrap ${surface === 'photo' ? 'text-white/55' : 'text-muted'}`}>
          {originalPrice}
        </span>
      </div>
    );
  }

  return (
    <span className={`bg-primary-light/75 text-dark typo-chip px-2 py-1 rounded-[14px] whitespace-nowrap ${className}`}>
      {price}
    </span>
  );
}

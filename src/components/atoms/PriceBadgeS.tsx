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
        <span className="bg-accent-coral/90 text-white typo-chip tracking-[0.144px] uppercase px-2 py-1 rounded-full whitespace-nowrap">
          {price}
        </span>
        <span className={`font-sans font-bold text-[12px] line-through whitespace-nowrap ${surface === 'photo' ? 'text-white' : 'text-muted'}`}>
          {originalPrice}
        </span>
      </div>
    );
  }

  return (
    <span className={`bg-primary-light/90 text-dark typo-chip tracking-[0.144px] uppercase px-2 py-1 rounded-full whitespace-nowrap ${className}`}>
      {price}
    </span>
  );
}

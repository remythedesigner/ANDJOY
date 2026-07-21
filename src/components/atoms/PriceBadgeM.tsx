interface PriceBadgeMProps {
  price: string;
  originalPrice?: string;
  className?: string;
}

export default function PriceBadgeM({ price, originalPrice, className = '' }: PriceBadgeMProps) {
  if (originalPrice) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="bg-accent-coral text-white font-sans font-extrabold text-[16px] px-4 py-2 rounded-full whitespace-nowrap">
          {price}
        </span>
        <span className="text-white font-sans font-bold text-[12px] line-through whitespace-nowrap">
          {originalPrice}
        </span>
      </div>
    );
  }

  return (
    <span className={`bg-primary-light/80 text-dark font-sans font-extrabold text-[16px] px-4 py-2 rounded-full whitespace-nowrap ${className}`}>
      {price}
    </span>
  );
}

import type { Event } from '../../utils/types';
import { ASSETS } from '../../utils/data';
import { getCategoryEmoji } from '../../utils/categories';
import PriceBadgeS from '../atoms/PriceBadgeS';

interface VCardProps {
  event: Event;
  onClick?: () => void;
  geoGranted?: boolean;
}

export default function VCard({ event, onClick, geoGranted = false }: VCardProps) {
  const { image, category, title, date, location, price, originalPrice, badge, badgeVariant } = event;
  const place = geoGranted ? location : location.split(' · ')[0];

  return (
    <article
      className="bg-white rounded-3xl shadow-card shrink-0 w-[185px] overflow-hidden flex flex-col cursor-pointer active:opacity-80 transition-opacity"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {/* Image area */}
      <div className="h-[150px] relative shrink-0">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {/* Scarcity / New badge (top right) */}
        {badge && badgeVariant === 'scarcity' && (
          <div className="absolute top-2 left-1/4 right-0 mx-auto w-fit">
            <span className="bg-accent-orange/80 text-white text-[12px] font-semibold font-sans px-2 py-1 rounded-full whitespace-nowrap">
              {badge}
            </span>
          </div>
        )}
        {badge && badgeVariant === 'new' && (
          <div className="absolute top-2 right-2">
            <span className="bg-accent-purple/80 text-white text-[12px] font-bold font-sans px-2 py-1 rounded-full whitespace-nowrap">
              {badge}
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-2 left-2">
          <PriceBadgeS price={price} originalPrice={originalPrice} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-1">
        <p className="typo-label text-accent-coral">
          {getCategoryEmoji(category)} {category}
        </p>
        <p className="typo-title text-dark">
          {title}
        </p>
        <div className="flex items-center gap-1">
          <img src={ASSETS.icons.clockSmall} alt="" aria-hidden="true" className="size-3 shrink-0" />
          <span className="typo-caption text-dark-warm whitespace-nowrap">
            {date}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <img src={ASSETS.icons.pinSmall} alt="" aria-hidden="true" className="size-3 shrink-0" />
          <span className="typo-caption text-dark-warm whitespace-nowrap">
            {place}
          </span>
        </div>
      </div>
    </article>
  );
}

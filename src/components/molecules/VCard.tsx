import type { Event } from '../../utils/types';
import { ASSETS } from '../../utils/data';
import { getCategoryEmoji } from '../../utils/categories';

interface VCardProps {
  event: Event;
  onClick?: () => void;
}

export default function VCard({ event, onClick }: VCardProps) {
  const { image, category, title, date, location, price, originalPrice, badge, badgeVariant } = event;

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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent to-[60%]" />

        {/* Scarcity / New badge (top right) */}
        {badge && badgeVariant === 'scarcity' && (
          <div className="absolute top-2 left-1/4 right-0 mx-auto w-fit">
            <span className="bg-[#f5a623] text-white text-[12px] font-semibold font-sans px-2 py-1 rounded-full whitespace-nowrap">
              {badge}
            </span>
          </div>
        )}
        {badge && badgeVariant === 'new' && (
          <div className="absolute top-2 right-2">
            <span className="bg-accent-purple text-white text-[12px] font-bold font-sans px-2 py-1 rounded-[14px] whitespace-nowrap">
              {badge}
            </span>
          </div>
        )}

        {/* Price badge */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2">
          {originalPrice ? (
            <>
              <span className="bg-[#FF6366] text-white text-[12px] font-bold font-sans px-2 py-1 rounded-[14px] whitespace-nowrap">
                {price}
              </span>
              <span className="text-white/55 text-[10px] font-semibold font-sans line-through whitespace-nowrap">
                {originalPrice}
              </span>
            </>
          ) : (
            <span className="bg-black/45 text-white text-[12px] font-bold font-sans px-2 py-1 rounded-[14px] whitespace-nowrap">
              {price}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-0">
        <p className="typo-label text-[#FF6366]">
          {getCategoryEmoji(category)} {category}
        </p>
        <p className="typo-title text-dark mt-1">
          {title}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <img src={ASSETS.icons.clockSmall} alt="" aria-hidden="true" className="w-[11px] h-[11px] shrink-0" />
          <span className="typo-caption text-muted whitespace-nowrap">
            {date}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <img src={ASSETS.icons.pinSmall} alt="" aria-hidden="true" className="w-[11px] h-[11px] shrink-0" />
          <span className="typo-caption text-muted whitespace-nowrap">
            {location}
          </span>
        </div>
      </div>
    </article>
  );
}

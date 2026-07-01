import { useState } from 'react';
import { ASSETS, nearbyEvents } from '../../utils/data';
import type { Event } from '../../utils/types';
import { getCategoryEmoji } from '../../utils/categories';

function NearbyCard({ image, category, title, location, date, price, onClick }: Event & { onClick?: () => void }) {
  return (
    <article
      className="bg-white rounded-2xl flex items-center gap-3 p-3 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] cursor-pointer active:opacity-80 transition-opacity"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <img src={image} alt={title} className="size-20 rounded-xl object-cover shrink-0" loading="lazy" />
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <p className="typo-label text-[#FF6366]">{getCategoryEmoji(category)} {category}</p>
        <p className="typo-title text-dark leading-[18px] line-clamp-2">{title}</p>
        <div className="flex items-center gap-1 mt-1">
          <img src={ASSETS.icons.pinSmall} alt="" aria-hidden="true" className="size-[11px] shrink-0" />
          <span className="typo-caption text-muted truncate">{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <img src={ASSETS.icons.clockSmall} alt="" aria-hidden="true" className="size-[11px] shrink-0" />
          <span className="typo-caption text-muted truncate">{date}</span>
        </div>
      </div>
      <span className="typo-title text-dark shrink-0">{price}</span>
    </article>
  );
}

interface GeoBlockProps {
  onCardClick?: () => void;
  onViewMap?: () => void;
}

export default function GeoBlock({ onCardClick, onViewMap }: GeoBlockProps) {
  const [granted, setGranted] = useState(false);

  function handleGeoRequest() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => setGranted(true),
        () => setGranted(true),
      );
    } else {
      setGranted(true);
    }
  }

  if (granted) {
    return (
      <section className="flex flex-col gap-4 py-6">
        {/* Section header with compass icon */}
        <div className="flex items-center gap-2 px-6">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path opacity="0.2" d="M6.75 13.5C10.4779 13.5 13.5 10.4779 13.5 6.75C13.5 3.02208 10.4779 0 6.75 0C3.02208 0 0 3.02208 0 6.75C0 10.4779 3.02208 13.5 6.75 13.5Z" fill="#16A34A"/>
            <path d="M6.75 12.6562C10.0119 12.6562 12.6562 10.0119 12.6562 6.75C12.6562 3.48807 10.0119 0.84375 6.75 0.84375C3.48807 0.84375 0.84375 3.48807 0.84375 6.75C0.84375 10.0119 3.48807 12.6562 6.75 12.6562Z" stroke="#16A34A" strokeWidth="1.26563"/>
            <path d="M10.7291 3.42657L9.05791 7.15298L8.31575 5.45164L6.76913 4.42532L10.7291 3.42657Z" fill="#16A34A"/>
            <path d="M6.75 8.01562C7.44899 8.01562 8.01562 7.44899 8.01562 6.75C8.01562 6.05101 7.44899 5.48438 6.75 5.48438C6.05101 5.48438 5.48438 6.05101 5.48438 6.75C5.48438 7.44899 6.05101 8.01562 6.75 8.01562Z" fill="#16A34A"/>
          </svg>
          <h2 className="typo-h3 text-dark whitespace-nowrap">Près de toi</h2>
        </div>

        {/* Individual cards */}
        <div className="flex flex-col gap-3 px-6">
          {nearbyEvents.map(event => (
            <NearbyCard key={event.id} {...event} onClick={onCardClick} />
          ))}
        </div>

        {/* View map CTA */}
        <div className="px-6">
          <button
            onClick={onViewMap}
            className="w-full h-12 bg-primary text-white rounded-2xl font-sans font-bold text-[15px] flex items-center justify-center gap-2 active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <img src={import.meta.env.BASE_URL + "icons/tab-carte.svg"} alt="" aria-hidden="true" className="size-[18px] brightness-0 invert" />
            Voir la carte
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-6" aria-label="Activités proches de toi">
      <div
        className="bg-[#FDFAF9] rounded-3xl overflow-hidden"
      >
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="bg-white rounded-2xl size-12 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="8" fill="#16a34a" opacity="0.2"/>
                <circle cx="10" cy="10" r="7" fill="none" stroke="#16a34a" strokeWidth="1.5"/>
                <path d="M10 2 L12 9 L10 8 L8 9 Z" fill="#16a34a"/>
                <circle cx="10" cy="10" r="1.5" fill="#16a34a"/>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="typo-h3 leading-[21px] text-dark">Près de toi</h3>
              <p className="typo-body text-dark">
                Découvre ce qu'il se passe autour de toi en temps réel.
              </p>
            </div>
          </div>
          <button
            onClick={handleGeoRequest}
            className="w-full bg-primary flex items-center justify-center gap-2 py-4 rounded-2xl focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:opacity-80 transition-opacity"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
              <circle cx="7.5" cy="7.5" r="3" stroke="white" strokeWidth="1.4"/>
              <path d="M7.5 1v2M7.5 12v2M1 7.5h2M12 7.5h2" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            <span className="typo-title text-white">Autoriser la géolocalisation</span>
          </button>
        </div>
      </div>
    </section>
  );
}

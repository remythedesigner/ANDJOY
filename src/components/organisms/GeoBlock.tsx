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
        {/* Section header with green pin icon */}
        <div className="flex items-center gap-2 px-6">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
            <path d="M7.5 1C5.01 1 3 3.01 3 5.5C3 8.87 7.5 14 7.5 14C7.5 14 12 8.87 12 5.5C12 3.01 9.99 1 7.5 1Z" stroke="#16a34a" strokeWidth="1.2" strokeLinejoin="round"/>
            <circle cx="7.5" cy="5.5" r="1.75" stroke="#16a34a" strokeWidth="1.2"/>
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
                <path d="M10 2C7.24 2 5 4.24 5 7C5 10.75 10 18 10 18C10 18 15 10.75 15 7C15 4.24 12.76 2 10 2Z" stroke="#16a34a" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="10" cy="7" r="2" stroke="#16a34a" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="typo-h3 leading-[21px] text-dark">Près de toi</h3>
              <p className="typo-body text-dark">
                Découvre les activités à moins de 2 km autour de toi, en temps réel.
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

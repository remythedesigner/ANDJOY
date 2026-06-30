import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCategoryEmoji } from '../utils/categories';
import MemberProfileSheet from '../components/organisms/MemberProfileSheet';
import { communityMembers } from '../utils/data';
import type { CommunityMember } from '../utils/types';

const VENUE = { lat: 48.8556, lng: 2.3722 };

const venueMarker = L.divIcon({
  html: `<div style="width:14px;height:14px;border-radius:50%;background:#5170ff;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)"></div>`,
  className: '',
  iconAnchor: [7, 7],
});

const IMAGES = [
  'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=600&fit=crop',
];

const REMAINING_SEATS = 6;

const INCLUDED = ["Accès à l'exposition (1h)", 'Audioguide'];
const EXCLUDED = ['Photos professionnelles', 'Boutique'];

const USER_REVIEWS = [
  {
    id: 'marcus',
    name: 'Marcus',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    date: 'Mars 2025',
    rating: 5,
    text: "Une soirée incroyable, j'ai ri pendant 2h ! Le niveau des artistes était vraiment top.",
  },
  {
    id: 'lea',
    name: 'Léa',
    avatar: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=100&h=100&fit=crop',
    date: 'Fév. 2025',
    rating: 5,
    text: "Une parenthèse hors du temps, je recommande à 1000% pour décompresser.",
  },
];

interface EventDetailProps {
  onBack: () => void;
  onBook: (places: number, remainingSeats: number) => void;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 1L7.3 4.3H11L8.2 6.5L9.4 10L6 7.8L2.6 10L3.8 6.5L1 4.3H4.7L6 1Z"
            fill={i < rating ? '#f5a623' : '#e2deda'}
          />
        </svg>
      ))}
    </div>
  );
}

export default function EventDetail({ onBack, onBook }: EventDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [places, setPlaces] = useState(1);
  const [profileMember, setProfileMember] = useState<CommunityMember | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped right — go to previous image
        setActiveImage(i => (i - 1 + IMAGES.length) % IMAGES.length);
      } else {
        // Swiped left — go to next image
        setActiveImage(i => (i + 1) % IMAGES.length);
      }
    }
    touchStartX.current = null;
  }

  function scrollToReviews() {
    reviewsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-28">

        {/* ── Hero image ── */}
        <div
          className="relative h-[324px] touch-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={IMAGES[activeImage]}
            alt="Expo Immersive · Lumières d'Orient"
            className="absolute inset-0 w-full h-full object-cover select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          <button
            onClick={onBack}
            className="absolute left-4 bg-white rounded-full size-9 flex items-center justify-center shadow-[0px_2px_8px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ top: 'calc(max(12px, env(safe-area-inset-top)) + 8px)' }}
            aria-label="Retour"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 14L6 9L11 4" stroke="#1a1a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className="absolute right-4 bg-white rounded-full size-9 flex items-center justify-center shadow-[0px_2px_8px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ top: 'calc(max(12px, env(safe-area-inset-top)) + 8px)' }}
            aria-label="Partager"
            onClick={() => {
              const data = { title: 'Expo Immersive : Lumières d\'Orient', text: 'Découvre cette activité sur &JOY !', url: window.location.href };
              if (navigator.share) { navigator.share(data); } else { navigator.clipboard?.writeText(window.location.href); }
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="12" cy="2.5" r="1.5" stroke="#1a1a24" strokeWidth="1.3" />
              <circle cx="3" cy="7.5" r="1.5" stroke="#1a1a24" strokeWidth="1.3" />
              <circle cx="12" cy="12.5" r="1.5" stroke="#1a1a24" strokeWidth="1.3" />
              <path d="M4.5 6.8L10.5 3.2M4.5 8.2L10.5 11.8" stroke="#1a1a24" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                aria-label={`Image ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${i === activeImage ? 'w-4 h-[5px] bg-white' : 'size-[5px] bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* ── Thumbnails ── */}
        <div className="flex gap-2 px-4 mt-3">
          {IMAGES.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`rounded-xl overflow-hidden shrink-0 transition-all ${i === activeImage ? 'ring-2 ring-primary' : 'ring-1 ring-black/10'}`}
              aria-label={`Voir image ${i + 1}`}
            >
              <img src={img} alt="" className="size-[60px] object-cover" />
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        <div className="px-4 mt-5 flex flex-col">

          {/* Category + Title + Rating */}
          <div className="flex flex-col gap-2 mb-5">
            <p className="typo-label text-[#FF6366]">{getCategoryEmoji('Expositions')} EXPOSITIONS</p>
            <h1 className="font-sans font-extrabold text-[22px] text-dark leading-[1.2]">
              Expo Immersive : Lumières d'Orient
            </h1>
          </div>

          {/* Info chips */}
          <div className="flex flex-wrap gap-2 mb-5">
            <div className="flex items-center gap-1.5 bg-white/70 border border-black/[0.06] rounded-full px-3 py-1.5">
              <span className="text-[11px] leading-none">⭐</span>
              <span className="font-sans font-medium text-[12px] text-dark whitespace-nowrap">4.9</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 border border-black/[0.06] rounded-full px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#9090a0" strokeWidth="1.2" />
                <path d="M6 3.5V6L7.5 7.5" stroke="#9090a0" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-sans font-medium text-[12px] text-dark whitespace-nowrap">Demain · 10:00 - 20:00</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 border border-black/[0.06] rounded-full px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1.5C4.3 1.5 3 2.8 3 4.5C3 6.5 6 10.5 6 10.5C6 10.5 9 6.5 9 4.5C9 2.8 7.7 1.5 6 1.5ZM6 5.5C5.4 5.5 5 5.1 5 4.5C5 3.9 5.4 3.5 6 3.5C6.6 3.5 7 3.9 7 4.5C7 5.1 6.6 5.5 6 5.5Z" fill="#9090a0"/>
              </svg>
              <span className="font-sans font-medium text-[12px] text-dark whitespace-nowrap">Paris 11e</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/70 border border-black/[0.06] rounded-full px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="#9090a0" strokeWidth="1.2" />
                <path d="M6 3V6H9" stroke="#9090a0" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="font-sans font-medium text-[12px] text-dark">1h</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#fff0f2] border border-[#d9547a]/20 rounded-full px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="3.5" r="1.8" stroke="#d9547a" strokeWidth="1.2" />
                <path d="M1.5 10C1.5 8.3 3.5 7 6 7C8.5 7 10.5 8.3 10.5 10" stroke="#d9547a" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="font-sans font-bold text-[12px] text-[#d9547a] whitespace-nowrap">6 places restantes</span>
            </div>
          </div>

          <div className="h-px bg-black/[0.06] mb-5" />

          {/* Description */}
          <section className="mb-5">
            <h2 className="font-sans font-bold text-[16px] text-dark mb-3">Description</h2>
            <p className="font-sans text-[14px] text-dark/75 leading-[1.65]">
              Une heure d'immersion totale dans des projections monumentales mêlant lumières, musique et art numérique. Idéal pour une sortie originale en couple, en famille ou entre amis. Le parcours est libre — reste aussi longtemps que tu veux.
            </p>
            <p className="font-sans text-[14px] text-dark/75 leading-[1.65] mt-3">
              Une immersion pensée pour réveiller la curiosité, où chaque détail raconte une histoire. Tu peux flâner à ton rythme, te laisser guider par les médiations, ou simplement profiter du lieu. Idéal pour une parenthèse inspirante en solo, en couple ou pour relancer la conversation entre amis.
            </p>
          </section>

          <div className="h-px bg-black/[0.06] mb-5" />

          {/* Inclus / Non inclus */}
          <section className="mb-5">
            <h2 className="font-sans font-bold text-[16px] text-dark mb-3">Inclus</h2>
            <div className="flex flex-col gap-2.5">
              {INCLUDED.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7" fill="#22c55e" fillOpacity="0.12" />
                    <path d="M5 8L7 10L11 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-sans text-[14px] text-dark">{item}</span>
                </div>
              ))}
            </div>
            <h2 className="font-sans font-bold text-[16px] text-dark mb-3 mt-5">Non inclus</h2>
            <div className="flex flex-col gap-2.5">
              {EXCLUDED.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7" fill="#ef4444" fillOpacity="0.1" />
                    <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="font-sans text-[14px] text-dark">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <div className="h-px bg-black/[0.06] mb-5" />

          {/* Bon à savoir */}
          <section className="mb-5">
            <h2 className="font-sans font-bold text-[16px] text-dark mb-2">Bon à savoir</h2>
            <p className="font-sans text-[14px] text-dark/70 leading-[1.65]">
              Accessible PMR. Pas de vestiaire. Photos autorisées sans flash.
            </p>
          </section>

          <div className="h-px bg-black/[0.06] mb-5" />

          {/* Lieu */}
          <section className="mb-5">
            <h2 className="font-sans font-bold text-[16px] text-dark mb-3">Lieu</h2>
            <div className="mb-3">
              <p className="font-sans font-bold text-[14px] text-dark">Atelier des Lumières</p>
              <p className="font-sans text-[13px] text-muted mt-0.5">38 Rue Saint-Maur, 75011 Paris</p>
              <a
                href="https://maps.apple.com/?q=Atelier+des+Lumi%C3%A8res+Paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-sans font-bold text-[13px] text-primary mt-2 focus-visible:outline-none"
              >
                Ouvrir dans Maps →
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden h-[180px] relative">
              <MapContainer
                center={[VENUE.lat, VENUE.lng]}
                zoom={15}
                scrollWheelZoom={false}
                zoomControl={false}
                style={{ height: '180px', width: '100%', position: 'relative', zIndex: 0 }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[VENUE.lat, VENUE.lng]} icon={venueMarker} />
              </MapContainer>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1.5" y="4.5" width="15" height="10" rx="2" fill="#5170ff" />
                <path d="M4.5 14.5V11L6.5 6.5L9 11L11.5 6.5L13.5 11V14.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-sans text-[13px] text-dark">Saint-Ambroise (M9)</span>
            </div>
          </section>

          <div className="h-px bg-black/[0.06] mb-5" />

          {/* ── Avis (team + user) ── */}
          <section ref={reviewsRef} className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-sans font-bold text-[16px] text-dark">Avis</h2>
            </div>

            {/* Team review card */}
            <div className="bg-[#FBEEE8] border border-black/[0.05] rounded-3xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => setProfileMember(communityMembers.find(m => m.name === 'Sam') ?? null)}
                  className="rounded-full p-[2.5px] shrink-0 focus-visible:outline-none active:opacity-70 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, rgba(139,92,246,0.25) 100%)' }}
                  aria-label="Voir le profil de Sam"
                >
                  <div className="border-[2px] border-white rounded-full size-10 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=100&h=100&fit=crop"
                      alt="Sam"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-bold text-[14px] text-dark">Sam</p>
                  <p className="font-sans font-medium text-[13px] text-[#8B5CF6]">Rédactrice &JOY</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[22px] leading-none" role="img" aria-label="reaction">🤩</span>
                </div>
              </div>
              <p className="font-['Bodoni_Moda'] text-[14px] text-dark/80 leading-[1.6]">
                "Bluffant. On entre dans un tableau, littéralement. La musique colle parfaitement aux projections, on prend une vraie claque visuelle. Y aller en début de séance pour profiter des meilleurs coins."
              </p>
              <p className="font-sans text-[11px] text-muted mt-3">Testé le 12 juin 2026</p>
            </div>
          </section>

          <div className="flex gap-4 -mx-4 px-4 pb-5 -mb-5 overflow-x-auto scrollbar-hide mb-5">
            {USER_REVIEWS.map((review) => (
              <div key={review.id} className="bg-white border border-black/[0.05] rounded-3xl p-4 shrink-0 w-[260px] flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <img src={review.avatar} alt={review.name} className="size-10 rounded-full object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans font-bold text-[14px] text-dark leading-tight">{review.name}</p>
                    <p className="font-sans text-[12px] text-muted leading-tight">{review.date}</p>
                  </div>
                  <Stars rating={review.rating} />
                </div>
                <p className="font-['Bodoni_Moda'] text-[14px] text-dark/80 leading-[1.6]">"{review.text}"</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-black/[0.06] mb-5" />

          {/* Nombre de places */}
          <section className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-sans font-bold text-[16px] text-dark">Nombre de places</h2>
                <p className="font-sans text-[12px] text-muted mt-0.5">6 places restantes</p>
              </div>
              <div className="flex items-center gap-3 bg-white border border-black/[0.06] rounded-2xl px-3 py-2">
                <button
                  onClick={() => setPlaces(p => Math.max(1, p - 1))}
                  disabled={places <= 1}
                  className="size-8 rounded-xl bg-black/[0.04] flex items-center justify-center font-sans font-bold text-[18px] text-dark disabled:opacity-25 focus-visible:outline-none active:opacity-60 transition-opacity"
                  aria-label="Retirer une place"
                >
                  −
                </button>
                <span className="font-sans font-bold text-[18px] text-dark w-5 text-center tabular-nums">{places}</span>
                <button
                  onClick={() => setPlaces(p => Math.min(REMAINING_SEATS, p + 1))}
                  disabled={places >= REMAINING_SEATS}
                  className="size-8 rounded-xl bg-primary flex items-center justify-center font-sans font-bold text-[18px] text-white disabled:opacity-25 focus-visible:outline-none active:opacity-80 transition-opacity"
                  aria-label="Ajouter une place"
                >
                  +
                </button>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* ── Sticky CTA ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#faf4f1]/95 backdrop-blur-sm px-4 pt-3 pb-8 border-t border-black/[0.05]" style={{ zIndex: 1001 }}>
        <button
          onClick={() => onBook(places, REMAINING_SEATS)}
          className="w-full bg-primary text-white rounded-full h-14 font-sans font-bold text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-90 transition-opacity"
        >
          Réserver — 22 €
        </button>
      </div>
      {profileMember && (
        <MemberProfileSheet member={profileMember} onClose={() => setProfileMember(null)} />
      )}
    </div>
  );
}

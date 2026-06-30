import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import AppFooter from '../components/organisms/AppFooter';
import { getCategoryEmoji } from '../utils/categories';

type Tab = 'Accueil' | 'Carte' | 'Billets' | 'Profil';

interface BilletsPageProps {
  onTabChange: (tab: Tab) => void;
}

export interface Booking {
  id: string;
  code: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  address: string;
  lat: number;
  lng: number;
  persons: number;
  price: number;
  image: string;
  past: boolean;
  description: string;
  included: string[];
  excluded: string[];
}

const BOOKINGS: Booking[] = [
  {
    id: '1',
    code: 'E646TT',
    title: "Expo Immersive : Lumières d'Orient",
    category: 'Expositions',
    date: 'Demain',
    time: '10:00 – 20:00',
    location: 'Atelier des Lumières, Paris 11e',
    address: '38 Rue Saint-Maur, 75011 Paris',
    lat: 48.8566,
    lng: 2.3756,
    persons: 1,
    price: 23,
    image: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=500&h=400&fit=crop',
    past: false,
    description: "Une heure d'immersion totale dans des projections monumentales mêlant lumières, musique et art numérique. Idéal pour une sortie originale en couple, en famille ou entre amis. Le parcours est libre — reste aussi longtemps que tu veux.",
    included: ['Entrée exposition', 'Accès libre au parcours', 'Audioguide inclus'],
    excluded: ['Vestiaire', 'Restauration', 'Parking'],
  },
  {
    id: '2',
    code: 'YR92KM',
    title: 'Yoga Rooftop au coucher de soleil',
    category: 'Bien-être',
    date: 'Jeu. 26 juin',
    time: '19:00 – 21:00',
    location: 'Rooftop Perchoir, Paris 11e',
    address: '14 Rue Crespin du Gast, 75011 Paris',
    lat: 48.8632,
    lng: 2.3791,
    persons: 2,
    price: 58,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=400&fit=crop',
    past: false,
    description: "Une session de yoga en plein air sur un rooftop parisien avec vue panoramique sur les toits. Niveau débutant bienvenu, tapis fournis. Le soleil couchant rend cette expérience inoubliable.",
    included: ['Tapis de yoga', "Bouteille d'eau", 'Session photo'],
    excluded: ['Vestiaire', 'Boissons supplémentaires'],
  },
  {
    id: '3',
    code: 'BX44NP',
    title: 'Atelier Poterie Japonaise',
    category: 'Ateliers & initiations',
    date: 'Sam. 7 juin',
    time: '14:00 – 17:00',
    location: 'Studio Argile, Paris 3e',
    address: '12 Rue de Bretagne, 75003 Paris',
    lat: 48.8619,
    lng: 2.3626,
    persons: 1,
    price: 45,
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=400&fit=crop',
    past: true,
    description: "Initie-toi aux techniques ancestrales de la poterie japonaise sous la guidance d'une céramiste professionnelle. Tu repartiras avec ta création une fois cuite.",
    included: ['Matériaux', 'Livraison de la pièce cuite', 'Tablier'],
    excluded: ['Encadrement individuel', 'Pièces supplémentaires'],
  },
  {
    id: '4',
    code: 'QT71ZW',
    title: 'Concert Jazz & Soul en cave voûtée',
    category: 'Musique',
    date: 'Ven. 23 mai',
    time: '20:30 – 23:00',
    location: 'Le Caveau de la Huchette, Paris 5e',
    address: '5 Rue de la Huchette, 75005 Paris',
    lat: 48.8529,
    lng: 2.3469,
    persons: 2,
    price: 36,
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&h=400&fit=crop',
    past: true,
    description: "Une soirée jazz et soul dans l'une des caves les plus mythiques de Paris. Ambiance feutrée, musiciens de haut vol, et cocktails au bar pour une nuit inoubliable.",
    included: ['Entrée concert', 'Première consommation'],
    excluded: ['Consommations supplémentaires', 'Vestiaire'],
  },
];

const pinIcon = new L.DivIcon({
  className: '',
  html: `<div style="width:28px;height:28px;background:#5170ff;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(81,112,255,0.4)"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

// ─── Ticket Detail ───────────────────────────────────────────────────────────

function TicketDetail({ booking, onBack }: { booking: Booking; onBack: () => void }) {
  const [showMore, setShowMore] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  function handleShare() {
    navigator.share?.({
      title: booking.title,
      text: `Mon code de réservation : ${booking.code}`,
    }).catch(() => {});
  }

  function handleCalendar() {
    const title = encodeURIComponent(booking.title);
    const location = encodeURIComponent(booking.address);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&location=${location}`;
    window.open(url, '_blank');
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-8">
        {/* Header */}
        <div className="relative px-5 pt-4 mb-5">
          <button
            onClick={onBack}
            className="size-9 bg-white rounded-full flex items-center justify-center shadow-[0px_2px_8px_rgba(0,0,0,0.10)] focus-visible:outline-none mb-4"
            aria-label="Retour"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 17L6 10L13 3" stroke="#1a1a24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2 mb-1">
            {booking.past && (
              <span className="bg-black/10 text-muted font-sans text-[11px] font-bold rounded-full px-2.5 py-0.5">Passé</span>
            )}
          </div>
          <h1 className="font-sans font-extrabold text-[22px] text-dark leading-tight">{booking.title}</h1>
        </div>

        <div className="px-5 flex flex-col gap-5">
          {/* Ticket card */}
          <div className="rounded-3xl overflow-hidden border border-black/[0.07] shadow-[0px_4px_20px_rgba(0,0,0,0.07)]">
            {/* Main infos */}
            <div className="bg-white px-5 py-4 flex flex-col gap-3.5">
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-muted">
                  <circle cx="7" cy="7" r="5.5" stroke="#9090a0" strokeWidth="1.4" />
                  <path d="M7 4V7L9 9" stroke="#9090a0" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div>
                  <p className="font-sans font-semibold text-[14px] text-dark">{booking.date}</p>
                  <p className="font-sans text-[13px] text-muted">{booking.time}</p>
                </div>
              </div>
              <div className="h-px bg-black/[0.05]" />
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M7 1C5.07 1 3.5 2.57 3.5 4.5C3.5 7 7 13 7 13C7 13 10.5 7 10.5 4.5C10.5 2.57 8.93 1 7 1Z" stroke="#9090a0" strokeWidth="1.4" />
                  <circle cx="7" cy="4.5" r="1.3" stroke="#9090a0" strokeWidth="1.2" />
                </svg>
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-[14px] text-dark">{booking.location}</p>
                  <p className="font-sans text-[13px] text-muted">{booking.address}</p>
                </div>
                <a
                  href={`https://maps.apple.com/?q=${encodeURIComponent(booking.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-primary text-white font-sans font-bold text-[12px] px-3 py-1.5 rounded-full active:opacity-80 transition-opacity focus-visible:outline-none"
                >
                  Y aller
                </a>
              </div>
              <div className="h-px bg-black/[0.05]" />
              <div className="flex items-center gap-3">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="7" cy="4" r="2.2" stroke="#9090a0" strokeWidth="1.4" />
                  <path d="M2 12C2 9.8 4.2 8 7 8C9.8 8 12 9.8 12 12" stroke="#9090a0" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <p className="font-sans font-semibold text-[14px] text-dark">
                  {booking.persons} {booking.persons > 1 ? 'personnes' : 'personne'} · {booking.price.toFixed(2)}€
                </p>
              </div>
            </div>

            {/* Perforated divider */}
            <div className="relative flex items-center bg-white">
              <div className="absolute -left-4 size-8 rounded-full bg-cream" />
              <div className="flex-1 mx-4 border-t-2 border-dashed border-black/[0.08]" />
              <div className="absolute -right-4 size-8 rounded-full bg-cream" />
            </div>

            {/* Booking code */}
            <div className="bg-white px-4 pt-4 pb-5 flex flex-col items-center gap-2">
              <p className="font-sans text-[12px] text-muted uppercase tracking-widest font-medium">Code de réservation</p>
              <div className="flex gap-2 mt-1">
                {booking.code.split('').map((char, i) => (
                  <div
                    key={i}
                    className={`size-10 rounded-xl flex items-center justify-center font-sans font-extrabold text-[20px] ${
                      booking.past ? 'bg-black/[0.05] text-muted' : 'bg-[#eef1ff] text-primary'
                    }`}
                  >
                    {char}
                  </div>
                ))}
              </div>
              <p className="font-sans text-[12px] text-muted text-center leading-[1.5] mt-1">
                {booking.persons} {booking.persons > 1 ? 'personnes' : 'personne'} · {(booking.price * booking.persons).toFixed(2)}€ réglé
              </p>
            </div>
          </div>

          {/* Info note */}
          {!booking.past && (
            <div className="bg-[#eef1ff] rounded-2xl px-4 py-3.5 flex gap-3 items-start">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="7" stroke="#5170ff" strokeWidth="1.6" />
                <path d="M8 7V11" stroke="#5170ff" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="8" cy="5" r="0.8" fill="#5170ff" />
              </svg>
              <p className="font-sans text-[13px] text-[#3a50cc] leading-[1.55]">
                Ton code de confirmation fait office de billet. Présente-le simplement à l'accueil le jour de l'évènement.
              </p>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 h-14 bg-cream rounded-2xl flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-dark active:opacity-70 transition-opacity focus-visible:outline-none"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="14" cy="3" r="2" stroke="#1a1a24" strokeWidth="1.8" />
                <circle cx="4" cy="9" r="2" stroke="#1a1a24" strokeWidth="1.8" />
                <circle cx="14" cy="15" r="2" stroke="#1a1a24" strokeWidth="1.8" />
                <path d="M6 8L12 4.5M6 10L12 13.5" stroke="#1a1a24" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Partager
            </button>
            <button
              onClick={handleCalendar}
              className="flex-1 h-14 bg-cream rounded-2xl flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-dark active:opacity-70 transition-opacity focus-visible:outline-none"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="3" width="16" height="14" rx="3" stroke="#1a1a24" strokeWidth="1.8" />
                <path d="M5 1V4M13 1V4" stroke="#1a1a24" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M1 7H17" stroke="#1a1a24" strokeWidth="1.8" />
                <path d="M5 11H9M5 14H13" stroke="#1a1a24" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Calendrier
            </button>
          </div>

          {/* More info accordion */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-[0px_2px_10px_rgba(0,0,0,0.05)]">
            <button
              onClick={() => setShowMore(s => !s)}
              className="w-full flex items-center justify-between px-5 py-4 focus-visible:outline-none"
            >
              <span className="font-sans font-bold text-[15px] text-dark">Plus d'informations</span>
              <svg
                width="18" height="18" viewBox="0 0 18 18" fill="none"
                className={`transition-transform duration-200 ${showMore ? 'rotate-180' : ''}`}
              >
                <path d="M4 7L9 12L14 7" stroke="#9090a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {showMore && (
              <div className="px-5 pb-5 flex flex-col gap-5 border-t border-black/[0.05]">
                <div className="pt-4">
                  <h3 className="font-sans font-bold text-[14px] text-dark mb-2">Description</h3>
                  <p className="font-sans text-[13px] text-dark/70 leading-[1.65]">{booking.description}</p>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-[14px] text-dark mb-2.5">Inclus</h3>
                  <div className="flex flex-col gap-2">
                    {booking.included.map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                          <circle cx="8" cy="8" r="7" fill="#22c55e" fillOpacity="0.12" />
                          <path d="M5 8L7 10L11 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-sans text-[13px] text-dark">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-sans font-bold text-[14px] text-dark mb-2.5">Non inclus</h3>
                  <div className="flex flex-col gap-2">
                    {booking.excluded.map(item => (
                      <div key={item} className="flex items-center gap-2.5">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                          <circle cx="8" cy="8" r="7" fill="#ef4444" fillOpacity="0.1" />
                          <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="font-sans text-[13px] text-dark">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Review Sheet ─────────────────────────────────────────────────────────────

function ReviewSheet({ booking, onClose }: { booking: Booking; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose}>
      <div
        className="bg-white rounded-t-[32px] px-5 pt-5 pb-10 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="w-10 h-1 rounded-full bg-black/10 mx-auto mb-1" />

        {submitted ? (
          <div className="flex flex-col items-center gap-2 py-6">
            <span className="text-[40px]">🎉</span>
            <p className="font-sans font-bold text-[17px] text-dark text-center">Merci pour ton avis !</p>
            <p className="font-sans text-[13px] text-muted text-center leading-[1.5]">Ton retour nous aide à améliorer &JOY.</p>
            <button
              onClick={onClose}
              className="mt-4 w-full h-12 bg-primary text-white rounded-2xl font-sans font-bold text-[14px] active:opacity-80 transition-opacity focus-visible:outline-none"
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <div>
              <p className="font-sans font-bold text-[17px] text-dark">Ton avis</p>
              <p className="font-sans text-[13px] text-muted mt-0.5">{booking.title}</p>
            </div>

            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className="flex-1 text-[32px] leading-none focus-visible:outline-none transition-transform active:scale-90"
                  aria-label={`${star} étoile${star > 1 ? 's' : ''}`}
                >
                  {star <= (hovered || rating) ? '⭐' : '☆'}
                </button>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Partage ton expérience (optionnel)..."
              rows={3}
              className="w-full bg-cream rounded-2xl px-4 py-3 font-sans text-[14px] text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />

            <button
              onClick={() => { if (rating > 0) setSubmitted(true); }}
              disabled={rating === 0}
              className="w-full h-12 bg-primary text-white rounded-2xl font-sans font-bold text-[14px] disabled:opacity-35 active:opacity-80 transition-opacity focus-visible:outline-none"
            >
              Envoyer mon avis
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────

function BookingCard({ booking, onOpen, onReview }: { booking: Booking; onOpen: () => void; onReview?: () => void }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0px_2px_10px_rgba(0,0,0,0.06)]">
      {/* Big visual */}
      <div className="relative h-[200px]">
        <img
          src={booking.image}
          alt={booking.title}
          className={`w-full h-full object-cover ${booking.past ? 'grayscale opacity-60' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

        {booking.past && (
          <span className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm text-white font-sans text-[11px] font-bold rounded-full px-2.5 py-1">
            Passé
          </span>
        )}

        <div className="absolute bottom-4 left-4 right-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/70">{booking.category}</span>
          <h2 className="font-sans font-extrabold text-[17px] text-white leading-tight mt-0.5">{booking.title}</h2>
        </div>
      </div>

      {/* Main infos + CTA */}
      <div className="px-4 pt-3.5 pb-4 flex items-center gap-3">
        <div className="flex-1 flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4.5" stroke={booking.past ? '#9090a0' : '#1a1a24'} strokeWidth="1.3" />
              <path d="M6 3.5V6L7.5 7.5" stroke={booking.past ? '#9090a0' : '#1a1a24'} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={`font-sans text-[13px] truncate ${booking.past ? 'text-muted' : 'text-dark'}`}>{booking.date} · {booking.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M6 1C4.07 1 2.5 2.57 2.5 4.5C2.5 7 6 11 6 11C6 11 9.5 7 9.5 4.5C9.5 2.57 7.93 1 6 1Z" stroke={booking.past ? '#9090a0' : '#1a1a24'} strokeWidth="1.3" />
              <circle cx="6" cy="4.5" r="1.2" stroke={booking.past ? '#9090a0' : '#1a1a24'} strokeWidth="1.1" />
            </svg>
            <span className={`font-sans text-[13px] truncate ${booking.past ? 'text-muted' : 'text-dark'}`}>{booking.location}</span>
          </div>
        </div>
        {booking.past ? (
          <button
            onClick={onReview}
            className="shrink-0 h-10 px-4 bg-primary text-white rounded-full font-sans font-bold text-[13px] active:opacity-80 transition-opacity focus-visible:outline-none flex items-center gap-1.5"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L8.5 5H13L9.5 7.5L11 11.5L7 9L3 11.5L4.5 7.5L1 5H5.5L7 1Z" fill="white" />
            </svg>
            Donner mon avis
          </button>
        ) : (
          <button
            onClick={onOpen}
            className="shrink-0 h-10 px-4 bg-primary text-white rounded-full font-sans font-bold text-[13px] active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center gap-1.5"
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="2" width="12" height="11" rx="2" stroke="white" strokeWidth="1.4" />
              <path d="M4 1V3M10 1V3" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M1 5.5H13" stroke="white" strokeWidth="1.4" />
              <path d="M4 8.5H7M4 10.5H9" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Voir le billet
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BilletsPage({ onTabChange }: BilletsPageProps) {
  const [showPast, setShowPast] = useState(false);
  const [selected, setSelected] = useState<Booking | null>(null);
  const [reviewing, setReviewing] = useState<Booking | null>(null);

  if (selected) {
    return <TicketDetail booking={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = BOOKINGS.filter(b => b.past === showPast);

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Header */}
        <div className="px-5 pt-5 pb-4">
          <h1 className="font-sans font-extrabold text-[28px] text-dark leading-tight">Mes billets</h1>
        </div>

        {/* Toggle */}
        <div className="px-5 mb-5">
          <div className="bg-black/[0.06] rounded-2xl p-1 flex">
            <button
              onClick={() => setShowPast(false)}
              className={`flex-1 h-10 rounded-xl font-sans font-bold text-[14px] transition-all duration-200 focus-visible:outline-none ${
                !showPast ? 'bg-white text-dark shadow-[0px_1px_4px_rgba(0,0,0,0.08)]' : 'text-muted'
              }`}
            >
              À venir
            </button>
            <button
              onClick={() => setShowPast(true)}
              className={`flex-1 h-10 rounded-xl font-sans font-bold text-[14px] transition-all duration-200 focus-visible:outline-none ${
                showPast ? 'bg-white text-dark shadow-[0px_1px_4px_rgba(0,0,0,0.08)]' : 'text-muted'
              }`}
            >
              Passés
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="px-5 flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center text-center pt-16 gap-3">
              <div className="size-16 rounded-full bg-black/[0.05] flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="2" y="5" width="24" height="20" rx="4" stroke="#9090a0" strokeWidth="1.8" />
                  <path d="M8 3V7M20 3V7" stroke="#9090a0" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M2 11H26" stroke="#9090a0" strokeWidth="1.8" />
                  <path d="M9 17H19M9 21H15" stroke="#9090a0" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-sans font-bold text-[16px] text-dark">Aucun billet {showPast ? 'passé' : 'à venir'}</p>
              <p className="font-sans text-[13px] text-muted max-w-[220px] leading-[1.6]">
                {showPast
                  ? 'Tes sorties passées apparaîtront ici.'
                  : 'Réserve une activité pour retrouver ton billet ici.'}
              </p>
            </div>
          ) : (
            filtered.map(booking => (
              <BookingCard key={booking.id} booking={booking} onOpen={() => setSelected(booking)} onReview={() => setReviewing(booking)} />
            ))
          )}
        </div>
      </div>

      <AppFooter activeTab="Billets" onTabChange={onTabChange} />

      {reviewing && <ReviewSheet booking={reviewing} onClose={() => setReviewing(null)} />}
    </div>
  );
}

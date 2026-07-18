import { useState, useEffect, useRef, useMemo } from 'react';
import { ButtonFooter, PrimaryButton, SafeAreaSpacer } from '../components/atoms';
import { CONFETTI_COLORS } from '../utils/theme';

interface ConfirmationPageProps {
  onDone: () => void;
  persons: number;
  subtotal: number;
  serviceFee: number;
  firstName: string;
  lastName: string;
}

const EVENT_TITLE = "Expo Immersive : Lumières d'Orient";

const INCLUDED = ['Entrée exposition', 'Accès libre au parcours', 'Audioguide inclus'];
const EXCLUDED = ['Vestiaire', 'Restauration', 'Parking'];

function MoreInfoAccordion() {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-3xl shadow-[0px_2px_12px_rgba(0,0,0,0.12)] w-full overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full px-5 py-4 focus-visible:outline-none"
      >
        <span className="font-sans font-bold text-[16px] leading-[1.5] text-dark">Plus d'informations</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="flex flex-col gap-5 px-5 pb-5">
          <div className="h-px bg-black/[0.05]" />

          <div className="flex flex-col gap-2">
            <p className="font-sans font-bold text-[14px] leading-[18px] text-dark">Description</p>
            <p className="font-sans text-[13px] leading-[1.65] text-dark">
              Une heure d'immersion totale dans des projections monumentales mêlant lumières, musique et art numérique. Idéal pour une sortie originale en couple, en famille ou entre amis. Le parcours est libre — reste aussi longtemps que tu veux.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-sans font-bold text-[14px] leading-[18px] text-dark">Inclus</p>
            <div className="flex flex-col gap-2">
              {INCLUDED.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7" fill="#22c55e" fillOpacity="0.12" />
                    <path d="M5 8L7 10L11 6" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-sans text-[12px] leading-[1.3] text-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <p className="font-sans font-bold text-[14px] leading-[18px] text-dark">Non inclus</p>
            <div className="flex flex-col gap-2">
              {EXCLUDED.map(item => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <circle cx="8" cy="8" r="7" fill="#ef4444" fillOpacity="0.1" />
                    <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="font-sans text-[12px] leading-[1.3] text-dark">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Confetti() {
  const confetti = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 1,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .confetti-particle {
          animation: fall linear forwards;
        }
      `}</style>
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="confetti-particle absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: '-10px',
            backgroundColor: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function generateBookingCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

export default function ConfirmationPage({ onDone, persons, subtotal, serviceFee, firstName, lastName }: ConfirmationPageProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bookingCode = useMemo(() => generateBookingCode(), []);
  const total = subtotal + serviceFee;

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  function handleShare() {
    const shareText = `J'ai réservé cette activité sur &JOY : Expo Immersive : Lumières d'Orient pour ${persons} personne${persons > 1 ? 's' : ''}, Demain à 10:00, Atelier des Lumières, Paris 11e.
Code de réservation : ${bookingCode}.
Découvre l'application &JOY : https://joydiscover.com`;

    if (navigator.share) {
      navigator.share({
        title: "Expo Immersive : Lumières d'Orient",
        text: shareText,
      }).catch(() => {});
    }
  }

  function handleAddToCalendar() {
    const start = '20260619T100000';
    const end = '20260619T200000';
    const title = encodeURIComponent("Expo Immersive : Lumières d'Orient");
    const location = encodeURIComponent('Atelier des Lumières, Paris 11e');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&location=${location}`;
    window.open(url, '_blank');
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <Confetti />
      <SafeAreaSpacer />

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-32">
        {/* Success banner */}
        <div className="px-5 py-8 flex flex-col items-center text-center gap-3">
          <div className="size-16 rounded-full bg-primary-light flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M6 15.5L12 21.5L24 9" stroke="#5170ff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-sans font-bold text-[12px] text-muted uppercase tracking-[0.144px]">Réservation confirmée</p>
          <h1 className="font-sans font-extrabold text-[24px] text-dark leading-none">{EVENT_TITLE}</h1>
        </div>

        <div className="px-4 flex flex-col gap-6">

          {/* Ticket card */}
          <div className="rounded-3xl overflow-hidden shadow-card">
            {/* Main infos */}
            <div className="flex flex-col gap-3.5 px-5 py-4 bg-white">
              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <circle cx="10" cy="10" r="7.5" stroke="#1a1a24" strokeWidth="1.5" />
                  <path d="M10 6V10L12.5 12.5" stroke="#1a1a24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex flex-col">
                  <p className="font-sans font-bold text-[14px] text-dark leading-[18px]">Demain</p>
                  <p className="font-sans text-[12px] text-dark-warm leading-[1.3]">10:00</p>
                </div>
              </div>

              <div className="h-px bg-black/[0.05]" />

              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <path d="M10 2C6.7 2 4 4.7 4 8C4 12.5 10 18 10 18C10 18 16 12.5 16 8C16 4.7 13.3 2 10 2Z" stroke="#1a1a24" strokeWidth="1.5" />
                  <circle cx="10" cy="8" r="2" stroke="#1a1a24" strokeWidth="1.5" />
                </svg>
                <div className="flex-1 min-w-0 flex flex-col">
                  <p className="font-sans font-bold text-[14px] text-dark leading-[18px]">Atelier des Lumières, Paris 11e</p>
                  <p className="font-sans text-[12px] text-dark-warm leading-[1.3]">38 Rue Saint-Maur, 75011 Paris</p>
                </div>
                <a
                  href="https://maps.apple.com/?q=Atelier+des+Lumi%C3%A8res+Paris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 bg-primary text-white rounded-full px-3 py-1.5 shadow-[0px_2px_12px_rgba(0,0,0,0.12)] font-sans font-bold text-[12px] leading-[18px] uppercase tracking-[0.144px] active:opacity-80 transition-opacity"
                >
                  Y aller
                </a>
              </div>

              <div className="h-px bg-black/[0.05]" />

              <div className="flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                  <circle cx="10" cy="7" r="3" stroke="#1a1a24" strokeWidth="1.5" />
                  <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#1a1a24" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p className="font-sans font-bold text-[14px] text-dark leading-[18px]">
                  {persons} {persons > 1 ? 'personnes' : 'personne'}
                </p>
              </div>
            </div>

            {/* Perforated divider */}
            <div className="relative flex items-center bg-white">
              <div className="absolute -left-4 size-8 rounded-full bg-cream" />
              <div className="flex-1 mx-4 border-t-2 border-dashed border-muted" />
              <div className="absolute -right-4 size-8 rounded-full bg-cream" />
            </div>

            {/* Booking code */}
            <div className="bg-white px-4 pt-4 pb-4 flex flex-col items-center gap-2">
              <p className="font-sans text-[12px] text-muted uppercase tracking-widest">Code de réservation</p>
              <div className="flex gap-2">
                {bookingCode.split('').map((char, i) => (
                  <div
                    key={i}
                    className="size-10 rounded-xl bg-primary-light flex items-center justify-center font-sans font-extrabold text-[20px] text-primary"
                  >
                    {char}
                  </div>
                ))}
              </div>
              {(firstName || lastName) && (
                <p className="font-sans font-bold text-[13px] text-dark-warm text-center mt-2 leading-[1.5]">
                  {[firstName, lastName].filter(Boolean).join(' ')}
                </p>
              )}
              <p className="font-sans text-[12px] text-muted text-center leading-[1.5]">
                {persons} {persons > 1 ? 'personnes' : 'personne'} · {total.toFixed(2)}€ réglé
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex-1 h-14 bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-dark active:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
              onClick={handleAddToCalendar}
              className="flex-1 h-14 bg-white rounded-2xl shadow-[0px_4px_10px_rgba(0,0,0,0.08)] flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-dark active:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="1" y="3" width="16" height="14" rx="3" stroke="#1a1a24" strokeWidth="1.8" />
                <path d="M5 1V4M13 1V4" stroke="#1a1a24" strokeWidth="1.8" strokeLinecap="round" />
                <path d="M1 7H17" stroke="#1a1a24" strokeWidth="1.8" />
                <path d="M9 11V13.5M9 13.5H11.5M9 13.5H6.5" stroke="#1a1a24" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              Calendrier
            </button>
          </div>

          {/* Info note */}
          <div className="bg-primary-light rounded-2xl px-4 py-3.5 flex items-start gap-3">
            <span className="text-lg shrink-0 mt-0.5">💡</span>
            <p className="typo-caption text-primary text-left">
              Ton code de confirmation fait office de billet. Présente-le simplement à l'accueil le jour de l'évènement.
            </p>
          </div>

          <MoreInfoAccordion />

        </div>
      </div>

      {/* CTA */}
      <ButtonFooter className="fixed bottom-0 left-0 right-0" style={{ zIndex: 1001 }}>
        <PrimaryButton onClick={onDone}>
          Voir dans mes billets
        </PrimaryButton>
      </ButtonFooter>
    </div>
  );
}

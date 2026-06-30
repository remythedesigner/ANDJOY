import { useEffect, useRef, useMemo } from 'react';

interface ConfirmationPageProps {
  onDone: () => void;
  persons: number;
  subtotal: number;
  serviceFee: number;
  firstName: string;
  lastName: string;
}

const EVENT_IMAGE = 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=200&h=200&fit=crop';

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
    if (navigator.share) {
      navigator.share({
        title: "Expo Immersive : Lumières d'Orient",
        text: `J'y serai ! Code de réservation : ${bookingCode}`,
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
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-32">
        {/* Success banner */}
        <div className="px-5 pt-6 pb-2 flex flex-col items-center text-center gap-3">
          <div className="size-16 rounded-full bg-[#eef1ff] flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M6 15.5L12 21.5L24 9" stroke="#5170ff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="font-sans font-extrabold text-[24px] text-dark leading-tight">C'est réservé !</h1>
        </div>

        <div className="px-5 flex flex-col gap-5 mt-4">

          {/* Ticket card */}
          <div className="rounded-3xl overflow-hidden border border-black/[0.07] shadow-[0px_4px_20px_rgba(0,0,0,0.07)]">
            {/* Event header */}
            <div className="flex gap-3 items-center p-4 bg-white">
              <img
                src={EVENT_IMAGE}
                alt="Expo Immersive"
                className="size-[56px] rounded-xl object-cover shrink-0"
              />
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="font-sans font-bold text-[15px] text-dark leading-[1.3]">
                  Expo Immersive : Lumières d'Orient
                </p>
                <p className="font-sans text-[13px] text-muted">Demain · 10:00 – 20:00</p>
                <p className="font-sans text-[13px] text-muted">Atelier des Lumières, Paris 11e</p>
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
                {bookingCode.split('').map((char, i) => (
                  <div
                    key={i}
                    className="size-10 rounded-xl bg-[#eef1ff] flex items-center justify-center font-sans font-extrabold text-[20px] text-primary"
                  >
                    {char}
                  </div>
                ))}
              </div>
              {(firstName || lastName) && (
                <p className="font-sans font-bold text-[13px] text-dark text-center mt-2 leading-[1.5]">
                  Réservé par {[firstName, lastName].filter(Boolean).join(' ')}
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
              className="flex-1 h-14 bg-cream rounded-2xl flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-dark active:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
              className="flex-1 h-14 bg-cream rounded-2xl flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-dark active:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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

        </div>
      </div>

      {/* CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-[#faf4f1]/95 backdrop-blur-sm px-5 pt-3 pb-8 border-t border-black/[0.05]"
        style={{ zIndex: 1001 }}
      >
        <button
          onClick={onDone}
          className="w-full bg-primary text-white rounded-full h-14 font-sans font-bold text-[16px] focus-visible:outline-none active:opacity-90 transition-opacity"
        >
          Voir mes billets
        </button>
      </div>
    </div>
  );
}

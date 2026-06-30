import { useState, useEffect, useRef } from 'react';

const EVENT_IMAGE = 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=200&h=200&fit=crop';
const PRICE_PER_PERSON = 22;
const SERVICE_FEE = 1;

interface BookingPageProps {
  onBack: () => void;
  initialPersons?: number;
  maxPersons?: number;
  onPay: (subtotal: number, serviceFee: number, firstName: string, lastName: string, persons: number) => void;
}

export default function BookingPage({ onBack, initialPersons = 1, maxPersons, onPay }: BookingPageProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [persons, setPersons] = useState(initialPersons);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  const subtotal = persons * PRICE_PER_PERSON;
  const total = subtotal + SERVICE_FEE;

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-28">

        {/* Header */}
        <div className="flex items-center gap-4 px-5 pt-4 pb-5">
          <button
            onClick={onBack}
            className="size-9 flex items-center justify-center focus-visible:outline-none"
            aria-label="Retour"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 18L7 11L14 4" stroke="#1a1a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-sans font-extrabold text-[24px] text-dark leading-tight">Récapitulatif</h1>
        </div>

        <div className="px-5 flex flex-col gap-6">

          {/* Event summary card */}
          <div className="bg-white border border-black/[0.08] rounded-2xl p-4 flex gap-4 items-start shadow-[0px_2px_8px_rgba(0,0,0,0.04)]">
            <img
              src={EVENT_IMAGE}
              alt="Expo Immersive : Lumières d'Orient"
              className="size-[72px] rounded-xl object-cover shrink-0"
            />
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-sans font-bold text-[15px] text-dark leading-[1.3]">
                Expo Immersive : Lumières d'Orient
              </p>
              <p className="font-sans text-[13px] text-muted">Demain · 10:00 - 20:00</p>
              <p className="font-sans text-[13px] text-muted">Atelier des Lumières, Paris 11e</p>
              <p className="font-sans text-[13px] text-muted">Durée : 1h</p>
            </div>
          </div>

          {/* Instructions */}
          <p className="font-sans text-[13px] text-muted leading-[1.6]">
            Si tu réserves pour plusieurs, indique les informations de l'une des personnes qui sera présente.
          </p>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-sans font-bold text-[15px] text-dark">Prénom</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Ton prénom"
                className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 border-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans font-bold text-[15px] text-dark">Nom</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Ton nom"
                className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 border-none"
              />
            </div>
          </div>

          {/* Nombre de personnes */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans font-bold text-[15px] text-dark">Nombre de personnes</span>
              {maxPersons !== undefined && (
                <p className="font-sans text-[12px] text-muted mt-0.5">{maxPersons} places restantes</p>
              )}
            </div>
            <div className="flex items-center gap-3 bg-white border border-black/[0.06] rounded-2xl px-3 py-2">
              <button
                onClick={() => setPersons(p => Math.max(1, p - 1))}
                disabled={persons <= 1}
                className="size-8 rounded-xl bg-black/[0.04] flex items-center justify-center font-sans font-bold text-[18px] text-dark disabled:opacity-25 focus-visible:outline-none active:opacity-60 transition-opacity"
                aria-label="Retirer une personne"
              >
                −
              </button>
              <span className="font-sans font-bold text-[18px] text-dark w-5 text-center tabular-nums">{persons}</span>
              <button
                onClick={() => setPersons(p => maxPersons !== undefined ? Math.min(maxPersons, p + 1) : p + 1)}
                disabled={maxPersons !== undefined && persons >= maxPersons}
                className="size-8 rounded-xl bg-primary flex items-center justify-center font-sans font-bold text-[18px] text-white disabled:opacity-25 focus-visible:outline-none active:opacity-80 transition-opacity"
                aria-label="Ajouter une personne"
              >
                +
              </button>
            </div>
          </div>

          {/* Price breakdown */}
          <div className="flex flex-col">
            <div className="h-px bg-black/[0.07]" />
            <div className="flex items-center justify-between py-4">
              <span className="font-sans text-[14px] text-muted">{persons} × {PRICE_PER_PERSON}€</span>
              <span className="font-sans font-bold text-[14px] text-dark">{subtotal.toFixed(2)}€</span>
            </div>
            <div className="h-px bg-black/[0.07]" />
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-[14px] text-muted">Frais de service</span>
                <div className="size-4 rounded-full border border-muted/50 flex items-center justify-center">
                  <span className="font-sans text-[9px] text-muted font-bold">i</span>
                </div>
              </div>
              <span className="font-sans font-bold text-[14px] text-dark">{SERVICE_FEE.toFixed(2)}€</span>
            </div>
            <div className="h-px bg-black/[0.07]" />
            <div className="flex items-center justify-between py-4">
              <span className="font-sans font-bold text-[15px] text-dark">Total</span>
              <span className="font-sans font-bold text-[17px] text-dark">{total.toFixed(2)}€</span>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky CTA */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-[#faf4f1]/95 backdrop-blur-sm px-5 pt-3 pb-8 border-t border-black/[0.05]"
        style={{ zIndex: 1001 }}
      >
        <button
          onClick={() => onPay(subtotal, SERVICE_FEE, firstName, lastName, persons)}
          disabled={!firstName.trim() || !lastName.trim()}
          className="w-full bg-primary text-white rounded-full h-14 font-sans font-bold text-[16px] focus-visible:outline-none active:opacity-90 transition-opacity disabled:opacity-40"
        >
          Procéder au paiement
        </button>
      </div>
    </div>
  );
}

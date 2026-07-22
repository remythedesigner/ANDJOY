import { useState, useEffect, useRef } from 'react';
import { ButtonFooter, PageHeader, PrimaryButton, SafeAreaSpacer, StepperButton } from '../components/atoms';

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
  const [showFeeTooltip, setShowFeeTooltip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  const subtotal = persons * PRICE_PER_PERSON;
  const total = subtotal + SERVICE_FEE;

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <SafeAreaSpacer />

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-28">

        {/* Header */}
        <PageHeader title="Récapitulatif" onBack={onBack} />

        <div className="px-4 flex flex-col gap-6">

          {/* Event summary card */}
          <div className="bg-surface rounded-2xl p-4 flex gap-4 items-start">
            <img
              src={EVENT_IMAGE}
              alt="Expo Immersive : Lumières d'Orient"
              className="size-14 rounded-xl object-cover shrink-0"
            />
            <div className="flex flex-col gap-1 min-w-0">
              <p className="font-sans font-bold text-[16px] text-dark leading-[1.5]">
                Expo Immersive : Lumières d'Orient
              </p>
              <p className="font-sans text-[12px] text-dark-warm leading-[1.3]">Demain · 10:00 - 20:00</p>
              <p className="font-sans text-[12px] text-dark-warm leading-[1.3]">Atelier des Lumières, Paris 11e</p>
            </div>
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="typo-title text-dark">Prénom</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Prénom"
                className="bg-white rounded-2xl px-4 h-14 typo-input text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 border-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="typo-title text-dark">Nom</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Nom"
                className="bg-white rounded-2xl px-4 h-14 typo-input text-dark placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 border-none"
              />
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-primary-light rounded-2xl px-4 py-3.5 flex items-start gap-3">
            <span className="text-lg shrink-0 mt-0.5">💡</span>
            <p className="typo-caption text-primary text-left">
              Les informations ci-dessus doivent correspondre à celles de la ou l'une des personnes qui sera présente.
            </p>
          </div>

          {/* Nombre de personnes */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-sans font-bold text-[14px] text-dark">Nombre de personnes</span>
              {maxPersons !== undefined && (
                <p className="font-sans text-[12px] text-muted mt-1">{maxPersons} places restantes</p>
              )}
            </div>
            <div className="flex items-center gap-3 bg-white rounded-2xl px-3 py-2">
              <StepperButton
                variant="decrement"
                onClick={() => setPersons(p => Math.max(1, p - 1))}
                disabled={persons <= 1}
                label="Retirer une personne"
              />
              <span className="font-sans font-bold text-[18px] text-dark w-5 text-center tabular-nums">{persons}</span>
              <StepperButton
                variant="increment"
                onClick={() => setPersons(p => maxPersons !== undefined ? Math.min(maxPersons, p + 1) : p + 1)}
                disabled={maxPersons !== undefined && persons >= maxPersons}
                label="Ajouter une personne"
              />
            </div>
          </div>

          {/* Price breakdown */}
          <div className="flex flex-col">
            <div className="h-px bg-black/[0.06]" />
            <div className="flex items-center justify-between py-4">
              <span className="font-sans text-[14px] text-muted">{persons} × {PRICE_PER_PERSON}€</span>
              <span className="font-sans font-bold text-[14px] text-muted">{subtotal.toFixed(2)}€</span>
            </div>
            <div className="h-px bg-black/[0.06]" />
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-[14px] text-muted">Frais de service</span>
                <button
                  onClick={() => setShowFeeTooltip(!showFeeTooltip)}
                  className="size-4 rounded-full border border-muted/50 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Information sur les frais de service"
                >
                  <span className="font-sans text-[9px] text-muted font-bold">i</span>
                </button>
              </div>
              <span className="font-sans font-bold text-[14px] text-muted">{SERVICE_FEE.toFixed(2)}€</span>
            </div>
            {showFeeTooltip && (
              <div className="bg-surface rounded-2xl p-3 mb-4">
                <p className="font-sans text-[13px] text-dark leading-[1.5]">Pour couvrir les frais de paiement en ligne sécurisé de notre partenaire Stripe.</p>
              </div>
            )}
            <div className="h-px bg-black/[0.06]" />
            <div className="flex items-center justify-between py-4">
              <span className="font-sans font-bold text-[15px] text-dark">Total</span>
              <span className="font-sans font-bold text-[17px] text-dark">{total.toFixed(2)}€</span>
            </div>
          </div>

        </div>
      </div>

      {/* Sticky CTA */}
      <ButtonFooter className="fixed bottom-0 left-0 right-0" style={{ zIndex: 1001 }}>
        <PrimaryButton
          onClick={() => onPay(subtotal, SERVICE_FEE, firstName, lastName, persons)}
          disabled={!firstName.trim() || !lastName.trim()}
        >
          Procéder au paiement
        </PrimaryButton>
      </ButtonFooter>
    </div>
  );
}

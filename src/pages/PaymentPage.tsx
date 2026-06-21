import { useState, useEffect, useRef } from 'react';

interface PaymentPageProps {
  onBack: () => void;
  subtotal: number;
  serviceFee: number;
  onConfirm: () => void;
}

export default function PaymentPage({ onBack, subtotal, serviceFee, onConfirm }: PaymentPageProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const total = subtotal + serviceFee;
  const cardReady = cardNumber.replace(/\s/g, '').length === 16 && expiry.length === 5 && cvv.length >= 3;

  async function handleQuickPay(method: 'apple' | 'google') {
    const supportedMethods = method === 'apple'
      ? [{ supportedMethods: 'https://apple.com/apple-pay', data: { version: 3, merchantIdentifier: 'merchant.com.joy-app', merchantCapabilities: ['supports3DS'], supportedNetworks: ['visa', 'masterCard'], countryCode: 'FR' } }]
      : [{ supportedMethods: 'https://google.com/pay', data: { environment: 'TEST', apiVersion: 2, apiVersionMinor: 0, allowedPaymentMethods: [{ type: 'CARD', parameters: { allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'], allowedCardNetworks: ['MASTERCARD', 'VISA'] } }] } }];

    if (typeof PaymentRequest !== 'undefined') {
      try {
        const request = new PaymentRequest(supportedMethods, {
          total: { label: 'Total &JOY', amount: { currency: 'EUR', value: total.toFixed(2) } },
        });
        const canPay = await request.canMakePayment();
        if (canPay) {
          const response = await request.show();
          await response.complete('success');
          onConfirm();
          return;
        }
      } catch {
        // user dismissed or unsupported — fall through
      }
    }
    onConfirm();
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    scrollRef.current?.scrollTo(0, 0);
  }, []);

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      <div ref={scrollRef} className="flex-1 overflow-y-auto pb-36">
        {/* Header */}
        <div className="flex items-center gap-4 px-5 pt-4 pb-6">
          <button
            onClick={onBack}
            className="size-9 flex items-center justify-center focus-visible:outline-none"
            aria-label="Retour"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M14 18L7 11L14 4" stroke="#1a1a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h1 className="font-sans font-extrabold text-[24px] text-dark">Paiement</h1>
        </div>

        <div className="px-5 flex flex-col gap-5">

          {/* Quick-pay options */}
          <div className="flex gap-3">
            {/* Apple Pay */}
            <button onClick={() => handleQuickPay('apple')} className="flex-1 h-14 bg-black rounded-2xl flex items-center justify-center gap-2 active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black">
              <svg width="16" height="20" viewBox="0 0 16 20" fill="white">
                <path d="M13.18 10.26c-.02-2.05 1.68-3.04 1.75-3.09-0.95-1.39-2.43-1.58-2.96-1.6-1.26-.13-2.46.74-3.1.74-.64 0-1.63-.72-2.68-.7-1.38.02-2.66.8-3.37 2.03C1.3 9.94 2.3 13.56 3.8 15.5c.74 1.05 1.62 2.23 2.77 2.19 1.12-.05 1.54-.71 2.89-.71 1.35 0 1.73.71 2.9.69 1.2-.02 1.96-1.07 2.69-2.13.85-1.22 1.2-2.4 1.22-2.46-.03-.01-2.34-.9-2.36-3.58-.02 0-.02 0 0 .01zM11.1 3.93C11.7 3.2 12.1 2.2 12 1.2c-.87.04-1.91.58-2.53 1.31-.56.64-1.05 1.67-.92 2.65.97.07 1.96-.49 2.55-1.23z"/>
              </svg>
              <span className="font-sans font-semibold text-[15px] text-white">Pay</span>
            </button>

            {/* Google Pay */}
            <button onClick={() => handleQuickPay('google')} className="flex-1 h-14 bg-white border border-black/[0.12] rounded-2xl flex items-center justify-center gap-2 active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-[0px_1px_4px_rgba(0,0,0,0.06)]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M19.6 10.23c0-.68-.06-1.36-.17-2H10v3.78h5.39a4.6 4.6 0 0 1-2 3.03v2.5h3.22c1.89-1.74 2.99-4.3 2.99-7.31z" fill="#4285F4"/>
                <path d="M10 20c2.7 0 4.96-.9 6.62-2.43l-3.22-2.5c-.9.6-2.04.96-3.4.96-2.6 0-4.81-1.76-5.6-4.13H1.1v2.58A10 10 0 0 0 10 20z" fill="#34A853"/>
                <path d="M4.4 11.9A5.98 5.98 0 0 1 4.08 10c0-.66.12-1.3.32-1.9V5.52H1.1A10 10 0 0 0 0 10c0 1.61.39 3.14 1.1 4.48l3.3-2.58z" fill="#FBBC05"/>
                <path d="M10 3.97c1.47 0 2.79.5 3.82 1.5l2.86-2.86C14.95.99 12.69 0 10 0A10 10 0 0 0 1.1 5.52l3.3 2.58C5.19 5.73 7.4 3.97 10 3.97z" fill="#EA4335"/>
              </svg>
              <span className="font-sans font-semibold text-[15px] text-dark">Pay</span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-black/[0.07]" />
            <span className="font-sans text-[13px] text-muted">ou payer par carte</span>
            <div className="flex-1 h-px bg-black/[0.07]" />
          </div>

          {/* Card number */}
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-[15px] text-dark">Numéro de carte</label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={cardNumber}
                onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className="w-full bg-white rounded-2xl px-4 pr-12 h-14 font-sans text-[15px] text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted/50">
                <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                  <rect x="0.5" y="0.5" width="21" height="15" rx="2.5" stroke="#9090a0" strokeOpacity="0.6" />
                  <rect x="0" y="4" width="22" height="4" fill="#9090a0" fillOpacity="0.3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="font-sans font-bold text-[15px] text-dark">Expiration</label>
              <input
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={e => setExpiry(formatExpiry(e.target.value))}
                placeholder="MM/AA"
                className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-sans font-bold text-[15px] text-dark">CVV</label>
              <input
                type="text"
                inputMode="numeric"
                value={cvv}
                onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>
          </div>

          {/* Save card toggle */}
          <div className="flex items-center gap-3 py-1">
            <button
              role="switch"
              aria-checked={saveCard}
              onClick={() => setSaveCard(s => !s)}
              className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${saveCard ? 'bg-primary' : 'bg-black/[0.12]'}`}
            >
              <span
                className={`absolute top-0.5 left-0 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${saveCard ? 'translate-x-5' : 'translate-x-0.5'}`}
              />
            </button>
            <span className="font-sans text-[14px] text-dark leading-[1.4]">
              Enregistrer cette carte pour mes prochaines réservations
            </span>
          </div>

          {/* Price summary */}
          <div className="flex flex-col">
            <div className="h-px bg-black/[0.07]" />
            <div className="flex items-center justify-between py-3.5">
              <span className="font-sans text-[14px] text-muted">Sous-total</span>
              <span className="font-sans text-[14px] text-dark">{subtotal.toFixed(2)}€</span>
            </div>
            <div className="flex items-center justify-between py-3.5">
              <div className="flex items-center gap-1.5">
                <span className="font-sans text-[14px] text-muted">Frais de service</span>
                <div className="size-4 rounded-full border border-muted/50 flex items-center justify-center shrink-0">
                  <span className="font-sans text-[9px] text-muted font-bold">i</span>
                </div>
              </div>
              <span className="font-sans text-[14px] text-dark">{serviceFee.toFixed(2)}€</span>
            </div>
            <div className="h-px bg-black/[0.07]" />
            <div className="flex items-center justify-between py-3.5">
              <span className="font-sans font-bold text-[15px] text-dark">Total</span>
              <span className="font-sans font-bold text-[18px] text-dark">{total.toFixed(2)}€</span>
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
          onClick={onConfirm}
          disabled={!cardReady}
          className="w-full bg-primary text-white rounded-full h-14 font-sans font-bold text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-90 transition-opacity disabled:opacity-40"
        >
          Payer {total.toFixed(2)}€
        </button>
      </div>
    </div>
  );
}

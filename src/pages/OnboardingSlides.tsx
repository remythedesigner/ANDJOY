import { useState } from 'react';

const SLIDES = [
  {
    title: 'Des activités\nqui te\nressemblent.',
    subtitle: "L'équipe &JOY teste des activités toute l'année et te propose les meilleurs plans à Paris.",
    cta: 'Continuer',
  },
  {
    title: 'Même à la\ndernière minute.',
    subtitle: 'Réserve en quelques secondes et reçois ton billet directement sur ton téléphone.',
    cta: 'Commencer',
  },
];

interface OnboardingSlidesProps {
  onComplete: () => void;
}

export default function OnboardingSlides({ onComplete }: OnboardingSlidesProps) {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  function handleCta() {
    if (index < SLIDES.length - 1) {
      setIndex(i => i + 1);
      setAnimKey(k => k + 1);
    } else {
      onComplete();
    }
  }

  function goTo(i: number) {
    if (i !== index) {
      setIndex(i);
      setAnimKey(k => k + 1);
    }
  }

  const { title, subtitle, cta } = SLIDES[index];

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      {/* Logo */}
      <div className="flex justify-center pt-4 shrink-0">
        <img src={import.meta.env.BASE_URL + "logo.svg"} alt="&JOY" className="h-[44px] w-auto" />
      </div>

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-7">
        <div key={animKey} className="flex flex-col items-center animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[32px] leading-[1.1] text-dark mb-3 whitespace-pre-line">
            {title}
          </h2>
          <p className="font-sans text-[15px] text-muted leading-[1.55] max-w-[280px]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Dots + CTA */}
      <div className="px-7 pb-4 shrink-0">
        <div className="flex items-center justify-center gap-2 mb-6">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 focus-visible:outline-none ${
                i === index ? 'w-8 h-3 bg-primary' : 'w-3 h-3 bg-primary/25'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={handleCta}
          className="w-full h-[56px] bg-primary text-white rounded-2xl font-sans font-bold text-[17px] active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {cta}
        </button>
      </div>
    </div>
  );
}

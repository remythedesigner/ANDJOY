import { useState } from 'react';
import { CATEGORIES } from '../utils/categories';
import CategoryButton from '../components/atoms/CategoryButton';

interface Props {
  onComplete: () => void;
}

function LocationIllustration() {
  return (
    <div className="w-[260px] aspect-square rounded-[32px] bg-white/60 border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-3 text-black/20">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="14" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M4 28l8-7 6 6 4-4 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans font-semibold text-[13px]">Illustration</span>
    </div>
  );
}

function NotificationIllustration() {
  return (
    <svg viewBox="0 0 300 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[320px]">
      <defs>
        <symbol id="joy-logo" viewBox="0 0 23 29">
          <path d="M11.351 10.8701C12.3823 10.8701 13.3503 11.0703 14.2573 11.4696C15.1632 11.87 15.9612 12.4227 16.6526 13.1288C17.3428 13.8325 17.8831 14.649 18.2745 15.5793C18.6647 16.5072 18.8604 17.4976 18.8604 18.5525V21.051C18.8604 22.106 18.6647 23.0975 18.2745 24.0242C17.8831 24.9521 17.3428 25.7686 16.6526 26.4747C15.9612 27.1821 15.1632 27.7347 14.2573 28.1339C13.3503 28.5344 12.3823 28.7334 11.351 28.7334C10.3198 28.7334 9.35064 28.5344 8.44484 28.1339C7.53784 27.7347 6.73974 27.1821 6.04954 26.4747C5.36164 25.7686 4.82144 24.9521 4.42764 24.0242C4.03624 23.0975 3.84174 22.106 3.84174 21.051V18.5525C3.84174 17.4976 4.03624 16.5072 4.42764 15.5793C4.82144 14.649 5.36164 13.8325 6.04954 13.1288C6.73974 12.4227 7.53784 11.87 8.44484 11.4696C9.35064 11.0703 10.3198 10.8701 11.351 10.8701ZM13.226 26.7433V12.8603C13.2073 12.3328 13.0174 11.8868 12.6589 11.5223C12.3026 11.1555 11.8667 10.9708 11.351 10.9708C10.8354 10.9708 10.3948 11.1555 10.0292 11.5223C9.66354 11.8868 9.48074 12.3328 9.48074 12.8603V26.7433C9.48074 27.2708 9.66354 27.7192 10.0292 28.086C10.3948 28.4504 10.8354 28.6327 11.351 28.6327C11.8667 28.6327 12.3026 28.4504 12.6589 28.086C13.0174 27.7192 13.2073 27.2708 13.226 26.7433Z" fill="#5170FF"/>
          <path d="M5.09077 6.97757C5.15637 7.09987 5.16697 7.22571 5.12357 7.3564C5.08257 7.48828 5.00407 7.58542 4.88917 7.64893C4.76027 7.72323 4.63607 7.74007 4.51417 7.70166C4.39467 7.66331 4.30327 7.58422 4.23767 7.46192L2.06267 3.4193C1.99697 3.29821 1.98297 3.17352 2.02047 3.04524C2.05797 2.91816 2.13997 2.81866 2.26417 2.74792C2.37437 2.68438 2.49387 2.66999 2.62517 2.70476C2.75407 2.73713 2.85017 2.81386 2.91577 2.93495L5.09077 6.97757Z" fill="#5170FF"/>
          <path d="M11.9982 5.40314C11.9982 5.54461 11.9478 5.66092 11.8482 5.7532C11.7509 5.84674 11.6372 5.89228 11.506 5.89228C11.3583 5.89228 11.2411 5.84674 11.1544 5.7532C11.0665 5.66092 11.0232 5.54461 11.0232 5.40314V0.789851C11.0232 0.653191 11.0701 0.538102 11.1638 0.444582C11.2576 0.352272 11.3759 0.305511 11.5201 0.305511C11.6443 0.305511 11.7556 0.352272 11.8529 0.444582C11.949 0.538102 11.9982 0.653191 11.9982 0.789851V5.40314Z" fill="#5170FF"/>
          <path d="M18.893 7.4624C18.8274 7.5835 18.7289 7.6602 18.5977 7.69256C18.4688 7.72377 18.3469 7.70819 18.232 7.64462C18.1031 7.57032 18.0223 7.47198 17.9883 7.34729C17.9567 7.22259 17.9742 7.10035 18.0399 6.97805L20.2149 2.93544C20.2805 2.81435 20.3754 2.73642 20.5008 2.70046C20.625 2.66569 20.7504 2.68367 20.8758 2.75321C20.9848 2.81795 21.0598 2.91506 21.1008 3.04573C21.1442 3.17401 21.1336 3.2987 21.068 3.41979L18.893 7.4624Z" fill="#5170FF"/>
        </symbol>
      </defs>

      <circle cx="150" cy="143" r="122" fill="#eef1ff" />

      {/* Card 1 */}
      <rect x="14" y="36" width="272" height="66" rx="16" fill="white" />
      <rect x="28" y="49" width="40" height="40" rx="12" fill="#eef1ff" />
      <use href="#joy-logo" x="37" y="55" width="22" height="28" />
      <text x="78" y="62" fontFamily="sans-serif" fontSize="11.5" fontWeight="800" fill="#1a1a24">&amp;JOY</text>
      <text x="278" y="62" fontFamily="sans-serif" fontSize="9.5" fill="#9090a0" textAnchor="end">il y a 2 min</text>
      <text x="78" y="80" fontFamily="sans-serif" fontSize="11" fill="#1a1a24">Rappel — Jazz Club ce soir à 20h00</text>

      {/* Card 2 */}
      <rect x="14" y="110" width="272" height="66" rx="16" fill="white" />
      <rect x="28" y="123" width="40" height="40" rx="12" fill="#eef1ff" />
      <use href="#joy-logo" x="37" y="129" width="22" height="28" />
      <text x="78" y="136" fontFamily="sans-serif" fontSize="11.5" fontWeight="800" fill="#1a1a24">&amp;JOY</text>
      <text x="278" y="136" fontFamily="sans-serif" fontSize="9.5" fill="#9090a0" textAnchor="end">il y a 18 min</text>
      <text x="78" y="154" fontFamily="sans-serif" fontSize="11" fill="#1a1a24">Pars maintenant pour ton atelier photo</text>

      {/* Card 3 */}
      <rect x="14" y="184" width="272" height="66" rx="16" fill="white" />
      <rect x="28" y="197" width="40" height="40" rx="12" fill="#eef1ff" />
      <use href="#joy-logo" x="37" y="203" width="22" height="28" />
      <text x="78" y="210" fontFamily="sans-serif" fontSize="11.5" fontWeight="800" fill="#1a1a24">&amp;JOY</text>
      <text x="278" y="210" fontFamily="sans-serif" fontSize="9.5" fill="#9090a0" textAnchor="end">il y a 1h</text>
      <text x="78" y="228" fontFamily="sans-serif" fontSize="11" fill="#1a1a24">Réservation confirmée · Escape Game</text>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="#1a1a24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProfileSetup({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const next = () => {
    if (step < 3) setStep(s => s + 1);
    else onComplete();
  };

  const toggleCat = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(20px, env(safe-area-inset-top))' }} aria-hidden="true" />

      {/* Nav bar */}
      <div className="flex items-center gap-4 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={() => step > 0 && setStep(s => s - 1)}
          className={`w-9 h-9 flex items-center justify-center rounded-full transition-opacity ${step === 0 ? 'opacity-0 pointer-events-none' : ''}`}
          aria-label="Retour"
        >
          <BackIcon />
        </button>
        <div className="flex-1 h-[3px] bg-primary/15 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
        <div className="w-9" />
      </div>

      {/* Step: Nickname */}
      {step === 0 && (
        <div key="nickname" className="flex flex-col flex-1 px-6 pt-6 pb-4 animate-onboard-in">
          <p className="font-sans text-[13px] text-primary font-semibold tracking-wide uppercase mb-3">
            Étape 1 sur 4
          </p>
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-2">
            Comment souhaites-tu{'\n'}que l'on t'appelle ?
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[1.5] mb-8">
            Ton prénom / surnom sera affiché sur ton profil.
          </p>
          <input
            type="text"
            autoFocus
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="Appelle-moi..."
            className="w-full h-[56px] rounded-2xl bg-white border border-black/[0.1] px-4 font-sans text-[16px] text-dark placeholder:text-muted outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
          />
          <div className="flex-1" />
          <button
            onClick={next}
            disabled={nickname.trim().length === 0}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity"
          >
            Continuer
          </button>
        </div>
      )}

      {/* Step: Categories */}
      {step === 1 && (
        <div key="categories" className="flex flex-col flex-1 animate-onboard-in overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 pt-6 pb-4">
            <p className="font-sans text-[13px] text-primary font-semibold tracking-wide uppercase mb-3">
              Étape 2 sur 4
            </p>
            <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-2">
              Qu'est-ce qui{'\n'}te passionne ?
            </h2>
            <p className="font-sans text-[14px] text-muted leading-[1.5] mb-6">
              Sélectionne au moins 3 catégories.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map(cat => (
                <CategoryButton
                  key={cat.id}
                  id={cat.id}
                  emoji={cat.emoji}
                  color={cat.color}
                  selected={selected.has(cat.id)}
                  onToggle={toggleCat}
                />
              ))}
            </div>
          </div>
          <div className="px-6 pb-4 shrink-0">
            <button
              onClick={next}
              disabled={selected.size < 3}
              className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {/* Step: Geolocation */}
      {step === 2 && (
        <div key="geo" className="flex flex-col flex-1 px-6 pt-4 pb-4 animate-onboard-in">
          <p className="font-sans text-[13px] text-primary font-semibold tracking-wide uppercase mb-3">
            Étape 3 sur 4
          </p>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <LocationIllustration />
            <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mt-7 mb-3">
              Activités près{'\n'}de toi
            </h2>
            <p className="font-sans text-[15px] text-muted leading-[1.55] max-w-[270px]">
              Autorise l'accès à ta position pour découvrir les expériences autour de toi.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={next}
              className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white active:opacity-80 transition-opacity"
            >
              Autoriser la localisation
            </button>
            <button
              onClick={next}
              className="w-full h-[44px] font-sans text-[14px] text-muted"
            >
              Ignorer pour l'instant
            </button>
          </div>
        </div>
      )}

      {/* Step: Notifications */}
      {step === 3 && (
        <div key="notifs" className="flex flex-col flex-1 px-6 pt-4 pb-4 animate-onboard-in">
          <p className="font-sans text-[13px] text-primary font-semibold tracking-wide uppercase mb-3">
            Étape 4 sur 4
          </p>
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <NotificationIllustration />
            <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mt-7 mb-3">
              Reste dans{'\n'}la boucle
            </h2>
            <p className="font-sans text-[15px] text-muted leading-[1.55] max-w-[270px]">
              Reçois des alertes pour tes activités réservées et les bons plans à ne pas rater.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={next}
              className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white active:opacity-80 transition-opacity"
            >
              Activer les notifications
            </button>
            <button
              onClick={next}
              className="w-full h-[44px] font-sans text-[14px] text-muted"
            >
              Ignorer pour l'instant
            </button>
          </div>
        </div>
      )}

      <div className="shrink-0" style={{ height: 'max(16px, env(safe-area-inset-bottom))' }} aria-hidden="true" />
    </div>
  );
}

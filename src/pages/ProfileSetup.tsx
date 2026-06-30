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
        <symbol id="bell-icon" viewBox="0 0 24 24">
          <path d="M18.5856 14.7969C18.1807 14.1646 17.9297 13.3838 17.9297 12.5469V9.92969C17.9297 8.34375 17.1484 6.94531 15.8672 6.19141V5.67969C15.8672 4.81641 15.1406 4.08984 14.2773 4.08984C13.4141 4.08984 12.6875 4.81641 12.6875 5.67969V6.19141C11.4062 6.94531 10.625 8.34375 10.625 9.92969V12.5469C10.625 13.3838 10.374 14.1646 9.96914 14.7969C9.67578 15.25 9.54297 15.7344 9.54297 16.25C9.54297 17.9766 10.9414 19.375 12.668 19.375H16.7891C18.5156 19.375 19.9141 17.9766 19.9141 16.25C19.9141 15.7344 19.7812 15.25 19.4879 14.7969H18.5856Z" fill="#5170FF" fillOpacity="0.3"/>
          <path d="M14.2266 20.6328C14.2266 21.6797 13.375 22.5312 12.3281 22.5312C11.2812 22.5312 10.4297 21.6797 10.4297 20.6328" stroke="#5170FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </symbol>
      </defs>

      <circle cx="150" cy="143" r="122" fill="#eef1ff" />

      {/* Card 1 */}
      <rect x="14" y="36" width="272" height="66" rx="16" fill="white" />
      <rect x="28" y="49" width="40" height="40" rx="12" fill="#eef1ff" />
      <use href="#bell-icon" x="32" y="51" width="30" height="30" />
      <text x="78" y="62" fontFamily="sans-serif" fontSize="11.5" fontWeight="800" fill="#1a1a24">&amp;JOY</text>
      <text x="278" y="62" fontFamily="sans-serif" fontSize="9.5" fill="#9090a0" textAnchor="end">il y a 2 min</text>
      <text x="78" y="80" fontFamily="sans-serif" fontSize="11" fill="#1a1a24">Rappel — Jazz Club ce soir à 20h00</text>

      {/* Card 2 */}
      <rect x="14" y="110" width="272" height="66" rx="16" fill="white" />
      <rect x="28" y="123" width="40" height="40" rx="12" fill="#eef1ff" />
      <use href="#bell-icon" x="32" y="125" width="30" height="30" />
      <text x="78" y="136" fontFamily="sans-serif" fontSize="11.5" fontWeight="800" fill="#1a1a24">&amp;JOY</text>
      <text x="278" y="136" fontFamily="sans-serif" fontSize="9.5" fill="#9090a0" textAnchor="end">il y a 18 min</text>
      <text x="78" y="154" fontFamily="sans-serif" fontSize="11" fill="#1a1a24">Pars maintenant pour ton atelier photo</text>

      {/* Card 3 */}
      <rect x="14" y="184" width="272" height="66" rx="16" fill="white" />
      <rect x="28" y="197" width="40" height="40" rx="12" fill="#eef1ff" />
      <use href="#bell-icon" x="32" y="199" width="30" height="30" />
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
  const [activityReminders, setActivityReminders] = useState(true);
  const [newActivities, setNewActivities] = useState(true);
  const [promotions, setPromotions] = useState(true);

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
              Dis-nous ce que{'\n'}tu aimes
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
        <div key="notifs" className="flex flex-col flex-1 px-6 pt-4 pb-4 animate-onboard-in overflow-hidden">
          <p className="font-sans text-[13px] text-primary font-semibold tracking-wide uppercase mb-3">
            Étape 4 sur 4
          </p>
          <h2 className="font-sans font-extrabold text-[28px] leading-[1.15] text-dark mb-2">
            Reste dans{'\n'}la boucle
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[1.5] mb-6">
            Choisis les notifications que tu veux recevoir.
          </p>

          <div className="flex-1 overflow-y-auto flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3 bg-white rounded-2xl px-4 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-[15px] text-dark">Rappels de tes activités</p>
                <p className="font-sans text-[12px] text-muted mt-0.5">Lieu, date, horaire...</p>
              </div>
              <button
                role="switch"
                aria-checked={activityReminders}
                onClick={() => setActivityReminders(!activityReminders)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${activityReminders ? 'bg-primary' : 'bg-black/[0.12]'}`}
              >
                <span className={`absolute top-0.5 left-0 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${activityReminders ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 bg-white rounded-2xl px-4 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-[15px] text-dark">Nouvelles activités</p>
                <p className="font-sans text-[12px] text-muted mt-0.5">Basées sur tes préférences</p>
              </div>
              <button
                role="switch"
                aria-checked={newActivities}
                onClick={() => setNewActivities(!newActivities)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${newActivities ? 'bg-primary' : 'bg-black/[0.12]'}`}
              >
                <span className={`absolute top-0.5 left-0 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${newActivities ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 bg-white rounded-2xl px-4 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-[15px] text-dark">Promotions</p>
                <p className="font-sans text-[12px] text-muted mt-0.5">Offres spéciales et bons plans</p>
              </div>
              <button
                role="switch"
                aria-checked={promotions}
                onClick={() => setPromotions(!promotions)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${promotions ? 'bg-primary' : 'bg-black/[0.12]'}`}
              >
                <span className={`absolute top-0.5 left-0 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${promotions ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 shrink-0 pt-4">
            <button
              onClick={next}
              className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white active:opacity-80 transition-opacity"
            >
              Continuer
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

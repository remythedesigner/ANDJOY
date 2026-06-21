import { useState } from 'react';

type Step = 'email' | 'signin' | 'signup';

// Simulate known accounts — any other email triggers the sign-up flow
const KNOWN_EMAILS = new Set(['demo@joy.fr', 'sofia@example.com', 'test@test.com']);

interface Props {
  onComplete: () => void;
  onBack: () => void;
}

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="#1a1a24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EyeIcon({ off }: { off?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 10s3-5.5 8-5.5S18 10 18 10s-3 5.5-8 5.5S2 10 2 10z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.4" />
      {off && <path d="M3 3l14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />}
    </svg>
  );
}

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M9.5 1.5l2 2L4 11H2v-2L9.5 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailChip({ email, onEdit }: { email: string; onEdit: () => void }) {
  return (
    <button
      onClick={onEdit}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.1] font-sans text-[13px] text-dark mt-3 mb-8 active:opacity-70 transition-opacity"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      {email}
      <span className="text-muted"><EditIcon /></span>
    </button>
  );
}

export default function AuthEmailScreen({ onComplete, onBack }: Props) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBack = () => {
    if (step === 'email') {
      onBack();
    } else {
      setStep('email');
      setPassword('');
      setConfirmPassword('');
      setShowConfirm(false);
    }
  };

  const handleEmailSubmit = () => {
    const isKnown = KNOWN_EMAILS.has(email.toLowerCase().trim());
    setStep(isKnown ? 'signin' : 'signup');
  };

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(20px, env(safe-area-inset-top))' }} aria-hidden="true" />

      {/* Header */}
      <div className="flex items-center px-4 pt-3 pb-2 shrink-0">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full active:bg-black/5 transition-colors"
          aria-label="Retour"
        >
          <BackIcon />
        </button>
        <div className="flex-1 flex justify-center">
          <img src={import.meta.env.BASE_URL + "logo.svg"} alt="&JOY" className="h-[36px] w-auto" />
        </div>
        <div className="w-10" />
      </div>

      {/* ── Step: Email ── */}
      {step === 'email' && (
        <div key="email" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-2">
            Ton adresse e-mail
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[1.5] mb-8">
            Entre ton e-mail pour continuer.
          </p>

          <input
            key="email-input"
            type="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && email.includes('@') && handleEmailSubmit()}
            placeholder="Adresse e-mail"
            className="w-full h-[56px] rounded-2xl bg-white border border-black/[0.1] px-4 font-sans text-[16px] text-dark placeholder:text-muted outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
          />

          <div className="flex-1" />

          <button
            onClick={handleEmailSubmit}
            disabled={!email.includes('@')}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity"
          >
            Continuer
          </button>
        </div>
      )}

      {/* ── Step: Sign in ── */}
      {step === 'signin' && (
        <div key="signin" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-1">
            Bienvenue !
          </h2>
          <EmailChip email={email} onEdit={() => setStep('email')} />

          <div className="relative mb-3">
            <input
              key="password-input"
              type={showPassword ? 'text' : 'password'}
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full h-[56px] rounded-2xl bg-white border border-black/[0.1] px-4 pr-12 font-sans text-[16px] text-dark placeholder:text-muted outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>

          <button className="font-sans text-[13px] text-primary font-semibold self-end mb-4">
            Mot de passe oublié ?
          </button>

          <div className="flex-1" />

          <button
            onClick={onComplete}
            disabled={password.length < 6}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity mb-5"
          >
            Se connecter
          </button>

          <p className="font-sans text-[13px] text-muted text-center leading-[1.6]">
            Pas encore de compte ?{' '}
            <button onClick={() => setStep('signup')} className="text-primary font-semibold">
              Créer un compte
            </button>
          </p>
        </div>
      )}

      {/* ── Step: Sign up ── */}
      {step === 'signup' && (
        <div key="signup" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-1">
            Crée ton compte
          </h2>
          <EmailChip email={email} onEdit={() => setStep('email')} />

          <div className="flex flex-col gap-3 mb-6">
            <div className="relative">
              <input
                key="signup-password-input"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={e => setPassword(e.target.value)}
                onClick={() => setShowConfirm(true)}
                placeholder="Choisis un mot de passe"
                className="w-full h-[56px] rounded-2xl bg-white border border-black/[0.1] px-4 pr-12 font-sans text-[16px] text-dark placeholder:text-muted outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
              >
                <EyeIcon off={showPassword} />
              </button>
            </div>
            {showConfirm && (
              <input
                key="confirm-input"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirme ton mot de passe"
                className="w-full h-[56px] rounded-2xl bg-white border border-black/[0.1] px-4 font-sans text-[16px] text-dark placeholder:text-muted outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all animate-onboard-in"
              />
            )}
          </div>

          <div className="flex-1" />

          <button
            onClick={onComplete}
            disabled={password.length < 6 || confirmPassword !== password}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity mb-5"
          >
            Créer mon compte
          </button>

          <p className="font-sans text-[13px] text-muted text-center leading-[1.6]">
            Déjà un compte ?{' '}
            <button onClick={() => setStep('signin')} className="text-primary font-semibold">
              Se connecter
            </button>
          </p>
        </div>
      )}

      <div className="shrink-0" style={{ height: 'max(16px, env(safe-area-inset-bottom))' }} aria-hidden="true" />
    </div>
  );
}

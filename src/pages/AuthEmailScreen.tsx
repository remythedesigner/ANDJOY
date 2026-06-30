import { useState } from 'react';

type Step = 'email' | 'verify-code' | 'signin' | 'signup' | 'forgot-password' | 'reset-password';

// Simulate known accounts — any other email triggers the sign-up flow
const KNOWN_EMAILS = new Set(['demo@joy.fr', 'sofia@example.com', 'test@test.com', 'laura@andjoy-app.com']);

const PASSWORD_REQUIREMENTS = {
  minLength: 8,
  hasDigit: /\d/,
  hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

interface PasswordRequirements {
  minLength: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
}

function validatePassword(password: string): PasswordRequirements {
  return {
    minLength: password.length >= PASSWORD_REQUIREMENTS.minLength,
    hasDigit: PASSWORD_REQUIREMENTS.hasDigit.test(password),
    hasSpecial: PASSWORD_REQUIREMENTS.hasSpecial.test(password),
  };
}

function isPasswordValid(requirements: PasswordRequirements): boolean {
  return requirements.minLength && requirements.hasDigit && requirements.hasSpecial;
}

interface Props {
  onCompleteSignup: () => void;
  onCompleteSignin: () => void;
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

function CheckIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke={filled ? '#5170ff' : '#ccc'} strokeWidth="1.5" />
      {filled && <path d="M5 8l2 2 4-4" stroke="#5170ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function PasswordRequirements({ password }: { password: string }) {
  const reqs = validatePassword(password);
  return (
    <div className="mt-1.5 mb-6 space-y-1">
      <p className="font-sans text-[12px] text-muted font-semibold">Conditions requises :</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <CheckIcon filled={reqs.minLength} />
          <span className={`font-sans text-[13px] ${reqs.minLength ? 'text-dark' : 'text-muted'}`}>
            Au moins {PASSWORD_REQUIREMENTS.minLength} caractères
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckIcon filled={reqs.hasDigit} />
          <span className={`font-sans text-[13px] ${reqs.hasDigit ? 'text-dark' : 'text-muted'}`}>
            Au moins 1 chiffre (0-9)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckIcon filled={reqs.hasSpecial} />
          <span className={`font-sans text-[13px] ${reqs.hasSpecial ? 'text-dark' : 'text-muted'}`}>
            Au moins 1 caractère spécial (!@#$%^&*, etc.)
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AuthEmailScreen({ onCompleteSignup, onCompleteSignin, onBack }: Props) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleBack = () => {
    if (step === 'email') {
      onBack();
    } else if (step === 'verify-code') {
      setStep('email');
      setVerificationCode('');
    } else if (step === 'forgot-password') {
      setStep('signin');
      setResetEmail('');
    } else if (step === 'reset-password') {
      setStep('forgot-password');
      setVerificationCode('');
      setPassword('');
      setConfirmPassword('');
      setShowConfirm(false);
    } else {
      setStep('email');
      setPassword('');
      setConfirmPassword('');
      setShowConfirm(false);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      const isKnown = KNOWN_EMAILS.has(email.toLowerCase().trim());
      setStep(isKnown ? 'signin' : 'signup');
      setVerificationCode('');
    }
  };

  const handleEmailSubmit = () => {
    const isKnown = KNOWN_EMAILS.has(email.toLowerCase().trim());
    setStep(isKnown ? 'signin' : 'verify-code');
  };

  const handleForgotPasswordSubmit = () => {
    setStep('reset-password');
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

      {/* ── Step: Verify Code ── */}
      {step === 'verify-code' && (
        <div key="verify-code" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-2">
            Vérifie ton email
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[1.5] mb-8">
            Nous avons envoyé un code à <br />
            <span className="font-semibold text-dark">{email}</span>
          </p>

          <div className="flex gap-2 justify-center mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                autoFocus={index === 0}
                inputMode="numeric"
                maxLength={1}
                value={verificationCode[index] || ''}
                onChange={e => {
                  const digit = e.target.value.replace(/\D/g, '');
                  if (digit) {
                    const newCode = verificationCode.split('');
                    newCode[index] = digit;
                    setVerificationCode(newCode.join(''));

                    // Auto-focus to next field if not the last one
                    if (index < 5) {
                      const nextInput = document.querySelector(`input[data-digit="${index + 1}"]`) as HTMLInputElement;
                      if (nextInput) nextInput.focus();
                    }
                  }
                }}
                onKeyDown={e => {
                  // Handle backspace to go to previous field
                  if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                    const prevInput = document.querySelector(`input[data-digit="${index - 1}"]`) as HTMLInputElement;
                    if (prevInput) prevInput.focus();
                  }
                }}
                data-digit={index}
                className="w-12 h-12 rounded-2xl bg-white border border-black/[0.1] font-sans text-[24px] text-dark text-center outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
              />
            ))}
          </div>

          <button className="font-sans text-[13px] text-primary font-semibold self-center mb-4">
            Renvoyer le code
          </button>

          <div className="flex-1" />

          <button
            onClick={handleVerifyCode}
            disabled={verificationCode.length !== 6}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity mb-5"
          >
            Vérifier
          </button>

          <p className="font-sans text-[13px] text-muted text-center leading-[1.6]">
            Pas le bon email ?{' '}
            <button onClick={() => {setStep('email'); setVerificationCode('');}} className="text-primary font-semibold">
              Changer l'email
            </button>
          </p>
        </div>
      )}

      {/* ── Step: Sign in ── */}
      {step === 'signin' && (
        <div key="signin" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-6">
            Ton mot de passe
          </h2>

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

          <button onClick={() => setStep('forgot-password')} className="font-sans text-[13px] text-primary font-semibold self-end mb-4">
            Mot de passe oublié ?
          </button>

          <div className="flex-1" />

          <button
            onClick={onCompleteSignin}
            disabled={!password}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity mb-5"
          >
            Se connecter
          </button>
        </div>
      )}

      {/* ── Step: Sign up ── */}
      {step === 'signup' && (
        <div key="signup" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-6">
            Crée ton compte
          </h2>

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
            {password && <PasswordRequirements password={password} />}
            {isPasswordValid(validatePassword(password)) && (
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
            onClick={onCompleteSignup}
            disabled={!isPasswordValid(validatePassword(password)) || confirmPassword !== password}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity mb-5"
          >
            Créer mon compte
          </button>
        </div>
      )}

      {/* ── Step: Forgot Password ── */}
      {step === 'forgot-password' && (
        <div key="forgot-password" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-2">
            Réinitialise ton mot de passe
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[1.5] mb-8">
            Entre ton adresse e-mail pour recevoir un code de réinitialisation.
          </p>

          <input
            key="reset-email-input"
            type="email"
            autoFocus
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && resetEmail.includes('@') && handleForgotPasswordSubmit()}
            placeholder="Adresse e-mail"
            className="w-full h-[56px] rounded-2xl bg-white border border-black/[0.1] px-4 font-sans text-[16px] text-dark placeholder:text-muted outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
          />

          <div className="flex-1" />

          <button
            onClick={handleForgotPasswordSubmit}
            disabled={!resetEmail.includes('@')}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity mb-5"
          >
            Envoyer le code
          </button>
        </div>
      )}

      {/* ── Step: Reset Password ── */}
      {step === 'reset-password' && (
        <div key="reset-password" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-2">
            Vérifie ton email
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[1.5] mb-8">
            Nous avons envoyé un code à <br />
            <span className="font-semibold text-dark">{resetEmail}</span>
          </p>

          <div className="flex gap-2 justify-center mb-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                autoFocus={index === 0}
                inputMode="numeric"
                maxLength={1}
                value={verificationCode[index] || ''}
                onChange={e => {
                  const digit = e.target.value.replace(/\D/g, '');
                  if (digit) {
                    const newCode = verificationCode.split('');
                    newCode[index] = digit;
                    setVerificationCode(newCode.join(''));

                    if (index < 5) {
                      const nextInput = document.querySelector(`input[data-reset-digit="${index + 1}"]`) as HTMLInputElement;
                      if (nextInput) nextInput.focus();
                    }
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
                    const prevInput = document.querySelector(`input[data-reset-digit="${index - 1}"]`) as HTMLInputElement;
                    if (prevInput) prevInput.focus();
                  }
                }}
                data-reset-digit={index}
                className="w-12 h-12 rounded-2xl bg-white border border-black/[0.1] font-sans text-[24px] text-dark text-center outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all"
              />
            ))}
          </div>

          <button className="font-sans text-[13px] text-primary font-semibold self-center mb-4">
            Renvoyer le code
          </button>

          <div className="flex-1" />

          <button
            onClick={() => {
              if (verificationCode.length === 6) {
                setPassword('');
                setConfirmPassword('');
                setShowConfirm(false);
                setShowPassword(false);
              }
            }}
            disabled={verificationCode.length !== 6}
            className="w-full h-[54px] bg-primary rounded-full font-sans font-bold text-[15px] text-white disabled:opacity-35 active:opacity-80 transition-opacity mb-5"
          >
            Vérifier
          </button>

          <p className="font-sans text-[13px] text-muted text-center leading-[1.6]">
            Pas le bon email ?{' '}
            <button onClick={() => {setStep('forgot-password'); setVerificationCode('');}} className="text-primary font-semibold">
              Changer l'email
            </button>
          </p>
        </div>
      )}

      <div className="shrink-0" style={{ height: 'max(16px, env(safe-area-inset-bottom))' }} aria-hidden="true" />
    </div>
  );
}

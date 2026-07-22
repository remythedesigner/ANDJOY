import { useState } from 'react';
import { PrimaryButton, SafeAreaSpacer } from '../components/atoms';

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
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
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
      <circle cx="8" cy="8" r="7" stroke={filled ? '#22c55e' : '#ccc'} strokeWidth="1.5" />
      {filled && <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

function PasswordRequirements({ password }: { password: string }) {
  const reqs = validatePassword(password);
  return (
    <div className="space-y-1.5">
      <p className="font-sans text-[12px] text-muted font-bold">Conditions requises :</p>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <CheckIcon filled={reqs.minLength} />
          <span className={`font-sans text-[12px] leading-[1.3] ${reqs.minLength ? 'text-dark' : 'text-muted'}`}>
            Au moins {PASSWORD_REQUIREMENTS.minLength} caractères
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckIcon filled={reqs.hasDigit} />
          <span className={`font-sans text-[12px] leading-[1.3] ${reqs.hasDigit ? 'text-dark' : 'text-muted'}`}>
            Au moins 1 chiffre (0-9)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <CheckIcon filled={reqs.hasSpecial} />
          <span className={`font-sans text-[12px] leading-[1.3] ${reqs.hasSpecial ? 'text-dark' : 'text-muted'}`}>
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
      <SafeAreaSpacer size="lg" />

      {/* Header */}
      <div className="flex items-center px-4 pt-3 pb-2 shrink-0">
        <button
          onClick={handleBack}
          className="size-9 bg-white/65 backdrop-blur-[2px] flex items-center justify-center rounded-full transition-opacity active:opacity-70"
          aria-label="Retour"
        >
          <BackIcon />
        </button>
        <div className="flex-1 flex justify-center">
          <img src={import.meta.env.BASE_URL + "logo.svg"} alt="&JOY" className="h-[39px] w-[60px]" />
        </div>
        <div className="size-9" />
      </div>

      {/* ── Step: Email ── */}
      {step === 'email' && (
        <div key="email" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-4">
            Ton adresse e-mail
          </h2>
          <p className="typo-body text-muted mb-4">
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
            className="w-full h-[56px] rounded-2xl bg-white px-4 typo-input text-dark placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/15 transition-all"
          />

          <div className="flex-1" />

          <PrimaryButton onClick={handleEmailSubmit} disabled={!email.includes('@')} className="shadow-[0px_2px_6px_rgba(0,0,0,0.12)]">
            Continuer
          </PrimaryButton>
        </div>
      )}

      {/* ── Step: Verify Code ── */}
      {step === 'verify-code' && (
        <div key="verify-code" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-4">
            Vérifie ton email
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[20px] mb-4">
            Nous avons envoyé un code à <br />
            <span className="text-dark">{email}</span>
          </p>

          <div className="flex gap-2 justify-center mt-10 mb-4">
            {Array.from({ length: 6 }).map((_, index) => {
              const filled = !!verificationCode[index];
              return (
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
                  className={`w-12 h-12 rounded-2xl bg-white font-sans font-bold text-[24px] text-dark text-center outline-none focus:ring-2 focus:ring-primary/15 transition-all ${
                    filled ? 'border-2 border-primary' : 'border border-dark'
                  }`}
                />
              );
            })}
          </div>

          <button className="typo-eyebrow text-primary self-center mb-4">
            Renvoyer le code
          </button>

          <div className="flex-1" />

          <PrimaryButton onClick={handleVerifyCode} disabled={verificationCode.length !== 6} className="mb-5 shadow-[0px_2px_6px_rgba(0,0,0,0.12)]">
            Vérifier
          </PrimaryButton>

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
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-4">
            Ton mot de passe
          </h2>

          <div className="relative mb-4">
            <input
              key="password-input"
              type={showPassword ? 'text' : 'password'}
              autoFocus
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full h-[56px] rounded-2xl bg-white px-4 pr-12 typo-input text-dark placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/15 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
            >
              <EyeIcon off={showPassword} />
            </button>
          </div>

          <button onClick={() => setStep('forgot-password')} className="typo-eyebrow text-primary self-end mb-4">
            Mot de passe oublié ?
          </button>

          <div className="flex-1" />

          <PrimaryButton onClick={onCompleteSignin} disabled={!password} className="mb-5 shadow-[0px_2px_6px_rgba(0,0,0,0.12)]">
            Se connecter
          </PrimaryButton>
        </div>
      )}

      {/* ── Step: Sign up ── */}
      {step === 'signup' && (
        <div key="signup" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-4">
            Crée ton compte
          </h2>

          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col gap-2">
              <label className="typo-title text-dark">Mot de passe</label>
              <div className="relative">
                <input
                  key="signup-password-input"
                  type={showPassword ? 'text' : 'password'}
                  autoFocus
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onClick={() => setShowConfirm(true)}
                  placeholder="Choisis un mot de passe"
                  className="w-full h-[56px] rounded-2xl bg-white px-4 pr-12 typo-input text-dark placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                >
                  <EyeIcon off={showPassword} />
                </button>
              </div>
            </div>
            {password && <PasswordRequirements password={password} />}
            {isPasswordValid(validatePassword(password)) && (
              <div className="flex flex-col gap-2 animate-onboard-in">
                <label className="typo-title text-dark">Confirme ton mot de passe</label>
                <input
                  key="confirm-input"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirme ton mot de passe"
                  className="w-full h-[56px] rounded-2xl bg-white px-4 typo-input text-dark placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/15 transition-all"
                />
              </div>
            )}
          </div>

          <div className="flex-1" />

          <PrimaryButton onClick={onCompleteSignup} disabled={!isPasswordValid(validatePassword(password)) || confirmPassword !== password} className="mb-5 shadow-[0px_2px_6px_rgba(0,0,0,0.12)]">
            Créer mon compte
          </PrimaryButton>
        </div>
      )}

      {/* ── Step: Forgot Password ── */}
      {step === 'forgot-password' && (
        <div key="forgot-password" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-4">
            Réinitialise ton mot de passe
          </h2>
          <p className="typo-body text-muted mb-4">
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
            className="w-full h-[56px] rounded-2xl bg-white px-4 typo-input text-dark placeholder:text-muted outline-none focus:ring-2 focus:ring-primary/15 transition-all"
          />

          <div className="flex-1" />

          <PrimaryButton onClick={handleForgotPasswordSubmit} disabled={!resetEmail.includes('@')} className="mb-5 shadow-[0px_2px_6px_rgba(0,0,0,0.12)]">
            Envoyer le code
          </PrimaryButton>
        </div>
      )}

      {/* ── Step: Reset Password ── */}
      {step === 'reset-password' && (
        <div key="reset-password" className="flex flex-col flex-1 px-6 pt-8 pb-4 animate-onboard-in">
          <h2 className="font-sans font-extrabold text-[30px] leading-[1.15] text-dark mb-4">
            Vérifie ton email
          </h2>
          <p className="font-sans text-[14px] text-muted leading-[20px] mb-4">
            Nous avons envoyé un code à <br />
            <span className="text-dark">{resetEmail}</span>
          </p>

          <div className="flex gap-2 justify-center mt-10 mb-4">
            {Array.from({ length: 6 }).map((_, index) => {
              const filled = !!verificationCode[index];
              return (
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
                  className={`w-12 h-12 rounded-2xl bg-white font-sans font-bold text-[24px] text-dark text-center outline-none focus:ring-2 focus:ring-primary/15 transition-all ${
                    filled ? 'border-2 border-primary' : 'border border-dark'
                  }`}
                />
              );
            })}
          </div>

          <button className="typo-eyebrow text-primary self-center mb-4">
            Renvoyer le code
          </button>

          <div className="flex-1" />

          <PrimaryButton
            onClick={() => {
              if (verificationCode.length === 6) {
                setPassword('');
                setConfirmPassword('');
                setShowConfirm(false);
                setShowPassword(false);
              }
            }}
            disabled={verificationCode.length !== 6}
            className="mb-5 shadow-[0px_2px_6px_rgba(0,0,0,0.12)]"
          >
            Vérifier
          </PrimaryButton>

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

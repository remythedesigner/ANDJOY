import { useEffect } from 'react';

interface Props {
  provider: 'apple' | 'google';
  onComplete: () => void;
  onBack: () => void;
}

function AppleLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 18 18" fill="white" aria-hidden="true">
      <path d="M14.05 9.55c-.02-2.05 1.68-3.04 1.75-3.09-.95-1.39-2.43-1.58-2.96-1.6-1.26-.13-2.46.74-3.1.74-.64 0-1.63-.72-2.68-.7-1.38.02-2.66.8-3.37 2.03C2.17 9.23 3.17 12.85 4.67 14.79c.74 1.05 1.62 2.23 2.77 2.19 1.12-.05 1.54-.71 2.89-.71 1.35 0 1.73.71 2.9.69 1.2-.02 1.96-1.07 2.69-2.13.85-1.22 1.2-2.4 1.22-2.46-.03-.01-2.34-.9-2.36-3.58-.02 0-.02 0 0 .01zM11.97 3.22c.6-.73 1-1.73.89-2.73-.87.04-1.91.58-2.53 1.31-.56.64-1.05 1.67-.92 2.65.97.07 1.96-.49 2.56-1.23z" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

export default function AuthProviderScreen({ provider, onComplete, onBack }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const isApple = provider === 'apple';

  return (
    <div className="flex flex-col min-h-svh bg-cream items-center justify-center gap-8 animate-onboard-in">
      <div
        className="w-[88px] h-[88px] rounded-[26px] flex items-center justify-center"
        style={{
          backgroundColor: isApple ? '#1a1a24' : 'white',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}
      >
        {isApple ? <AppleLogo /> : <GoogleLogo />}
      </div>

      <div className="text-center">
        <p className="font-sans font-bold text-[18px] text-dark mb-1">
          Connexion avec {isApple ? 'Apple' : 'Google'}
        </p>
        <p className="font-sans text-[14px] text-muted">
          Vérification en cours...
        </p>
      </div>

      <div className="w-7 h-7 border-[2.5px] border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );
}

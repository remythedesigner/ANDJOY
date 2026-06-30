interface WelcomeScreenProps {
  onApple: () => void;
  onGoogle: () => void;
  onEmail: () => void;
  onLogoTap?: () => void;
}


function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <path d="M14.05 9.55c-.02-2.05 1.68-3.04 1.75-3.09-.95-1.39-2.43-1.58-2.96-1.6-1.26-.13-2.46.74-3.1.74-.64 0-1.63-.72-2.68-.7-1.38.02-2.66.8-3.37 2.03C2.17 9.23 3.17 12.85 4.67 14.79c.74 1.05 1.62 2.23 2.77 2.19 1.12-.05 1.54-.71 2.89-.71 1.35 0 1.73.71 2.9.69 1.2-.02 1.96-1.07 2.69-2.13.85-1.22 1.2-2.4 1.22-2.46-.03-.01-2.34-.9-2.36-3.58-.02 0-.02 0 0 .01zM11.97 3.22c.6-.73 1-1.73.89-2.73-.87.04-1.91.58-2.53 1.31-.56.64-1.05 1.67-.92 2.65.97.07 1.96-.49 2.56-1.23z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}

export default function WelcomeScreen({ onApple, onGoogle, onEmail, onLogoTap }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-svh bg-cream overflow-hidden">
      <div className="shrink-0" style={{ height: 'max(20px, env(safe-area-inset-top))' }} aria-hidden="true" />

      {/* Logo */}
      <div className="flex justify-center pt-6 px-6">
        <img src={import.meta.env.BASE_URL + "logo.svg"} alt="&JOY" className="h-[44px] w-auto" onClick={onLogoTap} style={onLogoTap ? { cursor: 'pointer' } : undefined} />
      </div>

      {/* Headline */}
      <div className="px-20 pt-7 text-center">
        <h1 className="font-sans font-extrabold text-[36px] leading-[1.1] text-dark">
          Mets plus de joie<br />dans tes sorties à Paris
        </h1>
      </div>

      {/* Illustration placeholder */}
      <div className="flex-1 px-6 py-6 flex flex-col">
        <div className="flex-1 rounded-[32px] bg-white/60 border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-3 text-black/20">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="8" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" />
            <circle cx="14" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M4 28l8-7 6 6 4-4 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-sans font-semibold text-[13px]">Illustration</span>
        </div>
      </div>

      {/* Auth buttons */}
      <div className="px-5 flex flex-col gap-3 pb-4">
        <button
          onClick={onApple}
          className="w-full h-[54px] bg-[#1a1a24] rounded-full flex items-center justify-center gap-3 active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark"
        >
          <span className="text-white"><AppleIcon /></span>
          <span className="font-sans font-bold text-[15px] text-white">Continuer avec Apple</span>
        </button>

        <button
          onClick={onGoogle}
          className="w-full h-[54px] bg-white border border-black/[0.12] rounded-full flex items-center justify-center gap-3 active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <GoogleIcon />
          <span className="font-sans font-bold text-[15px] text-dark">Continuer avec Google</span>
        </button>

        <button
          onClick={onEmail}
          className="w-full h-[54px] bg-white border border-black/[0.12] rounded-full flex items-center justify-center gap-3 active:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#1a1a24" strokeWidth="1.4" />
            <path d="M1.5 6.5L9 11L16.5 6.5" stroke="#1a1a24" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="font-sans font-bold text-[15px] text-dark">Continuer avec un email</span>
        </button>
      </div>

      {/* Legal notice */}
      <div className="text-center px-6 pb-4">
        <p className="font-sans text-[12px] text-muted leading-[1.6]">
          En continuant, tu acceptes les{' '}
          <span className="underline">Conditions Générales d'Utilisation</span>
          {' '}et la{' '}
          <span className="underline">Politique de Confidentialité</span>.
        </p>
      </div>

      <div className="shrink-0" style={{ height: 'max(16px, env(safe-area-inset-bottom))' }} aria-hidden="true" />
    </div>
  );
}

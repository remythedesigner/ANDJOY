import { ASSETS } from '../../utils/data';

export default function AppHeader({ onOpenProfile }: { onOpenProfile?: () => void }) {
  return (
    <header className="flex items-center justify-between px-6 py-2 w-full">
      {/* &JOY Logo */}
      <a href={import.meta.env.BASE_URL} aria-label="&JOY – Accueil" className="shrink-0">
        <img
          src={import.meta.env.BASE_URL + "logo.svg"}
          alt="&JOY"
          className="h-[39px] w-[60px]"
          width={60}
          height={39}
        />
      </a>

      {/* Right side: location + profile */}
      <div className="flex items-center gap-2">
        {/* Location badge */}
        <div className="bg-[#FDFAF9] rounded-[30px] flex items-center gap-2 px-4 py-2">
          <span className="relative flex size-[6px] shrink-0" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-[6px] rounded-full bg-primary" />
          </span>
          <span className="font-sans font-semibold text-[14px] text-dark-warm whitespace-nowrap">
            Paris 11e
          </span>
          <span className="font-sans font-medium text-[14px] text-muted whitespace-nowrap">
            ☀️ 27°
          </span>
        </div>

        {/* Profile button */}
        <button
          onClick={onOpenProfile}
          className="border-[2.5px] border-[#eef1ff] rounded-full overflow-hidden size-[38px] shrink-0 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none active:opacity-75 transition-opacity"
          aria-label="Profil utilisateur"
        >
          <img
            src={ASSETS.profilePic}
            alt="Sofia"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}

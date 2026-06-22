type Tab = 'Accueil' | 'Carte' | 'Billets' | 'Profil';

interface AppFooterProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

const base = import.meta.env.BASE_URL;
const navItems: { label: Tab; icon: string; activeIcon: string; sparkle?: string }[] = [
  {
    label: 'Accueil',
    icon: base + 'icons/tab-home.svg',
    activeIcon: base + 'icons/tab-home-active.svg',
    sparkle: base + 'icons/tab-home-sparkle.svg',
  },
  {
    label: 'Carte',
    icon: base + 'icons/tab-carte.svg',
    activeIcon: base + 'icons/tab-carte-active.svg',
    sparkle: base + 'icons/tab-carte-sparkle.svg',
  },
  { label: 'Billets', icon: base + 'icons/tab-billets.svg', activeIcon: base + 'icons/tab-billets-active.svg', sparkle: base + 'icons/tab-billets-sparkle.svg' },
  { label: 'Profil', icon: base + 'icons/tab-profil.svg', activeIcon: base + 'icons/tab-profil-active.svg', sparkle: base + 'icons/tab-profil-sparkle.svg' },
];

export default function AppFooter({ activeTab = 'Accueil', onTabChange }: AppFooterProps) {
  return (
    <footer className="sticky bottom-0 bg-[#FDFAF9] border-t border-black/[0.05]" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
      <nav aria-label="Navigation principale">
        <ul className="flex items-center justify-center gap-10 list-none p-0 m-0 px-4 py-4">
          {navItems.map(({ icon, activeIcon, label, sparkle }) => {
            const active = label === activeTab;
            return (
              <li key={label} className="relative">
                {active && sparkle && (
                  <img
                    src={sparkle}
                    alt=""
                    aria-hidden="true"
                    className="absolute w-[29px] h-[11px] left-2 -top-2 pointer-events-none"
                  />
                )}
                <button
                  onClick={() => onTabChange?.(label)}
                  className="flex flex-col items-center gap-0.5 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-2xl"
                  aria-current={active ? 'page' : undefined}
                  aria-label={label}
                >
                  <div
                    className={`flex items-center justify-center w-11 h-9 rounded-2xl ${
                      active ? 'bg-primary-light' : ''
                    }`}
                  >
                    <img src={active ? activeIcon : icon} alt="" aria-hidden="true" className="w-[22px] h-[22px]" />
                  </div>
                  <span
                    className={`font-sans text-[12px] leading-[16.32px] ${
                      active ? 'font-extrabold text-primary' : 'font-medium text-muted'
                    }`}
                  >
                    {label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}

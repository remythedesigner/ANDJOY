type Tab = 'Accueil' | 'Carte' | 'Billets' | 'Profil';

interface AppFooterProps {
  activeTab?: Tab;
  onTabChange?: (tab: Tab) => void;
}

const navItems: { label: Tab; icon: string; activeIcon: string; sparkle?: string }[] = [
  {
    label: 'Accueil',
    icon: '/icons/tab-home.svg',
    activeIcon: '/icons/tab-home-active.svg',
    sparkle: '/icons/tab-home-sparkle.svg',
  },
  {
    label: 'Carte',
    icon: '/icons/tab-carte.svg',
    activeIcon: '/icons/tab-carte-active.svg',
    sparkle: '/icons/tab-carte-sparkle.svg',
  },
  { label: 'Billets', icon: '/icons/tab-billets.svg', activeIcon: '/icons/tab-billets-active.svg', sparkle: '/icons/tab-billets-sparkle.svg' },
  { label: 'Profil', icon: '/icons/tab-profil.svg', activeIcon: '/icons/tab-profil-active.svg', sparkle: '/icons/tab-profil-sparkle.svg' },
];

export default function AppFooter({ activeTab = 'Accueil', onTabChange }: AppFooterProps) {
  return (
    <footer className="sticky bottom-0 bg-[#FDFAF9] border-t border-black/[0.05]">
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

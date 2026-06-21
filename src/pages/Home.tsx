import { Suspense } from 'react';
import AppHeader from '../components/organisms/AppHeader';
import GreetingSection from '../components/organisms/GreetingSection';
import HeroCarousel from '../components/organisms/HeroCarousel';
import EventsSection from '../components/organisms/EventsSection';
import CommunitySection from '../components/organisms/CommunitySection';
import GeoBlock from '../components/organisms/GeoBlock';
import AppFooter from '../components/organisms/AppFooter';
import { ASSETS, lovedEvents, teamFavorites } from '../utils/data';

type Tab = 'Accueil' | 'Carte' | 'Billets' | 'Profil';

interface HomeContentProps {
  onTabChange: (tab: Tab) => void;
  onOpenEvent: () => void;
  onOpenProfile: () => void;
}

function HomeContent({ onTabChange, onOpenEvent, onOpenProfile }: HomeContentProps) {
  return (
    <div className="flex flex-col min-h-svh bg-cream">
      {/* iOS-style status bar spacer */}
      <div className="shrink-0 bg-cream" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      <AppHeader onOpenProfile={onOpenProfile} />

      <main className="flex flex-col flex-1 overflow-x-hidden pb-4">
        <GreetingSection />
        <HeroCarousel onCardClick={onOpenEvent} />
        <EventsSection
          iconSrc={ASSETS.icons.star}
          title="Tu vas adorer"
          events={lovedEvents}
          id="loves"
          onCardClick={onOpenEvent}
        />
        <CommunitySection onEventClick={onOpenEvent} />
        <EventsSection
          iconSrc={ASSETS.icons.teamHeart}
          title="Coups de cœur de l'équipe"
          events={teamFavorites}
          id="team-picks"
          onCardClick={onOpenEvent}
        />
        <GeoBlock onCardClick={onOpenEvent} onViewMap={() => onTabChange('Carte')} />
        {/* Made in Paris */}
        <div className="flex items-center justify-center gap-1.5 py-6">
          <span className="font-sans text-[13px] text-muted">Fait à Paris avec</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M7 12.5C7 12.5 1 8.5 1 4.5C1 2.567 2.567 1 4.5 1C5.6 1 6.574 1.524 7 2.35C7.426 1.524 8.4 1 9.5 1C11.433 1 13 2.567 13 4.5C13 8.5 7 12.5 7 12.5Z" fill="#FF6366"/>
          </svg>
        </div>
      </main>

      <AppFooter activeTab="Accueil" onTabChange={onTabChange} />
    </div>
  );
}

interface HomeProps {
  onTabChange: (tab: Tab) => void;
  onOpenEvent: () => void;
  onOpenProfile: () => void;
}

export default function Home({ onTabChange, onOpenEvent, onOpenProfile }: HomeProps) {
  return (
    <Suspense fallback={
      <div className="min-h-svh bg-cream flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="font-sans text-muted text-sm">Chargement…</p>
        </div>
      </div>
    }>
      <HomeContent onTabChange={onTabChange} onOpenEvent={onOpenEvent} onOpenProfile={onOpenProfile} />
    </Suspense>
  );
}

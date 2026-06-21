import { useState, Fragment } from 'react';
import AppFooter from '../components/organisms/AppFooter';
import { ASSETS } from '../utils/data';
import { PersonalInfoPage, PreferencesPage, PaymentMethodsPage, SettingsPage, HelpPage } from './ProfileSubPages';

type Tab = 'Accueil' | 'Carte' | 'Billets' | 'Profil';
type SubPage = 'personal' | 'preferences' | 'payment' | 'settings' | 'help' | null;

interface ProfilePageProps {
  onTabChange: (tab: Tab) => void;
  onSignOut?: () => void;
}

const STATS = [
  { value: '12', label: 'Sorties' },
  { value: '4', label: 'À venir' },
];

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-muted">
      <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTile({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <div className="size-10 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: bg }}>
      {children}
    </div>
  );
}

function Row({ icon, label, sub, onClick }: { icon: React.ReactNode; label: string; sub: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full py-3.5 px-4 active:bg-black/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
    >
      {icon}
      <div className="flex-1 text-left min-w-0">
        <p className="font-sans font-semibold text-[15px] text-dark leading-tight">{label}</p>
        <p className="font-sans text-[13px] text-muted mt-0.5">{sub}</p>
      </div>
      <ChevronRight />
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="font-sans font-bold text-[12px] text-muted uppercase tracking-widest px-5 mb-2">{title}</p>
      <div className="mx-4 bg-white rounded-3xl overflow-hidden divide-y divide-black/[0.05] shadow-[0px_2px_12px_rgba(0,0,0,0.04)]">
        {children}
      </div>
    </div>
  );
}

function PhotoEditSheet({ onClose }: { onClose: () => void }) {
  const options = [
    {
      label: 'Prendre une photo',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="5" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="10" cy="11.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 5l1.5-2h3L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="8" r="1" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: 'Choisir dans la bibliothèque',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="1" y="3" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M1 14l4.5-4.5 3 3 2.5-2.5L19 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      label: 'Supprimer la photo',
      danger: true,
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 6h12M8 6V4h4v2M15 6l-1 11H6L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.35)' }} onClick={onClose}>
      <div className="bg-white rounded-t-[32px] px-5 pt-4 pb-10 flex flex-col gap-3" onClick={e => e.stopPropagation()}>
        <div className="w-10 h-1 rounded-full bg-black/10 mx-auto mb-2" />
        <p className="font-sans font-bold text-[17px] text-dark mb-1">Photo de profil</p>
        <div className="flex flex-col divide-y divide-black/[0.06]">
          {options.map(({ label, icon, danger }) => (
            <button
              key={label}
              onClick={onClose}
              className={`flex items-center gap-3.5 py-4 w-full active:bg-black/[0.03] transition-colors focus-visible:outline-none rounded-xl ${danger ? 'text-[#d9547a]' : 'text-dark'}`}
            >
              <span className="shrink-0">{icon}</span>
              <span className="font-sans font-semibold text-[15px]">{label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full h-12 bg-black/[0.05] rounded-2xl font-sans font-bold text-[14px] text-dark mt-1 active:opacity-70 transition-opacity focus-visible:outline-none"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage({ onTabChange, onSignOut }: ProfilePageProps) {
  const [subPage, setSubPage] = useState<SubPage>(null);
  const [editingPhoto, setEditingPhoto] = useState(false);

  if (subPage === 'personal') return <PersonalInfoPage onBack={() => setSubPage(null)} />;
  if (subPage === 'preferences') return <PreferencesPage onBack={() => setSubPage(null)} />;
  if (subPage === 'payment') return <PaymentMethodsPage onBack={() => setSubPage(null)} />;
  if (subPage === 'settings') return <SettingsPage onBack={() => setSubPage(null)} />;
  if (subPage === 'help') return <HelpPage onBack={() => setSubPage(null)} />;

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Avatar + name */}
        <div className="flex flex-col items-center pt-8 pb-6 px-5">
          <div className="relative mb-4">
            <img
              src={ASSETS.profilePic}
              alt="Sofia"
              className="size-[88px] rounded-full object-cover ring-4 ring-white shadow-[0px_4px_20px_rgba(0,0,0,0.1)]"
            />
            <button
              onClick={() => setEditingPhoto(true)}
              className="absolute bottom-0 right-0 size-7 rounded-full bg-primary flex items-center justify-center shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Modifier la photo"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M9.5 1.5L11.5 3.5L4.5 10.5H2.5V8.5L9.5 1.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M7.5 3.5L9.5 5.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <h1 className="font-sans font-extrabold text-[22px] text-dark">Sofia Martin</h1>
          <p className="font-sans text-[14px] text-muted mt-1">sofia.martin@gmail.com</p>
          <div className="flex gap-3 mt-3">
            {STATS.map(({ value, label }, i) => (
              <Fragment key={label}>
                {i > 0 && <div className="w-px bg-black/[0.1] self-stretch" />}
                <div className="flex items-baseline gap-1.5">
                  <span className="font-sans font-extrabold text-[18px] text-dark">{value}</span>
                  <span className="font-sans text-[13px] text-muted">{label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <Section title="Mon compte">
            <Row
              onClick={() => setSubPage('personal')}
              icon={
                <IconTile bg="#eef1ff">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="6" r="3" stroke="#5170ff" strokeWidth="1.6" />
                    <path d="M2 16c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#5170ff" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </IconTile>
              }
              label="Informations personnelles"
              sub="Nom, email, téléphone"
            />
            <Row
              onClick={() => setSubPage('preferences')}
              icon={
                <IconTile bg="#fff0f5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 2L10.8 6.6L16 7.1L12.3 10.4L13.5 15.5L9 12.8L4.5 15.5L5.7 10.4L2 7.1L7.2 6.6L9 2Z" stroke="#d9547a" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </IconTile>
              }
              label="Préférences d'activités"
              sub="Catégories favorites"
            />
            <Row
              onClick={() => setSubPage('payment')}
              icon={
                <IconTile bg="#edfff5">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <rect x="1.5" y="4" width="15" height="10" rx="2" stroke="#22c97a" strokeWidth="1.6" />
                    <path d="M1.5 7.5h15" stroke="#22c97a" strokeWidth="1.6" />
                    <path d="M5 11.5h2M9 11.5h4" stroke="#22c97a" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </IconTile>
              }
              label="Moyens de paiement"
              sub="Cartes enregistrées"
            />
          </Section>

          <Section title="Application">
            <Row
              onClick={() => setSubPage('settings')}
              icon={
                <IconTile bg="#f4f4f8">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="2.5" stroke="#9090a0" strokeWidth="1.6" />
                    <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.7 3.7l1.4 1.4M12.9 12.9l1.4 1.4M3.7 14.3l1.4-1.4M12.9 5.1l1.4-1.4" stroke="#9090a0" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </IconTile>
              }
              label="Paramètres"
              sub="Notifications, confidentialité"
            />
            <Row
              onClick={() => setSubPage('help')}
              icon={
                <IconTile bg="#fff8ee">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="#f5a623" strokeWidth="1.6" />
                    <path d="M9 13v-1" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7 7c0-1.1.9-2 2-2s2 .9 2 2c0 1-1 1.5-2 2" stroke="#f5a623" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </IconTile>
              }
              label="Aide & support"
              sub="FAQ, nous contacter"
            />
          </Section>

          {/* Sign out */}
          <div className="mx-4">
            <button onClick={onSignOut} className="w-full h-12 flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-[#d9547a] active:opacity-70 transition-opacity focus-visible:outline-none">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 14H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" stroke="#d9547a" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M11 11l3-3-3-3M14 8H6" stroke="#d9547a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Se déconnecter
            </button>
          </div>

          <p className="text-center font-sans text-[12px] text-muted pb-2">&JOY · Version 1.0.0</p>
        </div>
      </div>

      <AppFooter activeTab="Profil" onTabChange={onTabChange} />
      {editingPhoto && <PhotoEditSheet onClose={() => setEditingPhoto(false)} />}
    </div>
  );
}

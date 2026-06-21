import { useState } from 'react';
import { CATEGORIES } from '../utils/categories';
import CategoryButton from '../components/atoms/CategoryButton';

// ─── Shared primitives ────────────────────────────────────────────────────────

function BackHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <div className="shrink-0" style={{ height: 'max(12px, env(safe-area-inset-top))' }} aria-hidden="true" />
      <div className="flex items-center gap-3 px-4 pt-4 pb-2 shrink-0">
        <button
          onClick={onBack}
          className="size-9 flex items-center justify-center focus-visible:outline-none"
          aria-label="Retour"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M14 18L7 11L14 4" stroke="#1a1a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-sans font-extrabold text-[22px] text-dark leading-tight">{title}</h1>
      </div>
    </>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shrink-0 ${value ? 'bg-primary' : 'bg-black/[0.12]'}`}
    >
      <span className={`absolute top-0.5 left-0 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0.5'}`} />
    </button>
  );
}

function SettingRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-4">
      <div className="flex-1 min-w-0">
        <p className="font-sans font-semibold text-[15px] text-dark">{label}</p>
        {sub && <p className="font-sans text-[13px] text-muted mt-0.5 leading-snug">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-4 bg-white rounded-3xl overflow-hidden divide-y divide-black/[0.05] shadow-[0px_2px_12px_rgba(0,0,0,0.04)] ${className}`}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-sans font-bold text-[12px] text-muted uppercase tracking-widest px-5 mb-2">{children}</p>;
}

function StickyFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#faf4f1]/95 backdrop-blur-sm px-5 pt-3 pb-8 border-t border-black/[0.05]" style={{ zIndex: 1001 }}>
      {children}
    </div>
  );
}

function SaveButton({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <button
      onClick={onSave}
      className="w-full bg-primary text-white rounded-full h-14 font-sans font-bold text-[16px] focus-visible:outline-none active:opacity-90 transition-all"
    >
      {saved ? 'Enregistré ✓' : 'Enregistrer'}
    </button>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans font-bold text-[14px] text-dark px-1">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = 'text' }: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] text-dark placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full"
    />
  );
}

// ─── 1. Informations personnelles ─────────────────────────────────────────────

export function PersonalInfoPage({ onBack }: { onBack: () => void }) {
  const [firstName, setFirstName] = useState('Sofia');
  const [lastName, setLastName] = useState('Martin');
  const [email, setEmail] = useState('sofia.martin@gmail.com');
  const [phone, setPhone] = useState('+33 6 12 34 56 78');
  const [dob, setDob] = useState('1995-04-12');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <BackHeader title="Informations personnelles" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-32 px-4 pt-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <FieldGroup label="Prénom">
            <Input value={firstName} onChange={setFirstName} placeholder="Prénom" />
          </FieldGroup>
          <FieldGroup label="Nom">
            <Input value={lastName} onChange={setLastName} placeholder="Nom" />
          </FieldGroup>
        </div>
        <FieldGroup label="Email">
          <Input value={email} onChange={setEmail} placeholder="Email" type="email" />
        </FieldGroup>
        <FieldGroup label="Téléphone">
          <Input value={phone} onChange={setPhone} placeholder="+33 6 …" type="tel" />
        </FieldGroup>
        <FieldGroup label="Date de naissance">
          <Input value={dob} onChange={setDob} type="date" />
        </FieldGroup>
      </div>
      <StickyFooter>
        <SaveButton onSave={handleSave} saved={saved} />
      </StickyFooter>
    </div>
  );
}

// ─── 2. Préférences d'activités ───────────────────────────────────────────────


export function PreferencesPage({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(['Bien-être', 'Musique', 'Spectacles']));
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <BackHeader title="Préférences" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-32 px-4 pt-3 flex flex-col gap-5">
        <p className="font-sans text-[14px] text-muted leading-[1.6]">
          Sélectionne tes catégories préférées pour personnaliser tes recommandations.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.map(({ id, emoji, color }) => (
            <CategoryButton
              key={id}
              id={id}
              emoji={emoji}
              color={color}
              selected={selected.has(id)}
              onToggle={toggle}
            />
          ))}
        </div>
      </div>
      <StickyFooter>
        <SaveButton onSave={handleSave} saved={saved} />
      </StickyFooter>
    </div>
  );
}

// ─── 3. Moyens de paiement ────────────────────────────────────────────────────

const SAVED_CARDS = [
  { id: '1', brand: 'Visa', last4: '4242', expiry: '08/27', color: '#1a1f71' },
  { id: '2', brand: 'Mastercard', last4: '8350', expiry: '03/26', color: '#eb001b' },
];

function CardBrandIcon({ brand }: { brand: string }) {
  if (brand === 'Visa') {
    return <span className="font-sans font-extrabold italic text-[16px] text-white tracking-tight">VISA</span>;
  }
  return (
    <div className="flex">
      <div className="size-5 rounded-full bg-[#eb001b]" />
      <div className="size-5 rounded-full bg-[#f79e1b] -ml-2.5" />
    </div>
  );
}

export function PaymentMethodsPage({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState(SAVED_CARDS);

  function removeCard(id: string) {
    setCards(c => c.filter(card => card.id !== id));
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <BackHeader title="Moyens de paiement" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-8 px-4 pt-4 flex flex-col gap-4">
        {cards.map(card => (
          <div key={card.id} className="rounded-3xl overflow-hidden" style={{ background: `linear-gradient(135deg, ${card.color}ee, ${card.color}99)` }}>
            <div className="p-5 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <CardBrandIcon brand={card.brand} />
                <button
                  onClick={() => removeCard(card.id)}
                  className="size-7 rounded-full bg-white/20 flex items-center justify-center focus-visible:outline-none active:opacity-70"
                  aria-label="Supprimer la carte"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2l8 8M10 2l-8 8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <p className="font-sans font-bold text-[18px] text-white tracking-[0.15em]">
                •••• •••• •••• {card.last4}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-sans text-[11px] text-white/60 uppercase tracking-widest">Expire</p>
                  <p className="font-sans font-bold text-[14px] text-white">{card.expiry}</p>
                </div>
                <div className="text-right">
                  <p className="font-sans text-[11px] text-white/60 uppercase tracking-widest">Titulaire</p>
                  <p className="font-sans font-bold text-[14px] text-white">Sofia Martin</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {cards.length === 0 && (
          <p className="text-center font-sans text-[14px] text-muted mt-4">Aucune carte enregistrée</p>
        )}

        <button className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl border-2 border-dashed border-black/[0.12] font-sans font-bold text-[14px] text-muted active:opacity-70 transition-opacity focus-visible:outline-none">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v12M3 9h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Ajouter une carte
        </button>
      </div>
    </div>
  );
}

// ─── 4. Paramètres ────────────────────────────────────────────────────────────

export function SettingsPage({ onBack }: { onBack: () => void }) {
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [location, setLocation] = useState(true);
  const [analytics, setAnalytics] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <BackHeader title="Paramètres" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-8 pt-4 flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <SectionLabel>Notifications</SectionLabel>
          <Card>
            <SettingRow label="Notifications push" sub="Nouvelles activités, rappels de sorties">
              <Toggle value={pushNotifs} onChange={setPushNotifs} />
            </SettingRow>
            <SettingRow label="Emails" sub="Confirmations et récapitulatifs hebdo">
              <Toggle value={emailNotifs} onChange={setEmailNotifs} />
            </SettingRow>
          </Card>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Confidentialité</SectionLabel>
          <Card>
            <SettingRow label="Géolocalisation" sub="Utilisée pour afficher les activités proches de toi">
              <Toggle value={location} onChange={setLocation} />
            </SettingRow>
            <SettingRow label="Données analytiques" sub="Aider à améliorer l'application">
              <Toggle value={analytics} onChange={setAnalytics} />
            </SettingRow>
          </Card>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Compte</SectionLabel>
          <button className="w-full h-12 flex items-center justify-center gap-2 font-sans font-bold text-[14px] text-[#d9547a] active:opacity-70 transition-opacity focus-visible:outline-none">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-9" stroke="#d9547a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Supprimer mon compte
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── 5. Aide & support ────────────────────────────────────────────────────────

const FAQ = [
  {
    q: "Comment annuler une réservation ?",
    a: "Rends-toi dans l'onglet Billets, ouvre ta réservation et appuie sur « Annuler ». L'annulation est possible jusqu'à 24h avant l'événement.",
  },
  {
    q: "Comment modifier ma réservation ?",
    a: "Les modifications de date ou de nombre de places ne sont pas disponibles directement. Contacte-nous via le formulaire de contact et nous t'aiderons.",
  },
  {
    q: "Je n'ai pas reçu mon code de réservation",
    a: "Vérifie tes spams et courriers indésirables. Si le problème persiste, retrouve ton code dans l'onglet Billets.",
  },
  {
    q: "Comment sont remboursées les annulations ?",
    a: "En cas d'annulation dans les délais, le remboursement est effectué sous 5 à 10 jours ouvrés sur ton moyen de paiement initial.",
  },
  {
    q: "Comment signaler un problème avec un organisateur ?",
    a: "Utilisez le bouton « Signaler » depuis la page de l'activité concernée ou contactez notre support.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center justify-between w-full px-4 py-4 text-left active:bg-black/[0.02] focus-visible:outline-none"
      >
        <span className="font-sans font-semibold text-[15px] text-dark pr-3 leading-snug">{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`shrink-0 text-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <p className="font-sans text-[14px] text-muted px-4 pb-4 leading-[1.65]">{a}</p>
      )}
    </div>
  );
}

export function HelpPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <BackHeader title="Aide & support" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-8 pt-4 flex flex-col gap-5">

        <div className="flex flex-col gap-2">
          <SectionLabel>Questions fréquentes</SectionLabel>
          <Card>
            {FAQ.map((item, i) => (
              <div key={i} className={i > 0 ? 'border-t border-black/[0.05]' : ''}>
                <FaqItem q={item.q} a={item.a} />
              </div>
            ))}
          </Card>
        </div>

        <div className="flex flex-col gap-2">
          <SectionLabel>Nous contacter</SectionLabel>
          <Card>
            <a
              href="mailto:support@joy-app.fr"
              className="flex items-center gap-3 px-4 py-4 active:bg-black/[0.02] focus-visible:outline-none"
            >
              <div className="size-10 rounded-2xl bg-[#eef1ff] flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#5170ff" strokeWidth="1.6" />
                  <path d="M1.5 6l7.5 5 7.5-5" stroke="#5170ff" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans font-semibold text-[15px] text-dark">Email</p>
                <p className="font-sans text-[13px] text-muted">support@joy-app.fr</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted shrink-0">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Card>
        </div>

        <p className="text-center font-sans text-[12px] text-muted px-5 leading-[1.6]">
          Notre équipe répond généralement sous 24h les jours ouvrés.
        </p>

      </div>
    </div>
  );
}

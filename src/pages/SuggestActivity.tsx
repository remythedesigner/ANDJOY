import { useState } from 'react';
import { ButtonFooter, PageHeader, PrimaryButton, SafeAreaSpacer } from '../components/atoms';

interface SuggestActivityProps {
  onBack: () => void;
}

export default function SuggestActivity({ onBack }: SuggestActivityProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const CATEGORIES = [
    'Exposition',
    'Spectacle',
    'Musique',
    'Bien-être',
    'Sport',
    'Jeu',
    'Plein air',
    'Atelier & initiation',
    'Autre',
  ];

  function handleSubmit() {
    if (title.trim() && category && location.trim()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col min-h-svh bg-cream">
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6">
          <div className="size-16 rounded-full bg-primary-light flex items-center justify-center shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M6 14l5 5 11-11" stroke="#5170ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-extrabold text-[24px] text-dark">Merci pour ta suggestion !</h2>
            <p className="font-sans text-[15px] text-muted max-w-[290px] leading-[1.5]">
              Nous avons bien reçu ta proposition. Si elle rejoint la base de données &JOY, nous te notifierons. 🎉
            </p>
          </div>
        </div>
        <ButtonFooter>
          <PrimaryButton onClick={onBack}>C'est compris !</PrimaryButton>
        </ButtonFooter>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <SafeAreaSpacer />

      {/* Header */}
      <PageHeader title="Proposer une activité" onBack={onBack} />

      <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
        <div className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="typo-title text-dark">Nom de l'activité *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Atelier de céramique"
              className="bg-white rounded-2xl px-4 h-14 typo-input placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="typo-title text-dark">Catégorie *</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="bg-white rounded-2xl px-4 h-14 typo-input focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark"
            >
              <option value="">Sélectionne une catégorie</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="typo-title text-dark">Adresse *</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Ex: 123 Rue de la Paix, Paris 11e"
              className="bg-white rounded-2xl px-4 h-14 typo-input placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="typo-title text-dark">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Dis-nous en plus sur cette activité..."
              className="bg-white rounded-2xl px-4 py-5 typo-input placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark resize-none h-32"
            />
          </div>

          <p className="font-sans text-[12px] text-muted">* Champs obligatoires</p>
        </div>
      </main>

      <ButtonFooter className="shrink-0">
        <PrimaryButton onClick={handleSubmit} disabled={!title.trim() || !category || !location.trim()}>
          Envoyer la suggestion
        </PrimaryButton>
      </ButtonFooter>
    </div>
  );
}

import { useState } from 'react';
import { BackButton, PrimaryButton, SafeAreaSpacer } from '../components/atoms';

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
      <div className="flex flex-col min-h-svh bg-cream items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <circle cx="30" cy="30" r="28" stroke="#22c55e" strokeWidth="2" />
            <path d="M20 30l6 6 14-14" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="flex flex-col gap-2">
            <h2 className="font-sans font-extrabold text-[24px] text-dark">Merci pour ta suggestion !</h2>
            <p className="font-sans text-[15px] text-muted max-w-[290px] leading-[1.5]">
              Nous avons bien reçu ta proposition. Si elle rejoint la base de données &JOY, nous te notifierons. 🎉
            </p>
          </div>
          <button
            onClick={onBack}
            className="bg-primary text-white rounded-full h-12 font-sans font-bold text-[15px] px-8 focus-visible:outline-none active:opacity-90 transition-all"
          >
            C'est compris !
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <SafeAreaSpacer />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-4 pb-2 shrink-0">
        <BackButton onClick={onBack} />
        <h1 className="font-sans font-extrabold text-[22px] text-dark leading-tight">Proposer une activité</h1>
      </div>

      <main className="flex-1 overflow-y-auto px-6 py-6 flex flex-col">
        <div className="flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-[14px] text-dark">Nom de l'activité *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Atelier de céramique"
              className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-[14px] text-dark">Catégorie *</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark"
            >
              <option value="">Sélectionne une catégorie</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-[14px] text-dark">Adresse *</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="Ex: 123 Rue de la Paix, Paris 11e"
              className="bg-white rounded-2xl px-4 h-14 font-sans text-[15px] placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="font-sans font-bold text-[14px] text-dark">Description</label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Dis-nous en plus sur cette activité..."
              className="bg-white rounded-2xl px-4 py-3 font-sans text-[15px] placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark resize-none h-32"
            />
          </div>

          <p className="font-sans text-[12px] text-muted/60">* Champs obligatoires</p>
        </div>

        <div className="flex-1" />

        {/* Submit Button */}
        <div className="flex flex-col gap-2 pt-6 pb-safe">
          <PrimaryButton onClick={handleSubmit} disabled={!title.trim() || !category || !location.trim()}>
            Envoyer la suggestion
          </PrimaryButton>
          <button
            onClick={onBack}
            className="w-full h-12 font-sans text-[14px] text-muted"
          >
            Annuler
          </button>
        </div>
      </main>

      <div className="shrink-0" style={{ height: 'max(16px, env(safe-area-inset-bottom))' }} aria-hidden="true" />
    </div>
  );
}

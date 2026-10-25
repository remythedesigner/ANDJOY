import { useState, useEffect } from 'react';
import { ASSETS } from '../utils/data';
import { ButtonFooter, PageHeader, PrimaryButton, SafeAreaSpacer } from '../components/atoms';

const REACTIONS = ['👏', '🔥', '❤️', '💡', '😆', '🥲'];
const MORE_REACTIONS = ['🤩', '😍', '🥰', '🎉', '😮', '🤔'];

export interface RecommendationDraft {
  emoji: string;
  intro: string;
  liked: string;
  tip: string;
}

interface RecommendationFormProps {
  event: { title: string; venue: string; image: string };
  onBack: () => void;
  onSubmit: (draft: RecommendationDraft) => void;
  initial?: RecommendationDraft;
}

function EmojiButton({ emoji, selected, onSelect }: { emoji: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`size-10 rounded-xl flex items-center justify-center text-[20px] leading-none shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-70 transition-colors ${selected ? 'bg-primary' : 'bg-[#f4f4f8]'}`}
    >
      {emoji}
    </button>
  );
}

function Field({ id, label, placeholder, value, onChange }: { id: string; label: string; placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans font-bold text-[14px] leading-[18px] text-dark">{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-white rounded-2xl px-4 py-5 typo-input placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 w-full text-dark resize-none h-[120px]"
      />
    </div>
  );
}

export default function RecommendationForm({ event, onBack, onSubmit, initial }: RecommendationFormProps) {
  const [emoji, setEmoji] = useState(initial?.emoji ?? REACTIONS[0]);
  const [showMore, setShowMore] = useState(initial ? MORE_REACTIONS.includes(initial.emoji) : false);
  const [intro, setIntro] = useState(initial?.intro ?? '');
  const [liked, setLiked] = useState(initial?.liked ?? '');
  const [tip, setTip] = useState(initial?.tip ?? '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canSubmit = intro.trim().length > 0 && liked.trim().length > 0;

  function handleSubmit() {
    if (!canSubmit) return;
    onSubmit({ emoji, intro: intro.trim(), liked: liked.trim(), tip: tip.trim() });
  }

  return (
    <div className="flex flex-col min-h-svh bg-cream">
      <SafeAreaSpacer />
      <PageHeader title="Ma recommandation" onBack={onBack} />

      <div className="flex-1 overflow-y-auto pb-40 px-6 flex flex-col gap-5">
        <div className="bg-surface rounded-2xl p-4 flex gap-4 items-start">
          <img src={event.image} alt="" className="size-14 rounded-xl object-cover shrink-0" />
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p className="font-sans font-bold text-[16px] leading-[1.5] text-dark">{event.title}</p>
            <p className="font-sans text-[12px] leading-[1.3] text-dark-warm">{event.venue}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-sans font-bold text-[14px] leading-[18px] text-dark">Ce que j’ai ressenti *</p>
          <div className="flex items-center justify-between">
            {REACTIONS.map(r => (
              <EmojiButton key={r} emoji={r} selected={emoji === r} onSelect={() => setEmoji(r)} />
            ))}
            <button
              type="button"
              onClick={() => setShowMore(v => !v)}
              aria-expanded={showMore}
              aria-label="Plus de réactions"
              className="size-10 rounded-xl bg-[#f4f4f8] flex items-center justify-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-70"
            >
              <img
                src={ASSETS.icons.plusLarge}
                alt=""
                aria-hidden="true"
                className={`size-[18px] transition-transform ${showMore ? 'rotate-45' : ''}`}
              />
            </button>
          </div>
          {showMore && (
            <div className="flex items-center justify-between">
              {MORE_REACTIONS.map(r => (
                <EmojiButton key={r} emoji={r} selected={emoji === r} onSelect={() => setEmoji(r)} />
              ))}
              <div className="size-10 shrink-0" aria-hidden="true" />
            </div>
          )}
        </div>

        <Field id="reco-intro" label="Présente l’activité en quelques mots *" placeholder="J’ai entendu parler de l’exposition..." value={intro} onChange={setIntro} />
        <Field id="reco-liked" label="Ce que j’ai aimé *" placeholder="J’ai particulièrement apprécié..." value={liked} onChange={setLiked} />
        <Field id="reco-tip" label="Ce que j’aurais aimé savoir avant" placeholder="Je te conseille d’apporter..." value={tip} onChange={setTip} />

        <p className="font-sans text-[12px] leading-[1.5] text-muted">* Champs obligatoires</p>
      </div>

      <ButtonFooter className="fixed bottom-0 left-0 right-0" style={{ zIndex: 1001 }}>
        <PrimaryButton onClick={handleSubmit} disabled={!canSubmit} className="shadow-[0px_2px_6px_rgba(0,0,0,0.08)]">
          {initial ? 'Enregistrer les modifications' : 'Envoyer la recommandation'}
        </PrimaryButton>
      </ButtonFooter>
    </div>
  );
}

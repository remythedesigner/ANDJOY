interface ExplorerReviewCardProps {
  name: string;
  role: string;
  avatar: string;
  emoji: string;
  paragraphs: string[];
  tip?: string;
  date: string;
  onAvatarClick?: () => void;
  onEdit?: () => void;
}

export default function ExplorerReviewCard({ name, role, avatar, emoji, paragraphs, tip, date, onAvatarClick, onEdit }: ExplorerReviewCardProps) {
  const Avatar = onAvatarClick ? 'button' : 'div';

  return (
    <div className="bg-badge-cream rounded-3xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <Avatar
          onClick={onAvatarClick}
          className={`rounded-full p-[2.5px] shrink-0 ${onAvatarClick ? 'focus-visible:outline-none active:opacity-70 transition-opacity' : ''}`}
          style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, rgba(139,92,246,0.25) 100%)' }}
          aria-label={onAvatarClick ? `Voir le profil de ${name}` : undefined}
        >
          <div className="border-[2px] border-white rounded-full size-10 overflow-hidden">
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          </div>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="typo-title text-dark">{name}</p>
          <p className="typo-caption text-accent-purple">{role}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[22px] leading-none" role="img" aria-label="reaction">{emoji}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {paragraphs.map((text, i) => (
          <p key={i} className="typo-review text-dark/80">{text}</p>
        ))}
      </div>
      {tip && (
        <p className="typo-caption text-dark-warm mt-3">💡 {tip}</p>
      )}
      <div className="flex items-center justify-between gap-3 mt-3">
        <p className="typo-caption text-muted">{date}</p>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="typo-caption font-bold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded active:opacity-70"
          >
            Modifier
          </button>
        )}
      </div>
    </div>
  );
}

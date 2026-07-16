interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export default function BackButton({ onClick, className = '' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`size-9 bg-white/65 backdrop-blur-[2px] rounded-full flex items-center justify-center focus-visible:outline-none ${className}`}
      aria-label="Retour"
    >
      <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
        <path d="M14 18L7 11L14 4" stroke="#1a1a24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

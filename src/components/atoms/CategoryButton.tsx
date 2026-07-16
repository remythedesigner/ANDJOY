interface CategoryButtonProps {
  id: string;
  emoji: string;
  color: string;
  selected: boolean;
  onToggle: (id: string) => void;
}

export default function CategoryButton({ id, emoji, color, selected, onToggle }: CategoryButtonProps) {
  return (
    <button
      onClick={() => onToggle(id)}
      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all focus-visible:outline-none ${
        selected ? 'border-primary bg-primary-light' : 'border-transparent bg-white'
      }`}
      style={!selected ? { boxShadow: '0px 2px 6px rgba(0,0,0,0.12)' } : {}}
    >
      <span
        className="size-10 rounded-xl flex items-center justify-center text-[20px] shrink-0"
        style={{ backgroundColor: color }}
      >
        {emoji}
      </span>
      <span className={`typo-input text-left ${selected ? 'text-primary' : 'text-dark'}`}>
        {id}
      </span>
    </button>
  );
}

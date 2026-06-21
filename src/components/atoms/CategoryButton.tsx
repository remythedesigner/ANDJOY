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
        selected ? 'border-primary bg-[#eef1ff]' : 'border-transparent bg-white'
      }`}
      style={!selected ? { boxShadow: '0px 2px 8px rgba(0,0,0,0.05)' } : {}}
    >
      <span
        className="size-10 rounded-xl flex items-center justify-center text-[20px] shrink-0"
        style={{ backgroundColor: color }}
      >
        {emoji}
      </span>
      <span className={`font-sans font-semibold text-[14px] text-left leading-tight ${selected ? 'text-primary' : 'text-dark'}`}>
        {id}
      </span>
    </button>
  );
}

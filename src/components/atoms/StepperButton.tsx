interface StepperButtonProps {
  onClick: () => void;
  disabled?: boolean;
  variant: 'increment' | 'decrement';
  label: string;
}

export default function StepperButton({ onClick, disabled, variant, label }: StepperButtonProps) {
  const isIncrement = variant === 'increment';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`size-8 rounded-xl flex items-center justify-center font-sans font-bold text-[18px] disabled:opacity-25 focus-visible:outline-none transition-opacity ${
        isIncrement ? 'bg-primary text-white active:opacity-80' : 'bg-black/[0.04] text-dark active:opacity-60'
      }`}
    >
      {isIncrement ? '+' : '−'}
    </button>
  );
}

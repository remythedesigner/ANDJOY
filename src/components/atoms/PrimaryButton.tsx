import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function PrimaryButton({ children, onClick, disabled, type = 'button', variant = 'primary', className = '' }: PrimaryButtonProps) {
  const variantClasses = variant === 'secondary'
    ? 'bg-badge-cream border border-accent-coral text-accent-coral gap-4 flex items-center justify-center'
    : 'bg-primary text-white';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full ${variantClasses} rounded-2xl h-14 font-sans font-bold text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-90 transition-opacity disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

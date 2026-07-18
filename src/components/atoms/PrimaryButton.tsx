import type { ReactNode } from 'react';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export default function PrimaryButton({ children, onClick, disabled, type = 'button', className = '' }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full bg-primary text-white rounded-2xl h-14 font-sans font-bold text-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-90 transition-opacity disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}

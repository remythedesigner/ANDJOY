import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export default function IconButton({ children, className = '', ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`size-9 bg-white/65 backdrop-blur-[2px] rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

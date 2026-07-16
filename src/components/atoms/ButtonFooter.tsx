import type { CSSProperties, ReactNode } from 'react';

interface ButtonFooterProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export default function ButtonFooter({ children, className = '', style }: ButtonFooterProps) {
  return (
    <div
      className={`backdrop-blur-[8px] bg-white/10 border-t border-black/[0.05] px-4 pt-4 pb-6 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

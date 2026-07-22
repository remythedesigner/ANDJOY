import type { ReactNode } from 'react';

interface PillProps {
  icon?: ReactNode;
  children: ReactNode;
  tone?: 'default' | 'alert';
  onClick?: () => void;
  className?: string;
}

export default function Pill({ icon, children, tone = 'default', onClick, className = '' }: PillProps) {
  const toneClasses = tone === 'alert'
    ? 'bg-surface text-accent-coral font-medium'
    : 'bg-surface text-dark-warm font-medium';
  const interactiveClasses = onClick
    ? 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary active:opacity-70 transition-opacity'
    : '';
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-sans text-[12px] whitespace-nowrap ${toneClasses} ${interactiveClasses} ${className}`}
    >
      {icon}
      {children}
    </Component>
  );
}

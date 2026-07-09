interface SafeAreaSpacerProps {
  size?: 'sm' | 'lg';
  className?: string;
}

export default function SafeAreaSpacer({ size = 'sm', className = '' }: SafeAreaSpacerProps) {
  const min = size === 'lg' ? '20px' : '12px';
  return (
    <div
      className={`shrink-0 ${className}`}
      style={{ height: `max(${min}, env(safe-area-inset-top))` }}
      aria-hidden="true"
    />
  );
}

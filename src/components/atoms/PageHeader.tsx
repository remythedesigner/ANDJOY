import BackButton from './BackButton';

interface PageHeaderProps {
  title: string;
  onBack: () => void;
  className?: string;
}

export default function PageHeader({ title, onBack, className = '' }: PageHeaderProps) {
  return (
    <div className={`flex items-center gap-4 px-4 py-6 shrink-0 ${className}`}>
      <BackButton onClick={onBack} />
      <h1 className="font-sans font-extrabold text-[24px] text-dark leading-none">{title}</h1>
    </div>
  );
}

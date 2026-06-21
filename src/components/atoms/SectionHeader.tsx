interface SectionHeaderProps {
  icon: string;
  title: string;
}

export default function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-6">
      <img src={icon} alt="" aria-hidden="true" className="w-[15px] h-[15px] object-contain" />
      <h2 className="typo-h3 text-dark whitespace-nowrap">
        {title}
      </h2>
    </div>
  );
}

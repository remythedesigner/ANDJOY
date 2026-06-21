export default function GreetingSection() {
  return (
    <section className="flex flex-col gap-5 px-6 pt-6 pb-3" aria-label="Message de bienvenue">
      {/* Heading */}
      <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap">
        <h1 className="typo-h1 text-dark-warm">
          Salut,{' '}
        </h1>
        <span className="typo-h1 italic text-primary">
          Jane
        </span>
        <span className="font-serif text-[30px] leading-normal text-dark-warm ml-1" role="img" aria-label="salut">
          👋
        </span>
      </div>

      {/* Quote pill */}
      <div
        className="bg-[#FDFAF9] flex items-center gap-2 px-4 py-4 rounded-[30px] w-full"
      >
        <span className="text-accent-yellow text-[18px] shrink-0" aria-hidden="true">✦</span>
        <p className="font-serif text-[14px] leading-[1.4] text-dark-warm flex-1 min-w-0">
          "Le bonheur est un art qui s'apprend en sortant."
        </p>
      </div>
    </section>
  );
}

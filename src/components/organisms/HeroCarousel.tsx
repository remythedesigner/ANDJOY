import { useState, useEffect, useRef } from 'react';
import { ASSETS, heroEvents } from '../../utils/data';
import { getCategoryEmoji } from '../../utils/categories';

const SLIDE_DURATION = 4000;

interface HeroCarouselProps {
  onCardClick?: () => void;
}

export default function HeroCarousel({ onCardClick }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const didTouch = useRef(false);

  // Advance to next slide after SLIDE_DURATION. Cleanup cancels on index change or unmount,
  // so React StrictMode's double-invoke never triggers a spurious advance.
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveIndex(i => (i + 1) % heroEvents.length);
    }, SLIDE_DURATION);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  function goTo(index: number) {
    setActiveIndex(index);
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    didTouch.current = true;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      const dir = dx < 0 ? 1 : -1;
      goTo((activeIndex + dir + heroEvents.length) % heroEvents.length);
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      onCardClick?.();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  }

  function handleClick() {
    // Suppress the synthetic click that fires after touch events
    if (didTouch.current) { didTouch.current = false; return; }
    onCardClick?.();
  }

  const event = heroEvents[activeIndex];

  return (
    <section className="flex flex-col gap-4 py-6" aria-label="Événement à la une">
      <div className="flex items-center gap-2 px-6">
        <img src={ASSETS.icons.fire} alt="" aria-hidden="true" className="w-[15px] h-[15px] object-contain" />
        <h2 className="typo-h3 text-dark whitespace-nowrap">On fait quoi aujourd'hui ?</h2>
      </div>

      <div className="px-6">
        <article
          className="relative rounded-[28px] overflow-hidden h-[372px] w-full"
          style={{ boxShadow: '0px 24px 44px -22px rgba(50,20,15,0.55)' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
        >
          {/* All slides stacked — cross-fade via opacity transition, no remount */}
          {heroEvents.map((ev, i) => (
            <div
              key={ev.title}
              className="absolute inset-0"
              style={{
                opacity: i === activeIndex ? 1 : 0,
                transition: 'opacity 0.7s ease',
                pointerEvents: i === activeIndex ? 'auto' : 'none',
              }}
            >
              <img
                src={ev.image}
                alt={ev.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Scarcity badge */}
              {ev.scarcityBadge && (
                <div className="absolute top-8 right-4">
                  <span className="bg-[#f5a623] text-white font-sans font-semibold text-[14px] px-4 py-2 rounded-full whitespace-nowrap">
                    {ev.scarcityBadge}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="typo-label text-[#FF6366] tracking-[0.544px]">{getCategoryEmoji(ev.category)} {ev.category}</p>
                <h3 className="typo-h2 text-white mt-1 max-w-[284px]">{ev.title}</h3>
                <div className="flex gap-2 mt-2">
                  <div className="bg-white/18 flex items-center gap-1 px-2 py-1 rounded-[14px]">
                    <img src={ASSETS.icons.clock} alt="" aria-hidden="true" className="size-[11px]" />
                    <span className="typo-caption font-semibold text-white">{ev.time}</span>
                  </div>
                  <div className="bg-white/18 flex items-center gap-1 px-2 py-1 rounded-[14px]">
                    <img src={ASSETS.icons.pin} alt="" aria-hidden="true" className="size-[11px]" />
                    <span className="typo-caption font-semibold text-white">{ev.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-white font-sans font-extrabold text-[16px] leading-6 px-4 py-1 rounded-[14px] bg-[#FF6366]">
                    {ev.price}
                  </span>
                  {ev.originalPrice && (
                    <span className="typo-caption text-white/50 line-through">{ev.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Progress bars — on top of slides */}
          <div className="absolute top-4 left-4 right-4 flex gap-2 pointer-events-none">
            {Array.from({ length: heroEvents.length }).map((_, i) => (
              <div key={i} className="flex-1 h-[3px] rounded-[3px] bg-white/40 overflow-hidden">
                {i < activeIndex && <div className="h-full w-full bg-white" />}
                {i === activeIndex && (
                  <div
                    className="h-full bg-white w-0"
                    style={{ animation: `progress-fill ${SLIDE_DURATION}ms linear forwards` }}
                  />
                )}
              </div>
            ))}
          </div>

        </article>
      </div>
    </section>
  );
}

import { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

// The logo SVG is 60×39 viewBox. Rays occupy the top ~32% (y 0–12.5 of 39).
// At rendered 192×124px: rays ≈ top 40px, text ≈ bottom 84px.
const W = 192;
const H = 124;
const RAYS_H = 40; // px
const TEXT_H = H - RAYS_H; // 84px

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<'enter' | 'visible' | 'exit'>('enter');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 60);
    const t2 = setTimeout(() => setPhase('exit'), 1600);
    const t3 = setTimeout(onComplete, 2050);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  const visible = phase === 'visible';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: '#5170FF',
        opacity: phase === 'exit' ? 0 : 1,
        transition: phase === 'exit' ? 'opacity 0.45s ease' : undefined,
      }}
    >
      <div style={{ position: 'relative', width: W, height: H }}>

        {/* ── Text layer (bottom 84px) — enters first ── */}
        <img
          src={import.meta.env.BASE_URL + "logo.svg"}
          width={W}
          height={H}
          alt="&JOY"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            clipPath: `inset(${RAYS_H}px 0 0 0)`,
            filter: 'brightness(0) saturate(100%) invert(91%) sepia(77%) saturate(715%) hue-rotate(330deg)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px) scale(0.88)',
            transition: 'opacity 0.45s ease, transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        />

        {/* ── Rays layer (top 40px) — enters 420ms later ── */}
        <img
          src={import.meta.env.BASE_URL + "logo.svg"}
          width={W}
          height={H}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            clipPath: `inset(0 0 ${TEXT_H}px 0)`,
            filter: 'brightness(0) saturate(100%) invert(91%) sepia(77%) saturate(715%) hue-rotate(330deg)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.8)',
            transformOrigin: 'center bottom',
            transition: 'opacity 0.4s ease 0.42s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.42s',
          }}
        />

      </div>
    </div>
  );
}

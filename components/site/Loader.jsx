'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RING_COLORS = ['#0085C7', '#F4C300', '#000000', '#009F3D', '#DF0024'];

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const DURATION = 2400;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / DURATION);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 380);
        setTimeout(() => onDone && onDone(), 1100);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const particles = useMemo(() => Array.from({ length: 24 }).map(() => ({
    size: Math.random() * 2.5 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 8 + Math.random() * 10,
    dx: (Math.random() - 0.5) * 160,
    dy: -100 - Math.random() * 200,
    delay: Math.random() * 6,
  })), []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: '#FFFFFF' }}
        >
          {/* very subtle ambient atmosphere */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: 'radial-gradient(ellipse at 50% 35%, rgba(0,133,199,0.05), transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(223,0,36,0.04), transparent 55%)',
          }} />

          {/* subtle dust */}
          {mounted && (
            <div className="absolute inset-0">
              {particles.map((p, i) => (
                <span
                  key={i}
                  className="particle drift"
                  style={{
                    left: p.left + '%', top: p.top + '%',
                    width: p.size + 'px', height: p.size + 'px',
                    background: 'radial-gradient(circle, rgba(10,10,10,0.45), rgba(10,10,10,0.08) 60%, transparent)',
                    animationDuration: p.dur + 's', animationDelay: '-' + p.delay + 's',
                    '--dx': p.dx + 'px', '--dy': p.dy + 'px',
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 flex flex-col items-center gap-12 px-6 text-[#0A0A0A]">
            <motion.div
              initial={{ opacity: 0, y: 24, letterSpacing: '0.6em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.32em' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="text-[10px] md:text-xs tracking-[0.5em] text-[#0085C7] font-sans font-medium mb-4 uppercase">Est &middot; MMXXV</div>
              <div className="font-display text-5xl md:text-7xl tracking-[0.32em] text-[#0A0A0A] text-shadow-soft">
                U.S.A.S.F.
              </div>
              <div className="mt-4 font-editorial italic text-base md:text-lg text-[#0A0A0A]/65 tracking-wide">
                United States Air Sports Federation
              </div>
              {/* Olympic ring color dots */}
              <div className="mt-6 flex items-center gap-2">
                {RING_COLORS.map((c) => (
                  <span key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.85 }} />
                ))}
              </div>
            </motion.div>

            <div className="w-[280px] md:w-[420px] flex flex-col gap-3">
              <div className="h-px w-full bg-[#0A0A0A]/10 overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{
                    width: (progress * 100) + '%',
                    background: 'linear-gradient(90deg, #0085C7 0%, #F4C300 25%, #000000 50%, #009F3D 75%, #DF0024 100%)',
                  }}
                />
              </div>
              <div className="flex justify-between text-[10px] tracking-[0.35em] font-sans text-[#0A0A0A]/45 uppercase">
                <span>Calibrating Sky Engine</span>
                <span>{Math.round(progress * 100).toString().padStart(3, '0')}</span>
              </div>
            </div>
          </div>

          <div className="absolute top-6 left-6 text-[10px] tracking-[0.35em] font-sans text-[#0A0A0A]/40 uppercase">A Cinematic Opening</div>
          <div className="absolute top-6 right-6 text-[10px] tracking-[0.35em] font-sans text-[#0A0A0A]/40 uppercase">Volume I</div>
          <div className="absolute bottom-6 left-6 text-[10px] tracking-[0.35em] font-sans text-[#0A0A0A]/40 uppercase">Olympic &middot; Editorial</div>
          <div className="absolute bottom-6 right-6 text-[10px] tracking-[0.35em] font-sans text-[#0A0A0A]/40 uppercase">12,000 ft</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LINKS = [
  { label: 'Chapter I',   frac: 0.02 },
  { label: 'Chapter III', frac: 0.30 },
  { label: 'Chapter V',   frac: 0.55 },
  { label: 'Chapter VII', frac: 0.80 },
  { label: 'Finale',      frac: 0.98 },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const vh = window.innerHeight;
      setOverDark(y > vh * 0.4);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fg = overDark ? '#FFFFFF' : '#0A0A0A';

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={
        'fixed top-0 left-0 right-0 z-50 transition-all duration-700 ' +
        (scrolled ? 'py-3 ' : 'py-5 ') +
        (overDark ? 'glass-dark' : (scrolled ? 'glass-white-strong' : ''))
      }
      style={{ color: fg }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full flex items-center justify-center" style={{ border: `1px solid ${overDark ? 'rgba(255,255,255,0.35)' : 'rgba(10,10,10,0.25)'}` }}>
            <div className="w-1.5 h-1.5 rounded-full pulse-glow" style={{ background: '#0085C7' }} />
            <div className="absolute inset-0 rounded-full animate-ping" style={{ border: '1px solid rgba(0,133,199,0.35)' }} />
          </div>
          <div className="font-display text-xl tracking-[0.28em]" style={{ color: fg }}>U.S.A.S.F.</div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => {
                const target = document.body.scrollHeight * l.frac;
                window.scrollTo({ top: target, behavior: 'smooth' });
              }}
              className="text-[11px] font-medium tracking-[0.3em] uppercase transition-opacity duration-300 hover:opacity-100"
              style={{ color: fg, opacity: 0.7 }}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <a
          href="https://us-federation-demo-nexivra-ai.vercel.app/"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all group"
          style={{
            border: `1px solid ${overDark ? 'rgba(255,255,255,0.3)' : 'rgba(10,10,10,0.18)'}`,
            color: fg,
          }}
        >
          <span className="text-[11px] font-medium tracking-[0.28em] uppercase">Join the Federation</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#DF0024' }} />
        </a>
      </div>
    </motion.header>
  );
}

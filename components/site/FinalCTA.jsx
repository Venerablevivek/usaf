'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function FinalCTA() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const particles = useMemo(() => Array.from({ length: 26 }).map(() => ({
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    dur: 8 + Math.random() * 12,
    dx: (Math.random() - 0.5) * 200,
    dy: -200 - Math.random() * 300,
    delay: Math.random() * 8,
  })), []);
  return (
    <section id="cta" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#07111F]" />
        <div className="absolute inset-0 bg-radial-blue" style={{ opacity: 0.8 }} />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] max-w-[140vw] rounded-full" style={{ background: 'radial-gradient(circle, rgba(77,166,255,0.18), transparent 60%)' }} />
        {/* floating particles */}
        {mounted && particles.map((p, i) => (
          <span key={i} className="particle drift" style={{
            left: p.left + '%', top: p.top + '%', width: p.size + 'px', height: p.size + 'px',
            animationDuration: p.dur + 's', animationDelay: '-' + p.delay + 's',
            '--dx': p.dx + 'px', '--dy': p.dy + 'px',
          }} />
        ))}
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex items-center justify-center gap-3 mb-8">
          <span className="w-10 h-px bg-[#4DA6FF]" />
          <span className="text-[10px] tracking-[0.5em] font-sora text-[#4DA6FF] uppercase">Chapter 06 · Manifesto</span>
          <span className="w-10 h-px bg-[#4DA6FF]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-anton text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-[0.04em] uppercase leading-[0.9] text-shadow-cinematic"
        >
          The future of <br /><span className="gradient-text">human flight</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-2xl mx-auto font-sora text-base md:text-xl text-[#F5F9FF]/70 leading-relaxed"
        >
          The U.S.A.S.F. is not a federation of borders. It is a federation of horizons. Join the pilots, dreamers and engineers writing the next century of human flight.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <a href="#" className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#F5F9FF] text-[#07111F] font-sora font-semibold tracking-[0.25em] text-xs uppercase overflow-hidden">
            <span className="relative z-10">Join the Federation</span>
            <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">→</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#4DA6FF] to-[#F5F9FF] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </a>
          <a href="#" className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-[#F5F9FF]/20 text-[#F5F9FF] font-sora font-medium tracking-[0.25em] text-xs uppercase hover:border-[#4DA6FF] hover:bg-[#4DA6FF]/5 transition-all">
            <span>Watch the Film</span>
            <span>▷</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 grid grid-cols-3 max-w-3xl mx-auto gap-px bg-white/5"
        >
          {[{ k: 'Speed', c: '#4DA6FF' }, { k: 'Discipline', c: '#FFD60A' }, { k: 'Freedom', c: '#34C759' }].map((v) => (
            <div key={v.k} className="bg-[#07111F] py-6">
              <div className="font-anton text-2xl md:text-3xl tracking-[0.15em] uppercase" style={{ color: v.c }}>{v.k}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 glass-strong">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row gap-3 md:gap-6 items-center justify-between text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/40 uppercase">
          <div>© MMXXV · U.S.A.S.F.</div>
          <div className="hidden md:block">United States Air Sports Federation</div>
          <div>One Federation · One Sky</div>
        </div>
      </div>
    </section>
  );
}

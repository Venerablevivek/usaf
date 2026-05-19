'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  return `${d.getUTCDate().toString().padStart(2,'0')} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

const EVENTS = [
  { code: 'WAS-25', name: 'World Air Summit', date: '2025-09-12T09:00:00Z', city: 'Geneva, CH', tag: 'Federation Congress', img: 'https://images.unsplash.com/photo-1473614777208-13b8aa37ce4e?w=1400&q=80', color: '#4DA6FF' },
  { code: 'RAC-25', name: 'Sky Grand Prix', date: '2025-11-04T16:00:00Z', city: 'Abu Dhabi, AE', tag: 'Air Racing · Final Round', img: 'https://images.unsplash.com/photo-1610312278520-bcc893a3ff1d?w=1400&q=80', color: '#FF3B30' },
  { code: 'WST-26', name: 'Wingsuit World Championship', date: '2026-04-22T12:00:00Z', city: 'Lauterbrunnen, CH', tag: 'World Championship', img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1400&q=80', color: '#FFD60A' },
];

function useCountdown(target) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setT({ d, h, m, s });
    }, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

function EventCard({ e, i }) {
  const t = useCountdown(e.date);
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl overflow-hidden bg-[#0c1a2c] hover-lift"
    >
      <div className="relative h-[280px] md:h-[320px] overflow-hidden">
        <img src={e.img} alt={e.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/40 to-transparent" />
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <div className="glass-strong px-3 py-1.5 rounded-full text-[10px] tracking-[0.3em] font-sora uppercase" style={{ color: e.color }}>
            {e.code}
          </div>
          <div className="text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/50 uppercase text-right">{e.tag}</div>
        </div>
      </div>
      <div className="p-6 md:p-7">
        <h3 className="font-anton text-3xl md:text-4xl tracking-[0.04em] uppercase mb-2">{e.name}</h3>
        <div className="flex items-center gap-3 mb-5">
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: e.color }} />
          <span className="text-[11px] tracking-[0.3em] font-sora text-[#F5F9FF]/60 uppercase">{e.city}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-5">
          {[{l:'D', v:t.d},{l:'H', v:t.h},{l:'M', v:t.m},{l:'S', v:t.s}].map((u, k) => (
            <div key={k} className="glass rounded-lg py-3 text-center">
              <div className="font-anton text-2xl md:text-3xl tracking-wider tabular-nums text-[#F5F9FF]">{u.v.toString().padStart(2,'0')}</div>
              <div className="text-[9px] tracking-[0.35em] font-sora text-[#F5F9FF]/40 uppercase">{u.l}</div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/50 uppercase">{formatDate(e.date)}</span>
          <button className="text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/80 hover:text-[#4DA6FF] uppercase flex items-center gap-2 group/btn">
            Reserve <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Events() {
  return (
    <section id="events" className="relative py-32 md:py-44 overflow-hidden bg-[#050b16]">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#FFD60A]" />
            <span className="text-[10px] tracking-[0.5em] font-sora text-[#FFD60A] uppercase">Chapter 05 · Events</span>
          </div>
          <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] uppercase leading-[0.95]">
            The Olympic <span className="gradient-text-olympic">calendar</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((e, i) => <EventCard key={e.code} e={e} i={i} />)}
        </div>
      </div>
    </section>
  );
}

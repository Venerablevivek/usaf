'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DISCIPLINES = [
  { name: 'Paragliding', code: '01', tag: 'Soaring · Thermal', desc: 'Riding invisible rivers of air, where pilots become weather.', img: 'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=1200&q=80', color: '#4DA6FF' },
  { name: 'Aerobatics', code: '02', tag: 'Precision · Power', desc: 'Engineering grace at the edge of human gravity tolerance.', img: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=1200&q=80', color: '#FF3B30' },
  { name: 'Wingsuit', code: '03', tag: 'Proximity · Flight', desc: 'The closest a human will ever come to wings of their own.', img: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=1200&q=80', color: '#FFD60A' },
  { name: 'Skydiving', code: '04', tag: 'Freefall · Formation', desc: 'Terminal velocity choreographed into airborne art.', img: 'https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=1200&q=80', color: '#34C759' },
  { name: 'Ballooning', code: '05', tag: 'Silence · Heritage', desc: 'The original ascent. A meditation 12,000 feet above earth.', img: 'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=1200&q=80', color: '#4DA6FF' },
  { name: 'Gliding', code: '06', tag: 'Engineless · Endurance', desc: 'A duet between aerodynamics and atmospheric intuition.', img: 'https://images.unsplash.com/photo-1531642765602-5cae8bbbf285?w=1200&q=80', color: '#F5F9FF' },
  { name: 'Drone Racing', code: '07', tag: 'Velocity · Vision', desc: 'First-person flight at 180 mph — the new air sport.', img: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80', color: '#FF3B30' },
];

function Card({ d, i }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, filter: 'blur(10px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative h-[460px] md:h-[520px] rounded-2xl overflow-hidden bg-[#0c1a2c] hover-lift cursor-pointer"
    >
      <img src={d.img} alt={d.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:saturate-110" />
      <div className="absolute inset-0 athlete-card-bg" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/30 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl group-hover:ring-[#4DA6FF]/40 transition-all duration-700" />

      <div className="absolute top-5 left-5 flex items-center gap-3">
        <span className="font-anton text-xs tracking-[0.3em] text-[#F5F9FF]/70">{d.code}</span>
        <span className="w-8 h-px" style={{ background: d.color }} />
      </div>
      <div className="absolute top-5 right-5 text-[10px] tracking-[0.3em] font-sora text-[#F5F9FF]/50 uppercase">{d.tag}</div>

      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
        <h3 className="font-anton text-3xl md:text-4xl tracking-[0.08em] uppercase mb-3 transition-transform duration-700 group-hover:-translate-y-1" style={{ color: d.color }}>
          {d.name}
        </h3>
        <p className="font-sora text-sm text-[#F5F9FF]/70 leading-relaxed mb-5 max-w-md">{d.desc}</p>
        <div className="flex items-center gap-3 text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/80 uppercase">
          <span>Discover</span>
          <span className="flex-1 h-px bg-[#F5F9FF]/20 max-w-[80px] transition-all duration-700 group-hover:max-w-[160px] group-hover:bg-[#4DA6FF]" />
          <span>→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Disciplines() {
  return (
    <section id="disciplines" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120%] h-[400px] bg-radial-blue opacity-60" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#4DA6FF]" />
              <span className="text-[10px] tracking-[0.5em] font-sora text-[#4DA6FF] uppercase">Chapter 01 · Disciplines</span>
            </div>
            <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] uppercase leading-[0.95]">
              Seven ways<br/>to <span className="gradient-text">touch the sky</span>
            </h2>
          </div>
          <p className="font-sora text-base md:text-lg text-[#F5F9FF]/60 max-w-md leading-relaxed">
            Each discipline is a different language spoken in the same alphabet — altitude, lift, courage. The federation governs them all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DISCIPLINES.map((d, i) => <Card key={d.name} d={d} i={i} />)}
        </div>
      </div>
    </section>
  );
}

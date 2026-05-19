'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';

const CITIES = [
  { name: 'New York', cx: 28, cy: 38 },
  { name: 'London', cx: 47, cy: 32 },
  { name: 'Tokyo', cx: 82, cy: 40 },
  { name: 'Sydney', cx: 86, cy: 75 },
  { name: 'São Paulo', cx: 35, cy: 68 },
  { name: 'Dubai', cx: 58, cy: 47 },
  { name: 'Cape Town', cx: 52, cy: 78 },
  { name: 'Reykjavik', cx: 43, cy: 22 },
];

const ROUTES = [
  [0,1],[1,2],[2,3],[0,4],[1,5],[5,2],[3,5],[4,6],[7,1],[6,5],[7,0],
];

export default function GlobalFederation() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 380; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 50;
      const inside = (
        (x > 12 && x < 30 && y > 12 && y < 35) ||
        (x > 28 && x < 42 && y > 30 && y < 44) ||
        (x > 42 && x < 60 && y > 14 && y < 32) ||
        (x > 48 && x < 62 && y > 32 && y < 46) ||
        (x > 58 && x < 88 && y > 18 && y < 32) ||
        (x > 78 && x < 92 && y > 38 && y < 48)
      );
      if (inside) arr.push({ x, y, op: 0.4 + Math.random() * 0.5 });
    }
    return arr;
  }, []);
  return (
    <section id="global" className="relative py-32 md:py-44 overflow-hidden bg-[#050b16]">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#4DA6FF]/10 blur-[140px]" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#FF3B30]/10 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#34C759]" />
            <span className="text-[10px] tracking-[0.5em] font-sora text-[#34C759] uppercase">Chapter 03 · Global Network</span>
            <span className="w-10 h-px bg-[#34C759]" />
          </div>
          <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] uppercase leading-[0.95] mb-6">
            One sky.<br/><span className="gradient-text">One hundred and twenty-seven</span> nations.
          </h2>
          <p className="font-sora text-base md:text-lg text-[#F5F9FF]/60 max-w-2xl mx-auto leading-relaxed">
            From New York to Tokyo, the federation links every horizon. Every route, every member, every athlete — woven into a single global circulation of air sport.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} className="relative aspect-[2/1] w-full glass rounded-3xl overflow-hidden">
          {/* Stylized world map (svg dotted) */}
          <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <defs>
              <radialGradient id="glow" cx="50%" cy="50%">
                <stop offset="0%" stopColor="#4DA6FF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#4DA6FF" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="route" x1="0" x2="1">
                <stop offset="0%" stopColor="#4DA6FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#4DA6FF" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#4DA6FF" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* dotted continent silhouettes */}
            {mounted && dots.map((d, i) => (
              <circle key={i} cx={d.x} cy={d.y} r="0.18" fill="#4DA6FF" opacity={d.op} />
            ))}

            {/* routes (correctly scaled) */}
            {ROUTES.map(([a, b], i) => {
              const A = CITIES[a], B = CITIES[b];
              const mx = (A.cx + B.cx) / 2;
              const my = (A.cy + B.cy) / 2 - Math.abs(B.cx - A.cx) * 0.18;
              return (
                <path key={'r'+i} d={`M ${A.cx} ${A.cy} Q ${mx} ${my} ${B.cx} ${B.cy}`} fill="none" stroke="url(#route)" strokeWidth="0.25" strokeLinecap="round" />
              );
            })}

            {/* cities */}
            {CITIES.map((c, i) => (
              <g key={c.name}>
                <circle cx={c.cx} cy={c.cy} r="1.2" fill="url(#glow)" />
                <circle cx={c.cx} cy={c.cy} r="0.55" fill="#F5F9FF" />
                <circle cx={c.cx} cy={c.cy} r="0.55" fill="#4DA6FF">
                  <animate attributeName="r" values="0.55;2.4;0.55" dur={(3 + i * 0.4) + 's'} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur={(3 + i * 0.4) + 's'} repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>

          {/* HUD overlays */}
          <div className="absolute top-5 left-5 text-[10px] tracking-[0.4em] font-sora text-[#F5F9FF]/50 uppercase">Federation Network · Live</div>
          <div className="absolute top-5 right-5 text-[10px] tracking-[0.4em] font-sora text-[#34C759] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse-glow" /> 8 Active Routes
          </div>
          <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Members', value: '127' },
              { label: 'Continents', value: '6' },
              { label: 'Air Corridors', value: '348' },
              { label: 'Annual Flights', value: '12.4K' },
            ].map((s) => (
              <div key={s.label} className="glass-strong rounded-lg px-3 py-2.5">
                <div className="font-anton text-xl tracking-wider text-[#F5F9FF]">{s.value}</div>
                <div className="text-[9px] tracking-[0.3em] font-sora text-[#F5F9FF]/50 uppercase">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

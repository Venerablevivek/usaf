'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const ATHLETES = [
  { rank: 1, name: 'Élise Moreau', nation: 'France', flag: '🇫🇷', discipline: 'Wingsuit', points: 9842, change: 'up', delta: 12 },
  { rank: 2, name: 'Marcus Hale', nation: 'United States', flag: '🇺🇸', discipline: 'Aerobatics', points: 9760, change: 'up', delta: 4 },
  { rank: 3, name: 'Aiko Tanaka', nation: 'Japan', flag: '🇯🇵', discipline: 'Drone Racing', points: 9712, change: 'flat', delta: 0 },
  { rank: 4, name: 'Sven Lindqvist', nation: 'Sweden', flag: '🇸🇪', discipline: 'Gliding', points: 9601, change: 'down', delta: 3 },
  { rank: 5, name: 'Camila Rojas', nation: 'Brazil', flag: '🇧🇷', discipline: 'Paragliding', points: 9534, change: 'up', delta: 8 },
  { rank: 6, name: 'Liam O\u2019Reilly', nation: 'Ireland', flag: '🇮🇪', discipline: 'Skydiving', points: 9420, change: 'up', delta: 2 },
  { rank: 7, name: 'Anya Volkov', nation: 'Estonia', flag: '🇪🇪', discipline: 'Ballooning', points: 9358, change: 'down', delta: 1 },
  { rank: 8, name: 'Mateo Costa', nation: 'Argentina', flag: '🇦🇷', discipline: 'Wingsuit', points: 9301, change: 'flat', delta: 0 },
];

const NATIONS = ['ALL', 'USA', 'FRA', 'JPN', 'SWE', 'BRA', 'IRL', 'EST', 'ARG'];

function Counter({ value }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref} className="tabular-nums">{n.toLocaleString()}</span>;
}

export default function Rankings() {
  const [filter, setFilter] = useState('ALL');
  return (
    <section id="rankings" className="relative py-32 md:py-44 overflow-hidden bg-[#07111F]">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-[#FFD60A]" />
              <span className="text-[10px] tracking-[0.5em] font-sora text-[#FFD60A] uppercase">Chapter 02 · World Rankings</span>
            </div>
            <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] uppercase leading-[0.95]">
              The <span className="gradient-text-olympic">leaderboard</span><br/>of the sky
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 max-w-md">
            {NATIONS.map((n) => (
              <button key={n} onClick={() => setFilter(n)} className={"px-3 py-1.5 rounded-full border text-[10px] tracking-[0.25em] font-sora uppercase transition-all " + (filter === n ? 'bg-[#4DA6FF] border-[#4DA6FF] text-[#07111F]' : 'border-[#F5F9FF]/15 text-[#F5F9FF]/60 hover:border-[#4DA6FF]/60 hover:text-[#4DA6FF]')}>
                {n}
              </button>
            ))}
          </div>
        </motion.div>

        {/* table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-4 border-b border-white/5 text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/40 uppercase">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Athlete</div>
            <div className="col-span-3 hidden md:block">Discipline</div>
            <div className="col-span-2 hidden md:block">Nation</div>
            <div className="col-span-5 md:col-span-2 text-right">Points</div>
          </div>
          {ATHLETES.map((a, i) => (
            <motion.div
              key={a.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-12 px-6 py-5 border-b border-white/5 last:border-0 items-center hover:bg-white/[0.02] transition-colors"
            >
              <div className="col-span-1 font-anton text-2xl tracking-wider" style={{ color: a.rank <= 3 ? ['#FFD60A','#F5F9FF','#FF8C42'][a.rank-1] : '#F5F9FF' }}>
                {a.rank.toString().padStart(2, '0')}
              </div>
              <div className="col-span-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4DA6FF] to-[#1a3a5c] flex items-center justify-center text-[10px] font-sora font-semibold">
                  {a.name.split(' ').map(s => s[0]).join('')}
                </div>
                <div>
                  <div className="font-sora text-sm font-semibold tracking-wide text-[#F5F9FF]">{a.name}</div>
                  <div className="font-sora text-[10px] tracking-[0.25em] text-[#F5F9FF]/40 uppercase md:hidden">{a.discipline} · {a.nation}</div>
                </div>
              </div>
              <div className="col-span-3 hidden md:block font-sora text-sm text-[#F5F9FF]/70">{a.discipline}</div>
              <div className="col-span-2 hidden md:flex items-center gap-2 font-sora text-sm text-[#F5F9FF]/70">
                <span className="text-base">{a.flag}</span> {a.nation}
              </div>
              <div className="col-span-5 md:col-span-2 text-right flex items-center justify-end gap-3">
                <span className="font-anton text-2xl tracking-wider text-[#F5F9FF]"><Counter value={a.points} /></span>
                <span className={"text-[10px] font-sora w-9 " + (a.change === 'up' ? 'text-[#34C759]' : a.change === 'down' ? 'text-[#FF3B30]' : 'text-[#F5F9FF]/40')}>
                  {a.change === 'up' ? '▲' : a.change === 'down' ? '▼' : '–'} {a.delta || ''}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {[
            { label: 'Registered Athletes', value: 24380 },
            { label: 'Member Nations', value: 127 },
            { label: 'Sanctioned Events', value: 416 },
            { label: 'Flight Hours Logged', value: 1842917 },
          ].map((s) => (
            <div key={s.label} className="glass rounded-xl p-5">
              <div className="font-anton text-3xl md:text-4xl tracking-wider text-[#F5F9FF] mb-1"><Counter value={s.value} /></div>
              <div className="text-[10px] tracking-[0.3em] font-sora text-[#F5F9FF]/50 uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

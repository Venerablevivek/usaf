'use client';
import { motion } from 'framer-motion';

/* Per-scene subtle atmospheric layer (CSS + SVG only, no R3F overhead). */
export default function SceneAtmosphere({ index }) {
  switch (index) {
    case 0:
      // SCENE 1 — drifting volumetric particles + soft fog
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 60%, rgba(246,241,232,0.10), transparent 60%)',
          }} />
          {Array.from({ length: 22 }).map((_, i) => {
            const left = (i * 53 + 11) % 100;
            const top = (i * 37 + 9) % 100;
            const size = ((i * 7) % 4) + 1.5;
            const dur = 10 + ((i * 13) % 10);
            const delay = (i * 0.5) % 6;
            const dx = ((i * 17) % 200) - 100;
            const dy = -100 - (i * 11) % 220;
            return (
              <span key={i} className="particle particle-warm drift" style={{
                left: left + '%', top: top + '%', width: size + 'px', height: size + 'px',
                animationDuration: dur + 's', animationDelay: '-' + delay + 's',
                '--dx': dx + 'px', '--dy': dy + 'px',
              }} />
            );
          })}
        </div>
      );
    case 1:
      // SCENE 2 — slow ribbon trails / air flow lines
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1600 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="rb1" x1="0" x2="1">
              <stop offset="0%" stopColor="#0085C7" stopOpacity="0" />
              <stop offset="50%" stopColor="#0085C7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#0085C7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rb2" x1="0" x2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            { d: 'M -100 700 Q 400 500 800 600 T 1700 400', delay: '0s', stroke: 'url(#rb1)' },
            { d: 'M -100 500 Q 500 300 900 420 T 1700 250', delay: '-3s', stroke: 'url(#rb2)' },
            { d: 'M -100 820 Q 600 700 1000 760 T 1700 600', delay: '-6s', stroke: 'url(#rb1)' },
          ].map((r, i) => (
            <path key={i} d={r.d} fill="none" stroke={r.stroke} strokeWidth="1.2" strokeDasharray="1000 1500" className="ribbon-flow" style={{ animationDelay: r.delay }} />
          ))}
        </svg>
      );
    case 2:
      // SCENE 3 — aerodynamic light streaks
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 9 }).map((_, i) => {
            const top = 12 + i * 9;
            const dur = 6 + (i % 4) * 1.6;
            const delay = (i * 0.55) % 6;
            const width = 30 + ((i * 11) % 30);
            const color = i % 3 === 0 ? 'rgba(212,162,76,0.55)' : i % 3 === 1 ? 'rgba(246,241,232,0.45)' : 'rgba(198,40,40,0.35)';
            return (
              <span
                key={i}
                className="streak"
                style={{
                  position: 'absolute', top: top + '%', left: 0,
                  width: width + '%', height: '1px',
                  background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
                  animationDuration: dur + 's',
                  animationDelay: '-' + delay + 's',
                  filter: 'blur(0.4px)',
                }}
              />
            );
          })}
        </div>
      );
    case 3:
      // SCENE 4 — soft cinematic bloom (large gold orb)
      return (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bloom" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(212,162,76,0.28) 0%, rgba(198,40,40,0.08) 30%, transparent 60%)',
            filter: 'blur(40px)',
          }} />
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse at 50% 70%, rgba(30,30,30,0.0), rgba(30,30,30,0.35) 80%)',
          }} />
        </div>
      );
    case 4:
      // SCENE 5 — floating Olympic particles
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => {
            const palette = ['#0085C7', '#DF0024', '#009F3D', '#FFFFFF', '#F4C300'];
            const c = palette[i % palette.length];
            const left = (i * 41 + 7) % 100;
            const top = (i * 23 + 11) % 100;
            const size = ((i * 5) % 3) + 1.5;
            const dur = 9 + ((i * 7) % 8);
            const delay = (i * 0.4) % 7;
            const dx = ((i * 13) % 180) - 90;
            const dy = -120 - (i * 9) % 220;
            return (
              <span key={i} className="particle drift" style={{
                left: left + '%', top: top + '%', width: size + 'px', height: size + 'px',
                background: `radial-gradient(circle, ${c}, ${c}33 60%, transparent)`,
                animationDuration: dur + 's', animationDelay: '-' + delay + 's',
                '--dx': dx + 'px', '--dy': dy + 'px',
              }} />
            );
          })}
        </div>
      );
    case 5:
      // SCENE 6 — layered parallax aircraft silhouettes & cloud depth
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1600 900" preserveAspectRatio="none">
          {/* cloud silhouettes */}
          <g opacity="0.18" fill="#FFFFFF">
            <ellipse cx="260" cy="720" rx="260" ry="36" />
            <ellipse cx="1100" cy="780" rx="320" ry="30" />
            <ellipse cx="1400" cy="180" rx="180" ry="22" />
          </g>
          {/* aircraft silhouettes */}
          <g fill="#1E1E1E" opacity="0.55">
            <path d="M 180 320 l 90 -6 l 30 12 l -30 12 l -90 -6 l -22 0 z" />
            <path d="M 1180 460 l 70 -5 l 22 9 l -22 9 l -70 -5 l -16 0 z" opacity="0.7" />
            <path d="M 760 220 l 110 -7 l 36 14 l -36 14 l -110 -7 l -24 0 z" opacity="0.45" />
          </g>
          {/* faint trails */}
          <g stroke="#0085C7" strokeOpacity="0.35" strokeWidth="0.8" fill="none">
            <path d="M 80 322 L 180 320" />
            <path d="M 1080 462 L 1180 460" />
            <path d="M 660 222 L 760 220" />
          </g>
        </svg>
      );
    case 6:
      // SCENE 7 — elegant global route arcs
      return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1600 900" preserveAspectRatio="none">
          <defs>
            <linearGradient id="arcg" x1="0" x2="1">
              <stop offset="0%" stopColor="#0085C7" stopOpacity="0" />
              <stop offset="50%" stopColor="#0085C7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0085C7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            { d: 'M 120 700 Q 600 -100 1480 700', delay: '0s' },
            { d: 'M 240 760 Q 800 100 1380 760', delay: '-2.4s' },
            { d: 'M 80 820 Q 700 220 1520 820', delay: '-4.8s' },
            { d: 'M 300 660 Q 800 220 1320 660', delay: '-7.2s' },
          ].map((a, i) => (
            <path key={i} d={a.d} fill="none" stroke="url(#arcg)" strokeWidth="1.1" strokeDasharray="1200 1800" className="arc-draw" style={{ animationDelay: a.delay }} />
          ))}
          {/* node dots */}
          {[
            [120, 700], [240, 760], [80, 820], [300, 660],
            [1480, 700], [1380, 760], [1520, 820], [1320, 660],
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p[0]} cy={p[1]} r="3" fill="#FFFFFF" />
              <circle cx={p[0]} cy={p[1]} r="3" fill="#0085C7">
                <animate attributeName="r" values="3;14;3" dur={(3 + (i % 4) * 0.6) + 's'} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0;1" dur={(3 + (i % 4) * 0.6) + 's'} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>
      );
    case 7:
      // SCENE 8 — ambient particles + glowing emblem behind text
      return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* emblem glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[760px] rounded-full float-slow" style={{
            background: 'radial-gradient(circle, rgba(212,162,76,0.32) 0%, rgba(212,162,76,0.08) 30%, transparent 65%)',
            filter: 'blur(20px)',
          }} />
          {Array.from({ length: 26 }).map((_, i) => {
            const left = (i * 31 + 9) % 100;
            const top = (i * 19 + 13) % 100;
            const size = ((i * 3) % 3) + 1.5;
            const dur = 11 + ((i * 5) % 9);
            const delay = (i * 0.45) % 7;
            const dx = ((i * 11) % 160) - 80;
            const dy = -140 - (i * 7) % 200;
            return (
              <span key={i} className="particle particle-warm drift" style={{
                left: left + '%', top: top + '%', width: size + 'px', height: size + 'px',
                animationDuration: dur + 's', animationDelay: '-' + delay + 's',
                '--dx': dx + 'px', '--dy': dy + 'px',
              }} />
            );
          })}
        </div>
      );
    default:
      return null;
  }
}

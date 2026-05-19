'use client';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneAtmosphere from './SceneAtmosphere';
const SceneOne = "/videos/scene1.mp4";
const SceneTwo = "/videos/scene2.mp4";
const SceneThree = "/videos/scene3.mp4";
const SceneFour = "/videos/scene4.mp4";
const SceneFive = "/videos/scene5.mp4";
const SceneSix = "/videos/scene6.mp4";
const SceneSeven = "/videos/scene7.mp4";
const SceneEight = "/videos/scene8.mp4";

// R3F canvas only mounted client-side, lazy
const SceneCanvas = dynamic(() => import('./R3F/SceneCanvas'), { ssr: false });

const SCENES = [
  {
    id: 1, chapter: 'I', kicker: 'The Awakening Sky',
    title: 'THE SKY IS NOT THE LIMIT',
    sub: ['Human flight began with imagination.', 'Now it becomes a global movement.'],
    src: SceneOne,
    range: [0.00, 0.12], accent: '#0085C7', r3f: 'clouds',
  },
  {
    id: 2, chapter: 'II', kicker: 'The Rise of Flight',
    title: 'BORN TO DEFY GRAVITY',
    sub: ['Air sports redefine human potential.'],
    src: SceneTwo,
    range: [0.12, 0.24], accent: '#F4C300',
  },
  {
    id: 3, chapter: 'III', kicker: 'The Momentum',
    title: 'SPEED \u2022 DISCIPLINE \u2022 FREEDOM',
    sub: ['Precision meets courage in the sky.'],
    src: SceneThree,
    range: [0.24, 0.36], accent: '#009F3D',
  },
  {
    id: 4, chapter: 'IV', kicker: 'The Atmosphere',
    title: 'WHERE HUMAN FLIGHT EVOLVES',
    sub: ['Innovation beyond the clouds.'],
    src: SceneFour,
    range: [0.36, 0.48], accent: '#DF0024', r3f: 'bloom',
  },
  {
    id: 5, chapter: 'V', kicker: 'The Global Unity',
    title: 'ONE FEDERATION \u2022 ONE SKY',
    sub: ['Uniting nations through flight.'],
    src: SceneFive,
    range: [0.48, 0.60], accent: '#FFFFFF',
  },
  {
    id: 6, chapter: 'VI', kicker: 'The Elite World',
    title: 'THE MOST EXTREME AIR SPORTS',
    sub: ['Where elite athletes challenge gravity.'],
    src: SceneSix,
    range: [0.60, 0.72], accent: '#F4C300',
  },
  {
    id: 7, chapter: 'VII', kicker: 'The Future of Aviation',
    title: 'THE NEXT ERA OF HUMAN FLIGHT',
    sub: ['The future of aerial performance.'],
    src: SceneSeven,
    range: [0.72, 0.86], accent: '#0085C7',
  },
  {
    id: 8, chapter: 'VIII', kicker: 'Final Cinematic Hold',
    title: 'UNITED STATES AIR SPORTS FEDERATION',
    sub: ['Uniting the future of global air sports.'],
    src: SceneEight,
    range: [0.86, 1.00], accent: '#FFFFFF', r3f: 'rings', cta: true,
  },
];

const TOTAL_VH = SCENES.length * 140;

function titleSizeClass(title) {
  const len = title.length;
  if (len > 30) return 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]';
  if (len > 22) return 'text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem]';
  return 'text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] xl:text-[9rem]';
}

export default function CinematicScenes() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const titleRefs = useRef([]);
  const subRefs = useRef([]);
  const chapterRefs = useRef([]);
  const layerRefs = useRef([]);
  const r3fLayerRefs = useRef([]);
  const progressRef = useRef(null);
  const chapterIndicatorRef = useRef(null);
  const ctaRef = useRef(null);
  const [activeR3F, setActiveR3F] = useState({ 0: false, 3: false, 7: false });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const N = SCENES.length;
    const state = SCENES.map(() => ({ target: 0, current: 0 }));

    let rafId;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      for (let i = 0; i < N; i++) {
        const s = state[i];
        if (Math.abs(s.current - s.target) > 0.001) {
          s.current = lerp(s.current, s.target, 0.14);
          const v = videoRefs.current[i];
          if (v && v.duration && !isNaN(v.duration)) {
            try { v.currentTime = Math.min(v.duration - 0.05, Math.max(0, s.current)); } catch (e) {}
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const fadeFrac = 0.18;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.55,
      onUpdate: (self) => {
        const p = Math.min(0.9999, Math.max(0, self.progress));
        let activeIdx = N - 1;
        for (let i = 0; i < N; i++) {
          const [s, e] = SCENES[i].range;
          if (p >= s && p < e) { activeIdx = i; break; }
        }

        // mount R3F layers only when their scene is near
        const wantMount = { 0: false, 3: false, 7: false };
        [0, 3, 7].forEach((i) => {
          const [rs, re] = SCENES[i].range;
          // mount when within 1.5 scene-widths of the scene's range
          const buffer = (re - rs) * 1.2;
          wantMount[i] = p >= rs - buffer && p < re + buffer;
        });
        setActiveR3F((prev) => {
          if (prev[0] === wantMount[0] && prev[3] === wantMount[3] && prev[7] === wantMount[7]) return prev;
          return wantMount;
        });

        for (let i = 0; i < N; i++) {
          const [rs, re] = SCENES[i].range;
          const span = re - rs;
          const local = Math.max(0, Math.min(1, (p - rs) / span));
          const inRange = p >= rs && p < re;

          const layer = layerRefs.current[i];
          if (layer) {
            let op = 0;
            if (inRange) {
              if (local < fadeFrac) op = local / fadeFrac;
              else if (local > 1 - fadeFrac) op = (1 - local) / fadeFrac;
              else op = 1;
            }
            if (i === 0 && p < rs + fadeFrac * span) op = 1;
            if (i === N - 1 && p >= re - 0.01) op = 1;
            layer.style.opacity = String(op);
            layer.style.zIndex = String(i === activeIdx ? 3 : (i === activeIdx - 1 || i === activeIdx + 1) ? 2 : 1);
          }
          // R3F layer follows the same opacity, just a touch dimmer
          const rLayer = r3fLayerRefs.current[i];
          if (rLayer && (i === 0 || i === 3 || i === 7)) {
            const baseOp = parseFloat(layer ? layer.style.opacity : '0') || 0;
            rLayer.style.opacity = String(baseOp * 0.95);
          }

          const tIn = 0.22, tOut = 0.78;
          let textOp = 0, textY = 0, textBlur = 14;
          if (inRange) {
            if (local < tIn) {
              const k = local / tIn;
              textOp = k;
              textY = (1 - k) * 36;
              textBlur = (1 - k) * 12;
            } else if (local > tOut) {
              const k = (local - tOut) / (1 - tOut);
              textOp = 1 - k;
              textY = -k * 26;
              textBlur = k * 8;
            } else {
              textOp = 1; textY = 0; textBlur = 0;
            }
          }
          if (i === N - 1 && local >= tIn && p < 1) { textOp = 1; textY = 0; textBlur = 0; }

          const title = titleRefs.current[i];
          const sub = subRefs.current[i];
          const chapter = chapterRefs.current[i];
          if (title) {
            title.style.opacity = String(textOp);
            title.style.transform = `translate3d(0, ${textY}px, 0)`;
            title.style.filter = `blur(${textBlur}px)`;
          }
          if (sub) {
            sub.style.opacity = String(textOp * 0.92);
            sub.style.transform = `translate3d(0, ${textY * 0.55}px, 0)`;
            sub.style.filter = `blur(${textBlur * 0.5}px)`;
          }
          if (chapter) {
            chapter.style.opacity = String(textOp * 0.95);
            chapter.style.transform = `translate3d(0, ${textY * 0.4}px, 0)`;
          }

          const v = videoRefs.current[i];
          if (v && i === activeIdx) {
            const dur = v.duration;
            if (dur && !isNaN(dur)) state[i].target = local * (dur - 0.05);
          }
        }

        if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
        if (chapterIndicatorRef.current) {
          chapterIndicatorRef.current.textContent = (activeIdx + 1).toString().padStart(2, '0') + ' \u00b7 ' + N.toString().padStart(2, '0');
        }

        if (ctaRef.current) {
          const last = activeIdx === N - 1;
          const lastLocal = last ? Math.max(0, Math.min(1, (p - SCENES[N - 1].range[0]) / (SCENES[N - 1].range[1] - SCENES[N - 1].range[0]))) : 0;
          const reveal = last ? Math.max(0, (lastLocal - 0.55) / 0.35) : 0;
          ctaRef.current.style.opacity = String(reveal);
          ctaRef.current.style.transform = `translate3d(0, ${(1 - reveal) * 28}px, 0)`;
          ctaRef.current.style.pointerEvents = reveal > 0.85 ? 'auto' : 'none';
        }
      },
    });

    videoRefs.current.forEach((v) => { if (v) v.play().then(() => v.pause()).catch(() => {}); });

    return () => {
      cancelAnimationFrame(rafId);
      trigger && trigger.kill();
    };
  }, []);

  return (
    <section ref={containerRef} id="cinematic" className="relative w-full" style={{ height: `${TOTAL_VH}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: '#05060A' }}>
        {/* Video Layers */}
        {SCENES.map((s, i) => (
                    <div
                      key={s.id}
                      ref={(el) => (layerRefs.current[i] = el)}
                      className="absolute inset-0 w-full h-full"
                      style={{
                        opacity: i === 0 ? 1 : 0,
                        zIndex: i === 0 ? 3 : 1,
                        willChange: "opacity",
                      }}
                    >
                      <video
                        ref={(el) => (videoRefs.current[i] = el)}
                        muted
                        playsInline
                        preload={i === 0 ? "auto" : "metadata"}
                        crossOrigin="anonymous"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{
                          filter: "saturate(1.0) contrast(1.04) brightness(0.92)",
                          willChange: "transform, opacity",
                          transform: "translateZ(0)",
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <source src={s.src} type="video/mp4" />
                      </video>

            {/* Clean cinematic overlays */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(180deg, rgba(5,6,10,0.35) 0%, rgba(5,6,10,0.02) 30%, rgba(5,6,10,0.02) 70%, rgba(5,6,10,0.85) 100%)',
            }} />
            <div className="absolute inset-0 pointer-events-none" style={{
              background: 'radial-gradient(ellipse at center, transparent 38%, rgba(5,6,10,0.55) 100%)',
            }} />

            {/* SVG atmospheric layer (cheap) */}
            <SceneAtmosphere index={i} />

            {/* R3F atmospheric layer for scenes 1 / 4 / 8 (mounted only when near) */}
            {(i === 0 || i === 3 || i === 7) && activeR3F[i] && (
              <div
                ref={(el) => (r3fLayerRefs.current[i] = el)}
                className="absolute inset-0 pointer-events-none"
                style={{ opacity: i === 0 ? 1 : 0, willChange: 'opacity' }}
              >
                <SceneCanvas mode={s.r3f} />
              </div>
            )}
          </div>
        ))}

        {/* Text overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {SCENES.map((s, i) => (
            <div key={s.id} className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <div
                ref={(el) => (chapterRefs.current[i] = el)}
                className="font-sans text-[10px] md:text-xs tracking-[0.55em] mb-6 uppercase flex items-center gap-4"
                style={{ opacity: 0, color: s.accent, willChange: 'transform, opacity' }}
              >
                <span className="w-10 h-px" style={{ background: s.accent, opacity: 0.6 }} />
                <span>Chapter {s.chapter}</span>
                <span className="font-editorial italic normal-case tracking-normal opacity-80">{s.kicker}</span>
                <span className="w-10 h-px" style={{ background: s.accent, opacity: 0.6 }} />
              </div>
              <h2
                ref={(el) => (titleRefs.current[i] = el)}
                className={`font-display ${titleSizeClass(s.title)} tracking-[0.05em] uppercase text-white text-shadow-cinematic leading-[0.95] max-w-[92vw]`}
                style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
              >
                {s.title}
              </h2>
              <p
                ref={(el) => (subRefs.current[i] = el)}
                className="mt-7 font-editorial italic text-base sm:text-lg md:text-xl tracking-wide text-white/85 leading-relaxed max-w-2xl"
                style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
              >
                {s.sub.map((line, k) => (<span key={k} className="block">{line}</span>))}
              </p>
              <div className="mt-8 w-10 h-px" style={{ background: s.accent, opacity: 0.5 }} />
            </div>
          ))}
        </div>

        {/* Final CTA reveal (in scene 8) */}
        <div
          ref={ctaRef}
          className="absolute inset-x-0 bottom-[18%] md:bottom-[20%] flex flex-col items-center justify-center pointer-events-none z-20 px-6"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a
              href="https://us-federation-demo-nexivra-ai.vercel.app/"
              className="group relative inline-flex items-center gap-3 px-12 py-5 rounded-full font-sans font-semibold tracking-[0.3em] text-xs uppercase overflow-hidden"
              style={{ background: '#FFFFFF', color: '#0A0A0A' }}
            >
              <span className="relative z-10">Enter the Federation</span>
              <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
              <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{ background: 'linear-gradient(90deg, #0085C7 0%, #F4C300 25%, #000000 50%, #009F3D 75%, #DF0024 100%)' }}
              />
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-sans font-medium tracking-[0.3em] text-xs uppercase transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.35)', color: '#FFFFFF' }}
            >
              <span>Replay the Film</span>
              <span>&#x27F2;</span>
            </a>
          </div>
          {/* Olympic ring dots */}
          <div className="mt-6 flex items-center gap-2 opacity-90">
            {['#0085C7','#F4C300','#000000','#009F3D','#DF0024'].map((c) => (
              <span key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Editorial chapter markers */}
        <div className="absolute top-24 md:top-28 left-6 md:left-10 z-10 text-[10px] tracking-[0.45em] font-sans text-white/65 uppercase">
          A Cinematic Opening
        </div>
        <div
          ref={chapterIndicatorRef}
          className="absolute top-24 md:top-28 right-6 md:right-10 z-10 font-editorial italic text-base text-white/75"
        >
          01 &middot; 08
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1100px] z-10">
          <div className="flex justify-between items-center mb-3 text-[10px] tracking-[0.4em] font-sans text-white/60 uppercase">
            <span>Scroll to enter</span>
            <span className="hidden md:inline font-editorial italic normal-case tracking-normal text-white/60">A film by U.S.A.S.F.</span>
            <span>&darr;</span>
          </div>
          <div className="h-px w-full bg-white/15 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full w-full origin-left"
              style={{
                transform: 'scaleX(0)',
                background: 'linear-gradient(90deg, #0085C7 0%, #F4C300 25%, #FFFFFF 50%, #009F3D 75%, #DF0024 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

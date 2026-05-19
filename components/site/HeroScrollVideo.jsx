'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HERO_DESKTOP = 'https://customer-assets.emergentagent.com/job_2b34f650-00cc-458c-986b-6f06ba18b6dd/artifacts/02zav5m9_hero.mp4';
const HERO_MOBILE = 'https://customer-assets.emergentagent.com/job_2b34f650-00cc-458c-986b-6f06ba18b6dd/artifacts/qiil2xb0_hero-mobile.mp4';

const TIMELINE = [
  { from: 0.10, to: 0.20, text: 'THE SKY IS NOT THE LIMIT', sub: 'Chapter I' },
  { from: 0.25, to: 0.35, text: 'UNITING THE WORLD OF AIR SPORTS', sub: 'Chapter II' },
  { from: 0.40, to: 0.50, text: 'SPEED · DISCIPLINE · FREEDOM', sub: 'Chapter III' },
  { from: 0.55, to: 0.65, text: 'ONE FEDERATION · ONE SKY', sub: 'Chapter IV' },
  { from: 0.70, to: 0.80, text: 'WHERE HUMAN FLIGHT EVOLVES', sub: 'Chapter V' },
  { from: 0.90, to: 1.00, text: 'ENTER THE FUTURE OF AIR SPORTS', sub: 'Finale' },
];

export default function HeroScrollVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const textRefs = useRef([]);
  const subRefs = useRef([]);
  const progressBarRef = useRef(null);
  const chapterRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let currentTime = 0;
    let rafId = null;

    const onReady = () => {
      setReady(true);
      try { video.currentTime = 0.01; } catch (e) {}
    };
    const onError = (e) => {
      console.warn('Video error', e, video.error);
    };
    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('canplay', onReady);
    video.addEventListener('error', onError);
    // force load (some browsers won't autoload until requested)
    try { video.load(); } catch (e) {}
    if (video.readyState >= 1) onReady();

    // Smooth interpolation loop for video.currentTime
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      if (Math.abs(currentTime - targetTime) > 0.001) {
        currentTime = lerp(currentTime, targetTime, 0.12);
        if (video.duration && !isNaN(video.duration)) {
          try { video.currentTime = Math.min(video.duration - 0.05, Math.max(0, currentTime)); } catch (e) {}
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const p = self.progress;
        if (video.duration && !isNaN(video.duration)) {
          targetTime = p * (video.duration - 0.05);
        }
        // progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = 'scaleX(' + p + ')';
        }
        // chapter indicator
        const idx = TIMELINE.findIndex((t) => p >= t.from && p <= t.to);
        if (chapterRef.current) {
          chapterRef.current.textContent = idx >= 0 ? (idx + 1).toString().padStart(2, '0') + ' / 06' : '— / 06';
        }
      },
    });

    // text timelines
    const textTLs = TIMELINE.map((seg, i) => {
      const el = textRefs.current[i];
      const subEl = subRefs.current[i];
      if (!el) return null;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: () => 'top+=' + (seg.from * 100) + '% top',
          end: () => 'top+=' + (seg.to * 100) + '% top',
          scrub: 1.2,
        },
      });
      tl.fromTo(el, { opacity: 0, y: 60, filter: 'blur(20px)', letterSpacing: '0.5em' }, { opacity: 1, y: 0, filter: 'blur(0px)', letterSpacing: '0.18em', ease: 'power2.out', duration: 0.4 })
        .to(el, { opacity: 1, y: 0 }, '+=0.2')
        .to(el, { opacity: 0, y: -40, filter: 'blur(14px)', ease: 'power2.in', duration: 0.4 });
      if (subEl) {
        gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: () => 'top+=' + (seg.from * 100) + '% top',
            end: () => 'top+=' + (seg.to * 100) + '% top',
            scrub: 1.2,
          },
        }).fromTo(subEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 })
          .to(subEl, { opacity: 1 }, '+=0.2')
          .to(subEl, { opacity: 0, y: -10, duration: 0.3 });
      }
      return tl;
    });

    // Play to keep frames decoded in some browsers, then pause
    const tryPlay = async () => {
      try {
        await video.play();
        video.pause();
      } catch (e) { /* autoplay blocked, fine */ }
    };
    tryPlay();

    return () => {
      cancelAnimationFrame(rafId);
      trigger && trigger.kill();
      textTLs.forEach((tl) => tl && tl.scrollTrigger && tl.scrollTrigger.kill());
      textTLs.forEach((tl) => tl && tl.kill());
      video.removeEventListener('loadedmetadata', onReady);
      video.removeEventListener('canplay', onReady);
      video.removeEventListener('error', onError);
    };
  }, []);

  const videoSrc = isMobile ? HERO_MOBILE : HERO_DESKTOP;

  return (
    <section ref={containerRef} id="top" className="relative w-full" style={{ height: '550vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#07111F]">
        {/* Video */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'saturate(1.05) contrast(1.05)' }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07111F]/40 via-transparent to-[#07111F]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent pointer-events-none" style={{height: '40%', top: 'auto', bottom: 0}} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(7,17,31,0.55) 100%)' }} />

        {/* Loading shim */}
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07111F]">
            <div className="text-[10px] tracking-[0.4em] font-sora text-[#F5F9FF]/40">CALIBRATING SKY ENGINE…</div>
          </div>
        )}

        {/* Text overlay timeline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <div className="relative w-full max-w-[1400px] mx-auto flex items-center justify-center">
            {TIMELINE.map((seg, i) => (
              <div key={i} className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ opacity: 0 }}>
                <div ref={(el) => (subRefs.current[i] = el)} className="font-sora text-[10px] md:text-xs tracking-[0.5em] text-[#4DA6FF] mb-5 uppercase" style={{ opacity: 0 }}>
                  · {seg.sub} ·
                </div>
                <div
                  ref={(el) => (textRefs.current[i] = el)}
                  className="font-anton text-4xl sm:text-6xl md:text-8xl lg:text-9xl tracking-[0.18em] text-[#F5F9FF] text-shadow-cinematic leading-[1.02] px-4"
                  style={{ opacity: 0, textWrap: 'balance' }}
                >
                  {seg.text}
                </div>
                <div className="mt-6 w-16 h-px bg-[#4DA6FF]/60" />
              </div>
            ))}
          </div>
        </div>

        {/* HUD - top */}
        <div className="absolute top-24 md:top-28 left-6 md:left-10 z-10 flex items-center gap-3 text-[10px] tracking-[0.3em] font-sora text-[#F5F9FF]/60">
          <span className="w-2 h-2 rounded-full bg-[#FF3B30] animate-pulse-glow" />
          LIVE · CINEMATIC FEED
        </div>
        <div ref={chapterRef} className="absolute top-24 md:top-28 right-6 md:right-10 z-10 text-[10px] tracking-[0.4em] font-sora text-[#F5F9FF]/60">— / 06</div>

        {/* HUD - bottom progress */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-[80vw] max-w-[1100px] z-10">
          <div className="flex justify-between items-center mb-3 text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/60 uppercase">
            <span>Scroll to Pilot</span>
            <span className="hidden md:inline">U.S.A.S.F. · CINEMATIC OPENING</span>
            <span>↓</span>
          </div>
          <div className="h-px w-full bg-[#F5F9FF]/15 overflow-hidden">
            <div ref={progressBarRef} className="h-full w-full bg-gradient-to-r from-[#4DA6FF] via-[#F5F9FF] to-[#4DA6FF] origin-left" style={{ transform: 'scaleX(0)' }} />
          </div>
        </div>

        {/* corner runes */}
        <div className="absolute bottom-8 left-6 md:left-10 hidden md:block text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/40">LAT 40.71° N</div>
        <div className="absolute bottom-8 right-6 md:right-10 hidden md:block text-[10px] tracking-[0.35em] font-sora text-[#F5F9FF]/40">LON 74.01° W</div>
      </div>
    </section>
  );
}

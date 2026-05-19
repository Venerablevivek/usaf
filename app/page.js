'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Loader from '@/components/site/Loader';
import Nav from '@/components/site/Nav';

const CinematicScenes = dynamic(() => import('@/components/site/CinematicScenes'), { ssr: false });

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    let lenis;
    let mounted = true;
    (async () => {
      const { default: Lenis } = await import('lenis');
      if (!mounted) return;
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: false,
      });
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      gsapMod.gsap.registerPlugin(stMod.ScrollTrigger);
      lenis.on('scroll', stMod.ScrollTrigger.update);
      gsapMod.gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsapMod.gsap.ticker.lagSmoothing(0);
    })();
    return () => { mounted = false; if (lenis) lenis.destroy(); };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
  }, [loaded]);

  return (
    <main id="top" className="relative min-h-screen" style={{ background: '#FFFFFF', color: '#0A0A0A' }}>
      <Loader onDone={() => setLoaded(true)} />
      <Nav />
      <CinematicScenes />
    </main>
  );
}

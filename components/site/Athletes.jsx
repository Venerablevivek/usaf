'use client';
import { motion } from 'framer-motion';

const ATHLETES = [
  { name: 'Élise Moreau', role: 'Wingsuit Champion', nation: 'France', quote: 'The mountain doesn\u2019t move. You do.', img: 'https://images.unsplash.com/photo-1571907483086-3c6c2c43fa68?w=900&q=80' },
  { name: 'Marcus Hale', role: 'Aerobatic World Cup', nation: 'United States', quote: 'Gravity is just a suggestion.', img: 'https://images.unsplash.com/photo-1551984917-d5d8c2dbb593?w=900&q=80' },
  { name: 'Aiko Tanaka', role: 'FPV Drone Racer', nation: 'Japan', quote: 'Speed isn\u2019t velocity. It\u2019s presence.', img: 'https://images.unsplash.com/photo-1599582909646-2ace4c8cad2c?w=900&q=80' },
  { name: 'Camila Rojas', role: 'Paragliding Legend', nation: 'Brazil', quote: 'I read clouds the way others read books.', img: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=900&q=80' },
];

export default function Athletes() {
  return (
    <section id="athletes" className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-px bg-[#FF3B30]" />
            <span className="text-[10px] tracking-[0.5em] font-sora text-[#FF3B30] uppercase">Chapter 04 · Featured Athletes</span>
          </div>
          <h2 className="font-anton text-5xl md:text-7xl lg:text-8xl tracking-[0.04em] uppercase leading-[0.95]">
            Faces of the <span className="gradient-text">stratosphere</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ATHLETES.map((a, i) => (
            <motion.article
              key={a.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group relative h-[520px] md:h-[600px] rounded-2xl overflow-hidden bg-[#0c1a2c] hover-lift"
            >
              <img src={a.img} alt={a.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" />
              <div className="absolute inset-0 athlete-card-bg" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#07111F] via-transparent to-transparent opacity-70" />

              <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                <div className="text-[10px] tracking-[0.4em] font-sora text-[#F5F9FF]/50 uppercase">№ {(i+1).toString().padStart(2, '0')}</div>
                <div className="text-[10px] tracking-[0.3em] font-sora text-[#4DA6FF] uppercase glass px-3 py-1.5 rounded-full">{a.nation}</div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                <div className="text-[10px] tracking-[0.4em] font-sora text-[#F5F9FF]/60 uppercase mb-3">{a.role}</div>
                <h3 className="font-anton text-4xl md:text-5xl tracking-[0.04em] uppercase text-[#F5F9FF] mb-5 transition-transform duration-700 group-hover:-translate-y-1">{a.name}</h3>
                <blockquote className="font-sora italic text-base md:text-lg text-[#F5F9FF]/80 max-w-md leading-relaxed border-l-2 border-[#4DA6FF] pl-4">
                  &ldquo;{a.quote}&rdquo;
                </blockquote>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

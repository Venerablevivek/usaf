'use client';
import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative overflow-hidden" style={{ background: '#F6F1E8', color: '#1E1E1E' }}>
      {/* warm atmospheric layer */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 80% 0%, rgba(212,162,76,0.18), transparent 55%), radial-gradient(ellipse at 0% 100%, rgba(143,175,199,0.10), transparent 55%)',
      }} />
      {/* subtle paper grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      }} />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-28 md:pt-40 pb-20">
        {/* editorial top mark */}
        <div className="flex items-center justify-between text-[10px] tracking-[0.5em] uppercase font-sans text-[#1E1E1E]/55 mb-20">
          <span>Volume I &middot; The Manifesto</span>
          <span className="hidden md:inline font-editorial italic normal-case tracking-normal text-[#1E1E1E]/60">A Federation in Motion</span>
          <span>U.S.A.S.F.</span>
        </div>

        {/* hero quote */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-28 md:mb-36">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8"
          >
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-[0.02em] uppercase leading-[0.95] text-[#1E1E1E]">
              The sky has<br />
              <span className="font-editorial italic text-[#C62828] tracking-tight normal-case">always been</span><br />
              a kind of <span className="gradient-gold">freedom.</span>
            </h2>
          </motion.div>
          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 md:pt-10"
          >
            <div className="hairline mb-6" />
            <p className="font-editorial italic text-xl md:text-2xl text-[#1E1E1E]/80 leading-[1.5]">
              &ldquo;We do not chase the horizon. We expand it.&rdquo;
            </p>
            <div className="mt-6 text-[10px] tracking-[0.5em] uppercase font-sans text-[#1E1E1E]/55">
              &mdash; Federation Charter, 2025
            </div>
          </motion.aside>
        </div>

        {/* Three columns: Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1E1E1E]/15 mb-28 md:mb-36">
          {[
            { mark: '01', label: 'Speed',      body: 'A discipline of micro-seconds. Where breath becomes velocity and velocity becomes art.', color: '#C62828' },
            { mark: '02', label: 'Discipline', body: 'The quiet rigor before the spectacle. Years of mastery, captured in a single arc through the sky.', color: '#D4A24C' },
            { mark: '03', label: 'Freedom',    body: 'Not the absence of rules \u2014 but the presence of mastery. A federation of those who fly without fear.', color: '#3D7A57' },
          ].map((p) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 md:p-10"
              style={{ background: '#F6F1E8' }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="font-display text-2xl tracking-wider" style={{ color: p.color }}>{p.mark}</span>
                <span className="h-px w-12" style={{ background: p.color, opacity: 0.55 }} />
              </div>
              <div className="font-display text-3xl md:text-4xl tracking-[0.05em] uppercase mb-5 text-[#1E1E1E]">{p.label}</div>
              <p className="font-editorial italic text-base md:text-lg text-[#1E1E1E]/70 leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Editorial stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1E1E1E]/12 mb-28 md:mb-36">
          {[
            { value: '127', label: 'Member nations' },
            { value: '07',  label: 'Sanctioned disciplines' },
            { value: '24,380', label: 'Registered athletes' },
            { value: 'MMXXV', label: 'Year founded' },
          ].map((s) => (
            <div key={s.label} className="p-8 md:p-10" style={{ background: '#F6F1E8' }}>
              <div className="font-display text-4xl md:text-6xl tracking-wider text-[#1E1E1E] mb-2">{s.value}</div>
              <div className="text-[10px] tracking-[0.4em] uppercase font-sans text-[#1E1E1E]/55">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Final CTA — emotional */}
        <div id="join" className="text-center pt-12 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-4 mb-10 text-[10px] tracking-[0.5em] uppercase font-sans text-[#1E1E1E]/55"
          >
            <span className="h-px w-16" style={{ background: 'rgba(30,30,30,0.25)' }} />
            <span>The Invitation</span>
            <span className="h-px w-16" style={{ background: 'rgba(30,30,30,0.25)' }} />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] tracking-[0.04em] uppercase leading-[0.95] mb-10"
          >
            Join the <span className="gradient-gold">federation</span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial italic text-lg md:text-2xl text-[#1E1E1E]/75 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            For pilots, athletes, federations and dreamers. The next century of human flight begins now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-12 py-5 rounded-full font-sans font-semibold tracking-[0.3em] text-xs uppercase transition-all"
              style={{ background: '#1E1E1E', color: '#F6F1E8' }}
            >
              <span>Apply for Membership</span>
              <span className="transition-transform duration-500 group-hover:translate-x-1">&rarr;</span>
            </a>
            <a
              href="#cinematic"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-sans font-medium tracking-[0.3em] text-xs uppercase transition-all hover:bg-[#D4A24C]/10"
              style={{ border: '1px solid rgba(30,30,30,0.2)', color: '#1E1E1E' }}
            >
              <span>Watch the Film</span>
              <span>&#9655;</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative border-t" style={{ borderColor: 'rgba(30,30,30,0.12)' }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full flex items-center justify-center" style={{ border: '1px solid rgba(30,30,30,0.25)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#D4A24C' }} />
            </div>
            <div>
              <div className="font-display tracking-[0.28em] text-base">U.S.A.S.F.</div>
              <div className="font-editorial italic text-xs text-[#1E1E1E]/55">United States Air Sports Federation</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[10px] tracking-[0.4em] uppercase font-sans text-[#1E1E1E]/55">
            <a href="#cinematic" className="hover:text-[#1E1E1E] transition-colors">The Film</a>
            <a href="#manifesto" className="hover:text-[#1E1E1E] transition-colors">Manifesto</a>
            <a href="#join" className="hover:text-[#1E1E1E] transition-colors">Membership</a>
            <a href="#" className="hover:text-[#1E1E1E] transition-colors">Disciplines</a>
            <a href="#" className="hover:text-[#1E1E1E] transition-colors">Press</a>
          </div>
          <div className="text-[10px] tracking-[0.4em] uppercase font-sans text-[#1E1E1E]/50">
            &copy; MMXXV &middot; One Federation &middot; One Sky
          </div>
        </div>
      </footer>
    </section>
  );
}

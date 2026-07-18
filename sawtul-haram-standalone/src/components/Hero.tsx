import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import IslamicPattern from './IslamicPattern';
import { ChevronDown } from 'lucide-react';
import logo from '@assets/Logo_transparent.png';

export default function Hero() {
  const { t, lang } = useLanguage();

  return (
    <section
      id="home"
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#F5F0E8]"
    >
      {/* Islamic geometric pattern background */}
      <IslamicPattern className="z-0 text-[#C9A84C]" opacity={0.07} />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(201,168,76,0.05) 100%)',
        }}
      />

      {/* Gold corner ornaments */}
      {[
        'top-24 left-8',
        'top-24 right-8',
        'bottom-20 left-8',
        'bottom-20 right-8',
      ].map((pos, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4 + i * 0.1 }}
          className={`absolute w-14 h-14 z-10 ${pos} ${
            i === 0 ? 'border-l-2 border-t-2' :
            i === 1 ? 'border-r-2 border-t-2' :
            i === 2 ? 'border-l-2 border-b-2' :
                      'border-r-2 border-b-2'
          } border-primary/40`}
        />
      ))}

      {/* Main centred content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Pulsing gold glow behind logo — no opacity animation on logo ancestor */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* breathing glow (underneath) */}
          <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.75, 0.45] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="absolute w-72 h-72 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.35), transparent 70%)',
              filter: 'blur(18px)',
            }}
          />

          {/* Shimmer sweep over the logo */}
          <div className="relative">
            {/* Logo — background pixels made truly transparent (via
                ImageMagick, see attached_assets/Logo_transparent.png)
                instead of relying on mix-blend-mode, which was unreliable
                here. Plain CSS animation, no Framer Motion on this node. */}
            <img
              src={logo}
              alt="صوت الحرم — Sawtul Haram"
              className="hero-logo w-52 md:w-72 lg:w-80 h-auto relative z-10 select-none"
              draggable={false}
            />

            {/* Shimmer overlay — slides across once on load */}
            <motion.div
              initial={{ x: '-120%', skewX: '-20deg' }}
              animate={{ x: '220%', skewX: '-20deg' }}
              transition={{ duration: 1.2, delay: 0.9, ease: 'easeInOut' }}
              className="absolute inset-0 z-20 pointer-events-none"
              style={{
                background:
                  'linear-gradient(105deg, transparent 35%, rgba(201,168,76,0.55) 50%, transparent 65%)',
              }}
            />
          </div>
        </div>

        {/* Gold separator — draws out from centre */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.7 } } }}
        >
          {[
            <motion.div key="l" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} transition={{ duration: 0.5 }} className="h-px w-20 bg-gradient-to-r from-transparent to-primary origin-right" />,
            <motion.div key="d" variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }} transition={{ duration: 0.4 }} className="w-2 h-2 rotate-45 bg-primary flex-shrink-0" />,
            <motion.div key="r" variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }} transition={{ duration: 0.5 }} className="h-px w-20 bg-gradient-to-l from-transparent to-primary origin-left" />,
          ]}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className={`text-base md:text-lg text-[#5A4A2E]/65 max-w-xl leading-relaxed ${lang === 'ar' ? 'font-arabic-secondary' : 'font-serif italic'}`}
        >
          {t(
            'أصوات الحرم المكي الشريف — تلاوات وذكر وعلم',
            'Voices of the Sacred Mosque — Recitations, Remembrance & Knowledge'
          )}
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#5A4A2E]/45"
      >
        <span className={`text-xs tracking-widest uppercase ${lang === 'ar' ? 'font-arabic-secondary' : 'font-serif'}`}>
          {t('اكتشف', 'Explore')}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

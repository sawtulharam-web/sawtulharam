import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import IslamicPattern from './IslamicPattern';
import ImamModal from './ImamModal';
import { SHEIKHS } from '../data/sheikhs';
import type { Sheikh } from '../data/sheikhs';

const CARD_W = 272;
const GAP = 24;
const STEP = CARD_W + GAP;

export default function Sheikhs() {
  const { t, lang } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Sheikh | null>(null);

  const scrollBy = (dir: 'prev' | 'next') => {
    scrollRef.current?.scrollBy({ left: dir === 'next' ? STEP * 2 : -STEP * 2, behavior: 'smooth' });
  };

  return (
    <>
      <section id="sheikhs" className="py-24 bg-[#F5F0E8] relative overflow-hidden">
        <IslamicPattern className="z-0 text-primary" opacity={0.05} />

        <div className="relative z-10">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-14 px-6"
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
              {t('أئمة الحرم المكي', 'Imams of the Haram')}
            </h2>
            <p className={`text-muted-foreground text-sm mb-6 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
              {t('اضغط على أي بطاقة لمزيد من التفاصيل', 'Tap any card for details')}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-primary" />
              <div className="w-3 h-3 rotate-45 bg-primary" />
              <div className="h-[1px] w-12 bg-primary" />
            </div>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <button
              onClick={() => scrollBy('prev')}
              aria-label="Previous imams"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <style>{`.sheikhs-scroll::-webkit-scrollbar{display:none}`}</style>
            <div
              ref={scrollRef}
              className="sheikhs-scroll flex gap-6 overflow-x-auto px-14 pb-6 scroll-smooth"
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {SHEIKHS.map((sheikh, index) => (
                <motion.button
                  key={sheikh.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => setSelected(sheikh)}
                  className="shrink-0 text-left cursor-pointer group focus:outline-none"
                  style={{ scrollSnapAlign: 'start' }}
                  aria-label={lang === 'ar' ? sheikh.nameAr : sheikh.nameEn}
                >
                  {/*
                    Shape: square, top-left + bottom-right curved (diagonal opposite),
                    top-right + bottom-left remain straight (0 radius).
                  */}
                  <div
                    className="w-[272px] h-[340px] bg-card border border-primary/20 flex flex-col items-center justify-center gap-5 p-6 overflow-hidden transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(201,168,76,0.20)] group-hover:-translate-y-1"
                    style={{ borderRadius: '2.5rem 0 2.5rem 0' }}
                  >
                    {/* Circle portrait */}
                    <div
                      className="w-44 h-44 rounded-full overflow-hidden shrink-0 transition-transform duration-500 group-hover:scale-105"
                      style={{
                        border: '2px solid rgba(201,168,76,0.35)',
                        boxShadow: '0 0 0 4px rgba(201,168,76,0.10)',
                      }}
                    >
                      <img
                        src={sheikh.image}
                        alt={lang === 'ar' ? sheikh.nameAr : sheikh.nameEn}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Name */}
                    <div className="text-center">
                      <h3 className="font-arabic text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                        {sheikh.nameAr}
                      </h3>
                      <p className="font-sans text-xs text-muted-foreground mt-1 tracking-wide">
                        {sheikh.nameEn}
                      </p>
                    </div>

                    {/* "More" hint */}
                    <p className="text-xs text-primary/50 font-sans group-hover:text-primary/80 transition-colors">
                      {t('اضغط للتفاصيل', 'Tap for details')}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => scrollBy('next')}
              aria-label="Next imams"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/80 border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-muted-foreground text-xs font-sans mt-2 md:hidden">
            {t('اسحب يميناً أو يساراً للتصفح', 'Swipe left or right to browse')}
          </p>
        </div>
      </section>

      {/* Imam detail modal */}
      <ImamModal sheikh={selected} onClose={() => setSelected(null)} />
    </>
  );
}

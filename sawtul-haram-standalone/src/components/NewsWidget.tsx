import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ChevronDown, X, Megaphone } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { NEWS_ITEMS } from '../data/newsData';
import IslamicPattern from './IslamicPattern';

export default function NewsWidget() {
  const { t, lang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(NEWS_ITEMS[0]?.id || null);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (NEWS_ITEMS.length === 0) return null;

  return (
    <div ref={widgetRef} className="fixed bottom-6 left-6 z-[100] flex flex-col items-start" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-[#F8F4EC]/95 backdrop-blur-md border border-primary/20 rounded-2xl shadow-2xl mb-4 w-[320px] sm:w-[360px] overflow-hidden relative origin-bottom-left"
          >
            <IslamicPattern opacity={0.08} className="text-primary z-0" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-primary/10 bg-primary/5">
                <div className="flex items-center gap-2 text-primary">
                  <Megaphone className="w-5 h-5" />
                  <h3 className={`font-semibold ${lang === 'ar' ? 'font-arabic-secondary text-lg' : 'font-serif'}`}>
                    {t('أحدث الأخبار', 'Latest Updates')}
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-foreground/60 hover:text-primary transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* News List */}
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
                {NEWS_ITEMS.map((news) => {
                  const isExpanded = expandedId === news.id;
                  
                  return (
                    <div key={news.id} className="mb-2 last:mb-0">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : news.id)}
                        className={`w-full text-start p-3 rounded-xl transition-all duration-300 flex flex-col gap-1 ${
                          isExpanded ? 'bg-primary/10 border-primary/20' : 'hover:bg-black/5 border-transparent'
                        } border`}
                      >
                        <div className="flex items-start justify-between w-full gap-3">
                          <h4 className={`font-medium leading-snug ${lang === 'ar' ? 'font-arabic-secondary text-base' : 'font-sans text-sm'} ${isExpanded ? 'text-primary' : 'text-foreground'}`}>
                            {lang === 'ar' ? news.titleAr : news.titleEn}
                          </h4>
                          <ChevronDown
                            className={`w-4 h-4 text-primary/60 shrink-0 transition-transform duration-300 mt-1 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-sans">
                          {new Date(news.date).toLocaleDateString(lang === 'ar' ? 'ar' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <p className={`p-3 pt-1 text-muted-foreground leading-relaxed ${lang === 'ar' ? 'font-arabic-secondary text-sm' : 'font-sans text-xs'}`}>
                              {lang === 'ar' ? news.contentAr : news.contentEn}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-card border border-primary/30 flex items-center justify-center text-primary shadow-[0_4px_20px_rgba(201,168,76,0.3)] hover:scale-105 hover:bg-primary hover:text-white transition-all duration-300 z-10 relative group"
        aria-label="Toggle News"
      >
        <Bell className="w-6 h-6 animate-pulse-slow group-hover:animate-none" />
        
        {/* Indicator dot */}
        {NEWS_ITEMS.length > 0 && !isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-card rounded-full" />
        )}
      </button>
    </div>
  );
}

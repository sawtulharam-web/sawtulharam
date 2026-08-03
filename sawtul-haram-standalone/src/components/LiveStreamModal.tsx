import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Radio } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface LiveStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  isPrayerTimeNow?: boolean;
}

export default function LiveStreamModal({ isOpen, onClose, isPrayerTimeNow }: LiveStreamModalProps) {
  const { t, lang } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-card border border-primary/40 rounded-2xl overflow-hidden shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="bg-card/95 border-b border-border px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                </span>
                <div>
                  <h3 className={`text-base md:text-lg font-bold flex items-center gap-2 ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                    {isPrayerTimeNow
                      ? t('البث المباشر للصلاة الآن — المسجد الحرام 🔴', 'Live Prayer Broadcast Now — Masjid al-Haram 🔴')
                      : t('البث المباشر للمسجد الحرام — مكة المكرمة', 'Masjid al-Haram 24/7 Live Stream — Makkah')}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t('قناة القرآن الكريم الفضائية المباشرة من الحرم المكي', 'Official 24/7 Live Stream from the Sacred Mosque')}
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container (16:9 Aspect Ratio) */}
            <div className="relative w-full pt-[56.25%] bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/wawzF8i5yAo?autoplay=1&rel=0"
                title="Makkah Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Footer Bar */}
            <div className="p-4 bg-muted/40 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-primary animate-pulse" />
                <span>{t('بث مستمر على مدار 24 ساعة للقرآن الكريم والصلوات', 'Continuous 24/7 broadcast of Holy Quran recitations and live prayers')}</span>
              </div>
              <a
                href="https://www.youtube.com/watch?v=wawzF8i5yAo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold"
              >
                <span>{t('فتح في يوتيوب', 'Open in YouTube')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

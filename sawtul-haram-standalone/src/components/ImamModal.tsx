import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import type { Sheikh } from '../data/sheikhs';

interface Props {
  sheikh: Sheikh | null;
  onClose: () => void;
}

export default function ImamModal({ sheikh, onClose }: Props) {
  const { t, lang } = useLanguage();

  return (
    <AnimatePresence>
      {sheikh && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal card */}
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[560px] z-[201] top-1/2 -translate-y-1/2 bg-[#F8F4EC] rounded-[2rem_0_2rem_0] overflow-hidden shadow-2xl border border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gold accent bar */}
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/10 hover:bg-primary/20 flex items-center justify-center text-foreground/60 hover:text-primary transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 flex flex-col items-center gap-5 text-center">
              {/* Portrait */}
              <div
                className="w-36 h-36 rounded-full overflow-hidden shrink-0"
                style={{
                  border: '2.5px solid rgba(201,168,76,0.5)',
                  boxShadow: '0 0 0 6px rgba(201,168,76,0.12)',
                }}
              >
                <img
                  src={sheikh.image}
                  alt={lang === 'ar' ? sheikh.nameAr : sheikh.nameEn}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Name */}
              <div>
                <h2 className="font-arabic text-2xl font-bold text-foreground mb-1">
                  {sheikh.nameAr}
                </h2>
                <p className="font-sans text-sm text-muted-foreground tracking-wide">
                  {sheikh.nameEn}
                </p>
              </div>

              {/* Gold separator */}
              <div className="flex items-center gap-3 w-full">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/40" />
                <div className="w-2 h-2 rotate-45 bg-primary/60 flex-shrink-0" />
                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/40" />
              </div>

              {/* Title badge */}
              <span className="inline-block px-4 py-1.5 border border-primary/30 rounded-full text-primary text-sm font-arabic bg-primary/5">
                {t(sheikh.titleAr, sheikh.titleEn)}
              </span>

              {/* Bio */}
              <p
                className={`text-foreground/75 leading-relaxed max-h-48 overflow-y-auto ${
                  lang === 'ar'
                    ? 'font-arabic text-base text-right'
                    : 'font-sans text-sm text-left'
                }`}
                dir={lang === 'ar' ? 'rtl' : 'ltr'}
              >
                {t(sheikh.bioAr, sheikh.bioEn)}
              </p>
            </div>

            {/* Bottom accent */}
            <div className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

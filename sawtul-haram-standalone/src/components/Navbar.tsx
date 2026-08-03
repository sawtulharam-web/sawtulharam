import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Globe, Menu, X, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/Logo_transparent.png';
import LiveStreamModal from './LiveStreamModal';

const NAV_LINKS = [
  { href: '#home',         ar: 'الرئيسية',         en: 'Home' },
  { href: '#sheikhs',      ar: 'المشايخ',           en: 'Sheikhs' },
  { href: '#schedule',     ar: 'الجدول الأسبوعي',   en: 'Schedule' },
  { href: '#videos',       ar: 'المرئيات',           en: 'Videos' },
  { href: '#prayer-times', ar: 'أوقات الصلاة',       en: 'Prayer Times' },
  { href: '#ayah',         ar: 'آية',               en: 'Verse' },
  { href: '#reminders',    ar: 'تذكير',              en: 'Reminders' },
  { href: '#gallery',      ar: 'المعرض',            en: 'Gallery' },
];

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md border-primary/20 shadow-sm py-2'
            : 'bg-[#F5F0E8]/80 backdrop-blur-sm border-primary/10 py-3'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="صوت الحرم"
              className="h-10 md:h-11 w-auto hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary text-foreground/75 relative group ${
                  lang === 'ar' ? 'font-arabic-secondary text-base' : 'font-sans'
                }`}
              >
                {t(link.ar, link.en)}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2.5">
            {/* Live Stream Button in Navbar */}
            <button
              onClick={() => setIsLiveModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition-all text-xs font-semibold shadow-sm hover:shadow gold-shimmer"
              title={t('مشاهدة البث المباشر للمسجد الحرام', 'Watch Makkah Live Stream')}
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-rose-600" />
              <span>{t('بث مباشر', 'Live Makkah')}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 text-foreground/75 hover:border-primary hover:bg-primary/5 transition-all text-xs md:text-sm font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-md text-foreground/70 hover:text-primary transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden bg-background/98 border-t border-primary/10"
            >
              <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`py-2.5 px-3 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/5 transition-colors ${
                      lang === 'ar' ? 'font-arabic-secondary text-lg text-right' : 'font-sans text-sm'
                    }`}
                  >
                    {t(link.ar, link.en)}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Live Stream Modal */}
      <LiveStreamModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
      />
    </>
  );
}

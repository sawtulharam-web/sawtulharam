import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@assets/Logo_transparent.png';

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

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-primary/20 shadow-sm py-2'
          : 'bg-[#F5F0E8]/80 backdrop-blur-sm border-primary/10 py-3'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="صوت الحرم"
            className="h-10 md:h-11 w-auto"
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary text-foreground/70 ${
                lang === 'ar' ? 'font-arabic text-base' : 'font-sans'
              }`}
            >
              {t(link.ar, link.en)}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-primary/30 text-foreground/70 hover:border-primary hover:bg-primary/5 transition-all text-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{lang === 'ar' ? 'EN' : 'عربي'}</span>
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
                    lang === 'ar' ? 'font-arabic text-lg text-right' : 'font-sans text-sm'
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
  );
}

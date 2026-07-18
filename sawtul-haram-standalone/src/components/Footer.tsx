import { useLanguage } from './LanguageContext';
import { FaYoutube, FaInstagram } from 'react-icons/fa';
import IslamicPattern from './IslamicPattern';
import logo from '@assets/Logo_transparent.png';

export default function Footer() {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F5F0E8] text-foreground relative border-t border-primary/20 pt-16 pb-8 overflow-hidden">
      <IslamicPattern opacity={0.04} className="text-primary" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="صوت الحرم"
          className="w-40 h-auto mb-6"
        />

        <p className={`text-foreground/60 mb-8 max-w-md text-center ${lang === 'ar' ? 'font-arabic-secondary text-lg' : 'font-sans text-sm'}`}>
          {t(
            'منصة إعلامية مخصصة لتلاوات وخطب المسجد الحرام المكي الشريف',
            'A media platform dedicated to recitations and sermons from the Sacred Mosque in Makkah'
          )}
        </p>

        <div className="flex gap-6 mb-12">
          <a
            href="https://www.youtube.com/@%D8%B5%D9%88%D8%AA_%D8%A7%D9%84%D8%AD%D8%B1%D9%85"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صوت الحرم على يوتيوب"
            className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            <FaYoutube className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/sawtul_haram/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="صوت الحرم على إنستغرام"
            className="w-12 h-12 rounded-full border border-primary/40 flex items-center justify-center text-primary/70 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
        </div>

        <div className="w-full flex items-center justify-center gap-4 mb-8 opacity-40">
          <div className="h-[1px] w-full max-w-[200px] bg-gradient-to-r from-transparent to-primary"></div>
          <div className="w-2 h-2 rotate-45 bg-primary"></div>
          <div className="h-[1px] w-full max-w-[200px] bg-gradient-to-l from-transparent to-primary"></div>
        </div>

        <div className="text-center text-foreground/40 text-sm flex flex-col gap-2">
          <p className="font-arabic-secondary">جميع الحقوق محفوظة © {currentYear} صوت الحرم</p>
          <p className="font-sans">All rights reserved © {currentYear} Sawtul Haram</p>
        </div>
      </div>
    </footer>
  );
}

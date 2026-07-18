import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import IslamicPattern from './IslamicPattern';
import { weeklySchedule } from '../data/schedule';
import { SHEIKH_MAP } from '../data/sheikhs';
import { CalendarDays, Sunrise, Sun, CloudSun, Sunset, Moon } from 'lucide-react';

// Minimal line icons per prayer — no colored emoji, keeps the monochrome feel
const PRAYER_ICONS: Record<string, typeof Sun> = {
  Fajr: Sunrise,
  Dhuhr: Sun,
  Asr: CloudSun,
  Maghrib: Sunset,
  Isha: Moon,
};

export default function ImamSchedule() {
  const { t, lang } = useLanguage();

  return (
    <section id="schedule" className="py-24 bg-[#f3efe6] relative overflow-hidden">
      <IslamicPattern opacity={0.04} className="text-primary" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${lang === 'ar' ? 'font-arabic-secondary' : 'font-serif'}`}>
            {t('الجدول الأسبوعي للأئمة', 'Weekly Imam Schedule')}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="h-[1px] w-12 bg-primary" />
            <div className="w-3 h-3 rotate-45 bg-primary" />
            <div className="h-[1px] w-12 bg-primary" />
          </div>

          {/* Period badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-card border border-primary/25 rounded-full shadow-sm">
            <CalendarDays className="w-4 h-4 text-primary" />
            <span className={`text-sm text-foreground/75 ${lang === 'ar' ? 'font-arabic-secondary text-base' : 'font-sans'}`}>
              {t(weeklySchedule.periodAr, weeklySchedule.periodEn)}
            </span>
          </div>
        </motion.div>

        {/* Schedule cards */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {weeklySchedule.prayers.map((slot, index) => {
            const imam = SHEIKH_MAP[slot.imamKey];
            const backup = SHEIKH_MAP[slot.backupKey];
            if (!imam || !backup) return null;
            const PrayerIcon = PRAYER_ICONS[slot.prayerEn] ?? Sun;

            return (
              <motion.div
                key={slot.prayerEn}
                initial={{ opacity: 0, x: lang === 'ar' ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-primary/15 rounded-[1.5rem_0_1.5rem_0] overflow-hidden shadow-sm hover:shadow-[0_4px_20px_rgba(201,168,76,0.12)] transition-shadow"
              >
                <div className="flex items-stretch">
                  {/* Prayer label sidebar */}
                  <div className="w-20 md:w-24 bg-primary/90 flex flex-col items-center justify-center text-white py-4 px-2 shrink-0">
                    <PrayerIcon className="w-5 h-5 mb-1 opacity-90" strokeWidth={1.75} />
                    <span className="font-arabic-secondary text-base font-bold leading-tight text-center">
                      {slot.prayerAr}
                    </span>
                    <span className="font-sans text-[10px] opacity-80 mt-0.5 tracking-wide">
                      {slot.prayerEn}
                    </span>
                  </div>

                  {/* Imam info */}
                  <div className="flex-1 flex flex-col md:flex-row items-start md:items-center gap-4 p-4 md:p-5">
                    {/* Main imam */}
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className="w-14 h-14 rounded-full overflow-hidden shrink-0"
                        style={{
                          border: '2px solid rgba(201,168,76,0.4)',
                          boxShadow: '0 0 0 3px rgba(201,168,76,0.10)',
                        }}
                      >
                        <img
                          src={imam.image}
                          alt={lang === 'ar' ? imam.nameAr : imam.nameEn}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-primary font-sans uppercase tracking-widest mb-0.5">
                          {t('الإمام', 'Imam')}
                        </p>
                        <p className="font-arabic-secondary text-sm font-semibold text-foreground leading-snug">
                          {imam.nameAr}
                        </p>
                        <p className="font-sans text-[11px] text-muted-foreground mt-0.5">
                          {imam.nameEn}
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block h-12 w-px bg-primary/15" />
                    <div className="block md:hidden w-full h-px bg-primary/15" />

                    {/* Backup imam */}
                    <div className="flex items-center gap-3 flex-1 opacity-70">
                      <div
                        className="w-12 h-12 rounded-full overflow-hidden shrink-0"
                        style={{ border: '1.5px solid rgba(201,168,76,0.25)' }}
                      >
                        <img
                          src={backup.image}
                          alt={lang === 'ar' ? backup.nameAr : backup.nameEn}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground font-sans uppercase tracking-widest mb-0.5">
                          {t('الاحتياطي', 'Backup')}
                        </p>
                        <p className="font-arabic-secondary text-sm text-foreground leading-snug">
                          {backup.nameAr}
                        </p>
                        <p className="font-sans text-[11px] text-muted-foreground mt-0.5">
                          {backup.nameEn}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Update note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-muted-foreground text-xs mt-8 font-sans"
        >
          {t('يُحدَّث الجدول أسبوعياً وفق الجدول الرسمي للمسجد الحرام', 'Schedule updated weekly per the official Masjid al-Haram timetable')}
        </motion.p>
      </div>
    </section>
  );
}

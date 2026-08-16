import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Clock, Radio, Play, Sparkles, Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';
import IslamicPattern from './IslamicPattern';
import LiveStreamModal from './LiveStreamModal';

export default function PrayerTimes() {
  const { t, lang } = useLanguage();
  const [makkahTimeStr, setMakkahTimeStr] = useState<string>('');
  const [countdownStr, setCountdownStr] = useState<string>('');
  const [isLiveModalOpen, setIsLiveModalOpen] = useState<boolean>(false);
  const [isPrayerTimeNow, setIsPrayerTimeNow] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['prayer-times'],
    queryFn: async () => {
      const res = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Makkah&country=SA&method=4');
      if (!res.ok) throw new Error(`Aladhan API error: ${res.status}`);
      const json = await res.json();
      if (json.code !== 200 || !json.data?.timings) throw new Error('Unexpected Aladhan response shape');
      return json;
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const prayers = [
    { id: 'Fajr', ar: 'الفجر', en: 'Fajr', icon: Moon },
    { id: 'Dhuhr', ar: 'الظهر', en: 'Dhuhr', icon: Sun },
    { id: 'Asr', ar: 'العصر', en: 'Asr', icon: Sun },
    { id: 'Maghrib', ar: 'المغرب', en: 'Maghrib', icon: Moon },
    { id: 'Isha', ar: 'العشاء', en: 'Isha', icon: Moon },
  ];

  // Live Makkah Clock & Countdown Logic
  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // Current Makkah Time (Asia/Riyadh = UTC+3)
      const makkahParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Riyadh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).formatToParts(now);

      const h = makkahParts.find((p) => p.type === 'hour')?.value ?? '00';
      const m = makkahParts.find((p) => p.type === 'minute')?.value ?? '00';
      const s = makkahParts.find((p) => p.type === 'second')?.value ?? '00';
      const dayPeriod = makkahParts.find((p) => p.type === 'dayPeriod')?.value ?? '';

      setMakkahTimeStr(`${h}:${m}:${s} ${dayPeriod}`);

      // Calculate countdown to next prayer if timings loaded
      if (data?.data?.timings) {
        const timings = data.data.timings;
        // Get current Makkah date string
        const makkahDateStr = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Riyadh',
        }).format(now);

        let targetPrayerName = 'Fajr';
        let targetTimeMs = 0;
        let isPrayerActive = false;

        for (const prayer of prayers) {
          const rawTime = (timings[prayer.id] ?? '').split(' ')[0]; // "04:32"
          if (!rawTime) continue;

          const [pHour, pMin] = rawTime.split(':').map(Number);
          const prayerDate = new Date(`${makkahDateStr}T${pHour.toString().padStart(2, '0')}:${pMin.toString().padStart(2, '0')}:00+03:00`);
          const prayerMs = prayerDate.getTime();
          const currentMs = now.getTime();

          // Prayer Window: 5 mins before adhan to 30 mins after adhan
          const windowStart = prayerMs - 5 * 60 * 1000;
          const windowEnd = prayerMs + 30 * 60 * 1000;

          if (currentMs >= windowStart && currentMs <= windowEnd) {
            isPrayerActive = true;
          }

          if (currentMs < prayerMs) {
            targetPrayerName = prayer.ar;
            targetTimeMs = prayerMs;
            break;
          }
        }

        setIsPrayerTimeNow(isPrayerActive);

        // If all prayers today have passed, target next day's Fajr
        if (targetTimeMs === 0) {
          const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
          const tomorrowStr = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh' }).format(tomorrow);
          const rawFajr = (timings['Fajr'] ?? '04:30').split(' ')[0];
          const [fH, fM] = rawFajr.split(':').map(Number);
          const fajrDate = new Date(`${tomorrowStr}T${fH.toString().padStart(2, '0')}:${fM.toString().padStart(2, '0')}:00+03:00`);
          targetTimeMs = fajrDate.getTime();
          targetPrayerName = 'الفجر';
        }

        const diffMs = Math.max(0, targetTimeMs - now.getTime());
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

        setCountdownStr(
          `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        );
      }
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [data]);

  const getNextPrayerId = () => {
    if (!data?.data?.timings) return null;
    const makkahParts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Riyadh',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const h = makkahParts.find((p) => p.type === 'hour')?.value ?? '00';
    const m = makkahParts.find((p) => p.type === 'minute')?.value ?? '00';
    const currentTime = `${h}:${m}`;

    for (const prayer of prayers) {
      const prayerTime = (data.data.timings[prayer.id] ?? '').split(' ')[0];
      if (currentTime < prayerTime) return prayer.id;
    }
    return 'Fajr';
  };

  const nextPrayerId = getNextPrayerId();

  return (
    <section id="prayer-times" className="py-24 bg-background relative overflow-hidden">
      {/* Floating Islamic Arabesque Geometry Watermark */}
      <IslamicPattern opacity={0.13} animate={true} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            {t('الميقات الزمني الشريف', 'Sacred Timing in Makkah')}
          </span>
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${
              lang === 'ar' ? 'font-arabic-secondary' : 'font-serif'
            }`}
          >
            {t('أوقات الصلاة في مكة المكرمة', 'Prayer Times in Makkah')}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-primary/40" />
            <div className="w-2.5 h-2.5 rotate-45 bg-primary" />
            <div className="h-[1px] w-12 bg-primary/40" />
          </div>

          {/* Hijri & Gregorian Date */}
          {data?.data?.date && (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <p className="font-arabic-secondary text-lg md:text-xl text-primary font-semibold">
                {data.data.date.hijri.day} {data.data.date.hijri.month.ar} {data.data.date.hijri.year} هـ
              </p>
              <p className="font-sans text-xs md:text-sm">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            </div>
          )}
        </motion.div>

        {/* Live Makkah Clock & Prayer Countdown Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-10 p-6 rounded-2xl bg-card border border-primary/30 shadow-xl relative overflow-hidden gold-shimmer"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
            {/* Live Clock Makkah */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <Clock className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">
                  {t('توقيت مكة المكرمة الحالي', 'Current Makkah Local Time')}
                </p>
                <p className="text-2xl font-bold tracking-wider font-mono text-foreground">
                  {makkahTimeStr || '--:--:--'}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-10 w-[1px] bg-border" />

            {/* Countdown to Next Prayer */}
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                {t('الوقت المتبقي للصلاة القادمة', 'Time Remaining for Next Prayer')}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-bold font-mono text-2xl">
                <Sparkles className="w-4 h-4 text-primary animate-spin" />
                <span>{countdownStr || '00:00:00'}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-10 w-[1px] bg-border" />

            {/* Live Stream Button Trigger */}
            <button
              onClick={() => setIsLiveModalOpen(true)}
              className={`px-5 py-3 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md ${
                isPrayerTimeNow
                  ? 'bg-rose-600 text-white hover:bg-rose-700 animate-pulse border border-rose-400'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 border border-primary/30'
              }`}
            >
              <Radio className="w-4 h-4 animate-ping" />
              <span>
                {isPrayerTimeNow
                  ? t('🔴 البث المباشر للصلاة الآن', '🔴 Live Prayer Broadcast Now')
                  : t('مشاهدة البث المباشر للمسجد الحرام', 'Watch Makkah 24/7 Live Stream')}
              </span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </motion.div>

        {/* 5 Daily Prayer Cards */}
        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col md:flex-row gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 h-32 bg-card/50 animate-pulse rounded-xl border border-border" />
              ))}
            </div>
          ) : isError ? (
            <p className="text-center text-muted-foreground py-8 font-arabic-secondary">
              {t('تعذّر تحميل أوقات الصلاة. يرجى المحاولة مجدداً.', 'Unable to load prayer times. Please try again later.')}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {prayers.map((prayer, index) => {
                const rawTime: string = data?.data?.timings[prayer.id] ?? '';
                const time = rawTime.split(' ')[0];
                const isNext = prayer.id === nextPrayerId;

                let timeEn = time;
                if (timeEn) {
                  const [h, m] = timeEn.split(':');
                  const hour = parseInt(h);
                  const ampm = hour >= 12 ? 'PM' : 'AM';
                  const hour12 = hour % 12 || 12;
                  timeEn = `${hour12}:${m} ${ampm}`;
                }

                return (
                  <motion.div
                    key={prayer.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`p-5 rounded-2xl border transition-all duration-500 flex flex-row md:flex-col items-center justify-between md:justify-center text-center ${
                      isNext
                        ? 'bg-primary text-primary-foreground border-primary shadow-xl scale-105 gold-shimmer'
                        : 'bg-card border-border/60 hover:border-primary/50 text-foreground gold-border-glow'
                    }`}
                  >
                    <div className="flex items-center gap-2 md:flex-col md:gap-1.5 mb-0 md:mb-3">
                      <prayer.icon className={`w-5 h-5 ${isNext ? 'text-white' : 'text-primary'}`} />
                      <h3 className={`text-base md:text-lg font-bold ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                        {t(prayer.ar, prayer.en)}
                      </h3>
                    </div>

                    <div className={`text-xl md:text-2xl font-bold tracking-wider ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                      {lang === 'ar' ? time : timeEn}
                    </div>

                    {isNext && (
                      <span className="mt-2 text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/20 text-white hidden md:inline-block">
                        {t('الصلاة القادمة', 'Next Prayer')}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Embedded Live Stream Video Modal */}
      <LiveStreamModal
        isOpen={isLiveModalOpen}
        onClose={() => setIsLiveModalOpen(false)}
        isPrayerTimeNow={isPrayerTimeNow}
      />
    </section>
  );
}

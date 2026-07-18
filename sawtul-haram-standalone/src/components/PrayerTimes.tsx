import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function PrayerTimes() {
  const { t, lang } = useLanguage();

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
    { id: 'Fajr', ar: 'الفجر', en: 'Fajr' },
    { id: 'Dhuhr', ar: 'الظهر', en: 'Dhuhr' },
    { id: 'Asr', ar: 'العصر', en: 'Asr' },
    { id: 'Maghrib', ar: 'المغرب', en: 'Maghrib' },
    { id: 'Isha', ar: 'العشاء', en: 'Isha' }
  ];

  // Use Makkah timezone (Asia/Riyadh = UTC+3) so the "next prayer" highlight
  // is correct regardless of where the viewer's browser is located.
  const getMakkahTime = () => {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Riyadh',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(new Date());
    const h = parts.find(p => p.type === 'hour')?.value ?? '00';
    const m = parts.find(p => p.type === 'minute')?.value ?? '00';
    return `${h}:${m}`;
  };

  const getNextPrayer = (timings: Record<string, string>) => {
    if (!timings) return null;
    const currentTime = getMakkahTime();
    for (const prayer of prayers) {
      // Aladhan times include seconds " (01)" suffix — strip to HH:mm for comparison
      const prayerTime = (timings[prayer.id] ?? '').split(' ')[0];
      if (currentTime < prayerTime) {
        return prayer.id;
      }
    }
    return 'Fajr'; // After Isha → next is Fajr
  };

  const nextPrayerId = data?.data?.timings ? getNextPrayer(data.data.timings) : null;

  return (
    <section id="prayer-times" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${lang === 'ar' ? 'font-arabic-secondary' : 'font-serif'}`}>
            {t('أوقات الصلاة في مكة المكرمة', 'Prayer Times in Makkah')}
          </h2>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-primary"></div>
            <Clock className="w-5 h-5 text-primary" />
            <div className="h-[1px] w-12 bg-primary"></div>
          </div>
          
          {data?.data?.date && (
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <p className="font-arabic-secondary text-xl">{data.data.date.hijri.day} {data.data.date.hijri.month.ar} {data.data.date.hijri.year}</p>
              <p className="font-sans text-sm">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
            </div>
          )}
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col md:flex-row gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 h-32 bg-muted/50 animate-pulse rounded-lg border border-border" />
              ))}
            </div>
          ) : isError ? (
            <p className="text-center text-muted-foreground py-8 font-arabic-secondary">
              {t('تعذّر تحميل أوقات الصلاة. يرجى المحاولة مجدداً.', 'Unable to load prayer times. Please try again later.')}
            </p>
          ) : (
            <div className="flex flex-col md:flex-row gap-4">
              {prayers.map((prayer, index) => {
                // Aladhan may append " (01)" suffix — strip to HH:mm
                const rawTime: string = data?.data?.timings[prayer.id] ?? '';
                const time = rawTime.split(' ')[0]; // "04:32"
                const isNext = prayer.id === nextPrayerId;
                
                // Convert 24h to 12h for English
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
                    className={`flex-1 flex flex-row md:flex-col items-center justify-between md:justify-center p-6 rounded-lg border transition-all duration-500 ${
                      isNext 
                        ? 'bg-primary border-primary text-primary-foreground shadow-lg transform md:-translate-y-2' 
                        : 'bg-card border-border hover:border-primary/50 text-foreground'
                    }`}
                  >
                      <h3 className={`text-xl font-medium md:mb-4 ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                        {t(prayer.ar, prayer.en)}
                    </h3>
                    <div className={`text-2xl font-bold tracking-wider ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                      {lang === 'ar' ? time : timeEn}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

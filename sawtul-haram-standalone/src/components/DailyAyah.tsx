import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { RefreshCw } from 'lucide-react';
import IslamicPattern from './IslamicPattern';
import { DAILY_AYAHS } from '../data/dailyAyahs';

// Quran.com v4 API — translation 131 = Saheeh International (English)
function getTodayAyah() {
  const start = new Date(2026, 0, 1);
  const today = new Date();

  const difference =
    Math.floor(
      (today.getTime() - start.getTime()) /
      (1000 * 60 * 60 * 24)
    );

  return DAILY_AYAHS[
    difference % DAILY_AYAHS.length
  ];
}

const CACHE_KEY = "daily-ayah-cache";


function getCachedAyah() {
  const cached = localStorage.getItem(CACHE_KEY);

  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);

    if (parsed.date === new Date().toDateString()) {
      return parsed.data;
    }

    return null;

  } catch {
    return null;
  }
}


function saveCachedAyah(data: any) {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      date: new Date().toDateString(),
      data,
    })
  );
}

async function fetchDailyAyah() {

  const cached = getCachedAyah();

if (cached) {
  return cached;
}

  const reference = getTodayAyah();

  const response = await fetch(
    `https://api.quran.com/api/v4/verses/by_key/${reference.surah}:${reference.ayah}?language=en&fields=text_uthmani&translations=131`
  );


  if (!response.ok)
    throw new Error("Quran API error");


  const data = await response.json();

  const verse = data.verse;
  alert(JSON.stringify(data, null, 2));

  console.log("FULL RESPONSE:", data);
  console.log("VERSE:", verse);

  const translation =
    verse.translations?.[0]?.text
      ?.replace(/<[^>]*>/g, '')
      .trim();


  const chapterResponse = await fetch(
    `https://api.quran.com/api/v4/chapters/${reference.surah}?language=en`
  );


  const chapterData =
    await chapterResponse.json();


  const result = {
  arabic: verse.text_uthmani,
  translation,
  verseNumber: reference.ayah,
  chapterArabic: chapterData.chapter.name_arabic,
  chapterEnglish: chapterData.chapter.name_simple,
  chapterId: reference.surah
};


saveCachedAyah(result);


return result;
}

export default function DailyAyah() {
  const { t, lang } = useLanguage();
  const [fetchKey, setFetchKey] = useState(0);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['daily-ayah', fetchKey],
    queryFn: fetchDailyAyah,
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: Infinity,
  });

  useEffect(() => {

  const now = new Date();

  const midnight = new Date();

  midnight.setHours(24, 0, 0, 0);


  const timeUntilMidnight =
    midnight.getTime() - now.getTime();


  const timer = setTimeout(() => {
    localStorage.removeItem("daily-ayah-cache");
    setFetchKey((key) => key + 1);

  }, timeUntilMidnight);


  return () => clearTimeout(timer);

}, []);

  return (
    <section id="ayah" className="py-24 bg-[#2D2016] text-[#F9F5ED] relative border-y border-primary/20 overflow-hidden">
      <IslamicPattern opacity={0.08} className="text-primary" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Heading */}
          <div className="flex items-center justify-between mb-12">
            <div className="w-1/3 h-[1px] bg-gradient-to-r from-transparent to-primary/50" />
            <h2 className={`text-2xl md:text-3xl font-medium text-primary ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
              {t('آية من كتاب الله', 'A Verse from the Quran')}
            </h2>
            <div className="w-1/3 h-[1px] bg-gradient-to-l from-transparent to-primary/50" />
          </div>

          {isFetching && !data ? (
            <div className="py-20 flex flex-col items-center justify-center opacity-50">
              <RefreshCw className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="font-arabic text-xl text-primary/80">جاري التحميل...</p>
            </div>
          ) : isError ? (
            <div className="py-16 text-center">
              <p className="font-arabic text-xl text-primary/80 mb-4">
                {t('تعذّر تحميل الآية. يرجى المحاولة مجدداً.', 'Unable to load verse. Please try again.')}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>{t('حاول مجدداً', 'Try Again')}</span>
              </button>
            </div>
          ) : data ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <span className="absolute -top-10 -right-4 text-8xl text-primary/10 font-arabic select-none">❝</span>
              <span className="absolute -bottom-10 -left-4 text-8xl text-primary/10 font-arabic select-none">❞</span>

              {/* Arabic text — Uthmani script from Quran.com */}
              <p
                className="text-3xl md:text-4xl lg:text-5xl leading-[1.9] font-arabic mb-8 text-center"
                dir="rtl"
                style={{ fontFamily: "'Amiri', serif" }}
              >
                {data.arabic}
              </p>

              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="h-[1px] w-8 bg-primary/30" />
                <div className="w-2 h-2 rotate-45 bg-primary/50" />
                <div className="h-[1px] w-8 bg-primary/30" />
              </div>

              {/* English translation - always displayed */}
              <div className="mt-8 mb-8">

                <p className="text-primary/80 text-sm mb-3 font-sans">
                  English Translation
                </p>

                <p
                  className="text-lg md:text-xl font-serif italic text-white/80 leading-relaxed text-center"
                  dir="ltr"
                >
                  "{data.translation}"
                </p>

              </div>

              {/* Reference */}
              <div className="flex flex-col items-center gap-5">

                <div className="inline-block border border-primary/30 rounded-full px-6 py-2 bg-black/20 backdrop-blur-sm">
                  <p className="text-primary/90 font-arabic text-lg" dir="rtl">
                    سورة {data.chapterArabic} ﴿{data.verseNumber}﴾
                  </p>

                  <p className="text-white/60 font-sans text-sm mt-1" dir="ltr">
                    Surah {data.chapterEnglish} ({data.chapterId}:{data.verseNumber})
                  </p>
                </div>


                {/* Authentic Tafsir link */}
                <a
                  href={`https://quran.com/${data.chapterId}/${data.verseNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <span>
                    📖
                  </span>

                  <span className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>
                    {t('اقرأ تفسير الآية', 'Read Authentic Tafsir')}
                  </span>
                </a>

              </div>
            </motion.div>
          ) : null}

        </motion.div>
      </div>
    </section>
  );
}

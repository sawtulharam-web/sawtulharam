import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { RefreshCw } from 'lucide-react';
import IslamicPattern from './IslamicPattern';

// Quran.com v4 API — translation 131 = Saheeh International (English)
const TOTAL_VERSES = 6236;

async function fetchRandomAyah() {
  const randomId = Math.floor(Math.random() * TOTAL_VERSES) + 1;

  // Fetch verse with Arabic (Uthmani script) + translation in parallel
  const [verseRes, _] = await Promise.all([
    fetch(
      `https://api.quran.com/api/v4/verses/by_id/${randomId}?language=en&fields=text_uthmani,chapter_id,verse_number&translations=131`
    ),
    Promise.resolve(null),
  ]);

  if (!verseRes.ok) throw new Error(`Quran.com API error: ${verseRes.status}`);
  const verseData = await verseRes.json();
  const verse = verseData?.verse;
  if (!verse?.text_uthmani) throw new Error('Unexpected verse response');

  // Fetch chapter name
  const chapterRes = await fetch(
    `https://api.quran.com/api/v4/chapters/${verse.chapter_id}?language=en`
  );
  if (!chapterRes.ok) throw new Error(`Chapter API error: ${chapterRes.status}`);
  const chapterData = await chapterRes.json();
  const chapter = chapterData?.chapter;

  // Strip HTML tags from translation
  const rawTranslation: string = verse.translations?.[0]?.text ?? '';
  const translation = rawTranslation.replace(/<[^>]*>/g, '').trim();

  return {
    arabic: verse.text_uthmani as string,
    translation,
    verseNumber: verse.verse_number as number,
    chapterArabic: (chapter?.name_arabic ?? '') as string,
    chapterEnglish: (chapter?.name_simple ?? '') as string,
    chapterId: verse.chapter_id as number,
  };
}

export default function DailyAyah() {
  const { t, lang } = useLanguage();
  const [fetchKey, setFetchKey] = useState(0);

  const { data, isFetching, isError } = useQuery({
    queryKey: ['random-ayah-quran-com', fetchKey],
    queryFn: fetchRandomAyah,
    refetchOnWindowFocus: false,
    retry: 2,
    staleTime: Infinity,
  });

  const reload = useCallback(() => setFetchKey((k) => k + 1), []);

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

          {isFetching ? (
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
                onClick={reload}
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span className={lang === 'ar' ? 'font-arabic' : 'font-sans'}>{t('حاول مجدداً', 'Try Again')}</span>
              </button>
            </div>
          ) : data ? (
            <motion.div
              key={fetchKey}
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

              {/* English translation */}
              <p
                className="text-lg md:text-xl font-serif italic text-white/80 leading-relaxed text-center mb-8"
                dir="ltr"
              >
                "{data.translation}"
              </p>

              {/* Reference */}
              <div className="inline-block border border-primary/30 rounded-full px-6 py-2 bg-black/20 backdrop-blur-sm mb-8">
                <p className="text-primary/90 font-arabic text-lg" dir="rtl">
                  سورة {data.chapterArabic} ﴿{data.verseNumber}﴾
                </p>
                <p className="text-white/60 font-sans text-sm mt-1" dir="ltr">
                  Surah {data.chapterEnglish} ({data.chapterId}:{data.verseNumber})
                </p>
              </div>
            </motion.div>
          ) : null}

          {/* Reload button */}
          <div className="mt-8">
            <button
              onClick={reload}
              disabled={isFetching}
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin' : ''}`} />
              <span className={`font-medium ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                {t('آية أخرى', 'Load Another Verse')}
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

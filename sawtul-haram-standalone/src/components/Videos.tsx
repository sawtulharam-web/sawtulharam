import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Play } from 'lucide-react';
import IslamicPattern from './IslamicPattern';

// ─── VIDEOS ───────────────────────────────────────────────────────────────────
// To add / change a video: update the `id` (YouTube video ID) and titles here.
// Yasser, Maher, Sudais appear first as requested.
const videos = [
  {
    id: 'mJxym6O2RKQ',
    titleAr: 'منبر الحرم في أيام مباركة | تذكير بالإخلاص والتوبة والعمل الصالح',
    titleEn: 'Reminder on Sincerity, Repentance & Righteous Deeds',
    sheikhAr: 'الشيخ ياسر الدوسري',
    sheikhEn: 'Sheikh Yasser Al-Dossary',
  },
  {
    id: 'gGJFsEtqWok',
    titleAr: 'فضل يوم عرفة والتوحيد في الدعاء | كلمات مؤثرة',
    titleEn: "Virtue of the Day of Arafah & Sincerity in Du'a",
    sheikhAr: 'الشيخ ماهر المعيقلي',
    sheikhEn: 'Sheikh Maher Al-Muaiqly',
  },
  {
    id: '6RWxAHdcXOw',
    titleAr: '﴿وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ﴾ | سورة البقرة ١٩٦–١٩٧',
    titleEn: 'Al-Baqarah 196–197: Complete Hajj & Umrah for Allah',
    sheikhAr: 'الشيخ عبدالرحمن السديس',
    sheikhEn: 'Sheikh Abdulrahman Al-Sudais',
  },
  {
    id: 'ODf7TIDvL9Y',
    titleAr: 'خواتيم سورة النساء | جمال لا يوصف',
    titleEn: 'The Closing Verses of Surah An-Nisa — Indescribable Beauty',
    sheikhAr: 'الشيخ السديس والشيخ الشمسان',
    sheikhEn: 'Sheikh Al-Sudais & Sheikh Al-Shamsan',
  },
  {
    id: 'ud1YAPyHpOI',
    titleAr: 'خاتمة جميلة لسورة آل عمران | رمضان ١٤٤٥',
    titleEn: 'A Beautiful Conclusion of Surah Aal-Imran | Ramadan 1445',
    sheikhAr: 'الشيخ بندر بليلة',
    sheikhEn: 'Sheikh Bandar Baleelah',
  },
  {
    id: 'HaDwlnMjq4A',
    titleAr: 'بداية سورة الفرقان ونهايتها | في فجريات',
    titleEn: 'Opening and Closing of Surah Al-Furqan | Fajr Recitations',
    sheikhAr: 'الشيخ الوليد الشمسان',
    sheikhEn: 'Sheikh Al-Waleed Al-Shamsan',
  },
  {
    id: '5_0vb7-i6-o',
    titleAr: 'من أعظم بقاع الأرض | المسجد الحرام من سورة البقرة وآل عمران',
    titleEn: 'From the Greatest Places on Earth | Al-Baqarah & Aal-Imran at Masjid al-Haram',
    sheikhAr: 'الشيخ الوليد الشمسان',
    sheikhEn: 'Sheikh Al-Waleed Al-Shamsan',
  },
];

export default function Videos() {
  const { t, lang } = useLanguage();

  return (
    <section id="videos" className="py-24 bg-[#f3efe6] relative border-y border-border">
      <IslamicPattern opacity={0.03} />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${lang === 'ar' ? 'font-arabic-secondary' : 'font-serif'}`}>
            {t('مقاطع الفيديو', 'Video Gallery')}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <div className="w-3 h-3 rotate-45 bg-primary" />
            <div className="h-[1px] w-12 bg-primary" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <motion.a
              key={video.id}
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group block relative rounded-lg overflow-hidden border border-border shadow-sm bg-card hover:shadow-[0_6px_24px_rgba(201,168,76,0.15)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                  alt={t(video.titleAr, video.titleEn)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!img.src.includes('hqdefault')) {
                      img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center text-white transform scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-primary/15 flex flex-col gap-1">
                <h3 className={`text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 ${lang === 'ar' ? 'font-arabic-secondary text-base' : 'font-sans'}`}>
                  {t(video.titleAr, video.titleEn)}
                </h3>
                <p className={`text-xs text-muted-foreground ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                  {t(video.sheikhAr, video.sheikhEn)}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

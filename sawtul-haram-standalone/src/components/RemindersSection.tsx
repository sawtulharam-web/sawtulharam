import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import IslamicPattern from './IslamicPattern';
import { REMINDER_POSTS } from '../data/reminders';
import logo from '@assets/Logo_transparent.png';

export default function RemindersSection() {
  const { t, lang } = useLanguage();

  return (
    <section id="reminders" className="py-24 bg-background relative overflow-hidden">
      <IslamicPattern opacity={0.04} className="text-primary" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
            {t('تذكير', 'Reminders')}
          </h2>
          <p className={`text-muted-foreground mb-6 ${lang === 'ar' ? 'font-arabic text-base' : 'font-sans text-sm'}`}>
            {t('كلمات وتذكيرات من أئمة الحرم المكي الشريف', "Words and reminders from the imams of Masjid al-Haram")}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <div className="w-3 h-3 rotate-45 bg-primary" />
            <div className="h-[1px] w-12 bg-primary" />
          </div>
        </motion.div>

        {/* Reminder post cards — styled after the channel's Instagram highlight posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          {REMINDER_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="flex flex-col bg-[#FBF8F2] rounded-[1.5rem_0_1.5rem_0] overflow-hidden border border-primary/15 shadow-sm hover:shadow-[0_8px_28px_rgba(201,168,76,0.15)] transition-shadow"
            >
              {/* Gold ornamental top border */}
              <div
                className="h-3 w-full shrink-0"
                style={{
                  background:
                    'repeating-linear-gradient(135deg, #C9A84C 0 6px, #ddc27a 6px 12px)',
                }}
              />

              <div className="flex flex-col items-center text-center px-6 pt-6 pb-5 flex-1">
                {/* Channel mark */}
                <div className="flex items-center gap-2 self-start mb-6">
                  <img src={logo} alt="" className="w-8 h-8" draggable={false} />
                  <div className="text-left rtl:text-right">
                    <p className="font-arabic text-[11px] font-bold text-foreground leading-none">صَوْتُ الحَرَمِ</p>
                    <p className="font-arabic text-[9px] text-muted-foreground mt-0.5 leading-none">تلاوات أئمّة الحرمَين الشَّريفَين</p>
                  </div>
                </div>

                {/* Calligraphic heading */}
                <p className="font-arabic text-3xl text-primary mb-6" style={{ fontFamily: "'Amiri', serif" }}>
                  {post.titleAr}
                </p>

                {/* Arabic hadith text */}
                <p dir="rtl" className="font-arabic text-lg leading-[1.9] text-foreground mb-6">
                  {post.arabicText}
                </p>

                {/* English translation */}
                <p dir="ltr" className="font-serif italic text-sm text-foreground/70 leading-relaxed mb-5">
                  "{post.englishText}"
                </p>

                {/* Source */}
                <p className="font-sans text-[11px] text-muted-foreground mb-6">[{post.source}]</p>

                {/* Instagram handle */}
                <div className="flex items-center gap-1.5 border-t border-primary/15 pt-4 w-full justify-center">
                  <FaInstagram className="w-3.5 h-3.5 text-primary/70" />
                  <span className="font-sans text-xs text-foreground/70">sawtul_haram</span>
                </div>
              </div>

              {/* Photo footer strip */}
              <div className="h-20 w-full shrink-0 overflow-hidden">
                <img
                  src={post.footerImage}
                  alt=""
                  className="w-full h-full object-cover grayscale-[15%]"
                  draggable={false}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note about updating */}
        <p className="text-center text-muted-foreground text-xs mb-10 -mt-4 font-sans">
          {t(
            'المزيد من التذكيرات على قناتنا في إنستغرام (Highlights) — يتم تحديثها بانتظام',
            'More reminders are posted regularly to our Instagram highlights'
          )}
        </p>

        {/* Social channel cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-5 max-w-xl mx-auto"
        >
          {/* YouTube card */}
          <a
            href="https://www.youtube.com/@%D8%B5%D9%88%D8%AA_%D8%A7%D9%84%D8%AD%D8%B1%D9%85"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe on YouTube"
            className="flex-1 flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-[0_4px_20px_rgba(201,168,76,0.12)] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
              <FaYoutube className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">YouTube</p>
              <p className="text-muted-foreground text-xs mt-0.5 font-arabic">@صوت_الحرم</p>
            </div>
          </a>

          {/* Instagram card */}
          <a
            href="https://www.instagram.com/sawtul_haram/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow on Instagram"
            className="flex-1 flex items-center gap-4 p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:shadow-[0_4px_20px_rgba(201,168,76,0.12)] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:bg-gradient-to-br group-hover:from-pink-500 group-hover:to-orange-400 group-hover:text-white transition-all">
              <FaInstagram className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">Instagram</p>
              <p className="text-muted-foreground text-xs mt-0.5 font-sans">@sawtul_haram</p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

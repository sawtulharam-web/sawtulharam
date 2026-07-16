import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import IslamicPattern from './IslamicPattern';
import { REMINDER_POSTS } from '../data/reminders';

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
        {/* Reminder post images */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">

  {REMINDER_POSTS.map((post, index) => (
    <motion.div
      key={post.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
      }}
      className="overflow-hidden rounded-2xl border border-primary/15 shadow-sm hover:shadow-[0_8px_28px_rgba(201,168,76,0.15)] transition-shadow bg-card"
    >

      <img
        src={post.image}
        alt="Reminder"
        className="w-full h-auto object-cover"
        draggable={false}
      />

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

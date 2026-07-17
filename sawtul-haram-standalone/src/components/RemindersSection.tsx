import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import IslamicPattern from './IslamicPattern';
import { REMINDER_POSTS } from '../data/reminders';

export default function RemindersSection() {
  const { t, lang } = useLanguage();

  const [currentReminder, setCurrentReminder] = useState(0);

  const nextReminder = () => {
    setCurrentReminder((prev) =>
      (prev + 1) % REMINDER_POSTS.length
    );
  };


  const previousReminder = () => {
    setCurrentReminder((prev) =>
      (prev - 1 + REMINDER_POSTS.length) % REMINDER_POSTS.length
    );
  };
  
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
{/* Reminder stacked card deck */}

<div className="relative max-w-xl mx-auto mb-20 flex justify-center">

      {/* Back cards */}

      {[2,1].map((offset)=>{

      const index =
      (currentReminder + offset) % REMINDER_POSTS.length;


      return (

      <motion.div

      key={`back-${index}`}

      className="
      absolute
      pointer-events-none
      w-[min(78vw,470px)]
      aspect-square
      rounded-2xl
      overflow-hidden
      border
      border-primary/20
      bg-card
      shadow-[0_20px_50px_rgba(201,168,76,0.25)]
      "

      style={{

      zIndex: 1,

      }}

      animate={{
        x: offset === 1 ? -28 : 28,
        y: offset * 18,
        rotate: offset === 1 ? -6 : 6,
        scale: 1 - offset * 0.06,
        opacity: 0.9 - offset * 0.15,
      }}
      transition={{

      type:"spring",

      stiffness:200,

      damping:25

      }}

      >

      <img

      src={REMINDER_POSTS[index].image}

      alt=""

      className="
      w-full
      h-full
      object-contain
      rounded-2xl
      "

      />

      </motion.div>


      )

      })}


  {/* Main card */}
  <AnimatePresence initial={false}>

    <motion.div
      key={REMINDER_POSTS[currentReminder].id}

      initial={{ x: 120 }}
      animate={{ x: 0 }}
      exit={{ x: -120 }}

      transition={{
        type: "spring",
        stiffness: 320,
        damping: 32,
      }}

      drag="x"
      dragElastic={0.25}
      dragConstraints={{ left: 0, right: 0 }}

      onDragEnd={(event, info) => {

        if (info.offset.x > 80) {
          nextReminder();
        }

        if (info.offset.x < -80) {
          previousReminder();
        }

      }}

      className="
        relative
        z-10
        w-[min(85vw,520px)]
        aspect-square
        rounded-2xl
        overflow-hidden
        border
        border-primary/20
        bg-card
        shadow-[0_15px_45px_rgba(201,168,76,0.18)]
        cursor-grab
        active:cursor-grabbing
      "
    >

      <img
        src={REMINDER_POSTS[currentReminder].image}
        alt="Reminder"
        className="w-full h-full object-contain"
        draggable={false}
      />

    </motion.div>

  </AnimatePresence>


  {/* Left arrow */}
  <button
    onClick={previousReminder}
    className="
      absolute
      left-0
      top-1/2
      -translate-y-1/2
      -translate-x-4
      z-20
      w-10
      h-10
      rounded-full
      bg-background/90
      backdrop-blur-sm
      border
      border-primary/30
      text-primary
      hover:bg-primary
      hover:text-white
      transition-all
    "
  >
    <ChevronLeft className="w-5 h-5 mx-auto" />
  </button>


  {/* Right arrow */}
  <button
    onClick={nextReminder}
    className="
      absolute
      right-0
      top-1/2
      -translate-y-1/2
      translate-x-4
      z-20
      w-10
      h-10
      rounded-full
      bg-background/90
      backdrop-blur-sm
      border
      border-primary/30
      text-primary
      hover:bg-primary
      hover:text-white
      transition-all
    "
  >
    <ChevronRight className="w-5 h-5 mx-auto" />
  </button>


  {/* Dots */}
  <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-2">

    {REMINDER_POSTS.map((post, index) => (
      <button
        key={post.id}
        onClick={() => setCurrentReminder(index)}
        className={`
          h-2
          rounded-full
          transition-all
          ${
            index === currentReminder
              ? "bg-primary w-6"
              : "bg-primary/30 w-2"
          }
        `}
        aria-label={`Go to reminder ${index + 1}`}
      />
    ))}

  </div>

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



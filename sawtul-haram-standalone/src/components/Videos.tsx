import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Play } from 'lucide-react';
import { useEffect, useState } from 'react';
import IslamicPattern from './IslamicPattern';

type Video = {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
};

export default function Videos() {
  const { t, lang } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
      })
      .catch((err) => {
        console.error('Failed to load YouTube videos:', err);
      });
  }, []);

  return (
    <section id="videos" className="py-24 bg-[#f3efe6] relative border-y border-border">
      <IslamicPattern opacity={0.03} />

      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0, y: 0 }}
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
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center text-white transform scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  </div>
                </div>

              </div>


              <div className="p-4 border-t border-primary/15">

                <h3 className={`text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2 ${
                  lang === 'ar' ? 'font-arabic-secondary text-base' : 'font-sans'
                }`}>
                  {video.title}
                </h3>

              </div>

            </motion.a>

          ))}

        </div>

      </div>
    </section>
  );
}

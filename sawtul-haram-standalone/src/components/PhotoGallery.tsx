import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gallery1 from '@assets/Makkah_2_1783530412992.jpg';
import gallery2 from '@assets/Makkah_1783530412994.jpg';import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gallery1 from '@assets/Makkah_2_1783530412992.jpg';
import gallery2 from '@assets/Makkah_1783530412994.jpg';
import gallery3 from '@assets/Haram_1_1783530412994.jpg';
import gallery4 from '@assets/Haram_1783530412995.jpg';
import gallery5 from '@assets/Background_1783530412995.jpg';

export default function PhotoGallery() {
  const { t, lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: gallery1,
      captionAr: 'الطواف حول الكعبة المشرفة',
      captionEn: 'Tawaf around the Holy Kaaba',
    },
    {
      src: gallery2,
      captionAr: 'المسجد الحرام — صحن الطواف',
      captionEn: 'Masjid al-Haram — the Tawaf courtyard',
    },
    {
      src: gallery3,
      captionAr: 'المسجد الحرام ليلاً',
      captionEn: 'Masjid al-Haram at night',
    },
    {
      src: gallery4,
      captionAr: 'منظر جوي للمسجد الحرام',
      captionEn: 'Aerial view of Masjid al-Haram',
    },
    {
      src: gallery5,
      captionAr: 'الحرم المكي الشريف',
      captionEn: 'The Sacred Mosque of Makkah',
    },
  ];

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  // Layout: wide, narrow, narrow | narrow, wide | full-width
  const colSpan = (index: number) => {
    if (index === 0) return 'lg:col-span-2';
    if (index === 3) return 'lg:col-span-2';
    if (index === 4) return 'lg:col-span-3';
    return '';
  };

  return (
    <section id="gallery" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${lang === 'ar' ? 'font-arabic-secondary' : 'font-serif'}`}>
            {t('معرض الصور', 'Photo Gallery')}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <div className="w-3 h-3 rotate-45 bg-primary" />
            <div className="h-[1px] w-12 bg-primary" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[260px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${colSpan(index)}`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.src}
                alt={t(img.captionAr, img.captionEn)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-5 w-full">
                  <p className={`text-white text-base ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                    {t(img.captionAr, img.captionEn)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              aria-label="Close"
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              aria-label="Previous image"
              className="absolute left-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              aria-label="Next image"
              className="absolute right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[80vh] px-12"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src}
                alt="Enlarged view"
                className="max-w-full max-h-[80vh] object-contain rounded-sm"
              />
              <p className={`absolute -bottom-12 left-0 right-0 text-center text-white/80 ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                {t(images[selectedImage].captionAr, images[selectedImage].captionEn)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import gallery3 from '@assets/Haram_1_1783530412994.jpg';
import gallery4 from '@assets/Haram_1783530412995.jpg';
import gallery5 from '@assets/Background_1783530412995.jpg';

export default function PhotoGallery() {
  const { t, lang } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: gallery1,
      captionAr: 'الطواف حول الكعبة المشرفة',
      captionEn: 'Tawaf around the Holy Kaaba',
    },
    {
      src: gallery2,
      captionAr: 'المسجد الحرام — صحن الطواف',
      captionEn: 'Masjid al-Haram — the Tawaf courtyard',
    },
    {
      src: gallery3,
      captionAr: 'المسجد الحرام ليلاً',
      captionEn: 'Masjid al-Haram at night',
    },
    {
      src: gallery4,
      captionAr: 'منظر جوي للمسجد الحرام',
      captionEn: 'Aerial view of Masjid al-Haram',
    },
    {
      src: gallery5,
      captionAr: 'الحرم المكي الشريف',
      captionEn: 'The Sacred Mosque of Makkah',
    },
  ];

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) setSelectedImage((selectedImage - 1 + images.length) % images.length);
  };

  // Layout: wide, narrow, narrow | narrow, wide | full-width
  const colSpan = (index: number) => {
    if (index === 0) return 'lg:col-span-2';
    if (index === 3) return 'lg:col-span-2';
    if (index === 4) return 'lg:col-span-3';
    return '';
  };

  return (
    <section id="gallery" className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${lang === 'ar' ? 'font-arabic' : 'font-serif'}`}>
            {t('معرض الصور', 'Photo Gallery')}
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary" />
            <div className="w-3 h-3 rotate-45 bg-primary" />
            <div className="h-[1px] w-12 bg-primary" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[260px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-lg cursor-pointer ${colSpan(index)}`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={img.src}
                alt={t(img.captionAr, img.captionEn)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-5 w-full">
                  <p className={`text-white text-base ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                    {t(img.captionAr, img.captionEn)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              aria-label="Close"
              className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={closeLightbox}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              aria-label="Previous image"
              className="absolute left-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              aria-label="Next image"
              className="absolute right-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[80vh] px-12"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedImage].src}
                alt="Enlarged view"
                className="max-w-full max-h-[80vh] object-contain rounded-sm"
              />
              <p className={`absolute -bottom-12 left-0 right-0 text-center text-white/80 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
                {t(images[selectedImage].captionAr, images[selectedImage].captionEn)}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { X, ChevronLeft, ChevronRight, Grid, Calendar, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { galleryItems, galleryCategories, GalleryItem } from '../data/galleryData';

export default function PhotoGallery() {
  const { t, lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(8);

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  // Reset visible count when category changes
  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setVisibleCount(8);
  };

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredItems.length));
  };

  const handleShowLess = () => {
    setVisibleCount(8);
    const section = document.getElementById('gallery');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  }, [selectedImageIndex, filteredItems.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [selectedImageIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') {
        if (lang === 'ar') prevImage();
        else nextImage();
      }
      if (e.key === 'ArrowLeft') {
        if (lang === 'ar') nextImage();
        else prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, lang, nextImage, prevImage]);

  // Helper for category counts
  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return galleryItems.length;
    return galleryItems.filter((item) => item.category === catId).length;
  };

  const currentImage = selectedImageIndex !== null ? filteredItems[selectedImageIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#c5a059_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block flex items-center justify-center gap-2">
            <Grid className="w-4 h-4" />
            {t('المكتنز الصوري الحصري', 'Exclusive Photo Collection')}
          </span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-foreground ${lang === 'ar' ? 'font-arabic-secondary' : 'font-serif'}`}>
            {t('معرض الصور والأحداث', 'Photo & Event Gallery')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-6">
            {t(
              'تغطيات مصورة مستمرة لأحدث الفعاليات، الدروس، وأخبار أئمة المسجد الحرام',
              'Continuous photo coverage of the latest events, lessons, and news of the Imams of Masjid al-Haram'
            )}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-primary/40" />
            <div className="w-2.5 h-2.5 rotate-45 bg-primary" />
            <div className="h-[1px] w-12 bg-primary/40" />
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10"
        >
          {galleryCategories.map((cat) => {
            const count = getCategoryCount(cat.id);
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20 scale-105'
                    : 'bg-card text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground'
                }`}
              >
                <span>{lang === 'ar' ? cat.nameAr : cat.nameEn}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Image Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((img: GalleryItem, index: number) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: (index % 8) * 0.05 }}
                className="group relative overflow-hidden rounded-xl bg-card border border-border/50 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-[280px]"
                onClick={() => openLightbox(index)}
              >
                {/* Image Container */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={img.src}
                    alt={lang === 'ar' ? img.captionAr : img.captionEn}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Date/Category Badge Top */}
                  {img.dateAr && (
                    <div className="absolute top-3 right-3 z-10 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full text-[11px] text-white/90 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span>{lang === 'ar' ? img.dateAr : img.dateEn}</span>
                    </div>
                  )}

                  {/* Caption & Quick Info Bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-4 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p
                      className={`text-white font-medium text-sm line-clamp-2 mb-1.5 leading-snug drop-shadow-md ${
                        lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'
                      }`}
                    >
                      {lang === 'ar' ? img.captionAr : img.captionEn}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Tag className="w-3 h-3" />
                      {t('انقر للتكبير', 'Click to enlarge')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More / Show Less Controls */}
        <div className="mt-12 text-center flex flex-col items-center justify-center gap-3">
          {hasMore && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLoadMore}
              className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all flex items-center gap-2 text-sm md:text-base border border-primary/30"
            >
              <ChevronDown className="w-5 h-5 animate-bounce" />
              <span>
                {t(
                  `عرض المزيد من الصور (متبقي ${filteredItems.length - visibleCount})`,
                  `Load More Photos (${filteredItems.length - visibleCount} remaining)`
                )}
              </span>
            </motion.button>
          )}

          {!hasMore && filteredItems.length > 8 && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleShowLess}
              className="px-6 py-2.5 rounded-full bg-card text-muted-foreground hover:text-foreground font-medium border border-border transition-all flex items-center gap-2 text-xs md:text-sm"
            >
              <ChevronUp className="w-4 h-4" />
              <span>{t('عرض أقل', 'Show Less')}</span>
            </motion.button>
          )}

          <p className="text-xs text-muted-foreground mt-1">
            {t(
              `يعرض ${visibleItems.length} من أصل ${filteredItems.length} صورة`,
              `Showing ${visibleItems.length} of ${filteredItems.length} photos`
            )}
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-4 inset-x-4 md:inset-x-8 flex items-center justify-between z-20">
              {/* Image Counter Badge */}
              <div className="bg-white/10 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full text-xs text-white/90 font-medium">
                {t(
                  `الصورة ${selectedImageIndex + 1} من ${filteredItems.length}`,
                  `Photo ${selectedImageIndex + 1} of ${filteredItems.length}`
                )}
              </div>

              {/* Close Button */}
              <button
                aria-label="Close modal"
                className="bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white rounded-full p-2.5 transition-colors"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Previous Image Button */}
            <button
              aria-label="Previous image"
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white rounded-full p-3 transition-colors shadow-lg"
              onClick={lang === 'ar' ? nextImage : prevImage}
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Next Image Button */}
            <button
              aria-label="Next image"
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white rounded-full p-3 transition-colors shadow-lg"
              onClick={lang === 'ar' ? prevImage : nextImage}
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Main Lightbox Content */}
            <motion.div
              key={currentImage.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[82vh] flex flex-col items-center justify-center z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage.src}
                alt={lang === 'ar' ? currentImage.captionAr : currentImage.captionEn}
                className="max-w-full max-h-[72vh] object-contain rounded-lg border border-white/10 shadow-2xl"
              />

              {/* Caption Box */}
              <div className="mt-4 text-center max-w-2xl px-4 bg-black/60 backdrop-blur-md py-3 rounded-xl border border-white/10">
                <p className={`text-white text-base md:text-lg font-medium ${lang === 'ar' ? 'font-arabic-secondary' : 'font-sans'}`}>
                  {lang === 'ar' ? currentImage.captionAr : currentImage.captionEn}
                </p>
                {currentImage.dateAr && (
                  <span className="text-xs text-primary/90 mt-1 block">
                    {lang === 'ar' ? currentImage.dateAr : currentImage.dateEn}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

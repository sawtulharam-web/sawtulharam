import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider, useLanguage } from './components/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sheikhs from './components/Sheikhs';
import ImamSchedule from './components/ImamSchedule';
import Videos from './components/Videos';
import PrayerTimes from './components/PrayerTimes';
import DailyAyah from './components/DailyAyah';
import RemindersSection from './components/RemindersSection';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function MainContent() {
  const { lang } = useLanguage();
  return (
    <main dir={lang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Sheikhs />
      <ImamSchedule />
      <Videos />
      <PrayerTimes />
      <DailyAyah />
      <RemindersSection />
      <PhotoGallery />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <MainContent />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;

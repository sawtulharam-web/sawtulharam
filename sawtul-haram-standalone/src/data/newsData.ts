export interface NewsItem {
  id: string;
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  date: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    titleAr: 'محاضرة لمعالي الشيخ د. عبدالرحمن السديس بعنوان «الحقيقة الشرعية لمحبة النبي ﷺ»',
    titleEn: 'Lecture by Sheikh Dr. Abdul Rahman Al-Sudais: “The Islamic Concept of Loving the Prophet ﷺ”',
    contentAr: 'يلقي معالي الشيخ الدكتور عبدالرحمن السديس محاضرة بعنوان «الحقيقة الشرعية لمحبة النبي ﷺ»، وذلك يوم الثلاثاء ٥ ربيع الأول ١٤٤٨هـ، بعد صلاة المغرب، في كرسي الأئمة بالمطاف.',
    contentEn: 'His Excellency Sheikh Dr. Abdul Rahman Al-Sudais will deliver a lecture entitled “The Islamic Concept of Loving the Prophet ﷺ” on Tuesday, 5 Rabi al-Awwal 1448H, after Maghrib prayer, at the Imams’ Chair in the Mataf.',
    date: '2026-08-18',
  },
  {
    id: 'news-2',
    titleAr: 'الجدول الحالي للأئمة ليومي الأحد والاثنين',
    titleEn: 'Current Imam Schedule for Sunday and Monday',
    contentAr: 'الجدول الحالي لإمامة الصلوات في المسجد الحرام ساري لمدة يومين فقط، من يوم الأحد ٢٦ صفر إلى يوم الاثنين ٢ ربيع الأول ١٤٤٨هـ، وسيتم نشر الجدول الجديد فور صدوره بإذن الله تعالى.',
    contentEn: 'The current Imam schedule for prayers at Masjid al-Haram is valid for two days only, from Sunday, 26 Safar to Monday, 2 Rabi al-Awwal 1448H. The new schedule will be published once it is officially released, Insha’Allah.',
    date: '2026-08-17',
  },
];

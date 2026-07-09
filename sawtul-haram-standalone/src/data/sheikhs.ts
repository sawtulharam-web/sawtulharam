// ─── Central sheikh data file ────────────────────────────────────────────────
// Edit names, bios, and titles here. Images are imported from attached_assets/.

import sheikhYasser   from '@assets/الشيخ_ياسر_بن_راشد_بن_حسين_الودعاني_الدوسري_1783531655013.png';
import sheikhMaher    from '@assets/الشيخ_ماهر_بن_حمد_بن_محمد_المعيقلي_1783531655012.png';
import sheikhSudais   from '@assets/الشيخ_عبد_الرحمن_بن_عبد_العزيز_السديس_1783531655010.png';
import sheikhAbdullah from '@assets/الشيخ_عبد_الله_بن_عواد_الجهني_1783531655010.png';
import sheikhBaleelah from '@assets/الشيخ_بندر_بن_عبد_العزيز_بليلة_1783531655012.png';
import sheikhBadr     from '@assets/الشيخ_بدر_بن_محمد_التركي_1783531655008.png';
import sheikhWaleed   from '@assets/الشيخ_الوليد_بن_خالد_الشمسان_1783531655011.png';

export interface Sheikh {
  key: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  bioAr: string;
  bioEn: string;
  image: string;
}

// ─── ORDER HERE controls the default carousel order ───────────────────────────
// Yasser, Maher, Sudais appear first as requested.
export const SHEIKHS: Sheikh[] = [
  {
    key: 'yasser',
    nameAr: 'الشيخ ياسر بن راشد الدوسري',
    nameEn: 'Sheikh Yasser Al-Dossary',
    titleAr: 'إمام وخطيب المسجد الحرام',
    titleEn: 'Imam & Preacher of Masjid al-Haram',
    bioAr:
      'فضيلة الشيخ الأستاذ الدكتور ياسر بن راشد بن حسين الودعاني الدوسري، إمام وخطيب المسجد الحرام. عُرف بصوته الشجي المؤثر وتلاوته الخاشعة التي تأسر القلوب. يحمل إجازات متعددة في القراءات العشر، ويُعدّ من أبرز أئمة الحرم في عصرنا.',
    bioEn:
      'Sheikh Yasser bin Rashid Al-Dossary is an Imam and Preacher of Masjid al-Haram. Known for his deeply moving recitation and melodious voice, he holds multiple authorizations in the Ten Qira\'at and is among the most prominent imams of the Holy Mosque.',
    image: sheikhYasser,
  },
  {
    key: 'maher',
    nameAr: 'الشيخ ماهر بن حمد المعيقلي',
    nameEn: 'Sheikh Maher Al-Muaiqly',
    titleAr: 'إمام وخطيب المسجد الحرام',
    titleEn: 'Imam & Preacher of Masjid al-Haram',
    bioAr:
      'فضيلة الشيخ الدكتور ماهر بن حمد بن محمد المعيقلي، إمام وخطيب المسجد الحرام. تميّزت تلاوته بالجمع بين الإتقان والخشوع، وأصوات تلاواته الكريمة تعلو في ربوع الحرم المكي ليسمعها ملايين الحجاج والمعتمرين.',
    bioEn:
      'Sheikh Maher Al-Muaiqly is an Imam and Preacher of Masjid al-Haram. His recitations combine precision with deep reverence, and his voice fills the courtyards of the Sacred Mosque for millions of pilgrims and worshippers.',
    image: sheikhMaher,
  },
  {
    key: 'sudais',
    nameAr: 'الشيخ عبدالرحمن بن عبدالعزيز السديس',
    nameEn: 'Sheikh Abdulrahman Al-Sudais',
    titleAr: 'رئيس الشؤون الدينية للحرمين الشريفين',
    titleEn: 'President of Religious Affairs of the Two Holy Mosques',
    bioAr:
      'فضيلة الشيخ الدكتور عبدالرحمن بن عبدالعزيز السديس، رئيس شؤون المسجد الحرام والمسجد النبوي. أحد أشهر أئمة المسجد الحرام في العالم الإسلامي، يُعرف بصوته الجهوري وتلاوته المبكية المؤثرة.',
    bioEn:
      'Sheikh Abdulrahman Al-Sudais is the President of the General Presidency for the Affairs of the Two Holy Mosques. One of the most recognized imams in the Islamic world, known for his powerful voice and deeply moving recitation.',
    image: sheikhSudais,
  },
  {
    key: 'abdullah',
    nameAr: 'الشيخ عبدالله بن عواد الجهني',
    nameEn: 'Sheikh Abdullah Al-Juhany',
    titleAr: 'إمام المسجد الحرام',
    titleEn: 'Imam of Masjid al-Haram',
    bioAr:
      'فضيلة الشيخ الدكتور عبدالله بن عواد الجهني، إمام المسجد الحرام. يتميّز بصوت رائع وأداء متقن في صلوات الفريضة والقيام، وله تلاوات مميزة تُبثّ عبر منابر الحرم المكي الشريف.',
    bioEn:
      'Sheikh Abdullah Al-Juhany is an Imam of Masjid al-Haram. He is distinguished by a beautiful voice and precise recitation in obligatory and Tarawih prayers, with memorable recitations broadcast from the Sacred Mosque.',
    image: sheikhAbdullah,
  },
  {
    key: 'baleelah',
    nameAr: 'الشيخ بندر بن عبدالعزيز بليلة',
    nameEn: 'Sheikh Bandar Baleelah',
    titleAr: 'إمام وخطيب المسجد الحرام',
    titleEn: 'Imam & Preacher of Masjid al-Haram',
    bioAr:
      'فضيلة الشيخ الدكتور بندر بن عبدالعزيز بليلة، إمام وخطيب المسجد الحرام. يُعرف بأسلوبه الرصين وقراءته المتقنة، وهو من أئمة الحرم المكي الذين يجمعون بين الأداء العلمي والروحي.',
    bioEn:
      'Sheikh Bandar Baleelah is an Imam and Preacher of Masjid al-Haram. Known for his composed style and precise recitation, he is among the imams who combine scholarly rigor with spiritual depth.',
    image: sheikhBaleelah,
  },
  {
    key: 'badr',
    nameAr: 'الشيخ بدر بن محمد التركي',
    nameEn: 'Sheikh Badr Al-Turki',
    titleAr: 'إمام المسجد الحرام',
    titleEn: 'Imam of Masjid al-Haram',
    bioAr:
      'فضيلة الشيخ الدكتور بدر بن محمد التركي، إمام المسجد الحرام. يتميّز بصوت هادئ وخاشع في التلاوة والقيام، وله حضور مميز في صلوات المسجد الحرام.',
    bioEn:
      'Sheikh Badr Al-Turki is an Imam of Masjid al-Haram. He is distinguished by a calm and reverent voice in recitation and night prayers, with a notable presence in the prayers of the Sacred Mosque.',
    image: sheikhBadr,
  },
  {
    key: 'waleed',
    nameAr: 'الشيخ الوليد بن خالد الشمسان',
    nameEn: 'Sheikh Al-Waleed Al-Shamsan',
    titleAr: 'إمام المسجد الحرام',
    titleEn: 'Imam of Masjid al-Haram',
    bioAr:
      'فضيلة الشيخ الوليد بن خالد الشمسان، إمام المسجد الحرام. صاحب تلاوة خاشعة ومؤثرة، يُسهم بصوته الجميل في إثراء الحياة الروحية لزوّار بيت الله الحرام.',
    bioEn:
      'Sheikh Al-Waleed Al-Shamsan is an Imam of Masjid al-Haram. He possesses a reverent and moving recitation, contributing through his beautiful voice to the spiritual life of visitors to the House of Allah.',
    image: sheikhWaleed,
  },
];

/** Quick lookup by key */
export const SHEIKH_MAP: Record<string, Sheikh> = Object.fromEntries(
  SHEIKHS.map((s) => [s.key, s])
);

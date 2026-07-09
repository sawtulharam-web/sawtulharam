// ─── Reminder posts (styled like the channel's Instagram highlight cards) ───
//
// ⚠️ PLACEHOLDER CONTENT — the 3 entries below are well-known, commonly
// cited hadiths used only to demonstrate the card layout while real content
// was pending. Replace them with the exact text/citations from your actual
// Instagram highlight posts before treating this section as final — do not
// publish unverified hadith text/grading on a religious platform.
//
// HOW TO UPDATE: add/edit objects below. `titleAr` is the short gold
// calligraphy-style heading at the top of the card (e.g. a name or theme
// word). `source` is the citation shown under the translation.
// Swap `footerImage` for any photo already in attached_assets/ if you want
// variety on the bottom strip.

import haram1 from '@assets/Haram_1783530412995.jpg';
import haram2 from '@assets/Haram_1_1783530412994.jpg';
import makkah1 from '@assets/Makkah_1783530412994.jpg';

export interface ReminderPost {
  id: string;
  titleAr: string;
  arabicText: string;
  englishText: string;
  source: string;
  footerImage: string;
}

export const REMINDER_POSTS: ReminderPost[] = [
  {
    id: 'theft-of-prayer',
    titleAr: 'محمّد ﷺ',
    arabicText:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «أَسْوَأُ النَّاسِ سَرِقَةً الَّذِي يَسْرِقُ مِنْ صَلَاتِهِ». قَالُوا: يَا رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ وَكَيْفَ يَسْرِقُ مِنْ صَلَاتِهِ؟ قَالَ: «لَا يُتِمُّ رُكُوعَهَا وَلَا سُجُودَهَا».',
    englishText:
      'The one who commits the worst theft is he who steals from his prayer. When asked how one could steal from his prayer, he ﷺ replied: "By not performing his bowing and his prostration perfectly."',
    source: 'Mishkat al-Masabih, 885',
    footerImage: makkah1,
  },
  {
    id: 'good-character',
    titleAr: 'محمّد ﷺ',
    arabicText:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «أَكْمَلُ الْمُؤْمِنِينَ إِيمَانًا أَحْسَنُهُمْ خُلُقًا، وَخِيَارُكُمْ خِيَارُكُمْ لِنِسَائِهِمْ».',
    englishText:
      'The most complete of the believers in faith are those with the best character, and the best among you are those who are best to their wives.',
    source: 'Jami\u2019 at-Tirmidhi, 1162',
    footerImage: haram1,
  },
  {
    id: 'seeking-forgiveness',
    titleAr: 'محمّد ﷺ',
    arabicText:
      'قَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: «وَاللَّهِ إِنِّي لَأَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ فِي الْيَوْمِ أَكْثَرَ مِنْ سَبْعِينَ مَرَّةً».',
    englishText:
      'By Allah, I seek the forgiveness of Allah and turn to Him in repentance more than seventy times a day.',
    source: 'Sahih al-Bukhari, 6307',
    footerImage: haram2,
  },
];

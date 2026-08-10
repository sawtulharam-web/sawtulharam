// ─── Weekly Imam Schedule ─────────────────────────────────────────────────────
// HOW TO UPDATE: Change the `periodAr`, `periodEn`, and each `imamKey` /
// `backupKey` below. Keys must match a `key` in sheikhs.ts.
// Prayer order is always: Fajr → Dhuhr → Asr → Maghrib → Isha.

export interface PrayerSlot {
  prayerAr: string;
  prayerEn: string;        // also used to look up the minimal icon in ImamSchedule.tsx
  imamKey: string;         // must match Sheikh.key in sheikhs.ts
  backupKey: string;       // backup imam key
}

export interface WeeklySchedule {
  periodAr: string;
  periodEn: string;
  prayers: PrayerSlot[];
}

// ─── EDIT THIS EVERY WEEK ─────────────────────────────────────────────────────
export const weeklySchedule: WeeklySchedule = {
  periodAr: 'من يوم الأحد ٢٦ صفر إلى يوم السبت ٢ ربيع الأول ١٤٤٨هـ',
  periodEn: 'Sunday 26 Safar – Saturday 2 Rabi al-Awwal 1448H',
  prayers: [
    { prayerAr: 'الفجر',   prayerEn: 'Fajr',    imamKey: 'baleelah', backupKey: 'yasser'   },
    { prayerAr: 'الظهر',   prayerEn: 'Dhuhr',   imamKey: 'usama',    backupKey: 'baleelah' },
    { prayerAr: 'العصر',   prayerEn: 'Asr',     imamKey: 'baleelah', backupKey: 'yasser'   },
    { prayerAr: 'المغرب',  prayerEn: 'Maghrib', imamKey: 'yasser',   backupKey: 'baleelah' },
    { prayerAr: 'العشاء',  prayerEn: 'Isha',    imamKey: 'yasser',   backupKey: 'baleelah' },
  ],
};

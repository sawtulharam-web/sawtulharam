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
  periodAr: 'من يوم الأحد ٢٠ محرم إلى يوم السبت ٢٦ محرم ١٤٤٨هـ',
  periodEn: 'Sunday 20 Muharram – Saturday 26 Muharram 1448H',
  prayers: [
    { prayerAr: 'الفجر',   prayerEn: 'Fajr',    imamKey: 'yasser',   backupKey: 'abdullah' },
    { prayerAr: 'الظهر',   prayerEn: 'Dhuhr',   imamKey: 'abdullah', backupKey: 'yasser'   },
    { prayerAr: 'العصر',   prayerEn: 'Asr',     imamKey: 'yasser',   backupKey: 'abdullah' },
    { prayerAr: 'المغرب',  prayerEn: 'Maghrib', imamKey: 'abdullah', backupKey: 'yasser'   },
    { prayerAr: 'العشاء',  prayerEn: 'Isha',    imamKey: 'yasser',   backupKey: 'abdullah' },
  ],
};

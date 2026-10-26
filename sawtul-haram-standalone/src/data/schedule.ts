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
  periodAr: 'من يوم الأحد 14 جمادی الأولی إلى يوم السبت 20 جمادی الأولی 1448هـ',
  periodEn: 'Sunday 14 Jamad il Ula – Saturday 20 Jamad il Ula 1448H',
  prayers: [
    { prayerAr: 'الفجر',   prayerEn: 'Fajr',    imamKey: 'yasser', backupKey: 'badr'   },
    { prayerAr: 'الظهر',   prayerEn: 'Dhuhr',   imamKey: 'faisal',    backupKey: 'yasser' },
    { prayerAr: 'العصر',   prayerEn: 'Asr',     imamKey: 'yasser', backupKey: 'abdullah'   },
    { prayerAr: 'المغرب',  prayerEn: 'Maghrib', imamKey: 'abdullah',   backupKey: 'badr' },
    { prayerAr: 'العشاء',  prayerEn: 'Isha',    imamKey: 'badr',   backupKey: 'abdullah' },
  ],
};

// maher
// yasser
// baleelah
// abdullah
// sudais
// waleed
// badr
// usama

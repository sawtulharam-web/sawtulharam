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
  periodAr: 'من يوم الثلاۃ 5 ربيع الأول إلى يوم السبت 9 ربيع الأول 1448هـ',
  periodEn: 'Tuesday 5 Rabi al Awwal – Sunday 9 Rabi al Awwal 1448H',
  prayers: [
    { prayerAr: 'الفجر',   prayerEn: 'Fajr',    imamKey: 'waleed', backupKey: 'yasser'   },
    { prayerAr: 'الظهر',   prayerEn: 'Dhuhr',   imamKey: 'badr',    backupKey: 'abdullah' },
    { prayerAr: 'العصر',   prayerEn: 'Asr',     imamKey: 'abdullah', backupKey: 'waleed'   },
    { prayerAr: 'المغرب',  prayerEn: 'Maghrib', imamKey: 'sudais',   backupKey: 'yasser' },
    { prayerAr: 'العشاء',  prayerEn: 'Isha',    imamKey: 'yasser',   backupKey: 'badr' },
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

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
  periodAr: 'من يوم الثلاۃ 10 ربيع الأول إلى يوم السبت 16 ربيع الأول 1448هـ',
  periodEn: 'Tuesday 10 Rabi al Awwal – Sunday 16 Rabi al Awwal 1448H',
  prayers: [
    { prayerAr: 'الفجر',   prayerEn: 'Fajr',    imamKey: 'baleelah', backupKey: 'waleed'   },
    { prayerAr: 'الظهر',   prayerEn: 'Dhuhr',   imamKey: 'usama',    backupKey: 'waleed' },
    { prayerAr: 'العصر',   prayerEn: 'Asr',     imamKey: 'maher', backupKey: 'baleelah'   },
    { prayerAr: 'المغرب',  prayerEn: 'Maghrib', imamKey: 'maher',   backupKey: 'baleelah' },
    { prayerAr: 'العشاء',  prayerEn: 'Isha',    imamKey: 'waleed',   backupKey: 'maher' },
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

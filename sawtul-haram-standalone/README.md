# Sawtul Haram — صوت الحرم

A bilingual (Arabic/English) site featuring the reciters (Imams) of Masjid al-Haram — profiles, weekly prayer schedule, prayer times, a daily Quran verse, reminders, and a photo gallery.

This is a static React + Vite site with no backend — all content lives in `src/data/*.ts` files, so it's easy to edit without touching component code.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Building for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

The production build is written to `dist/` — it's a fully static site you can deploy to any static host (Vercel, Netlify, GitHub Pages, Cloudflare Pages, S3, etc.).

## Updating content

All editable content lives under `src/data/`:

- `sheikhs.ts` — reciter (Imam) profiles: names, bios, photos.
- `schedule.ts` — the weekly Imam prayer schedule.
- `reminders.ts` — the Instagram-style reminder/hadith cards shown in the Reminders section (currently placeholder content — see the note at the top of the file).

Images referenced by these files live in `src/assets/`. Add a new image there and import it in the relevant data file to use it.

## Tech stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion (animations)
- shadcn/ui + Radix UI (component primitives)
- TanStack Query (client-side data fetching, e.g. Quran.com API for the daily verse)
- wouter (routing)

## Project structure

```
src/
  assets/         static images (logo, photos)
  components/     UI components and sections
  components/ui/  shadcn/ui primitives
  data/           editable content (sheikhs, schedule, reminders)
  hooks/          shared React hooks
  lib/            utilities
  pages/          page-level components
```

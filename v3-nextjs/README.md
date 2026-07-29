# AURA Studio v3 — Next.js Platform

The premium, bilingual (Arabic-primary RTL + English LTR), dark-mode luxury redesign.

## Stack
- Next.js 16 (App Router) + TypeScript 5
- Tailwind CSS 4 with custom design tokens
- Lucide React icons
- Google Fonts: Inter, Cormorant Garamond, Tajawal, Reem Kufi
- 100% client-side (no backend) — inquiry form saves to localStorage

## Sections (11 total)
1. Header (sticky glass, AR/EN toggle)
2. Hero (cinematic Ken Burns)
3. Live Project Proof (Villa Solara unified dashboard)
4. How it Works (4 steps)
5. Platform Capabilities (4 features)
6. Interactive Experience (floor plan + 360° + before/after tabs)
7. Construction Timeline (7 stages)
8. Who it's for (3 audiences)
9. Pricing (3 tiers)
10. Final CTA (inquiry form)
11. Footer

## Run

```bash
cd v3-nextjs
bun install         # or npm install
bun run dev         # opens on http://localhost:3000
```

Before running, fetch the project images:

```bash
cd public
ln -s ../../assets aura    # symlink to v2 assets folder
```

## File Structure

```
v3-nextjs/
├── src/
│   ├── app/
│   │   ├── globals.css       (design system: dark mode + gold accent)
│   │   ├── layout.tsx        (RTL default, 4 Google fonts, LanguageProvider)
│   │   └── page.tsx          (composes 11 sections)
│   ├── components/
│   │   ├── language-provider.tsx
│   │   └── sections/         (11 section files)
│   └── lib/
│       └── i18n.ts           (all bilingual copy)
├── public/                   (assets symlinked from v2)
└── package.json
```

## Bilingual

All copy lives in `src/lib/i18n.ts` as a typed tree with `{ar, en}` shape.
Default is Arabic + RTL. Click the globe button in the header to flip to
English + LTR. Choice persists via `localStorage('aura.lang')`.

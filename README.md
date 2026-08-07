# AURA STUDIO

> من أول حجر… حتى آخر غرفة — فيلم واحد متواصل لمشروعك.
> From the first stone to the last room — one continuous living record.

---

## ✨ Concept

AURA Studio is a single-structure cinematic experience for construction project documentation. The **main preview** (a full-screen, scroll-driven film of the villa build) is the hero and the only primary interface. Everything else lives behind **floating widgets** that open clean white modals.

### Why this structure

- The cinematic preview stays powerful — the user sees the project as one continuous film.
- Complexity is hidden behind well-explained white modals triggered by widgets.
- Only "Our Services" remains visible below the preview — no clutter, no scattered sections.
- The user flow is intentional: **preview → widget click → 2.5s pause → white modal → "View Details"**.

---

## 🚀 Run it locally

100% static — drop on any host.

```bash
cd aether-studio
python3 -m http.server 3000
# open http://localhost:3000
```

Recommended viewport: **1440 × 900** or larger. Mobile-first responsive.

---

## 📁 Repository Structure

```
aether-studio/
├── index.html          # MAIN ENTRY — cinematic preview + widgets + services
├── admin.html          # hidden admin panel (inquiries management)
├── manifest.json       # PWA — installable app (added 2026-08-07)
├── sw.js               # Service Worker — offline film + instant 2nd visit (added 2026-08-07)
├── js/
│   ├── cms.js          # data model + i18n + project store
│   └── supabase.js     # backend client (DB + Storage + fallback)
├── assets/
│   ├── seq/            # 97 exterior scroll frames
│   ├── stages/         # 7 build-stage posters (s1–s7)
│   ├── gallery/        # 56 grouped gallery shots
│   ├── rooms/          # 4 rooms × (shell, finish, complete) + 4 panos + seq (room finish films)
│   ├── icons/          # PWA app icons (192/180/512)
│   ├── villa-clean.png, villa-blueprint.png, villa-wireframe.png
│   └── villa.png, villa-blueprint-alpha.png
├── README.md
├── LICENSE
└── .gitignore
```

**That's it.** No `v3-nextjs/`, no duplicate HTML files, no dev tools, no prompt files. One clean, understandable structure.

---

## 📱 PWA (2026-08-07)

- Installable app (`manifest.json` + service worker `sw.js`)
- The film's 97 frames get cached at runtime → **second visit plays instantly and works offline**
- An install prompt pill appears once (dismissible) when the browser supports it
- App icons: `assets/icons/` (192 / 180 / 512)

---

## 🎬 The Main Preview (`index.html`)

A full-viewport canvas playing 97 frames of the villa build (excavation → foundation → structure → shell → facade → completed → night). Scroll or use the playbar to scrub through time.

### Floating widgets (8 total)

**Left side:**
- 🟡 **Progress** — overall completion %
- 🟡 **Structural** — FEA + integrity
- 🟡 **Materials** — QR-tracked materials
- 🟡 **Schedule** — CPM timeline

**Right side:**
- 🟡 **Cost** — budget variance
- 🟡 **QA** — inspections + safety
- 🟡 **Rooms** — 360° interior tour
- 🟡 **Before/After** — comparison slider

### Widget behavior

1. User clicks a widget
2. Main cinematic pauses for **2.5 seconds**
3. A clean **white modal** opens explaining the feature in Arabic + English
4. Modal contains:
   - Feature icon + eyebrow label
   - Title + subtitle
   - 2-3 sentence description
   - 3 bullet points (what it does)
   - **"View Details"** button (navigates to full dedicated view — coming soon)
   - **"Close"** button

### Project switcher

Top bar with project cards. Currently two demo projects:
- 🟢 **Villa Solara** — completed, 100%, Final Handover
- 🟡 **Villa Nairo** — in progress, 65%, Structural Stage

### Language

- **Arabic + RTL** is the default
- Toggle button in nav switches to **English + LTR**
- Choice persists via `localStorage('aura.lang')`

---

## 🔐 Admin Panel (`admin.html`)

Hidden from regular visitors. Access via:
- **3 clicks on the AURA logo** within 2 seconds (in `index.html`)
- OR **Ctrl + Shift + A** keyboard shortcut
- OR direct URL `/admin.html` (password-protected — the secret is hashed, never displayed; for demo credentials ask the project owner)

### What it manages

- Project list (add / delete / edit / reorder)
- Per-project: stages, sequence, rooms, furniture, widgets, before/after pairs, contact info
- Inquiries from the widget modal forms (filter by status, mark as contacted/closed, export CSV)
- UI settings (glass opacity, blur, accent color, etc.)

---

## 🛠 Tech Stack

- **HTML/CSS/JS** — single-file pages, no framework, no build step
- **Canvas + Image** for the scroll-driven frame sequence
- **localStorage** for CMS persistence (`aura.cms`, `aura.inquiries`, `aura.lang`, `aura.project`)
- **MutationObserver** for i18n of dynamically-inserted content
- **sessionStorage** for the hidden admin gate (`aura.gate.pwd`)

---

## 🌍 Languages

Click the language button in the nav (top-right) to toggle AR ⇄ EN. The whole UI flips, including:
- Hero headline, eyebrow, stage captions
- Widget labels and modal content
- Services section
- Footer

Pair strings like `"Cream bouclé · بوكليه كريمي"` are automatically split by `AURA_I18N.splitPair`.

---

## 🎨 Design System

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0E0E10` | Page background (deep charcoal) |
| `--bg-2` | `#161619` | Elevated surface |
| `--fg` | `#F5F1EA` | Primary text (warm off-white) |
| `--gold` | `#BFA76A` | Accent (refined gold) |
| `--green` | `#6FAD7F` | Status: complete |
| `--border` | `rgba(245,241,234,0.08)` | Subtle dividers |

**Modals are white/light theme** (`#FAFAF7` background, `#1A1A1C` text) — high contrast, soft shadows, clean typography.

---

## 📝 License

Proprietary — AURA Studio. All rights reserved.

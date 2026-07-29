# AETHER STUDIO

> A cinematic architecture studio website — one continuous scroll-driven sequence that follows a luxury villa from excavation to completion, then moves inside, room by room.

Built as a single-file HTML/CSS/JS experience with a built-in CMS, i18n (EN/AR), and an admin panel. No frameworks, no build step, no backend — drop the folder on any static host and it just runs.

---

## ✨ What's inside

### The experience (`index.html`)
- **Exterior scroll sequence** — 97 frames (frame001 → frame097) playing frame-by-frame as you scroll. The villa rises through 7 stages: Excavation → Foundation → Structure → Shell → Facade → Completed → Night View.
- **Explore pill** — at the end of the build, a button floats in; clicking it enters the villa.
- **Interior scroll sequence** — the camera moves through 4 interactive rooms: Living Room, Kitchen, Master Bedroom, Master Bathroom. Each has its own frame sequence, furniture hotspots, finishes panel, and panorama mode.
- **Dashboard cards** — frosted glass panels on both sides show live progress, structural data, materials, schedule, cost, QA/safety. They update as the build advances.
- **Floor plan mode** — top-down plan view with clickable rooms.
- **Panorama mode** — drag-to-look 360° panoramas of each finished room.
- **Furniture hotspots** — click any glowing dot to see brand, materials, dimensions, supplier, and price.

### Standalone pages
- **`hero-loop.html`** — Apple-keynote-style hero loop with an AI Assistant widget. Designed to be used with the included `video-prompt.md` (Runway/Kling/Luma/Veo/Sora) to generate a seamless looping video background.
- **`admin.html`** — full CMS panel. Password: `aura2026`. Edit brand, UI glass/blur/radius, scroll behaviour, playback speed, stages, project metadata, interior rooms, and furniture. Settings save to `localStorage` and apply on the live site.
- **`interior.html`** — redirect stub to `index.html#interior`.
- **`project.html`** — redirect stub to `index.html`.

### Shared logic (`js/cms.js`)
- `AURA_DEFAULTS` — full content model (brand, UI, scroll, playback, sequence, stages, project, interior rooms, furniture).
- `AURA` — config store with deep merge, save/load to `localStorage`, theme application.
- `AURA_I18N` — EN/AR toggle that splits `"English · عربي"` pair strings, hides `.ar`/`.arh`/`.far2` spans in EN, strips Latin siblings in AR, and uses a MutationObserver to localize dynamically-built content.

### Tools
- `tools/shot3.py`, `tools/shot4.py` — Playwright scripts that drive the site through key states and capture screenshots. Useful for QA and for generating social/marketing stills.

---

## 🚀 Run it locally

The site is 100% static. Pick any of these:

```bash
# Option A — Python (already on most systems)
cd aether-studio
python3 -m http.server 3000
# open http://localhost:3000

# Option B — Node
npx serve .

# Option C — just double-click index.html (some features need a server)
```

Recommended viewport: **1440 × 900** or larger. The experience is desktop-first; mobile is functional but compact.

---

## 🎬 Asset map

```
assets/
├── villa.png, villa-clean.png, villa-blueprint.png, villa-wireframe.png   # hero frames
├── seq/                    # 97 exterior scroll frames (frame001…frame097.webp)
│   └── thumbs/             # pre-generated thumbnails for fast scrubbing
├── stages/                 # one poster image per build stage (s1…s7)
├── gallery/                # grouped by stage: excavation, foundation, structure,
│                           # shell, facade, complete, night (8 shots each, full + thumb)
└── rooms/
    ├── plan.png                                # floor plan image (hotspots are CSS-positioned)
    ├── pano-{living,kitchen,master,bath}.webp  # 360° panoramas
    ├── {living,kitchen,master,bath}-{shell,finish,complete}.png  # room state stills
    ├── gallery/                                # 8 angles per room × 4 rooms
    └── seq/{living,kitchen,master,bath}/       # interior scroll frame sequences
```

---

## 🧱 Project model (`js/cms.js` → `AURA_DEFAULTS`)

```js
{
  brand:   { name, accent, tagline },
  ui:      { glassOpacity, blur, radius, glow, animSpeed, theme },
  scroll:  { framesPerScroll, smoothness, reverse, loop, snap, touch, keyboard, sensitivity },
  playback:{ fpsExt, fpsInt, pauseExplore, pauseRoom, autoplay },
  sequence:{ path, prefix, digits, ext, count },
  stages:  [{ id, name, ar, from, to, color, icon, desc }, …7 stages],
  project: { title, location, area, year, status, progress },
  interior:{
    themes: [...9 themes],
    rooms:  [{ id, name, ar, area, height, seq, interactive, plan, adj, finishes, lighting, hvac, acoustic, smart }, …8 rooms],
    furniture: { living:[…4], kitchen:[…3], master:[…3], bath:[…2] }
  }
}
```

The admin panel writes to `localStorage('aura.cms')`. The site reads on every load. Hit **Reset** in the admin to fall back to defaults.

---

## 🌍 Languages

Click the language button in the nav (top-right) to toggle EN ⇄ AR. The whole UI flips, including:
- nav, hero, eyebrow, stage captions
- dashboard card headers and values (`.arh` spans)
- furniture hotspot labels and detail cards (`.far2` spans)
- room finishes / lighting / hvac / acoustic / smart fields

Pair strings like `"Cream bouclé · بوكليه كريمي"` are automatically split by `AURA_I18N.splitPair`.

---

## 🔐 Admin panel

1. Open `admin.html`
2. Password: `aura2026`
3. Edit anything → **Save** → reload `index.html` to see changes

Sections: Dashboard · Brand · UI · Scroll · Playback · Sequence · Stages · Galleries · Interior · Hotspots · Materials · Project · SEO · Analytics.

---

## 🛠 Tech stack

- **HTML/CSS/JS** — single-file pages, no framework, no build step
- **CSS custom properties** for theming (`--blue`, `--glass-a`, `--blur`, `--r`)
- **`backdrop-filter`** for Apple Liquid Glass panels
- **Canvas + Image** for the scroll-driven frame sequence (with `requestAnimationFrame` lerp)
- **localStorage** for CMS persistence
- **MutationObserver** for i18n of dynamically-inserted content
- **Playwright** (in `tools/`) for screenshot automation

---

## 📁 Repository layout

```
aether-studio/
├── index.html          # main cinematic experience (exterior → interior)
├── hero-loop.html      # standalone hero with AI assistant widget
├── admin.html          # CMS admin panel
├── interior.html       # redirect → index.html#interior
├── project.html        # redirect → index.html
├── video-prompt.md     # AI video prompt for hero loop generation
├── js/
│   └── cms.js          # config store + i18n + content model
├── assets/
│   ├── seq/            # 97 exterior frames + thumbs
│   ├── stages/         # 7 build-stage posters
│   ├── gallery/        # 56 grouped gallery shots (full + thumb)
│   └── rooms/          # 4 rooms × (shell, finish, complete) + 4 panos + gallery + seq
└── tools/
    ├── shot3.py        # Playwright: interior walkthrough screenshots
    └── shot4.py        # Playwright: exterior + sections screenshots
```

---

## 📝 License

Proprietary — AETHER STUDIO. All rights reserved.

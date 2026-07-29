# AETHER STUDIO

> A multi-project cinematic architecture studio — every project documented from first stone to last room, with a built-in CMS, i18n (EN/AR), and a full admin panel. No frameworks, no build step, no backend.

---

## ✨ What's new in v2

The site has evolved from a single-project showcase into a **multi-project platform**:

### 🏗 Multi-project architecture
- **Top project bar** — switch between projects with a single click (fade transition, no reload)
- Each project owns its own: brand, UI theme, scroll, playback, sequence, stages, interior, widgets, before/after pairs, contact
- Per-project state stored in `localStorage('aura.cms')` under `projects[]` + `currentProjectId`

### 🪟 Widget → Modal system
- Every dashboard widget (Progress / Structural / Materials / Schedule / Cost / QA) is clickable
- Every services card (Design / Execution / Finishing / Project Management) is clickable
- Click → modal opens with: image gallery, info bullets, contact actions (WhatsApp / Email / Call / Instagram)
- Per-project widget data — fully editable from admin

### 🎚 Before/After slider (4 disciplines)
- One interactive slider with a draggable handle (mouse + touch)
- 4 tabs at the top: `01 Design` / `02 Execution` / `03 Finishing` / `04 Project Management`
- Clicking a tab crossfades to a new pair of images (before / after)
- Per-project: 8 images (4 pairs) — editable from admin

### 🔧 Full admin panel
- **Projects Manager** — add / delete / edit / drag-reorder projects, set default
- **Project Editor** — edit identity, cover, status, progress for the current project
- **Widgets Editor** — for each widget: title (EN/AR), description (EN/AR), gallery (add/remove images), info bullets (EN/AR + detail)
- **Before/After Editor** — 4 rows × (label EN / label AR / before image / after image) + live preview
- **Contact Editor** — company name (EN/AR), phone, WhatsApp, email, Instagram, location
- Plus all the v1 editors: Sequence, Stages, Galleries, Interior (rooms + furniture + themes), Hotspots, Materials, Playback, UI, SEO, Analytics

---

## 🚀 Run it locally

The site is 100% static. Pick any of these:

```bash
# Option A — Python
cd aether-studio
python3 -m http.server 3000
# open http://localhost:3000

# Option B — Node
npx serve .
```

Recommended viewport: **1440 × 900** or larger. Desktop-first; mobile is functional but compact.

---

## 🎬 The experience (`index.html`)

- **Top project bar** — switch projects with a single click
- **Exterior scroll sequence** — 97 frames (frame001 → frame097). Villa rises through 7 stages: Excavation → Foundation → Structure → Shell → Facade → Completed → Night View
- **Explore pill** — appears at the end of the build; click to enter the villa
- **Interior scroll sequence** — camera moves through 4 interactive rooms: Living, Kitchen, Master Bedroom, Master Bathroom. Each has its own frame sequence, furniture hotspots, finishes panel, panorama mode
- **Dashboard widgets** — clickable cards on both sides: Progress / Structural / Materials (left) + Schedule / Cost / QA (right). Click any → opens modal with details + contact
- **Before/After section** — 4 disciplines × 2 images each, draggable handle, tabbed crossfade
- **Floor plan mode** — top-down plan with clickable rooms
- **Panorama mode** — drag-to-look 360° panoramas of each finished room
- **Walkthrough mode** — first-person free-look navigation
- **Furniture hotspots** — click any glowing dot to see brand, materials, dimensions, supplier, price
- **Project stages** — gallery grid + before/after + 360° time scrubber + blueprint overlay per stage

---

## 🎬 Asset map

```
assets/
├── villa.png, villa-clean.png, villa-blueprint.png, villa-wireframe.png   # hero frames
├── seq/                    # 97 exterior scroll frames (frame001…frame097.webp)
│   └── thumbs/             # pre-generated thumbnails
├── stages/                 # one poster per build stage (s1…s7)
├── gallery/                # grouped by stage: excavation, foundation, structure,
│                           # shell, facade, complete, night (8 shots each, full + thumb)
└── rooms/
    ├── plan.png                                # floor plan (hotspots are CSS-positioned)
    ├── pano-{living,kitchen,master,bath}.webp  # 360° panoramas
    ├── {living,kitchen,master,bath}-{shell,finish,complete}.png
    ├── gallery/                                # 8 angles per room × 4 rooms
    └── seq/{living,kitchen,master,bath}/       # interior scroll frame sequences
```

---

## 🧱 Project model (`js/cms.js` → `AURA_DEFAULTS`)

```js
{
  currentProjectId: 'villa-solara',
  projects: [
    {
      id: 'villa-solara',
      cover: 'assets/villa-clean.png',
      status: 'completed',            // 'completed' | 'in-progress' | 'concept'
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
      },
      widgets: {
        design:      { title, titleAr, kicker, desc, descAr, gallery:[], bullets:[] },
        execution:   { ... },
        finishing:   { ... },
        management:  { ... },
        progress:    { ... },   // dashboard widgets
        structural:  { ... },
        materials:   { ... },
        schedule:    { ... },
        cost:        { ... },
        qa:          { ... }
      },
      beforeAfter: [
        { id, label, labelAr, before, after },  // 4 items per project
      ],
      contact: { company, companyAr, phone, whatsapp, email, instagram, location }
    },
    { id: 'villa-nairo', ... }   // more projects
  ]
}
```

The admin panel writes to `localStorage('aura.cms')`. The site reads on every load.

---

## 🌍 Languages

Click the language button in the nav (top-right) to toggle EN ⇄ AR. The whole UI flips, including nav, hero, eyebrow, stage captions, dashboard card headers/values, furniture hotspot labels, room finishes, widget modal content, and before/after labels.

---

## 🔐 Admin panel

1. Open `admin.html`
2. Password: `aura2026`
3. Edit anything → **Save & Publish** → reload `index.html` to see changes

**Sections:**
- **Dashboard** — overview stats and recent activity
- **Projects** — add/delete/reorder/set-default
- **Project** — edit current project identity, cover, status, progress
- **Widgets** — per-widget editor: title, description, gallery, bullets
- **Before/After** — 4 items × 2 images with live preview
- **Sequence** — drag-reorder frames
- **Stages** — rename, recolor, reorder
- **Galleries** — per-stage gallery management
- **Interior** — themes, rooms, furniture, transitions
- **Hotspots** — visual editor: click on room image to add spots, drag to move
- **Materials** — material library
- **Contact** — company, phone, WhatsApp, email, Instagram, location
- **Playback** — fps, pause durations, autoplay toggle, presets
- **UI** — brand, accent color, glass/blur/radius/glow
- **SEO** — meta tags, OG image, sitemap, structured data
- **Analytics** — sessions, completion rate, heatmap

---

## 🛠 Tech stack

- **HTML/CSS/JS** — single-file pages, no framework, no build step
- **CSS custom properties** for theming (`--blue`, `--glass-a`, `--blur`, `--r`)
- **`backdrop-filter`** for Apple Liquid Glass panels
- **Canvas + Image** for the scroll-driven frame sequence (with `requestAnimationFrame` lerp)
- **localStorage** for CMS persistence (per-project data model)
- **MutationObserver** for i18n of dynamically-inserted content
- **Playwright** (in `tools/`) for screenshot automation

---

## 📁 Repository layout

```
aether-studio/
├── index.html          # multi-project cinematic experience
├── hero-loop.html      # standalone hero with AI assistant widget
├── admin.html          # full CMS panel (Projects + Project + Widgets + BA + Contact + ...)
├── interior.html       # redirect → index.html#interior
├── project.html        # redirect → index.html
├── video-prompt.md     # AI video prompt for hero loop generation
├── js/
│   └── cms.js          # multi-project store + i18n + content model
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

MIT — see [LICENSE](LICENSE).

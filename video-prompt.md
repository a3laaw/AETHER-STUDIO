# AURA — Hero Loop · AI Video Generation Prompt
### Companion asset for the scroll-interactive hero page (`index.html`)
Use with: Runway Gen-4 · Kling 2.x · Luma Dream Machine · Veo 3 · Sora
Recommended workflow: **image-to-video** using `assets/villa-clean.png` as the locked first frame, so the architecture never drifts.

---

## 1 · MAIN PROMPT (English — paste as-is)

> Ultra photorealistic 8K architectural visualization, seamless infinite loop, designed as a luxury website hero background. A modern two-story travertine and glass villa floats motionless above a minimalist travertine platform with a thin slice of earth beneath it, suspended in an endless pure white studio void — no horizon, no sky, no ground. **The villa's architecture is locked: identical geometry, facade, proportions, window positions and materials in every single frame. Never redesign, never morph, never add or remove any architectural element.**
>
> Camera: extremely slow, almost imperceptible cinematic float — a subtle 2–3 degree orbit combined with a tiny dolly-in and micro parallax. Perfect stabilization. No zooms, no cuts, no shake. The camera feels alive but calm, like an Apple product film.
>
> Around the still architecture, premium ambient animations loop continuously: thin holographic blueprint lines travel slowly across the facade and fade; a soft cyan laser scanning beam sweeps vertically down the building once and dissolves; faint structural wireframe overlays briefly appear over edges then fade; small glowing construction nodes pulse gently at beam junctions; warm interior LED lighting breathes almost imperceptibly; individual rooms softly illuminate and dim as if a smart home is alive; the infinity pool surface shimmers with slow ray-traced reflections; micro dust particles and tiny light motes drift upward through soft volumetric light; the floating island levitates with a slow 4–6 second vertical bob of only a few centimeters, its soft ambient shadow breathing beneath it; the olive tree's leaves move faintly in invisible wind.
>
> Optional UI pass: ultra-thin frosted Apple Liquid Glass panels float at the left and right edges — rounded corners, soft blur, subtle refraction, elegant sans-serif micro-typography, animated progress rings and tiny graphs — repositioning themselves in an extremely slow drift. Panels never cover the villa.
>
> Style: Apple WWDC keynote film, Apple Liquid Glass, Tesla product reveal, Octane / Unreal Engine 5 / V-Ray quality, path tracing, global illumination, HDR, soft studio lighting, perfect reflections, soft shadows, hyper-detailed, luxury minimal branding.
>
> Loop behavior: first frame equals last frame exactly. No beginning, no ending, no hard resets, no noticeable repetition.

## 2 · NEGATIVE PROMPT

> camera shake, hard cuts, fast movement, zooming, glitches, flicker, morphing architecture, changing windows, extra buildings, redesigned facade, altered proportions, color shifts, cluttered background, sky, clouds, horizon, city, people, cars, text watermarks, sci-fi overload, exaggerated effects, noisy textures, inconsistent geometry, unstable UI, low quality, blur on architecture

## 3 · TECH SETTINGS

| Setting | Value |
|---|---|
| Mode | Image-to-video (first frame = `assets/villa-clean.png`) |
| Duration | 8–10 s, exported as perfect loop (or 5 s + ping-pong) |
| Motion strength | Very low (Runway: 2–3 / Kling: 0.2–0.3) |
| Aspect | 21:9 or 16:9 for hero, crop-safe center |
| FPS | 30, export ProRes/WebM VP9 with alpha not required (white bg) |
| Loop trick | Generate, then crossfade last 12 frames over first 12 in editing, or use "loop" mode where available |

## 4 · الترجمة العربية للبرومبت (للنماذج الداعمة للعربية)

> مشهد معماري فائق الواقعية بدقة 8K، حلقة لا نهائية سلسة، مصمم كخلفية رئيسية لموقع عمارة فاخر. فيلا عصرية من طابقين بواجهات ترافرتين وزجاج تطفو بثبات فوق منصة معلقة في فراغ أبيض نقي لا نهائي — بلا أفق، بلا سماء، بلا أرض. **هندسة الفيلا مقفلة تمامًا: نفس الواجهة والنسب ومواقع النوافذ في كل إطار — ممنوع إعادة التصميم أو التغيير.**
> الكاميرا تتحرك ببطء شديد يكاد لا يُلاحظ: دوران خفيف مع اقتراب طفيف وثبات مثالي. حول المبنى الساكن تعيش أنيميشنات فاخرة: خطوط مخططات هولوغرافية رفيعة تعبر الواجهة، شعاع مسح ليزري يمر عموديًا، هيكل سلكي يظهر ويتلاشى، عقد إنشائية مضيئة تنبض بهدوء، إضاءة داخلية دافئة تتنفس، غرف تضيء وتخفت كمنزل ذكي حي، انعكاسات المسبح تتموج ببطء، جزيئات غبار دقيقة تطفو في إضاءة حجمية ناعمة، والجزيرة تطفو بحركة رأسية بطيئة مع ظل ناعم يتنفس تحتها.
> الأسلوب: عرض Apple WWDC، زجاج سائل، جودة Octane وUnreal Engine 5، إضاءة استوديو ناعمة، فخامة، بساطة، بلا بداية وبلا نهاية — حلقة مثالية.

---
*Asset map: `assets/villa-clean.png` (hero frame) · `assets/villa-wireframe.png` (structure overlay) · `assets/villa-blueprint-alpha.png` (blueprint layer)*

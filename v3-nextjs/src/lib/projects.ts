/**
 * AURA Studio — Project data
 * Two demo projects: Villa Solara (completed) + Villa Nairo (in progress)
 */

export type ProjectStatus = "completed" | "in-progress" | "concept";

export type Project = {
  id: string;
  title: { ar: string; en: string };
  location: { ar: string; en: string };
  cover: string;
  status: ProjectStatus;
  completion: number; // 0-100
  phase: { ar: string; en: string };
  lastUpdate: { ar: string; en: string };
  metrics: {
    quality: { value: string; trend: string };
    issues: { value: string; trend: string };
    budget: { value: string; trend: string };
  };
  stages: Array<{
    id: string;
    name: { ar: string; en: string };
    weeks: { ar: string; en: string };
    status: "complete" | "current" | "upcoming";
    note: { ar: string; en: string };
    image: string;
  }>;
  beforeAfter: Array<{
    id: string;
    label: { ar: string; en: string };
    before: string;
    after: string;
  }>;
};

export const projects: Project[] = [
  {
    id: "villa-solara",
    title: { ar: "فيلا سولارا", en: "Villa Solara" },
    location: { ar: "الكويت — الأحمدي", en: "Kuwait — Al Ahmadi" },
    cover: "/aura/villa-clean.png",
    status: "completed",
    completion: 100,
    phase: { ar: "التسليم النهائي", en: "Final Handover" },
    lastUpdate: { ar: "قبل شهرين", en: "2 months ago" },
    metrics: {
      quality: { value: "98%", trend: "+2%" },
      issues: { value: "0", trend: "مغلقة" },
      budget: { value: "−1.2%", trend: "ضمن الميزانية" },
    },
    stages: [
      {
        id: "excavation",
        name: { ar: "الحفر", en: "Excavation" },
        weeks: { ar: "أسابيع 0–4", en: "Weeks 0–4" },
        status: "complete",
        note: {
          ar: "تحديد الموقع، الحفر حتى مستوى التأسيس، اختبار التربة.",
          en: "Site set-out, excavation to formation level, soil testing.",
        },
        image: "/aura/stages/s1-excavation.png",
      },
      {
        id: "foundation",
        name: { ar: "الأساسات", en: "Foundation" },
        weeks: { ar: "أسابيع 4–12", en: "Weeks 4–12" },
        status: "complete",
        note: {
          ar: "حديد التسليح، صب الخرسانة، العزل المائي.",
          en: "Rebar grids, concrete pour, waterproofing.",
        },
        image: "/aura/stages/s2-foundation.png",
      },
      {
        id: "structure",
        name: { ar: "الهيكل", en: "Structure" },
        weeks: { ar: "أسابيع 12–18", en: "Weeks 12–18" },
        status: "complete",
        note: {
          ar: "أعمدة، جسور، بلاطات — الهيكل الخرساني الرئيسي.",
          en: "Columns, beams, slabs — the concrete skeleton.",
        },
        image: "/aura/stages/s3-structure.png",
      },
      {
        id: "shell",
        name: { ar: "البناء", en: "Shell" },
        weeks: { ar: "أسابيع 18–26", en: "Weeks 18–26" },
        status: "complete",
        note: {
          ar: "مبانٍ طوبية، فتحات النوافذ، إغلاق الهيكل.",
          en: "Blockwork, window openings, weather-tight shell.",
        },
        image: "/aura/stages/s4-shell.png",
      },
      {
        id: "facade",
        name: { ar: "الواجهات", en: "Facade" },
        weeks: { ar: "أسابيع 20–34", en: "Weeks 20–34" },
        status: "complete",
        note: {
          ar: "ترافرتين، زجاج، إطارات برونزية — واجهات فاخرة.",
          en: "Travertine, glazing, bronze frames — luxury facades.",
        },
        image: "/aura/stages/s5-facade.png",
      },
      {
        id: "complete",
        name: { ar: "الإنجاز", en: "Completed" },
        weeks: { ar: "أسابيع 34–50", en: "Weeks 34–50" },
        status: "complete",
        note: {
          ar: "تشطيبات داخلية، تنسيق خارجي، مسبح، إضاءة.",
          en: "Interiors, landscape, pool, lighting.",
        },
        image: "/aura/stages/s7-night.png",
      },
      {
        id: "night",
        name: { ar: "المشهد الليلي", en: "Night View" },
        weeks: { ar: "أسبوع 50+", en: "Week 50+" },
        status: "complete",
        note: {
          ar: "إضاءة المشهد الليلي، التسليم النهائي للعميل.",
          en: "Night lighting scenes, final handover.",
        },
        image: "/aura/stages/s7-night.png",
      },
    ],
    beforeAfter: [
      {
        id: "design",
        label: { ar: "التصميم", en: "Design" },
        before: "/aura/villa-blueprint.png",
        after: "/aura/villa-wireframe.png",
      },
      {
        id: "execution",
        label: { ar: "التنفيذ", en: "Execution" },
        before: "/aura/stages/s3-structure.png",
        after: "/aura/stages/s4-shell.png",
      },
      {
        id: "finishing",
        label: { ar: "التشطيبات", en: "Finishing" },
        before: "/aura/stages/s4-shell.png",
        after: "/aura/stages/s5-facade.png",
      },
      {
        id: "management",
        label: { ar: "إدارة المشاريع", en: "Project Mgmt" },
        before: "/aura/villa-clean.png",
        after: "/aura/stages/s7-night.png",
      },
    ],
  },
  {
    id: "villa-nairo",
    title: { ar: "فيلا نايرو", en: "Villa Nairo" },
    location: { ar: "الكويت — الجابرية", en: "Kuwait — Jabriya" },
    cover: "/aura/stages/s5-facade.png",
    status: "in-progress",
    completion: 65,
    phase: { ar: "الهيكل الإنشائي", en: "Structural Stage" },
    lastUpdate: { ar: "قبل 3 أيام", en: "3 days ago" },
    metrics: {
      quality: { value: "92%", trend: "+1%" },
      issues: { value: "2", trend: "قيد المعالجة" },
      budget: { value: "+0.4%", trend: "ضمن الميزانية" },
    },
    stages: [
      {
        id: "excavation",
        name: { ar: "الحفر", en: "Excavation" },
        weeks: { ar: "أسابيع 0–4", en: "Weeks 0–4" },
        status: "complete",
        note: {
          ar: "اكتمل الحفر واختبار التربة.",
          en: "Excavation and soil testing complete.",
        },
        image: "/aura/stages/s1-excavation.png",
      },
      {
        id: "foundation",
        name: { ar: "الأساسات", en: "Foundation" },
        weeks: { ar: "أسابيع 4–12", en: "Weeks 4–12" },
        status: "complete",
        note: {
          ar: "الأساسات صُبّت وتم معالجتها.",
          en: "Foundation poured and cured.",
        },
        image: "/aura/stages/s2-foundation.png",
      },
      {
        id: "structure",
        name: { ar: "الهيكل", en: "Structure" },
        weeks: { ar: "أسابيع 12–18", en: "Weeks 12–18" },
        status: "current",
        note: {
          ar: "صب البلاطات جارية — 60% من الهيكل اكتمل.",
          en: "Slab pours ongoing — 60% of structure complete.",
        },
        image: "/aura/stages/s3-structure.png",
      },
      {
        id: "shell",
        name: { ar: "البناء", en: "Shell" },
        weeks: { ar: "أسابيع 18–26", en: "Weeks 18–26" },
        status: "upcoming",
        note: {
          ar: "قادمة — تبدأ بعد اكتمال الهيكل.",
          en: "Upcoming — starts after structure completes.",
        },
        image: "/aura/stages/s4-shell.png",
      },
      {
        id: "facade",
        name: { ar: "الواجهات", en: "Facade" },
        weeks: { ar: "أسابيع 20–34", en: "Weeks 20–34" },
        status: "upcoming",
        note: {
          ar: "قادمة — التشطيب يبدأ الربع الثالث 2026.",
          en: "Upcoming — finishing starts Q3 2026.",
        },
        image: "/aura/stages/s5-facade.png",
      },
      {
        id: "complete",
        name: { ar: "الإنجاز", en: "Completed" },
        weeks: { ar: "أسابيع 34–50", en: "Weeks 34–50" },
        status: "upcoming",
        note: {
          ar: "قادمة — التسليم المتوقع Q4 2026.",
          en: "Upcoming — expected handover Q4 2026.",
        },
        image: "/aura/stages/s7-night.png",
      },
      {
        id: "night",
        name: { ar: "المشهد الليلي", en: "Night View" },
        weeks: { ar: "أسبوع 50+", en: "Week 50+" },
        status: "upcoming",
        note: {
          ar: "قادمة — بعد التسليم النهائي.",
          en: "Upcoming — after final handover.",
        },
        image: "/aura/stages/s7-night.png",
      },
    ],
    beforeAfter: [
      {
        id: "design",
        label: { ar: "التصميم", en: "Design" },
        before: "/aura/villa-blueprint.png",
        after: "/aura/villa-wireframe.png",
      },
      {
        id: "execution",
        label: { ar: "التنفيذ", en: "Execution" },
        before: "/aura/stages/s2-foundation.png",
        after: "/aura/stages/s3-structure.png",
      },
      {
        id: "finishing",
        label: { ar: "التشطيبات", en: "Finishing" },
        before: "/aura/stages/s4-shell.png",
        after: "/aura/stages/s5-facade.png",
      },
      {
        id: "management",
        label: { ar: "إدارة المشاريع", en: "Project Mgmt" },
        before: "/aura/villa-clean.png",
        after: "/aura/stages/s7-night.png",
      },
    ],
  },
];

export const defaultProjectId = "villa-solara";

"use client";

import { useState } from "react";
import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { Map, Eye, GitCompare } from "lucide-react";

type Tab = "plan" | "360" | "ba";

export function InteractiveExperience() {
  const { lang } = useLang();
  const [tab, setTab] = useState<Tab>("plan");
  const [baTab, setBaTab] = useState(0);
  const [baPos, setBaPos] = useState(50);

  const baPairs = [
    { before: "/aura/villa-blueprint.png", after: "/aura/villa-wireframe.png" },
    { before: "/aura/stages/s4-shell.png", after: "/aura/stages/s5-facade.png" },
    { before: "/aura/villa-clean.png", after: "/aura/stages/s7-night.png" },
  ];

  const tabs = [
    { id: "plan" as Tab, label: t.interactive.floorPlan, icon: Map, hint: t.interactive.floorPlanHint },
    { id: "360" as Tab, label: t.interactive.tour360, icon: Eye, hint: t.interactive.tourHint },
    { id: "ba" as Tab, label: t.interactive.beforeAfter, icon: GitCompare, hint: t.interactive.baHint },
  ];

  return (
    <section id="interactive" className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--surface)]/40">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.interactive.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4 text-[var(--fg)]">
            {tr(t.interactive.title, lang)}
          </h2>
          <p className="max-w-[640px] mx-auto text-[14px] text-[var(--fg-muted)] leading-relaxed">
            {tr(t.interactive.subtitle, lang)}
          </p>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {tabs.map((tb) => {
            const Icon = tb.icon;
            return (
              <button
                key={tb.id}
                onClick={() => setTab(tb.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[13px] font-semibold transition-all ${
                  tab === tb.id
                    ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 text-[var(--accent-gold)]"
                    : "border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tr(tb.label, lang)}
              </button>
            );
          })}
        </div>

        {/* Active tab content */}
        <div className="surface-card overflow-hidden">
          {/* Hint bar */}
          <div className="px-6 py-3 border-b border-[var(--border)] flex items-center gap-2 text-[12px] text-[var(--fg-muted)]">
            <span className="text-[var(--accent-gold)]">•</span>
            <span>{tr(tabs.find((x) => x.id === tab)!.hint, lang)}</span>
          </div>

          {/* Floor plan */}
          {tab === "plan" && (
            <div className="relative aspect-[16/10] bg-[var(--surface-2)]">
              <img
                src="/aura/rooms/plan.png"
                alt="Floor plan"
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
              {/* Clickable room hotspots */}
              {[
                { id: "living", x: 22, y: 50, label: { ar: "معيشة", en: "Living" } },
                { id: "kitchen", x: 75, y: 60, label: { ar: "مطبخ", en: "Kitchen" } },
                { id: "master", x: 20, y: 18, label: { ar: "رئيسية", en: "Master" } },
                { id: "bath", x: 47, y: 16, label: { ar: "حمام", en: "Bath" } },
              ].map((r) => (
                <button
                  key={r.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${r.x}%`, top: `${r.y}%` }}
                >
                  <span className="block w-3 h-3 rounded-full bg-[var(--accent-gold)] ring-4 ring-[var(--accent-gold)]/20 group-hover:ring-[var(--accent-gold)]/40 transition-all" />
                  <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[var(--accent-gold)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {tr(r.label, lang)}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* 360 tour */}
          {tab === "360" && (
            <div className="relative aspect-[16/10] bg-black overflow-hidden">
              <img
                src="/aura/rooms/pano-living.webp"
                alt="360 panorama"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: "left center" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
              {/* Nav arrows */}
              <button className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-[var(--accent-gold)] hover:text-black transition-colors">
                {lang === "ar" ? "→" : "←"}
              </button>
              <button className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-[var(--accent-gold)] hover:text-black transition-colors">
                {lang === "ar" ? "←" : "→"}
              </button>
              {/* Door hotspot */}
              <div className="absolute top-[55%] left-[50%] -translate-x-1/2 flex flex-col items-center gap-1">
                <button className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur border border-white/25 text-white text-[10px] font-semibold hover:bg-[var(--accent-gold)] hover:text-black transition-colors">
                  {lang === "ar" ? "→ المطبخ" : "→ Kitchen"}
                </button>
              </div>
            </div>
          )}

          {/* Before/After */}
          {tab === "ba" && (
            <div>
              {/* Discipline tabs */}
              <div className="flex justify-center gap-2 p-4 border-b border-[var(--border)]">
                {t.interactive.baTabs.map((bt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setBaTab(i);
                      setBaPos(50);
                    }}
                    className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                      baTab === i
                        ? "bg-[var(--accent-gold)] text-[var(--bg)]"
                        : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                    }`}
                  >
                    {tr(bt, lang)}
                  </button>
                ))}
              </div>
              <div
                className="relative aspect-[16/10] bg-black select-none cursor-ew-resize overflow-hidden"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const p = ((e.clientX - rect.left) / rect.width) * 100;
                  setBaPos(Math.max(2, Math.min(98, p)));
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const p = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
                  setBaPos(Math.max(2, Math.min(98, p)));
                }}
              >
                <img
                  src={baPairs[baTab].after}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <img
                  src={baPairs[baTab].before}
                  alt="Before"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ clipPath: `inset(0 ${100 - baPos}% 0 0)` }}
                />
                {/* Handle */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg"
                  style={{ left: `${baPos}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-[14px] font-bold shadow-xl">
                    ↔
                  </div>
                </div>
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold tracking-wider">
                  {lang === "ar" ? "قبل" : "BEFORE"}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-bold tracking-wider">
                  {lang === "ar" ? "بعد" : "AFTER"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

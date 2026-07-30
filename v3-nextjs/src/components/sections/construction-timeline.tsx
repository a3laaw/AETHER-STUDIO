"use client";

import { useLang } from "@/components/language-provider";
import { useProject } from "@/components/project-provider";
import { t, tr } from "@/lib/i18n";
import { Play, CheckCircle2, Loader2, Circle } from "lucide-react";

export function ConstructionTimeline() {
  const { lang } = useLang();
  const { current } = useProject();

  return (
    <section id="timeline" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.timeline.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-3 text-[var(--fg)]">
            {tr(t.timeline.title, lang)}
          </h2>
          <p className="max-w-[560px] mx-auto text-[13.5px] text-[var(--fg-muted)] leading-relaxed">
            {tr(t.timeline.subtitle, lang)}
          </p>
        </div>

        {/* Detailed stage grid — one card per stage with image, name, weeks, status, note */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {current.stages.map((stage, i) => {
            const StatusIcon =
              stage.status === "complete"
                ? CheckCircle2
                : stage.status === "current"
                ? Loader2
                : Circle;
            const statusColor =
              stage.status === "complete"
                ? "#6FAD7F"
                : stage.status === "current"
                ? "#BFA76A"
                : "#6E7079";
            const statusLabel =
              stage.status === "complete"
                ? lang === "ar"
                  ? "مكتمل"
                  : "Complete"
                : stage.status === "current"
                ? lang === "ar"
                  ? "حالي"
                  : "Current"
                : lang === "ar"
                ? "قادم"
                : "Upcoming";

            return (
              <div
                key={stage.id}
                className="surface-card overflow-hidden group hover:translate-y-[-2px] transition-transform"
              >
                <div className="relative aspect-[4/3] bg-[var(--surface-2)] overflow-hidden">
                  <img
                    src={stage.image}
                    alt={stage.name[lang]}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                      stage.status === "upcoming"
                        ? "opacity-30 grayscale group-hover:opacity-50"
                        : "opacity-80 group-hover:opacity-100 group-hover:scale-105"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 text-[10px] font-bold text-white/90 tracking-wider bg-black/50 px-2 py-0.5 rounded-full">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur border"
                    style={{
                      backgroundColor: `${statusColor}22`,
                      borderColor: `${statusColor}66`,
                    }}
                  >
                    <StatusIcon
                      className={`w-2.5 h-2.5 ${stage.status === "current" ? "animate-spin" : ""}`}
                      style={{ color: statusColor }}
                    />
                    <span
                      className="text-[9.5px] font-bold uppercase tracking-wider"
                      style={{ color: statusColor }}
                    >
                      {statusLabel}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-[10px] text-[var(--accent-gold)] tracking-[0.18em] uppercase mb-1 latin">
                    {stage.weeks[lang]}
                  </div>
                  <h3 className="text-[15px] font-bold text-[var(--fg)] mb-2">
                    {stage.name[lang]}
                  </h3>
                  <p className="text-[11.5px] text-[var(--fg-muted)] leading-relaxed line-clamp-3">
                    {stage.note[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Film button */}
        <div className="text-center">
          <a href="#cta" className="btn-outline gap-2">
            <Play className="w-4 h-4 fill-current text-[var(--accent-gold)]" />
            {tr(t.timeline.filmBtn, lang)}
          </a>
        </div>
      </div>
    </section>
  );
}

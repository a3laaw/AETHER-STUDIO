"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { Play, CheckCircle2 } from "lucide-react";

const stageImages: Record<string, string> = {
  excavation: "/aura/stages/s1-excavation.png",
  foundation: "/aura/stages/s2-foundation.png",
  structure: "/aura/stages/s3-structure.png",
  shell: "/aura/stages/s4-shell.png",
  facade: "/aura/stages/s5-facade.png",
  complete: "/aura/stages/s7-night.png",
  night: "/aura/stages/s7-night.png",
};

export function ConstructionTimeline() {
  const { lang } = useLang();

  return (
    <section id="timeline" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.timeline.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4 text-[var(--fg)]">
            {tr(t.timeline.title, lang)}
          </h2>
          <p className="max-w-[640px] mx-auto text-[14px] text-[var(--fg-muted)] leading-relaxed">
            {tr(t.timeline.subtitle, lang)}
          </p>
        </div>

        {/* Horizontal scroll timeline (desktop) / vertical (mobile) */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[88px] inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4 lg:gap-2">
            {t.timeline.stages.map((stage, i) => (
              <div key={stage.id} className="relative">
                {/* Dot */}
                <div className="hidden lg:flex justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-[var(--accent-gold)] ring-4 ring-[var(--bg)] relative z-10" />
                </div>

                <div className="surface-card overflow-hidden group hover:translate-y-[-2px] transition-transform h-full">
                  {/* Stage image */}
                  <div className="relative aspect-[4/3] bg-[var(--surface-2)] overflow-hidden">
                    <img
                      src={stageImages[stage.id]}
                      alt={tr(stage.name, lang)}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-2 left-2 text-[10px] font-bold text-white/90 tracking-wider">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--green-status)]/20 backdrop-blur border border-[var(--green-status)]/40">
                      <CheckCircle2 className="w-2.5 h-2.5 text-[var(--green-status)]" />
                      <span className="text-[9px] font-bold text-[var(--green-status)]">
                        {tr(stage.status, lang)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="text-[10px] text-[var(--accent-gold)] tracking-[0.18em] uppercase mb-1">
                      {tr(stage.weeks, lang)}
                    </div>
                    <h3 className="text-[15px] font-bold text-[var(--fg)] mb-2">
                      {tr(stage.name, lang)}
                    </h3>
                    <p className="text-[11.5px] text-[var(--fg-muted)] leading-relaxed line-clamp-3">
                      {tr(stage.note, lang)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full film button */}
        <div className="text-center mt-12">
          <button className="btn-outline gap-2">
            <Play className="w-4 h-4 fill-current" />
            {tr(t.timeline.filmBtn, lang)}
          </button>
        </div>
      </div>
    </section>
  );
}

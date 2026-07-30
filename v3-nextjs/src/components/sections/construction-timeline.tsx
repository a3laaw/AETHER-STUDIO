"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { CheckCircle2 } from "lucide-react";

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
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.timeline.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-3 text-[var(--fg)]">
            {tr(t.timeline.title, lang)}
          </h2>
          <p className="max-w-[560px] mx-auto text-[13.5px] text-[var(--fg-muted)] leading-relaxed">
            {tr(t.timeline.subtitle, lang)}
          </p>
        </div>

        {/* SIMPLIFIED horizontal timeline — just a line + dots + labels */}
        <div className="relative">
          {/* The line */}
          <div className="absolute top-5 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-gold)]/40 to-transparent" />

          {/* Stages row */}
          <div className="relative grid grid-cols-7 gap-2">
            {t.timeline.stages.map((stage, i) => (
              <div key={stage.id} className="flex flex-col items-center text-center">
                {/* Dot */}
                <div className="w-10 h-10 rounded-full bg-[var(--bg)] border-2 border-[var(--accent-gold)] flex items-center justify-center mb-3 relative z-10">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-gold)]" />
                </div>

                {/* Stage name + weeks */}
                <div className="text-[12.5px] font-bold text-[var(--fg)] mb-1 leading-tight">
                  {tr(stage.name, lang)}
                </div>
                <div className="text-[10.5px] text-[var(--fg-muted)] latin">
                  {tr(stage.weeks, lang)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Film button — only CTA on this section */}
        <div className="text-center mt-14">
          <a href="#cta" className="btn-outline gap-2">
            <span className="text-[var(--accent-gold)]">▶</span>
            {tr(t.timeline.filmBtn, lang)}
          </a>
        </div>
      </div>
    </section>
  );
}

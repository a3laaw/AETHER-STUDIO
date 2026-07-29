"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { Building2, HardHat, Sofa } from "lucide-react";

const iconMap: Record<string, typeof Building2> = {
  Building2,
  HardHat,
  Sofa,
};

const audienceImgs = [
  "/aura/stages/s7-night.png",
  "/aura/stages/s3-structure.png",
  "/aura/rooms/pano-living.webp",
];

export function WhoItsFor() {
  const { lang } = useLang();

  return (
    <section id="audience" className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--surface)]/40">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.audience.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4 text-[var(--fg)]">
            {tr(t.audience.title, lang)}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.audience.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={i}
                className="surface-card overflow-hidden group hover:translate-y-[-3px] transition-transform"
              >
                {/* Image header */}
                <div className="relative h-44 overflow-hidden bg-[var(--surface-2)]">
                  <img
                    src={audienceImgs[i]}
                    alt={tr(item.title, lang)}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-[var(--surface)]/40 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[var(--bg)]/80 backdrop-blur border border-[var(--accent-gold)]/40 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5 text-[var(--accent-gold)]" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[10px] text-[var(--accent-gold)] tracking-[0.18em] uppercase mb-2">
                    0{i + 1}
                  </div>
                  <h3 className="text-[19px] font-bold text-[var(--fg)] mb-3 leading-tight">
                    {tr(item.title, lang)}
                  </h3>
                  <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
                    {tr(item.desc, lang)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

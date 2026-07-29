"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { Camera, Gauge, Compass, ShieldCheck } from "lucide-react";

const iconMap: Record<string, typeof Camera> = {
  Camera,
  Gauge,
  Compass,
  ShieldCheck,
};

const visuals = [
  "/aura/stages/s3-structure.png",
  "/aura/stages/s5-facade.png",
  "/aura/rooms/pano-living.webp",
  "/aura/stages/s7-night.png",
];

export function PlatformCapabilities() {
  const { lang } = useLang();

  return (
    <section id="platform" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">{tr(t.capabilities.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4 text-[var(--fg)]">
            {tr(t.capabilities.title, lang)}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {t.capabilities.items.map((cap, i) => {
            const Icon = iconMap[cap.icon];
            const img = visuals[i];
            return (
              <div
                key={i}
                className="surface-card overflow-hidden group hover:translate-y-[-2px] transition-transform"
              >
                <div className="grid grid-cols-[1.4fr_1fr] min-h-[220px]">
                  {/* Left: content */}
                  <div className="p-7 flex flex-col">
                    <div className="w-10 h-10 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/8 flex items-center justify-center mb-5">
                      <Icon className="w-4.5 h-4.5 text-[var(--accent-gold)]" />
                    </div>
                    <div className="text-[10px] text-[var(--accent-gold)] tracking-[0.2em] uppercase mb-2">
                      0{i + 1}
                    </div>
                    <h3 className="text-[19px] font-bold mb-3 text-[var(--fg)] leading-tight">
                      {tr(cap.title, lang)}
                    </h3>
                    <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
                      {tr(cap.desc, lang)}
                    </p>
                  </div>
                  {/* Right: visual */}
                  <div className="relative bg-[var(--surface-2)] overflow-hidden">
                    <img
                      src={img}
                      alt={tr(cap.title, lang)}
                      className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { Building2, HardHat, Sofa } from "lucide-react";

const iconMap: Record<string, typeof Building2> = {
  Building2,
  HardHat,
  Sofa,
};

export function WhoItsFor() {
  const { lang } = useLang();

  return (
    <section id="audience" className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--surface)]/40">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.audience.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4 text-[var(--fg)]">
            {tr(t.audience.title, lang)}
          </h2>
        </div>

        {/* Three SHORT cards — no images, just icon + title + one-line desc */}
        <div className="grid md:grid-cols-3 gap-5">
          {t.audience.items.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={i}
                className="surface-card p-7 hover:translate-y-[-3px] transition-transform text-center"
              >
                <div className="w-12 h-12 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/8 flex items-center justify-center mx-auto mb-5">
                  <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
                </div>
                <div className="text-[10px] text-[var(--accent-gold)] tracking-[0.18em] uppercase mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-[18px] font-bold text-[var(--fg)] mb-3 leading-tight">
                  {tr(item.title, lang)}
                </h3>
                <p className="text-[12.5px] text-[var(--fg-muted)] leading-relaxed">
                  {tr(item.desc, lang)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

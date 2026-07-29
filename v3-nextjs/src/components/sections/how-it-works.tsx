"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { Camera, Activity, Compass, Film } from "lucide-react";

const stepIcons = [Camera, Activity, Compass, Film];

export function HowItWorks() {
  const { lang } = useLang();

  return (
    <section id="how" className="relative py-24 lg:py-32 px-6 lg:px-12 bg-[var(--surface)]/40">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="eyebrow mb-4">{tr(t.how.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4 text-[var(--fg)]">
            {tr(t.how.title, lang)}
          </h2>
          <p className="max-w-[640px] mx-auto text-[14px] text-[var(--fg-muted)] leading-relaxed">
            {tr(t.how.subtitle, lang)}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.how.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={i} className="relative surface-card p-7 group">
                {/* Number background */}
                <span
                  className="absolute top-5 opacity-[0.07] num-callout text-[64px] text-[var(--accent-gold)] select-none pointer-events-none"
                  style={lang === "ar" ? { left: "20px" } : { right: "20px" }}
                >
                  {step.num}
                </span>

                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/8 flex items-center justify-center mb-5 group-hover:bg-[var(--accent-gold)]/15 transition-colors">
                    <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
                  </div>

                  <div className="text-[11px] text-[var(--accent-gold)] tracking-[0.18em] uppercase mb-2">
                    {step.num}
                  </div>

                  <h3 className="text-[18px] font-bold text-[var(--fg)] mb-3 leading-tight">
                    {tr(step.title, lang)}
                  </h3>

                  <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">
                    {tr(step.desc, lang)}
                  </p>
                </div>

                {/* Connector arrow (desktop only) */}
                {i < 3 && (
                  <div
                    className="hidden lg:block absolute top-1/2 -translate-y-1/2 text-[var(--accent-gold)]/40"
                    style={lang === "ar" ? { left: "-14px" } : { right: "-14px" }}
                  >
                    {lang === "ar" ? "←" : "→"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

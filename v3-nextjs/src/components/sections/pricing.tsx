"use client";

import { useLang } from "@/components/language-provider";
import { t, tr, trList } from "@/lib/i18n";
import { Check, Sparkles } from "lucide-react";

export function Pricing() {
  const { lang } = useLang();

  return (
    <section id="pricing" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.pricing.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-4 text-[var(--fg)]">
            {tr(t.pricing.title, lang)}
          </h2>
          <p className="max-w-[580px] mx-auto text-[14px] text-[var(--fg-muted)] leading-relaxed">
            {tr(t.pricing.subtitle, lang)}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {t.pricing.tiers.map((tier, i) => (
            <div
              key={i}
              className={`surface-card p-7 relative flex flex-col ${
                tier.highlight ? "border-[var(--accent-gold)]/50 !bg-[var(--accent-gold)]/[0.04]" : ""
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-gold)] text-[var(--bg)] text-[10px] font-bold tracking-wider uppercase">
                  <Sparkles className="w-3 h-3" />
                  {lang === "ar" ? "الأكثر اختياراً" : "Most popular"}
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-[22px] font-bold text-[var(--fg)] mb-1">
                  {tr(tier.name, lang)}
                </h3>
                <p className="text-[12.5px] text-[var(--fg-muted)]">{tr(tier.tagline, lang)}</p>
              </div>

              <div className="mb-6">
                <div className="text-[13px] text-[var(--fg-muted)] mb-1">
                  {tr(tier.price, lang)}
                </div>
                <div className="gold-rule-solid opacity-30 w-12" />
              </div>

              <ul className="space-y-3 mb-7 flex-1">
                {trList(tier.features, lang).map((feat, k) => (
                  <li key={k} className="flex items-start gap-2.5 text-[13px] text-[var(--fg)]/85">
                    <Check
                      className={`w-3.5 h-3.5 mt-1 flex-shrink-0 ${
                        tier.highlight ? "text-[var(--accent-gold)]" : "text-[var(--green-status)]"
                      }`}
                    />
                    <span className="leading-snug">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={tier.highlight ? "btn-gold w-full" : "btn-outline w-full"}
              >
                {tr(tier.cta, lang)}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom row buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-12">
          <a href="#cta" className="btn-gold">
            {tr(t.pricing.pilotBtn, lang)}
          </a>
          <a href="#cta" className="btn-outline">
            {tr(t.pricing.salesBtn, lang)}
          </a>
        </div>
      </div>
    </section>
  );
}

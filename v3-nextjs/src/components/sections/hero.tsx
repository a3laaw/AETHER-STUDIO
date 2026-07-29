"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";

export function Hero() {
  const { lang } = useLang();

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Cinematic background — slow Ken Burns over villa */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 kenburns bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(14,14,16,0.55) 0%, rgba(14,14,16,0.7) 50%, rgba(14,14,16,0.95) 100%), url('/aura/villa-clean.png')",
          }}
        />
        {/* Subtle gold glow */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 30%, rgba(191, 167, 106, 0.12), transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 text-center pt-20 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 mb-8 fade-up">
          <span className="live-dot" />
          <span className="text-[11px] tracking-[0.22em] uppercase text-[var(--accent-gold)] font-semibold">
            {tr(t.hero.badge, lang)}
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.05] font-bold mb-6 fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="block text-[var(--fg)]">{tr(t.hero.title1, lang)}</span>
          <span className="block text-[var(--accent-gold)] mt-1">{tr(t.hero.title2, lang)}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-[clamp(1.1rem,2.4vw,1.6rem)] text-[var(--sand)] mb-4 font-light fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {tr(t.hero.subtitle, lang)}
        </p>

        {/* English mirror */}
        <p
          className="text-[15px] text-[var(--fg-muted)] mb-8 italic font-light fade-up"
          style={{ fontFamily: "var(--font-cormorant)", animationDelay: "0.3s" }}
        >
          {lang === "ar"
            ? "From the first stone to the last room — one continuous living record."
            : "من أول حجر… حتى آخر غرفة — فيلم واحد متواصل لمشروعك."}
        </p>

        {/* Subline */}
        <p
          className="max-w-[680px] mx-auto text-[14.5px] leading-[1.75] text-[var(--fg)]/70 mb-10 fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          {tr(t.hero.subline, lang)}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <a href="#cta" className="btn-gold w-full sm:w-auto">
            {tr(t.hero.primaryCta, lang)}
          </a>
          <a href="#projects" className="btn-outline w-full sm:w-auto">
            {tr(t.hero.secondaryCta, lang)}
          </a>
        </div>

        {/* Trust indicator */}
        <div
          className="flex items-center justify-center gap-3 text-[11.5px] text-[var(--fg-muted)] fade-up"
          style={{ animationDelay: "0.6s" }}
        >
          <span className="gold-rule-solid w-8" />
          <span>{tr(t.hero.trust, lang)}</span>
          <span className="gold-rule-solid w-8" />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg)] pointer-events-none" />

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--fg-muted)]">
        <span className="text-[10px] tracking-[0.3em] uppercase">
          {lang === "ar" ? "اسحب للأسفل" : "Scroll"}
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--accent-gold)] to-transparent" />
      </div>
    </section>
  );
}

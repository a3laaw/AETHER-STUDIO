"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { MapPin, Clock, TrendingUp, AlertCircle } from "lucide-react";

export function LiveProjectProof() {
  const { lang } = useLang();

  return (
    <section id="projects" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1100px] mx-auto">
        {/* Eyebrow + heading */}
        <div className="text-center mb-12">
          <div className="eyebrow mb-4">{tr(t.proof.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-3 text-[var(--fg)]">
            {tr(t.proof.title, lang)}
          </h2>
          <div className="flex items-center justify-center gap-3 text-[13px] text-[var(--fg-muted)] flex-wrap">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {tr(t.proof.location, lang)}
            </span>
            <span className="text-[var(--accent-gold)]">·</span>
            <span className="pill pill-gold !py-1 !px-3">
              <span className="live-dot !w-1.5 !h-1.5" />
              {tr(t.proof.badge, lang)}
            </span>
          </div>
        </div>

        {/* ONE unified progress card */}
        <div className="surface-card p-8 lg:p-12">
          <div className="grid lg:grid-cols-[auto_1fr] gap-10 items-center">
            {/* Left: completion ring */}
            <div className="flex justify-center">
              <div className="relative">
                <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
                  <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(245,241,234,0.06)" strokeWidth="6" />
                  <circle
                    cx="100"
                    cy="100"
                    r="86"
                    fill="none"
                    stroke="url(#goldGrad2)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 86}
                    strokeDashoffset={0}
                  />
                  <defs>
                    <linearGradient id="goldGrad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#BFA76A" />
                      <stop offset="100%" stopColor="#8C7B5B" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="num-callout text-[64px] text-[var(--accent-gold)] leading-none">100</span>
                  <span className="text-[12px] text-[var(--fg-muted)] tracking-[0.18em] uppercase mt-1">
                    {tr(t.proof.completion, lang)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: phase + 3 metrics */}
            <div>
              <div className="mb-6">
                <div className="text-[11px] text-[var(--fg-muted)] tracking-[0.18em] uppercase mb-2">
                  {tr(t.proof.phase, lang)}
                </div>
                <div className="text-[26px] font-bold text-[var(--fg)] mb-1">
                  {lang === "ar" ? "التسليم النهائي" : "Final Handover"}
                </div>
                <div className="text-[12px] text-[var(--fg-muted)] flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {tr(t.proof.lastUpdate, lang)}: {lang === "ar" ? "قبل شهرين" : "2 months ago"}
                </div>
              </div>

              <div className="gold-rule-solid opacity-30 mb-5" />

              {/* Just 3 key metrics */}
              <div className="grid grid-cols-3 gap-4">
                <Metric
                  icon={TrendingUp}
                  label={tr(t.proof.qualityScore, lang)}
                  value="98%"
                  trend="+2%"
                />
                <Metric
                  icon={AlertCircle}
                  label={tr(t.proof.openIssues, lang)}
                  value="0"
                  trend={lang === "ar" ? "مغلقة" : "closed"}
                />
                <Metric
                  icon={TrendingUp}
                  label={tr(t.proof.budgetVariance, lang)}
                  value="−1.2%"
                  trend={lang === "ar" ? "ضمن الميزانية" : "on budget"}
                />
              </div>

              <p className="text-[12px] text-[var(--fg-muted)] leading-relaxed italic mt-6">
                {tr(t.proof.note, lang)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-3 h-3 text-[var(--accent-gold)]" />
        <span className="text-[10px] text-[var(--fg-muted)] tracking-[0.1em] uppercase leading-tight">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="num-callout text-[22px] text-[var(--fg)]">{value}</span>
        <span className="text-[10.5px] font-semibold text-[var(--green-status)]">{trend}</span>
      </div>
    </div>
  );
}

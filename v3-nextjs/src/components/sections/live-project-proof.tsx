"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import { ShieldCheck, Layers, Cpu, Wallet, ClipboardCheck, MapPin, Clock } from "lucide-react";

const insights = [
  { key: "structural" as const, icon: ShieldCheck, value: "99%", status: "OK", color: "#6FAD7F" },
  { key: "materials" as const, icon: Layers, value: "24/24", status: "OK", color: "#6FAD7F" },
  { key: "smart" as const, icon: Cpu, value: "12", status: "Live", color: "#BFA76A" },
  { key: "cost" as const, icon: Wallet, value: "−1.2%", status: "On track", color: "#6FAD7F" },
  { key: "qa" as const, icon: ClipboardCheck, value: "0", status: "Open", color: "#6FAD7F" },
];

const insightLabelMap = {
  structural: t.proof.insightStructural,
  materials: t.proof.insightMaterials,
  smart: t.proof.insightSmart,
  cost: t.proof.insightCost,
  qa: t.proof.insightQA,
};

export function LiveProjectProof() {
  const { lang } = useLang();

  return (
    <section id="projects" className="relative py-24 lg:py-32 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Eyebrow + heading */}
        <div className="text-center mb-14">
          <div className="eyebrow mb-4">{tr(t.proof.eyebrow, lang)}</div>
          <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold mb-3 text-[var(--fg)]">
            {tr(t.proof.title, lang)}
          </h2>
          <div className="flex items-center justify-center gap-3 text-[13px] text-[var(--fg-muted)]">
            <MapPin className="w-3.5 h-3.5" />
            <span>{tr(t.proof.location, lang)}</span>
            <span className="text-[var(--accent-gold)]">·</span>
            <span className="pill pill-gold !py-1 !px-3">
              <span className="live-dot !w-1.5 !h-1.5" />
              {tr(t.proof.badge, lang)}
            </span>
          </div>
        </div>

        {/* Unified progress card */}
        <div className="surface-card p-8 lg:p-10 mb-8">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center">
            {/* Left: completion */}
            <div>
              <div className="flex items-end gap-5 mb-6">
                <div className="relative">
                  <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
                    <circle cx="90" cy="90" r="78" fill="none" stroke="rgba(245,241,234,0.06)" strokeWidth="6" />
                    <circle
                      cx="90"
                      cy="90"
                      r="78"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 78}
                      strokeDashoffset={2 * Math.PI * 78 * (1 - 1)}
                      style={{
                        transition: "stroke-dashoffset 1.5s ease",
                        strokeDashoffset: 2 * Math.PI * 78 * (1 - 1),
                      }}
                    />
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#BFA76A" />
                        <stop offset="100%" stopColor="#8C7B5B" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="num-callout text-[56px] text-[var(--accent-gold)]">100</span>
                    <span className="text-[11px] text-[var(--fg-muted)] tracking-widest">%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-[var(--fg-muted)] tracking-[0.18em] uppercase mb-1">
                    {tr(t.proof.completion, lang)}
                  </div>
                  <div className="text-[24px] font-bold text-[var(--fg)] mb-2">
                    {lang === "ar" ? "التسليم النهائي" : "Final Handover"}
                  </div>
                  <div className="text-[12px] text-[var(--fg-muted)] flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {lang === "ar" ? "قبل شهرين" : "2 months ago"}
                  </div>
                </div>
              </div>
              <div className="gold-rule-solid opacity-30 mb-5" />
              <p className="text-[12.5px] text-[var(--fg-muted)] leading-relaxed italic">
                {tr(t.proof.note, lang)}
              </p>
            </div>

            {/* Right: mini metrics */}
            <div className="grid grid-cols-2 gap-3">
              <Metric label={tr(t.proof.qualityScore, lang)} value="98%" trend="+2%" up />
              <Metric label={tr(t.proof.openIssues, lang)} value="0" trend="−3" up />
              <Metric label={tr(t.proof.budgetVariance, lang)} value="−1.2%" trend="OK" up />
              <Metric label={tr(t.proof.nextMilestone, lang)} value={lang === "ar" ? "تسليم" : "Handover"} trend="✓" up />
            </div>
          </div>
        </div>

        {/* Insight cards row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {insights.map((ins) => {
            const Icon = ins.icon;
            const labelNode = insightLabelMap[ins.key];
            return (
              <div
                key={ins.key}
                className="surface-card p-5 hover:translate-y-[-2px] transition-transform"
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className="w-4 h-4 text-[var(--accent-gold)]" />
                  <span
                    className="text-[10px] font-semibold tracking-wider uppercase"
                    style={{ color: ins.color }}
                  >
                    {ins.status}
                  </span>
                </div>
                <div className="num-callout text-[28px] mb-1 text-[var(--fg)]">{ins.value}</div>
                <div className="text-[11px] text-[var(--fg-muted)] leading-tight">
                  {tr(labelNode, lang)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  trend,
  up,
}: {
  label: string;
  value: string;
  trend: string;
  up?: boolean;
}) {
  return (
    <div className="bg-[var(--surface-2)] rounded-xl p-4 border border-[var(--border)]">
      <div className="text-[10.5px] text-[var(--fg-muted)] tracking-[0.12em] uppercase mb-2 leading-tight">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="num-callout text-[22px] text-[var(--fg)]">{value}</span>
        <span
          className={`text-[11px] font-semibold ${
            up ? "text-[var(--green-status)]" : "text-[var(--cool-gray)]"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}

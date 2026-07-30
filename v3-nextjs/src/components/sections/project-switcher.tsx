"use client";

import { useLang } from "@/components/language-provider";
import { useProject } from "@/components/project-provider";
import { CheckCircle2, Loader2 } from "lucide-react";

export function ProjectSwitcher() {
  const { lang } = useLang();
  const { projects, current, setCurrentId } = useProject();

  return (
    <div className="border-b border-[var(--border)] bg-[var(--surface)]/30 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-3">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="text-[10px] tracking-[0.18em] uppercase text-[var(--fg-muted)] flex-none">
            {lang === "ar" ? "المشاريع" : "Projects"}
          </span>
          <span className="text-[var(--fg-muted)] flex-none">·</span>
          <div className="flex items-center gap-2">
            {projects.map((p) => {
              const isActive = p.id === current.id;
              const statusColor =
                p.status === "completed"
                  ? "#6FAD7F"
                  : p.status === "in-progress"
                  ? "#BFA76A"
                  : "#6E7079";
              const StatusIcon = p.status === "completed" ? CheckCircle2 : Loader2;
              return (
                <button
                  key={p.id}
                  onClick={() => setCurrentId(p.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all flex-none ${
                    isActive
                      ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/10"
                      : "border-[var(--border)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <span
                    className="w-6 h-6 rounded-full bg-cover bg-center flex-none"
                    style={{ backgroundImage: `url(${p.cover})` }}
                  />
                  <span
                    className={`text-[12.5px] font-semibold ${
                      isActive ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"
                    }`}
                  >
                    {p.title[lang]}
                  </span>
                  <span
                    className="flex items-center gap-1 text-[9.5px] font-bold uppercase tracking-wider"
                    style={{ color: statusColor }}
                  >
                    <StatusIcon
                      className={`w-2.5 h-2.5 ${p.status === "in-progress" ? "animate-spin" : ""}`}
                    />
                    {p.status === "completed"
                      ? lang === "ar"
                        ? "مكتمل"
                        : "Done"
                      : lang === "ar"
                      ? "جاري"
                      : "Live"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

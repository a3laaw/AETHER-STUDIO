"use client";

import { useState } from "react";
import { useLang } from "@/components/language-provider";
import { t, tr, trList } from "@/lib/i18n";
import { Send, MessageCircle, Clock3 } from "lucide-react";

export function FinalCTA() {
  const { lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", company: "", projectType: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store inquiry to localStorage (matches the pattern from previous v2)
    if (typeof window !== "undefined") {
      const all = JSON.parse(localStorage.getItem("aura.inquiries") || "[]");
      all.unshift({
        id: "inq-" + Date.now(),
        date: new Date().toISOString(),
        ...form,
        status: "new",
      });
      localStorage.setItem("aura.inquiries", JSON.stringify(all));
    }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", phone: "", company: "", projectType: "" });
  };

  return (
    <section
      id="cta"
      className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden grain-overlay"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/aura/stages/s7-night.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-[var(--bg)]/85 to-[var(--bg)]" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="eyebrow mb-4">{tr(t.finalCta.eyebrow, lang)}</div>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold mb-4 text-[var(--fg)] leading-tight">
              {tr(t.finalCta.title, lang)}
            </h2>
            <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed mb-7">
              {tr(t.finalCta.subtitle, lang)}
            </p>

            <div className="flex items-center gap-2.5 text-[12px] text-[var(--accent-gold)] mb-3">
              <Clock3 className="w-3.5 h-3.5" />
              <span className="font-semibold">{tr(t.finalCta.reply, lang)}</span>
            </div>

            <a
              href="https://wa.me/96522223333"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[13px] text-[var(--fg)] hover:text-[#25D366] transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              {tr(t.finalCta.whatsapp, lang)}
            </a>
          </div>

          {/* Right: form */}
          <div className="surface-card p-7 lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[var(--green-status)]/15 flex items-center justify-center mb-4">
                  <Send className="w-6 h-6 text-[var(--green-status)]" />
                </div>
                <p className="text-[15px] font-semibold text-[var(--fg)] mb-1">
                  {tr(t.finalCta.success, lang)}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-[var(--fg-muted)] tracking-[0.1em] uppercase mb-2">
                      {tr(t.finalCta.name, lang)}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-[13.5px] text-[var(--fg)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                      placeholder={lang === "ar" ? "الاسم الكامل" : "Full name"}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[var(--fg-muted)] tracking-[0.1em] uppercase mb-2">
                      {tr(t.finalCta.phone, lang)}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-[13.5px] text-[var(--fg)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors latin"
                      placeholder="+965 9999 8888"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-[var(--fg-muted)] tracking-[0.1em] uppercase mb-2">
                    {tr(t.finalCta.company, lang)}
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-[13.5px] text-[var(--fg)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                    placeholder={lang === "ar" ? "اسم الشركة" : "Company name"}
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-[var(--fg-muted)] tracking-[0.1em] uppercase mb-2">
                    {tr(t.finalCta.projectType, lang)}
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-[13.5px] text-[var(--fg)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors"
                  >
                    <option value="" className="bg-[var(--surface)]">
                      {lang === "ar" ? "اختر نوع المشروع" : "Select project type"}
                    </option>
                    {trList(t.finalCta.projectTypes, lang).map((pt, i) => (
                      <option key={i} value={pt} className="bg-[var(--surface)]">
                        {pt}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-gold w-full mt-2">
                  <Send className="w-4 h-4" />
                  {tr(t.finalCta.submit, lang)}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

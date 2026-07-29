"use client";

import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

function pickList(items: { ar: string; en: string }[], lang: Lang): string[] {
  return items.map((it) => it[lang]);
}

export function Footer() {
  const { lang } = useLang();
  const productLinks = pickList(t.footer.links.product, lang);
  const companyLinks = pickList(t.footer.links.company, lang);
  const contactLinks = pickList(t.footer.links.contact, lang);

  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--surface)]/30 pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 mb-12">
          {/* Brand block */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="text-[19px] font-bold tracking-[0.18em] text-[var(--fg)]">AURA</span>
              <span className="text-[11px] tracking-[0.28em] text-[var(--accent-gold)] uppercase mt-0.5">
                {lang === "ar" ? "ستوديو" : "Studio"}
              </span>
            </div>
            <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed max-w-xs">
              {tr(t.footer.tagline, lang)}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-[var(--accent-gold)] mb-4 font-semibold">
              {tr(t.footer.product, lang)}
            </h4>
            <ul className="space-y-2.5">
              {productLinks.map((label, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-[13px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-[var(--accent-gold)] mb-4 font-semibold">
              {tr(t.footer.company, lang)}
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((label, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-[13px] text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] tracking-[0.18em] uppercase text-[var(--accent-gold)] mb-4 font-semibold">
              {tr(t.footer.contact, lang)}
            </h4>
            <ul className="space-y-2.5">
              {contactLinks.map((label, i) => (
                <li
                  key={i}
                  className="text-[13px] text-[var(--fg-muted)] latin"
                  dir={label.match(/[\u0600-\u06FF]/) ? "rtl" : "ltr"}
                >
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gold-rule opacity-30 mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[11.5px] text-[var(--fg-muted)]">
          <div>© {new Date().getFullYear()} AURA Studio · {tr(t.footer.rights, lang)}</div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-[var(--accent-gold)] transition-colors">
              {lang === "ar" ? "الخصوصية" : "Privacy"}
            </a>
            <a href="#" className="hover:text-[var(--accent-gold)] transition-colors">
              {lang === "ar" ? "الشروط" : "Terms"}
            </a>
            <span className="flex items-center gap-1.5">
              <span className="live-dot !w-1.5 !h-1.5" />
              {lang === "ar" ? "كل الأنظمة تعمل" : "All systems operational"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { useLang } from "@/components/language-provider";
import { t, tr } from "@/lib/i18n";

export function Header() {
  const { lang, toggle } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 24);
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "projects", label: t.nav.projects },
    { id: "how", label: t.nav.how },
    { id: "platform", label: t.nav.platform },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="text-[19px] font-bold tracking-[0.18em] text-[var(--fg)]">
              AURA
            </span>
            <span className="text-[11px] tracking-[0.28em] text-[var(--accent-gold)] uppercase mt-0.5 hidden sm:inline">
              {lang === "ar" ? "ستوديو" : "Studio"}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[13.5px] text-[var(--fg)]/80 hover:text-[var(--accent-gold)] transition-colors font-medium"
              >
                {tr(item.label, lang)}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={toggle}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--accent-gold)]/10 border border-[var(--accent-gold)]/40 text-[12.5px] font-bold text-[var(--accent-gold)] hover:bg-[var(--accent-gold)]/20 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === "ar" ? "English" : "العربية"}</span>
            </button>

            <a
              href="#cta"
              className="hidden md:inline-flex btn-gold !py-3 !px-6 !text-[14px] !font-bold shadow-[0_8px_24px_-8px_rgba(191,167,106,0.5)]"
            >
              {tr(t.nav.cta, lang)}
            </a>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-[var(--fg)] p-2"
              onClick={() => setOpen((p) => !p)}
              aria-label="Menu"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[var(--bg)] border-t border-[var(--border)]">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] text-[var(--fg)]/90 border-b border-[var(--border)] last:border-0"
              >
                {tr(item.label, lang)}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="btn-gold mt-4 w-full"
            >
              {tr(t.nav.cta, lang)}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

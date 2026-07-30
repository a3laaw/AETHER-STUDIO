"use client";

import { useEffect } from "react";

/**
 * Hidden admin gate — invisible to regular visitors.
 * Triggered by 3 logo clicks within 2 seconds, OR Ctrl+Shift+A keyboard shortcut.
 * Stores the gate signal in sessionStorage, then redirects to /admin.
 */
export function HiddenAdminGate() {
  useEffect(() => {
    let clicks = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const openAdmin = () => {
      sessionStorage.setItem("aura.gate.pwd", "aura2026");
      window.location.href = "/admin";
    };

    const onLogoClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const logo = target.closest("a[href='#top'], .logo, [data-aura-logo]") as HTMLElement | null;
      if (!logo) return;
      clicks++;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => (clicks = 0), 2000);
      if (clicks >= 3) {
        clicks = 0;
        openAdmin();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === "A" || e.key === "a")) {
        e.preventDefault();
        openAdmin();
      }
    };

    document.addEventListener("click", onLogoClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onLogoClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}

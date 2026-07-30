"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Download, LogOut, Lock, Mail, Phone, Building, MessageSquare } from "lucide-react";

type Inquiry = {
  id: string;
  date: string;
  name: string;
  phone: string;
  company?: string;
  projectType?: string;
  msg?: string;
  status: "new" | "contacted" | "closed";
};

type FilterStatus = "all" | "new" | "contacted" | "closed";

const ADMIN_PASSWORD = "aura2026";

function getInitialAuthed(): boolean {
  if (typeof window === "undefined") return false;
  const gate = sessionStorage.getItem("aura.gate.pwd");
  if (gate === ADMIN_PASSWORD) {
    sessionStorage.removeItem("aura.gate.pwd");
    sessionStorage.setItem("aura.session", JSON.stringify({ role: "admin", t: Date.now() }));
    return true;
  }
  return !!sessionStorage.getItem("aura.session");
}

function getInitialInquiries(): Inquiry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("aura.inquiries") || "[]");
  } catch {
    return [];
  }
}

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean>(getInitialAuthed);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [inquiries, setInquiries] = useState<Inquiry[]>(getInitialInquiries);
  const [filter, setFilter] = useState<FilterStatus>("all");

  const login = () => {
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem("aura.session", JSON.stringify({ role: "admin", t: Date.now() }));
      setAuthed(true);
      setErr("");
    } else {
      setErr("كلمة مرور خاطئة · Incorrect password");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("aura.session");
    router.push("/");
  };

  const updateStatus = (id: string, status: Inquiry["status"]) => {
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    setInquiries(updated);
    localStorage.setItem("aura.inquiries", JSON.stringify(updated));
  };

  const remove = (id: string) => {
    if (!confirm("حذف هذا الطلب؟ · Delete this inquiry?")) return;
    const updated = inquiries.filter((i) => i.id !== id);
    setInquiries(updated);
    localStorage.setItem("aura.inquiries", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (!confirm("حذف كل الطلبات؟ · Delete ALL inquiries?")) return;
    setInquiries([]);
    localStorage.setItem("aura.inquiries", "[]");
  };

  const exportCSV = () => {
    if (!inquiries.length) return;
    const header = ["Date", "Name", "Phone", "Company", "ProjectType", "Message", "Status"];
    const rows = inquiries.map((i) => [
      i.date,
      i.name || "",
      i.phone || "",
      i.company || "",
      i.projectType || "",
      (i.msg || "").replace(/"/g, '""'),
      i.status,
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `aura-inquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  // ---------- Login view ----------
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-6">
        <div className="w-full max-w-sm surface-card p-8">
          <div className="text-center mb-6">
            <div className="inline-flex w-12 h-12 rounded-full border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/10 items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-[var(--accent-gold)]" />
            </div>
            <div className="text-[19px] font-bold text-[var(--fg)] mb-1">AURA Admin</div>
            <div className="text-[12px] text-[var(--fg-muted)]">لوحة تحكم الاستفسارات</div>
          </div>
          <label className="block text-[11px] tracking-[0.12em] uppercase text-[var(--fg-muted)] mb-2">
            Password · كلمة المرور
          </label>
          <input
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-[var(--surface-2)] border border-[var(--border)] rounded-lg px-4 py-3 text-[14px] text-[var(--fg)] focus:outline-none focus:border-[var(--accent-gold)] transition-colors mb-3"
            placeholder="••••••••"
            dir="ltr"
            autoFocus
          />
          {err && <div className="text-[12px] text-[var(--destructive)] mb-3">{err}</div>}
          <button onClick={login} className="btn-gold w-full">
            دخول · Sign In
          </button>
          <div className="text-[11px] text-[var(--fg-muted)] text-center mt-4">
            تلميح: <span className="latin">aura2026</span>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Admin dashboard ----------
  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);
  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Top bar */}
      <header className="border-b border-[var(--border)] bg-[var(--surface)]/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[17px] font-bold tracking-[0.16em] text-[var(--fg)]">AURA</span>
              <span className="text-[10px] tracking-[0.2em] text-[var(--accent-gold)] uppercase">Admin</span>
            </div>
            <div className="text-[11.5px] text-[var(--fg-muted)] mt-0.5">
              {inquiries.length} {inquiries.length === 1 ? "طلب" : "طلب"} · {newCount} جديد
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="btn-outline !py-2 !px-4 !text-[12px]">
              ← الموقع
            </a>
            <button onClick={logout} className="btn-outline !py-2 !px-4 !text-[12px] gap-1.5">
              <LogOut className="w-3.5 h-3.5" />
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 py-10">
        {/* Filters + actions */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div className="flex gap-2 flex-wrap">
            {(["all", "new", "contacted", "closed"] as FilterStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                  filter === s
                    ? "bg-[var(--accent-gold)] text-[var(--bg)]"
                    : "border border-[var(--border)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--border-strong)]"
                }`}
              >
                {s === "all"
                  ? "الكل"
                  : s === "new"
                  ? "جديد"
                  : s === "contacted"
                  ? "تم التواصل"
                  : "مغلق"}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={exportCSV}
              className="btn-outline !py-2 !px-4 !text-[12px] gap-1.5"
              disabled={!inquiries.length}
            >
              <Download className="w-3.5 h-3.5" />
              تصدير CSV
            </button>
            <button
              onClick={clearAll}
              className="btn-outline !py-2 !px-4 !text-[12px] gap-1.5 !text-[var(--destructive)] !border-[var(--destructive)]/40 hover:!bg-[var(--destructive)]/10"
              disabled={!inquiries.length}
            >
              <Trash2 className="w-3.5 h-3.5" />
              حذف الكل
            </button>
          </div>
        </div>

        {/* Inquiries list */}
        {filtered.length === 0 ? (
          <div className="surface-card p-12 text-center">
            <div className="text-[var(--fg-muted)] text-[14px]">
              {inquiries.length === 0
                ? "لا توجد طلبات بعد · No inquiries yet"
                : "لا توجد طلبات بهذه الحالة · No inquiries with this status"}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((inq) => (
              <div key={inq.id} className="surface-card p-5">
                <div className="grid md:grid-cols-[auto_1fr_1fr_auto] gap-4 items-start">
                  {/* Date + status */}
                  <div>
                    <div className="text-[11px] text-[var(--fg-muted)] latin mb-1.5">
                      {new Date(inq.date).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                    <span
                      className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        inq.status === "new"
                          ? "bg-[var(--accent-gold)]/15 text-[var(--accent-gold)]"
                          : inq.status === "contacted"
                          ? "bg-[#3c82f6]/15 text-[#3c82f6]"
                          : "bg-[var(--green-status)]/15 text-[var(--green-status)]"
                      }`}
                    >
                      {inq.status === "new"
                        ? "جديد"
                        : inq.status === "contacted"
                        ? "تم التواصل"
                        : "مغلق"}
                    </span>
                  </div>

                  {/* Contact info */}
                  <div>
                    <div className="flex items-center gap-1.5 text-[14px] font-bold text-[var(--fg)] mb-1.5">
                      <Mail className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
                      {inq.name}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12.5px] text-[var(--fg-muted)] mb-1 latin">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${inq.phone}`} className="hover:text-[var(--accent-gold)]">
                        {inq.phone}
                      </a>
                    </div>
                    {inq.company && (
                      <div className="flex items-center gap-1.5 text-[12px] text-[var(--fg-muted)]">
                        <Building className="w-3 h-3" />
                        {inq.company}
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    {inq.projectType && (
                      <div className="text-[11px] text-[var(--accent-gold)] mb-1.5 font-semibold">
                        {inq.projectType}
                      </div>
                    )}
                    {inq.msg && (
                      <div className="flex items-start gap-1.5 text-[12.5px] text-[var(--fg-muted)] leading-relaxed">
                        <MessageSquare className="w-3 h-3 mt-0.5 flex-none" />
                        <span>{inq.msg}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-1.5 min-w-[140px]">
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-outline !py-1.5 !px-3 !text-[11px] gap-1.5 !border-[#25D366]/40 !text-[#25D366] hover:!bg-[#25D366] hover:!text-white hover:!border-[#25D366]"
                    >
                      WhatsApp
                    </a>
                    {inq.status !== "contacted" && (
                      <button
                        onClick={() => updateStatus(inq.id, "contacted")}
                        className="btn-outline !py-1.5 !px-3 !text-[11px]"
                      >
                        تم التواصل
                      </button>
                    )}
                    {inq.status !== "closed" && (
                      <button
                        onClick={() => updateStatus(inq.id, "closed")}
                        className="btn-outline !py-1.5 !px-3 !text-[11px]"
                      >
                        إغلاق
                      </button>
                    )}
                    <button
                      onClick={() => remove(inq.id)}
                      className="btn-outline !py-1.5 !px-3 !text-[11px] !text-[var(--destructive)] !border-[var(--destructive)]/30 hover:!bg-[var(--destructive)]/10"
                    >
                      <Trash2 className="w-3 h-3 inline" /> حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

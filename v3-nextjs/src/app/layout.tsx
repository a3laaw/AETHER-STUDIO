import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Tajawal, Reem_Kufi } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/components/language-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const reemKufi = Reem_Kufi({
  variable: "--font-reem-kufi",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURA Studio — من أول حجر… حتى آخر غرفة",
  description:
    "منصة واحدة تجمع التوثيق البصري الحي، لوحات التحكم الذكية، والجولات التفاعلية لشركات التطوير والمقاولات والتشطيبات. From the first stone to the last room — one continuous living record.",
  keywords: [
    "AURA Studio",
    "construction documentation",
    "project control",
    "real estate tech",
    "Gulf construction",
    "توثيق مشاريع",
    "مقاولات",
    "تشطيبات",
  ],
  authors: [{ name: "AURA Studio" }],
  openGraph: {
    title: "AURA Studio — One Continuous Build",
    description:
      "From the first stone to the last room — one continuous living record of your construction project.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA Studio",
    description: "One Continuous Build — cinematic project documentation platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${cormorant.variable} ${tajawal.variable} ${reemKufi.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster />
      </body>
    </html>
  );
}

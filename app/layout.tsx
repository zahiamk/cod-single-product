import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "لُعَبِي — لعبة الأرقام الخشبية التعليمية",
  description: "لعبة أرقام خشبية تعليمية للأطفال من 1 إلى 20 مع الدفع عند الاستلام."
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
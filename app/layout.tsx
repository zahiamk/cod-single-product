import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maison — Single Product COD Store",
  description: "One-product cash-on-delivery landing page."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body>{children}</body></html>;
}

import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Lafontant Learning Platform",
  description: "Adaptive English and French learning platform."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <div className="shell">
          <AppHeader />
          {children}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import "./auth-module.css";
import { AppHeader } from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "Lafontant Learning Platform",
  description: "Plataforma progresiva para aprender inglés y francés."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
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

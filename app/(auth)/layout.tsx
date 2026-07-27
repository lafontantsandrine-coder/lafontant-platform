import type { ReactNode } from 'react';
import AuthHero from '@/components/auth/AuthHero';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <AuthHero />

      <section className="flex min-h-screen items-center justify-center">
        {children}
      </section>
    </main>
  );
}

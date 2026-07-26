import AuthHero from '@/components/auth/AuthHero';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
      <AuthHero />
      <LoginForm />
    </main>
  );
}

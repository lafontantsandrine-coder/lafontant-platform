'use client';

import { useState } from 'react';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import AuthCard from '@/components/auth/AuthCard';
import SocialButtons from '@/components/auth/SocialButtons';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthCard
      stepLabel="Bienvenido de nuevo"
      title="Continúa aprendiendo."
      description="Ingresa a tu cuenta para retomar tu progreso."
    >
      <form className="flex w-full flex-col gap-5">
        {/* Email field */}
        <Input
          id="email"
          type="email"
          label="Correo electrónico"
          placeholder="nombre@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          fullWidth
        />

        {/* Password field */}
        <Input
          id="password"
          type="password"
          label="Contraseña"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          fullWidth
        />

        {/* Forgot password link */}
        <div className="-mt-1 text-right">
          <a
            href="/auth/forgot-password"
            className="text-xs font-bold text-indigo-600 hover:opacity-80 transition"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {/* Login button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
        >
          Iniciar sesión →
        </Button>
      </form>

      {/* Social buttons */}
      <div className="mt-6">
        <SocialButtons dividerText="o">
          <Button
            type="button"
            variant="outline"
            fullWidth
          >
            Continuar con Google
          </Button>
        </SocialButtons>
      </div>

      {/* Meta text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        ¿Aún no tienes cuenta?{' '}
        <a
          href="/auth/register"
          className="font-bold text-indigo-600 hover:opacity-80 transition"
        >
          Comienza gratis
        </a>
      </div>
    </AuthCard>
  );
}

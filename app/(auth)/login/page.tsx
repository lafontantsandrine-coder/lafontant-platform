"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { getRoleHome, type AppRole } from "@/lib/auth/role-home";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(typeof data.error === "string" ? data.error : "No pudimos iniciar sesión.");
      setLoading(false);
      return;
    }

    router.push(getRoleHome(data.user.role as AppRole));
    router.refresh();
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <span className="badge">Bienvenida de nuevo</span>
        <h1>Inicia sesión</h1>
        <p className="muted">Continúa aprendiendo desde donde te quedaste.</p>

        <form className="form" onSubmit={submit}>
          <div className="field">
            <label>Correo electrónico</label>
            <input name="email" type="email" autoComplete="email" required />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input name="password" type="password" autoComplete="current-password" required minLength={8} />
          </div>

          <div className="auth-row">
            <Link href="/forgot-password">¿Olvidaste tu contraseña?</Link>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Aún no tienes cuenta? <Link href="/register">Crear cuenta</Link>
        </p>
      </section>
    </main>
  );
}

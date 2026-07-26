"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmation = String(form.get("confirmation") || "");

    if (password !== confirmation) {
      setError("Las contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(typeof data.error === "string" ? data.error : "No pudimos crear la cuenta.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-hero">
          <div className="auth-illustration" aria-hidden="true">
            <div className="orb orb-one" />
            <div className="orb orb-two" />
            <svg viewBox="0 0 320 220" className="illustration-svg" role="img">
              <rect x="46" y="44" width="228" height="132" rx="24" className="illustration-card" />
              <path d="M84 126c26-38 75-58 120-36 14 7 26 20 35 36" className="illustration-line" />
              <circle cx="116" cy="106" r="18" className="illustration-dot" />
              <circle cx="192" cy="96" r="12" className="illustration-dot secondary" />
              <path d="M98 152h124" className="illustration-line thin" />
            </svg>
          </div>

          <div className="auth-brand" aria-label="Lafontant">
            <div className="brand-mark">
              <span className="brand-mark-inner">L</span>
            </div>
            <div>
              <p className="brand-name">Lafontant</p>
              <span className="brand-tag">Aprende con claridad y estilo</span>
            </div>
          </div>
        </div>

        <div className="auth-head">
          <span className="badge">7 días de prueba</span>
          <h1>Crea tu cuenta</h1>
          <p className="muted intro-copy">Empieza tu camino con una experiencia de aprendizaje moderna y elegante.</p>
        </div>

        <div className="social-stack" aria-label="Registro social">
          <button className="social-btn" type="button">
            <span className="social-icon google" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M21.6 12.23c0-.72-.06-1.41-.18-2.07H12v3.92h5.4a4.61 4.61 0 0 1-2 3.03v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.38Z" fill="#4285F4" />
                <path d="M12 22c2.7 0 4.96-.9 6.62-2.43l-3.24-2.5c-.9.6-2.04.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.58A10 10 0 0 0 12 22Z" fill="#34A853" />
                <path d="M6.41 13.91A5.98 5.98 0 0 1 6.41 8.9V6.32H3.07a10 10 0 0 0 0 14.18l3.34-2.59Z" fill="#FBBC05" />
                <path d="M12 6.04c1.47 0 2.79.5 3.83 1.48l2.87-2.87A9.96 9.96 0 0 0 12 2a10 10 0 0 0-8.93 5.32l3.34 2.58C7.2 7.8 9.4 6.04 12 6.04Z" fill="#EA4335" />
              </svg>
            </span>
            Continuar con Google
          </button>
          <button className="social-btn" type="button">
            <span className="social-icon microsoft" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="8" height="8" rx="1" fill="#F25022" />
                <rect x="13" y="3" width="8" height="8" rx="1" fill="#7FBA00" />
                <rect x="3" y="13" width="8" height="8" rx="1" fill="#00A4EF" />
                <rect x="13" y="13" width="8" height="8" rx="1" fill="#FFB900" />
              </svg>
            </span>
            Continuar con Microsoft
          </button>
          <button className="social-btn" type="button">
            <span className="social-icon apple" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M16.5 13.2c-.03-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.64-1.72-3.21-1.74-1.37-.14-2.67.8-3.37.8-.7 0-1.78-.78-2.93-.76-1.5.02-2.9.88-3.68 2.22-1.57 2.72-.4 6.74 1.12 8.95.74 1.08 1.63 2.29 2.8 2.25 1.12-.04 1.54-.72 2.9-.72 1.35 0 1.74.72 2.92.69 1.21-.02 1.98-1.09 2.71-2.18.86-1.24 1.21-2.45 1.23-2.51-.03-.01-2.35-.9-2.37-3.6Z" fill="currentColor" />
                <path d="M14.7 4.34c.58-.7 1-.16 1.59-.7-.91-1.02-2.1-1.64-3.23-1.66-.58.01-.98.1-1.44.24.53.72 1.43 1.25 2.08 1.4.1 0 .18.01 .27.01Z" fill="currentColor" />
              </svg>
            </span>
            Continuar con Apple
          </button>
        </div>

        <div className="divider">
          <span />
          <p>o crea una cuenta con tu correo</p>
          <span />
        </div>

        <form className="form" onSubmit={submit}>
          <div className="field">
            <label>Nombre</label>
            <div className="input-shell">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.3 0-6 1.8-6 4v1h12v-1c0-2.2-2.7-4-6-4Z" />
              </svg>
              <input name="name" autoComplete="name" required minLength={2} />
            </div>
          </div>

          <div className="field">
            <label>Correo electrónico</label>
            <div className="input-shell">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2 8 5 8-5" />
              </svg>
              <input name="email" type="email" autoComplete="email" required />
            </div>
          </div>

          <div className="field">
            <label>Contraseña</label>
            <div className="input-shell">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm2 0h6V8a3 3 0 0 0-6 0Z" />
              </svg>
              <input
                name="password"
                type="password"
                minLength={8}
                required
                pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
                title="Usa al menos 8 caracteres, una mayúscula y un número"
                autoComplete="new-password"
              />
            </div>
            <div className="password-strength">
              <div className="password-strength-bar">
                <span className="password-strength-fill" />
              </div>
              <p>Fortaleza: <span>Segura</span></p>
            </div>
            <div className="password-requirements">
              <span className="requirement is-length">8+ caracteres</span>
              <span className="requirement is-uppercase">1 mayúscula</span>
              <span className="requirement is-number">1 número</span>
            </div>
          </div>

          <div className="field">
            <label>Confirmar contraseña</label>
            <div className="input-shell">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Zm2 0h6V8a3 3 0 0 0-6 0Z" />
              </svg>
              <input name="confirmation" type="password" minLength={8} required autoComplete="new-password" />
            </div>
          </div>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>Acepto términos y condiciones</span>
          </label>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>Deseo recibir promociones y novedades</span>
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button className="btn btn-primary auth-submit" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link href="/login">Iniciar sesión</Link>
        </p>
      </section>
    </main>
  );
}

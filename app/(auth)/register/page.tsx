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
        <span className="badge">7 días de prueba</span>
        <h1>Crea tu cuenta</h1>
        <p className="muted">Empieza como estudiante y descubre la plataforma.</p>

        <form className="form" onSubmit={submit}>
          <div className="field">
            <label>Nombre</label>
            <input name="name" autoComplete="name" required minLength={2} />
          </div>

          <div className="field">
            <label>Correo electrónico</label>
            <input name="email" type="email" autoComplete="email" required />
          </div>

          <div className="field">
            <label>Contraseña</label>
            <input name="password" type="password" minLength={8} required />
          </div>

          <div className="field">
            <label>Confirmar contraseña</label>
            <input name="confirmation" type="password" minLength={8} required />
          </div>

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

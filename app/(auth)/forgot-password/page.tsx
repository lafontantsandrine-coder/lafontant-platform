"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = new FormData(event.currentTarget);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") })
    });

    setLoading(false);
    setSent(true);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Recuperar contraseña</h1>

        {sent ? (
          <>
            <p>
              Si existe una cuenta con ese correo, enviaremos las instrucciones
              cuando el servicio de correo quede activado.
            </p>
            <Link className="btn btn-primary auth-submit" href="/login">
              Volver al login
            </Link>
          </>
        ) : (
          <form className="form" onSubmit={submit}>
            <p className="muted">Escribe el correo asociado con tu cuenta.</p>

            <div className="field">
              <label>Correo electrónico</label>
              <input name="email" type="email" required />
            </div>

            <button className="btn btn-primary auth-submit" disabled={loading}>
              {loading ? "Procesando..." : "Enviar instrucciones"}
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

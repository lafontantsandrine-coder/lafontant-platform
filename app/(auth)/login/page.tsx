
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password")
      })
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Could not sign in.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="container" style={{ maxWidth: 520 }}>
      <section className="card">
        <h1>Login</h1>
        <form className="form" onSubmit={submit}>
          <div className="field"><label>Email</label><input name="email" type="email" required /></div>
          <div className="field"><label>Password</label><input name="password" type="password" required minLength={8} /></div>
          {error && <p style={{ color: "#b4233d" }}>{error}</p>}
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
      </section>
    </main>
  );
}


"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password")
      })
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Could not register.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="container" style={{ maxWidth: 520 }}>
      <section className="card">
        <h1>Create account</h1>
        <form className="form" onSubmit={submit}>
          <div className="field"><label>Name</label><input name="name" required /></div>
          <div className="field"><label>Email</label><input name="email" type="email" required /></div>
          <div className="field"><label>Password</label><input name="password" type="password" minLength={8} required /></div>
          {error && <p style={{ color: "#b4233d" }}>{error}</p>}
          <button className="btn btn-primary" type="submit">Register</button>
        </form>
      </section>
    </main>
  );
}

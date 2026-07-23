
"use client";

import { useState } from "react";

const plans = [
  { id: "trial", title: "7-day trial", price: "$0" },
  { id: "monthly", title: "Monthly", price: "$19" },
  { id: "annual", title: "Annual", price: "$190" }
] as const;

export default function BillingPage() {
  const [loading, setLoading] = useState("");

  async function checkout(plan: string) {
    setLoading(plan);
    const response = await fetch("/api/billing/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan })
    });
    const data = await response.json();
    setLoading("");
    if (data.url) window.location.href = data.url;
    else alert(data.message || data.error || "Checkout unavailable.");
  }

  return (
    <main className="container">
      <h1>Plans</h1>
      <section className="grid">
        {plans.map((plan) => (
          <article className="card" key={plan.id}>
            <h3>{plan.title}</h3>
            <div style={{ fontSize: 36, fontWeight: 900 }}>{plan.price}</div>
            <button className="btn btn-primary" onClick={() => checkout(plan.id)}>
              {loading === plan.id ? "Loading..." : "Choose plan"}
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

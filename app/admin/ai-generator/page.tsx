
"use client";

import { useState } from "react";

export default function AIGeneratorPage() {
  const [unit, setUnit] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generate(form: FormData) {
    setLoading(true);
    const response = await fetch("/api/ai/unit-generator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language: form.get("language"),
        level: form.get("level"),
        theme: form.get("theme"),
        grammarTarget: form.get("grammarTarget"),
        learnerAge: form.get("learnerAge")
      })
    });
    const data = await response.json();
    setUnit(data.unit || null);
    setLoading(false);
  }

  return (
    <main className="container">
      <h1>AI Unit Generator</h1>
      <form className="card form" action={generate}>
        <div className="field"><label>Language</label><select name="language"><option>English</option><option>French</option></select></div>
        <div className="field"><label>CEFR level</label><select name="level"><option>A1</option><option>A2</option><option>B1</option><option>B2</option></select></div>
        <div className="field"><label>Theme</label><input name="theme" required placeholder="Travel" /></div>
        <div className="field"><label>Grammar target</label><input name="grammarTarget" required placeholder="Present Perfect" /></div>
        <div className="field"><label>Learners</label><select name="learnerAge"><option value="adults">Adults</option><option value="teens">Teens</option><option value="children">Children</option></select></div>
        <button className="btn btn-primary" disabled={loading}>{loading ? "Generating..." : "Generate unit"}</button>
      </form>

      {unit && (
        <section className="card" style={{ marginTop: 18 }}>
          <h2>{unit.title}</h2>
          <p>{unit.subtitle}</p>
          <h3>Vocabulary</h3>
          <ol>{unit.vocabulary.map((item: any) => <li key={item.term}>{item.term} — {item.definition}</li>)}</ol>
          <details><summary>View complete JSON</summary><pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(unit, null, 2)}</pre></details>
        </section>
      )}
    </main>
  );
}

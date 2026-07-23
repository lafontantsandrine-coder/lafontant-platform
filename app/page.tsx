
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <span className="badge">Modern platform starter</span>
        <h1>Language learning built around real life.</h1>
        <p>
          Study vocabulary, grammar, listening, reading, speaking and writing
          through one reusable lesson engine.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          <Link className="btn btn-primary" href="/dashboard">Open dashboard</Link>
          <Link className="btn btn-light" href="/courses">Explore courses</Link>
        </div>
      </section>
      <section className="grid">
        <article className="card"><h3>Reusable lessons</h3><p className="muted">One engine for every language, level and unit.</p></article>
        <article className="card"><h3>Natural audio ready</h3><p className="muted">Upload SuitBlaster MP3 files without changing the interface.</p></article>
        <article className="card"><h3>Admin foundation</h3><p className="muted">Create units and prepare them for database storage.</p></article>
      </section>
    </main>
  );
}

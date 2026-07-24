import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <span className="badge">Versión 1.1.1</span>
        <h1>El idioma se adapta a tu vida, no al revés.</h1>
        <p>
          Aprende inglés y francés con lecciones progresivas, audio natural,
          práctica interactiva y retroalimentación personalizada.
        </p>

        <div className="hero-actions">
          <Link className="btn btn-primary" href="/register">Comenzar prueba gratis</Link>
          <Link className="btn btn-light" href="/login">Iniciar sesión</Link>
        </div>
      </section>

      <section className="grid">
        <article className="card"><h3>Aprendizaje progresivo</h3><p className="muted">Continúa desde tu última actividad.</p></article>
        <article className="card"><h3>Audio natural</h3><p className="muted">Preparado para audios creados con SuitBlaster.</p></article>
        <article className="card"><h3>Práctica con IA</h3><p className="muted">Speaking y Writing con retroalimentación.</p></article>
      </section>
    </main>
  );
}

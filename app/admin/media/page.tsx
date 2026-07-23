
export default function AdminMediaPage() {
  return (
    <main className="container">
      <h1>Media library</h1>
      <section className="grid">
        <article className="card"><h3>Audio</h3><input type="file" accept="audio/*" multiple /></article>
        <article className="card"><h3>Images</h3><input type="file" accept="image/*" multiple /></article>
      </section>
      <p className="muted">Uploads will become persistent after storage integration.</p>
    </main>
  );
}

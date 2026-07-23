
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="sidebar-layout">
      <aside className="sidebar">
        <Link href="/admin">Overview</Link>
        <Link href="/admin/units">Units</Link>
        <Link href="/admin/media">Media</Link>
        <Link href="/admin/ai-generator">AI Generator</Link>
      </aside>
      <main className="container">
        <h1>Admin dashboard</h1>
        <section className="grid">
          <article className="card"><h3>Courses</h3><p className="muted">Manage languages, levels and units.</p></article>
          <article className="card"><h3>Students</h3><p className="muted">Progress and activity foundation.</p></article>
          <article className="card"><h3>Media</h3><p className="muted">Natural audio and lesson images.</p></article>
        </section>
      </main>
    </div>
  );
}

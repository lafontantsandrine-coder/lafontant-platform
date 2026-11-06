import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function VocabularyLabPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <main className="container" style={{ maxWidth: 1080, margin: "0 auto", padding: 22 }}>
      <header style={{ marginBottom: 20 }}>
        <p style={{ color: "#2170b2", fontWeight: 800, letterSpacing: 1 }}>LAFONTANT LANGUAGES · LABORATORIOS</p>
        <h1 style={{ color: "#14569b", fontSize: "clamp(28px,4vw,42px)" }}>🎮 Vocabulary Lab</h1>
        <p>Practica vocabulario con juegos interactivos en inglés y francés.</p>
      </header>
      <section className="grid">
        <article className="card" style={{ padding: 22, borderRadius: 20 }}>
          <span style={{ fontSize: 44 }} aria-hidden="true">🔎</span>
          <h2>Word Search Adventure</h2>
          <p>Encuentra 20 palabras en una sopa de letras. Elige inglés o francés y tu nivel A1–C1.</p>
          <p style={{ color: "#536e83" }}>Guarda la partida en este navegador y registra el resultado al completarla.</p>
          <Link className="btn btn-primary" href="/vocabulary-lab/word-search">▶ Abrir Sopa de Letras</Link>
          <Link className="btn" href="/vocabulary-lab/word-search?lang=fr" style={{ marginLeft: 12 }}>🇫🇷 Français · Chasse aux mots</Link>
          <Link className="btn" href="/vocabulary-lab/results" style={{ marginLeft: 12 }}>📊 Mis resultados</Link>
        </article>
      </section>
      <p style={{ color: "#6b7f95", marginTop: 18 }}>Los demás juegos se incorporarán aquí cuando hayan pasado su revisión individual.</p>
    </main>
  );
}

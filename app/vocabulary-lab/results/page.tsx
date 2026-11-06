import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

function details(raw: string | null) {
  try {
    const value = JSON.parse(raw ?? "{}");
    return {
      language: value.language === "fr" ? "Francés" : value.language === "es" ? "Español" : "Inglés",
      level: ["A1", "A2", "B1", "B2", "C1"].includes(value.level) ? value.level : "—",
      seconds: Number.isFinite(value.seconds) ? Math.max(0, Math.trunc(value.seconds)) : 0,
      hints: Number.isFinite(value.hints) ? Math.max(0, Math.trunc(value.hints)) : 0,
      found: Number.isFinite(value.found) ? Math.min(20, Math.max(0, Math.trunc(value.found))) : 0
    };
  } catch {
    return { language: "—", level: "—", seconds: 0, hints: 0, found: 0 };
  }
}
function elapsed(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + ":" + String(s).padStart(2, "0");
}

export default async function StudentWordSearchResults() {
  const session = await getSession();
  if (!session) redirect("/login");
  const records = await prisma.submission.findMany({
    where: { userId: session.userId, type: "VOCAB_WORD_SEARCH" },
    select: { id: true, createdAt: true, score: true, originalText: true },
    orderBy: { createdAt: "desc" },
    take: 30
  });
  const best = records.length ? Math.max(...records.map(r => r.score ?? 0)) : null;
  return (
    <main className="container" style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <Link href="/vocabulary-lab">← Regresar a Vocabulary Lab</Link>
      <h1 style={{ color: "#155b9d", marginTop: 16 }}>🔎 Mis resultados · Word Search</h1>
      <p>Consulta tus 30 partidas completadas más recientes. Solo tú puedes ver este historial.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", margin: "18px 0" }}>
        <div className="card"><strong>Partidas registradas</strong><h2>{records.length}</h2></div>
        <div className="card"><strong>Mejor puntuación reciente</strong><h2>{best === null ? "—" : best + " / 200"}</h2></div>
      </div>
      {records.length === 0 ? (
        <section className="card">
          <h2>Aún no tienes partidas registradas</h2>
          <p>Completa las 20 palabras e inicia sesión para guardar tu resultado.</p>
          <Link className="btn btn-primary" href="/vocabulary-lab/word-search">▶ Jugar</Link>
        </section>
      ) : (
        <div style={{ overflowX: "auto", background: "#fff", borderRadius: 16, border: "1px solid #cfe0f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 560 }}>
            <thead><tr>
              {["Fecha", "Idioma", "Nivel", "Palabras", "Puntos", "Tiempo", "Pistas"].map(x =>
                <th key={x} scope="col" style={{ padding: 12, background: "#eaf3ff", textAlign: "left" }}>{x}</th>
              )}
            </tr></thead>
            <tbody>{records.map(record => {
              const info = details(record.originalText);
              return (
                <tr key={record.id} style={{ borderTop: "1px solid #e3edf7" }}>
                  <td style={{ padding: 12 }}>{record.createdAt.toLocaleString("es-MX", { timeZone: "America/Mexico_City" })}</td>
                  <td>{info.language}</td>
                  <td>{info.level}</td>
                  <td>{info.found}/20</td>
                  <td>{record.score ?? "—"}</td>
                  <td>{elapsed(info.seconds)}</td>
                  <td>{info.hints}</td>
                </tr>
              );
            })}</tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: 12, color: "#667b90", marginTop: 12 }}>Las puntuaciones son métricas de práctica informadas por el juego, no calificaciones oficiales verificadas.</p>
    </main>
  );
}

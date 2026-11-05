"use client";

import { useEffect, useMemo, useState } from "react";

type Result = {
  id: string; createdAt: string; score: number | null; prompt: string; originalText: string | null;
  user: { id: string; name: string | null; email: string };
};
function metadata(raw: string | null) {
  try {
    const x = JSON.parse(raw ?? "{}");
    return { language: String(x.language ?? "—"), level: String(x.level ?? "—"),
      found: Number(x.found ?? 0), seconds: Number(x.seconds ?? 0), hints: Number(x.hints ?? 0) };
  } catch { return { language: "—", level: "—", found: 0, seconds: 0, hints: 0 }; }
}
export default function WordSearchResults() {
  const [rows, setRows] = useState<Result[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState("all");
  const [level, setLevel] = useState("all");
  useEffect(() => {
    let active = true;
    fetch("/api/labs/vocabulary/word-search/teacher-results", { credentials: "same-origin" })
      .then(async r => { if (!r.ok) throw new Error("No fue posible consultar los resultados."); return r.json(); })
      .then(data => { if (active) setRows(Array.isArray(data.results) ? data.results : []); })
      .catch(e => { if (active) setError(e.message || "Error al cargar."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  const students = useMemo(() => [...new Map(rows.map(r => [r.user.id, r.user])).values()], [rows]);
  const filtered = rows.filter(r => (student === "all" || r.user.id === student) && (level === "all" || metadata(r.originalText).level === level));
  return <main className="container" style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
    <h1 style={{ color: "#1556a0" }}>🔎 Vocabulary Lab — Sopa de Letras</h1>
    <p>Historial de intentos completados. Las puntuaciones son métricas de práctica reportadas por el navegador, no calificaciones oficiales.</p>
    {loading && <p role="status">Cargando resultados…</p>}
    {error && <p role="alert">{error}</p>}
    {!loading && !error && <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
        <label>Alumno <select value={student} onChange={e => setStudent(e.target.value)}>
          <option value="all">Todos los alumnos autorizados</option>
          {students.map(u => <option key={u.id} value={u.id}>{u.name || u.email}</option>)}
        </select></label>
        <label>Nivel <select value={level} onChange={e => setLevel(e.target.value)}>
          <option value="all">Todos</option>{["A1","A2","B1","B2","C1"].map(x => <option key={x}>{x}</option>)}
        </select></label>
      </div>
      <p><strong>{filtered.length}</strong> intentos encontrados (máximo 200 recientes).</p>
      <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid #d3e3f1" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
          <thead><tr>{["Alumno","Fecha","Idioma","Nivel","Palabras","Puntos","Tiempo","Pistas"].map(h => <th key={h} scope="col" style={{ padding: 11, textAlign: "left", background: "#eaf3ff" }}>{h}</th>)}</tr></thead>
          <tbody>{filtered.map(r => { const m = metadata(r.originalText); return <tr key={r.id} style={{ borderTop: "1px solid #e1eaf3" }}>
            <td style={{ padding: 10 }}>{r.user.name || r.user.email}</td>
            <td>{new Date(r.createdAt).toLocaleString("es-MX")}</td><td>{m.language}</td><td>{m.level}</td>
            <td>{m.found}/20</td><td>{r.score ?? "—"}</td><td>{m.seconds}s</td><td>{m.hints}</td>
          </tr>; })}</tbody>
        </table>
      </div>
      {filtered.length === 0 && <p>Aún no hay intentos registrados para estos filtros o alumnos asignados.</p>}
    </>}
  </main>;
}

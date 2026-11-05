"use client";

import { useCallback, useEffect, useState } from "react";

type Person = { id: string; name: string | null; email: string };
type Assignment = { id: string; teacher: Person; student: Person; createdAt: string };
type ResponseData = { teachers: Person[]; students: Person[]; assignments: Assignment[] };

export default function TeacherStudentManager() {
  const [data, setData] = useState<ResponseData>({ teachers: [], students: [], assignments: [] });
  const [teacherId, setTeacherId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const refresh = useCallback(async () => {
    const response = await fetch("/api/admin/teacher-students", { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) throw new Error("No fue posible consultar asignaciones.");
    const result: ResponseData = await response.json();
    setData(result);
  }, []);
  useEffect(() => {
    let active = true;
    refresh().catch(e => { if (active) setError(e.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [refresh]);
  async function modify(operation: "POST" | "DELETE", teacherIdValue: string, studentIdValue: string) {
    setBusy(true); setError(""); setMessage("");
    try {
      const response = await fetch("/api/admin/teacher-students", {
        method: operation, credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teacherId: teacherIdValue, studentId: studentIdValue })
      });
      if (!response.ok) {
        const x = await response.json().catch(() => ({}));
        throw new Error(typeof x.error === "string" ? x.error : "No fue posible guardar.");
      }
      await refresh();
      setMessage(operation === "POST" ? "Alumno asignado correctamente." : "Asignación revocada.");
    } catch (e) { setError(e instanceof Error ? e.message : "Error inesperado"); }
    finally { setBusy(false); }
  }
  const display = (person: Person) => person.name ? person.name + " (" + person.email + ")" : person.email;
  return <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
    <h1 style={{ color: "#16569b" }}>Asignaciones de maestros y alumnos</h1>
    <p>Control de acceso para resultados de los laboratorios. Solo los administradores pueden asignar o revocar permisos.</p>
    {loading && <p role="status">Cargando usuarios autorizados…</p>}
    {error && <p role="alert" style={{ color: "#ad361d" }}>{error}</p>}
    {message && <p role="status" style={{ color: "#18754b" }}>{message}</p>}
    {!loading && <section style={{ background: "#f0f7ff", padding: 20, borderRadius: 16 }}>
      <h2>Asignar alumno</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "end" }}>
        <label>Maestro
          <select value={teacherId} onChange={e => setTeacherId(e.target.value)} style={{ display: "block", minWidth: 220, maxWidth: "100%", padding: 10 }}>
            <option value="">Seleccionar maestro</option>
            {data.teachers.map(t => <option key={t.id} value={t.id}>{display(t)}</option>)}
          </select>
        </label>
        <label>Alumno
          <select value={studentId} onChange={e => setStudentId(e.target.value)} style={{ display: "block", minWidth: 220, maxWidth: "100%", padding: 10 }}>
            <option value="">Seleccionar alumno</option>
            {data.students.map(t => <option key={t.id} value={t.id}>{display(t)}</option>)}
          </select>
        </label>
        <button disabled={busy || !teacherId || !studentId} onClick={() => modify("POST", teacherId, studentId)} style={{ border: 0, borderRadius: 10, padding: 12, background: "#1762b0", color: "#fff", fontWeight: 700 }}>Asignar</button>
      </div>
    </section>}
    <h2 style={{ marginTop: 25 }}>Asignaciones actuales ({data.assignments.length})</h2>
    {!loading && !data.assignments.length && <p>No hay asignaciones. Los maestros no verán resultados hasta recibir alumnos autorizados.</p>}
    <div style={{ display: "grid", gap: 8 }}>
      {data.assignments.map(a => <div key={a.id} style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between", padding: 13, border: "1px solid #d6e6f3", borderRadius: 12 }}>
        <div><strong>{display(a.teacher)}</strong><div style={{ color: "#536b82" }}>Alumno: {display(a.student)}</div></div>
        <button disabled={busy} onClick={() => { if (window.confirm("¿Revocar acceso de este maestro a los resultados del alumno?")) modify("DELETE", a.teacher.id, a.student.id); }} style={{ padding: 9, borderRadius: 8, border: "1px solid #d2a39c", background: "#fff2f0", color: "#8e382e" }}>Revocar</button>
      </div>)}
    </div>
  </main>;
}

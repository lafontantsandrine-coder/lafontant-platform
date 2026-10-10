"use client";

import { useState } from "react";
import { MiloCompanion } from "@/components/milo/MiloCompanion";
import { getMiloFeedbackState, MiloState } from "@/lib/milo/catalog";

type SavedProgress = {
  percent: number;
  score?: number | null;
  bestScore?: number | null;
  attempts?: number;
  completedAt?: string | null;
};

export function LessonProgressBridge({ lessonId }: { lessonId: string }) {
  const [score, setScore] = useState(80);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<SavedProgress | null>(null);
  const [error, setError] = useState("");

  async function submitAttempt() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, percent: 100, score, gradedAttempt: true })
      });
      if (!response.ok) throw new Error("progress request failed");
      setResult(await response.json());
    } catch {
      setError("No pude guardar este intento. Tu pantalla sigue abierta para que puedas volver a intentarlo.");
    } finally {
      setSaving(false);
    }
  }

  const attempts = result?.attempts ?? 0;
  const bestScore = result?.bestScore ?? result?.score ?? null;
  const canAdvance = Boolean(result?.completedAt);
  let state: MiloState = getMiloFeedbackState(bestScore ?? undefined);
  let message = "Cuando termines una actividad calificada, Milo reaccionará a tu resultado.";

  if (saving) {
    state = "thinking";
    message = "Estoy guardando y revisando tu resultado...";
  } else if (error) {
    state = "tryAgain";
    message = error;
  } else if (result && canAdvance && (bestScore ?? 0) >= 80) {
    state = "unlock";
    message = "¡Meta alcanzada! Ya puedes avanzar a la siguiente actividad.";
  } else if (result && canAdvance && attempts >= 2) {
    state = "pointingRight";
    message = "Completaste tus dos intentos. Conservamos tu calificación y puedes continuar.";
  } else if (result && attempts === 1 && (bestScore ?? 0) < 80) {
    state = "tryAgain";
    message = "¡Tú puedes! Tienes un segundo intento para llegar a 80.";
  }

  return (
    <article className="card" style={{ marginTop: 18 }} data-lesson-progress-bridge>
      <div style={{ display: "flex", gap: 18, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 280px" }}>
          <h3>Resultado de la actividad</h3>
          <p className="muted">Puente temporal del reproductor universal: registra intentos reales y prueba el flujo 80/2 intentos.</p>
          <label style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            Calificación
            <input
              type="number"
              min={0}
              max={100}
              value={score}
              onChange={(event) => setScore(Math.max(0, Math.min(100, Number(event.target.value))))}
              style={{ width: 88 }}
            />
          </label>
          <button className="btn btn-primary" onClick={submitAttempt} disabled={saving} style={{ marginTop: 12 }}>
            {saving ? "Guardando..." : "Registrar intento calificado"}
          </button>
          {result && (
            <p className="muted" role="status">
              Intentos: {attempts}/2 · Mejor calificación: {bestScore ?? "—"} · {canAdvance ? "Siguiente actividad desbloqueada" : "Aún bloqueada"}
            </p>
          )}
        </div>
        <MiloCompanion state={state} size="companion" message={message} />
      </div>
    </article>
  );
}

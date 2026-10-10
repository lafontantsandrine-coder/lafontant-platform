"use client";

import { useRef, useState } from "react";
import { FeedbackCard } from "@/components/ai/FeedbackCard";
import { MiloCompanion } from "@/components/milo/MiloCompanion";

export default function SpeakingAIPage() {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function start() {
    setError("");
    setResult(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks.current = [];
      recorder.current = new MediaRecorder(stream);
      recorder.current.ondataavailable = (event) => chunks.current.push(event.data);
      recorder.current.start();
      setRecording(true);
    } catch {
      setError("I couldn't access the microphone. Check the permission and try again.");
    }
  }

  async function stop() {
    if (!recorder.current) return;
    recorder.current.onstop = async () => {
      setLoading(true);
      setError("");
      try {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const form = new FormData();
        form.append("audio", blob, "speaking.webm");
        form.append("prompt", "Describe one healthy habit you have changed recently.");
        form.append("level", "B1");

        const response = await fetch("/api/ai/speaking-feedback", { method: "POST", body: form });
        if (!response.ok) throw new Error("feedback request failed");
        setResult(await response.json());
      } catch {
        setError("I couldn't analyze that recording right now. Please record your answer again and retry.");
      } finally {
        setLoading(false);
        recorder.current?.stream.getTracks().forEach((track) => track.stop());
      }
    };
    recorder.current.stop();
    setRecording(false);
  }

  return (
    <main className="container">
      <h1>Speaking AI</h1>
      <section className="card">
        <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ flex: 1 }}>
            <h3>Describe one healthy habit you have changed recently.</h3>
            <button className="btn btn-primary" onClick={recording ? stop : start} disabled={loading}>
              {recording ? "Stop recording" : "Start recording"}
            </button>
          </div>
          <MiloCompanion
            state={recording ? "recording" : loading ? "thinking" : "speaking"}
            size="companion"
            message={recording ? "I'm listening. Take your time!" : loading ? "I'm analyzing your answer..." : "Ready when you are. Let's speak!"}
          />
        </div>
        {loading && <p className="muted" role="status">Transcribing and analyzing...</p>}
        {error && (
          <div role="alert">
            <MiloCompanion state="error" size="reaction" message={error} />
            <p className="muted">{error}</p>
          </div>
        )}
      </section>

      {result?.feedback && (
        <section className="grid">
          <FeedbackCard title="Overall" score={result.feedback.overallScore}>
            <p><strong>Transcript:</strong> {result.transcript}</p>
          </FeedbackCard>
          <FeedbackCard title="Scores" miloState="speaking" miloMessage="Let's look at your speaking skills." >
            <p>Grammar: {result.feedback.grammarScore}</p>
            <p>Vocabulary: {result.feedback.vocabularyScore}</p>
            <p>Fluency estimate: {result.feedback.fluencyEstimate}</p>
          </FeedbackCard>
          <FeedbackCard title="Next steps" miloState="explaining" miloMessage="One step at a time. Here's what to practice next.">
            {result.feedback.improvements.map((item: string) => <p key={item}>• {item}</p>)}
            <p className="muted">{result.feedback.note}</p>
          </FeedbackCard>
        </section>
      )}
    </main>
  );
}


"use client";

import { useRef, useState } from "react";
import { FeedbackCard } from "@/components/ai/FeedbackCard";

export default function SpeakingAIPage() {
  const recorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function start() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    chunks.current = [];
    recorder.current = new MediaRecorder(stream);
    recorder.current.ondataavailable = (event) => chunks.current.push(event.data);
    recorder.current.start();
    setRecording(true);
  }

  async function stop() {
    if (!recorder.current) return;
    recorder.current.onstop = async () => {
      setLoading(true);
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const form = new FormData();
      form.append("audio", blob, "speaking.webm");
      form.append("prompt", "Describe one healthy habit you have changed recently.");
      form.append("level", "B1");

      const response = await fetch("/api/ai/speaking-feedback", {
        method: "POST",
        body: form
      });
      setResult(await response.json());
      setLoading(false);
      recorder.current?.stream.getTracks().forEach((track) => track.stop());
    };
    recorder.current.stop();
    setRecording(false);
  }

  return (
    <main className="container">
      <h1>Speaking AI</h1>
      <section className="card">
        <h3>Describe one healthy habit you have changed recently.</h3>
        <button className="btn btn-primary" onClick={recording ? stop : start}>
          {recording ? "Stop recording" : "Start recording"}
        </button>
        {loading && <p className="muted">Transcribing and analyzing...</p>}
      </section>

      {result?.feedback && (
        <section className="grid">
          <FeedbackCard title="Overall" score={result.feedback.overallScore}>
            <p><strong>Transcript:</strong> {result.transcript}</p>
          </FeedbackCard>
          <FeedbackCard title="Scores">
            <p>Grammar: {result.feedback.grammarScore}</p>
            <p>Vocabulary: {result.feedback.vocabularyScore}</p>
            <p>Fluency estimate: {result.feedback.fluencyEstimate}</p>
          </FeedbackCard>
          <FeedbackCard title="Next steps">
            {result.feedback.improvements.map((item: string) => <p key={item}>• {item}</p>)}
            <p className="muted">{result.feedback.note}</p>
          </FeedbackCard>
        </section>
      )}
    </main>
  );
}

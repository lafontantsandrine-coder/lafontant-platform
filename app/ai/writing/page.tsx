"use client";

import { useState } from "react";
import { FeedbackCard } from "@/components/ai/FeedbackCard";
import { MiloCompanion } from "@/components/milo/MiloCompanion";

type Feedback = {
  overallScore: number;
  cefrEstimate: string;
  strengths: string[];
  errors: { original: string; correction: string; explanation: string }[];
  improvements: string[];
  correctedVersion: string;
  vocabularyUsed: string[];
};

export default function WritingAIPage() {
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze() {
    setLoading(true);
    setError("");
    setFeedback(null);
    try {
      const response = await fetch("/api/ai/writing-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          prompt: "Describe a healthy change in your routine.",
          level: "B1",
          targetVocabulary: ["processed food", "stay hydrated", "balanced diet"],
          grammarTargets: ["Present Perfect Passive", "Present Continuous Passive"]
        })
      });
      if (!response.ok) throw new Error("feedback request failed");
      const data = await response.json();
      setFeedback(data.feedback || null);
    } catch {
      setError("I couldn't analyze your writing right now. Your text is still here, so you can try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>Writing AI</h1>
      <section className="card">
        <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ flex: 1 }}>
            <p className="muted">Describe a healthy change in your routine.</p>
            <textarea
              style={{ width: "100%", minHeight: 220, padding: 14 }}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button
              className="btn btn-primary"
              disabled={loading || text.trim().length < 20}
              onClick={analyze}
              style={{ marginTop: 12 }}
            >
              {loading ? "Analyzing..." : "Get detailed feedback"}
            </button>
          </div>
          <MiloCompanion
            state={loading ? "thinking" : "writing"}
            size="companion"
            message={loading ? "I'm reading your work carefully..." : "Write freely. I'll help you improve the important parts."}
          />
        </div>
        {loading && <p className="muted" role="status">Analyzing your writing...</p>}
        {error && (
          <div role="alert">
            <MiloCompanion state="error" size="reaction" message={error} />
            <p className="muted">{error}</p>
          </div>
        )}
      </section>

      {feedback && (
        <section className="grid">
          <FeedbackCard title={`Overall · ${feedback.cefrEstimate}`} score={feedback.overallScore}>
            {feedback.strengths.map((item) => <p key={item}>✓ {item}</p>)}
          </FeedbackCard>
          <FeedbackCard title="What to improve" miloState="explaining" miloMessage="Let's focus on the most useful improvements first.">
            {feedback.improvements.map((item) => <p key={item}>• {item}</p>)}
          </FeedbackCard>
          <FeedbackCard title="Corrected version" miloState="writing" miloMessage="Compare this version with yours and notice the changes.">
            <p>{feedback.correctedVersion}</p>
          </FeedbackCard>
        </section>
      )}
    </main>
  );
}

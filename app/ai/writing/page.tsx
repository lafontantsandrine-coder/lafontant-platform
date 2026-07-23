
"use client";

import { useState } from "react";
import { FeedbackCard } from "@/components/ai/FeedbackCard";

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

  async function analyze() {
    setLoading(true);
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
    const data = await response.json();
    setFeedback(data.feedback || null);
    setLoading(false);
  }

  return (
    <main className="container">
      <h1>Writing AI</h1>
      <section className="card">
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
      </section>

      {feedback && (
        <section className="grid">
          <FeedbackCard title={`Overall · ${feedback.cefrEstimate}`} score={feedback.overallScore}>
            {feedback.strengths.map((item) => <p key={item}>✓ {item}</p>)}
          </FeedbackCard>
          <FeedbackCard title="What to improve">
            {feedback.improvements.map((item) => <p key={item}>• {item}</p>)}
          </FeedbackCard>
          <FeedbackCard title="Corrected version">
            <p>{feedback.correctedVersion}</p>
          </FeedbackCard>
        </section>
      )}
    </main>
  );
}

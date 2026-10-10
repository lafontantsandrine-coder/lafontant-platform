import { MiloCompanion } from "@/components/milo/MiloCompanion";
import { getMiloFeedbackState, MiloState } from "@/lib/milo/catalog";

interface FeedbackCardProps {
  title: string;
  score?: number;
  children: React.ReactNode;
  miloState?: MiloState;
  miloMessage?: string;
  showMilo?: boolean;
}

function feedbackMessage(score?: number) {
  if (typeof score !== "number") return undefined;
  if (score >= 100) return "Perfect score! Amazing work!";
  if (score >= 90) return "Excellent work!";
  if (score >= 80) return "Great job! You reached the goal.";
  if (score >= 60) return "Good progress. Let's improve one more thing.";
  return "Good try. Let's work on it and try again.";
}

export function FeedbackCard({
  title,
  score,
  children,
  miloState,
  miloMessage,
  showMilo = true
}: FeedbackCardProps) {
  const state = miloState ?? getMiloFeedbackState(score);
  const message = miloMessage ?? feedbackMessage(score);

  return (
    <article className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
            <h3>{title}</h3>
            {typeof score === "number" && <span className="badge">{score}/100</span>}
          </div>
          {children}
        </div>
        {showMilo && (
          <MiloCompanion
            state={state}
            size="reaction"
            message={message}
          />
        )}
      </div>
    </article>
  );
}

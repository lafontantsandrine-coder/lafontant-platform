
interface FeedbackCardProps {
  title: string;
  score?: number;
  children: React.ReactNode;
}

export function FeedbackCard({ title, score, children }: FeedbackCardProps) {
  return (
    <article className="card">
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <h3>{title}</h3>
        {typeof score === "number" && <span className="badge">{score}/100</span>}
      </div>
      {children}
    </article>
  );
}

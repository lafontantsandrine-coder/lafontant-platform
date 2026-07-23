
export function StatCard({
  title,
  value,
  note
}: {
  title: string;
  value: string | number;
  note?: string;
}) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <div style={{ fontSize: 34, fontWeight: 900 }}>{value}</div>
      {note && <p className="muted">{note}</p>}
    </article>
  );
}


import Link from "next/link";
import type { UnitData } from "@/types";

export function UnitCard({ unit }: { unit: UnitData }) {
  return (
    <article className="card">
      <span className="badge">{unit.status}</span>
      <h3 style={{ marginTop: 14 }}>{unit.title}</h3>
      <p className="muted">{unit.subtitle}</p>
      <div className="progress"><span style={{ width: unit.number === 6 ? "72%" : "0%" }} /></div>
      <Link
        className="btn btn-primary"
        style={{ marginTop: 16 }}
        href={`/courses/${unit.language}/${unit.level}/${unit.number}`}
      >
        Open unit
      </Link>
    </article>
  );
}

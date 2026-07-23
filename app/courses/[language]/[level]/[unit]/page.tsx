
import Link from "next/link";
import { notFound } from "next/navigation";
import { getUnit } from "@/lib/mock-data";

export default async function UnitPage({
  params
}: {
  params: Promise<{ language: string; level: string; unit: string }>;
}) {
  const { language, level, unit } = await params;
  const data = getUnit(language, Number(level), Number(unit));
  if (!data) notFound();

  return (
    <main className="container">
      <section className="hero">
        <span className="badge">Level {data.level} · Unit {data.number}</span>
        <h1>{data.title}</h1>
        <p>{data.subtitle}</p>
        <Link className="btn btn-primary" href={`/lesson/${language}/${level}/${unit}/cover`}>
          Start unit
        </Link>
      </section>
      <section className="grid">
        {["Vocabulary","Grammar","Listening","Reading","Speaking","Writing"].map((skill) => (
          <article className="card" key={skill}><h3>{skill}</h3><p className="muted">Reusable lesson section.</p></article>
        ))}
      </section>
    </main>
  );
}

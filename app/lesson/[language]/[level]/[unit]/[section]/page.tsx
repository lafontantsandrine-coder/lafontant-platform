import { notFound } from "next/navigation";
import { getUnit } from "@/lib/mock-data";
import { LessonSidebar } from "@/components/LessonSidebar";
import { AudioButton } from "@/components/AudioButton";
import { LessonProgressBridge } from "@/components/lesson/LessonProgressBridge";

const gradedSections = new Set([
  "vocabulary-practice",
  "grammar-practice",
  "listening",
  "reading",
  "speaking",
  "writing",
  "exit-ticket"
]);

export default async function LessonSectionPage({
  params
}: {
  params: Promise<{ language: string; level: string; unit: string; section: string }>;
}) {
  const { language, level, unit, section } = await params;
  const data = getUnit(language, Number(level), Number(unit));
  if (!data) notFound();

  const lessonId = `${language}-${level}-${unit}-${section}`;
  const isGradedSection = gradedSections.has(section);

  return (
    <main className="container lesson-layout">
      <LessonSidebar language={language} level={level} unit={unit} />
      <section>
        <article className="card">
          <span className="badge">{section.replaceAll("-", " ")}</span>
          <h1>{data.title}</h1>
          <p className="muted">{data.subtitle}</p>
        </article>

        {section === "vocabulary" ? (
          <section className="grid">
            {data.vocabulary.map((item) => (
              <article className="card" key={item.id}>
                <h3>{item.term}</h3>
                <p>{item.definition}</p>
                <p className="muted">{item.example}</p>
                <AudioButton src={item.audioUrl} fallbackText={item.term} />
              </article>
            ))}
          </section>
        ) : (
          <article className="card" style={{ marginTop: 18 }}>
            <h2>{section.replaceAll("-", " ")}</h2>
            <p className="muted">
              This section is connected to the reusable lesson route and is ready
              to receive its data from the database.
            </p>
          </article>
        )}

        {isGradedSection && <LessonProgressBridge lessonId={lessonId} />}
      </section>
    </main>
  );
}

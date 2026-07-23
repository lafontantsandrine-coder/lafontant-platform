
import Link from "next/link";

const sections = [
  "cover","journey","mission","vocabulary","vocabulary-practice",
  "grammar","grammar-practice","listening","reading","speaking","writing","exit-ticket"
];

export function LessonSidebar({
  language,
  level,
  unit
}: {
  language: string;
  level: string;
  unit: string;
}) {
  return (
    <aside className="lesson-nav">
      {sections.map((section) => (
        <Link key={section} href={`/lesson/${language}/${level}/${unit}/${section}`}>
          {section.replaceAll("-", " ")}
        </Link>
      ))}
    </aside>
  );
}


import { units } from "@/lib/mock-data";
import { UnitCard } from "@/components/UnitCard";

export default function CoursesPage() {
  return (
    <main className="container">
      <h1>Courses</h1>
      <p className="muted">English and French learning paths.</p>
      <section className="grid">
        {units.map((unit) => <UnitCard key={unit.id} unit={unit} />)}
      </section>
    </main>
  );
}

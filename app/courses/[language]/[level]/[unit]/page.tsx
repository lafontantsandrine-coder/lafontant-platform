import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getUnit } from "@/lib/mock-data";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { MiloJourneyMap } from "@/components/milo/MiloJourneyMap";
import { resolveCourseMapPosition } from "@/lib/milo/course-map";

const mapSections = [
  "cover", "journey", "mission", "vocabulary", "vocabulary-practice", "grammar",
  "grammar-practice", "listening", "reading", "speaking", "writing", "exit-ticket"
] as const;

export default async function UnitPage({
  params
}: {
  params: Promise<{ language: string; level: string; unit: string }>;
}) {
  const { language, level, unit } = await params;
  const data = getUnit(language, Number(level), Number(unit));
  if (!data) notFound();

  const session = await getSession();
  if (!session) redirect("/login");

  const nodes = mapSections.map((section, order) => ({ id: `${language}-${level}-${unit}-${section}`, section, order }));
  const progress = await prisma.progress.findMany({
    where: { userId: session.userId, lessonId: { in: nodes.map((node) => node.id) } },
    select: { lessonId: true, percent: true, score: true, bestScore: true, attempts: true, completedAt: true }
  });
  const position = resolveCourseMapPosition(nodes, progress);
  const continueSection = nodes[Math.min(position.currentIndex, nodes.length - 1)]?.section ?? "cover";

  return (
    <main className="container">
      <section className="hero milo-unit-hero">
        <div>
          <span className="badge">Level {data.level} · Unit {data.number}</span>
          <h1>{data.title}</h1>
          <p>{data.subtitle}</p>
        </div>
        <Link className="btn btn-primary" href={`/lesson/${language}/${level}/${unit}/${continueSection}`}>
          {position.currentNodeId ? "Continue with Milo" : "Review completed unit"}
        </Link>
      </section>

      <MiloJourneyMap
        nodes={nodes}
        nodeStates={position.nodeStates}
        currentNodeId={position.currentNodeId}
        language={language}
        level={level}
        unit={unit}
      />
    </main>
  );
}

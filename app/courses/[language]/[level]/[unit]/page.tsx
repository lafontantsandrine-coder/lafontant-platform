import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getUnit } from "@/lib/mock-data";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { MiloCourseMapMarker } from "@/components/milo/MiloCourseMapMarker";
import { resolveCourseMapPosition } from "@/lib/milo/course-map";

const mapSections = [
  "cover",
  "journey",
  "mission",
  "vocabulary",
  "vocabulary-practice",
  "grammar",
  "grammar-practice",
  "listening",
  "reading",
  "speaking",
  "writing",
  "exit-ticket"
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

  const nodes = mapSections.map((section, order) => ({
    id: `${language}-${level}-${unit}-${section}`,
    section,
    order
  }));
  const lessonIds = nodes.map((node) => node.id);
  const progress = await prisma.progress.findMany({
    where: { userId: session.userId, lessonId: { in: lessonIds } },
    select: { lessonId: true, percent: true, score: true, bestScore: true, attempts: true, completedAt: true }
  });
  const position = resolveCourseMapPosition(nodes, progress);

  return (
    <main className="container">
      <section className="hero">
        <span className="badge">Level {data.level} · Unit {data.number}</span>
        <h1>{data.title}</h1>
        <p>{data.subtitle}</p>
        <Link className="btn btn-primary" href={`/lesson/${language}/${level}/${unit}/${nodes[Math.min(position.currentIndex, nodes.length - 1)]?.section ?? "cover"}`}>
          {position.currentNodeId ? "Continue with Milo" : "Review completed unit"}
        </Link>
      </section>

      <section className="card" style={{ marginTop: 20 }} aria-label="Course map">
        <div style={{ marginBottom: 18 }}>
          <span className="badge">Your route</span>
          <h2>Milo's journey</h2>
          <p className="muted">Milo stays on your current point. Complete each activity to move together through the route.</p>
        </div>
        <div style={{ display: "grid", gap: 18 }}>
          {nodes.map((node, index) => {
            const state = position.nodeStates[node.id];
            const isCurrent = node.id === position.currentNodeId;
            const label = node.section.replaceAll("-", " ");
            return (
              <div
                key={node.id}
                data-map-node={state}
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  minHeight: 104,
                  padding: 16,
                  border: "1px solid var(--border)",
                  borderRadius: 18,
                  opacity: state === "locked" ? 0.55 : 1
                }}
              >
                <div aria-hidden="true" style={{ width: 44, height: 44, borderRadius: 999, display: "grid", placeItems: "center", border: "2px solid currentColor", fontWeight: 700 }}>
                  {state === "completed" ? "✓" : index + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <strong style={{ textTransform: "capitalize" }}>{label}</strong>
                  <div className="muted">{state === "completed" ? "Completed" : state === "current" ? "Current point" : "Locked"}</div>
                </div>
                {isCurrent && <MiloCourseMapMarker label={`Current point: ${label}`} />}
                {state !== "locked" && !isCurrent && (
                  <Link className="btn" href={`/lesson/${language}/${level}/${unit}/${node.section}`}>
                    Review
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

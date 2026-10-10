import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MiloCompanion } from "@/components/milo/MiloCompanion";
import { MiloState } from "@/lib/milo/catalog";

type UserWithProgress = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  progress: Array<{
    id: string;
    percent: number;
    completedAt: Date | null;
  }>;
};

function dashboardMilo(average: number, started: number, completed: number): { state: MiloState; message: string } {
  if (started === 0) return { state: "welcome", message: "Ready to start your first lesson? I'll be with you along the way." };
  if (average >= 100) return { state: "trophy", message: "Amazing work! You've completed everything you've started." };
  if (average >= 80) return { state: "celebrating", message: "Great progress! Keep that momentum going." };
  if (completed > 0) return { state: "correct", message: "Nice work. You've already completed lessons — let's keep going!" };
  return { state: "pointingRight", message: "You're making progress. Let's continue from where you left off." };
}

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user: UserWithProgress | null = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { progress: true }
  });

  const completed = user?.progress.filter((item: UserWithProgress["progress"][number]) => item.percent >= 100).length ?? 0;
  const started = user?.progress.length ?? 0;
  const average = started
    ? Math.round((user?.progress ?? []).reduce((sum: number, item: UserWithProgress["progress"][number]) => sum + item.percent, 0) / started)
    : 0;
  const milo = dashboardMilo(average, started, completed);

  return (
    <main className="container">
      <section className="hero">
        <div style={{ display: "flex", gap: 28, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 360px" }}>
            <span className="badge">Student dashboard</span>
            <h1>Welcome back, {user?.name || "student"}.</h1>
            <p>Your progress is waiting for you. Pick up right where you left off.</p>
            <Link className="btn btn-primary" href="/courses">Continue learning</Link>
          </div>
          <MiloCompanion state={milo.state} size="hero" message={milo.message} />
        </div>
      </section>
      <section className="grid">
        <article className="card"><h3>{average}%</h3><p className="muted">Average progress</p></article>
        <article className="card"><h3>{completed}</h3><p className="muted">Completed lessons</p></article>
        <article className="card"><h3>{started}</h3><p className="muted">Lessons started</p></article>
      </section>
    </main>
  );
}


import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { progress: true }
  });

  const completed = user?.progress.filter((item) => item.percent >= 100).length ?? 0;
  const average = user?.progress.length
    ? Math.round(user.progress.reduce((sum, item) => sum + item.percent, 0) / user.progress.length)
    : 0;

  return (
    <main className="container">
      <section className="hero">
        <span className="badge">Student dashboard</span>
        <h1>Welcome back, {user?.name || "student"}.</h1>
        <p>Your lesson progress is now stored in the database.</p>
        <Link className="btn btn-primary" href="/courses">Continue learning</Link>
      </section>
      <section className="grid">
        <article className="card"><h3>{average}%</h3><p className="muted">Average progress</p></article>
        <article className="card"><h3>{completed}</h3><p className="muted">Completed lessons</p></article>
        <article className="card"><h3>{user?.progress.length ?? 0}</h3><p className="muted">Lessons started</p></article>
      </section>
    </main>
  );
}

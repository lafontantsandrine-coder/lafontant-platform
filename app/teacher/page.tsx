
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function TeacherPage() {
  const session = await getSession();
  if (!session || !["TEACHER", "ADMIN", "SUPER_ADMIN"].includes(session.role)) {
    redirect("/login");
  }

  return (
    <main className="container">
      <h1>Teacher dashboard</h1>
      <section className="grid">
        <article className="card"><h3>Student progress</h3><p className="muted">View completion and scores.</p></article>
        <article className="card"><h3>Assignments</h3><p className="muted">Create and review homework.</p></article>
        <article className="card"><h3>Feedback</h3><p className="muted">Review speaking and writing results.</p></article>
      </section>
    </main>
  );
}

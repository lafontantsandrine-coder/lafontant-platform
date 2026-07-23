
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function HomeworkPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const assignments = await prisma.homework.findMany({
    orderBy: { dueAt: "asc" }
  });

  return (
    <main className="container">
      <h1>Homework</h1>
      <section className="grid">
        {assignments.map((item) => (
          <article className="card" key={item.id}>
            <span className="badge">{item.points} points</span>
            <h3>{item.title}</h3>
            <p>{item.instructions}</p>
            <p className="muted">Due: {item.dueAt.toLocaleString()}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

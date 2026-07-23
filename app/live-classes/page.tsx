
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function LiveClassesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const classes = await prisma.liveClass.findMany({
    where: { startsAt: { gte: new Date() } },
    orderBy: { startsAt: "asc" }
  });

  return (
    <main className="container">
      <h1>Live classes</h1>
      <section className="grid">
        {classes.length === 0 ? (
          <article className="card"><p className="muted">No upcoming classes yet.</p></article>
        ) : classes.map((item) => (
          <article className="card" key={item.id}>
            <span className="badge">{item.startsAt.toLocaleDateString()}</span>
            <h3>{item.title}</h3>
            <p className="muted">{item.description}</p>
            <a className="btn btn-primary" href={item.meetingUrl} target="_blank">Join class</a>
          </article>
        ))}
      </section>
    </main>
  );
}

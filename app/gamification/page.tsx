
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/commercial/StatCard";

export default async function GamificationPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const transactions = await prisma.pointTransaction.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" }
  });

  const total = transactions.reduce((sum, item) => sum + item.points, 0);

  return (
    <main className="container">
      <h1>Achievements</h1>
      <section className="grid">
        <StatCard title="Total points" value={total} />
        <StatCard title="Current streak" value="7 days" note="Demo streak until daily activity service is connected." />
        <StatCard title="Level" value={Math.max(1, Math.floor(total / 500) + 1)} />
      </section>
      <section className="card" style={{ marginTop: 18 }}>
        <h2>Recent activity</h2>
        {transactions.map((item) => (
          <div key={item.id} style={{ padding: "10px 0", borderBottom: "1px solid #e2e7ef" }}>
            <strong>+{item.points}</strong> · {item.reason}
          </div>
        ))}
      </section>
    </main>
  );
}


import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminUsersPage() {
  const session = await getSession();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.role)) redirect("/login");

  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="container">
      <h1>Users</h1>
      <section className="card">
        {users.map((user) => (
          <div key={user.id} style={{ padding: "12px 0", borderBottom: "1px solid #e2e7ef" }}>
            <strong>{user.name || "Unnamed user"}</strong>
            <div className="muted">{user.email} · {user.role}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

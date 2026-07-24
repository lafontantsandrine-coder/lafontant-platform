import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: {
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  return (
    <main className="container" style={{ maxWidth: 760 }}>
      <section className="card">
        <span className="badge">{user?.role}</span>
        <h1>Mi perfil</h1>

        <div className="profile-grid">
          <div>
            <small>Nombre</small>
            <strong>{user?.name || "Sin nombre"}</strong>
          </div>

          <div>
            <small>Correo</small>
            <strong>{user?.email}</strong>
          </div>

          <div>
            <small>Miembro desde</small>
            <strong>{user?.createdAt.toLocaleDateString("es-MX")}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

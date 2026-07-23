
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function CertificatesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const certificates = await prisma.certificate.findMany({
    where: { userId: session.userId },
    orderBy: { issuedAt: "desc" }
  });

  return (
    <main className="container">
      <h1>Certificates</h1>
      <section className="grid">
        {certificates.length === 0 ? (
          <article className="card"><p className="muted">No certificates earned yet.</p></article>
        ) : certificates.map((item) => (
          <article className="card" key={item.id}>
            <span className="badge">{item.levelLabel}</span>
            <h3>{item.title}</h3>
            <p className="muted">Issued {item.issuedAt.toLocaleDateString()}</p>
            <p><strong>Verification:</strong> {item.verificationCode}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

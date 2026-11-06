import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function WordSearchPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <main style={{ margin: 0, padding: 0, width: "100%", minHeight: "100dvh" }}>
      <nav style={{ display: "flex", gap: 14, alignItems: "center", padding: "10px 16px", background: "#eaf3fc" }}>
        <Link href="/vocabulary-lab">← Regresar a Vocabulary Lab</Link>
        <Link href="/vocabulary-lab/results">📊 Mis resultados</Link>
        <strong style={{ color: "#185a9a" }}>Juego 1 · Word Search Adventure</strong>
      </nav>
      <iframe
        title="Word Search Adventure"
        src="/vocabulary-lab/games/word-search-visual-v1.html"
        style={{ display: "block", border: 0, width: "100%", height: "calc(100dvh - 55px)", minHeight: 620 }}
        allow="fullscreen"
      />
    </main>
  );
}

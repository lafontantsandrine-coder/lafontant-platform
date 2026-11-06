import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function WordSearchPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const { lang } = await searchParams;
  const french = lang === "fr";
  const session = await getSession();
  if (!session) redirect("/login");
  return (
    <main style={{ margin: 0, padding: 0, width: "100%", minHeight: "100dvh" }}>
      <nav style={{ display: "flex", gap: 14, alignItems: "center", padding: "10px 16px", background: "#eaf3fc" }}>
        <Link href="/vocabulary-lab">← {french ? "Retour au laboratoire" : "Regresar a Vocabulary Lab"}</Link>
        <Link href="/vocabulary-lab/results">📊 {french ? "Mes résultats" : "Mis resultados"}</Link>
        <strong style={{ color: "#185a9a" }}>{french ? "Jeu 1 · Chasse aux mots" : "Juego 1 · Word Search Adventure"}</strong>
      </nav>
      <iframe
        title={french ? "Chasse aux mots en français" : "Word Search Adventure"}
        src={french ? "/vocabulary-lab/games/word-search-visual-v1.html?lang=fr" : "/vocabulary-lab/games/word-search-visual-v1.html"}
        style={{ display: "block", border: 0, width: "100%", height: "calc(100dvh - 55px)", minHeight: 620 }}
        allow="fullscreen"
      />
    </main>
  );
}

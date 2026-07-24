import Link from "next/link";
import { getSession } from "@/lib/auth/session";
import { LogoutButton } from "@/components/LogoutButton";

export async function AppHeader() {
  const session = await getSession();

  return (
    <header className="topbar">
      <Link href="/" className="brand">
        Lafontant <span>Learning</span>
      </Link>

      <nav className="nav">
        <Link href="/courses">Cursos</Link>

        {session ? (
          <>
            <Link href="/dashboard">Mi espacio</Link>
            {["TEACHER", "ADMIN", "SUPER_ADMIN"].includes(session.role) && (
              <Link href="/teacher">Profesor</Link>
            )}
            {["ADMIN", "SUPER_ADMIN"].includes(session.role) && (
              <Link href="/admin">Administración</Link>
            )}
            <Link href="/profile">Perfil</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link href="/login">Iniciar sesión</Link>
            <Link className="nav-register" href="/register">Crear cuenta</Link>
          </>
        )}
      </nav>
    </header>
  );
}

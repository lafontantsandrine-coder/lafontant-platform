
import Link from "next/link";
import { getSession } from "@/lib/auth/session";

export async function AppHeader() {
  const session = await getSession();

  return (
    <header className="topbar">
      <Link href="/" className="brand">Lafontant <span>Learning</span></Link>
      <nav className="nav">
        <Link href="/courses">Courses</Link>
        {session && <Link href="/dashboard">Dashboard</Link>}
        {session && <Link href="/ai/writing">Writing AI</Link>}

        {session && <Link href="/live-classes">Live classes</Link>}
        {session && <Link href="/homework">Homework</Link>}
        {session && <Link href="/gamification">Achievements</Link>}

        {session && <Link href="/ai/speaking">Speaking AI</Link>}
        {session && ["TEACHER","ADMIN","SUPER_ADMIN"].includes(session.role) && (
          <Link href="/teacher">Teacher</Link>
        )}
        {session && ["ADMIN","SUPER_ADMIN"].includes(session.role) && (
          <Link href="/admin">Admin</Link>
        )}
        {!session ? <Link href="/login">Login</Link> : <span style={{padding:"10px 12px"}}>{session.email}</span>}
      </nav>
    </header>
  );
}

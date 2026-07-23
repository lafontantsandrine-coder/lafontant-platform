
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function TeacherLiveClassesPage() {
  const session = await getSession();
  if (!session || !["TEACHER","ADMIN","SUPER_ADMIN"].includes(session.role)) redirect("/login");

  return (
    <main className="container">
      <h1>Schedule live class</h1>
      <section className="card">
        <form className="form">
          <div className="field"><label>Title</label><input /></div>
          <div className="field"><label>Start</label><input type="datetime-local" /></div>
          <div className="field"><label>Meeting URL</label><input type="url" /></div>
          <button className="btn btn-primary" type="button">Save class</button>
        </form>
      </section>
    </main>
  );
}

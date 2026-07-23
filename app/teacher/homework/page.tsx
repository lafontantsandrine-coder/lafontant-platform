
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function TeacherHomeworkPage() {
  const session = await getSession();
  if (!session || !["TEACHER","ADMIN","SUPER_ADMIN"].includes(session.role)) redirect("/login");

  return (
    <main className="container">
      <h1>Create homework</h1>
      <section className="card">
        <form className="form">
          <div className="field"><label>Title</label><input /></div>
          <div className="field"><label>Instructions</label><textarea /></div>
          <div className="field"><label>Due date</label><input type="datetime-local" /></div>
          <button className="btn btn-primary" type="button">Save draft</button>
        </form>
      </section>
    </main>
  );
}

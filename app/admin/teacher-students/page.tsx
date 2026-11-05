import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import TeacherStudentManager from "./manager";

export default async function TeacherStudentsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.role)) redirect("/dashboard");
  return <TeacherStudentManager />;
}

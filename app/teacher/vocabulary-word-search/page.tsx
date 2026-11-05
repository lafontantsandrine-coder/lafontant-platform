import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import WordSearchResults from "./results";

export default async function WordSearchTeacherPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (!["TEACHER", "ADMIN", "SUPER_ADMIN"].includes(session.role)) redirect("/dashboard");
  return <WordSearchResults />;
}

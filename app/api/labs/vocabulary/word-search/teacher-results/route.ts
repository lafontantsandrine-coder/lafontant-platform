import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!["TEACHER", "ADMIN", "SUPER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const isAdmin = session.role === "ADMIN" || session.role === "SUPER_ADMIN";
  const studentIds = isAdmin ? null : (
    await prisma.teacherStudentAccess.findMany({
      where: { teacherId: session.userId },
      select: { studentId: true }
    })
  ).map(x => x.studentId);
  if (studentIds !== null && studentIds.length === 0) {
    return NextResponse.json({ results: [], assignedStudents: 0 });
  }
  const results = await prisma.submission.findMany({
    where: {
      type: "VOCAB_WORD_SEARCH",
      ...(studentIds !== null ? { userId: { in: studentIds } } : {})
    },
    select: {
      id: true, createdAt: true, score: true, prompt: true, originalText: true,
      user: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 200
  });
  return NextResponse.json({ results, assignedStudents: studentIds?.length ?? null });
}

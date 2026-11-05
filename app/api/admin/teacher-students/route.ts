import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const Input = z.object({
  teacherId: z.string().min(1).max(128),
  studentId: z.string().min(1).max(128)
}).strict();

async function authorize() {
  const session = await getSession();
  return session && ["ADMIN", "SUPER_ADMIN"].includes(session.role) ? session : null;
}
function originValid(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
async function body(request: Request) {
  try { return Input.safeParse(await request.json()); }
  catch { return null; }
}
export async function GET() {
  if (!await authorize()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const assignments = await prisma.teacherStudentAccess.findMany({
    select: { id: true, createdAt: true,
      teacher: { select: { id: true, name: true, email: true } },
      student: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: "desc" }, take: 500
  });
  const [teachers, students] = await Promise.all([
    prisma.user.findMany({ where: { role: "TEACHER" }, select: { id: true, name: true, email: true }, orderBy: { email: "asc" }, take: 1000 }),
    prisma.user.findMany({ where: { role: "STUDENT" }, select: { id: true, name: true, email: true }, orderBy: { email: "asc" }, take: 5000 })
  ]);
  return NextResponse.json({ assignments, teachers, students });
}
export async function POST(request: Request) {
  if (!await authorize()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!originValid(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const parsed = await body(request);
  if (!parsed?.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const { teacherId, studentId } = parsed.data;
  if (teacherId === studentId) return NextResponse.json({ error: "A user cannot be their own teacher" }, { status: 400 });
  const users = await prisma.user.findMany({ where: { id: { in: [teacherId, studentId] } }, select: { id: true, role: true } });
  if (!users.some(u => u.id === teacherId && u.role === "TEACHER") || !users.some(u => u.id === studentId && u.role === "STUDENT")) {
    return NextResponse.json({ error: "Teacher or student not found with required role" }, { status: 400 });
  }
  const assignment = await prisma.teacherStudentAccess.upsert({
    where: { teacherId_studentId: { teacherId, studentId } },
    update: {},
    create: { teacherId, studentId },
    select: { id: true, teacherId: true, studentId: true }
  });
  return NextResponse.json({ assignment }, { status: 201 });
}
export async function DELETE(request: Request) {
  if (!await authorize()) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  if (!originValid(request)) return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const parsed = await body(request);
  if (!parsed?.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  const deleted = await prisma.teacherStudentAccess.deleteMany({ where: parsed.data });
  return NextResponse.json({ deleted: deleted.count });
}

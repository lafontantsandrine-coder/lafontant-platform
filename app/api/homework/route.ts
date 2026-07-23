
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { HomeworkInput } from "@/lib/validation/commercial";

export async function GET() {
  const items = await prisma.homework.findMany({ orderBy: { dueAt: "asc" } });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !["TEACHER","ADMIN","SUPER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = HomeworkInput.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = await prisma.homework.create({
    data: {
      title: parsed.data.title,
      instructions: parsed.data.instructions,
      dueAt: new Date(parsed.data.dueAt),
      points: parsed.data.points,
      lessonId: parsed.data.lessonId
    }
  });

  return NextResponse.json(item, { status: 201 });
}

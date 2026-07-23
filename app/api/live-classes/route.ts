
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth/session";
import { LiveClassInput } from "@/lib/validation/commercial";

export async function GET() {
  const classes = await prisma.liveClass.findMany({ orderBy: { startsAt: "asc" } });
  return NextResponse.json(classes);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !["TEACHER","ADMIN","SUPER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = LiveClassInput.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const item = await prisma.liveClass.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      startsAt: new Date(parsed.data.startsAt),
      durationMinutes: parsed.data.durationMinutes,
      meetingUrl: parsed.data.meetingUrl,
      levelId: parsed.data.levelId
    }
  });

  return NextResponse.json(item, { status: 201 });
}


import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { lessonId } = await params;
  const progress = await prisma.progress.findUnique({
    where: {
      userId_lessonId: {
        userId: session.userId,
        lessonId
      }
    }
  });

  return NextResponse.json(progress || { percent: 0, score: null });
}

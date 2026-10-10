import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { upsertProgress } from "@/lib/services/progress";

const Input = z.object({
  lessonId: z.string().min(1),
  percent: z.number().min(0).max(100),
  score: z.number().min(0).max(100).optional(),
  gradedAttempt: z.boolean().optional().default(false)
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = Input.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const progress = await upsertProgress({
    userId: session.userId,
    ...parsed.data
  });

  return NextResponse.json(progress);
}

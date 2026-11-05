import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const Result = z.object({
  level: z.enum(["A1", "A2", "B1", "B2", "C1"]),
  language: z.enum(["en", "es", "fr"]),
  found: z.number().int().min(0).max(20),
  total: z.literal(20),
  seconds: z.number().int().min(0).max(86400),
  hints: z.number().int().min(0).max(100),
  score: z.number().int().min(0).max(200),
  completed: z.literal(true)
}).strict();

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }
  let payload: unknown;
  try { payload = await request.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }
  const parsed = Result.safeParse(payload);
  if (!parsed.success || parsed.data.found !== 20) {
    return NextResponse.json({ error: "Invalid or incomplete game result" }, { status: 400 });
  }
  const data = parsed.data;
  // The score is a client-reported practice metric, not a verified examination grade.
  const result = await prisma.submission.create({
    data: {
      type: "VOCAB_WORD_SEARCH",
      prompt: "Word Search Adventure - " + data.language + " - " + data.level,
      originalText: JSON.stringify({ level: data.level, language: data.language, found: data.found, seconds: data.seconds, hints: data.hints }),
      feedbackJson: JSON.stringify({ activity: "word-search", completed: true, source: "client-reported" }),
      score: data.score,
      userId: session.userId
    },
    select: { id: true, createdAt: true, score: true }
  });
  return NextResponse.json({ saved: true, result }, { status: 201 });
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const submissions = await prisma.submission.findMany({
    where: { userId: session.userId, type: "VOCAB_WORD_SEARCH" },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: { id: true, createdAt: true, score: true, prompt: true, originalText: true }
  });
  return NextResponse.json({ results: submissions });
}

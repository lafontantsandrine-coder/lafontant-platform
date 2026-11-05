import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

const Result = z.object({
  attemptId: z.string().uuid(),
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
  // This cannot verify that words were really found, but it rejects impossible
  // client-reported totals under the game's published scoring rules.
  const maximumScore = Math.max(0, 200 - data.hints * 5);
  if (data.score > maximumScore) {
    return NextResponse.json({ error: "Invalid score for hint count" }, { status: 400 });
  }
  // The score is a client-reported practice metric, not a verified examination grade.
  const submissionId = "ws_" + data.attemptId;
  const existing = await prisma.submission.findUnique({
    where: { id: submissionId },
    select: { id: true, userId: true, type: true, createdAt: true, score: true }
  });
  if (existing) {
    if (existing.userId !== session.userId || existing.type !== "VOCAB_WORD_SEARCH") {
      return NextResponse.json({ error: "Attempt already registered" }, { status: 409 });
    }
    return NextResponse.json({ saved: true, alreadySaved: true, result: existing }, { status: 200 });
  }
  let result;
  try {
    result = await prisma.submission.create({
    data: {
      id: submissionId,
      type: "VOCAB_WORD_SEARCH",
      prompt: "Word Search Adventure - " + data.language + " - " + data.level,
      originalText: JSON.stringify({ level: data.level, language: data.language, found: data.found, seconds: data.seconds, hints: data.hints }),
      feedbackJson: JSON.stringify({ activity: "word-search", completed: true, source: "client-reported" }),
      score: data.score,
      userId: session.userId
    },
    select: { id: true, createdAt: true, score: true }
    });
  } catch (error) {
    // Concurrent requests with the same attempt ID must never add another score.
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
      const duplicate = await prisma.submission.findUnique({
        where: { id: submissionId },
        select: { id: true, userId: true, type: true, createdAt: true, score: true }
      });
      if (duplicate?.userId === session.userId && duplicate.type === "VOCAB_WORD_SEARCH") {
        return NextResponse.json({ saved: true, alreadySaved: true, result: duplicate });
      }
      return NextResponse.json({ error: "Attempt already registered" }, { status: 409 });
    }
    throw error;
  }
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

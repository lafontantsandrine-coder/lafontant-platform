import { prisma } from "@/lib/prisma";
import { COURSE_MAP_PASS_SCORE, COURSE_MAP_MAX_ATTEMPTS_BEFORE_ADVANCE } from "@/lib/milo/course-map";

export async function upsertProgress(input: {
  userId: string;
  lessonId: string;
  percent: number;
  score?: number;
  gradedAttempt?: boolean;
}) {
  const existing = await prisma.progress.findUnique({
    where: {
      userId_lessonId: {
        userId: input.userId,
        lessonId: input.lessonId
      }
    }
  });

  const isGradedAttempt = input.gradedAttempt === true && typeof input.score === "number";
  const previousAttempts = existing?.attempts ?? 0;
  const attempts = previousAttempts + (isGradedAttempt ? 1 : 0);
  const previousBest = existing?.bestScore ?? existing?.score ?? null;
  const bestScore = typeof input.score === "number"
    ? Math.max(previousBest ?? 0, input.score)
    : previousBest;

  const mastered = typeof bestScore === "number" && bestScore >= COURSE_MAP_PASS_SCORE;
  const exhaustedAttempts = isGradedAttempt && attempts >= COURSE_MAP_MAX_ATTEMPTS_BEFORE_ADVANCE;
  const canAdvance = mastered || exhaustedAttempts;
  const completedAt = canAdvance || input.percent >= 100
    ? (existing?.completedAt ?? new Date())
    : null;

  return prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: input.userId,
        lessonId: input.lessonId
      }
    },
    update: {
      percent: Math.max(existing?.percent ?? 0, input.percent),
      score: input.score,
      bestScore,
      attempts,
      completedAt
    },
    create: {
      userId: input.userId,
      lessonId: input.lessonId,
      percent: input.percent,
      score: input.score,
      bestScore,
      attempts,
      completedAt
    }
  });
}


import { prisma } from "@/lib/prisma";

export async function upsertProgress(input: {
  userId: string;
  lessonId: string;
  percent: number;
  score?: number;
}) {
  const completedAt = input.percent >= 100 ? new Date() : null;

  return prisma.progress.upsert({
    where: {
      userId_lessonId: {
        userId: input.userId,
        lessonId: input.lessonId
      }
    },
    update: {
      percent: input.percent,
      score: input.score,
      completedAt
    },
    create: {
      userId: input.userId,
      lessonId: input.lessonId,
      percent: input.percent,
      score: input.score,
      completedAt
    }
  });
}

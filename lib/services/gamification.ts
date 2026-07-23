
import { prisma } from "@/lib/prisma";

export async function awardPoints(userId: string, points: number, reason: string) {
  return prisma.pointTransaction.create({
    data: { userId, points, reason }
  });
}

export async function getUserPoints(userId: string) {
  const result = await prisma.pointTransaction.aggregate({
    where: { userId },
    _sum: { points: true }
  });
  return result._sum.points || 0;
}

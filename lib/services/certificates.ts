
import { prisma } from "@/lib/prisma";

export async function issueCertificate(input: {
  userId: string;
  title: string;
  levelLabel: string;
}) {
  return prisma.certificate.create({
    data: {
      userId: input.userId,
      title: input.title,
      levelLabel: input.levelLabel,
      verificationCode: crypto.randomUUID()
    }
  });
}

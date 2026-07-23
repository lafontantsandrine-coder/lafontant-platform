
import { PrismaClient, PublishStatus, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("ChangeMe123!", 12);
  const studentPassword = await bcrypt.hash("Student123!", 12);

  await prisma.user.upsert({
    where: { email: "admin@lafontant.local" },
    update: {},
    create: {
      email: "admin@lafontant.local",
      name: "Lafontant Admin",
      passwordHash: adminPassword,
      role: Role.SUPER_ADMIN
    }
  });

  await prisma.user.upsert({
    where: { email: "student@lafontant.local" },
    update: {},
    create: {
      email: "student@lafontant.local",
      name: "Demo Student",
      passwordHash: studentPassword,
      role: Role.STUDENT
    }
  });

  const english = await prisma.language.upsert({
    where: { code: "en" },
    update: {},
    create: { code: "en", name: "English" }
  });

  const level5 = await prisma.level.upsert({
    where: { languageId_number: { languageId: english.id, number: 5 } },
    update: {},
    create: { languageId: english.id, number: 5, cefr: "B1-B2" }
  });

  const unit6 = await prisma.unit.upsert({
    where: { levelId_number: { levelId: level5.id, number: 6 } },
    update: {},
    create: {
      levelId: level5.id,
      number: 6,
      slug: "eating-well",
      title: "Eating Well",
      subtitle: "Healthy habits, nutrition, and positive changes",
      status: PublishStatus.PUBLISHED
    }
  });

  const lessons = [
    ["cover", "Cover", 1],
    ["journey", "Learning Journey", 2],
    ["mission", "Mission", 3],
    ["vocabulary", "Vocabulary", 4],
    ["grammar", "Grammar", 5],
    ["listening", "Listening", 6],
    ["reading", "Reading", 7],
    ["speaking", "Speaking", 8],
    ["writing", "Writing", 9],
    ["exit-ticket", "Exit Ticket", 10]
  ] as const;

  for (const [section, title, order] of lessons) {
    await prisma.lesson.upsert({
      where: { unitId_section: { unitId: unit6.id, section } },
      update: {},
      create: {
        unitId: unit6.id,
        section,
        title,
        order,
        contentJson: JSON.stringify({ title, section })
      }
    });
  }
}

main()
  .then(() => console.log("Seed complete"))
  .finally(async () => prisma.$disconnect());


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UnitCreateSchema } from "@/lib/validation/unit";
import { getSession } from "@/lib/auth/session";

export async function GET() {
  const units = await prisma.unit.findMany({
    include: {
      level: {
        include: { language: true }
      },
      lessons: {
        orderBy: { order: "asc" }
      }
    },
    orderBy: [{ level: { number: "asc" } }, { number: "asc" }]
  });

  return NextResponse.json(units);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = UnitCreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const unit = await prisma.unit.create({
    data: {
      levelId: parsed.data.levelId,
      number: parsed.data.number,
      slug: parsed.data.slug,
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      status: parsed.data.status
    }
  });

  return NextResponse.json(unit, { status: 201 });
}

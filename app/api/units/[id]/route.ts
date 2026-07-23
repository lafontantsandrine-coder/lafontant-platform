
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UnitUpdateSchema } from "@/lib/validation/unit";
import { getSession } from "@/lib/auth/session";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const unit = await prisma.unit.findUnique({
    where: { id },
    include: { lessons: { orderBy: { order: "asc" } } }
  });

  if (!unit) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(unit);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = UnitUpdateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const unit = await prisma.unit.update({
    where: { id },
    data: parsed.data
  });

  return NextResponse.json(unit);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session || session.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  await prisma.unit.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

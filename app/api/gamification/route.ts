
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { awardPoints, getUserPoints } from "@/lib/services/gamification";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ points: await getUserPoints(session.userId) });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const transaction = await awardPoints(
    session.userId,
    Math.max(1, Math.min(100, Number(body.points || 0))),
    String(body.reason || "Learning activity")
  );

  return NextResponse.json(transaction, { status: 201 });
}

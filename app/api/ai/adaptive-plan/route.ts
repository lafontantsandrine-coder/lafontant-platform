
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { AdaptivePlanInput } from "@/lib/validation/ai";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = AdaptivePlanInput.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const ranked = Object.entries(parsed.data)
    .sort((a, b) => a[1] - b[1]);

  const focus = ranked.slice(0, 2).map(([skill, score]) => ({
    skill,
    score,
    recommendation: score < 50
      ? `Complete two guided ${skill} practices before advancing.`
      : `Complete one targeted ${skill} review this week.`
  }));

  const maintain = ranked.slice(-2).reverse().map(([skill, score]) => ({
    skill,
    score,
    recommendation: `Maintain with one short ${skill} challenge.`
  }));

  return NextResponse.json({ focus, maintain });
}

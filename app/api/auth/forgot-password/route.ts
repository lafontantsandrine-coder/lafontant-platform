import { NextResponse } from "next/server";
import { z } from "zod";

const Input = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  Input.safeParse(await request.json());
  return NextResponse.json({ ok: true });
}

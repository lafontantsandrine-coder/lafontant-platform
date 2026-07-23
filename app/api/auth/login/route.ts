
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/validation/auth";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/token";
import { SESSION_COOKIE } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = LoginSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  if (!user?.passwordHash || !(await verifyPassword(parsed.data.password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validation/auth";
import { hashPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/token";
import { SESSION_COOKIE } from "@/lib/auth/session";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = RegisterSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() }
  });

  if (existing) {
    return NextResponse.json({ error: "Email already registered." }, { status: 409 });
  }

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      passwordHash: await hashPassword(parsed.data.password),
      role: "STUDENT"
    }
  });

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  const response = NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role }
  }, { status: 201 });

  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });

  return response;
}

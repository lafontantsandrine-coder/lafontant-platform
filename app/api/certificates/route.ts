
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { issueCertificate } from "@/lib/services/certificates";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !["ADMIN","SUPER_ADMIN"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const certificate = await issueCertificate({
    userId: body.userId,
    title: body.title,
    levelLabel: body.levelLabel
  });

  return NextResponse.json(certificate, { status: 201 });
}

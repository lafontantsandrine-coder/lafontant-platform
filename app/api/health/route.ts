import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ ok: true, app: "Lafontant Learning Platform", version: "1.0.0" });
}

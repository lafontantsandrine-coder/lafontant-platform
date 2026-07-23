
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const MAX_SIZE = 12 * 1024 * 1024;
const ALLOWED = new Set([
  "audio/mpeg", "audio/wav", "audio/ogg",
  "image/jpeg", "image/png", "image/webp"
]);

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !["ADMIN", "SUPER_ADMIN", "TEACHER"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  if (!ALLOWED.has(file.type)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 415 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File is too large." }, { status: 413 });
  }

  const category = file.type.startsWith("audio/") ? "audio" : "images";
  const safeName = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`;
  const folder = path.join(process.cwd(), "public", "uploads", category);
  await mkdir(folder, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(folder, safeName), buffer);

  return NextResponse.json({
    url: `/uploads/${category}/${safeName}`,
    fileName: safeName,
    type: file.type,
    size: file.size
  }, { status: 201 });
}

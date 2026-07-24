import { NextResponse } from "next/server";
import { z } from "zod";

const Input = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  const parsed = Input.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ ok: true });
  }

  // La respuesta es genérica para no revelar si una cuenta existe.
  // El envío real se conectará al servicio de correo en el siguiente módulo.
  return NextResponse.json({ ok: true });
}

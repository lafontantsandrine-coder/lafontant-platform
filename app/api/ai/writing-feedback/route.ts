
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { WritingFeedbackInput } from "@/lib/validation/ai";
import { aiEnabled, createTextResponse } from "@/lib/ai/openai";
import { writingFeedbackSchema } from "@/lib/ai/schemas";
import { demoWritingFeedback } from "@/lib/ai/demo";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = WritingFeedbackInput.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!aiEnabled()) {
    return NextResponse.json({
      mode: "demo",
      feedback: demoWritingFeedback(parsed.data.text, parsed.data.targetVocabulary)
    });
  }

  const system = `You are an English teacher for Lafontant Learning Platform.
Evaluate the student's writing at the requested CEFR level.
Be supportive, specific, and pedagogically useful.
Do not invent errors. Explain corrections in Spanish.
Check the requested vocabulary and grammar targets.`;

  const user = JSON.stringify(parsed.data);
  const output = await createTextResponse({
    system,
    user,
    jsonSchema: writingFeedbackSchema
  });

  return NextResponse.json({
    mode: "live",
    feedback: JSON.parse(output)
  });
}

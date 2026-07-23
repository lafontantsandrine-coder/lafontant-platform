
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { UnitGeneratorInput } from "@/lib/validation/ai";
import { aiEnabled, createTextResponse } from "@/lib/ai/openai";
import { generatedUnitSchema } from "@/lib/ai/schemas";

export async function POST(request: Request) {
  const session = await getSession();
  if (!session || !["ADMIN", "SUPER_ADMIN", "TEACHER"].includes(session.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const parsed = UnitGeneratorInput.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  if (!aiEnabled()) {
    return NextResponse.json({
      mode: "demo",
      unit: {
        title: parsed.data.theme,
        subtitle: `${parsed.data.level} unit for ${parsed.data.learnerAge}`,
        mission: "Use the new language in a realistic situation.",
        vocabulary: Array.from({ length: 8 }, (_, i) => ({
          term: `sample term ${i + 1}`,
          definition: "Replace this item after connecting the live AI service.",
          example: `This is sample example ${i + 1}.`
        })),
        grammar: {
          title: parsed.data.grammarTarget,
          formula: "Add formula",
          explanation: "Demo unit structure.",
          examples: ["Example one.", "Example two."]
        },
        reading: { title: "Demo reading", text: "Demo content.", questions: ["Question one?"] },
        listening: { title: "Demo listening", script: "Demo audio script.", questions: ["Question one?"] },
        speaking: "Give a short response about the theme.",
        writing: "Write a paragraph about the theme.",
        exitTicket: Array.from({ length: 5 }, (_, i) => ({
          question: `Question ${i + 1}`,
          options: ["A", "B", "C"],
          answer: "A"
        }))
      }
    });
  }

  const output = await createTextResponse({
    system: `You design complete language-learning units for Lafontant Learning Platform.
Create age-appropriate, CEFR-aligned content.
All explanations and instructions for A1 and A2 must be in Spanish.
English or French should appear progressively in examples and activities.
Make examples realistic, varied, and directly connected to the unit theme.
Avoid repetitive or overly obvious exercises.`,
    user: JSON.stringify(parsed.data),
    jsonSchema: generatedUnitSchema
  });

  return NextResponse.json({
    mode: "live",
    unit: JSON.parse(output)
  });
}


import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { aiEnabled, createTextResponse, transcribeAudio } from "@/lib/ai/openai";
import { speakingFeedbackSchema } from "@/lib/ai/schemas";
import { demoSpeakingFeedback } from "@/lib/ai/demo";

const MAX_AUDIO = 20 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await request.formData();
  const file = form.get("audio");
  const prompt = String(form.get("prompt") || "");
  const level = String(form.get("level") || "B1");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Audio file is required." }, { status: 400 });
  }
  if (file.size > MAX_AUDIO) {
    return NextResponse.json({ error: "Audio file is too large." }, { status: 413 });
  }

  if (!aiEnabled()) {
    return NextResponse.json({
      mode: "demo",
      transcript: "Demo transcript: I have changed my eating habits and more vegetables have been added to my meals.",
      feedback: demoSpeakingFeedback(
        "I have changed my eating habits and more vegetables have been added to my meals."
      )
    });
  }

  const transcript = await transcribeAudio(file);

  const output = await createTextResponse({
    system: `You are an English speaking coach.
Evaluate language from the transcript at CEFR ${level}.
Assess grammar, vocabulary, organization, and an estimate of fluency.
Do not claim to acoustically measure pronunciation because you only receive the transcript.
Give improvements in Spanish.`,
    user: JSON.stringify({ prompt, transcript, level }),
    jsonSchema: speakingFeedbackSchema
  });

  return NextResponse.json({
    mode: "live",
    transcript,
    feedback: JSON.parse(output)
  });
}

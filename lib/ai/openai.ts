
const API_URL = "https://api.openai.com/v1";

export function aiEnabled() {
  return Boolean(process.env.OPENAI_API_KEY) && process.env.AI_DEMO_MODE !== "true";
}

export async function createTextResponse(input: {
  system: string;
  user: string;
  jsonSchema?: Record<string, unknown>;
}) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const body: Record<string, unknown> = {
    model: process.env.OPENAI_TEXT_MODEL || "gpt-5-mini",
    input: [
      { role: "system", content: input.system },
      { role: "user", content: input.user }
    ]
  };

  if (input.jsonSchema) {
    body.text = {
      format: {
        type: "json_schema",
        name: "lafontant_result",
        strict: true,
        schema: input.jsonSchema
      }
    };
  }

  const response = await fetch(`${API_URL}/responses`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`OpenAI response failed: ${response.status} ${detail}`);
  }

  const data = await response.json();
  return data.output_text as string;
}

export async function transcribeAudio(file: File) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const form = new FormData();
  form.append("file", file);
  form.append(
    "model",
    process.env.OPENAI_TRANSCRIPTION_MODEL || "gpt-4o-mini-transcribe"
  );
  form.append("language", "en");

  const response = await fetch(`${API_URL}/audio/transcriptions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: form
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Transcription failed: ${response.status} ${detail}`);
  }

  const data = await response.json();
  return data.text as string;
}

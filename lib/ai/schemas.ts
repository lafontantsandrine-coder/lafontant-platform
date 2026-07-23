
export const writingFeedbackSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "overallScore", "cefrEstimate", "strengths", "errors",
    "improvements", "correctedVersion", "vocabularyUsed"
  ],
  properties: {
    overallScore: { type: "integer", minimum: 0, maximum: 100 },
    cefrEstimate: { type: "string" },
    strengths: { type: "array", items: { type: "string" } },
    errors: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["original", "correction", "explanation"],
        properties: {
          original: { type: "string" },
          correction: { type: "string" },
          explanation: { type: "string" }
        }
      }
    },
    improvements: { type: "array", items: { type: "string" } },
    correctedVersion: { type: "string" },
    vocabularyUsed: { type: "array", items: { type: "string" } }
  }
};

export const speakingFeedbackSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "overallScore", "grammarScore", "vocabularyScore",
    "fluencyEstimate", "strengths", "improvements", "correctedTranscript"
  ],
  properties: {
    overallScore: { type: "integer", minimum: 0, maximum: 100 },
    grammarScore: { type: "integer", minimum: 0, maximum: 100 },
    vocabularyScore: { type: "integer", minimum: 0, maximum: 100 },
    fluencyEstimate: { type: "integer", minimum: 0, maximum: 100 },
    strengths: { type: "array", items: { type: "string" } },
    improvements: { type: "array", items: { type: "string" } },
    correctedTranscript: { type: "string" },
    note: { type: "string" }
  }
};

export const generatedUnitSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "title", "subtitle", "mission", "vocabulary", "grammar",
    "reading", "listening", "speaking", "writing", "exitTicket"
  ],
  properties: {
    title: { type: "string" },
    subtitle: { type: "string" },
    mission: { type: "string" },
    vocabulary: {
      type: "array",
      minItems: 8,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["term", "definition", "example"],
        properties: {
          term: { type: "string" },
          definition: { type: "string" },
          example: { type: "string" }
        }
      }
    },
    grammar: {
      type: "object",
      additionalProperties: false,
      required: ["title", "formula", "explanation", "examples"],
      properties: {
        title: { type: "string" },
        formula: { type: "string" },
        explanation: { type: "string" },
        examples: { type: "array", items: { type: "string" } }
      }
    },
    reading: {
      type: "object",
      additionalProperties: false,
      required: ["title", "text", "questions"],
      properties: {
        title: { type: "string" },
        text: { type: "string" },
        questions: { type: "array", items: { type: "string" } }
      }
    },
    listening: {
      type: "object",
      additionalProperties: false,
      required: ["title", "script", "questions"],
      properties: {
        title: { type: "string" },
        script: { type: "string" },
        questions: { type: "array", items: { type: "string" } }
      }
    },
    speaking: { type: "string" },
    writing: { type: "string" },
    exitTicket: {
      type: "array",
      minItems: 5,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "options", "answer"],
        properties: {
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          answer: { type: "string" }
        }
      }
    }
  }
};

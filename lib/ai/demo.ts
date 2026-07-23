
export function demoWritingFeedback(text: string, targetVocabulary: string[]) {
  const used = targetVocabulary.filter((word) =>
    text.toLowerCase().includes(word.toLowerCase())
  );

  return {
    overallScore: Math.min(92, 60 + Math.floor(text.length / 25)),
    cefrEstimate: "B1",
    strengths: [
      "Your response stays focused on the topic.",
      "Your ideas are organized in a logical order."
    ],
    errors: [
      {
        original: "Demo analysis",
        correction: "Connect an OpenAI API key for sentence-level corrections.",
        explanation: "Demo mode does not invent specific errors in the student's work."
      }
    ],
    improvements: [
      "Add one more specific example.",
      "Review article use and irregular past participles."
    ],
    correctedVersion: text,
    vocabularyUsed: used
  };
}

export function demoSpeakingFeedback(transcript: string) {
  return {
    overallScore: 76,
    grammarScore: 74,
    vocabularyScore: 80,
    fluencyEstimate: 73,
    strengths: ["The message is understandable.", "The response addresses the prompt."],
    improvements: [
      "Use linking words to connect ideas.",
      "Add one passive sentence from the lesson."
    ],
    correctedTranscript: transcript,
    note: "Pronunciation cannot be reliably scored from text alone. Acoustic pronunciation analysis is not included in demo mode."
  };
}

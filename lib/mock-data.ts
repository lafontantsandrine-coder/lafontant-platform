
import type { UnitData } from "@/types";

export const units: UnitData[] = [
  {
    id: "en-l5-u6",
    language: "english",
    level: 5,
    number: 6,
    title: "Eating Well",
    subtitle: "Healthy habits, nutrition, and positive changes",
    status: "published",
    vocabulary: [
      {
        id: "balanced-diet",
        term: "balanced diet",
        definition: "A way of eating that includes the right amounts of different food groups.",
        example: "A balanced diet can improve your energy.",
        audioUrl: "/audio/english/level-5/unit-6/vocabulary/balanced-diet.mp3"
      },
      {
        id: "processed-food",
        term: "processed food",
        definition: "Food changed from its natural state.",
        example: "Processed food has been reduced in my diet.",
        audioUrl: "/audio/english/level-5/unit-6/vocabulary/processed-food.mp3"
      },
      {
        id: "whole-grains",
        term: "whole grains",
        definition: "Grains that keep all their natural parts.",
        example: "Whole grains are being added to school meals.",
        audioUrl: "/audio/english/level-5/unit-6/vocabulary/whole-grains.mp3"
      }
    ]
  }
];

export function getUnit(language: string, level: number, unitNumber: number) {
  return units.find(
    (unit) =>
      unit.language === language &&
      unit.level === level &&
      unit.number === unitNumber
  );
}

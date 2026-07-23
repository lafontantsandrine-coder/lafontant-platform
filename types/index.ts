
export type Role = "STUDENT" | "TEACHER" | "ADMIN" | "SUPER_ADMIN";

export interface VocabularyItem {
  id: string;
  term: string;
  definition: string;
  example: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface UnitData {
  id: string;
  language: string;
  level: number;
  number: number;
  title: string;
  subtitle: string;
  status: "draft" | "published";
  vocabulary: VocabularyItem[];
}

export const COURSE_MAP_PASS_SCORE = 80;
export const COURSE_MAP_MAX_ATTEMPTS_BEFORE_ADVANCE = 2;

export type CourseMapProgress = {
  lessonId: string;
  percent: number;
  score?: number | null;
  bestScore?: number | null;
  attempts?: number;
  completedAt?: Date | string | null;
};

export type CourseMapNode = {
  id: string;
  order: number;
};

export type CourseMapNodeState = "completed" | "current" | "locked";

export type CourseMapPosition = {
  currentNodeId: string | null;
  currentIndex: number;
  nodeStates: Record<string, CourseMapNodeState>;
};

/**
 * Resolves Traveler Milo's persisted position from lesson progress.
 * Backend completion is authoritative because it already applies the 80-point / two-attempt rule.
 * bestScore is used for mastery; percent alone never unlocks a graded node.
 */
export function resolveCourseMapPosition(
  nodes: CourseMapNode[],
  progress: CourseMapProgress[]
): CourseMapPosition {
  const ordered = [...nodes].sort((a, b) => a.order - b.order);
  const byLesson = new Map(progress.map((item) => [item.lessonId, item]));

  let currentIndex = ordered.findIndex((node) => {
    const item = byLesson.get(node.id);
    if (!item) return true;
    const effectiveScore = item.bestScore ?? item.score;
    const mastered = typeof effectiveScore === "number" && effectiveScore >= COURSE_MAP_PASS_SCORE;
    const advancedAfterAttempts = Boolean(item.completedAt) && (item.attempts ?? 0) >= COURSE_MAP_MAX_ATTEMPTS_BEFORE_ADVANCE;
    return !mastered && !advancedAfterAttempts;
  });

  if (currentIndex === -1) currentIndex = ordered.length;
  const currentNodeId = ordered[currentIndex]?.id ?? null;
  const nodeStates: Record<string, CourseMapNodeState> = {};

  ordered.forEach((node, index) => {
    if (currentIndex >= ordered.length || index < currentIndex) nodeStates[node.id] = "completed";
    else if (index === currentIndex) nodeStates[node.id] = "current";
    else nodeStates[node.id] = "locked";
  });

  return { currentNodeId, currentIndex, nodeStates };
}

export function shouldUnlockNext(score: number, attemptNumber: number): boolean {
  return score >= COURSE_MAP_PASS_SCORE || attemptNumber >= COURSE_MAP_MAX_ATTEMPTS_BEFORE_ADVANCE;
}

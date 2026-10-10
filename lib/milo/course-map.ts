export const COURSE_MAP_PASS_SCORE = 80;
export const COURSE_MAP_MAX_ATTEMPTS_BEFORE_ADVANCE = 2;

export type CourseMapProgress = {
  lessonId: string;
  percent: number;
  score?: number | null;
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
 * The first unfinished/unpassed lesson is current; everything after it is locked.
 * A score >= 80 is considered mastery. A fully completed lesson is also considered passed.
 * Attempt-count based forced advancement will be added once attempts are persisted in the data model.
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
    const mastered = typeof item.score === "number" && item.score >= COURSE_MAP_PASS_SCORE;
    const completed = item.percent >= 100 || Boolean(item.completedAt);
    return !mastered && !completed;
  });

  if (currentIndex === -1) currentIndex = Math.max(ordered.length - 1, 0);
  const currentNodeId = ordered[currentIndex]?.id ?? null;
  const nodeStates: Record<string, CourseMapNodeState> = {};

  ordered.forEach((node, index) => {
    if (index < currentIndex) nodeStates[node.id] = "completed";
    else if (index === currentIndex) nodeStates[node.id] = "current";
    else nodeStates[node.id] = "locked";
  });

  return { currentNodeId, currentIndex, nodeStates };
}

export function shouldUnlockNext(score: number, attemptNumber: number): boolean {
  return score >= COURSE_MAP_PASS_SCORE || attemptNumber >= COURSE_MAP_MAX_ATTEMPTS_BEFORE_ADVANCE;
}

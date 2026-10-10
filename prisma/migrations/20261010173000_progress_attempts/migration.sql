-- Persist graded lesson attempts so the 80-point / second-attempt unlock rule
-- can be enforced by the backend rather than inferred in the UI.
ALTER TABLE "Progress"
ADD COLUMN "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "bestScore" INTEGER;

# MILO Companion — Block checklist

This file is the source of truth for closing the MILO integration block.

## Character identity (locked)
- Turquoise/cyan-blue furry monster
- Large glossy brown eyes
- Curved golden horns
- Coral/pink inner ears
- Multicolor face markings and rainbow crest
- Black T-shirt
- Cuffed blue jeans
- Black-and-white sneakers
- Friendly polished 3D cartoon style
- Individual full-body PNGs, transparent background, generous margins, no text
- Recreate each pose independently; do not crop poses from a sheet

## Existing/registered core assets
- [x] Welcome
- [x] Pointing right / next
- [x] Explaining
- [x] Thinking
- [x] Listening
- [x] Reading
- [x] Speaking
- [x] Writing
- [x] Recording
- [x] Correct
- [x] Try again / You can do it
- [x] Celebrating
- [x] Unlock
- [x] Calendar
- [x] Trophy / rewards / certificates
- [x] Traveler — official moving player marker for platform course maps

## Assets that MUST be created before closing this block
- [ ] Error / Oops — friendly, not dramatically sad
- [ ] Connection problem — checking Wi-Fi/network
- [ ] Loading / AI analyzing — waiting/processing state
- [ ] Streak — celebration for consecutive study days
- [ ] Locked activity — clear but encouraging
- [ ] Almost there — near the 80-point mastery threshold
- [ ] Perfect score — special 100/100 celebration
- [ ] Daily welcome — returning student greeting
- [ ] Birthday — celebration state

## System work
- [x] Central MILO state/asset catalog
- [x] Central score-to-MILO feedback rule
- [x] Reusable MiloCompanion component with Hero / Companion / Reaction sizes
- [x] Pending-art protection so missing PNGs do not render broken images
- [x] Register Traveler Milo as the official platform course-map character
- [x] Connect MiloCompanion to FeedbackCard
- [x] Connect Speaking AI states
- [x] Connect Writing AI states
- [x] Connect student dashboard to real progress
- [x] Connect Traveler Milo to the current self-study platform unit map route
- [ ] Animate Traveler Milo moving node-to-node as activities are completed/unlocked
- [x] Persist Traveler Milo at the learner's current/latest unlocked node through stored progress
- [x] Traveler Milo does not replace node state: locked/current/completed status remains independently visible
- [x] Connect graded lesson sections to the shared progress/attempt flow
- [x] Connect unlock and retry flow (80-point rule) at backend/shared progress level
- [ ] Replace temporary score bridge with real exercise-generated scores in every activity engine
- [ ] Connect gamification / streaks / rewards
- [ ] Connect certificates
- [ ] Connect calendar/deadlines
- [ ] Connect recoverable error/network states (logic started in AI; pending final Error/Connection art and platform-wide handler)
- [ ] Add final PNGs for every pending asset
- [ ] Verify responsive behavior and accessibility
- [ ] Verify no broken asset paths
- [ ] Run final end-to-end verification of the MILO block

## Course map rule — locked
Traveler Milo is the student's avatar/companion on all self-study platform course maps. He sits at the learner's current node and moves visually from point to point when progress unlocks the next activity. The map itself keeps its own completed/current/locked visual states, while Traveler Milo indicates the learner's position. His position comes from persisted learner progress so refreshing or returning to the course places him back on the correct node. Movement should feel playful (walk/hop/slide with a short arrival reaction) without delaying access to the newly unlocked activity. This rule applies to platform courses such as English A1 and future French A1/self-study routes; university course navigation is not automatically converted to this map behavior unless explicitly designed as a map.

## Integration behavior now established
- AI feedback cards select Milo from the real score.
- Speaking uses Speaking → Recording → Thinking → score reaction.
- Writing uses Writing → Thinking → score reaction.
- Student dashboard selects Milo from actual lesson progress rather than random messages.
- Graded lesson sections share the 80-point / two-attempt progress flow.
- The self-study unit map reads stored progress and places Traveler Milo on the current node.
- Completed/current/locked node states remain visible independently of Milo.
- Pending art is suppressed by MiloCompanion until its final asset is registered as ready.

## Closure rule
Do NOT mark this block closed until every checkbox above is complete and the final end-to-end verification passes.

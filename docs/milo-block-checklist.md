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
- [x] Connect MiloCompanion to FeedbackCard
- [x] Connect Speaking AI states
- [x] Connect Writing AI states
- [x] Connect student dashboard to real progress
- [ ] Connect lesson player / exercises
- [ ] Connect unlock and retry flow (80-point rule)
- [ ] Connect gamification / streaks / rewards
- [ ] Connect certificates
- [ ] Connect calendar/deadlines
- [ ] Connect recoverable error/network states (logic started in AI; pending final Error/Connection art and platform-wide handler)
- [ ] Add final PNGs for every pending asset
- [ ] Verify responsive behavior and accessibility
- [ ] Verify no broken asset paths
- [ ] Run final end-to-end verification of the MILO block

## Integration behavior now established
- AI feedback cards select Milo from the real score.
- Speaking uses Speaking → Recording → Thinking → score reaction.
- Writing uses Writing → Thinking → score reaction.
- AI failures preserve the student's work/recording flow and use the registered Error state when its final art is available.
- Student dashboard selects Milo from actual lesson progress rather than random messages.
- Pending art never produces a broken image.

## Closure rule
Do NOT mark this block closed until every checkbox above is complete and the final end-to-end verification passes.

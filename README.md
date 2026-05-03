# Pool Deck Response

Pool Deck Response is a static GitHub Pages first-aid scenario practice app. It started as a Roblox/Rojo MVP, then was ported to plain web files so it is easier to edit, publish, and replace with class flashcards later.

GitHub repo: https://github.com/jlsp124/nl2026

The Roblox prototype is preserved on the `roblox-mvp` branch. The `main` branch is the GitHub Pages web app.

## What It Is

- A casual class-practice first-aid trainer.
- A static website with no backend, no framework, and no build step.
- A way to practice order of care, weak choices, dangerous choices, equipment timing, reassessment, and close distractors.
- A place to draft instructor-review-ready scenario rules before the real flashcards are available.

The start screen note intentionally stays casual:

```text
“I didn’t have the flashcards so I just got GPT to make scenarios.”
```

## Study Modes

### Practice Mode

Practice Mode walks through staged scenario cards and gives small coaching updates while you choose actions.

Flow:

1. Read the scenario.
2. Choose actions through the staged cards.
3. Selected actions leave the available choices and move into `Your order`.
4. Continue to `Review / Submit`.
5. Reorder with drag/drop where supported, or use `Up`, `Down`, and `Remove`.
6. Submit for score and plain-language feedback.

### Test Mode

Test Mode uses the same scenarios and scoring, but avoids coaching until submit.

### Question Mode

Question Mode is a faster trap-question drill. It shows one mini-case or tricky question with 3-4 close answer choices.

After answering, it shows:

- Correct answer.
- Why the correct answer fits.
- Why each wrong answer is wrong.
- Related scenario topic/tag.
- Simple score such as `4/5 correct`.

Question data currently lives in `scenarios.js` beside the scenario data.

## Current Scenario Flow

Scenario mode uses these stages:

1. Primary assessment
2. ABC / life threats
3. Help / EMS / equipment
4. Treatment
5. Secondary assessment / ongoing care
6. Review / Submit

The user does not manually click category tabs. Each scenario decides which actions appear in each stage.

## First-Aid Content Audit Notes

The starter content is organized around source-aligned concepts that still need instructor review:

- Primary assessment: scene safety, responsiveness/level of consciousness, airway and breathing, circulation/obvious life threats, major bleeding, and mechanism of injury.
- Secondary assessment: vital signs, head-to-toe check, history/SAMPLE-style questions, reassessment, and monitoring.
- CPR/AED: CPR/AED is scored as correct only when the victim is unresponsive and not breathing normally.
- Severe bleeding: firm direct pressure, maintaining/reinforcing pressure, early help/EMS for heavy bleeding, and shock care after bleeding control starts.
- Burns: remove from the burn source if safe, cool first with clean cool water, get a first aid kit/clean dressing, then cover loosely after cooling.
- Heat illness: heat exhaustion emphasizes cooler area, rest, loosen/remove heat-trapping gear, fluids only if awake/able, and monitoring; heat stroke suspicion emphasizes EMS and active cooling.
- Fractures: basics first, support/immobilize, avoid unnecessary movement, check circulation/sensation/movement if taught, get help depending severity, and monitor.
- Asthma/breathing difficulty: breathing check, position of comfort, prescribed inhaler/action plan if available and allowed, EMS if severe/not improving, and reassessment.
- Anaphylaxis: airway/breathing concerns, early EMS, epinephrine auto-injector help if available/allowed, and monitoring.

Source basis is summarized in `contentSources` inside `scenarios.js`. The gameplay UI does not show citations or heavy disclaimer wording.

Reference pages used for alignment:

- American Red Cross assessment guidance: https://guidelines.redcross.org/guidelines-database/assessment/
- American Red Cross CPR steps: https://www.redcross.org/take-a-class/cpr/performing-cpr/cpr-steps
- American Red Cross life-threatening external bleeding: https://www.redcross.org/take-a-class/resources/learn-first-aid/bleeding-life-threatening-external
- American Red Cross burns: https://www.redcross.org/take-a-class/resources/learn-first-aid/burns
- Canadian Red Cross heat emergencies: https://www.redcross.ca/training-and-certification/first-aid-tips-and-resources/first-aid-tips/first-aid-safety/5-climate-emergencies-you-need-to-be-ready-for
- American Red Cross asthma attack: https://www.redcross.org/take-a-class/resources/learn-first-aid/asthma-attack
- Canadian Red Cross anaphylaxis/insect bite first aid: https://www.redcross.ca/blog/2024/6/beat-the-bite-first-aid-for-insect-bites
- American Red Cross muscle, bone, and joint injury: https://www.redcross.org/take-a-class/resources/learn-first-aid/muscle-bone-joint-injury
- Lifesaving Society test-sheet list, including Oxygen Administration and National Lifeguard materials: https://www.lifesaving.org/member-services/delivery-system/test-sheets

## Oxygen / Pulse Ox Handling

Advanced lifeguard-equipment actions are included but are not universal basic first-aid requirements:

- `Check SpO2 with pulse oximeter if trained/equipment available`
- `Prepare oxygen kit`
- `Administer oxygen if trained and protocol indicates`
- `Prepare BVM/oxygen support if trained`
- `Use suction if trained/protocol indicates`

These actions are tagged in data as:

- `advanced`
- `lifeguard-equipment`
- `instructor-review-needed`

They are only optional/contextual in scenarios where they make sense, such as respiratory distress, anaphylaxis with breathing trouble, altered responsiveness, or CPR/AED-style breathing emergencies.

## Scenario Rules

All scenario and action data lives in:

```text
scenarios.js
```

Each scenario supports:

- `id`
- `title`
- `prompt`
- `stages`
- `recommendedSequence`
- `criticalActions`
- `expectedActions`
- `contextualActions`
- `optionalGoodActions`
- `weakActions`
- `dangerousActions`
- `advancedActions`
- `orderRules`
- `actionFeedback`
- `hints`
- `suggestedOrderText`
- `sourceNotes`
- `instructorReviewNotes`
- `tags`
- `difficulty`

Rule meanings:

- `criticalActions`: major misses if absent.
- `expectedActions`: useful expected care, but less punishing than critical actions.
- `contextualActions`: useful in this scenario without being universal first aid.
- `optionalGoodActions`: small rewards for helpful extra actions.
- `weakActions`: incomplete choices, such as light pressure for heavy bleeding.
- `dangerousActions`: serious mistakes, such as CPR on a normally breathing person.
- `advancedActions`: trained/equipment-dependent actions that need instructor review.
- `orderRules`: sequencing checks, such as cooling before covering a burn or getting EMS/AED before CPR.

## How To Fine-Tune With Instructor Cards

When the real flashcards or instructor situation cards are available:

1. Replace `prompt` with the card wording.
2. Adjust each stage's `choices` so the distractors match what classmates are likely to pick.
3. Put must-have actions in `criticalActions`.
4. Put expected but less fatal misses in `expectedActions`.
5. Put context-specific trained/equipment actions in `contextualActions` or `advancedActions`.
6. Put "nice to have" actions in `optionalGoodActions`.
7. Put plausible but incomplete choices in `weakActions`.
8. Put serious mistakes in `dangerousActions`.
9. Add `orderRules` for priority mistakes.
10. Add short `actionFeedback` for Practice Mode.
11. Add `hints` for each stage.
12. Update `sourceNotes` and `instructorReviewNotes`.
13. Add matching Question Mode items for common traps.

Keep the scenario format simple so classmates and instructors can review it without installing tools.

## Run Locally

Open directly:

```text
index.html
```

Or serve the folder:

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

No npm install, framework, or build step is required.

## Publish With GitHub Pages

1. Push `main` to GitHub.
2. Open repo settings for `https://github.com/jlsp124/nl2026`.
3. Go to `Pages`.
4. Source: deploy from branch.
5. Branch: `main`.
6. Folder: `/root`.
7. Save.

## Files

```text
index.html
styles.css
app.js
scenarios.js
README.md
.gitignore
```

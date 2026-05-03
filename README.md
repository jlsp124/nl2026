# Pool Deck Response

Pool Deck Response is a static web version of the first aid scenario quiz that started as a Roblox/Rojo MVP. It is built for quick class practice: read a scenario, choose actions in order, review/reorder the sequence, submit, and get feedback.

GitHub repo: https://github.com/jlsp124/nl2026

The Roblox prototype is preserved on the `roblox-mvp` branch. The `main` branch is the GitHub Pages web app.

## What It Is

- A casual class-practice first aid scenario app.
- A static GitHub Pages site with no backend.
- A port of the earlier Roblox prototype data and scoring ideas.
- A way to practice order of care, weak treatment choices, dangerous choices, help/equipment timing, and reassessment.

## Current Flow

1. Choose `Practice Mode` or `Test Mode`.
2. Move through staged cards: primary assessment, ABC/life threats, help/equipment, treatment, ongoing care.
3. Pick actions. Chosen actions leave the available list and move into `Your order`.
4. Continue to `Review / Submit`.
5. Reorder actions by drag/drop where supported, or use `Up`, `Down`, and `Remove`.
6. Submit for score and feedback.

Practice Mode shows small scenario updates and hints. Test Mode avoids coaching until submit.

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
- `orderRules`
- `actionFeedback`
- `hints`
- `suggestedOrderText`
- `sourceNotes`
- `instructorReviewNotes`
- `tags`

`criticalActions` are major misses if absent. `expectedActions` matter but are less punishing. `contextualActions` let a scenario reward actions that are useful only in that situation. `orderRules` catch sequencing problems, such as treating before assessment, delaying EMS/AED, CPR before breathing checks, or direct pressure happening too late.

## Add Instructor Flashcards Later

The starter scenarios are source-labeled practice drafts. They are designed so instructor cards can replace or fine-tune them.

When the real flashcards are available:

1. Replace prompts with the card wording.
2. Put choices into the staged cards.
3. Set `recommendedSequence` to the intended order.
4. Put must-have actions in `criticalActions`.
5. Put useful-but-not-fatal misses in `expectedActions`.
6. Put "nice to have" actions in `optionalGoodActions`.
7. Put plausible weak choices in `weakActions`.
8. Put serious mistakes in `dangerousActions`.
9. Add `orderRules` for priority mistakes.
10. Add short `actionFeedback` and `hints` for Practice Mode.
11. Keep `sourceNotes` and `instructorReviewNotes` updated.

Keep the scenario format simple so classmates can review and edit it without a build tool.

# Pool Deck Response

Pool Deck Response is a static GitHub Pages first-aid scenario practice app for class practice.

GitHub repo: https://github.com/jlsp124/nl2026

The `main` branch is the web app. The Roblox prototype remains preserved on the `roblox-mvp` branch.

## Source Of Truth

App content is now based on:

```text
source/First Aid Practise Cards.docx
```

The old GPT placeholder scenarios were replaced with practice-card scenarios and Question Mode items generated from that document. The app still keeps its casual mobile-first card UI, staged action selection, selected order, review/reorder, scoring, and feedback.

Start-screen note:

```text
Based on our first aid practice cards.
```

## Study Modes

- `Practice Mode`: staged scenario practice with coaching updates.
- `Test Mode`: same staged scenarios and 100-point scoring, but feedback waits until submit.
- `Question Mode`: harder mini-case questions with close distractors from other cards.

Scenario stages are:

1. Assessment
2. Call EMS / get help
3. Treatment
4. Monitor / reassess
5. Review / Submit

## Content Counts

- 32 source-card scenarios
- 32 Question Mode items
- 134 action choices

Cards currently marked for instructor review:

- `Nose Injuries`: source wording repeats ear-injury text.
- `Radiation Burns`: source treatment repeats electrical-burn text.

See `source-summary.md` for notes.

## Editing Scenarios

All scenario and action data lives in:

```text
scenarios.js
```

Each scenario includes:

- `id`
- `title`
- `cardSourceTitle`
- `prompt`
- `scenarioText`
- `stages`
- `recommendedSequence`
- `criticalActions`
- `expectedActions`
- `optionalGoodActions`
- `weakActions`
- `dangerousActions`
- `orderRules`
- `actionFeedback`
- `hints`
- `suggestedOrderText`
- `sourceCardTreatment`
- `sourceCardScenario`
- `instructorReviewNotes`
- `tags`
- `difficulty`

Scoring stays 100-point based on the document treatment steps:

- `criticalActions`: must-do card actions.
- `expectedActions`: normal card treatment or monitoring steps.
- `optionalGoodActions`: useful extras or context-specific card branches.
- `weakActions`: incomplete or out-of-branch actions.
- `dangerousActions`: actions the card says not to do.
- `orderRules`: sequencing mistakes, such as tourniquet before direct pressure or flushing dry chemical before brushing.

Keep `sourceCardTreatment` and `sourceCardScenario` close to the Word document wording. Rewrite `prompt` only enough to make the playable scenario natural.

## Adding More Instructor Cards

1. Add the new card wording to `sourceCards` in `scenarios.js`.
2. Add or reuse actions in `actions`.
3. Add a `makeScenario(...)` entry using the card treatment steps.
4. Put must-have steps in `criticalActions`.
5. Put normal treatment and monitoring steps in `expectedActions`.
6. Put card warnings in `dangerousActions`.
7. Mark unclear or extra assumptions in `instructorReviewNotes`.
8. Add a matching `makeQuestion(...)` item with close distractors from other cards.
9. Run the local static checks and browser smoke test.

Do not invent extra treatment rules as source truth. If an extra rule is useful for class discussion, mark it clearly as extra / instructor-review-needed.

## Run Locally

No npm install, framework, or build step is required.

Serve the folder:

```powershell
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

Opening `index.html` directly also works for quick checks, but the `http.server` command is the expected local test path.

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
source/First Aid Practise Cards.docx
source-summary.md
```

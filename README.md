# Pool Deck Response

Pool Deck Response is a static web version of the first aid scenario quiz that started as a Roblox/Rojo MVP. It is built for quick class practice: read a scenario, choose actions in order, move through care stages, submit, and get feedback.

GitHub repo: https://github.com/jlsp124/nl2026

## What It Is

- A casual first aid scenario practice app.
- A static GitHub Pages site with no backend.
- A port of the earlier Roblox prototype data and scoring ideas.
- A way to practice order of care, weak treatment choices, dangerous choices, help/equipment timing, and reassessment.

## Why It Was Ported From Roblox

The Roblox/Rojo version was useful for proving the quiz loop, scenario data, action choices, and feedback model. For sharing in class, a static website is simpler:

- No Roblox Studio needed.
- No Rojo install needed.
- No npm or build step.
- Works from GitHub Pages.
- Works locally by opening `index.html`.

The Roblox prototype is preserved on the `roblox-mvp` branch.

## Files

```text
index.html
styles.css
app.js
scenarios.js
README.md
.gitignore
```

## Run Locally

Option 1: open the file directly.

```text
index.html
```

Option 2: serve the folder locally.

```powershell
python -m http.server
```

Then open:

```text
http://localhost:8000
```

## Publish With GitHub Pages

1. Push the `main` branch to GitHub.
2. Open the repo settings for `https://github.com/jlsp124/nl2026`.
3. Go to Pages.
4. Set the source to deploy from `main`.
5. Set the folder to `/root`.
6. Save and wait for GitHub Pages to publish.

## Edit Scenarios

All scenario data lives in:

```text
scenarios.js
```

Each scenario includes:

- `id`
- `title`
- `prompt`
- `stages`
- `recommendedSequence`
- `criticalActions`
- `weakActions`
- `dangerousActions`
- `optionalGoodActions`
- `actionFeedback`
- `suggestedOrderText`
- `hints`
- `tags`

Actions are defined near the top of `scenarios.js`. If you add a new action id to a scenario, also add it to the `actions` object.

## Add Instructor Flashcards Later

When real class cards are available:

1. Replace each starter prompt with the card wording.
2. Put choices into the right stage: primary, ABC/life threats, help, treatment, ongoing care.
3. Set `recommendedSequence` to the order you want tested.
4. Mark must-have actions in `criticalActions`.
5. Put weak but plausible choices in `weakActions`.
6. Put serious mistakes in `dangerousActions`.
7. Add short `actionFeedback` lines for Practice Mode.
8. Add stage-specific `hints`.

Keep the scenario format simple so classmates can review and edit it without a build tool.

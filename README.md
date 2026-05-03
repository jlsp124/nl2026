# Pool Deck Response

Pool Deck Response is a beginner-friendly Rojo Roblox project for a simple single-player first aid / National Lifeguard practice trainer for British Columbia, Canada.

It presents short pool-deck scenarios, lets the player build an ordered response sequence, scores the response, and gives specific feedback about missed critical actions, dangerous choices, weak choices, and order problems.

## Disclaimer

Practice tool only. Follow your instructor, course materials, and local protocol.

This is not an official medical, legal, certification, or National Lifeguard assessment tool. The game must not be used to decide whether someone passed certification.

Use wording such as:

- Strong response
- Needs review
- Missed critical priority
- Good first step, but incomplete
- Check your instructor's protocol

Do not use wording such as "passed certification."

## What This Game Is

- A decision-making practice trainer.
- A way to test treatment order, missed critical actions, incomplete choices, and common mistakes.
- A starter Rojo project with all gameplay data in normal text files.
- A prototype that should be reviewed by an instructor before use.

## What This Game Is Not

- Not an official medical, legal, certification, or National Lifeguard tool.
- Not a replacement for an instructor, course materials, or local protocol.
- Not a full lifeguarding game.
- Not a swimming, rescue, whistle, pool-clearing, multiplayer, inventory, animation, or 3D simulation project.

## Project Structure

```text
default.project.json
src/
  ReplicatedStorage/
    FirstAidScenarios.luau
    ActionDefinitions.luau
    ScoringRules.luau
  StarterPlayer/
    StarterPlayerScripts/
      FirstAidQuiz.client.luau
```

Rojo maps these files into Roblox as:

- `FirstAidScenarios.luau`: ModuleScript in ReplicatedStorage.
- `ActionDefinitions.luau`: ModuleScript in ReplicatedStorage.
- `ScoringRules.luau`: ModuleScript in ReplicatedStorage.
- `FirstAidQuiz.client.luau`: LocalScript in StarterPlayerScripts.

The LocalScript creates all UI at runtime.

## Requirements

- Roblox Studio.
- Rojo installed on your machine.

If Rojo is not installed yet, install it from the official Rojo project instructions, then come back to this folder.

## Build With Rojo

From this folder:

```powershell
rojo build -o build.rbxlx
```

This creates `build.rbxlx`, which can be opened in Roblox Studio.

## Serve With Rojo

From this folder:

```powershell
rojo serve
```

Then in Roblox Studio:

1. Open the Rojo plugin.
2. Connect to the local Rojo server.
3. Press Play to test the LocalScript UI.

## How The Game Loop Works

1. A scenario prompt appears.
2. Victim status tags appear.
3. Action buttons are grouped by category.
4. The player builds an ordered response sequence.
5. The player submits the sequence.
6. The scoring module checks critical actions, priority order, optional actions, weak choices, and dangerous choices.
7. The game shows detailed feedback.
8. The player can retry or go to the next randomized scenario.

## How To Add Scenarios

Open:

```text
src/ReplicatedStorage/FirstAidScenarios.luau
```

Copy an existing scenario table and change:

- `id`
- `title`
- `category`
- `prompt`
- `victimStatusTags`
- `recommendedSequence`
- `criticalActions`
- `optionalGoodActions`
- `dangerousActions`
- `weakActions`
- `commonMistakes`
- `feedbackByAction`
- `successFeedback`
- `instructorNote`
- `sourceNote`

Use action ids from:

```text
src/ReplicatedStorage/ActionDefinitions.luau
```

Do not invent a new action id in a scenario unless you also add that action to `ActionDefinitions.luau`.

## Replace Scenario Data With Instructor Situation Cards

The starter scenarios are only placeholders based on common first aid training concepts. They must be verified against your instructor, course materials, and local protocol.

Recommended replacement workflow:

1. Ask the instructor for approved situation cards.
2. Convert each card into one scenario table.
3. Use instructor-approved wording for prompts, status tags, critical actions, and feedback.
4. Keep `sourceNote` clear, for example: `Based on instructor-approved card set, updated YYYY-MM-DD`.
5. Have the instructor test each scenario in Roblox Studio.

## Public Asset Plan For Later

This prototype intentionally uses only runtime UI and no external assets.

Later, public-safe assets could be added for:

- Simple pool-deck background image.
- Generic first aid kit icon.
- Generic AED icon.
- Generic status tag icons.
- Simple UI sounds for submit/retry/next.

Only use assets that are public domain, licensed for your use, created in-house, or approved by the course/instructor. Keep asset credits in the README or a future `ASSETS.md`.

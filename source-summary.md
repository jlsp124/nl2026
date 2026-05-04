# First Aid Practice Card Source Notes

Source document:

```text
source/First Aid Practise Cards.docx
```

The app now uses the uploaded document as the source of truth for scenario and Question Mode content. `sourceCardTreatment` and `sourceCardScenario` in `scenarios.js` preserve the source wording as closely as practical.

Normal Question Mode excludes cards flagged `hideFromQuestionMode` or `reviewOnly`, so unclear source-card issues stay in data/notes instead of becoming gameplay questions.

## Scenario Coverage

32 source-card scenarios were created:

- Diabetes
- Seizures
- Anaphylaxis
- Unconscious Breathing
- Choking
- Asthma
- Hyperventilation
- Drowning
- Slings
- Chest Pain
- Stroke/TIA
- Major Bleeding
- Wounds
- Concussion
- Spinal Injury
- Ear Injuries
- Dental/Mouth Injuries
- Nose Injuries
- Open-Chest Wound
- Broken Ribs
- Flail Chest
- Internal Bleeding
- Protruding Organs
- Sprains & Strains
- Dislocation
- Closed Fracture
- Open Fracture
- Pelvic/Hip Fracture
- Thermal Burns
- Chemical Burns
- Electrical Burns
- Radiation Burns

## Instructor Review Notes

- `Nose Injuries`: the source section appears to repeat `Ear Injuries` content, including `Foreign Object in Ear` wording. The app preserves the wording and marks the card as instructor-review-needed.
- `Radiation Burns`: the source section appears to repeat `Electrical Burns` treatment. The app preserves the wording and marks the card as instructor-review-needed.
- `Asthma`: the source says `try learning forward slightly`; the source field preserves that wording, while the playable prompt/action label uses `leaning forward slightly`.
- `Protruding Organs`: the source says `paper towl`; the source field preserves that typo.

No extra treatment rules were promoted as source truth for these unclear cards.

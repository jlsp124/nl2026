(function () {
  "use strict";

  const stageDefinitions = {
    primary: {
      title: "Primary assessment",
      help: "Start with scene safety, responsiveness, and the quick facts that shape the rest of the response.",
    },
    abc: {
      title: "ABC / life threats",
      help: "Check airway/breathing, major bleeding, circulation clues, and obvious life threats.",
    },
    help: {
      title: "Help / EMS / equipment",
      help: "Bring in people and gear when the scenario is serious, could worsen, or needs supplies.",
    },
    treatment: {
      title: "Treatment",
      help: "Pick the care that fits the problem. Weak choices are included on purpose.",
    },
    ongoing: {
      title: "Secondary assessment / ongoing care",
      help: "After immediate care, check vitals, history, head-to-toe findings, and keep reassessing.",
    },
    review: {
      title: "Review / Submit",
      help: "Reorder your actions if needed, then submit for feedback.",
    },
  };

  const sourceNotes = {
    general:
      "Source-aligned starter concept: primary assessment uses scene safety, level of consciousness/responsiveness, airway, breathing, circulation/major bleeding, and mechanism; secondary assessment uses vitals, head-to-toe check, and history. Instructor review needed.",
    cprAed:
      "Source-aligned starter concept: CPR/AED practice requires recognizing unresponsive plus not breathing normally, calling EMS/911, getting an AED, and starting CPR/AED care. Instructor review needed.",
    unresponsiveBreathing:
      "Source-aligned starter concept: unresponsive but breathing practice focuses on airway maintenance/recovery-position style care, getting help, and close monitoring. Instructor review needed.",
    severeBleeding:
      "Source-aligned starter concept: severe external bleeding practice focuses on PPE, recognizing heavy bleeding, firm direct pressure, maintaining pressure, help/EMS depending severity, shock care, and monitoring. Instructor review needed.",
    burn:
      "Source-aligned starter concept: burn practice focuses on removing from source if safe, cooling with cool clean water, loose covering/protection, and avoiding ice/blisters/random creams. Instructor review needed.",
    heat:
      "Source-aligned starter concept: heat illness practice distinguishes heat exhaustion from heat stroke signs; severe confusion/altered responsiveness needs EMS and active cooling. Instructor review needed.",
    fracture:
      "Source-aligned starter concept: fracture practice focuses on assessment, support/immobilization, avoiding unnecessary movement, circulation/sensation/movement checks, help, and monitoring. Instructor review needed.",
    asthma:
      "Source-aligned starter concept: breathing difficulty/asthma practice focuses on position of comfort, calming/rest, helping with prescribed inhaler if available/allowed, EMS for severe or worsening symptoms, and monitoring breathing. Instructor review needed.",
    anaphylaxis:
      "Source-aligned starter concept: allergic reaction/anaphylaxis practice focuses on recognizing airway/breathing/circulation risk, EMS, epinephrine auto-injector assistance if available/allowed, and monitoring. Instructor review needed.",
  };

  const contentSources = [
    {
      topic: "Primary and secondary assessment",
      summary:
        "Uses a Lifesaving Society-style split between primary assessment (scene safety, responsiveness/LOC, airway, breathing, circulation/major bleeding, mechanism) and secondary assessment (vital signs, head-to-toe check, history, reassessment/monitoring).",
    },
    {
      topic: "CPR/AED",
      summary:
        "CPR/AED choices are treated as correct only for unresponsive victims who are not breathing normally; breathing normally routes toward airway maintenance and monitoring instead.",
    },
    {
      topic: "Severe bleeding",
      summary:
        "Heavy bleeding scenarios prioritize firm direct pressure, maintaining/reinforcing pressure, EMS/help, and shock care after bleeding control starts.",
    },
    {
      topic: "Burns",
      summary:
        "Burn scenarios use stop/remove from source if safe, cool with clean cool water, get clean dressing/supplies, then cover loosely after cooling.",
    },
    {
      topic: "Heat illness",
      summary:
        "Heat exhaustion emphasizes cooler area, rest, gear removal, fluids only if awake/able, and monitoring; heat stroke suspicion emphasizes early EMS and active cooling.",
    },
    {
      topic: "Oxygen and pulse oximetry",
      summary:
        "Pulse ox, oxygen, BVM, and suction are tagged advanced/lifeguard-equipment/instructor-review-needed and are not universal basic first-aid requirements.",
    },
  ];

  const instructorReviewNotes = {
    general: "Ask our instructor if something is different.",
    cprAed: "Ask our instructor how they want CPR/AED steps and wording handled.",
    unresponsiveBreathing: "Ask our instructor how they want airway/recovery-position wording handled.",
    severeBleeding: "Ask our instructor when this class wants EMS called for heavy bleeding.",
    burn: "Ask our instructor for the exact burn cooling time and dressing wording.",
    heat: "Ask our instructor how they want heat exhaustion vs heat stroke decisions taught.",
    fracture: "Ask our instructor how much circulation/sensation/movement detail they want here.",
    asthma: "Ask our instructor what the class card says about inhalers and EMS triggers.",
    anaphylaxis: "Ask our instructor what the class card says about epinephrine and second-dose timing.",
  };

  const actions = {
    scene_safety: {
      label: "Check scene safety",
      detail: "Make sure the area is safe before getting hands-on.",
      type: "assessment",
      positive: "You checked scene safety before treatment. Good.",
      missed: "You skipped scene safety. Start by making sure the area is safe.",
    },
    ppe_barriers: {
      label: "Use PPE / barrier precautions",
      detail: "Use gloves or a barrier if available.",
      type: "assessment",
      positive: "PPE/barrier precautions fit well here.",
      missed: "You missed PPE/barrier precautions.",
    },
    check_responsiveness: {
      label: "Check responsiveness",
      detail: "See if they respond to voice or touch.",
      type: "assessment",
      positive: "You checked responsiveness before treatment. Good.",
      missed: "You missed responsiveness/level of consciousness.",
    },
    check_mechanism: {
      label: "Check what happened / mechanism",
      detail: "Notice what caused the problem and whether movement might make it worse.",
      type: "assessment",
      positive: "You checked what happened before choosing care.",
      missed: "You missed the mechanism/history clue.",
    },
    check_airway_breathing: {
      label: "Check airway and breathing",
      detail: "Decide if breathing is normal, difficult, or absent.",
      type: "assessment",
      positive: "You checked airway/breathing before choosing care.",
      missed: "You missed airway/breathing. That is critical for an unresponsive victim or breathing emergency.",
    },
    check_severe_bleeding: {
      label: "Check for severe bleeding",
      detail: "Look fast for bleeding that needs immediate pressure.",
      type: "assessment",
      positive: "You checked for severe bleeding.",
      missed: "You missed the severe bleeding check.",
    },
    check_circulation_life_threats: {
      label: "Check circulation / obvious life threats",
      detail: "Scan for pale skin, shock signs, major injury, or danger signs.",
      type: "assessment",
      positive: "You checked for circulation clues and obvious life threats.",
      missed: "You missed circulation/obvious life-threat clues.",
    },
    call_ems_911: {
      label: "Call EMS / 911",
      detail: "Get emergency help started.",
      type: "help",
      positive: "You got EMS moving when the scenario was serious.",
      missed: "You missed EMS/911 for a serious scenario.",
    },
    get_aed: {
      label: "Get AED",
      detail: "Bring the AED when a breathing/cardiac emergency is possible.",
      type: "help",
      positive: "You got the AED involved early.",
      missed: "You missed getting the AED.",
    },
    get_first_aid_kit: {
      label: "Get first aid kit / clean dressing",
      detail: "Bring dressings, gloves, sterile non-stick dressing, or clean cloth.",
      type: "help",
      positive: "You brought useful first aid supplies/clean dressing.",
      missed: "You missed bringing first aid supplies or a clean dressing.",
    },
    get_backup: {
      label: "Get backup / notify lifeguard team",
      detail: "Get another trained person helping.",
      type: "help",
      positive: "Getting backup helps keep the response moving.",
      missed: "You missed getting backup/help.",
    },
    cpr_aed: {
      label: "Start CPR / use AED",
      detail: "Use when the person is unresponsive and not breathing normally.",
      type: "treatment",
      positive: "CPR/AED fits when the person is unresponsive and not breathing normally.",
      missed: "You missed CPR/AED care for a not-breathing-normally scenario.",
    },
    recovery_position_airway: {
      label: "Recovery position / keep airway open",
      detail: "For an unresponsive person who is breathing.",
      type: "treatment",
      positive: "Maintaining the airway fits an unresponsive breathing victim.",
      missed: "You missed airway maintenance/recovery-position style care.",
    },
    firm_direct_pressure: {
      label: "Apply firm direct pressure",
      detail: "Use strong pressure on severe bleeding.",
      type: "treatment",
      positive: "Firm direct pressure is the key heavy-bleeding treatment.",
      missed: "You missed firm direct pressure for heavy bleeding.",
    },
    light_pressure_pad: {
      label: "Put pad on wound lightly",
      detail: "A weak bleeding-control choice.",
      type: "treatment",
      quality: "weak",
      warning: "Light pressure is not enough for heavy bleeding. Use firm direct pressure and maintain it.",
    },
    maintain_pressure: {
      label: "Maintain pressure / add dressing",
      detail: "Keep pressure on and reinforce if needed.",
      type: "treatment",
      positive: "Maintaining pressure keeps bleeding control working.",
      missed: "You missed maintaining pressure.",
    },
    remove_pressure_early: {
      label: "Keep lifting dressing to check bleeding",
      detail: "Can restart bleeding if done too early or too often.",
      type: "treatment",
      quality: "weak",
      warning: "Keep checking by removing pressure too often is weak for heavy bleeding.",
    },
    ignore_severe_bleeding: {
      label: "Ignore the heavy bleeding for now",
      detail: "A serious priority mistake.",
      type: "treatment",
      quality: "danger",
      warning: "Ignoring heavy bleeding is a critical miss.",
    },
    remove_embedded_object: {
      label: "Remove embedded object",
      detail: "A dangerous choice if an object is stuck in the wound.",
      type: "treatment",
      quality: "danger",
      warning: "Do not remove an embedded object in this practice setup.",
    },
    treat_shock_monitor: {
      label: "Treat for shock / monitor",
      detail: "Keep them still, supported, and watched.",
      type: "treatment",
      positive: "Shock care and monitoring are useful after major problems are being handled.",
      missed: "You missed shock care/monitoring.",
    },
    treat_shock_first: {
      label: "Treat shock before controlling bleeding",
      detail: "Supportive care is not enough before heavy bleeding is controlled.",
      type: "treatment",
      quality: "weak",
      warning: "Treating shock before controlling heavy bleeding is out of order.",
    },
    support_immobilize_injury: {
      label: "Support and immobilize injury",
      detail: "Support the injured part and limit movement.",
      type: "treatment",
      positive: "Supporting and immobilizing the injury fits the fracture scenario.",
      missed: "You missed supporting/immobilizing the injury.",
    },
    check_csm: {
      label: "Check circulation/sensation/movement",
      detail: "Check CSM around an injured limb if taught in class.",
      type: "ongoing",
      positive: "Checking circulation/sensation/movement helps track limb status.",
      missed: "You missed circulation/sensation/movement around the injury.",
    },
    reassure_only: {
      label: "Only reassure them",
      detail: "Kind, but not enough by itself.",
      type: "treatment",
      quality: "weak",
      warning: "Reassurance helps, but it is not enough without assessment and support.",
    },
    force_straighten_deformity: {
      label: "Force the arm straight",
      detail: "A dangerous movement choice.",
      type: "treatment",
      quality: "danger",
      warning: "Forcing a deformed injury straight can make things worse.",
    },
    move_spinal_unnecessary: {
      label: "Move suspected spinal victim unnecessarily",
      detail: "Can make a head/neck/spine injury worse.",
      type: "treatment",
      quality: "danger",
      warning: "Unnecessary movement can make a possible head/neck/spine injury worse.",
    },
    remove_from_burn_source: {
      label: "Remove from burn source if safe",
      detail: "Stop the burning process when it is safe to do so.",
      type: "treatment",
      positive: "You stopped the burn from continuing.",
      missed: "You missed removing them from the burn source if safe.",
    },
    cool_burn_water: {
      label: "Cool burn with cool clean water",
      detail: "Cool the burn instead of adding random products.",
      type: "treatment",
      positive: "Cooling with clean cool water is the key burn step.",
      missed: "You missed cooling the burn with cool clean water.",
    },
    cover_burn_loosely: {
      label: "Cover burn loosely with sterile non-stick dressing / clean cloth",
      detail: "Protect it after cooling without tight pressure.",
      type: "treatment",
      positive: "Loose sterile/clean covering protects the burn after cooling.",
      missed: "You missed covering/protecting the burn after cooling.",
    },
    cover_without_cooling: {
      label: "Cover burn right away without cooling",
      detail: "Incomplete because cooling comes first.",
      type: "treatment",
      quality: "weak",
      warning: "Covering immediately without cooling misses the main burn step.",
    },
    ice_direct_burn: {
      label: "Apply ice directly to burn",
      detail: "A bad burn-care choice.",
      type: "treatment",
      quality: "danger",
      warning: "Do not put ice directly on a burn.",
    },
    pop_blisters_creams: {
      label: "Pop blisters / apply random creams",
      detail: "A bad burn-care choice.",
      type: "treatment",
      quality: "danger",
      warning: "Do not pop blisters or start with random creams.",
    },
    move_cooler_area: {
      label: "Move to cooler area",
      detail: "Get them out of the heat if safe.",
      type: "treatment",
      positive: "Moving to a cooler area reduces heat stress.",
      missed: "You missed moving them to a cooler area.",
    },
    rest_in_cool_area: {
      label: "Rest in cooler area",
      detail: "Have them stop activity and rest while cooling.",
      type: "treatment",
      positive: "Resting in a cooler area fits heat illness care.",
      missed: "You missed having them rest.",
    },
    fan_only: {
      label: "Place beside fan only",
      detail: "Not enough for serious heat signs.",
      type: "treatment",
      quality: "weak",
      warning: "Fan only is weak for heat stroke signs. Active cooling and EMS matter.",
    },
    loosen_heavy_gear: {
      label: "Loosen/remove heavy gear",
      detail: "Remove heat-trapping layers or gear if safe.",
      type: "treatment",
      positive: "Removing heat-trapping gear supports cooling.",
      missed: "You missed loosening/removing heat-trapping gear.",
    },
    wet_skin_fan: {
      label: "Wet skin/clothing and fan",
      detail: "Active cooling for serious heat illness.",
      type: "treatment",
      positive: "Water plus fanning gives active cooling.",
      missed: "You missed active cooling with water/fanning.",
    },
    cold_packs_core: {
      label: "Apply cold packs to core areas",
      detail: "Cooling support for severe heat illness.",
      type: "treatment",
      positive: "Cold packs to core areas support active cooling.",
      missed: "You missed cold packs/core cooling.",
    },
    sips_fluid_awake: {
      label: "Give small sips if awake/able",
      detail: "Only if awake, able to swallow, and the scenario fits.",
      type: "treatment",
      positive: "Small sips can fit if they are awake and able.",
      missed: "You missed fluids for an awake heat-exhaustion style scenario.",
    },
    water_unresponsive: {
      label: "Give water to an unresponsive victim",
      detail: "Dangerous because they may not swallow safely.",
      type: "treatment",
      quality: "danger",
      warning: "Do not give fluids to an unresponsive person.",
    },
    cpr_while_breathing: {
      label: "Start CPR while victim is breathing",
      detail: "Wrong care if normal breathing is present.",
      type: "treatment",
      quality: "danger",
      warning: "CPR is not the right choice if the person is breathing normally.",
    },
    monitor_only: {
      label: "Only monitor them",
      detail: "Sometimes useful later, but weak if urgent care is needed first.",
      type: "ongoing",
      quality: "weak",
      warning: "Only monitoring is not enough when urgent care is needed.",
    },
    delay_ems_aed: {
      label: "Delay EMS / needed equipment until later",
      detail: "A bad delay in serious scenarios.",
      type: "help",
      quality: "danger",
      warning: "Delaying EMS or needed equipment is dangerous in this scenario.",
    },
    ignore_worsening_confusion: {
      label: "Ignore worsening confusion",
      detail: "A serious miss in heat or allergic/breathing scenarios.",
      type: "ongoing",
      quality: "danger",
      warning: "Ignoring worsening confusion/unresponsiveness is dangerous.",
    },
    sit_upright_rest: {
      label: "Sit upright / rest",
      detail: "Position of comfort for breathing difficulty if they can tolerate it.",
      type: "treatment",
      positive: "Sitting upright/resting can help breathing difficulty.",
      missed: "You missed position of comfort/rest.",
    },
    help_use_inhaler: {
      label: "Help with prescribed inhaler",
      detail: "Help with their inhaler if available and allowed in class.",
      type: "treatment",
      positive: "Helping with a prescribed inhaler fits this asthma-style scenario.",
      missed: "You missed helping with the prescribed inhaler.",
    },
    coach_slow_breathing: {
      label: "Coach calm, slow breathing",
      detail: "Supportive if they are awake and able to follow you.",
      type: "treatment",
      positive: "Calm coaching is useful support while monitoring.",
      missed: "You missed calm breathing support.",
    },
    give_someone_else_inhaler: {
      label: "Use someone else's inhaler",
      detail: "A bad medication shortcut.",
      type: "treatment",
      quality: "danger",
      warning: "Do not use someone else's medication in this practice scenario.",
    },
    remove_allergen_if_safe: {
      label: "Remove trigger if safe",
      detail: "Move away from the trigger or remove it if safe.",
      type: "treatment",
      positive: "Removing the trigger if safe helps reduce exposure.",
      missed: "You missed removing the trigger if safe.",
    },
    assist_epinephrine: {
      label: "Help with epinephrine auto-injector",
      detail: "Assist if available/allowed and the scenario fits.",
      type: "treatment",
      positive: "Epinephrine assistance fits anaphylaxis-style signs.",
      missed: "You missed epinephrine auto-injector assistance.",
    },
    watch_for_anaphylaxis: {
      label: "Watch airway/breathing for anaphylaxis signs",
      detail: "Keep checking swelling, breathing, and responsiveness.",
      type: "ongoing",
      positive: "Watching airway/breathing changes matters in allergy scenarios.",
      missed: "You missed watching for airway/breathing changes.",
    },
    give_food_drink_allergy: {
      label: "Give food or drink",
      detail: "A bad idea when airway or swallowing may become a problem.",
      type: "treatment",
      quality: "danger",
      warning: "Do not give food or drink in this allergic reaction practice scenario.",
    },
    head_to_toe: {
      label: "Do a head-to-toe check",
      detail: "Look for other injuries after urgent issues are handled.",
      type: "ongoing",
      positive: "A head-to-toe check adds useful secondary information.",
      missed: "You missed a head-to-toe check.",
    },
    check_skin: {
      label: "Check skin condition",
      detail: "Notice pale, hot, cool, clammy, hives, or changing skin.",
      type: "ongoing",
      positive: "Skin signs help track what is changing.",
      missed: "You missed checking skin condition.",
    },
    pulse_breathing_rate: {
      label: "Check pulse and breathing rate",
      detail: "Track whether they are improving or getting worse.",
      type: "ongoing",
      positive: "Pulse and breathing rate help with reassessment.",
      missed: "You missed pulse/breathing-rate reassessment.",
    },
    ask_sample: {
      label: "Ask SAMPLE/history questions",
      detail: "Ask simple history questions if they can answer.",
      type: "ongoing",
      positive: "SAMPLE/history questions help fill in what happened.",
      missed: "You missed SAMPLE/history questions.",
    },
    reassess_treatment: {
      label: "Reassess treatment",
      detail: "Check whether your care is actually working.",
      type: "ongoing",
      positive: "Reassessing treatment keeps the response from going stale.",
      missed: "You missed reassessing treatment.",
    },
    monitor_until_help: {
      label: "Keep monitoring until help arrives",
      detail: "Stay with them and keep reassessing.",
      type: "ongoing",
      positive: "Monitoring until help arrives is strong ongoing care.",
      missed: "You missed ongoing monitoring.",
    },
    check_spo2: {
      label: "Check SpO2 with pulse oximeter if trained/equipment available",
      detail: "Advanced lifeguard-equipment check; use only if trained and available.",
      type: "ongoing",
      tags: ["advanced", "lifeguard-equipment", "instructor-review-needed"],
      positive: "Pulse oximeter use can support reassessment when trained/equipment is available.",
      missed: "You did not use pulse oximetry; only count this if the class includes it.",
    },
    prepare_oxygen: {
      label: "Prepare oxygen kit",
      detail: "Advanced lifeguard-equipment setup for breathing emergencies if trained.",
      type: "help",
      tags: ["advanced", "lifeguard-equipment", "instructor-review-needed"],
      positive: "Preparing oxygen equipment can fit trained lifeguard responses.",
      missed: "You did not prepare oxygen equipment; only count this if the class includes it.",
    },
    administer_oxygen: {
      label: "Administer oxygen if trained and protocol indicates",
      detail: "Advanced oxygen care; do not treat as a universal basic first-aid step.",
      type: "treatment",
      tags: ["advanced", "lifeguard-equipment", "instructor-review-needed"],
      positive: "Oxygen administration may fit trained/protocol-based breathing emergencies.",
      missed: "You did not administer oxygen; only count this if the class includes it.",
    },
    prepare_bvm_oxygen: {
      label: "Prepare BVM/oxygen support if trained",
      detail: "Advanced airway support for non-normal breathing if trained.",
      type: "help",
      tags: ["advanced", "lifeguard-equipment", "instructor-review-needed"],
      positive: "Preparing BVM/oxygen support can fit trained responses to non-normal breathing.",
      missed: "You did not prepare BVM/oxygen support; only count this if the class includes it.",
    },
    use_suction: {
      label: "Use suction if trained/protocol indicates",
      detail: "Advanced airway equipment for fluids/vomit if trained and indicated.",
      type: "treatment",
      tags: ["advanced", "lifeguard-equipment", "instructor-review-needed"],
      positive: "Suction can fit trained airway management when fluids block the airway.",
      missed: "You did not use suction; only count this if the class includes it.",
    },
    leave_alone: {
      label: "Leave victim alone",
      detail: "They still need monitoring.",
      type: "ongoing",
      quality: "danger",
      warning: "Do not leave the victim alone in this scenario.",
    },
  };

  function stage(id, choices) {
    return {
      id,
      title: stageDefinitions[id].title,
      help: stageDefinitions[id].help,
      choices: choices || [],
    };
  }

  function withReview(stages) {
    return stages.concat(stage("review", []));
  }

  function labelsFor(actionIds) {
    return actionIds.map((id, index) => `${index + 1}. ${actions[id].label}`).join("\n");
  }

  function before(action, beforeAction, message, penalty) {
    return {
      type: "before",
      action,
      before: beforeAction,
      message,
      penalty: penalty || 5,
    };
  }

  function early(action, maxPosition, message, penalty) {
    return {
      type: "early",
      action,
      maxPosition,
      message,
      penalty: penalty || 8,
    };
  }

  function oneOfBeforeTreatment(actionsList, message, penalty) {
    return {
      type: "oneOfBeforeTreatment",
      actions: actionsList,
      message,
      penalty: penalty || 10,
    };
  }

  function beforeAny(action, beforeAnyList, message, penalty) {
    return {
      type: "beforeAny",
      action,
      beforeAny: beforeAnyList,
      message,
      penalty: penalty || 6,
    };
  }

  function requiresBefore(action, requiredBefore, message, penalty) {
    return {
      type: "requiresBefore",
      action,
      requiredBefore,
      message,
      penalty: penalty || 8,
    };
  }

  function selectedWithout(action, notWith, message, penalty) {
    return {
      type: "selectedWithout",
      action,
      notWith,
      message,
      penalty: penalty || 12,
    };
  }

  const commonPrimary = ["scene_safety", "ppe_barriers", "check_responsiveness", "check_mechanism"];
  const emergencyHelp = ["call_ems_911", "get_first_aid_kit", "get_backup", "delay_ems_aed"];
  const cprHelp = ["call_ems_911", "get_aed", "get_first_aid_kit", "get_backup", "delay_ems_aed"];
  const minorHelp = ["get_first_aid_kit", "get_backup", "call_ems_911"];
  const breathingHelp = ["call_ems_911", "get_first_aid_kit", "get_backup", "delay_ems_aed", "prepare_oxygen"];
  const commonOngoing = [
    "head_to_toe",
    "check_skin",
    "pulse_breathing_rate",
    "ask_sample",
    "reassess_treatment",
    "monitor_until_help",
    "leave_alone",
  ];
  const baseOrderRules = [
    oneOfBeforeTreatment(
      ["scene_safety", "check_responsiveness", "check_airway_breathing", "check_severe_bleeding"],
      "Do at least one basic assessment before treatment.",
      10
    ),
  ];

  const scenarios = [
    {
      id: "severe_external_bleeding",
      title: "Severe external bleeding",
      prompt:
        "A patron slips near a broken tile and has heavy bleeding from the lower leg. They are awake, scared, and bleeding through a towel.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_severe_bleeding", "check_circulation_life_threats"]),
        stage("help", emergencyHelp),
        stage("treatment", [
          "firm_direct_pressure",
          "light_pressure_pad",
          "maintain_pressure",
          "remove_pressure_early",
          "ignore_severe_bleeding",
          "treat_shock_first",
          "treat_shock_monitor",
        ]),
        stage("ongoing", commonOngoing),
      ]),
      recommendedSequence: [
        "scene_safety",
        "ppe_barriers",
        "check_responsiveness",
        "check_airway_breathing",
        "check_severe_bleeding",
        "firm_direct_pressure",
        "call_ems_911",
        "get_backup",
        "maintain_pressure",
        "treat_shock_monitor",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: [
        "scene_safety",
        "ppe_barriers",
        "check_severe_bleeding",
        "firm_direct_pressure",
        "maintain_pressure",
        "call_ems_911",
      ],
      expectedActions: ["check_responsiveness", "check_airway_breathing", "reassess_treatment", "monitor_until_help"],
      contextualActions: [
        {
          action: "treat_shock_monitor",
          reason: "Shock care matters after heavy bleeding is being controlled.",
          reward: 4,
        },
      ],
      optionalGoodActions: ["get_backup", "get_first_aid_kit", "check_circulation_life_threats", "head_to_toe"],
      weakActions: ["light_pressure_pad", "remove_pressure_early", "treat_shock_first"],
      dangerousActions: ["ignore_severe_bleeding", "leave_alone"],
      advancedActions: [],
      orderRules: baseOrderRules.concat([
        early("firm_direct_pressure", 6, "Direct pressure should happen early for severe bleeding.", 10),
        before("firm_direct_pressure", "treat_shock_monitor", "Control heavy bleeding before shock care.", 7),
        before("firm_direct_pressure", "maintain_pressure", "Apply firm direct pressure before maintaining/reinforcing it.", 5),
        beforeAny("call_ems_911", ["treat_shock_monitor", "monitor_until_help"], "Call EMS before/near later care in heavy bleeding.", 5),
      ]),
      actionFeedback: {
        check_severe_bleeding: "The bleeding is heavy and needs immediate control.",
        firm_direct_pressure: "Bleeding starts to slow under firm pressure.",
        light_pressure_pad: "The bleeding is still soaking through.",
        maintain_pressure: "Pressure stays on and the dressing is reinforced.",
        remove_pressure_early: "The bleeding restarts when pressure keeps coming off.",
        treat_shock_first: "They are still bleeding heavily. Control that first.",
        ignore_severe_bleeding: "The bleeding is getting worse.",
      },
      hints: {
        primary: "Start normal, but do not get stuck there.",
        abc: "Heavy bleeding is a life threat. Name it quickly.",
        help: "A second person can call and bring supplies while pressure stays on.",
        treatment: "Light pressure is not enough. Firm pressure and maintaining it are the key.",
        ongoing: "After pressure is on, keep checking that it works.",
        review: "Direct pressure should appear before shock care and monitoring.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.severeBleeding],
      instructorReviewNotes: instructorReviewNotes.severeBleeding,
      tags: ["bleeding", "awake", "life threat"],
      difficulty: "medium",
    },
    {
      id: "severe_bleeding_weak_pressure",
      title: "Severe bleeding with weak pressure mistake",
      prompt:
        "A patron has a deep forearm cut from pool equipment. The bleeding is heavy. Someone suggests just holding a small tissue lightly on the cut.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_severe_bleeding", "check_circulation_life_threats"]),
        stage("help", emergencyHelp),
        stage("treatment", [
          "light_pressure_pad",
          "firm_direct_pressure",
          "maintain_pressure",
          "remove_pressure_early",
          "ignore_severe_bleeding",
          "treat_shock_monitor",
        ]),
        stage("ongoing", commonOngoing),
      ]),
      recommendedSequence: [
        "scene_safety",
        "ppe_barriers",
        "check_responsiveness",
        "check_severe_bleeding",
        "firm_direct_pressure",
        "maintain_pressure",
        "call_ems_911",
        "get_first_aid_kit",
        "treat_shock_monitor",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["scene_safety", "check_severe_bleeding", "firm_direct_pressure", "maintain_pressure", "call_ems_911"],
      expectedActions: ["ppe_barriers", "check_responsiveness", "reassess_treatment", "monitor_until_help"],
      contextualActions: [
        {
          action: "check_airway_breathing",
          reason: "ABC checks are useful, but do not let them delay pressure on obvious heavy bleeding.",
          reward: 3,
        },
      ],
      optionalGoodActions: ["get_first_aid_kit", "get_backup", "treat_shock_monitor", "check_circulation_life_threats"],
      weakActions: ["light_pressure_pad", "remove_pressure_early"],
      dangerousActions: ["ignore_severe_bleeding", "leave_alone"],
      advancedActions: [],
      orderRules: baseOrderRules.concat([
        early("firm_direct_pressure", 5, "Firm direct pressure should come early in this scenario.", 10),
        before("firm_direct_pressure", "maintain_pressure", "Start firm pressure before maintaining/reinforcing it.", 5),
        before("firm_direct_pressure", "treat_shock_monitor", "Control heavy bleeding before later shock care.", 7),
      ]),
      actionFeedback: {
        check_severe_bleeding: "The cut is bleeding heavily.",
        light_pressure_pad: "The bleeding is still soaking through.",
        firm_direct_pressure: "Firm pressure begins to control the bleeding.",
        maintain_pressure: "The dressing is reinforced without lifting pressure.",
        remove_pressure_early: "The bleeding restarts when pressure is removed.",
      },
      hints: {
        primary: "The bad suggestion is a distraction. Start normally.",
        abc: "Confirm the life threat without delaying care.",
        help: "A second person can call and bring supplies.",
        treatment: "Choose the pressure option that actually controls heavy bleeding.",
        ongoing: "Do not keep peeling dressings back to inspect.",
        review: "Make sure light pressure is not your main bleeding treatment.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.severeBleeding],
      instructorReviewNotes: instructorReviewNotes.severeBleeding,
      tags: ["bleeding", "weak treatment", "pressure"],
      difficulty: "medium",
    },
    {
      id: "unresponsive_not_breathing",
      title: "Unresponsive and not breathing normally",
      prompt:
        "A patron collapses on the pool deck. They do not respond when you speak to them, and they are not breathing normally.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_severe_bleeding", "check_circulation_life_threats"]),
        stage("help", cprHelp.concat(["prepare_oxygen", "prepare_bvm_oxygen"])),
        stage("treatment", ["cpr_aed", "recovery_position_airway", "monitor_only", "treat_shock_first", "water_unresponsive", "administer_oxygen", "use_suction"]),
        stage("ongoing", ["pulse_breathing_rate", "check_spo2", "reassess_treatment", "monitor_until_help", "leave_alone"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "ppe_barriers",
        "check_responsiveness",
        "check_airway_breathing",
        "call_ems_911",
        "get_aed",
        "cpr_aed",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["check_responsiveness", "check_airway_breathing", "call_ems_911", "get_aed", "cpr_aed"],
      expectedActions: ["scene_safety", "ppe_barriers", "reassess_treatment", "monitor_until_help"],
      contextualActions: [
        {
          action: "check_severe_bleeding",
          reason: "A quick severe-bleeding scan is useful, but CPR/AED remains the main path.",
          reward: 2,
        },
        {
          action: "prepare_oxygen",
          reason: "Oxygen setup can fit a trained lifeguard response to not-normal breathing.",
          reward: 2,
        },
        {
          action: "prepare_bvm_oxygen",
          reason: "BVM/oxygen support can fit if trained and the class includes it.",
          reward: 2,
        },
        {
          action: "administer_oxygen",
          reason: "Oxygen may fit trained/protocol-based care while managing breathing.",
          reward: 2,
        },
      ],
      optionalGoodActions: ["get_backup", "check_circulation_life_threats"],
      weakActions: ["recovery_position_airway", "monitor_only", "treat_shock_first"],
      dangerousActions: ["water_unresponsive", "delay_ems_aed", "leave_alone"],
      advancedActions: ["prepare_oxygen", "administer_oxygen", "prepare_bvm_oxygen", "use_suction", "check_spo2"],
      orderRules: baseOrderRules.concat([
        requiresBefore(
          "cpr_aed",
          ["check_responsiveness", "check_airway_breathing"],
          "CPR/AED should come after responsiveness and airway/breathing checks.",
          10
        ),
        beforeAny("call_ems_911", ["cpr_aed"], "Call EMS before/near CPR/AED.", 8),
        beforeAny("get_aed", ["cpr_aed"], "Get the AED before/near CPR/AED.", 8),
        before("prepare_oxygen", "administer_oxygen", "Prepare oxygen before administering it.", 4),
      ]),
      actionFeedback: {
        check_responsiveness: "They do not respond.",
        check_airway_breathing: "You do not see normal breathing.",
        call_ems_911: "Emergency help is being called.",
        get_aed: "The AED is on the way.",
        prepare_oxygen: "The oxygen kit is being prepared for a trained response.",
        prepare_bvm_oxygen: "BVM/oxygen support is ready if trained and needed.",
        administer_oxygen: "Oxygen support is used only because this is an advanced/trained-equipment option.",
        use_suction: "Suction is only useful if airway fluids are present and you are trained.",
        cpr_aed: "You start CPR/AED care.",
        recovery_position_airway: "That would fit better if they were breathing normally.",
        monitor_only: "Only monitoring is not enough if they are not breathing normally.",
        water_unresponsive: "They cannot safely swallow while unresponsive.",
      },
      hints: {
        primary: "Find out if they respond before picking treatment.",
        abc: "The breathing check drives the big decision here.",
        help: "This is an EMS/AED scenario.",
        treatment: "Not breathing normally points toward CPR/AED.",
        ongoing: "Keep reassessing after starting care.",
        review: "CPR/AED should not appear before the breathing check.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.cprAed],
      instructorReviewNotes: instructorReviewNotes.cprAed,
      tags: ["unresponsive", "not breathing", "aed"],
      difficulty: "hard",
    },
    {
      id: "unresponsive_breathing",
      title: "Unresponsive but breathing",
      prompt:
        "A patron is lying on the deck after feeling dizzy. They do not respond, but you find they are breathing normally.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_severe_bleeding", "check_circulation_life_threats"]),
        stage("help", cprHelp),
        stage("treatment", ["recovery_position_airway", "cpr_while_breathing", "cpr_aed", "water_unresponsive"]),
        stage("ongoing", ["pulse_breathing_rate", "check_spo2", "reassess_treatment", "monitor_until_help", "leave_alone"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "ppe_barriers",
        "check_responsiveness",
        "check_airway_breathing",
        "call_ems_911",
        "recovery_position_airway",
        "get_backup",
        "pulse_breathing_rate",
        "monitor_until_help",
      ],
      criticalActions: ["check_responsiveness", "check_airway_breathing", "recovery_position_airway", "monitor_until_help"],
      expectedActions: ["scene_safety", "ppe_barriers", "call_ems_911", "pulse_breathing_rate", "reassess_treatment"],
      contextualActions: [
        {
          action: "get_aed",
          reason: "AED readiness can be useful backup, but this person is breathing normally.",
          reward: 2,
        },
        {
          action: "check_spo2",
          reason: "Pulse ox can support monitoring if trained/equipment is available.",
          reward: 1,
        },
        {
          action: "administer_oxygen",
          reason: "Oxygen may fit trained/protocol-based care if breathing trouble is part of the concern.",
          reward: 1,
        },
      ],
      optionalGoodActions: ["get_backup", "check_severe_bleeding", "check_circulation_life_threats"],
      weakActions: ["cpr_aed"],
      dangerousActions: ["cpr_while_breathing", "water_unresponsive", "leave_alone"],
      advancedActions: ["check_spo2"],
      orderRules: baseOrderRules.concat([
        requiresBefore(
          "recovery_position_airway",
          ["check_responsiveness", "check_airway_breathing"],
          "Airway/recovery-position care should follow responsiveness and breathing checks.",
          8
        ),
        selectedWithout(
          "cpr_aed",
          ["check_airway_breathing"],
          "CPR is not the right choice if the person is breathing normally.",
          12
        ),
      ]),
      actionFeedback: {
        check_responsiveness: "They still do not respond.",
        check_airway_breathing: "They are breathing normally.",
        recovery_position_airway: "Their airway is being kept open while you monitor them.",
        cpr_while_breathing: "They are breathing, so CPR is the wrong move here.",
        water_unresponsive: "They cannot safely swallow while unresponsive.",
      },
      hints: {
        primary: "Do the same opening checks even if the story sounds obvious.",
        abc: "Breathing normally changes the treatment.",
        help: "Unresponsive still means you should get help.",
        treatment: "Do not choose CPR just because they are unresponsive.",
        ongoing: "Breathing can change, so keep checking.",
        review: "The breathing check should explain why you did not choose CPR.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.unresponsiveBreathing],
      instructorReviewNotes: instructorReviewNotes.unresponsiveBreathing,
      tags: ["unresponsive", "breathing", "airway"],
      difficulty: "medium",
    },
    {
      id: "suspected_fracture",
      title: "Suspected fracture",
      prompt:
        "A patron slips while walking and lands on their arm. They are awake, breathing normally, and their forearm looks deformed and painful.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_severe_bleeding", "check_circulation_life_threats"]),
        stage("help", minorHelp),
        stage("treatment", [
          "support_immobilize_injury",
          "reassure_only",
          "force_straighten_deformity",
          "move_spinal_unnecessary",
          "firm_direct_pressure",
        ]),
        stage("ongoing", ["check_csm", "head_to_toe", "ask_sample", "reassess_treatment", "monitor_until_help", "leave_alone"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_mechanism",
        "check_responsiveness",
        "check_airway_breathing",
        "check_severe_bleeding",
        "support_immobilize_injury",
        "check_csm",
        "get_first_aid_kit",
        "get_backup",
        "ask_sample",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["scene_safety", "check_mechanism", "support_immobilize_injury", "reassess_treatment"],
      expectedActions: ["check_responsiveness", "check_airway_breathing", "check_severe_bleeding", "check_csm", "monitor_until_help"],
      contextualActions: [
        {
          action: "call_ems_911",
          reason: "EMS may fit depending on severity, deformity, pain, and local class rules.",
          reward: 2,
        },
      ],
      optionalGoodActions: ["ppe_barriers", "get_first_aid_kit", "get_backup", "ask_sample", "head_to_toe"],
      weakActions: ["reassure_only", "firm_direct_pressure"],
      dangerousActions: ["force_straighten_deformity", "move_spinal_unnecessary", "leave_alone"],
      advancedActions: [],
      orderRules: baseOrderRules.concat([
        before("check_airway_breathing", "support_immobilize_injury", "Check basics before focusing on the injury.", 5),
        before("support_immobilize_injury", "check_csm", "Support the injury before detailed limb checks.", 4),
      ]),
      actionFeedback: {
        check_airway_breathing: "They are breathing normally.",
        check_severe_bleeding: "No severe bleeding is found.",
        support_immobilize_injury: "The arm is supported and movement is reduced.",
        check_csm: "You check circulation/sensation/movement around the injury.",
        reassure_only: "They still need support, not only reassurance.",
        force_straighten_deformity: "Forcing it straight could make the injury worse.",
      },
      hints: {
        primary: "The fall mechanism matters. Do not rush to move the arm.",
        abc: "Responsive/minor-ish scenarios still deserve quick basic checks.",
        help: "A first aid kit and backup can help with support/splinting practice.",
        treatment: "Support and avoid unnecessary movement.",
        ongoing: "CSM, history, and reassessment make this more than a flashcard.",
        review: "Make sure you did not force movement.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.fracture],
      instructorReviewNotes: instructorReviewNotes.fracture,
      tags: ["fracture", "arm", "awake"],
      difficulty: "medium",
    },
    {
      id: "minor_moderate_burn",
      title: "Minor/moderate burn",
      prompt:
        "A patron touches hot metal near the pool deck and has a painful red burn with small blisters on the hand. They are awake and breathing normally.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_severe_bleeding", "check_circulation_life_threats"]),
        stage("help", minorHelp),
        stage("treatment", [
          "remove_from_burn_source",
          "cool_burn_water",
          "cover_burn_loosely",
          "cover_without_cooling",
          "ice_direct_burn",
          "pop_blisters_creams",
        ]),
        stage("ongoing", commonOngoing),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "check_airway_breathing",
        "remove_from_burn_source",
        "cool_burn_water",
        "get_first_aid_kit",
        "cover_burn_loosely",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["scene_safety", "remove_from_burn_source", "cool_burn_water", "cover_burn_loosely"],
      expectedActions: ["check_responsiveness", "check_airway_breathing", "get_first_aid_kit", "reassess_treatment"],
      contextualActions: [
        {
          action: "monitor_until_help",
          reason: "Monitoring is useful after cooling and covering.",
          reward: 3,
        },
      ],
      optionalGoodActions: ["ppe_barriers", "get_backup", "ask_sample", "check_skin"],
      weakActions: ["cover_without_cooling"],
      dangerousActions: ["ice_direct_burn", "pop_blisters_creams", "leave_alone"],
      advancedActions: [],
      orderRules: baseOrderRules.concat([
        before("cool_burn_water", "cover_burn_loosely", "Cool the burn before covering it.", 9),
        before("remove_from_burn_source", "cool_burn_water", "Stop the burn source before cooling.", 5),
        before("get_first_aid_kit", "cover_burn_loosely", "Get a first aid kit/clean dressing before covering the burn.", 4),
      ]),
      actionFeedback: {
        remove_from_burn_source: "The burn source is no longer causing damage.",
        cool_burn_water: "The burn is being cooled with clean cool water.",
        cover_burn_loosely: "The burn is protected with a sterile non-stick dressing or clean cloth.",
        cover_without_cooling: "The burn still needs cooling first.",
        ice_direct_burn: "The skin reacts badly to direct ice.",
        pop_blisters_creams: "The burn area is being irritated instead of protected.",
      },
      hints: {
        primary: "Even small burns start with a safe scene.",
        abc: "For a responsive minor burn, ABC/general condition is expected, not the whole scenario.",
        help: "A first aid kit matters more than an AED here.",
        treatment: "Cool first, then cover loosely.",
        ongoing: "After cooling and covering, keep checking pain and changes.",
        review: "If cover comes before cooling, reorder it.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.burn],
      instructorReviewNotes: instructorReviewNotes.burn,
      tags: ["burn", "hand", "blisters"],
      difficulty: "medium",
    },
    {
      id: "heat_exhaustion",
      title: "Heat exhaustion",
      prompt:
        "During an outdoor shift, a patron is pale, sweaty, dizzy, and tired after being in the heat. They are awake and able to answer questions.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_circulation_life_threats", "check_skin"]),
        stage("help", minorHelp),
        stage("treatment", ["move_cooler_area", "rest_in_cool_area", "loosen_heavy_gear", "sips_fluid_awake", "wet_skin_fan", "fan_only"]),
        stage("ongoing", ["check_skin", "pulse_breathing_rate", "ask_sample", "reassess_treatment", "monitor_until_help", "ignore_worsening_confusion", "leave_alone"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "check_airway_breathing",
        "move_cooler_area",
        "rest_in_cool_area",
        "loosen_heavy_gear",
        "sips_fluid_awake",
        "wet_skin_fan",
        "check_skin",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["scene_safety", "move_cooler_area", "rest_in_cool_area", "loosen_heavy_gear", "reassess_treatment"],
      expectedActions: ["check_responsiveness", "check_airway_breathing", "sips_fluid_awake", "check_skin", "monitor_until_help"],
      contextualActions: [
        {
          action: "call_ems_911",
          reason: "EMS may be needed if symptoms are severe, worsening, or confusing.",
          reward: 2,
        },
        {
          action: "wet_skin_fan",
          reason: "Active cooling can help if symptoms are not settling.",
          reward: 3,
        },
      ],
      optionalGoodActions: ["ppe_barriers", "get_backup", "pulse_breathing_rate", "ask_sample"],
      weakActions: ["fan_only"],
      dangerousActions: ["ignore_worsening_confusion", "leave_alone", "water_unresponsive"],
      advancedActions: [],
      orderRules: baseOrderRules.concat([
        before("move_cooler_area", "sips_fluid_awake", "Move them out of heat before focusing on fluids.", 5),
        before("check_responsiveness", "sips_fluid_awake", "Only give fluids if they are awake/able.", 8),
      ]),
      actionFeedback: {
        move_cooler_area: "They are out of direct heat.",
        rest_in_cool_area: "They stop activity and rest in the cooler area.",
        loosen_heavy_gear: "Extra heat-trapping gear is loosened or removed.",
        sips_fluid_awake: "They take small sips because they are awake and able.",
        wet_skin_fan: "Cooling has started and you keep reassessing.",
        fan_only: "A fan helps a little, but it is not much of a plan by itself.",
        ignore_worsening_confusion: "Worsening confusion would change the priority.",
      },
      hints: {
        primary: "They can talk, but still do your opening checks.",
        abc: "Look for signs this is becoming more serious.",
        help: "Backup helps if symptoms worsen.",
        treatment: "Cool area, rest, loosen gear, fluids only if awake/able.",
        ongoing: "Keep checking if they improve or slide toward heat stroke signs.",
        review: "Fluids should not appear before you know they are awake and able.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.heat],
      instructorReviewNotes: instructorReviewNotes.heat,
      tags: ["heat", "awake", "dizzy"],
      difficulty: "medium",
    },
    {
      id: "heat_stroke_suspicion",
      title: "Heat stroke suspicion",
      prompt:
        "A patron has been in the sun and is now confused, very hot, and not acting normally. You suspect severe heat illness.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_circulation_life_threats", "check_skin"]),
        stage("help", breathingHelp),
        stage("treatment", ["move_cooler_area", "loosen_heavy_gear", "wet_skin_fan", "cold_packs_core", "sips_fluid_awake", "fan_only", "water_unresponsive", "administer_oxygen"]),
        stage("ongoing", ["check_skin", "pulse_breathing_rate", "check_spo2", "reassess_treatment", "monitor_until_help", "ignore_worsening_confusion", "leave_alone"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "check_airway_breathing",
        "call_ems_911",
        "get_backup",
        "move_cooler_area",
        "loosen_heavy_gear",
        "wet_skin_fan",
        "cold_packs_core",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["check_responsiveness", "check_airway_breathing", "call_ems_911", "move_cooler_area", "wet_skin_fan", "monitor_until_help"],
      expectedActions: ["scene_safety", "loosen_heavy_gear", "cold_packs_core", "reassess_treatment", "check_skin"],
      contextualActions: [
        {
          action: "get_backup",
          reason: "Backup helps with EMS, active cooling, and monitoring.",
          reward: 3,
        },
        {
          action: "prepare_oxygen",
          reason: "Oxygen setup can fit a trained lifeguard response to altered responsiveness.",
          reward: 2,
        },
        {
          action: "check_spo2",
          reason: "Pulse ox can support monitoring if trained/equipment is available.",
          reward: 1,
        },
      ],
      optionalGoodActions: ["ppe_barriers", "get_first_aid_kit", "pulse_breathing_rate"],
      weakActions: ["fan_only"],
      dangerousActions: ["sips_fluid_awake", "water_unresponsive", "ignore_worsening_confusion", "leave_alone", "delay_ems_aed"],
      advancedActions: ["prepare_oxygen", "administer_oxygen", "check_spo2"],
      orderRules: baseOrderRules.concat([
        beforeAny("call_ems_911", ["wet_skin_fan", "cold_packs_core"], "Call EMS early for heat stroke signs.", 10),
        before("move_cooler_area", "wet_skin_fan", "Move them out of heat before active cooling if safe.", 5),
        before("check_responsiveness", "sips_fluid_awake", "Confusion means fluids may not be safe.", 8),
      ]),
      actionFeedback: {
        check_responsiveness: "They are confused and not acting normally.",
        call_ems_911: "Emergency help is being called for severe heat illness.",
        move_cooler_area: "They are moved out of direct heat.",
        wet_skin_fan: "Active cooling has started.",
        cold_packs_core: "Cold packs are applied to core areas.",
        sips_fluid_awake: "They are confused, so drinking may not be safe.",
        prepare_oxygen: "The oxygen kit is ready if trained/protocol says to use it.",
        administer_oxygen: "Oxygen is an advanced/trained-equipment action here.",
        check_spo2: "Pulse ox is used as an advanced monitoring tool.",
        fan_only: "They are still confused and very hot.",
        water_unresponsive: "They may not be able to swallow safely.",
      },
      hints: {
        primary: "Confusion is a big clue. Start fast but do not skip basics.",
        abc: "Check breathing and signs of a life threat.",
        help: "This is the heat illness scenario where EMS matters early.",
        treatment: "Fan-only is not enough. Think active cooling.",
        ongoing: "Keep cooling and reassessing while waiting for help.",
        review: "EMS should be early, not after everything else.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.heat],
      instructorReviewNotes: instructorReviewNotes.heat,
      tags: ["heat", "confused", "serious"],
      difficulty: "hard",
    },
    {
      id: "asthma_breathing_difficulty",
      title: "Asthma / breathing difficulty",
      prompt:
        "A patron is sitting on the bench, breathing fast, wheezing, and saying they have asthma. They are awake but anxious.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_circulation_life_threats", "check_skin"]),
        stage("help", breathingHelp),
        stage("treatment", ["sit_upright_rest", "help_use_inhaler", "coach_slow_breathing", "administer_oxygen", "give_someone_else_inhaler", "water_unresponsive"]),
        stage("ongoing", ["pulse_breathing_rate", "check_spo2", "ask_sample", "reassess_treatment", "monitor_until_help", "ignore_worsening_confusion", "leave_alone"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "check_airway_breathing",
        "sit_upright_rest",
        "get_backup",
        "help_use_inhaler",
        "call_ems_911",
        "pulse_breathing_rate",
        "ask_sample",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["check_responsiveness", "check_airway_breathing", "sit_upright_rest", "help_use_inhaler", "reassess_treatment"],
      expectedActions: ["scene_safety", "get_backup", "pulse_breathing_rate", "monitor_until_help"],
      contextualActions: [
        {
          action: "call_ems_911",
          reason: "EMS matters if breathing is severe, not improving, or worsening.",
          reward: 4,
        },
        {
          action: "coach_slow_breathing",
          reason: "Calm coaching is useful support when they are awake.",
          reward: 2,
        },
        {
          action: "prepare_oxygen",
          reason: "Oxygen setup can fit severe or not-improving respiratory distress if trained.",
          reward: 2,
        },
        {
          action: "check_spo2",
          reason: "Pulse ox can support respiratory reassessment if trained/equipment is available.",
          reward: 1,
        },
        {
          action: "administer_oxygen",
          reason: "Oxygen can fit severe or not-improving breathing distress if trained/protocol indicates.",
          reward: 2,
        },
      ],
      optionalGoodActions: ["ppe_barriers", "ask_sample", "check_skin"],
      weakActions: ["monitor_only"],
      dangerousActions: ["give_someone_else_inhaler", "water_unresponsive", "ignore_worsening_confusion", "leave_alone"],
      advancedActions: ["prepare_oxygen", "administer_oxygen", "check_spo2"],
      orderRules: baseOrderRules.concat([
        before("check_airway_breathing", "help_use_inhaler", "Check breathing before deciding treatment.", 7),
        before("sit_upright_rest", "help_use_inhaler", "Position/rest comes before or alongside inhaler help.", 4),
        beforeAny("call_ems_911", ["monitor_until_help"], "Call EMS if symptoms are severe or not improving.", 4),
      ]),
      actionFeedback: {
        check_airway_breathing: "They are wheezing and working hard to breathe.",
        sit_upright_rest: "They look a little more settled sitting upright.",
        help_use_inhaler: "They use their prescribed inhaler.",
        coach_slow_breathing: "They focus on slower breathing while you reassess.",
        prepare_oxygen: "Oxygen equipment is prepared as an advanced/trained option.",
        administer_oxygen: "Oxygen is used only if trained and the class protocol indicates it.",
        check_spo2: "Pulse ox gives another reassessment clue if trained/equipment is available.",
        give_someone_else_inhaler: "That medication shortcut is not safe.",
        ignore_worsening_confusion: "Worsening confusion would be a major warning sign.",
      },
      hints: {
        primary: "They are awake, so talk to them while checking basics.",
        abc: "Breathing is the main problem. Assess it directly.",
        help: "Think backup and EMS if not improving.",
        treatment: "Position of comfort and their own inhaler are the key class-card ideas.",
        ongoing: "Reassess breathing. Do not just walk away.",
        review: "Breathing check should come before inhaler help.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.asthma],
      instructorReviewNotes: instructorReviewNotes.asthma,
      tags: ["breathing", "asthma", "responsive"],
      difficulty: "hard",
    },
    {
      id: "allergic_reaction_anaphylaxis",
      title: "Allergic reaction / anaphylaxis",
      prompt:
        "A patron says they were stung by a wasp. They have hives, swelling lips, and say their throat feels tight.",
      stages: withReview([
        stage("primary", commonPrimary),
        stage("abc", ["check_airway_breathing", "check_circulation_life_threats", "check_skin"]),
        stage("help", breathingHelp),
        stage("treatment", ["remove_allergen_if_safe", "assist_epinephrine", "sit_upright_rest", "administer_oxygen", "give_food_drink_allergy", "water_unresponsive"]),
        stage("ongoing", ["watch_for_anaphylaxis", "pulse_breathing_rate", "check_spo2", "ask_sample", "reassess_treatment", "monitor_until_help", "leave_alone"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "check_airway_breathing",
        "check_skin",
        "call_ems_911",
        "get_backup",
        "assist_epinephrine",
        "remove_allergen_if_safe",
        "watch_for_anaphylaxis",
        "pulse_breathing_rate",
        "reassess_treatment",
        "monitor_until_help",
      ],
      criticalActions: ["check_responsiveness", "check_airway_breathing", "call_ems_911", "assist_epinephrine", "monitor_until_help"],
      expectedActions: ["scene_safety", "check_skin", "watch_for_anaphylaxis", "pulse_breathing_rate", "reassess_treatment"],
      contextualActions: [
        {
          action: "remove_allergen_if_safe",
          reason: "Remove the trigger if it is safe and realistic.",
          reward: 2,
        },
        {
          action: "get_backup",
          reason: "Backup helps with EMS, medication, and monitoring.",
          reward: 3,
        },
        {
          action: "prepare_oxygen",
          reason: "Oxygen setup can fit anaphylaxis with breathing trouble if trained.",
          reward: 2,
        },
        {
          action: "check_spo2",
          reason: "Pulse ox can support breathing reassessment if trained/equipment is available.",
          reward: 1,
        },
        {
          action: "administer_oxygen",
          reason: "Oxygen can fit anaphylaxis with breathing trouble if trained/protocol indicates.",
          reward: 2,
        },
      ],
      optionalGoodActions: ["ppe_barriers", "ask_sample", "get_first_aid_kit", "sit_upright_rest"],
      weakActions: ["monitor_only"],
      dangerousActions: ["give_food_drink_allergy", "water_unresponsive", "leave_alone", "delay_ems_aed"],
      advancedActions: ["prepare_oxygen", "administer_oxygen", "check_spo2"],
      orderRules: baseOrderRules.concat([
        beforeAny("call_ems_911", ["assist_epinephrine", "monitor_until_help"], "Call EMS early for anaphylaxis signs.", 10),
        before("check_airway_breathing", "assist_epinephrine", "Check airway/breathing before or alongside epinephrine help.", 6),
        before("assist_epinephrine", "monitor_until_help", "Treat the anaphylaxis signs before only monitoring.", 8),
      ]),
      actionFeedback: {
        check_airway_breathing: "Their throat feels tight, so airway/breathing is a priority.",
        check_skin: "Hives and swelling support the allergic reaction concern.",
        call_ems_911: "Emergency help is being called.",
        assist_epinephrine: "You help with the auto-injector as the scenario allows.",
        prepare_oxygen: "Oxygen equipment is prepared as an advanced/trained option.",
        administer_oxygen: "Oxygen is used only if trained and the class protocol indicates it.",
        check_spo2: "Pulse ox gives another breathing reassessment clue if trained/equipment is available.",
        give_food_drink_allergy: "Food or drink could make airway/swallowing problems worse.",
        watch_for_anaphylaxis: "You keep watching for breathing, swelling, and responsiveness changes.",
      },
      hints: {
        primary: "The throat-tightness detail matters.",
        abc: "Airway/breathing and skin signs are the big clues.",
        help: "This is an EMS early scenario.",
        treatment: "Think epinephrine help if the card allows it.",
        ongoing: "Keep watching airway and breathing after treatment.",
        review: "EMS and epinephrine should not be after casual monitoring.",
      },
      sourceNotes: [sourceNotes.general, sourceNotes.anaphylaxis],
      instructorReviewNotes: instructorReviewNotes.anaphylaxis,
      tags: ["allergy", "anaphylaxis", "breathing"],
      difficulty: "hard",
    },
  ];

  for (const scenario of scenarios) {
    scenario.suggestedOrderText = labelsFor(scenario.recommendedSequence);
  }

  const questions = [
    {
      id: "q_bleeding_best_next",
      topic: "Severe bleeding",
      prompt: "Heavy bleeding is soaking through a towel. Safety and PPE are handled. What is the best next treatment?",
      choices: [
        {
          id: "direct_pressure",
          text: "Apply firm direct pressure.",
          correct: true,
          explanation: "Firm direct pressure is the key first treatment for heavy external bleeding.",
        },
        {
          id: "light_pad",
          text: "Put a pad on lightly.",
          explanation: "Light pressure is weak. Heavy bleeding needs firm pressure.",
        },
        {
          id: "shock_first",
          text: "Treat for shock before touching the bleeding.",
          explanation: "Shock care is good later, but it does not replace controlling heavy bleeding.",
        },
        {
          id: "pupils",
          text: "Keep checking pupils.",
          explanation: "That does not control the life-threatening bleeding.",
        },
      ],
      relatedTags: ["bleeding", "pressure", "life threat"],
    },
    {
      id: "q_burn_order",
      topic: "Burns",
      prompt: "After a small/moderate burn is removed from the heat source, what order is strongest?",
      choices: [
        {
          id: "cool_then_cover",
          text: "Cool with clean cool water, get clean dressing/supplies, then cover loosely.",
          correct: true,
          explanation: "Cooling comes before covering, and supplies/clean dressing make the covering step make sense.",
        },
        {
          id: "cover_first",
          text: "Cover right away before cooling.",
          explanation: "Covering before cooling misses the main burn-care step.",
        },
        {
          id: "ice",
          text: "Apply ice directly to the burn.",
          explanation: "Direct ice can worsen tissue injury.",
        },
        {
          id: "blisters",
          text: "Pop blisters and add random cream.",
          explanation: "That is not a good first response and can make things worse.",
        },
      ],
      relatedTags: ["burn", "cool first", "cover after cooling"],
    },
    {
      id: "q_heat_stroke",
      topic: "Heat stroke suspicion",
      prompt: "A patron is very hot, confused, and not acting normally. What response is strongest?",
      choices: [
        {
          id: "ems_cooling",
          text: "Call EMS early and start active cooling.",
          correct: true,
          explanation: "Confusion with severe heat signs is treated as serious: EMS plus active cooling.",
        },
        {
          id: "fan_only",
          text: "Place them beside a fan only.",
          explanation: "Fan-only is weak for heat stroke signs. Use active cooling.",
        },
        {
          id: "fluids_confused",
          text: "Give fluids even though they are confused.",
          explanation: "Confusion can make swallowing unsafe. Do not assume fluids are safe.",
        },
        {
          id: "wait",
          text: "Wait to see if it passes.",
          explanation: "Delaying EMS/cooling is the wrong priority.",
        },
      ],
      relatedTags: ["heat", "confusion", "active cooling"],
    },
    {
      id: "q_unresponsive_breathing",
      topic: "Unresponsive but breathing",
      prompt: "Someone is unresponsive but breathing normally. What is the better care path?",
      choices: [
        {
          id: "airway_monitor",
          text: "Maintain airway/recovery-position style care, get help, and monitor.",
          correct: true,
          explanation: "Breathing normally means airway maintenance and monitoring, not CPR.",
        },
        {
          id: "start_cpr",
          text: "Start CPR immediately.",
          explanation: "CPR is for not breathing normally, not normal breathing.",
        },
        {
          id: "give_water",
          text: "Give water.",
          explanation: "An unresponsive person may not swallow safely.",
        },
        {
          id: "leave",
          text: "Leave them alone to recover.",
          explanation: "They need monitoring because their breathing/status can change.",
        },
      ],
      relatedTags: ["unresponsive", "breathing", "airway"],
    },
    {
      id: "q_asthma",
      topic: "Asthma / breathing difficulty",
      prompt: "A patron is wheezing and says they have asthma. What is the best response set?",
      choices: [
        {
          id: "upright_inhaler_ems",
          text: "Position of comfort, help with their prescribed inhaler/action plan, call EMS if severe or not improving.",
          correct: true,
          explanation: "Breathing check, position of comfort, prescribed inhaler help, and reassessment are the key ideas.",
        },
        {
          id: "lie_flat",
          text: "Make them lie flat.",
          explanation: "Breathing difficulty usually fits position of comfort, not forcing them flat.",
        },
        {
          id: "other_inhaler",
          text: "Use someone else's inhaler.",
          explanation: "Do not use someone else's medication in this practice scenario.",
        },
        {
          id: "calm_only",
          text: "Only tell them to calm down.",
          explanation: "Calming support can help, but it is incomplete by itself.",
        },
      ],
      relatedTags: ["asthma", "breathing", "inhaler"],
    },
    {
      id: "q_anaphylaxis",
      topic: "Allergic reaction / anaphylaxis",
      prompt: "Hives, lip swelling, and throat tightness show up after a sting. What matters most?",
      choices: [
        {
          id: "ems_epi_airway",
          text: "Call EMS early, help with epinephrine if available/allowed, and monitor airway/breathing.",
          correct: true,
          explanation: "Airway/breathing signs make this serious, so EMS and epinephrine help matter early.",
        },
        {
          id: "food_drink",
          text: "Give food or drink.",
          explanation: "Food or drink is wrong when airway/swallowing risk is present.",
        },
        {
          id: "monitor_only",
          text: "Only monitor and wait.",
          explanation: "Monitoring alone is incomplete when anaphylaxis signs are present.",
        },
        {
          id: "ignore_breathing",
          text: "Ignore airway/breathing unless they collapse.",
          explanation: "Airway/breathing changes are exactly what you should be watching.",
        },
      ],
      relatedTags: ["allergy", "anaphylaxis", "epinephrine"],
    },
  ];

  window.POOL_DECK_DATA = {
    actions,
    scenarios,
    questions,
    contentSources,
    stageDefinitions,
  };
})();

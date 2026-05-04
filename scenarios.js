(function () {
  "use strict";

  const stageDefinitions = {
    assessment: {
      title: "Assessment",
      help: "Read the scene, check the victim, and pick the details that matter before treatment.",
    },
    help: {
      title: "Call EMS / get help",
      help: "Call EMS when the card calls for it, get backup, or prepare the supplies that fit.",
    },
    treatment: {
      title: "Treatment",
      help: "Choose the card-based treatment steps. Close distractors are included on purpose.",
    },
    monitor: {
      title: "Monitor / reassess",
      help: "Keep watching the victim, reassess breathing or circulation when relevant, and arrange follow-up.",
    },
    review: {
      title: "Review / Submit",
      help: "Reorder your actions if needed, then submit for feedback.",
    },
  };

  const actions = {
    scene_safety: {
      label: "Check scene safety",
      detail: "Make sure the area is safe before getting hands-on.",
      type: "assessment",
      positive: "You checked scene safety before treatment.",
      missed: "You skipped scene safety.",
    },
    ppe_barriers: {
      label: "Use gloves / barriers if available",
      detail: "Protect yourself before contact with blood, chemicals, or body fluids.",
      type: "assessment",
      positive: "You used barriers when the card situation needed them.",
      missed: "You missed gloves/barrier precautions.",
    },
    check_responsiveness: {
      label: "Check responsiveness",
      detail: "Decide whether the victim is conscious, confused, or unconscious.",
      type: "assessment",
      positive: "You checked responsiveness.",
      missed: "You missed responsiveness/level of consciousness.",
    },
    assess_breathing_found: {
      label: "Assess breathing in position found",
      detail: "Check breathing before moving an unconscious victim if you can.",
      type: "assessment",
      positive: "You assessed breathing in the position found.",
      missed: "You missed assessing breathing in the position found.",
    },
    check_airway_breathing: {
      label: "Check airway and breathing",
      detail: "Look for breathing problems, airway trouble, or breathing that stops.",
      type: "assessment",
      positive: "You treated airway/breathing as a priority.",
      missed: "You missed airway/breathing assessment.",
    },
    check_major_bleeding_air: {
      label: "Check major bleeding and escaping air",
      detail: "Look for major bleeding and chest air leaks when the card calls for it.",
      type: "assessment",
      positive: "You checked for major bleeding and escaping air.",
      missed: "You missed the major bleeding/escaping air check.",
    },
    assess_major_bleeding: {
      label: "Check for major bleeding",
      detail: "Look for life-threatening bleeding that needs immediate pressure.",
      type: "assessment",
      positive: "You checked for major bleeding.",
      missed: "You missed the major bleeding check.",
    },
    determine_history: {
      label: "Determine history",
      detail: "Ask what happened and watch for delayed or hidden symptoms.",
      type: "assessment",
      positive: "You determined the history before choosing care.",
      missed: "You missed the history clue.",
    },
    fast_stroke_check: {
      label: "Assess for stroke signs (FAST)",
      detail: "Check Face, Arms, Speech, and Time for stroke/TIA suspicion.",
      type: "assessment",
      positive: "You used FAST for stroke signs.",
      missed: "You missed the FAST stroke check.",
    },
    assess_injury: {
      label: "Assess the injury",
      detail: "Look at pain, deformity, bleeding, or the injured body part.",
      type: "assessment",
      positive: "You assessed the injury before choosing care.",
      missed: "You missed the injury assessment.",
    },
    assess_sensation_circulation_above_below: {
      label: "Assess sensation/circulation above and below",
      detail: "Check feeling and circulation around a fracture or limb injury.",
      type: "assessment",
      positive: "You checked sensation/circulation around the injury.",
      missed: "You missed sensation/circulation checks around the injury.",
    },
    check_distal_circulation_sensation: {
      label: "Check distal circulation and sensation",
      detail: "Check circulation and sensation farther down the limb.",
      type: "assessment",
      positive: "You checked distal circulation and sensation.",
      missed: "You missed distal circulation and sensation.",
    },
    look_mouth_obstructions: {
      label: "Look for mouth obstructions",
      detail: "Check for blood, saliva, or teeth blocking the mouth.",
      type: "assessment",
      positive: "You checked the mouth for obstructions.",
      missed: "You missed the mouth obstruction check.",
    },
    look_entry_exit_wounds: {
      label: "Look for entry and exit wounds",
      detail: "Electrical injuries can have entry and exit wounds.",
      type: "assessment",
      positive: "You looked for electrical entry and exit wounds.",
      missed: "You missed checking for electrical entry and exit wounds.",
    },
    call_ems_911: {
      label: "Phone EMS",
      detail: "Get emergency help started.",
      type: "help",
      positive: "You phoned EMS when the card called for it.",
      missed: "You missed phoning EMS.",
    },
    get_backup: {
      label: "Get backup / instructor help",
      detail: "Bring another trained person into the response.",
      type: "help",
      positive: "You got backup involved.",
      missed: "You missed getting backup.",
    },
    get_first_aid_kit: {
      label: "Get first aid kit / dressing",
      detail: "Bring clean dressings, bandages, gloves, or supplies.",
      type: "help",
      positive: "You got the right supplies involved.",
      missed: "You missed first aid supplies.",
    },
    advise_medical_followup: {
      label: "Advise medical follow-up",
      detail: "Tell the victim to see a doctor or seek medical attention when the card says so.",
      type: "monitor",
      positive: "You included medical follow-up.",
      missed: "You missed medical follow-up advice.",
    },
    monitor_vital_signs: {
      label: "Monitor vital signs",
      detail: "Watch breathing, pulse, responsiveness, and condition.",
      type: "monitor",
      positive: "You monitored vital signs.",
      missed: "You missed vital-sign monitoring.",
    },
    monitor_condition: {
      label: "Monitor victim's condition",
      detail: "Keep watching for improvement, worsening, or new symptoms.",
      type: "monitor",
      positive: "You kept monitoring the victim.",
      missed: "You missed ongoing monitoring.",
    },
    monitor_breathing_changes: {
      label: "Monitor breathing changes",
      detail: "Watch for breathing getting worse, stopping, or becoming noisy.",
      type: "monitor",
      positive: "You monitored breathing changes.",
      missed: "You missed breathing monitoring.",
    },
    treat_shock_monitor: {
      label: "Treat for shock and monitor",
      detail: "Keep them still, supported, and watched after the urgent care starts.",
      type: "monitor",
      positive: "You treated for shock and monitored.",
      missed: "You missed shock care/monitoring.",
    },
    help_test_blood_sugar: {
      label: "Help victim test blood sugar",
      detail: "Use their test kit if available and they can participate.",
      type: "treatment",
      positive: "You helped test blood sugar when the victim was conscious.",
      missed: "You missed helping test blood sugar if a kit is available.",
    },
    help_self_administer_sugar_or_medication: {
      label: "Help self-administer sugar or prescribed medication",
      detail: "Help them take glucose tablets, sugar, or prescribed medication themselves.",
      type: "treatment",
      positive: "You helped the victim self-administer sugar or prescribed medication.",
      missed: "You missed helping with sugar or prescribed medication.",
    },
    never_administer_insulin: {
      label: "Never administer insulin",
      detail: "Do not give insulin to the victim yourself.",
      type: "treatment",
      positive: "You avoided administering insulin.",
      missed: "You missed the card's insulin warning.",
    },
    administer_insulin: {
      label: "Administer insulin yourself",
      detail: "This is not allowed by the card.",
      type: "treatment",
      quality: "danger",
      warning: "The card says never administer insulin.",
    },
    recovery_position: {
      label: "Place in recovery position",
      detail: "Use recovery position to maintain an open airway and allow drainage.",
      type: "treatment",
      positive: "You used recovery position when the card called for it.",
      missed: "You missed recovery position.",
    },
    clear_objects_away: {
      label: "Clear objects away",
      detail: "Move nearby objects so the victim does not strike them.",
      type: "treatment",
      positive: "You cleared objects from the surrounding area.",
      missed: "You missed clearing objects away.",
    },
    do_not_restrict_movement: {
      label: "Do not restrict movements",
      detail: "Let the seizure happen without holding the victim down.",
      type: "treatment",
      positive: "You avoided restricting seizure movements.",
      missed: "You missed the warning not to restrict movements.",
    },
    restrict_movement: {
      label: "Hold the victim still",
      detail: "Restricting seizure movements can injure the victim.",
      type: "treatment",
      quality: "danger",
      warning: "The card says do NOT restrict the victim's movements.",
    },
    do_not_put_anything_mouth: {
      label: "Do not put anything in mouth",
      detail: "Do not place objects, food, or fingers in the mouth during a seizure.",
      type: "treatment",
      positive: "You avoided putting anything in the victim's mouth.",
      missed: "You missed the warning not to put anything in the mouth.",
    },
    place_object_in_mouth: {
      label: "Place something in the mouth",
      detail: "This is not allowed by the card.",
      type: "treatment",
      quality: "danger",
      warning: "The card says do NOT place anything in the victim's mouth.",
    },
    record_seizure_duration_count: {
      label: "Record seizure number and duration",
      detail: "Track how many seizures occur and how long they last.",
      type: "monitor",
      positive: "You recorded the number and duration of seizures.",
      missed: "You missed recording seizure number/duration.",
    },
    ask_auto_injector: {
      label: "Ask if they carry an auto-injector",
      detail: "Find out whether the victim has their medication.",
      type: "assessment",
      positive: "You asked about an auto-injector.",
      missed: "You missed asking if they carry an auto-injector.",
    },
    help_self_administer_auto_injector: {
      label: "Help self-administer auto-injector",
      detail: "Help the victim administer their own medication.",
      type: "treatment",
      positive: "You helped the victim self-administer the auto-injector.",
      missed: "You missed helping with the auto-injector.",
    },
    administer_auto_injector_for_victim: {
      label: "Administer auto-injector for them",
      detail: "The card says help victims administer, never administer it for them.",
      type: "treatment",
      quality: "danger",
      warning: "The card says never administer the medication for them.",
    },
    massage_auto_injector_area: {
      label: "Massage auto-injector area",
      detail: "Massage the area to disperse the medication.",
      type: "treatment",
      positive: "You included the card's massage step after the medication.",
      missed: "You missed massaging the area after auto-injector use.",
    },
    second_auto_injector_after_5: {
      label: "Second auto-injector dose after 5 minutes",
      detail: "A second dose may be given if signs and symptoms do not improve in 5 minutes.",
      type: "monitor",
      positive: "You considered a second dose after 5 minutes if there is no improvement.",
      missed: "You missed the second-dose-after-5-minutes point.",
    },
    treat_life_threatening_conditions: {
      label: "Treat life-threatening conditions",
      detail: "Handle major bleeding, escaping air, or other life threats found.",
      type: "treatment",
      positive: "You treated life-threatening conditions.",
      missed: "You missed treating life-threatening conditions.",
    },
    do_not_interfere_if_coughing: {
      label: "Do not interfere if coughing",
      detail: "Encourage coughing and do not use physical choking care while they can cough.",
      type: "treatment",
      positive: "You did not interfere physically while the victim was coughing.",
      missed: "You missed the coughing rule.",
    },
    interfere_coughing: {
      label: "Start thrusts while they are coughing",
      detail: "This interferes physically when the card says not to.",
      type: "treatment",
      quality: "danger",
      warning: "If the victim is coughing, the card says do not interfere physically.",
    },
    back_blows_thrusts_compressions: {
      label: "Back blows / thrusts / chest compressions",
      detail: "Use for severe airway obstruction when the victim is not coughing.",
      type: "treatment",
      positive: "You selected severe-obstruction choking care.",
      missed: "You missed the physical choking care for not-coughing obstruction.",
    },
    reassure_victim: {
      label: "Reassure victim",
      detail: "Keep the victim calm and supported.",
      type: "monitor",
      positive: "You reassured the victim.",
      missed: "You missed reassuring the victim.",
    },
    comfortable_position_forward: {
      label: "Comfortable position leaning forward",
      detail: "Assist sitting or standing, leaning forward slightly if helpful.",
      type: "treatment",
      positive: "You used a comfortable position leaning forward slightly.",
      missed: "You missed the comfortable forward-leaning position.",
    },
    pursed_lip_breathing: {
      label: "Pursed-lip breathing",
      detail: "Coach pursed-lip breathing for asthma or hyperventilation cards.",
      type: "treatment",
      positive: "You used pursed-lip breathing.",
      missed: "You missed pursed-lip breathing.",
    },
    help_take_medication: {
      label: "Help victim take their medication",
      detail: "Help with their own medication when the card says to.",
      type: "treatment",
      positive: "You helped the victim take their medication.",
      missed: "You missed helping with the victim's medication.",
    },
    loosen_tight_clothing: {
      label: "Loosen tight clothing",
      detail: "Loosen clothing around the neck or chest.",
      type: "treatment",
      positive: "You loosened tight clothing around the neck or chest.",
      missed: "You missed loosening tight clothing.",
    },
    force_lie_flat: {
      label: "Force them to lie flat",
      detail: "This does not fit breathing or chest-pain comfort positioning.",
      type: "treatment",
      quality: "weak",
      warning: "For this card, forcing a flat position is not the comfort position.",
    },
    reassure_calm: {
      label: "Reassure and calm victim",
      detail: "Try to calm the victim while assessing breathing.",
      type: "treatment",
      positive: "You reassured and tried to calm the victim.",
      missed: "You missed reassurance/calming.",
    },
    administer_oxygen: {
      label: "Administer oxygen if trained/protocol indicates",
      detail: "Use oxygen only if trained and the class protocol includes it.",
      type: "treatment",
      positive: "You included oxygen as a trained/protocol action.",
      missed: "You missed oxygen where the card specifically mentions it.",
    },
    advise_72h_followup: {
      label: "Advise doctor if delayed water-inhalation symptoms appear",
      detail: "Symptoms can be delayed up to 72 hours after the event.",
      type: "monitor",
      positive: "You included the 72-hour delayed-symptom follow-up.",
      missed: "You missed the delayed water-inhalation follow-up advice.",
    },
    monitor_water_inhalation_symptoms: {
      label: "Watch for water-inhalation symptoms",
      detail: "Coughing, wheezing, difficulty breathing, nausea/vomiting, frothy sputum, altered LOC, behavior change, or shock.",
      type: "monitor",
      positive: "You watched for water-inhalation symptoms.",
      missed: "You missed the water-inhalation symptom list.",
    },
    ignore_delayed_symptoms: {
      label: "Ignore delayed symptoms",
      detail: "The card says symptoms may be delayed up to 72 hours.",
      type: "monitor",
      quality: "danger",
      warning: "Do not ignore delayed symptoms after possible water inhalation.",
    },
    sling_family_transport: {
      label: "Use sling if family/non-EMS will transport",
      detail: "A sling is a good idea if someone other than EMS transports the victim.",
      type: "treatment",
      positive: "You used the sling for non-EMS transport.",
      missed: "You missed when a sling is useful.",
    },
    let_ems_immobilize: {
      label: "Let EMS immobilize if EMS transports",
      detail: "If EMS are transporting, let them immobilize injuries.",
      type: "treatment",
      positive: "You let EMS immobilize for EMS transport.",
      missed: "You missed the EMS transport distinction.",
    },
    unnecessary_sling_before_ems: {
      label: "Apply sling before EMS transport",
      detail: "The card says let EMS immobilize if EMS are transporting.",
      type: "treatment",
      quality: "weak",
      warning: "If EMS are transporting, the card says let EMS immobilize injuries.",
    },
    comfortable_position: {
      label: "Help into comfortable position",
      detail: "Usually sitting for chest pain and chest injury cards.",
      type: "treatment",
      positive: "You helped the victim into a comfortable position.",
      missed: "You missed the comfortable position.",
    },
    give_aspirin_no_contraindications: {
      label: "Give aspirin if no contraindications",
      detail: "Only if not advised against and not allergic.",
      type: "treatment",
      positive: "You included aspirin only with no contraindications.",
      missed: "You missed aspirin if no contraindications.",
    },
    assist_nitroglycerine_no_contraindications: {
      label: "Assist nitroglycerine if available/no contraindications",
      detail: "Only if available and no contraindications such as sexually enhancing drugs within 48 hours.",
      type: "treatment",
      positive: "You assisted with nitroglycerine only if available and no contraindications.",
      missed: "You missed nitroglycerine assistance if available and safe.",
    },
    give_aspirin_despite_allergy: {
      label: "Give aspirin despite allergy/advice against",
      detail: "The card lists those as contraindications.",
      type: "treatment",
      quality: "danger",
      warning: "Do not give aspirin when contraindications exist.",
    },
    give_nitro_with_contraindication: {
      label: "Assist nitro despite contraindication",
      detail: "The card flags sexually enhancing drugs within 48 hours as a contraindication.",
      type: "treatment",
      quality: "danger",
      warning: "Do not assist nitroglycerine when contraindications exist.",
    },
    maintain_open_airway: {
      label: "Maintain an open airway",
      detail: "Keep the airway open and assess breathing.",
      type: "treatment",
      positive: "You maintained an open airway.",
      missed: "You missed maintaining an open airway.",
    },
    direct_pressure_with_gloves: {
      label: "Apply direct pressure with gloved hand",
      detail: "If wearing gloves, apply direct pressure immediately using your hand.",
      type: "treatment",
      positive: "You applied direct pressure immediately with a gloved hand.",
      missed: "You missed immediate direct pressure with gloves.",
    },
    victim_applies_pressure_no_gloves: {
      label: "Have victim apply pressure if no gloves",
      detail: "If you do not have gloves, ask the victim to apply pressure.",
      type: "treatment",
      positive: "You used the no-gloves pressure option.",
      missed: "You missed the no-gloves pressure option.",
    },
    rest_body_part_reassure: {
      label: "Rest affected body part and reassure",
      detail: "Rest the injured part and keep the victim reassured.",
      type: "treatment",
      positive: "You rested the affected body part and reassured the victim.",
      missed: "You missed resting/reassuring.",
    },
    sterile_dressing_bandage: {
      label: "Apply sterile dressing and bandage",
      detail: "Apply a sterile dressing and bandage as soon as possible.",
      type: "treatment",
      positive: "You applied a sterile dressing and bandage.",
      missed: "You missed sterile dressing and bandage.",
    },
    tourniquet_if_direct_pressure_fails: {
      label: "Use tourniquet if direct pressure fails",
      detail: "Use a tourniquet when direct pressure fails to control bleeding.",
      type: "treatment",
      positive: "You used a tourniquet only after direct pressure failed.",
      missed: "You missed the tourniquet step if direct pressure fails.",
    },
    tourniquet_before_pressure: {
      label: "Use tourniquet before trying direct pressure",
      detail: "The card places tourniquet after direct pressure fails.",
      type: "treatment",
      quality: "weak",
      warning: "The card says use a tourniquet when direct pressure fails.",
    },
    flush_wound_clean_tap_water: {
      label: "Flush wound with clean tap water",
      detail: "Flush the wound before covering it.",
      type: "treatment",
      positive: "You flushed the wound with clean tap water.",
      missed: "You missed flushing the wound.",
    },
    apply_antibiotic_ointment: {
      label: "Apply antibiotic ointment if available",
      detail: "Use antibiotic ointment if available.",
      type: "treatment",
      positive: "You applied antibiotic ointment if available.",
      missed: "You missed antibiotic ointment if available.",
    },
    cover_sterile_dressing: {
      label: "Cover with sterile dressing",
      detail: "Cover wounds or burns with the dressing the card describes.",
      type: "treatment",
      positive: "You covered with a sterile dressing.",
      missed: "You missed the sterile dressing.",
    },
    immobilize_spine_neck: {
      label: "Immobilize spine and neck if suspected",
      detail: "Use this when concussion includes suspected spinal injury.",
      type: "treatment",
      positive: "You immobilized spine/neck when spinal injury was suspected.",
      missed: "You missed spine/neck immobilization when suspected.",
    },
    stop_activity_seek_medical_help: {
      label: "Stop activity and seek medical help",
      detail: "Have the victim stop activity and seek medical help.",
      type: "treatment",
      positive: "You stopped activity and directed medical help.",
      missed: "You missed stopping activity and medical help.",
    },
    return_to_activity: {
      label: "Let them return to activity",
      detail: "This conflicts with the concussion card.",
      type: "treatment",
      quality: "danger",
      warning: "For concussion, the card says stop activity and seek medical help.",
    },
    immobilize_spine_position_found: {
      label: "Immobilize in position found",
      detail: "Do not move the victim unless there is no other choice.",
      type: "treatment",
      positive: "You immobilized in the position found.",
      missed: "You missed immobilizing in position found.",
    },
    move_only_if_no_choice: {
      label: "Move only if no other choice",
      detail: "Only for safety risk, opening airway, or CPR.",
      type: "treatment",
      positive: "You kept movement limited to no-other-choice reasons.",
      missed: "You missed the movement limit.",
    },
    ask_victim_remain_still: {
      label: "Ask victim to remain still",
      detail: "Keep the victim still while help is coming.",
      type: "treatment",
      positive: "You asked the victim to remain still.",
      missed: "You missed asking the victim to remain still.",
    },
    stabilize_for_transport: {
      label: "Stabilize and prepare for hospital transport",
      detail: "Stabilization and preparation for transport to hospital.",
      type: "monitor",
      positive: "You stabilized and prepared for transport.",
      missed: "You missed stabilization/transport preparation.",
    },
    move_unnecessarily: {
      label: "Move the victim to make treatment easier",
      detail: "Unnecessary movement is not allowed by the spinal card.",
      type: "treatment",
      quality: "danger",
      warning: "The card says do not move the victim unless there is no other choice.",
    },
    remove_visible_graspable_object_only: {
      label: "Remove visible/graspable foreign object only",
      detail: "Remove gently only if it can be easily seen and grasped.",
      type: "treatment",
      positive: "You limited removal to visible, graspable objects.",
      missed: "You missed the visible/graspable-only rule.",
    },
    do_not_flush_ear_object: {
      label: "Do not flush object from ear",
      detail: "Flushing could make it swell and cause more damage.",
      type: "treatment",
      positive: "You avoided flushing the object.",
      missed: "You missed the no-flushing warning.",
    },
    flush_ear_object: {
      label: "Flush object out of ear",
      detail: "The card says avoid flushing an object from an ear.",
      type: "treatment",
      quality: "danger",
      warning: "The card says avoid flushing an object from an ear.",
    },
    allow_drainage: {
      label: "Allow drainage",
      detail: "Adjust victim so fluid can drain away.",
      type: "treatment",
      positive: "You allowed drainage.",
      missed: "You missed allowing drainage.",
    },
    preserve_amputated_part: {
      label: "Store amputated part correctly",
      detail: "Dry plastic bag, then ice water, and call EMS.",
      type: "treatment",
      positive: "You stored the amputated part as the card describes.",
      missed: "You missed the amputated-part storage step.",
    },
    store_tooth_correctly: {
      label: "Store knocked-out tooth correctly",
      detail: "Hold by crown; use balanced salt solution or listed alternatives, or victim's saliva not in the mouth.",
      type: "treatment",
      positive: "You stored the tooth correctly.",
      missed: "You missed correct tooth storage.",
    },
    do_not_reinsert_tooth: {
      label: "Do not reinsert tooth",
      detail: "The card says not to reinsert the tooth.",
      type: "treatment",
      positive: "You avoided reinserting the tooth.",
      missed: "You missed the no-reinsertion warning.",
    },
    reinsert_tooth: {
      label: "Reinsert the tooth",
      detail: "The card says do not reinsert the tooth.",
      type: "treatment",
      quality: "danger",
      warning: "The card says do not reinsert the tooth.",
    },
    drain_blood_saliva_forward_recovery: {
      label: "Drain blood/saliva away from throat",
      detail: "Tilt head forward or use recovery position.",
      type: "treatment",
      positive: "You kept blood and saliva draining away from the throat.",
      missed: "You missed drainage away from the throat.",
    },
    protect_support_injured_area: {
      label: "Protect and support injured area",
      detail: "Protect and support the chest, ribs, abdomen, or injury.",
      type: "treatment",
      positive: "You protected and supported the injured area.",
      missed: "You missed protecting/supporting the injured area.",
    },
    privacy_support: {
      label: "Be sensitive to privacy",
      detail: "Respect the victim's privacy while examining or supporting the injury.",
      type: "monitor",
      positive: "You included privacy sensitivity.",
      missed: "You missed the privacy point.",
    },
    do_not_give_food_liquids: {
      label: "Do not give food or liquids",
      detail: "The chest/abdominal injury cards say not to give food or liquids.",
      type: "treatment",
      positive: "You avoided food or liquids.",
      missed: "You missed the no-food/no-liquids instruction.",
    },
    give_food_liquids: {
      label: "Give food or liquids",
      detail: "This conflicts with chest/abdominal injury cards.",
      type: "treatment",
      quality: "danger",
      warning: "The card says do not give any food or liquids.",
    },
    non_occlusive_dressing: {
      label: "Apply non-occlusive dressing",
      detail: "Use only non-occlusive dressing, or leave exposed if appropriate.",
      type: "treatment",
      positive: "You used a non-occlusive dressing.",
      missed: "You missed the non-occlusive dressing.",
    },
    leave_chest_wound_exposed_if_needed: {
      label: "Leave chest wound exposed if needed",
      detail: "The card allows leaving it exposed instead of dressing.",
      type: "treatment",
      positive: "You recognized the leave-exposed option.",
      missed: "You missed the leave-exposed option.",
    },
    direct_pressure_only_massive_bleeding: {
      label: "Direct pressure only for massive bleeding",
      detail: "For open chest wound, direct pressure only if there is massive bleeding.",
      type: "treatment",
      positive: "You limited direct pressure to massive bleeding.",
      missed: "You missed the direct-pressure-only-if-massive-bleeding point.",
    },
    seal_chest_wound_occlusive: {
      label: "Seal with occlusive dressing",
      detail: "The card says only non-occlusive dressing or leave exposed.",
      type: "treatment",
      quality: "danger",
      warning: "The open-chest card says only apply a non-occlusive dressing, or leave the wound exposed.",
    },
    do_not_wrap_ribs: {
      label: "Do not wrap/strap/tape ribs",
      detail: "Rib fractures are not wrapped, strapped, or taped.",
      type: "treatment",
      positive: "You avoided wrapping/strapping/taping ribs.",
      missed: "You missed the rib wrapping warning.",
    },
    wrap_ribs: {
      label: "Wrap or tape the ribs",
      detail: "The card says rib fractures are not wrapped, strapped, or taped.",
      type: "treatment",
      quality: "danger",
      warning: "Rib fractures are not wrapped, strapped, or taped.",
    },
    support_chest_by_hand: {
      label: "Support chest area by hand",
      detail: "For flail chest with pain/difficulty breathing, support the injured area with your hand.",
      type: "treatment",
      positive: "You supported the injured chest area by hand.",
      missed: "You missed hand support for the injured chest area.",
    },
    assisted_breathing_if_needed: {
      label: "Provide assisted breathing if necessary",
      detail: "Use only if necessary and trained/protocol indicates.",
      type: "treatment",
      positive: "You included assisted breathing if necessary.",
      missed: "You missed assisted breathing if necessary.",
    },
    cover_moist_sterile_dressing: {
      label: "Cover protruding organs with sterile moist dressing",
      detail: "Use very clean, preferably sterile water; avoid clingy materials.",
      type: "treatment",
      positive: "You covered the protrusion with a sterile moist dressing.",
      missed: "You missed covering protruding organs with sterile moist dressing.",
    },
    protect_protrusion: {
      label: "Protect protrusion from damage",
      detail: "Keep the protrusion from drying and protect it from further damage.",
      type: "treatment",
      positive: "You protected the protrusion from further damage.",
      missed: "You missed protecting the protrusion.",
    },
    do_not_put_organs_back: {
      label: "Do not put organs back",
      detail: "The card says do not try to put organs back in the abdomen.",
      type: "treatment",
      positive: "You avoided putting organs back.",
      missed: "You missed the no-putting-organs-back warning.",
    },
    put_organs_back: {
      label: "Put organs back in abdomen",
      detail: "The card says not to do this.",
      type: "treatment",
      quality: "danger",
      warning: "Do not try to put the organs back in the abdomen.",
    },
    rest_injured_part: {
      label: "Rest the injured part",
      detail: "Rest the injured limb or body part.",
      type: "treatment",
      positive: "You rested the injured part.",
      missed: "You missed resting the injured part.",
    },
    immobilize_comfort_position: {
      label: "Immobilize in comfortable position",
      detail: "Immobilize it in a comfortable position and do not move it.",
      type: "treatment",
      positive: "You immobilized the injury in a comfortable position.",
      missed: "You missed immobilizing the injury.",
    },
    ice_with_cloth_barrier: {
      label: "Ice with cloth barrier",
      detail: "Ice 10-15 minutes every hour; do not put ice directly on skin.",
      type: "treatment",
      positive: "You iced with a cloth barrier.",
      missed: "You missed icing with a cloth barrier.",
    },
    elevate_if_no_pain: {
      label: "Elevate only if it does not increase pain",
      detail: "For sprains/strains, elevate an immobilized limb only if comfortable.",
      type: "treatment",
      positive: "You elevated only if it did not increase pain.",
      missed: "You missed the cautious elevation point.",
    },
    support_injured_part: {
      label: "Support injured part",
      detail: "Support the injured part in a comfortable position.",
      type: "treatment",
      positive: "You supported the injured part.",
      missed: "You missed supporting the injured part.",
    },
    do_not_realign: {
      label: "Do not realign",
      detail: "Do not attempt to put bones back or realign.",
      type: "treatment",
      positive: "You avoided realigning the injury.",
      missed: "You missed the no-realignment warning.",
    },
    realign_fracture_dislocation: {
      label: "Realign the injury",
      detail: "The card says not to attempt realignment or put bones back.",
      type: "treatment",
      quality: "danger",
      warning: "Do not attempt realignment or put the bones back.",
    },
    do_not_elevate_fracture: {
      label: "Do not elevate a fracture",
      detail: "The closed fracture card says not to elevate a limb with a fracture.",
      type: "treatment",
      positive: "You avoided elevating the fracture.",
      missed: "You missed the no-elevation-for-fracture instruction.",
    },
    elevate_fracture: {
      label: "Elevate the fractured limb",
      detail: "The closed fracture card says do not elevate a limb with a fracture.",
      type: "treatment",
      quality: "danger",
      warning: "Do not elevate a limb with a fracture.",
    },
    do_not_move_open_fracture: {
      label: "Do not move open fracture unless essential",
      detail: "Moving can cause further muscle and nerve damage.",
      type: "treatment",
      positive: "You avoided moving the open fracture unless essential.",
      missed: "You missed the open-fracture movement warning.",
    },
    clean_bandage_exposed_bone: {
      label: "Clean bandage over exposed bone/wound",
      detail: "Place a clean bandage over the exposed bone and wound.",
      type: "treatment",
      positive: "You covered exposed bone/wound with a clean bandage.",
      missed: "You missed the clean bandage over exposed bone/wound.",
    },
    hold_hips_support: {
      label: "Hold hips and support",
      detail: "Support the hips for pelvic/hip fracture.",
      type: "treatment",
      positive: "You held and supported the hips.",
      missed: "You missed holding/supporting the hips.",
    },
    do_not_move_lift_legs: {
      label: "Do not move or lift legs",
      detail: "Try not to move or lift the legs.",
      type: "treatment",
      positive: "You avoided moving/lifting the legs.",
      missed: "You missed the no-moving/lifting-legs instruction.",
    },
    spineboard_water_removal: {
      label: "Spineboard if in water",
      detail: "If in water, immobilize on a spineboard for removal.",
      type: "treatment",
      positive: "You included spineboard removal if in water.",
      missed: "You missed the water spineboard note.",
    },
    flush_burn_cool_clean_water: {
      label: "Flush burn with cool clean water",
      detail: "Flush the burned area with cool, clean water.",
      type: "treatment",
      positive: "You flushed the burn with cool, clean water.",
      missed: "You missed flushing the burn with cool, clean water.",
    },
    repeat_flush_until_heat_subsides: {
      label: "Repeat flushing until heat subsides",
      detail: "Continue until the victim notes the heat has subsided.",
      type: "treatment",
      positive: "You repeated flushing until heat subsided.",
      missed: "You missed repeat flushing until heat subsides.",
    },
    cover_burn_sterile_dry_dressing: {
      label: "Cover burn with sterile dry dressing",
      detail: "Cover the affected area with a sterile, dry dressing.",
      type: "treatment",
      positive: "You covered the burn with a sterile dry dressing.",
      missed: "You missed the sterile dry dressing.",
    },
    do_not_break_blisters: {
      label: "Do not break blisters",
      detail: "The second-degree burn card says not to break blisters.",
      type: "treatment",
      positive: "You avoided breaking blisters.",
      missed: "You missed the no-blister-breaking instruction.",
    },
    break_blisters: {
      label: "Break blisters",
      detail: "The card says do not break blisters.",
      type: "treatment",
      quality: "danger",
      warning: "Do not break blisters.",
    },
    separate_fingers_toes_dressings: {
      label: "Separate fingers/toes with dressings",
      detail: "Use if hands or feet are affected in a third-degree burn.",
      type: "treatment",
      positive: "You separated fingers/toes with dressings when relevant.",
      missed: "You missed separating fingers/toes when hands or feet are affected.",
    },
    avoid_touch_chemical_wear_gloves: {
      label: "Avoid touching chemical; wear gloves",
      detail: "Use a brush or cloth to avoid contact with the chemical.",
      type: "assessment",
      positive: "You avoided chemical contact and used gloves/barriers.",
      missed: "You missed avoiding contact with the chemical.",
    },
    remove_contaminated_clothing: {
      label: "Remove contaminated clothing",
      detail: "Remove clothing contaminated by chemical.",
      type: "treatment",
      positive: "You removed contaminated clothing.",
      missed: "You missed removing contaminated clothing.",
    },
    brush_dry_chemicals_before_flushing: {
      label: "Brush dry chemicals before flushing",
      detail: "Brush off dry chemicals before flushing with water.",
      type: "treatment",
      positive: "You brushed dry chemicals before flushing.",
      missed: "You missed brushing off dry chemicals before flushing.",
    },
    flush_chemical_15_min: {
      label: "Flush chemical burn at least 15 minutes",
      detail: "Use large volumes of cool, clean water for at least 15 minutes.",
      type: "treatment",
      positive: "You flushed the chemical burn for at least 15 minutes.",
      missed: "You missed flushing for at least 15 minutes.",
    },
    flush_before_brushing_dry_chemical: {
      label: "Flush dry chemical before brushing",
      detail: "The card says brush off dry chemicals before flushing.",
      type: "treatment",
      quality: "weak",
      warning: "Brush off dry chemicals before flushing with water.",
    },
    turn_off_electrical_current: {
      label: "Turn off electrical current first",
      detail: "Turn off current before touching the victim or electrical source.",
      type: "assessment",
      positive: "You turned off the current before touching the victim/source.",
      missed: "You missed turning off the electrical current first.",
    },
    stay_away_high_voltage: {
      label: "Stay away from high voltage",
      detail: "Only EMS or electrical companies should handle high-voltage wires/power lines.",
      type: "assessment",
      positive: "You stayed away from high voltage.",
      missed: "You missed the high-voltage warning.",
    },
    stand_dry_area: {
      label: "Stand in dry area",
      detail: "Stand in a dry area before helping.",
      type: "assessment",
      positive: "You stood in a dry area.",
      missed: "You missed standing in a dry area.",
    },
    cover_entry_exit_dry_dressing: {
      label: "Cover entry/exit wounds with dry dressing",
      detail: "Cover electrical entry and exit wounds with a dry dressing.",
      type: "treatment",
      positive: "You covered entry/exit wounds with a dry dressing.",
      missed: "You missed covering entry/exit wounds with a dry dressing.",
    },
    touch_before_power_off: {
      label: "Touch victim before current is off",
      detail: "This is unsafe for electrical injuries.",
      type: "treatment",
      quality: "danger",
      warning: "Turn off current before touching the victim or electrical source.",
    },
  };

  const sourceCards = {
    diabetes: {
      title: "Diabetes",
      scenario: "Lane swimmer feeling disoriented, trembling, weak, confused",
      treatment: `Phone EMS if unconscious and place victim in recovery position.
If conscious, help victim test their blood sugar (if test kit is available) and help victim self-administer prescribed medication or sugar (glucose tablets).
Never administer insulin.
Advise victim to seek medical attention. If a condition worsens, phone EMS.`,
      review: "Conscious and unconscious branches are on the same card; this playable scenario uses the conscious lane-swimmer branch.",
    },
    seizures: {
      title: "Seizures",
      scenario: "Change Room Stall - Victim with Epilepsy",
      treatment: `Phone EMS
Clear objects from surrounding area to prevent the victim from striking them and getting injured.
Do NOT restrict the victim's movements.
Do NOT place anything in the victim's mouth.
Record number and duration of seizures`,
      review: "Confirm whether class wants every seizure scenario to phone EMS or only specific triggers.",
    },
    anaphylaxis: {
      title: "Anaphylaxis",
      scenario: "Came in from outside - stung by a bee.",
      treatment: `Phone EMS.
Ask the victim if they carry an auto-injector.
Help victims administer their medication (never administer the medication for them). Massage the area to disperse the medication.
Watch and monitor vital signs and victim's condition.
A second dose may be given if signs and symptoms don't improve in 5 minutes.`,
      review: "The card says help the victim administer; do not interpret that as administering for them.",
    },
    unconscious_breathing: {
      title: "Unconscious Breathing",
      scenario: "Removed from water.",
      treatment: `Phone EMS
Assess breathing in position found. If breathing cannot be assessed in position found, movement may be required.
Place victim in the recovery position to maintain an open airway and allow for drainage.
Check for major bleeding and escaping air.
Treat life-threatening conditions.
Treat for shock and monitor breathing.`,
      review: "Movement is allowed only if breathing cannot be assessed in position found or another life threat requires it.",
    },
    choking: {
      title: "Choking",
      scenario: "Choking on gum in the pool.",
      treatment: `If victim is coughing, do not interfere physically.
If victim is not coughing, phone EMS.
Back blows, abdominal thrusts, or chest thrusts and chest compressions are effective for relieving severe airway obstructions.
Reassure victim. If successful, direct victim to seek medical treatment.`,
      review: "The playable scenario uses the not-coughing severe-obstruction branch; Question Mode covers the coughing branch.",
    },
    asthma: {
      title: "Asthma",
      scenario: "Aquafit participant",
      treatment: `Assist victim into a comfortable position: While sitting or standing, try learning forward slightly.
Pursed-lip breathing.
Help the victim take their medication.
Loosen tight fitting clothing around the neck or chest.
If the asthma attack continues or the victim is distressed, phone EMS.`,
      review: "Source says 'learning forward slightly'; preserved as source wording but playable copy uses leaning forward slightly.",
    },
    hyperventilation: {
      title: "Hyperventilation",
      scenario: "Held underwater",
      treatment: `Reassure and try to calm the victim.
Pursed-lip breathing.
Phone EMS if victim becomes unconscious.`,
      review: "Card has a short treatment list; avoid adding non-card breathing-bag rules.",
    },
    drowning: {
      title: "Drowning",
      scenario: "Wave pool DNS",
      treatment: `Determine history.
Assess victim's breathing - if displaying symptoms of water inhalation, phone EMS and administer oxygen.
Advise a conscious victim to see a doctor if they experience coughing, wheezing, difficulty breathing, nausea, vomiting, frothy sputum, altered level of conscious, extreme change in behavior, or shock in 72 hours.`,
      review: "Oxygen remains trained/protocol-based in the app wording even though the source card says administer oxygen.",
    },
    slings: {
      title: "Slings",
      scenario: "#1 Slings for Shoulder, Collarbone, Hand; #2 Slings for Lower arm, Wrist",
      treatment: `A sling is a good idea if the victim is going to be transported by someone other than EMS, such as a family member. If EMS are transporting the victim, let them immobilize any injuries.
#1 Slings for Shoulder, Collarbone, Hand
#2 Slings for Lower arm, Wrist`,
      review: "The card is a decision card rather than a full treatment algorithm.",
    },
    chest_pain: {
      title: "Chest Pain",
      scenario: "Chest pain in hot tub",
      treatment: `Phone EMS.
Assist victim into a comfortable position (often sitting). Loosen tight clothing around the neck and chest.
Give aspirin if no contraindications (Advised against, allergic)
Assist with medication (nitroglycerine) if available and no contraindications (sexually enhancing drugs within 48 hours).
Treat for shock.`,
      review: "Medication steps depend on contraindications; keep those as explicit conditions.",
    },
    stroke_tia: {
      title: "Stroke/TIA",
      scenario: "Stroke in lobby",
      treatment: `Phone EMS.
Assess for signs of a stroke (FAST)
Maintain an open airway and assess breathing.
Assist the victim into a comfortable position (often sitting) or recovery position if there are airway management problems.`,
      review: "Use recovery position only if airway management problems require it.",
    },
    major_bleeding: {
      title: "Major Bleeding",
      scenario: "Cut leg in change room",
      treatment: `Phone EMS.
Rest the affected body part and reassure the victim.
If you are wearing gloves, apply direct pressure to the wound immediately using your hand.
If you do not have gloves, ask the victim to apply pressure to the wound.
Apply a sterile dressing and bandage as soon as possible.
When direct pressure fails to control the bleeding, use a tourniquet.`,
      review: "Tourniquet is sequenced after direct pressure fails.",
    },
    wounds: {
      title: "Wounds",
      scenario: "Create your own",
      treatment: `Abrasion - Scraped skin
Incision - A clean-edged cut made by a sharp edge
Avulsion - A wound with a flap of skin
Laceration - A deep, tearing cut with jagged edges. Bites are considered lacerations.
Puncture - A stab wound caused by a sharp, pointed object
Flush wound with clean tap water and cover with a sterile dressing.
Apply antibiotic ointment if available.`,
      review: "The source card says create your own scenario; this app uses a small pool-deck scrape/cut practice case.",
    },
    concussion: {
      title: "Concussion",
      scenario: "Slip on floor - hit head",
      treatment: `Phone EMS if obvious trauma is present.
Immobilize spine and neck if a spinal injury is suspected.
Have victim stop activity and seek medical help.`,
      review: "Card depends on whether obvious trauma or spinal injury is suspected.",
    },
    spinal_injury: {
      title: "Spinal Injury",
      scenario: "Land spinal, breathing; Water spinal, breathing",
      treatment: `Phone EMS.
Immobilize in position found. Do not move the victim unless there is no other choice (safety risk, open the airway, perform CPR).
Ask victim to remain still.
Stabilization and preparation for transport to hospital.`,
      review: "Water spinal is included in the source scenario line; the playable scenario uses land spinal, breathing.",
    },
    ear_injuries: {
      title: "Ear Injuries",
      scenario: "Foreign object / cuts, tears, bleeding, or bruising",
      treatment: `Foreign Object in Ear:
Remove object gently only if it can be easily seen and grasped
Avoid flushing an object from an ear as it could swell and cause more damage
Adjust victim to allow drainage
If the object remains stuck, seek medical assistance.
Cuts, Tears, Bleeding, or Bruising
Control bleeding of external wounds with direct pressure.
Cover with sterile bandage.
If bleeding is internal, adjust to allow for drainage. This will avoid pressure from developing inside the ear.
Advise victim to see a doctor.
If part of the ear is amputated, place the ear in a dry plastic bag, put in ice water and call EMS.`,
      review: "The card has multiple branches; playable scenario focuses on a visible/graspable foreign object with drainage/follow-up.",
    },
    dental_mouth_injuries: {
      title: "Dental/Mouth Injuries",
      scenario: "Broken or missing teeth / cut tongue",
      treatment: `Broken or Missing Teeth
Look for any obstructions in the mouth.
Teeth can be salvaged. Hold tooth from the crown. Do not clean to avoid damaging the roots. Place in a balanced salt solution. Alternatives include egg white, coconut water, whole milk, or saline. Alternatively, store the tooth in the victim's saliva (not in the mouth).
Do not reinsert the tooth. Advise victim to seek medical follow-up
Cut Tongue
Look for any obstructions in the mouth.
Keep blood and saliva drained away from the throat by tilting the head forward or placing the victim in the recovery position.`,
      review: "The playable scenario focuses on a knocked-out tooth; source also includes cut tongue.",
    },
    nose_injuries: {
      title: "Nose Injuries",
      scenario: "Source card repeats ear-injury branches",
      treatment: `Foreign Object in Ear:
Remove object gently only if it can be easily seen and grasped
Avoid flushing an object from an ear as it could swell and cause more damage
Adjust victim to allow drainage
If the object remains stuck, seek medical assistance.
Cuts, Tears, Bleeding, or Bruising
Control bleeding of external wounds with direct pressure.
Cover with sterile bandage.
If bleeding is internal, adjust to allow for drainage. This will avoid pressure from developing inside the ear.
Advise victim to see a doctor.
If part of the ear is amputated, place the ear in a dry plastic bag, put in ice water and call EMS.`,
      review: "Instructor review needed: the Nose Injuries card appears to repeat Ear Injuries wording.",
    },
    open_chest_wound: {
      title: "Open-Chest Wound",
      scenario: "Stab wound",
      treatment: `Phone EMS.
Help the victim into a comfortable position.
Protect and support the injured area.
Be sensitive to the victim's privacy.
Monitor for changes in breathing. Do not give any food or liquids.
Only apply a non-occlusive* dressing. Change dressing immediately if it becomes blood-soaked. Alternatively, leave the wound exposed. Apply direct pressure only if there is massive bleeding.
A non-occlusive dressing is non-adhering and permeable allowing liquids and gasses to pass through.`,
      review: "Do not convert this to an occlusive dressing rule; source says non-occlusive or exposed.",
    },
    broken_ribs: {
      title: "Broken Ribs",
      scenario: "Fall and land on ribs on staircase",
      treatment: `Phone EMS.
Help the victim into a comfortable position.
Protect and support the injured area.
Be sensitive to the victim's privacy.
Monitor for changes in breathing. Do not give any food or liquids.
Rib fractures are not wrapped, strapped, or taped.`,
      review: "Keep the no-wrap/no-strap/no-tape rule explicit.",
    },
    flail_chest: {
      title: "Flail Chest",
      scenario: "Baseball bat to ribs",
      treatment: `Phone EMS.
Help the victim into a comfortable position.
Protect and support the injured area.
Be sensitive to the victim's privacy.
Monitor for changes in breathing. Do not give any food or liquids.
If the victim is experiencing pain and difficulty breathing: expose and examine the injury, provide support with your hand to the injured area and provide assisted breathing if necessary.`,
      review: "Assisted breathing should follow the class protocol/training level.",
    },
    internal_bleeding: {
      title: "Internal Bleeding",
      scenario: "Severe fall",
      treatment: `Phone EMS.
Help the victim into a comfortable position.
Protect and support the injured area.
Be sensitive to the victim's privacy.
Monitor for changes in breathing. Do not give any food or liquids.`,
      review: "The card has no extra hidden treatment beyond EMS, comfort/support, monitoring, and no food/liquids.",
    },
    protruding_organs: {
      title: "Protruding Organs",
      scenario: "Slice to abdomen",
      treatment: `Phone EMS.
Help the victim into a comfortable position.
Protect and support the injured area.
Be sensitive to the victim's privacy.
Monitor for changes in breathing. Do not give any food or liquids.
Keep the protrusion from drying - cover the protrusion with a sterile dressing that has been moistened with very clean (preferably sterile) water - don't use materials like paper towl, toilet tissue or cotton which cling when wet.
Protect from further damage.
Do not try to put the organs back in the abdomen.`,
      review: "Source typo 'paper towl' preserved in source field.",
    },
    sprains_strains: {
      title: "Sprains & Strains",
      scenario: "Slip",
      treatment: `Rest the injured part
Immobilize it in a comfortable position - do not move it.
Ice the injured part for 10-15 minutes every hour until the swelling subsides. Icing is the most important component of treatment. Avoid placing ice directly against skin; wrap it in a cloth.
Elevate an immobilized limb only if it does not increase pain or discomfort.
Advise to seek medical follow-up.`,
      review: "This card allows elevation only if it does not increase pain/discomfort.",
    },
    dislocation: {
      title: "Dislocation",
      scenario: "Shoulder dislocation",
      treatment: `Phone EMS.
Rest the injured part.
Immobilize it in a comfortable position - do not move it.
Ice the injured part for 10-15 minutes every hour.
Support the injured part in a comfortable position. Do not attempt to put the bones back; this can cause more damage.`,
      review: "Do not treat dislocation as a realignment task.",
    },
    closed_fracture: {
      title: "Closed Fracture",
      scenario: "Closed wrist fracture; Closed femur fracture; Closed ankle fracture",
      treatment: `Phone EMS.
Rest the injured part.
Immobilize it in a comfortable position - do not move it.
Ice the injured part until the swelling subsides, 10-15 minutes every hour.
Do not elevate a limb with a fracture. Do not attempt realignment.`,
      review: "The source contains three scenario options; playable case uses closed wrist fracture.",
    },
    open_fracture: {
      title: "Open Fracture",
      scenario: "Open humerus fracture",
      treatment: `Phone EMS.
Unless it is absolutely essential, do NOT move victims with this condition. It could cause further muscle and nerve damage.
Rest the affected part.
Immobilize in position found. Do not attempt realignment.
Place a clean bandage over the exposed bone and wound.
Assess sensation above and below the injury.`,
      review: "Movement is allowed only when absolutely essential.",
    },
    pelvic_hip_fracture: {
      title: "Pelvic/Hip Fracture",
      scenario: "Severe fall onto hip",
      treatment: `Phone EMS.
Immobilize in position found.
Hold hips and support.
Try not to move or lift the legs.
If in the water, immobilize on a spineboard for removal.
Check distal circulation and sensation in the legs.`,
      review: "Water removal is included as a contextual source note, not forced into the land scenario.",
    },
    thermal_burns: {
      title: "Thermal Burns",
      scenario: "Thermal burn practice",
      treatment: `First Degree Burn
Flush the burned area with cool, clean water.
Repeat flushing until the victim notes that the heat in the affected area has subsided.
Phone EMS if the burned area is large, the face or neck, or the victim is a small child or infant.
Second Degree Burn
Flush the burned area with cool, clean water.
Cover the affected area with a sterile, dry dressing.
Do not break blisters. Advise victim to see a doctor for medical follow-up.
Phone EMS if the burned area is large, the face or neck, or the victim is a small child or infant.
Third Degree Burn
Phone EMS.
Flush the burned area with cool, clean water.
Cover the affected area with a sterile, dry dressing.
If the hands and feet are affected, separate the fingers or toes with dressings.`,
      review: "The playable scenario uses a second-degree style burn; source field preserves all three degrees.",
    },
    chemical_burns: {
      title: "Chemical Burns",
      scenario: "Chemical burn practice",
      treatment: `Do not touch chemical products or the container. Wear gloves and use a brush or cloth to avoid coming in contact with the chemical. Immobilize in position found.
Remove contaminated clothing.
Brush off dry chemicals before flushing with water.
Flush the area with cool, clean water for at least 15 minutes.
Use large volumes of water to flush these burns. Start washing the chemical off the skin as soon as possible.
Phone EMS if the area affected is larger than your palm, is on the face or neck, or a small child.`,
      review: "The card includes 'Immobilize in position found' in the chemical product warning; kept as source wording.",
    },
    electrical_burns: {
      title: "Electrical Burns",
      scenario: "Electrical burn practice",
      treatment: `Phone EMS.
Turn off the current before touching the victim or the electrical source. Only EMS or electrical companies should handle high voltage wires and power lines. Do not attempt to use a stick or a plastic pole to remove a fallen wire from the victim. Stay well back.
Stand in a dry area.
Look for wounds where electricity entered and exited the body, and cover the wounds with a dry dressing.`,
      review: "Do not touch until current is off; high voltage is for EMS/electrical companies.",
    },
    radiation_burns: {
      title: "Radiation Burns",
      scenario: "Radiation burn practice",
      treatment: `Phone EMS.
Turn off the current before touching the victim or the electrical source. Only EMS or electrical companies should handle high voltage wires and power lines. Do not attempt to use a stick or a plastic pole to remove a fallen wire from the victim. Stay well back.
Stand in a dry area.
Look for wounds where electricity entered and exited the body, and cover the wounds with a dry dressing.`,
      review: "Instructor review needed: Radiation Burns repeats the Electrical Burns treatment in the source document.",
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
    return { type: "before", action, before: beforeAction, message, penalty: penalty || 5 };
  }

  function beforeAny(action, beforeAnyList, message, penalty) {
    return { type: "beforeAny", action, beforeAny: beforeAnyList, message, penalty: penalty || 6 };
  }

  function early(action, maxPosition, message, penalty) {
    return { type: "early", action, maxPosition, message, penalty: penalty || 8 };
  }

  function requiresBefore(action, requiredBefore, message, penalty) {
    return { type: "requiresBefore", action, requiredBefore, message, penalty: penalty || 8 };
  }

  function selectedWithout(action, notWith, message, penalty) {
    return { type: "selectedWithout", action, notWith, message, penalty: penalty || 12 };
  }

  function makeScenario(cardKey, def) {
    const card = sourceCards[cardKey];
    return {
      id: def.id || cardKey,
      title: def.title || card.title,
      cardSourceTitle: card.title,
      prompt: def.prompt,
      scenarioText: def.scenarioText || card.scenario,
      stages: def.stages,
      recommendedSequence: def.recommendedSequence,
      criticalActions: def.criticalActions,
      expectedActions: def.expectedActions,
      contextualActions: def.contextualActions || [],
      optionalGoodActions: def.optionalGoodActions || [],
      weakActions: def.weakActions || [],
      dangerousActions: def.dangerousActions || [],
      orderRules: def.orderRules || [],
      actionFeedback: def.actionFeedback || {},
      hints: def.hints || {},
      suggestedOrderText: "",
      sourceCardTreatment: card.treatment,
      sourceCardScenario: card.scenario,
      instructorReviewNotes: def.instructorReviewNotes || card.review,
      tags: def.tags || [],
      difficulty: def.difficulty || "medium",
    };
  }

  const noFoodDistractors = ["give_food_liquids", "force_lie_flat"];
  const monitorBasics = ["monitor_condition", "monitor_vital_signs", "advise_medical_followup", "get_backup"];

  const scenarios = [
    makeScenario("diabetes", {
      prompt: "During lane swim, a swimmer is disoriented, trembling, weak, and confused but still conscious.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "determine_history", "check_airway_breathing"]),
        stage("help", ["get_backup", "call_ems_911", "get_first_aid_kit"]),
        stage("treatment", [
          "help_test_blood_sugar",
          "help_self_administer_sugar_or_medication",
          "never_administer_insulin",
          "administer_insulin",
          "recovery_position",
        ]),
        stage("monitor", ["advise_medical_followup", "monitor_condition", "call_ems_911"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "determine_history",
        "help_test_blood_sugar",
        "help_self_administer_sugar_or_medication",
        "never_administer_insulin",
        "monitor_condition",
        "advise_medical_followup",
      ],
      criticalActions: ["check_responsiveness", "help_test_blood_sugar", "help_self_administer_sugar_or_medication", "never_administer_insulin"],
      expectedActions: ["scene_safety", "determine_history", "monitor_condition", "advise_medical_followup"],
      optionalGoodActions: ["get_backup", "get_first_aid_kit"],
      weakActions: ["recovery_position"],
      dangerousActions: ["administer_insulin"],
      orderRules: [
        before("help_test_blood_sugar", "help_self_administer_sugar_or_medication", "Test blood sugar before choosing sugar/medication help when a kit is available.", 5),
        before("check_responsiveness", "help_self_administer_sugar_or_medication", "Check responsiveness before helping with sugar or medication.", 8),
      ],
      actionFeedback: {
        help_test_blood_sugar: "The card says to help test blood sugar if the kit is available.",
        never_administer_insulin: "Good: the card specifically says never administer insulin.",
        administer_insulin: "That is a dangerous choice on this card.",
      },
      hints: {
        assessment: "The card splits conscious and unconscious diabetes care.",
        treatment: "For a conscious victim, help them test and self-administer. Do not give insulin.",
        monitor: "The card ends with medical attention and EMS if the condition worsens.",
      },
      tags: ["medical", "diabetes", "blood sugar"],
      difficulty: "medium",
    }),
    makeScenario("seizures", {
      prompt: "In a change room stall, a victim with epilepsy is having a seizure.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "determine_history", "check_airway_breathing"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["clear_objects_away", "do_not_restrict_movement", "restrict_movement", "do_not_put_anything_mouth", "place_object_in_mouth"]),
        stage("monitor", ["record_seizure_duration_count", "monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "call_ems_911",
        "clear_objects_away",
        "do_not_restrict_movement",
        "do_not_put_anything_mouth",
        "record_seizure_duration_count",
        "monitor_condition",
      ],
      criticalActions: ["call_ems_911", "clear_objects_away", "do_not_restrict_movement", "do_not_put_anything_mouth"],
      expectedActions: ["scene_safety", "record_seizure_duration_count", "monitor_condition"],
      optionalGoodActions: ["get_backup", "check_responsiveness", "monitor_vital_signs"],
      dangerousActions: ["restrict_movement", "place_object_in_mouth"],
      orderRules: [
        early("clear_objects_away", 4, "Clear nearby objects early so the victim does not strike them.", 8),
        before("call_ems_911", "record_seizure_duration_count", "Phone EMS before settling into monitoring details.", 5),
      ],
      hints: {
        treatment: "The big traps are holding them down or putting something in their mouth.",
        monitor: "The card asks for number and duration of seizures.",
      },
      tags: ["medical", "seizure"],
      difficulty: "medium",
    }),
    makeScenario("anaphylaxis", {
      prompt: "A patron came in from outside after being stung by a bee and is showing signs of a serious allergic reaction.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "ask_auto_injector"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["help_self_administer_auto_injector", "administer_auto_injector_for_victim", "massage_auto_injector_area", "give_food_liquids"]),
        stage("monitor", ["monitor_vital_signs", "monitor_condition", "second_auto_injector_after_5"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_airway_breathing",
        "call_ems_911",
        "ask_auto_injector",
        "help_self_administer_auto_injector",
        "massage_auto_injector_area",
        "monitor_vital_signs",
        "second_auto_injector_after_5",
      ],
      criticalActions: ["check_airway_breathing", "call_ems_911", "ask_auto_injector", "help_self_administer_auto_injector", "monitor_vital_signs"],
      expectedActions: ["scene_safety", "massage_auto_injector_area", "monitor_condition", "second_auto_injector_after_5"],
      optionalGoodActions: ["get_backup", "check_responsiveness"],
      weakActions: ["give_food_liquids"],
      dangerousActions: ["administer_auto_injector_for_victim"],
      orderRules: [
        beforeAny("call_ems_911", ["help_self_administer_auto_injector", "monitor_condition"], "Phone EMS early for anaphylaxis.", 10),
        before("ask_auto_injector", "help_self_administer_auto_injector", "Ask if they carry an auto-injector before helping them use it.", 8),
      ],
      hints: {
        assessment: "Ask about the auto-injector; do not skip airway/breathing.",
        treatment: "Help them administer their medication. Do not administer it for them.",
        monitor: "The card includes vital signs and a possible second dose after 5 minutes.",
      },
      tags: ["medical", "anaphylaxis", "allergy", "breathing"],
      difficulty: "hard",
    }),
    makeScenario("unconscious_breathing", {
      prompt: "A victim has been removed from water. They are unconscious but breathing.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "assess_breathing_found", "check_major_bleeding_air"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["recovery_position", "treat_life_threatening_conditions", "treat_shock_monitor"]),
        stage("monitor", ["monitor_breathing_changes", "monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "call_ems_911",
        "assess_breathing_found",
        "recovery_position",
        "check_major_bleeding_air",
        "treat_life_threatening_conditions",
        "treat_shock_monitor",
        "monitor_breathing_changes",
      ],
      criticalActions: ["call_ems_911", "assess_breathing_found", "recovery_position", "monitor_breathing_changes"],
      expectedActions: ["scene_safety", "check_responsiveness", "check_major_bleeding_air", "treat_life_threatening_conditions", "treat_shock_monitor"],
      optionalGoodActions: ["get_backup", "monitor_vital_signs"],
      orderRules: [
        before("assess_breathing_found", "recovery_position", "Assess breathing before moving into recovery position if possible.", 8),
        before("call_ems_911", "treat_shock_monitor", "Phone EMS before settling into shock care/monitoring.", 5),
      ],
      hints: {
        assessment: "The card says assess breathing in position found.",
        treatment: "Recovery position is for the unconscious breathing victim.",
      },
      tags: ["medical", "unconscious", "breathing", "water"],
      difficulty: "medium",
    }),
    makeScenario("choking", {
      prompt: "A patron is choking on gum in the pool area and is not coughing effectively.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "determine_history"]),
        stage("help", ["call_ems_911", "get_backup"]),
        stage("treatment", ["back_blows_thrusts_compressions", "do_not_interfere_if_coughing", "interfere_coughing", "reassure_victim"]),
        stage("monitor", ["advise_medical_followup", "monitor_breathing_changes", "monitor_condition"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_airway_breathing",
        "call_ems_911",
        "back_blows_thrusts_compressions",
        "reassure_victim",
        "advise_medical_followup",
        "monitor_breathing_changes",
      ],
      criticalActions: ["check_airway_breathing", "call_ems_911", "back_blows_thrusts_compressions"],
      expectedActions: ["scene_safety", "reassure_victim", "advise_medical_followup", "monitor_breathing_changes"],
      optionalGoodActions: ["get_backup", "determine_history"],
      weakActions: ["do_not_interfere_if_coughing"],
      dangerousActions: ["interfere_coughing"],
      orderRules: [before("check_airway_breathing", "back_blows_thrusts_compressions", "Confirm severe obstruction before physical choking care.", 6)],
      hints: {
        assessment: "The card changes care depending on whether they are coughing.",
        treatment: "This scenario says not coughing effectively, so severe-obstruction care fits.",
      },
      tags: ["medical", "choking", "airway"],
      difficulty: "medium",
    }),
    makeScenario("asthma", {
      prompt: "An aquafit participant is wheezing and distressed from an asthma attack.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "determine_history"]),
        stage("help", ["get_backup", "call_ems_911", "get_first_aid_kit"]),
        stage("treatment", ["comfortable_position_forward", "pursed_lip_breathing", "help_take_medication", "loosen_tight_clothing", "force_lie_flat"]),
        stage("monitor", ["monitor_breathing_changes", "monitor_condition", "call_ems_911"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_airway_breathing",
        "comfortable_position_forward",
        "pursed_lip_breathing",
        "help_take_medication",
        "loosen_tight_clothing",
        "monitor_breathing_changes",
        "call_ems_911",
      ],
      criticalActions: ["check_airway_breathing", "comfortable_position_forward", "pursed_lip_breathing", "help_take_medication"],
      expectedActions: ["scene_safety", "loosen_tight_clothing", "monitor_breathing_changes", "call_ems_911"],
      optionalGoodActions: ["get_backup", "determine_history", "monitor_condition"],
      weakActions: ["force_lie_flat"],
      orderRules: [
        before("comfortable_position_forward", "help_take_medication", "Position the victim comfortably before or alongside medication help.", 4),
        beforeAny("call_ems_911", ["monitor_condition"], "If the attack continues or the victim is distressed, phone EMS.", 5),
      ],
      hints: {
        treatment: "Comfort position, pursed-lip breathing, medication help, and loosen clothing all come from the card.",
        monitor: "EMS matters if the attack continues or the victim is distressed.",
      },
      tags: ["medical", "asthma", "breathing"],
      difficulty: "medium",
    }),
    makeScenario("hyperventilation", {
      prompt: "After being held underwater, a victim is breathing faster than necessary and panicking.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "determine_history"]),
        stage("help", ["get_backup", "call_ems_911"]),
        stage("treatment", ["reassure_calm", "pursed_lip_breathing", "force_lie_flat"]),
        stage("monitor", ["monitor_breathing_changes", "monitor_condition", "call_ems_911"]),
      ]),
      recommendedSequence: ["scene_safety", "check_airway_breathing", "reassure_calm", "pursed_lip_breathing", "monitor_breathing_changes", "call_ems_911"],
      criticalActions: ["check_airway_breathing", "reassure_calm", "pursed_lip_breathing"],
      expectedActions: ["scene_safety", "monitor_breathing_changes", "monitor_condition", "call_ems_911"],
      optionalGoodActions: ["get_backup", "determine_history"],
      weakActions: ["force_lie_flat"],
      orderRules: [before("check_responsiveness", "call_ems_911", "If the victim becomes unconscious, phone EMS.", 3)],
      hints: {
        treatment: "This short card says reassure/calm and pursed-lip breathing.",
        monitor: "EMS is tied to becoming unconscious.",
      },
      tags: ["medical", "hyperventilation", "breathing"],
      difficulty: "easy",
    }),
    makeScenario("drowning", {
      prompt: "In the wave pool, a victim was a DNS and may have inhaled water.",
      stages: withReview([
        stage("assessment", ["scene_safety", "determine_history", "check_responsiveness", "check_airway_breathing"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["administer_oxygen", "recovery_position", "treat_shock_monitor"]),
        stage("monitor", ["monitor_water_inhalation_symptoms", "advise_72h_followup", "monitor_breathing_changes", "ignore_delayed_symptoms"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "determine_history",
        "check_airway_breathing",
        "call_ems_911",
        "administer_oxygen",
        "monitor_water_inhalation_symptoms",
        "advise_72h_followup",
      ],
      criticalActions: ["determine_history", "check_airway_breathing", "call_ems_911", "monitor_water_inhalation_symptoms"],
      expectedActions: ["scene_safety", "administer_oxygen", "advise_72h_followup", "monitor_breathing_changes"],
      optionalGoodActions: ["get_backup", "treat_shock_monitor"],
      weakActions: ["recovery_position"],
      dangerousActions: ["ignore_delayed_symptoms"],
      orderRules: [
        before("determine_history", "administer_oxygen", "Determine history and breathing before treatment decisions.", 4),
        before("call_ems_911", "administer_oxygen", "Phone EMS when symptoms of water inhalation are present.", 5),
      ],
      hints: {
        assessment: "The card starts with history and breathing.",
        monitor: "The 72-hour symptom list is important.",
      },
      tags: ["medical", "drowning", "water inhalation", "breathing"],
      difficulty: "hard",
    }),
    makeScenario("slings", {
      prompt: "A patron has a shoulder/arm injury and family asks if they can drive the victim to get checked.",
      stages: withReview([
        stage("assessment", ["scene_safety", "assess_injury", "check_responsiveness"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["sling_family_transport", "let_ems_immobilize", "unnecessary_sling_before_ems"]),
        stage("monitor", ["monitor_condition", "advise_medical_followup"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "sling_family_transport", "advise_medical_followup", "monitor_condition"],
      criticalActions: ["assess_injury", "sling_family_transport"],
      expectedActions: ["scene_safety", "advise_medical_followup", "monitor_condition"],
      contextualActions: [
        {
          action: "let_ems_immobilize",
          reason: "If EMS are transporting, the card says let EMS immobilize injuries.",
          reward: 5,
        },
      ],
      optionalGoodActions: ["get_backup", "get_first_aid_kit"],
      weakActions: ["unnecessary_sling_before_ems"],
      orderRules: [before("assess_injury", "sling_family_transport", "Assess the injury before choosing transport support.", 5)],
      hints: {
        treatment: "The card is about transport: family/non-EMS versus EMS.",
      },
      tags: ["musculoskeletal", "slings", "transport"],
      difficulty: "easy",
    }),
    makeScenario("chest_pain", {
      prompt: "A hot tub patron reports non-traumatic chest pain.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "determine_history"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", [
          "comfortable_position",
          "loosen_tight_clothing",
          "give_aspirin_no_contraindications",
          "assist_nitroglycerine_no_contraindications",
          "give_aspirin_despite_allergy",
          "give_nitro_with_contraindication",
        ]),
        stage("monitor", ["treat_shock_monitor", "monitor_vital_signs", "monitor_condition"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_responsiveness",
        "call_ems_911",
        "comfortable_position",
        "loosen_tight_clothing",
        "give_aspirin_no_contraindications",
        "assist_nitroglycerine_no_contraindications",
        "treat_shock_monitor",
      ],
      criticalActions: ["call_ems_911", "comfortable_position", "give_aspirin_no_contraindications", "assist_nitroglycerine_no_contraindications"],
      expectedActions: ["scene_safety", "check_responsiveness", "loosen_tight_clothing", "treat_shock_monitor", "monitor_vital_signs"],
      optionalGoodActions: ["get_backup", "determine_history"],
      dangerousActions: ["give_aspirin_despite_allergy", "give_nitro_with_contraindication"],
      orderRules: [beforeAny("call_ems_911", ["give_aspirin_no_contraindications", "assist_nitroglycerine_no_contraindications"], "Phone EMS before medication assistance.", 8)],
      hints: {
        help: "Chest pain is an EMS card.",
        treatment: "Aspirin and nitro both depend on contraindications.",
      },
      tags: ["medical", "chest pain", "cardiac"],
      difficulty: "hard",
    }),
    makeScenario("stroke_tia", {
      prompt: "A person in the lobby may be having a stroke or TIA.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "fast_stroke_check", "check_airway_breathing"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["maintain_open_airway", "comfortable_position", "recovery_position"]),
        stage("monitor", ["monitor_breathing_changes", "monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "fast_stroke_check", "call_ems_911", "maintain_open_airway", "check_airway_breathing", "comfortable_position", "monitor_breathing_changes"],
      criticalActions: ["fast_stroke_check", "call_ems_911", "maintain_open_airway", "check_airway_breathing"],
      expectedActions: ["scene_safety", "comfortable_position", "monitor_breathing_changes", "monitor_condition"],
      contextualActions: [
        {
          action: "recovery_position",
          reason: "Recovery position fits if there are airway management problems.",
          reward: 3,
        },
      ],
      optionalGoodActions: ["get_backup", "monitor_vital_signs"],
      orderRules: [before("fast_stroke_check", "comfortable_position", "Assess FAST signs before settling into positioning.", 5)],
      hints: {
        assessment: "FAST is the source-card assessment.",
        treatment: "Airway and breathing still matter.",
      },
      tags: ["medical", "stroke", "TIA", "FAST"],
      difficulty: "medium",
    }),
    makeScenario("major_bleeding", {
      prompt: "In the change room, a victim has a cut leg with major bleeding.",
      stages: withReview([
        stage("assessment", ["scene_safety", "ppe_barriers", "check_responsiveness", "assess_major_bleeding"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", [
          "rest_body_part_reassure",
          "direct_pressure_with_gloves",
          "victim_applies_pressure_no_gloves",
          "sterile_dressing_bandage",
          "tourniquet_if_direct_pressure_fails",
          "tourniquet_before_pressure",
        ]),
        stage("monitor", ["treat_shock_monitor", "monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "ppe_barriers",
        "call_ems_911",
        "rest_body_part_reassure",
        "direct_pressure_with_gloves",
        "sterile_dressing_bandage",
        "tourniquet_if_direct_pressure_fails",
        "monitor_condition",
      ],
      criticalActions: ["call_ems_911", "direct_pressure_with_gloves", "sterile_dressing_bandage"],
      expectedActions: ["scene_safety", "ppe_barriers", "rest_body_part_reassure", "victim_applies_pressure_no_gloves", "tourniquet_if_direct_pressure_fails", "monitor_condition"],
      optionalGoodActions: ["get_backup", "assess_major_bleeding", "treat_shock_monitor"],
      weakActions: ["tourniquet_before_pressure"],
      orderRules: [
        early("direct_pressure_with_gloves", 5, "Direct pressure should happen immediately when you have gloves.", 10),
        before("direct_pressure_with_gloves", "tourniquet_if_direct_pressure_fails", "Use a tourniquet when direct pressure fails, not before pressure.", 10),
      ],
      hints: {
        assessment: "Gloves change who applies pressure first.",
        treatment: "Direct pressure comes before tourniquet.",
      },
      tags: ["bleeding", "major bleeding", "wound"],
      difficulty: "hard",
    }),
    makeScenario("wounds", {
      prompt: "A patron has a scraped/cut wound on the pool deck.",
      stages: withReview([
        stage("assessment", ["scene_safety", "ppe_barriers", "assess_injury", "assess_major_bleeding"]),
        stage("help", ["get_first_aid_kit", "get_backup", "call_ems_911"]),
        stage("treatment", ["flush_wound_clean_tap_water", "cover_sterile_dressing", "apply_antibiotic_ointment"]),
        stage("monitor", ["advise_medical_followup", "monitor_condition"]),
      ]),
      recommendedSequence: ["scene_safety", "ppe_barriers", "assess_injury", "flush_wound_clean_tap_water", "cover_sterile_dressing", "apply_antibiotic_ointment", "monitor_condition"],
      criticalActions: ["flush_wound_clean_tap_water", "cover_sterile_dressing"],
      expectedActions: ["scene_safety", "ppe_barriers", "assess_injury", "apply_antibiotic_ointment", "monitor_condition"],
      optionalGoodActions: ["get_first_aid_kit", "advise_medical_followup"],
      orderRules: [before("flush_wound_clean_tap_water", "cover_sterile_dressing", "Flush the wound before covering it.", 8)],
      hints: {
        treatment: "The source treatment is short: flush, cover, ointment if available.",
      },
      tags: ["wounds", "bleeding", "minor injury"],
      difficulty: "easy",
    }),
    makeScenario("concussion", {
      prompt: "A victim slips on the floor and hits their head.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "determine_history", "check_airway_breathing"]),
        stage("help", ["call_ems_911", "get_backup"]),
        stage("treatment", ["immobilize_spine_neck", "stop_activity_seek_medical_help", "return_to_activity"]),
        stage("monitor", ["monitor_condition", "monitor_vital_signs", "advise_medical_followup"]),
      ]),
      recommendedSequence: ["scene_safety", "check_responsiveness", "determine_history", "call_ems_911", "immobilize_spine_neck", "stop_activity_seek_medical_help", "monitor_condition"],
      criticalActions: ["stop_activity_seek_medical_help"],
      expectedActions: ["scene_safety", "check_responsiveness", "determine_history", "call_ems_911", "immobilize_spine_neck", "monitor_condition"],
      optionalGoodActions: ["get_backup", "advise_medical_followup"],
      dangerousActions: ["return_to_activity"],
      orderRules: [before("check_responsiveness", "stop_activity_seek_medical_help", "Assess the head injury before deciding activity/follow-up.", 4)],
      hints: {
        treatment: "Stop activity is the clear source-card action.",
        help: "EMS is tied to obvious trauma.",
      },
      tags: ["trauma", "concussion", "head injury"],
      difficulty: "medium",
    }),
    makeScenario("spinal_injury", {
      prompt: "A land spinal victim is breathing after a severe fall.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "determine_history"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["immobilize_spine_position_found", "move_only_if_no_choice", "ask_victim_remain_still", "move_unnecessarily"]),
        stage("monitor", ["stabilize_for_transport", "monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "check_airway_breathing", "call_ems_911", "immobilize_spine_position_found", "ask_victim_remain_still", "move_only_if_no_choice", "stabilize_for_transport"],
      criticalActions: ["call_ems_911", "immobilize_spine_position_found", "move_only_if_no_choice", "ask_victim_remain_still"],
      expectedActions: ["scene_safety", "check_airway_breathing", "stabilize_for_transport", "monitor_condition"],
      optionalGoodActions: ["get_backup", "determine_history"],
      dangerousActions: ["move_unnecessarily"],
      orderRules: [before("call_ems_911", "stabilize_for_transport", "Phone EMS before transport preparation.", 5)],
      hints: {
        treatment: "The move rule has only three exceptions: safety risk, airway, CPR.",
      },
      tags: ["trauma", "spinal", "immobilization"],
      difficulty: "hard",
    }),
    makeScenario("ear_injuries", {
      prompt: "A swimmer has a foreign object in the ear that may be visible and graspable.",
      stages: withReview([
        stage("assessment", ["scene_safety", "assess_injury", "check_responsiveness"]),
        stage("help", ["get_first_aid_kit", "get_backup", "call_ems_911"]),
        stage("treatment", ["remove_visible_graspable_object_only", "do_not_flush_ear_object", "flush_ear_object", "allow_drainage", "cover_sterile_dressing"]),
        stage("monitor", ["advise_medical_followup", "monitor_condition", "preserve_amputated_part"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "remove_visible_graspable_object_only", "do_not_flush_ear_object", "allow_drainage", "advise_medical_followup"],
      criticalActions: ["remove_visible_graspable_object_only", "do_not_flush_ear_object"],
      expectedActions: ["scene_safety", "assess_injury", "allow_drainage", "advise_medical_followup"],
      contextualActions: [
        {
          action: "preserve_amputated_part",
          reason: "If part of the ear is amputated, store it in a dry plastic bag, put in ice water, and call EMS.",
          reward: 3,
        },
      ],
      optionalGoodActions: ["get_first_aid_kit", "cover_sterile_dressing"],
      dangerousActions: ["flush_ear_object"],
      orderRules: [before("assess_injury", "remove_visible_graspable_object_only", "Assess whether it is visible and graspable before removal.", 7)],
      hints: {
        treatment: "Visible and graspable only. Do not flush the ear object.",
      },
      tags: ["trauma", "ear injury", "foreign object"],
      difficulty: "medium",
    }),
    makeScenario("dental_mouth_injuries", {
      prompt: "A patron has a knocked-out tooth after a mouth injury.",
      stages: withReview([
        stage("assessment", ["scene_safety", "look_mouth_obstructions", "check_airway_breathing", "assess_injury"]),
        stage("help", ["get_first_aid_kit", "get_backup", "call_ems_911"]),
        stage("treatment", ["store_tooth_correctly", "do_not_reinsert_tooth", "reinsert_tooth", "drain_blood_saliva_forward_recovery"]),
        stage("monitor", ["advise_medical_followup", "monitor_condition"]),
      ]),
      recommendedSequence: ["scene_safety", "look_mouth_obstructions", "store_tooth_correctly", "do_not_reinsert_tooth", "advise_medical_followup", "monitor_condition"],
      criticalActions: ["look_mouth_obstructions", "store_tooth_correctly", "do_not_reinsert_tooth"],
      expectedActions: ["scene_safety", "advise_medical_followup", "monitor_condition"],
      contextualActions: [
        {
          action: "drain_blood_saliva_forward_recovery",
          reason: "For cut tongue or airway drainage, tilt forward or use recovery position.",
          reward: 3,
        },
      ],
      optionalGoodActions: ["get_first_aid_kit", "assess_injury"],
      dangerousActions: ["reinsert_tooth"],
      orderRules: [before("look_mouth_obstructions", "store_tooth_correctly", "Check the mouth before focusing on the tooth.", 5)],
      hints: {
        treatment: "Hold tooth by the crown and do not reinsert it.",
      },
      tags: ["trauma", "dental", "mouth injury"],
      difficulty: "medium",
    }),
    makeScenario("nose_injuries", {
      prompt: "Use this as an instructor-review card: the source Nose Injuries section repeats ear-injury wording.",
      stages: withReview([
        stage("assessment", ["scene_safety", "assess_injury", "check_responsiveness"]),
        stage("help", ["get_first_aid_kit", "get_backup", "call_ems_911"]),
        stage("treatment", ["remove_visible_graspable_object_only", "do_not_flush_ear_object", "flush_ear_object", "allow_drainage", "cover_sterile_dressing"]),
        stage("monitor", ["advise_medical_followup", "monitor_condition"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "remove_visible_graspable_object_only", "do_not_flush_ear_object", "allow_drainage", "advise_medical_followup"],
      criticalActions: ["assess_injury", "remove_visible_graspable_object_only", "do_not_flush_ear_object"],
      expectedActions: ["scene_safety", "allow_drainage", "advise_medical_followup"],
      optionalGoodActions: ["get_first_aid_kit", "cover_sterile_dressing"],
      dangerousActions: ["flush_ear_object"],
      instructorReviewNotes: "Instructor review needed: source Nose Injuries text appears to be copied from Ear Injuries, including 'Foreign Object in Ear.'",
      orderRules: [before("assess_injury", "remove_visible_graspable_object_only", "Confirm visible/graspable before removing an object.", 7)],
      hints: {
        treatment: "This card is source-preserved but needs instructor cleanup.",
      },
      tags: ["trauma", "nose injury", "instructor-review-needed"],
      difficulty: "medium",
    }),
    makeScenario("open_chest_wound", {
      prompt: "A victim has a stab wound that leaves an open chest wound.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "check_major_bleeding_air"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", [
          "comfortable_position",
          "protect_support_injured_area",
          "non_occlusive_dressing",
          "leave_chest_wound_exposed_if_needed",
          "direct_pressure_only_massive_bleeding",
          "seal_chest_wound_occlusive",
          "do_not_give_food_liquids",
        ]),
        stage("monitor", ["monitor_breathing_changes", "privacy_support", "monitor_condition"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "check_airway_breathing",
        "call_ems_911",
        "comfortable_position",
        "protect_support_injured_area",
        "non_occlusive_dressing",
        "do_not_give_food_liquids",
        "monitor_breathing_changes",
      ],
      criticalActions: ["call_ems_911", "non_occlusive_dressing", "monitor_breathing_changes", "do_not_give_food_liquids"],
      expectedActions: ["scene_safety", "check_airway_breathing", "comfortable_position", "protect_support_injured_area", "privacy_support"],
      optionalGoodActions: ["get_backup", "leave_chest_wound_exposed_if_needed", "direct_pressure_only_massive_bleeding"],
      dangerousActions: ["seal_chest_wound_occlusive", "give_food_liquids"],
      orderRules: [beforeAny("call_ems_911", ["non_occlusive_dressing", "monitor_breathing_changes"], "Phone EMS early for open chest wound.", 8)],
      hints: {
        treatment: "The card says non-occlusive or leave exposed, not sealed.",
      },
      tags: ["trauma", "chest injury", "breathing"],
      difficulty: "hard",
    }),
    makeScenario("broken_ribs", {
      prompt: "A victim fell and landed on their ribs on a staircase.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "assess_injury"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["comfortable_position", "protect_support_injured_area", "do_not_wrap_ribs", "wrap_ribs", "do_not_give_food_liquids"]),
        stage("monitor", ["monitor_breathing_changes", "privacy_support", "monitor_condition"]),
      ]),
      recommendedSequence: ["scene_safety", "check_airway_breathing", "call_ems_911", "comfortable_position", "protect_support_injured_area", "do_not_wrap_ribs", "do_not_give_food_liquids", "monitor_breathing_changes"],
      criticalActions: ["call_ems_911", "do_not_wrap_ribs", "monitor_breathing_changes"],
      expectedActions: ["scene_safety", "check_airway_breathing", "comfortable_position", "protect_support_injured_area", "do_not_give_food_liquids"],
      optionalGoodActions: ["get_backup", "privacy_support"],
      dangerousActions: ["wrap_ribs", "give_food_liquids"],
      orderRules: [before("check_airway_breathing", "comfortable_position", "Check breathing before focusing on rib support.", 5)],
      hints: {
        treatment: "The trap is wrapping/strapping/taping ribs.",
      },
      tags: ["trauma", "broken ribs", "chest injury"],
      difficulty: "medium",
    }),
    makeScenario("flail_chest", {
      prompt: "A victim was hit in the ribs and may have a flail chest with pain and difficulty breathing.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "assess_injury"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["comfortable_position", "protect_support_injured_area", "support_chest_by_hand", "assisted_breathing_if_needed", "do_not_give_food_liquids", "wrap_ribs"]),
        stage("monitor", ["monitor_breathing_changes", "privacy_support", "monitor_condition"]),
      ]),
      recommendedSequence: ["scene_safety", "check_airway_breathing", "call_ems_911", "comfortable_position", "protect_support_injured_area", "support_chest_by_hand", "assisted_breathing_if_needed", "monitor_breathing_changes"],
      criticalActions: ["call_ems_911", "support_chest_by_hand", "monitor_breathing_changes"],
      expectedActions: ["scene_safety", "check_airway_breathing", "comfortable_position", "protect_support_injured_area", "do_not_give_food_liquids"],
      optionalGoodActions: ["assisted_breathing_if_needed", "privacy_support", "get_backup"],
      dangerousActions: ["wrap_ribs", "give_food_liquids"],
      orderRules: [before("check_airway_breathing", "assisted_breathing_if_needed", "Assess breathing before assisted breathing.", 8)],
      hints: {
        treatment: "For pain and difficulty breathing, expose/examine, support by hand, and assist breathing if necessary.",
      },
      tags: ["trauma", "flail chest", "breathing"],
      difficulty: "hard",
    }),
    makeScenario("internal_bleeding", {
      prompt: "A victim has had a severe fall with possible internal bleeding.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "check_airway_breathing", "determine_history"]),
        stage("help", ["call_ems_911", "get_backup"]),
        stage("treatment", ["comfortable_position", "protect_support_injured_area", "do_not_give_food_liquids", "give_food_liquids"]),
        stage("monitor", ["monitor_breathing_changes", "privacy_support", "treat_shock_monitor", "monitor_condition"]),
      ]),
      recommendedSequence: ["scene_safety", "determine_history", "call_ems_911", "comfortable_position", "protect_support_injured_area", "do_not_give_food_liquids", "monitor_breathing_changes", "treat_shock_monitor"],
      criticalActions: ["call_ems_911", "do_not_give_food_liquids", "monitor_breathing_changes"],
      expectedActions: ["scene_safety", "determine_history", "comfortable_position", "protect_support_injured_area", "privacy_support", "monitor_condition"],
      optionalGoodActions: ["get_backup", "treat_shock_monitor"],
      dangerousActions: ["give_food_liquids"],
      orderRules: [beforeAny("call_ems_911", ["comfortable_position", "monitor_condition"], "Phone EMS early for possible internal bleeding.", 8)],
      hints: {
        treatment: "There is no visible bleeding to pack; support, no food/liquids, monitor breathing.",
      },
      tags: ["trauma", "internal bleeding", "shock"],
      difficulty: "medium",
    }),
    makeScenario("protruding_organs", {
      prompt: "A victim has a slice to the abdomen with organs protruding.",
      stages: withReview([
        stage("assessment", ["scene_safety", "ppe_barriers", "check_responsiveness", "check_airway_breathing"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", [
          "comfortable_position",
          "protect_support_injured_area",
          "cover_moist_sterile_dressing",
          "protect_protrusion",
          "do_not_put_organs_back",
          "put_organs_back",
          "do_not_give_food_liquids",
        ]),
        stage("monitor", ["monitor_breathing_changes", "privacy_support", "monitor_condition"]),
      ]),
      recommendedSequence: [
        "scene_safety",
        "ppe_barriers",
        "call_ems_911",
        "comfortable_position",
        "cover_moist_sterile_dressing",
        "protect_protrusion",
        "do_not_put_organs_back",
        "do_not_give_food_liquids",
        "monitor_breathing_changes",
      ],
      criticalActions: ["call_ems_911", "cover_moist_sterile_dressing", "do_not_put_organs_back", "do_not_give_food_liquids"],
      expectedActions: ["scene_safety", "ppe_barriers", "comfortable_position", "protect_support_injured_area", "protect_protrusion", "monitor_breathing_changes"],
      optionalGoodActions: ["get_backup", "privacy_support"],
      dangerousActions: ["put_organs_back", "give_food_liquids"],
      orderRules: [beforeAny("call_ems_911", ["cover_moist_sterile_dressing", "protect_protrusion"], "Phone EMS early for protruding organs.", 8)],
      hints: {
        treatment: "Keep organs moist/protected and do not put them back.",
      },
      tags: ["trauma", "abdominal injury", "protruding organs"],
      difficulty: "hard",
    }),
    makeScenario("sprains_strains", {
      prompt: "A victim slips and has a sprain or strain.",
      stages: withReview([
        stage("assessment", ["scene_safety", "assess_injury", "check_responsiveness"]),
        stage("help", ["get_first_aid_kit", "get_backup", "call_ems_911"]),
        stage("treatment", ["rest_injured_part", "immobilize_comfort_position", "ice_with_cloth_barrier", "elevate_if_no_pain"]),
        stage("monitor", ["advise_medical_followup", "monitor_condition"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "rest_injured_part", "immobilize_comfort_position", "ice_with_cloth_barrier", "elevate_if_no_pain", "advise_medical_followup"],
      criticalActions: ["rest_injured_part", "immobilize_comfort_position", "ice_with_cloth_barrier"],
      expectedActions: ["scene_safety", "assess_injury", "elevate_if_no_pain", "advise_medical_followup"],
      optionalGoodActions: ["get_first_aid_kit", "monitor_condition"],
      orderRules: [before("immobilize_comfort_position", "elevate_if_no_pain", "Immobilize before considering elevation.", 5)],
      hints: {
        treatment: "Ice is the most important component on this card, with a cloth barrier.",
      },
      tags: ["musculoskeletal", "sprain", "strain"],
      difficulty: "easy",
    }),
    makeScenario("dislocation", {
      prompt: "A patron has a shoulder dislocation.",
      stages: withReview([
        stage("assessment", ["scene_safety", "assess_injury", "check_responsiveness", "assess_sensation_circulation_above_below"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["rest_injured_part", "immobilize_comfort_position", "ice_with_cloth_barrier", "support_injured_part", "do_not_realign", "realign_fracture_dislocation"]),
        stage("monitor", ["monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "call_ems_911", "rest_injured_part", "immobilize_comfort_position", "ice_with_cloth_barrier", "support_injured_part", "do_not_realign"],
      criticalActions: ["call_ems_911", "immobilize_comfort_position", "do_not_realign"],
      expectedActions: ["scene_safety", "assess_injury", "rest_injured_part", "ice_with_cloth_barrier", "support_injured_part"],
      optionalGoodActions: ["get_backup", "monitor_condition", "assess_sensation_circulation_above_below"],
      dangerousActions: ["realign_fracture_dislocation"],
      orderRules: [before("assess_injury", "immobilize_comfort_position", "Assess before immobilizing.", 4)],
      hints: {
        treatment: "Do not put the bones back.",
      },
      tags: ["musculoskeletal", "dislocation"],
      difficulty: "medium",
    }),
    makeScenario("closed_fracture", {
      prompt: "A victim has a closed wrist fracture.",
      stages: withReview([
        stage("assessment", ["scene_safety", "assess_injury", "check_responsiveness", "assess_sensation_circulation_above_below"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["rest_injured_part", "immobilize_comfort_position", "ice_with_cloth_barrier", "do_not_elevate_fracture", "do_not_realign", "elevate_fracture", "realign_fracture_dislocation"]),
        stage("monitor", ["monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "call_ems_911", "rest_injured_part", "immobilize_comfort_position", "ice_with_cloth_barrier", "do_not_elevate_fracture", "do_not_realign"],
      criticalActions: ["call_ems_911", "immobilize_comfort_position", "do_not_elevate_fracture", "do_not_realign"],
      expectedActions: ["scene_safety", "assess_injury", "rest_injured_part", "ice_with_cloth_barrier", "monitor_condition"],
      optionalGoodActions: ["get_backup", "assess_sensation_circulation_above_below"],
      dangerousActions: ["elevate_fracture", "realign_fracture_dislocation"],
      orderRules: [before("assess_injury", "immobilize_comfort_position", "Assess the fracture before immobilizing it.", 5)],
      hints: {
        treatment: "Closed fracture has two no-rules: do not elevate and do not realign.",
      },
      tags: ["musculoskeletal", "fracture", "closed fracture"],
      difficulty: "medium",
    }),
    makeScenario("open_fracture", {
      prompt: "A victim has an open humerus fracture with exposed bone.",
      stages: withReview([
        stage("assessment", ["scene_safety", "ppe_barriers", "assess_injury", "assess_sensation_circulation_above_below"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["do_not_move_open_fracture", "rest_injured_part", "immobilize_spine_position_found", "do_not_realign", "clean_bandage_exposed_bone", "realign_fracture_dislocation"]),
        stage("monitor", ["monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "ppe_barriers", "call_ems_911", "do_not_move_open_fracture", "rest_injured_part", "immobilize_spine_position_found", "clean_bandage_exposed_bone", "assess_sensation_circulation_above_below"],
      criticalActions: ["call_ems_911", "do_not_move_open_fracture", "immobilize_spine_position_found", "do_not_realign", "clean_bandage_exposed_bone"],
      expectedActions: ["scene_safety", "ppe_barriers", "rest_injured_part", "assess_sensation_circulation_above_below", "monitor_condition"],
      optionalGoodActions: ["get_backup", "get_first_aid_kit"],
      dangerousActions: ["realign_fracture_dislocation"],
      orderRules: [before("call_ems_911", "clean_bandage_exposed_bone", "Phone EMS early for an open fracture.", 8)],
      hints: {
        treatment: "Do not move unless absolutely essential. Do not realign.",
      },
      tags: ["musculoskeletal", "fracture", "open fracture"],
      difficulty: "hard",
    }),
    makeScenario("pelvic_hip_fracture", {
      prompt: "A victim has a severe fall onto their hip with possible pelvic/hip fracture.",
      stages: withReview([
        stage("assessment", ["scene_safety", "check_responsiveness", "assess_injury", "check_distal_circulation_sensation"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["immobilize_spine_position_found", "hold_hips_support", "do_not_move_lift_legs", "spineboard_water_removal"]),
        stage("monitor", ["monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "call_ems_911", "immobilize_spine_position_found", "hold_hips_support", "do_not_move_lift_legs", "check_distal_circulation_sensation"],
      criticalActions: ["call_ems_911", "immobilize_spine_position_found", "hold_hips_support", "do_not_move_lift_legs"],
      expectedActions: ["scene_safety", "assess_injury", "check_distal_circulation_sensation", "monitor_condition"],
      optionalGoodActions: ["get_backup"],
      contextualActions: [
        {
          action: "spineboard_water_removal",
          reason: "If the victim is in water, the card says immobilize on a spineboard for removal.",
          reward: 3,
        },
      ],
      orderRules: [beforeAny("call_ems_911", ["hold_hips_support", "monitor_condition"], "Phone EMS early for pelvic/hip fracture.", 8)],
      hints: {
        treatment: "Hold/support hips and try not to move or lift the legs.",
      },
      tags: ["musculoskeletal", "pelvic fracture", "hip fracture"],
      difficulty: "hard",
    }),
    makeScenario("thermal_burns", {
      prompt: "A patron has a painful thermal burn with blistering.",
      stages: withReview([
        stage("assessment", ["scene_safety", "assess_injury", "check_responsiveness"]),
        stage("help", ["get_first_aid_kit", "call_ems_911", "get_backup"]),
        stage("treatment", ["flush_burn_cool_clean_water", "repeat_flush_until_heat_subsides", "cover_burn_sterile_dry_dressing", "do_not_break_blisters", "break_blisters"]),
        stage("monitor", ["advise_medical_followup", "monitor_condition", "separate_fingers_toes_dressings"]),
      ]),
      recommendedSequence: ["scene_safety", "assess_injury", "flush_burn_cool_clean_water", "repeat_flush_until_heat_subsides", "cover_burn_sterile_dry_dressing", "do_not_break_blisters", "advise_medical_followup"],
      criticalActions: ["flush_burn_cool_clean_water", "cover_burn_sterile_dry_dressing", "do_not_break_blisters"],
      expectedActions: ["scene_safety", "assess_injury", "repeat_flush_until_heat_subsides", "advise_medical_followup", "monitor_condition"],
      contextualActions: [
        {
          action: "call_ems_911",
          reason: "Phone EMS if the burn is large, on the face/neck, small child/infant, or third degree.",
          reward: 3,
        },
        {
          action: "separate_fingers_toes_dressings",
          reason: "For third degree burns to hands/feet, separate fingers or toes with dressings.",
          reward: 2,
        },
      ],
      optionalGoodActions: ["get_first_aid_kit", "get_backup"],
      dangerousActions: ["break_blisters"],
      orderRules: [before("flush_burn_cool_clean_water", "cover_burn_sterile_dry_dressing", "Flush/cool the burn before covering it.", 10)],
      hints: {
        treatment: "Cool water first. Cover with sterile dry dressing. Do not break blisters.",
      },
      tags: ["burns", "thermal burn"],
      difficulty: "medium",
    }),
    makeScenario("chemical_burns", {
      prompt: "A chemical has spilled onto a patron's skin.",
      stages: withReview([
        stage("assessment", ["scene_safety", "avoid_touch_chemical_wear_gloves", "assess_injury", "ppe_barriers"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["remove_contaminated_clothing", "brush_dry_chemicals_before_flushing", "flush_chemical_15_min", "flush_before_brushing_dry_chemical"]),
        stage("monitor", ["monitor_condition", "advise_medical_followup"]),
      ]),
      recommendedSequence: ["scene_safety", "avoid_touch_chemical_wear_gloves", "remove_contaminated_clothing", "brush_dry_chemicals_before_flushing", "flush_chemical_15_min", "call_ems_911", "monitor_condition"],
      criticalActions: ["avoid_touch_chemical_wear_gloves", "remove_contaminated_clothing", "brush_dry_chemicals_before_flushing", "flush_chemical_15_min"],
      expectedActions: ["scene_safety", "assess_injury", "call_ems_911", "monitor_condition"],
      optionalGoodActions: ["get_backup", "get_first_aid_kit", "ppe_barriers"],
      weakActions: ["flush_before_brushing_dry_chemical"],
      orderRules: [
        before("brush_dry_chemicals_before_flushing", "flush_chemical_15_min", "Brush off dry chemicals before flushing with water.", 10),
        before("remove_contaminated_clothing", "flush_chemical_15_min", "Remove contaminated clothing before or during flushing.", 5),
      ],
      hints: {
        treatment: "Dry chemicals are brushed off before flushing.",
      },
      tags: ["burns", "chemical burn"],
      difficulty: "hard",
    }),
    makeScenario("electrical_burns", {
      prompt: "A victim has an electrical burn from contact with current.",
      stages: withReview([
        stage("assessment", ["scene_safety", "turn_off_electrical_current", "stay_away_high_voltage", "stand_dry_area", "check_responsiveness"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["look_entry_exit_wounds", "cover_entry_exit_dry_dressing", "touch_before_power_off"]),
        stage("monitor", ["monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "turn_off_electrical_current", "stay_away_high_voltage", "stand_dry_area", "call_ems_911", "look_entry_exit_wounds", "cover_entry_exit_dry_dressing", "monitor_condition"],
      criticalActions: ["turn_off_electrical_current", "stay_away_high_voltage", "call_ems_911", "look_entry_exit_wounds"],
      expectedActions: ["scene_safety", "stand_dry_area", "cover_entry_exit_dry_dressing", "monitor_condition"],
      optionalGoodActions: ["get_backup", "get_first_aid_kit", "monitor_vital_signs"],
      dangerousActions: ["touch_before_power_off"],
      orderRules: [
        before("turn_off_electrical_current", "look_entry_exit_wounds", "Turn off current before touching or treating the victim.", 10),
        before("call_ems_911", "cover_entry_exit_dry_dressing", "Phone EMS before settling into dressing care.", 5),
      ],
      hints: {
        assessment: "Current off first. Stay away from high voltage.",
      },
      tags: ["burns", "electrical burn", "electrical safety"],
      difficulty: "hard",
    }),
    makeScenario("radiation_burns", {
      prompt: "Use this as an instructor-review burn card. The Radiation Burns source section repeats the electrical-burn treatment.",
      stages: withReview([
        stage("assessment", ["scene_safety", "turn_off_electrical_current", "stay_away_high_voltage", "stand_dry_area", "check_responsiveness"]),
        stage("help", ["call_ems_911", "get_backup", "get_first_aid_kit"]),
        stage("treatment", ["look_entry_exit_wounds", "cover_entry_exit_dry_dressing", "touch_before_power_off"]),
        stage("monitor", ["monitor_condition", "monitor_vital_signs"]),
      ]),
      recommendedSequence: ["scene_safety", "turn_off_electrical_current", "stay_away_high_voltage", "stand_dry_area", "call_ems_911", "look_entry_exit_wounds", "cover_entry_exit_dry_dressing", "monitor_condition"],
      criticalActions: ["turn_off_electrical_current", "stay_away_high_voltage", "call_ems_911", "look_entry_exit_wounds"],
      expectedActions: ["scene_safety", "stand_dry_area", "cover_entry_exit_dry_dressing", "monitor_condition"],
      optionalGoodActions: ["get_backup", "get_first_aid_kit"],
      dangerousActions: ["touch_before_power_off"],
      instructorReviewNotes: "Instructor review needed: Radiation Burns repeats Electrical Burns source treatment, so this card is preserved but should be corrected by the instructor/source deck.",
      orderRules: [before("turn_off_electrical_current", "look_entry_exit_wounds", "Source wording repeats electrical current steps; do not touch before current is off.", 10)],
      hints: {
        assessment: "This is source-preserved but needs instructor review.",
      },
      tags: ["burns", "radiation burn", "instructor-review-needed"],
      difficulty: "medium",
    }),
  ];

  for (const scenario of scenarios) {
    scenario.suggestedOrderText = labelsFor(scenario.recommendedSequence);
  }

  function makeQuestion(cardKey, def) {
    const card = sourceCards[cardKey];
    const prompt = `${def.miniCase} ${def.question}`;
    return {
      id: def.id || `q_${cardKey}`,
      topic: card.title,
      sourceCardTitle: card.title,
      miniCase: def.miniCase,
      question: def.question,
      prompt,
      choices: def.choices,
      correctAnswerId: def.choices.find((choice) => choice.correct)?.id || "",
      relatedTags: def.topicTags,
      topicTags: def.topicTags,
    };
  }

  const questions = [
    makeQuestion("diabetes", {
      miniCase: "A conscious lane swimmer is shaky, weak, and confused.",
      question: "What should you NOT do?",
      topicTags: ["diabetes", "blood sugar", "medication"],
      choices: [
        { id: "no_insulin", text: "Administer insulin yourself.", correct: true, explanation: "Correct because the diabetes card says never administer insulin." },
        { id: "test", text: "Help them test blood sugar if a kit is available.", explanation: "That is a card treatment step for a conscious victim." },
        { id: "sugar", text: "Help them self-administer sugar or glucose tablets.", explanation: "That fits the card if the victim is conscious and participating." },
        { id: "followup", text: "Advise medical attention and phone EMS if the condition worsens.", explanation: "That is the card's follow-up instruction." },
      ],
    }),
    makeQuestion("seizures", {
      miniCase: "A victim is actively seizing in a change room stall.",
      question: "Which action should you avoid?",
      topicTags: ["seizure", "safety"],
      choices: [
        { id: "mouth", text: "Place something in the victim's mouth.", correct: true, explanation: "Correct because the seizure card says do NOT place anything in the victim's mouth." },
        { id: "clear", text: "Clear objects from the surrounding area.", explanation: "That prevents the victim from striking objects and getting injured." },
        { id: "record", text: "Record the number and duration of seizures.", explanation: "That is a source-card monitoring step." },
        { id: "ems", text: "Phone EMS.", explanation: "The seizure card lists phone EMS as treatment." },
      ],
    }),
    makeQuestion("anaphylaxis", {
      miniCase: "A patron was stung by a bee and is showing anaphylaxis signs.",
      question: "What should you ask first after getting EMS moving?",
      topicTags: ["anaphylaxis", "auto-injector", "breathing"],
      choices: [
        { id: "carry", text: "Ask whether they carry an auto-injector.", correct: true, explanation: "Correct. The card says to ask if they carry an auto-injector, then help them administer their medication." },
        { id: "nitro", text: "Ask whether they have nitroglycerine.", explanation: "Nitroglycerine belongs to the chest-pain card, not anaphylaxis." },
        { id: "sling", text: "Ask whether family can transport them with a sling.", explanation: "That is from the slings card and misses the allergic breathing emergency." },
        { id: "tooth", text: "Ask for milk to store a tooth.", explanation: "That distractor belongs to dental/mouth injuries." },
      ],
    }),
    makeQuestion("unconscious_breathing", {
      miniCase: "A victim removed from water is unconscious but breathing.",
      question: "What position does the card point to after assessing breathing?",
      topicTags: ["unconscious", "breathing", "recovery position"],
      choices: [
        { id: "recovery", text: "Recovery position to maintain airway and allow drainage.", correct: true, explanation: "Correct. The card says recovery position for open airway and drainage." },
        { id: "flat", text: "Force them flat and give fluids.", explanation: "Food/liquids are not safe for an unconscious victim, and this misses airway drainage." },
        { id: "sling", text: "Put the arm in a sling for transport.", explanation: "Slings are for limb support/transport decisions, not unconscious breathing." },
        { id: "thrusts", text: "Start abdominal thrusts immediately.", explanation: "Choking thrusts fit severe airway obstruction, not this breathing unconscious card." },
      ],
    }),
    makeQuestion("choking", {
      miniCase: "A patron is choking but still coughing.",
      question: "What should you do physically?",
      topicTags: ["choking", "airway"],
      choices: [
        { id: "no_interfere", text: "Do not interfere physically.", correct: true, explanation: "Correct. The choking card says if the victim is coughing, do not interfere physically." },
        { id: "abdominal", text: "Start abdominal thrusts right away.", explanation: "That fits not-coughing severe obstruction, not a victim who is still coughing." },
        { id: "mouth", text: "Put fingers in the mouth to clear it.", explanation: "That is not the card's coughing response and adds risk." },
        { id: "oxygen", text: "Administer oxygen before deciding if obstruction is severe.", explanation: "Oxygen is a drowning-card/trained-protocol item, not the first coughing-choking response." },
      ],
    }),
    makeQuestion("asthma", {
      miniCase: "An aquafit participant is wheezing with asthma symptoms.",
      question: "Which set best matches the card?",
      topicTags: ["asthma", "breathing", "medication"],
      choices: [
        { id: "position", text: "Comfortable position leaning forward, pursed-lip breathing, help with medication.", correct: true, explanation: "Correct. Those are direct asthma-card treatment steps." },
        { id: "flat", text: "Lie flat, wrap ribs, and avoid medication.", explanation: "Those actions come from other contexts and conflict with asthma comfort/medication help." },
        { id: "sugar", text: "Give glucose tablets and never administer insulin.", explanation: "That is diabetes, not asthma." },
        { id: "tooth", text: "Store a tooth in milk and advise dental follow-up.", explanation: "That belongs to dental/mouth injuries." },
      ],
    }),
    makeQuestion("hyperventilation", {
      miniCase: "After being held underwater, a victim is breathing much faster than necessary.",
      question: "What does the card say to do?",
      topicTags: ["hyperventilation", "breathing"],
      choices: [
        { id: "calm_pursed", text: "Reassure/calm them and coach pursed-lip breathing.", correct: true, explanation: "Correct. The hyperventilation card is short and lists those steps." },
        { id: "auto", text: "Ask for an auto-injector and give a second dose after 5 minutes.", explanation: "That is anaphylaxis, not hyperventilation." },
        { id: "tourniquet", text: "Use a tourniquet if direct pressure fails.", explanation: "That is major bleeding care." },
        { id: "brush", text: "Brush off dry chemical before flushing.", explanation: "That is chemical burn care." },
      ],
    }),
    makeQuestion("drowning", {
      miniCase: "A victim may have inhaled water, but they are now conscious.",
      question: "Which delayed symptoms matter for medical follow-up?",
      topicTags: ["drowning", "water inhalation", "breathing"],
      choices: [
        { id: "symptoms", text: "Coughing, wheezing, difficulty breathing, nausea/vomiting, frothy sputum, altered LOC, behavior change, or shock.", correct: true, explanation: "Correct. That list tracks the source card's delayed water-inhalation symptoms." },
        { id: "tooth", text: "Only a missing tooth stored in milk.", explanation: "That is dental injury content and ignores water-inhalation symptoms." },
        { id: "rash", text: "Only hives and bee-sting swelling.", explanation: "Those are anaphylaxis clues, not the drowning delayed-symptom list." },
        { id: "ankle", text: "Only swelling at an ankle every hour.", explanation: "That distractor belongs to sprain/fracture care." },
      ],
    }),
    makeQuestion("slings", {
      miniCase: "A victim has a lower-arm injury and family may transport them.",
      question: "When does the sling make sense?",
      topicTags: ["slings", "transport", "musculoskeletal"],
      choices: [
        { id: "family", text: "If someone other than EMS, such as family, will transport them.", correct: true, explanation: "Correct. The slings card says a sling is a good idea for non-EMS transport." },
        { id: "ems", text: "Always apply one before EMS arrives to immobilize everything.", explanation: "The card says if EMS are transporting, let EMS immobilize injuries." },
        { id: "chest", text: "Use it to seal an open chest wound.", explanation: "Open-chest wound care uses non-occlusive dressing or exposed, not a sling." },
        { id: "chemical", text: "Use it before brushing dry chemicals.", explanation: "That belongs to chemical burns and misses the transport distinction." },
      ],
    }),
    makeQuestion("chest_pain", {
      miniCase: "A hot tub patron has non-traumatic chest pain.",
      question: "Which medication help is conditional on no contraindications?",
      topicTags: ["chest pain", "aspirin", "nitroglycerine"],
      choices: [
        { id: "aspirin_nitro", text: "Aspirin and nitroglycerine assistance.", correct: true, explanation: "Correct. The card lists contraindications for aspirin and nitroglycerine assistance." },
        { id: "insulin", text: "Insulin administered by the rescuer.", explanation: "The diabetes card says never administer insulin." },
        { id: "epi", text: "Auto-injector administered for the victim.", explanation: "The anaphylaxis card says help the victim administer; never administer it for them." },
        { id: "oxygen", text: "Oxygen for every chest-pain victim regardless of protocol.", explanation: "Oxygen is not listed on the chest-pain card." },
      ],
    }),
    makeQuestion("stroke_tia", {
      miniCase: "A lobby patron has possible stroke signs.",
      question: "What assessment belongs to this card?",
      topicTags: ["stroke", "TIA", "FAST"],
      choices: [
        { id: "fast", text: "Assess for signs of a stroke using FAST.", correct: true, explanation: "Correct. FAST is the source-card stroke assessment." },
        { id: "glucose", text: "Help test blood sugar first as the main card step.", explanation: "That is diabetes care, not the stroke/TIA card's named assessment." },
        { id: "duration", text: "Record number and duration of seizures.", explanation: "That belongs to seizures." },
        { id: "entry_exit", text: "Look for electrical entry and exit wounds.", explanation: "That belongs to electrical burns." },
      ],
    }),
    makeQuestion("major_bleeding", {
      miniCase: "You are wearing gloves and see major bleeding from a leg cut.",
      question: "What does the card say to do immediately?",
      topicTags: ["major bleeding", "direct pressure", "tourniquet"],
      choices: [
        { id: "pressure", text: "Apply direct pressure to the wound immediately using your hand.", correct: true, explanation: "Correct. That is the gloved-rescuer step on the Major Bleeding card." },
        { id: "victim_pressure", text: "Ask the victim to apply pressure even though you have gloves.", explanation: "That is the no-gloves branch; with gloves, you apply direct pressure immediately." },
        { id: "tourniquet_first", text: "Use a tourniquet before trying direct pressure.", explanation: "The card says tourniquet when direct pressure fails." },
        { id: "ointment", text: "Apply antibiotic ointment before pressure.", explanation: "Ointment belongs to minor wounds, not immediate major bleeding control." },
      ],
    }),
    makeQuestion("wounds", {
      miniCase: "A patron has a small scraped/cut wound.",
      question: "Which treatment sequence matches the card?",
      topicTags: ["wounds", "dressing", "ointment"],
      choices: [
        { id: "flush_cover", text: "Flush with clean tap water, cover with sterile dressing, apply antibiotic ointment if available.", correct: true, explanation: "Correct. Those are the wound-card treatment items." },
        { id: "tourniquet", text: "Use a tourniquet before flushing.", explanation: "Tourniquet belongs to major bleeding when direct pressure fails." },
        { id: "moist_organs", text: "Cover protruding organs with sterile moist dressing.", explanation: "That belongs to protruding organs, not a simple wound." },
        { id: "dry_entry", text: "Look for electrical entry/exit wounds and cover with dry dressing.", explanation: "That is electrical burn care." },
      ],
    }),
    makeQuestion("concussion", {
      miniCase: "A victim slipped, hit their head, and wants to keep participating.",
      question: "What should you do?",
      topicTags: ["concussion", "head injury"],
      choices: [
        { id: "stop", text: "Have them stop activity and seek medical help.", correct: true, explanation: "Correct. The concussion card says stop activity and seek medical help." },
        { id: "return", text: "Let them return to activity if they feel okay.", explanation: "That conflicts with the concussion card." },
        { id: "sugar", text: "Give glucose tablets as the main treatment.", explanation: "That is diabetes care and misses the head injury." },
        { id: "wrap", text: "Wrap the ribs tightly.", explanation: "That is a chest-injury distractor and also wrong for rib fractures." },
      ],
    }),
    makeQuestion("spinal_injury", {
      miniCase: "A land spinal victim is breathing.",
      question: "When should you move them?",
      topicTags: ["spinal injury", "immobilization", "movement"],
      choices: [
        { id: "only_no_choice", text: "Only if there is no other choice: safety risk, open airway, or perform CPR.", correct: true, explanation: "Correct. Those are the source-card movement exceptions." },
        { id: "comfort", text: "Whenever a more comfortable position is available.", explanation: "The card says immobilize in position found and do not move unless there is no other choice." },
        { id: "sling", text: "Move them to fit a sling before EMS transport.", explanation: "Slings are a separate transport card and do not override spinal precautions." },
        { id: "drainage", text: "Always move them for drainage even if breathing is fine.", explanation: "Drainage may matter for airway, but the spinal card limits movement to no-other-choice reasons." },
      ],
    }),
    makeQuestion("ear_injuries", {
      miniCase: "A victim has a foreign object in the ear.",
      question: "When should you remove it?",
      topicTags: ["ear injury", "foreign object"],
      choices: [
        { id: "visible", text: "Only if it can be easily seen and grasped.", correct: true, explanation: "Correct. The card says remove gently only if easily seen and grasped." },
        { id: "flush", text: "Flush it out with water.", explanation: "The card says avoid flushing an object from an ear." },
        { id: "reinsert", text: "Reinsert it after cleaning.", explanation: "That distractor is not part of the ear card and resembles a wrong dental choice." },
        { id: "tourniquet", text: "Use a tourniquet if it remains stuck.", explanation: "That belongs to major bleeding, not an ear foreign object." },
      ],
    }),
    makeQuestion("dental_mouth_injuries", {
      miniCase: "A patron has a knocked-out tooth.",
      question: "What should you NOT do?",
      topicTags: ["dental", "mouth injury", "tooth"],
      choices: [
        { id: "reinsert", text: "Reinsert the tooth.", correct: true, explanation: "Correct. The dental/mouth card says do not reinsert the tooth." },
        { id: "crown", text: "Hold the tooth from the crown.", explanation: "That is part of the card's tooth-saving instructions." },
        { id: "solution", text: "Place it in balanced salt solution or listed alternatives.", explanation: "That is exactly the storage guidance from the card." },
        { id: "obstruction", text: "Look for obstructions in the mouth.", explanation: "That is a dental/mouth card step." },
      ],
    }),
    makeQuestion("nose_injuries", {
      miniCase: "You are reviewing the Nose Injuries card in the source document.",
      question: "What should you flag?",
      topicTags: ["nose injury", "instructor-review-needed"],
      choices: [
        { id: "copied", text: "It appears to repeat Ear Injuries wording and needs instructor review.", correct: true, explanation: "Correct. The source Nose Injuries section includes 'Foreign Object in Ear' and ear-specific wording." },
        { id: "complete", text: "It is a complete nosebleed algorithm.", explanation: "The uploaded source does not contain a nosebleed algorithm in this section." },
        { id: "delete", text: "Delete the card from the app.", explanation: "The instruction is to base content on the cards; preserving with review notes is safer than deleting." },
        { id: "invent", text: "Invent new nose treatment rules to fill the gap.", explanation: "The request explicitly says not to invent extra treatment rules unless clearly marked for review." },
      ],
    }),
    makeQuestion("open_chest_wound", {
      miniCase: "A stab wound leaves an open chest wound.",
      question: "What dressing does the card allow?",
      topicTags: ["open chest wound", "breathing", "dressing"],
      choices: [
        { id: "non_occ", text: "A non-occlusive dressing, or leave exposed; direct pressure only if massive bleeding.", correct: true, explanation: "Correct. That follows the source card closely." },
        { id: "seal", text: "Seal it tightly with an occlusive dressing.", explanation: "The card says only non-occlusive dressing or leave exposed." },
        { id: "wrap", text: "Wrap, strap, or tape the ribs.", explanation: "That is explicitly rejected by the broken-ribs card and does not fit open chest wound." },
        { id: "organs", text: "Push protruding organs back in.", explanation: "That is a dangerous protruding-organs distractor." },
      ],
    }),
    makeQuestion("broken_ribs", {
      miniCase: "A victim fell onto their ribs.",
      question: "Should the ribs be wrapped, strapped, or taped?",
      topicTags: ["broken ribs", "chest injury"],
      choices: [
        { id: "no_wrap", text: "No. Rib fractures are not wrapped, strapped, or taped.", correct: true, explanation: "Correct. That sentence is directly from the card." },
        { id: "yes_wrap", text: "Yes, tightly wrap them to stop movement.", explanation: "The card says not to wrap, strap, or tape rib fractures." },
        { id: "tooth", text: "Only if a tooth was knocked out.", explanation: "Dental injuries do not change rib fracture care." },
        { id: "dry_chemical", text: "Only after brushing off dry chemicals.", explanation: "That is chemical burn sequencing, not rib care." },
      ],
    }),
    makeQuestion("flail_chest", {
      miniCase: "A victim has flail chest signs with pain and difficulty breathing.",
      question: "What extra support does the card mention?",
      topicTags: ["flail chest", "breathing", "chest injury"],
      choices: [
        { id: "hand", text: "Expose/examine, support the injured area with your hand, and assist breathing if necessary.", correct: true, explanation: "Correct. That is the flail chest card's extra line." },
        { id: "sling", text: "Use a sling because family will transport.", explanation: "That is the slings transport card." },
        { id: "insulin", text: "Never administer insulin.", explanation: "True for diabetes, but not the flail chest extra support step." },
        { id: "blisters", text: "Do not break blisters.", explanation: "That belongs to thermal burns." },
      ],
    }),
    makeQuestion("internal_bleeding", {
      miniCase: "A victim has possible internal bleeding after a severe fall.",
      question: "Which action is specifically ruled out by the card?",
      topicTags: ["internal bleeding", "shock", "trauma"],
      choices: [
        { id: "food", text: "Giving food or liquids.", correct: true, explanation: "Correct. The internal bleeding card says do not give any food or liquids." },
        { id: "ems", text: "Phoning EMS.", explanation: "Phone EMS is a source-card step." },
        { id: "position", text: "Helping the victim into a comfortable position.", explanation: "That is a source-card step." },
        { id: "monitor", text: "Monitoring for breathing changes.", explanation: "That is a source-card step." },
      ],
    }),
    makeQuestion("protruding_organs", {
      miniCase: "A victim has organs protruding through an abdominal wound.",
      question: "What should you NOT do?",
      topicTags: ["protruding organs", "abdominal injury"],
      choices: [
        { id: "back", text: "Try to put the organs back in the abdomen.", correct: true, explanation: "Correct. The card directly says not to put the organs back." },
        { id: "moist", text: "Cover with a sterile dressing moistened with very clean water.", explanation: "That is the card's drying-prevention step." },
        { id: "protect", text: "Protect from further damage.", explanation: "That is a card treatment step." },
        { id: "ems", text: "Phone EMS.", explanation: "Phone EMS is required by the card." },
      ],
    }),
    makeQuestion("sprains_strains", {
      miniCase: "A victim has a sprain or strain after slipping.",
      question: "What is the most important component of treatment according to the card?",
      topicTags: ["sprain", "strain", "ice"],
      choices: [
        { id: "ice", text: "Ice 10-15 minutes every hour with a cloth barrier.", correct: true, explanation: "Correct. The card says icing is the most important component and warns against direct skin contact." },
        { id: "realign", text: "Attempt realignment.", explanation: "Realignment is a fracture/dislocation danger, not sprain/strain care." },
        { id: "insulin", text: "Administer insulin.", explanation: "That is specifically prohibited on the diabetes card." },
        { id: "occlusive", text: "Seal with an occlusive dressing.", explanation: "That distractor relates to open chest wound and is not the sprain/strain treatment." },
      ],
    }),
    makeQuestion("dislocation", {
      miniCase: "A victim has a shoulder dislocation.",
      question: "What should you avoid?",
      topicTags: ["dislocation", "musculoskeletal", "realignment"],
      choices: [
        { id: "put_back", text: "Trying to put the bones back.", correct: true, explanation: "Correct. The dislocation card says this can cause more damage." },
        { id: "ems", text: "Phoning EMS.", explanation: "Phone EMS is on the dislocation card." },
        { id: "ice", text: "Icing 10-15 minutes every hour.", explanation: "That is a card treatment step." },
        { id: "support", text: "Supporting the injured part comfortably.", explanation: "That is also a card treatment step." },
      ],
    }),
    makeQuestion("closed_fracture", {
      miniCase: "A victim has a closed wrist fracture.",
      question: "Which pair of actions should you avoid?",
      topicTags: ["closed fracture", "realignment", "elevation"],
      choices: [
        { id: "elevate_realign", text: "Elevating the fractured limb and attempting realignment.", correct: true, explanation: "Correct. The closed fracture card says do not elevate a limb with a fracture and do not attempt realignment." },
        { id: "rest_immobilize", text: "Resting and immobilizing in a comfortable position.", explanation: "Those are card treatment steps." },
        { id: "ice", text: "Icing 10-15 minutes every hour.", explanation: "That is a source-card treatment step." },
        { id: "ems", text: "Phoning EMS.", explanation: "Phone EMS is on the card." },
      ],
    }),
    makeQuestion("open_fracture", {
      miniCase: "A victim has an open humerus fracture.",
      question: "Which action matches the source card?",
      topicTags: ["open fracture", "exposed bone"],
      choices: [
        { id: "bandage", text: "Place a clean bandage over the exposed bone and wound.", correct: true, explanation: "Correct. That is a source-card treatment step." },
        { id: "realign", text: "Realign the bone before bandaging.", explanation: "The card says do not attempt realignment." },
        { id: "move", text: "Move the victim unless it is absolutely essential.", explanation: "The card says do NOT move unless absolutely essential." },
        { id: "food", text: "Give food or liquids for shock.", explanation: "Food/liquids are not a fracture treatment and are ruled out on chest/abdominal injury cards." },
      ],
    }),
    makeQuestion("pelvic_hip_fracture", {
      miniCase: "A victim had a severe fall onto their hip.",
      question: "What should you avoid moving?",
      topicTags: ["pelvic fracture", "hip fracture"],
      choices: [
        { id: "legs", text: "Do not move or lift the legs.", correct: true, explanation: "Correct. The pelvic/hip fracture card says try not to move or lift the legs." },
        { id: "hips", text: "Hold and support the hips.", explanation: "That is a source-card treatment step." },
        { id: "distal", text: "Check distal circulation and sensation in the legs.", explanation: "That is a source-card assessment/monitoring step." },
        { id: "ems", text: "Phone EMS.", explanation: "Phone EMS is required by the card." },
      ],
    }),
    makeQuestion("thermal_burns", {
      miniCase: "A patron has a thermal burn.",
      question: "What is the first treatment move on the burn card?",
      topicTags: ["thermal burn", "burns", "cool water"],
      choices: [
        { id: "flush", text: "Flush the burned area with cool, clean water.", correct: true, explanation: "Correct. Every thermal-burn degree in the card starts with or includes flushing with cool, clean water." },
        { id: "blisters", text: "Break blisters to release pressure.", explanation: "The second-degree burn card says do not break blisters." },
        { id: "brush", text: "Brush off dry chemicals first.", explanation: "That is chemical burn care, not thermal burn." },
        { id: "current", text: "Turn off electrical current before touching.", explanation: "That is electrical burn care." },
      ],
    }),
    makeQuestion("chemical_burns", {
      miniCase: "A dry chemical is on a victim's skin.",
      question: "What comes before flushing?",
      topicTags: ["chemical burn", "burns", "flushing"],
      choices: [
        { id: "brush", text: "Brush off dry chemicals and remove contaminated clothing.", correct: true, explanation: "Correct. The card says brush off dry chemicals before flushing and remove contaminated clothing." },
        { id: "water_first", text: "Flush first before brushing dry chemical.", explanation: "The card says brush off dry chemicals before flushing." },
        { id: "tooth", text: "Store a tooth in milk.", explanation: "That belongs to dental/mouth injury care." },
        { id: "wrap", text: "Wrap ribs to support breathing.", explanation: "That is wrong for broken ribs and unrelated to chemical burns." },
      ],
    }),
    makeQuestion("electrical_burns", {
      miniCase: "A victim is near an electrical source.",
      question: "What must happen before touching the victim or source?",
      topicTags: ["electrical burn", "electrical safety"],
      choices: [
        { id: "current", text: "Turn off the current and stay away from high voltage.", correct: true, explanation: "Correct. The card says turn off current before touching and stay well back from high voltage." },
        { id: "dry_dress_first", text: "Cover entry/exit wounds before turning off current.", explanation: "Dressing comes after the electrical danger is controlled." },
        { id: "stick", text: "Use a stick or plastic pole to remove a fallen wire.", explanation: "The card says do not attempt that." },
        { id: "water", text: "Flush with large volumes of water first.", explanation: "That belongs to chemical burns and could be unsafe around electricity." },
      ],
    }),
    makeQuestion("radiation_burns", {
      miniCase: "You are reviewing the Radiation Burns card in the uploaded source.",
      question: "What should be marked for instructor review?",
      topicTags: ["radiation burn", "instructor-review-needed"],
      choices: [
        { id: "repeat", text: "The Radiation Burns card repeats Electrical Burns treatment wording.", correct: true, explanation: "Correct. The source text appears duplicated, so the app preserves it with instructor-review notes." },
        { id: "complete", text: "It clearly lists radiation-specific burn treatment.", explanation: "The uploaded source does not provide radiation-specific treatment wording." },
        { id: "invent", text: "Invent a new radiation protocol and treat it as source truth.", explanation: "The request says not to invent extra treatment rules unless clearly marked for review." },
        { id: "delete", text: "Remove it because the wording is unclear.", explanation: "The user asked to include Radiation Burns; preserving and flagging it is safer." },
      ],
    }),
  ];

  const contentSources = [
    {
      topic: "Uploaded instructor/practice-card source",
      summary: "Primary app scenario and Question Mode content is based on source/First Aid Practise Cards.docx.",
    },
    {
      topic: "Instructor-review-needed cards",
      summary: "Nose Injuries repeats ear-injury wording, and Radiation Burns repeats electrical-burn wording in the uploaded source.",
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

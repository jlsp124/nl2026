--[[
	ActionDefinitions

	This ModuleScript stores every selectable response action used by the
	practice trainer. Scenario files refer to actions by their id values.

	Important:
	This project is a practice tool only. It is not official medical, legal,
	or certification guidance.
]]

local ActionDefinitions = {}

ActionDefinitions.PracticeDisclaimer =
	"Practice tool only. Follow your instructor, course materials, and local protocol."

-- The UI displays action categories in this order.
ActionDefinitions.CategoryOrder = {
	"Assessment",
	"Help / equipment",
	"Care",
	"Common mistakes",
}

ActionDefinitions.Actions = {}
ActionDefinitions.Categories = {}
ActionDefinitions.ById = {}

local function addAction(category, id, label, description)
	local action = {
		id = id,
		label = label,
		category = category,
		description = description,
	}

	table.insert(ActionDefinitions.Actions, action)

	if ActionDefinitions.Categories[category] == nil then
		ActionDefinitions.Categories[category] = {}
	end

	table.insert(ActionDefinitions.Categories[category], action)
	ActionDefinitions.ById[id] = action
end

-- Assessment actions: these are usually early priority checks.
addAction(
	"Assessment",
	"scene_safety",
	"Check scene safety",
	"Pause long enough to make sure the scene is safe for you, the victim, and bystanders."
)

addAction(
	"Assessment",
	"ppe_barriers",
	"Use PPE / barrier precautions",
	"Use gloves, a breathing barrier, or other protection when available and appropriate."
)

addAction(
	"Assessment",
	"check_responsiveness",
	"Check responsiveness",
	"Try to determine whether the person responds to voice or touch."
)

addAction(
	"Assessment",
	"check_breathing",
	"Check breathing",
	"Check whether the person is breathing normally, according to the protocol you are learning."
)

addAction(
	"Assessment",
	"check_severe_bleeding",
	"Check for severe bleeding",
	"Look for life-threatening external bleeding that needs immediate pressure."
)

addAction(
	"Assessment",
	"reassess_monitor",
	"Reassess and monitor",
	"Keep checking breathing, circulation, skin signs, pain, and mental status while help is coming."
)

-- Help / equipment actions: these bring help and supplies into the response.
addAction(
	"Help / equipment",
	"call_ems_911",
	"Call EMS / 911",
	"Activate emergency medical services for serious, worsening, or protocol-defined emergencies."
)

addAction(
	"Help / equipment",
	"get_aed",
	"Get AED",
	"Bring the AED quickly when a cardiac emergency is possible."
)

addAction(
	"Help / equipment",
	"get_first_aid_kit",
	"Get first aid kit",
	"Bring supplies such as dressings, gloves, triangular bandages, and burn coverings."
)

addAction(
	"Help / equipment",
	"get_backup",
	"Get backup / notify lifeguard team",
	"Get another trained person involved when the scenario is serious or you need help."
)

-- Care actions: these are treatment choices. Many include "according to protocol"
-- because instructors and local procedures can differ.
addAction(
	"Care",
	"start_cpr_aed_protocol",
	"Start CPR / use AED according to protocol",
	"Begin CPR and follow AED prompts when the person is not breathing normally, per your training."
)

addAction(
	"Care",
	"recovery_position_airway",
	"Place in recovery position / maintain airway according to protocol",
	"Position and monitor an unresponsive breathing person as taught by your instructor."
)

addAction(
	"Care",
	"firm_direct_pressure",
	"Apply firm direct pressure",
	"Use firm direct pressure for severe external bleeding."
)

addAction(
	"Care",
	"maintain_pressure_add_dressing",
	"Maintain pressure / add dressing if bleeding continues",
	"Keep pressure on the wound and add dressings without removing the original dressing too early."
)

addAction(
	"Care",
	"treat_shock_keep_warm",
	"Treat for shock / keep warm",
	"Help the victim rest, reduce heat loss, and monitor closely while waiting for help."
)

addAction(
	"Care",
	"support_immobilize_injury",
	"Support and immobilize injury",
	"Support the injured area in the position found or as your training directs."
)

addAction(
	"Care",
	"cool_burn_water",
	"Cool burn with cool clean water",
	"Cool the burn with cool clean running water when available and appropriate."
)

addAction(
	"Care",
	"cover_burn_loosely",
	"Cover burn loosely",
	"Use a clean, loose covering after cooling the burn."
)

addAction(
	"Care",
	"move_cooler_area",
	"Move to cooler area",
	"Move the person out of heat and sun if it can be done safely."
)

addAction(
	"Care",
	"loosen_heavy_gear",
	"Loosen/remove heavy gear",
	"Remove or loosen extra equipment, pads, or heavy clothing if safe and appropriate."
)

addAction(
	"Care",
	"wet_skin_fan",
	"Wet skin/clothing and fan",
	"Use active cooling by wetting skin or clothing and fanning, according to training."
)

addAction(
	"Care",
	"cold_packs_core",
	"Apply cold packs to core areas",
	"Apply cold packs to areas such as neck, armpits, and groin when appropriate."
)

addAction(
	"Care",
	"sips_fluid_if_allowed",
	"Give sips of fluid only if awake/able and protocol allows",
	"Offer small sips only when the victim is awake, able to swallow, and local protocol allows."
)

addAction(
	"Care",
	"keep_still_spinal_precautions",
	"Keep still / spinal precautions",
	"Limit movement and protect the head, neck, and spine when mechanism or symptoms suggest it."
)

-- Common mistakes: these are intentionally selectable so the trainer can give
-- targeted feedback on risky or incomplete response choices.
addAction(
	"Common mistakes",
	"mistake_cpr_while_breathing",
	"Start CPR while victim is breathing",
	"CPR is not a substitute for monitoring an unresponsive person who is breathing normally."
)

addAction(
	"Common mistakes",
	"mistake_water_unresponsive",
	"Give water to an unresponsive victim",
	"An unresponsive person may not be able to swallow safely."
)

addAction(
	"Common mistakes",
	"mistake_move_spinal_unnecessarily",
	"Move suspected spinal victim unnecessarily",
	"Unnecessary movement can worsen a suspected head, neck, or spinal injury."
)

addAction(
	"Common mistakes",
	"mistake_light_pressure_bleeding",
	"Put light pressure on severe bleeding",
	"Light pressure may not control severe bleeding."
)

addAction(
	"Common mistakes",
	"mistake_remove_pressure_early",
	"Remove pressure to check bleeding too early",
	"Removing pressure too early can disrupt clotting and restart bleeding."
)

addAction(
	"Common mistakes",
	"mistake_fan_only_heat_stroke",
	"Only place victim beside a fan for heat stroke",
	"Passive cooling alone may be too slow for severe heat illness."
)

addAction(
	"Common mistakes",
	"mistake_ignore_ems_severe",
	"Ignore EMS for severe symptoms",
	"Severe or worsening symptoms need help according to local protocol."
)

addAction(
	"Common mistakes",
	"mistake_visible_injury_before_breathing",
	"Treat visible injury before checking breathing in a serious scenario",
	"Visible injuries matter, but airway and breathing checks are critical in serious unresponsive scenarios."
)

addAction(
	"Common mistakes",
	"mistake_ice_direct_burn",
	"Apply ice directly to burn",
	"Direct ice can damage tissue and is not the same as cooling with cool clean water."
)

addAction(
	"Common mistakes",
	"mistake_pop_blisters_creams",
	"Pop blisters / apply random creams",
	"Opening blisters or applying random products can increase risk and complicate care."
)

addAction(
	"Common mistakes",
	"mistake_leave_alone",
	"Leave victim alone",
	"A victim in a serious first aid scenario should be monitored and supported."
)

function ActionDefinitions.getAction(actionId)
	return ActionDefinitions.ById[actionId]
end

function ActionDefinitions.getActionLabel(actionId)
	local action = ActionDefinitions.getAction(actionId)

	if action == nil then
		return actionId
	end

	return action.label
end

function ActionDefinitions.getActionsForCategory(category)
	return ActionDefinitions.Categories[category] or {}
end

return ActionDefinitions

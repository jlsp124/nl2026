--[[
	ScoringRules

	This ModuleScript turns a player's ordered response sequence into a score
	and detailed feedback.

	Scoring is educational, not official. It helps find missed priorities,
	weak choices, dangerous choices, and order problems.
]]

local ActionDefinitions = require(script.Parent:WaitForChild("ActionDefinitions"))

local ScoringRules = {}

ScoringRules.MaxScore = 100

local function makeSet(list)
	local set = {}

	for _, actionId in ipairs(list or {}) do
		set[actionId] = true
	end

	return set
end

local function labelFor(actionId)
	return ActionDefinitions.getActionLabel(actionId)
end

local function addUnique(list, seen, value)
	if seen[value] then
		return
	end

	seen[value] = true
	table.insert(list, value)
end

local function labelsFor(actionIds)
	local labels = {}

	for _, actionId in ipairs(actionIds) do
		table.insert(labels, labelFor(actionId))
	end

	return labels
end

local function clampScore(score)
	if score < 0 then
		return 0
	end

	if score > ScoringRules.MaxScore then
		return ScoringRules.MaxScore
	end

	return math.floor(score + 0.5)
end

function ScoringRules.scoreScenario(scenario, selectedActionIds)
	selectedActionIds = selectedActionIds or {}

	local selectedCounts = {}
	local firstPositionByAction = {}
	local duplicateCount = 0

	for index, actionId in ipairs(selectedActionIds) do
		selectedCounts[actionId] = (selectedCounts[actionId] or 0) + 1

		if firstPositionByAction[actionId] == nil then
			firstPositionByAction[actionId] = index
		else
			duplicateCount = duplicateCount + 1
		end
	end

	local criticalActions = scenario.criticalActions or {}
	local optionalGoodActions = scenario.optionalGoodActions or {}
	local dangerousSet = makeSet(scenario.dangerousActions)
	local weakSet = makeSet(scenario.weakActions)
	local commonMistakeSet = makeSet(scenario.commonMistakes)
	local recommendedSequence = scenario.recommendedSequence or {}

	local score = 0
	local feedbackLines = {}
	local missedCriticalIds = {}
	local dangerousIds = {}
	local weakIds = {}
	local commonMistakeIds = {}
	local goodButIncompleteIds = {}
	local orderIssues = {}

	-- Critical actions are the biggest reward. Missing them also creates
	-- specific feedback and a penalty.
	local criticalReward = 0
	if #criticalActions > 0 then
		criticalReward = 55 / #criticalActions
	end

	for _, actionId in ipairs(criticalActions) do
		if selectedCounts[actionId] then
			score = score + criticalReward
		else
			table.insert(missedCriticalIds, actionId)
			score = score - 8
		end
	end

	-- Useful optional actions help, but they cannot replace critical actions.
	local optionalReward = 0
	if #optionalGoodActions > 0 then
		optionalReward = 15 / #optionalGoodActions
	end

	for _, actionId in ipairs(optionalGoodActions) do
		if selectedCounts[actionId] then
			score = score + optionalReward

			if #missedCriticalIds > 0 then
				table.insert(goodButIncompleteIds, actionId)
			end
		end
	end

	-- Order reward checks adjacent pairs in the recommended sequence.
	-- Example: if scene safety should come before CPR, reversing them loses
	-- priority-order credit and creates a targeted feedback line.
	if #recommendedSequence > 1 then
		local correctPairs = 0
		local totalPairs = #recommendedSequence - 1

		for index = 1, totalPairs do
			local earlierActionId = recommendedSequence[index]
			local laterActionId = recommendedSequence[index + 1]
			local earlierPosition = firstPositionByAction[earlierActionId]
			local laterPosition = firstPositionByAction[laterActionId]

			if earlierPosition ~= nil and laterPosition ~= nil then
				if earlierPosition < laterPosition then
					correctPairs = correctPairs + 1
				else
					table.insert(
						orderIssues,
						string.format(
							"%s should come before %s.",
							labelFor(earlierActionId),
							labelFor(laterActionId)
						)
					)
					score = score - 5
				end
			end
		end

		score = score + (25 * (correctPairs / totalPairs))
	end

	if #selectedActionIds > 0 and recommendedSequence[1] ~= nil then
		if selectedActionIds[1] == recommendedSequence[1] then
			score = score + 5
		else
			table.insert(
				orderIssues,
				string.format("Consider starting with %s.", labelFor(recommendedSequence[1]))
			)
		end
	end

	local seenDangerous = {}
	local seenWeak = {}
	local seenMistakes = {}

	for _, actionId in ipairs(selectedActionIds) do
		if dangerousSet[actionId] then
			addUnique(dangerousIds, seenDangerous, actionId)
		end

		if weakSet[actionId] then
			addUnique(weakIds, seenWeak, actionId)
		end

		if commonMistakeSet[actionId] then
			addUnique(commonMistakeIds, seenMistakes, actionId)
		end
	end

	score = score - (#dangerousIds * 25)
	score = score - (#weakIds * 10)
	score = score - (duplicateCount * 2)

	if #missedCriticalIds == 0 and #dangerousIds == 0 then
		score = score + 5
	end

	local finalScore = clampScore(score)
	local rating = "Needs review"

	if #dangerousIds > 0 then
		rating = "Unsafe choice selected"
	elseif #missedCriticalIds > 0 then
		rating = "Missed critical priority"
	elseif finalScore >= 85 then
		rating = "Strong response"
	end

	if #selectedActionIds == 0 then
		finalScore = 0
		rating = "Needs review"
		table.insert(feedbackLines, "Choose actions before submitting a response.")
	end

	if #missedCriticalIds == 0 and #selectedActionIds > 0 then
		table.insert(feedbackLines, "Covered all scenario-critical actions.")
	else
		table.insert(
			feedbackLines,
			"Missed critical actions: " .. table.concat(labelsFor(missedCriticalIds), ", ")
		)
	end

	if #dangerousIds > 0 then
		table.insert(
			feedbackLines,
			"Dangerous choices: " .. table.concat(labelsFor(dangerousIds), ", ")
		)
	end

	if #weakIds > 0 then
		table.insert(
			feedbackLines,
			"Weak or incomplete choices: " .. table.concat(labelsFor(weakIds), ", ")
		)
	end

	if #goodButIncompleteIds > 0 then
		table.insert(
			feedbackLines,
			"Good but incomplete choices: " .. table.concat(labelsFor(goodButIncompleteIds), ", ")
		)
	end

	if #orderIssues == 0 and #selectedActionIds > 0 then
		table.insert(feedbackLines, "Priority order was mostly aligned with the scenario target sequence.")
	else
		for _, issue in ipairs(orderIssues) do
			table.insert(feedbackLines, "Order issue: " .. issue)
		end
	end

	if duplicateCount > 0 then
		table.insert(feedbackLines, "Repeated actions reduce score. Build one clear ordered sequence.")
	end

	if #commonMistakeIds > 0 then
		table.insert(
			feedbackLines,
			"Common mistake selected: " .. table.concat(labelsFor(commonMistakeIds), ", ")
		)
	end

	local actionFeedbackSeen = {}
	for _, actionId in ipairs(selectedActionIds) do
		local actionFeedback = scenario.feedbackByAction and scenario.feedbackByAction[actionId]

		if actionFeedback ~= nil and actionFeedbackSeen[actionId] ~= true then
			actionFeedbackSeen[actionId] = true
			table.insert(feedbackLines, labelFor(actionId) .. ": " .. actionFeedback)
		end
	end

	if finalScore >= 85 and #missedCriticalIds == 0 and #dangerousIds == 0 then
		table.insert(feedbackLines, scenario.successFeedback)
	end

	table.insert(feedbackLines, "Instructor note: " .. scenario.instructorNote)
	table.insert(feedbackLines, "Source note: " .. scenario.sourceNote)
	table.insert(feedbackLines, "Check your instructor's protocol before treating this as correct for a real course.")

	return {
		score = finalScore,
		rating = rating,
		selectedActionIds = selectedActionIds,
		selectedLabels = labelsFor(selectedActionIds),
		missedCriticalActions = labelsFor(missedCriticalIds),
		dangerousChoices = labelsFor(dangerousIds),
		weakChoices = labelsFor(weakIds),
		commonMistakes = labelsFor(commonMistakeIds),
		goodButIncompleteChoices = labelsFor(goodButIncompleteIds),
		orderIssues = orderIssues,
		feedbackLines = feedbackLines,
		successFeedback = scenario.successFeedback,
		instructorNote = scenario.instructorNote,
		sourceNote = scenario.sourceNote,
	}
end

return ScoringRules

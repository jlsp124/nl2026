--[[
	FirstAidQuiz

	Mobile-first runtime UI for the Pool Deck Response MVP.
	The scenario and scoring modules stay data-driven; this script only manages
	screen flow, selected actions, and display.

	Practice tool only. Follow your instructor, course materials, and local protocol.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local TweenService = game:GetService("TweenService")
local UserInputService = game:GetService("UserInputService")

local FirstAidScenarios = require(ReplicatedStorage:WaitForChild("FirstAidScenarios"))
local ActionDefinitions = require(ReplicatedStorage:WaitForChild("ActionDefinitions"))
local ScoringRules = require(ReplicatedStorage:WaitForChild("ScoringRules"))

local DISCLAIMER = ActionDefinitions.PracticeDisclaimer
local START_NOTE =
	"I didn’t have the actual flashcards yet, so these are AI-made practice scenarios. Use your instructor’s cards/protocols when we get them."
local MAX_SELECTED_ACTIONS = 14

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local COLORS = {
	bgTop = Color3.fromRGB(6, 14, 22),
	bgBottom = Color3.fromRGB(3, 8, 14),
	card = Color3.fromRGB(12, 22, 34),
	cardRaised = Color3.fromRGB(18, 31, 47),
	cardSoft = Color3.fromRGB(23, 39, 58),
	text = Color3.fromRGB(244, 249, 255),
	muted = Color3.fromRGB(154, 171, 191),
	faint = Color3.fromRGB(91, 110, 133),
	line = Color3.fromRGB(43, 65, 88),
	accent = Color3.fromRGB(0, 224, 184),
	accentDark = Color3.fromRGB(0, 156, 128),
	warn = Color3.fromRGB(255, 197, 87),
	danger = Color3.fromRGB(255, 90, 93),
}

local existingGui = playerGui:FindFirstChild("FirstAidQuizGui")
if existingGui then
	existingGui:Destroy()
end

local screenGui = Instance.new("ScreenGui")
screenGui.Name = "FirstAidQuizGui"
screenGui.IgnoreGuiInset = true
screenGui.ResetOnSpawn = false
screenGui.Parent = playerGui

local function make(className, properties, parent)
	local instance = Instance.new(className)

	for key, value in pairs(properties) do
		instance[key] = value
	end

	if parent ~= nil then
		instance.Parent = parent
	end

	return instance
end

local function addCorner(instance, radius)
	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, radius)
	corner.Parent = instance
end

local function addStroke(instance, color, transparency, thickness)
	local stroke = Instance.new("UIStroke")
	stroke.Color = color
	stroke.Transparency = transparency or 0
	stroke.Thickness = thickness or 1
	stroke.Parent = instance
end

local function addPadding(instance, left, top, right, bottom)
	local padding = Instance.new("UIPadding")
	padding.PaddingLeft = UDim.new(0, left)
	padding.PaddingTop = UDim.new(0, top)
	padding.PaddingRight = UDim.new(0, right)
	padding.PaddingBottom = UDim.new(0, bottom)
	padding.Parent = instance
end

local function addListLayout(parent, padding)
	return make("UIListLayout", {
		FillDirection = Enum.FillDirection.Vertical,
		HorizontalAlignment = Enum.HorizontalAlignment.Center,
		Padding = UDim.new(0, padding),
		SortOrder = Enum.SortOrder.LayoutOrder,
	}, parent)
end

local function clearChildren(container)
	for _, child in ipairs(container:GetChildren()) do
		if not child:IsA("UIListLayout") and not child:IsA("UIPadding") then
			child:Destroy()
		end
	end
end

local function label(parent, text, size, color, font, order)
	return make("TextLabel", {
		AutomaticSize = Enum.AutomaticSize.Y,
		BackgroundTransparency = 1,
		Font = font or Enum.Font.Gotham,
		LayoutOrder = order or 1,
		Size = UDim2.new(1, 0, 0, 0),
		Text = text,
		TextColor3 = color or COLORS.text,
		TextSize = size,
		TextWrapped = true,
		TextXAlignment = Enum.TextXAlignment.Left,
		TextYAlignment = Enum.TextYAlignment.Top,
	}, parent)
end

local function button(parent, text, color, order)
	local btn = make("TextButton", {
		AutoButtonColor = true,
		BackgroundColor3 = color,
		Font = Enum.Font.GothamSemibold,
		LayoutOrder = order or 1,
		Size = UDim2.new(1, 0, 0, 54),
		Text = text,
		TextColor3 = COLORS.text,
		TextSize = 16,
		TextWrapped = true,
	}, parent)

	addCorner(btn, 14)
	addStroke(btn, COLORS.line, 0.35)

	return btn
end

local function smallPill(parent, text, active, order)
	local pill = make("TextButton", {
		AutoButtonColor = true,
		BackgroundColor3 = active and COLORS.accentDark or COLORS.cardRaised,
		Font = Enum.Font.GothamSemibold,
		LayoutOrder = order or 1,
		Size = UDim2.new(0, 128, 0, 42),
		Text = text,
		TextColor3 = active and COLORS.text or COLORS.muted,
		TextSize = 13,
		TextWrapped = true,
	}, parent)

	addCorner(pill, 999)
	addStroke(pill, active and COLORS.accent or COLORS.line, active and 0.15 or 0.45)

	return pill
end

local function section(parent, order)
	local frame = make("Frame", {
		AutomaticSize = Enum.AutomaticSize.Y,
		BackgroundColor3 = COLORS.cardRaised,
		LayoutOrder = order or 1,
		Size = UDim2.new(1, 0, 0, 0),
	}, parent)

	addCorner(frame, 18)
	addStroke(frame, COLORS.line, 0.45)
	addPadding(frame, 14, 14, 14, 14)
	addListLayout(frame, 10)

	return frame
end

local root = make("Frame", {
	BackgroundColor3 = COLORS.bgBottom,
	Size = UDim2.fromScale(1, 1),
}, screenGui)

make("UIGradient", {
	Color = ColorSequence.new({
		ColorSequenceKeypoint.new(0, COLORS.bgTop),
		ColorSequenceKeypoint.new(1, COLORS.bgBottom),
	}),
	Rotation = 90,
}, root)

local scroll = make("ScrollingFrame", {
	Active = true,
	AutomaticCanvasSize = Enum.AutomaticSize.Y,
	BackgroundTransparency = 1,
	BorderSizePixel = 0,
	CanvasSize = UDim2.new(0, 0, 0, 0),
	ScrollBarImageColor3 = COLORS.line,
	ScrollBarThickness = 4,
	Size = UDim2.fromScale(1, 1),
}, root)

addPadding(scroll, 18, 24, 18, 24)

local screenStack = make("Frame", {
	AutomaticSize = Enum.AutomaticSize.Y,
	BackgroundTransparency = 1,
	Size = UDim2.new(1, 0, 0, 0),
}, scroll)

local stackLayout = addListLayout(screenStack, 0)
stackLayout.HorizontalAlignment = Enum.HorizontalAlignment.Center

local scenarioOrder = {}
local scenarioIndex = 1
local currentScenario = nil
local selectedActionIds = {}
local selectedCategory = "Assessment"
local currentMode = "Practice"
local latestScenarioUpdate = ""
local renderQuizScreen
local renderResultScreen

local function shuffleScenarios()
	local shuffled = {}
	local rng = Random.new()

	for index, scenario in ipairs(FirstAidScenarios.List) do
		shuffled[index] = scenario
	end

	for index = #shuffled, 2, -1 do
		local swapIndex = rng:NextInteger(1, index)
		shuffled[index], shuffled[swapIndex] = shuffled[swapIndex], shuffled[index]
	end

	return shuffled
end

local function actionLabel(actionId)
	return ActionDefinitions.getActionLabel(actionId)
end

local function labelsFor(actionIds)
	local lines = {}

	for index, actionId in ipairs(actionIds or {}) do
		table.insert(lines, string.format("%d. %s", index, actionLabel(actionId)))
	end

	return lines
end

local function makeSet(list)
	local set = {}

	for _, value in ipairs(list or {}) do
		set[value] = true
	end

	return set
end

local function getSuggestedOrderText()
	local lines = labelsFor(currentScenario.recommendedSequence)

	if #lines == 0 then
		return "No suggested order is available for this starter scenario."
	end

	return table.concat(lines, "\n")
end

local function getWhatWentWellText(result)
	local criticalSet = makeSet(currentScenario.criticalActions)
	local optionalSet = makeSet(currentScenario.optionalGoodActions)
	local dangerousSet = makeSet(currentScenario.dangerousActions)
	local weakSet = makeSet(currentScenario.weakActions)
	local seen = {}
	local goodLines = {}

	for _, actionId in ipairs(result.selectedActionIds or {}) do
		if seen[actionId] ~= true and (criticalSet[actionId] or optionalSet[actionId]) and not dangerousSet[actionId] and not weakSet[actionId] then
			seen[actionId] = true
			table.insert(goodLines, "- " .. actionLabel(actionId))
		end
	end

	if #goodLines == 0 then
		return "No strong actions were scored yet. Retry and start with the highest-priority checks."
	end

	return table.concat(goodLines, "\n")
end

local function getWhatMissedText(result)
	local missedLines = {}

	for _, text in ipairs(result.missedCriticalActions or {}) do
		table.insert(missedLines, "- Missed: " .. text)
	end

	for _, text in ipairs(result.dangerousChoices or {}) do
		table.insert(missedLines, "- Dangerous: " .. text)
	end

	for _, text in ipairs(result.weakChoices or {}) do
		table.insert(missedLines, "- Weak/incomplete: " .. text)
	end

	for _, text in ipairs(result.orderIssues or {}) do
		table.insert(missedLines, "- Order: " .. text)
	end

	if #missedLines == 0 then
		return "No critical misses were flagged. Check the suggested order with your instructor's protocol."
	end

	return table.concat(missedLines, "\n")
end

local function createCard()
	clearChildren(screenStack)

	local card = make("Frame", {
		AutomaticSize = Enum.AutomaticSize.Y,
		BackgroundColor3 = COLORS.card,
		Size = UDim2.new(0.94, 0, 0, 0),
	}, screenStack)

	make("UISizeConstraint", {
		MaxSize = Vector2.new(560, 10000),
		MinSize = Vector2.new(280, 0),
	}, card)

	addCorner(card, 26)
	addStroke(card, COLORS.line, 0.25, 1.2)
	addPadding(card, 18, 18, 18, 18)
	addListLayout(card, 14)

	card.BackgroundTransparency = 0.08
	card.Position = UDim2.fromOffset(0, 12)
	TweenService:Create(
		card,
		TweenInfo.new(0.18, Enum.EasingStyle.Quad, Enum.EasingDirection.Out),
		{ BackgroundTransparency = 0, Position = UDim2.fromOffset(0, 0) }
	):Play()

	return card
end

local function renderStartScreen()
	local card = createCard()

	local eyebrow = label(card, "MVP practice build", 13, COLORS.accent, Enum.Font.GothamSemibold, 1)
	eyebrow.TextXAlignment = Enum.TextXAlignment.Center

	local title = label(card, "Pool Deck Response", 34, COLORS.text, Enum.Font.GothamBold, 2)
	title.TextXAlignment = Enum.TextXAlignment.Center

	local subtitle = label(card, "Quick first aid scenario practice", 18, COLORS.muted, Enum.Font.GothamSemibold, 3)
	subtitle.TextXAlignment = Enum.TextXAlignment.Center

	local noteBox = section(card, 4)
	noteBox.BackgroundColor3 = COLORS.cardSoft
	label(noteBox, START_NOTE, 16, COLORS.text, Enum.Font.Gotham, 1)
	label(noteBox, DISCLAIMER, 13, COLORS.muted, Enum.Font.Gotham, 2)

	local practiceButton = button(card, "Practice Mode", COLORS.accentDark, 5)
	local testButton = button(card, "Test Mode", COLORS.cardSoft, 6)

	label(
		card,
		"Practice shows small scenario updates after selected actions. Test keeps the same scoring but avoids coaching until submit.",
		13,
		COLORS.muted,
		Enum.Font.Gotham,
		7
	)

	practiceButton.MouseButton1Click:Connect(function()
		currentMode = "Practice"
		scenarioOrder = shuffleScenarios()
		scenarioIndex = 1
		currentScenario = scenarioOrder[scenarioIndex]
		selectedActionIds = {}
		selectedCategory = "Assessment"
		latestScenarioUpdate = "Choose your first action."
		renderQuizScreen()
	end)

	testButton.MouseButton1Click:Connect(function()
		currentMode = "Test"
		scenarioOrder = shuffleScenarios()
		scenarioIndex = 1
		currentScenario = scenarioOrder[scenarioIndex]
		selectedActionIds = {}
		selectedCategory = "Assessment"
		latestScenarioUpdate = "Choose your first action."
		renderQuizScreen()
	end)
end

renderQuizScreen = function()
	local card = createCard()

	local progress = label(
		card,
		string.format("%s Mode  -  Scenario %d of %d", currentMode, scenarioIndex, #scenarioOrder),
		13,
		COLORS.accent,
		Enum.Font.GothamSemibold,
		1
	)
	progress.TextXAlignment = Enum.TextXAlignment.Center

	local progressTrack = make("Frame", {
		BackgroundColor3 = COLORS.cardSoft,
		LayoutOrder = 2,
		Size = UDim2.new(1, 0, 0, 8),
	}, card)
	addCorner(progressTrack, 999)

	local progressFill = make("Frame", {
		BackgroundColor3 = COLORS.accent,
		Size = UDim2.new(scenarioIndex / #scenarioOrder, 0, 1, 0),
	}, progressTrack)
	addCorner(progressFill, 999)

	local scenarioBlock = section(card, 3)
	scenarioBlock.BackgroundColor3 = Color3.fromRGB(11, 24, 37)

	label(scenarioBlock, currentScenario.title, 25, COLORS.text, Enum.Font.GothamBold, 1)
	label(scenarioBlock, currentScenario.prompt, 16, COLORS.text, Enum.Font.Gotham, 2)

	local question = label(card, "What do you do next?", 22, COLORS.text, Enum.Font.GothamBold, 4)
	question.TextXAlignment = Enum.TextXAlignment.Center

	local updateText = latestScenarioUpdate
	if currentMode == "Test" and #selectedActionIds > 0 then
		updateText = "Action recorded. Continue your sequence."
	end

	local update = label(card, updateText, 14, COLORS.warn, Enum.Font.GothamSemibold, 5)
	update.TextXAlignment = Enum.TextXAlignment.Center

	local selectedBlock = section(card, 6)
	selectedBlock.BackgroundColor3 = COLORS.cardRaised
	label(selectedBlock, "Your actions in order", 15, COLORS.muted, Enum.Font.GothamSemibold, 1)

	if #selectedActionIds == 0 then
		label(selectedBlock, "No actions selected yet.", 15, COLORS.faint, Enum.Font.Gotham, 2)
	else
		for index, actionId in ipairs(selectedActionIds) do
			local row = button(selectedBlock, string.format("%d. %s", index, actionLabel(actionId)), COLORS.cardSoft, index + 1)
			row.Size = UDim2.new(1, 0, 0, 42)
			row.TextXAlignment = Enum.TextXAlignment.Left

			row.MouseButton1Click:Connect(function()
				table.remove(selectedActionIds, index)
				latestScenarioUpdate = "Removed one action. Choose what comes next."
				renderQuizScreen()
			end)
		end
	end

	local tabs = make("Frame", {
		AutomaticSize = Enum.AutomaticSize.Y,
		BackgroundTransparency = 1,
		LayoutOrder = 7,
		Size = UDim2.new(1, 0, 0, 0),
	}, card)
	local tabGrid = make("UIGridLayout", {
		CellPadding = UDim2.new(0, 8, 0, 8),
		CellSize = UDim2.new(0.5, -4, 0, 42),
		SortOrder = Enum.SortOrder.LayoutOrder,
	}, tabs)
	tabGrid.Parent = tabs

	for index, category in ipairs(ActionDefinitions.CategoryOrder) do
		local shortName = category
		if category == "Help / equipment" then
			shortName = "Help"
		elseif category == "Common mistakes" then
			shortName = "Mistakes"
		end

		local categoryButton = smallPill(tabs, shortName, selectedCategory == category, index)
		categoryButton.Size = UDim2.new(1, 0, 0, 42)
		categoryButton.MouseButton1Click:Connect(function()
			selectedCategory = category
			renderQuizScreen()
		end)
	end

	local actionsBlock = section(card, 8)
	actionsBlock.BackgroundColor3 = Color3.fromRGB(9, 18, 29)
	label(actionsBlock, selectedCategory, 15, COLORS.accent, Enum.Font.GothamBold, 1)

	for index, action in ipairs(ActionDefinitions.getActionsForCategory(selectedCategory)) do
		local color = COLORS.cardSoft
		if selectedCategory == "Common mistakes" then
			color = Color3.fromRGB(66, 35, 41)
		end

		local actionButton = button(actionsBlock, action.label, color, index + 1)
		actionButton.MouseButton1Click:Connect(function()
			if #selectedActionIds >= MAX_SELECTED_ACTIONS then
				latestScenarioUpdate = "That is enough actions for one answer. Submit or clear before adding more."
				renderQuizScreen()
				return
			end

			table.insert(selectedActionIds, action.id)

			local updateByAction = currentScenario.scenarioUpdatesByAction or {}
			if currentMode == "Practice" and updateByAction[action.id] ~= nil then
				latestScenarioUpdate = updateByAction[action.id]
			elseif currentMode == "Practice" then
				latestScenarioUpdate = "Action added. Choose what comes next."
			else
				latestScenarioUpdate = "Action recorded. Continue your sequence."
			end

			renderQuizScreen()
		end)
	end

	local controls = make("Frame", {
		AutomaticSize = Enum.AutomaticSize.Y,
		BackgroundTransparency = 1,
		LayoutOrder = 9,
		Size = UDim2.new(1, 0, 0, 0),
	}, card)

	make("UIGridLayout", {
		CellPadding = UDim2.new(0, 10, 0, 0),
		CellSize = UDim2.new(0.5, -5, 0, 56),
		SortOrder = Enum.SortOrder.LayoutOrder,
	}, controls)

	local clearButton = button(controls, "Clear", COLORS.cardSoft, 1)
	local submitButton = button(controls, "Submit", COLORS.accentDark, 2)

	clearButton.MouseButton1Click:Connect(function()
		selectedActionIds = {}
		latestScenarioUpdate = "Cleared. Choose your first action."
		renderQuizScreen()
	end)

	submitButton.MouseButton1Click:Connect(function()
		renderResultScreen(ScoringRules.scoreScenario(currentScenario, selectedActionIds))
	end)
end

renderResultScreen = function(result)
	local card = createCard()

	local progress = label(
		card,
		string.format("%s Mode  -  Scenario %d of %d", currentMode, scenarioIndex, #scenarioOrder),
		13,
		COLORS.accent,
		Enum.Font.GothamSemibold,
		1
	)
	progress.TextXAlignment = Enum.TextXAlignment.Center

	local scoreColor = COLORS.warn
	if result.rating == "Strong response" then
		scoreColor = COLORS.accent
	elseif result.rating == "Unsafe choice selected" or result.rating == "Missed critical priority" then
		scoreColor = COLORS.danger
	end

	local score = label(card, string.format("%d/100", result.score), 44, scoreColor, Enum.Font.GothamBold, 2)
	score.TextXAlignment = Enum.TextXAlignment.Center

	local rating = label(card, result.rating, 20, COLORS.text, Enum.Font.GothamBold, 3)
	rating.TextXAlignment = Enum.TextXAlignment.Center

	local well = section(card, 4)
	label(well, "What you did well", 17, COLORS.accent, Enum.Font.GothamBold, 1)
	label(well, getWhatWentWellText(result), 15, COLORS.text, Enum.Font.Gotham, 2)

	local missed = section(card, 5)
	label(missed, "What you missed", 17, COLORS.warn, Enum.Font.GothamBold, 1)
	label(missed, getWhatMissedText(result), 15, COLORS.text, Enum.Font.Gotham, 2)

	local suggested = section(card, 6)
	label(suggested, "Suggested order", 17, COLORS.accent, Enum.Font.GothamBold, 1)
	label(suggested, getSuggestedOrderText(), 15, COLORS.text, Enum.Font.Gotham, 2)
	label(suggested, "Check your instructor's protocol before treating this as correct.", 13, COLORS.muted, Enum.Font.Gotham, 3)

	local controls = make("Frame", {
		AutomaticSize = Enum.AutomaticSize.Y,
		BackgroundTransparency = 1,
		LayoutOrder = 7,
		Size = UDim2.new(1, 0, 0, 0),
	}, card)

	make("UIGridLayout", {
		CellPadding = UDim2.new(0, 10, 0, 0),
		CellSize = UDim2.new(0.5, -5, 0, 56),
		SortOrder = Enum.SortOrder.LayoutOrder,
	}, controls)

	local retryButton = button(controls, "Retry", COLORS.cardSoft, 1)
	local nextButton = button(controls, "Next", COLORS.accentDark, 2)

	retryButton.MouseButton1Click:Connect(function()
		selectedActionIds = {}
		latestScenarioUpdate = "Choose your first action."
		renderQuizScreen()
	end)

	nextButton.MouseButton1Click:Connect(function()
		scenarioIndex += 1
		if scenarioIndex > #scenarioOrder then
			scenarioOrder = shuffleScenarios()
			scenarioIndex = 1
		end

		currentScenario = scenarioOrder[scenarioIndex]
		selectedActionIds = {}
		selectedCategory = "Assessment"
		latestScenarioUpdate = "Choose your first action."
		renderQuizScreen()
	end)
end

UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if gameProcessed then
		return
	end

	if currentScenario == nil then
		return
	end

	if input.KeyCode == Enum.KeyCode.Return or input.KeyCode == Enum.KeyCode.KeypadEnter then
		renderResultScreen(ScoringRules.scoreScenario(currentScenario, selectedActionIds))
	elseif input.KeyCode == Enum.KeyCode.C then
		selectedActionIds = {}
		latestScenarioUpdate = "Cleared. Choose your first action."
		renderQuizScreen()
	elseif input.KeyCode == Enum.KeyCode.Backspace then
		if #selectedActionIds > 0 then
			table.remove(selectedActionIds, #selectedActionIds)
			latestScenarioUpdate = "Removed one action. Choose what comes next."
			renderQuizScreen()
		end
	end
end)

renderStartScreen()

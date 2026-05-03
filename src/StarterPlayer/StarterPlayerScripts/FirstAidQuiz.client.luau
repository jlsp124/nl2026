--[[
	FirstAidQuiz

	This LocalScript builds the entire practice UI at runtime. No Roblox Studio
	UI objects are required. That keeps the project simple to edit in GitHub,
	Codex, or any text editor.

	Practice tool only. Follow your instructor, course materials, and local protocol.
]]

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local FirstAidScenarios = require(ReplicatedStorage:WaitForChild("FirstAidScenarios"))
local ActionDefinitions = require(ReplicatedStorage:WaitForChild("ActionDefinitions"))
local ScoringRules = require(ReplicatedStorage:WaitForChild("ScoringRules"))

local DISCLAIMER = ActionDefinitions.PracticeDisclaimer
local MAX_SELECTED_ACTIONS = 18

local player = Players.LocalPlayer
local playerGui = player:WaitForChild("PlayerGui")

local COLORS = {
	background = Color3.fromRGB(9, 13, 20),
	panel = Color3.fromRGB(17, 24, 36),
	panelRaised = Color3.fromRGB(24, 34, 50),
	panelSoft = Color3.fromRGB(31, 43, 62),
	text = Color3.fromRGB(241, 245, 249),
	muted = Color3.fromRGB(148, 163, 184),
	accent = Color3.fromRGB(56, 189, 248),
	accentDark = Color3.fromRGB(3, 105, 161),
	good = Color3.fromRGB(34, 197, 94),
	warn = Color3.fromRGB(245, 158, 11),
	danger = Color3.fromRGB(248, 113, 113),
	border = Color3.fromRGB(51, 65, 85),
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

local function addStroke(instance, color, transparency)
	local stroke = Instance.new("UIStroke")
	stroke.Color = color
	stroke.Transparency = transparency or 0
	stroke.Thickness = 1
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

local function clearContent(container)
	for _, child in ipairs(container:GetChildren()) do
		if not child:IsA("UIListLayout") and not child:IsA("UIPadding") and not child:IsA("UIGridLayout") then
			child:Destroy()
		end
	end
end

local function createLabel(parent, text, textSize, color, font, layoutOrder)
	local label = make("TextLabel", {
		BackgroundTransparency = 1,
		Font = font or Enum.Font.Gotham,
		LayoutOrder = layoutOrder or 1,
		Size = UDim2.new(1, 0, 0, 0),
		AutomaticSize = Enum.AutomaticSize.Y,
		Text = text,
		TextColor3 = color or COLORS.text,
		TextSize = textSize,
		TextWrapped = true,
		TextXAlignment = Enum.TextXAlignment.Left,
		TextYAlignment = Enum.TextYAlignment.Top,
	}, parent)

	return label
end

local function createButton(parent, text, backgroundColor, layoutOrder)
	local button = make("TextButton", {
		AutoButtonColor = true,
		BackgroundColor3 = backgroundColor,
		Font = Enum.Font.GothamSemibold,
		LayoutOrder = layoutOrder or 1,
		Size = UDim2.new(1, 0, 0, 44),
		Text = text,
		TextColor3 = COLORS.text,
		TextSize = 15,
		TextWrapped = true,
	}, parent)

	addCorner(button, 10)
	addStroke(button, COLORS.border, 0.25)

	return button
end

local function createPanel(parent, layoutOrder)
	local panel = make("Frame", {
		BackgroundColor3 = COLORS.panel,
		LayoutOrder = layoutOrder,
		Size = UDim2.new(1, 0, 1, 0),
	}, parent)

	addCorner(panel, 16)
	addStroke(panel, COLORS.border, 0.2)
	addPadding(panel, 14, 14, 14, 14)

	return panel
end

local root = make("Frame", {
	BackgroundColor3 = COLORS.background,
	Size = UDim2.fromScale(1, 1),
}, screenGui)

addPadding(root, 18, 18, 18, 12)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 12),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, root)

local header = make("Frame", {
	BackgroundColor3 = COLORS.panel,
	LayoutOrder = 1,
	Size = UDim2.new(1, 0, 0, 82),
}, root)
addCorner(header, 18)
addStroke(header, COLORS.border, 0.2)
addPadding(header, 18, 12, 18, 12)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 4),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, header)

createLabel(header, "Pool Deck Response", 28, COLORS.text, Enum.Font.GothamBold, 1)
createLabel(
	header,
	"Single-player first aid / National Lifeguard practice trainer for British Columbia, Canada",
	15,
	COLORS.muted,
	Enum.Font.Gotham,
	2
)

local body = make("Frame", {
	BackgroundTransparency = 1,
	LayoutOrder = 2,
	Size = UDim2.new(1, 0, 1, -142),
}, root)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Horizontal,
	Padding = UDim.new(0, 12),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, body)

local leftPane = make("Frame", {
	BackgroundTransparency = 1,
	LayoutOrder = 1,
	Size = UDim2.new(0.58, -6, 1, 0),
}, body)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 12),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, leftPane)

local scenarioPanel = createPanel(leftPane, 1)
scenarioPanel.Size = UDim2.new(1, 0, 0.36, -6)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 10),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, scenarioPanel)

local scenarioMetaLabel = createLabel(scenarioPanel, "", 14, COLORS.accent, Enum.Font.GothamSemibold, 1)
local scenarioTitleLabel = createLabel(scenarioPanel, "", 24, COLORS.text, Enum.Font.GothamBold, 2)
local promptLabel = createLabel(scenarioPanel, "", 18, COLORS.text, Enum.Font.Gotham, 3)

local tagsPanel = make("Frame", {
	BackgroundColor3 = COLORS.panelRaised,
	LayoutOrder = 4,
	Size = UDim2.new(1, 0, 1, -150),
}, scenarioPanel)
addCorner(tagsPanel, 12)
addPadding(tagsPanel, 10, 10, 10, 10)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 8),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, tagsPanel)

createLabel(tagsPanel, "Victim status", 14, COLORS.muted, Enum.Font.GothamSemibold, 1)

local tagGridFrame = make("Frame", {
	BackgroundTransparency = 1,
	LayoutOrder = 2,
	Size = UDim2.new(1, 0, 1, -24),
}, tagsPanel)

local tagGrid = make("UIGridLayout", {
	CellPadding = UDim2.new(0, 8, 0, 8),
	CellSize = UDim2.new(0, 170, 0, 30),
	FillDirection = Enum.FillDirection.Horizontal,
	SortOrder = Enum.SortOrder.LayoutOrder,
}, tagGridFrame)

local actionsPanel = createPanel(leftPane, 2)
actionsPanel.Size = UDim2.new(1, 0, 0.64, -6)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 10),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, actionsPanel)

createLabel(actionsPanel, "Choose response actions", 20, COLORS.text, Enum.Font.GothamBold, 1)
createLabel(
	actionsPanel,
	"Click actions in the order you would do them. Common mistakes are included on purpose so the trainer can catch them.",
	14,
	COLORS.muted,
	Enum.Font.Gotham,
	2
)

local actionScroll = make("ScrollingFrame", {
	Active = true,
	AutomaticCanvasSize = Enum.AutomaticSize.Y,
	BackgroundTransparency = 1,
	BorderSizePixel = 0,
	CanvasSize = UDim2.new(0, 0, 0, 0),
	LayoutOrder = 3,
	ScrollBarImageColor3 = COLORS.border,
	ScrollBarThickness = 6,
	Size = UDim2.new(1, 0, 1, -76),
}, actionsPanel)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 12),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, actionScroll)

local rightPane = make("Frame", {
	BackgroundTransparency = 1,
	LayoutOrder = 2,
	Size = UDim2.new(0.42, -6, 1, 0),
}, body)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 12),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, rightPane)

local sequencePanel = createPanel(rightPane, 1)
sequencePanel.Size = UDim2.new(1, 0, 0.34, -6)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 10),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, sequencePanel)

createLabel(sequencePanel, "Selected action sequence", 20, COLORS.text, Enum.Font.GothamBold, 1)
createLabel(sequencePanel, "Click a selected row to remove it. Backspace removes the last action.", 13, COLORS.muted, Enum.Font.Gotham, 2)

local sequenceScroll = make("ScrollingFrame", {
	Active = true,
	AutomaticCanvasSize = Enum.AutomaticSize.Y,
	BackgroundTransparency = 1,
	BorderSizePixel = 0,
	CanvasSize = UDim2.new(0, 0, 0, 0),
	LayoutOrder = 3,
	ScrollBarImageColor3 = COLORS.border,
	ScrollBarThickness = 6,
	Size = UDim2.new(1, 0, 1, -58),
}, sequencePanel)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 8),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, sequenceScroll)

local controlsPanel = createPanel(rightPane, 2)
controlsPanel.Size = UDim2.new(1, 0, 0, 166)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 10),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, controlsPanel)

local scoreLabel = createLabel(controlsPanel, "Score: not submitted", 20, COLORS.text, Enum.Font.GothamBold, 1)

local buttonGridFrame = make("Frame", {
	BackgroundTransparency = 1,
	LayoutOrder = 2,
	Size = UDim2.new(1, 0, 1, -36),
}, controlsPanel)

make("UIGridLayout", {
	CellPadding = UDim2.new(0, 8, 0, 8),
	CellSize = UDim2.new(0.5, -4, 0, 42),
	FillDirection = Enum.FillDirection.Horizontal,
	SortOrder = Enum.SortOrder.LayoutOrder,
}, buttonGridFrame)

local submitButton = createButton(buttonGridFrame, "Submit", COLORS.accentDark, 1)
local clearButton = createButton(buttonGridFrame, "Clear", COLORS.panelSoft, 2)
local retryButton = createButton(buttonGridFrame, "Retry", COLORS.panelSoft, 3)
local nextButton = createButton(buttonGridFrame, "Next scenario", COLORS.panelSoft, 4)

local feedbackPanel = createPanel(rightPane, 3)
feedbackPanel.Size = UDim2.new(1, 0, 1, -512)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 10),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, feedbackPanel)

createLabel(feedbackPanel, "Feedback", 20, COLORS.text, Enum.Font.GothamBold, 1)

local feedbackScroll = make("ScrollingFrame", {
	Active = true,
	AutomaticCanvasSize = Enum.AutomaticSize.Y,
	BackgroundTransparency = 1,
	BorderSizePixel = 0,
	CanvasSize = UDim2.new(0, 0, 0, 0),
	LayoutOrder = 2,
	ScrollBarImageColor3 = COLORS.border,
	ScrollBarThickness = 6,
	Size = UDim2.new(1, 0, 1, -36),
}, feedbackPanel)

make("UIListLayout", {
	FillDirection = Enum.FillDirection.Vertical,
	Padding = UDim.new(0, 8),
	SortOrder = Enum.SortOrder.LayoutOrder,
}, feedbackScroll)

local footer = make("Frame", {
	BackgroundTransparency = 1,
	LayoutOrder = 3,
	Size = UDim2.new(1, 0, 0, 30),
}, root)

local footerText = createLabel(
	footer,
	DISCLAIMER .. " Not official medical, legal, or certification guidance.",
	13,
	COLORS.muted,
	Enum.Font.Gotham,
	1
)
footerText.TextXAlignment = Enum.TextXAlignment.Center

local rng = Random.new()
local scenarioOrder = {}
local scenarioIndex = 1
local currentScenario = nil
local selectedActionIds = {}

local function shuffleScenarios()
	local shuffled = {}

	for index, scenario in ipairs(FirstAidScenarios.List) do
		shuffled[index] = scenario
	end

	for index = #shuffled, 2, -1 do
		local swapIndex = rng:NextInteger(1, index)
		shuffled[index], shuffled[swapIndex] = shuffled[swapIndex], shuffled[index]
	end

	return shuffled
end

local function feedbackColorForRating(rating)
	if rating == "Strong response" then
		return COLORS.good
	end

	if rating == "Unsafe choice selected" or rating == "Missed critical priority" then
		return COLORS.danger
	end

	return COLORS.warn
end

local function addFeedbackLine(text, color, font)
	local label = createLabel(feedbackScroll, text, 14, color or COLORS.text, font or Enum.Font.Gotham, #feedbackScroll:GetChildren() + 1)
	label.BackgroundColor3 = COLORS.panelRaised
	label.BackgroundTransparency = 0
	label.Size = UDim2.new(1, -6, 0, 0)
	addCorner(label, 10)
	addPadding(label, 10, 8, 10, 8)
	return label
end

local function renderDefaultFeedback()
	clearContent(feedbackScroll)
	addFeedbackLine("Build an ordered response, then submit for scoring.", COLORS.muted)
	addFeedbackLine("Keyboard: Enter submits, C clears, R retries, N moves next, Backspace removes the last action.", COLORS.muted)
	addFeedbackLine(DISCLAIMER, COLORS.muted)
end

local function renderFeedback(result)
	clearContent(feedbackScroll)

	addFeedbackLine(result.rating .. " - " .. tostring(result.score) .. "/100", feedbackColorForRating(result.rating), Enum.Font.GothamBold)

	for _, line in ipairs(result.feedbackLines) do
		addFeedbackLine("- " .. line, COLORS.text)
	end
end

local function refreshSequenceList()
	clearContent(sequenceScroll)

	if #selectedActionIds == 0 then
		local emptyLabel = createLabel(sequenceScroll, "No actions selected yet.", 15, COLORS.muted, Enum.Font.Gotham, 1)
		emptyLabel.BackgroundColor3 = COLORS.panelRaised
		emptyLabel.BackgroundTransparency = 0
		emptyLabel.Size = UDim2.new(1, -6, 0, 0)
		addCorner(emptyLabel, 10)
		addPadding(emptyLabel, 10, 8, 10, 8)
		return
	end

	for index, actionId in ipairs(selectedActionIds) do
		local actionLabel = ActionDefinitions.getActionLabel(actionId)
		local row = createButton(
			sequenceScroll,
			string.format("%02d. %s", index, actionLabel),
			COLORS.panelRaised,
			index
		)
		row.TextXAlignment = Enum.TextXAlignment.Left

		row.MouseButton1Click:Connect(function()
			table.remove(selectedActionIds, index)
			scoreLabel.Text = "Score: not submitted"
			renderDefaultFeedback()
			refreshSequenceList()
		end)
	end
end

local function resetForScenario()
	selectedActionIds = {}
	scoreLabel.Text = "Score: not submitted"
	refreshSequenceList()
	renderDefaultFeedback()
end

local function renderStatusTags()
	clearContent(tagGridFrame)
	tagGrid.Parent = nil
	tagGrid.Parent = tagGridFrame

	for index, tagText in ipairs(currentScenario.victimStatusTags or {}) do
		local tag = make("TextLabel", {
			BackgroundColor3 = COLORS.panelSoft,
			Font = Enum.Font.GothamSemibold,
			LayoutOrder = index,
			Size = UDim2.new(0, 170, 0, 30),
			Text = tagText,
			TextColor3 = COLORS.text,
			TextSize = 13,
			TextWrapped = true,
		}, tagGridFrame)
		addCorner(tag, 999)
		addStroke(tag, COLORS.border, 0.35)
	end
end

local function loadScenario(index)
	currentScenario = scenarioOrder[index]

	scenarioMetaLabel.Text = string.format(
		"Scenario %d of %d - %s",
		index,
		#scenarioOrder,
		currentScenario.category
	)
	scenarioTitleLabel.Text = currentScenario.title
	promptLabel.Text = currentScenario.prompt

	renderStatusTags()
	resetForScenario()
end

local function nextScenario()
	scenarioIndex = scenarioIndex + 1

	if scenarioIndex > #scenarioOrder then
		scenarioOrder = shuffleScenarios()
		scenarioIndex = 1
	end

	loadScenario(scenarioIndex)
end

local function retryScenario()
	resetForScenario()
end

local function clearSequence()
	selectedActionIds = {}
	scoreLabel.Text = "Score: not submitted"
	refreshSequenceList()
	renderDefaultFeedback()
end

local function submitSequence()
	if currentScenario == nil then
		return
	end

	local result = ScoringRules.scoreScenario(currentScenario, selectedActionIds)
	scoreLabel.Text = string.format("Score: %d/100 - %s", result.score, result.rating)
	renderFeedback(result)
end

local function addActionToSequence(actionId)
	if #selectedActionIds >= MAX_SELECTED_ACTIONS then
		clearContent(feedbackScroll)
		addFeedbackLine("Maximum sequence length reached. Submit, clear, or remove an action.", COLORS.warn)
		return
	end

	table.insert(selectedActionIds, actionId)
	scoreLabel.Text = "Score: not submitted"
	renderDefaultFeedback()
	refreshSequenceList()
end

local function buildActionButtons()
	for categoryIndex, category in ipairs(ActionDefinitions.CategoryOrder) do
		local section = make("Frame", {
			AutomaticSize = Enum.AutomaticSize.Y,
			BackgroundColor3 = COLORS.panelRaised,
			LayoutOrder = categoryIndex,
			Size = UDim2.new(1, -6, 0, 0),
		}, actionScroll)
		addCorner(section, 14)
		addPadding(section, 10, 10, 10, 10)

		make("UIListLayout", {
			FillDirection = Enum.FillDirection.Vertical,
			Padding = UDim.new(0, 8),
			SortOrder = Enum.SortOrder.LayoutOrder,
		}, section)

		createLabel(section, category, 16, COLORS.accent, Enum.Font.GothamBold, 1)

		for actionIndex, action in ipairs(ActionDefinitions.getActionsForCategory(category)) do
			local color = COLORS.panelSoft

			if category == "Common mistakes" then
				color = Color3.fromRGB(88, 47, 47)
			end

			local actionButton = createButton(section, action.label, color, actionIndex + 1)
			actionButton.MouseButton1Click:Connect(function()
				addActionToSequence(action.id)
			end)
		end
	end
end

submitButton.MouseButton1Click:Connect(submitSequence)
clearButton.MouseButton1Click:Connect(clearSequence)
retryButton.MouseButton1Click:Connect(retryScenario)
nextButton.MouseButton1Click:Connect(nextScenario)

UserInputService.InputBegan:Connect(function(input, gameProcessed)
	if gameProcessed then
		return
	end

	if input.KeyCode == Enum.KeyCode.Return or input.KeyCode == Enum.KeyCode.KeypadEnter then
		submitSequence()
	elseif input.KeyCode == Enum.KeyCode.C then
		clearSequence()
	elseif input.KeyCode == Enum.KeyCode.R then
		retryScenario()
	elseif input.KeyCode == Enum.KeyCode.N then
		nextScenario()
	elseif input.KeyCode == Enum.KeyCode.Backspace then
		if #selectedActionIds > 0 then
			table.remove(selectedActionIds, #selectedActionIds)
			scoreLabel.Text = "Score: not submitted"
			renderDefaultFeedback()
			refreshSequenceList()
		end
	end
end)

buildActionButtons()
scenarioOrder = shuffleScenarios()
loadScenario(scenarioIndex)

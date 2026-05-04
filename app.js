(function () {
  "use strict";

  const data = window.POOL_DECK_DATA;
  const app = document.querySelector("#app");
  const startNote = "Based on our first aid practice cards.";

  const state = {
    mode: "practice",
    queue: [],
    scenarioIndex: 0,
    stageIndex: 0,
    selected: [],
    latestUpdate: "",
    hint: "",
    result: null,
    dragIndex: null,
    questionQueue: [],
    questionIndex: 0,
    questionScore: 0,
    selectedAnswerId: "",
  };

  const actionTypesThatAreTreatment = new Set(["treatment"]);

  function currentScenario() {
    return state.queue[state.scenarioIndex];
  }

  function currentStage() {
    return currentScenario().stages[state.stageIndex];
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function shuffle(items) {
    const copy = items.slice();

    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }

    return copy;
  }

  function actionLabel(actionId) {
    return data.actions[actionId]?.label || actionId;
  }

  function actionDetail(actionId) {
    return data.actions[actionId]?.detail || "";
  }

  function actionPositive(actionId) {
    return data.actions[actionId]?.positive || `${actionLabel(actionId)} was a useful choice.`;
  }

  function actionMissed(actionId) {
    return data.actions[actionId]?.missed || `You missed ${actionLabel(actionId)}.`;
  }

  function actionWarning(actionId) {
    return data.actions[actionId]?.warning || `${actionLabel(actionId)} was not a strong choice here.`;
  }

  function makeSet(values) {
    return new Set(values || []);
  }

  function selectedSet() {
    return makeSet(state.selected);
  }

  function indexByAction(actionIds) {
    const positions = new Map();

    actionIds.forEach((actionId, index) => {
      if (!positions.has(actionId)) {
        positions.set(actionId, index);
      }
    });

    return positions;
  }

  function uniqueLines(lines) {
    return [...new Set((lines || []).filter(Boolean))];
  }

  function listLines(lines, fallback) {
    const cleanLines = uniqueLines(lines);
    if (cleanLines.length === 0) {
      return fallback;
    }

    return cleanLines.map((line) => `- ${line}`).join("\n");
  }

  function resetScenario() {
    state.stageIndex = 0;
    state.selected = [];
    state.latestUpdate = "Choose your first action.";
    state.hint = "";
    state.result = null;
    state.dragIndex = null;
  }

  function startMode(mode) {
    state.mode = mode;
    state.questionQueue = [];
    state.questionIndex = 0;
    state.questionScore = 0;
    state.selectedAnswerId = "";
    state.queue = shuffle(data.scenarios);
    state.scenarioIndex = 0;
    resetScenario();
    render();
  }

  function startQuestionMode() {
    state.mode = "question";
    state.queue = [];
    state.questionQueue = shuffle(data.questions || []);
    state.questionIndex = 0;
    state.questionScore = 0;
    state.selectedAnswerId = "";
    render();
  }

  function nextScenario() {
    state.scenarioIndex += 1;

    if (state.scenarioIndex >= state.queue.length) {
      state.queue = shuffle(data.scenarios);
      state.scenarioIndex = 0;
    }

    resetScenario();
    render();
  }

  function addAction(actionId) {
    if (state.selected.includes(actionId)) {
      return;
    }

    state.selected.push(actionId);
    state.hint = "";

    if (state.mode === "practice") {
      state.latestUpdate = currentScenario().actionFeedback[actionId] || "Added. Keep building your order.";
    } else {
      state.latestUpdate = "Action added.";
    }

    render();
  }

  function removeAction(actionId) {
    state.selected = state.selected.filter((id) => id !== actionId);
    state.latestUpdate = "Removed one action. It is back in the available choices.";
    state.hint = "";
    render();
  }

  function clearOrder() {
    state.selected = [];
    state.latestUpdate = "Cleared. Choose your first action.";
    state.hint = "";
    render();
  }

  function moveAction(index, direction) {
    const nextIndex = index + direction;

    if (nextIndex < 0 || nextIndex >= state.selected.length) {
      return;
    }

    [state.selected[index], state.selected[nextIndex]] = [state.selected[nextIndex], state.selected[index]];
    state.latestUpdate = "Order updated.";
    render();
  }

  function reorderAction(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
      return;
    }

    if (fromIndex >= state.selected.length || toIndex >= state.selected.length) {
      return;
    }

    const [moved] = state.selected.splice(fromIndex, 1);
    state.selected.splice(toIndex, 0, moved);
    state.latestUpdate = "Order updated.";
    state.dragIndex = null;
    render();
  }

  function goBackStage() {
    if (state.stageIndex > 0) {
      state.stageIndex -= 1;
      state.hint = "";
      state.latestUpdate = "You can still edit your order.";
      render();
    }
  }

  function goNextStage() {
    const scenario = currentScenario();

    if (state.stageIndex < scenario.stages.length - 1) {
      state.stageIndex += 1;
      state.hint = "";
      state.latestUpdate =
        currentStage().id === "review" ? "Review your order before scoring." : "Choose what fits this stage.";
      render();
    }
  }

  function showHint() {
    const scenario = currentScenario();
    const stage = currentStage();
    state.hint = scenario.hints[stage.id] || "No hint for this stage.";
    render();
  }

  function firstTreatmentIndex(selected) {
    return selected.findIndex((actionId) => {
      const action = data.actions[actionId];
      return action && actionTypesThatAreTreatment.has(action.type);
    });
  }

  function evaluateOrderRule(rule, selected, positions) {
    const has = (actionId) => positions.has(actionId);
    const pos = (actionId) => positions.get(actionId);

    if (rule.type === "before") {
      if (has(rule.action) && has(rule.before) && pos(rule.action) > pos(rule.before)) {
        return rule.message;
      }
    }

    if (rule.type === "beforeAny") {
      const targetPositions = (rule.beforeAny || []).filter(has).map(pos);
      if (has(rule.action) && targetPositions.length > 0 && pos(rule.action) > Math.min(...targetPositions)) {
        return rule.message;
      }
    }

    if (rule.type === "early") {
      if (has(rule.action) && pos(rule.action) + 1 > rule.maxPosition) {
        return rule.message;
      }
    }

    if (rule.type === "oneOfBeforeTreatment") {
      const treatmentIndex = firstTreatmentIndex(selected);
      if (treatmentIndex !== -1) {
        const hasAssessmentBeforeTreatment = (rule.actions || []).some((actionId) => {
          return has(actionId) && pos(actionId) < treatmentIndex;
        });

        if (!hasAssessmentBeforeTreatment) {
          return rule.message;
        }
      }
    }

    if (rule.type === "requiresBefore") {
      if (has(rule.action)) {
        const actionPosition = pos(rule.action);
        const missingOrLate = (rule.requiredBefore || []).some((actionId) => {
          return !has(actionId) || pos(actionId) > actionPosition;
        });

        if (missingOrLate) {
          return rule.message;
        }
      }
    }

    if (rule.type === "selectedWithout") {
      if (has(rule.action)) {
        const hasRequiredContext = (rule.notWith || []).some(has);
        if (!hasRequiredContext) {
          return rule.message;
        }
      }
    }

    return "";
  }

  function scoreScenario(scenario, selected) {
    const selectedActionSet = makeSet(selected);
    const criticalSet = makeSet(scenario.criticalActions);
    const expectedSet = makeSet(scenario.expectedActions);
    const optionalSet = makeSet(scenario.optionalGoodActions);
    const weakSet = makeSet(scenario.weakActions);
    const dangerousSet = makeSet(scenario.dangerousActions);
    const positions = indexByAction(selected);
    const missedCriticalIds = [];
    const missedExpectedIds = [];
    const weakIds = [];
    const dangerousIds = [];
    const goodLines = [];
    const missedLines = [];
    const weakLines = [];
    const dangerousLines = [];
    const orderIssues = [];
    let score = 0;

    const criticalReward = scenario.criticalActions.length > 0 ? 42 / scenario.criticalActions.length : 0;
    scenario.criticalActions.forEach((actionId) => {
      if (selectedActionSet.has(actionId)) {
        score += criticalReward;
        goodLines.push(actionPositive(actionId));
      } else {
        missedCriticalIds.push(actionId);
        missedLines.push(actionMissed(actionId));
        score -= 9;
      }
    });

    const expectedReward = scenario.expectedActions.length > 0 ? 16 / scenario.expectedActions.length : 0;
    scenario.expectedActions.forEach((actionId) => {
      if (selectedActionSet.has(actionId)) {
        score += expectedReward;
        goodLines.push(actionPositive(actionId));
      } else {
        missedExpectedIds.push(actionId);
        missedLines.push(actionMissed(actionId));
        score -= 2.5;
      }
    });

    const contextualActions = scenario.contextualActions || [];
    contextualActions.forEach((item) => {
      if (selectedActionSet.has(item.action)) {
        score += item.reward || 2;
        goodLines.push(item.reason || actionPositive(item.action));
      } else if (item.required) {
        missedLines.push(item.missed || actionMissed(item.action));
        score -= item.missedPenalty || 4;
      }
    });

    const optionalReward = scenario.optionalGoodActions.length > 0 ? 8 / scenario.optionalGoodActions.length : 0;
    scenario.optionalGoodActions.forEach((actionId) => {
      if (selectedActionSet.has(actionId)) {
        score += optionalReward;
        goodLines.push(actionPositive(actionId));
      }
    });

    const treatmentTargets = scenario.recommendedSequence.filter((actionId) => {
      return data.actions[actionId] && actionTypesThatAreTreatment.has(data.actions[actionId].type);
    });
    const selectedTreatmentTargets = treatmentTargets.filter((actionId) => selectedActionSet.has(actionId));
    if (treatmentTargets.length > 0) {
      score += 8 * (selectedTreatmentTargets.length / treatmentTargets.length);
    }

    let correctOrderPairs = 0;
    const totalPairs = Math.max(0, scenario.recommendedSequence.length - 1);

    for (let index = 0; index < scenario.recommendedSequence.length - 1; index += 1) {
      const earlier = scenario.recommendedSequence[index];
      const later = scenario.recommendedSequence[index + 1];

      if (positions.has(earlier) && positions.has(later) && positions.get(earlier) < positions.get(later)) {
        correctOrderPairs += 1;
      }
    }

    if (totalPairs > 0) {
      score += 12 * (correctOrderPairs / totalPairs);
    }

    (scenario.orderRules || []).forEach((rule) => {
      const issue = evaluateOrderRule(rule, selected, positions);
      if (issue) {
        orderIssues.push(issue);
        score -= rule.penalty || 5;
      }
    });

    selected.forEach((actionId) => {
      if (weakSet.has(actionId)) {
        weakIds.push(actionId);
        weakLines.push(actionWarning(actionId));
        score -= 10;
      }

      if (dangerousSet.has(actionId)) {
        dangerousIds.push(actionId);
        dangerousLines.push(actionWarning(actionId));
        score -= 24;
      }
    });

    if (selected.length === 0) {
      score = 0;
      missedLines.push("You did not choose any actions.");
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    let label = "Needs review";
    if (dangerousIds.length > 0 || missedCriticalIds.length >= 2) {
      label = "Missed critical priority";
    } else if (score >= 86 && missedCriticalIds.length === 0 && weakIds.length === 0) {
      label = "Strong response";
    } else if (score >= 68 && missedCriticalIds.length <= 1) {
      label = "Good but incomplete";
    }

    return {
      score,
      label,
      goodLines: uniqueLines(goodLines),
      missedLines: uniqueLines(missedLines),
      missedCriticalIds,
      missedExpectedIds,
      weakIds: [...new Set(weakIds)],
      dangerousIds: [...new Set(dangerousIds)],
      weakLines: uniqueLines(weakLines),
      dangerousLines: uniqueLines(dangerousLines),
      orderIssues: uniqueLines(orderIssues),
    };
  }

  function submitScenario() {
    state.result = scoreScenario(currentScenario(), state.selected);
    render();
  }

  function currentQuestion() {
    return state.questionQueue[state.questionIndex];
  }

  function answerQuestion(answerId) {
    if (state.selectedAnswerId) {
      return;
    }

    state.selectedAnswerId = answerId;
    const answer = currentQuestion().choices.find((choice) => choice.id === answerId);
    if (answer && answer.correct) {
      state.questionScore += 1;
    }
    render();
  }

  function nextQuestion() {
    if (state.questionIndex < state.questionQueue.length - 1) {
      state.questionIndex += 1;
      state.selectedAnswerId = "";
    } else {
      state.questionQueue = shuffle(data.questions || []);
      state.questionIndex = 0;
      state.questionScore = 0;
      state.selectedAnswerId = "";
    }
    render();
  }

  function renderStart() {
    app.innerHTML = `
      <section class="card start-card">
        <p class="eyebrow">class practice</p>
        <h1>Pool Deck Response</h1>
        <p class="start-subtitle">Quick first aid scenario practice</p>
        <p class="note">${escapeHtml(startNote)}</p>
        <div class="mode-actions">
          <button class="btn primary" type="button" data-start-mode="practice">Practice Mode</button>
          <button class="btn ghost" type="button" data-start-mode="test">Test Mode</button>
          <button class="btn ghost mode-wide" type="button" data-start-mode="question">Question Mode</button>
        </div>
      </section>
    `;
  }

  function renderOrderList() {
    if (state.selected.length === 0) {
      return `<p class="empty-order">No actions yet. Pick one from this stage.</p>`;
    }

    return state.selected
      .map((actionId, index) => {
        return `
          <button class="btn order-item" type="button" data-remove-action="${escapeHtml(actionId)}">
            ${index + 1}. ${escapeHtml(actionLabel(actionId))}
          </button>
        `;
      })
      .join("");
  }

  function renderStageDots(scenario) {
    return scenario.stages
      .map((stage, index) => {
        const className = index === state.stageIndex ? "active" : index < state.stageIndex ? "done" : "";
        return `<span class="stage-dot ${className}" aria-label="${escapeHtml(stage.title)}"></span>`;
      })
      .join("");
  }

  function renderChoices(stage) {
    const chosen = selectedSet();
    const choices = stage.choices.filter((actionId) => !chosen.has(actionId));

    if (choices.length === 0) {
      return `<p class="no-choices">No choices left in this stage. Continue when you are ready.</p>`;
    }

    return `
      <div class="choice-list">
        ${choices
          .map((actionId) => {
            const action = data.actions[actionId];
            const qualityClass =
              action.quality === "danger" ? "danger-choice" : action.quality === "weak" ? "weak-choice" : "";

            return `
              <button class="btn choice ${qualityClass}" type="button" data-add-action="${escapeHtml(actionId)}">
                <span>${escapeHtml(action.label)}<small>${escapeHtml(action.detail)}</small></span>
              </button>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderStageCard(stage, scenario, stageCount) {
    const canHint = state.mode === "practice";

    return `
      <section class="stage-panel">
        <p class="stage-kicker">Stage ${state.stageIndex + 1} of ${stageCount}</p>
        <h2 class="stage-title">${escapeHtml(stage.title)}</h2>
        <p class="stage-help">${escapeHtml(stage.help)}</p>
        <p class="current-question">What do you do next?</p>
        <div class="stage-dots" aria-hidden="true">${renderStageDots(scenario)}</div>
        ${state.latestUpdate ? `<p class="update-line">${escapeHtml(state.latestUpdate)}</p>` : ""}
        ${state.hint ? `<p class="hint-line">${escapeHtml(state.hint)}</p>` : ""}
        ${canHint ? `<button class="btn ghost" type="button" data-show-hint="true">Hint</button>` : ""}
        ${renderChoices(stage)}
      </section>
    `;
  }

  function renderQuiz() {
    const scenario = currentScenario();
    const stage = currentStage();
    const stageCount = scenario.stages.length;
    const scenarioProgress = ((state.scenarioIndex + 1) / state.queue.length) * 100;

    if (stage.id === "review") {
      renderReview();
      return;
    }

    app.innerHTML = `
      <section class="card quiz-card">
        <div class="top-row">
          <div class="progress-line">
            <span>${state.mode === "practice" ? "Practice" : "Test"} Mode</span>
            <span>Scenario ${state.scenarioIndex + 1} of ${state.queue.length}</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width: ${scenarioProgress}%"></div>
          </div>
        </div>

        <div class="play-area">
          <div class="left-stack">
            <section class="scenario-panel">
              <h2 class="scenario-title">${escapeHtml(scenario.title)}</h2>
              <p class="scenario-prompt">${escapeHtml(scenario.prompt)}</p>
            </section>

            <section class="order-panel">
              <div class="order-head">
                <h3>Your order</h3>
                <span>${state.selected.length} selected</span>
              </div>
              <div class="order-list">${renderOrderList()}</div>
            </section>
          </div>

          <div class="right-stack">
            ${renderStageCard(stage, scenario, stageCount)}
          </div>
        </div>

        <div class="control-bar">
          <button class="btn ghost" type="button" data-clear="true">Clear</button>
          <button class="btn ghost" type="button" data-back-stage="true" ${state.stageIndex === 0 ? "disabled" : ""}>Back</button>
          <button class="btn primary" type="button" data-next-stage="true">Continue</button>
        </div>
      </section>
    `;
  }

  function renderReviewOrderList() {
    if (state.selected.length === 0) {
      return `<p class="empty-order">No actions selected yet. Go back and choose your response.</p>`;
    }

    return state.selected
      .map((actionId, index) => {
        return `
          <article class="review-order-item" draggable="true" data-review-index="${index}">
            <div class="drag-handle" aria-hidden="true">::</div>
            <div class="review-order-copy">
              <strong>${index + 1}. ${escapeHtml(actionLabel(actionId))}</strong>
              <span>${escapeHtml(actionDetail(actionId))}</span>
            </div>
            <div class="review-order-controls" aria-label="Reorder ${escapeHtml(actionLabel(actionId))}">
              <button class="mini-btn" type="button" data-move-index="${index}" data-move-dir="-1" ${
                index === 0 ? "disabled" : ""
              }>Up</button>
              <button class="mini-btn" type="button" data-move-index="${index}" data-move-dir="1" ${
                index === state.selected.length - 1 ? "disabled" : ""
              }>Down</button>
              <button class="mini-btn danger-mini" type="button" data-remove-action="${escapeHtml(actionId)}">Remove</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderReview() {
    const scenario = currentScenario();
    const scenarioProgress = ((state.scenarioIndex + 1) / state.queue.length) * 100;

    app.innerHTML = `
      <section class="card review-card">
        <div class="top-row">
          <div class="progress-line">
            <span>${state.mode === "practice" ? "Practice" : "Test"} Mode</span>
            <span>Scenario ${state.scenarioIndex + 1} of ${state.queue.length}</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width: ${scenarioProgress}%"></div>
          </div>
        </div>

        <section class="scenario-panel compact-scenario">
          <p class="stage-kicker">Review / Submit</p>
          <h2 class="scenario-title">${escapeHtml(scenario.title)}</h2>
          <p class="scenario-prompt">Drag actions to reorder on desktop. On phone, use Up, Down, and Remove.</p>
          <div class="stage-dots" aria-hidden="true">${renderStageDots(scenario)}</div>
          ${state.latestUpdate ? `<p class="update-line">${escapeHtml(state.latestUpdate)}</p>` : ""}
        </section>

        <section class="review-panel">
          <div class="order-head">
            <h3>Review your order</h3>
            <span>${state.selected.length} selected</span>
          </div>
          <div class="review-order-list">${renderReviewOrderList()}</div>
        </section>

        <div class="control-bar review-control-bar">
          <button class="btn ghost" type="button" data-back-stage="true">Back</button>
          <button class="btn ghost" type="button" data-clear="true">Clear</button>
          <button class="btn primary" type="button" data-submit="true">Submit</button>
        </div>
      </section>
    `;
  }

  function scoreClass(score, dangerousCount) {
    if (dangerousCount > 0 || score < 65) {
      return "danger";
    }

    if (score >= 85) {
      return "good";
    }

    return "warn";
  }

  function renderResult() {
    const scenario = currentScenario();
    const result = state.result;

    app.innerHTML = `
      <section class="card result-card">
        <div class="score-lockup">
          <p class="eyebrow">Scenario ${state.scenarioIndex + 1} of ${state.queue.length}</p>
          <div class="score ${scoreClass(result.score, result.dangerousIds.length)}">${result.score}</div>
          <h1 class="result-label">${escapeHtml(result.label)}</h1>
        </div>

        <div class="result-grid">
          <section class="result-section">
            <h3>What you did well</h3>
            <p>${escapeHtml(listLines(result.goodLines, "Nothing strong was scored yet. Try again and build from the basics."))}</p>
          </section>

          <section class="result-section">
            <h3>What you missed</h3>
            <p>${escapeHtml(listLines(result.missedLines, "No critical or expected misses flagged."))}</p>
          </section>

          <section class="result-section">
            <h3>Weak/incomplete choices</h3>
            <p>${escapeHtml(listLines(result.weakLines, "None flagged."))}</p>
          </section>

          <section class="result-section">
            <h3>Dangerous choices</h3>
            <p>${escapeHtml(listLines(result.dangerousLines, "None flagged."))}</p>
          </section>

          <section class="result-section">
            <h3>Order issues</h3>
            <p>${escapeHtml(listLines(result.orderIssues, "No major order issues flagged."))}</p>
          </section>

          <section class="result-section">
            <h3>Instructor review note</h3>
            <p>${escapeHtml(scenario.instructorReviewNotes || "Ask our instructor if something is different.")}</p>
          </section>

          <section class="result-section suggested">
            <h3>Suggested response order</h3>
            <p class="suggested-order">${escapeHtml(scenario.suggestedOrderText)}</p>
          </section>
        </div>

        <div class="result-actions">
          <button class="btn ghost" type="button" data-retry="true">Retry</button>
          <button class="btn primary" type="button" data-next-scenario="true">Next scenario</button>
        </div>
      </section>
    `;
  }

  function renderQuestionMode() {
    const question = currentQuestion();
    const selectedAnswer = question.choices.find((choice) => choice.id === state.selectedAnswerId);
    const correctAnswer = question.choices.find((choice) => choice.correct);
    const answered = Boolean(state.selectedAnswerId);
    const sourceTitle = question.sourceCardTitle || question.topic || "Practice card";
    const relatedTags = question.topicTags || question.relatedTags || [];
    const miniCase = question.miniCase || question.prompt || "";
    const questionText = question.question || "";

    app.innerHTML = `
      <section class="card question-card">
        <div class="top-row">
          <div class="progress-line">
            <span>Question Mode</span>
            <span>${state.questionScore}/${answered ? state.questionIndex + 1 : state.questionIndex} correct</span>
          </div>
          <div class="progress-track" aria-hidden="true">
            <div class="progress-fill" style="width: ${((state.questionIndex + 1) / state.questionQueue.length) * 100}%"></div>
          </div>
        </div>

        <section class="scenario-panel compact-scenario">
          <p class="stage-kicker">Question ${state.questionIndex + 1} of ${state.questionQueue.length} - ${escapeHtml(sourceTitle)}</p>
          <h2 class="scenario-title">${escapeHtml(miniCase)}</h2>
          ${questionText ? `<p class="scenario-prompt">${escapeHtml(questionText)}</p>` : ""}
        </section>

        <section class="stage-panel">
          <div class="choice-list question-choices">
            ${question.choices
              .map((choice) => {
                const isSelected = choice.id === state.selectedAnswerId;
                const isCorrect = Boolean(choice.correct);
                const className = answered
                  ? isCorrect
                    ? "correct-choice"
                    : isSelected
                      ? "wrong-choice"
                      : ""
                  : "";

                return `
                  <button class="btn choice question-choice ${className}" type="button" data-answer-id="${escapeHtml(choice.id)}" ${
                    answered ? "disabled" : ""
                  }>
                    <span>${escapeHtml(choice.text)}</span>
                  </button>
                `;
              })
              .join("")}
          </div>

          ${
            answered
              ? `
                <div class="question-explain">
                  <h3>${selectedAnswer?.correct ? "Correct" : "Correct answer"}</h3>
                  <p><strong>${escapeHtml(correctAnswer.text)}</strong></p>
                  <p>${escapeHtml(correctAnswer.explanation)}</p>
                  <h3>Why the others are wrong</h3>
                  ${question.choices
                    .filter((choice) => !choice.correct)
                    .map((choice) => `<p><strong>${escapeHtml(choice.text)}</strong><br>${escapeHtml(choice.explanation)}</p>`)
                    .join("")}
                  <p class="tiny">Source: ${escapeHtml(sourceTitle)} | Related: ${escapeHtml(relatedTags.join(", "))}</p>
                </div>
              `
              : ""
          }
        </section>

        <div class="control-bar question-control-bar">
          <button class="btn ghost" type="button" data-start-over="true">Start screen</button>
          <button class="btn primary" type="button" data-next-question="true" ${answered ? "" : "disabled"}>Next Question</button>
        </div>
      </section>
    `;
  }

  function render() {
    if (state.queue.length === 0) {
      if (state.mode === "question" && state.questionQueue.length > 0) {
        renderQuestionMode();
        return;
      }
      renderStart();
      return;
    }

    if (state.result) {
      renderResult();
      return;
    }

    renderQuiz();
  }

  app.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.disabled) {
      return;
    }

    if (button.dataset.startMode) {
      if (button.dataset.startMode === "question") {
        startQuestionMode();
      } else {
        startMode(button.dataset.startMode);
      }
    } else if (button.dataset.answerId) {
      answerQuestion(button.dataset.answerId);
    } else if (button.dataset.nextQuestion) {
      nextQuestion();
    } else if (button.dataset.startOver) {
      state.mode = "practice";
      state.queue = [];
      state.questionQueue = [];
      state.result = null;
      render();
    } else if (button.dataset.addAction) {
      addAction(button.dataset.addAction);
    } else if (button.dataset.removeAction) {
      removeAction(button.dataset.removeAction);
    } else if (button.dataset.moveIndex) {
      moveAction(Number(button.dataset.moveIndex), Number(button.dataset.moveDir));
    } else if (button.dataset.clear) {
      clearOrder();
    } else if (button.dataset.backStage) {
      goBackStage();
    } else if (button.dataset.nextStage) {
      goNextStage();
    } else if (button.dataset.showHint) {
      showHint();
    } else if (button.dataset.submit) {
      submitScenario();
    } else if (button.dataset.retry) {
      resetScenario();
      render();
    } else if (button.dataset.nextScenario) {
      nextScenario();
    }
  });

  app.addEventListener("dragstart", (event) => {
    const row = event.target.closest("[data-review-index]");
    if (!row) {
      return;
    }

    state.dragIndex = Number(row.dataset.reviewIndex);
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(state.dragIndex));
    row.classList.add("dragging");
  });

  app.addEventListener("dragend", (event) => {
    const row = event.target.closest("[data-review-index]");
    if (row) {
      row.classList.remove("dragging");
    }
    state.dragIndex = null;
  });

  app.addEventListener("dragover", (event) => {
    if (event.target.closest("[data-review-index]")) {
      event.preventDefault();
    }
  });

  app.addEventListener("drop", (event) => {
    const row = event.target.closest("[data-review-index]");
    if (!row) {
      return;
    }

    event.preventDefault();
    const fromIndex = state.dragIndex ?? Number(event.dataTransfer.getData("text/plain"));
    const toIndex = Number(row.dataset.reviewIndex);
    reorderAction(fromIndex, toIndex);
  });

  render();
})();

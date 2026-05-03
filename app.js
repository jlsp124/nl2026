(function () {
  "use strict";

  const data = window.POOL_DECK_DATA;
  const app = document.querySelector("#app");
  const startNote = "I didn’t have the flashcards so I just got GPT to make scenarios.";

  const state = {
    mode: "practice",
    queue: [],
    scenarioIndex: 0,
    stageIndex: 0,
    selected: [],
    latestUpdate: "",
    hint: "",
    result: null,
  };

  const actionTypesThatAreTreatment = new Set(["treatment"]);
  const earlyAssessmentActions = new Set([
    "scene_safety",
    "ppe_barriers",
    "check_responsiveness",
    "check_airway_breathing",
    "check_severe_bleeding",
    "check_circulation_life_threats",
  ]);

  function currentScenario() {
    return state.queue[state.scenarioIndex];
  }

  function currentStage() {
    const scenario = currentScenario();
    return scenario.stages[state.stageIndex];
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

  function makeSet(values) {
    return new Set(values || []);
  }

  function selectedSet() {
    return makeSet(state.selected);
  }

  function listLabels(actionIds, fallback) {
    if (!actionIds || actionIds.length === 0) {
      return fallback;
    }

    return actionIds.map((id) => `- ${actionLabel(id)}`).join("\n");
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

  function startMode(mode) {
    state.mode = mode;
    state.queue = shuffle(data.scenarios);
    state.scenarioIndex = 0;
    resetScenario();
    render();
  }

  function resetScenario() {
    state.stageIndex = 0;
    state.selected = [];
    state.latestUpdate = "Choose your first action.";
    state.hint = "";
    state.result = null;
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
    state.latestUpdate = "Removed one action. Keep building your order.";
    state.hint = "";
    render();
  }

  function goBackStage() {
    if (state.stageIndex > 0) {
      state.stageIndex -= 1;
      state.hint = "";
      render();
    }
  }

  function goNextStage() {
    const scenario = currentScenario();

    if (state.stageIndex < scenario.stages.length - 1) {
      state.stageIndex += 1;
      state.hint = "";
      state.latestUpdate = currentStage().id === "submit" ? "Review your order, then submit." : "Choose what fits this stage.";
      render();
    }
  }

  function showHint() {
    const scenario = currentScenario();
    const stage = currentStage();
    state.hint = scenario.hints[stage.id] || "No hint for this stage.";
    render();
  }

  function scoreScenario(scenario, selected) {
    const selectedActionSet = makeSet(selected);
    const criticalSet = makeSet(scenario.criticalActions);
    const optionalSet = makeSet(scenario.optionalGoodActions);
    const weakSet = makeSet(scenario.weakActions);
    const dangerousSet = makeSet(scenario.dangerousActions);
    const positions = indexByAction(selected);
    const missedCriticalIds = [];
    const weakIds = [];
    const dangerousIds = [];
    const goodIds = [];
    const orderIssues = [];
    let score = 0;

    const criticalReward = scenario.criticalActions.length > 0 ? 50 / scenario.criticalActions.length : 0;
    scenario.criticalActions.forEach((actionId) => {
      if (selectedActionSet.has(actionId)) {
        score += criticalReward;
      } else {
        missedCriticalIds.push(actionId);
        score -= 8;
      }
    });

    const optionalReward = scenario.optionalGoodActions.length > 0 ? 10 / scenario.optionalGoodActions.length : 0;
    scenario.optionalGoodActions.forEach((actionId) => {
      if (selectedActionSet.has(actionId)) {
        score += optionalReward;
      }
    });

    scenario.recommendedSequence.forEach((actionId) => {
      if (
        selectedActionSet.has(actionId) &&
        !weakSet.has(actionId) &&
        !dangerousSet.has(actionId) &&
        (criticalSet.has(actionId) || optionalSet.has(actionId))
      ) {
        goodIds.push(actionId);
      }
    });

    const treatmentTargets = scenario.recommendedSequence.filter((actionId) => {
      return data.actions[actionId] && actionTypesThatAreTreatment.has(data.actions[actionId].type);
    });
    const selectedTreatmentTargets = treatmentTargets.filter((actionId) => selectedActionSet.has(actionId));
    if (treatmentTargets.length > 0) {
      score += 15 * (selectedTreatmentTargets.length / treatmentTargets.length);
    }

    let correctOrderPairs = 0;
    const totalPairs = Math.max(0, scenario.recommendedSequence.length - 1);

    for (let index = 0; index < scenario.recommendedSequence.length - 1; index += 1) {
      const earlier = scenario.recommendedSequence[index];
      const later = scenario.recommendedSequence[index + 1];

      if (positions.has(earlier) && positions.has(later)) {
        if (positions.get(earlier) < positions.get(later)) {
          correctOrderPairs += 1;
        } else {
          orderIssues.push(`${actionLabel(earlier)} should come before ${actionLabel(later)}.`);
          score -= 6;
        }
      }
    }

    if (totalPairs > 0) {
      score += 25 * (correctOrderPairs / totalPairs);
    }

    if (selected.length > 0 && selected[0] !== "scene_safety") {
      orderIssues.push("Start with scene safety before getting hands-on.");
      score -= 8;
    }

    const firstTreatmentIndex = selected.findIndex((actionId) => {
      const action = data.actions[actionId];
      return action && actionTypesThatAreTreatment.has(action.type);
    });
    const hasEarlyAssessmentBeforeTreatment =
      firstTreatmentIndex === -1 ||
      selected.slice(0, firstTreatmentIndex).some((actionId) => earlyAssessmentActions.has(actionId));

    if (!hasEarlyAssessmentBeforeTreatment) {
      orderIssues.push("You treated before doing basic assessment checks.");
      score -= 10;
    }

    selected.forEach((actionId) => {
      if (weakSet.has(actionId)) {
        weakIds.push(actionId);
        score -= 10;
      }

      if (dangerousSet.has(actionId)) {
        dangerousIds.push(actionId);
        score -= 25;
      }
    });

    score = Math.max(0, Math.min(100, Math.round(score)));

    let label = "Needs review";
    if (dangerousIds.length > 0 || missedCriticalIds.length >= 2) {
      label = "Missed critical priority";
    } else if (score >= 85 && missedCriticalIds.length === 0 && weakIds.length === 0) {
      label = "Strong response";
    } else if (score >= 68 && missedCriticalIds.length <= 1) {
      label = "Good but incomplete";
    }

    return {
      score,
      label,
      goodIds: [...new Set(goodIds)],
      missedCriticalIds,
      weakIds: [...new Set(weakIds)],
      dangerousIds: [...new Set(dangerousIds)],
      orderIssues,
    };
  }

  function submitScenario() {
    state.result = scoreScenario(currentScenario(), state.selected);
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

    if (stage.id === "submit") {
      return `<p class="no-choices">No more stages. Submit when you are ready, or go back to change the order.</p>`;
    }

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

  function renderQuiz() {
    const scenario = currentScenario();
    const stage = currentStage();
    const stageCount = scenario.stages.length;
    const scenarioProgress = ((state.scenarioIndex + 1) / state.queue.length) * 100;
    const isSubmit = stage.id === "submit";
    const canHint = state.mode === "practice" && !isSubmit;

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
            <section class="stage-panel">
              <p class="stage-kicker">Stage ${state.stageIndex + 1} of ${stageCount}</p>
              <h2 class="stage-title">${escapeHtml(stage.title)}</h2>
              <p class="stage-help">${escapeHtml(stage.help)}</p>
              <div class="stage-dots" aria-hidden="true">${renderStageDots(scenario)}</div>
              ${
                state.latestUpdate
                  ? `<p class="update-line">${escapeHtml(state.latestUpdate)}</p>`
                  : ""
              }
              ${state.hint ? `<p class="hint-line">${escapeHtml(state.hint)}</p>` : ""}
              ${canHint ? `<button class="btn ghost" type="button" data-show-hint="true">Hint</button>` : ""}
              ${renderChoices(stage)}
            </section>
          </div>
        </div>

        <div class="control-bar">
          <button class="btn ghost" type="button" data-clear="true">Clear</button>
          <button class="btn ghost" type="button" data-back-stage="true" ${state.stageIndex === 0 ? "disabled" : ""}>Back</button>
          ${
            isSubmit
              ? `<button class="btn primary" type="button" data-submit="true">Submit</button>`
              : `<button class="btn primary" type="button" data-next-stage="true">Continue</button>`
          }
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
            <p>${escapeHtml(listLabels(result.goodIds, "Nothing strong was scored yet. Try again and build from the basics."))}</p>
          </section>

          <section class="result-section">
            <h3>What you missed</h3>
            <p>${escapeHtml(
              [
                listLabels(result.missedCriticalIds, ""),
                result.orderIssues.map((issue) => `- ${issue}`).join("\n"),
              ]
                .filter(Boolean)
                .join("\n") || "No critical misses flagged."
            )}</p>
          </section>

          <section class="result-section">
            <h3>Weak/incomplete choices</h3>
            <p>${escapeHtml(listLabels(result.weakIds, "None flagged."))}</p>
          </section>

          <section class="result-section">
            <h3>Dangerous choices</h3>
            <p>${escapeHtml(listLabels(result.dangerousIds, "None flagged."))}</p>
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

  function render() {
    if (state.queue.length === 0) {
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
    if (!button) {
      return;
    }

    if (button.disabled) {
      return;
    }

    if (button.dataset.startMode) {
      startMode(button.dataset.startMode);
    } else if (button.dataset.addAction) {
      addAction(button.dataset.addAction);
    } else if (button.dataset.removeAction) {
      removeAction(button.dataset.removeAction);
    } else if (button.dataset.clear) {
      state.selected = [];
      state.latestUpdate = "Cleared. Choose your first action.";
      state.hint = "";
      render();
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

  render();
})();

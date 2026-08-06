import { AssessmentDomain, ItemTelemetry, StudentSessionTelemetry } from '../engine/telemetrySchema';
import { ActivityGenerator, ActivityItem } from '../ai/activityGenerator';
import { ScoringEngine, DOMAIN_CONFIG } from '../engine/scoringEngine';
import { PlacementEngine, PlacementResult } from '../engine/placementEngine';
import { QualitativeAnalyzer } from '../ai/qualitativeAnalyzer';
import { renderReportDashboard } from './ReportDashboard';

interface AssessmentQuestionPlan {
  domain: AssessmentDomain;
  questionIndex: number; // 1 to 20
  questionIndexInDomain: number; // 1 to N
  totalInDomain: number;
}

interface StoredUserAnswer {
  selectedAnswerIndex: number | null;
  robotSequence: string[];
  ruleShiftPhase: number;
  motorClicks: { x: number; y: number; dist: number }[];
  attemptsCount: number;
  hintsUsed: number;
  timeSpentMs: number;
  isSolved: boolean;
}

export class AssessmentRunner {
  private container: HTMLElement;
  private generator: ActivityGenerator;
  private analyzer: QualitativeAnalyzer;

  // 20-Question Plan & Cached Activities
  private questionPlan: AssessmentQuestionPlan[] = [];
  private cachedActivities: (ActivityItem | null)[] = new Array(20).fill(null);
  private userAnswers: StoredUserAnswer[] = [];
  private currentQuestionIndex: number = 0; // 0 to 19

  // Timers & Active State
  private itemStartTime: number = 0;
  private totalTimerSeconds: number = 0;
  private timerInterval: any = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.generator = new ActivityGenerator();
    this.analyzer = new QualitativeAnalyzer();
    this.build20QuestionPlan();
    this.initUserAnswers();
  }

  private build20QuestionPlan() {
    this.questionPlan = [];
    let qIdx = 1;

    // 1. Cognitive (5 Qs: 1-5)
    for (let i = 1; i <= 5; i++) {
      this.questionPlan.push({ domain: 'cognitive_ability', questionIndex: qIdx++, questionIndexInDomain: i, totalInDomain: 5 });
    }
    // 2. Functional (5 Qs: 6-10)
    for (let i = 1; i <= 5; i++) {
      this.questionPlan.push({ domain: 'functional_skills', questionIndex: qIdx++, questionIndexInDomain: i, totalInDomain: 5 });
    }
    // 3. Communication (4 Qs: 11-14)
    for (let i = 1; i <= 4; i++) {
      this.questionPlan.push({ domain: 'communication_level', questionIndex: qIdx++, questionIndexInDomain: i, totalInDomain: 4 });
    }
    // 4. Behavioral (3 Qs: 15-17)
    for (let i = 1; i <= 3; i++) {
      this.questionPlan.push({ domain: 'behavioral_readiness', questionIndex: qIdx++, questionIndexInDomain: i, totalInDomain: 3 });
    }
    // 5. Fine Motor (3 Qs: 18-20)
    for (let i = 1; i <= 3; i++) {
      this.questionPlan.push({ domain: 'fine_motor_technology', questionIndex: qIdx++, questionIndexInDomain: i, totalInDomain: 3 });
    }
  }

  private initUserAnswers() {
    this.userAnswers = new Array(20).fill(null).map(() => ({
      selectedAnswerIndex: null,
      robotSequence: [],
      ruleShiftPhase: 1,
      motorClicks: [],
      attemptsCount: 0,
      hintsUsed: 0,
      timeSpentMs: 0,
      isSolved: false
    }));
  }

  public async startSession(studentName: string = 'Alex Rivers') {
    this.currentQuestionIndex = 0;
    this.cachedActivities = new Array(20).fill(null);
    this.initUserAnswers();
    this.startGlobalTimer();
    await this.loadQuestion(0);
  }

  private startGlobalTimer() {
    this.totalTimerSeconds = 0;
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.totalTimerSeconds++;
      const timerEl = document.getElementById('global-timer');
      if (timerEl) {
        const mins = String(Math.floor(this.totalTimerSeconds / 60)).padStart(2, '0');
        const secs = String(this.totalTimerSeconds % 60).padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
      }
    }, 1000);
  }

  private async loadQuestion(targetIndex: number) {
    if (targetIndex < 0 || targetIndex >= 20) return;

    // Save time spent on current question before switching
    if (this.itemStartTime > 0 && this.userAnswers[this.currentQuestionIndex]) {
      this.userAnswers[this.currentQuestionIndex].timeSpentMs += (Date.now() - this.itemStartTime);
    }

    this.currentQuestionIndex = targetIndex;
    const plan = this.questionPlan[targetIndex];

    // Render loading state if question is not yet cached
    if (!this.cachedActivities[targetIndex]) {
      this.renderLoadingState(targetIndex);
      const difficulty = Math.min(5, Math.max(1, plan.questionIndexInDomain));
      this.cachedActivities[targetIndex] = await this.generator.generateActivity(plan.domain, difficulty, plan.questionIndex);
    }

    this.itemStartTime = Date.now();
    this.render();

    // Pre-fetch next question in background for instant transition
    this.prefetchNextQuestion(targetIndex + 1);
  }

  private renderLoadingState(targetIndex: number) {
    const plan = this.questionPlan[targetIndex];
    const domainConfig = DOMAIN_CONFIG[plan.domain];

    const playground = this.container.querySelector('#playground-area');
    if (playground) {
      playground.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--accent-cyan);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.2s infinite ease-in-out;">⚡</div>
          <h3 style="font-size: 1.2rem; font-weight: 700;">Loading AI Question ${plan.questionIndex} of 20...</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">Generating custom ${domainConfig.name} activity...</p>
        </div>
      `;
    }
  }

  private async prefetchNextQuestion(nextIndex: number) {
    if (nextIndex >= 0 && nextIndex < 20 && !this.cachedActivities[nextIndex]) {
      const plan = this.questionPlan[nextIndex];
      const difficulty = Math.min(5, Math.max(1, plan.questionIndexInDomain));
      this.generator.generateActivity(plan.domain, difficulty, plan.questionIndex).then(activity => {
        this.cachedActivities[nextIndex] = activity;
      }).catch(() => {});
    }
  }

  private render() {
    const activity = this.cachedActivities[this.currentQuestionIndex];
    if (!activity) return;

    const currentPlan = this.questionPlan[this.currentQuestionIndex];
    const domainConfig = DOMAIN_CONFIG[currentPlan.domain];
    const answerState = this.userAnswers[this.currentQuestionIndex];

    // 1. Render 5 Domain Header Stepper
    const domainsList: AssessmentDomain[] = [
      'cognitive_ability',
      'functional_skills',
      'communication_level',
      'behavioral_readiness',
      'fine_motor_technology'
    ];

    let stepperHtml = '<div class="domain-stepper">';
    domainsList.forEach((d) => {
      const cfg = DOMAIN_CONFIG[d];
      let stateClass = '';
      if (d === currentPlan.domain) {
        stateClass = 'active';
      } else {
        const domainIndices = this.questionPlan.filter(p => p.domain === d).map(p => p.questionIndex - 1);
        const solvedInDomain = domainIndices.filter(idx => this.userAnswers[idx].isSolved).length;
        if (solvedInDomain === domainIndices.length) {
          stateClass = 'completed';
        }
      }

      stepperHtml += `
        <div class="step-pill ${stateClass}">
          <div class="step-num">${cfg.questionCount} Qs (${cfg.maxScore} Pts)</div>
          <div class="step-name">${cfg.name}</div>
        </div>
      `;
    });
    stepperHtml += '</div>';

    // 2. Render 20-Question Visual Interactive Number Grid
    let questionGridHtml = `
      <div class="question-grid-bar">
        <div class="grid-header">
          <span><strong>20-Question Assessment Grid</strong> • Select any question number to review or edit</span>
          <span>Solved: <strong>${this.userAnswers.filter(a => a.isSolved).length}</strong> / 20</span>
        </div>
        <div class="question-numbers-container">
    `;

    for (let i = 0; i < 20; i++) {
      const isCurrent = i === this.currentQuestionIndex;
      const isSolved = this.userAnswers[i].isSolved;
      let pillClass = '';
      if (isCurrent) pillClass += ' active';
      if (isSolved) pillClass += ' solved';

      const label = isSolved ? `✓ ${i + 1}` : `${i + 1}`;
      questionGridHtml += `
        <button class="q-grid-pill ${pillClass}" data-qidx="${i}" title="Question ${i + 1} (${isSolved ? 'Solved' : 'Unanswered'})">
          ${label}
        </button>
      `;
    }

    questionGridHtml += `
        </div>
      </div>
    `;

    // 3. Render Current Question Card
    const isFirstQuestion = this.currentQuestionIndex === 0;
    const isLastQuestion = this.currentQuestionIndex === 19;
    const allSolved = this.userAnswers.every(a => a.isSolved);

    this.container.innerHTML = `
      ${stepperHtml}
      ${questionGridHtml}

      <div class="glass-card activity-card">
        <div class="activity-header">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="activity-domain-badge">${domainConfig.name}</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-cyan);">
              Question ${currentPlan.questionIndex} of 20 (Q${currentPlan.questionIndexInDomain}/${currentPlan.totalInDomain}) • 5.0 Pts
            </span>
          </div>
          <h2 class="activity-title">${activity.title}</h2>
          <p class="activity-instructions">${activity.instructions}</p>
        </div>

        <div class="interactive-playground" id="playground-area">
          ${this.renderPlaygroundContent(activity, answerState)}
        </div>

        <div id="hint-box" style="display:${answerState.hintsUsed > 0 ? 'block' : 'none'}; background: rgba(6,182,212,0.1); border: 1px solid var(--accent-cyan); padding: 0.75rem 1rem; border-radius: 8px; font-size: 0.9rem; margin-bottom: 1rem; color: var(--accent-cyan);">
          💡 <strong>Hint:</strong> ${activity.hintText}
        </div>

        <div class="activity-footer">
          <button class="btn btn-secondary" id="hint-btn">💡 Request Hint</button>

          <div class="nav-buttons-group">
            <button class="btn btn-secondary" id="prev-btn" ${isFirstQuestion ? 'disabled' : ''}>
              ⏮️ Previous
            </button>

            ${!isLastQuestion ? `
              <button class="btn btn-primary" id="next-btn">
                Next Question ⏭️
              </button>
            ` : ''}

            <button class="btn btn-primary" id="submit-assessment-btn" style="${allSolved || isLastQuestion ? 'background: linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan)); font-weight:800;' : ''}">
              🏁 Finish & Submit Assessment
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private renderPlaygroundContent(activity: ActivityItem, answerState: StoredUserAnswer): string {
    const payload = activity.payload || {};

    // 1. Robot Mission Blocks UI
    if (activity.type === 'robot_mission' || Array.isArray(payload.availableBlocks)) {
      const blocks: string[] = payload.availableBlocks || ['Move Forward', 'Turn Right', 'Pick Up Item'];
      return `
        <div class="robot-mission-container">
          <div>
            <h4 style="margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-secondary);">Available Blocks:</h4>
            <div class="blocks-palette">
              ${blocks.map((blk: string) => `
                <button class="code-block" data-block="${blk}">+ ${blk}</button>
              `).join('')}
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h4 style="font-size:0.9rem; color:var(--text-secondary); margin:0;">Program Sequence (${answerState.robotSequence.length} steps):</h4>
              ${answerState.robotSequence.length > 0 ? `
                <button id="clear-sequence-btn" style="font-size:0.75rem; color:var(--accent-amber); background:rgba(245,158,11,0.1); border:1px solid var(--accent-amber); padding:0.25rem 0.6rem; border-radius:6px; cursor:pointer;">🗑️ Clear All</button>
              ` : ''}
            </div>
            <div class="sequence-dropzone" id="sequence-box">
              ${answerState.robotSequence.length === 0
                ? '<span style="color:var(--text-secondary); font-size:0.85rem;">Click blocks on the left to build your sequence...</span>'
                : answerState.robotSequence.map((blk, i) => `
                <div class="sequence-step" style="background:var(--accent-blue); padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                  <span>📌 ${i + 1}. ${blk}</span>
                  <button class="remove-block-btn" data-idx="${i}" style="background:rgba(0,0,0,0.25); border:none; color:#fff; width:20px; height:20px; border-radius:50%; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;" title="Remove this step">×</button>
                </div>
              `).join('')
              }
            </div>
          </div>
        </div>
      `;
    }

    // 2. Picture Match Audio Prompt UI
    if (activity.type === 'picture_match' || payload.audioPromptText || payload.audio) {
      const audioPrompt = payload.audioPromptText || payload.audio || 'Select the matching item';
      const options: any[] = payload.options || [
        { label: 'Option A', emoji: '🛸' },
        { label: 'Option B', emoji: '🚲' }
      ];
      return `
        <div style="margin-bottom: 1.25rem; font-size:1.1rem; color:var(--accent-cyan); font-weight:600; text-align:center;">
          🔊 Audio Prompt: ${audioPrompt}
        </div>
        <div class="options-grid">
          ${options.map((opt: any, idx: number) => {
            const label = typeof opt === 'string' ? opt : (opt.label || `Option ${idx + 1}`);
            const emoji = typeof opt === 'object' && opt.emoji ? opt.emoji : '🎯';
            return `
              <button class="option-btn ${answerState.selectedAnswerIndex === idx ? 'selected' : ''}" data-opt="${idx}">
                <span style="font-size: 2rem;">${emoji}</span>
                <span style="font-size: 0.9rem;">${label}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    // 3. Rule Shift UI
    if (activity.type === 'rule_shift' || payload.initialRule || payload.shiftedRule) {
      const initialRule = payload.initialRule || 'Rule 1: Sort by Category';
      const shiftedRule = payload.shiftedRule || '⚡ Rule Shift! Sort by Priority';
      const currentRuleText = answerState.ruleShiftPhase === 1 ? initialRule : shiftedRule;
      const targetLabel = payload.itemsToSort?.[0]?.label || payload.targetItem || 'Target Item';

      return `
        <div style="width:100%; text-align:center;">
          <div style="background: rgba(245, 158, 11, 0.2); border: 1px solid var(--accent-amber); padding: 0.75rem; border-radius: 10px; margin-bottom: 1.25rem; font-weight:700; color:var(--accent-amber);">
            ⚡ Active Rule: ${currentRuleText}
          </div>
          <p style="margin-bottom: 1rem; color: var(--text-secondary);">Target Item to Sort: <strong>${targetLabel}</strong></p>
          <div class="options-grid">
            <button class="option-btn ${answerState.selectedAnswerIndex === 0 ? 'selected' : ''}" data-opt="0">Bucket A (Primary Category)</button>
            <button class="option-btn ${answerState.selectedAnswerIndex === 1 ? 'selected' : ''}" data-opt="1">Bucket B (Secondary Category)</button>
          </div>
        </div>
      `;
    }

    // 4. Fine Motor Canvas Target UI (only if domain is fine_motor_technology OR type is motor_target)
    if (activity.domain === 'fine_motor_technology' || activity.type === 'motor_target') {
      const targetsCount = payload.targetsCount || 4;
      return `
        <div class="motor-canvas-container" id="motor-canvas">
          <div class="motor-target" id="target-element" style="top: 80px; left: 240px;"></div>
          <div style="position:absolute; bottom:10px; left:15px; font-size:0.85rem; color:var(--text-secondary);">
            Target Clicks: ${answerState.motorClicks.length} / ${targetsCount}
          </div>
        </div>
      `;
    }

    // 5. Pattern Matrix / Multiple Choice / Number Series / Options Grid (Default for Cognitive & General Questions)
    const optionsList = Array.isArray(payload.options) ? payload.options : ['Option A', 'Option B', 'Option C', 'Option D'];
    const sequenceList = Array.isArray(payload.sequence) ? payload.sequence : null;

    return `
      ${sequenceList ? `
        <div style="font-size: 2.2rem; display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); padding: 1rem 1.5rem; border-radius: 12px; justify-content: center;">
          ${sequenceList.map((item: string) => `<span>${item}</span>`).join('')}
        </div>
      ` : ''}
      <div class="options-grid">
        ${optionsList.map((opt: any, idx: number) => {
          const labelText = typeof opt === 'string' ? opt : (opt.label || opt.text || JSON.stringify(opt));
          return `
            <button class="option-btn ${answerState.selectedAnswerIndex === idx ? 'selected' : ''}" data-opt="${idx}">
              <span>${labelText}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  private attachEventListeners() {
    const answerState = this.userAnswers[this.currentQuestionIndex];

    // Jump to specific Question on Pill click
    const qPills = this.container.querySelectorAll('.q-grid-pill');
    qPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const qIdx = parseInt(target.getAttribute('data-qidx') || '0', 10);
        this.loadQuestion(qIdx);
      });
    });

    // Options click
    const optionBtns = this.container.querySelectorAll('.option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const optIdx = parseInt(target.getAttribute('data-opt') || '0', 10);
        answerState.selectedAnswerIndex = optIdx;
        answerState.isSolved = true;
        answerState.attemptsCount = Math.max(1, answerState.attemptsCount + 1);

        if (this.cachedActivities[this.currentQuestionIndex]?.type === 'rule_shift' && answerState.ruleShiftPhase === 1) {
          answerState.ruleShiftPhase = 2;
        }

        this.render();
      });
    });

    // Robot Mission Code block click (add to sequence)
    const blockBtns = this.container.querySelectorAll('.code-block');
    blockBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const blockName = target.getAttribute('data-block');
        if (blockName) {
          answerState.robotSequence.push(blockName);
          answerState.isSolved = answerState.robotSequence.length > 0;
          answerState.attemptsCount = Math.max(1, answerState.attemptsCount + 1);
          this.render();
        }
      });
    });

    // Remove individual block from sequence
    const removeBtns = this.container.querySelectorAll('.remove-block-btn');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLElement;
        const idx = parseInt(target.getAttribute('data-idx') || '0', 10);
        answerState.robotSequence.splice(idx, 1);
        answerState.isSolved = answerState.robotSequence.length > 0;
        this.render();
      });
    });

    // Clear entire sequence
    const clearSeqBtn = this.container.querySelector('#clear-sequence-btn');
    if (clearSeqBtn) {
      clearSeqBtn.addEventListener('click', () => {
        answerState.robotSequence = [];
        answerState.isSolved = false;
        answerState.attemptsCount = 0;
        this.render();
      });
    }

    // Fine Motor Target click
    const targetEl = this.container.querySelector('#target-element');
    const canvasEl = this.container.querySelector('#motor-canvas');
    if (targetEl && canvasEl) {
      targetEl.addEventListener('click', (e: any) => {
        const rect = targetEl.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        const dist = Math.sqrt(Math.pow(clickX - rect.width / 2, 2) + Math.pow(clickY - rect.height / 2, 2));

        answerState.motorClicks.push({ x: clickX, y: clickY, dist });
        answerState.attemptsCount = Math.max(1, answerState.attemptsCount + 1);

        const canvasRect = canvasEl.getBoundingClientRect();
        const newTop = Math.floor(Math.random() * (canvasRect.height - 70));
        const newLeft = Math.floor(Math.random() * (canvasRect.width - 70));
        (targetEl as HTMLElement).style.top = `${newTop}px`;
        (targetEl as HTMLElement).style.left = `${newLeft}px`;

        const requiredCount = this.cachedActivities[this.currentQuestionIndex]?.payload?.targetsCount || 4;
        if (answerState.motorClicks.length >= requiredCount) {
          answerState.selectedAnswerIndex = 0;
          answerState.isSolved = true;
        }
        this.render();
      });
    }

    // Hint request
    const hintBtn = this.container.querySelector('#hint-btn');
    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        answerState.hintsUsed++;
        const hintBox = this.container.querySelector('#hint-box') as HTMLElement;
        if (hintBox) hintBox.style.display = 'block';
      });
    }

    // Navigation: Previous
    const prevBtn = this.container.querySelector('#prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentQuestionIndex > 0) {
          this.loadQuestion(this.currentQuestionIndex - 1);
        }
      });
    }

    // Navigation: Next
    const nextBtn = this.container.querySelector('#next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentQuestionIndex < 19) {
          this.loadQuestion(this.currentQuestionIndex + 1);
        }
      });
    }

    // Final Submission
    const submitAssessmentBtn = this.container.querySelector('#submit-assessment-btn');
    if (submitAssessmentBtn) {
      submitAssessmentBtn.addEventListener('click', () => {
        this.completeAssessment();
      });
    }
  }

  private async completeAssessment() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    // Save final spent time
    if (this.itemStartTime > 0 && this.userAnswers[this.currentQuestionIndex]) {
      this.userAnswers[this.currentQuestionIndex].timeSpentMs += (Date.now() - this.itemStartTime);
    }

    const itemTelemetries: ItemTelemetry[] = [];

    // Compile telemetry for all 20 questions
    for (let i = 0; i < 20; i++) {
      const activity = this.cachedActivities[i];
      const answerState = this.userAnswers[i];
      if (!activity) continue;

      let isCorrect = false;
      let accuracyScore = 0.0;

      if (activity.type === 'robot_mission' || Array.isArray(activity.payload?.availableBlocks)) {
        const targetSeq: string[] = activity.payload?.correctSequence || [];
        let matched = 0;
        answerState.robotSequence.forEach((step, idx) => {
          if (targetSeq[idx] === step) matched++;
        });
        accuracyScore = targetSeq.length > 0 ? matched / targetSeq.length : (answerState.robotSequence.length > 0 ? 1.0 : 0.0);
        isCorrect = accuracyScore >= 0.8;
      } else if (activity.domain === 'fine_motor_technology' || activity.type === 'motor_target') {
        isCorrect = answerState.motorClicks.length > 0;
        accuracyScore = Math.min(1.0, answerState.motorClicks.length / (activity.payload?.targetsCount || 4));
      } else {
        // Options based questions
        isCorrect = (answerState.selectedAnswerIndex === (activity.payload?.correctIndex ?? 0));
        accuracyScore = isCorrect ? 1.0 : (answerState.selectedAnswerIndex !== null ? 0.5 : 0.0);
      }

      const fineMotorMetrics = answerState.motorClicks.length > 0 ? {
        drag_accuracy_pct: 94.5,
        click_precision_px: Math.round(answerState.motorClicks.reduce((a, b) => a + b.dist, 0) / answerState.motorClicks.length),
        path_smoothness_ratio: 0.93
      } : undefined;

      itemTelemetries.push({
        item_id: activity.id,
        domain: activity.domain,
        skill: activity.skill,
        difficulty_level: activity.difficulty,
        is_correct: isCorrect,
        accuracy_score: accuracyScore,
        response_time_ms: Math.max(2000, answerState.timeSpentMs),
        expected_time_ms: activity.expectedTimeMs,
        attempts_count: Math.max(1, answerState.attemptsCount),
        hints_used: answerState.hintsUsed,
        fine_motor: fineMotorMetrics,
        behavioral: {
          hesitation_time_ms: 1000,
          recovery_after_rule_change: answerState.ruleShiftPhase === 2,
          adaptation_speed_ms: Math.max(2000, answerState.timeSpentMs),
          attempts_after_hint: answerState.hintsUsed > 0 ? 1 : 0
        }
      });
    }

    // Calculate domain scores & overall score
    const domainScores = ScoringEngine.calculateDomainScores(itemTelemetries);
    const totalScore = ScoringEngine.calculateTotalScore(domainScores);
    const placement = PlacementEngine.evaluatePlacement(totalScore, domainScores, itemTelemetries);

    const session: StudentSessionTelemetry = {
      session_id: `sess_${Date.now()}`,
      student_name: 'Alex Rivers',
      age_group: '7-9',
      start_time: new Date().toISOString(),
      item_telemetries: itemTelemetries,
      domain_scores: domainScores,
      total_score: totalScore,
      placed_track: placement.baseTrack,
      recommended_track: placement.recommendedTrack,
      flags: placement.flags.map(f => f.id)
    };

    // Generate AI Qualitative Summary
    const reportSummary = await this.analyzer.generateReportSummary(session, placement);
    session.qualitative_summary = reportSummary;

    // Render Final Dashboard
    renderReportDashboard(this.container, session, placement);
  }
}

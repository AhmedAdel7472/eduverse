import { AssessmentDomain, ItemTelemetry, StudentSessionTelemetry, QuestionTimeRecord, BreakEvent } from '../engine/telemetrySchema';
import { ActivityGenerator, ActivityItem, QUESTION_BASELINES } from '../ai/activityGenerator';
import { ScoringEngine, DOMAIN_CONFIG } from '../engine/scoringEngine';
import { PlacementEngine, PlacementResult } from '../engine/placementEngine';
import { QualitativeAnalyzer } from '../ai/qualitativeAnalyzer';
import { renderReportDashboard } from './ReportDashboard';

export interface StoredUserAnswer {
  selectedAnswerIndex: number | null;
  robotSequence: string[];
  motorClicks: { x: number; y: number; dist: number }[];
  attemptsCount: number;
  hintsUsed: number;
  timeSpentMs: number;
  isSolved: boolean;
  timedOut: boolean;
  answeredAt: number | null;
  responseLatencyMs: number | null;
  remainingTimeWhenAnsweredMs: number | null;
  breaksDuringQuestion: number;
}

export interface SavedAssessmentSession {
  studentName: string;
  currentQuestionIndex: number;
  totalTimerSeconds: number;
  currentQuestionRemainingSeconds: number;
  isPaused: boolean;
  cachedActivities: (ActivityItem | null)[];
  userAnswers: StoredUserAnswer[];
  questionTimeRecords: QuestionTimeRecord[];
  breakEvents: BreakEvent[];
  savedAt: number;
}

export class AssessmentRunner {
  public static STORAGE_KEY = 'cognix_active_assessment_session';
  public static QUESTION_TIME_LIMIT_SEC = 90; // 1 minute 30 seconds

  private container: HTMLElement;
  private generator: ActivityGenerator;
  private analyzer: QualitativeAnalyzer;
  private studentName: string = 'Alex Rivers';

  // 60-Question Plan & State
  private cachedActivities: (ActivityItem | null)[] = new Array(60).fill(null);
  private userAnswers: StoredUserAnswer[] = [];
  private questionTimeRecords: QuestionTimeRecord[] = [];
  private breakEvents: BreakEvent[] = [];
  private currentQuestionIndex: number = 0; // 0 to 59

  // Timers & Active State
  private totalTimerSeconds: number = 0;
  private questionTimerSecondsRemaining: number = AssessmentRunner.QUESTION_TIME_LIMIT_SEC;
  private itemStartTimestamp: number = 0;
  private itemFirstInteractionTimestamp: number | null = null;
  private currentPauseStartTimestamp: number | null = null;
  private pauseDurationForCurrentQuestionMs: number = 0;
  private isPaused: boolean = false;

  private globalTimerInterval: any = null;
  private questionTimerInterval: any = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.generator = new ActivityGenerator();
    this.analyzer = new QualitativeAnalyzer();
    this.initUserAnswers();
  }

  public static getSavedSession(): SavedAssessmentSession | null {
    try {
      const data = localStorage.getItem(AssessmentRunner.STORAGE_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data) as SavedAssessmentSession;
      if (parsed && Array.isArray(parsed.userAnswers) && parsed.userAnswers.length === 60) {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  public static clearSavedSession(): void {
    try {
      localStorage.removeItem(AssessmentRunner.STORAGE_KEY);
    } catch (e) {}
  }

  public saveSession(studentName: string = this.studentName) {
    try {
      this.studentName = studentName;
      const sessionData: SavedAssessmentSession = {
        studentName,
        currentQuestionIndex: this.currentQuestionIndex,
        totalTimerSeconds: this.totalTimerSeconds,
        currentQuestionRemainingSeconds: this.questionTimerSecondsRemaining,
        isPaused: this.isPaused,
        cachedActivities: this.cachedActivities,
        userAnswers: this.userAnswers,
        questionTimeRecords: this.questionTimeRecords,
        breakEvents: this.breakEvents,
        savedAt: Date.now()
      };
      localStorage.setItem(AssessmentRunner.STORAGE_KEY, JSON.stringify(sessionData));
    } catch (e) {}
  }

  private beforeUnloadHandler = () => {
    this.saveSession(this.studentName);
  };

  private attachBeforeUnload() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
    window.addEventListener('beforeunload', this.beforeUnloadHandler);
  }

  private detachBeforeUnload() {
    window.removeEventListener('beforeunload', this.beforeUnloadHandler);
  }

  private initUserAnswers() {
    this.userAnswers = new Array(60).fill(null).map(() => ({
      selectedAnswerIndex: null,
      robotSequence: [],
      motorClicks: [],
      attemptsCount: 0,
      hintsUsed: 0,
      timeSpentMs: 0,
      isSolved: false,
      timedOut: false,
      answeredAt: null,
      responseLatencyMs: null,
      remainingTimeWhenAnsweredMs: null,
      breaksDuringQuestion: 0
    }));
    this.questionTimeRecords = [];
    this.breakEvents = [];
  }

  public async startSession(studentName: string = 'Alex Rivers', restoreIfAvailable: boolean = true) {
    this.studentName = studentName;
    const saved = restoreIfAvailable ? AssessmentRunner.getSavedSession() : null;

    if (saved) {
      this.currentQuestionIndex = Math.max(0, Math.min(59, saved.currentQuestionIndex || 0));
      this.cachedActivities = saved.cachedActivities || new Array(60).fill(null);
      this.userAnswers = saved.userAnswers;
      this.questionTimeRecords = saved.questionTimeRecords || [];
      this.breakEvents = saved.breakEvents || [];
      this.totalTimerSeconds = saved.totalTimerSeconds || 0;
      this.questionTimerSecondsRemaining = saved.currentQuestionRemainingSeconds || AssessmentRunner.QUESTION_TIME_LIMIT_SEC;
      this.isPaused = saved.isPaused || false;

      this.startGlobalTimer(this.totalTimerSeconds);
      this.attachBeforeUnload();

      if (this.isPaused) {
        await this.loadQuestion(this.currentQuestionIndex, false);
        this.pauseAssessment();
      } else {
        await this.loadQuestion(this.currentQuestionIndex, false);
      }
    } else {
      this.currentQuestionIndex = 0;
      this.cachedActivities = new Array(60).fill(null);
      this.initUserAnswers();
      this.totalTimerSeconds = 0;
      this.questionTimerSecondsRemaining = AssessmentRunner.QUESTION_TIME_LIMIT_SEC;
      this.isPaused = false;

      this.startGlobalTimer(0);
      this.attachBeforeUnload();
      this.saveSession(studentName);
      await this.loadQuestion(0, true);
    }
  }

  private startGlobalTimer(initialSeconds: number = 0) {
    this.totalTimerSeconds = initialSeconds;
    if (this.globalTimerInterval) clearInterval(this.globalTimerInterval);
    this.globalTimerInterval = setInterval(() => {
      if (!this.isPaused) {
        this.totalTimerSeconds++;
        if (this.totalTimerSeconds % 3 === 0) {
          this.saveSession(this.studentName);
        }
        const timerEl = document.getElementById('global-timer');
        if (timerEl) {
          const mins = String(Math.floor(this.totalTimerSeconds / 60)).padStart(2, '0');
          const secs = String(this.totalTimerSeconds % 60).padStart(2, '0');
          timerEl.textContent = `${mins}:${secs}`;
        }
      }
    }, 1000);
  }

  private startQuestionTimer() {
    if (this.questionTimerInterval) clearInterval(this.questionTimerInterval);
    this.questionTimerInterval = setInterval(() => {
      if (!this.isPaused) {
        this.questionTimerSecondsRemaining--;
        this.updateQuestionTimerUI();

        if (this.questionTimerSecondsRemaining <= 0) {
          clearInterval(this.questionTimerInterval);
          this.handleQuestionTimeout();
        }
      }
    }, 1000);
  }

  private updateQuestionTimerUI() {
    const qTimerEl = document.getElementById('question-timer-display');
    const qRingEl = document.getElementById('question-timer-ring');
    if (qTimerEl) {
      const mins = Math.floor(this.questionTimerSecondsRemaining / 60);
      const secs = String(this.questionTimerSecondsRemaining % 60).padStart(2, '0');
      qTimerEl.textContent = `${mins}:${secs}`;

      if (this.questionTimerSecondsRemaining <= 15) {
        qTimerEl.style.color = '#ef4444'; // Warning red
      } else {
        qTimerEl.style.color = 'var(--accent-cyan)';
      }
    }
    if (qRingEl) {
      const pct = (this.questionTimerSecondsRemaining / AssessmentRunner.QUESTION_TIME_LIMIT_SEC) * 100;
      qRingEl.style.width = `${pct}%`;
    }
  }

  private async loadQuestion(targetIndex: number, resetTimer: boolean = true) {
    if (targetIndex < 0 || targetIndex >= 60) return;

    this.currentQuestionIndex = targetIndex;
    const baseline = QUESTION_BASELINES[targetIndex];

    // Stop any running question timer while loading
    if (this.questionTimerInterval) clearInterval(this.questionTimerInterval);

    if (resetTimer) {
      this.questionTimerSecondsRemaining = AssessmentRunner.QUESTION_TIME_LIMIT_SEC;
    }

    this.itemFirstInteractionTimestamp = null;
    this.pauseDurationForCurrentQuestionMs = 0;

    // Render loading state if question is not yet cached
    if (!this.cachedActivities[targetIndex]) {
      this.renderLoadingState(targetIndex);
      this.cachedActivities[targetIndex] = await this.generator.generateActivity(baseline.slot);
    }

    // Start tracking active time ONLY after question is ready (not during AI loading delay)
    this.itemStartTimestamp = Date.now();

    this.saveSession(this.studentName);
    this.render();

    if (!this.isPaused) {
      this.startQuestionTimer();
    }

    // Pre-fetch next question in background
    this.prefetchNextQuestion(targetIndex + 1);
  }

  private renderLoadingState(targetIndex: number) {
    const baseline = QUESTION_BASELINES[targetIndex];
    const domainConfig = DOMAIN_CONFIG[baseline.domain];

    const playground = this.container.querySelector('#playground-area');
    if (playground) {
      playground.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--accent-cyan);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.2s infinite ease-in-out;">⚡</div>
          <h3 style="font-size: 1.2rem; font-weight: 700;">Preparing Question ${baseline.slot} of 60...</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">${domainConfig.name} • ${baseline.subSkill}</p>
        </div>
      `;
    }
  }

  private async prefetchNextQuestion(nextIndex: number) {
    if (nextIndex >= 0 && nextIndex < 60 && !this.cachedActivities[nextIndex]) {
      const baseline = QUESTION_BASELINES[nextIndex];
      this.generator.generateActivity(baseline.slot).then(activity => {
        this.cachedActivities[nextIndex] = activity;
      }).catch(() => {});
    }
  }

  public pauseAssessment() {
    if (this.isPaused) return;
    this.isPaused = true;
    this.currentPauseStartTimestamp = Date.now();
    const currentAns = this.userAnswers[this.currentQuestionIndex];
    if (currentAns) {
      currentAns.breaksDuringQuestion++;
    }

    const overlay = document.getElementById('pause-overlay');
    if (overlay) overlay.style.display = 'flex';
    this.saveSession(this.studentName);
  }

  public resumeAssessment() {
    if (!this.isPaused) return;
    const now = Date.now();
    if (this.currentPauseStartTimestamp) {
      const breakDuration = now - this.currentPauseStartTimestamp;
      this.pauseDurationForCurrentQuestionMs += breakDuration;

      const baseline = QUESTION_BASELINES[this.currentQuestionIndex];
      this.breakEvents.push({
        breakIndex: this.breakEvents.length + 1,
        questionSlotAtPause: this.currentQuestionIndex + 1,
        domainAtPause: baseline.domain,
        pauseStartTimestamp: this.currentPauseStartTimestamp,
        resumeTimestamp: now,
        breakDurationMs: breakDuration,
        countdownRemainingAtPause: this.questionTimerSecondsRemaining
      });
    }

    this.isPaused = false;
    this.currentPauseStartTimestamp = null;

    const overlay = document.getElementById('pause-overlay');
    if (overlay) overlay.style.display = 'none';

    this.startQuestionTimer();
    this.saveSession(this.studentName);
  }

  private handleQuestionTimeout() {
    const answerState = this.userAnswers[this.currentQuestionIndex];
    answerState.timedOut = true;
    answerState.isSolved = false;

    this.recordQuestionTimeData(false);
    this.advanceToNextQuestion();
  }

  private recordQuestionTimeData(wasAnswered: boolean) {
    const endTimestamp = Date.now();
    const answerState = this.userAnswers[this.currentQuestionIndex];
    const baseline = QUESTION_BASELINES[this.currentQuestionIndex];
    const activity = this.cachedActivities[this.currentQuestionIndex];

    const totalDurationMs = endTimestamp - this.itemStartTimestamp;
    const activeDurationMs = Math.max(1000, totalDurationMs - this.pauseDurationForCurrentQuestionMs);

    answerState.timeSpentMs += activeDurationMs;

    const record: QuestionTimeRecord = {
      questionSlot: baseline.slot,
      domain: baseline.domain,
      subSkill: baseline.subSkill,
      questionTitle: activity?.title || baseline.title,
      questionStartTimestamp: this.itemStartTimestamp,
      questionEndTimestamp: endTimestamp,
      totalDurationMs,
      pausedDurationMs: this.pauseDurationForCurrentQuestionMs,
      activeDurationMs,
      responseLatencyMs: answerState.responseLatencyMs,
      answeredAt: answerState.answeredAt,
      timedOut: answerState.timedOut,
      wasAnswered,
      remainingTimeWhenAnsweredMs: answerState.remainingTimeWhenAnsweredMs,
      breaksDuringQuestion: answerState.breaksDuringQuestion,
      earnedScore: 0, // Will be computed at submission
      maxScore: baseline.maxPoints
    };

    this.questionTimeRecords[this.currentQuestionIndex] = record;
  }

  private advanceToNextQuestion() {
    if (this.questionTimerInterval) clearInterval(this.questionTimerInterval);

    if (this.currentQuestionIndex < 59) {
      const currentDomain = QUESTION_BASELINES[this.currentQuestionIndex].domain;
      const nextDomain = QUESTION_BASELINES[this.currentQuestionIndex + 1].domain;

      if (currentDomain !== nextDomain) {
        this.showDomainTransitionBanner(nextDomain, () => {
          this.loadQuestion(this.currentQuestionIndex + 1, true);
        });
      } else {
        this.loadQuestion(this.currentQuestionIndex + 1, true);
      }
    } else {
      this.completeAssessment();
    }
  }

  private showDomainTransitionBanner(nextDomain: AssessmentDomain, callback: () => void) {
    const domainCfg = DOMAIN_CONFIG[nextDomain];
    const playground = this.container.querySelector('#playground-area');
    if (playground) {
      playground.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--accent-cyan); animation: fadeIn 0.4s ease;">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff;">Domain Completed!</h2>
          <p style="font-size: 1rem; color: var(--text-secondary); margin-top: 0.5rem; margin-bottom: 1.5rem;">
            Great job! Moving to <strong>${domainCfg.name}</strong> (${domainCfg.questionCount} Questions)...
          </p>
          <div style="display:inline-block; padding: 0.6rem 1.5rem; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue)); color: #fff; font-weight: 700; border-radius: 12px;">
            Starting Domain...
          </div>
        </div>
      `;
    }
    setTimeout(callback, 2200);
  }

  private render() {
    const activity = this.cachedActivities[this.currentQuestionIndex];
    if (!activity) return;

    const baseline = QUESTION_BASELINES[this.currentQuestionIndex];
    const domainConfig = DOMAIN_CONFIG[baseline.domain];
    const answerState = this.userAnswers[this.currentQuestionIndex];

    // --- Child-Friendly Frog Jump Matrix UI (Lily Pads) ---
    // Track previous index for animation
    const prevIndex = this.currentQuestionIndex > 0 ? this.currentQuestionIndex - 1 : -1;
    let questionGridHtml = `
      <div class="question-grid-bar">
        <div class="grid-header">
          <span><strong>🐸 Frog Jump Progress</strong> — Question <strong>${baseline.slot}</strong> of 60</span>
          <span>Done: <strong>${this.userAnswers.filter(a => a.isSolved || a.timedOut).length}</strong> / 60</span>
        </div>
        <div class="lily-pads-matrix">
    `;

    for (let i = 0; i < 60; i++) {
      const isCurrent = i === this.currentQuestionIndex;
      const isSolved = this.userAnswers[i].isSolved;
      const isTimedOut = this.userAnswers[i].timedOut;
      const isPast = i < this.currentQuestionIndex;
      const isJustLeft = i === prevIndex;

      let padClass = 'lily-pad';
      if (isCurrent) padClass += ' active-pad frog-land';
      else if (isSolved) padClass += ' solved-pad';
      else if (isTimedOut) padClass += ' timed-out-pad';
      else if (isJustLeft) padClass += ' just-left-pad';
      else if (isPast) padClass += ' past-pad';
      else padClass += ' locked-pad';

      let padContent = `${i + 1}`;
      if (isCurrent) padContent = `🐸`;
      else if (isSolved) padContent = `✓`;
      else if (isTimedOut) padContent = `⏰`;

      questionGridHtml += `
        <div class="${padClass}" title="Q${i + 1}">${padContent}</div>
      `;
    }

    questionGridHtml += `</div></div>`;

    this.container.innerHTML = `
      ${questionGridHtml}

      <!-- Pause Overlay -->
      <div id="pause-overlay" style="display:${this.isPaused ? 'flex' : 'none'}; position:fixed; inset:0; background:rgba(11,15,25,0.92); backdrop-filter:blur(12px); z-index:300; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem;">
        <div style="font-size:4rem; margin-bottom:1rem; animation:bounce 1.5s infinite;">⏸️</div>
        <h2 style="font-size:2rem; font-weight:800; color:#fff; margin-bottom:0.5rem;">Assessment Paused</h2>
        <p style="color:var(--text-secondary); max-width:400px; margin-bottom:2rem; font-size:1rem;">
          Take a deep breath or a short sensory break! Your progress is safely saved.
        </p>
        <button id="resume-btn" class="btn btn-primary" style="font-size:1.1rem; padding:0.9rem 2.5rem;">
          ▶️ Resume Assessment
        </button>
      </div>

      <div class="glass-card activity-card">
        <div class="activity-header">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="activity-domain-badge">${domainConfig.name}</span>
              <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); background:rgba(255,255,255,0.06); padding:0.25rem 0.6rem; border-radius:8px;">
                ${baseline.subSkill} • ${baseline.maxPoints} Pt${baseline.maxPoints > 1 ? 's' : ''}
              </span>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <!-- ⏱️ Per-question countdown timer -->
              <div style="display:flex; align-items:center; gap:0.5rem; background:rgba(15,23,42,0.8); border:1px solid var(--border-color); padding:0.4rem 0.9rem; border-radius:20px;">
                <span style="font-size:0.95rem;">⏱️</span>
                <span id="question-timer-display" style="font-family:monospace; font-size:1.1rem; font-weight:800; color:${this.questionTimerSecondsRemaining <= 15 ? '#ef4444' : 'var(--accent-cyan)'};">
                  ${Math.floor(this.questionTimerSecondsRemaining / 60)}:${String(this.questionTimerSecondsRemaining % 60).padStart(2, '0')}
                </span>
                <div style="width:48px; height:5px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                  <div id="question-timer-ring" style="width:${(this.questionTimerSecondsRemaining / AssessmentRunner.QUESTION_TIME_LIMIT_SEC) * 100}%; height:100%; background:${this.questionTimerSecondsRemaining <= 15 ? '#ef4444' : 'var(--accent-cyan)'}; transition:width 0.9s linear;"></div>
                </div>
              </div>
              <!-- Pause Button -->
              <button id="pause-btn" class="btn btn-secondary" style="padding:0.4rem 0.85rem; font-size:0.85rem;" title="Pause Assessment">
                ⏸️ Pause
              </button>
            </div>
          </div>


          <h2 class="activity-title">${activity.title}</h2>
          <p class="activity-instructions">${activity.instructions}</p>
        </div>

        <div class="interactive-playground" id="playground-area">
          ${this.renderPlaygroundContent(activity, answerState)}
        </div>

        <div class="activity-footer">
          <div class="nav-buttons-group" style="width:100%;">
            <button class="btn btn-primary" id="submit-answer-btn" style="background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue)); font-weight:700; width:100%; font-size:1.1rem; padding:0.9rem 2rem;">
              Confirm &amp; Next ➔
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private renderPlaygroundContent(activity: ActivityItem, answerState: StoredUserAnswer): string {
    const payload = activity.payload || {};

    // 1. Robot Mission UI
    if (activity.type === 'robot_mission' || Array.isArray(payload.availableBlocks)) {
      const blocks: string[] = payload.availableBlocks || ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾'];
      return `
        <div class="robot-mission-container">
          <div>
            <h4 style="margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-secondary);">Available Actions:</h4>
            <div class="blocks-palette">
              ${blocks.map((blk: string) => `
                <button class="code-block" data-block="${blk}">+ ${blk}</button>
              `).join('')}
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h4 style="font-size:0.9rem; color:var(--text-secondary); margin:0;">Sequence (${answerState.robotSequence.length} steps):</h4>
              ${answerState.robotSequence.length > 0 ? `
                <button id="clear-sequence-btn" style="font-size:0.75rem; color:var(--accent-amber); background:rgba(245,158,11,0.1); border:1px solid var(--accent-amber); padding:0.25rem 0.6rem; border-radius:6px; cursor:pointer;">🗑️ Clear</button>
              ` : ''}
            </div>
            <div class="sequence-dropzone" id="sequence-box">
              ${answerState.robotSequence.length === 0
                ? '<span style="color:var(--text-secondary); font-size:0.85rem;">Click blocks on left to build sequence...</span>'
                : answerState.robotSequence.map((blk, i) => `
                <div class="sequence-step" style="background:var(--accent-blue); padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                  <span>📌 ${i + 1}. ${blk}</span>
                  <button class="remove-block-btn" data-idx="${i}" style="background:rgba(0,0,0,0.25); border:none; color:#fff; width:20px; height:20px; border-radius:50%; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">×</button>
                </div>
              `).join('')
              }
            </div>
          </div>
        </div>
      `;
    }

    // 2. Picture Match UI
    if (activity.type === 'picture_match' || payload.audioPromptText) {
      const audioPrompt = payload.audioPromptText || 'Select the matching item';
      const options: any[] = payload.options || [
        { label: 'Option A', emoji: '🤖' },
        { label: 'Option B', emoji: '🍎' },
        { label: 'Option C', emoji: '⚽' }
      ];
      return `
        <div style="margin-bottom: 1.25rem; font-size:1.1rem; color:var(--accent-cyan); font-weight:600; text-align:center;">
          🔊 Prompt: "${audioPrompt}"
        </div>
        <div class="options-grid-3">
          ${options.slice(0, 3).map((opt: any, idx: number) => {
            const label = typeof opt === 'string' ? opt : (opt.label || `Option ${idx + 1}`);
            const emoji = typeof opt === 'object' && opt.emoji ? opt.emoji : '🎯';
            return `
              <button class="option-btn-3 ${answerState.selectedAnswerIndex === idx ? 'selected' : ''}" data-opt="${idx}">
                <span style="font-size: 2.2rem;">${emoji}</span>
                <span style="font-size: 0.95rem;">${label}</span>
              </button>
            `;
          }).join('')}
        </div>
      `;
    }

    // 3. Fine Motor Canvas Target UI
    if (activity.type === 'motor_target') {
      const targetsCount = payload.targetsCount || 3;
      return `
        <div class="motor-canvas-container" id="motor-canvas">
          <div class="motor-target" id="target-element" style="top: 80px; left: 240px;"></div>
          <div style="position:absolute; bottom:10px; left:15px; font-size:0.85rem; color:var(--text-secondary);">
            Targets Clicked: ${answerState.motorClicks.length} / ${targetsCount}
          </div>
        </div>
      `;
    }

    // 4. Default 3-Choice Multiple Choice Grid
    const optionsList = Array.isArray(payload.options) ? payload.options.slice(0, 3) : [
      { label: 'Choice A' }, { label: 'Choice B' }, { label: 'Choice C' }
    ];
    const sequenceList = Array.isArray(payload.sequence) ? payload.sequence : null;

    return `
      ${sequenceList ? `
        <div style="font-size: 2.2rem; display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); padding: 1rem 1.5rem; border-radius: 12px; justify-content: center;">
          ${sequenceList.map((item: string) => `<span>${item}</span>`).join('')}
        </div>
      ` : ''}
      <div class="options-grid-3">
        ${optionsList.map((opt: any, idx: number) => {
          const labelText = typeof opt === 'string' ? opt : (opt.label || opt.text || JSON.stringify(opt));
          return `
            <button class="option-btn-3 ${answerState.selectedAnswerIndex === idx ? 'selected' : ''}" data-opt="${idx}">
              <span>${labelText}</span>
            </button>
          `;
        }).join('')}
      </div>
    `;
  }

  private registerInteraction() {
    if (!this.itemFirstInteractionTimestamp) {
      this.itemFirstInteractionTimestamp = Date.now();
      const answerState = this.userAnswers[this.currentQuestionIndex];
      if (answerState) {
        answerState.responseLatencyMs = Math.max(100, this.itemFirstInteractionTimestamp - this.itemStartTimestamp - this.pauseDurationForCurrentQuestionMs);
      }
    }
  }

  private attachEventListeners() {
    const answerState = this.userAnswers[this.currentQuestionIndex];

    // Options click (3 choice grid)
    const optionBtns = this.container.querySelectorAll('.option-btn-3');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.registerInteraction();
        const target = e.currentTarget as HTMLElement;
        const optIdx = parseInt(target.getAttribute('data-opt') || '0', 10);
        answerState.selectedAnswerIndex = optIdx;
        answerState.isSolved = true;
        answerState.answeredAt = Date.now();
        answerState.remainingTimeWhenAnsweredMs = this.questionTimerSecondsRemaining * 1000;
        answerState.attemptsCount = Math.max(1, answerState.attemptsCount + 1);

        this.render();
      });
    });

    // Code blocks click
    const blockBtns = this.container.querySelectorAll('.code-block');
    blockBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.registerInteraction();
        const target = e.currentTarget as HTMLElement;
        const blockName = target.getAttribute('data-block');
        if (blockName) {
          answerState.robotSequence.push(blockName);
          answerState.isSolved = answerState.robotSequence.length > 0;
          answerState.answeredAt = Date.now();
          answerState.attemptsCount = Math.max(1, answerState.attemptsCount + 1);
          this.render();
        }
      });
    });

    // Remove block
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

    // Clear sequence
    const clearSeqBtn = this.container.querySelector('#clear-sequence-btn');
    if (clearSeqBtn) {
      clearSeqBtn.addEventListener('click', () => {
        answerState.robotSequence = [];
        answerState.isSolved = false;
        this.render();
      });
    }

    // Fine Motor Target click
    const targetEl = this.container.querySelector('#target-element');
    const canvasEl = this.container.querySelector('#motor-canvas');
    if (targetEl && canvasEl) {
      targetEl.addEventListener('click', (e: any) => {
        this.registerInteraction();
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

        const requiredCount = this.cachedActivities[this.currentQuestionIndex]?.payload?.targetsCount || 3;
        if (answerState.motorClicks.length >= requiredCount) {
          answerState.selectedAnswerIndex = 0;
          answerState.isSolved = true;
          answerState.answeredAt = Date.now();
          answerState.remainingTimeWhenAnsweredMs = this.questionTimerSecondsRemaining * 1000;
        }
        this.render();
      });
    }

    // Hint request (removed — no hints in assessment)

    // Pause & Resume buttons
    const pauseBtn = this.container.querySelector('#pause-btn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => this.pauseAssessment());
    }

    const resumeBtn = this.container.querySelector('#resume-btn');
    if (resumeBtn) {
      resumeBtn.addEventListener('click', () => this.resumeAssessment());
    }

    // Confirm & Next Submit Button
    const submitAnswerBtn = this.container.querySelector('#submit-answer-btn');
    if (submitAnswerBtn) {
      submitAnswerBtn.addEventListener('click', () => {
        this.recordQuestionTimeData(answerState.isSolved);
        this.advanceToNextQuestion();
      });
    }
  }

  private async completeAssessment() {
    if (this.globalTimerInterval) clearInterval(this.globalTimerInterval);
    if (this.questionTimerInterval) clearInterval(this.questionTimerInterval);

    this.detachBeforeUnload();
    AssessmentRunner.clearSavedSession();

    const itemTelemetries: ItemTelemetry[] = [];
    const itemMaxPtsMap: Record<string, number> = {};

    // Compile telemetry across all 60 questions
    for (let i = 0; i < 60; i++) {
      const activity = this.cachedActivities[i];
      const answerState = this.userAnswers[i];
      const baseline = QUESTION_BASELINES[i];
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
      } else if (activity.type === 'motor_target') {
        isCorrect = answerState.motorClicks.length > 0;
        accuracyScore = Math.min(1.0, answerState.motorClicks.length / (activity.payload?.targetsCount || 3));
      } else {
        isCorrect = (answerState.selectedAnswerIndex === (activity.payload?.correctIndex ?? 0));
        accuracyScore = isCorrect ? 1.0 : 0.0;
      }

      itemMaxPtsMap[activity.id] = baseline.maxPoints;

      itemTelemetries.push({
        item_id: activity.id,
        domain: activity.domain,
        skill: activity.skill,
        difficulty_level: activity.difficulty,
        is_correct: isCorrect,
        accuracy_score: accuracyScore,
        response_time_ms: Math.max(1000, answerState.timeSpentMs),
        expected_time_ms: 90000,
        attempts_count: Math.max(1, answerState.attemptsCount),
        hints_used: answerState.hintsUsed
      });

      if (this.questionTimeRecords[i]) {
        this.questionTimeRecords[i].earnedScore = ScoringEngine.calculateItemScore(itemTelemetries[i], baseline.maxPoints);
      }
    }

    // Calculate domain & placement scores
    const domainScores = ScoringEngine.calculateDomainScores(itemTelemetries, itemMaxPtsMap);
    const totalScore = ScoringEngine.calculateTotalScore(domainScores);
    const placement = PlacementEngine.evaluatePlacement(totalScore, domainScores, itemTelemetries);

    // Calculate Domain Time Summaries
    const domainsList: AssessmentDomain[] = [
      'cognitive_ability', 'functional_skills', 'communication_level', 'behavioral_readiness', 'fine_motor_technology'
    ];
    const domainTimeSummary: Record<AssessmentDomain, any> = {} as any;

    domainsList.forEach(d => {
      const records = this.questionTimeRecords.filter(r => r && r.domain === d);
      const totalActiveMs = records.reduce((acc, r) => acc + (r.activeDurationMs || 0), 0);
      const totalPausedMs = records.reduce((acc, r) => acc + (r.pausedDurationMs || 0), 0);
      const questionsTimedOut = records.filter(r => r.timedOut).length;
      const validLatencies = records.map(r => r.responseLatencyMs).filter(l => l !== null) as number[];
      const avgResponseLatencyMs = validLatencies.length > 0 ? Math.round(validLatencies.reduce((a, b) => a + b, 0) / validLatencies.length) : 0;

      domainTimeSummary[d] = {
        totalActiveMs,
        totalPausedMs,
        questionsTimedOut,
        avgResponseLatencyMs
      };
    });

    const totalActiveDurationMs = this.questionTimeRecords.reduce((acc, r) => acc + (r?.activeDurationMs || 0), 0);
    const totalBreakDurationMs = this.breakEvents.reduce((acc, b) => acc + b.breakDurationMs, 0);

    const session: StudentSessionTelemetry = {
      session_id: `sess_60_${Date.now()}`,
      student_name: this.studentName || 'Alex Rivers',
      age_group: '7-9',
      start_time: new Date(Date.now() - this.totalTimerSeconds * 1000).toISOString(),
      end_time: new Date().toISOString(),
      item_telemetries: itemTelemetries,
      domain_scores: domainScores,
      total_score: totalScore,
      placed_track: placement.baseTrack,
      recommended_track: placement.recommendedTrack,
      flags: placement.flags.map(f => f.id),

      // CEO Time & Analytics
      question_time_records: this.questionTimeRecords,
      break_events: this.breakEvents,
      total_breaks_count: this.breakEvents.length,
      total_break_duration_ms: totalBreakDurationMs,
      total_active_duration_ms: totalActiveDurationMs,
      total_wall_clock_duration_ms: totalActiveDurationMs + totalBreakDurationMs,
      domain_time_summary: domainTimeSummary
    };

    // Generate AI Summary
    const reportSummary = await this.analyzer.generateReportSummary(session, placement);
    session.qualitative_summary = reportSummary;

    // Render Final Dashboard
    renderReportDashboard(this.container, session, placement);
  }
}


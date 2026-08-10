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

  // Load-generation counter: prevents stale async loadQuestion calls from starting a second timer.
  // Each loadQuestion call captures the gen value at start; after any await, it checks if still active.
  private loadGen: number = 0;

  // Blocks the submit button while the next question is being loaded to prevent double-advance.
  private isLoadingNextQuestion: boolean = false;

  // Motor target position state (prevents resets on re-render)
  private motorTargetPos: { top: number; left: number } = { top: 80, left: 240 };

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

      // Check cache version — purge stale out-of-sync sessions from earlier builds
      if (localStorage.getItem('cognix_cache_ver') !== 'v_3_0_clean') {
        localStorage.removeItem('cognix_assessment_session');
        localStorage.setItem('cognix_cache_ver', 'v_3_0_clean');
      }

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

  private speakAudio(text: string) {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  }

  private startQuestionTimer() {
    if (this.questionTimerInterval) {
      clearInterval(this.questionTimerInterval);
      this.questionTimerInterval = null;
    }

    // Safety guard: if remaining time is <= 0 for any reason, reset to 90s limit
    if (this.questionTimerSecondsRemaining <= 0) {
      this.questionTimerSecondsRemaining = AssessmentRunner.QUESTION_TIME_LIMIT_SEC;
    }

    this.questionTimerInterval = setInterval(() => {
      if (!this.isPaused) {
        this.questionTimerSecondsRemaining--;
        this.updateQuestionTimerUI();

        if (this.questionTimerSecondsRemaining <= 0) {
          clearInterval(this.questionTimerInterval);
          this.questionTimerInterval = null;
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

    // Reset motor target position for new question
    this.motorTargetPos = { top: 80, left: 240 };

    // Claim this load as the active one. Any previously suspended loadQuestion will
    // see its captured gen no longer matches and will abort after its await.
    const myGen = ++this.loadGen;

    this.currentQuestionIndex = targetIndex;
    const baseline = QUESTION_BASELINES[targetIndex];

    // Stop any running question timer while loading
    if (this.questionTimerInterval) {
      clearInterval(this.questionTimerInterval);
      this.questionTimerInterval = null;
    }

    // Always reset question timer when loading a new question (unless explicitly resuming a valid active timer > 3s)
    if (resetTimer || this.questionTimerSecondsRemaining <= 3) {
      this.questionTimerSecondsRemaining = AssessmentRunner.QUESTION_TIME_LIMIT_SEC;
    }

    this.itemFirstInteractionTimestamp = null;
    this.pauseDurationForCurrentQuestionMs = 0;

    // Render loading state if question is not yet cached
    if (!this.cachedActivities[targetIndex]) {
      this.renderLoadingState(targetIndex);
      this.cachedActivities[targetIndex] = await this.generator.generateActivity(baseline.slot);

      // After the await: check if a newer loadQuestion has taken over while we were waiting.
      // If so, abort — do NOT render or start a timer. The newer load will handle it.
      if (myGen !== this.loadGen) return;
    }

    // Mark loading as done so the submit button becomes active again
    this.isLoadingNextQuestion = false;

    const activeActivity = this.cachedActivities[targetIndex];
    if (activeActivity) {
      // Strictly enforce baseline type on active activity
      activeActivity.type = baseline.type;
      if (baseline.type !== 'robot_mission' && activeActivity.payload) {
        delete activeActivity.payload.availableBlocks;
        delete activeActivity.payload.correctSequence;
      }
      // Shuffle options so correct answer is not always in position 0
      this.shuffleActivityOptions(activeActivity);
    }

    // Start tracking active time ONLY after question is ready (not during AI loading delay)
    this.itemStartTimestamp = Date.now();

    this.saveSession(this.studentName);
    this.render();

    // Auto-speak audio prompt for picture_match questions
    if (activeActivity && activeActivity.type === 'picture_match') {
      const promptText = activeActivity.payload?.audioPromptText || activeActivity.instructions;
      if (promptText) {
        this.speakAudio(promptText);
      }
    }

    if (!this.isPaused) {
      this.startQuestionTimer();
    }

    // Pre-fetch next question in background
    this.prefetchNextQuestion(targetIndex + 1);
  }

  private shuffleActivityOptions(activity: ActivityItem) {
    if (!activity.payload || !Array.isArray(activity.payload.options) || activity.payload._shuffled || activity.payload.options.length < 2) {
      return;
    }
    const options = activity.payload.options;
    const correctOpt = options.find((o: any) => o.correct) || options[0];

    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    activity.payload.options = shuffled;
    activity.payload.correctIndex = shuffled.indexOf(correctOpt);
    activity.payload._shuffled = true;
  }

  private renderLoadingState(targetIndex: number) {
    const baseline = QUESTION_BASELINES[targetIndex];
    const domainConfig = DOMAIN_CONFIG[baseline.domain];

    const playground = this.container.querySelector('#playground-area');
    if (playground) {
      playground.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--accent-cyan);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.2s infinite ease-in-out;">⚡</div>
          <h3 style="font-size: 1.2rem; font-weight: 700;">Preparing Next Question...</h3>
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
    if (this.questionTimerInterval) {
      clearInterval(this.questionTimerInterval);
      this.questionTimerInterval = null;
    }
    this.questionTimerSecondsRemaining = AssessmentRunner.QUESTION_TIME_LIMIT_SEC;

    const answerState = this.userAnswers[this.currentQuestionIndex];
    if (answerState) {
      answerState.timedOut = true;
      answerState.isSolved = false;
    }

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
    // Block further submissions while the next question is loading
    this.isLoadingNextQuestion = true;

    if (this.questionTimerInterval) {
      clearInterval(this.questionTimerInterval);
      this.questionTimerInterval = null;
    }

    // Reset countdown for upcoming question
    this.questionTimerSecondsRemaining = AssessmentRunner.QUESTION_TIME_LIMIT_SEC;

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
      this.isLoadingNextQuestion = false;
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

    // --- Child-Friendly Skill Ladder UI ---
    const currentBaseline = QUESTION_BASELINES[this.currentQuestionIndex];
    const currentDomain = currentBaseline.domain;

    // Group domain questions by Sub-Skill
    const domainQuestions = QUESTION_BASELINES.filter(q => q.domain === currentDomain);
    const uniqueSkills = Array.from(new Set(domainQuestions.map(q => q.subSkill)));

    let questionGridHtml = `
      <div class="skill-ladder-bar" style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-color); border-radius: 16px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; backdrop-filter: blur(10px);">
        <div class="ladder-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span style="font-size:1.5rem; animation: bounce 2s infinite;">🐸</span>
            <div>
              <div style="font-weight:800; font-size:1rem; color:var(--accent-cyan);">
                Skill Ladder — ${domainConfig.name}
              </div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">
                Active Skill: <strong style="color: #fff;">${baseline.subSkill}</strong>
              </div>
            </div>
          </div>
          <div style="font-size:0.85rem; font-weight:700; background:rgba(16,185,129,0.15); border:1px solid var(--accent-emerald); padding:0.35rem 0.85rem; border-radius:12px; color:var(--accent-emerald);">
            Progress: ${this.userAnswers.filter(a => a.isSolved || a.timedOut).length} Completed
          </div>
        </div>

        <div class="skill-milestones-track" style="display:flex; align-items:center; gap:0.6rem; overflow-x:auto; padding:0.25rem 0; scrollbar-width:thin;">
    `;

    uniqueSkills.forEach((skillName, idx) => {
      const skillQs = domainQuestions.filter(q => q.subSkill === skillName);
      const isCurrentSkill = baseline.subSkill === skillName;
      const solvedInSkill = skillQs.filter(q => {
        const ans = this.userAnswers[q.slot - 1];
        return ans && (ans.isSolved || ans.timedOut);
      }).length;
      const isSkillDone = solvedInSkill === skillQs.length;

      let icon = `${idx + 1}`;
      let bgStyle = 'background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); color: var(--text-secondary);';

      if (isCurrentSkill) {
        icon = '🐸';
        bgStyle = 'background: linear-gradient(135deg, rgba(6,182,212,0.3), rgba(59,130,246,0.3)); border: 1px solid var(--accent-cyan); color: #fff; box-shadow: 0 0 12px rgba(6,182,212,0.3);';
      } else if (isSkillDone) {
        icon = '⭐';
        bgStyle = 'background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald);';
      }

      questionGridHtml += `
        <div style="flex:1; min-width:135px; ${bgStyle} padding:0.5rem 0.75rem; border-radius:10px; display:flex; flex-direction:column; gap:0.3rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; font-weight:700;">
            <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:95px;" title="${skillName}">${skillName}</span>
            <span style="font-size:0.85rem;">${icon}</span>
          </div>
          <div style="font-size:0.72rem; opacity:0.85; display:flex; justify-content:space-between;">
            <span>${solvedInSkill}/${skillQs.length} Qs</span>
            ${isSkillDone ? '<span style="font-weight:700;">✓</span>' : ''}
          </div>
          <div style="height:4px; width:100%; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden;">
            <div style="width:${(solvedInSkill / skillQs.length) * 100}%; height:100%; background:${isSkillDone ? 'var(--accent-emerald)' : 'var(--accent-cyan)'}; transition:width 0.3s ease;"></div>
          </div>
        </div>
      `;
    });

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

      <!-- Exit Confirmation Overlay -->
      <div id="exit-confirm-overlay" style="display:none; position:fixed; inset:0; background:rgba(11,15,25,0.94); backdrop-filter:blur(14px); z-index:400; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem;">
        <div style="font-size:3.5rem; margin-bottom:1rem;">⚠️</div>
        <h2 style="font-size:1.8rem; font-weight:800; color:#fff; margin-bottom:0.5rem;">Exit &amp; Reset Assessment?</h2>
        <p style="color:var(--text-secondary); max-width:420px; margin-bottom:2rem; font-size:0.95rem; line-height:1.5;">
          Exiting will stop your current progress, clear all saved assessment cache, and restart the assessment from the beginning.
        </p>
        <div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center;">
          <button id="cancel-exit-btn" class="btn btn-secondary" style="padding:0.75rem 1.5rem; font-weight:700;">Cancel</button>
          <button id="confirm-exit-btn" class="btn btn-primary" style="background:#ef4444; border-color:#dc2626; padding:0.75rem 1.5rem; font-weight:700; box-shadow:0 4px 15px rgba(239,68,68,0.4);">
            🚪 Yes, Exit &amp; Clear Cache
          </button>
        </div>
      </div>

      <div class="glass-card activity-card">
        <div class="activity-header">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span class="activity-domain-badge">${domainConfig.name}</span>
              <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); background:rgba(255,255,255,0.06); padding:0.25rem 0.6rem; border-radius:8px;">
                ${baseline.subSkill} • ${baseline.maxPoints} Pt${baseline.maxPoints > 1 ? 's' : ''}
              </span>
              <span style="font-size:0.75rem; font-weight:700; background:${activity.source === 'azure_openai' ? 'rgba(139,92,246,0.2)' : 'rgba(245,158,11,0.2)'}; border:1px solid ${activity.source === 'azure_openai' ? '#8b5cf6' : '#f59e0b'}; color:${activity.source === 'azure_openai' ? '#a78bfa' : '#fbbf24'}; padding:0.2rem 0.6rem; border-radius:12px;" title="Engine Source">
                ${activity.source === 'azure_openai' ? '🤖 Live Azure AI (o4-mini)' : '⚡ Engine Fast-Track'}
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
              <!-- Exit Exam Button -->
              <button id="exit-exam-btn" class="btn btn-secondary" style="padding:0.4rem 0.85rem; font-size:0.85rem; background:rgba(239,68,68,0.15); border:1px solid #ef4444; color:#f87171;" title="Exit and Reset Exam">
                🚪 Exit
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
            <button
              class="btn btn-primary"
              id="submit-answer-btn"
              ${this.isLoadingNextQuestion ? 'disabled' : ''}
              style="background: ${this.isLoadingNextQuestion ? 'rgba(100,116,139,0.5)' : 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))'}; font-weight:700; width:100%; font-size:1.1rem; padding:0.9rem 2rem; transition: all 0.3s ease;"
            >
              ${this.isLoadingNextQuestion
                ? '<span style="display:flex;align-items:center;justify-content:center;gap:0.6rem;"><span style="width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;animation:spin 0.8s linear infinite;"></span> Loading Next Question...</span>'
                : 'Confirm &amp; Next ➔'
              }
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private renderPlaygroundContent(activity: ActivityItem, answerState: StoredUserAnswer): string {
    const payload = activity.payload || {};

    // 1. Robot Mission UI — ONLY for activities explicitly specified as robot_mission type
    if (activity.type === 'robot_mission') {
      const blocks: string[] = payload.availableBlocks || ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾'];
      const slot = activity.slot;

      let mapHtml = '';
      if (slot === 16) {
        mapHtml = `[ 🤖 Robo ] ➔ ➡️ [ ◽ Path ] ➔ ➡️ [ ⭐ Star ]`;
      } else if (slot === 17 || slot === 18) {
        mapHtml = `[ 🤖 Robo ] ➔ ➡️ [ ◽ Walk Forward ] ➔ ⤵️ [ Turn Right ] ➔ 🦾 [ 🦷 Shiny Tooth ]`;
      } else if (slot === 19) {
        mapHtml = `[ 🤖 Robo ] ➔ ⤴️ [ Turn Left ] ➔ ➡️ [ ◽ Walk Forward ] ➔ 📦 [ Package ]`;
      } else if (slot === 20 || slot === 24) {
        mapHtml = `[ 🤖 Robo ] ➔ ➡️ [ ◽ Move Forward ] ➔ ⤵️ [ Turn Right ] ➔ 🦾 [ 💎 Gem ]`;
      } else if (slot === 21) {
        mapHtml = `[ 🤖 Robo ] ➔ ⤴️ [ Turn Left ] ➔ ➡️ [ ◽ Walk Forward ] ➔ 📦 [ Drop Package ]`;
      } else if (slot === 22 || slot === 26) {
        mapHtml = `[ 🤖 Robo ] ➔ 🚪 [ Open Door ] ➔ ➡️ [ Move ] ➔ 🦾 [ Grab Treasure ] ➔ 🏠 [ Return Home ]`;
      } else if (slot === 28) {
        mapHtml = `
          <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem;">
            <div>[ 🤖 Robo ] ➔ ➡️ [ 🧱 BIG ROCK! (Blocked!) ]</div>
            <div style="color:var(--accent-amber); font-size:0.95rem;">⤵️ Turn Right Around Rock ➔ ➡️ Move Forward ➔ ⤴️ Turn Left</div>
            <div>[ 💎 Gem Treasure ]</div>
          </div>
        `;
      } else if (slot === 30) {
        mapHtml = `[ 🤖 Robo ] ➔ ⚡ [ Power On ] ➔ 🎯 [ Start Task ]`;
      } else if (slot === 60) {
        mapHtml = `[ ⚡ Power On ] ➔ 📡 [ Connect ] ➔ 📱 [ Open App ] ➔ 🎓 [ Start Learning ]`;
      } else {
        mapHtml = `[ 🤖 Robo ] ➔ ➡️ [ ◽ Path ] ➔ 🦾 [ Target Goal ]`;
      }

      return `
        <div style="background: rgba(15,23,42,0.9); border: 2px solid var(--accent-cyan); padding: 0.85rem 1.25rem; border-radius: 14px; margin-bottom: 1.25rem; text-align: center; box-shadow: 0 0 15px rgba(6,182,212,0.2);">
          <div style="font-size: 0.75rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem;">
            🗺️ Mission Route Map
          </div>
          <div style="font-size: 1.05rem; font-weight: 700; color: #fff;">
            ${mapHtml}
          </div>
        </div>

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

    // 2. Picture Match UI — detected by activity.type
    if (activity.type === 'picture_match') {
      const audioPrompt = payload.audioPromptText || activity.instructions || 'Select the matching item';
      const options: any[] = payload.options && payload.options.length > 0 ? payload.options : [
        { label: 'Option A', emoji: '🤖' },
        { label: 'Option B', emoji: '🍎' },
        { label: 'Option C', emoji: '⚽' }
      ];
      return `
        <div style="margin-bottom: 1.25rem; font-size:1.1rem; color:var(--accent-cyan); font-weight:600; text-align:center; background:rgba(6,182,212,0.08); border:1px solid rgba(6,182,212,0.2); border-radius:12px; padding:0.75rem 1rem; display:flex; align-items:center; justify-content:center; gap:0.75rem; flex-wrap:wrap;">
          <span>🔊 "${audioPrompt}"</span>
          <button id="listen-audio-btn" style="background:rgba(6,182,212,0.2); border:1px solid var(--accent-cyan); color:#fff; border-radius:8px; padding:0.35rem 0.85rem; font-size:0.85rem; cursor:pointer; font-weight:700; transition:all 0.2s;">
            🔊 Listen Again
          </button>
        </div>
        <div class="options-grid-3">
          ${options.slice(0, 3).map((opt: any, idx: number) => {
            const label = typeof opt === 'string' ? opt : (opt.label || `Option ${idx + 1}`);
            const emoji = typeof opt === 'object' && opt.emoji ? opt.emoji : (['🤖','🍎','⚽'][idx] || '🎯');
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
      const allHit = answerState.motorClicks.length >= targetsCount;
      return `
        <div class="motor-canvas-container" id="motor-canvas">
          ${!allHit ? `<div class="motor-target" id="target-element" style="top: ${this.motorTargetPos.top}px; left: ${this.motorTargetPos.left}px;"></div>` : ''}
          <div style="position:absolute; bottom:10px; left:15px; font-size:0.85rem; color:var(--text-secondary);">
            Targets Clicked: ${answerState.motorClicks.length} / ${targetsCount}
            ${allHit ? ' ✅ All targets hit!' : ''}
          </div>
        </div>
      `;
    }

    // 4. Default 3-Choice Multiple Choice Grid (pattern_matrix, rule_shift, and any fallback)
    let sequenceList = Array.isArray(payload.sequence) ? payload.sequence : null;
    let gridMatrix = Array.isArray(payload.grid) ? payload.grid : null;

    const slot = activity.slot;
    if (!sequenceList && !gridMatrix && slot) {
      if (slot === 1) sequenceList = ['🔵 Circle', '🔴 Circle', '🔵 Circle', '🔴 Circle', '❓'];
      else if (slot === 2) sequenceList = ['🍎 Apple', '🍎 Apple', '🍌 Banana'];
      else if (slot === 3) sequenceList = ['🔺 Triangle', '🔷 Diamond', '🔺 Triangle', '🔷 Diamond', '❓'];
      else if (slot === 4) sequenceList = ['🐶 Dog', '🐱 Cat', '🦁 Lion'];
      else if (slot === 5) sequenceList = ['🚗 Car', '🚌 Bus', '✈️ Airplane', '🍎 Apple'];
      else if (slot === 6) sequenceList = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '❓'];
      else if (slot === 7) sequenceList = ['🌱 Seed', '➡️', '🌿 Sprout', '➡️', '🌸 Flower'];
      else if (slot === 8) sequenceList = ['⭐ Star', '⭐ Star', '🌙 Moon', '⭐ Star', '⭐ Star', '❓'];
      else if (slot === 9) {
        gridMatrix = [
          ['🔺 Triangle', '⬛ Square', '🔴 Circle'],
          ['⬛ Square', '🔴 Circle', '🔺 Triangle'],
          ['🔴 Circle', '🔺 Triangle', '❓']
        ];
      }
      else if (slot === 10) sequenceList = ['🟢 Green', '🟢 Green', '🟡 Yellow', '🟢 Green', '🟢 Green', '❓'];
      else if (slot === 11) {
        gridMatrix = [
          ['⭕ Circle', '⬛ Square', '🔺 Triangle'],
          ['⬛ Square', '🔺 Triangle', '⭕ Circle'],
          ['🔺 Triangle', '⭕ Circle', '❓']
        ];
      }
      else if (slot === 12) sequenceList = ['☀️ Daytime ➔', '🌙 Nighttime ➔', '☀️ Daytime ➔', '❓'];
      else if (slot === 13) sequenceList = ['🌧️ Rain Outside ➔', '❓ What do you bring?'];
      else if (slot === 14) sequenceList = ['🔑 Key ➔', '🚪 Door ➔', '❓ What happens?'];
      else if (slot === 15) sequenceList = ['🫗 Glass Dropped ➔', '❓ What happens next?'];
    }

    let optionsList = Array.isArray(payload.options) && payload.options.length > 0
      ? payload.options.slice(0, 3)
      : [{ label: 'Choice A' }, { label: 'Choice B' }, { label: 'Choice C' }];

    // Auto-fix generic "Option A" labels with rich visual content per slot:
    if (optionsList.some((o: any) => !o.label || o.label === 'Option A' || o.label === 'Option B')) {
      if (slot === 7) {
        optionsList = [
          { label: '🌱 Seed ➔ 🌿 Sprout ➔ 🌸 Flower', emoji: '🌸', correct: true },
          { label: '🌸 Flower ➔ 🌱 Seed ➔ 🌿 Sprout', emoji: '🌱', correct: false },
          { label: '🌿 Sprout ➔ 🌸 Flower ➔ 🌱 Seed', emoji: '🌿', correct: false }
        ];
      } else if (slot === 8) {
        optionsList = [
          { label: '🌙 Moon', emoji: '🌙', correct: true },
          { label: '⭐ Star', emoji: '⭐', correct: false },
          { label: '☀️ Sun', emoji: '☀️', correct: false }
        ];
      } else if (slot === 9) {
        optionsList = [
          { label: '🟩 Green Square', emoji: '🟩', correct: true },
          { label: '🔴 Red Circle', emoji: '🔴', correct: false },
          { label: '🔷 Blue Triangle', emoji: '🔷', correct: false }
        ];
      } else if (slot === 11) {
        optionsList = [
          { label: '⬛ Square', emoji: '⬛', correct: true },
          { label: '⭕ Circle', emoji: '⭕', correct: false },
          { label: '🔺 Triangle', emoji: '🔺', correct: false }
        ];
      } else if (slot === 15) {
        optionsList = [
          { label: '💥 The glass shatters', emoji: '💥', correct: true },
          { label: '🎈 It floats in the air', emoji: '🎈', correct: false },
          { label: '🍎 It turns into an apple', emoji: '🍎', correct: false }
        ];
      }
    }

    return `
      ${gridMatrix ? `
        <div style="display:flex; justify-content:center; margin-bottom:1.5rem;">
          <div style="background: rgba(15,23,42,0.9); border: 2px solid var(--accent-cyan); padding: 1rem 1.5rem; border-radius: 16px; box-shadow: 0 0 20px rgba(6,182,212,0.2);">
            <div style="display:grid; grid-template-columns: repeat(${gridMatrix[0].length}, 1fr); gap: 0.75rem; text-align: center;">
              ${gridMatrix.map(row => row.map((cell: string) => `
                <div style="font-size: 1.5rem; background: rgba(255,255,255,0.06); padding: 0.75rem 1.25rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); color: ${cell.includes('❓') ? 'var(--accent-cyan)' : '#fff'}; font-weight: bold;">
                  ${cell}
                </div>
              `).join('')).join('')}
            </div>
          </div>
        </div>
      ` : ''}

      ${sequenceList ? `
        <div style="font-size: 1.8rem; display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); padding: 1rem 1.5rem; border-radius: 14px; justify-content: center; align-items: center; flex-wrap: wrap; text-align: center;">
          ${sequenceList.map((item: string) => `<span style="background:rgba(255,255,255,0.05); padding:0.4rem 0.8rem; border-radius:8px; color:${item.includes('❓') ? 'var(--accent-cyan)' : '#fff'}">${item}</span>`).join('')}
        </div>
      ` : ''}

      <div class="options-grid-3">
        ${optionsList.map((opt: any, idx: number) => {
          const labelText = typeof opt === 'string' ? opt : (opt.label || opt.text || JSON.stringify(opt));
          const emoji = typeof opt === 'object' && opt.emoji ? opt.emoji : '';
          return `
            <button class="option-btn-3 ${answerState.selectedAnswerIndex === idx ? 'selected' : ''}" data-opt="${idx}">
              ${emoji ? `<span style="font-size: 2rem; display:block; margin-bottom:0.3rem;">${emoji}</span>` : ''}
              <span style="font-size:1rem; font-weight:600;">${labelText}</span>
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
    // Safety guard: if a load is already in progress, don't attach submit listener again.
    // The submit button is already rendered as disabled; this prevents keyboard/programmatic triggering.
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

    // Listen Audio button handler
    const listenAudioBtn = this.container.querySelector('#listen-audio-btn');
    if (listenAudioBtn) {
      listenAudioBtn.addEventListener('click', () => {
        const activity = this.cachedActivities[this.currentQuestionIndex];
        if (activity) {
          const promptText = activity.payload?.audioPromptText || activity.instructions || 'Select the matching item';
          this.speakAudio(promptText);
        }
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
        const newTop = Math.floor(Math.random() * (canvasRect.height - 80)) + 10;
        const newLeft = Math.floor(Math.random() * (canvasRect.width - 80)) + 10;
        this.motorTargetPos = { top: newTop, left: newLeft };

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

    // Exit Exam button and modal handlers
    const exitBtn = this.container.querySelector('#exit-exam-btn');
    const exitOverlay = this.container.querySelector('#exit-confirm-overlay') as HTMLElement;
    const cancelExitBtn = this.container.querySelector('#cancel-exit-btn');
    const confirmExitBtn = this.container.querySelector('#confirm-exit-btn');

    if (exitBtn && exitOverlay) {
      exitBtn.addEventListener('click', () => {
        exitOverlay.style.display = 'flex';
      });
    }
    if (cancelExitBtn && exitOverlay) {
      cancelExitBtn.addEventListener('click', () => {
        exitOverlay.style.display = 'none';
      });
    }
    if (confirmExitBtn) {
      confirmExitBtn.addEventListener('click', () => {
        AssessmentRunner.clearSavedSession();
        localStorage.removeItem('cognix_active_assessment_session');
        localStorage.removeItem('cognix_assessment_session');
        window.location.reload();
      });
    }

    // Confirm & Next Submit Button
    const submitAnswerBtn = this.container.querySelector('#submit-answer-btn');
    if (submitAnswerBtn) {
      submitAnswerBtn.addEventListener('click', () => {
        // Triple-lock guard: button is visually disabled + this runtime check + loadGen counter
        if (this.isLoadingNextQuestion) return;
        this.recordQuestionTimeData(answerState.isSolved);
        this.advanceToNextQuestion();
      });
    }

  }

  private showCompletionLoadingScreen() {
    this.container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; padding:3rem 1rem;">
        <div style="font-size:4rem; margin-bottom:1.5rem; animation:bounce 1.5s infinite;">🎉</div>
        <h2 style="font-size:2rem; font-weight:800; color:#fff; margin-bottom:0.75rem;">Assessment Complete!</h2>
        <p style="color:var(--text-secondary); font-size:1.05rem; margin-bottom:2rem; max-width:460px;">
          Amazing work! Your results are being compiled and your personalised AI report is being generated...
        </p>
        <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(6,182,212,0.12); border:1px solid rgba(6,182,212,0.3); padding:1rem 2rem; border-radius:20px;">
          <div style="width:18px; height:18px; border-radius:50%; border:3px solid var(--accent-cyan); border-top-color:transparent; animation:spin 0.9s linear infinite;"></div>
          <span style="color:var(--accent-cyan); font-weight:700; font-size:1rem;">Generating Your Report...</span>
        </div>
      </div>
    `;
  }

  private async completeAssessment() {
    if (this.globalTimerInterval) clearInterval(this.globalTimerInterval);
    if (this.questionTimerInterval) clearInterval(this.questionTimerInterval);

    this.detachBeforeUnload();
    AssessmentRunner.clearSavedSession();

    // Show loading screen while compiling report
    this.showCompletionLoadingScreen();

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


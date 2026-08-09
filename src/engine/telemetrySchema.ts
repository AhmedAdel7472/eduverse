export type AssessmentDomain = 
  | 'cognitive_ability'
  | 'functional_skills'
  | 'communication_level'
  | 'behavioral_readiness'
  | 'fine_motor_technology';

export type SkillName = 
  // Cognitive
  | 'pattern_recognition'
  | 'logical_reasoning'
  | 'sequencing'
  | 'classification'
  | 'cause_and_effect'
  | 'visual_memory'
  // Functional
  | 'following_instructions'
  | 'attention'
  | 'working_memory'
  | 'task_completion'
  | 'problem_solving'
  // Communication
  | 'listening'
  | 'vocabulary'
  | 'understanding_instructions'
  | 'picture_matching'
  | 'verbal_comprehension'
  // Behavioral
  | 'persistence'
  | 'adaptability'
  | 'flexibility'
  | 'error_recovery'
  | 'response_to_feedback'
  // Fine Motor
  | 'mouse_control'
  | 'touch_interaction'
  | 'drag_and_drop'
  | 'keyboard_navigation'
  | 'basic_robot_control';

export interface FineMotorMetrics {
  drag_accuracy_pct: number;       // 0 - 100%
  click_precision_px: number;      // distance from center of target
  path_smoothness_ratio: number;   // 0.0 - 1.0 (ideal path vs actual path)
}

export interface BehavioralMetrics {
  hesitation_time_ms: number;
  recovery_after_rule_change: boolean;
  adaptation_speed_ms: number;
  attempts_after_hint: number;
}

export interface ItemTelemetry {
  item_id: string;
  domain: AssessmentDomain;
  skill: SkillName;
  difficulty_level: number;       // 1 (easy) to 5 (advanced)
  is_correct: boolean;
  accuracy_score: number;         // 0.0 to 1.0 (partial credit possible)
  response_time_ms: number;
  expected_time_ms: number;
  attempts_count: number;
  hints_used: number;
  fine_motor?: FineMotorMetrics;
  behavioral?: BehavioralMetrics;
}

export interface DomainScore {
  domain: AssessmentDomain;
  domain_name: string;
  weight_pct: number;
  max_score: number;
  raw_accuracy_pct: number;
  efficiency_index: number;       // 0.0 - 1.0 based on response speed & attempts
  earned_score: number;           // Calculated out of max_score
  skills_breakdown: Record<string, number>; // Skill -> score (0-100%)
}

export interface QuestionTimeRecord {
  questionSlot: number;              // 1-60
  domain: AssessmentDomain;
  subSkill: string;                  // e.g., "visual_discrimination"
  questionTitle: string;
  questionStartTimestamp: number;    // Date.now() when question appeared
  questionEndTimestamp: number;      // Date.now() when question was locked
  totalDurationMs: number;           // end - start (wall clock)
  pausedDurationMs: number;          // total ms spent paused during this question
  activeDurationMs: number;          // totalDuration - pausedDuration (actual thinking time)
  responseLatencyMs: number | null;  // ms from question appearing to first answer click (null if never answered)
  answeredAt: number | null;         // timestamp of answer selection (null if timed out)
  timedOut: boolean;                 // true if the 1:30 expired before answering
  wasAnswered: boolean;              // true if student selected an answer before time ran out
  remainingTimeWhenAnsweredMs: number | null; // how many ms were left on the countdown when they answered
  breaksDuringQuestion: number;      // how many times the student paused during this question
  earnedScore: number;               // Points earned for this question
  maxScore: number;                  // Max points possible for this question
}

export interface BreakEvent {
  breakIndex: number;                // sequential break number (1, 2, 3...)
  questionSlotAtPause: number;       // which question was active when paused
  domainAtPause: AssessmentDomain;   // which domain was active
  pauseStartTimestamp: number;       // Date.now() when pause was pressed
  resumeTimestamp: number;           // Date.now() when resume was pressed
  breakDurationMs: number;           // resume - pauseStart
  countdownRemainingAtPause: number; // how many ms were left on the question timer
}

export interface StudentSessionTelemetry {
  session_id: string;
  student_name: string;
  age_group: '4-6' | '7-9' | '10-12' | '13+';
  start_time: string;
  end_time?: string;
  item_telemetries: ItemTelemetry[];
  domain_scores: Record<AssessmentDomain, DomainScore>;
  total_score: number;            // 0 - 100
  placed_track: string;
  recommended_track: string;
  flags: string[];
  qualitative_summary?: string;
  
  // CEO Time & Analytics
  question_time_records: QuestionTimeRecord[];
  break_events: BreakEvent[];
  total_breaks_count: number;
  total_break_duration_ms: number;
  total_active_duration_ms: number;
  total_wall_clock_duration_ms: number;
  domain_time_summary: Record<AssessmentDomain, {
    totalActiveMs: number;
    totalPausedMs: number;
    questionsTimedOut: number;
    avgResponseLatencyMs: number;
  }>;
}


import { AssessmentDomain, DomainScore, ItemTelemetry } from './telemetrySchema';

export interface PlacementResult {
  totalScore: number;
  baseTrack: string;
  recommendedTrack: string;
  flags: { id: string; type: 'warning' | 'info' | 'critical'; title: string; description: string }[];
  requiresSupport: boolean;
  performanceIndicators: {
    overallAccuracy: number;
    avgResponseSpeedRatio: number;
    hintDependencyRatio: number;
    adaptabilityIndex: number;
    learningProgressVelocity: 'High' | 'Steady' | 'Needs Practice';
  };
}

export class PlacementEngine {
  /**
   * Determine track placement and flag critical domain deficiencies.
   */
  public static evaluatePlacement(
    totalScore: number,
    domainScores: Record<AssessmentDomain, DomainScore>,
    items: ItemTelemetry[]
  ): PlacementResult {
    // Base Track Placement mapping (4 Levels per specification)
    let baseTrack = 'Explorer';
    if (totalScore >= 90) {
      baseTrack = 'Innovator';
    } else if (totalScore >= 75) {
      baseTrack = 'Creator';
    } else if (totalScore >= 60) {
      baseTrack = 'Builder';
    } else {
      baseTrack = 'Explorer';
    }

    const flags: PlacementResult['flags'] = [];

    // Critical Threshold Checks
    // 1. Cognitive Ability < 40% of max score (10 / 25)
    const cogScore = domainScores.cognitive_ability?.earned_score || 0;
    if (cogScore < 10) {
      flags.push({
        id: 'FLAG_COGNITIVE_DEFICIENCY',
        type: 'critical',
        title: 'Cognitive Foundation Support',
        description: 'Student demonstrated difficulty in pattern recognition and logical reasoning. Targeted logic puzzles recommended before advancing.'
      });
    }

    // 2. Functional Skills < 40% of max score (10 / 25)
    const funcScore = domainScores.functional_skills?.earned_score || 0;
    if (funcScore < 10) {
      flags.push({
        id: 'FLAG_FUNCTIONAL_DEFICIENCY',
        type: 'critical',
        title: 'Multi-Step Mission Support',
        description: 'Student requires scaffolded instruction following and working memory exercises.'
      });
    }

    // 3. Communication Level < 35% of max score (7 / 20)
    const commScore = domainScores.communication_level?.earned_score || 0;
    if (commScore < 7) {
      flags.push({
        id: 'FLAG_COMMUNICATION_SUPPORT',
        type: 'warning',
        title: 'Verbal & Visual Comprehension Support',
        description: 'Audio visual cues and simplified instructions recommended during missions.'
      });
    }

    // 4. Behavioral Readiness < 35% of max score (5.25 / 15)
    const behScore = domainScores.behavioral_readiness?.earned_score || 0;
    if (behScore < 5.25) {
      flags.push({
        id: 'FLAG_BEHAVIORAL_ADAPTABILITY',
        type: 'warning',
        title: 'Error Recovery & Resilience Support',
        description: 'Student showed hesitation or frustration during unexpected rule changes. Guided error-recovery feedback advised.'
      });
    }

    // 5. Fine Motor & Tech < 35% of max score (5.25 / 15)
    const motorScore = domainScores.fine_motor_technology?.earned_score || 0;
    if (motorScore < 5.25) {
      flags.push({
        id: 'FLAG_FINE_MOTOR_SUPPORT',
        type: 'info',
        title: 'Digital Navigation Practice',
        description: 'Drag-and-drop and target precision practice recommended for smooth touch/mouse control.'
      });
    }

    const requiresSupport = flags.some(f => f.type === 'critical');
    let recommendedTrack = baseTrack;
    if (requiresSupport && baseTrack !== 'Explorer') {
      recommendedTrack = `${baseTrack} (with Targeted Support)`;
    }

    // Qualitative Performance Indicators
    let totalItems = items.length || 1;
    let correctCount = items.filter(i => i.is_correct).length;
    let totalHints = items.reduce((acc, i) => acc + i.hints_used, 0);
    let avgSpeedRatio = items.reduce((acc, i) => acc + (i.response_time_ms / Math.max(1000, i.expected_time_ms)), 0) / totalItems;

    // Behavioral item evaluation for adaptability
    const behavioralItems = items.filter(i => i.domain === 'behavioral_readiness');
    let adaptabilityIndex = 0.75;
    if (behavioralItems.length > 0) {
      const avgBehScore = behavioralItems.reduce((acc, i) => acc + i.accuracy_score, 0) / behavioralItems.length;
      adaptabilityIndex = Math.round(avgBehScore * 100) / 100;
    }

    // Velocity trend (first half vs second half accuracy)
    let velocity: 'High' | 'Steady' | 'Needs Practice' = 'Steady';
    if (items.length >= 4) {
      const half = Math.floor(items.length / 2);
      const firstHalfAcc = items.slice(0, half).reduce((a, b) => a + b.accuracy_score, 0) / half;
      const secondHalfAcc = items.slice(half).reduce((a, b) => a + b.accuracy_score, 0) / (items.length - half);
      if (secondHalfAcc - firstHalfAcc > 0.15) {
        velocity = 'High';
      } else if (secondHalfAcc < 0.4) {
        velocity = 'Needs Practice';
      }
    }

    return {
      totalScore,
      baseTrack,
      recommendedTrack,
      flags,
      requiresSupport,
      performanceIndicators: {
        overallAccuracy: Math.round((correctCount / totalItems) * 100),
        avgResponseSpeedRatio: Math.round(avgSpeedRatio * 100) / 100,
        hintDependencyRatio: Math.round((totalHints / totalItems) * 100) / 100,
        adaptabilityIndex,
        learningProgressVelocity: velocity
      }
    };
  }
}

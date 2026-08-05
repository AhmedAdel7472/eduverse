import { AssessmentDomain, DomainScore, ItemTelemetry } from './telemetrySchema';

export const DOMAIN_CONFIG: Record<AssessmentDomain, { name: string; weight: number; maxScore: number; questionCount: number }> = {
  cognitive_ability: { name: 'Cognitive Ability', weight: 0.25, maxScore: 25, questionCount: 5 },
  functional_skills: { name: 'Functional Skills', weight: 0.25, maxScore: 25, questionCount: 5 },
  communication_level: { name: 'Communication Level', weight: 0.20, maxScore: 20, questionCount: 4 },
  behavioral_readiness: { name: 'Behavioral Learning Readiness', weight: 0.15, maxScore: 15, questionCount: 3 },
  fine_motor_technology: { name: 'Fine Motor & Technology Skills', weight: 0.15, maxScore: 15, questionCount: 3 }
};

export class ScoringEngine {
  /**
   * Calculates raw item score Q_i out of 5.0 points according to the standardized formula:
   * Q_i = 5.0 * accuracy * multiplier_time * multiplier_hints * multiplier_attempts
   */
  public static calculateItemScore(item: ItemTelemetry): number {
    if (!item.is_correct && item.accuracy_score === 0) {
      return 0;
    }

    const accuracy = Math.max(0, Math.min(1.0, item.accuracy_score));

    // Time efficiency multiplier: max(0.7, 1.0 - 0.1 * max(0, (T_actual - T_exp) / T_exp))
    const timeRatio = Math.max(0, (item.response_time_ms - item.expected_time_ms) / Math.max(1000, item.expected_time_ms));
    const multiplierTime = Math.max(0.7, 1.0 - 0.1 * timeRatio);

    // Hint multiplier: max(0.5, 1.0 - 0.15 * hints_used)
    const multiplierHints = Math.max(0.5, 1.0 - 0.15 * item.hints_used);

    // Attempt multiplier: max(0.6, 1.0 - 0.10 * (attempts - 1))
    const multiplierAttempts = Math.max(0.6, 1.0 - 0.10 * Math.max(0, item.attempts_count - 1));

    const rawPoints = 5.0 * accuracy * multiplierTime * multiplierHints * multiplierAttempts;
    return Math.max(0, Math.min(5.0, Math.round(rawPoints * 10) / 10));
  }

  /**
   * Aggregate domain scores from session items across the 20-question matrix.
   */
  public static calculateDomainScores(items: ItemTelemetry[]): Record<AssessmentDomain, DomainScore> {
    const domains: AssessmentDomain[] = [
      'cognitive_ability',
      'functional_skills',
      'communication_level',
      'behavioral_readiness',
      'fine_motor_technology'
    ];

    const result: Record<string, DomainScore> = {};

    for (const domainKey of domains) {
      const config = DOMAIN_CONFIG[domainKey];
      const domainItems = items.filter(i => i.domain === domainKey);

      if (domainItems.length === 0) {
        result[domainKey] = {
          domain: domainKey,
          domain_name: config.name,
          weight_pct: config.weight * 100,
          max_score: config.maxScore,
          raw_accuracy_pct: 0,
          efficiency_index: 0,
          earned_score: 0,
          skills_breakdown: {}
        };
        continue;
      }

      let totalEarnedDomainPts = 0;
      let totalAcc = 0;
      const skillsMap: Record<string, { total: number; count: number }> = {};

      for (const item of domainItems) {
        const itemPts = this.calculateItemScore(item);
        totalEarnedDomainPts += itemPts;
        totalAcc += item.accuracy_score;

        if (!skillsMap[item.skill]) {
          skillsMap[item.skill] = { total: 0, count: 0 };
        }
        skillsMap[item.skill].total += (itemPts / 5.0);
        skillsMap[item.skill].count += 1;
      }

      const count = domainItems.length;
      const avgAcc = (totalAcc / count) * 100;
      const earnedScore = Math.min(config.maxScore, Math.round(totalEarnedDomainPts * 10) / 10);

      const skillsBreakdown: Record<string, number> = {};
      for (const [skill, val] of Object.entries(skillsMap)) {
        skillsBreakdown[skill] = Math.round((val.total / val.count) * 100);
      }

      result[domainKey] = {
        domain: domainKey,
        domain_name: config.name,
        weight_pct: config.weight * 100,
        max_score: config.maxScore,
        raw_accuracy_pct: Math.round(avgAcc),
        efficiency_index: Math.round((earnedScore / config.maxScore) * 100) / 100,
        earned_score: earnedScore,
        skills_breakdown: skillsBreakdown
      };
    }

    return result as Record<AssessmentDomain, DomainScore>;
  }

  /**
   * Total Technology Readiness Score (0 - 100).
   */
  public static calculateTotalScore(domainScores: Record<AssessmentDomain, DomainScore>): number {
    let total = 0;
    for (const ds of Object.values(domainScores)) {
      total += ds.earned_score;
    }
    return Math.min(100, Math.round(total * 10) / 10);
  }
}

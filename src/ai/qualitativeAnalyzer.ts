import { StudentSessionTelemetry } from '../engine/telemetrySchema';
import { PlacementResult } from '../engine/placementEngine';
import { AzureOpenAIClient } from './azureOpenAIClient';

export class QualitativeAnalyzer {
  private client: AzureOpenAIClient;

  constructor() {
    this.client = new AzureOpenAIClient();
  }

  /**
   * Generates a comprehensive qualitative assessment report using telemetry metrics.
   */
  public async generateReportSummary(
    session: StudentSessionTelemetry,
    placement: PlacementResult
  ): Promise<string> {
    const prompt = `Analyze this student assessment telemetry and provide a 3-paragraph diagnostic summary:
Student: ${session.student_name}
Total Score: ${placement.totalScore}/100
Placed Track: ${placement.recommendedTrack}
Overall Accuracy: ${placement.performanceIndicators.overallAccuracy}%
Adaptability Index: ${placement.performanceIndicators.adaptabilityIndex}
Learning Velocity: ${placement.performanceIndicators.learningProgressVelocity}
Flags: ${placement.flags.map(f => f.title).join(', ') || 'None'}
`;

    const aiText = await this.client.generateCompletion(prompt, false);
    if (aiText) {
      return aiText;
    }

    // High quality deterministic evaluation report
    return this.getBuiltInReport(session, placement);
  }

  private getBuiltInReport(session: StudentSessionTelemetry, placement: PlacementResult): string {
    const { totalScore, recommendedTrack, performanceIndicators, flags } = placement;

    let summary = `### Executive Assessment Summary\n`;
    summary += `**${session.student_name}** completed the AI Digital Placement Assessment, achieving a **Technology Readiness Score of ${totalScore}/100**, placing into the **${recommendedTrack}** track.\n\n`;

    summary += `### Cognitive & Problem-Solving Approach\n`;
    if (performanceIndicators.overallAccuracy >= 80) {
      summary += `The student demonstrated high analytical accuracy (${performanceIndicators.overallAccuracy}%) with strong working memory and spatial pattern recognition. Tasks were completed with minimal reliance on hints (${performanceIndicators.hintDependencyRatio} hints/item).\n\n`;
    } else {
      summary += `The student displayed promising problem-solving initiative with an overall accuracy of ${performanceIndicators.overallAccuracy}%. Performance was boosted by scaffolded hints and trial-and-error feedback.\n\n`;
    }

    summary += `### Adaptability & Tech Readiness\n`;
    summary += `During the dynamic rule-switch challenges, the student achieved an Adaptability Index of **${performanceIndicators.adaptabilityIndex}**, displaying a **${performanceIndicators.learningProgressVelocity}** learning progress velocity across progressive difficulty levels. `;

    if (flags.length > 0) {
      summary += `\n\n> [!NOTE]\n> **Targeted Support Areas Identified**: ${flags.map(f => f.title).join(' • ')}. Targeted practice modules are recommended to solidify these core competencies.`;
    } else {
      summary += `\n\n> [!TIP]\n> **Strengths Spotlight**: Well-rounded mastery observed across all five competency domains. Prepared for direct engagement with advanced robotics and interactive programming modules.`;
    }

    return summary;
  }
}

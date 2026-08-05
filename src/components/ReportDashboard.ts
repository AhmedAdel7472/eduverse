import { StudentSessionTelemetry } from '../engine/telemetrySchema';
import { PlacementResult } from '../engine/placementEngine';
import confetti from 'canvas-confetti';

export function renderReportDashboard(
  container: HTMLElement,
  session: StudentSessionTelemetry,
  placement: PlacementResult
) {
  // Trigger celebratory confetti if score >= 50 or completed successfully
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {
    // Ignore if canvas-confetti is loading
  }

  const { totalScore, recommendedTrack, flags, performanceIndicators } = placement;

  let flagsHtml = '';
  if (flags.length > 0) {
    flagsHtml = flags.map(flag => `
      <div class="flag-alert ${flag.type === 'critical' ? 'critical' : ''}">
        <div style="font-size: 1.25rem;">⚠️</div>
        <div>
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${flag.title}</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">${flag.description}</p>
        </div>
      </div>
    `).join('');
  }

  const domainBarsHtml = Object.values(session.domain_scores).map(ds => {
    const pct = Math.round((ds.earned_score / ds.max_score) * 100);
    return `
      <div class="domain-progress-bar">
        <div class="bar-label">
          <span><strong>${ds.domain_name}</strong> (${ds.weight_pct}% Weight)</span>
          <span><strong>${ds.earned_score}</strong> / ${ds.max_score} Pts (${pct}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${pct}%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue));"></div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="glass-card" style="padding: 2.5rem;">
      <div style="text-align: center; margin-bottom: 2rem;">
        <span style="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald); padding: 0.35rem 1rem; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">
          ✅ Assessment Evaluation Complete
        </span>
        <h1 style="font-size: 2.2rem; font-weight: 800; margin-top: 0.75rem; background: linear-gradient(135deg, #fff, var(--accent-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          AI Digital Placement Report
        </h1>
        <p style="color: var(--text-secondary); font-size: 1rem; margin-top: 0.25rem;">
          Student: <strong>${session.student_name}</strong> • Age Group: ${session.age_group}
        </p>
      </div>

      <div class="report-grid">
        <!-- Placement & Gauge Card -->
        <div class="placement-badge-card">
          <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-secondary);">
            Technology Readiness Score
          </div>
          
          <div class="score-circle" style="--score-pct: ${totalScore};">
            <span class="score-text">${totalScore}</span>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-secondary);">Recommended Track</div>
          <div class="track-title">${recommendedTrack}</div>

          <div style="margin-top: 1.5rem; width: 100%; border-top: 1px solid var(--border-color); padding-top: 1rem; text-align: left; font-size: 0.85rem; color: var(--text-secondary);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Accuracy:</span> <strong>${performanceIndicators.overallAccuracy}%</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Adaptability Index:</span> <strong>${performanceIndicators.adaptabilityIndex}</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Learning Velocity:</span> <strong>${performanceIndicators.learningProgressVelocity}</strong>
            </div>
          </div>
        </div>

        <!-- Domain Breakdown & AI Qualitative Insights -->
        <div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-primary);">
            Competency Domain Performance
          </h3>
          
          ${domainBarsHtml}

          ${flagsHtml}

          <div style="margin-top: 2rem; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;" class="summary-md">
            ${session.qualitative_summary ? formatMarkdown(session.qualitative_summary) : ''}
          </div>
        </div>
      </div>

      <div style="margin-top: 2.5rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <button class="btn btn-primary" id="restart-btn" style="margin: 0 auto;">
          🔄 Retake Placement Assessment
        </button>
      </div>
    </div>
  `;

  const restartBtn = container.querySelector('#restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }
}

function formatMarkdown(text: string): string {
  return text
    .replace(/^### (.*$)/gim, '<h3 style="color:var(--text-primary); font-size:1.05rem; margin-top:1rem; margin-bottom:0.4rem;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.*$)/gim, '<blockquote style="border-left:3px solid var(--accent-cyan); padding-left:0.8rem; margin:0.8rem 0; color:var(--accent-cyan); font-size:0.9rem;">$1</blockquote>');
}

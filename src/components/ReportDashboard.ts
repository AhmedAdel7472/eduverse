import { StudentSessionTelemetry, QuestionTimeRecord, BreakEvent } from '../engine/telemetrySchema';
import { PlacementResult } from '../engine/placementEngine';
import confetti from 'canvas-confetti';

export function renderReportDashboard(
  container: HTMLElement,
  session: StudentSessionTelemetry,
  placement: PlacementResult
) {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  } catch (e) {}

  const { totalScore, recommendedTrack, flags, performanceIndicators } = placement;

  // Flags HTML
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

  // Domain progress bars
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

  // --- SECTION A: 60-Row Per-Question Time Analysis Table ---
  const timeRecords = session.question_time_records || [];
  const timeTableRows = timeRecords.map(r => {
    if (!r) return '';
    const activeSecs = Math.round(r.activeDurationMs / 1000);
    const latencySecs = r.responseLatencyMs ? (r.responseLatencyMs / 1000).toFixed(1) + 's' : '—';
    const remainingSecs = r.remainingTimeWhenAnsweredMs ? Math.round(r.remainingTimeWhenAnsweredMs / 1000) + 's' : '0s';

    let statusBadge = '<span style="color:#10b981; font-weight:700;">🟢 Fast</span>';
    if (r.timedOut) {
      statusBadge = '<span style="color:#ef4444; font-weight:700;">⏰ Timed Out</span>';
    } else if (activeSecs > 80) {
      statusBadge = '<span style="color:#f59e0b; font-weight:700;">🔴 Slow</span>';
    } else if (activeSecs > 45) {
      statusBadge = '<span style="color:#3b82f6; font-weight:700;">🟡 Normal</span>';
    }

    const rowBg = r.timedOut ? 'background:rgba(239,68,68,0.08);' : '';

    return `
      <tr style="${rowBg} border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.85rem;">
        <td style="padding:0.6rem 0.8rem; font-weight:700; text-align:center;">Q${r.questionSlot}</td>
        <td style="padding:0.6rem 0.8rem;">
          <span style="font-size:0.75rem; background:rgba(6,182,212,0.15); color:var(--accent-cyan); padding:0.25rem 0.5rem; border-radius:6px;">
            ${r.domain.replace('_', ' ')}
          </span>
        </td>
        <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary);">${r.subSkill}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${activeSecs}s</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${latencySecs}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${remainingSecs}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${statusBadge}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${r.breaksDuringQuestion > 0 ? `⏸️ ${r.breaksDuringQuestion}` : '0'}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center; font-weight:700;">${r.earnedScore} / ${r.maxScore}</td>
      </tr>
    `;
  }).join('');

  // --- SECTION C: Break History Log ---
  const breakEvents = session.break_events || [];
  let breakLogHtml = '';
  if (breakEvents.length > 0) {
    breakLogHtml = breakEvents.map(b => {
      const durMins = Math.floor(b.breakDurationMs / 60000);
      const durSecs = Math.round((b.breakDurationMs % 60000) / 1000);
      const remSecs = Math.round(b.countdownRemainingAtPause);
      return `
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); padding:0.75rem 1rem; border-radius:10px; margin-bottom:0.5rem; font-size:0.88rem;">
          <div>
            <strong>Break #${b.breakIndex}</strong> • During <strong>Q${b.questionSlotAtPause}</strong> (${b.domainAtPause.replace('_', ' ')})
          </div>
          <div style="color:var(--accent-amber); font-weight:700;">
            Duration: ${durMins > 0 ? `${durMins}m ` : ''}${durSecs}s (Timer left: ${remSecs}s)
          </div>
        </div>
      `;
    }).join('');
  } else {
    breakLogHtml = `
      <div style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-emerald); color:var(--accent-emerald); padding:1rem; border-radius:10px; font-weight:600; text-align:center;">
        ✅ No breaks taken — Student completed all 60 questions continuously without pausing.
      </div>
    `;
  }

  // --- SECTION D & E: CEO Summary Numbers ---
  const totalActiveMins = Math.round((session.total_active_duration_ms || 0) / 60000);
  const totalBreakMins = Math.round((session.total_break_duration_ms || 0) / 60000);
  const totalWallMins = Math.round((session.total_wall_clock_duration_ms || 0) / 60000);
  const totalTimedOutCount = timeRecords.filter(r => r?.timedOut).length;

  container.innerHTML = `
    <div class="glass-card" style="padding: 2.5rem; max-width:1150px; margin:0 auto;">
      
      <!-- Top Action Controls -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
        <span style="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald); padding: 0.35rem 1rem; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">
          ✅ 60-Question SEN Assessment Complete
        </span>
        <div style="display:flex; gap:0.75rem;">
          <button id="download-csv-btn" class="btn btn-secondary" style="font-size:0.85rem;">
            📊 Export CSV (CEO Report)
          </button>
          <button id="print-report-btn" class="btn btn-secondary" style="font-size:0.85rem;">
            🖨️ Print Executive Report
          </button>
        </div>
      </div>

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2.2rem; font-weight: 800; background: linear-gradient(135deg, #fff, var(--accent-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          AI Digital Technology Placement Report
        </h1>
        <p style="color: var(--text-secondary); font-size: 1rem; margin-top: 0.25rem;">
          Student: <strong>${session.student_name}</strong> • Age Group: ${session.age_group} • 60 Items Assessed
        </p>
      </div>

      <div class="report-grid" style="grid-template-columns: 320px 1fr;">
        <!-- Placement & Gauge Card -->
        <div class="placement-badge-card">
          <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-secondary);">
            Technology Readiness Score
          </div>
          
          <div class="score-circle" style="--score-pct: ${totalScore};">
            <span class="score-text">${totalScore}</span>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-secondary);">Recommended Level & Track</div>
          <div class="track-title">${recommendedTrack}</div>

          <div style="margin-top: 1.5rem; width: 100%; border-top: 1px solid var(--border-color); padding-top: 1rem; text-align: left; font-size: 0.85rem; color: var(--text-secondary);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Accuracy:</span> <strong>${performanceIndicators.overallAccuracy}%</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Total Active Time:</span> <strong>${totalActiveMins} min</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Total Breaks Taken:</span> <strong>${session.total_breaks_count || 0} (${totalBreakMins} min)</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Questions Timed Out:</span> <strong style="color:${totalTimedOutCount > 0 ? '#ef4444' : 'inherit'};">${totalTimedOutCount} / 60</strong>
            </div>
          </div>
        </div>

        <!-- Domain Breakdown -->
        <div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-primary);">
            Competency Domain Performance (60 Questions)
          </h3>
          
          ${domainBarsHtml}

          ${flagsHtml}
        </div>
      </div>

      <!-- CEO Executive Analytics Grid -->
      <div style="margin-top: 2.5rem; border-top: 1px solid var(--border-color); padding-top: 2rem;">
        <h3 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 1.25rem; color: var(--accent-cyan); display:flex; align-items:center; gap:0.5rem;">
          📈 Executive Time & Attention Analytics (CEO Report)
        </h3>

        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:1rem; margin-bottom:2rem;">
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Active Thinking Time</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-cyan); margin-top:0.25rem;">${totalActiveMins} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Actual task engagement</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Pause / Break Time</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-amber); margin-top:0.25rem;">${totalBreakMins} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">${session.total_breaks_count || 0} breaks recorded</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Wall Clock Duration</div>
            <div style="font-size:1.8rem; font-weight:800; color:#fff; margin-top:0.25rem;">${totalWallMins} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Total session length</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">On-Task Focus Ratio</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-emerald); margin-top:0.25rem;">
              ${totalWallMins > 0 ? Math.round((totalActiveMins / totalWallMins) * 100) : 100}%
            </div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Active vs total time</div>
          </div>
        </div>

        <!-- Section C: Break Log -->
        <div style="margin-bottom:2.5rem;">
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:1rem;">
            ⏸️ Break & Pause Log
          </h4>
          ${breakLogHtml}
        </div>

        <!-- Section A: 60-Row Per-Question Time Table -->
        <div>
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:1rem;">
            📋 Detailed Per-Question Time Breakdown (60 Items)
          </h4>
          <div style="max-height:420px; overflow-y:auto; border:1px solid var(--border-color); border-radius:12px; background:rgba(15,23,42,0.6);">
            <table style="width:100%; border-collapse:collapse; text-align:left;">
              <thead style="position:sticky; top:0; background:rgba(30,41,59,0.95); z-index:10; font-size:0.8rem; text-transform:uppercase; color:var(--text-secondary);">
                <tr>
                  <th style="padding:0.75rem 0.8rem; text-align:center;">#</th>
                  <th style="padding:0.75rem 0.8rem;">Domain</th>
                  <th style="padding:0.75rem 0.8rem;">Sub-Skill</th>
                  <th style="padding:0.75rem 0.8rem; text-align:center;">Active Time</th>
                  <th style="padding:0.75rem 0.8rem; text-align:center;">First Reaction</th>
                  <th style="padding:0.75rem 0.8rem; text-align:center;">Timer Left</th>
                  <th style="padding:0.75rem 0.8rem; text-align:center;">Speed Status</th>
                  <th style="padding:0.75rem 0.8rem; text-align:center;">Pauses</th>
                  <th style="padding:0.75rem 0.8rem; text-align:center;">Points</th>
                </tr>
              </thead>
              <tbody>
                ${timeTableRows}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Qualitative AI Summary -->
        <div style="margin-top: 2rem; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;" class="summary-md">
          ${session.qualitative_summary ? formatMarkdown(session.qualitative_summary) : ''}
        </div>
      </div>

      <div style="margin-top: 2.5rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <button class="btn btn-primary" id="restart-btn" style="margin: 0 auto;">
          🔄 Retake Placement Assessment
        </button>
      </div>
    </div>
  `;

  // Attach Export/Print/Retake listeners
  const restartBtn = container.querySelector('#restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      window.location.reload();
    });
  }

  const printBtn = container.querySelector('#print-report-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  const csvBtn = container.querySelector('#download-csv-btn');
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      exportTimeRecordsCSV(session);
    });
  }
}

function exportTimeRecordsCSV(session: StudentSessionTelemetry) {
  const records = session.question_time_records || [];
  let csv = 'Slot,Domain,SubSkill,QuestionTitle,ActiveTimeSec,ResponseLatencySec,TimerRemainingSec,Status,TimedOut,Breaks,EarnedPoints,MaxPoints\n';

  records.forEach(r => {
    if (!r) return;
    const activeSec = (r.activeDurationMs / 1000).toFixed(1);
    const latencySec = r.responseLatencyMs ? (r.responseLatencyMs / 1000).toFixed(1) : '';
    const remSec = r.remainingTimeWhenAnsweredMs ? (r.remainingTimeWhenAnsweredMs / 1000).toFixed(1) : '0';
    const status = r.timedOut ? 'TIMED_OUT' : (r.activeDurationMs > 80000 ? 'SLOW' : (r.activeDurationMs > 45000 ? 'NORMAL' : 'FAST'));

    csv += `${r.questionSlot},"${r.domain}","${r.subSkill}","${r.questionTitle.replace(/"/g, '""')}",${activeSec},${latencySec},${remSec},${status},${r.timedOut},${r.breaksDuringQuestion},${r.earnedScore},${r.maxScore}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Cognix_CEO_Assessment_Time_Report_${session.student_name.replace(/\s+/g, '_')}.csv`);
  link.click();
}

function formatMarkdown(text: string): string {
  return text
    .replace(/^### (.*$)/gim, '<h3 style="color:var(--text-primary); font-size:1.05rem; margin-top:1rem; margin-bottom:0.4rem;">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.*$)/gim, '<blockquote style="border-left:3px solid var(--accent-cyan); padding-left:0.8rem; margin:0.8rem 0; color:var(--accent-cyan); font-size:0.9rem;">$1</blockquote>');
}


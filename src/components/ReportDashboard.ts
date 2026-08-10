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

  // Automatically store session in CEO Database array (localStorage)
  saveSessionToCEODatabase(session);

  container.innerHTML = `
    <div class="glass-card" style="padding: 2.5rem; max-width:1150px; margin:0 auto;">
      
      <!-- Top Action Controls -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem; flex-wrap:wrap; gap:0.75rem;">
        <span style="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald); padding: 0.35rem 1rem; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">
          ✅ 60-Question SEN Assessment Complete
        </span>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;" class="report-action-btns">
          <button id="ceo-dashboard-btn" class="btn btn-secondary" style="font-size:0.85rem; background:rgba(6,182,212,0.15); border:1px solid var(--accent-cyan); color:var(--accent-cyan);">
            🏛️ CEO Analytics Page
          </button>
          <button id="download-pdf-btn" class="btn btn-primary" style="font-size:0.85rem; background: linear-gradient(135deg, #8b5cf6, #ec4899); box-shadow: 0 4px 15px rgba(139,92,246,0.4);">
            📄 Download PDF Report
          </button>
          <button id="download-csv-btn" class="btn btn-secondary" style="font-size:0.85rem;">
            📊 Export CSV (Student)
          </button>
          <button id="print-report-btn" class="btn btn-secondary" style="font-size:0.85rem;">
            🖨️ Print Report
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

  const pdfBtn = container.querySelector('#download-pdf-btn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => downloadReportAsPDF(session));
  }

  const csvBtn = container.querySelector('#download-csv-btn');
  if (csvBtn) {
    csvBtn.addEventListener('click', () => {
      exportTimeRecordsCSV(session);
    });
  }

  const ceoBtn = container.querySelector('#ceo-dashboard-btn');
  if (ceoBtn) {
    ceoBtn.addEventListener('click', () => {
      renderCEODashboard(container);
    });
  }
}

export function saveSessionToCEODatabase(session: StudentSessionTelemetry) {
  try {
    const existing = localStorage.getItem('cognix_all_sessions');
    let sessions: StudentSessionTelemetry[] = existing ? JSON.parse(existing) : [];
    sessions = sessions.filter(s => s.session_id !== session.session_id);
    sessions.unshift(session);
    localStorage.setItem('cognix_all_sessions', JSON.stringify(sessions));
  } catch (e) {}
}

export function renderCEODashboard(container: HTMLElement) {
  const existing = localStorage.getItem('cognix_all_sessions');
  const sessions: StudentSessionTelemetry[] = existing ? JSON.parse(existing) : [];

  if (sessions.length === 0) {
    container.innerHTML = `
      <div class="glass-card" style="padding: 3rem; max-width: 900px; margin: 0 auto; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🏛️</div>
        <h2 style="font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 0.75rem;">CEO Executive Dashboard</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
          No completed student assessments found in local database yet. Run an assessment to generate CEO analytics.
        </p>
        <button id="ceo-new-test-btn" class="btn btn-primary" style="font-size: 1rem; padding: 0.8rem 2rem;">
          🚀 Start New Student Assessment
        </button>
      </div>
    `;
    const newTestBtn = container.querySelector('#ceo-new-test-btn');
    if (newTestBtn) {
      newTestBtn.addEventListener('click', () => window.location.reload());
    }
    return;
  }

  // Aggregate Metrics
  const totalStudents = sessions.length;
  const avgTotalScore = Math.round(sessions.reduce((acc, s) => acc + (s.total_score || 0), 0) / totalStudents);
  const avgActiveMins = (sessions.reduce((acc, s) => acc + ((s.total_active_duration_ms || 0) / 60000), 0) / totalStudents).toFixed(1);
  const totalFlaggedStudents = sessions.filter(s => Array.isArray(s.flags) && s.flags.length > 0).length;

  const domains = [
    { key: 'cognitive_ability', name: 'Cognitive Ability' },
    { key: 'functional_skills', name: 'Functional Skills' },
    { key: 'communication_level', name: 'Communication Level' },
    { key: 'behavioral_readiness', name: 'Behavioral Readiness' },
    { key: 'fine_motor_technology', name: 'Fine Motor & Tech' }
  ];

  const domainAverages = domains.map(d => {
    let sumEarned = 0;
    let sumMax = 0;
    sessions.forEach(s => {
      if (s.domain_scores && s.domain_scores[d.key as keyof typeof s.domain_scores]) {
        const ds = s.domain_scores[d.key as keyof typeof s.domain_scores];
        sumEarned += ds.earned_score;
        sumMax += ds.max_score;
      }
    });
    const pct = sumMax > 0 ? Math.round((sumEarned / sumMax) * 100) : 0;
    return { name: d.name, pct };
  });

  let studentRowsHtml = sessions.map((s, idx) => {
    const activeMins = Math.round((s.total_active_duration_ms || 0) / 60000);
    const flagsCount = Array.isArray(s.flags) ? s.flags.length : 0;
    const dateStr = s.start_time ? new Date(s.start_time).toLocaleDateString() : 'Today';

    return `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.88rem;">
        <td style="padding: 0.75rem 1rem; font-weight: 700;">#${idx + 1}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 700; color: #fff;">${s.student_name}</td>
        <td style="padding: 0.75rem 1rem; color: var(--text-secondary);">${s.age_group || '7-9'}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 800; color: var(--accent-cyan);">${s.total_score}/100</td>
        <td style="padding: 0.75rem 1rem;">
          <span style="background: rgba(59,130,246,0.15); border: 1px solid var(--accent-blue); color: var(--accent-blue); padding: 0.25rem 0.6rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem;">
            ${s.placed_track || s.recommended_track || 'Level 1'}
          </span>
        </td>
        <td style="padding: 0.75rem 1rem; text-align: center;">${activeMins}m</td>
        <td style="padding: 0.75rem 1rem; text-align: center;">
          ${flagsCount > 0 ? `<span style="color:#ef4444; font-weight:700;">⚠️ ${flagsCount} Flag${flagsCount > 1 ? 's' : ''}</span>` : '<span style="color:#10b981; font-weight:700;">✅ Clean</span>'}
        </td>
        <td style="padding: 0.75rem 1rem; color: var(--text-secondary); font-size: 0.8rem;">${dateStr}</td>
        <td style="padding: 0.75rem 1rem; text-align: right;">
          <button class="btn btn-secondary view-session-btn" data-id="${s.session_id}" style="padding: 0.3rem 0.7rem; font-size: 0.78rem;">
            📄 Report
          </button>
        </td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <div class="glass-card" style="padding: 2.5rem; max-width: 1200px; margin: 0 auto;">
      
      <!-- Top Action Controls -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem; flex-wrap: wrap; gap: 0.75rem;">
        <div>
          <span style="background: rgba(6,182,212,0.15); border: 1px solid var(--accent-cyan); color: var(--accent-cyan); padding: 0.35rem 1rem; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">
            🏛️ Executive CEO Analytics Portal
          </span>
        </div>
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
          <button id="export-all-csv-btn" class="btn btn-primary" style="font-size: 0.85rem; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue));">
            📊 Export Master CSV (All Students)
          </button>
          <button id="ceo-restart-btn" class="btn btn-secondary" style="font-size: 0.85rem;">
            ➕ Run New Assessment
          </button>
        </div>
      </div>

      <!-- Header -->
      <div style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #fff;">
          Institutional SEN Assessment Intelligence
        </h1>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 0.25rem;">
          Aggregated performance analytics, placement metrics, and diagnostic indicators across all completed student sessions.
        </p>
      </div>

      <!-- KPI Executive Summary Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 14px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Total Students Assessed</div>
          <div style="font-size: 2rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">${totalStudents}</div>
          <div style="font-size: 0.75rem; color: var(--accent-emerald); margin-top: 0.25rem;">100% Completed</div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 14px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Average Overall Score</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-cyan); margin-top: 0.25rem;">${avgTotalScore}<span style="font-size:1.2rem;">/100</span></div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Across all 5 domains</div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 14px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Avg Assessment Pace</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-blue); margin-top: 0.25rem;">${avgActiveMins}<span style="font-size:1.2rem;"> mins</span></div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Active duration per student</div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 14px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Support Alerts Flagged</div>
          <div style="font-size: 2rem; font-weight: 800; color: ${totalFlaggedStudents > 0 ? '#f59e0b' : '#10b981'}; margin-top: 0.25rem;">${totalFlaggedStudents}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Students requiring SEN scaffolding</div>
        </div>
      </div>

      <!-- Domain Mastery Averages Bar Chart -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">
          📊 Domain Mastery Breakdown (All Students Average)
        </h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${domainAverages.map(da => `
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.3rem;">
                <span>${da.name}</span>
                <span style="color: var(--accent-cyan);">${da.pct}% Average</span>
              </div>
              <div style="height: 10px; background: rgba(255,255,255,0.08); border-radius: 5px; overflow: hidden;">
                <div style="width: ${da.pct}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue)); border-radius: 5px;"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- All Students Master Table -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 16px;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">
          📋 Completed Student Roster (${sessions.length} Records)
        </h3>
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-secondary); font-size: 0.8rem; text-align: left;">
                <th style="padding: 0.6rem 1rem;">#</th>
                <th style="padding: 0.6rem 1rem;">Student Name</th>
                <th style="padding: 0.6rem 1rem;">Age</th>
                <th style="padding: 0.6rem 1rem;">Score</th>
                <th style="padding: 0.6rem 1rem;">Placed Level</th>
                <th style="padding: 0.6rem 1rem; text-align: center;">Active Time</th>
                <th style="padding: 0.6rem 1rem; text-align: center;">Status</th>
                <th style="padding: 0.6rem 1rem;">Date</th>
                <th style="padding: 0.6rem 1rem; text-align: right;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${studentRowsHtml}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  // Attach event listeners
  const exportMasterCsvBtn = container.querySelector('#export-all-csv-btn');
  if (exportMasterCsvBtn) {
    exportMasterCsvBtn.addEventListener('click', () => exportMasterStudentsCSV(sessions));
  }

  const restartBtn = container.querySelector('#ceo-restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => window.location.reload());
  }

  const viewBtns = container.querySelectorAll('.view-session-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLElement;
      const id = target.getAttribute('data-id');
      const targetSession = sessions.find(s => s.session_id === id);
      if (targetSession) {
        const dummyPlacement = {
          totalScore: targetSession.total_score,
          placedTrack: targetSession.placed_track || 'Level 1',
          recommendedTrack: targetSession.recommended_track || 'Level 1',
          flags: Array.isArray(targetSession.flags) ? targetSession.flags.map((f: any) => typeof f === 'string' ? { title: f, description: '', type: 'advisory' } : f) : [],
          performanceIndicators: {
            overallAccuracy: targetSession.total_score,
            adaptabilityIndex: 0.85,
            learningProgressVelocity: 'Steady',
            hintDependencyRatio: 0.1
          }
        };
        renderReportDashboard(container, targetSession, dummyPlacement as any);
      }
    });
  });
}

function exportMasterStudentsCSV(sessions: StudentSessionTelemetry[]) {
  let csv = 'StudentName,AgeGroup,TotalScore,PlacedTrack,ActiveTimeMins,Timeouts,BreaksCount,FlagsCount,CompletedDate\n';

  sessions.forEach(s => {
    const activeMins = ((s.total_active_duration_ms || 0) / 60000).toFixed(1);
    const timeouts = s.question_time_records?.filter(r => r?.timedOut).length || 0;
    const breaks = s.break_events?.length || 0;
    const flags = Array.isArray(s.flags) ? s.flags.length : 0;
    const dateStr = s.start_time ? new Date(s.start_time).toLocaleDateString() : 'Today';

    csv += `"${s.student_name.replace(/"/g, '""')}","${s.age_group || '7-9'}",${s.total_score},"${s.placed_track || s.recommended_track || 'Level 1'}",${activeMins},${timeouts},${breaks},${flags},"${dateStr}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Cognix_CEO_Master_Analytics_${new Date().toISOString().split('T')[0]}.csv`);
  link.click();
}

function downloadReportAsPDF(session: StudentSessionTelemetry) {
  // Add a print class to body so CSS can target it cleanly
  document.body.classList.add('printing-report');

  const printStyle = document.createElement('style');
  printStyle.id = 'cognix-print-style';
  printStyle.innerHTML = `
    @media print {
      /* Force white background for all elements */
      body.printing-report { background: #ffffff !important; }

      /* Hide everything EXCEPT the exam container */
      body.printing-report > *:not(#childTestPage):not(script):not(style) {
        display: none !important;
        visibility: hidden !important;
      }

      /* Make the exam container visible and full-width */
      body.printing-report #childTestPage {
        display: block !important;
        visibility: visible !important;
        position: static !important;
        width: 100% !important;
        height: auto !important;
        overflow: visible !important;
        background: #ffffff !important;
      }

      /* Hide header and interactive buttons in the report */
      body.printing-report #childTestPage .app-header,
      body.printing-report .report-action-btns,
      body.printing-report #restart-btn {
        display: none !important;
      }

      /* Make scrollable table visible in full */
      body.printing-report [style*="max-height:420px"],
      body.printing-report [style*="max-height: 420px"] {
        max-height: none !important;
        overflow: visible !important;
      }

      /* Light theme overrides */
      body.printing-report :root {
        --text-primary: #0f172a;
        --text-secondary: #475569;
        --accent-cyan: #0891b2;
        --accent-blue: #2563eb;
        --bg-card: #f8fafc;
        --border-color: #e2e8f0;
        --bg-surface: #f1f5f9;
      }
      body.printing-report .glass-card {
        background: #ffffff !important;
        border: 1px solid #e2e8f0 !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
      }
      body.printing-report .placement-badge-card {
        background: #f8fafc !important;
        border: 1px solid #0891b2 !important;
      }
      body.printing-report .score-circle {
        background: conic-gradient(#0891b2 calc(var(--score-pct) * 1%), #e2e8f0 0) !important;
      }
      body.printing-report .score-circle::before {
        background: #f8fafc !important;
      }

      /* Ensure colors print correctly */
      * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

      /* Page layout */
      @page { margin: 1.5cm; size: A4; }
    }
  `;
  document.head.appendChild(printStyle);

  // Set document title = default PDF filename
  const originalTitle = document.title;
  document.title = `Cognix_Report_${session.student_name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}`;

  window.print();

  // Clean up after print dialog is dismissed
  setTimeout(() => {
    document.body.classList.remove('printing-report');
    const existing = document.getElementById('cognix-print-style');
    if (existing) existing.remove();
    document.title = originalTitle;
  }, 2000);
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


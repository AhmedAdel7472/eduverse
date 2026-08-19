import './styles/app.css';
import { AssessmentRunner } from './components/AssessmentRunner';
import { renderCEODashboard, returnToLandingPage } from './components/ReportDashboard';

let currentRunner: AssessmentRunner | null = null;

export function initAssessment(studentName?: string, restoreIfAvailable: boolean = false) {
  let name = studentName;
  if (!name || name === 'Alex Rivers') {
    try {
      const parentProfile = localStorage.getItem('codera_parent_profile');
      if (parentProfile) {
        const parsed = JSON.parse(parentProfile);
        if (parsed.childName && parsed.childName.trim()) {
          name = parsed.childName.trim();
        }
      }
    } catch (e) {}
  }
  name = name || 'Alex Rivers';

  const appContainer = document.getElementById('app');
  if (appContainer) {
    if (!restoreIfAvailable) {
      AssessmentRunner.clearSavedSession();
    }
    currentRunner = new AssessmentRunner(appContainer);
    currentRunner.startSession(name, restoreIfAvailable);
  }
}

export function exitAssessment(reload: boolean = true) {
  AssessmentRunner.clearSavedSession();
  if (currentRunner) {
    currentRunner.exitAndReset(reload);
  } else {
    returnToLandingPage();
  }
}

export function openCEODashboard() {
  const appContainer = document.getElementById('app');
  const childTestPage = document.getElementById('childTestPage');
  if (appContainer && childTestPage) {
    document.body.classList.add('exam-mode');
    document.body.classList.add('ceo-view-mode');
    childTestPage.classList.remove('hidden');
    childTestPage.classList.add('exam-active');
    childTestPage.scrollTop = 0;
    window.scrollTo(0, 0);
    renderCEODashboard(appContainer);
  }
}

// Attach to window object for landing page scripts
(window as any).initAssessment = initAssessment;
(window as any).exitAssessment = exitAssessment;
(window as any).returnToLandingPage = returnToLandingPage;
(window as any).openCEODashboard = openCEODashboard;
(window as any).openCEODashboardModule = openCEODashboard;

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const childTestPage = document.getElementById('childTestPage');

  const savedSession = AssessmentRunner.getSavedSession();

  if (savedSession && childTestPage) {
    // Session in progress was interrupted by refresh — restore automatically!
    document.body.classList.add('exam-mode');
    childTestPage.classList.remove('hidden');
    childTestPage.classList.add('exam-active');
    window.scrollTo(0, 0);
    initAssessment(savedSession.studentName || 'Alex Rivers', true);
  } else if (appContainer && !childTestPage) {
    // Auto-start in standalone runner mode
    initAssessment('Alex Rivers', false);
  }
});


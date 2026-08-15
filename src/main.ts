import './styles/app.css';
import { AssessmentRunner } from './components/AssessmentRunner';
import { renderCEODashboard } from './components/ReportDashboard';

let currentRunner: AssessmentRunner | null = null;

export function initAssessment(studentName: string = 'Alex Rivers', restoreIfAvailable: boolean = false) {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    if (!restoreIfAvailable) {
      AssessmentRunner.clearSavedSession();
    }
    currentRunner = new AssessmentRunner(appContainer);
    currentRunner.startSession(studentName, restoreIfAvailable);
  }
}

export function exitAssessment(reload: boolean = true) {
  AssessmentRunner.clearSavedSession();
  if (currentRunner) {
    currentRunner.exitAndReset(reload);
  } else {
    const testPage = document.getElementById('childTestPage');
    if (testPage) {
      testPage.classList.add('hidden');
      testPage.classList.remove('exam-active');
    }
    document.body.classList.remove('exam-mode');
    document.body.classList.remove('ceo-view-mode');
    if (reload) {
      window.location.href = window.location.pathname;
    }
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
    window.scrollTo(0, 0);
    renderCEODashboard(appContainer);
  }
}

// Attach to window object for landing page scripts
(window as any).initAssessment = initAssessment;
(window as any).exitAssessment = exitAssessment;
(window as any).openCEODashboard = openCEODashboard;

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


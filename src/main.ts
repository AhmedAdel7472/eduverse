import './styles/app.css';
import { AssessmentRunner } from './components/AssessmentRunner';

let currentRunner: AssessmentRunner | null = null;

export function initAssessment(studentName: string = 'Alex Rivers') {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    if (!currentRunner) {
      currentRunner = new AssessmentRunner(appContainer);
    }
    currentRunner.startSession(studentName);
  }
}

// Attach to window object for index1.html scripts
(window as any).initAssessment = initAssessment;

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const childTestPage = document.getElementById('childTestPage');
  
  // Auto-start only if standalone app container exists without childTestPage wrapper, or if childTestPage is visible
  if (appContainer && (!childTestPage || !childTestPage.classList.contains('hidden'))) {
    initAssessment('Alex Rivers');
  }
});

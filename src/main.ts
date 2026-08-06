import './styles/app.css';
import { AssessmentRunner } from './components/AssessmentRunner';

let currentRunner: AssessmentRunner | null = null;

export function initAssessment(studentName: string = 'Alex Rivers') {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    // Always create a fresh runner for a new session
    currentRunner = new AssessmentRunner(appContainer);
    currentRunner.startSession(studentName);
  }
}

// Attach to window object for index1.html/index.html landing page scripts
(window as any).initAssessment = initAssessment;

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  const childTestPage = document.getElementById('childTestPage');

  // Auto-start ONLY in standalone mode (index.html with no landing page wrapper)
  // If #childTestPage exists, this is the landing page — wait for startChildTest() call
  if (appContainer && !childTestPage) {
    initAssessment('Alex Rivers');
  }
});

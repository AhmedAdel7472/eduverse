import './styles/app.css';
import { AssessmentRunner } from './components/AssessmentRunner';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.getElementById('app');
  if (appContainer) {
    const runner = new AssessmentRunner(appContainer);
    runner.startSession('Alex Rivers');
  }
});

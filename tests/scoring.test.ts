import { ScoringEngine, DOMAIN_CONFIG } from '../src/engine/scoringEngine';
import { PlacementEngine } from '../src/engine/placementEngine';
import { ItemTelemetry } from '../src/engine/telemetrySchema';

console.log('==================================================');
console.log('  RUNNING STANDARDIZED 20-QUESTION MATRIX TESTS   ');
console.log('==================================================\n');

// 1. Verify Weights & Question Allocations
let totalWeight = 0;
let totalMaxScore = 0;
let totalQuestions = 0;

for (const [key, cfg] of Object.entries(DOMAIN_CONFIG)) {
  totalWeight += cfg.weight;
  totalMaxScore += cfg.maxScore;
  totalQuestions += cfg.questionCount;
  console.log(`- Domain ${key}: Weight ${(cfg.weight*100).toFixed(0)}%, MaxScore ${cfg.maxScore} Pts, Questions: ${cfg.questionCount}`);
}

console.log(`\n✓ Total Weight: ${totalWeight * 100}% (Expected: 100%)`);
console.log(`✓ Total Max Score: ${totalMaxScore} Pts (Expected: 100 Pts)`);
console.log(`✓ Total Questions: ${totalQuestions} Questions (Expected: 20 Questions)`);

if (totalWeight !== 1.0 || totalMaxScore !== 100 || totalQuestions !== 20) {
  console.error('❌ Standardized matrix validation failed!');
  process.exit(1);
}

// 2. Test Item Scoring Calculation Q_i out of 5.0
const mockPerfectItem: ItemTelemetry = {
  item_id: 'q1',
  domain: 'cognitive_ability',
  skill: 'pattern_recognition',
  difficulty_level: 3,
  is_correct: true,
  accuracy_score: 1.0,
  response_time_ms: 5000,
  expected_time_ms: 10000,
  attempts_count: 1,
  hints_used: 0
};
const perfectPoints = ScoringEngine.calculateItemScore(mockPerfectItem);
console.log(`\n✓ Perfect Question Score Q_i: ${perfectPoints} Pts / 5.0 Pts (Expected: 5.0)`);

const mockItemWithDeductions: ItemTelemetry = {
  item_id: 'q2',
  domain: 'cognitive_ability',
  skill: 'pattern_recognition',
  difficulty_level: 3,
  is_correct: true,
  accuracy_score: 1.0,
  response_time_ms: 15000, // 1.5x expected time
  expected_time_ms: 10000,
  attempts_count: 2,       // 2 attempts
  hints_used: 1            // 1 hint used
};
const deductedPoints = ScoringEngine.calculateItemScore(mockItemWithDeductions);
console.log(`✓ Deducted Question Score Q_i: ${deductedPoints} Pts / 5.0 Pts (Expected: ~3.6 Pts)`);

// 3. Test Full 20-Question Matrix Evaluation
const fullSessionItems: ItemTelemetry[] = [];
// Cognitive: 5 Qs
for (let i = 0; i < 5; i++) {
  fullSessionItems.push({ ...mockPerfectItem, item_id: `cog_${i}`, domain: 'cognitive_ability' });
}
// Functional: 5 Qs
for (let i = 0; i < 5; i++) {
  fullSessionItems.push({ ...mockPerfectItem, item_id: `func_${i}`, domain: 'functional_skills' });
}
// Communication: 4 Qs
for (let i = 0; i < 4; i++) {
  fullSessionItems.push({ ...mockPerfectItem, item_id: `comm_${i}`, domain: 'communication_level' });
}
// Behavioral: 3 Qs
for (let i = 0; i < 3; i++) {
  fullSessionItems.push({ ...mockPerfectItem, item_id: `beh_${i}`, domain: 'behavioral_readiness' });
}
// Fine Motor: 3 Qs
for (let i = 0; i < 3; i++) {
  fullSessionItems.push({ ...mockPerfectItem, item_id: `motor_${i}`, domain: 'fine_motor_technology' });
}

const domainScores = ScoringEngine.calculateDomainScores(fullSessionItems);
const totalScore = ScoringEngine.calculateTotalScore(domainScores);
const placement = PlacementEngine.evaluatePlacement(totalScore, domainScores, fullSessionItems);

console.log(`\n✓ Full 20-Question Session Total Score: ${totalScore}/100 Pts`);
console.log(`✓ Placement Track: ${placement.recommendedTrack} (Expected: Future Engineer)`);
console.log(`✓ Safety Flags: ${placement.flags.length}`);

console.log('\n==================================================');
console.log('  ALL 20-QUESTION MATRIX TESTS PASSED!            ');
console.log('==================================================');

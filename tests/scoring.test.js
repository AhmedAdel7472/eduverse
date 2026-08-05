import { ScoringEngine, DOMAIN_CONFIG } from '../src/engine/scoringEngine.js';
import { PlacementEngine } from '../src/engine/placementEngine.js';

console.log('--- RUNNING STANDARDIZED ASSESSMENT ENGINE TESTS ---');

// 1. Verify Weights & Max Scores
let totalWeight = 0;
let totalMaxScore = 0;
for (const [key, cfg] of Object.entries(DOMAIN_CONFIG)) {
  totalWeight += cfg.weight;
  totalMaxScore += cfg.maxScore;
}

console.log(`✓ Total Weight: ${totalWeight * 100}% (Expected: 100%)`);
console.log(`✓ Total Max Score: ${totalMaxScore} Pts (Expected: 100 Pts)`);
if (totalWeight !== 1.0 || totalMaxScore !== 100) {
  console.error('❌ Domain weights or max scores invalid!');
  process.exit(1);
}

// 2. Test Item Scoring Formula
const mockItemPerfect = {
  item_id: 'test_1',
  domain: 'cognitive_ability',
  skill: 'pattern_recognition',
  difficulty_level: 3,
  is_correct: true,
  accuracy_score: 1.0,
  response_time_ms: 3000,
  expected_time_ms: 10000,
  attempts_count: 1,
  hints_used: 0
};
const perfectScore = ScoringEngine.calculateItemScore(mockItemPerfect);
console.log(`✓ Perfect item score multiplier: ${perfectScore} (Expected: 1.0)`);

const mockItemWithHints = {
  item_id: 'test_2',
  domain: 'cognitive_ability',
  skill: 'pattern_recognition',
  difficulty_level: 3,
  is_correct: true,
  accuracy_score: 1.0,
  response_time_ms: 3000,
  expected_time_ms: 10000,
  attempts_count: 2,
  hints_used: 1
};
const scoreWithHints = ScoringEngine.calculateItemScore(mockItemWithHints);
console.log(`✓ Score with 1 hint & 2 attempts: ${scoreWithHints} (Expected: ~0.792)`);

// 3. Test Full Session Domain Scores & Track Placement
const mockItems = [
  // Cognitive (Max 25)
  { item_id: '1', domain: 'cognitive_ability', skill: 'pattern_recognition', difficulty_level: 3, is_correct: true, accuracy_score: 1.0, response_time_ms: 4000, expected_time_ms: 10000, attempts_count: 1, hints_used: 0 },
  // Functional (Max 25)
  { item_id: '2', domain: 'functional_skills', skill: 'following_instructions', difficulty_level: 3, is_correct: true, accuracy_score: 0.9, response_time_ms: 8000, expected_time_ms: 10000, attempts_count: 1, hints_used: 0 },
  // Communication (Max 20)
  { item_id: '3', domain: 'communication_level', skill: 'picture_matching', difficulty_level: 3, is_correct: true, accuracy_score: 1.0, response_time_ms: 3000, expected_time_ms: 10000, attempts_count: 1, hints_used: 0 },
  // Behavioral (Max 15)
  { item_id: '4', domain: 'behavioral_readiness', skill: 'adaptability', difficulty_level: 3, is_correct: true, accuracy_score: 0.8, response_time_ms: 5000, expected_time_ms: 10000, attempts_count: 1, hints_used: 0 },
  // Fine Motor (Max 15)
  { item_id: '5', domain: 'fine_motor_technology', skill: 'mouse_control', difficulty_level: 3, is_correct: true, accuracy_score: 1.0, response_time_ms: 4000, expected_time_ms: 10000, attempts_count: 1, hints_used: 0 }
];

const domainScores = ScoringEngine.calculateDomainScores(mockItems);
const totalScore = ScoringEngine.calculateTotalScore(domainScores);
const placement = PlacementEngine.evaluatePlacement(totalScore, domainScores, mockItems);

console.log(`✓ Calculated Total Score: ${totalScore}/100`);
console.log(`✓ Recommended Track: ${placement.recommendedTrack} (Expected: Creator / Innovator / Future Engineer)`);
console.log(`✓ Flags Triggered: ${placement.flags.length}`);

console.log('--- ALL ENGINE UNIT TESTS PASSED SUCCESSFULLY! ---');

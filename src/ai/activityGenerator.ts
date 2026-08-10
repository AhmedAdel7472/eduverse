import { AssessmentDomain, SkillName } from '../engine/telemetrySchema';
import { AzureOpenAIClient } from './azureOpenAIClient';

export interface ActivityItem {
  id: string;
  slot: number; // 1 to 60
  domain: AssessmentDomain;
  skill: SkillName;
  subSkill: string;
  title: string;
  instructions: string;
  difficulty: number;
  expectedTimeMs: number;
  maxPoints: number;
  type: 'pattern_matrix' | 'robot_mission' | 'picture_match' | 'rule_shift' | 'motor_target';
  payload: any;
  hintText: string;
  source?: 'azure_openai' | 'procedural';
}

export interface QuestionBaseline {
  slot: number; // 1 to 60
  domain: AssessmentDomain;
  skill: SkillName;
  subSkill: string;
  title: string;
  baselinePrompt: string;
  maxPoints: number;
  difficulty: 1 | 2 | 3;
  type: 'pattern_matrix' | 'robot_mission' | 'picture_match' | 'rule_shift' | 'motor_target';
}

export const QUESTION_BASELINES: QuestionBaseline[] = [
  // --- DOMAIN 1: COGNITIVE ABILITIES (Q1 - Q15 | 25 Pts) ---
  { slot: 1, domain: 'cognitive_ability', skill: 'classification', subSkill: 'Visual Discrimination', title: 'Match Identical Shapes', baselinePrompt: 'Match the identical shapes.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 2, domain: 'cognitive_ability', skill: 'classification', subSkill: 'Visual Discrimination', title: 'Spot the Difference', baselinePrompt: 'Identify the object that is different.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 3, domain: 'cognitive_ability', skill: 'pattern_recognition', subSkill: 'Visual Discrimination', title: 'Match the Pattern', baselinePrompt: 'Match the same visual pattern.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 4, domain: 'cognitive_ability', skill: 'classification', subSkill: 'Classification', title: 'Group Together', baselinePrompt: 'Which objects belong together in the same group?', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 5, domain: 'cognitive_ability', skill: 'classification', subSkill: 'Classification', title: 'Does Not Belong', baselinePrompt: 'Which object does not belong in this group?', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 6, domain: 'cognitive_ability', skill: 'sequencing', subSkill: 'Sequencing', title: 'Next in Sequence', baselinePrompt: 'What comes next in the sequence?', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 7, domain: 'cognitive_ability', skill: 'sequencing', subSkill: 'Sequencing', title: 'Order the Story', baselinePrompt: 'Arrange the pictures in the correct logical order.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 8, domain: 'cognitive_ability', skill: 'pattern_recognition', subSkill: 'Pattern Recognition', title: 'Complete Visual Pattern', baselinePrompt: 'Complete the visual pattern.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 9, domain: 'cognitive_ability', skill: 'pattern_recognition', subSkill: 'Pattern Recognition', title: 'Identify Missing Element', baselinePrompt: 'Identify the missing element in the grid.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 10, domain: 'cognitive_ability', skill: 'pattern_recognition', subSkill: 'Pattern Recognition', title: 'Continue Pattern', baselinePrompt: 'Continue the pattern to the next step.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 11, domain: 'cognitive_ability', skill: 'logical_reasoning', subSkill: 'Logical Reasoning', title: 'Solve the Problem', baselinePrompt: 'Which answer solves the logical problem?', maxPoints: 2, difficulty: 3, type: 'pattern_matrix' },
  { slot: 12, domain: 'cognitive_ability', skill: 'logical_reasoning', subSkill: 'Logical Reasoning', title: 'What Happens Next', baselinePrompt: 'What should logically happen next?', maxPoints: 2, difficulty: 3, type: 'pattern_matrix' },
  { slot: 13, domain: 'cognitive_ability', skill: 'problem_solving', subSkill: 'Problem Solving', title: 'Best Solution', baselinePrompt: 'Select the best solution for this situation.', maxPoints: 2, difficulty: 3, type: 'pattern_matrix' },
  { slot: 14, domain: 'cognitive_ability', skill: 'problem_solving', subSkill: 'Problem Solving', title: 'Sequence to Solve', baselinePrompt: 'Identify the correct sequence of actions to solve the problem.', maxPoints: 2, difficulty: 3, type: 'pattern_matrix' },
  { slot: 15, domain: 'cognitive_ability', skill: 'cause_and_effect', subSkill: 'Cause & Effect', title: 'Predict Cause & Effect', baselinePrompt: 'What will happen if this action is performed?', maxPoints: 2, difficulty: 3, type: 'pattern_matrix' },

  // --- DOMAIN 2: FUNCTIONAL ABILITIES (Q16 - Q30 | 25 Pts) ---
  { slot: 16, domain: 'functional_skills', skill: 'following_instructions', subSkill: '1-Step Instruction', title: 'Follow Simple Instruction', baselinePrompt: 'Follow a simple 1-step instruction.', maxPoints: 1, difficulty: 1, type: 'robot_mission' },
  { slot: 17, domain: 'functional_skills', skill: 'following_instructions', subSkill: '1-Step Instruction', title: 'Independent Instruction', baselinePrompt: 'Complete a second independent 1-step action.', maxPoints: 1, difficulty: 1, type: 'robot_mission' },
  { slot: 18, domain: 'functional_skills', skill: 'following_instructions', subSkill: '2-Step Instruction', title: 'Two-Step Action', baselinePrompt: 'Complete two actions in the correct order.', maxPoints: 2, difficulty: 2, type: 'robot_mission' },
  { slot: 19, domain: 'functional_skills', skill: 'following_instructions', subSkill: '2-Step Instruction', title: 'Direct Execution', baselinePrompt: 'Complete the task smoothly without repeating steps.', maxPoints: 2, difficulty: 2, type: 'robot_mission' },
  { slot: 20, domain: 'functional_skills', skill: 'following_instructions', subSkill: 'Multi-Step Task', title: 'Three-Step Activity', baselinePrompt: 'Complete a 3-step structured activity.', maxPoints: 2, difficulty: 2, type: 'robot_mission' },
  { slot: 21, domain: 'functional_skills', skill: 'following_instructions', subSkill: 'Multi-Step Task', title: 'Sequential Workflow', baselinePrompt: 'Complete the activity in the exact correct sequence.', maxPoints: 2, difficulty: 2, type: 'robot_mission' },
  { slot: 22, domain: 'functional_skills', skill: 'task_completion', subSkill: 'Task Completion', title: 'Finish Structured Task', baselinePrompt: 'Start and finish the structured robotics task.', maxPoints: 2, difficulty: 2, type: 'robot_mission' },
  { slot: 23, domain: 'functional_skills', skill: 'task_completion', subSkill: 'Task Completion', title: 'Minimal Prompt Task', baselinePrompt: 'Complete the goal with minimal visual prompting.', maxPoints: 2, difficulty: 2, type: 'robot_mission' },
  { slot: 24, domain: 'functional_skills', skill: 'working_memory', subSkill: 'Organization', title: 'Organize Tools', baselinePrompt: 'Organize the programming blocks before beginning.', maxPoints: 2, difficulty: 2, type: 'robot_mission' },
  { slot: 25, domain: 'functional_skills', skill: 'working_memory', subSkill: 'Organization', title: 'Return Materials', baselinePrompt: 'Return all unused blocks to their correct place.', maxPoints: 1, difficulty: 1, type: 'robot_mission' },
  { slot: 26, domain: 'functional_skills', skill: 'problem_solving', subSkill: 'Independence', title: 'Independent Task', baselinePrompt: 'Complete the familiar coding mission independently.', maxPoints: 2, difficulty: 3, type: 'robot_mission' },
  { slot: 27, domain: 'functional_skills', skill: 'problem_solving', subSkill: 'Independence', title: 'Ask for Help', baselinePrompt: 'Identify when and how to request assistance appropriately.', maxPoints: 1, difficulty: 2, type: 'pattern_matrix' },
  { slot: 28, domain: 'functional_skills', skill: 'problem_solving', subSkill: 'Functional Problem Solving', title: 'Overcome Blockade', baselinePrompt: 'Identify what to do when a path cannot be completed.', maxPoints: 2, difficulty: 3, type: 'robot_mission' },
  { slot: 29, domain: 'functional_skills', skill: 'attention', subSkill: 'Learning Routine', title: 'Learning Routine', baselinePrompt: 'Follow the expected technology learning routine.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 30, domain: 'functional_skills', skill: 'task_completion', subSkill: 'Functional Learning', title: 'Practical Learning Task', baselinePrompt: 'Complete a simple practical digital learning task.', maxPoints: 1, difficulty: 2, type: 'robot_mission' },

  // --- DOMAIN 3: COMMUNICATION LEVEL (Q31 - Q40 | 20 Pts) ---
  { slot: 31, domain: 'communication_level', skill: 'listening', subSkill: 'Receptive Communication', title: 'Listen & Follow', baselinePrompt: 'Follow a spoken audio instruction.', maxPoints: 2, difficulty: 2, type: 'picture_match' },
  { slot: 32, domain: 'communication_level', skill: 'listening', subSkill: 'Receptive Communication', title: 'Identify Object', baselinePrompt: 'Identify the requested target object from audio prompt.', maxPoints: 2, difficulty: 2, type: 'picture_match' },
  { slot: 33, domain: 'communication_level', skill: 'vocabulary', subSkill: 'Expressive Communication', title: 'Name Component', baselinePrompt: 'Select the correct name for the highlighted technology item.', maxPoints: 2, difficulty: 2, type: 'picture_match' },
  { slot: 34, domain: 'communication_level', skill: 'vocabulary', subSkill: 'Expressive Communication', title: 'Express Choice', baselinePrompt: 'Communicate the correct preference or action needed.', maxPoints: 2, difficulty: 2, type: 'picture_match' },
  { slot: 35, domain: 'communication_level', skill: 'understanding_instructions', subSkill: 'Following Instructions', title: 'Two-Step Audio', baselinePrompt: 'Follow a 2-step audio communication instruction.', maxPoints: 2, difficulty: 2, type: 'picture_match' },
  { slot: 36, domain: 'communication_level', skill: 'understanding_instructions', subSkill: 'Following Instructions', title: 'Classroom Tech Instruction', baselinePrompt: 'Follow a functional technology classroom command.', maxPoints: 2, difficulty: 2, type: 'picture_match' },
  { slot: 37, domain: 'communication_level', skill: 'picture_matching', subSkill: 'Identification', title: 'Identify Digital Icon', baselinePrompt: 'Identify the matching digital icon or symbol.', maxPoints: 2, difficulty: 1, type: 'picture_match' },
  { slot: 38, domain: 'communication_level', skill: 'verbal_comprehension', subSkill: 'Question Response', title: 'Answer WH-Question', baselinePrompt: 'Answer the question: "Which tool helps robots move?"', maxPoints: 2, difficulty: 3, type: 'picture_match' },
  { slot: 39, domain: 'communication_level', skill: 'verbal_comprehension', subSkill: 'Functional Communication', title: 'Request Clarification', baselinePrompt: 'Choose the symbol used to request help or clarification.', maxPoints: 2, difficulty: 2, type: 'picture_match' },
  { slot: 40, domain: 'communication_level', skill: 'understanding_instructions', subSkill: 'Problem Solving Communication', title: 'Communicate Solution', baselinePrompt: 'Communicate the correct solution choice to the team.', maxPoints: 2, difficulty: 3, type: 'picture_match' },

  // --- DOMAIN 4: BEHAVIORAL & LEARNING READINESS (Q41 - Q50 | 15 Pts) ---
  { slot: 41, domain: 'behavioral_readiness', skill: 'persistence', subSkill: 'Attention', title: 'Sustain Attention', baselinePrompt: 'Maintains focus when a puzzle takes longer to solve.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 42, domain: 'behavioral_readiness', skill: 'persistence', subSkill: 'Task Engagement', title: 'Remain Engaged', baselinePrompt: 'Remains engaged in the learning activity despite distractions.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 43, domain: 'behavioral_readiness', skill: 'adaptability', subSkill: 'Instruction Following', title: 'Responds to Signals', baselinePrompt: 'Responds promptly when given a stop or transition instruction.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 44, domain: 'behavioral_readiness', skill: 'error_recovery', subSkill: 'Response to Correction', title: 'Accept Redirection', baselinePrompt: 'Accepts gentle feedback and adjusts the approach calmly.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 45, domain: 'behavioral_readiness', skill: 'flexibility', subSkill: 'Frustration Tolerance', title: 'Persevere on Error', baselinePrompt: 'Continues trying calmly after an initial error or bug.', maxPoints: 2, difficulty: 3, type: 'pattern_matrix' },
  { slot: 46, domain: 'behavioral_readiness', skill: 'adaptability', subSkill: 'Transition', title: 'Smooth Transition', baselinePrompt: 'Moves smoothly from one activity to the next when time is up.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 47, domain: 'behavioral_readiness', skill: 'adaptability', subSkill: 'Turn Taking / Waiting', title: 'Wait Appropriately', baselinePrompt: 'Waits patiently while another student or robot finishes their turn.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 48, domain: 'behavioral_readiness', skill: 'persistence', subSkill: 'Motivation', title: 'Eager to Learn', baselinePrompt: 'Demonstrates willingness to try a new technology challenge.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 49, domain: 'behavioral_readiness', skill: 'response_to_feedback', subSkill: 'Independence', title: 'Independent Effort', baselinePrompt: 'Attempts the problem independently before asking for help.', maxPoints: 1, difficulty: 2, type: 'pattern_matrix' },
  { slot: 50, domain: 'behavioral_readiness', skill: 'response_to_feedback', subSkill: 'Help Seeking', title: 'Polite Help Request', baselinePrompt: 'Requests assistance politely and appropriately when stuck.', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },

  // --- DOMAIN 5: FINE MOTOR & TECHNOLOGY SKILLS (Q51 - Q60 | 15 Pts) ---
  { slot: 51, domain: 'fine_motor_technology', skill: 'touch_interaction', subSkill: 'Fine Motor Control', title: 'Object Precision', baselinePrompt: 'Tap or manipulate small digital targets with precision.', maxPoints: 2, difficulty: 2, type: 'motor_target' },
  { slot: 52, domain: 'fine_motor_technology', skill: 'mouse_control', subSkill: 'Hand-Eye Coordination', title: 'Accurate Movement', baselinePrompt: 'Move pointer accurately to the target element.', maxPoints: 1, difficulty: 1, type: 'motor_target' },
  { slot: 53, domain: 'fine_motor_technology', skill: 'drag_and_drop', subSkill: 'Object Manipulation', title: 'Assemble Structure', baselinePrompt: 'Which set of steps correctly assembles Robo\'s body? Choose the right order.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 54, domain: 'fine_motor_technology', skill: 'mouse_control', subSkill: 'Mouse/Trackpad', title: 'Pointer Navigation', baselinePrompt: 'Control pointer speed and target alignment.', maxPoints: 2, difficulty: 2, type: 'motor_target' },
  { slot: 55, domain: 'fine_motor_technology', skill: 'keyboard_navigation', subSkill: 'Keyboard Skills', title: 'Key Identification', baselinePrompt: 'Locate and press key directional arrows or spacebar.', maxPoints: 2, difficulty: 2, type: 'pattern_matrix' },
  { slot: 56, domain: 'fine_motor_technology', skill: 'touch_interaction', subSkill: 'Touchscreen', title: 'Touch Target', baselinePrompt: 'Select the highlighted item cleanly on screen.', maxPoints: 1, difficulty: 1, type: 'motor_target' },
  { slot: 57, domain: 'fine_motor_technology', skill: 'drag_and_drop', subSkill: 'Drag & Drop', title: 'Drag Block to Slot', baselinePrompt: 'Which image shows the correct way to place a block into its matching slot?', maxPoints: 1, difficulty: 1, type: 'pattern_matrix' },
  { slot: 58, domain: 'fine_motor_technology', skill: 'basic_robot_control', subSkill: 'Digital Navigation', title: 'Select App Icon', baselinePrompt: 'Open or select the correct learning activity application.', maxPoints: 1, difficulty: 2, type: 'picture_match' },
  { slot: 59, domain: 'fine_motor_technology', skill: 'basic_robot_control', subSkill: 'Tech Problem Solving', title: 'Fix Screen Freeze', baselinePrompt: 'Identify what button to click if a digital task freezes.', maxPoints: 1, difficulty: 3, type: 'pattern_matrix' },
  { slot: 60, domain: 'fine_motor_technology', skill: 'basic_robot_control', subSkill: 'Technology Independence', title: 'Independent Navigation', baselinePrompt: 'Complete the basic technology startup sequence independently.', maxPoints: 2, difficulty: 3, type: 'robot_mission' }
];

// Per-slot robot mission configurations: unique block sets and sequences per question
const ROBOT_MISSION_CONFIGS: Record<number, { blocks: string[]; correctSequence: string[]; description: string }> = {
  16: { blocks: ['Move Forward ⬆️', 'Turn Left ⬅️', 'Stop 🛑'], correctSequence: ['Move Forward ⬆️'], description: 'Robo needs to move forward ONCE to reach the star. Add just one block!' },
  17: { blocks: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾'], correctSequence: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾'], description: 'Robo needs to find the shiny tooth! Walk forward, turn right to face the tooth, and grab it.' },
  18: { blocks: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾', 'Stop 🛑'], correctSequence: ['Turn Right ➡️', 'Move Forward ⬆️'], description: 'Turn right first, then move forward — 2 steps to reach the goal!' },
  19: { blocks: ['Turn Left ⬅️', 'Move Forward ⬆️', 'Grab Item 🦾', 'Jump 🦸'], correctSequence: ['Turn Left ⬅️', 'Move Forward ⬆️'], description: 'Turn LEFT first, then walk forward — build the 2-step path!' },
  20: { blocks: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾', 'Turn Left ⬅️'], correctSequence: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾'], description: 'Move forward, turn right, then grab the gem — 3 steps in order!' },
  21: { blocks: ['Jump 🦸', 'Turn Left ⬅️', 'Move Forward ⬆️', 'Drop Item 📦'], correctSequence: ['Turn Left ⬅️', 'Move Forward ⬆️', 'Drop Item 📦'], description: 'Turn left, walk forward, then drop the package — 3 steps!' },
  22: { blocks: ['Open Door 🚪', 'Move Forward ⬆️', 'Grab Item 🦾', 'Return Home 🏠'], correctSequence: ['Open Door 🚪', 'Move Forward ⬆️', 'Grab Item 🦾', 'Return Home 🏠'], description: 'Full mission: Open door, move forward, grab item, return home — 4 steps!' },
  23: { blocks: ['Move Forward ⬆️', 'Grab Item 🦾', 'Turn Right ➡️', 'Jump 🦸', 'Stop 🛑'], correctSequence: ['Move Forward ⬆️', 'Grab Item 🦾'], description: 'Only use what you need! 2 blocks — move forward and grab item.' },
  24: { blocks: ['Turn Right ➡️', 'Move Forward ⬆️', 'Grab Item 🦾', 'Return Home 🏠'], correctSequence: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾'], description: 'Organize the blocks: Move forward first, turn right, then grab the item.' },
  25: { blocks: ['Return Home 🏠', 'Stop 🛑', 'Turn Left ⬅️'], correctSequence: ['Return Home 🏠'], description: 'Robo finished the task! Add the RETURN HOME block to complete.' },
  26: { blocks: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾', 'Return Home 🏠'], correctSequence: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾', 'Return Home 🏠'], description: 'Independent Mission: Walk forward, turn right to face the shiny treasure, grab it, and return home!' },
  28: { blocks: ['Turn Right ➡️', 'Move Forward ⬆️', 'Turn Left ⬅️', 'Grab Item 🦾'], correctSequence: ['Turn Right ➡️', 'Move Forward ⬆️', 'Turn Left ⬅️', 'Grab Item 🦾'], description: 'Uh-oh! The usual straight path is blocked by a big rock! Turn right first, move forward around the rock, turn left, and grab the gem.' },
  30: { blocks: ['Power On ⚡', 'Move Forward ⬆️', 'Start Task 🎯'], correctSequence: ['Power On ⚡', 'Start Task 🎯'], description: 'Turn Robo on, then start the task — simple 2-step startup!' },
  60: { blocks: ['Power On ⚡', 'Connect 📡', 'Open App 📱', 'Start Learning 🎓'], correctSequence: ['Power On ⚡', 'Connect 📡', 'Open App 📱', 'Start Learning 🎓'], description: 'Full 4-step startup sequence — Power On, Connect, Open App, Start Learning!' },
};

// Rich picture_match configs: audioPromptText + emoji options per slot
const PICTURE_MATCH_CONFIGS: Record<number, { audioPromptText: string; options: Array<{ label: string; emoji: string; correct: boolean }> }> = {
  31: { audioPromptText: 'Tap the picture that shows a ROBOT', options: [{ label: 'Robot', emoji: '🤖', correct: true }, { label: 'Apple', emoji: '🍎', correct: false }, { label: 'Ball', emoji: '⚽', correct: false }] },
  32: { audioPromptText: 'Which picture shows something that MOVES?', options: [{ label: 'Car', emoji: '🚗', correct: true }, { label: 'Book', emoji: '📚', correct: false }, { label: 'Chair', emoji: '🪑', correct: false }] },
  33: { audioPromptText: 'What is this technology item called?', options: [{ label: 'Tablet', emoji: '📱', correct: true }, { label: 'Pencil', emoji: '✏️', correct: false }, { label: 'Hat', emoji: '🎩', correct: false }] },
  34: { audioPromptText: 'Which tool should Robo use to GRAB the item?', options: [{ label: 'Robot Arm', emoji: '🦷', correct: true }, { label: 'Umbrella', emoji: '☂️', correct: false }, { label: 'Clock', emoji: '🕐', correct: false }] },
  35: { audioPromptText: 'Tap what has WHEELS and can CARRY things', options: [{ label: 'Truck', emoji: '🚛', correct: true }, { label: 'Balloon', emoji: '🎈', correct: false }, { label: 'Flower', emoji: '🌸', correct: false }] },
  36: { audioPromptText: 'Teacher says: Open the learning APP. Tap the correct one!', options: [{ label: 'App Icon', emoji: '📲', correct: true }, { label: 'Speaker', emoji: '🔊', correct: false }, { label: 'Battery', emoji: '🔋', correct: false }] },
  37: { audioPromptText: 'Which icon means SAVE your work?', options: [{ label: 'Save Disk', emoji: '💾', correct: true }, { label: 'Delete', emoji: '❌', correct: false }, { label: 'Print', emoji: '🖨️', correct: false }] },
  38: { audioPromptText: 'Which part helps Robo MOVE FORWARD?', options: [{ label: 'Gear/Motor', emoji: '⚙️', correct: true }, { label: 'Camera', emoji: '📷', correct: false }, { label: 'Microphone', emoji: '🎤', correct: false }] },
  39: { audioPromptText: 'Which symbol means "I NEED HELP please!"?', options: [{ label: 'Help Hand', emoji: '🙋', correct: true }, { label: 'Stop Sign', emoji: '🛑', correct: false }, { label: 'Music Note', emoji: '🎵', correct: false }] },
  40: { audioPromptText: 'Tap the picture that shows YOUR ANSWER to the team', options: [{ label: 'Thumbs Up', emoji: '👍', correct: true }, { label: 'Question Mark', emoji: '❓', correct: false }, { label: 'Sleeping', emoji: '😴', correct: false }] },
  58: { audioPromptText: 'Which icon opens the ROBOT CODING activity?', options: [{ label: 'Code Robot', emoji: '🤖', correct: true }, { label: 'Music', emoji: '🎵', correct: false }, { label: 'Food', emoji: '🍕', correct: false }] },
};

// Per-slot cognitive configurations: 100% synchronized instructions, sequence/grid diagrams, and option choices per question (Q1-Q15)
const COGNITIVE_SLOT_CONFIGS: Record<number, { instructions: string; sequence?: string[]; grid?: string[][]; options: Array<{ label: string; emoji?: string; correct: boolean }>; hint: string }> = {
  1: {
    instructions: 'Look at the shape below. Which option matches it exactly?',
    sequence: ['🔴 Red Circle'],
    options: [{ label: 'Red Circle', emoji: '🔴', correct: true }, { label: 'Blue Square', emoji: '🟦', correct: false }, { label: 'Yellow Triangle', emoji: '🔺', correct: false }],
    hint: 'Find the red circle!'
  },
  2: {
    instructions: 'Look at the shapes: 🔴 Circle | 🔴 Circle | 🟩 Square. Which shape is DIFFERENT?',
    sequence: ['🔴 Circle', '🔴 Circle', '🟩 Square (Different!)'],
    options: [{ label: 'Green Square', emoji: '🟩', correct: true }, { label: 'Red Circle', emoji: '🔴', correct: false }, { label: 'Blue Triangle', emoji: '🔺', correct: false }],
    hint: 'Two are red circles, one is a green square!'
  },
  3: {
    instructions: 'Look at the pattern: 🔺 🔷 🔺 🔷 ... What comes next?',
    sequence: ['🔺 Triangle', '🔷 Diamond', '🔺 Triangle', '🔷 Diamond', '❓'],
    options: [{ label: 'Triangle', emoji: '🔺', correct: true }, { label: 'Diamond', emoji: '🔷', correct: false }, { label: 'Star', emoji: '⭐', correct: false }],
    hint: 'Triangle and Diamond take turns!'
  },
  4: {
    instructions: 'Which objects belong together in the same group?',
    sequence: ['🐶 Dog', '🐱 Cat', '🦁 Lion'],
    options: [{ label: 'Animals Group', emoji: '🐶', correct: true }, { label: 'Vehicle Group', emoji: '🚗', correct: false }, { label: 'Fruit Group', emoji: '🍎', correct: false }],
    hint: 'Dog, Cat, and Lion are all animals!'
  },
  5: {
    instructions: 'Which item does NOT belong in this vehicle group?',
    sequence: ['🚗 Car', '🚌 Bus', '✈️ Airplane', '🍎 Apple'],
    options: [{ label: 'Apple', emoji: '🍎', correct: true }, { label: 'Car', emoji: '🚗', correct: false }, { label: 'Airplane', emoji: '✈️', correct: false }],
    hint: 'Car, bus, and airplane are vehicles. Apple is food!'
  },
  6: {
    instructions: 'Look at the number sequence: 1️⃣ ➔ 2️⃣ ➔ 3️⃣ ➔ 4️⃣ ... What comes next?',
    sequence: ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '❓'],
    options: [{ label: '5️⃣ Five', emoji: '5️⃣', correct: true }, { label: '6️⃣ Six', emoji: '6️⃣', correct: false }, { label: '3️⃣ Three', emoji: '3️⃣', correct: false }],
    hint: 'Numbers count up: 1, 2, 3, 4, 5!'
  },
  7: {
    instructions: "Let's help the seed grow into a flower! Pick the correct order:",
    sequence: ['🌱 Seed', '➡️', '🌿 Sprout', '➡️', '🌸 Flower'],
    options: [
      { label: '🌱 Seed ➔ 🌿 Sprout ➔ 🌸 Flower', emoji: '🌸', correct: true },
      { label: '🌸 Flower ➔ 🌱 Seed ➔ 🌿 Sprout', emoji: '🌱', correct: false },
      { label: '🌿 Sprout ➔ 🌸 Flower ➔ 🌱 Seed', emoji: '🌿', correct: false }
    ],
    hint: 'Seed grows into sprout, then flower!'
  },
  8: {
    instructions: 'Look at the color pattern: 🔴 🔵 🟨 🔴 🔵 __. Which shape comes next?',
    sequence: ['🔴 Red', '🔵 Blue', '🟨 Yellow', '🔴 Red', '🔵 Blue', '❓'],
    options: [{ label: 'Yellow Square', emoji: '🟨', correct: true }, { label: 'Blue Circle', emoji: '🔵', correct: false }, { label: 'Red Circle', emoji: '🔴', correct: false }],
    hint: 'Red, Blue, Yellow repeat in order!'
  },
  9: {
    instructions: 'Look at the shapes in the grid. Which shape finishes the last row?',
    grid: [
      ['🔺 Triangle', '⬛ Square', '🔴 Circle'],
      ['⬛ Square', '🔴 Circle', '🔺 Triangle'],
      ['🔴 Circle', '🔺 Triangle', '❓']
    ],
    options: [{ label: 'Square', emoji: '⬛', correct: true }, { label: 'Circle', emoji: '🔴', correct: false }, { label: 'Triangle', emoji: '🔺', correct: false }],
    hint: 'Each row has a triangle, square, and circle!'
  },
  10: {
    instructions: 'Look at the color block pattern: 🟦 🟦 🟨 🟦 🟦 ... What comes next?',
    sequence: ['🟦 Blue', '🟦 Blue', '🟨 Yellow', '🟦 Blue', '🟦 Blue', '❓'],
    options: [{ label: 'Yellow Square', emoji: '🟨', correct: true }, { label: 'Blue Square', emoji: '🟦', correct: false }, { label: 'Red Square', emoji: '🟥', correct: false }],
    hint: 'Two blue squares, then one yellow square!'
  },
  11: {
    instructions: 'Look at the shape matrix. Which shape completes the pattern?',
    grid: [
      ['⭕ Circle', '⬛ Square', '🔺 Triangle'],
      ['⬛ Square', '🔺 Triangle', '⭕ Circle'],
      ['🔺 Triangle', '⭕ Circle', '❓']
    ],
    options: [{ label: 'Square', emoji: '⬛', correct: true }, { label: 'Circle', emoji: '⭕', correct: false }, { label: 'Triangle', emoji: '🔺', correct: false }],
    hint: 'Each row must contain circle, square, and triangle!'
  },
  12: {
    instructions: 'Look at the day cycle: ☀️ Daytime ➔ 🌙 Nighttime ➔ ☀️ Daytime ... What comes next?',
    sequence: ['☀️ Daytime ➔', '🌙 Nighttime ➔', '☀️ Daytime ➔', '❓'],
    options: [{ label: 'Nighttime', emoji: '🌙', correct: true }, { label: 'Daytime', emoji: '☀️', correct: false }, { label: 'Rain', emoji: '🌧️', correct: false }],
    hint: 'Day comes after night, night comes after day!'
  },
  13: {
    instructions: 'It is raining outside! What should you bring before going out?',
    sequence: ['🌧️ Rain Outside ➔ ❓ What do you bring?'],
    options: [{ label: 'Umbrella', emoji: '☂️', correct: true }, { label: 'Sunglasses', emoji: '🕶️', correct: false }, { label: 'Ice Cream', emoji: '🍦', correct: false }],
    hint: 'Umbrella keeps you dry in the rain!'
  },
  14: {
    instructions: 'You put a key into a locked door and turn it. What happens next?',
    sequence: ['🔑 Key ➔ 🚪 Door ➔ ❓ What happens?'],
    options: [{ label: 'Door Unlocks', emoji: '🔓', correct: true }, { label: 'Door Locks', emoji: '🔒', correct: false }, { label: 'Lights Turn Off', emoji: '💡', correct: false }],
    hint: 'A key turns to unlock the door!'
  },
  15: {
    instructions: 'What will happen if a glass cup is dropped on a hard tile floor?',
    sequence: ['🫗 Glass Dropped ➔ ❓ What happens next?'],
    options: [{ label: 'Glass Shatters', emoji: '💥', correct: true }, { label: 'Floats in Air', emoji: '🎈', correct: false }, { label: 'Turns into Apple', emoji: '🍎', correct: false }],
    hint: 'Glass breaks when dropped!'
  }
};

export class ActivityGenerator {
  private client: AzureOpenAIClient;

  constructor() {
    this.client = new AzureOpenAIClient();
  }

  /**
   * Generates a unique assessment activity (1 of 60) based on its fixed baseline specification.
   * Ensures EXACTLY 3 answer choices per question.
   */
  public async generateActivity(slot: number): Promise<ActivityItem> {
    const safeSlot = Math.max(1, Math.min(60, slot));
    const baseline = QUESTION_BASELINES[safeSlot - 1];
    const missionConfig = ROBOT_MISSION_CONFIGS[safeSlot];
    const pmConfig = PICTURE_MATCH_CONFIGS[safeSlot];

    let typeSpecificInstructions = '';
    if (baseline.type === 'robot_mission' && missionConfig) {
      typeSpecificInstructions = `
This is a robot coding question. Available blocks: [${missionConfig.blocks.join(', ')}]. Correct sequence: [${missionConfig.correctSequence.join(' → ')}]. Context: ${missionConfig.description}`;
    } else if (baseline.type === 'picture_match' && pmConfig) {
      typeSpecificInstructions = `
This is a picture-matching/audio question. Audio prompt: "${pmConfig.audioPromptText}". Use these options: ${JSON.stringify(pmConfig.options)}`;
    }

    const prompt = `You are generating Question #${baseline.slot} of 60 for the Cognix SEN Placement Assessment (aged 6-12).
Baseline: "${baseline.baselinePrompt}" (Domain: ${baseline.domain}, Sub-skill: ${baseline.subSkill}, Difficulty: ${baseline.difficulty}/3, Type: ${baseline.type}).${typeSpecificInstructions}

CRITICAL REQUIREMENTS:
- Generate a child-friendly, engaging variation.
- MUST HAVE EXACTLY 3 ANSWER CHOICES (Option A, Option B, Option C) with text labels and emojis.
- 1 choice MUST be fully correct, 2 choices MUST be plausible wrong distractors.
- Keep language simple, positive, encouraging.

Return ONLY valid JSON with no markdown:
{
  "title": "${baseline.title}",
  "instructions": "Child-friendly question prompt",
  "type": "${baseline.type}",
  "hintText": "Encouraging hint",
  "payload": {
    "options": [
      { "label": "Choice A Label", "emoji": "🟢", "correct": true },
      { "label": "Choice B Label", "emoji": "🔴", "correct": false },
      { "label": "Choice C Label", "emoji": "🟡", "correct": false }
    ],
    "correctIndex": 0
  }
}`;

    try {
      const aiResponse = await this.client.generateCompletion(prompt);

      if (aiResponse) {
        let cleanJson = aiResponse.trim();
        if (cleanJson.startsWith('```json')) {
          cleanJson = cleanJson.replace(/^```json/, '').replace(/```$/, '').trim();
        } else if (cleanJson.startsWith('```')) {
          cleanJson = cleanJson.replace(/^```/, '').replace(/```$/, '').trim();
        }
        const lastBrace = cleanJson.lastIndexOf('}');
        if (lastBrace !== -1) cleanJson = cleanJson.substring(0, lastBrace + 1);

        const parsed = JSON.parse(cleanJson);
        if (parsed.instructions && parsed.payload) {
          // Force type to baseline type
          parsed.type = baseline.type;

          // For non-robot questions, explicitly strip any robot blocks
          if (baseline.type !== 'robot_mission') {
            delete parsed.payload.availableBlocks;
            delete parsed.payload.correctSequence;
          }

          // Attach slot-matched cognitive sequence/grid if AI omitted it
          const cogCfg = COGNITIVE_SLOT_CONFIGS[safeSlot];
          if (cogCfg) {
            if (!parsed.payload.sequence && cogCfg.sequence) parsed.payload.sequence = cogCfg.sequence;
            if (!parsed.payload.grid && cogCfg.grid) parsed.payload.grid = cogCfg.grid;
          }

          // Force exactly 3 options
          if (Array.isArray(parsed.payload.options) && parsed.payload.options.length > 3) {
            parsed.payload.options = parsed.payload.options.slice(0, 3);
          }
          // Always enforce the correct robot mission blocks from our config
          if (baseline.type === 'robot_mission' && missionConfig) {
            parsed.payload.availableBlocks = missionConfig.blocks;
            if (!parsed.payload.correctSequence || parsed.payload.correctSequence.length === 0) {
              parsed.payload.correctSequence = missionConfig.correctSequence;
            }
          }
          // Always enforce picture_match data from our config
          if (baseline.type === 'picture_match' && pmConfig && !parsed.payload.audioPromptText) {
            parsed.payload.audioPromptText = pmConfig.audioPromptText;
          }
          if (baseline.type === 'picture_match' && pmConfig && (!Array.isArray(parsed.payload.options) || parsed.payload.options.length === 0)) {
            parsed.payload.options = pmConfig.options;
          }

          return {
            id: `q_slot_${baseline.slot}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            slot: baseline.slot,
            domain: baseline.domain,
            skill: baseline.skill,
            subSkill: baseline.subSkill,
            title: parsed.title || baseline.title,
            instructions: parsed.instructions,
            difficulty: baseline.difficulty,
            expectedTimeMs: 90000,
            maxPoints: baseline.maxPoints,
            type: baseline.type,
            payload: parsed.payload,
            hintText: parsed.hintText || 'Take your time and think carefully!',
            source: 'azure_openai'
          };
        }
      }
    } catch (e) {
      // Fall through to procedural fallback
    }

    return this.generateDynamicFallback(safeSlot);
  }

  /**
   * Procedural generator creating a deterministic unique 3-choice variation for any of the 60 question slots.
   */
  public generateDynamicFallback(slot: number): ActivityItem {
    const safeSlot = Math.max(1, Math.min(60, slot));
    const baseline = QUESTION_BASELINES[safeSlot - 1];
    const id = `fallback_q_${safeSlot}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let payload: any = {};
    let instructions = baseline.baselinePrompt;
    let hintText = 'Look at all options carefully before picking.';

    if (baseline.type === 'robot_mission') {
      const mCfg = ROBOT_MISSION_CONFIGS[safeSlot] || {
        blocks: ['Move Forward ⬆️', 'Turn Right ➡️', 'Grab Item 🦾'],
        correctSequence: ['Move Forward ⬆️', 'Grab Item 🦾'],
        description: 'Build the correct sequence to complete the mission!'
      };
      instructions = mCfg.description;
      payload = {
        availableBlocks: mCfg.blocks,
        correctSequence: mCfg.correctSequence,
        options: [
          { label: mCfg.correctSequence.join(' ➔ '), correct: true },
          { label: [...mCfg.blocks].reverse().slice(0, 2).join(' ➔ '), correct: false },
          { label: mCfg.blocks.slice(0, Math.min(2, mCfg.blocks.length)).reverse().join(' ➔ '), correct: false }
        ],
        correctIndex: 0
      };
      hintText = `Hint: ${mCfg.correctSequence.join(' → then ')}`;

    } else if (baseline.type === 'picture_match') {
      const pmCfg = PICTURE_MATCH_CONFIGS[safeSlot];
      if (pmCfg) {
        payload = { ...pmCfg };
        instructions = pmCfg.audioPromptText;
        hintText = 'Listen carefully and tap the right picture!';
      } else {
        payload = {
          audioPromptText: baseline.baselinePrompt,
          options: [
            { label: 'Robot', emoji: '🤖', correct: true },
            { label: 'Apple', emoji: '🍎', correct: false },
            { label: 'Ball', emoji: '⚽', correct: false }
          ],
          correctIndex: 0
        };
        hintText = 'Tap the correct picture!';
      }

    } else if (baseline.type === 'motor_target') {
      const targetsMap: Record<number, number> = { 51: 4, 52: 3, 54: 5, 56: 3 };
      payload = {
        targetsCount: targetsMap[safeSlot] || 3,
        options: [
          { label: 'Hit target 🎯', correct: true },
          { label: 'Miss edge', correct: false },
          { label: 'Click outside', correct: false }
        ],
        correctIndex: 0
      };
      hintText = 'Click directly inside the glowing circle!';

    } else if (COGNITIVE_SLOT_CONFIGS[safeSlot]) {
      const cogCfg = COGNITIVE_SLOT_CONFIGS[safeSlot];
      instructions = cogCfg.instructions;
      payload = {
        sequence: cogCfg.sequence,
        grid: cogCfg.grid,
        options: [...cogCfg.options],
        correctIndex: 0
      };
      hintText = cogCfg.hint;

    } else if (COGNITIVE_SLOT_CONFIGS[safeSlot]) {
      const cogCfg = COGNITIVE_SLOT_CONFIGS[safeSlot];
      instructions = cogCfg.instructions;
      payload = {
        sequence: cogCfg.sequence,
        grid: cogCfg.grid,
        options: [...cogCfg.options],
        correctIndex: 0
      };
      hintText = cogCfg.hint;

    } else {
      const behavioralMap: Record<number, { options: any[]; hint: string }> = {
        41: { options: [{ label: '😌 Stay calm & focus on puzzle', correct: true }, { label: '😤 Slam tablet down', correct: false }, { label: '🚪 Walk away', correct: false }], hint: 'Take a deep breath and stay focused!' },
        42: { options: [{ label: '👀 Keep eyes on learning screen', correct: true }, { label: '🎈 Look at noise outside', correct: false }, { label: '😴 Fall asleep', correct: false }], hint: 'Maintain attention on your task!' },
        43: { options: [{ label: '🛑 Stop when teacher gives stop signal', correct: true }, { label: '🏃 Keep running', correct: false }, { label: '😶 Ignore signal', correct: false }], hint: 'Always stop when given the stop signal!' },
        44: { options: [{ label: '💡 Listen to hint and try again', correct: true }, { label: '😤 Get mad at feedback', correct: false }, { label: '🗑️ Delete activity', correct: false }], hint: 'Feedback helps you learn!' },
        45: { options: [{ label: '🔄 Try a different block calmly', correct: true }, { label: '🗣️ Shout loudly', correct: false }, { label: '❌ Quit immediately', correct: false }], hint: 'If a step fails, try another approach!' },
        46: { options: [{ label: '✅ Put tablet away gently when time is up', correct: true }, { label: '😭 Refuse to stop', correct: false }, { label: '🙈 Hide tablet', correct: false }], hint: 'Transition smoothly when time is up!' },
        47: { options: [{ label: '✋ Wait patiently for my turn', correct: true }, { label: '🫱 Grab robot from friend', correct: false }, { label: '🗣️ Yell for turn', correct: false }], hint: 'Wait your turn politely!' },
        48: { options: [{ label: '🌟 Eagerly try the new technology challenge', correct: true }, { label: '🙈 Say I cannot do it', correct: false }, { label: '😴 Ignore challenge', correct: false }], hint: 'Give new challenges a try!' },
        49: { options: [{ label: '🤔 Think independently before asking', correct: true }, { label: '🙋 Ask help without trying', correct: false }, { label: '❌ Give up', correct: false }], hint: 'Try solving on your own first!' },
        50: { options: [{ label: '🙋 Raise hand and ask politely: "Can you help?"', correct: true }, { label: '🗣️ Scream for help', correct: false }, { label: '😤 Cry loudly', correct: false }], hint: 'Polite help requests are best!' }
      };

      const fineMotorMap: Record<number, { options: any[]; hint: string }> = {
        53: {
          options: [
            { label: '🗣️ Head ➔ 🦿 Body ➔ 🦾 Arms', emoji: '🤖', correct: true },
            { label: '🦿 Body ➔ 🗣️ Head ➔ 🦾 Arms', emoji: '⚙️', correct: false },
            { label: '🦾 Arms ➔ 🦿 Body ➔ 🗣️ Head', emoji: '🔧', correct: false }
          ],
          hint: 'Assemble Robo from head to body!'
        },
        55: {
          options: [
            { label: '⌨️ Long Spacebar Key', emoji: '⌨️', correct: true },
            { label: '🔌 Power Cable', emoji: '🔌', correct: false },
            { label: '🔊 Volume Button', emoji: '🔊', correct: false }
          ],
          hint: 'Spacebar is the long key at bottom!'
        },
        57: {
          options: [
            { label: '🧩 Drag block smoothly into matching slot', emoji: '✅', correct: true },
            { label: '🔨 Tap screen with heavy object', emoji: '❌', correct: false },
            { label: '✂️ Cut screen image', emoji: '❌', correct: false }
          ],
          hint: 'Drag gently into the matching slot!'
        },
        59: {
          options: [
            { label: '🔄 Refresh or Restart App', emoji: '🔄', correct: true },
            { label: '📵 Throw tablet on floor', emoji: '🛑', correct: false },
            { label: '⏳ Wait 10 hours', emoji: '⏳', correct: false }
          ],
          hint: 'Restarting fixes frozen screens!'
        }
      };

      if (baseline.domain === 'behavioral_readiness' && behavioralMap[safeSlot]) {
        payload = { options: behavioralMap[safeSlot].options, correctIndex: 0 };
        hintText = behavioralMap[safeSlot].hint;
      } else if (baseline.domain === 'fine_motor_technology' && fineMotorMap[safeSlot]) {
        payload = { options: fineMotorMap[safeSlot].options, correctIndex: 0 };
        hintText = fineMotorMap[safeSlot].hint;
      } else {
        payload = {
          options: [
            { label: '🌟 Correct Solution', correct: true },
            { label: '❌ Distractor Option A', correct: false },
            { label: '🛑 Distractor Option B', correct: false }
          ],
          correctIndex: 0
        };
      }
    }

    if (payload.options && Array.isArray(payload.options) && payload.options.length === 3) {
      const correctItem = payload.options.find((o: any) => o.correct) || payload.options[0];
      const shuffled = this.shuffleArray([...payload.options]);
      payload.options = shuffled;
      payload.correctIndex = shuffled.indexOf(correctItem);
    }

    return {
      id,
      slot: baseline.slot,
      domain: baseline.domain,
      skill: baseline.skill,
      subSkill: baseline.subSkill,
      title: baseline.title,
      instructions,
      difficulty: baseline.difficulty,
      expectedTimeMs: 90000,
      maxPoints: baseline.maxPoints,
      type: baseline.type,
      payload,
      hintText,
      source: 'procedural'
    };
  }


  private shuffleArray<T>(arr: T[]): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }
}



import { AssessmentDomain, SkillName } from '../engine/telemetrySchema';
import { AzureOpenAIClient } from './azureOpenAIClient';

export interface ActivityItem {
  id: string;
  domain: AssessmentDomain;
  skill: SkillName;
  title: string;
  instructions: string;
  difficulty: number;
  expectedTimeMs: number;
  type: 'pattern_matrix' | 'robot_mission' | 'picture_match' | 'rule_shift' | 'motor_target';
  payload: any;
  hintText: string;
}

export class ActivityGenerator {
  private client: AzureOpenAIClient;

  constructor() {
    this.client = new AzureOpenAIClient();
  }

  /**
   * Generates or retrieves a unique assessment activity tailored to domain, difficulty, and question index.
   */
  public async generateActivity(domain: AssessmentDomain, difficulty: number, questionIndex: number): Promise<ActivityItem> {
    let typeName = 'pattern_matrix';
    let schemaGuide = '';
    
    if (domain === 'cognitive_ability') {
      typeName = 'pattern_matrix';
      schemaGuide = `"payload": { "sequence": ["🔺", "▶️", "🔻", "◀️", "?"], "options": ["🔺", "▶️", "🔻", "⭐"], "correctIndex": 0 }`;
    } else if (domain === 'functional_skills') {
      typeName = 'robot_mission';
      schemaGuide = `"payload": { "availableBlocks": ["Move Forward", "Turn Right", "Pick Up Item"], "correctSequence": ["Move Forward", "Move Forward", "Pick Up Item"] }`;
    } else if (domain === 'communication_level') {
      typeName = 'picture_match';
      schemaGuide = `"payload": { "audioPromptText": "Select the lunar rover", "options": [{"label": "Lunar Rover", "emoji": "🛸", "correct": true}, {"label": "Bicycle", "emoji": "🚲", "correct": false}] }`;
    } else if (domain === 'behavioral_readiness') {
      typeName = 'rule_shift';
      schemaGuide = `"payload": { "initialRule": "Rule 1: Sort by Color", "shiftedRule": "⚡ Rule Shift! Sort by Shape", "itemsToSort": [{"label": "Blue Circle", "color": "blue", "shape": "circle"}] }`;
    } else {
      typeName = 'motor_target';
      schemaGuide = `"payload": { "targetsCount": 4, "movementSpeed": 1.5 }`;
    }

    const prompt = `Generate question #${questionIndex} of 20 for AI Placement Assessment.
Domain: "${domain}", Difficulty: ${difficulty}/5.
Return strictly valid JSON with this structure:
{
  "title": "Short Question Title",
  "instructions": "Clear instruction text",
  "type": "${typeName}",
  "hintText": "Helpful hint for student",
  ${schemaGuide}
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

        const parsed = JSON.parse(cleanJson);
        if (parsed.title && parsed.payload) {
          parsed.id = `ai_q_${questionIndex}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
          if (!parsed.type) parsed.type = typeName;
          return parsed as ActivityItem;
        }
      }
    } catch (e) {
      // Fallback to procedurally unique dynamic activity generator
    }

    return this.generateDynamicActivity(domain, difficulty, questionIndex);
  }

  /**
   * Procedural AI generator creating randomized, non-repeating questions across all 5 domains.
   */
  public generateDynamicActivity(domain: AssessmentDomain, difficulty: number, questionIndex: number): ActivityItem {
    const id = `dyn_q_${questionIndex}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const randSeed = Math.floor(Math.random() * 100);

    switch (domain) {
      case 'cognitive_ability': {
        const patternTypes = [
          // Type 0: Rotations
          () => {
            const rotSets = [
              ['🔺', '▶️', '🔻', '◀️'],
              ['⬆️', '➡️', '⬇️', '⬅️'],
              ['👆', '👉', '👇', '👈'],
              ['🌙', '🌖', '🌕', '🌔']
            ];
            const set = rotSets[randSeed % rotSets.length];
            const startIdx = Math.floor(Math.random() * 4);
            const sequence = [set[startIdx], set[(startIdx + 1) % 4], set[(startIdx + 2) % 4], set[(startIdx + 3) % 4], '?'];
            const correct = set[startIdx]; // repeats
            const wrongOptions = set.filter(x => x !== correct);
            const options = this.shuffleArray([correct, ...wrongOptions]);
            return {
              title: `Visual Pattern Matrix: Directional Rotation (Variant ${randSeed})`,
              instructions: 'Observe the 90-degree spatial rotation sequence and select the missing shape.',
              sequence,
              options,
              correctIndex: options.indexOf(correct),
              hint: 'The shape rotates clockwise around its center axis by 90° per step.'
            };
          },
          // Type 1: Color Series
          () => {
            const colorTrios = [
              ['🔵 Blue Circle', '🟥 Red Square', '🟢 Green Triangle'],
              ['🟣 Purple Star', '🟡 Yellow Gem', '🟧 Orange Diamond'],
              ['🔴 Red Ruby', '🟦 Blue Sapphire', '🟩 Green Emerald']
            ];
            const trio = colorTrios[randSeed % colorTrios.length];
            const sequence = [trio[0], trio[1], trio[2], trio[0], trio[1], '?'];
            const correct = trio[2];
            const options = this.shuffleArray([correct, trio[0], trio[1], '⬛ Black Box']);
            return {
              title: `Visual Pattern Matrix: Color Geometry Series (Variant ${randSeed})`,
              instructions: 'Identify the next shape completing the repeating color-geometry sequence.',
              sequence,
              options,
              correctIndex: options.indexOf(correct),
              hint: `The sequence follows a repeating 3-step pattern: ${trio[0]} ➔ ${trio[1]} ➔ ${trio[2]}.`
            };
          },
          // Type 2: Side Progression
          () => {
            const numSequences = [
              { seq: ['⚪ (1 Circle)', '➖ (2 Lines)', '🔺 (3 Triangle)', '⏹️ (4 Square)', '?'], correct: '⭐ (5 Star)', opts: ['⭐ (5 Star)', '🔴 (1 Circle)', '🔷 (4 Diamond)', '⬛ (6 Hexagon)'] },
              { seq: ['🔹 (Level 1)', '🔹🔹 (Level 2)', '🔹🔹🔹 (Level 3)', '?'], correct: '🔹🔹🔹🔹 (Level 4)', opts: ['🔹🔹🔹🔹 (Level 4)', '🔹 (Level 1)', '🔹🔹 (Level 2)', '❌ (Stop)'] }
            ];
            const selected = numSequences[randSeed % numSequences.length];
            const options = this.shuffleArray([...selected.opts]);
            return {
              title: `Logical Progression: Quantity & Sides (Variant ${randSeed})`,
              instructions: 'Predict the next element in the increasing geometric quantity series.',
              sequence: selected.seq,
              options,
              correctIndex: options.indexOf(selected.correct),
              hint: 'Count the number of elements or sides increasing progressively by +1.'
            };
          },
          // Type 3: Category Odd One Out
          () => {
            const oddSets = [
              { items: ['📡 Distance Sensor', '📷 Camera Module', '🌡️ Temperature Probe'], odd: '🍎 Fresh Apple', hint: 'Find the organic fruit among electronic tech sensors.' },
              { items: ['💻 Laptop Computer', '📱 Smartphone', '🖥️ Desktop Workstation'], odd: '👟 Running Shoe', hint: 'Spot the non-electronic wearable item.' },
              { items: ['⚙️ Mechanical Gear', '🔩 Steel Bolt', '🔧 Wrench Tool'], odd: '🍕 Pepperoni Pizza', hint: 'Identify the food item among mechanical hardware tools.' }
            ];
            const set = oddSets[randSeed % oddSets.length];
            const options = this.shuffleArray([...set.items, set.odd]);
            return {
              title: `Visual Classification: Odd One Out (Variant ${randSeed})`,
              instructions: 'Select the item that does NOT belong to the technology category.',
              sequence: [...set.items, set.odd],
              options,
              correctIndex: options.indexOf(set.odd),
              hint: set.hint
            };
          }
        ];

        const generatorFn = patternTypes[questionIndex % patternTypes.length];
        const res = generatorFn();

        return {
          id,
          domain: 'cognitive_ability',
          skill: 'pattern_recognition',
          title: `Cognitive Q${questionIndex}: ${res.title}`,
          instructions: res.instructions,
          difficulty,
          expectedTimeMs: 12000,
          type: 'pattern_matrix',
          hintText: res.hint,
          payload: {
            sequence: res.sequence,
            options: res.options,
            correctIndex: res.correctIndex
          }
        };
      }

      case 'functional_skills': {
        const funcMissions = [
          {
            title: `Mars Rover Solar Pickup (Variant ${randSeed})`,
            instructions: 'Sequence the commands to advance the rover 2 steps forward and collect the energy pod.',
            available: ['Move Forward', 'Turn Right', 'Pick Up Item', 'Turn Left'],
            correctSeq: ['Move Forward', 'Move Forward', 'Pick Up Item'],
            hint: 'Use "Move Forward" twice then "Pick Up Item".'
          },
          {
            title: `Obstacle Navigation Protocol (Variant ${randSeed})`,
            instructions: 'Guide the drone around the barrier by turning right before moving ahead.',
            available: ['Move Forward', 'Turn Right', 'Turn Left', 'Pick Up Item'],
            correctSeq: ['Move Forward', 'Turn Right', 'Move Forward', 'Turn Left', 'Move Forward'],
            hint: 'Turn Right to detour around the obstacle.'
          },
          {
            title: `Robotic Sorting Arm Mission (Variant ${randSeed})`,
            instructions: 'Assemble the multi-step arm sequence to lower, clamp, and deposit cargo.',
            available: ['Lower Arm', 'Grasp Container', 'Raise Arm', 'Rotate 90°', 'Release Cargo'],
            correctSeq: ['Lower Arm', 'Grasp Container', 'Raise Arm', 'Rotate 90°', 'Release Cargo'],
            hint: 'Lower and clamp the container before rotating.'
          },
          {
            title: `Automated Charging Docking (Variant ${randSeed})`,
            instructions: 'Program the shuttle loop to make two left turns and initiate battery charging.',
            available: ['Move Forward', 'Turn Left', 'Charge Battery', 'Turn Right'],
            correctSeq: ['Move Forward', 'Turn Left', 'Move Forward', 'Turn Left', 'Charge Battery'],
            hint: 'Turn Left twice to orient towards the charging station.'
          }
        ];

        const m = funcMissions[(questionIndex + randSeed) % funcMissions.length];
        return {
          id,
          domain: 'functional_skills',
          skill: 'following_instructions',
          title: `Functional Q${questionIndex}: ${m.title}`,
          instructions: m.instructions,
          difficulty,
          expectedTimeMs: 18000,
          type: 'robot_mission',
          hintText: m.hint,
          payload: {
            availableBlocks: m.available,
            correctSequence: m.correctSeq
          }
        };
      }

      case 'communication_level': {
        const commPrompts = [
          {
            title: `Rover Vehicle Identification (Variant ${randSeed})`,
            audio: '"Select the autonomous lunar rover designed to explore planetary surfaces."',
            options: [
              { id: 'opt1', label: 'Lunar Rover', emoji: '🛸', correct: true },
              { id: 'opt2', label: 'Bicycle', emoji: '🚲', correct: false },
              { id: 'opt3', label: 'Submarine', emoji: '🚢', correct: false },
              { id: 'opt4', label: 'Airplane', emoji: '✈️', correct: false }
            ],
            hint: 'Listen for "autonomous lunar rover".'
          },
          {
            title: `Electronics Component Recognition (Variant ${randSeed})`,
            audio: '"Choose the glowing light-emitting diode (LED) component."',
            options: [
              { id: 'opt1', label: 'Glowing LED', emoji: '💡', correct: true },
              { id: 'opt2', label: 'Resistor', emoji: '⚡', correct: false },
              { id: 'opt3', label: 'Connecting Wire', emoji: '〰️', correct: false },
              { id: 'opt4', label: 'Drive Gear', emoji: '⚙️', correct: false }
            ],
            hint: 'Focus on the glowing light source icon.'
          },
          {
            title: `Gripper Mechanism Prompt (Variant ${randSeed})`,
            audio: '"Select the mechanical claw arm used to grab items."',
            options: [
              { id: 'opt1', label: 'Robotic Claw', emoji: '🦾', correct: true },
              { id: 'opt2', label: 'Steering Wheel', emoji: '🛞', correct: false },
              { id: 'opt3', label: 'Solar Panel', emoji: '☀️', correct: false },
              { id: 'opt4', label: 'Audio Speaker', emoji: '🔊', correct: false }
            ],
            hint: 'Listen for "mechanical claw arm".'
          },
          {
            title: `Algorithm Loop Command (Variant ${randSeed})`,
            audio: '"Select the repeat loop symbol representing iterative execution."',
            options: [
              { id: 'opt1', label: 'Repeat Loop', emoji: '🔁', correct: true },
              { id: 'opt2', label: 'Stop Sign', emoji: '🛑', correct: false },
              { id: 'opt3', label: 'Help Mark', emoji: '❓', correct: false },
              { id: 'opt4', label: 'Lightning Unit', emoji: '⚡', correct: false }
            ],
            hint: 'Look for circular loop arrows.'
          }
        ];

        const c = commPrompts[(questionIndex + randSeed) % commPrompts.length];
        const shuffledOpts = this.shuffleArray([...c.options]);

        return {
          id,
          domain: 'communication_level',
          skill: 'picture_matching',
          title: `Communication Q${questionIndex}: ${c.title}`,
          instructions: 'Listen to the verbal instruction audio prompt and select the matching icon.',
          difficulty,
          expectedTimeMs: 10000,
          type: 'picture_match',
          hintText: c.hint,
          payload: {
            audioPromptText: c.audio,
            options: shuffledOpts
          }
        };
      }

      case 'behavioral_readiness': {
        const rules = [
          {
            title: `Dynamic Sorting Rule Shift: Color vs Shape (Variant ${randSeed})`,
            initialRule: 'Rule 1: Sort by Color (Blue Bucket vs Red Bucket)',
            shiftedRule: '⚡ Rule Shift! Now Sort by Shape (Circle vs Triangle)',
            hint: 'Watch closely when the sorting rule changes mid-game!'
          },
          {
            title: `Adaptability Challenge: Rapid vs Timed Response (Variant ${randSeed})`,
            initialRule: 'Rule 1: Sort by Priority (High vs Low)',
            shiftedRule: '⚡ Rule Shift! Sort by Category (Hardware vs Software)',
            hint: 'Adapt your classification criteria after the rule shift.'
          }
        ];

        const r = rules[(questionIndex + randSeed) % rules.length];
        return {
          id,
          domain: 'behavioral_readiness',
          skill: 'adaptability',
          title: `Behavioral Q${questionIndex}: ${r.title}`,
          instructions: 'Sort the items according to the active rule. Attention: rules shift during the game!',
          difficulty,
          expectedTimeMs: 15000,
          type: 'rule_shift',
          hintText: r.hint,
          payload: {
            initialRule: r.initialRule,
            shiftedRule: r.shiftedRule,
            itemsToSort: [{ label: 'Microcontroller Target', color: 'blue', shape: 'circle' }]
          }
        };
      }

      case 'fine_motor_technology':
      default: {
        const targetCount = 3 + (randSeed % 4); // 3 to 6 targets dynamically
        const speeds = [1.2, 1.5, 1.8, 2.2];
        const selectedSpeed = speeds[randSeed % speeds.length];

        return {
          id,
          domain: 'fine_motor_technology',
          skill: 'mouse_control',
          title: `Fine Motor Q${questionIndex}: Target Precision Pursuit (Variant ${randSeed})`,
          instructions: `Click or tap ${targetCount} moving crosshair targets precisely to test fine motor speed and accuracy.`,
          difficulty,
          expectedTimeMs: 12000,
          type: 'motor_target',
          hintText: 'Click directly on the glowing center of each target.',
          payload: {
            targetsCount: targetCount,
            movementSpeed: selectedSpeed
          }
        };
      }
    }
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

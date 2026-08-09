(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=i(a);fetch(a.href,r)}})();class ge{constructor(){this.endpoint="",this.apiKey="",this.model="o4-mini",this.endpoint="https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses";const e="NVFhTWxHZHd4Qzg1bnkzeVdLMG1GMHd2R2hMQnhFRUxkQkh2RkNhWkFSSVhiN2ZjNXpMR0pRUUo5OUNGQUNmaE1rNVhKM3czQUFBQUFDT0c4WFhP";try{this.apiKey=typeof atob=="function"?atob(e):e}catch{this.apiKey=e}}async generateCompletion(e,i="You are an expert AI Assessment System."){var r,s,g;if(!this.apiKey)return console.warn("[CognixAI] ❌ No API key configured — using fallback generator."),null;const o={model:this.model,input:`${i}

User Prompt: ${e}`},a=[this.endpoint,`https://corsproxy.io/?${encodeURIComponent(this.endpoint)}`];for(const d of a){const p=`req_${Date.now()}_${Math.floor(Math.random()*1e3)}`;console.group(`[CognixAI] 🔷 Azure OpenAI Request [${p}]`),console.log("📤 Endpoint:",d),console.log("📤 Model:",this.model),console.log("📤 Prompt (first 200 chars):",e.substring(0,200)+(e.length>200?"...":"")),console.log("📤 Full payload:",JSON.stringify(o,null,2));const h=performance.now();try{const m=new AbortController,x=setTimeout(()=>{console.warn(`[CognixAI] ⏰ Request [${p}] timed out after 10s`),m.abort()},1e4),c=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","api-key":this.apiKey},body:JSON.stringify(o),signal:m.signal});clearTimeout(x);const w=Math.round(performance.now()-h);if(console.log(`📥 Response Status: ${c.status} ${c.statusText} (${w}ms)`),c.ok){const f=await c.json();if(console.log("📥 Response Body:",JSON.stringify(f,null,2)),f.output&&Array.isArray(f.output)){for(const l of f.output)if(l.type==="message"&&Array.isArray(l.content)){for(const u of l.content)if(u.type==="output_text"&&u.text)return console.log("✅ Extracted text from output_text:",u.text.substring(0,100)),console.groupEnd(),u.text}}if((g=(s=(r=f.choices)==null?void 0:r[0])==null?void 0:s.message)!=null&&g.content)return console.log("✅ Extracted text from choices:",f.choices[0].message.content.substring(0,100)),console.groupEnd(),f.choices[0].message.content;console.warn("[CognixAI] ⚠️ Response OK but could not extract text from response body.")}else{const f=await c.text().catch(()=>"");console.error(`[CognixAI] ❌ HTTP Error ${c.status}:`,f)}}catch(m){const x=Math.round(performance.now()-h);(m==null?void 0:m.name)==="AbortError"?console.error(`[CognixAI] ❌ Request aborted (timeout) after ${x}ms`):console.error(`[CognixAI] ❌ Network/fetch error after ${x}ms:`,(m==null?void 0:m.message)||m)}console.log("[CognixAI] 🔄 Trying next endpoint or falling back..."),console.groupEnd()}return console.warn("[CognixAI] ⚠️ All endpoints failed — using procedural fallback generator."),null}}const U=[{slot:1,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Match Identical Shapes",baselinePrompt:"Match the identical shapes.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:2,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Spot the Difference",baselinePrompt:"Identify the object that is different.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:3,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Visual Discrimination",title:"Match the Pattern",baselinePrompt:"Match the same visual pattern.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:4,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Group Together",baselinePrompt:"Which objects belong together in the same group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:5,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Does Not Belong",baselinePrompt:"Which object does not belong in this group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:6,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Next in Sequence",baselinePrompt:"What comes next in the sequence?",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:7,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Order the Story",baselinePrompt:"Arrange the pictures in the correct logical order.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:8,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Complete Visual Pattern",baselinePrompt:"Complete the visual pattern.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:9,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Identify Missing Element",baselinePrompt:"Identify the missing element in the grid.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:10,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Continue Pattern",baselinePrompt:"Continue the pattern to the next step.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:11,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"Solve the Problem",baselinePrompt:"Which answer solves the logical problem?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:12,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"What Happens Next",baselinePrompt:"What should logically happen next?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:13,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Best Solution",baselinePrompt:"Select the best solution for this situation.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:14,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Sequence to Solve",baselinePrompt:"Identify the correct sequence of actions to solve the problem.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:15,domain:"cognitive_ability",skill:"cause_and_effect",subSkill:"Cause & Effect",title:"Predict Cause & Effect",baselinePrompt:"What will happen if this action is performed?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:16,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Follow Simple Instruction",baselinePrompt:"Follow a simple 1-step instruction.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:17,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Independent Instruction",baselinePrompt:"Complete a second independent 1-step action.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:18,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Two-Step Action",baselinePrompt:"Complete two actions in the correct order.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:19,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Direct Execution",baselinePrompt:"Complete the task smoothly without repeating steps.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:20,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Three-Step Activity",baselinePrompt:"Complete a 3-step structured activity.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:21,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Sequential Workflow",baselinePrompt:"Complete the activity in the exact correct sequence.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:22,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Finish Structured Task",baselinePrompt:"Start and finish the structured robotics task.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:23,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Minimal Prompt Task",baselinePrompt:"Complete the goal with minimal visual prompting.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:24,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Organize Tools",baselinePrompt:"Organize the programming blocks before beginning.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:25,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Return Materials",baselinePrompt:"Return all unused blocks to their correct place.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:26,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Independent Task",baselinePrompt:"Complete the familiar coding mission independently.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:27,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Ask for Help",baselinePrompt:"Identify when and how to request assistance appropriately.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:28,domain:"functional_skills",skill:"problem_solving",subSkill:"Functional Problem Solving",title:"Overcome Blockade",baselinePrompt:"Identify what to do when a path cannot be completed.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:29,domain:"functional_skills",skill:"attention",subSkill:"Learning Routine",title:"Learning Routine",baselinePrompt:"Follow the expected technology learning routine.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:30,domain:"functional_skills",skill:"task_completion",subSkill:"Functional Learning",title:"Practical Learning Task",baselinePrompt:"Complete a simple practical digital learning task.",maxPoints:1,difficulty:2,type:"robot_mission"},{slot:31,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Listen & Follow",baselinePrompt:"Follow a spoken audio instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:32,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Identify Object",baselinePrompt:"Identify the requested target object from audio prompt.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:33,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Name Component",baselinePrompt:"Select the correct name for the highlighted technology item.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:34,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Express Choice",baselinePrompt:"Communicate the correct preference or action needed.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:35,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Two-Step Audio",baselinePrompt:"Follow a 2-step audio communication instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:36,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Classroom Tech Instruction",baselinePrompt:"Follow a functional technology classroom command.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:37,domain:"communication_level",skill:"picture_matching",subSkill:"Identification",title:"Identify Digital Icon",baselinePrompt:"Identify the matching digital icon or symbol.",maxPoints:2,difficulty:1,type:"picture_match"},{slot:38,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Question Response",title:"Answer WH-Question",baselinePrompt:'Answer the question: "Which tool helps robots move?"',maxPoints:2,difficulty:3,type:"picture_match"},{slot:39,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Functional Communication",title:"Request Clarification",baselinePrompt:"Choose the symbol used to request help or clarification.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:40,domain:"communication_level",skill:"understanding_instructions",subSkill:"Problem Solving Communication",title:"Communicate Solution",baselinePrompt:"Communicate the correct solution choice to the team.",maxPoints:2,difficulty:3,type:"picture_match"},{slot:41,domain:"behavioral_readiness",skill:"persistence",subSkill:"Attention",title:"Sustain Attention",baselinePrompt:"Maintains focus when a puzzle takes longer to solve.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:42,domain:"behavioral_readiness",skill:"persistence",subSkill:"Task Engagement",title:"Remain Engaged",baselinePrompt:"Remains engaged in the learning activity despite distractions.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:43,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Instruction Following",title:"Responds to Signals",baselinePrompt:"Responds promptly when given a stop or transition instruction.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:44,domain:"behavioral_readiness",skill:"error_recovery",subSkill:"Response to Correction",title:"Accept Redirection",baselinePrompt:"Accepts gentle feedback and adjusts the approach calmly.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:45,domain:"behavioral_readiness",skill:"flexibility",subSkill:"Frustration Tolerance",title:"Persevere on Error",baselinePrompt:"Continues trying calmly after an initial error or bug.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:46,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Transition",title:"Smooth Transition",baselinePrompt:"Moves smoothly from one activity to the next when time is up.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:47,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Turn Taking / Waiting",title:"Wait Appropriately",baselinePrompt:"Waits patiently while another student or robot finishes their turn.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:48,domain:"behavioral_readiness",skill:"persistence",subSkill:"Motivation",title:"Eager to Learn",baselinePrompt:"Demonstrates willingness to try a new technology challenge.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:49,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Independence",title:"Independent Effort",baselinePrompt:"Attempts the problem independently before asking for help.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:50,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Help Seeking",title:"Polite Help Request",baselinePrompt:"Requests assistance politely and appropriately when stuck.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:51,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Fine Motor Control",title:"Object Precision",baselinePrompt:"Tap or manipulate small digital targets with precision.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:52,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Hand-Eye Coordination",title:"Accurate Movement",baselinePrompt:"Move pointer accurately to the target element.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:53,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Object Manipulation",title:"Assemble Structure",baselinePrompt:"Which set of steps correctly assembles Robo's body? Choose the right order.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:54,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Mouse/Trackpad",title:"Pointer Navigation",baselinePrompt:"Control pointer speed and target alignment.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:55,domain:"fine_motor_technology",skill:"keyboard_navigation",subSkill:"Keyboard Skills",title:"Key Identification",baselinePrompt:"Locate and press key directional arrows or spacebar.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:56,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Touchscreen",title:"Touch Target",baselinePrompt:"Select the highlighted item cleanly on screen.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:57,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Drag & Drop",title:"Drag Block to Slot",baselinePrompt:"Which image shows the correct way to place a block into its matching slot?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:58,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Digital Navigation",title:"Select App Icon",baselinePrompt:"Open or select the correct learning activity application.",maxPoints:1,difficulty:2,type:"picture_match"},{slot:59,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Tech Problem Solving",title:"Fix Screen Freeze",baselinePrompt:"Identify what button to click if a digital task freezes.",maxPoints:1,difficulty:3,type:"pattern_matrix"},{slot:60,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Technology Independence",title:"Independent Navigation",baselinePrompt:"Complete the basic technology startup sequence independently.",maxPoints:2,difficulty:3,type:"robot_mission"}],ue={16:{blocks:["Move Forward ⬆️","Turn Left ⬅️","Stop 🛑"],correctSequence:["Move Forward ⬆️"],description:"Robo needs to move forward ONCE to reach the star. Add just one block!"},17:{blocks:["Grab Item 🦷","Turn Right ➡️","Move Back ⬇️"],correctSequence:["Grab Item 🦷"],description:"The item is right in front of Robo! Just grab it with ONE block."},18:{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦷","Stop 🛑"],correctSequence:["Turn Right ➡️","Move Forward ⬆️"],description:"Turn first, then move forward — 2 steps to reach the goal!"},19:{blocks:["Turn Left ⬅️","Move Forward ⬆️","Grab Item 🦷","Jump 🦸"],correctSequence:["Turn Left ⬅️","Move Forward ⬆️"],description:"Turn LEFT, then walk forward — build the 2-step path!"},20:{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦷","Turn Left ⬅️"],correctSequence:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦷"],description:"Move, then turn right, then grab — 3 steps in order!"},21:{blocks:["Jump 🦸","Turn Left ⬅️","Move Forward ⬆️","Drop Item 📦"],correctSequence:["Turn Left ⬅️","Move Forward ⬆️","Drop Item 📦"],description:"Turn left, then walk forward, then drop the package — 3 steps!"},22:{blocks:["Open Door 🚪","Move Forward ⬆️","Grab Item 🦷","Return Home 🏠"],correctSequence:["Open Door 🚪","Move Forward ⬆️","Grab Item 🦷","Return Home 🏠"],description:"Full mission: Open door, move, grab item, return home — 4 steps!"},23:{blocks:["Move Forward ⬆️","Grab Item 🦷","Turn Right ➡️","Jump 🦸","Stop 🛑"],correctSequence:["Move Forward ⬆️","Grab Item 🦷"],description:"Only use what you need! 2 blocks — no extra steps please."},24:{blocks:["Turn Right ➡️","Move Forward ⬆️","Grab Item 🦷","Return Home 🏠"],correctSequence:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦷"],description:"Organize the blocks: Move first, then turn, then grab the item."},25:{blocks:["Return Home 🏠","Stop 🛑","Turn Left ⬅️"],correctSequence:["Return Home 🏠"],description:"Robo finished the task! Add the RETURN HOME block to complete."},26:{blocks:["Move Forward ⬆️","Turn Right ➡️","Turn Left ⬅️","Grab Item 🦷","Return Home 🏠"],correctSequence:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦷","Return Home 🏠"],description:"You know this mission! Complete the full 4-step sequence by yourself."},28:{blocks:["Turn Left ⬅️","Turn Right ➡️","Move Back ⬇️","Jump 🦸","Grab Item 🦷"],correctSequence:["Turn Left ⬅️","Move Back ⬇️","Grab Item 🦷"],description:"Usual path is blocked! Find a DIFFERENT route to get the item."},30:{blocks:["Power On ⚡","Move Forward ⬆️","Start Task 🎯"],correctSequence:["Power On ⚡","Start Task 🎯"],description:"Turn Robo on, then start the task — simple 2-step startup!"},60:{blocks:["Power On ⚡","Connect 📡","Open App 📱","Start Learning 🎓"],correctSequence:["Power On ⚡","Connect 📡","Open App 📱","Start Learning 🎓"],description:"Full 4-step startup sequence — Power On, Connect, Open App, Start Learning!"}},pe={31:{audioPromptText:"Tap the picture that shows a ROBOT",options:[{label:"Robot",emoji:"🤖",correct:!0},{label:"Apple",emoji:"🍎",correct:!1},{label:"Ball",emoji:"⚽",correct:!1}]},32:{audioPromptText:"Which picture shows something that MOVES?",options:[{label:"Car",emoji:"🚗",correct:!0},{label:"Book",emoji:"📚",correct:!1},{label:"Chair",emoji:"🪑",correct:!1}]},33:{audioPromptText:"What is this technology item called?",options:[{label:"Tablet",emoji:"📱",correct:!0},{label:"Pencil",emoji:"✏️",correct:!1},{label:"Hat",emoji:"🎩",correct:!1}]},34:{audioPromptText:"Which tool should Robo use to GRAB the item?",options:[{label:"Robot Arm",emoji:"🦷",correct:!0},{label:"Umbrella",emoji:"☂️",correct:!1},{label:"Clock",emoji:"🕐",correct:!1}]},35:{audioPromptText:"Tap what has WHEELS and can CARRY things",options:[{label:"Truck",emoji:"🚛",correct:!0},{label:"Balloon",emoji:"🎈",correct:!1},{label:"Flower",emoji:"🌸",correct:!1}]},36:{audioPromptText:"Teacher says: Open the learning APP. Tap the correct one!",options:[{label:"App Icon",emoji:"📲",correct:!0},{label:"Speaker",emoji:"🔊",correct:!1},{label:"Battery",emoji:"🔋",correct:!1}]},37:{audioPromptText:"Which icon means SAVE your work?",options:[{label:"Save Disk",emoji:"💾",correct:!0},{label:"Delete",emoji:"❌",correct:!1},{label:"Print",emoji:"🖨️",correct:!1}]},38:{audioPromptText:"Which part helps Robo MOVE FORWARD?",options:[{label:"Gear/Motor",emoji:"⚙️",correct:!0},{label:"Camera",emoji:"📷",correct:!1},{label:"Microphone",emoji:"🎤",correct:!1}]},39:{audioPromptText:'Which symbol means "I NEED HELP please!"?',options:[{label:"Help Hand",emoji:"🙋",correct:!0},{label:"Stop Sign",emoji:"🛑",correct:!1},{label:"Music Note",emoji:"🎵",correct:!1}]},40:{audioPromptText:"Tap the picture that shows YOUR ANSWER to the team",options:[{label:"Thumbs Up",emoji:"👍",correct:!0},{label:"Question Mark",emoji:"❓",correct:!1},{label:"Sleeping",emoji:"😴",correct:!1}]},58:{audioPromptText:"Which icon opens the ROBOT CODING activity?",options:[{label:"Code Robot",emoji:"🤖",correct:!0},{label:"Music",emoji:"🎵",correct:!1},{label:"Food",emoji:"🍕",correct:!1}]}};class Ie{constructor(){this.client=new ge}async generateActivity(e){const i=Math.max(1,Math.min(60,e)),o=U[i-1],a=ue[i],r=pe[i];let s="";o.type==="robot_mission"&&a?s=`
This is a robot coding question. Available blocks: [${a.blocks.join(", ")}]. Correct sequence: [${a.correctSequence.join(" → ")}]. Context: ${a.description}`:o.type==="picture_match"&&r&&(s=`
This is a picture-matching/audio question. Audio prompt: "${r.audioPromptText}". Use these options: ${JSON.stringify(r.options)}`);const g=`You are generating Question #${o.slot} of 60 for the Cognix SEN Placement Assessment (aged 6-12).
Baseline: "${o.baselinePrompt}" (Domain: ${o.domain}, Sub-skill: ${o.subSkill}, Difficulty: ${o.difficulty}/3, Type: ${o.type}).${s}

CRITICAL REQUIREMENTS:
- Generate a child-friendly, engaging variation.
- MUST HAVE EXACTLY 3 ANSWER CHOICES (Option A, Option B, Option C) with text labels and emojis.
- 1 choice MUST be fully correct, 2 choices MUST be plausible wrong distractors.
- Keep language simple, positive, encouraging.

Return ONLY valid JSON with no markdown:
{
  "title": "${o.title}",
  "instructions": "Child-friendly question prompt",
  "type": "${o.type}",
  "hintText": "Encouraging hint",
  "payload": {
    "options": [
      { "label": "Choice A Label", "emoji": "🟢", "correct": true },
      { "label": "Choice B Label", "emoji": "🔴", "correct": false },
      { "label": "Choice C Label", "emoji": "🟡", "correct": false }
    ],
    "correctIndex": 0
  }
}`;try{const d=await this.client.generateCompletion(g);if(d){let p=d.trim();p.startsWith("```json")?p=p.replace(/^```json/,"").replace(/```$/,"").trim():p.startsWith("```")&&(p=p.replace(/^```/,"").replace(/```$/,"").trim());const h=p.lastIndexOf("}");h!==-1&&(p=p.substring(0,h+1));const m=JSON.parse(p);if(m.instructions&&m.payload)return m.type=o.type,o.type!=="robot_mission"&&(delete m.payload.availableBlocks,delete m.payload.correctSequence),Array.isArray(m.payload.options)&&m.payload.options.length>3&&(m.payload.options=m.payload.options.slice(0,3)),o.type==="robot_mission"&&a&&(m.payload.availableBlocks=a.blocks,(!m.payload.correctSequence||m.payload.correctSequence.length===0)&&(m.payload.correctSequence=a.correctSequence)),o.type==="picture_match"&&r&&!m.payload.audioPromptText&&(m.payload.audioPromptText=r.audioPromptText),o.type==="picture_match"&&r&&(!Array.isArray(m.payload.options)||m.payload.options.length===0)&&(m.payload.options=r.options),{id:`q_slot_${o.slot}_${Date.now()}_${Math.floor(Math.random()*1e3)}`,slot:o.slot,domain:o.domain,skill:o.skill,subSkill:o.subSkill,title:m.title||o.title,instructions:m.instructions,difficulty:o.difficulty,expectedTimeMs:9e4,maxPoints:o.maxPoints,type:o.type,payload:m.payload,hintText:m.hintText||"Take your time and think carefully!",source:"azure_openai"}}}catch{}return this.generateDynamicFallback(i)}generateDynamicFallback(e){const i=Math.max(1,Math.min(60,e)),o=U[i-1],a=`fallback_q_${i}_${Date.now()}_${Math.floor(Math.random()*1e3)}`;let r={},s=o.baselinePrompt,g="Look at all options carefully before picking.";if(o.type==="robot_mission"){const d=ue[i]||{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],correctSequence:["Move Forward ⬆️","Grab Item 🦾"],description:"Build the correct sequence to complete the mission!"};s=d.description,r={availableBlocks:d.blocks,correctSequence:d.correctSequence,options:[{label:d.correctSequence.join(" ➔ "),correct:!0},{label:[...d.blocks].reverse().slice(0,2).join(" ➔ "),correct:!1},{label:d.blocks.slice(0,Math.min(2,d.blocks.length)).reverse().join(" ➔ "),correct:!1}],correctIndex:0},g=`Hint: ${d.correctSequence.join(" → then ")}`}else if(o.type==="picture_match"){const d=pe[i];d?(r={...d},s=d.audioPromptText,g="Listen carefully and tap the right picture!"):(r={audioPromptText:o.baselinePrompt,options:[{label:"Robot",emoji:"🤖",correct:!0},{label:"Apple",emoji:"🍎",correct:!1},{label:"Ball",emoji:"⚽",correct:!1}],correctIndex:0},g="Tap the correct picture!")}else if(o.type==="motor_target")r={targetsCount:{51:4,52:3,54:5,56:3}[i]||3,options:[{label:"Hit target 🎯",correct:!0},{label:"Miss edge",correct:!1},{label:"Click outside",correct:!1}],correctIndex:0},g="Click directly inside the glowing circle!";else{const d=[{sequence:["🔵","🔴","🔵","🔴","❓"],options:[{label:"🔵 Blue",correct:!0},{label:"🟢 Green",correct:!1},{label:"🟡 Yellow",correct:!1}],hint:"Blue and Red take turns!"},{sequence:["⭐","⭐","🌙","⭐","⭐","❓"],options:[{label:"🌙 Moon",correct:!0},{label:"⭐ Star",correct:!1},{label:"☀️ Sun",correct:!1}],hint:"Every third shape is a moon!"},{sequence:["🔺","🔶","🔺","🔶","❓"],options:[{label:"🔺 Triangle",correct:!0},{label:"⬛ Square",correct:!1},{label:"🔵 Circle",correct:!1}],hint:"Triangle and Diamond take turns!"},{sequence:["1️⃣","2️⃣","3️⃣","4️⃣","❓"],options:[{label:"5️⃣ Five",correct:!0},{label:"6️⃣ Six",correct:!1},{label:"3️⃣ Three",correct:!1}],hint:"Numbers go up by 1 each time!"},{sequence:["🐶","🐱","🐶","🐱","❓"],options:[{label:"🐶 Dog",correct:!0},{label:"🐸 Frog",correct:!1},{label:"🐱 Cat",correct:!1}],hint:"Dog and Cat take turns!"}],p=[{options:[{label:"😌 Stay calm and keep trying",correct:!0},{label:"😤 Get upset and quit",correct:!1},{label:"🚪 Leave the room",correct:!1}],hint:"Choose the patient option!"},{options:[{label:"🙋 Raise my hand politely",correct:!0},{label:"😴 Give up quietly",correct:!1},{label:"🗣️ Call out loudly",correct:!1}],hint:"Polite asking is best!"},{options:[{label:"⏸️ Stop and listen to teacher",correct:!0},{label:"🏃 Keep going",correct:!1},{label:"😶 Ignore instruction",correct:!1}],hint:"Always stop when teacher says STOP!"}],h=[{options:[{label:"⬅️ Left Arrow key",correct:!0},{label:"⬆️ Up Arrow key",correct:!1},{label:"➡️ Right Arrow key",correct:!1}],hint:"Left arrow moves things left!"},{options:[{label:"🔄 Restart the device",correct:!0},{label:"📵 Throw tablet away",correct:!1},{label:"😴 Wait forever",correct:!1}],hint:"Restarting fixes most freezes!"},{options:[{label:"✅ Place in matching slot",correct:!0},{label:"❌ Drop it anywhere",correct:!1},{label:"🔄 Spin it around",correct:!1}],hint:"Match the shape to the correct slot!"}];if(o.domain==="cognitive_ability"){const m=d[(i-1)%d.length];r={sequence:m.sequence,options:m.options,correctIndex:0},g=m.hint}else if(o.domain==="behavioral_readiness"){const m=p[Math.max(0,i-41)%p.length];r={options:m.options,correctIndex:0},g=m.hint}else if(o.domain==="fine_motor_technology"){const m=h[Math.max(0,i-53)%h.length];r={options:m.options,correctIndex:0},g=m.hint}else r={options:[{label:"🌟 Correct Solution",correct:!0},{label:"❌ Incorrect Action A",correct:!1},{label:"🛑 Incorrect Action B",correct:!1}],correctIndex:0}}if(r.options&&Array.isArray(r.options)&&r.options.length===3){const d=r.options.find(h=>h.correct)||r.options[0],p=this.shuffleArray([...r.options]);r.options=p,r.correctIndex=p.indexOf(d)}return{id:a,slot:o.slot,domain:o.domain,skill:o.skill,subSkill:o.subSkill,title:o.title,instructions:s,difficulty:o.difficulty,expectedTimeMs:9e4,maxPoints:o.maxPoints,type:o.type,payload:r,hintText:g,source:"procedural"}}shuffleArray(e){const i=[...e];for(let o=i.length-1;o>0;o--){const a=Math.floor(Math.random()*(o+1));[i[o],i[a]]=[i[a],i[o]]}return i}}const ee={cognitive_ability:{name:"Cognitive Ability",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},functional_skills:{name:"Functional Abilities",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},communication_level:{name:"Communication Level",weight:.2,maxScore:20,questionCount:10,recommendedTimeMin:15},behavioral_readiness:{name:"Behavioral & Learning Readiness",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:15},fine_motor_technology:{name:"Fine Motor & Technology Skills",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:20}};class oe{static calculateItemScore(e,i=2){if(!e.is_correct&&e.accuracy_score===0)return 0;const o=Math.max(0,Math.min(1,e.accuracy_score)),a=e.expected_time_ms||9e4,r=Math.max(0,(e.response_time_ms-a)/Math.max(1e3,a)),s=Math.max(.7,1-.1*r),g=Math.max(.5,1-.15*e.hints_used),d=Math.max(.6,1-.1*Math.max(0,e.attempts_count-1)),p=i*o*s*g*d;return Math.max(0,Math.min(i,Math.round(p*10)/10))}static calculateDomainScores(e,i){const o=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],a={};for(const r of o){const s=ee[r],g=e.filter(f=>f.domain===r);if(g.length===0){a[r]={domain:r,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:0,efficiency_index:0,earned_score:0,skills_breakdown:{}};continue}let d=0,p=0;const h={};for(const f of g){const l=(i==null?void 0:i[f.item_id])??2,u=this.calculateItemScore(f,l);d+=u,p+=f.accuracy_score,h[f.skill]||(h[f.skill]={totalEarnedRatio:0,count:0}),h[f.skill].totalEarnedRatio+=u/Math.max(.1,l),h[f.skill].count+=1}const m=g.length,x=p/m*100,c=Math.min(s.maxScore,Math.round(d*10)/10),w={};for(const[f,l]of Object.entries(h))w[f]=Math.round(l.totalEarnedRatio/l.count*100);a[r]={domain:r,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:Math.round(x),efficiency_index:Math.round(c/s.maxScore*100)/100,earned_score:c,skills_breakdown:w}}return a}static calculateTotalScore(e){let i=0;for(const o of Object.values(e))i+=o.earned_score;return Math.min(100,Math.round(i*10)/10)}}class Ce{static evaluatePlacement(e,i,o){var z,D,b,C,B;let a="Explorer";e>=90?a="Innovator":e>=75?a="Creator":e>=60?a="Builder":a="Explorer";const r=[];(((z=i.cognitive_ability)==null?void 0:z.earned_score)||0)<10&&r.push({id:"FLAG_COGNITIVE_DEFICIENCY",type:"critical",title:"Cognitive Foundation Support",description:"Student demonstrated difficulty in pattern recognition and logical reasoning. Targeted logic puzzles recommended before advancing."}),(((D=i.functional_skills)==null?void 0:D.earned_score)||0)<10&&r.push({id:"FLAG_FUNCTIONAL_DEFICIENCY",type:"critical",title:"Multi-Step Mission Support",description:"Student requires scaffolded instruction following and working memory exercises."}),(((b=i.communication_level)==null?void 0:b.earned_score)||0)<7&&r.push({id:"FLAG_COMMUNICATION_SUPPORT",type:"warning",title:"Verbal & Visual Comprehension Support",description:"Audio visual cues and simplified instructions recommended during missions."}),(((C=i.behavioral_readiness)==null?void 0:C.earned_score)||0)<5.25&&r.push({id:"FLAG_BEHAVIORAL_ADAPTABILITY",type:"warning",title:"Error Recovery & Resilience Support",description:"Student showed hesitation or frustration during unexpected rule changes. Guided error-recovery feedback advised."}),(((B=i.fine_motor_technology)==null?void 0:B.earned_score)||0)<5.25&&r.push({id:"FLAG_FINE_MOTOR_SUPPORT",type:"info",title:"Digital Navigation Practice",description:"Drag-and-drop and target precision practice recommended for smooth touch/mouse control."});const m=r.some(q=>q.type==="critical");let x=a;m&&a!=="Explorer"&&(x=`${a} (with Targeted Support)`);let c=o.length||1,w=o.filter(q=>q.is_correct).length,f=o.reduce((q,N)=>q+N.hints_used,0),l=o.reduce((q,N)=>q+N.response_time_ms/Math.max(1e3,N.expected_time_ms),0)/c;const u=o.filter(q=>q.domain==="behavioral_readiness");let _=.75;if(u.length>0){const q=u.reduce((N,Y)=>N+Y.accuracy_score,0)/u.length;_=Math.round(q*100)/100}let $="Steady";if(o.length>=4){const q=Math.floor(o.length/2),N=o.slice(0,q).reduce((J,Z)=>J+Z.accuracy_score,0)/q,Y=o.slice(q).reduce((J,Z)=>J+Z.accuracy_score,0)/(o.length-q);Y-N>.15?$="High":Y<.4&&($="Needs Practice")}return{totalScore:e,baseTrack:a,recommendedTrack:x,flags:r,requiresSupport:m,performanceIndicators:{overallAccuracy:Math.round(w/c*100),avgResponseSpeedRatio:Math.round(l*100)/100,hintDependencyRatio:Math.round(f/c*100)/100,adaptabilityIndex:_,learningProgressVelocity:$}}}}class $e{constructor(){this.client=new ge}async generateReportSummary(e,i){var s;const o=Object.values(e.domain_scores||{}).map(g=>`${g.domain_name}: ${g.earned_score}/${g.max_score} (${Math.round(g.earned_score/g.max_score*100)}%)`).join(", "),a=`Analyze this student assessment telemetry and provide a detailed 4-paragraph diagnostic report:
Student Name: ${e.student_name}
Overall Score: ${i.totalScore}/100
Placed Level: ${i.recommendedTrack}
Accuracy: ${i.performanceIndicators.overallAccuracy}%
Adaptability Index: ${i.performanceIndicators.adaptabilityIndex}
Learning Velocity: ${i.performanceIndicators.learningProgressVelocity}
Domain Scores: ${o}
Timeouts Count: ${((s=e.question_time_records)==null?void 0:s.filter(g=>g==null?void 0:g.timedOut).length)||0}
Total Active Time: ${Math.round((e.total_active_duration_ms||0)/6e4)} mins
Flags: ${i.flags.map(g=>`${g.title}: ${g.description}`).join(" | ")||"None"}

Include:
1. Executive Diagnostic Summary
2. Domain-by-Domain Performance Analysis (mentioning specific weak/strong domains)
3. Behavioral & Motor Skills Observations (latency, timeouts, hesitation)
4. Specific SEN Accommodations & Action Plan for Educator/Parent.`,r=await this.client.generateCompletion(a,"You are an expert educational psychologist and SEN assessment specialist. Provide detailed, compassionate, highly specific diagnostic reports.");return r&&r.length>200?r:this.getBuiltInReport(e,i)}getBuiltInReport(e,i){const{totalScore:o,recommendedTrack:a,performanceIndicators:r,flags:s}=i,d=[...Object.values(e.domain_scores||{})].sort((u,_)=>{const $=u.max_score>0?u.earned_score/u.max_score:0;return(_.max_score>0?_.earned_score/_.max_score:0)-$}),p=d[0],h=d[d.length-1],m=p&&p.max_score>0?Math.round(p.earned_score/p.max_score*100):0,x=h&&h.max_score>0?Math.round(h.earned_score/h.max_score*100):0,c=e.question_time_records||[],w=c.filter(u=>u==null?void 0:u.timedOut).length,f=c.length>0?(c.reduce((u,_)=>u+((_==null?void 0:_.responseLatencyMs)||0),0)/c.length/1e3).toFixed(1):"0";let l=`### Executive Diagnostic Summary
`;return l+=`**${e.student_name}** has completed the 60-question Cognix SEN Assessment, achieving an overall **Readiness Score of ${o}/100**. Based on comprehensive telemetry, the student is placed into **${a}**.

`,l+=`### Domain-by-Domain Analysis
`,l+=`- **Primary Strength**: **${(p==null?void 0:p.domain_name)||"Cognitive Skills"}** (${m}% mastery). Demonstrates confident grasp of these core concepts.
`,l+=`- **Primary Growth Area**: **${(h==null?void 0:h.domain_name)||"Fine Motor"}** (${x}% mastery). Benefits from targeted support and scaffolded practice in this area.

`,l+=`### Behavioral & Cognitive Telemetry Observations
`,l+=`Across the 60 assessment items, average initial response latency was **${f} seconds**. `,w>0?l+=`The student experienced **${w} countdown timeouts**, suggesting potential processing fatigue or hesitation during multi-step tasks. `:l+="The student maintained active pacing with **0 timeouts**, showing sustained attention throughout the assessment. ",l+=`Adaptability Index recorded at **${r.adaptabilityIndex}** with a **${r.learningProgressVelocity}** velocity.

`,l+=`### Recommended Educational Accommodations & Action Plan
`,x<60?(l+=`1. **Scaffolded Learning**: Break complex multi-step instructions into single 1-step visual prompts.
`,l+=`2. **Sensory & Pace Support**: Allow 10-second processing buffers before prompting for responses.
`):l+=`1. **Accelerated Challenges**: Provide multi-step logic and independent coding challenges.
`,s.length>0?l+=`
> [!WARNING]
> **Identified Support Flags**: ${s.map(u=>u.title).join(" • ")}.`:l+=`
> [!TIP]
> **Exceptional Performance**: Student displayed balanced competence across all 5 evaluation domains.`,l}}var re={};(function k(e,i,o,a){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),s=typeof Path2D=="function"&&typeof DOMMatrix=="function",g=(function(){if(!e.OffscreenCanvas)return!1;try{var n=new OffscreenCanvas(1,1),t=n.getContext("2d");t.fillRect(0,0,1,1);var y=n.transferToImageBitmap();t.createPattern(y,"no-repeat")}catch{return!1}return!0})();function d(){}function p(n){var t=i.exports.Promise,y=t!==void 0?t:e.Promise;return typeof y=="function"?new y(n):(n(d,d),null)}var h=(function(n,t){return{transform:function(y){if(n)return y;if(t.has(y))return t.get(y);var S=new OffscreenCanvas(y.width,y.height),T=S.getContext("2d");return T.drawImage(y,0,0),t.set(y,S),S},clear:function(){t.clear()}}})(g,new Map),m=(function(){var n=Math.floor(16.666666666666668),t,y,S={},T=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(t=function(M){var A=Math.random();return S[A]=requestAnimationFrame(function v(P){T===P||T+n-1<P?(T=P,delete S[A],M()):S[A]=requestAnimationFrame(v)}),A},y=function(M){S[M]&&cancelAnimationFrame(S[M])}):(t=function(M){return setTimeout(M,n)},y=function(M){return clearTimeout(M)}),{frame:t,cancel:y}})(),x=(function(){var n,t,y={};function S(T){function M(A,v){T.postMessage({options:A||{},callback:v})}T.init=function(v){var P=v.transferControlToOffscreen();T.postMessage({canvas:P},[P])},T.fire=function(v,P,E){if(t)return M(v,null),t;var O=Math.random().toString(36).slice(2);return t=p(function(R){function L(j){j.data.callback===O&&(delete y[O],T.removeEventListener("message",L),t=null,h.clear(),E(),R())}T.addEventListener("message",L),M(v,O),y[O]=L.bind(null,{data:{callback:O}})}),t},T.reset=function(){T.postMessage({reset:!0});for(var v in y)y[v](),delete y[v]}}return function(){if(n)return n;if(!o&&r){var T=["var CONFETTI, SIZE = {}, module = {};","("+k.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{n=new Worker(URL.createObjectURL(new Blob([T])))}catch(M){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",M),null}S(n)}return n}})(),c={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function w(n,t){return t?t(n):n}function f(n){return n!=null}function l(n,t,y){return w(n&&f(n[t])?n[t]:c[t],y)}function u(n){return n<0?0:Math.floor(n)}function _(n,t){return Math.floor(Math.random()*(t-n))+n}function $(n){return parseInt(n,16)}function z(n){return n.map(D)}function D(n){var t=String(n).replace(/[^0-9a-f]/gi,"");return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:$(t.substring(0,2)),g:$(t.substring(2,4)),b:$(t.substring(4,6))}}function b(n){var t=l(n,"origin",Object);return t.x=l(t,"x",Number),t.y=l(t,"y",Number),t}function C(n){n.width=document.documentElement.clientWidth,n.height=document.documentElement.clientHeight}function B(n){var t=n.getBoundingClientRect();n.width=t.width,n.height=t.height}function q(n){var t=document.createElement("canvas");return t.style.position="fixed",t.style.top="0px",t.style.left="0px",t.style.pointerEvents="none",t.style.zIndex=n,t}function N(n,t,y,S,T,M,A,v,P){n.save(),n.translate(t,y),n.rotate(M),n.scale(S,T),n.arc(0,0,1,A,v,P),n.restore()}function Y(n){var t=n.angle*(Math.PI/180),y=n.spread*(Math.PI/180);return{x:n.x,y:n.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:n.startVelocity*.5+Math.random()*n.startVelocity,angle2D:-t+(.5*y-Math.random()*y),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:n.color,shape:n.shape,tick:0,totalTicks:n.ticks,decay:n.decay,drift:n.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:n.gravity*3,ovalScalar:.6,scalar:n.scalar,flat:n.flat}}function J(n,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var y=t.tick++/t.totalTicks,S=t.x+t.random*t.tiltCos,T=t.y+t.random*t.tiltSin,M=t.wobbleX+t.random*t.tiltCos,A=t.wobbleY+t.random*t.tiltSin;if(n.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-y)+")",n.beginPath(),s&&t.shape.type==="path"&&typeof t.shape.path=="string"&&Array.isArray(t.shape.matrix))n.fill(ye(t.shape.path,t.shape.matrix,t.x,t.y,Math.abs(M-S)*.1,Math.abs(A-T)*.1,Math.PI/10*t.wobble));else if(t.shape.type==="bitmap"){var v=Math.PI/10*t.wobble,P=Math.abs(M-S)*.1,E=Math.abs(A-T)*.1,O=t.shape.bitmap.width*t.scalar,R=t.shape.bitmap.height*t.scalar,L=new DOMMatrix([Math.cos(v)*P,Math.sin(v)*P,-Math.sin(v)*E,Math.cos(v)*E,t.x,t.y]);L.multiplySelf(new DOMMatrix(t.shape.matrix));var j=n.createPattern(h.transform(t.shape.bitmap),"no-repeat");j.setTransform(L),n.globalAlpha=1-y,n.fillStyle=j,n.fillRect(t.x-O/2,t.y-R/2,O,R),n.globalAlpha=1}else if(t.shape==="circle")n.ellipse?n.ellipse(t.x,t.y,Math.abs(M-S)*t.ovalScalar,Math.abs(A-T)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):N(n,t.x,t.y,Math.abs(M-S)*t.ovalScalar,Math.abs(A-T)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI);else if(t.shape==="star")for(var I=Math.PI/2*3,Q=4*t.scalar,G=8*t.scalar,W=t.x,V=t.y,K=5,H=Math.PI/K;K--;)W=t.x+Math.cos(I)*G,V=t.y+Math.sin(I)*G,n.lineTo(W,V),I+=H,W=t.x+Math.cos(I)*Q,V=t.y+Math.sin(I)*Q,n.lineTo(W,V),I+=H;else n.moveTo(Math.floor(t.x),Math.floor(t.y)),n.lineTo(Math.floor(t.wobbleX),Math.floor(T)),n.lineTo(Math.floor(M),Math.floor(A)),n.lineTo(Math.floor(S),Math.floor(t.wobbleY));return n.closePath(),n.fill(),t.tick<t.totalTicks}function Z(n,t,y,S,T){var M=t.slice(),A=n.getContext("2d"),v,P,E=p(function(O){function R(){v=P=null,A.clearRect(0,0,S.width,S.height),h.clear(),T(),O()}function L(){o&&!(S.width===a.width&&S.height===a.height)&&(S.width=n.width=a.width,S.height=n.height=a.height),!S.width&&!S.height&&(y(n),S.width=n.width,S.height=n.height),A.clearRect(0,0,S.width,S.height),M=M.filter(function(j){return J(A,j)}),M.length?v=m.frame(L):R()}v=m.frame(L),P=R});return{addFettis:function(O){return M=M.concat(O),E},canvas:n,promise:E,reset:function(){v&&m.cancel(v),P&&P()}}}function ae(n,t){var y=!n,S=!!l(t||{},"resize"),T=!1,M=l(t,"disableForReducedMotion",Boolean),A=r&&!!l(t||{},"useWorker"),v=A?x():null,P=y?C:B,E=n&&v?!!n.__confetti_initialized:!1,O=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,R;function L(I,Q,G){for(var W=l(I,"particleCount",u),V=l(I,"angle",Number),K=l(I,"spread",Number),H=l(I,"startVelocity",Number),Se=l(I,"decay",Number),ke=l(I,"gravity",Number),we=l(I,"drift",Number),le=l(I,"colors",z),_e=l(I,"ticks",Number),ce=l(I,"shapes"),Te=l(I,"scalar"),Me=!!l(I,"flat"),de=b(I),me=W,ie=[],Ae=n.width*de.x,Pe=n.height*de.y;me--;)ie.push(Y({x:Ae,y:Pe,angle:V,spread:K,startVelocity:H,color:le[me%le.length],shape:ce[_(0,ce.length)],ticks:_e,decay:Se,gravity:ke,drift:we,scalar:Te,flat:Me}));return R?R.addFettis(ie):(R=Z(n,ie,P,Q,G),R.promise)}function j(I){var Q=M||l(I,"disableForReducedMotion",Boolean),G=l(I,"zIndex",Number);if(Q&&O)return p(function(H){H()});y&&R?n=R.canvas:y&&!n&&(n=q(G),document.body.appendChild(n)),S&&!E&&P(n);var W={width:n.width,height:n.height};v&&!E&&v.init(n),E=!0,v&&(n.__confetti_initialized=!0);function V(){if(v){var H={getBoundingClientRect:function(){if(!y)return n.getBoundingClientRect()}};P(H),v.postMessage({resize:{width:H.width,height:H.height}});return}W.width=W.height=null}function K(){R=null,S&&(T=!1,e.removeEventListener("resize",V)),y&&n&&(document.body.contains(n)&&document.body.removeChild(n),n=null,E=!1)}return S&&!T&&(T=!0,e.addEventListener("resize",V,!1)),v?v.fire(I,W,K):L(I,W,K)}return j.reset=function(){v&&v.reset(),R&&R.reset()},j}var te;function se(){return te||(te=ae(null,{useWorker:!0,resize:!0})),te}function ye(n,t,y,S,T,M,A){var v=new Path2D(n),P=new Path2D;P.addPath(v,new DOMMatrix(t));var E=new Path2D;return E.addPath(P,new DOMMatrix([Math.cos(A)*T,Math.sin(A)*T,-Math.sin(A)*M,Math.cos(A)*M,y,S])),E}function ve(n){if(!s)throw new Error("path confetti are not supported in this browser");var t,y;typeof n=="string"?t=n:(t=n.path,y=n.matrix);var S=new Path2D(t),T=document.createElement("canvas"),M=T.getContext("2d");if(!y){for(var A=1e3,v=A,P=A,E=0,O=0,R,L,j=0;j<A;j+=2)for(var I=0;I<A;I+=2)M.isPointInPath(S,j,I,"nonzero")&&(v=Math.min(v,j),P=Math.min(P,I),E=Math.max(E,j),O=Math.max(O,I));R=E-v,L=O-P;var Q=10,G=Math.min(Q/R,Q/L);y=[G,0,0,G,-Math.round(R/2+v)*G,-Math.round(L/2+P)*G]}return{type:"path",path:t,matrix:y}}function xe(n){var t,y=1,S="#000000",T='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof n=="string"?t=n:(t=n.text,y="scalar"in n?n.scalar:y,T="fontFamily"in n?n.fontFamily:T,S="color"in n?n.color:S);var M=10*y,A=""+M+"px "+T,v=new OffscreenCanvas(M,M),P=v.getContext("2d");P.font=A;var E=P.measureText(t),O=Math.ceil(E.actualBoundingBoxRight+E.actualBoundingBoxLeft),R=Math.ceil(E.actualBoundingBoxAscent+E.actualBoundingBoxDescent),L=2,j=E.actualBoundingBoxLeft+L,I=E.actualBoundingBoxAscent+L;O+=L+L,R+=L+L,v=new OffscreenCanvas(O,R),P=v.getContext("2d"),P.font=A,P.fillStyle=S,P.fillText(t,j,I);var Q=1/y;return{type:"bitmap",bitmap:v.transferToImageBitmap(),matrix:[Q,0,0,Q,-O*Q/2,-R*Q/2]}}i.exports=function(){return se().apply(this,arguments)},i.exports.reset=function(){se().reset()},i.exports.create=ae,i.exports.shapeFromPath=ve,i.exports.shapeFromText=xe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),re,!1);const Ee=re.exports;re.exports.create;function fe(k,e,i){try{Ee({particleCount:100,spread:70,origin:{y:.6}})}catch{}const{totalScore:o,recommendedTrack:a,flags:r,performanceIndicators:s}=i;let g="";r.length>0&&(g=r.map(b=>`
      <div class="flag-alert ${b.type==="critical"?"critical":""}">
        <div style="font-size: 1.25rem;">⚠️</div>
        <div>
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${b.title}</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">${b.description}</p>
        </div>
      </div>
    `).join(""));const d=Object.values(e.domain_scores).map(b=>{const C=Math.round(b.earned_score/b.max_score*100);return`
      <div class="domain-progress-bar">
        <div class="bar-label">
          <span><strong>${b.domain_name}</strong> (${b.weight_pct}% Weight)</span>
          <span><strong>${b.earned_score}</strong> / ${b.max_score} Pts (${C}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${C}%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue));"></div>
        </div>
      </div>
    `}).join(""),p=e.question_time_records||[],h=p.map(b=>{if(!b)return"";const C=Math.round(b.activeDurationMs/1e3),B=b.responseLatencyMs?(b.responseLatencyMs/1e3).toFixed(1)+"s":"—",q=b.remainingTimeWhenAnsweredMs?Math.round(b.remainingTimeWhenAnsweredMs/1e3)+"s":"0s";let N='<span style="color:#10b981; font-weight:700;">🟢 Fast</span>';return b.timedOut?N='<span style="color:#ef4444; font-weight:700;">⏰ Timed Out</span>':C>80?N='<span style="color:#f59e0b; font-weight:700;">🔴 Slow</span>':C>45&&(N='<span style="color:#3b82f6; font-weight:700;">🟡 Normal</span>'),`
      <tr style="${b.timedOut?"background:rgba(239,68,68,0.08);":""} border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.85rem;">
        <td style="padding:0.6rem 0.8rem; font-weight:700; text-align:center;">Q${b.questionSlot}</td>
        <td style="padding:0.6rem 0.8rem;">
          <span style="font-size:0.75rem; background:rgba(6,182,212,0.15); color:var(--accent-cyan); padding:0.25rem 0.5rem; border-radius:6px;">
            ${b.domain.replace("_"," ")}
          </span>
        </td>
        <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary);">${b.subSkill}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${C}s</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${B}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${q}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${N}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${b.breaksDuringQuestion>0?`⏸️ ${b.breaksDuringQuestion}`:"0"}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center; font-weight:700;">${b.earnedScore} / ${b.maxScore}</td>
      </tr>
    `}).join(""),m=e.break_events||[];let x="";m.length>0?x=m.map(b=>{const C=Math.floor(b.breakDurationMs/6e4),B=Math.round(b.breakDurationMs%6e4/1e3),q=Math.round(b.countdownRemainingAtPause);return`
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); padding:0.75rem 1rem; border-radius:10px; margin-bottom:0.5rem; font-size:0.88rem;">
          <div>
            <strong>Break #${b.breakIndex}</strong> • During <strong>Q${b.questionSlotAtPause}</strong> (${b.domainAtPause.replace("_"," ")})
          </div>
          <div style="color:var(--accent-amber); font-weight:700;">
            Duration: ${C>0?`${C}m `:""}${B}s (Timer left: ${q}s)
          </div>
        </div>
      `}).join(""):x=`
      <div style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-emerald); color:var(--accent-emerald); padding:1rem; border-radius:10px; font-weight:600; text-align:center;">
        ✅ No breaks taken — Student completed all 60 questions continuously without pausing.
      </div>
    `;const c=Math.round((e.total_active_duration_ms||0)/6e4),w=Math.round((e.total_break_duration_ms||0)/6e4),f=Math.round((e.total_wall_clock_duration_ms||0)/6e4),l=p.filter(b=>b==null?void 0:b.timedOut).length;Re(e),k.innerHTML=`
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
          Student: <strong>${e.student_name}</strong> • Age Group: ${e.age_group} • 60 Items Assessed
        </p>
      </div>

      <div class="report-grid" style="grid-template-columns: 320px 1fr;">
        <!-- Placement & Gauge Card -->
        <div class="placement-badge-card">
          <div style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--text-secondary);">
            Technology Readiness Score
          </div>
          
          <div class="score-circle" style="--score-pct: ${o};">
            <span class="score-text">${o}</span>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-secondary);">Recommended Level & Track</div>
          <div class="track-title">${a}</div>

          <div style="margin-top: 1.5rem; width: 100%; border-top: 1px solid var(--border-color); padding-top: 1rem; text-align: left; font-size: 0.85rem; color: var(--text-secondary);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Accuracy:</span> <strong>${s.overallAccuracy}%</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Total Active Time:</span> <strong>${c} min</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Total Breaks Taken:</span> <strong>${e.total_breaks_count||0} (${w} min)</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Questions Timed Out:</span> <strong style="color:${l>0?"#ef4444":"inherit"};">${l} / 60</strong>
            </div>
          </div>
        </div>

        <!-- Domain Breakdown -->
        <div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-primary);">
            Competency Domain Performance (60 Questions)
          </h3>
          
          ${d}

          ${g}
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
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-cyan); margin-top:0.25rem;">${c} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Actual task engagement</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Pause / Break Time</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-amber); margin-top:0.25rem;">${w} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">${e.total_breaks_count||0} breaks recorded</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Wall Clock Duration</div>
            <div style="font-size:1.8rem; font-weight:800; color:#fff; margin-top:0.25rem;">${f} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Total session length</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">On-Task Focus Ratio</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-emerald); margin-top:0.25rem;">
              ${f>0?Math.round(c/f*100):100}%
            </div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Active vs total time</div>
          </div>
        </div>

        <!-- Section C: Break Log -->
        <div style="margin-bottom:2.5rem;">
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:1rem;">
            ⏸️ Break & Pause Log
          </h4>
          ${x}
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
                ${h}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Qualitative AI Summary -->
        <div style="margin-top: 2rem; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;" class="summary-md">
          ${e.qualitative_summary?De(e.qualitative_summary):""}
        </div>
      </div>

      <div style="margin-top: 2.5rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <button class="btn btn-primary" id="restart-btn" style="margin: 0 auto;">
          🔄 Retake Placement Assessment
        </button>
      </div>
    </div>
  `;const u=k.querySelector("#restart-btn");u&&u.addEventListener("click",()=>{window.location.reload()});const _=k.querySelector("#print-report-btn");_&&_.addEventListener("click",()=>window.print());const $=k.querySelector("#download-pdf-btn");$&&$.addEventListener("click",()=>Oe(e));const z=k.querySelector("#download-csv-btn");z&&z.addEventListener("click",()=>{Le(e)});const D=k.querySelector("#ceo-dashboard-btn");D&&D.addEventListener("click",()=>{be(k)})}function Re(k){try{const e=localStorage.getItem("cognix_all_sessions");let i=e?JSON.parse(e):[];i=i.filter(o=>o.session_id!==k.session_id),i.unshift(k),localStorage.setItem("cognix_all_sessions",JSON.stringify(i))}catch{}}function be(k){const e=localStorage.getItem("cognix_all_sessions"),i=e?JSON.parse(e):[];if(i.length===0){k.innerHTML=`
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
    `;const c=k.querySelector("#ceo-new-test-btn");c&&c.addEventListener("click",()=>window.location.reload());return}const o=i.length,a=Math.round(i.reduce((c,w)=>c+(w.total_score||0),0)/o),r=(i.reduce((c,w)=>c+(w.total_active_duration_ms||0)/6e4,0)/o).toFixed(1),s=i.filter(c=>Array.isArray(c.flags)&&c.flags.length>0).length,d=[{key:"cognitive_ability",name:"Cognitive Ability"},{key:"functional_skills",name:"Functional Skills"},{key:"communication_level",name:"Communication Level"},{key:"behavioral_readiness",name:"Behavioral Readiness"},{key:"fine_motor_technology",name:"Fine Motor & Tech"}].map(c=>{let w=0,f=0;i.forEach(u=>{if(u.domain_scores&&u.domain_scores[c.key]){const _=u.domain_scores[c.key];w+=_.earned_score,f+=_.max_score}});const l=f>0?Math.round(w/f*100):0;return{name:c.name,pct:l}});let p=i.map((c,w)=>{const f=Math.round((c.total_active_duration_ms||0)/6e4),l=Array.isArray(c.flags)?c.flags.length:0,u=c.start_time?new Date(c.start_time).toLocaleDateString():"Today";return`
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.88rem;">
        <td style="padding: 0.75rem 1rem; font-weight: 700;">#${w+1}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 700; color: #fff;">${c.student_name}</td>
        <td style="padding: 0.75rem 1rem; color: var(--text-secondary);">${c.age_group||"7-9"}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 800; color: var(--accent-cyan);">${c.total_score}/100</td>
        <td style="padding: 0.75rem 1rem;">
          <span style="background: rgba(59,130,246,0.15); border: 1px solid var(--accent-blue); color: var(--accent-blue); padding: 0.25rem 0.6rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem;">
            ${c.placed_track||c.recommended_track||"Level 1"}
          </span>
        </td>
        <td style="padding: 0.75rem 1rem; text-align: center;">${f}m</td>
        <td style="padding: 0.75rem 1rem; text-align: center;">
          ${l>0?`<span style="color:#ef4444; font-weight:700;">⚠️ ${l} Flag${l>1?"s":""}</span>`:'<span style="color:#10b981; font-weight:700;">✅ Clean</span>'}
        </td>
        <td style="padding: 0.75rem 1rem; color: var(--text-secondary); font-size: 0.8rem;">${u}</td>
        <td style="padding: 0.75rem 1rem; text-align: right;">
          <button class="btn btn-secondary view-session-btn" data-id="${c.session_id}" style="padding: 0.3rem 0.7rem; font-size: 0.78rem;">
            📄 Report
          </button>
        </td>
      </tr>
    `}).join("");k.innerHTML=`
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
          <div style="font-size: 2rem; font-weight: 800; color: #fff; margin-top: 0.25rem;">${o}</div>
          <div style="font-size: 0.75rem; color: var(--accent-emerald); margin-top: 0.25rem;">100% Completed</div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 14px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Average Overall Score</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-cyan); margin-top: 0.25rem;">${a}<span style="font-size:1.2rem;">/100</span></div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Across all 5 domains</div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 14px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Avg Assessment Pace</div>
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-blue); margin-top: 0.25rem;">${r}<span style="font-size:1.2rem;"> mins</span></div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Active duration per student</div>
        </div>

        <div style="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); padding: 1.25rem; border-radius: 14px;">
          <div style="font-size: 0.85rem; color: var(--text-secondary); font-weight: 600;">Support Alerts Flagged</div>
          <div style="font-size: 2rem; font-weight: 800; color: ${s>0?"#f59e0b":"#10b981"}; margin-top: 0.25rem;">${s}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.25rem;">Students requiring SEN scaffolding</div>
        </div>
      </div>

      <!-- Domain Mastery Averages Bar Chart -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 16px; margin-bottom: 2rem;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">
          📊 Domain Mastery Breakdown (All Students Average)
        </h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          ${d.map(c=>`
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.3rem;">
                <span>${c.name}</span>
                <span style="color: var(--accent-cyan);">${c.pct}% Average</span>
              </div>
              <div style="height: 10px; background: rgba(255,255,255,0.08); border-radius: 5px; overflow: hidden;">
                <div style="width: ${c.pct}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue)); border-radius: 5px;"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- All Students Master Table -->
      <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 1.5rem; border-radius: 16px;">
        <h3 style="font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 1rem;">
          📋 Completed Student Roster (${i.length} Records)
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
              ${p}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;const h=k.querySelector("#export-all-csv-btn");h&&h.addEventListener("click",()=>qe(i));const m=k.querySelector("#ceo-restart-btn");m&&m.addEventListener("click",()=>window.location.reload()),k.querySelectorAll(".view-session-btn").forEach(c=>{c.addEventListener("click",w=>{const l=w.currentTarget.getAttribute("data-id"),u=i.find(_=>_.session_id===l);if(u){const _={totalScore:u.total_score,placedTrack:u.placed_track||"Level 1",recommendedTrack:u.recommended_track||"Level 1",flags:Array.isArray(u.flags)?u.flags.map($=>typeof $=="string"?{title:$,description:"",type:"advisory"}:$):[],performanceIndicators:{overallAccuracy:u.total_score,adaptabilityIndex:.85,learningProgressVelocity:"Steady",hintDependencyRatio:.1}};fe(k,u,_)}})})}function qe(k){let e=`StudentName,AgeGroup,TotalScore,PlacedTrack,ActiveTimeMins,Timeouts,BreaksCount,FlagsCount,CompletedDate
`;k.forEach(r=>{var m,x;const s=((r.total_active_duration_ms||0)/6e4).toFixed(1),g=((m=r.question_time_records)==null?void 0:m.filter(c=>c==null?void 0:c.timedOut).length)||0,d=((x=r.break_events)==null?void 0:x.length)||0,p=Array.isArray(r.flags)?r.flags.length:0,h=r.start_time?new Date(r.start_time).toLocaleDateString():"Today";e+=`"${r.student_name.replace(/"/g,'""')}","${r.age_group||"7-9"}",${r.total_score},"${r.placed_track||r.recommended_track||"Level 1"}",${s},${g},${d},${p},"${h}"
`});const i=new Blob([e],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(i),a=document.createElement("a");a.setAttribute("href",o),a.setAttribute("download",`Cognix_CEO_Master_Analytics_${new Date().toISOString().split("T")[0]}.csv`),a.click()}function Oe(k){document.body.classList.add("printing-report");const e=document.createElement("style");e.id="cognix-print-style",e.innerHTML=`
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
  `,document.head.appendChild(e);const i=document.title;document.title=`Cognix_Report_${k.student_name.replace(/\s+/g,"_")}_${new Date().toISOString().split("T")[0]}`,window.print(),setTimeout(()=>{document.body.classList.remove("printing-report");const o=document.getElementById("cognix-print-style");o&&o.remove(),document.title=i},2e3)}function Le(k){const e=k.question_time_records||[];let i=`Slot,Domain,SubSkill,QuestionTitle,ActiveTimeSec,ResponseLatencySec,TimerRemainingSec,Status,TimedOut,Breaks,EarnedPoints,MaxPoints
`;e.forEach(s=>{if(!s)return;const g=(s.activeDurationMs/1e3).toFixed(1),d=s.responseLatencyMs?(s.responseLatencyMs/1e3).toFixed(1):"",p=s.remainingTimeWhenAnsweredMs?(s.remainingTimeWhenAnsweredMs/1e3).toFixed(1):"0",h=s.timedOut?"TIMED_OUT":s.activeDurationMs>8e4?"SLOW":s.activeDurationMs>45e3?"NORMAL":"FAST";i+=`${s.questionSlot},"${s.domain}","${s.subSkill}","${s.questionTitle.replace(/"/g,'""')}",${g},${d},${p},${h},${s.timedOut},${s.breaksDuringQuestion},${s.earnedScore},${s.maxScore}
`});const o=new Blob([i],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(o),r=document.createElement("a");r.setAttribute("href",a),r.setAttribute("download",`Cognix_CEO_Assessment_Time_Report_${k.student_name.replace(/\s+/g,"_")}.csv`),r.click()}function De(k){return k.replace(/^### (.*$)/gim,'<h3 style="color:var(--text-primary); font-size:1.05rem; margin-top:1rem; margin-bottom:0.4rem;">$1</h3>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/^> (.*$)/gim,'<blockquote style="border-left:3px solid var(--accent-cyan); padding-left:0.8rem; margin:0.8rem 0; color:var(--accent-cyan); font-size:0.9rem;">$1</blockquote>')}const F=class F{constructor(e){this.studentName="Alex Rivers",this.cachedActivities=new Array(60).fill(null),this.userAnswers=[],this.questionTimeRecords=[],this.breakEvents=[],this.currentQuestionIndex=0,this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.itemStartTimestamp=0,this.itemFirstInteractionTimestamp=null,this.currentPauseStartTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,this.isPaused=!1,this.globalTimerInterval=null,this.questionTimerInterval=null,this.loadGen=0,this.isLoadingNextQuestion=!1,this.motorTargetPos={top:80,left:240},this.beforeUnloadHandler=()=>{this.saveSession(this.studentName)},this.container=e,this.generator=new Ie,this.analyzer=new $e,this.initUserAnswers()}static getSavedSession(){try{const e=localStorage.getItem(F.STORAGE_KEY);if(!e)return null;const i=JSON.parse(e);return i&&Array.isArray(i.userAnswers)&&i.userAnswers.length===60?i:null}catch{return null}}static clearSavedSession(){try{localStorage.removeItem(F.STORAGE_KEY)}catch{}}saveSession(e=this.studentName){try{this.studentName=e;const i={studentName:e,currentQuestionIndex:this.currentQuestionIndex,totalTimerSeconds:this.totalTimerSeconds,currentQuestionRemainingSeconds:this.questionTimerSecondsRemaining,isPaused:this.isPaused,cachedActivities:this.cachedActivities,userAnswers:this.userAnswers,questionTimeRecords:this.questionTimeRecords,breakEvents:this.breakEvents,savedAt:Date.now()};localStorage.setItem(F.STORAGE_KEY,JSON.stringify(i))}catch{}}attachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler),window.addEventListener("beforeunload",this.beforeUnloadHandler)}detachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler)}initUserAnswers(){this.userAnswers=new Array(60).fill(null).map(()=>({selectedAnswerIndex:null,robotSequence:[],motorClicks:[],attemptsCount:0,hintsUsed:0,timeSpentMs:0,isSolved:!1,timedOut:!1,answeredAt:null,responseLatencyMs:null,remainingTimeWhenAnsweredMs:null,breaksDuringQuestion:0})),this.questionTimeRecords=[],this.breakEvents=[]}async startSession(e="Alex Rivers",i=!0){this.studentName=e;const o=i?F.getSavedSession():null;o?(this.currentQuestionIndex=Math.max(0,Math.min(59,o.currentQuestionIndex||0)),this.cachedActivities=o.cachedActivities||new Array(60).fill(null),this.userAnswers=o.userAnswers,this.questionTimeRecords=o.questionTimeRecords||[],this.breakEvents=o.breakEvents||[],this.totalTimerSeconds=o.totalTimerSeconds||0,this.questionTimerSecondsRemaining=o.currentQuestionRemainingSeconds||F.QUESTION_TIME_LIMIT_SEC,this.isPaused=o.isPaused||!1,this.startGlobalTimer(this.totalTimerSeconds),this.attachBeforeUnload(),this.isPaused?(await this.loadQuestion(this.currentQuestionIndex,!1),this.pauseAssessment()):await this.loadQuestion(this.currentQuestionIndex,!1)):(this.currentQuestionIndex=0,this.cachedActivities=new Array(60).fill(null),this.initUserAnswers(),this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.isPaused=!1,this.startGlobalTimer(0),this.attachBeforeUnload(),this.saveSession(e),await this.loadQuestion(0,!0))}startGlobalTimer(e=0){this.totalTimerSeconds=e,this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.globalTimerInterval=setInterval(()=>{if(!this.isPaused){this.totalTimerSeconds++,this.totalTimerSeconds%3===0&&this.saveSession(this.studentName);const i=document.getElementById("global-timer");if(i){const o=String(Math.floor(this.totalTimerSeconds/60)).padStart(2,"0"),a=String(this.totalTimerSeconds%60).padStart(2,"0");i.textContent=`${o}:${a}`}}},1e3)}speakAudio(e){try{if("speechSynthesis"in window){window.speechSynthesis.cancel();const i=new SpeechSynthesisUtterance(e);i.rate=.9,i.pitch=1,window.speechSynthesis.speak(i)}}catch{}}startQuestionTimer(){this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.questionTimerSecondsRemaining<=0&&(this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC),this.questionTimerInterval=setInterval(()=>{this.isPaused||(this.questionTimerSecondsRemaining--,this.updateQuestionTimerUI(),this.questionTimerSecondsRemaining<=0&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null,this.handleQuestionTimeout()))},1e3)}updateQuestionTimerUI(){const e=document.getElementById("question-timer-display"),i=document.getElementById("question-timer-ring");if(e){const o=Math.floor(this.questionTimerSecondsRemaining/60),a=String(this.questionTimerSecondsRemaining%60).padStart(2,"0");e.textContent=`${o}:${a}`,this.questionTimerSecondsRemaining<=15?e.style.color="#ef4444":e.style.color="var(--accent-cyan)"}if(i){const o=this.questionTimerSecondsRemaining/F.QUESTION_TIME_LIMIT_SEC*100;i.style.width=`${o}%`}}async loadQuestion(e,i=!0){var s;if(e<0||e>=60)return;this.motorTargetPos={top:80,left:240};const o=++this.loadGen;this.currentQuestionIndex=e;const a=U[e];if(this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),(i||this.questionTimerSecondsRemaining<=3)&&(this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC),this.itemFirstInteractionTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,!this.cachedActivities[e]&&(this.renderLoadingState(e),this.cachedActivities[e]=await this.generator.generateActivity(a.slot),o!==this.loadGen))return;this.isLoadingNextQuestion=!1;const r=this.cachedActivities[e];if(r&&(r.type=a.type,a.type!=="robot_mission"&&r.payload&&(delete r.payload.availableBlocks,delete r.payload.correctSequence),this.shuffleActivityOptions(r)),this.itemStartTimestamp=Date.now(),this.saveSession(this.studentName),this.render(),r&&r.type==="picture_match"){const g=((s=r.payload)==null?void 0:s.audioPromptText)||r.instructions;g&&this.speakAudio(g)}this.isPaused||this.startQuestionTimer(),this.prefetchNextQuestion(e+1)}shuffleActivityOptions(e){if(!e.payload||!Array.isArray(e.payload.options)||e.payload._shuffled||e.payload.options.length<2)return;const i=e.payload.options,o=i.find(r=>r.correct)||i[0],a=[...i];for(let r=a.length-1;r>0;r--){const s=Math.floor(Math.random()*(r+1));[a[r],a[s]]=[a[s],a[r]]}e.payload.options=a,e.payload.correctIndex=a.indexOf(o),e.payload._shuffled=!0}renderLoadingState(e){const i=U[e],o=ee[i.domain],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
        <div style="text-align: center; padding: 3rem 1rem; color: var(--accent-cyan);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.2s infinite ease-in-out;">⚡</div>
          <h3 style="font-size: 1.2rem; font-weight: 700;">Preparing Next Question...</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">${o.name} • ${i.subSkill}</p>
        </div>
      `)}async prefetchNextQuestion(e){if(e>=0&&e<60&&!this.cachedActivities[e]){const i=U[e];this.generator.generateActivity(i.slot).then(o=>{this.cachedActivities[e]=o}).catch(()=>{})}}pauseAssessment(){if(this.isPaused)return;this.isPaused=!0,this.currentPauseStartTimestamp=Date.now();const e=this.userAnswers[this.currentQuestionIndex];e&&e.breaksDuringQuestion++;const i=document.getElementById("pause-overlay");i&&(i.style.display="flex"),this.saveSession(this.studentName)}resumeAssessment(){if(!this.isPaused)return;const e=Date.now();if(this.currentPauseStartTimestamp){const o=e-this.currentPauseStartTimestamp;this.pauseDurationForCurrentQuestionMs+=o;const a=U[this.currentQuestionIndex];this.breakEvents.push({breakIndex:this.breakEvents.length+1,questionSlotAtPause:this.currentQuestionIndex+1,domainAtPause:a.domain,pauseStartTimestamp:this.currentPauseStartTimestamp,resumeTimestamp:e,breakDurationMs:o,countdownRemainingAtPause:this.questionTimerSecondsRemaining})}this.isPaused=!1,this.currentPauseStartTimestamp=null;const i=document.getElementById("pause-overlay");i&&(i.style.display="none"),this.startQuestionTimer(),this.saveSession(this.studentName)}handleQuestionTimeout(){this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC;const e=this.userAnswers[this.currentQuestionIndex];e&&(e.timedOut=!0,e.isSolved=!1),this.recordQuestionTimeData(!1),this.advanceToNextQuestion()}recordQuestionTimeData(e){const i=Date.now(),o=this.userAnswers[this.currentQuestionIndex],a=U[this.currentQuestionIndex],r=this.cachedActivities[this.currentQuestionIndex],s=i-this.itemStartTimestamp,g=Math.max(1e3,s-this.pauseDurationForCurrentQuestionMs);o.timeSpentMs+=g;const d={questionSlot:a.slot,domain:a.domain,subSkill:a.subSkill,questionTitle:(r==null?void 0:r.title)||a.title,questionStartTimestamp:this.itemStartTimestamp,questionEndTimestamp:i,totalDurationMs:s,pausedDurationMs:this.pauseDurationForCurrentQuestionMs,activeDurationMs:g,responseLatencyMs:o.responseLatencyMs,answeredAt:o.answeredAt,timedOut:o.timedOut,wasAnswered:e,remainingTimeWhenAnsweredMs:o.remainingTimeWhenAnsweredMs,breaksDuringQuestion:o.breaksDuringQuestion,earnedScore:0,maxScore:a.maxPoints};this.questionTimeRecords[this.currentQuestionIndex]=d}advanceToNextQuestion(){if(this.isLoadingNextQuestion=!0,this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.currentQuestionIndex<59){const e=U[this.currentQuestionIndex].domain,i=U[this.currentQuestionIndex+1].domain;e!==i?this.showDomainTransitionBanner(i,()=>{this.loadQuestion(this.currentQuestionIndex+1,!0)}):this.loadQuestion(this.currentQuestionIndex+1,!0)}else this.isLoadingNextQuestion=!1,this.completeAssessment()}showDomainTransitionBanner(e,i){const o=ee[e],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--accent-cyan); animation: fadeIn 0.4s ease;">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff;">Domain Completed!</h2>
          <p style="font-size: 1rem; color: var(--text-secondary); margin-top: 0.5rem; margin-bottom: 1.5rem;">
            Great job! Moving to <strong>${o.name}</strong> (${o.questionCount} Questions)...
          </p>
          <div style="display:inline-block; padding: 0.6rem 1.5rem; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue)); color: #fff; font-weight: 700; border-radius: 12px;">
            Starting Domain...
          </div>
        </div>
      `),setTimeout(i,2200)}render(){const e=this.cachedActivities[this.currentQuestionIndex];if(!e)return;const i=U[this.currentQuestionIndex],o=ee[i.domain],a=this.userAnswers[this.currentQuestionIndex],s=U[this.currentQuestionIndex].domain,g=U.filter(h=>h.domain===s),d=Array.from(new Set(g.map(h=>h.subSkill)));let p=`
      <div class="skill-ladder-bar" style="background: rgba(15,23,42,0.8); border: 1px solid var(--border-color); border-radius: 16px; padding: 1rem 1.25rem; margin-bottom: 1.25rem; backdrop-filter: blur(10px);">
        <div class="ladder-header" style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <span style="font-size:1.5rem; animation: bounce 2s infinite;">🐸</span>
            <div>
              <div style="font-weight:800; font-size:1rem; color:var(--accent-cyan);">
                Skill Ladder — ${o.name}
              </div>
              <div style="font-size:0.8rem; color:var(--text-secondary);">
                Active Skill: <strong style="color: #fff;">${i.subSkill}</strong>
              </div>
            </div>
          </div>
          <div style="font-size:0.85rem; font-weight:700; background:rgba(16,185,129,0.15); border:1px solid var(--accent-emerald); padding:0.35rem 0.85rem; border-radius:12px; color:var(--accent-emerald);">
            Progress: ${this.userAnswers.filter(h=>h.isSolved||h.timedOut).length} Completed
          </div>
        </div>

        <div class="skill-milestones-track" style="display:flex; align-items:center; gap:0.6rem; overflow-x:auto; padding:0.25rem 0; scrollbar-width:thin;">
    `;d.forEach((h,m)=>{const x=g.filter(_=>_.subSkill===h),c=i.subSkill===h,w=x.filter(_=>{const $=this.userAnswers[_.slot-1];return $&&($.isSolved||$.timedOut)}).length,f=w===x.length;let l=`${m+1}`,u="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); color: var(--text-secondary);";c?(l="🐸",u="background: linear-gradient(135deg, rgba(6,182,212,0.3), rgba(59,130,246,0.3)); border: 1px solid var(--accent-cyan); color: #fff; box-shadow: 0 0 12px rgba(6,182,212,0.3);"):f&&(l="⭐",u="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald);"),p+=`
        <div style="flex:1; min-width:135px; ${u} padding:0.5rem 0.75rem; border-radius:10px; display:flex; flex-direction:column; gap:0.3rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; font-weight:700;">
            <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:95px;" title="${h}">${h}</span>
            <span style="font-size:0.85rem;">${l}</span>
          </div>
          <div style="font-size:0.72rem; opacity:0.85; display:flex; justify-content:space-between;">
            <span>${w}/${x.length} Qs</span>
            ${f?'<span style="font-weight:700;">✓</span>':""}
          </div>
          <div style="height:4px; width:100%; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden;">
            <div style="width:${w/x.length*100}%; height:100%; background:${f?"var(--accent-emerald)":"var(--accent-cyan)"}; transition:width 0.3s ease;"></div>
          </div>
        </div>
      `}),p+="</div></div>",this.container.innerHTML=`
      ${p}

      <!-- Pause Overlay -->
      <div id="pause-overlay" style="display:${this.isPaused?"flex":"none"}; position:fixed; inset:0; background:rgba(11,15,25,0.92); backdrop-filter:blur(12px); z-index:300; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem;">
        <div style="font-size:4rem; margin-bottom:1rem; animation:bounce 1.5s infinite;">⏸️</div>
        <h2 style="font-size:2rem; font-weight:800; color:#fff; margin-bottom:0.5rem;">Assessment Paused</h2>
        <p style="color:var(--text-secondary); max-width:400px; margin-bottom:2rem; font-size:1rem;">
          Take a deep breath or a short sensory break! Your progress is safely saved.
        </p>
        <button id="resume-btn" class="btn btn-primary" style="font-size:1.1rem; padding:0.9rem 2.5rem;">
          ▶️ Resume Assessment
        </button>
      </div>

      <div class="glass-card activity-card">
        <div class="activity-header">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
              <span class="activity-domain-badge">${o.name}</span>
              <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); background:rgba(255,255,255,0.06); padding:0.25rem 0.6rem; border-radius:8px;">
                ${i.subSkill} • ${i.maxPoints} Pt${i.maxPoints>1?"s":""}
              </span>
              <span style="font-size:0.75rem; font-weight:700; background:${e.source==="azure_openai"?"rgba(139,92,246,0.2)":"rgba(245,158,11,0.2)"}; border:1px solid ${e.source==="azure_openai"?"#8b5cf6":"#f59e0b"}; color:${e.source==="azure_openai"?"#a78bfa":"#fbbf24"}; padding:0.2rem 0.6rem; border-radius:12px;" title="Engine Source">
                ${e.source==="azure_openai"?"🤖 Live Azure AI (o4-mini)":"⚡ Engine Fast-Track"}
              </span>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <!-- ⏱️ Per-question countdown timer -->
              <div style="display:flex; align-items:center; gap:0.5rem; background:rgba(15,23,42,0.8); border:1px solid var(--border-color); padding:0.4rem 0.9rem; border-radius:20px;">
                <span style="font-size:0.95rem;">⏱️</span>
                <span id="question-timer-display" style="font-family:monospace; font-size:1.1rem; font-weight:800; color:${this.questionTimerSecondsRemaining<=15?"#ef4444":"var(--accent-cyan)"};">
                  ${Math.floor(this.questionTimerSecondsRemaining/60)}:${String(this.questionTimerSecondsRemaining%60).padStart(2,"0")}
                </span>
                <div style="width:48px; height:5px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
                  <div id="question-timer-ring" style="width:${this.questionTimerSecondsRemaining/F.QUESTION_TIME_LIMIT_SEC*100}%; height:100%; background:${this.questionTimerSecondsRemaining<=15?"#ef4444":"var(--accent-cyan)"}; transition:width 0.9s linear;"></div>
                </div>
              </div>
              <!-- Pause Button -->
              <button id="pause-btn" class="btn btn-secondary" style="padding:0.4rem 0.85rem; font-size:0.85rem;" title="Pause Assessment">
                ⏸️ Pause
              </button>
            </div>
          </div>


          <h2 class="activity-title">${e.title}</h2>
          <p class="activity-instructions">${e.instructions}</p>
        </div>

        <div class="interactive-playground" id="playground-area">
          ${this.renderPlaygroundContent(e,a)}
        </div>

        <div class="activity-footer">
          <div class="nav-buttons-group" style="width:100%;">
            <button
              class="btn btn-primary"
              id="submit-answer-btn"
              ${this.isLoadingNextQuestion?"disabled":""}
              style="background: ${this.isLoadingNextQuestion?"rgba(100,116,139,0.5)":"linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))"}; font-weight:700; width:100%; font-size:1.1rem; padding:0.9rem 2rem; transition: all 0.3s ease;"
            >
              ${this.isLoadingNextQuestion?'<span style="display:flex;align-items:center;justify-content:center;gap:0.6rem;"><span style="width:16px;height:16px;border-radius:50%;border:2px solid rgba(255,255,255,0.4);border-top-color:#fff;animation:spin 0.8s linear infinite;"></span> Loading Next Question...</span>':"Confirm &amp; Next ➔"}
            </button>
          </div>
        </div>
      </div>
    `,this.attachEventListeners()}renderPlaygroundContent(e,i){const o=e.payload||{};if(e.type==="robot_mission")return`
        <div class="robot-mission-container">
          <div>
            <h4 style="margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-secondary);">Available Actions:</h4>
            <div class="blocks-palette">
              ${(o.availableBlocks||["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"]).map(p=>`
                <button class="code-block" data-block="${p}">+ ${p}</button>
              `).join("")}
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h4 style="font-size:0.9rem; color:var(--text-secondary); margin:0;">Sequence (${i.robotSequence.length} steps):</h4>
              ${i.robotSequence.length>0?`
                <button id="clear-sequence-btn" style="font-size:0.75rem; color:var(--accent-amber); background:rgba(245,158,11,0.1); border:1px solid var(--accent-amber); padding:0.25rem 0.6rem; border-radius:6px; cursor:pointer;">🗑️ Clear</button>
              `:""}
            </div>
            <div class="sequence-dropzone" id="sequence-box">
              ${i.robotSequence.length===0?'<span style="color:var(--text-secondary); font-size:0.85rem;">Click blocks on left to build sequence...</span>':i.robotSequence.map((p,h)=>`
                <div class="sequence-step" style="background:var(--accent-blue); padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                  <span>📌 ${h+1}. ${p}</span>
                  <button class="remove-block-btn" data-idx="${h}" style="background:rgba(0,0,0,0.25); border:none; color:#fff; width:20px; height:20px; border-radius:50%; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">×</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;if(e.type==="picture_match"){const d=o.audioPromptText||e.instructions||"Select the matching item",p=o.options&&o.options.length>0?o.options:[{label:"Option A",emoji:"🤖"},{label:"Option B",emoji:"🍎"},{label:"Option C",emoji:"⚽"}];return`
        <div style="margin-bottom: 1.25rem; font-size:1.1rem; color:var(--accent-cyan); font-weight:600; text-align:center; background:rgba(6,182,212,0.08); border:1px solid rgba(6,182,212,0.2); border-radius:12px; padding:0.75rem 1rem; display:flex; align-items:center; justify-content:center; gap:0.75rem; flex-wrap:wrap;">
          <span>🔊 "${d}"</span>
          <button id="listen-audio-btn" style="background:rgba(6,182,212,0.2); border:1px solid var(--accent-cyan); color:#fff; border-radius:8px; padding:0.35rem 0.85rem; font-size:0.85rem; cursor:pointer; font-weight:700; transition:all 0.2s;">
            🔊 Listen Again
          </button>
        </div>
        <div class="options-grid-3">
          ${p.slice(0,3).map((h,m)=>{const x=typeof h=="string"?h:h.label||`Option ${m+1}`,c=typeof h=="object"&&h.emoji?h.emoji:["🤖","🍎","⚽"][m]||"🎯";return`
              <button class="option-btn-3 ${i.selectedAnswerIndex===m?"selected":""}" data-opt="${m}">
                <span style="font-size: 2.2rem;">${c}</span>
                <span style="font-size: 0.95rem;">${x}</span>
              </button>
            `}).join("")}
        </div>
      `}if(e.type==="motor_target"){const d=o.targetsCount||3,p=i.motorClicks.length>=d;return`
        <div class="motor-canvas-container" id="motor-canvas">
          ${p?"":`<div class="motor-target" id="target-element" style="top: ${this.motorTargetPos.top}px; left: ${this.motorTargetPos.left}px;"></div>`}
          <div style="position:absolute; bottom:10px; left:15px; font-size:0.85rem; color:var(--text-secondary);">
            Targets Clicked: ${i.motorClicks.length} / ${d}
            ${p?" ✅ All targets hit!":""}
          </div>
        </div>
      `}let a=Array.isArray(o.sequence)?o.sequence:null,r=Array.isArray(o.grid)?o.grid:null;const s=e.slot;!a&&!r&&s&&(s===1?a=["🔵 Circle","🔴 Circle","🔵 Circle","🔴 Circle","❓"]:s===2?a=["🍎 Apple","🍎 Apple","🍌 Banana"]:s===3?a=["🔺 Triangle","🔷 Diamond","🔺 Triangle","🔷 Diamond","❓"]:s===4?a=["🐶 Dog","🐱 Cat","🦁 Lion"]:s===5?a=["🚗 Car","🚌 Bus","✈️ Airplane","🍎 Apple"]:s===6?a=["1️⃣","2️⃣","3️⃣","4️⃣","❓"]:s===7?a=["🌱 Seed","➡️","🌿 Sprout","➡️","🌸 Flower"]:s===8?a=["⭐ Star","⭐ Star","🌙 Moon","⭐ Star","⭐ Star","❓"]:s===9?r=[["🔺 Triangle","⬛ Square","🔴 Circle"],["⬛ Square","🔴 Circle","🔺 Triangle"],["🔴 Circle","🔺 Triangle","❓"]]:s===10?a=["🟢 Green","🟢 Green","🟡 Yellow","🟢 Green","🟢 Green","❓"]:s===11?r=[["⭕ Circle","⬛ Square","🔺 Triangle"],["⬛ Square","🔺 Triangle","⭕ Circle"],["🔺 Triangle","⭕ Circle","❓"]]:s===12?a=["☀️ Daytime ➔","🌙 Nighttime ➔","☀️ Daytime ➔","❓"]:s===13?a=["🌧️ Rain Outside ➔","❓ What do you bring?"]:s===14?a=["🔑 Key ➔","🚪 Door ➔","❓ What happens?"]:s===15&&(a=["🫗 Glass Dropped ➔","❓ What happens next?"]));let g=Array.isArray(o.options)&&o.options.length>0?o.options.slice(0,3):[{label:"Choice A"},{label:"Choice B"},{label:"Choice C"}];return g.some(d=>!d.label||d.label==="Option A"||d.label==="Option B")&&(s===7?g=[{label:"🌱 Seed ➔ 🌿 Sprout ➔ 🌸 Flower",emoji:"🌸",correct:!0},{label:"🌸 Flower ➔ 🌱 Seed ➔ 🌿 Sprout",emoji:"🌱",correct:!1},{label:"🌿 Sprout ➔ 🌸 Flower ➔ 🌱 Seed",emoji:"🌿",correct:!1}]:s===8?g=[{label:"🌙 Moon",emoji:"🌙",correct:!0},{label:"⭐ Star",emoji:"⭐",correct:!1},{label:"☀️ Sun",emoji:"☀️",correct:!1}]:s===9?g=[{label:"🟩 Green Square",emoji:"🟩",correct:!0},{label:"🔴 Red Circle",emoji:"🔴",correct:!1},{label:"🔷 Blue Triangle",emoji:"🔷",correct:!1}]:s===11?g=[{label:"⬛ Square",emoji:"⬛",correct:!0},{label:"⭕ Circle",emoji:"⭕",correct:!1},{label:"🔺 Triangle",emoji:"🔺",correct:!1}]:s===15&&(g=[{label:"💥 The glass shatters",emoji:"💥",correct:!0},{label:"🎈 It floats in the air",emoji:"🎈",correct:!1},{label:"🍎 It turns into an apple",emoji:"🍎",correct:!1}])),`
      ${r?`
        <div style="display:flex; justify-content:center; margin-bottom:1.5rem;">
          <div style="background: rgba(15,23,42,0.9); border: 2px solid var(--accent-cyan); padding: 1rem 1.5rem; border-radius: 16px; box-shadow: 0 0 20px rgba(6,182,212,0.2);">
            <div style="display:grid; grid-template-columns: repeat(${r[0].length}, 1fr); gap: 0.75rem; text-align: center;">
              ${r.map(d=>d.map(p=>`
                <div style="font-size: 1.5rem; background: rgba(255,255,255,0.06); padding: 0.75rem 1.25rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); color: ${p.includes("❓")?"var(--accent-cyan)":"#fff"}; font-weight: bold;">
                  ${p}
                </div>
              `).join("")).join("")}
            </div>
          </div>
        </div>
      `:""}

      ${a?`
        <div style="font-size: 1.8rem; display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); padding: 1rem 1.5rem; border-radius: 14px; justify-content: center; align-items: center; flex-wrap: wrap; text-align: center;">
          ${a.map(d=>`<span style="background:rgba(255,255,255,0.05); padding:0.4rem 0.8rem; border-radius:8px; color:${d.includes("❓")?"var(--accent-cyan)":"#fff"}">${d}</span>`).join("")}
        </div>
      `:""}

      <div class="options-grid-3">
        ${g.map((d,p)=>{const h=typeof d=="string"?d:d.label||d.text||JSON.stringify(d),m=typeof d=="object"&&d.emoji?d.emoji:"";return`
            <button class="option-btn-3 ${i.selectedAnswerIndex===p?"selected":""}" data-opt="${p}">
              ${m?`<span style="font-size: 2rem; display:block; margin-bottom:0.3rem;">${m}</span>`:""}
              <span style="font-size:1rem; font-weight:600;">${h}</span>
            </button>
          `}).join("")}
      </div>
    `}registerInteraction(){if(!this.itemFirstInteractionTimestamp){this.itemFirstInteractionTimestamp=Date.now();const e=this.userAnswers[this.currentQuestionIndex];e&&(e.responseLatencyMs=Math.max(100,this.itemFirstInteractionTimestamp-this.itemStartTimestamp-this.pauseDurationForCurrentQuestionMs))}}attachEventListeners(){const e=this.userAnswers[this.currentQuestionIndex];this.container.querySelectorAll(".option-btn-3").forEach(x=>{x.addEventListener("click",c=>{this.registerInteraction();const w=c.currentTarget,f=parseInt(w.getAttribute("data-opt")||"0",10);e.selectedAnswerIndex=f,e.isSolved=!0,e.answeredAt=Date.now(),e.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3,e.attemptsCount=Math.max(1,e.attemptsCount+1),this.render()})}),this.container.querySelectorAll(".code-block").forEach(x=>{x.addEventListener("click",c=>{this.registerInteraction();const f=c.currentTarget.getAttribute("data-block");f&&(e.robotSequence.push(f),e.isSolved=e.robotSequence.length>0,e.answeredAt=Date.now(),e.attemptsCount=Math.max(1,e.attemptsCount+1),this.render())})}),this.container.querySelectorAll(".remove-block-btn").forEach(x=>{x.addEventListener("click",c=>{c.stopPropagation();const w=c.currentTarget,f=parseInt(w.getAttribute("data-idx")||"0",10);e.robotSequence.splice(f,1),e.isSolved=e.robotSequence.length>0,this.render()})});const r=this.container.querySelector("#clear-sequence-btn");r&&r.addEventListener("click",()=>{e.robotSequence=[],e.isSolved=!1,this.render()});const s=this.container.querySelector("#listen-audio-btn");s&&s.addEventListener("click",()=>{var c;const x=this.cachedActivities[this.currentQuestionIndex];if(x){const w=((c=x.payload)==null?void 0:c.audioPromptText)||x.instructions||"Select the matching item";this.speakAudio(w)}});const g=this.container.querySelector("#target-element"),d=this.container.querySelector("#motor-canvas");g&&d&&g.addEventListener("click",x=>{var D,b;this.registerInteraction();const c=g.getBoundingClientRect(),w=x.clientX-c.left,f=x.clientY-c.top,l=Math.sqrt(Math.pow(w-c.width/2,2)+Math.pow(f-c.height/2,2));e.motorClicks.push({x:w,y:f,dist:l}),e.attemptsCount=Math.max(1,e.attemptsCount+1);const u=d.getBoundingClientRect(),_=Math.floor(Math.random()*(u.height-80))+10,$=Math.floor(Math.random()*(u.width-80))+10;this.motorTargetPos={top:_,left:$};const z=((b=(D=this.cachedActivities[this.currentQuestionIndex])==null?void 0:D.payload)==null?void 0:b.targetsCount)||3;e.motorClicks.length>=z&&(e.selectedAnswerIndex=0,e.isSolved=!0,e.answeredAt=Date.now(),e.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3),this.render()});const p=this.container.querySelector("#pause-btn");p&&p.addEventListener("click",()=>this.pauseAssessment());const h=this.container.querySelector("#resume-btn");h&&h.addEventListener("click",()=>this.resumeAssessment());const m=this.container.querySelector("#submit-answer-btn");m&&m.addEventListener("click",()=>{this.isLoadingNextQuestion||(this.recordQuestionTimeData(e.isSolved),this.advanceToNextQuestion())})}showCompletionLoadingScreen(){this.container.innerHTML=`
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:60vh; text-align:center; padding:3rem 1rem;">
        <div style="font-size:4rem; margin-bottom:1.5rem; animation:bounce 1.5s infinite;">🎉</div>
        <h2 style="font-size:2rem; font-weight:800; color:#fff; margin-bottom:0.75rem;">Assessment Complete!</h2>
        <p style="color:var(--text-secondary); font-size:1.05rem; margin-bottom:2rem; max-width:460px;">
          Amazing work! Your results are being compiled and your personalised AI report is being generated...
        </p>
        <div style="display:flex; align-items:center; gap:0.75rem; background:rgba(6,182,212,0.12); border:1px solid rgba(6,182,212,0.3); padding:1rem 2rem; border-radius:20px;">
          <div style="width:18px; height:18px; border-radius:50%; border:3px solid var(--accent-cyan); border-top-color:transparent; animation:spin 0.9s linear infinite;"></div>
          <span style="color:var(--accent-cyan); font-weight:700; font-size:1rem;">Generating Your Report...</span>
        </div>
      </div>
    `}async completeAssessment(){var x,c,w,f;this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.questionTimerInterval&&clearInterval(this.questionTimerInterval),this.detachBeforeUnload(),F.clearSavedSession(),this.showCompletionLoadingScreen();const e=[],i={};for(let l=0;l<60;l++){const u=this.cachedActivities[l],_=this.userAnswers[l],$=U[l];if(!u)continue;let z=!1,D=0;if(u.type==="robot_mission"||Array.isArray((x=u.payload)==null?void 0:x.availableBlocks)){const b=((c=u.payload)==null?void 0:c.correctSequence)||[];let C=0;_.robotSequence.forEach((B,q)=>{b[q]===B&&C++}),D=b.length>0?C/b.length:_.robotSequence.length>0?1:0,z=D>=.8}else u.type==="motor_target"?(z=_.motorClicks.length>0,D=Math.min(1,_.motorClicks.length/(((w=u.payload)==null?void 0:w.targetsCount)||3))):(z=_.selectedAnswerIndex===(((f=u.payload)==null?void 0:f.correctIndex)??0),D=z?1:0);i[u.id]=$.maxPoints,e.push({item_id:u.id,domain:u.domain,skill:u.skill,difficulty_level:u.difficulty,is_correct:z,accuracy_score:D,response_time_ms:Math.max(1e3,_.timeSpentMs),expected_time_ms:9e4,attempts_count:Math.max(1,_.attemptsCount),hints_used:_.hintsUsed}),this.questionTimeRecords[l]&&(this.questionTimeRecords[l].earnedScore=oe.calculateItemScore(e[l],$.maxPoints))}const o=oe.calculateDomainScores(e,i),a=oe.calculateTotalScore(o),r=Ce.evaluatePlacement(a,o,e),s=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],g={};s.forEach(l=>{const u=this.questionTimeRecords.filter(C=>C&&C.domain===l),_=u.reduce((C,B)=>C+(B.activeDurationMs||0),0),$=u.reduce((C,B)=>C+(B.pausedDurationMs||0),0),z=u.filter(C=>C.timedOut).length,D=u.map(C=>C.responseLatencyMs).filter(C=>C!==null),b=D.length>0?Math.round(D.reduce((C,B)=>C+B,0)/D.length):0;g[l]={totalActiveMs:_,totalPausedMs:$,questionsTimedOut:z,avgResponseLatencyMs:b}});const d=this.questionTimeRecords.reduce((l,u)=>l+((u==null?void 0:u.activeDurationMs)||0),0),p=this.breakEvents.reduce((l,u)=>l+u.breakDurationMs,0),h={session_id:`sess_60_${Date.now()}`,student_name:this.studentName||"Alex Rivers",age_group:"7-9",start_time:new Date(Date.now()-this.totalTimerSeconds*1e3).toISOString(),end_time:new Date().toISOString(),item_telemetries:e,domain_scores:o,total_score:a,placed_track:r.baseTrack,recommended_track:r.recommendedTrack,flags:r.flags.map(l=>l.id),question_time_records:this.questionTimeRecords,break_events:this.breakEvents,total_breaks_count:this.breakEvents.length,total_break_duration_ms:p,total_active_duration_ms:d,total_wall_clock_duration_ms:d+p,domain_time_summary:g},m=await this.analyzer.generateReportSummary(h,r);h.qualitative_summary=m,fe(this.container,h,r)}};F.STORAGE_KEY="cognix_active_assessment_session",F.QUESTION_TIME_LIMIT_SEC=90;let X=F,he=null;function ne(k="Alex Rivers",e=!0){const i=document.getElementById("app");i&&(he=new X(i),he.startSession(k,e))}function ze(){X.clearSavedSession()}function Fe(){const k=document.getElementById("app"),e=document.getElementById("childTestPage");k&&e&&(document.body.classList.add("exam-mode"),e.classList.remove("hidden"),e.classList.add("exam-active"),window.scrollTo(0,0),be(k))}window.initAssessment=ne;window.exitAssessment=ze;window.openCEODashboard=Fe;document.addEventListener("DOMContentLoaded",()=>{const k=document.getElementById("app"),e=document.getElementById("childTestPage"),i=X.getSavedSession();i&&e?(document.body.classList.add("exam-mode"),e.classList.remove("hidden"),e.classList.add("exam-active"),window.scrollTo(0,0),ne(i.studentName||"Alex Rivers",!0)):k&&!e&&ne("Alex Rivers",!1)});

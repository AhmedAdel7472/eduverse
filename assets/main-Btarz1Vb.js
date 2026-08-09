(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=i(a);fetch(a.href,n)}})();class fe{constructor(){this.endpoint="",this.apiKey="",this.model="o4-mini",this.endpoint="https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses";const e="NVFhTWxHZHd4Qzg1bnkzeVdLMG1GMHd2R2hMQnhFRUxkQkh2RkNhWkFSSVhiN2ZjNXpMR0pRUUo5OUNGQUNmaE1rNVhKM3czQUFBQUFDT0c4WFhP";try{this.apiKey=typeof atob=="function"?atob(e):e}catch{this.apiKey=e}}async generateCompletion(e,i="You are an expert AI Assessment System."){var n,s,g;if(!this.apiKey)return console.warn("[CognixAI] ❌ No API key configured — using fallback generator."),null;const o={model:this.model,input:`${i}

User Prompt: ${e}`},a=[this.endpoint,`https://corsproxy.io/?${encodeURIComponent(this.endpoint)}`];for(const l of a){const u=`req_${Date.now()}_${Math.floor(Math.random()*1e3)}`;console.group(`[CognixAI] 🔷 Azure OpenAI Request [${u}]`),console.log("📤 Endpoint:",l),console.log("📤 Model:",this.model),console.log("📤 Prompt (first 200 chars):",e.substring(0,200)+(e.length>200?"...":"")),console.log("📤 Full payload:",JSON.stringify(o,null,2));const m=performance.now();try{const p=new AbortController,b=setTimeout(()=>{console.warn(`[CognixAI] ⏰ Request [${u}] timed out after 10s`),p.abort()},1e4),d=await fetch(l,{method:"POST",headers:{"Content-Type":"application/json","api-key":this.apiKey},body:JSON.stringify(o),signal:p.signal});clearTimeout(b);const w=Math.round(performance.now()-m);if(console.log(`📥 Response Status: ${d.status} ${d.statusText} (${w}ms)`),d.ok){const f=await d.json();if(console.log("📥 Response Body:",JSON.stringify(f,null,2)),f.output&&Array.isArray(f.output)){for(const c of f.output)if(c.type==="message"&&Array.isArray(c.content)){for(const h of c.content)if(h.type==="output_text"&&h.text)return console.log("✅ Extracted text from output_text:",h.text.substring(0,100)),console.groupEnd(),h.text}}if((g=(s=(n=f.choices)==null?void 0:n[0])==null?void 0:s.message)!=null&&g.content)return console.log("✅ Extracted text from choices:",f.choices[0].message.content.substring(0,100)),console.groupEnd(),f.choices[0].message.content;console.warn("[CognixAI] ⚠️ Response OK but could not extract text from response body.")}else{const f=await d.text().catch(()=>"");console.error(`[CognixAI] ❌ HTTP Error ${d.status}:`,f)}}catch(p){const b=Math.round(performance.now()-m);(p==null?void 0:p.name)==="AbortError"?console.error(`[CognixAI] ❌ Request aborted (timeout) after ${b}ms`):console.error(`[CognixAI] ❌ Network/fetch error after ${b}ms:`,(p==null?void 0:p.message)||p)}console.log("[CognixAI] 🔄 Trying next endpoint or falling back..."),console.groupEnd()}return console.warn("[CognixAI] ⚠️ All endpoints failed — using procedural fallback generator."),null}}const G=[{slot:1,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Match Identical Shapes",baselinePrompt:"Match the identical shapes.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:2,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Spot the Difference",baselinePrompt:"Identify the object that is different.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:3,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Visual Discrimination",title:"Match the Pattern",baselinePrompt:"Match the same visual pattern.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:4,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Group Together",baselinePrompt:"Which objects belong together in the same group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:5,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Does Not Belong",baselinePrompt:"Which object does not belong in this group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:6,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Next in Sequence",baselinePrompt:"What comes next in the sequence?",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:7,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Order the Story",baselinePrompt:"Arrange the pictures in the correct logical order.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:8,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Complete Visual Pattern",baselinePrompt:"Complete the visual pattern.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:9,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Identify Missing Element",baselinePrompt:"Identify the missing element in the grid.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:10,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Continue Pattern",baselinePrompt:"Continue the pattern to the next step.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:11,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"Solve the Problem",baselinePrompt:"Which answer solves the logical problem?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:12,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"What Happens Next",baselinePrompt:"What should logically happen next?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:13,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Best Solution",baselinePrompt:"Select the best solution for this situation.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:14,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Sequence to Solve",baselinePrompt:"Identify the correct sequence of actions to solve the problem.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:15,domain:"cognitive_ability",skill:"cause_and_effect",subSkill:"Cause & Effect",title:"Predict Cause & Effect",baselinePrompt:"What will happen if this action is performed?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:16,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Follow Simple Instruction",baselinePrompt:"Follow a simple 1-step instruction.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:17,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Independent Instruction",baselinePrompt:"Complete a second independent 1-step action.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:18,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Two-Step Action",baselinePrompt:"Complete two actions in the correct order.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:19,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Direct Execution",baselinePrompt:"Complete the task smoothly without repeating steps.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:20,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Three-Step Activity",baselinePrompt:"Complete a 3-step structured activity.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:21,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Sequential Workflow",baselinePrompt:"Complete the activity in the exact correct sequence.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:22,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Finish Structured Task",baselinePrompt:"Start and finish the structured robotics task.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:23,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Minimal Prompt Task",baselinePrompt:"Complete the goal with minimal visual prompting.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:24,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Organize Tools",baselinePrompt:"Organize the programming blocks before beginning.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:25,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Return Materials",baselinePrompt:"Return all unused blocks to their correct place.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:26,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Independent Task",baselinePrompt:"Complete the familiar coding mission independently.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:27,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Ask for Help",baselinePrompt:"Identify when and how to request assistance appropriately.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:28,domain:"functional_skills",skill:"problem_solving",subSkill:"Functional Problem Solving",title:"Overcome Blockade",baselinePrompt:"Identify what to do when a path cannot be completed.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:29,domain:"functional_skills",skill:"attention",subSkill:"Learning Routine",title:"Learning Routine",baselinePrompt:"Follow the expected technology learning routine.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:30,domain:"functional_skills",skill:"task_completion",subSkill:"Functional Learning",title:"Practical Learning Task",baselinePrompt:"Complete a simple practical digital learning task.",maxPoints:1,difficulty:2,type:"robot_mission"},{slot:31,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Listen & Follow",baselinePrompt:"Follow a spoken audio instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:32,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Identify Object",baselinePrompt:"Identify the requested target object from audio prompt.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:33,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Name Component",baselinePrompt:"Select the correct name for the highlighted technology item.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:34,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Express Choice",baselinePrompt:"Communicate the correct preference or action needed.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:35,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Two-Step Audio",baselinePrompt:"Follow a 2-step audio communication instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:36,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Classroom Tech Instruction",baselinePrompt:"Follow a functional technology classroom command.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:37,domain:"communication_level",skill:"picture_matching",subSkill:"Identification",title:"Identify Digital Icon",baselinePrompt:"Identify the matching digital icon or symbol.",maxPoints:2,difficulty:1,type:"picture_match"},{slot:38,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Question Response",title:"Answer WH-Question",baselinePrompt:'Answer the question: "Which tool helps robots move?"',maxPoints:2,difficulty:3,type:"picture_match"},{slot:39,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Functional Communication",title:"Request Clarification",baselinePrompt:"Choose the symbol used to request help or clarification.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:40,domain:"communication_level",skill:"understanding_instructions",subSkill:"Problem Solving Communication",title:"Communicate Solution",baselinePrompt:"Communicate the correct solution choice to the team.",maxPoints:2,difficulty:3,type:"picture_match"},{slot:41,domain:"behavioral_readiness",skill:"persistence",subSkill:"Attention",title:"Sustain Attention",baselinePrompt:"Maintains focus when a puzzle takes longer to solve.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:42,domain:"behavioral_readiness",skill:"persistence",subSkill:"Task Engagement",title:"Remain Engaged",baselinePrompt:"Remains engaged in the learning activity despite distractions.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:43,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Instruction Following",title:"Responds to Signals",baselinePrompt:"Responds promptly when given a stop or transition instruction.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:44,domain:"behavioral_readiness",skill:"error_recovery",subSkill:"Response to Correction",title:"Accept Redirection",baselinePrompt:"Accepts gentle feedback and adjusts the approach calmly.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:45,domain:"behavioral_readiness",skill:"flexibility",subSkill:"Frustration Tolerance",title:"Persevere on Error",baselinePrompt:"Continues trying calmly after an initial error or bug.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:46,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Transition",title:"Smooth Transition",baselinePrompt:"Moves smoothly from one activity to the next when time is up.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:47,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Turn Taking / Waiting",title:"Wait Appropriately",baselinePrompt:"Waits patiently while another student or robot finishes their turn.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:48,domain:"behavioral_readiness",skill:"persistence",subSkill:"Motivation",title:"Eager to Learn",baselinePrompt:"Demonstrates willingness to try a new technology challenge.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:49,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Independence",title:"Independent Effort",baselinePrompt:"Attempts the problem independently before asking for help.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:50,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Help Seeking",title:"Polite Help Request",baselinePrompt:"Requests assistance politely and appropriately when stuck.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:51,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Fine Motor Control",title:"Object Precision",baselinePrompt:"Tap or manipulate small digital targets with precision.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:52,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Hand-Eye Coordination",title:"Accurate Movement",baselinePrompt:"Move pointer accurately to the target element.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:53,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Object Manipulation",title:"Assemble Structure",baselinePrompt:"Which set of steps correctly assembles Robo's body? Choose the right order.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:54,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Mouse/Trackpad",title:"Pointer Navigation",baselinePrompt:"Control pointer speed and target alignment.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:55,domain:"fine_motor_technology",skill:"keyboard_navigation",subSkill:"Keyboard Skills",title:"Key Identification",baselinePrompt:"Locate and press key directional arrows or spacebar.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:56,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Touchscreen",title:"Touch Target",baselinePrompt:"Select the highlighted item cleanly on screen.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:57,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Drag & Drop",title:"Drag Block to Slot",baselinePrompt:"Which image shows the correct way to place a block into its matching slot?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:58,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Digital Navigation",title:"Select App Icon",baselinePrompt:"Open or select the correct learning activity application.",maxPoints:1,difficulty:2,type:"picture_match"},{slot:59,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Tech Problem Solving",title:"Fix Screen Freeze",baselinePrompt:"Identify what button to click if a digital task freezes.",maxPoints:1,difficulty:3,type:"pattern_matrix"},{slot:60,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Technology Independence",title:"Independent Navigation",baselinePrompt:"Complete the basic technology startup sequence independently.",maxPoints:2,difficulty:3,type:"robot_mission"}],pe={16:{blocks:["Move Forward ⬆️","Turn Left ⬅️","Stop 🛑"],correctSequence:["Move Forward ⬆️"],description:"Robo needs to move forward ONCE to reach the star. Add just one block!"},17:{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],correctSequence:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],description:"Robo needs to find the shiny tooth! Walk forward, turn right to face the tooth, and grab it."},18:{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾","Stop 🛑"],correctSequence:["Turn Right ➡️","Move Forward ⬆️"],description:"Turn right first, then move forward — 2 steps to reach the goal!"},19:{blocks:["Turn Left ⬅️","Move Forward ⬆️","Grab Item 🦾","Jump 🦸"],correctSequence:["Turn Left ⬅️","Move Forward ⬆️"],description:"Turn LEFT first, then walk forward — build the 2-step path!"},20:{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾","Turn Left ⬅️"],correctSequence:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],description:"Move forward, turn right, then grab the gem — 3 steps in order!"},21:{blocks:["Jump 🦸","Turn Left ⬅️","Move Forward ⬆️","Drop Item 📦"],correctSequence:["Turn Left ⬅️","Move Forward ⬆️","Drop Item 📦"],description:"Turn left, walk forward, then drop the package — 3 steps!"},22:{blocks:["Open Door 🚪","Move Forward ⬆️","Grab Item 🦾","Return Home 🏠"],correctSequence:["Open Door 🚪","Move Forward ⬆️","Grab Item 🦾","Return Home 🏠"],description:"Full mission: Open door, move forward, grab item, return home — 4 steps!"},23:{blocks:["Move Forward ⬆️","Grab Item 🦾","Turn Right ➡️","Jump 🦸","Stop 🛑"],correctSequence:["Move Forward ⬆️","Grab Item 🦾"],description:"Only use what you need! 2 blocks — move forward and grab item."},24:{blocks:["Turn Right ➡️","Move Forward ⬆️","Grab Item 🦾","Return Home 🏠"],correctSequence:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],description:"Organize the blocks: Move forward first, turn right, then grab the item."},25:{blocks:["Return Home 🏠","Stop 🛑","Turn Left ⬅️"],correctSequence:["Return Home 🏠"],description:"Robo finished the task! Add the RETURN HOME block to complete."},26:{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾","Return Home 🏠"],correctSequence:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾","Return Home 🏠"],description:"Independent Mission: Walk forward, turn right to face the shiny treasure, grab it, and return home!"},28:{blocks:["Turn Right ➡️","Move Forward ⬆️","Turn Left ⬅️","Grab Item 🦾"],correctSequence:["Turn Right ➡️","Move Forward ⬆️","Turn Left ⬅️","Grab Item 🦾"],description:"Uh-oh! The usual straight path is blocked by a big rock! Turn right first, move forward around the rock, turn left, and grab the gem."},30:{blocks:["Power On ⚡","Move Forward ⬆️","Start Task 🎯"],correctSequence:["Power On ⚡","Start Task 🎯"],description:"Turn Robo on, then start the task — simple 2-step startup!"},60:{blocks:["Power On ⚡","Connect 📡","Open App 📱","Start Learning 🎓"],correctSequence:["Power On ⚡","Connect 📡","Open App 📱","Start Learning 🎓"],description:"Full 4-step startup sequence — Power On, Connect, Open App, Start Learning!"}},he={31:{audioPromptText:"Tap the picture that shows a ROBOT",options:[{label:"Robot",emoji:"🤖",correct:!0},{label:"Apple",emoji:"🍎",correct:!1},{label:"Ball",emoji:"⚽",correct:!1}]},32:{audioPromptText:"Which picture shows something that MOVES?",options:[{label:"Car",emoji:"🚗",correct:!0},{label:"Book",emoji:"📚",correct:!1},{label:"Chair",emoji:"🪑",correct:!1}]},33:{audioPromptText:"What is this technology item called?",options:[{label:"Tablet",emoji:"📱",correct:!0},{label:"Pencil",emoji:"✏️",correct:!1},{label:"Hat",emoji:"🎩",correct:!1}]},34:{audioPromptText:"Which tool should Robo use to GRAB the item?",options:[{label:"Robot Arm",emoji:"🦷",correct:!0},{label:"Umbrella",emoji:"☂️",correct:!1},{label:"Clock",emoji:"🕐",correct:!1}]},35:{audioPromptText:"Tap what has WHEELS and can CARRY things",options:[{label:"Truck",emoji:"🚛",correct:!0},{label:"Balloon",emoji:"🎈",correct:!1},{label:"Flower",emoji:"🌸",correct:!1}]},36:{audioPromptText:"Teacher says: Open the learning APP. Tap the correct one!",options:[{label:"App Icon",emoji:"📲",correct:!0},{label:"Speaker",emoji:"🔊",correct:!1},{label:"Battery",emoji:"🔋",correct:!1}]},37:{audioPromptText:"Which icon means SAVE your work?",options:[{label:"Save Disk",emoji:"💾",correct:!0},{label:"Delete",emoji:"❌",correct:!1},{label:"Print",emoji:"🖨️",correct:!1}]},38:{audioPromptText:"Which part helps Robo MOVE FORWARD?",options:[{label:"Gear/Motor",emoji:"⚙️",correct:!0},{label:"Camera",emoji:"📷",correct:!1},{label:"Microphone",emoji:"🎤",correct:!1}]},39:{audioPromptText:'Which symbol means "I NEED HELP please!"?',options:[{label:"Help Hand",emoji:"🙋",correct:!0},{label:"Stop Sign",emoji:"🛑",correct:!1},{label:"Music Note",emoji:"🎵",correct:!1}]},40:{audioPromptText:"Tap the picture that shows YOUR ANSWER to the team",options:[{label:"Thumbs Up",emoji:"👍",correct:!0},{label:"Question Mark",emoji:"❓",correct:!1},{label:"Sleeping",emoji:"😴",correct:!1}]},58:{audioPromptText:"Which icon opens the ROBOT CODING activity?",options:[{label:"Code Robot",emoji:"🤖",correct:!0},{label:"Music",emoji:"🎵",correct:!1},{label:"Food",emoji:"🍕",correct:!1}]}},oe={1:{instructions:"Look at the shape below. Which option matches it exactly?",sequence:["🔴 Red Circle"],options:[{label:"Red Circle",emoji:"🔴",correct:!0},{label:"Blue Square",emoji:"🟦",correct:!1},{label:"Yellow Triangle",emoji:"🟨",correct:!1}],hint:"Find the red circle!"},2:{instructions:"Look at the shapes. Which shape is different from the others?",sequence:["🔴 Red Circle","🔴 Red Circle","🟩 Green Square"],options:[{label:"Green Square",emoji:"🟩",correct:!0},{label:"Red Circle",emoji:"🔴",correct:!1},{label:"Blue Circle",emoji:"🔵",correct:!1}],hint:"Two are circles, one is a square!"},3:{instructions:"Look at the pattern: 🔺 🔷 🔺 🔷 ... What comes next?",sequence:["🔺 Triangle","🔷 Diamond","🔺 Triangle","🔷 Diamond","❓"],options:[{label:"Triangle",emoji:"🔺",correct:!0},{label:"Diamond",emoji:"🔷",correct:!1},{label:"Circle",emoji:"⭕",correct:!1}],hint:"Triangle and Diamond take turns!"},4:{instructions:"Which objects belong together in the same group?",sequence:["🐶 Dog","🐱 Cat","🦁 Lion"],options:[{label:"Animals Group",emoji:"🐶",correct:!0},{label:"Vehicle Group",emoji:"🚗",correct:!1},{label:"Fruit Group",emoji:"🍎",correct:!1}],hint:"Dog, Cat, and Lion are all animals!"},5:{instructions:"Which item does NOT belong in this vehicle group?",sequence:["🚗 Car","🚌 Bus","✈️ Airplane","🍎 Apple"],options:[{label:"Apple",emoji:"🍎",correct:!0},{label:"Car",emoji:"🚗",correct:!1},{label:"Airplane",emoji:"✈️",correct:!1}],hint:"Car, bus, and airplane are vehicles. Apple is food!"},6:{instructions:"Look at the number sequence: 1️⃣ ➔ 2️⃣ ➔ 3️⃣ ➔ 4️⃣ ... What comes next?",sequence:["1️⃣","2️⃣","3️⃣","4️⃣","❓"],options:[{label:"5️⃣ Five",emoji:"5️⃣",correct:!0},{label:"6️⃣ Six",emoji:"6️⃣",correct:!1},{label:"3️⃣ Three",emoji:"3️⃣",correct:!1}],hint:"Numbers count up: 1, 2, 3, 4, 5!"},7:{instructions:"Let's help the seed grow into a flower! Pick the correct order:",sequence:["🌱 Seed","➡️","🌿 Sprout","➡️","🌸 Flower"],options:[{label:"🌱 Seed ➔ 🌿 Sprout ➔ 🌸 Flower",emoji:"🌸",correct:!0},{label:"🌸 Flower ➔ 🌱 Seed ➔ 🌿 Sprout",emoji:"🌱",correct:!1},{label:"🌿 Sprout ➔ 🌸 Flower ➔ 🌱 Seed",emoji:"🌿",correct:!1}],hint:"Seed grows into sprout, then flower!"},8:{instructions:"Look at the visual pattern: ⭐ ⭐ 🌙 ⭐ ⭐ ... What comes next?",sequence:["⭐ Star","⭐ Star","🌙 Moon","⭐ Star","⭐ Star","❓"],options:[{label:"Moon",emoji:"🌙",correct:!0},{label:"Star",emoji:"⭐",correct:!1},{label:"Sun",emoji:"☀️",correct:!1}],hint:"Every third shape is a moon!"},9:{instructions:"Look at the shapes in the grid. Which shape finishes the last row?",grid:[["🔺 Triangle","⬛ Square","🔴 Circle"],["⬛ Square","🔴 Circle","🔺 Triangle"],["🔴 Circle","🔺 Triangle","❓"]],options:[{label:"Square",emoji:"⬛",correct:!0},{label:"Circle",emoji:"🔴",correct:!1},{label:"Triangle",emoji:"🔺",correct:!1}],hint:"Each row has a triangle, square, and circle!"},10:{instructions:"Look at the color pattern: 🟢 🟢 🟡 🟢 🟢 ... What comes next?",sequence:["🟢 Green","🟢 Green","🟡 Yellow","🟢 Green","🟢 Green","❓"],options:[{label:"Yellow",emoji:"🟡",correct:!0},{label:"Green",emoji:"🟢",correct:!1},{label:"Red",emoji:"🔴",correct:!1}],hint:"Two greens, then one yellow!"},11:{instructions:"Look at the shape matrix. Which shape completes the pattern?",grid:[["⭕ Circle","⬛ Square","🔺 Triangle"],["⬛ Square","🔺 Triangle","⭕ Circle"],["🔺 Triangle","⭕ Circle","❓"]],options:[{label:"Square",emoji:"⬛",correct:!0},{label:"Circle",emoji:"⭕",correct:!1},{label:"Triangle",emoji:"🔺",correct:!1}],hint:"Each row must contain circle, square, and triangle!"},12:{instructions:"Look at the day cycle: ☀️ Daytime ➔ 🌙 Nighttime ➔ ☀️ Daytime ... What comes next?",sequence:["☀️ Daytime ➔","🌙 Nighttime ➔","☀️ Daytime ➔","❓"],options:[{label:"Nighttime",emoji:"🌙",correct:!0},{label:"Daytime",emoji:"☀️",correct:!1},{label:"Rain",emoji:"🌧️",correct:!1}],hint:"Day comes after night, night comes after day!"},13:{instructions:"It is raining outside! What should you bring before going out?",sequence:["🌧️ Rain Outside ➔ ❓ What do you bring?"],options:[{label:"Umbrella",emoji:"☂️",correct:!0},{label:"Sunglasses",emoji:"🕶️",correct:!1},{label:"Ice Cream",emoji:"🍦",correct:!1}],hint:"Umbrella keeps you dry in the rain!"},14:{instructions:"You put a key into a locked door and turn it. What happens next?",sequence:["🔑 Key ➔ 🚪 Door ➔ ❓ What happens?"],options:[{label:"Door Unlocks",emoji:"🔓",correct:!0},{label:"Door Locks",emoji:"🔒",correct:!1},{label:"Lights Turn Off",emoji:"💡",correct:!1}],hint:"A key turns to unlock the door!"},15:{instructions:"What will happen if a glass cup is dropped on a hard tile floor?",sequence:["🫗 Glass Dropped ➔ ❓ What happens next?"],options:[{label:"Glass Shatters",emoji:"💥",correct:!0},{label:"Floats in Air",emoji:"🎈",correct:!1},{label:"Turns into Apple",emoji:"🍎",correct:!1}],hint:"Glass breaks when dropped!"}};class Ce{constructor(){this.client=new fe}async generateActivity(e){const i=Math.max(1,Math.min(60,e)),o=G[i-1],a=pe[i],n=he[i];let s="";o.type==="robot_mission"&&a?s=`
This is a robot coding question. Available blocks: [${a.blocks.join(", ")}]. Correct sequence: [${a.correctSequence.join(" → ")}]. Context: ${a.description}`:o.type==="picture_match"&&n&&(s=`
This is a picture-matching/audio question. Audio prompt: "${n.audioPromptText}". Use these options: ${JSON.stringify(n.options)}`);const g=`You are generating Question #${o.slot} of 60 for the Cognix SEN Placement Assessment (aged 6-12).
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
}`;try{const l=await this.client.generateCompletion(g);if(l){let u=l.trim();u.startsWith("```json")?u=u.replace(/^```json/,"").replace(/```$/,"").trim():u.startsWith("```")&&(u=u.replace(/^```/,"").replace(/```$/,"").trim());const m=u.lastIndexOf("}");m!==-1&&(u=u.substring(0,m+1));const p=JSON.parse(u);if(p.instructions&&p.payload){p.type=o.type,o.type!=="robot_mission"&&(delete p.payload.availableBlocks,delete p.payload.correctSequence);const b=oe[i];return b&&(!p.payload.sequence&&b.sequence&&(p.payload.sequence=b.sequence),!p.payload.grid&&b.grid&&(p.payload.grid=b.grid)),Array.isArray(p.payload.options)&&p.payload.options.length>3&&(p.payload.options=p.payload.options.slice(0,3)),o.type==="robot_mission"&&a&&(p.payload.availableBlocks=a.blocks,(!p.payload.correctSequence||p.payload.correctSequence.length===0)&&(p.payload.correctSequence=a.correctSequence)),o.type==="picture_match"&&n&&!p.payload.audioPromptText&&(p.payload.audioPromptText=n.audioPromptText),o.type==="picture_match"&&n&&(!Array.isArray(p.payload.options)||p.payload.options.length===0)&&(p.payload.options=n.options),{id:`q_slot_${o.slot}_${Date.now()}_${Math.floor(Math.random()*1e3)}`,slot:o.slot,domain:o.domain,skill:o.skill,subSkill:o.subSkill,title:p.title||o.title,instructions:p.instructions,difficulty:o.difficulty,expectedTimeMs:9e4,maxPoints:o.maxPoints,type:o.type,payload:p.payload,hintText:p.hintText||"Take your time and think carefully!",source:"azure_openai"}}}}catch{}return this.generateDynamicFallback(i)}generateDynamicFallback(e){const i=Math.max(1,Math.min(60,e)),o=G[i-1],a=`fallback_q_${i}_${Date.now()}_${Math.floor(Math.random()*1e3)}`;let n={},s=o.baselinePrompt,g="Look at all options carefully before picking.";if(o.type==="robot_mission"){const l=pe[i]||{blocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],correctSequence:["Move Forward ⬆️","Grab Item 🦾"],description:"Build the correct sequence to complete the mission!"};s=l.description,n={availableBlocks:l.blocks,correctSequence:l.correctSequence,options:[{label:l.correctSequence.join(" ➔ "),correct:!0},{label:[...l.blocks].reverse().slice(0,2).join(" ➔ "),correct:!1},{label:l.blocks.slice(0,Math.min(2,l.blocks.length)).reverse().join(" ➔ "),correct:!1}],correctIndex:0},g=`Hint: ${l.correctSequence.join(" → then ")}`}else if(o.type==="picture_match"){const l=he[i];l?(n={...l},s=l.audioPromptText,g="Listen carefully and tap the right picture!"):(n={audioPromptText:o.baselinePrompt,options:[{label:"Robot",emoji:"🤖",correct:!0},{label:"Apple",emoji:"🍎",correct:!1},{label:"Ball",emoji:"⚽",correct:!1}],correctIndex:0},g="Tap the correct picture!")}else if(o.type==="motor_target")n={targetsCount:{51:4,52:3,54:5,56:3}[i]||3,options:[{label:"Hit target 🎯",correct:!0},{label:"Miss edge",correct:!1},{label:"Click outside",correct:!1}],correctIndex:0},g="Click directly inside the glowing circle!";else if(oe[i]){const l=oe[i];s=l.instructions,n={sequence:l.sequence,grid:l.grid,options:[...l.options],correctIndex:0},g=l.hint}else{const l=[{options:[{label:"😌 Stay calm and keep trying",correct:!0},{label:"😤 Get upset and quit",correct:!1},{label:"🚪 Leave the room",correct:!1}],hint:"Choose the patient option!"},{options:[{label:"🙋 Raise my hand politely",correct:!0},{label:"😴 Give up quietly",correct:!1},{label:"🗣️ Call out loudly",correct:!1}],hint:"Polite asking is best!"},{options:[{label:"⏸️ Stop and listen to teacher",correct:!0},{label:"🏃 Keep going",correct:!1},{label:"😶 Ignore instruction",correct:!1}],hint:"Always stop when teacher says STOP!"}],u=[{options:[{label:"⬅️ Left Arrow key",correct:!0},{label:"⬆️ Up Arrow key",correct:!1},{label:"➡️ Right Arrow key",correct:!1}],hint:"Left arrow moves things left!"},{options:[{label:"🔄 Restart the device",correct:!0},{label:"📵 Throw tablet away",correct:!1},{label:"😴 Wait forever",correct:!1}],hint:"Restarting fixes most freezes!"},{options:[{label:"✅ Place in matching slot",correct:!0},{label:"❌ Drop it anywhere",correct:!1},{label:"🔄 Spin it around",correct:!1}],hint:"Match the shape to the correct slot!"}];if(o.domain==="behavioral_readiness"){const m=l[Math.max(0,i-41)%l.length];n={options:m.options,correctIndex:0},g=m.hint}else if(o.domain==="fine_motor_technology"){const m=u[Math.max(0,i-53)%u.length];n={options:m.options,correctIndex:0},g=m.hint}else n={options:[{label:"🌟 Correct Solution",correct:!0},{label:"❌ Incorrect Action A",correct:!1},{label:"🛑 Incorrect Action B",correct:!1}],correctIndex:0}}if(n.options&&Array.isArray(n.options)&&n.options.length===3){const l=n.options.find(m=>m.correct)||n.options[0],u=this.shuffleArray([...n.options]);n.options=u,n.correctIndex=u.indexOf(l)}return{id:a,slot:o.slot,domain:o.domain,skill:o.skill,subSkill:o.subSkill,title:o.title,instructions:s,difficulty:o.difficulty,expectedTimeMs:9e4,maxPoints:o.maxPoints,type:o.type,payload:n,hintText:g,source:"procedural"}}shuffleArray(e){const i=[...e];for(let o=i.length-1;o>0;o--){const a=Math.floor(Math.random()*(o+1));[i[o],i[a]]=[i[a],i[o]]}return i}}const ee={cognitive_ability:{name:"Cognitive Ability",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},functional_skills:{name:"Functional Abilities",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},communication_level:{name:"Communication Level",weight:.2,maxScore:20,questionCount:10,recommendedTimeMin:15},behavioral_readiness:{name:"Behavioral & Learning Readiness",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:15},fine_motor_technology:{name:"Fine Motor & Technology Skills",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:20}};class re{static calculateItemScore(e,i=2){if(!e.is_correct&&e.accuracy_score===0)return 0;const o=Math.max(0,Math.min(1,e.accuracy_score)),a=e.expected_time_ms||9e4,n=Math.max(0,(e.response_time_ms-a)/Math.max(1e3,a)),s=Math.max(.7,1-.1*n),g=Math.max(.5,1-.15*e.hints_used),l=Math.max(.6,1-.1*Math.max(0,e.attempts_count-1)),u=i*o*s*g*l;return Math.max(0,Math.min(i,Math.round(u*10)/10))}static calculateDomainScores(e,i){const o=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],a={};for(const n of o){const s=ee[n],g=e.filter(f=>f.domain===n);if(g.length===0){a[n]={domain:n,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:0,efficiency_index:0,earned_score:0,skills_breakdown:{}};continue}let l=0,u=0;const m={};for(const f of g){const c=(i==null?void 0:i[f.item_id])??2,h=this.calculateItemScore(f,c);l+=h,u+=f.accuracy_score,m[f.skill]||(m[f.skill]={totalEarnedRatio:0,count:0}),m[f.skill].totalEarnedRatio+=h/Math.max(.1,c),m[f.skill].count+=1}const p=g.length,b=u/p*100,d=Math.min(s.maxScore,Math.round(l*10)/10),w={};for(const[f,c]of Object.entries(m))w[f]=Math.round(c.totalEarnedRatio/c.count*100);a[n]={domain:n,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:Math.round(b),efficiency_index:Math.round(d/s.maxScore*100)/100,earned_score:d,skills_breakdown:w}}return a}static calculateTotalScore(e){let i=0;for(const o of Object.values(e))i+=o.earned_score;return Math.min(100,Math.round(i*10)/10)}}class Re{static evaluatePlacement(e,i,o){var D,j,y,C,B;let a="Explorer";e>=90?a="Innovator":e>=75?a="Creator":e>=60?a="Builder":a="Explorer";const n=[];(((D=i.cognitive_ability)==null?void 0:D.earned_score)||0)<10&&n.push({id:"FLAG_COGNITIVE_DEFICIENCY",type:"critical",title:"Cognitive Foundation Support",description:"Student demonstrated difficulty in pattern recognition and logical reasoning. Targeted logic puzzles recommended before advancing."}),(((j=i.functional_skills)==null?void 0:j.earned_score)||0)<10&&n.push({id:"FLAG_FUNCTIONAL_DEFICIENCY",type:"critical",title:"Multi-Step Mission Support",description:"Student requires scaffolded instruction following and working memory exercises."}),(((y=i.communication_level)==null?void 0:y.earned_score)||0)<7&&n.push({id:"FLAG_COMMUNICATION_SUPPORT",type:"warning",title:"Verbal & Visual Comprehension Support",description:"Audio visual cues and simplified instructions recommended during missions."}),(((C=i.behavioral_readiness)==null?void 0:C.earned_score)||0)<5.25&&n.push({id:"FLAG_BEHAVIORAL_ADAPTABILITY",type:"warning",title:"Error Recovery & Resilience Support",description:"Student showed hesitation or frustration during unexpected rule changes. Guided error-recovery feedback advised."}),(((B=i.fine_motor_technology)==null?void 0:B.earned_score)||0)<5.25&&n.push({id:"FLAG_FINE_MOTOR_SUPPORT",type:"info",title:"Digital Navigation Practice",description:"Drag-and-drop and target precision practice recommended for smooth touch/mouse control."});const p=n.some(E=>E.type==="critical");let b=a;p&&a!=="Explorer"&&(b=`${a} (with Targeted Support)`);let d=o.length||1,w=o.filter(E=>E.is_correct).length,f=o.reduce((E,N)=>E+N.hints_used,0),c=o.reduce((E,N)=>E+N.response_time_ms/Math.max(1e3,N.expected_time_ms),0)/d;const h=o.filter(E=>E.domain==="behavioral_readiness");let _=.75;if(h.length>0){const E=h.reduce((N,Y)=>N+Y.accuracy_score,0)/h.length;_=Math.round(E*100)/100}let R="Steady";if(o.length>=4){const E=Math.floor(o.length/2),N=o.slice(0,E).reduce((J,Z)=>J+Z.accuracy_score,0)/E,Y=o.slice(E).reduce((J,Z)=>J+Z.accuracy_score,0)/(o.length-E);Y-N>.15?R="High":Y<.4&&(R="Needs Practice")}return{totalScore:e,baseTrack:a,recommendedTrack:b,flags:n,requiresSupport:p,performanceIndicators:{overallAccuracy:Math.round(w/d*100),avgResponseSpeedRatio:Math.round(c*100)/100,hintDependencyRatio:Math.round(f/d*100)/100,adaptabilityIndex:_,learningProgressVelocity:R}}}}class $e{constructor(){this.client=new fe}async generateReportSummary(e,i){var s;const o=Object.values(e.domain_scores||{}).map(g=>`${g.domain_name}: ${g.earned_score}/${g.max_score} (${Math.round(g.earned_score/g.max_score*100)}%)`).join(", "),a=`Analyze this student assessment telemetry and provide a detailed 4-paragraph diagnostic report:
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
4. Specific SEN Accommodations & Action Plan for Educator/Parent.`,n=await this.client.generateCompletion(a,"You are an expert educational psychologist and SEN assessment specialist. Provide detailed, compassionate, highly specific diagnostic reports.");return n&&n.length>200?n:this.getBuiltInReport(e,i)}getBuiltInReport(e,i){const{totalScore:o,recommendedTrack:a,performanceIndicators:n,flags:s}=i,l=[...Object.values(e.domain_scores||{})].sort((h,_)=>{const R=h.max_score>0?h.earned_score/h.max_score:0;return(_.max_score>0?_.earned_score/_.max_score:0)-R}),u=l[0],m=l[l.length-1],p=u&&u.max_score>0?Math.round(u.earned_score/u.max_score*100):0,b=m&&m.max_score>0?Math.round(m.earned_score/m.max_score*100):0,d=e.question_time_records||[],w=d.filter(h=>h==null?void 0:h.timedOut).length,f=d.length>0?(d.reduce((h,_)=>h+((_==null?void 0:_.responseLatencyMs)||0),0)/d.length/1e3).toFixed(1):"0";let c=`### Executive Diagnostic Summary
`;return c+=`**${e.student_name}** has completed the 60-question Cognix SEN Assessment, achieving an overall **Readiness Score of ${o}/100**. Based on comprehensive telemetry, the student is placed into **${a}**.

`,c+=`### Domain-by-Domain Analysis
`,c+=`- **Primary Strength**: **${(u==null?void 0:u.domain_name)||"Cognitive Skills"}** (${p}% mastery). Demonstrates confident grasp of these core concepts.
`,c+=`- **Primary Growth Area**: **${(m==null?void 0:m.domain_name)||"Fine Motor"}** (${b}% mastery). Benefits from targeted support and scaffolded practice in this area.

`,c+=`### Behavioral & Cognitive Telemetry Observations
`,c+=`Across the 60 assessment items, average initial response latency was **${f} seconds**. `,w>0?c+=`The student experienced **${w} countdown timeouts**, suggesting potential processing fatigue or hesitation during multi-step tasks. `:c+="The student maintained active pacing with **0 timeouts**, showing sustained attention throughout the assessment. ",c+=`Adaptability Index recorded at **${n.adaptabilityIndex}** with a **${n.learningProgressVelocity}** velocity.

`,c+=`### Recommended Educational Accommodations & Action Plan
`,b<60?(c+=`1. **Scaffolded Learning**: Break complex multi-step instructions into single 1-step visual prompts.
`,c+=`2. **Sensory & Pace Support**: Allow 10-second processing buffers before prompting for responses.
`):c+=`1. **Accelerated Challenges**: Provide multi-step logic and independent coding challenges.
`,s.length>0?c+=`
> [!WARNING]
> **Identified Support Flags**: ${s.map(h=>h.title).join(" • ")}.`:c+=`
> [!TIP]
> **Exceptional Performance**: Student displayed balanced competence across all 5 evaluation domains.`,c}}var ae={};(function k(e,i,o,a){var n=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),s=typeof Path2D=="function"&&typeof DOMMatrix=="function",g=(function(){if(!e.OffscreenCanvas)return!1;try{var r=new OffscreenCanvas(1,1),t=r.getContext("2d");t.fillRect(0,0,1,1);var v=r.transferToImageBitmap();t.createPattern(v,"no-repeat")}catch{return!1}return!0})();function l(){}function u(r){var t=i.exports.Promise,v=t!==void 0?t:e.Promise;return typeof v=="function"?new v(r):(r(l,l),null)}var m=(function(r,t){return{transform:function(v){if(r)return v;if(t.has(v))return t.get(v);var S=new OffscreenCanvas(v.width,v.height),T=S.getContext("2d");return T.drawImage(v,0,0),t.set(v,S),S},clear:function(){t.clear()}}})(g,new Map),p=(function(){var r=Math.floor(16.666666666666668),t,v,S={},T=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(t=function(M){var A=Math.random();return S[A]=requestAnimationFrame(function x(P){T===P||T+r-1<P?(T=P,delete S[A],M()):S[A]=requestAnimationFrame(x)}),A},v=function(M){S[M]&&cancelAnimationFrame(S[M])}):(t=function(M){return setTimeout(M,r)},v=function(M){return clearTimeout(M)}),{frame:t,cancel:v}})(),b=(function(){var r,t,v={};function S(T){function M(A,x){T.postMessage({options:A||{},callback:x})}T.init=function(x){var P=x.transferControlToOffscreen();T.postMessage({canvas:P},[P])},T.fire=function(x,P,$){if(t)return M(x,null),t;var O=Math.random().toString(36).slice(2);return t=u(function(q){function L(z){z.data.callback===O&&(delete v[O],T.removeEventListener("message",L),t=null,m.clear(),$(),q())}T.addEventListener("message",L),M(x,O),v[O]=L.bind(null,{data:{callback:O}})}),t},T.reset=function(){T.postMessage({reset:!0});for(var x in v)v[x](),delete v[x]}}return function(){if(r)return r;if(!o&&n){var T=["var CONFETTI, SIZE = {}, module = {};","("+k.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{r=new Worker(URL.createObjectURL(new Blob([T])))}catch(M){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",M),null}S(r)}return r}})(),d={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function w(r,t){return t?t(r):r}function f(r){return r!=null}function c(r,t,v){return w(r&&f(r[t])?r[t]:d[t],v)}function h(r){return r<0?0:Math.floor(r)}function _(r,t){return Math.floor(Math.random()*(t-r))+r}function R(r){return parseInt(r,16)}function D(r){return r.map(j)}function j(r){var t=String(r).replace(/[^0-9a-f]/gi,"");return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:R(t.substring(0,2)),g:R(t.substring(2,4)),b:R(t.substring(4,6))}}function y(r){var t=c(r,"origin",Object);return t.x=c(t,"x",Number),t.y=c(t,"y",Number),t}function C(r){r.width=document.documentElement.clientWidth,r.height=document.documentElement.clientHeight}function B(r){var t=r.getBoundingClientRect();r.width=t.width,r.height=t.height}function E(r){var t=document.createElement("canvas");return t.style.position="fixed",t.style.top="0px",t.style.left="0px",t.style.pointerEvents="none",t.style.zIndex=r,t}function N(r,t,v,S,T,M,A,x,P){r.save(),r.translate(t,v),r.rotate(M),r.scale(S,T),r.arc(0,0,1,A,x,P),r.restore()}function Y(r){var t=r.angle*(Math.PI/180),v=r.spread*(Math.PI/180);return{x:r.x,y:r.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:r.startVelocity*.5+Math.random()*r.startVelocity,angle2D:-t+(.5*v-Math.random()*v),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:r.color,shape:r.shape,tick:0,totalTicks:r.ticks,decay:r.decay,drift:r.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:r.gravity*3,ovalScalar:.6,scalar:r.scalar,flat:r.flat}}function J(r,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var v=t.tick++/t.totalTicks,S=t.x+t.random*t.tiltCos,T=t.y+t.random*t.tiltSin,M=t.wobbleX+t.random*t.tiltCos,A=t.wobbleY+t.random*t.tiltSin;if(r.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-v)+")",r.beginPath(),s&&t.shape.type==="path"&&typeof t.shape.path=="string"&&Array.isArray(t.shape.matrix))r.fill(ve(t.shape.path,t.shape.matrix,t.x,t.y,Math.abs(M-S)*.1,Math.abs(A-T)*.1,Math.PI/10*t.wobble));else if(t.shape.type==="bitmap"){var x=Math.PI/10*t.wobble,P=Math.abs(M-S)*.1,$=Math.abs(A-T)*.1,O=t.shape.bitmap.width*t.scalar,q=t.shape.bitmap.height*t.scalar,L=new DOMMatrix([Math.cos(x)*P,Math.sin(x)*P,-Math.sin(x)*$,Math.cos(x)*$,t.x,t.y]);L.multiplySelf(new DOMMatrix(t.shape.matrix));var z=r.createPattern(m.transform(t.shape.bitmap),"no-repeat");z.setTransform(L),r.globalAlpha=1-v,r.fillStyle=z,r.fillRect(t.x-O/2,t.y-q/2,O,q),r.globalAlpha=1}else if(t.shape==="circle")r.ellipse?r.ellipse(t.x,t.y,Math.abs(M-S)*t.ovalScalar,Math.abs(A-T)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):N(r,t.x,t.y,Math.abs(M-S)*t.ovalScalar,Math.abs(A-T)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI);else if(t.shape==="star")for(var I=Math.PI/2*3,Q=4*t.scalar,W=8*t.scalar,U=t.x,V=t.y,K=5,H=Math.PI/K;K--;)U=t.x+Math.cos(I)*W,V=t.y+Math.sin(I)*W,r.lineTo(U,V),I+=H,U=t.x+Math.cos(I)*Q,V=t.y+Math.sin(I)*Q,r.lineTo(U,V),I+=H;else r.moveTo(Math.floor(t.x),Math.floor(t.y)),r.lineTo(Math.floor(t.wobbleX),Math.floor(T)),r.lineTo(Math.floor(M),Math.floor(A)),r.lineTo(Math.floor(S),Math.floor(t.wobbleY));return r.closePath(),r.fill(),t.tick<t.totalTicks}function Z(r,t,v,S,T){var M=t.slice(),A=r.getContext("2d"),x,P,$=u(function(O){function q(){x=P=null,A.clearRect(0,0,S.width,S.height),m.clear(),T(),O()}function L(){o&&!(S.width===a.width&&S.height===a.height)&&(S.width=r.width=a.width,S.height=r.height=a.height),!S.width&&!S.height&&(v(r),S.width=r.width,S.height=r.height),A.clearRect(0,0,S.width,S.height),M=M.filter(function(z){return J(A,z)}),M.length?x=p.frame(L):q()}x=p.frame(L),P=q});return{addFettis:function(O){return M=M.concat(O),$},canvas:r,promise:$,reset:function(){x&&p.cancel(x),P&&P()}}}function se(r,t){var v=!r,S=!!c(t||{},"resize"),T=!1,M=c(t,"disableForReducedMotion",Boolean),A=n&&!!c(t||{},"useWorker"),x=A?b():null,P=v?C:B,$=r&&x?!!r.__confetti_initialized:!1,O=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,q;function L(I,Q,W){for(var U=c(I,"particleCount",h),V=c(I,"angle",Number),K=c(I,"spread",Number),H=c(I,"startVelocity",Number),ke=c(I,"decay",Number),we=c(I,"gravity",Number),_e=c(I,"drift",Number),ce=c(I,"colors",D),Te=c(I,"ticks",Number),de=c(I,"shapes"),Me=c(I,"scalar"),Ae=!!c(I,"flat"),me=y(I),ue=U,ie=[],Pe=r.width*me.x,Ie=r.height*me.y;ue--;)ie.push(Y({x:Pe,y:Ie,angle:V,spread:K,startVelocity:H,color:ce[ue%ce.length],shape:de[_(0,de.length)],ticks:Te,decay:ke,gravity:we,drift:_e,scalar:Me,flat:Ae}));return q?q.addFettis(ie):(q=Z(r,ie,P,Q,W),q.promise)}function z(I){var Q=M||c(I,"disableForReducedMotion",Boolean),W=c(I,"zIndex",Number);if(Q&&O)return u(function(H){H()});v&&q?r=q.canvas:v&&!r&&(r=E(W),document.body.appendChild(r)),S&&!$&&P(r);var U={width:r.width,height:r.height};x&&!$&&x.init(r),$=!0,x&&(r.__confetti_initialized=!0);function V(){if(x){var H={getBoundingClientRect:function(){if(!v)return r.getBoundingClientRect()}};P(H),x.postMessage({resize:{width:H.width,height:H.height}});return}U.width=U.height=null}function K(){q=null,S&&(T=!1,e.removeEventListener("resize",V)),v&&r&&(document.body.contains(r)&&document.body.removeChild(r),r=null,$=!1)}return S&&!T&&(T=!0,e.addEventListener("resize",V,!1)),x?x.fire(I,U,K):L(I,U,K)}return z.reset=function(){x&&x.reset(),q&&q.reset()},z}var te;function le(){return te||(te=se(null,{useWorker:!0,resize:!0})),te}function ve(r,t,v,S,T,M,A){var x=new Path2D(r),P=new Path2D;P.addPath(x,new DOMMatrix(t));var $=new Path2D;return $.addPath(P,new DOMMatrix([Math.cos(A)*T,Math.sin(A)*T,-Math.sin(A)*M,Math.cos(A)*M,v,S])),$}function xe(r){if(!s)throw new Error("path confetti are not supported in this browser");var t,v;typeof r=="string"?t=r:(t=r.path,v=r.matrix);var S=new Path2D(t),T=document.createElement("canvas"),M=T.getContext("2d");if(!v){for(var A=1e3,x=A,P=A,$=0,O=0,q,L,z=0;z<A;z+=2)for(var I=0;I<A;I+=2)M.isPointInPath(S,z,I,"nonzero")&&(x=Math.min(x,z),P=Math.min(P,I),$=Math.max($,z),O=Math.max(O,I));q=$-x,L=O-P;var Q=10,W=Math.min(Q/q,Q/L);v=[W,0,0,W,-Math.round(q/2+x)*W,-Math.round(L/2+P)*W]}return{type:"path",path:t,matrix:v}}function Se(r){var t,v=1,S="#000000",T='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof r=="string"?t=r:(t=r.text,v="scalar"in r?r.scalar:v,T="fontFamily"in r?r.fontFamily:T,S="color"in r?r.color:S);var M=10*v,A=""+M+"px "+T,x=new OffscreenCanvas(M,M),P=x.getContext("2d");P.font=A;var $=P.measureText(t),O=Math.ceil($.actualBoundingBoxRight+$.actualBoundingBoxLeft),q=Math.ceil($.actualBoundingBoxAscent+$.actualBoundingBoxDescent),L=2,z=$.actualBoundingBoxLeft+L,I=$.actualBoundingBoxAscent+L;O+=L+L,q+=L+L,x=new OffscreenCanvas(O,q),P=x.getContext("2d"),P.font=A,P.fillStyle=S,P.fillText(t,z,I);var Q=1/v;return{type:"bitmap",bitmap:x.transferToImageBitmap(),matrix:[Q,0,0,Q,-O*Q/2,-q*Q/2]}}i.exports=function(){return le().apply(this,arguments)},i.exports.reset=function(){le().reset()},i.exports.create=se,i.exports.shapeFromPath=xe,i.exports.shapeFromText=Se})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),ae,!1);const qe=ae.exports;ae.exports.create;function be(k,e,i){try{qe({particleCount:100,spread:70,origin:{y:.6}})}catch{}const{totalScore:o,recommendedTrack:a,flags:n,performanceIndicators:s}=i;let g="";n.length>0&&(g=n.map(y=>`
      <div class="flag-alert ${y.type==="critical"?"critical":""}">
        <div style="font-size: 1.25rem;">⚠️</div>
        <div>
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${y.title}</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">${y.description}</p>
        </div>
      </div>
    `).join(""));const l=Object.values(e.domain_scores).map(y=>{const C=Math.round(y.earned_score/y.max_score*100);return`
      <div class="domain-progress-bar">
        <div class="bar-label">
          <span><strong>${y.domain_name}</strong> (${y.weight_pct}% Weight)</span>
          <span><strong>${y.earned_score}</strong> / ${y.max_score} Pts (${C}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${C}%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue));"></div>
        </div>
      </div>
    `}).join(""),u=e.question_time_records||[],m=u.map(y=>{if(!y)return"";const C=Math.round(y.activeDurationMs/1e3),B=y.responseLatencyMs?(y.responseLatencyMs/1e3).toFixed(1)+"s":"—",E=y.remainingTimeWhenAnsweredMs?Math.round(y.remainingTimeWhenAnsweredMs/1e3)+"s":"0s";let N='<span style="color:#10b981; font-weight:700;">🟢 Fast</span>';return y.timedOut?N='<span style="color:#ef4444; font-weight:700;">⏰ Timed Out</span>':C>80?N='<span style="color:#f59e0b; font-weight:700;">🔴 Slow</span>':C>45&&(N='<span style="color:#3b82f6; font-weight:700;">🟡 Normal</span>'),`
      <tr style="${y.timedOut?"background:rgba(239,68,68,0.08);":""} border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.85rem;">
        <td style="padding:0.6rem 0.8rem; font-weight:700; text-align:center;">Q${y.questionSlot}</td>
        <td style="padding:0.6rem 0.8rem;">
          <span style="font-size:0.75rem; background:rgba(6,182,212,0.15); color:var(--accent-cyan); padding:0.25rem 0.5rem; border-radius:6px;">
            ${y.domain.replace("_"," ")}
          </span>
        </td>
        <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary);">${y.subSkill}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${C}s</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${B}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${E}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${N}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${y.breaksDuringQuestion>0?`⏸️ ${y.breaksDuringQuestion}`:"0"}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center; font-weight:700;">${y.earnedScore} / ${y.maxScore}</td>
      </tr>
    `}).join(""),p=e.break_events||[];let b="";p.length>0?b=p.map(y=>{const C=Math.floor(y.breakDurationMs/6e4),B=Math.round(y.breakDurationMs%6e4/1e3),E=Math.round(y.countdownRemainingAtPause);return`
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); padding:0.75rem 1rem; border-radius:10px; margin-bottom:0.5rem; font-size:0.88rem;">
          <div>
            <strong>Break #${y.breakIndex}</strong> • During <strong>Q${y.questionSlotAtPause}</strong> (${y.domainAtPause.replace("_"," ")})
          </div>
          <div style="color:var(--accent-amber); font-weight:700;">
            Duration: ${C>0?`${C}m `:""}${B}s (Timer left: ${E}s)
          </div>
        </div>
      `}).join(""):b=`
      <div style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-emerald); color:var(--accent-emerald); padding:1rem; border-radius:10px; font-weight:600; text-align:center;">
        ✅ No breaks taken — Student completed all 60 questions continuously without pausing.
      </div>
    `;const d=Math.round((e.total_active_duration_ms||0)/6e4),w=Math.round((e.total_break_duration_ms||0)/6e4),f=Math.round((e.total_wall_clock_duration_ms||0)/6e4),c=u.filter(y=>y==null?void 0:y.timedOut).length;Ee(e),k.innerHTML=`
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
              <span>Total Active Time:</span> <strong>${d} min</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Total Breaks Taken:</span> <strong>${e.total_breaks_count||0} (${w} min)</strong>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>Questions Timed Out:</span> <strong style="color:${c>0?"#ef4444":"inherit"};">${c} / 60</strong>
            </div>
          </div>
        </div>

        <!-- Domain Breakdown -->
        <div>
          <h3 style="font-size: 1.2rem; font-weight: 700; margin-bottom: 1.25rem; color: var(--text-primary);">
            Competency Domain Performance (60 Questions)
          </h3>
          
          ${l}

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
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-cyan); margin-top:0.25rem;">${d} min</div>
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
              ${f>0?Math.round(d/f*100):100}%
            </div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Active vs total time</div>
          </div>
        </div>

        <!-- Section C: Break Log -->
        <div style="margin-bottom:2.5rem;">
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:1rem;">
            ⏸️ Break & Pause Log
          </h4>
          ${b}
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
                ${m}
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
  `;const h=k.querySelector("#restart-btn");h&&h.addEventListener("click",()=>{window.location.reload()});const _=k.querySelector("#print-report-btn");_&&_.addEventListener("click",()=>window.print());const R=k.querySelector("#download-pdf-btn");R&&R.addEventListener("click",()=>Le(e));const D=k.querySelector("#download-csv-btn");D&&D.addEventListener("click",()=>{je(e)});const j=k.querySelector("#ceo-dashboard-btn");j&&j.addEventListener("click",()=>{ye(k)})}function Ee(k){try{const e=localStorage.getItem("cognix_all_sessions");let i=e?JSON.parse(e):[];i=i.filter(o=>o.session_id!==k.session_id),i.unshift(k),localStorage.setItem("cognix_all_sessions",JSON.stringify(i))}catch{}}function ye(k){const e=localStorage.getItem("cognix_all_sessions"),i=e?JSON.parse(e):[];if(i.length===0){k.innerHTML=`
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
    `;const d=k.querySelector("#ceo-new-test-btn");d&&d.addEventListener("click",()=>window.location.reload());return}const o=i.length,a=Math.round(i.reduce((d,w)=>d+(w.total_score||0),0)/o),n=(i.reduce((d,w)=>d+(w.total_active_duration_ms||0)/6e4,0)/o).toFixed(1),s=i.filter(d=>Array.isArray(d.flags)&&d.flags.length>0).length,l=[{key:"cognitive_ability",name:"Cognitive Ability"},{key:"functional_skills",name:"Functional Skills"},{key:"communication_level",name:"Communication Level"},{key:"behavioral_readiness",name:"Behavioral Readiness"},{key:"fine_motor_technology",name:"Fine Motor & Tech"}].map(d=>{let w=0,f=0;i.forEach(h=>{if(h.domain_scores&&h.domain_scores[d.key]){const _=h.domain_scores[d.key];w+=_.earned_score,f+=_.max_score}});const c=f>0?Math.round(w/f*100):0;return{name:d.name,pct:c}});let u=i.map((d,w)=>{const f=Math.round((d.total_active_duration_ms||0)/6e4),c=Array.isArray(d.flags)?d.flags.length:0,h=d.start_time?new Date(d.start_time).toLocaleDateString():"Today";return`
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.88rem;">
        <td style="padding: 0.75rem 1rem; font-weight: 700;">#${w+1}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 700; color: #fff;">${d.student_name}</td>
        <td style="padding: 0.75rem 1rem; color: var(--text-secondary);">${d.age_group||"7-9"}</td>
        <td style="padding: 0.75rem 1rem; font-weight: 800; color: var(--accent-cyan);">${d.total_score}/100</td>
        <td style="padding: 0.75rem 1rem;">
          <span style="background: rgba(59,130,246,0.15); border: 1px solid var(--accent-blue); color: var(--accent-blue); padding: 0.25rem 0.6rem; border-radius: 8px; font-weight: 600; font-size: 0.8rem;">
            ${d.placed_track||d.recommended_track||"Level 1"}
          </span>
        </td>
        <td style="padding: 0.75rem 1rem; text-align: center;">${f}m</td>
        <td style="padding: 0.75rem 1rem; text-align: center;">
          ${c>0?`<span style="color:#ef4444; font-weight:700;">⚠️ ${c} Flag${c>1?"s":""}</span>`:'<span style="color:#10b981; font-weight:700;">✅ Clean</span>'}
        </td>
        <td style="padding: 0.75rem 1rem; color: var(--text-secondary); font-size: 0.8rem;">${h}</td>
        <td style="padding: 0.75rem 1rem; text-align: right;">
          <button class="btn btn-secondary view-session-btn" data-id="${d.session_id}" style="padding: 0.3rem 0.7rem; font-size: 0.78rem;">
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
          <div style="font-size: 2rem; font-weight: 800; color: var(--accent-blue); margin-top: 0.25rem;">${n}<span style="font-size:1.2rem;"> mins</span></div>
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
          ${l.map(d=>`
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 0.88rem; font-weight: 600; margin-bottom: 0.3rem;">
                <span>${d.name}</span>
                <span style="color: var(--accent-cyan);">${d.pct}% Average</span>
              </div>
              <div style="height: 10px; background: rgba(255,255,255,0.08); border-radius: 5px; overflow: hidden;">
                <div style="width: ${d.pct}%; height: 100%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue)); border-radius: 5px;"></div>
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
              ${u}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;const m=k.querySelector("#export-all-csv-btn");m&&m.addEventListener("click",()=>Oe(i));const p=k.querySelector("#ceo-restart-btn");p&&p.addEventListener("click",()=>window.location.reload()),k.querySelectorAll(".view-session-btn").forEach(d=>{d.addEventListener("click",w=>{const c=w.currentTarget.getAttribute("data-id"),h=i.find(_=>_.session_id===c);if(h){const _={totalScore:h.total_score,placedTrack:h.placed_track||"Level 1",recommendedTrack:h.recommended_track||"Level 1",flags:Array.isArray(h.flags)?h.flags.map(R=>typeof R=="string"?{title:R,description:"",type:"advisory"}:R):[],performanceIndicators:{overallAccuracy:h.total_score,adaptabilityIndex:.85,learningProgressVelocity:"Steady",hintDependencyRatio:.1}};be(k,h,_)}})})}function Oe(k){let e=`StudentName,AgeGroup,TotalScore,PlacedTrack,ActiveTimeMins,Timeouts,BreaksCount,FlagsCount,CompletedDate
`;k.forEach(n=>{var p,b;const s=((n.total_active_duration_ms||0)/6e4).toFixed(1),g=((p=n.question_time_records)==null?void 0:p.filter(d=>d==null?void 0:d.timedOut).length)||0,l=((b=n.break_events)==null?void 0:b.length)||0,u=Array.isArray(n.flags)?n.flags.length:0,m=n.start_time?new Date(n.start_time).toLocaleDateString():"Today";e+=`"${n.student_name.replace(/"/g,'""')}","${n.age_group||"7-9"}",${n.total_score},"${n.placed_track||n.recommended_track||"Level 1"}",${s},${g},${l},${u},"${m}"
`});const i=new Blob([e],{type:"text/csv;charset=utf-8;"}),o=URL.createObjectURL(i),a=document.createElement("a");a.setAttribute("href",o),a.setAttribute("download",`Cognix_CEO_Master_Analytics_${new Date().toISOString().split("T")[0]}.csv`),a.click()}function Le(k){document.body.classList.add("printing-report");const e=document.createElement("style");e.id="cognix-print-style",e.innerHTML=`
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
  `,document.head.appendChild(e);const i=document.title;document.title=`Cognix_Report_${k.student_name.replace(/\s+/g,"_")}_${new Date().toISOString().split("T")[0]}`,window.print(),setTimeout(()=>{document.body.classList.remove("printing-report");const o=document.getElementById("cognix-print-style");o&&o.remove(),document.title=i},2e3)}function je(k){const e=k.question_time_records||[];let i=`Slot,Domain,SubSkill,QuestionTitle,ActiveTimeSec,ResponseLatencySec,TimerRemainingSec,Status,TimedOut,Breaks,EarnedPoints,MaxPoints
`;e.forEach(s=>{if(!s)return;const g=(s.activeDurationMs/1e3).toFixed(1),l=s.responseLatencyMs?(s.responseLatencyMs/1e3).toFixed(1):"",u=s.remainingTimeWhenAnsweredMs?(s.remainingTimeWhenAnsweredMs/1e3).toFixed(1):"0",m=s.timedOut?"TIMED_OUT":s.activeDurationMs>8e4?"SLOW":s.activeDurationMs>45e3?"NORMAL":"FAST";i+=`${s.questionSlot},"${s.domain}","${s.subSkill}","${s.questionTitle.replace(/"/g,'""')}",${g},${l},${u},${m},${s.timedOut},${s.breaksDuringQuestion},${s.earnedScore},${s.maxScore}
`});const o=new Blob([i],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(o),n=document.createElement("a");n.setAttribute("href",a),n.setAttribute("download",`Cognix_CEO_Assessment_Time_Report_${k.student_name.replace(/\s+/g,"_")}.csv`),n.click()}function De(k){return k.replace(/^### (.*$)/gim,'<h3 style="color:var(--text-primary); font-size:1.05rem; margin-top:1rem; margin-bottom:0.4rem;">$1</h3>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/^> (.*$)/gim,'<blockquote style="border-left:3px solid var(--accent-cyan); padding-left:0.8rem; margin:0.8rem 0; color:var(--accent-cyan); font-size:0.9rem;">$1</blockquote>')}const F=class F{constructor(e){this.studentName="Alex Rivers",this.cachedActivities=new Array(60).fill(null),this.userAnswers=[],this.questionTimeRecords=[],this.breakEvents=[],this.currentQuestionIndex=0,this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.itemStartTimestamp=0,this.itemFirstInteractionTimestamp=null,this.currentPauseStartTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,this.isPaused=!1,this.globalTimerInterval=null,this.questionTimerInterval=null,this.loadGen=0,this.isLoadingNextQuestion=!1,this.motorTargetPos={top:80,left:240},this.beforeUnloadHandler=()=>{this.saveSession(this.studentName)},this.container=e,this.generator=new Ce,this.analyzer=new $e,this.initUserAnswers()}static getSavedSession(){try{const e=localStorage.getItem(F.STORAGE_KEY);if(!e)return null;const i=JSON.parse(e);return i&&Array.isArray(i.userAnswers)&&i.userAnswers.length===60?i:null}catch{return null}}static clearSavedSession(){try{localStorage.removeItem(F.STORAGE_KEY)}catch{}}saveSession(e=this.studentName){try{this.studentName=e;const i={studentName:e,currentQuestionIndex:this.currentQuestionIndex,totalTimerSeconds:this.totalTimerSeconds,currentQuestionRemainingSeconds:this.questionTimerSecondsRemaining,isPaused:this.isPaused,cachedActivities:this.cachedActivities,userAnswers:this.userAnswers,questionTimeRecords:this.questionTimeRecords,breakEvents:this.breakEvents,savedAt:Date.now()};localStorage.setItem(F.STORAGE_KEY,JSON.stringify(i))}catch{}}attachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler),window.addEventListener("beforeunload",this.beforeUnloadHandler)}detachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler)}initUserAnswers(){this.userAnswers=new Array(60).fill(null).map(()=>({selectedAnswerIndex:null,robotSequence:[],motorClicks:[],attemptsCount:0,hintsUsed:0,timeSpentMs:0,isSolved:!1,timedOut:!1,answeredAt:null,responseLatencyMs:null,remainingTimeWhenAnsweredMs:null,breaksDuringQuestion:0})),this.questionTimeRecords=[],this.breakEvents=[]}async startSession(e="Alex Rivers",i=!0){this.studentName=e;const o=i?F.getSavedSession():null;o?(this.currentQuestionIndex=Math.max(0,Math.min(59,o.currentQuestionIndex||0)),this.cachedActivities=o.cachedActivities||new Array(60).fill(null),this.userAnswers=o.userAnswers,this.questionTimeRecords=o.questionTimeRecords||[],this.breakEvents=o.breakEvents||[],this.totalTimerSeconds=o.totalTimerSeconds||0,this.questionTimerSecondsRemaining=o.currentQuestionRemainingSeconds||F.QUESTION_TIME_LIMIT_SEC,this.isPaused=o.isPaused||!1,this.startGlobalTimer(this.totalTimerSeconds),this.attachBeforeUnload(),this.isPaused?(await this.loadQuestion(this.currentQuestionIndex,!1),this.pauseAssessment()):await this.loadQuestion(this.currentQuestionIndex,!1)):(this.currentQuestionIndex=0,this.cachedActivities=new Array(60).fill(null),this.initUserAnswers(),this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.isPaused=!1,this.startGlobalTimer(0),this.attachBeforeUnload(),localStorage.getItem("cognix_cache_ver")!=="v_3_0_clean"&&(localStorage.removeItem("cognix_assessment_session"),localStorage.setItem("cognix_cache_ver","v_3_0_clean")),this.saveSession(e),await this.loadQuestion(0,!0))}startGlobalTimer(e=0){this.totalTimerSeconds=e,this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.globalTimerInterval=setInterval(()=>{if(!this.isPaused){this.totalTimerSeconds++,this.totalTimerSeconds%3===0&&this.saveSession(this.studentName);const i=document.getElementById("global-timer");if(i){const o=String(Math.floor(this.totalTimerSeconds/60)).padStart(2,"0"),a=String(this.totalTimerSeconds%60).padStart(2,"0");i.textContent=`${o}:${a}`}}},1e3)}speakAudio(e){try{if("speechSynthesis"in window){window.speechSynthesis.cancel();const i=new SpeechSynthesisUtterance(e);i.rate=.9,i.pitch=1,window.speechSynthesis.speak(i)}}catch{}}startQuestionTimer(){this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.questionTimerSecondsRemaining<=0&&(this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC),this.questionTimerInterval=setInterval(()=>{this.isPaused||(this.questionTimerSecondsRemaining--,this.updateQuestionTimerUI(),this.questionTimerSecondsRemaining<=0&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null,this.handleQuestionTimeout()))},1e3)}updateQuestionTimerUI(){const e=document.getElementById("question-timer-display"),i=document.getElementById("question-timer-ring");if(e){const o=Math.floor(this.questionTimerSecondsRemaining/60),a=String(this.questionTimerSecondsRemaining%60).padStart(2,"0");e.textContent=`${o}:${a}`,this.questionTimerSecondsRemaining<=15?e.style.color="#ef4444":e.style.color="var(--accent-cyan)"}if(i){const o=this.questionTimerSecondsRemaining/F.QUESTION_TIME_LIMIT_SEC*100;i.style.width=`${o}%`}}async loadQuestion(e,i=!0){var s;if(e<0||e>=60)return;this.motorTargetPos={top:80,left:240};const o=++this.loadGen;this.currentQuestionIndex=e;const a=G[e];if(this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),(i||this.questionTimerSecondsRemaining<=3)&&(this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC),this.itemFirstInteractionTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,!this.cachedActivities[e]&&(this.renderLoadingState(e),this.cachedActivities[e]=await this.generator.generateActivity(a.slot),o!==this.loadGen))return;this.isLoadingNextQuestion=!1;const n=this.cachedActivities[e];if(n&&(n.type=a.type,a.type!=="robot_mission"&&n.payload&&(delete n.payload.availableBlocks,delete n.payload.correctSequence),this.shuffleActivityOptions(n)),this.itemStartTimestamp=Date.now(),this.saveSession(this.studentName),this.render(),n&&n.type==="picture_match"){const g=((s=n.payload)==null?void 0:s.audioPromptText)||n.instructions;g&&this.speakAudio(g)}this.isPaused||this.startQuestionTimer(),this.prefetchNextQuestion(e+1)}shuffleActivityOptions(e){if(!e.payload||!Array.isArray(e.payload.options)||e.payload._shuffled||e.payload.options.length<2)return;const i=e.payload.options,o=i.find(n=>n.correct)||i[0],a=[...i];for(let n=a.length-1;n>0;n--){const s=Math.floor(Math.random()*(n+1));[a[n],a[s]]=[a[s],a[n]]}e.payload.options=a,e.payload.correctIndex=a.indexOf(o),e.payload._shuffled=!0}renderLoadingState(e){const i=G[e],o=ee[i.domain],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
        <div style="text-align: center; padding: 3rem 1rem; color: var(--accent-cyan);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.2s infinite ease-in-out;">⚡</div>
          <h3 style="font-size: 1.2rem; font-weight: 700;">Preparing Next Question...</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">${o.name} • ${i.subSkill}</p>
        </div>
      `)}async prefetchNextQuestion(e){if(e>=0&&e<60&&!this.cachedActivities[e]){const i=G[e];this.generator.generateActivity(i.slot).then(o=>{this.cachedActivities[e]=o}).catch(()=>{})}}pauseAssessment(){if(this.isPaused)return;this.isPaused=!0,this.currentPauseStartTimestamp=Date.now();const e=this.userAnswers[this.currentQuestionIndex];e&&e.breaksDuringQuestion++;const i=document.getElementById("pause-overlay");i&&(i.style.display="flex"),this.saveSession(this.studentName)}resumeAssessment(){if(!this.isPaused)return;const e=Date.now();if(this.currentPauseStartTimestamp){const o=e-this.currentPauseStartTimestamp;this.pauseDurationForCurrentQuestionMs+=o;const a=G[this.currentQuestionIndex];this.breakEvents.push({breakIndex:this.breakEvents.length+1,questionSlotAtPause:this.currentQuestionIndex+1,domainAtPause:a.domain,pauseStartTimestamp:this.currentPauseStartTimestamp,resumeTimestamp:e,breakDurationMs:o,countdownRemainingAtPause:this.questionTimerSecondsRemaining})}this.isPaused=!1,this.currentPauseStartTimestamp=null;const i=document.getElementById("pause-overlay");i&&(i.style.display="none"),this.startQuestionTimer(),this.saveSession(this.studentName)}handleQuestionTimeout(){this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC;const e=this.userAnswers[this.currentQuestionIndex];e&&(e.timedOut=!0,e.isSolved=!1),this.recordQuestionTimeData(!1),this.advanceToNextQuestion()}recordQuestionTimeData(e){const i=Date.now(),o=this.userAnswers[this.currentQuestionIndex],a=G[this.currentQuestionIndex],n=this.cachedActivities[this.currentQuestionIndex],s=i-this.itemStartTimestamp,g=Math.max(1e3,s-this.pauseDurationForCurrentQuestionMs);o.timeSpentMs+=g;const l={questionSlot:a.slot,domain:a.domain,subSkill:a.subSkill,questionTitle:(n==null?void 0:n.title)||a.title,questionStartTimestamp:this.itemStartTimestamp,questionEndTimestamp:i,totalDurationMs:s,pausedDurationMs:this.pauseDurationForCurrentQuestionMs,activeDurationMs:g,responseLatencyMs:o.responseLatencyMs,answeredAt:o.answeredAt,timedOut:o.timedOut,wasAnswered:e,remainingTimeWhenAnsweredMs:o.remainingTimeWhenAnsweredMs,breaksDuringQuestion:o.breaksDuringQuestion,earnedScore:0,maxScore:a.maxPoints};this.questionTimeRecords[this.currentQuestionIndex]=l}advanceToNextQuestion(){if(this.isLoadingNextQuestion=!0,this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.currentQuestionIndex<59){const e=G[this.currentQuestionIndex].domain,i=G[this.currentQuestionIndex+1].domain;e!==i?this.showDomainTransitionBanner(i,()=>{this.loadQuestion(this.currentQuestionIndex+1,!0)}):this.loadQuestion(this.currentQuestionIndex+1,!0)}else this.isLoadingNextQuestion=!1,this.completeAssessment()}showDomainTransitionBanner(e,i){const o=ee[e],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
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
      `),setTimeout(i,2200)}render(){const e=this.cachedActivities[this.currentQuestionIndex];if(!e)return;const i=G[this.currentQuestionIndex],o=ee[i.domain],a=this.userAnswers[this.currentQuestionIndex],s=G[this.currentQuestionIndex].domain,g=G.filter(m=>m.domain===s),l=Array.from(new Set(g.map(m=>m.subSkill)));let u=`
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
            Progress: ${this.userAnswers.filter(m=>m.isSolved||m.timedOut).length} Completed
          </div>
        </div>

        <div class="skill-milestones-track" style="display:flex; align-items:center; gap:0.6rem; overflow-x:auto; padding:0.25rem 0; scrollbar-width:thin;">
    `;l.forEach((m,p)=>{const b=g.filter(_=>_.subSkill===m),d=i.subSkill===m,w=b.filter(_=>{const R=this.userAnswers[_.slot-1];return R&&(R.isSolved||R.timedOut)}).length,f=w===b.length;let c=`${p+1}`,h="background: rgba(255,255,255,0.04); border: 1px solid var(--border-color); color: var(--text-secondary);";d?(c="🐸",h="background: linear-gradient(135deg, rgba(6,182,212,0.3), rgba(59,130,246,0.3)); border: 1px solid var(--accent-cyan); color: #fff; box-shadow: 0 0 12px rgba(6,182,212,0.3);"):f&&(c="⭐",h="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald);"),u+=`
        <div style="flex:1; min-width:135px; ${h} padding:0.5rem 0.75rem; border-radius:10px; display:flex; flex-direction:column; gap:0.3rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; font-weight:700;">
            <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:95px;" title="${m}">${m}</span>
            <span style="font-size:0.85rem;">${c}</span>
          </div>
          <div style="font-size:0.72rem; opacity:0.85; display:flex; justify-content:space-between;">
            <span>${w}/${b.length} Qs</span>
            ${f?'<span style="font-weight:700;">✓</span>':""}
          </div>
          <div style="height:4px; width:100%; background:rgba(255,255,255,0.1); border-radius:2px; overflow:hidden;">
            <div style="width:${w/b.length*100}%; height:100%; background:${f?"var(--accent-emerald)":"var(--accent-cyan)"}; transition:width 0.3s ease;"></div>
          </div>
        </div>
      `}),u+="</div></div>",this.container.innerHTML=`
      ${u}

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
    `,this.attachEventListeners()}renderPlaygroundContent(e,i){const o=e.payload||{};if(e.type==="robot_mission"){const l=o.availableBlocks||["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],u=e.slot;let m="";return u===16?m="[ 🤖 Robo ] ➔ ➡️ [ ◽ Path ] ➔ ➡️ [ ⭐ Star ]":u===17||u===18?m="[ 🤖 Robo ] ➔ ➡️ [ ◽ Walk Forward ] ➔ ⤵️ [ Turn Right ] ➔ 🦾 [ 🦷 Shiny Tooth ]":u===19?m="[ 🤖 Robo ] ➔ ⤴️ [ Turn Left ] ➔ ➡️ [ ◽ Walk Forward ] ➔ 📦 [ Package ]":u===20||u===24?m="[ 🤖 Robo ] ➔ ➡️ [ ◽ Move Forward ] ➔ ⤵️ [ Turn Right ] ➔ 🦾 [ 💎 Gem ]":u===21?m="[ 🤖 Robo ] ➔ ⤴️ [ Turn Left ] ➔ ➡️ [ ◽ Walk Forward ] ➔ 📦 [ Drop Package ]":u===22||u===26?m="[ 🤖 Robo ] ➔ 🚪 [ Open Door ] ➔ ➡️ [ Move ] ➔ 🦾 [ Grab Treasure ] ➔ 🏠 [ Return Home ]":u===28?m=`
          <div style="display:flex; flex-direction:column; align-items:center; gap:0.4rem;">
            <div>[ 🤖 Robo ] ➔ ➡️ [ 🧱 BIG ROCK! (Blocked!) ]</div>
            <div style="color:var(--accent-amber); font-size:0.95rem;">⤵️ Turn Right Around Rock ➔ ➡️ Move Forward ➔ ⤴️ Turn Left</div>
            <div>[ 💎 Gem Treasure ]</div>
          </div>
        `:u===30?m="[ 🤖 Robo ] ➔ ⚡ [ Power On ] ➔ 🎯 [ Start Task ]":u===60?m="[ ⚡ Power On ] ➔ 📡 [ Connect ] ➔ 📱 [ Open App ] ➔ 🎓 [ Start Learning ]":m="[ 🤖 Robo ] ➔ ➡️ [ ◽ Path ] ➔ 🦾 [ Target Goal ]",`
        <div style="background: rgba(15,23,42,0.9); border: 2px solid var(--accent-cyan); padding: 0.85rem 1.25rem; border-radius: 14px; margin-bottom: 1.25rem; text-align: center; box-shadow: 0 0 15px rgba(6,182,212,0.2);">
          <div style="font-size: 0.75rem; font-weight: 800; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.4rem;">
            🗺️ Mission Route Map
          </div>
          <div style="font-size: 1.05rem; font-weight: 700; color: #fff;">
            ${m}
          </div>
        </div>

        <div class="robot-mission-container">
          <div>
            <h4 style="margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-secondary);">Available Actions:</h4>
            <div class="blocks-palette">
              ${l.map(p=>`
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
              ${i.robotSequence.length===0?'<span style="color:var(--text-secondary); font-size:0.85rem;">Click blocks on left to build sequence...</span>':i.robotSequence.map((p,b)=>`
                <div class="sequence-step" style="background:var(--accent-blue); padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                  <span>📌 ${b+1}. ${p}</span>
                  <button class="remove-block-btn" data-idx="${b}" style="background:rgba(0,0,0,0.25); border:none; color:#fff; width:20px; height:20px; border-radius:50%; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">×</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `}if(e.type==="picture_match"){const l=o.audioPromptText||e.instructions||"Select the matching item",u=o.options&&o.options.length>0?o.options:[{label:"Option A",emoji:"🤖"},{label:"Option B",emoji:"🍎"},{label:"Option C",emoji:"⚽"}];return`
        <div style="margin-bottom: 1.25rem; font-size:1.1rem; color:var(--accent-cyan); font-weight:600; text-align:center; background:rgba(6,182,212,0.08); border:1px solid rgba(6,182,212,0.2); border-radius:12px; padding:0.75rem 1rem; display:flex; align-items:center; justify-content:center; gap:0.75rem; flex-wrap:wrap;">
          <span>🔊 "${l}"</span>
          <button id="listen-audio-btn" style="background:rgba(6,182,212,0.2); border:1px solid var(--accent-cyan); color:#fff; border-radius:8px; padding:0.35rem 0.85rem; font-size:0.85rem; cursor:pointer; font-weight:700; transition:all 0.2s;">
            🔊 Listen Again
          </button>
        </div>
        <div class="options-grid-3">
          ${u.slice(0,3).map((m,p)=>{const b=typeof m=="string"?m:m.label||`Option ${p+1}`,d=typeof m=="object"&&m.emoji?m.emoji:["🤖","🍎","⚽"][p]||"🎯";return`
              <button class="option-btn-3 ${i.selectedAnswerIndex===p?"selected":""}" data-opt="${p}">
                <span style="font-size: 2.2rem;">${d}</span>
                <span style="font-size: 0.95rem;">${b}</span>
              </button>
            `}).join("")}
        </div>
      `}if(e.type==="motor_target"){const l=o.targetsCount||3,u=i.motorClicks.length>=l;return`
        <div class="motor-canvas-container" id="motor-canvas">
          ${u?"":`<div class="motor-target" id="target-element" style="top: ${this.motorTargetPos.top}px; left: ${this.motorTargetPos.left}px;"></div>`}
          <div style="position:absolute; bottom:10px; left:15px; font-size:0.85rem; color:var(--text-secondary);">
            Targets Clicked: ${i.motorClicks.length} / ${l}
            ${u?" ✅ All targets hit!":""}
          </div>
        </div>
      `}let a=Array.isArray(o.sequence)?o.sequence:null,n=Array.isArray(o.grid)?o.grid:null;const s=e.slot;!a&&!n&&s&&(s===1?a=["🔵 Circle","🔴 Circle","🔵 Circle","🔴 Circle","❓"]:s===2?a=["🍎 Apple","🍎 Apple","🍌 Banana"]:s===3?a=["🔺 Triangle","🔷 Diamond","🔺 Triangle","🔷 Diamond","❓"]:s===4?a=["🐶 Dog","🐱 Cat","🦁 Lion"]:s===5?a=["🚗 Car","🚌 Bus","✈️ Airplane","🍎 Apple"]:s===6?a=["1️⃣","2️⃣","3️⃣","4️⃣","❓"]:s===7?a=["🌱 Seed","➡️","🌿 Sprout","➡️","🌸 Flower"]:s===8?a=["⭐ Star","⭐ Star","🌙 Moon","⭐ Star","⭐ Star","❓"]:s===9?n=[["🔺 Triangle","⬛ Square","🔴 Circle"],["⬛ Square","🔴 Circle","🔺 Triangle"],["🔴 Circle","🔺 Triangle","❓"]]:s===10?a=["🟢 Green","🟢 Green","🟡 Yellow","🟢 Green","🟢 Green","❓"]:s===11?n=[["⭕ Circle","⬛ Square","🔺 Triangle"],["⬛ Square","🔺 Triangle","⭕ Circle"],["🔺 Triangle","⭕ Circle","❓"]]:s===12?a=["☀️ Daytime ➔","🌙 Nighttime ➔","☀️ Daytime ➔","❓"]:s===13?a=["🌧️ Rain Outside ➔","❓ What do you bring?"]:s===14?a=["🔑 Key ➔","🚪 Door ➔","❓ What happens?"]:s===15&&(a=["🫗 Glass Dropped ➔","❓ What happens next?"]));let g=Array.isArray(o.options)&&o.options.length>0?o.options.slice(0,3):[{label:"Choice A"},{label:"Choice B"},{label:"Choice C"}];return g.some(l=>!l.label||l.label==="Option A"||l.label==="Option B")&&(s===7?g=[{label:"🌱 Seed ➔ 🌿 Sprout ➔ 🌸 Flower",emoji:"🌸",correct:!0},{label:"🌸 Flower ➔ 🌱 Seed ➔ 🌿 Sprout",emoji:"🌱",correct:!1},{label:"🌿 Sprout ➔ 🌸 Flower ➔ 🌱 Seed",emoji:"🌿",correct:!1}]:s===8?g=[{label:"🌙 Moon",emoji:"🌙",correct:!0},{label:"⭐ Star",emoji:"⭐",correct:!1},{label:"☀️ Sun",emoji:"☀️",correct:!1}]:s===9?g=[{label:"🟩 Green Square",emoji:"🟩",correct:!0},{label:"🔴 Red Circle",emoji:"🔴",correct:!1},{label:"🔷 Blue Triangle",emoji:"🔷",correct:!1}]:s===11?g=[{label:"⬛ Square",emoji:"⬛",correct:!0},{label:"⭕ Circle",emoji:"⭕",correct:!1},{label:"🔺 Triangle",emoji:"🔺",correct:!1}]:s===15&&(g=[{label:"💥 The glass shatters",emoji:"💥",correct:!0},{label:"🎈 It floats in the air",emoji:"🎈",correct:!1},{label:"🍎 It turns into an apple",emoji:"🍎",correct:!1}])),`
      ${n?`
        <div style="display:flex; justify-content:center; margin-bottom:1.5rem;">
          <div style="background: rgba(15,23,42,0.9); border: 2px solid var(--accent-cyan); padding: 1rem 1.5rem; border-radius: 16px; box-shadow: 0 0 20px rgba(6,182,212,0.2);">
            <div style="display:grid; grid-template-columns: repeat(${n[0].length}, 1fr); gap: 0.75rem; text-align: center;">
              ${n.map(l=>l.map(u=>`
                <div style="font-size: 1.5rem; background: rgba(255,255,255,0.06); padding: 0.75rem 1.25rem; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); color: ${u.includes("❓")?"var(--accent-cyan)":"#fff"}; font-weight: bold;">
                  ${u}
                </div>
              `).join("")).join("")}
            </div>
          </div>
        </div>
      `:""}

      ${a?`
        <div style="font-size: 1.8rem; display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); padding: 1rem 1.5rem; border-radius: 14px; justify-content: center; align-items: center; flex-wrap: wrap; text-align: center;">
          ${a.map(l=>`<span style="background:rgba(255,255,255,0.05); padding:0.4rem 0.8rem; border-radius:8px; color:${l.includes("❓")?"var(--accent-cyan)":"#fff"}">${l}</span>`).join("")}
        </div>
      `:""}

      <div class="options-grid-3">
        ${g.map((l,u)=>{const m=typeof l=="string"?l:l.label||l.text||JSON.stringify(l),p=typeof l=="object"&&l.emoji?l.emoji:"";return`
            <button class="option-btn-3 ${i.selectedAnswerIndex===u?"selected":""}" data-opt="${u}">
              ${p?`<span style="font-size: 2rem; display:block; margin-bottom:0.3rem;">${p}</span>`:""}
              <span style="font-size:1rem; font-weight:600;">${m}</span>
            </button>
          `}).join("")}
      </div>
    `}registerInteraction(){if(!this.itemFirstInteractionTimestamp){this.itemFirstInteractionTimestamp=Date.now();const e=this.userAnswers[this.currentQuestionIndex];e&&(e.responseLatencyMs=Math.max(100,this.itemFirstInteractionTimestamp-this.itemStartTimestamp-this.pauseDurationForCurrentQuestionMs))}}attachEventListeners(){const e=this.userAnswers[this.currentQuestionIndex];this.container.querySelectorAll(".option-btn-3").forEach(b=>{b.addEventListener("click",d=>{this.registerInteraction();const w=d.currentTarget,f=parseInt(w.getAttribute("data-opt")||"0",10);e.selectedAnswerIndex=f,e.isSolved=!0,e.answeredAt=Date.now(),e.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3,e.attemptsCount=Math.max(1,e.attemptsCount+1),this.render()})}),this.container.querySelectorAll(".code-block").forEach(b=>{b.addEventListener("click",d=>{this.registerInteraction();const f=d.currentTarget.getAttribute("data-block");f&&(e.robotSequence.push(f),e.isSolved=e.robotSequence.length>0,e.answeredAt=Date.now(),e.attemptsCount=Math.max(1,e.attemptsCount+1),this.render())})}),this.container.querySelectorAll(".remove-block-btn").forEach(b=>{b.addEventListener("click",d=>{d.stopPropagation();const w=d.currentTarget,f=parseInt(w.getAttribute("data-idx")||"0",10);e.robotSequence.splice(f,1),e.isSolved=e.robotSequence.length>0,this.render()})});const n=this.container.querySelector("#clear-sequence-btn");n&&n.addEventListener("click",()=>{e.robotSequence=[],e.isSolved=!1,this.render()});const s=this.container.querySelector("#listen-audio-btn");s&&s.addEventListener("click",()=>{var d;const b=this.cachedActivities[this.currentQuestionIndex];if(b){const w=((d=b.payload)==null?void 0:d.audioPromptText)||b.instructions||"Select the matching item";this.speakAudio(w)}});const g=this.container.querySelector("#target-element"),l=this.container.querySelector("#motor-canvas");g&&l&&g.addEventListener("click",b=>{var j,y;this.registerInteraction();const d=g.getBoundingClientRect(),w=b.clientX-d.left,f=b.clientY-d.top,c=Math.sqrt(Math.pow(w-d.width/2,2)+Math.pow(f-d.height/2,2));e.motorClicks.push({x:w,y:f,dist:c}),e.attemptsCount=Math.max(1,e.attemptsCount+1);const h=l.getBoundingClientRect(),_=Math.floor(Math.random()*(h.height-80))+10,R=Math.floor(Math.random()*(h.width-80))+10;this.motorTargetPos={top:_,left:R};const D=((y=(j=this.cachedActivities[this.currentQuestionIndex])==null?void 0:j.payload)==null?void 0:y.targetsCount)||3;e.motorClicks.length>=D&&(e.selectedAnswerIndex=0,e.isSolved=!0,e.answeredAt=Date.now(),e.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3),this.render()});const u=this.container.querySelector("#pause-btn");u&&u.addEventListener("click",()=>this.pauseAssessment());const m=this.container.querySelector("#resume-btn");m&&m.addEventListener("click",()=>this.resumeAssessment());const p=this.container.querySelector("#submit-answer-btn");p&&p.addEventListener("click",()=>{this.isLoadingNextQuestion||(this.recordQuestionTimeData(e.isSolved),this.advanceToNextQuestion())})}showCompletionLoadingScreen(){this.container.innerHTML=`
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
    `}async completeAssessment(){var b,d,w,f;this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.questionTimerInterval&&clearInterval(this.questionTimerInterval),this.detachBeforeUnload(),F.clearSavedSession(),this.showCompletionLoadingScreen();const e=[],i={};for(let c=0;c<60;c++){const h=this.cachedActivities[c],_=this.userAnswers[c],R=G[c];if(!h)continue;let D=!1,j=0;if(h.type==="robot_mission"||Array.isArray((b=h.payload)==null?void 0:b.availableBlocks)){const y=((d=h.payload)==null?void 0:d.correctSequence)||[];let C=0;_.robotSequence.forEach((B,E)=>{y[E]===B&&C++}),j=y.length>0?C/y.length:_.robotSequence.length>0?1:0,D=j>=.8}else h.type==="motor_target"?(D=_.motorClicks.length>0,j=Math.min(1,_.motorClicks.length/(((w=h.payload)==null?void 0:w.targetsCount)||3))):(D=_.selectedAnswerIndex===(((f=h.payload)==null?void 0:f.correctIndex)??0),j=D?1:0);i[h.id]=R.maxPoints,e.push({item_id:h.id,domain:h.domain,skill:h.skill,difficulty_level:h.difficulty,is_correct:D,accuracy_score:j,response_time_ms:Math.max(1e3,_.timeSpentMs),expected_time_ms:9e4,attempts_count:Math.max(1,_.attemptsCount),hints_used:_.hintsUsed}),this.questionTimeRecords[c]&&(this.questionTimeRecords[c].earnedScore=re.calculateItemScore(e[c],R.maxPoints))}const o=re.calculateDomainScores(e,i),a=re.calculateTotalScore(o),n=Re.evaluatePlacement(a,o,e),s=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],g={};s.forEach(c=>{const h=this.questionTimeRecords.filter(C=>C&&C.domain===c),_=h.reduce((C,B)=>C+(B.activeDurationMs||0),0),R=h.reduce((C,B)=>C+(B.pausedDurationMs||0),0),D=h.filter(C=>C.timedOut).length,j=h.map(C=>C.responseLatencyMs).filter(C=>C!==null),y=j.length>0?Math.round(j.reduce((C,B)=>C+B,0)/j.length):0;g[c]={totalActiveMs:_,totalPausedMs:R,questionsTimedOut:D,avgResponseLatencyMs:y}});const l=this.questionTimeRecords.reduce((c,h)=>c+((h==null?void 0:h.activeDurationMs)||0),0),u=this.breakEvents.reduce((c,h)=>c+h.breakDurationMs,0),m={session_id:`sess_60_${Date.now()}`,student_name:this.studentName||"Alex Rivers",age_group:"7-9",start_time:new Date(Date.now()-this.totalTimerSeconds*1e3).toISOString(),end_time:new Date().toISOString(),item_telemetries:e,domain_scores:o,total_score:a,placed_track:n.baseTrack,recommended_track:n.recommendedTrack,flags:n.flags.map(c=>c.id),question_time_records:this.questionTimeRecords,break_events:this.breakEvents,total_breaks_count:this.breakEvents.length,total_break_duration_ms:u,total_active_duration_ms:l,total_wall_clock_duration_ms:l+u,domain_time_summary:g},p=await this.analyzer.generateReportSummary(m,n);m.qualitative_summary=p,be(this.container,m,n)}};F.STORAGE_KEY="cognix_active_assessment_session",F.QUESTION_TIME_LIMIT_SEC=90;let X=F,ge=null;function ne(k="Alex Rivers",e=!0){const i=document.getElementById("app");i&&(ge=new X(i),ge.startSession(k,e))}function Fe(){X.clearSavedSession()}function ze(){const k=document.getElementById("app"),e=document.getElementById("childTestPage");k&&e&&(document.body.classList.add("exam-mode"),e.classList.remove("hidden"),e.classList.add("exam-active"),window.scrollTo(0,0),ye(k))}window.initAssessment=ne;window.exitAssessment=Fe;window.openCEODashboard=ze;document.addEventListener("DOMContentLoaded",()=>{const k=document.getElementById("app"),e=document.getElementById("childTestPage"),i=X.getSavedSession();i&&e?(document.body.classList.add("exam-mode"),e.classList.remove("hidden"),e.classList.add("exam-active"),window.scrollTo(0,0),ne(i.studentName||"Alex Rivers",!0)):k&&!e&&ne("Alex Rivers",!1)});

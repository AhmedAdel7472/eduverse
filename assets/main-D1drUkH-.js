(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();class pe{constructor(){this.endpoint="",this.apiKey="",this.model="o4-mini",this.endpoint="https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses";const e="NVFhTWxHZHd4Qzg1bnkzeVdLMG1GMHd2R2hMQnhFRUxkQkh2RkNhWkFSSVhiN2ZjNXpMR0pRUUo5OUNGQUNmaE1rNVhKM3czQUFBQUFDT0c4WFhP";try{this.apiKey=typeof atob=="function"?atob(e):e}catch{this.apiKey=e}}async generateCompletion(e,o="You are an expert AI Assessment System."){var r,s,l;if(!this.apiKey)return console.warn("[CognixAI] ❌ No API key configured — using fallback generator."),null;const n={model:this.model,input:`${o}

User Prompt: ${e}`},a=[this.endpoint];for(const m of a){const k=`req_${Date.now()}_${Math.floor(Math.random()*1e3)}`;console.group(`[CognixAI] 🔷 Azure OpenAI Request [${k}]`),console.log("📤 Endpoint:",m),console.log("📤 Model:",this.model),console.log("📤 Prompt (first 200 chars):",e.substring(0,200)+(e.length>200?"...":"")),console.log("📤 Full payload:",JSON.stringify(n,null,2));const M=performance.now();try{const v=new AbortController,T=setTimeout(()=>{console.warn(`[CognixAI] ⏰ Request [${k}] timed out after 10s`),v.abort()},1e4),y=await fetch(m,{method:"POST",headers:{"Content-Type":"application/json","api-key":this.apiKey},body:JSON.stringify(n),signal:v.signal});clearTimeout(T);const P=Math.round(performance.now()-M);if(console.log(`📥 Response Status: ${y.status} ${y.statusText} (${P}ms)`),y.ok){const _=await y.json();if(console.log("📥 Response Body:",JSON.stringify(_,null,2)),_.output&&Array.isArray(_.output)){for(const c of _.output)if(c.type==="message"&&Array.isArray(c.content)){for(const g of c.content)if(g.type==="output_text"&&g.text)return console.log("✅ Extracted text from output_text:",g.text.substring(0,100)),console.groupEnd(),g.text}}if((l=(s=(r=_.choices)==null?void 0:r[0])==null?void 0:s.message)!=null&&l.content)return console.log("✅ Extracted text from choices:",_.choices[0].message.content.substring(0,100)),console.groupEnd(),_.choices[0].message.content;console.warn("[CognixAI] ⚠️ Response OK but could not extract text from response body.")}else{const _=await y.text().catch(()=>"");console.error(`[CognixAI] ❌ HTTP Error ${y.status}:`,_)}}catch(v){const T=Math.round(performance.now()-M);(v==null?void 0:v.name)==="AbortError"?console.error(`[CognixAI] ❌ Request aborted (timeout) after ${T}ms`):console.error(`[CognixAI] ❌ Network/fetch error after ${T}ms:`,(v==null?void 0:v.message)||v)}console.log("[CognixAI] 🔄 Trying next endpoint or falling back..."),console.groupEnd()}return console.warn("[CognixAI] ⚠️ All endpoints failed — using procedural fallback generator."),null}}const H=[{slot:1,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Match Identical Shapes",baselinePrompt:"Match the identical shapes.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:2,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Spot the Difference",baselinePrompt:"Identify the object that is different.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:3,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Visual Discrimination",title:"Match the Pattern",baselinePrompt:"Match the same visual pattern.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:4,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Group Together",baselinePrompt:"Which objects belong together in the same group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:5,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Does Not Belong",baselinePrompt:"Which object does not belong in this group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:6,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Next in Sequence",baselinePrompt:"What comes next in the sequence?",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:7,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Order the Story",baselinePrompt:"Arrange the pictures in the correct logical order.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:8,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Complete Visual Pattern",baselinePrompt:"Complete the visual pattern.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:9,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Identify Missing Element",baselinePrompt:"Identify the missing element in the grid.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:10,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Continue Pattern",baselinePrompt:"Continue the pattern to the next step.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:11,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"Solve the Problem",baselinePrompt:"Which answer solves the logical problem?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:12,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"What Happens Next",baselinePrompt:"What should logically happen next?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:13,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Best Solution",baselinePrompt:"Select the best solution for this situation.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:14,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Sequence to Solve",baselinePrompt:"Identify the correct sequence of actions to solve the problem.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:15,domain:"cognitive_ability",skill:"cause_and_effect",subSkill:"Cause & Effect",title:"Predict Cause & Effect",baselinePrompt:"What will happen if this action is performed?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:16,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Follow Simple Instruction",baselinePrompt:"Follow a simple 1-step instruction.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:17,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Independent Instruction",baselinePrompt:"Complete a second independent 1-step action.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:18,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Two-Step Action",baselinePrompt:"Complete two actions in the correct order.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:19,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Direct Execution",baselinePrompt:"Complete the task smoothly without repeating steps.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:20,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Three-Step Activity",baselinePrompt:"Complete a 3-step structured activity.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:21,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Sequential Workflow",baselinePrompt:"Complete the activity in the exact correct sequence.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:22,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Finish Structured Task",baselinePrompt:"Start and finish the structured robotics task.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:23,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Minimal Prompt Task",baselinePrompt:"Complete the goal with minimal visual prompting.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:24,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Organize Tools",baselinePrompt:"Organize the programming blocks before beginning.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:25,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Return Materials",baselinePrompt:"Return all unused blocks to their correct place.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:26,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Independent Task",baselinePrompt:"Complete the familiar coding mission independently.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:27,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Ask for Help",baselinePrompt:"Identify when and how to request assistance appropriately.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:28,domain:"functional_skills",skill:"problem_solving",subSkill:"Functional Problem Solving",title:"Overcome Blockade",baselinePrompt:"Identify what to do when a path cannot be completed.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:29,domain:"functional_skills",skill:"attention",subSkill:"Learning Routine",title:"Learning Routine",baselinePrompt:"Follow the expected technology learning routine.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:30,domain:"functional_skills",skill:"task_completion",subSkill:"Functional Learning",title:"Practical Learning Task",baselinePrompt:"Complete a simple practical digital learning task.",maxPoints:1,difficulty:2,type:"robot_mission"},{slot:31,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Listen & Follow",baselinePrompt:"Follow a spoken audio instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:32,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Identify Object",baselinePrompt:"Identify the requested target object from audio prompt.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:33,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Name Component",baselinePrompt:"Select the correct name for the highlighted technology item.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:34,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Express Choice",baselinePrompt:"Communicate the correct preference or action needed.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:35,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Two-Step Audio",baselinePrompt:"Follow a 2-step audio communication instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:36,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Classroom Tech Instruction",baselinePrompt:"Follow a functional technology classroom command.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:37,domain:"communication_level",skill:"picture_matching",subSkill:"Identification",title:"Identify Digital Icon",baselinePrompt:"Identify the matching digital icon or symbol.",maxPoints:2,difficulty:1,type:"picture_match"},{slot:38,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Question Response",title:"Answer WH-Question",baselinePrompt:'Answer the question: "Which tool helps robots move?"',maxPoints:2,difficulty:3,type:"picture_match"},{slot:39,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Functional Communication",title:"Request Clarification",baselinePrompt:"Choose the symbol used to request help or clarification.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:40,domain:"communication_level",skill:"understanding_instructions",subSkill:"Problem Solving Communication",title:"Communicate Solution",baselinePrompt:"Communicate the correct solution choice to the team.",maxPoints:2,difficulty:3,type:"picture_match"},{slot:41,domain:"behavioral_readiness",skill:"persistence",subSkill:"Attention",title:"Sustain Attention",baselinePrompt:"Maintains focus when a puzzle takes longer to solve.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:42,domain:"behavioral_readiness",skill:"persistence",subSkill:"Task Engagement",title:"Remain Engaged",baselinePrompt:"Remains engaged in the learning activity despite distractions.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:43,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Instruction Following",title:"Responds to Signals",baselinePrompt:"Responds promptly when given a stop or transition instruction.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:44,domain:"behavioral_readiness",skill:"error_recovery",subSkill:"Response to Correction",title:"Accept Redirection",baselinePrompt:"Accepts gentle feedback and adjusts the approach calmly.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:45,domain:"behavioral_readiness",skill:"flexibility",subSkill:"Frustration Tolerance",title:"Persevere on Error",baselinePrompt:"Continues trying calmly after an initial error or bug.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:46,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Transition",title:"Smooth Transition",baselinePrompt:"Moves smoothly from one activity to the next when time is up.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:47,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Turn Taking / Waiting",title:"Wait Appropriately",baselinePrompt:"Waits patiently while another student or robot finishes their turn.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:48,domain:"behavioral_readiness",skill:"persistence",subSkill:"Motivation",title:"Eager to Learn",baselinePrompt:"Demonstrates willingness to try a new technology challenge.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:49,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Independence",title:"Independent Effort",baselinePrompt:"Attempts the problem independently before asking for help.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:50,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Help Seeking",title:"Polite Help Request",baselinePrompt:"Requests assistance politely and appropriately when stuck.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:51,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Fine Motor Control",title:"Object Precision",baselinePrompt:"Tap or manipulate small digital targets with precision.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:52,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Hand-Eye Coordination",title:"Accurate Movement",baselinePrompt:"Move pointer accurately to the target element.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:53,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Object Manipulation",title:"Assemble Structure",baselinePrompt:"Drag blocks to assemble a simple structure.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:54,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Mouse/Trackpad",title:"Pointer Navigation",baselinePrompt:"Control pointer speed and target alignment.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:55,domain:"fine_motor_technology",skill:"keyboard_navigation",subSkill:"Keyboard Skills",title:"Key Identification",baselinePrompt:"Locate and press key directional arrows or spacebar.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:56,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Touchscreen",title:"Touch Target",baselinePrompt:"Select the highlighted item cleanly on screen.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:57,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Drag & Drop",title:"Drag Block to Slot",baselinePrompt:"Complete a digital drag-and-drop alignment.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:58,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Digital Navigation",title:"Select App Icon",baselinePrompt:"Open or select the correct learning activity application.",maxPoints:1,difficulty:2,type:"picture_match"},{slot:59,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Tech Problem Solving",title:"Fix Screen Freeze",baselinePrompt:"Identify what button to click if a digital task freezes.",maxPoints:1,difficulty:3,type:"pattern_matrix"},{slot:60,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Technology Independence",title:"Independent Navigation",baselinePrompt:"Complete the basic technology startup sequence independently.",maxPoints:2,difficulty:3,type:"robot_mission"}];class Te{constructor(){this.client=new pe}async generateActivity(e){const o=Math.max(1,Math.min(60,e)),n=H[o-1],a=`You are generating Question #${n.slot} of 60 for the Cognix SEN Placement Assessment (aged 6-12).
Baseline Competency: "${n.baselinePrompt}" (Domain: ${n.domain}, Sub-skill: ${n.subSkill}, Difficulty: ${n.difficulty}/3).

CRITICAL REQUIREMENT:
- Generate a child-friendly, engaging variation of this question.
- MUST HAVE EXACTLY 3 ANSWER CHOICES (A, B, C).
- 1 choice MUST be fully correct, 2 choices MUST be plausible wrong distractors.
- Keep language simple, positive, encouraging, and easy to read.

Return ONLY valid JSON with no markdown wrapping:
{
  "title": "${n.title}",
  "instructions": "Clear simple question prompt for the child",
  "type": "${n.type}",
  "hintText": "Step-by-step encouraging hint",
  "payload": {
    "options": [
      { "label": "Option A text or emoji", "correct": true },
      { "label": "Option B text or emoji", "correct": false },
      { "label": "Option C text or emoji", "correct": false }
    ],
    "correctIndex": 0
  }
}`;try{const r=await this.client.generateCompletion(a);if(r){let s=r.trim();s.startsWith("```json")?s=s.replace(/^```json/,"").replace(/```$/,"").trim():s.startsWith("```")&&(s=s.replace(/^```/,"").replace(/```$/,"").trim());const l=s.lastIndexOf("}");l!==-1&&(s=s.substring(0,l+1));const m=JSON.parse(s);if(m.instructions&&m.payload&&Array.isArray(m.payload.options))return m.payload.options.length>3&&(m.payload.options=m.payload.options.slice(0,3)),{id:`q_slot_${n.slot}_${Date.now()}_${Math.floor(Math.random()*1e3)}`,slot:n.slot,domain:n.domain,skill:n.skill,subSkill:n.subSkill,title:m.title||n.title,instructions:m.instructions,difficulty:n.difficulty,expectedTimeMs:9e4,maxPoints:n.maxPoints,type:n.type,payload:m.payload,hintText:m.hintText||"Take your time and think carefully!"}}}catch{}return this.generateDynamicFallback(o)}generateDynamicFallback(e){const o=Math.max(1,Math.min(60,e)),n=H[o-1],a=`fallback_q_${o}_${Date.now()}_${Math.floor(Math.random()*1e3)}`;let r={},s=n.baselinePrompt,l="Look at all options carefully before picking.";if(n.type==="robot_mission"?(r={availableBlocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],correctSequence:["Move Forward ⬆️","Grab Item 🦾"],options:[{label:"Move Forward ➔ Grab Item",correct:!0},{label:"Turn Right ➔ Turn Right",correct:!1},{label:"Grab Item ➔ Stop",correct:!1}],correctIndex:0},l="Add the move block first, then grab the item!"):n.type==="picture_match"?(r={audioPromptText:`Select the item: ${n.title}`,options:[{label:"Target Item 🎯",emoji:"🤖",correct:!0},{label:"Other Item A",emoji:"🍎",correct:!1},{label:"Other Item B",emoji:"⚽",correct:!1}],correctIndex:0},l="Click the robot icon!"):n.type==="motor_target"?(r={targetsCount:3,movementSpeed:1.2,options:[{label:"Target Center 🎯",correct:!0},{label:"Side Corner 📐",correct:!1},{label:"Outer Boundary ⭕",correct:!1}],correctIndex:0},l="Click directly inside the glowing circle."):n.domain==="cognitive_ability"?(r={sequence:["🔵","🔴","🔵","🔴","?"],options:[{label:"🔵 Blue Circle",correct:!0},{label:"🟢 Green Circle",correct:!1},{label:"🟡 Yellow Star",correct:!1}],correctIndex:0},l="Notice how Blue and Red repeat one after another."):n.domain==="behavioral_readiness"?(r={options:[{label:"Stay calm, wait your turn, and try politely",correct:!0},{label:"Get upset and stop working",correct:!1},{label:"Leave the room immediately",correct:!1}],correctIndex:0},l="Choose the option that shows patience and self-control."):r={options:[{label:"Correct Solution Action 🌟",correct:!0},{label:"Incorrect Action A ❌",correct:!1},{label:"Incorrect Action B 🛑",correct:!1}],correctIndex:0},r.options&&Array.isArray(r.options)&&r.options.length===3){const m=r.options.find(M=>M.correct)||r.options[0],k=this.shuffleArray([...r.options]);r.options=k,r.correctIndex=k.indexOf(m)}return{id:a,slot:n.slot,domain:n.domain,skill:n.skill,subSkill:n.subSkill,title:`Q${n.slot}: ${n.title}`,instructions:s,difficulty:n.difficulty,expectedTimeMs:9e4,maxPoints:n.maxPoints,type:n.type,payload:r,hintText:l}}shuffleArray(e){const o=[...e];for(let n=o.length-1;n>0;n--){const a=Math.floor(Math.random()*(n+1));[o[n],o[a]]=[o[a],o[n]]}return o}}const ee={cognitive_ability:{name:"Cognitive Ability",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},functional_skills:{name:"Functional Abilities",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},communication_level:{name:"Communication Level",weight:.2,maxScore:20,questionCount:10,recommendedTimeMin:15},behavioral_readiness:{name:"Behavioral & Learning Readiness",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:15},fine_motor_technology:{name:"Fine Motor & Technology Skills",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:20}};class ne{static calculateItemScore(e,o=2){if(!e.is_correct&&e.accuracy_score===0)return 0;const n=Math.max(0,Math.min(1,e.accuracy_score)),a=e.expected_time_ms||9e4,r=Math.max(0,(e.response_time_ms-a)/Math.max(1e3,a)),s=Math.max(.7,1-.1*r),l=Math.max(.5,1-.15*e.hints_used),m=Math.max(.6,1-.1*Math.max(0,e.attempts_count-1)),k=o*n*s*l*m;return Math.max(0,Math.min(o,Math.round(k*10)/10))}static calculateDomainScores(e,o){const n=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],a={};for(const r of n){const s=ee[r],l=e.filter(_=>_.domain===r);if(l.length===0){a[r]={domain:r,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:0,efficiency_index:0,earned_score:0,skills_breakdown:{}};continue}let m=0,k=0;const M={};for(const _ of l){const c=(o==null?void 0:o[_.item_id])??2,g=this.calculateItemScore(_,c);m+=g,k+=_.accuracy_score,M[_.skill]||(M[_.skill]={totalEarnedRatio:0,count:0}),M[_.skill].totalEarnedRatio+=g/Math.max(.1,c),M[_.skill].count+=1}const v=l.length,T=k/v*100,y=Math.min(s.maxScore,Math.round(m*10)/10),P={};for(const[_,c]of Object.entries(M))P[_]=Math.round(c.totalEarnedRatio/c.count*100);a[r]={domain:r,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:Math.round(T),efficiency_index:Math.round(y/s.maxScore*100)/100,earned_score:y,skills_breakdown:P}}return a}static calculateTotalScore(e){let o=0;for(const n of Object.values(e))o+=n.earned_score;return Math.min(100,Math.round(o*10)/10)}}class Me{static evaluatePlacement(e,o,n){var D,d,L,I,N;let a="Explorer";e>=90?a="Innovator":e>=75?a="Creator":e>=60?a="Builder":a="Explorer";const r=[];(((D=o.cognitive_ability)==null?void 0:D.earned_score)||0)<10&&r.push({id:"FLAG_COGNITIVE_DEFICIENCY",type:"critical",title:"Cognitive Foundation Support",description:"Student demonstrated difficulty in pattern recognition and logical reasoning. Targeted logic puzzles recommended before advancing."}),(((d=o.functional_skills)==null?void 0:d.earned_score)||0)<10&&r.push({id:"FLAG_FUNCTIONAL_DEFICIENCY",type:"critical",title:"Multi-Step Mission Support",description:"Student requires scaffolded instruction following and working memory exercises."}),(((L=o.communication_level)==null?void 0:L.earned_score)||0)<7&&r.push({id:"FLAG_COMMUNICATION_SUPPORT",type:"warning",title:"Verbal & Visual Comprehension Support",description:"Audio visual cues and simplified instructions recommended during missions."}),(((I=o.behavioral_readiness)==null?void 0:I.earned_score)||0)<5.25&&r.push({id:"FLAG_BEHAVIORAL_ADAPTABILITY",type:"warning",title:"Error Recovery & Resilience Support",description:"Student showed hesitation or frustration during unexpected rule changes. Guided error-recovery feedback advised."}),(((N=o.fine_motor_technology)==null?void 0:N.earned_score)||0)<5.25&&r.push({id:"FLAG_FINE_MOTOR_SUPPORT",type:"info",title:"Digital Navigation Practice",description:"Drag-and-drop and target precision practice recommended for smooth touch/mouse control."});const v=r.some(C=>C.type==="critical");let T=a;v&&a!=="Explorer"&&(T=`${a} (with Targeted Support)`);let y=n.length||1,P=n.filter(C=>C.is_correct).length,_=n.reduce((C,j)=>C+j.hints_used,0),c=n.reduce((C,j)=>C+j.response_time_ms/Math.max(1e3,j.expected_time_ms),0)/y;const g=n.filter(C=>C.domain==="behavioral_readiness");let O=.75;if(g.length>0){const C=g.reduce((j,Y)=>j+Y.accuracy_score,0)/g.length;O=Math.round(C*100)/100}let Q="Steady";if(n.length>=4){const C=Math.floor(n.length/2),j=n.slice(0,C).reduce((J,Z)=>J+Z.accuracy_score,0)/C,Y=n.slice(C).reduce((J,Z)=>J+Z.accuracy_score,0)/(n.length-C);Y-j>.15?Q="High":Y<.4&&(Q="Needs Practice")}return{totalScore:e,baseTrack:a,recommendedTrack:T,flags:r,requiresSupport:v,performanceIndicators:{overallAccuracy:Math.round(P/y*100),avgResponseSpeedRatio:Math.round(c*100)/100,hintDependencyRatio:Math.round(_/y*100)/100,adaptabilityIndex:O,learningProgressVelocity:Q}}}}class Pe{constructor(){this.client=new pe}async generateReportSummary(e,o){const n=`Analyze this student assessment telemetry and provide a 3-paragraph diagnostic summary:
Student: ${e.student_name}
Total Score: ${o.totalScore}/100
Placed Track: ${o.recommendedTrack}
Overall Accuracy: ${o.performanceIndicators.overallAccuracy}%
Adaptability Index: ${o.performanceIndicators.adaptabilityIndex}
Learning Velocity: ${o.performanceIndicators.learningProgressVelocity}
Flags: ${o.flags.map(r=>r.title).join(", ")||"None"}
`,a=await this.client.generateCompletion(n,"You are an expert educational psychologist and SEN assessment specialist. Provide concise, professional diagnostic summaries.");return a||this.getBuiltInReport(e,o)}getBuiltInReport(e,o){const{totalScore:n,recommendedTrack:a,performanceIndicators:r,flags:s}=o;let l=`### Executive Assessment Summary
`;return l+=`**${e.student_name}** completed the AI Digital Placement Assessment, achieving a **Technology Readiness Score of ${n}/100**, placing into the **${a}** track.

`,l+=`### Cognitive & Problem-Solving Approach
`,r.overallAccuracy>=80?l+=`The student demonstrated high analytical accuracy (${r.overallAccuracy}%) with strong working memory and spatial pattern recognition. Tasks were completed with minimal reliance on hints (${r.hintDependencyRatio} hints/item).

`:l+=`The student displayed promising problem-solving initiative with an overall accuracy of ${r.overallAccuracy}%. Performance was boosted by scaffolded hints and trial-and-error feedback.

`,l+=`### Adaptability & Tech Readiness
`,l+=`During the dynamic rule-switch challenges, the student achieved an Adaptability Index of **${r.adaptabilityIndex}**, displaying a **${r.learningProgressVelocity}** learning progress velocity across progressive difficulty levels. `,s.length>0?l+=`

> [!NOTE]
> **Targeted Support Areas Identified**: ${s.map(m=>m.title).join(" • ")}. Targeted practice modules are recommended to solidify these core competencies.`:l+=`

> [!TIP]
> **Strengths Spotlight**: Well-rounded mastery observed across all five competency domains. Prepared for direct engagement with advanced robotics and interactive programming modules.`,l}}var re={};(function E(e,o,n,a){var r=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL),s=typeof Path2D=="function"&&typeof DOMMatrix=="function",l=(function(){if(!e.OffscreenCanvas)return!1;try{var i=new OffscreenCanvas(1,1),t=i.getContext("2d");t.fillRect(0,0,1,1);var u=i.transferToImageBitmap();t.createPattern(u,"no-repeat")}catch{return!1}return!0})();function m(){}function k(i){var t=o.exports.Promise,u=t!==void 0?t:e.Promise;return typeof u=="function"?new u(i):(i(m,m),null)}var M=(function(i,t){return{transform:function(u){if(i)return u;if(t.has(u))return t.get(u);var h=new OffscreenCanvas(u.width,u.height),f=h.getContext("2d");return f.drawImage(u,0,0),t.set(u,h),h},clear:function(){t.clear()}}})(l,new Map),v=(function(){var i=Math.floor(16.666666666666668),t,u,h={},f=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(t=function(b){var x=Math.random();return h[x]=requestAnimationFrame(function p(S){f===S||f+i-1<S?(f=S,delete h[x],b()):h[x]=requestAnimationFrame(p)}),x},u=function(b){h[b]&&cancelAnimationFrame(h[b])}):(t=function(b){return setTimeout(b,i)},u=function(b){return clearTimeout(b)}),{frame:t,cancel:u}})(),T=(function(){var i,t,u={};function h(f){function b(x,p){f.postMessage({options:x||{},callback:p})}f.init=function(p){var S=p.transferControlToOffscreen();f.postMessage({canvas:S},[S])},f.fire=function(p,S,A){if(t)return b(p,null),t;var R=Math.random().toString(36).slice(2);return t=k(function($){function q(B){B.data.callback===R&&(delete u[R],f.removeEventListener("message",q),t=null,M.clear(),A(),$())}f.addEventListener("message",q),b(p,R),u[R]=q.bind(null,{data:{callback:R}})}),t},f.reset=function(){f.postMessage({reset:!0});for(var p in u)u[p](),delete u[p]}}return function(){if(i)return i;if(!n&&r){var f=["var CONFETTI, SIZE = {}, module = {};","("+E.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{i=new Worker(URL.createObjectURL(new Blob([f])))}catch(b){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",b),null}h(i)}return i}})(),y={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function P(i,t){return t?t(i):i}function _(i){return i!=null}function c(i,t,u){return P(i&&_(i[t])?i[t]:y[t],u)}function g(i){return i<0?0:Math.floor(i)}function O(i,t){return Math.floor(Math.random()*(t-i))+i}function Q(i){return parseInt(i,16)}function D(i){return i.map(d)}function d(i){var t=String(i).replace(/[^0-9a-f]/gi,"");return t.length<6&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),{r:Q(t.substring(0,2)),g:Q(t.substring(2,4)),b:Q(t.substring(4,6))}}function L(i){var t=c(i,"origin",Object);return t.x=c(t,"x",Number),t.y=c(t,"y",Number),t}function I(i){i.width=document.documentElement.clientWidth,i.height=document.documentElement.clientHeight}function N(i){var t=i.getBoundingClientRect();i.width=t.width,i.height=t.height}function C(i){var t=document.createElement("canvas");return t.style.position="fixed",t.style.top="0px",t.style.left="0px",t.style.pointerEvents="none",t.style.zIndex=i,t}function j(i,t,u,h,f,b,x,p,S){i.save(),i.translate(t,u),i.rotate(b),i.scale(h,f),i.arc(0,0,1,x,p,S),i.restore()}function Y(i){var t=i.angle*(Math.PI/180),u=i.spread*(Math.PI/180);return{x:i.x,y:i.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:i.startVelocity*.5+Math.random()*i.startVelocity,angle2D:-t+(.5*u-Math.random()*u),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:i.color,shape:i.shape,tick:0,totalTicks:i.ticks,decay:i.decay,drift:i.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:i.gravity*3,ovalScalar:.6,scalar:i.scalar,flat:i.flat}}function J(i,t){t.x+=Math.cos(t.angle2D)*t.velocity+t.drift,t.y+=Math.sin(t.angle2D)*t.velocity+t.gravity,t.velocity*=t.decay,t.flat?(t.wobble=0,t.wobbleX=t.x+10*t.scalar,t.wobbleY=t.y+10*t.scalar,t.tiltSin=0,t.tiltCos=0,t.random=1):(t.wobble+=t.wobbleSpeed,t.wobbleX=t.x+10*t.scalar*Math.cos(t.wobble),t.wobbleY=t.y+10*t.scalar*Math.sin(t.wobble),t.tiltAngle+=.1,t.tiltSin=Math.sin(t.tiltAngle),t.tiltCos=Math.cos(t.tiltAngle),t.random=Math.random()+2);var u=t.tick++/t.totalTicks,h=t.x+t.random*t.tiltCos,f=t.y+t.random*t.tiltSin,b=t.wobbleX+t.random*t.tiltCos,x=t.wobbleY+t.random*t.tiltSin;if(i.fillStyle="rgba("+t.color.r+", "+t.color.g+", "+t.color.b+", "+(1-u)+")",i.beginPath(),s&&t.shape.type==="path"&&typeof t.shape.path=="string"&&Array.isArray(t.shape.matrix))i.fill(he(t.shape.path,t.shape.matrix,t.x,t.y,Math.abs(b-h)*.1,Math.abs(x-f)*.1,Math.PI/10*t.wobble));else if(t.shape.type==="bitmap"){var p=Math.PI/10*t.wobble,S=Math.abs(b-h)*.1,A=Math.abs(x-f)*.1,R=t.shape.bitmap.width*t.scalar,$=t.shape.bitmap.height*t.scalar,q=new DOMMatrix([Math.cos(p)*S,Math.sin(p)*S,-Math.sin(p)*A,Math.cos(p)*A,t.x,t.y]);q.multiplySelf(new DOMMatrix(t.shape.matrix));var B=i.createPattern(M.transform(t.shape.bitmap),"no-repeat");B.setTransform(q),i.globalAlpha=1-u,i.fillStyle=B,i.fillRect(t.x-R/2,t.y-$/2,R,$),i.globalAlpha=1}else if(t.shape==="circle")i.ellipse?i.ellipse(t.x,t.y,Math.abs(b-h)*t.ovalScalar,Math.abs(x-f)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI):j(i,t.x,t.y,Math.abs(b-h)*t.ovalScalar,Math.abs(x-f)*t.ovalScalar,Math.PI/10*t.wobble,0,2*Math.PI);else if(t.shape==="star")for(var w=Math.PI/2*3,z=4*t.scalar,U=8*t.scalar,W=t.x,V=t.y,K=5,G=Math.PI/K;K--;)W=t.x+Math.cos(w)*U,V=t.y+Math.sin(w)*U,i.lineTo(W,V),w+=G,W=t.x+Math.cos(w)*z,V=t.y+Math.sin(w)*z,i.lineTo(W,V),w+=G;else i.moveTo(Math.floor(t.x),Math.floor(t.y)),i.lineTo(Math.floor(t.wobbleX),Math.floor(f)),i.lineTo(Math.floor(b),Math.floor(x)),i.lineTo(Math.floor(h),Math.floor(t.wobbleY));return i.closePath(),i.fill(),t.tick<t.totalTicks}function Z(i,t,u,h,f){var b=t.slice(),x=i.getContext("2d"),p,S,A=k(function(R){function $(){p=S=null,x.clearRect(0,0,h.width,h.height),M.clear(),f(),R()}function q(){n&&!(h.width===a.width&&h.height===a.height)&&(h.width=i.width=a.width,h.height=i.height=a.height),!h.width&&!h.height&&(u(i),h.width=i.width,h.height=i.height),x.clearRect(0,0,h.width,h.height),b=b.filter(function(B){return J(x,B)}),b.length?p=v.frame(q):$()}p=v.frame(q),S=$});return{addFettis:function(R){return b=b.concat(R),A},canvas:i,promise:A,reset:function(){p&&v.cancel(p),S&&S()}}}function se(i,t){var u=!i,h=!!c(t||{},"resize"),f=!1,b=c(t,"disableForReducedMotion",Boolean),x=r&&!!c(t||{},"useWorker"),p=x?T():null,S=u?I:N,A=i&&p?!!i.__confetti_initialized:!1,R=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,$;function q(w,z,U){for(var W=c(w,"particleCount",g),V=c(w,"angle",Number),K=c(w,"spread",Number),G=c(w,"startVelocity",Number),ye=c(w,"decay",Number),be=c(w,"gravity",Number),ve=c(w,"drift",Number),le=c(w,"colors",D),xe=c(w,"ticks",Number),ce=c(w,"shapes"),Se=c(w,"scalar"),ke=!!c(w,"flat"),de=L(w),me=W,ie=[],_e=i.width*de.x,we=i.height*de.y;me--;)ie.push(Y({x:_e,y:we,angle:V,spread:K,startVelocity:G,color:le[me%le.length],shape:ce[O(0,ce.length)],ticks:xe,decay:ye,gravity:be,drift:ve,scalar:Se,flat:ke}));return $?$.addFettis(ie):($=Z(i,ie,S,z,U),$.promise)}function B(w){var z=b||c(w,"disableForReducedMotion",Boolean),U=c(w,"zIndex",Number);if(z&&R)return k(function(G){G()});u&&$?i=$.canvas:u&&!i&&(i=C(U),document.body.appendChild(i)),h&&!A&&S(i);var W={width:i.width,height:i.height};p&&!A&&p.init(i),A=!0,p&&(i.__confetti_initialized=!0);function V(){if(p){var G={getBoundingClientRect:function(){if(!u)return i.getBoundingClientRect()}};S(G),p.postMessage({resize:{width:G.width,height:G.height}});return}W.width=W.height=null}function K(){$=null,h&&(f=!1,e.removeEventListener("resize",V)),u&&i&&(document.body.contains(i)&&document.body.removeChild(i),i=null,A=!1)}return h&&!f&&(f=!0,e.addEventListener("resize",V,!1)),p?p.fire(w,W,K):q(w,W,K)}return B.reset=function(){p&&p.reset(),$&&$.reset()},B}var te;function ae(){return te||(te=se(null,{useWorker:!0,resize:!0})),te}function he(i,t,u,h,f,b,x){var p=new Path2D(i),S=new Path2D;S.addPath(p,new DOMMatrix(t));var A=new Path2D;return A.addPath(S,new DOMMatrix([Math.cos(x)*f,Math.sin(x)*f,-Math.sin(x)*b,Math.cos(x)*b,u,h])),A}function ge(i){if(!s)throw new Error("path confetti are not supported in this browser");var t,u;typeof i=="string"?t=i:(t=i.path,u=i.matrix);var h=new Path2D(t),f=document.createElement("canvas"),b=f.getContext("2d");if(!u){for(var x=1e3,p=x,S=x,A=0,R=0,$,q,B=0;B<x;B+=2)for(var w=0;w<x;w+=2)b.isPointInPath(h,B,w,"nonzero")&&(p=Math.min(p,B),S=Math.min(S,w),A=Math.max(A,B),R=Math.max(R,w));$=A-p,q=R-S;var z=10,U=Math.min(z/$,z/q);u=[U,0,0,U,-Math.round($/2+p)*U,-Math.round(q/2+S)*U]}return{type:"path",path:t,matrix:u}}function fe(i){var t,u=1,h="#000000",f='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof i=="string"?t=i:(t=i.text,u="scalar"in i?i.scalar:u,f="fontFamily"in i?i.fontFamily:f,h="color"in i?i.color:h);var b=10*u,x=""+b+"px "+f,p=new OffscreenCanvas(b,b),S=p.getContext("2d");S.font=x;var A=S.measureText(t),R=Math.ceil(A.actualBoundingBoxRight+A.actualBoundingBoxLeft),$=Math.ceil(A.actualBoundingBoxAscent+A.actualBoundingBoxDescent),q=2,B=A.actualBoundingBoxLeft+q,w=A.actualBoundingBoxAscent+q;R+=q+q,$+=q+q,p=new OffscreenCanvas(R,$),S=p.getContext("2d"),S.font=x,S.fillStyle=h,S.fillText(t,B,w);var z=1/u;return{type:"bitmap",bitmap:p.transferToImageBitmap(),matrix:[z,0,0,z,-R*z/2,-$*z/2]}}o.exports=function(){return ae().apply(this,arguments)},o.exports.reset=function(){ae().reset()},o.exports.create=se,o.exports.shapeFromPath=ge,o.exports.shapeFromText=fe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),re,!1);const Ie=re.exports;re.exports.create;function Ae(E,e,o){try{Ie({particleCount:100,spread:70,origin:{y:.6}})}catch{}const{totalScore:n,recommendedTrack:a,flags:r,performanceIndicators:s}=o;let l="";r.length>0&&(l=r.map(d=>`
      <div class="flag-alert ${d.type==="critical"?"critical":""}">
        <div style="font-size: 1.25rem;">⚠️</div>
        <div>
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${d.title}</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">${d.description}</p>
        </div>
      </div>
    `).join(""));const m=Object.values(e.domain_scores).map(d=>{const L=Math.round(d.earned_score/d.max_score*100);return`
      <div class="domain-progress-bar">
        <div class="bar-label">
          <span><strong>${d.domain_name}</strong> (${d.weight_pct}% Weight)</span>
          <span><strong>${d.earned_score}</strong> / ${d.max_score} Pts (${L}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${L}%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue));"></div>
        </div>
      </div>
    `}).join(""),k=e.question_time_records||[],M=k.map(d=>{if(!d)return"";const L=Math.round(d.activeDurationMs/1e3),I=d.responseLatencyMs?(d.responseLatencyMs/1e3).toFixed(1)+"s":"—",N=d.remainingTimeWhenAnsweredMs?Math.round(d.remainingTimeWhenAnsweredMs/1e3)+"s":"0s";let C='<span style="color:#10b981; font-weight:700;">🟢 Fast</span>';return d.timedOut?C='<span style="color:#ef4444; font-weight:700;">⏰ Timed Out</span>':L>80?C='<span style="color:#f59e0b; font-weight:700;">🔴 Slow</span>':L>45&&(C='<span style="color:#3b82f6; font-weight:700;">🟡 Normal</span>'),`
      <tr style="${d.timedOut?"background:rgba(239,68,68,0.08);":""} border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.85rem;">
        <td style="padding:0.6rem 0.8rem; font-weight:700; text-align:center;">Q${d.questionSlot}</td>
        <td style="padding:0.6rem 0.8rem;">
          <span style="font-size:0.75rem; background:rgba(6,182,212,0.15); color:var(--accent-cyan); padding:0.25rem 0.5rem; border-radius:6px;">
            ${d.domain.replace("_"," ")}
          </span>
        </td>
        <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary);">${d.subSkill}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${L}s</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${I}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${N}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${C}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${d.breaksDuringQuestion>0?`⏸️ ${d.breaksDuringQuestion}`:"0"}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center; font-weight:700;">${d.earnedScore} / ${d.maxScore}</td>
      </tr>
    `}).join(""),v=e.break_events||[];let T="";v.length>0?T=v.map(d=>{const L=Math.floor(d.breakDurationMs/6e4),I=Math.round(d.breakDurationMs%6e4/1e3),N=Math.round(d.countdownRemainingAtPause);return`
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); padding:0.75rem 1rem; border-radius:10px; margin-bottom:0.5rem; font-size:0.88rem;">
          <div>
            <strong>Break #${d.breakIndex}</strong> • During <strong>Q${d.questionSlotAtPause}</strong> (${d.domainAtPause.replace("_"," ")})
          </div>
          <div style="color:var(--accent-amber); font-weight:700;">
            Duration: ${L>0?`${L}m `:""}${I}s (Timer left: ${N}s)
          </div>
        </div>
      `}).join(""):T=`
      <div style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-emerald); color:var(--accent-emerald); padding:1rem; border-radius:10px; font-weight:600; text-align:center;">
        ✅ No breaks taken — Student completed all 60 questions continuously without pausing.
      </div>
    `;const y=Math.round((e.total_active_duration_ms||0)/6e4),P=Math.round((e.total_break_duration_ms||0)/6e4),_=Math.round((e.total_wall_clock_duration_ms||0)/6e4),c=k.filter(d=>d==null?void 0:d.timedOut).length;E.innerHTML=`
    <div class="glass-card" style="padding: 2.5rem; max-width:1150px; margin:0 auto;">
      
      <!-- Top Action Controls -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem; flex-wrap:wrap; gap:0.75rem;">
        <span style="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald); padding: 0.35rem 1rem; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">
          ✅ 60-Question SEN Assessment Complete
        </span>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap;" class="report-action-btns">
          <button id="download-pdf-btn" class="btn btn-primary" style="font-size:0.85rem; background: linear-gradient(135deg, #8b5cf6, #ec4899); box-shadow: 0 4px 15px rgba(139,92,246,0.4);">
            📄 Download PDF Report
          </button>
          <button id="download-csv-btn" class="btn btn-secondary" style="font-size:0.85rem;">
            📊 Export CSV (CEO Report)
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
          
          <div class="score-circle" style="--score-pct: ${n};">
            <span class="score-text">${n}</span>
          </div>

          <div style="font-size: 0.85rem; color: var(--text-secondary);">Recommended Level & Track</div>
          <div class="track-title">${a}</div>

          <div style="margin-top: 1.5rem; width: 100%; border-top: 1px solid var(--border-color); padding-top: 1rem; text-align: left; font-size: 0.85rem; color: var(--text-secondary);">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Accuracy:</span> <strong>${s.overallAccuracy}%</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Total Active Time:</span> <strong>${y} min</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
              <span>Total Breaks Taken:</span> <strong>${e.total_breaks_count||0} (${P} min)</strong>
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
          
          ${m}

          ${l}
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
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-cyan); margin-top:0.25rem;">${y} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Actual task engagement</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Pause / Break Time</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-amber); margin-top:0.25rem;">${P} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">${e.total_breaks_count||0} breaks recorded</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Wall Clock Duration</div>
            <div style="font-size:1.8rem; font-weight:800; color:#fff; margin-top:0.25rem;">${_} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Total session length</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">On-Task Focus Ratio</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-emerald); margin-top:0.25rem;">
              ${_>0?Math.round(y/_*100):100}%
            </div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Active vs total time</div>
          </div>
        </div>

        <!-- Section C: Break Log -->
        <div style="margin-bottom:2.5rem;">
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-bottom:1rem;">
            ⏸️ Break & Pause Log
          </h4>
          ${T}
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
                ${M}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Qualitative AI Summary -->
        <div style="margin-top: 2rem; background: rgba(15, 23, 42, 0.6); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem;" class="summary-md">
          ${e.qualitative_summary?Ee(e.qualitative_summary):""}
        </div>
      </div>

      <div style="margin-top: 2.5rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <button class="btn btn-primary" id="restart-btn" style="margin: 0 auto;">
          🔄 Retake Placement Assessment
        </button>
      </div>
    </div>
  `;const g=E.querySelector("#restart-btn");g&&g.addEventListener("click",()=>{window.location.reload()});const O=E.querySelector("#print-report-btn");O&&O.addEventListener("click",()=>window.print());const Q=E.querySelector("#download-pdf-btn");Q&&Q.addEventListener("click",()=>Ce(e));const D=E.querySelector("#download-csv-btn");D&&D.addEventListener("click",()=>{$e(e)})}function Ce(E){document.body.classList.add("printing-report");const e=document.createElement("style");e.id="cognix-print-style",e.innerHTML=`
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
  `,document.head.appendChild(e);const o=document.title;document.title=`Cognix_Report_${E.student_name.replace(/\s+/g,"_")}_${new Date().toISOString().split("T")[0]}`,window.print(),setTimeout(()=>{document.body.classList.remove("printing-report");const n=document.getElementById("cognix-print-style");n&&n.remove(),document.title=o},2e3)}function $e(E){const e=E.question_time_records||[];let o=`Slot,Domain,SubSkill,QuestionTitle,ActiveTimeSec,ResponseLatencySec,TimerRemainingSec,Status,TimedOut,Breaks,EarnedPoints,MaxPoints
`;e.forEach(s=>{if(!s)return;const l=(s.activeDurationMs/1e3).toFixed(1),m=s.responseLatencyMs?(s.responseLatencyMs/1e3).toFixed(1):"",k=s.remainingTimeWhenAnsweredMs?(s.remainingTimeWhenAnsweredMs/1e3).toFixed(1):"0",M=s.timedOut?"TIMED_OUT":s.activeDurationMs>8e4?"SLOW":s.activeDurationMs>45e3?"NORMAL":"FAST";o+=`${s.questionSlot},"${s.domain}","${s.subSkill}","${s.questionTitle.replace(/"/g,'""')}",${l},${m},${k},${M},${s.timedOut},${s.breaksDuringQuestion},${s.earnedScore},${s.maxScore}
`});const n=new Blob([o],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),r=document.createElement("a");r.setAttribute("href",a),r.setAttribute("download",`Cognix_CEO_Assessment_Time_Report_${E.student_name.replace(/\s+/g,"_")}.csv`),r.click()}function Ee(E){return E.replace(/^### (.*$)/gim,'<h3 style="color:var(--text-primary); font-size:1.05rem; margin-top:1rem; margin-bottom:0.4rem;">$1</h3>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/^> (.*$)/gim,'<blockquote style="border-left:3px solid var(--accent-cyan); padding-left:0.8rem; margin:0.8rem 0; color:var(--accent-cyan); font-size:0.9rem;">$1</blockquote>')}const F=class F{constructor(e){this.studentName="Alex Rivers",this.cachedActivities=new Array(60).fill(null),this.userAnswers=[],this.questionTimeRecords=[],this.breakEvents=[],this.currentQuestionIndex=0,this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.itemStartTimestamp=0,this.itemFirstInteractionTimestamp=null,this.currentPauseStartTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,this.isPaused=!1,this.globalTimerInterval=null,this.questionTimerInterval=null,this.loadGen=0,this.isLoadingNextQuestion=!1,this.beforeUnloadHandler=()=>{this.saveSession(this.studentName)},this.container=e,this.generator=new Te,this.analyzer=new Pe,this.initUserAnswers()}static getSavedSession(){try{const e=localStorage.getItem(F.STORAGE_KEY);if(!e)return null;const o=JSON.parse(e);return o&&Array.isArray(o.userAnswers)&&o.userAnswers.length===60?o:null}catch{return null}}static clearSavedSession(){try{localStorage.removeItem(F.STORAGE_KEY)}catch{}}saveSession(e=this.studentName){try{this.studentName=e;const o={studentName:e,currentQuestionIndex:this.currentQuestionIndex,totalTimerSeconds:this.totalTimerSeconds,currentQuestionRemainingSeconds:this.questionTimerSecondsRemaining,isPaused:this.isPaused,cachedActivities:this.cachedActivities,userAnswers:this.userAnswers,questionTimeRecords:this.questionTimeRecords,breakEvents:this.breakEvents,savedAt:Date.now()};localStorage.setItem(F.STORAGE_KEY,JSON.stringify(o))}catch{}}attachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler),window.addEventListener("beforeunload",this.beforeUnloadHandler)}detachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler)}initUserAnswers(){this.userAnswers=new Array(60).fill(null).map(()=>({selectedAnswerIndex:null,robotSequence:[],motorClicks:[],attemptsCount:0,hintsUsed:0,timeSpentMs:0,isSolved:!1,timedOut:!1,answeredAt:null,responseLatencyMs:null,remainingTimeWhenAnsweredMs:null,breaksDuringQuestion:0})),this.questionTimeRecords=[],this.breakEvents=[]}async startSession(e="Alex Rivers",o=!0){this.studentName=e;const n=o?F.getSavedSession():null;n?(this.currentQuestionIndex=Math.max(0,Math.min(59,n.currentQuestionIndex||0)),this.cachedActivities=n.cachedActivities||new Array(60).fill(null),this.userAnswers=n.userAnswers,this.questionTimeRecords=n.questionTimeRecords||[],this.breakEvents=n.breakEvents||[],this.totalTimerSeconds=n.totalTimerSeconds||0,this.questionTimerSecondsRemaining=n.currentQuestionRemainingSeconds||F.QUESTION_TIME_LIMIT_SEC,this.isPaused=n.isPaused||!1,this.startGlobalTimer(this.totalTimerSeconds),this.attachBeforeUnload(),this.isPaused?(await this.loadQuestion(this.currentQuestionIndex,!1),this.pauseAssessment()):await this.loadQuestion(this.currentQuestionIndex,!1)):(this.currentQuestionIndex=0,this.cachedActivities=new Array(60).fill(null),this.initUserAnswers(),this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.isPaused=!1,this.startGlobalTimer(0),this.attachBeforeUnload(),this.saveSession(e),await this.loadQuestion(0,!0))}startGlobalTimer(e=0){this.totalTimerSeconds=e,this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.globalTimerInterval=setInterval(()=>{if(!this.isPaused){this.totalTimerSeconds++,this.totalTimerSeconds%3===0&&this.saveSession(this.studentName);const o=document.getElementById("global-timer");if(o){const n=String(Math.floor(this.totalTimerSeconds/60)).padStart(2,"0"),a=String(this.totalTimerSeconds%60).padStart(2,"0");o.textContent=`${n}:${a}`}}},1e3)}startQuestionTimer(){this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.questionTimerInterval=setInterval(()=>{this.isPaused||(this.questionTimerSecondsRemaining--,this.updateQuestionTimerUI(),this.questionTimerSecondsRemaining<=0&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null,this.handleQuestionTimeout()))},1e3)}updateQuestionTimerUI(){const e=document.getElementById("question-timer-display"),o=document.getElementById("question-timer-ring");if(e){const n=Math.floor(this.questionTimerSecondsRemaining/60),a=String(this.questionTimerSecondsRemaining%60).padStart(2,"0");e.textContent=`${n}:${a}`,this.questionTimerSecondsRemaining<=15?e.style.color="#ef4444":e.style.color="var(--accent-cyan)"}if(o){const n=this.questionTimerSecondsRemaining/F.QUESTION_TIME_LIMIT_SEC*100;o.style.width=`${n}%`}}async loadQuestion(e,o=!0){if(e<0||e>=60)return;const n=++this.loadGen;this.currentQuestionIndex=e;const a=H[e];this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),o&&(this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC),this.itemFirstInteractionTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,!(!this.cachedActivities[e]&&(this.renderLoadingState(e),this.cachedActivities[e]=await this.generator.generateActivity(a.slot),n!==this.loadGen))&&(this.isLoadingNextQuestion=!1,this.itemStartTimestamp=Date.now(),this.saveSession(this.studentName),this.render(),this.isPaused||this.startQuestionTimer(),this.prefetchNextQuestion(e+1))}renderLoadingState(e){const o=H[e],n=ee[o.domain],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
        <div style="text-align: center; padding: 3rem 1rem; color: var(--accent-cyan);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.2s infinite ease-in-out;">⚡</div>
          <h3 style="font-size: 1.2rem; font-weight: 700;">Preparing Question ${o.slot} of 60...</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">${n.name} • ${o.subSkill}</p>
        </div>
      `)}async prefetchNextQuestion(e){if(e>=0&&e<60&&!this.cachedActivities[e]){const o=H[e];this.generator.generateActivity(o.slot).then(n=>{this.cachedActivities[e]=n}).catch(()=>{})}}pauseAssessment(){if(this.isPaused)return;this.isPaused=!0,this.currentPauseStartTimestamp=Date.now();const e=this.userAnswers[this.currentQuestionIndex];e&&e.breaksDuringQuestion++;const o=document.getElementById("pause-overlay");o&&(o.style.display="flex"),this.saveSession(this.studentName)}resumeAssessment(){if(!this.isPaused)return;const e=Date.now();if(this.currentPauseStartTimestamp){const n=e-this.currentPauseStartTimestamp;this.pauseDurationForCurrentQuestionMs+=n;const a=H[this.currentQuestionIndex];this.breakEvents.push({breakIndex:this.breakEvents.length+1,questionSlotAtPause:this.currentQuestionIndex+1,domainAtPause:a.domain,pauseStartTimestamp:this.currentPauseStartTimestamp,resumeTimestamp:e,breakDurationMs:n,countdownRemainingAtPause:this.questionTimerSecondsRemaining})}this.isPaused=!1,this.currentPauseStartTimestamp=null;const o=document.getElementById("pause-overlay");o&&(o.style.display="none"),this.startQuestionTimer(),this.saveSession(this.studentName)}handleQuestionTimeout(){const e=this.userAnswers[this.currentQuestionIndex];e.timedOut=!0,e.isSolved=!1,this.recordQuestionTimeData(!1),this.advanceToNextQuestion()}recordQuestionTimeData(e){const o=Date.now(),n=this.userAnswers[this.currentQuestionIndex],a=H[this.currentQuestionIndex],r=this.cachedActivities[this.currentQuestionIndex],s=o-this.itemStartTimestamp,l=Math.max(1e3,s-this.pauseDurationForCurrentQuestionMs);n.timeSpentMs+=l;const m={questionSlot:a.slot,domain:a.domain,subSkill:a.subSkill,questionTitle:(r==null?void 0:r.title)||a.title,questionStartTimestamp:this.itemStartTimestamp,questionEndTimestamp:o,totalDurationMs:s,pausedDurationMs:this.pauseDurationForCurrentQuestionMs,activeDurationMs:l,responseLatencyMs:n.responseLatencyMs,answeredAt:n.answeredAt,timedOut:n.timedOut,wasAnswered:e,remainingTimeWhenAnsweredMs:n.remainingTimeWhenAnsweredMs,breaksDuringQuestion:n.breaksDuringQuestion,earnedScore:0,maxScore:a.maxPoints};this.questionTimeRecords[this.currentQuestionIndex]=m}advanceToNextQuestion(){if(this.isLoadingNextQuestion=!0,this.questionTimerInterval&&(clearInterval(this.questionTimerInterval),this.questionTimerInterval=null),this.currentQuestionIndex<59){const e=H[this.currentQuestionIndex].domain,o=H[this.currentQuestionIndex+1].domain;e!==o?this.showDomainTransitionBanner(o,()=>{this.loadQuestion(this.currentQuestionIndex+1,!0)}):this.loadQuestion(this.currentQuestionIndex+1,!0)}else this.isLoadingNextQuestion=!1,this.completeAssessment()}showDomainTransitionBanner(e,o){const n=ee[e],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--accent-cyan); animation: fadeIn 0.4s ease;">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">🎉</div>
          <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff;">Domain Completed!</h2>
          <p style="font-size: 1rem; color: var(--text-secondary); margin-top: 0.5rem; margin-bottom: 1.5rem;">
            Great job! Moving to <strong>${n.name}</strong> (${n.questionCount} Questions)...
          </p>
          <div style="display:inline-block; padding: 0.6rem 1.5rem; background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue)); color: #fff; font-weight: 700; border-radius: 12px;">
            Starting Domain...
          </div>
        </div>
      `),setTimeout(o,2200)}render(){const e=this.cachedActivities[this.currentQuestionIndex];if(!e)return;const o=H[this.currentQuestionIndex],n=ee[o.domain],a=this.userAnswers[this.currentQuestionIndex],r=this.currentQuestionIndex>0?this.currentQuestionIndex-1:-1;let s=`
      <div class="question-grid-bar">
        <div class="grid-header">
          <span><strong>🐸 Frog Jump Progress</strong> — Question <strong>${o.slot}</strong> of 60</span>
          <span>Done: <strong>${this.userAnswers.filter(l=>l.isSolved||l.timedOut).length}</strong> / 60</span>
        </div>
        <div class="lily-pads-matrix">
    `;for(let l=0;l<60;l++){const m=l===this.currentQuestionIndex,k=this.userAnswers[l].isSolved,M=this.userAnswers[l].timedOut,v=l<this.currentQuestionIndex,T=l===r;let y="lily-pad";m?y+=" active-pad frog-land":k?y+=" solved-pad":M?y+=" timed-out-pad":T?y+=" just-left-pad":v?y+=" past-pad":y+=" locked-pad";let P=`${l+1}`;m?P="🐸":k?P="✓":M&&(P="⏰"),s+=`
        <div class="${y}" title="Q${l+1}">${P}</div>
      `}s+="</div></div>",this.container.innerHTML=`
      ${s}

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
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <span class="activity-domain-badge">${n.name}</span>
              <span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); background:rgba(255,255,255,0.06); padding:0.25rem 0.6rem; border-radius:8px;">
                ${o.subSkill} • ${o.maxPoints} Pt${o.maxPoints>1?"s":""}
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
    `,this.attachEventListeners()}renderPlaygroundContent(e,o){const n=e.payload||{};if(e.type==="robot_mission"||Array.isArray(n.availableBlocks))return`
        <div class="robot-mission-container">
          <div>
            <h4 style="margin-bottom:0.5rem; font-size:0.9rem; color:var(--text-secondary);">Available Actions:</h4>
            <div class="blocks-palette">
              ${(n.availableBlocks||["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"]).map(l=>`
                <button class="code-block" data-block="${l}">+ ${l}</button>
              `).join("")}
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h4 style="font-size:0.9rem; color:var(--text-secondary); margin:0;">Sequence (${o.robotSequence.length} steps):</h4>
              ${o.robotSequence.length>0?`
                <button id="clear-sequence-btn" style="font-size:0.75rem; color:var(--accent-amber); background:rgba(245,158,11,0.1); border:1px solid var(--accent-amber); padding:0.25rem 0.6rem; border-radius:6px; cursor:pointer;">🗑️ Clear</button>
              `:""}
            </div>
            <div class="sequence-dropzone" id="sequence-box">
              ${o.robotSequence.length===0?'<span style="color:var(--text-secondary); font-size:0.85rem;">Click blocks on left to build sequence...</span>':o.robotSequence.map((l,m)=>`
                <div class="sequence-step" style="background:var(--accent-blue); padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                  <span>📌 ${m+1}. ${l}</span>
                  <button class="remove-block-btn" data-idx="${m}" style="background:rgba(0,0,0,0.25); border:none; color:#fff; width:20px; height:20px; border-radius:50%; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">×</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;if(e.type==="picture_match"){const s=n.audioPromptText||e.instructions||"Select the matching item",l=n.options&&n.options.length>0?n.options:[{label:"Option A",emoji:"🤖"},{label:"Option B",emoji:"🍎"},{label:"Option C",emoji:"⚽"}];return`
        <div style="margin-bottom: 1.25rem; font-size:1.1rem; color:var(--accent-cyan); font-weight:600; text-align:center; background:rgba(6,182,212,0.08); border:1px solid rgba(6,182,212,0.2); border-radius:10px; padding:0.75rem 1rem;">
          🔊 "${s}"
        </div>
        <div class="options-grid-3">
          ${l.slice(0,3).map((m,k)=>{const M=typeof m=="string"?m:m.label||`Option ${k+1}`,v=typeof m=="object"&&m.emoji?m.emoji:["🤖","🍎","⚽"][k]||"🎯";return`
              <button class="option-btn-3 ${o.selectedAnswerIndex===k?"selected":""}" data-opt="${k}">
                <span style="font-size: 2.2rem;">${v}</span>
                <span style="font-size: 0.95rem;">${M}</span>
              </button>
            `}).join("")}
        </div>
      `}if(e.type==="motor_target"){const s=n.targetsCount||3,l=o.motorClicks.length>=s;return`
        <div class="motor-canvas-container" id="motor-canvas">
          ${l?"":'<div class="motor-target" id="target-element" style="top: 80px; left: 240px;"></div>'}
          <div style="position:absolute; bottom:10px; left:15px; font-size:0.85rem; color:var(--text-secondary);">
            Targets Clicked: ${o.motorClicks.length} / ${s}
            ${l?" ✅ All targets hit!":""}
          </div>
        </div>
      `}const a=Array.isArray(n.options)&&n.options.length>0?n.options.slice(0,3):[{label:"Choice A"},{label:"Choice B"},{label:"Choice C"}],r=Array.isArray(n.sequence)?n.sequence:null;return`
      ${r?`
        <div style="font-size: 2.2rem; display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); padding: 1rem 1.5rem; border-radius: 12px; justify-content: center; flex-wrap: wrap;">
          ${r.map(s=>`<span>${s}</span>`).join("")}
        </div>
      `:""}
      <div class="options-grid-3">
        ${a.map((s,l)=>{const m=typeof s=="string"?s:s.label||s.text||JSON.stringify(s);return`
            <button class="option-btn-3 ${o.selectedAnswerIndex===l?"selected":""}" data-opt="${l}">
              <span>${m}</span>
            </button>
          `}).join("")}
      </div>
    `}registerInteraction(){if(!this.itemFirstInteractionTimestamp){this.itemFirstInteractionTimestamp=Date.now();const e=this.userAnswers[this.currentQuestionIndex];e&&(e.responseLatencyMs=Math.max(100,this.itemFirstInteractionTimestamp-this.itemStartTimestamp-this.pauseDurationForCurrentQuestionMs))}}attachEventListeners(){const e=this.userAnswers[this.currentQuestionIndex];this.container.querySelectorAll(".option-btn-3").forEach(v=>{v.addEventListener("click",T=>{this.registerInteraction();const y=T.currentTarget,P=parseInt(y.getAttribute("data-opt")||"0",10);e.selectedAnswerIndex=P,e.isSolved=!0,e.answeredAt=Date.now(),e.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3,e.attemptsCount=Math.max(1,e.attemptsCount+1),this.render()})}),this.container.querySelectorAll(".code-block").forEach(v=>{v.addEventListener("click",T=>{this.registerInteraction();const P=T.currentTarget.getAttribute("data-block");P&&(e.robotSequence.push(P),e.isSolved=e.robotSequence.length>0,e.answeredAt=Date.now(),e.attemptsCount=Math.max(1,e.attemptsCount+1),this.render())})}),this.container.querySelectorAll(".remove-block-btn").forEach(v=>{v.addEventListener("click",T=>{T.stopPropagation();const y=T.currentTarget,P=parseInt(y.getAttribute("data-idx")||"0",10);e.robotSequence.splice(P,1),e.isSolved=e.robotSequence.length>0,this.render()})});const r=this.container.querySelector("#clear-sequence-btn");r&&r.addEventListener("click",()=>{e.robotSequence=[],e.isSolved=!1,this.render()});const s=this.container.querySelector("#target-element"),l=this.container.querySelector("#motor-canvas");s&&l&&s.addEventListener("click",v=>{var D,d;this.registerInteraction();const T=s.getBoundingClientRect(),y=v.clientX-T.left,P=v.clientY-T.top,_=Math.sqrt(Math.pow(y-T.width/2,2)+Math.pow(P-T.height/2,2));e.motorClicks.push({x:y,y:P,dist:_}),e.attemptsCount=Math.max(1,e.attemptsCount+1);const c=l.getBoundingClientRect(),g=Math.floor(Math.random()*(c.height-70)),O=Math.floor(Math.random()*(c.width-70));s.style.top=`${g}px`,s.style.left=`${O}px`;const Q=((d=(D=this.cachedActivities[this.currentQuestionIndex])==null?void 0:D.payload)==null?void 0:d.targetsCount)||3;e.motorClicks.length>=Q&&(e.selectedAnswerIndex=0,e.isSolved=!0,e.answeredAt=Date.now(),e.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3),this.render()});const m=this.container.querySelector("#pause-btn");m&&m.addEventListener("click",()=>this.pauseAssessment());const k=this.container.querySelector("#resume-btn");k&&k.addEventListener("click",()=>this.resumeAssessment());const M=this.container.querySelector("#submit-answer-btn");M&&M.addEventListener("click",()=>{this.isLoadingNextQuestion||(this.recordQuestionTimeData(e.isSolved),this.advanceToNextQuestion())})}showCompletionLoadingScreen(){this.container.innerHTML=`
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
    `}async completeAssessment(){var T,y,P,_;this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.questionTimerInterval&&clearInterval(this.questionTimerInterval),this.detachBeforeUnload(),F.clearSavedSession(),this.showCompletionLoadingScreen();const e=[],o={};for(let c=0;c<60;c++){const g=this.cachedActivities[c],O=this.userAnswers[c],Q=H[c];if(!g)continue;let D=!1,d=0;if(g.type==="robot_mission"||Array.isArray((T=g.payload)==null?void 0:T.availableBlocks)){const L=((y=g.payload)==null?void 0:y.correctSequence)||[];let I=0;O.robotSequence.forEach((N,C)=>{L[C]===N&&I++}),d=L.length>0?I/L.length:O.robotSequence.length>0?1:0,D=d>=.8}else g.type==="motor_target"?(D=O.motorClicks.length>0,d=Math.min(1,O.motorClicks.length/(((P=g.payload)==null?void 0:P.targetsCount)||3))):(D=O.selectedAnswerIndex===(((_=g.payload)==null?void 0:_.correctIndex)??0),d=D?1:0);o[g.id]=Q.maxPoints,e.push({item_id:g.id,domain:g.domain,skill:g.skill,difficulty_level:g.difficulty,is_correct:D,accuracy_score:d,response_time_ms:Math.max(1e3,O.timeSpentMs),expected_time_ms:9e4,attempts_count:Math.max(1,O.attemptsCount),hints_used:O.hintsUsed}),this.questionTimeRecords[c]&&(this.questionTimeRecords[c].earnedScore=ne.calculateItemScore(e[c],Q.maxPoints))}const n=ne.calculateDomainScores(e,o),a=ne.calculateTotalScore(n),r=Me.evaluatePlacement(a,n,e),s=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],l={};s.forEach(c=>{const g=this.questionTimeRecords.filter(I=>I&&I.domain===c),O=g.reduce((I,N)=>I+(N.activeDurationMs||0),0),Q=g.reduce((I,N)=>I+(N.pausedDurationMs||0),0),D=g.filter(I=>I.timedOut).length,d=g.map(I=>I.responseLatencyMs).filter(I=>I!==null),L=d.length>0?Math.round(d.reduce((I,N)=>I+N,0)/d.length):0;l[c]={totalActiveMs:O,totalPausedMs:Q,questionsTimedOut:D,avgResponseLatencyMs:L}});const m=this.questionTimeRecords.reduce((c,g)=>c+((g==null?void 0:g.activeDurationMs)||0),0),k=this.breakEvents.reduce((c,g)=>c+g.breakDurationMs,0),M={session_id:`sess_60_${Date.now()}`,student_name:this.studentName||"Alex Rivers",age_group:"7-9",start_time:new Date(Date.now()-this.totalTimerSeconds*1e3).toISOString(),end_time:new Date().toISOString(),item_telemetries:e,domain_scores:n,total_score:a,placed_track:r.baseTrack,recommended_track:r.recommendedTrack,flags:r.flags.map(c=>c.id),question_time_records:this.questionTimeRecords,break_events:this.breakEvents,total_breaks_count:this.breakEvents.length,total_break_duration_ms:k,total_active_duration_ms:m,total_wall_clock_duration_ms:m+k,domain_time_summary:l},v=await this.analyzer.generateReportSummary(M,r);M.qualitative_summary=v,Ae(this.container,M,r)}};F.STORAGE_KEY="cognix_active_assessment_session",F.QUESTION_TIME_LIMIT_SEC=90;let X=F,ue=null;function oe(E="Alex Rivers",e=!0){const o=document.getElementById("app");o&&(ue=new X(o),ue.startSession(E,e))}function Re(){X.clearSavedSession()}window.initAssessment=oe;window.exitAssessment=Re;document.addEventListener("DOMContentLoaded",()=>{const E=document.getElementById("app"),e=document.getElementById("childTestPage"),o=X.getSavedSession();o&&e?(document.body.classList.add("exam-mode"),e.classList.remove("hidden"),e.classList.add("exam-active"),window.scrollTo(0,0),oe(o.studentName||"Alex Rivers",!0)):E&&!e&&oe("Alex Rivers",!1)});

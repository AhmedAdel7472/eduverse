(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();class pe{constructor(){this.endpoint="",this.apiKey="",this.model="o4-mini",this.endpoint="https://ah30309142502238-8748-resource.services.ai.azure.com/openai/v1/responses";const t="NVFhTWxHZHd4Qzg1bnkzeVdLMG1GMHd2R2hMQnhFRUxkQkh2RkNhWkFSSVhiN2ZjNXpMR0pRUUo5OUNGQUNmaE1rNVhKM3czQUFBQUFDT0c4WFhP";try{this.apiKey=typeof atob=="function"?atob(t):t}catch{this.apiKey=t}}async generateCompletion(t,o="You are an expert AI Assessment System."){var r,s,l;if(!this.apiKey)return console.warn("[CognixAI] ❌ No API key configured — using fallback generator."),null;const n={model:this.model,input:`${o}

User Prompt: ${t}`},a=[this.endpoint,"/api/openai-proxy"];for(const d of a){const _=`req_${Date.now()}_${Math.floor(Math.random()*1e3)}`;console.group(`[CognixAI] 🔷 Azure OpenAI Request [${_}]`),console.log("📤 Endpoint:",d),console.log("📤 Model:",this.model),console.log("📤 Prompt (first 200 chars):",t.substring(0,200)+(t.length>200?"...":"")),console.log("📤 Full payload:",JSON.stringify(n,null,2));const M=performance.now();try{const v=new AbortController,T=setTimeout(()=>{console.warn(`[CognixAI] ⏰ Request [${_}] timed out after 10s`),v.abort()},1e4),y=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json","api-key":this.apiKey},body:JSON.stringify(n),signal:v.signal});clearTimeout(T);const P=Math.round(performance.now()-M);if(console.log(`📥 Response Status: ${y.status} ${y.statusText} (${P}ms)`),y.ok){const k=await y.json();if(console.log("📥 Response Body:",JSON.stringify(k,null,2)),k.output&&Array.isArray(k.output)){for(const c of k.output)if(c.type==="message"&&Array.isArray(c.content)){for(const g of c.content)if(g.type==="output_text"&&g.text)return console.log("✅ Extracted text from output_text:",g.text.substring(0,100)),console.groupEnd(),g.text}}if((l=(s=(r=k.choices)==null?void 0:r[0])==null?void 0:s.message)!=null&&l.content)return console.log("✅ Extracted text from choices:",k.choices[0].message.content.substring(0,100)),console.groupEnd(),k.choices[0].message.content;console.warn("[CognixAI] ⚠️ Response OK but could not extract text from response body.")}else{const k=await y.text().catch(()=>"");console.error(`[CognixAI] ❌ HTTP Error ${y.status}:`,k)}}catch(v){const T=Math.round(performance.now()-M);(v==null?void 0:v.name)==="AbortError"?console.error(`[CognixAI] ❌ Request aborted (timeout) after ${T}ms`):console.error(`[CognixAI] ❌ Network/fetch error after ${T}ms:`,(v==null?void 0:v.message)||v)}console.log("[CognixAI] 🔄 Trying next endpoint or falling back..."),console.groupEnd()}return console.warn("[CognixAI] ⚠️ All endpoints failed — using procedural fallback generator."),null}}const W=[{slot:1,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Match Identical Shapes",baselinePrompt:"Match the identical shapes.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:2,domain:"cognitive_ability",skill:"classification",subSkill:"Visual Discrimination",title:"Spot the Difference",baselinePrompt:"Identify the object that is different.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:3,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Visual Discrimination",title:"Match the Pattern",baselinePrompt:"Match the same visual pattern.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:4,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Group Together",baselinePrompt:"Which objects belong together in the same group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:5,domain:"cognitive_ability",skill:"classification",subSkill:"Classification",title:"Does Not Belong",baselinePrompt:"Which object does not belong in this group?",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:6,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Next in Sequence",baselinePrompt:"What comes next in the sequence?",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:7,domain:"cognitive_ability",skill:"sequencing",subSkill:"Sequencing",title:"Order the Story",baselinePrompt:"Arrange the pictures in the correct logical order.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:8,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Complete Visual Pattern",baselinePrompt:"Complete the visual pattern.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:9,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Identify Missing Element",baselinePrompt:"Identify the missing element in the grid.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:10,domain:"cognitive_ability",skill:"pattern_recognition",subSkill:"Pattern Recognition",title:"Continue Pattern",baselinePrompt:"Continue the pattern to the next step.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:11,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"Solve the Problem",baselinePrompt:"Which answer solves the logical problem?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:12,domain:"cognitive_ability",skill:"logical_reasoning",subSkill:"Logical Reasoning",title:"What Happens Next",baselinePrompt:"What should logically happen next?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:13,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Best Solution",baselinePrompt:"Select the best solution for this situation.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:14,domain:"cognitive_ability",skill:"problem_solving",subSkill:"Problem Solving",title:"Sequence to Solve",baselinePrompt:"Identify the correct sequence of actions to solve the problem.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:15,domain:"cognitive_ability",skill:"cause_and_effect",subSkill:"Cause & Effect",title:"Predict Cause & Effect",baselinePrompt:"What will happen if this action is performed?",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:16,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Follow Simple Instruction",baselinePrompt:"Follow a simple 1-step instruction.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:17,domain:"functional_skills",skill:"following_instructions",subSkill:"1-Step Instruction",title:"Independent Instruction",baselinePrompt:"Complete a second independent 1-step action.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:18,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Two-Step Action",baselinePrompt:"Complete two actions in the correct order.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:19,domain:"functional_skills",skill:"following_instructions",subSkill:"2-Step Instruction",title:"Direct Execution",baselinePrompt:"Complete the task smoothly without repeating steps.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:20,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Three-Step Activity",baselinePrompt:"Complete a 3-step structured activity.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:21,domain:"functional_skills",skill:"following_instructions",subSkill:"Multi-Step Task",title:"Sequential Workflow",baselinePrompt:"Complete the activity in the exact correct sequence.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:22,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Finish Structured Task",baselinePrompt:"Start and finish the structured robotics task.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:23,domain:"functional_skills",skill:"task_completion",subSkill:"Task Completion",title:"Minimal Prompt Task",baselinePrompt:"Complete the goal with minimal visual prompting.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:24,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Organize Tools",baselinePrompt:"Organize the programming blocks before beginning.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:25,domain:"functional_skills",skill:"working_memory",subSkill:"Organization",title:"Return Materials",baselinePrompt:"Return all unused blocks to their correct place.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:26,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Independent Task",baselinePrompt:"Complete the familiar coding mission independently.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:27,domain:"functional_skills",skill:"problem_solving",subSkill:"Independence",title:"Ask for Help",baselinePrompt:"Identify when and how to request assistance appropriately.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:28,domain:"functional_skills",skill:"problem_solving",subSkill:"Functional Problem Solving",title:"Overcome Blockade",baselinePrompt:"Identify what to do when a path cannot be completed.",maxPoints:2,difficulty:3,type:"robot_mission"},{slot:29,domain:"functional_skills",skill:"attention",subSkill:"Learning Routine",title:"Learning Routine",baselinePrompt:"Follow the expected technology learning routine.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:30,domain:"functional_skills",skill:"task_completion",subSkill:"Functional Learning",title:"Practical Learning Task",baselinePrompt:"Complete a simple practical digital learning task.",maxPoints:1,difficulty:2,type:"robot_mission"},{slot:31,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Listen & Follow",baselinePrompt:"Follow a spoken audio instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:32,domain:"communication_level",skill:"listening",subSkill:"Receptive Communication",title:"Identify Object",baselinePrompt:"Identify the requested target object from audio prompt.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:33,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Name Component",baselinePrompt:"Select the correct name for the highlighted technology item.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:34,domain:"communication_level",skill:"vocabulary",subSkill:"Expressive Communication",title:"Express Choice",baselinePrompt:"Communicate the correct preference or action needed.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:35,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Two-Step Audio",baselinePrompt:"Follow a 2-step audio communication instruction.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:36,domain:"communication_level",skill:"understanding_instructions",subSkill:"Following Instructions",title:"Classroom Tech Instruction",baselinePrompt:"Follow a functional technology classroom command.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:37,domain:"communication_level",skill:"picture_matching",subSkill:"Identification",title:"Identify Digital Icon",baselinePrompt:"Identify the matching digital icon or symbol.",maxPoints:2,difficulty:1,type:"picture_match"},{slot:38,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Question Response",title:"Answer WH-Question",baselinePrompt:'Answer the question: "Which tool helps robots move?"',maxPoints:2,difficulty:3,type:"picture_match"},{slot:39,domain:"communication_level",skill:"verbal_comprehension",subSkill:"Functional Communication",title:"Request Clarification",baselinePrompt:"Choose the symbol used to request help or clarification.",maxPoints:2,difficulty:2,type:"picture_match"},{slot:40,domain:"communication_level",skill:"understanding_instructions",subSkill:"Problem Solving Communication",title:"Communicate Solution",baselinePrompt:"Communicate the correct solution choice to the team.",maxPoints:2,difficulty:3,type:"picture_match"},{slot:41,domain:"behavioral_readiness",skill:"persistence",subSkill:"Attention",title:"Sustain Attention",baselinePrompt:"Maintains focus when a puzzle takes longer to solve.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:42,domain:"behavioral_readiness",skill:"persistence",subSkill:"Task Engagement",title:"Remain Engaged",baselinePrompt:"Remains engaged in the learning activity despite distractions.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:43,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Instruction Following",title:"Responds to Signals",baselinePrompt:"Responds promptly when given a stop or transition instruction.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:44,domain:"behavioral_readiness",skill:"error_recovery",subSkill:"Response to Correction",title:"Accept Redirection",baselinePrompt:"Accepts gentle feedback and adjusts the approach calmly.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:45,domain:"behavioral_readiness",skill:"flexibility",subSkill:"Frustration Tolerance",title:"Persevere on Error",baselinePrompt:"Continues trying calmly after an initial error or bug.",maxPoints:2,difficulty:3,type:"pattern_matrix"},{slot:46,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Transition",title:"Smooth Transition",baselinePrompt:"Moves smoothly from one activity to the next when time is up.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:47,domain:"behavioral_readiness",skill:"adaptability",subSkill:"Turn Taking / Waiting",title:"Wait Appropriately",baselinePrompt:"Waits patiently while another student or robot finishes their turn.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:48,domain:"behavioral_readiness",skill:"persistence",subSkill:"Motivation",title:"Eager to Learn",baselinePrompt:"Demonstrates willingness to try a new technology challenge.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:49,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Independence",title:"Independent Effort",baselinePrompt:"Attempts the problem independently before asking for help.",maxPoints:1,difficulty:2,type:"pattern_matrix"},{slot:50,domain:"behavioral_readiness",skill:"response_to_feedback",subSkill:"Help Seeking",title:"Polite Help Request",baselinePrompt:"Requests assistance politely and appropriately when stuck.",maxPoints:1,difficulty:1,type:"pattern_matrix"},{slot:51,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Fine Motor Control",title:"Object Precision",baselinePrompt:"Tap or manipulate small digital targets with precision.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:52,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Hand-Eye Coordination",title:"Accurate Movement",baselinePrompt:"Move pointer accurately to the target element.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:53,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Object Manipulation",title:"Assemble Structure",baselinePrompt:"Drag blocks to assemble a simple structure.",maxPoints:2,difficulty:2,type:"robot_mission"},{slot:54,domain:"fine_motor_technology",skill:"mouse_control",subSkill:"Mouse/Trackpad",title:"Pointer Navigation",baselinePrompt:"Control pointer speed and target alignment.",maxPoints:2,difficulty:2,type:"motor_target"},{slot:55,domain:"fine_motor_technology",skill:"keyboard_navigation",subSkill:"Keyboard Skills",title:"Key Identification",baselinePrompt:"Locate and press key directional arrows or spacebar.",maxPoints:2,difficulty:2,type:"pattern_matrix"},{slot:56,domain:"fine_motor_technology",skill:"touch_interaction",subSkill:"Touchscreen",title:"Touch Target",baselinePrompt:"Select the highlighted item cleanly on screen.",maxPoints:1,difficulty:1,type:"motor_target"},{slot:57,domain:"fine_motor_technology",skill:"drag_and_drop",subSkill:"Drag & Drop",title:"Drag Block to Slot",baselinePrompt:"Complete a digital drag-and-drop alignment.",maxPoints:1,difficulty:1,type:"robot_mission"},{slot:58,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Digital Navigation",title:"Select App Icon",baselinePrompt:"Open or select the correct learning activity application.",maxPoints:1,difficulty:2,type:"picture_match"},{slot:59,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Tech Problem Solving",title:"Fix Screen Freeze",baselinePrompt:"Identify what button to click if a digital task freezes.",maxPoints:1,difficulty:3,type:"pattern_matrix"},{slot:60,domain:"fine_motor_technology",skill:"basic_robot_control",subSkill:"Technology Independence",title:"Independent Navigation",baselinePrompt:"Complete the basic technology startup sequence independently.",maxPoints:2,difficulty:3,type:"robot_mission"}];class Te{constructor(){this.client=new pe}async generateActivity(t){const o=Math.max(1,Math.min(60,t)),n=W[o-1],a=`You are generating Question #${n.slot} of 60 for the Cognix SEN Placement Assessment (aged 6-12).
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
}`;try{const r=await this.client.generateCompletion(a);if(r){let s=r.trim();s.startsWith("```json")?s=s.replace(/^```json/,"").replace(/```$/,"").trim():s.startsWith("```")&&(s=s.replace(/^```/,"").replace(/```$/,"").trim());const l=s.lastIndexOf("}");l!==-1&&(s=s.substring(0,l+1));const d=JSON.parse(s);if(d.instructions&&d.payload&&Array.isArray(d.payload.options))return d.payload.options.length>3&&(d.payload.options=d.payload.options.slice(0,3)),{id:`q_slot_${n.slot}_${Date.now()}_${Math.floor(Math.random()*1e3)}`,slot:n.slot,domain:n.domain,skill:n.skill,subSkill:n.subSkill,title:d.title||n.title,instructions:d.instructions,difficulty:n.difficulty,expectedTimeMs:9e4,maxPoints:n.maxPoints,type:n.type,payload:d.payload,hintText:d.hintText||"Take your time and think carefully!"}}}catch{}return this.generateDynamicFallback(o)}generateDynamicFallback(t){const o=Math.max(1,Math.min(60,t)),n=W[o-1],a=`fallback_q_${o}_${Date.now()}_${Math.floor(Math.random()*1e3)}`;let r={},s=n.baselinePrompt,l="Look at all options carefully before picking.";if(n.type==="robot_mission"?(r={availableBlocks:["Move Forward ⬆️","Turn Right ➡️","Grab Item 🦾"],correctSequence:["Move Forward ⬆️","Grab Item 🦾"],options:[{label:"Move Forward ➔ Grab Item",correct:!0},{label:"Turn Right ➔ Turn Right",correct:!1},{label:"Grab Item ➔ Stop",correct:!1}],correctIndex:0},l="Add the move block first, then grab the item!"):n.type==="picture_match"?(r={audioPromptText:`Select the item: ${n.title}`,options:[{label:"Target Item 🎯",emoji:"🤖",correct:!0},{label:"Other Item A",emoji:"🍎",correct:!1},{label:"Other Item B",emoji:"⚽",correct:!1}],correctIndex:0},l="Click the robot icon!"):n.type==="motor_target"?(r={targetsCount:3,movementSpeed:1.2,options:[{label:"Target Center 🎯",correct:!0},{label:"Side Corner 📐",correct:!1},{label:"Outer Boundary ⭕",correct:!1}],correctIndex:0},l="Click directly inside the glowing circle."):n.domain==="cognitive_ability"?(r={sequence:["🔵","🔴","🔵","🔴","?"],options:[{label:"🔵 Blue Circle",correct:!0},{label:"🟢 Green Circle",correct:!1},{label:"🟡 Yellow Star",correct:!1}],correctIndex:0},l="Notice how Blue and Red repeat one after another."):n.domain==="behavioral_readiness"?(r={options:[{label:"Stay calm, wait your turn, and try politely",correct:!0},{label:"Get upset and stop working",correct:!1},{label:"Leave the room immediately",correct:!1}],correctIndex:0},l="Choose the option that shows patience and self-control."):r={options:[{label:"Correct Solution Action 🌟",correct:!0},{label:"Incorrect Action A ❌",correct:!1},{label:"Incorrect Action B 🛑",correct:!1}],correctIndex:0},r.options&&Array.isArray(r.options)&&r.options.length===3){const d=r.options.find(M=>M.correct)||r.options[0],_=this.shuffleArray([...r.options]);r.options=_,r.correctIndex=_.indexOf(d)}return{id:a,slot:n.slot,domain:n.domain,skill:n.skill,subSkill:n.subSkill,title:`Q${n.slot}: ${n.title}`,instructions:s,difficulty:n.difficulty,expectedTimeMs:9e4,maxPoints:n.maxPoints,type:n.type,payload:r,hintText:l}}shuffleArray(t){const o=[...t];for(let n=o.length-1;n>0;n--){const a=Math.floor(Math.random()*(n+1));[o[n],o[a]]=[o[a],o[n]]}return o}}const ee={cognitive_ability:{name:"Cognitive Ability",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},functional_skills:{name:"Functional Abilities",weight:.25,maxScore:25,questionCount:15,recommendedTimeMin:20},communication_level:{name:"Communication Level",weight:.2,maxScore:20,questionCount:10,recommendedTimeMin:15},behavioral_readiness:{name:"Behavioral & Learning Readiness",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:15},fine_motor_technology:{name:"Fine Motor & Technology Skills",weight:.15,maxScore:15,questionCount:10,recommendedTimeMin:20}};class ne{static calculateItemScore(t,o=2){if(!t.is_correct&&t.accuracy_score===0)return 0;const n=Math.max(0,Math.min(1,t.accuracy_score)),a=t.expected_time_ms||9e4,r=Math.max(0,(t.response_time_ms-a)/Math.max(1e3,a)),s=Math.max(.7,1-.1*r),l=Math.max(.5,1-.15*t.hints_used),d=Math.max(.6,1-.1*Math.max(0,t.attempts_count-1)),_=o*n*s*l*d;return Math.max(0,Math.min(o,Math.round(_*10)/10))}static calculateDomainScores(t,o){const n=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],a={};for(const r of n){const s=ee[r],l=t.filter(k=>k.domain===r);if(l.length===0){a[r]={domain:r,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:0,efficiency_index:0,earned_score:0,skills_breakdown:{}};continue}let d=0,_=0;const M={};for(const k of l){const c=(o==null?void 0:o[k.item_id])??2,g=this.calculateItemScore(k,c);d+=g,_+=k.accuracy_score,M[k.skill]||(M[k.skill]={totalEarnedRatio:0,count:0}),M[k.skill].totalEarnedRatio+=g/Math.max(.1,c),M[k.skill].count+=1}const v=l.length,T=_/v*100,y=Math.min(s.maxScore,Math.round(d*10)/10),P={};for(const[k,c]of Object.entries(M))P[k]=Math.round(c.totalEarnedRatio/c.count*100);a[r]={domain:r,domain_name:s.name,weight_pct:s.weight*100,max_score:s.maxScore,raw_accuracy_pct:Math.round(T),efficiency_index:Math.round(y/s.maxScore*100)/100,earned_score:y,skills_breakdown:P}}return a}static calculateTotalScore(t){let o=0;for(const n of Object.values(t))o+=n.earned_score;return Math.min(100,Math.round(o*10)/10)}}class Me{static evaluatePlacement(t,o,n){var m,I,z,A,Q;let a="Explorer";t>=90?a="Innovator":t>=75?a="Creator":t>=60?a="Builder":a="Explorer";const r=[];(((m=o.cognitive_ability)==null?void 0:m.earned_score)||0)<10&&r.push({id:"FLAG_COGNITIVE_DEFICIENCY",type:"critical",title:"Cognitive Foundation Support",description:"Student demonstrated difficulty in pattern recognition and logical reasoning. Targeted logic puzzles recommended before advancing."}),(((I=o.functional_skills)==null?void 0:I.earned_score)||0)<10&&r.push({id:"FLAG_FUNCTIONAL_DEFICIENCY",type:"critical",title:"Multi-Step Mission Support",description:"Student requires scaffolded instruction following and working memory exercises."}),(((z=o.communication_level)==null?void 0:z.earned_score)||0)<7&&r.push({id:"FLAG_COMMUNICATION_SUPPORT",type:"warning",title:"Verbal & Visual Comprehension Support",description:"Audio visual cues and simplified instructions recommended during missions."}),(((A=o.behavioral_readiness)==null?void 0:A.earned_score)||0)<5.25&&r.push({id:"FLAG_BEHAVIORAL_ADAPTABILITY",type:"warning",title:"Error Recovery & Resilience Support",description:"Student showed hesitation or frustration during unexpected rule changes. Guided error-recovery feedback advised."}),(((Q=o.fine_motor_technology)==null?void 0:Q.earned_score)||0)<5.25&&r.push({id:"FLAG_FINE_MOTOR_SUPPORT",type:"info",title:"Digital Navigation Practice",description:"Drag-and-drop and target precision practice recommended for smooth touch/mouse control."});const v=r.some(O=>O.type==="critical");let T=a;v&&a!=="Explorer"&&(T=`${a} (with Targeted Support)`);let y=n.length||1,P=n.filter(O=>O.is_correct).length,k=n.reduce((O,H)=>O+H.hints_used,0),c=n.reduce((O,H)=>O+H.response_time_ms/Math.max(1e3,H.expected_time_ms),0)/y;const g=n.filter(O=>O.domain==="behavioral_readiness");let D=.75;if(g.length>0){const O=g.reduce((H,Y)=>H+Y.accuracy_score,0)/g.length;D=Math.round(O*100)/100}let L="Steady";if(n.length>=4){const O=Math.floor(n.length/2),H=n.slice(0,O).reduce((J,Z)=>J+Z.accuracy_score,0)/O,Y=n.slice(O).reduce((J,Z)=>J+Z.accuracy_score,0)/(n.length-O);Y-H>.15?L="High":Y<.4&&(L="Needs Practice")}return{totalScore:t,baseTrack:a,recommendedTrack:T,flags:r,requiresSupport:v,performanceIndicators:{overallAccuracy:Math.round(P/y*100),avgResponseSpeedRatio:Math.round(c*100)/100,hintDependencyRatio:Math.round(k/y*100)/100,adaptabilityIndex:D,learningProgressVelocity:L}}}}class Pe{constructor(){this.client=new pe}async generateReportSummary(t,o){const n=`Analyze this student assessment telemetry and provide a 3-paragraph diagnostic summary:
Student: ${t.student_name}
Total Score: ${o.totalScore}/100
Placed Track: ${o.recommendedTrack}
Overall Accuracy: ${o.performanceIndicators.overallAccuracy}%
Adaptability Index: ${o.performanceIndicators.adaptabilityIndex}
Learning Velocity: ${o.performanceIndicators.learningProgressVelocity}
Flags: ${o.flags.map(r=>r.title).join(", ")||"None"}
`,a=await this.client.generateCompletion(n,!1);return a||this.getBuiltInReport(t,o)}getBuiltInReport(t,o){const{totalScore:n,recommendedTrack:a,performanceIndicators:r,flags:s}=o;let l=`### Executive Assessment Summary
`;return l+=`**${t.student_name}** completed the AI Digital Placement Assessment, achieving a **Technology Readiness Score of ${n}/100**, placing into the **${a}** track.

`,l+=`### Cognitive & Problem-Solving Approach
`,r.overallAccuracy>=80?l+=`The student demonstrated high analytical accuracy (${r.overallAccuracy}%) with strong working memory and spatial pattern recognition. Tasks were completed with minimal reliance on hints (${r.hintDependencyRatio} hints/item).

`:l+=`The student displayed promising problem-solving initiative with an overall accuracy of ${r.overallAccuracy}%. Performance was boosted by scaffolded hints and trial-and-error feedback.

`,l+=`### Adaptability & Tech Readiness
`,l+=`During the dynamic rule-switch challenges, the student achieved an Adaptability Index of **${r.adaptabilityIndex}**, displaying a **${r.learningProgressVelocity}** learning progress velocity across progressive difficulty levels. `,s.length>0?l+=`

> [!NOTE]
> **Targeted Support Areas Identified**: ${s.map(d=>d.title).join(" • ")}. Targeted practice modules are recommended to solidify these core competencies.`:l+=`

> [!TIP]
> **Strengths Spotlight**: Well-rounded mastery observed across all five competency domains. Prepared for direct engagement with advanced robotics and interactive programming modules.`,l}}var re={};(function q(t,o,n,a){var r=!!(t.Worker&&t.Blob&&t.Promise&&t.OffscreenCanvas&&t.OffscreenCanvasRenderingContext2D&&t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype.transferControlToOffscreen&&t.URL&&t.URL.createObjectURL),s=typeof Path2D=="function"&&typeof DOMMatrix=="function",l=(function(){if(!t.OffscreenCanvas)return!1;try{var i=new OffscreenCanvas(1,1),e=i.getContext("2d");e.fillRect(0,0,1,1);var u=i.transferToImageBitmap();e.createPattern(u,"no-repeat")}catch{return!1}return!0})();function d(){}function _(i){var e=o.exports.Promise,u=e!==void 0?e:t.Promise;return typeof u=="function"?new u(i):(i(d,d),null)}var M=(function(i,e){return{transform:function(u){if(i)return u;if(e.has(u))return e.get(u);var h=new OffscreenCanvas(u.width,u.height),f=h.getContext("2d");return f.drawImage(u,0,0),e.set(u,h),h},clear:function(){e.clear()}}})(l,new Map),v=(function(){var i=Math.floor(16.666666666666668),e,u,h={},f=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(b){var x=Math.random();return h[x]=requestAnimationFrame(function p(S){f===S||f+i-1<S?(f=S,delete h[x],b()):h[x]=requestAnimationFrame(p)}),x},u=function(b){h[b]&&cancelAnimationFrame(h[b])}):(e=function(b){return setTimeout(b,i)},u=function(b){return clearTimeout(b)}),{frame:e,cancel:u}})(),T=(function(){var i,e,u={};function h(f){function b(x,p){f.postMessage({options:x||{},callback:p})}f.init=function(p){var S=p.transferControlToOffscreen();f.postMessage({canvas:S},[S])},f.fire=function(p,S,C){if(e)return b(p,null),e;var $=Math.random().toString(36).slice(2);return e=_(function(E){function R(B){B.data.callback===$&&(delete u[$],f.removeEventListener("message",R),e=null,M.clear(),C(),E())}f.addEventListener("message",R),b(p,$),u[$]=R.bind(null,{data:{callback:$}})}),e},f.reset=function(){f.postMessage({reset:!0});for(var p in u)u[p](),delete u[p]}}return function(){if(i)return i;if(!n&&r){var f=["var CONFETTI, SIZE = {}, module = {};","("+q.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{i=new Worker(URL.createObjectURL(new Blob([f])))}catch(b){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",b),null}h(i)}return i}})(),y={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function P(i,e){return e?e(i):i}function k(i){return i!=null}function c(i,e,u){return P(i&&k(i[e])?i[e]:y[e],u)}function g(i){return i<0?0:Math.floor(i)}function D(i,e){return Math.floor(Math.random()*(e-i))+i}function L(i){return parseInt(i,16)}function m(i){return i.map(I)}function I(i){var e=String(i).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:L(e.substring(0,2)),g:L(e.substring(2,4)),b:L(e.substring(4,6))}}function z(i){var e=c(i,"origin",Object);return e.x=c(e,"x",Number),e.y=c(e,"y",Number),e}function A(i){i.width=document.documentElement.clientWidth,i.height=document.documentElement.clientHeight}function Q(i){var e=i.getBoundingClientRect();i.width=e.width,i.height=e.height}function O(i){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=i,e}function H(i,e,u,h,f,b,x,p,S){i.save(),i.translate(e,u),i.rotate(b),i.scale(h,f),i.arc(0,0,1,x,p,S),i.restore()}function Y(i){var e=i.angle*(Math.PI/180),u=i.spread*(Math.PI/180);return{x:i.x,y:i.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:i.startVelocity*.5+Math.random()*i.startVelocity,angle2D:-e+(.5*u-Math.random()*u),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:i.color,shape:i.shape,tick:0,totalTicks:i.ticks,decay:i.decay,drift:i.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:i.gravity*3,ovalScalar:.6,scalar:i.scalar,flat:i.flat}}function J(i,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var u=e.tick++/e.totalTicks,h=e.x+e.random*e.tiltCos,f=e.y+e.random*e.tiltSin,b=e.wobbleX+e.random*e.tiltCos,x=e.wobbleY+e.random*e.tiltSin;if(i.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-u)+")",i.beginPath(),s&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))i.fill(he(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(b-h)*.1,Math.abs(x-f)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var p=Math.PI/10*e.wobble,S=Math.abs(b-h)*.1,C=Math.abs(x-f)*.1,$=e.shape.bitmap.width*e.scalar,E=e.shape.bitmap.height*e.scalar,R=new DOMMatrix([Math.cos(p)*S,Math.sin(p)*S,-Math.sin(p)*C,Math.cos(p)*C,e.x,e.y]);R.multiplySelf(new DOMMatrix(e.shape.matrix));var B=i.createPattern(M.transform(e.shape.bitmap),"no-repeat");B.setTransform(R),i.globalAlpha=1-u,i.fillStyle=B,i.fillRect(e.x-$/2,e.y-E/2,$,E),i.globalAlpha=1}else if(e.shape==="circle")i.ellipse?i.ellipse(e.x,e.y,Math.abs(b-h)*e.ovalScalar,Math.abs(x-f)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):H(i,e.x,e.y,Math.abs(b-h)*e.ovalScalar,Math.abs(x-f)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var w=Math.PI/2*3,N=4*e.scalar,j=8*e.scalar,U=e.x,V=e.y,K=5,G=Math.PI/K;K--;)U=e.x+Math.cos(w)*j,V=e.y+Math.sin(w)*j,i.lineTo(U,V),w+=G,U=e.x+Math.cos(w)*N,V=e.y+Math.sin(w)*N,i.lineTo(U,V),w+=G;else i.moveTo(Math.floor(e.x),Math.floor(e.y)),i.lineTo(Math.floor(e.wobbleX),Math.floor(f)),i.lineTo(Math.floor(b),Math.floor(x)),i.lineTo(Math.floor(h),Math.floor(e.wobbleY));return i.closePath(),i.fill(),e.tick<e.totalTicks}function Z(i,e,u,h,f){var b=e.slice(),x=i.getContext("2d"),p,S,C=_(function($){function E(){p=S=null,x.clearRect(0,0,h.width,h.height),M.clear(),f(),$()}function R(){n&&!(h.width===a.width&&h.height===a.height)&&(h.width=i.width=a.width,h.height=i.height=a.height),!h.width&&!h.height&&(u(i),h.width=i.width,h.height=i.height),x.clearRect(0,0,h.width,h.height),b=b.filter(function(B){return J(x,B)}),b.length?p=v.frame(R):E()}p=v.frame(R),S=E});return{addFettis:function($){return b=b.concat($),C},canvas:i,promise:C,reset:function(){p&&v.cancel(p),S&&S()}}}function se(i,e){var u=!i,h=!!c(e||{},"resize"),f=!1,b=c(e,"disableForReducedMotion",Boolean),x=r&&!!c(e||{},"useWorker"),p=x?T():null,S=u?A:Q,C=i&&p?!!i.__confetti_initialized:!1,$=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,E;function R(w,N,j){for(var U=c(w,"particleCount",g),V=c(w,"angle",Number),K=c(w,"spread",Number),G=c(w,"startVelocity",Number),ye=c(w,"decay",Number),be=c(w,"gravity",Number),ve=c(w,"drift",Number),le=c(w,"colors",m),xe=c(w,"ticks",Number),ce=c(w,"shapes"),Se=c(w,"scalar"),ke=!!c(w,"flat"),de=z(w),me=U,ie=[],_e=i.width*de.x,we=i.height*de.y;me--;)ie.push(Y({x:_e,y:we,angle:V,spread:K,startVelocity:G,color:le[me%le.length],shape:ce[D(0,ce.length)],ticks:xe,decay:ye,gravity:be,drift:ve,scalar:Se,flat:ke}));return E?E.addFettis(ie):(E=Z(i,ie,S,N,j),E.promise)}function B(w){var N=b||c(w,"disableForReducedMotion",Boolean),j=c(w,"zIndex",Number);if(N&&$)return _(function(G){G()});u&&E?i=E.canvas:u&&!i&&(i=O(j),document.body.appendChild(i)),h&&!C&&S(i);var U={width:i.width,height:i.height};p&&!C&&p.init(i),C=!0,p&&(i.__confetti_initialized=!0);function V(){if(p){var G={getBoundingClientRect:function(){if(!u)return i.getBoundingClientRect()}};S(G),p.postMessage({resize:{width:G.width,height:G.height}});return}U.width=U.height=null}function K(){E=null,h&&(f=!1,t.removeEventListener("resize",V)),u&&i&&(document.body.contains(i)&&document.body.removeChild(i),i=null,C=!1)}return h&&!f&&(f=!0,t.addEventListener("resize",V,!1)),p?p.fire(w,U,K):R(w,U,K)}return B.reset=function(){p&&p.reset(),E&&E.reset()},B}var te;function ae(){return te||(te=se(null,{useWorker:!0,resize:!0})),te}function he(i,e,u,h,f,b,x){var p=new Path2D(i),S=new Path2D;S.addPath(p,new DOMMatrix(e));var C=new Path2D;return C.addPath(S,new DOMMatrix([Math.cos(x)*f,Math.sin(x)*f,-Math.sin(x)*b,Math.cos(x)*b,u,h])),C}function ge(i){if(!s)throw new Error("path confetti are not supported in this browser");var e,u;typeof i=="string"?e=i:(e=i.path,u=i.matrix);var h=new Path2D(e),f=document.createElement("canvas"),b=f.getContext("2d");if(!u){for(var x=1e3,p=x,S=x,C=0,$=0,E,R,B=0;B<x;B+=2)for(var w=0;w<x;w+=2)b.isPointInPath(h,B,w,"nonzero")&&(p=Math.min(p,B),S=Math.min(S,w),C=Math.max(C,B),$=Math.max($,w));E=C-p,R=$-S;var N=10,j=Math.min(N/E,N/R);u=[j,0,0,j,-Math.round(E/2+p)*j,-Math.round(R/2+S)*j]}return{type:"path",path:e,matrix:u}}function fe(i){var e,u=1,h="#000000",f='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof i=="string"?e=i:(e=i.text,u="scalar"in i?i.scalar:u,f="fontFamily"in i?i.fontFamily:f,h="color"in i?i.color:h);var b=10*u,x=""+b+"px "+f,p=new OffscreenCanvas(b,b),S=p.getContext("2d");S.font=x;var C=S.measureText(e),$=Math.ceil(C.actualBoundingBoxRight+C.actualBoundingBoxLeft),E=Math.ceil(C.actualBoundingBoxAscent+C.actualBoundingBoxDescent),R=2,B=C.actualBoundingBoxLeft+R,w=C.actualBoundingBoxAscent+R;$+=R+R,E+=R+R,p=new OffscreenCanvas($,E),S=p.getContext("2d"),S.font=x,S.fillStyle=h,S.fillText(e,B,w);var N=1/u;return{type:"bitmap",bitmap:p.transferToImageBitmap(),matrix:[N,0,0,N,-$*N/2,-E*N/2]}}o.exports=function(){return ae().apply(this,arguments)},o.exports.reset=function(){ae().reset()},o.exports.create=se,o.exports.shapeFromPath=ge,o.exports.shapeFromText=fe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),re,!1);const Ie=re.exports;re.exports.create;function Ae(q,t,o){try{Ie({particleCount:100,spread:70,origin:{y:.6}})}catch{}const{totalScore:n,recommendedTrack:a,flags:r,performanceIndicators:s}=o;let l="";r.length>0&&(l=r.map(m=>`
      <div class="flag-alert ${m.type==="critical"?"critical":""}">
        <div style="font-size: 1.25rem;">⚠️</div>
        <div>
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${m.title}</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">${m.description}</p>
        </div>
      </div>
    `).join(""));const d=Object.values(t.domain_scores).map(m=>{const I=Math.round(m.earned_score/m.max_score*100);return`
      <div class="domain-progress-bar">
        <div class="bar-label">
          <span><strong>${m.domain_name}</strong> (${m.weight_pct}% Weight)</span>
          <span><strong>${m.earned_score}</strong> / ${m.max_score} Pts (${I}%)</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width: ${I}%; background: linear-gradient(90deg, var(--accent-cyan), var(--accent-blue));"></div>
        </div>
      </div>
    `}).join(""),_=t.question_time_records||[],M=_.map(m=>{if(!m)return"";const I=Math.round(m.activeDurationMs/1e3),z=m.responseLatencyMs?(m.responseLatencyMs/1e3).toFixed(1)+"s":"—",A=m.remainingTimeWhenAnsweredMs?Math.round(m.remainingTimeWhenAnsweredMs/1e3)+"s":"0s";let Q='<span style="color:#10b981; font-weight:700;">🟢 Fast</span>';return m.timedOut?Q='<span style="color:#ef4444; font-weight:700;">⏰ Timed Out</span>':I>80?Q='<span style="color:#f59e0b; font-weight:700;">🔴 Slow</span>':I>45&&(Q='<span style="color:#3b82f6; font-weight:700;">🟡 Normal</span>'),`
      <tr style="${m.timedOut?"background:rgba(239,68,68,0.08);":""} border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.85rem;">
        <td style="padding:0.6rem 0.8rem; font-weight:700; text-align:center;">Q${m.questionSlot}</td>
        <td style="padding:0.6rem 0.8rem;">
          <span style="font-size:0.75rem; background:rgba(6,182,212,0.15); color:var(--accent-cyan); padding:0.25rem 0.5rem; border-radius:6px;">
            ${m.domain.replace("_"," ")}
          </span>
        </td>
        <td style="padding:0.6rem 0.8rem; font-weight:600; color:var(--text-primary);">${m.subSkill}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${I}s</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${z}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${A}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${Q}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center;">${m.breaksDuringQuestion>0?`⏸️ ${m.breaksDuringQuestion}`:"0"}</td>
        <td style="padding:0.6rem 0.8rem; text-align:center; font-weight:700;">${m.earnedScore} / ${m.maxScore}</td>
      </tr>
    `}).join(""),v=t.break_events||[];let T="";v.length>0?T=v.map(m=>{const I=Math.floor(m.breakDurationMs/6e4),z=Math.round(m.breakDurationMs%6e4/1e3),A=Math.round(m.countdownRemainingAtPause);return`
        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); padding:0.75rem 1rem; border-radius:10px; margin-bottom:0.5rem; font-size:0.88rem;">
          <div>
            <strong>Break #${m.breakIndex}</strong> • During <strong>Q${m.questionSlotAtPause}</strong> (${m.domainAtPause.replace("_"," ")})
          </div>
          <div style="color:var(--accent-amber); font-weight:700;">
            Duration: ${I>0?`${I}m `:""}${z}s (Timer left: ${A}s)
          </div>
        </div>
      `}).join(""):T=`
      <div style="background:rgba(16,185,129,0.1); border:1px solid var(--accent-emerald); color:var(--accent-emerald); padding:1rem; border-radius:10px; font-weight:600; text-align:center;">
        ✅ No breaks taken — Student completed all 60 questions continuously without pausing.
      </div>
    `;const y=Math.round((t.total_active_duration_ms||0)/6e4),P=Math.round((t.total_break_duration_ms||0)/6e4),k=Math.round((t.total_wall_clock_duration_ms||0)/6e4),c=_.filter(m=>m==null?void 0:m.timedOut).length;q.innerHTML=`
    <div class="glass-card" style="padding: 2.5rem; max-width:1150px; margin:0 auto;">
      
      <!-- Top Action Controls -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:1rem;">
        <span style="background: rgba(16,185,129,0.15); border: 1px solid var(--accent-emerald); color: var(--accent-emerald); padding: 0.35rem 1rem; border-radius: 20px; font-weight: 700; font-size: 0.85rem; text-transform: uppercase;">
          ✅ 60-Question SEN Assessment Complete
        </span>
        <div style="display:flex; gap:0.75rem;">
          <button id="download-csv-btn" class="btn btn-secondary" style="font-size:0.85rem;">
            📊 Export CSV (CEO Report)
          </button>
          <button id="print-report-btn" class="btn btn-secondary" style="font-size:0.85rem;">
            🖨️ Print Executive Report
          </button>
        </div>
      </div>

      <!-- Header -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2.2rem; font-weight: 800; background: linear-gradient(135deg, #fff, var(--accent-cyan)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
          AI Digital Technology Placement Report
        </h1>
        <p style="color: var(--text-secondary); font-size: 1rem; margin-top: 0.25rem;">
          Student: <strong>${t.student_name}</strong> • Age Group: ${t.age_group} • 60 Items Assessed
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
              <span>Total Breaks Taken:</span> <strong>${t.total_breaks_count||0} (${P} min)</strong>
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
          
          ${d}

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
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">${t.total_breaks_count||0} breaks recorded</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">Wall Clock Duration</div>
            <div style="font-size:1.8rem; font-weight:800; color:#fff; margin-top:0.25rem;">${k} min</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Total session length</div>
          </div>
          <div style="background:rgba(15,23,42,0.7); border:1px solid var(--border-color); padding:1.25rem; border-radius:12px; text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-secondary); text-transform:uppercase;">On-Task Focus Ratio</div>
            <div style="font-size:1.8rem; font-weight:800; color:var(--accent-emerald); margin-top:0.25rem;">
              ${k>0?Math.round(y/k*100):100}%
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
          ${t.qualitative_summary?Ee(t.qualitative_summary):""}
        </div>
      </div>

      <div style="margin-top: 2.5rem; text-align: center; border-top: 1px solid var(--border-color); padding-top: 1.5rem;">
        <button class="btn btn-primary" id="restart-btn" style="margin: 0 auto;">
          🔄 Retake Placement Assessment
        </button>
      </div>
    </div>
  `;const g=q.querySelector("#restart-btn");g&&g.addEventListener("click",()=>{window.location.reload()});const D=q.querySelector("#print-report-btn");D&&D.addEventListener("click",()=>window.print());const L=q.querySelector("#download-csv-btn");L&&L.addEventListener("click",()=>{Ce(t)})}function Ce(q){const t=q.question_time_records||[];let o=`Slot,Domain,SubSkill,QuestionTitle,ActiveTimeSec,ResponseLatencySec,TimerRemainingSec,Status,TimedOut,Breaks,EarnedPoints,MaxPoints
`;t.forEach(s=>{if(!s)return;const l=(s.activeDurationMs/1e3).toFixed(1),d=s.responseLatencyMs?(s.responseLatencyMs/1e3).toFixed(1):"",_=s.remainingTimeWhenAnsweredMs?(s.remainingTimeWhenAnsweredMs/1e3).toFixed(1):"0",M=s.timedOut?"TIMED_OUT":s.activeDurationMs>8e4?"SLOW":s.activeDurationMs>45e3?"NORMAL":"FAST";o+=`${s.questionSlot},"${s.domain}","${s.subSkill}","${s.questionTitle.replace(/"/g,'""')}",${l},${d},${_},${M},${s.timedOut},${s.breaksDuringQuestion},${s.earnedScore},${s.maxScore}
`});const n=new Blob([o],{type:"text/csv;charset=utf-8;"}),a=URL.createObjectURL(n),r=document.createElement("a");r.setAttribute("href",a),r.setAttribute("download",`Cognix_CEO_Assessment_Time_Report_${q.student_name.replace(/\s+/g,"_")}.csv`),r.click()}function Ee(q){return q.replace(/^### (.*$)/gim,'<h3 style="color:var(--text-primary); font-size:1.05rem; margin-top:1rem; margin-bottom:0.4rem;">$1</h3>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/^> (.*$)/gim,'<blockquote style="border-left:3px solid var(--accent-cyan); padding-left:0.8rem; margin:0.8rem 0; color:var(--accent-cyan); font-size:0.9rem;">$1</blockquote>')}const F=class F{constructor(t){this.studentName="Alex Rivers",this.cachedActivities=new Array(60).fill(null),this.userAnswers=[],this.questionTimeRecords=[],this.breakEvents=[],this.currentQuestionIndex=0,this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.itemStartTimestamp=0,this.itemFirstInteractionTimestamp=null,this.currentPauseStartTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,this.isPaused=!1,this.globalTimerInterval=null,this.questionTimerInterval=null,this.beforeUnloadHandler=()=>{this.saveSession(this.studentName)},this.container=t,this.generator=new Te,this.analyzer=new Pe,this.initUserAnswers()}static getSavedSession(){try{const t=localStorage.getItem(F.STORAGE_KEY);if(!t)return null;const o=JSON.parse(t);return o&&Array.isArray(o.userAnswers)&&o.userAnswers.length===60?o:null}catch{return null}}static clearSavedSession(){try{localStorage.removeItem(F.STORAGE_KEY)}catch{}}saveSession(t=this.studentName){try{this.studentName=t;const o={studentName:t,currentQuestionIndex:this.currentQuestionIndex,totalTimerSeconds:this.totalTimerSeconds,currentQuestionRemainingSeconds:this.questionTimerSecondsRemaining,isPaused:this.isPaused,cachedActivities:this.cachedActivities,userAnswers:this.userAnswers,questionTimeRecords:this.questionTimeRecords,breakEvents:this.breakEvents,savedAt:Date.now()};localStorage.setItem(F.STORAGE_KEY,JSON.stringify(o))}catch{}}attachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler),window.addEventListener("beforeunload",this.beforeUnloadHandler)}detachBeforeUnload(){window.removeEventListener("beforeunload",this.beforeUnloadHandler)}initUserAnswers(){this.userAnswers=new Array(60).fill(null).map(()=>({selectedAnswerIndex:null,robotSequence:[],motorClicks:[],attemptsCount:0,hintsUsed:0,timeSpentMs:0,isSolved:!1,timedOut:!1,answeredAt:null,responseLatencyMs:null,remainingTimeWhenAnsweredMs:null,breaksDuringQuestion:0})),this.questionTimeRecords=[],this.breakEvents=[]}async startSession(t="Alex Rivers",o=!0){this.studentName=t;const n=o?F.getSavedSession():null;n?(this.currentQuestionIndex=Math.max(0,Math.min(59,n.currentQuestionIndex||0)),this.cachedActivities=n.cachedActivities||new Array(60).fill(null),this.userAnswers=n.userAnswers,this.questionTimeRecords=n.questionTimeRecords||[],this.breakEvents=n.breakEvents||[],this.totalTimerSeconds=n.totalTimerSeconds||0,this.questionTimerSecondsRemaining=n.currentQuestionRemainingSeconds||F.QUESTION_TIME_LIMIT_SEC,this.isPaused=n.isPaused||!1,this.startGlobalTimer(this.totalTimerSeconds),this.attachBeforeUnload(),this.isPaused?(await this.loadQuestion(this.currentQuestionIndex,!1),this.pauseAssessment()):await this.loadQuestion(this.currentQuestionIndex,!1)):(this.currentQuestionIndex=0,this.cachedActivities=new Array(60).fill(null),this.initUserAnswers(),this.totalTimerSeconds=0,this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC,this.isPaused=!1,this.startGlobalTimer(0),this.attachBeforeUnload(),this.saveSession(t),await this.loadQuestion(0,!0))}startGlobalTimer(t=0){this.totalTimerSeconds=t,this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.globalTimerInterval=setInterval(()=>{if(!this.isPaused){this.totalTimerSeconds++,this.totalTimerSeconds%3===0&&this.saveSession(this.studentName);const o=document.getElementById("global-timer");if(o){const n=String(Math.floor(this.totalTimerSeconds/60)).padStart(2,"0"),a=String(this.totalTimerSeconds%60).padStart(2,"0");o.textContent=`${n}:${a}`}}},1e3)}startQuestionTimer(){this.questionTimerInterval&&clearInterval(this.questionTimerInterval),this.questionTimerInterval=setInterval(()=>{this.isPaused||(this.questionTimerSecondsRemaining--,this.updateQuestionTimerUI(),this.questionTimerSecondsRemaining<=0&&(clearInterval(this.questionTimerInterval),this.handleQuestionTimeout()))},1e3)}updateQuestionTimerUI(){const t=document.getElementById("question-timer-display"),o=document.getElementById("question-timer-ring");if(t){const n=Math.floor(this.questionTimerSecondsRemaining/60),a=String(this.questionTimerSecondsRemaining%60).padStart(2,"0");t.textContent=`${n}:${a}`,this.questionTimerSecondsRemaining<=15?t.style.color="#ef4444":t.style.color="var(--accent-cyan)"}if(o){const n=this.questionTimerSecondsRemaining/F.QUESTION_TIME_LIMIT_SEC*100;o.style.width=`${n}%`}}async loadQuestion(t,o=!0){if(t<0||t>=60)return;this.currentQuestionIndex=t;const n=W[t];this.questionTimerInterval&&clearInterval(this.questionTimerInterval),o&&(this.questionTimerSecondsRemaining=F.QUESTION_TIME_LIMIT_SEC),this.itemFirstInteractionTimestamp=null,this.pauseDurationForCurrentQuestionMs=0,this.cachedActivities[t]||(this.renderLoadingState(t),this.cachedActivities[t]=await this.generator.generateActivity(n.slot)),this.itemStartTimestamp=Date.now(),this.saveSession(this.studentName),this.render(),this.isPaused||this.startQuestionTimer(),this.prefetchNextQuestion(t+1)}renderLoadingState(t){const o=W[t],n=ee[o.domain],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
        <div style="text-align: center; padding: 3rem 1rem; color: var(--accent-cyan);">
          <div style="font-size: 2.5rem; margin-bottom: 1rem; animation: pulse 1.2s infinite ease-in-out;">⚡</div>
          <h3 style="font-size: 1.2rem; font-weight: 700;">Preparing Question ${o.slot} of 60...</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.5rem;">${n.name} • ${o.subSkill}</p>
        </div>
      `)}async prefetchNextQuestion(t){if(t>=0&&t<60&&!this.cachedActivities[t]){const o=W[t];this.generator.generateActivity(o.slot).then(n=>{this.cachedActivities[t]=n}).catch(()=>{})}}pauseAssessment(){if(this.isPaused)return;this.isPaused=!0,this.currentPauseStartTimestamp=Date.now();const t=this.userAnswers[this.currentQuestionIndex];t&&t.breaksDuringQuestion++;const o=document.getElementById("pause-overlay");o&&(o.style.display="flex"),this.saveSession(this.studentName)}resumeAssessment(){if(!this.isPaused)return;const t=Date.now();if(this.currentPauseStartTimestamp){const n=t-this.currentPauseStartTimestamp;this.pauseDurationForCurrentQuestionMs+=n;const a=W[this.currentQuestionIndex];this.breakEvents.push({breakIndex:this.breakEvents.length+1,questionSlotAtPause:this.currentQuestionIndex+1,domainAtPause:a.domain,pauseStartTimestamp:this.currentPauseStartTimestamp,resumeTimestamp:t,breakDurationMs:n,countdownRemainingAtPause:this.questionTimerSecondsRemaining})}this.isPaused=!1,this.currentPauseStartTimestamp=null;const o=document.getElementById("pause-overlay");o&&(o.style.display="none"),this.startQuestionTimer(),this.saveSession(this.studentName)}handleQuestionTimeout(){const t=this.userAnswers[this.currentQuestionIndex];t.timedOut=!0,t.isSolved=!1,this.recordQuestionTimeData(!1),this.advanceToNextQuestion()}recordQuestionTimeData(t){const o=Date.now(),n=this.userAnswers[this.currentQuestionIndex],a=W[this.currentQuestionIndex],r=this.cachedActivities[this.currentQuestionIndex],s=o-this.itemStartTimestamp,l=Math.max(1e3,s-this.pauseDurationForCurrentQuestionMs);n.timeSpentMs+=l;const d={questionSlot:a.slot,domain:a.domain,subSkill:a.subSkill,questionTitle:(r==null?void 0:r.title)||a.title,questionStartTimestamp:this.itemStartTimestamp,questionEndTimestamp:o,totalDurationMs:s,pausedDurationMs:this.pauseDurationForCurrentQuestionMs,activeDurationMs:l,responseLatencyMs:n.responseLatencyMs,answeredAt:n.answeredAt,timedOut:n.timedOut,wasAnswered:t,remainingTimeWhenAnsweredMs:n.remainingTimeWhenAnsweredMs,breaksDuringQuestion:n.breaksDuringQuestion,earnedScore:0,maxScore:a.maxPoints};this.questionTimeRecords[this.currentQuestionIndex]=d}advanceToNextQuestion(){if(this.questionTimerInterval&&clearInterval(this.questionTimerInterval),this.currentQuestionIndex<59){const t=W[this.currentQuestionIndex].domain,o=W[this.currentQuestionIndex+1].domain;t!==o?this.showDomainTransitionBanner(o,()=>{this.loadQuestion(this.currentQuestionIndex+1,!0)}):this.loadQuestion(this.currentQuestionIndex+1,!0)}else this.completeAssessment()}showDomainTransitionBanner(t,o){const n=ee[t],a=this.container.querySelector("#playground-area");a&&(a.innerHTML=`
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
      `),setTimeout(o,2200)}render(){const t=this.cachedActivities[this.currentQuestionIndex];if(!t)return;const o=W[this.currentQuestionIndex],n=ee[o.domain],a=this.userAnswers[this.currentQuestionIndex],r=this.currentQuestionIndex>0?this.currentQuestionIndex-1:-1;let s=`
      <div class="question-grid-bar">
        <div class="grid-header">
          <span><strong>🐸 Frog Jump Progress</strong> — Question <strong>${o.slot}</strong> of 60</span>
          <span>Done: <strong>${this.userAnswers.filter(l=>l.isSolved||l.timedOut).length}</strong> / 60</span>
        </div>
        <div class="lily-pads-matrix">
    `;for(let l=0;l<60;l++){const d=l===this.currentQuestionIndex,_=this.userAnswers[l].isSolved,M=this.userAnswers[l].timedOut,v=l<this.currentQuestionIndex,T=l===r;let y="lily-pad";d?y+=" active-pad frog-land":_?y+=" solved-pad":M?y+=" timed-out-pad":T?y+=" just-left-pad":v?y+=" past-pad":y+=" locked-pad";let P=`${l+1}`;d?P="🐸":_?P="✓":M&&(P="⏰"),s+=`
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


          <h2 class="activity-title">${t.title}</h2>
          <p class="activity-instructions">${t.instructions}</p>
        </div>

        <div class="interactive-playground" id="playground-area">
          ${this.renderPlaygroundContent(t,a)}
        </div>

        <div class="activity-footer">
          <div class="nav-buttons-group" style="width:100%;">
            <button class="btn btn-primary" id="submit-answer-btn" style="background: linear-gradient(135deg, var(--accent-cyan), var(--accent-blue)); font-weight:700; width:100%; font-size:1.1rem; padding:0.9rem 2rem;">
              Confirm &amp; Next ➔
            </button>
          </div>
        </div>
      </div>
    `,this.attachEventListeners()}renderPlaygroundContent(t,o){const n=t.payload||{};if(t.type==="robot_mission"||Array.isArray(n.availableBlocks))return`
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
              ${o.robotSequence.length===0?'<span style="color:var(--text-secondary); font-size:0.85rem;">Click blocks on left to build sequence...</span>':o.robotSequence.map((l,d)=>`
                <div class="sequence-step" style="background:var(--accent-blue); padding:0.4rem 0.8rem; border-radius:6px; font-size:0.85rem; font-weight:600; display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
                  <span>📌 ${d+1}. ${l}</span>
                  <button class="remove-block-btn" data-idx="${d}" style="background:rgba(0,0,0,0.25); border:none; color:#fff; width:20px; height:20px; border-radius:50%; cursor:pointer; font-size:0.75rem; display:flex; align-items:center; justify-content:center; flex-shrink:0;">×</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      `;if(t.type==="picture_match"||n.audioPromptText){const s=n.audioPromptText||"Select the matching item",l=n.options||[{label:"Option A",emoji:"🤖"},{label:"Option B",emoji:"🍎"},{label:"Option C",emoji:"⚽"}];return`
        <div style="margin-bottom: 1.25rem; font-size:1.1rem; color:var(--accent-cyan); font-weight:600; text-align:center;">
          🔊 Prompt: "${s}"
        </div>
        <div class="options-grid-3">
          ${l.slice(0,3).map((d,_)=>{const M=typeof d=="string"?d:d.label||`Option ${_+1}`,v=typeof d=="object"&&d.emoji?d.emoji:"🎯";return`
              <button class="option-btn-3 ${o.selectedAnswerIndex===_?"selected":""}" data-opt="${_}">
                <span style="font-size: 2.2rem;">${v}</span>
                <span style="font-size: 0.95rem;">${M}</span>
              </button>
            `}).join("")}
        </div>
      `}if(t.type==="motor_target"){const s=n.targetsCount||3;return`
        <div class="motor-canvas-container" id="motor-canvas">
          <div class="motor-target" id="target-element" style="top: 80px; left: 240px;"></div>
          <div style="position:absolute; bottom:10px; left:15px; font-size:0.85rem; color:var(--text-secondary);">
            Targets Clicked: ${o.motorClicks.length} / ${s}
          </div>
        </div>
      `}const a=Array.isArray(n.options)?n.options.slice(0,3):[{label:"Choice A"},{label:"Choice B"},{label:"Choice C"}],r=Array.isArray(n.sequence)?n.sequence:null;return`
      ${r?`
        <div style="font-size: 2.2rem; display: flex; gap: 1rem; margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); padding: 1rem 1.5rem; border-radius: 12px; justify-content: center;">
          ${r.map(s=>`<span>${s}</span>`).join("")}
        </div>
      `:""}
      <div class="options-grid-3">
        ${a.map((s,l)=>{const d=typeof s=="string"?s:s.label||s.text||JSON.stringify(s);return`
            <button class="option-btn-3 ${o.selectedAnswerIndex===l?"selected":""}" data-opt="${l}">
              <span>${d}</span>
            </button>
          `}).join("")}
      </div>
    `}registerInteraction(){if(!this.itemFirstInteractionTimestamp){this.itemFirstInteractionTimestamp=Date.now();const t=this.userAnswers[this.currentQuestionIndex];t&&(t.responseLatencyMs=Math.max(100,this.itemFirstInteractionTimestamp-this.itemStartTimestamp-this.pauseDurationForCurrentQuestionMs))}}attachEventListeners(){const t=this.userAnswers[this.currentQuestionIndex];this.container.querySelectorAll(".option-btn-3").forEach(v=>{v.addEventListener("click",T=>{this.registerInteraction();const y=T.currentTarget,P=parseInt(y.getAttribute("data-opt")||"0",10);t.selectedAnswerIndex=P,t.isSolved=!0,t.answeredAt=Date.now(),t.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3,t.attemptsCount=Math.max(1,t.attemptsCount+1),this.render()})}),this.container.querySelectorAll(".code-block").forEach(v=>{v.addEventListener("click",T=>{this.registerInteraction();const P=T.currentTarget.getAttribute("data-block");P&&(t.robotSequence.push(P),t.isSolved=t.robotSequence.length>0,t.answeredAt=Date.now(),t.attemptsCount=Math.max(1,t.attemptsCount+1),this.render())})}),this.container.querySelectorAll(".remove-block-btn").forEach(v=>{v.addEventListener("click",T=>{T.stopPropagation();const y=T.currentTarget,P=parseInt(y.getAttribute("data-idx")||"0",10);t.robotSequence.splice(P,1),t.isSolved=t.robotSequence.length>0,this.render()})});const r=this.container.querySelector("#clear-sequence-btn");r&&r.addEventListener("click",()=>{t.robotSequence=[],t.isSolved=!1,this.render()});const s=this.container.querySelector("#target-element"),l=this.container.querySelector("#motor-canvas");s&&l&&s.addEventListener("click",v=>{var m,I;this.registerInteraction();const T=s.getBoundingClientRect(),y=v.clientX-T.left,P=v.clientY-T.top,k=Math.sqrt(Math.pow(y-T.width/2,2)+Math.pow(P-T.height/2,2));t.motorClicks.push({x:y,y:P,dist:k}),t.attemptsCount=Math.max(1,t.attemptsCount+1);const c=l.getBoundingClientRect(),g=Math.floor(Math.random()*(c.height-70)),D=Math.floor(Math.random()*(c.width-70));s.style.top=`${g}px`,s.style.left=`${D}px`;const L=((I=(m=this.cachedActivities[this.currentQuestionIndex])==null?void 0:m.payload)==null?void 0:I.targetsCount)||3;t.motorClicks.length>=L&&(t.selectedAnswerIndex=0,t.isSolved=!0,t.answeredAt=Date.now(),t.remainingTimeWhenAnsweredMs=this.questionTimerSecondsRemaining*1e3),this.render()});const d=this.container.querySelector("#pause-btn");d&&d.addEventListener("click",()=>this.pauseAssessment());const _=this.container.querySelector("#resume-btn");_&&_.addEventListener("click",()=>this.resumeAssessment());const M=this.container.querySelector("#submit-answer-btn");M&&M.addEventListener("click",()=>{this.recordQuestionTimeData(t.isSolved),this.advanceToNextQuestion()})}async completeAssessment(){var T,y,P,k;this.globalTimerInterval&&clearInterval(this.globalTimerInterval),this.questionTimerInterval&&clearInterval(this.questionTimerInterval),this.detachBeforeUnload(),F.clearSavedSession();const t=[],o={};for(let c=0;c<60;c++){const g=this.cachedActivities[c],D=this.userAnswers[c],L=W[c];if(!g)continue;let m=!1,I=0;if(g.type==="robot_mission"||Array.isArray((T=g.payload)==null?void 0:T.availableBlocks)){const z=((y=g.payload)==null?void 0:y.correctSequence)||[];let A=0;D.robotSequence.forEach((Q,O)=>{z[O]===Q&&A++}),I=z.length>0?A/z.length:D.robotSequence.length>0?1:0,m=I>=.8}else g.type==="motor_target"?(m=D.motorClicks.length>0,I=Math.min(1,D.motorClicks.length/(((P=g.payload)==null?void 0:P.targetsCount)||3))):(m=D.selectedAnswerIndex===(((k=g.payload)==null?void 0:k.correctIndex)??0),I=m?1:0);o[g.id]=L.maxPoints,t.push({item_id:g.id,domain:g.domain,skill:g.skill,difficulty_level:g.difficulty,is_correct:m,accuracy_score:I,response_time_ms:Math.max(1e3,D.timeSpentMs),expected_time_ms:9e4,attempts_count:Math.max(1,D.attemptsCount),hints_used:D.hintsUsed}),this.questionTimeRecords[c]&&(this.questionTimeRecords[c].earnedScore=ne.calculateItemScore(t[c],L.maxPoints))}const n=ne.calculateDomainScores(t,o),a=ne.calculateTotalScore(n),r=Me.evaluatePlacement(a,n,t),s=["cognitive_ability","functional_skills","communication_level","behavioral_readiness","fine_motor_technology"],l={};s.forEach(c=>{const g=this.questionTimeRecords.filter(A=>A&&A.domain===c),D=g.reduce((A,Q)=>A+(Q.activeDurationMs||0),0),L=g.reduce((A,Q)=>A+(Q.pausedDurationMs||0),0),m=g.filter(A=>A.timedOut).length,I=g.map(A=>A.responseLatencyMs).filter(A=>A!==null),z=I.length>0?Math.round(I.reduce((A,Q)=>A+Q,0)/I.length):0;l[c]={totalActiveMs:D,totalPausedMs:L,questionsTimedOut:m,avgResponseLatencyMs:z}});const d=this.questionTimeRecords.reduce((c,g)=>c+((g==null?void 0:g.activeDurationMs)||0),0),_=this.breakEvents.reduce((c,g)=>c+g.breakDurationMs,0),M={session_id:`sess_60_${Date.now()}`,student_name:this.studentName||"Alex Rivers",age_group:"7-9",start_time:new Date(Date.now()-this.totalTimerSeconds*1e3).toISOString(),end_time:new Date().toISOString(),item_telemetries:t,domain_scores:n,total_score:a,placed_track:r.baseTrack,recommended_track:r.recommendedTrack,flags:r.flags.map(c=>c.id),question_time_records:this.questionTimeRecords,break_events:this.breakEvents,total_breaks_count:this.breakEvents.length,total_break_duration_ms:_,total_active_duration_ms:d,total_wall_clock_duration_ms:d+_,domain_time_summary:l},v=await this.analyzer.generateReportSummary(M,r);M.qualitative_summary=v,Ae(this.container,M,r)}};F.STORAGE_KEY="cognix_active_assessment_session",F.QUESTION_TIME_LIMIT_SEC=90;let X=F,ue=null;function oe(q="Alex Rivers",t=!0){const o=document.getElementById("app");o&&(ue=new X(o),ue.startSession(q,t))}function $e(){X.clearSavedSession()}window.initAssessment=oe;window.exitAssessment=$e;document.addEventListener("DOMContentLoaded",()=>{const q=document.getElementById("app"),t=document.getElementById("childTestPage"),o=X.getSavedSession();o&&t?(document.body.classList.add("exam-mode"),t.classList.remove("hidden"),t.classList.add("exam-active"),window.scrollTo(0,0),oe(o.studentName||"Alex Rivers",!0)):q&&!t&&oe("Alex Rivers",!1)});

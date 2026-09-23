const notes = {
 search: { title: 'Teaching AI to follow a lead', intro: 'A question I want to explore: how can an AI search system use each discovery to decide what to investigate next?', questions: ['When should an agent reformulate a query instead of searching deeper?', 'How should it balance a promising lead against the cost of another search?', 'What would convince us that it found the right record?'], experiment: 'Start with a public historical record and only the clues available before it was found. Compare ordinary retrieval with an agent that can follow new leads. Record the successful discoveries, dead ends, and cost.', source: ['BrowseComp-Plus', 'https://aclanthology.org/2026.acl-long.1023/'] },
 context: { title: 'Finding the right data is only half the problem.', intro: 'An agent can locate a table without knowing whether it is current, authoritative, or even using the right definition. I want to explore the context that turns retrieval into understanding.', questions: ['What context should travel with a dataset?', 'How can code and lineage help surface missing definitions?', 'How do we keep an agent’s understanding current when systems change?'], experiment: 'Compare answers produced from table schemas alone with answers given definitions, ownership, and lineage. Inspect where the extra context changes the result.', source: ['Agent metadata in metric views', 'https://docs.databricks.com/aws/en/uc-semantics/agent-metadata'] },
 evidence: { title: 'An answer isn’t the same as evidence.', intro: 'A persuasive answer can still rest on the wrong source. I want to explore how research tools can make their claims inspectable and their uncertainty visible.', questions: ['Does the cited passage actually support the claim?', 'How should a system show conflicting records?', 'When should it say that the available evidence is insufficient?'], experiment: 'Create a small set of research questions with correct sources, plausible distractions, and unanswerable cases. Evaluate source support alongside answer accuracy.', source: ['Cross-lingual BrowseComp-Plus', 'https://arxiv.org/abs/2606.15345'] },
 archives: { title: 'The clue that doesn’t look like text.', intro: 'Some information is hard to find because it lives in a scan, an unfamiliar spelling, or the layout of a document. Historical records are a natural place to explore these limits.', questions: ['What gets lost when a document becomes plain text?', 'Can visual retrieval recover clues that OCR misses?', 'How do spelling and language variations change which records surface?'], experiment: 'Use a small collection of public archival documents to compare text retrieval with page-image retrieval. Keep the original page available so every proposed match can be checked.', source: ['MMDocIR: multimodal retrieval for long documents', 'https://arxiv.org/abs/2501.08828'] }
};
const dialog = document.querySelector('#note-dialog');
let opener;
document.querySelectorAll('[data-note]').forEach(button => button.addEventListener('click', () => {
 const note = notes[button.dataset.note]; opener = button;
 document.querySelector('#note-title').textContent = note.title;
 const content = document.querySelector('#note-content'); content.replaceChildren();
 const paragraph = text => { const p = document.createElement('p'); p.textContent = text; content.append(p); };
 paragraph(note.intro);
 const heading = document.createElement('h3'); heading.textContent = 'Questions to explore'; content.append(heading);
 const list = document.createElement('ul'); note.questions.forEach(question => { const li = document.createElement('li'); li.textContent = question; list.append(li); }); content.append(list);
 const experiment = document.createElement('h3'); experiment.textContent = 'A possible experiment'; content.append(experiment); paragraph(note.experiment);
 const source = document.createElement('p'); source.append('Starting point: '); const link = document.createElement('a'); link.textContent = note.source[0]; link.href = note.source[1]; source.append(link); content.append(source);
 dialog.showModal();
}));
const close = () => dialog.close();
document.querySelector('#close-note').addEventListener('click', close);
document.querySelector('#close-bottom').addEventListener('click', close);
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close(); } });
dialog.addEventListener('close', () => opener?.focus());
document.querySelector('#year').textContent = new Date().getFullYear();


// Ambient appearance uses the visitor's clock and Northern Hemisphere seasons.
const atmosphere = document.querySelector('#atmosphere');
const seasonSelect = document.querySelector('#season-select');
const timeSelect = document.querySelector('#time-select');
const motionToggle = document.querySelector('#ambient-motion');
const appearanceLabel = document.querySelector('#appearance-label');
const seasons = ['winter', 'spring', 'summer', 'fall'];
let preferences = { season: 'auto', time: 'auto', motion: true };
try { const saved = JSON.parse(localStorage.getItem('farman-appearance')); if (saved) preferences = { ...preferences, ...saved }; } catch {}
if (!['auto', ...seasons].includes(preferences.season)) preferences.season = 'auto';
if (!['auto', 'morning', 'afternoon', 'evening', 'night'].includes(preferences.time)) preferences.time = 'auto';
seasonSelect.value = preferences.season;
timeSelect.value = preferences.time;
motionToggle.checked = preferences.motion !== false;
const capital = value => value[0].toUpperCase() + value.slice(1);
function updateAtmosphere() {
 const now = new Date(), month = now.getMonth(), hour = now.getHours();
 const season = preferences.season === 'auto' ? seasons[Math.floor(((month + 1) % 12) / 3)] : preferences.season;
 const time = preferences.time === 'auto' ? (hour >= 5 && hour < 11 ? 'morning' : hour < 17 && hour >= 11 ? 'afternoon' : hour >= 17 && hour < 21 ? 'evening' : 'night') : preferences.time;
 document.documentElement.dataset.season = season;
 document.documentElement.dataset.time = time;
 document.documentElement.dataset.motion = motionToggle.checked ? 'on' : 'off';
 appearanceLabel.textContent = `${capital(season)} · ${capital(time)}`;
 document.querySelector('#appearance-mode').textContent = preferences.season === 'auto' && preferences.time === 'auto' ? 'Following your clock' : 'Custom atmosphere';
 document.querySelector('meta[name="theme-color"]').content = time === 'night' ? '#1d282f' : '#fafaf7';
}
function saveAtmosphere() {
 preferences = {season:seasonSelect.value,time:timeSelect.value,motion:motionToggle.checked};
 try { localStorage.setItem('farman-appearance',JSON.stringify(preferences)); } catch {}
 updateAtmosphere();
}
[seasonSelect,timeSelect,motionToggle].forEach(control => control.addEventListener('change',saveAtmosphere));
document.querySelector('#appearance-auto').addEventListener('click',()=>{seasonSelect.value='auto';timeSelect.value='auto';saveAtmosphere();});
// Fixed particle positions avoid visual jumps when previewing palettes.
for(let i=0;i<9;i++) { const particle=document.createElement('span');particle.className='ambient-particle';particle.style.setProperty('--x',`${12+(i*29)%83}%`);particle.style.setProperty('--delay',`${-i*2.7}s`);particle.style.setProperty('--duration',`${19+(i%4)*5}s`);particle.style.setProperty('--size',`${4+(i%3)*3}px`);atmosphere.append(particle); }
updateAtmosphere();
setInterval(updateAtmosphere,60000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateAtmosphere();});

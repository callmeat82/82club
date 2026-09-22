
const playerSessions={};
const playerPets={
 '01':{file:'assets/pet-calf.png',label:'Cute little calf beside Cho Seongil'},
 '06':{file:'assets/pet-hamster.png',label:'Cute little hamster beside Kim Dogyun'}
};
const companion=document.createElement('img');
companion.className='player-pet';
companion.draggable=false;
document.querySelector('.doll-wrap').append(companion);
function savePlayerSession(){
 playerSessions[currentPlayer]={outfit:{...selected},expression,motion,scene:currentScene,decorations:structuredClone(decorationState)};
}
function refreshPlayerLabels(){
 const profile=playerProfiles[currentPlayer];
 const pet=playerPets[currentPlayer];
 companion.src=pet.file;
 companion.alt=pet.label;
 companion.dataset.player=currentPlayer;
 document.querySelector('#player-name').textContent=profile.name.toUpperCase();
 document.querySelector('#character-name').textContent=profile.name;
 document.querySelector('#player-number').textContent='PLAYER '+currentPlayer;
 document.querySelector('#student-number').textContent='STUDENT NO. '+profile.number;
 document.querySelector('#edition-player').textContent='VOL. '+currentPlayer+' / '+profile.name.split(' ')[1].toUpperCase();
 document.querySelectorAll('.player-choice').forEach(b=>{b.disabled=!playerProfiles[b.dataset.player]||(ready&&!sprites[playerProfiles[b.dataset.player].face]);b.classList.toggle('active',b.dataset.player===currentPlayer);b.setAttribute('aria-pressed',String(b.dataset.player===currentPlayer))});
}
async function switchPlayer(id){
 if(!Object.hasOwn(playerProfiles,id))throw new Error('This player is coming soon.');
 if(id===currentPlayer)return{player:id};
 if(!ready||!sprites[playerProfiles[id].face])throw new Error('Character artwork is still unavailable. Please refresh to retry.');
 savePlayerSession();currentPlayer=id;
 const saved=playerSessions[id]||{outfit:{...playerProfiles[id].outfit},expression:'cool',motion:'still',scene:'grid',decorations:{items:[],selected:null,nextId:1,history:[]}};
 selected={...saved.outfit};Object.assign(decorationState,structuredClone(saved.decorations));
 itemPage=Math.floor(selected[active]/pageSize);
 refreshPlayerLabels();renderDecorations();setPersonality({expression:saved.expression,motion:saved.motion});update();
 currentScene=saved.scene;
 await switchScene(saved.scene);
 if(currentPlayer===id)document.querySelector('#status').textContent=playerProfiles[id].name+' · Shared wardrobe ready.';
 return{player:id,name:playerProfiles[id].name,studentNumber:playerProfiles[id].number};
}
for(let n=1;n<=6;n++){
 const id=String(n).padStart(2,'0'),profile=playerProfiles[id],b=document.createElement('button');
 b.className='player-choice';b.dataset.player=id;b.disabled=!profile;
 b.innerHTML='<span class="player-id">'+id+'</span><span><small>PLAYER '+id+'</small><strong>'+(profile?profile.name.toUpperCase():'COMING SOON')+'</strong></span>';
 b.setAttribute('aria-label',profile?'Select Player '+id+' '+profile.name:'Player '+id+' coming soon');
 b.onclick=()=>switchPlayer(id).catch(e=>document.querySelector('#status').textContent=e.message);
 document.querySelector('#player-menu').append(b);
}
refreshPlayerLabels();
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'switch_player',description:'Switch between Player 01 Cho Seongil and Player 06 Kim Dogyun; each keeps their outfit, mood and decorations.',inputSchema:{type:'object',properties:{player:{type:'string',enum:['01','06']}},required:['player'],additionalProperties:false},execute:input=>switchPlayer(input.player)})).catch(()=>{})}catch{}}


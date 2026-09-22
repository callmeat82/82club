const wardrobe={hair:['Silver curtains','Midnight tousle','Ash crop','Brown curtains','Long black layers','Blond slick-back'],tops:['Rebel uniform','Varsity jacket','Olive bomber','Cream cardigan','Biker leather','Track jacket'],bottoms:['Uniform trousers','Blue denim','Cargo trousers','Pleated chinos','Ripped denim','Track pants'],shoes:['School boots','White sneakers','Combat boots','Penny loafers','Red high-tops','Sport trainers'],accessories:['No extras','Silver chain','Face bandages','Dark shades','School pin','Chain + bandages']};
wardrobe.hair.push('Auburn fluff','Ice-blue side part','Lavender layers','Honey crop');
wardrobe.tops.push('Burgundy hoodie','Pinstripe blazer','Graphic tee','Workwear jacket');
wardrobe.bottoms.push('Wide grey denim','Tailored trousers','Denim shorts','Cargo shorts');
wardrobe.shoes.push('Canvas sneakers','Dress loafers','Yellow high-tops','Hiking boots');
wardrobe.accessories.push('Silver hoops','Red scarf','Headphones','Round glasses');
wardrobe.accessories.push('Pants chain');
wardrobe.hair.push('Dogyun slick-back','Black curtains');
wardrobe.tops.push('Purple sleeveless','Blue crewneck');
wardrobe.bottoms.push('Belt-strap denim','Campus denim');
wardrobe.shoes.push('Black low-tops','Campus sneakers');
wardrobe.accessories.push('Layered silver','Wrist wraps');
wardrobe.hair.push('Piecey black fringe','Neat center part');
wardrobe.tops.push('Black school jacket','White crewneck tee');
wardrobe.bottoms.push('Black straight trousers','Charcoal jeans');
wardrobe.shoes.push('Black lace-up boots','Black-white sneakers');
const spriteFiles=Array.from({length:10},(_,i)=>'assets/doll-'+i+'.png').concat('assets/kim-default.png','assets/kim-campus.png','assets/kim-black.png','assets/kim-white.png');
let currentPlayer='01',itemPage=0;
const pageSize=6;
const playerProfiles={
 '01':{name:'Cho Seongil',number:'0329',face:0,outfit:{hair:0,tops:0,bottoms:0,shoes:0,accessories:5}},
 '06':{name:'Kim Dogyun',number:'0914',face:10,outfit:{hair:10,tops:10,bottoms:10,shoes:10,accessories:10}}
};
const styleNames=['School rebel','Varsity club','Street crew','Soft academia','Midnight rider','Track team'];
const playerStyles={
 '01':[
  {hair:0,tops:0,bottoms:0,shoes:0,accessories:5},{hair:1,tops:1,bottoms:1,shoes:1,accessories:1},{hair:2,tops:2,bottoms:2,shoes:2,accessories:3},{hair:3,tops:3,bottoms:3,shoes:3,accessories:0},{hair:4,tops:4,bottoms:4,shoes:4,accessories:2},{hair:5,tops:5,bottoms:5,shoes:5,accessories:4}
 ],
 '06':[
  {hair:10,tops:10,bottoms:10,shoes:10,accessories:11},{hair:11,tops:11,bottoms:11,shoes:11,accessories:10},{hair:12,tops:12,bottoms:12,shoes:12,accessories:12},{hair:13,tops:13,bottoms:13,shoes:13,accessories:1},{hair:10,tops:12,bottoms:13,shoes:10,accessories:12},{hair:11,tops:13,bottoms:12,shoes:11,accessories:10}
 ]
};
const categoryNames={hair:'Hairstyles',tops:'Tops',bottoms:'Bottoms',shoes:'Shoes',accessories:'Accessories'};
const paths={hair:'M4 15V8l4-5h8l4 5v7l-4-5-4-3-4 5v3M4 15v5h4M20 15v5h-4',tops:'M8 3L2 7l3 6 3-2v10h8V11l3 2 3-6-6-4-4 3z',bottoms:'M6 3h12l2 18h-7l-1-11-1 11H4zM6 7h12',shoes:'M4 5h7v7l9 4v5H3V10zM3 17h17',accessories:'M3 5v7l4 7h10l4-7V5M7 4v8l5 5 5-5V4'};
let selected={hair:0,tops:0,bottoms:0,shoes:0,accessories:5},active='hair',ready=false,sprites=[];
let expression='cool',motion='still',animationFrame=0;
const expressions={cool:'Cool',smile:'Smile',wink:'Wink',mad:'Mad',sad:'Sad'},motions={still:'Stand',sway:'Sway'};
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
// Each generated doll is aligned to a common 128 x 256 rig; exchangeable regions use the same boundary lines.
const regions={hair:[0,85],tops:[85,168],bottoms:[168,217],shoes:[217,256]};
const doll=document.querySelector('#doll'),ctx=doll.getContext('2d');
function accessory(c,id,scale=1){c.save();c.scale(scale,scale);const box=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};
 if(id===1||id===5){[[51,89],[53,93],[55,97],[58,100],[62,103],[66,103],[70,100],[73,97],[75,93]].forEach(([x,y])=>{box(x,y,3,2,'#474945');box(x,y,2,1,'#e4e5d4')});box(63,105,3,5,'#ddddc9')}
 if(id===2||id===5){box(72,43,7,10,'#e8d8b4');box(74,46,3,4,'#a35f51');box(57,63,11,3,'#e7cab4');box(62,63,2,3,'#aa6156')}
 if(id===3){box(44,62,17,9,'#171c1d');box(67,62,17,9,'#171c1d');box(59,64,10,3,'#171c1d');box(46,63,5,2,'#65747c');box(69,63,5,2,'#65747c')}
 if(id===4){box(77,100,8,11,'#29302b');box(78,101,6,9,'#d5b863');box(80,103,2,5,'#434c35')}
 if(id===6){for(const x of [35,87]){box(x,71,6,9,'#45474a');box(x+1,72,4,7,'#d4dce0');box(x+2,73,2,4,'#7f8b90')}}
 if(id===7){box(50,85,29,8,'#632f31');box(53,87,27,7,'#a9443b');box(71,91,8,22,'#963b33');box(72,112,2,4,'#c7614c');box(76,112,2,4,'#c7614c');box(52,87,23,2,'#c7614c')}
 if(id===8){box(29,40,4,31,'#262d35');box(95,40,4,31,'#262d35');box(33,28,4,14,'#262d35');box(91,28,4,14,'#262d35');box(37,22,54,5,'#262d35');box(30,59,9,18,'#181d24');box(89,59,9,18,'#181d24');box(32,61,5,14,'#788895');box(91,61,5,14,'#788895')}
 if(id===9){c.strokeStyle='#614e3d';c.lineWidth=1.5;c.strokeRect(44,62,16,11);c.strokeRect(68,62,16,11);box(60,65,8,2,'#614e3d');box(40,64,4,2,'#614e3d');box(84,64,4,2,'#614e3d')}
 if(id===12){c.strokeStyle='#b8c0c7';c.lineWidth=1.5;c.beginPath();c.moveTo(79,139);c.lineTo(88,150);c.lineTo(84,165);c.stroke();box(82,163,5,4,'#cbd1d5')}

 if(id===10){for(const dy of [0,5]){c.strokeStyle='#555966';c.lineWidth=2;c.beginPath();c.moveTo(50,88+dy);c.lineTo(55,99+dy);c.lineTo(64,105+dy);c.lineTo(74,99+dy);c.lineTo(79,88+dy);c.stroke();c.strokeStyle='#e2e4e9';c.lineWidth=1;c.stroke()}}
 if(id===11){box(27,153,10,9,'#e2ddd6');box(91,153,10,9,'#e2ddd6');for(const y of [155,158]){box(27,y,10,1,'#aaa9a5');box(91,y,10,1,'#aaa9a5')}}
 c.restore();}
const topLayer=document.createElement('canvas'),faceLayer=document.createElement('canvas'),bottomLayer=document.createElement('canvas');
topLayer.width=faceLayer.width=bottomLayer.width=128;topLayer.height=faceLayer.height=bottomLayer.height=256;
doll.width=384;
function paintExpression(c){if(expression==='cool')return;
 const f=faceLayer.getContext('2d');f.clearRect(0,0,128,256);f.drawImage(sprites[playerProfiles[currentPlayer].face],0,0);c.drawImage(faceLayer,59,73,9,3,59,76,9,4);
 if(expression==='smile'||expression==='wink'){c.fillStyle='#76504b';c.fillRect(59,77,2,1);c.fillRect(61,78,5,1);c.fillRect(66,77,2,1);c.fillStyle='#f2d9c5';c.fillRect(61,77,5,1)}
 if(expression==='wink'){c.drawImage(faceLayer,68,73,13,2,68,63,13,10);c.fillStyle='#423532';c.fillRect(69,67,3,1);c.fillRect(72,68,5,1);c.fillRect(77,67,3,1);c.fillRect(80,66,1,1)}
 if(expression==='mad'){c.fillStyle='#49372f';[[45,59,4,2],[49,60,4,2],[53,61,5,2],[70,61,5,2],[75,60,4,2],[79,59,4,2],[60,78,8,1],[58,79,2,1],[68,79,2,1]].forEach(r=>c.fillRect(...r));c.fillStyle='#c77e6c';c.fillRect(43,72,5,2);c.fillRect(80,72,5,2)}
 if(expression==='sad'){c.fillStyle='#725047';[[46,61,5,1],[51,60,5,2],[72,60,5,2],[77,61,5,1],[60,78,8,1],[58,79,2,1],[68,79,2,1]].forEach(r=>c.fillRect(...r));c.fillStyle='#78b9d3';c.fillRect(48,72,3,5);c.fillRect(78,72,3,5);c.fillStyle='#c9edf0';c.fillRect(48,72,1,3);c.fillRect(78,72,1,3)}
}

function paintIdentity(c){
 if(currentPlayer==='06' && selected.hair>=10)return;
 const source=sprites[playerProfiles[currentPlayer].face];
 c.save();c.beginPath();c.moveTo(43,currentPlayer==='06'?58:62);c.lineTo(85,currentPlayer==='06'?58:62);c.lineTo(84,75);c.lineTo(77,82);c.lineTo(69,86);c.lineTo(59,86);c.lineTo(50,81);c.lineTo(44,74);c.closePath();c.clip();c.drawImage(source,0,0);c.restore();
}
function renderDoll(time=performance.now()){if(!ready||!sprites[playerProfiles[currentPlayer].face]||['hair','tops','bottoms','shoes'].some(k=>!sprites[selected[k]]))return;ctx.clearRect(0,0,384,512);ctx.imageSmoothingEnabled=false;ctx.save();ctx.scale(2,2);ctx.translate(32,0);const phase=time/500,animate=!reducedMotion.matches;
 if(motion==='sway'){ctx.translate(64,243);ctx.rotate(animate?Math.sin(phase)*.045:-.035);ctx.translate(-64,-243)}
 const bottom=bottomLayer.getContext('2d');bottom.clearRect(0,0,128,256);bottom.drawImage(sprites[selected.bottoms],0,142,128,75,0,142,128,75);bottom.clearRect(0,142,40,28);bottom.clearRect(88,142,40,28);ctx.drawImage(bottomLayer,0,0);ctx.drawImage(sprites[selected.shoes],0,217,128,39,0,217,128,39);
 const t=topLayer.getContext('2d');t.clearRect(0,0,128,256);t.drawImage(sprites[selected.tops],0,85,128,85,0,85,128,85);t.clearRect(51,142,26,28);t.clearRect(40,158,48,12);
 ctx.drawImage(topLayer,0,0);
 ctx.drawImage(sprites[selected.hair],0,0,128,85,0,0,128,85);paintIdentity(ctx);paintExpression(ctx);accessory(ctx,selected.accessories);ctx.restore();
 doll.setAttribute('aria-label',playerProfiles[currentPlayer].name+': '+Object.keys(selected).map(k=>wardrobe[k][selected[k]]).join(', ')+'. Expression: '+expressions[expression]+'. Action: '+motions[motion]+'.');}
function startMotion(){cancelAnimationFrame(animationFrame);renderDoll();if(motion!=='still'&&!reducedMotion.matches&&!document.hidden){const frame=time=>{renderDoll(time);animationFrame=requestAnimationFrame(frame)};animationFrame=requestAnimationFrame(frame)}}
document.addEventListener('visibilitychange',startMotion);reducedMotion.addEventListener('change',startMotion);
function renderItems(){const holder=document.querySelector('#items');holder.replaceChildren();document.querySelector('#item-count').textContent=String(wardrobe[active].length).padStart(2,'0')+' ITEMS';document.querySelector('#category-title').textContent=categoryNames[active];wardrobe[active].slice(itemPage*pageSize,(itemPage+1)*pageSize).forEach((name,offset)=>{const i=itemPage*pageSize+offset;const b=document.createElement('button');b.className='item'+(selected[active]===i?' selected':'');b.setAttribute('aria-label','Wear '+name);b.setAttribute('aria-pressed',String(selected[active]===i));b.innerHTML='<span class="item-preview"><canvas width="128" height="100" aria-hidden="true"></canvas></span><span class="item-caption"><span>'+name+'</span><span class="item-number">'+String(i+1).padStart(2,'0')+'</span></span>'+(selected[active]===i?'<span class="checkmark">✓</span>':'');b.disabled=ready&&active!=='accessories'&&!sprites[i];b.onclick=()=>{selected[active]=i;update('Trying on '+name+'.')};holder.append(b);const c=b.querySelector('canvas').getContext('2d');c.imageSmoothingEnabled=false;if(active==='accessories'){if(i===0){c.strokeStyle='#7d8968';c.lineWidth=2;c.strokeRect(48,32,32,32);c.beginPath();c.moveTo(49,63);c.lineTo(79,33);c.stroke()}else{c.save();const cy=({1:100,2:59,3:66,4:105,5:78,6:75,7:99,8:51,9:68,10:102,11:157,12:142})[i]||78;c.translate(64-64*1.6,50-cy*1.6);c.scale(1.6,1.6);accessory(c,i);c.restore()}}else if(ready&&sprites[i]){const [y,end]=regions[active],h=end-y;const factor=Math.min(96/128,88/h);c.drawImage(sprites[i],0,y,128,h,(128-128*factor)/2,(100-h*factor)/2,128*factor,h*factor)}});document.querySelector('#selected-label').textContent=wardrobe[active][selected[active]];const pages=Math.ceil(wardrobe[active].length/pageSize);document.querySelector('#page-status').textContent=(itemPage+1)+' / '+pages;document.querySelector('#previous-page').disabled=itemPage===0;document.querySelector('#next-page').disabled=itemPage>=pages-1;}
function update(message){renderDoll();renderItems();const matched=styleNames.findIndex((_,i)=>['hair','tops','bottoms','shoes'].every(k=>selected[k]===i));document.querySelector('#style-name').textContent=['hair','tops','bottoms','shoes'].every(k=>selected[k]===10)?'Dogyun original':['hair','tops','bottoms','shoes'].every(k=>selected[k]===11)?'Campus blue':matched<0?'Own rules':styleNames[matched];document.querySelectorAll('.preset').forEach((b,i)=>{b.classList.toggle('active',i===matched);b.setAttribute('aria-pressed',String(i===matched))});if(message)document.querySelector('#status').textContent=message;}
function chooseCategory(key){active=key;itemPage=0;document.querySelectorAll('.category').forEach(b=>{b.classList.toggle('active',b.dataset.key===key);b.setAttribute('aria-pressed',String(b.dataset.key===key))});renderItems()}
styleNames.forEach((name,i)=>{const b=document.createElement('button');b.className='preset';b.innerHTML='<span class="num">0'+(i+1)+'</span><span>'+name+'</span><span class="arrow">↗</span>';b.onclick=()=>{selected={...selected,...playerStyles[currentPlayer][i]};itemPage=Math.floor(selected[active]/pageSize);update(name+' equipped.')};document.querySelector('#presets').append(b)});
Object.keys(wardrobe).forEach(key=>{const b=document.createElement('button');b.className='category';b.dataset.key=key;b.innerHTML='<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="'+paths[key]+'"/></svg><span>'+({hair:'Hair',accessories:'Extras'}[key]||categoryNames[key])+'</span>';b.onclick=()=>chooseCategory(key);document.querySelector('.categories').append(b)});
document.querySelector('#previous-page').onclick=()=>{if(itemPage>0){itemPage--;renderItems()}};
document.querySelector('#next-page').onclick=()=>{if((itemPage+1)*pageSize<wardrobe[active].length){itemPage++;renderItems()}};
document.querySelector('#random').onclick=()=>{Object.keys(selected).forEach(k=>{const available=wardrobe[k].map((_,i)=>i).filter(i=>k==='accessories'||sprites[i]);if(available.length)selected[k]=available[Math.floor(Math.random()*available.length)]});itemPage=Math.floor(selected[active]/pageSize);update('New look. Same attitude.')};
document.querySelector('#reset').onclick=()=>{selected={...playerProfiles[currentPlayer].outfit};itemPage=Math.floor(selected[active]/pageSize);update(playerProfiles[currentPlayer].name+' original look restored.')};
async function init(){try{sprites=await Promise.all(spriteFiles.map((file)=>new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>resolve(null);im.src=file})));ready=!!sprites[0];document.querySelector('#loading').hidden=ready;if(!ready)throw new Error('Base character unavailable');refreshPlayerLabels();update(sprites.some(s=>!s)?'Some character artwork is unavailable. Please refresh to retry.':undefined)}catch{document.querySelector('#loading').textContent='Could not load the wardrobe. Please refresh.';document.querySelector('#status').textContent='Character artwork could not load.'}}
chooseCategory('hair');update();init();
const scenes={grid:{name:'Fit check',file:null},classroom:{name:'Classroom',file:'assets/classroom.png'},practice:{name:'Practice Room',file:'assets/practice-room.png'}};
let currentScene='grid',sceneRequest=0;
const stage=document.querySelector('.stage'),sceneControls=document.createElement('div');
sceneControls.className='scene-controls';sceneControls.innerHTML='<span class="eyebrow" id="scene-label">LOCATION</span><div class="scene-options" role="group" aria-labelledby="scene-label"></div>';
stage.after(sceneControls);
const personality=document.createElement('div');personality.className='personality-controls';sceneControls.after(personality);
for(const [kind,options] of [['expression',expressions],['motion',motions]]){const row=document.createElement('div');row.className='personality-row';row.innerHTML='<span class="eyebrow" id="'+kind+'-label">'+(kind==='expression'?'EXPRESSION':'ACTION')+'</span><div class="personality-options" role="group" aria-labelledby="'+kind+'-label"></div>';for(const [key,name] of Object.entries(options)){const b=document.createElement('button');b.className='personality-button';b.dataset.kind=kind;b.dataset.value=key;b.textContent=name;b.setAttribute('aria-pressed',String(key===(kind==='expression'?expression:motion)));b.onclick=()=>setPersonality({[kind]:key});row.querySelector('.personality-options').append(b)}personality.append(row)}
function setPersonality(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['expression','motion'].includes(k))||('expression' in input&&!Object.hasOwn(expressions,input.expression))||('motion' in input&&!Object.hasOwn(motions,input.motion)))throw new Error('Choose a listed expression or action.');if(input.expression)expression=input.expression;if(input.motion)motion=input.motion;document.querySelectorAll('.personality-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.value===(b.dataset.kind==='expression'?expression:motion))));startMotion();document.querySelector('#status').textContent=expressions[expression]+' · '+motions[motion]+(selected.accessories===3&&expression==='wink'?' · Shades cover the wink.':reducedMotion.matches&&motion!=='still'?' · Reduced motion: pose only.':'.');return{expression,motion,outfitKept:true,scene:currentScene};}
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'set_personality',description:'Change the character expression or action while retaining the outfit and scene.',inputSchema:{type:'object',properties:{expression:{type:'string',enum:Object.keys(expressions)},motion:{type:'string',enum:Object.keys(motions)}},additionalProperties:false},annotations:{readOnlyHint:false},execute:setPersonality})).catch(()=>{})}catch{}}
for(const [key,scene] of Object.entries(scenes)){const b=document.createElement('button');b.className='scene-button';b.dataset.scene=key;b.textContent=scene.name;b.setAttribute('aria-pressed',String(key===currentScene));b.onclick=()=>switchScene(key).catch(()=>{});sceneControls.querySelector('.scene-options').append(b)}
async function switchScene(key){if(!Object.hasOwn(scenes,key))throw new Error('Choose grid, classroom, or practice.');const request=++sceneRequest,scene=scenes[key];let background;
 if(scene.file){document.querySelector('#status').textContent='Opening '+scene.name+'…';try{background=await new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('Background could not load. Please try again.'));im.src=scene.file})}catch(error){if(request===sceneRequest)document.querySelector('#status').textContent=error.message;throw error}}
 if(request!==sceneRequest)return{cancelled:true};stage.querySelector('.scene-image')?.remove();if(background){background.className='scene-image';background.alt='';background.setAttribute('aria-hidden','true');stage.prepend(background)}currentScene=key;stage.classList.toggle('has-scene',!!background);stage.dataset.scene=key;stage.setAttribute('aria-label',scene.name+' character backdrop');document.querySelector('.stage-tag').textContent=scene.name.toUpperCase();document.querySelectorAll('.scene-button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.scene===key)));document.querySelector('#status').textContent=scene.name+' · Outfit kept.';return{scene:key,outfitKept:true};}
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'switch_scene',description:'Switch the character backdrop without changing the outfit.',inputSchema:{type:'object',properties:{scene:{type:'string',enum:Object.keys(scenes)}},required:['scene'],additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).some(k=>k!=='scene'))throw new Error('Supply only a scene.');return switchScene(input.scene)}})).catch(()=>{})}catch{}}
if(document.modelContext?.registerTool){try{Promise.resolve(document.modelContext.registerTool({name:'set_outfit',description:'Equip the active player with shared wardrobe item indices (0–13, accessories 0–12) and update the preview.',inputSchema:{type:'object',properties:Object.fromEntries(Object.keys(wardrobe).map(k=>[k,{type:'integer',minimum:0,maximum:wardrobe[k].length-1}])),additionalProperties:false},annotations:{readOnlyHint:false},execute(input){if(!input||typeof input!=='object'||Array.isArray(input)||Object.entries(input).some(([k,v])=>!Object.hasOwn(wardrobe,k)||!Number.isInteger(v)||v<0||v>=wardrobe[k].length))throw new Error('Use wardrobe categories and item indices within the listed category range.');selected={...selected,...input};itemPage=Math.floor(selected[active]/pageSize);update('Outfit updated.');return{outfit:Object.fromEntries(Object.keys(selected).map(k=>[k,wardrobe[k][selected[k]]]))}}})).catch(()=>{})}catch{}}




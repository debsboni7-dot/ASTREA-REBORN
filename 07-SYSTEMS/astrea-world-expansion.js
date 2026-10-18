// ASTREA REBORN — systèmes monde v1
// Monnaie, continents, voyages maritimes, royaumes et créatures.
// Les créatures procédurales sont provisoires et seront remplacées par les GLB finaux.
export function initAstreaWorld({ THREE, scene, player, hint, collisionBoxes, equipWeapon, addItem, renderer }) {
  const SAVE_KEY = 'astrea-world-save-v2';
  const regions = [
    { id:'astrea', name:'Astrea', biome:'Prairies et cité royale', color:0x6b9b52, sky:0x9dc5d0, price:0, bounds:{minX:-78,maxX:78,minZ:-135,maxZ:82}, description:'Le continent natal : la capitale, ses quartiers, sa forge et ses routes.' },
    { id:'van', name:'Van', biome:'Forêts anciennes', color:0x477a43, sky:0x9fc8b5, price:0, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Continent boisé, villages et ruines enfouies.' },
    { id:'beurg', name:'Beurg', biome:'Hautes terres et vallées', color:0x9b855e, sky:0xcbbd9b, price:0, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Villes fortifiées, collines et routes commerciales.' },
    { id:'night', name:'Night', biome:'Forêt nocturne', color:0x263b59, sky:0x18243e, price:0, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Forêt bleue, ruines lumineuses et créatures nocturnes.' },
    { id:'dark-continent', name:'Continent noir', biome:'Terres corrompues', color:0x302b35, sky:0x4b394d, price:0, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Zone dangereuse réservée aux aventuriers préparés.' }
  ];
  const defaults = { coins:500, region:'astrea', kingdoms:[], discovered:['astrea'], inventory:[], resources:{bois:0,pierre:0,herbes:0,ecaille:0,ivoire:0}, potions:1, equipment:'Mains nues', hasBoat:false, skillPoints:0, skills:{power:0,vitality:0,flow:0}, defeated:[], claimedQuests:[], harvestAt:{}, questStep:0, level:1, xp:0, hp:100, maxHp:100 };
  let save = defaults;
  try { const old=JSON.parse(localStorage.getItem(SAVE_KEY)||'null'); if(old&&typeof old==='object') save={...defaults,...old,resources:{...defaults.resources,...(old.resources||{})},skills:{...defaults.skills,...(old.skills||{})},skillPoints:Number.isFinite(old.skillPoints)?old.skillPoints:0,inventory:Array.isArray(old.inventory)?old.inventory:defaults.inventory,claimedQuests:Array.isArray(old.claimedQuests)?old.claimedQuests:[],harvestAt:old.harvestAt&&typeof old.harvestAt==='object'?old.harvestAt:{}}; } catch {}
  let currentRegion = regions.find(r=>r.id===save.region) || regions[0];
  let boatTrips = 0;
  const zoneGroups = {};
  // Plaine extérieure d'Astrea : zone de sortie continue au-delà des remparts.
  const outskirts = new THREE.Group(); outskirts.userData.astreaOutskirts=true; scene.add(outskirts);
  {
    const geo=new THREE.PlaneGeometry(300,300,80,80),a=geo.attributes.position;
    for(let i=0;i<a.count;i++){const x=a.getX(i),z=a.getY(i),d=Math.max(Math.abs(x),Math.abs(z));const fade=Math.min(1,Math.max(0,(d-28)/42));const h=(Math.sin(x*.035)*1.4+Math.cos(z*.041)*1.2+Math.sin((x+z)*.023)*1.7)*fade;a.setZ(i,h);}
    geo.computeVertexNormals();
    const canvas=document.createElement('canvas');canvas.width=128;canvas.height=128;const ctx=canvas.getContext('2d');ctx.fillStyle='#65884b';ctx.fillRect(0,0,128,128);let seed=771;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};for(let i=0;i<900;i++){ctx.globalAlpha=.12+rand()*.3;ctx.fillStyle=['#456b38','#8da85d','#6f9148','#b3aa69'][i%4];ctx.beginPath();ctx.ellipse(rand()*128,rand()*128,1+rand()*2,1+rand()*1.5,rand()*3,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;
    const tex=new THREE.CanvasTexture(canvas);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(14,14);tex.colorSpace=THREE.SRGBColorSpace;
    const ground=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:tex,roughness:1}));ground.rotation.x=-Math.PI/2;ground.position.set(0,-.24,0);ground.receiveShadow=true;outskirts.add(ground);
    // Bord de mer et sentier de sortie visibles au-delà du village.
    const path=new THREE.Mesh(new THREE.PlaneGeometry(5,95),new THREE.MeshStandardMaterial({color:0xb8a17a,roughness:1}));path.rotation.x=-Math.PI/2;path.position.set(0,-.12,40);outskirts.add(path);
  }
  // Aucun dragon ni mammouth factice : ils seront ajoutés lorsqu'un vrai modèle GLB sera disponible.
  function persist(){ try { localStorage.setItem(SAVE_KEY,JSON.stringify({...save,region:currentRegion.id})); } catch {} }
  function el(tag, attrs={}, text=''){const n=document.createElement(tag);for(const [k,v] of Object.entries(attrs)){if(k==='style')n.style.cssText=v;else if(k==='class')n.className=v;else n.setAttribute(k,v)}if(text)n.textContent=text;return n}
  const style=el('style');style.textContent='.astrea-world-btn{position:fixed;top:194px;right:12px;z-index:8;pointer-events:auto;border:1px solid #d5c28b;background:#152c2bea;color:#fff;border-radius:10px;padding:9px 11px;font-weight:900;font-size:12px;box-shadow:0 4px 14px #0007}.astrea-world-panel{position:fixed;z-index:20;inset:5% 4%;max-width:560px;margin:auto;overflow:auto;pointer-events:auto;background:linear-gradient(160deg,#0c1b25f7,#152a26f7);border:1px solid #c9ad67;border-radius:18px;padding:16px;color:#f4f1e7;box-shadow:0 18px 60px #000b;font:14px system-ui}.astrea-world-panel[hidden]{display:none}.astrea-world-panel h2{margin:0 0 5px;color:#f2d48b;font-size:21px}.astrea-world-panel h3{font-size:14px;color:#f2d48b;margin:14px 0 7px}.astrea-world-panel p{color:#d3ddd8;line-height:1.4}.astrea-world-panel .aw-row{display:flex;gap:8px;flex-wrap:wrap}.astrea-world-panel button,.astrea-world-panel input,.astrea-world-panel select{font:inherit;border-radius:9px;border:1px solid #829b8c;padding:9px;background:#203b38;color:#fff}.astrea-world-panel button{cursor:pointer;font-weight:750}.astrea-world-panel button:disabled{opacity:.4}.astrea-world-panel .aw-card{border:1px solid #587366;border-radius:12px;padding:10px;margin:7px 0;background:#091a1b88}.astrea-world-panel .aw-muted{font-size:12px;color:#afc4ba}.astrea-world-panel .aw-close{float:right;background:#4b302c}.astrea-world-panel input{width:100%;margin:5px 0 8px;box-sizing:border-box}@media(max-width:420px){.astrea-world-panel{inset:3% 3%;padding:12px}.astrea-world-btn{top:190px;right:8px}}';document.head.appendChild(style);
  const btn=el('button',{class:'astrea-world-btn',type:'button'},'MONDE 🌍');document.body.appendChild(btn);
  const panel=el('section',{class:'astrea-world-panel',hidden:'',role:'dialog','aria-label':'Systèmes du monde ASTREA'});document.body.appendChild(panel);
  btn.addEventListener('click',()=>{renderPanel();panel.hidden=false});
  function close(){panel.hidden=true}
  function button(label,fn,disabled=false){const b=el('button',{type:'button'},label);b.disabled=disabled;b.addEventListener('click',fn);return b}
  function makeCard(title,description,children=[]){const c=el('div',{class:'aw-card'});c.append(el('strong',{},title),el('p',{},description));const row=el('div',{class:'aw-row'});children.forEach(x=>row.append(x));c.append(row);return c}
  function renderPanel(){
    panel.replaceChildren();
    const closeBtn=button('FERMER ✕',close);closeBtn.className='aw-close';
    panel.append(closeBtn,el('h2',{},'ASTREA — Monde vivant'),el('p',{},'Monnaie, continents, voyages, royaumes et créatures. Progression sauvegardée sur cet appareil.'));
    const balance=el('div',{class:'aw-card'});balance.append(el('strong',{},'💰 '+save.coins+' Couronnes'),el('p',{class:'aw-muted'},'Récompenses gagnées en explorant et en affrontant les créatures.'));panel.append(balance);
    panel.append(el('h3',{},'🌐 CONTINENTS & VOYAGES'));
    for(const r of regions){
      const unlocked=save.discovered.includes(r.id)||r.id==='astrea';
      const isCurrent=currentRegion.id===r.id;
      const action=button(isCurrent?'ZONE ACTUELLE':unlocked?'VOYAGER':'Voyager — '+r.price+' couronnes',()=>travel(r.id),isCurrent||(!unlocked&&save.coins<r.price));
      panel.append(makeCard(r.name+' · '+r.biome,r.description+' '+(r.price?'Coût du premier voyage : '+r.price+' couronnes.':'Voyage par monture à débloquer dans la progression.'),[action]));
    }
    panel.append(el('h3',{},'🛶 VOYAGE EN BARQUE'));
    panel.append(makeCard('Embarcadère d’Astrea','Achète une barque pour 350 couronnes pour traverser vers les autres continents.',[
      button(save.hasBoat?'BARQUE POSSÉDÉE':'ACHETER UNE BARQUE — 350 💰',()=>{if(save.hasBoat){hint.textContent='Ta barque est prête à l’embarcadère.';return;}if(save.coins<350){hint.textContent='Il te faut 350 couronnes. Termine des quêtes pour gagner de l’argent.';return;}save.coins-=350;save.hasBoat=true;persist();hint.textContent='Barque achetée ! Tu peux voyager depuis l’embarcadère.';renderPanel();},save.hasBoat||save.coins<350)
    ]));
    panel.append(el('h3',{},'🏰 FONDER TON PAYS'));
    panel.append(el('p',{},'Prix de fondation : 5 000 couronnes. Choisis un nom et une région découverte. Le pays est enregistré dans ta sauvegarde locale.'));
    const nameInput=el('input',{type:'text',maxlength:'24',placeholder:'Nom de ton pays (2 à 24 caractères)'});
    const regionSelect=el('select',{style:'width:100%;padding:10px;border-radius:9px;background:#203b38;color:white;border:1px solid #829b8c'});
    regions.filter(r=>save.discovered.includes(r.id)).forEach(r=>regionSelect.append(el('option',{value:r.id},r.name)));
    panel.append(nameInput,regionSelect,button('FONDER LE PAYS — 5 000 💰',()=>{
      const name=nameInput.value.trim();
      if(name.length<2){hint.textContent='Entre un nom de pays d’au moins 2 caractères.';return}
      if(save.coins<5000){hint.textContent='Il te faut 5 000 couronnes pour fonder un pays. Gagne des récompenses en combattant.';return}
      save.coins-=5000;save.kingdoms.push({name,region:regionSelect.value,level:1,population:10,buildings:[],treasury:0,lastTaxAt:0,createdAt:Date.now()});persist();hint.textContent='Le pays '+name+' a été fondé !';renderPanel();
    },save.coins<5000));
    if(save.kingdoms.length){panel.append(el('h3',{},'📜 TES PAYS'));save.kingdoms.forEach(k=>{
      if(!Array.isArray(k.buildings))k.buildings=[];
      if(!Number.isFinite(k.treasury))k.treasury=0;
      if(!Number.isFinite(k.lastTaxAt))k.lastTaxAt=0;
      const taxReady=Date.now()-k.lastTaxAt>=300000;
      const taxAmount=Math.max(10,Math.floor(k.population*2+k.level*15+k.buildings.length*20));
      const cards=[
        button('Développer (1 000 💰)',()=>{if(save.coins<1000){hint.textContent='Il te manque des couronnes.';return}save.coins-=1000;k.level++;k.population+=25;persist();renderPanel()},save.coins<1000),
        button('Collecter les impôts (+'+taxAmount+' 💰)',()=>{if(Date.now()-k.lastTaxAt<300000){hint.textContent='Les impôts ont déjà été collectés. Reviens dans quelques minutes.';return}k.lastTaxAt=Date.now();k.treasury+=taxAmount;save.coins+=taxAmount;persist();hint.textContent='Impôts collectés pour '+k.name+' : +'+taxAmount+' Couronnes.';renderPanel()},!taxReady),
        button('Construire une ferme (600 💰)',()=>{if(save.coins<600){hint.textContent='Il te faut 600 Couronnes.';return}if(k.buildings.includes('Ferme')){hint.textContent='Ce pays possède déjà une ferme.';return}save.coins-=600;k.buildings.push('Ferme');k.population+=5;persist();hint.textContent='Ferme construite : la population augmente.';renderPanel()},save.coins<600||k.buildings.includes('Ferme')),
        button('Construire une caserne (900 💰)',()=>{if(save.coins<900){hint.textContent='Il te faut 900 Couronnes.';return}if(k.buildings.includes('Caserne')){hint.textContent='Ce pays possède déjà une caserne.';return}save.coins-=900;k.buildings.push('Caserne');persist();hint.textContent='Caserne construite : la défense du pays est renforcée (gestion stratégique en cours de développement).';renderPanel()},save.coins<900||k.buildings.includes('Caserne'))
      ];
      panel.append(makeCard(k.name+' — Niveau '+k.level,k.population+' habitants · Région : '+(regions.find(r=>r.id===k.region)?.name||k.region)+' · Bâtiments : '+(k.buildings.length?k.buildings.join(', '):'aucun')+' · Trésorerie cumulée : '+(k.treasury||0)+' Couronnes',cards));
    })}
    panel.append(el('h3',{},'🛒 MARCHANDS & ÉQUIPEMENT'));
    const shopItems=[
      {id:'potion',name:'Potion de soin',desc:'Restaure 35 PV hors combat.',price:35},
      {id:'iron-sword',name:'Épée classique',weaponId:'basic-sword',desc:'Une arme fiable pour l’aventure.',price:120},
      {id:'forest-blade',name:'Katana du voyageur',weaponId:'katana',desc:'Une lame rapide pour l’exploration.',price:260},
      {id:'dragon-edge',name:'Épée du Soleil',weaponId:'sun-sword',desc:'Une arme rare de rang supérieur.',price:650}
    ];
    shopItems.forEach(item=>panel.append(makeCard(item.name,item.desc+' · '+item.price+' Couronnes',[
      button(item.id==='potion'?'ACHETER':save.inventory.includes(item.name)?'DÉJÀ POSSÉDÉ':'ACHETER / ÉQUIPER',()=>{
        if(item.id!=='potion'&&save.inventory.includes(item.name)){save.equipment=item.name;persist();hint.textContent=item.name+' équipée dans la progression.';renderPanel();return}
        if(save.coins<item.price){hint.textContent='Pas assez de Couronnes.';return}
        save.coins-=item.price;
        if(item.id==='potion'){save.potions=(save.potions||0)+1;if(addItem)addItem('Potion de soin',1)}
        else {save.inventory.push(item.name);save.equipment=item.name;if(item.weaponId&&equipWeapon)equipWeapon(item.weaponId)}
        persist();hint.textContent=item.name+' acheté.';renderPanel();
      },item.id!=='potion'&&save.inventory.includes(item.name)&&save.equipment===item.name)
    ])));
    panel.append(el('h3',{},'🎒 INVENTAIRE & FABRICATION'));
    panel.append(makeCard('Sac d’aventure','Arme équipée : '+(save.equipment||'Épée de départ')+' · Potions : '+(save.potions||0)+' · PV : '+save.hp+'/'+save.maxHp+' · Niveau '+save.level+' ('+save.xp+' XP)',[
      button('UTILISER UNE POTION',()=>{
        if((save.potions||0)<1){hint.textContent='Tu n’as aucune potion.';return}
        if(save.hp>=save.maxHp){hint.textContent='Tes PV sont déjà au maximum.';return}
        save.potions--;save.hp=Math.min(save.maxHp,save.hp+35);persist();hint.textContent='Potion utilisée : +35 PV.';renderPanel();
      },(save.potions||0)<1||save.hp>=save.maxHp),
      button('EXPLORER & RÉCOLTER',()=>{
        if(!save.harvestAt||typeof save.harvestAt!=='object')save.harvestAt={};
        const last=save.harvestAt[currentRegion.id]||0;
        if(Date.now()-last<30000){hint.textContent='Cette zone a déjà été récoltée. Explore un peu puis reviens dans 30 secondes.';return}
        save.harvestAt[currentRegion.id]=Date.now();
        let found=[];
        if(currentRegion.id==='van'){save.resources.bois+=3;save.resources.herbes+=2;found=['3 bois','2 herbes'];}
        else if(currentRegion.id==='beurg'){save.resources.pierre+=3;save.resources.herbes+=1;found=['3 pierres','1 herbe'];}
        else if(currentRegion.id==='night'){save.resources.pierre+=2;save.resources.ivoire+=1;found=['2 pierres','1 ivoire'];}
        else if(currentRegion.id==='dark-continent'){save.resources.pierre+=2;save.resources.bois+=1;found=['2 pierres volcaniques','1 bois'];}
        else {save.resources.bois+=2;save.resources.herbes+=1;found=['2 bois','1 herbe'];}
        persist();hint.textContent='Récolte à '+currentRegion.name+' : '+found.join(', ')+'.';renderPanel();
      })
    ]));
    panel.append(makeCard('Fabriquer une potion','Coût : 2 herbes + 25 Couronnes.',[
      button('FABRIQUER',()=>{
        if(save.resources.herbes<2||save.coins<25){hint.textContent='Il faut 2 herbes et 25 Couronnes.';return}
        save.resources.herbes-=2;save.coins-=25;save.potions=(save.potions||0)+1;if(addItem)addItem('Potion de soin',1);persist();hint.textContent='Potion fabriquée.';renderPanel();
      },save.resources.herbes<2||save.coins<25)
    ]));
    panel.append(makeCard('Fabriquer une lame en fer','Coût : 4 pierres + 3 bois + 90 Couronnes.',[
      button('FABRIQUER LA LAME',()=>{
        if(save.resources.pierre<4||save.resources.bois<3||save.coins<90){hint.textContent='Ressources insuffisantes.';return}
        save.resources.pierre-=4;save.resources.bois-=3;save.coins-=90;
        if(!save.inventory.includes('Lame forgée'))save.inventory.push('Lame forgée');
        save.equipment='Lame forgée';persist();hint.textContent='Lame forgée et équipée.';renderPanel();
      },save.resources.pierre<4||save.resources.bois<3||save.coins<90)
    ]));
    panel.append(el('p',{class:'aw-muted'},'Matériaux : '+save.resources.bois+' bois · '+save.resources.pierre+' pierres · '+save.resources.herbes+' herbes · '+save.resources.ecaille+' écailles · '+save.resources.ivoire+' ivoires.'));
    panel.append(el('h3',{},'📜 QUÊTES'));
    const quests=[
      {id:'explorer',name:'Découvrir le monde',desc:'Débloque un premier continent en voyageant.',reward:100,xp:40,done:save.discovered.length>1},
      {id:'hunter',name:'Chasseur de créatures',desc:'Vaincs le dragon ou le mammouth ancestral.',reward:200,xp:100,done:save.defeated.includes('dragon')||save.defeated.includes('mammoth')},
      {id:'founder',name:'Un royaume à soi',desc:'Fonde ton premier pays.',reward:250,xp:120,done:save.kingdoms.length>0}
    ];
    quests.forEach(q=>{
      const claimed=save.claimedQuests.includes(q.id);
      panel.append(makeCard(q.name,(q.done?'Objectif accompli. ':'Objectif non accompli. ')+q.desc+' Récompense : '+q.reward+' Couronnes et '+q.xp+' XP.',[
        button(claimed?'RÉCOMPENSE RÉCUPÉRÉE':q.done?'RÉCLAMER LA RÉCOMPENSE':'OBJECTIF À REMPLIR',()=>{
          if(claimed||!q.done)return;
          save.claimedQuests.push(q.id);save.coins+=q.reward;save.xp+=q.xp;
          while(save.xp>=save.level*100){save.xp-=save.level*100;save.level++;save.skillPoints=(save.skillPoints||0)+1;save.maxHp+=10;save.hp=save.maxHp}
          persist();hint.textContent='Quête terminée : +'+q.reward+' Couronnes et '+q.xp+' XP.';renderPanel();
        },claimed||!q.done)
      ]));
    });
    panel.append(el('h3',{},'✨ ARBRE DE COMPÉTENCES'));
    panel.append(makeCard('Points disponibles : '+(save.skillPoints||0),'Gagne un point à chaque niveau. Chaque compétence peut être améliorée jusqu’à 5 fois.',[
      button('FORCE · '+(save.skills.power||0)+'/5 — +8% dégâts',()=>{if(save.skillPoints<1||(save.skills.power||0)>=5)return;save.skillPoints--;save.skills.power++;persist();hint.textContent='Force améliorée.';renderPanel()},save.skillPoints<1||(save.skills.power||0)>=5),
      button('VITALITÉ · '+(save.skills.vitality||0)+'/5 — +20 PV',()=>{if(save.skillPoints<1||(save.skills.vitality||0)>=5)return;save.skillPoints--;save.skills.vitality++;save.maxHp+=20;save.hp=Math.min(save.maxHp,save.hp+20);persist();hint.textContent='Vitalité améliorée : +20 PV maximum.';renderPanel()},save.skillPoints<1||(save.skills.vitality||0)>=5),
      button('FLUX · '+(save.skills.flow||0)+'/5 — +5% technique',()=>{if(save.skillPoints<1||(save.skills.flow||0)>=5)return;save.skillPoints--;save.skills.flow++;persist();hint.textContent='Flux amélioré : techniques renforcées.';renderPanel()},save.skillPoints<1||(save.skills.flow||0)>=5)
    ]));
    panel.append(el('h3',{},'🎒 PROGRESSION'));
    panel.append(makeCard('État du monde','Couronnes : '+save.coins+' · Niveau : '+save.level+' · Continents : '+save.discovered.length+'/'+regions.length+' · Pays : '+save.kingdoms.length+' · Voyages cette session : '+boatTrips,[
      button('SAUVEGARDER',()=>{persist();hint.textContent='Progression du monde sauvegardée.';}),
      button('RÉINITIALISER LES PV',()=>{save.hp=save.maxHp;persist();hint.textContent='PV restaurés.';renderPanel();})
    ]));
  }
  function travel(id){
    const r=regions.find(x=>x.id===id);if(!r)return;
    if(id!=='astrea'&&!save.hasBoat){hint.textContent='Il te faut une barque. Achète-la à l’embarcadère pour 350 couronnes.';return;}
    const unlocked=save.discovered.includes(id)||id==='astrea';
    if(!unlocked){if(save.coins<r.price){hint.textContent='Pas assez de couronnes pour voyager.';return}save.coins-=r.price;save.discovered.push(id)}
    currentRegion=r;save.region=id;persist();
    if(id==='astrea'){setZone(null);player.position.set(0,0,-12);hint.textContent='Retour sur le continent d’Astrea.';}
    else {setZone(id);player.position.set(0,0,5);hint.textContent='Bienvenue sur '+r.name+'. Explore la zone et rencontre ses créatures.';}
    window.ASTREA_BOUNDS=r.bounds;
    if(collisionBoxes)collisionBoxes.forEach(c=>c.active=id==='astrea');
    scene.background=new THREE.Color(r.sky);scene.fog=new THREE.Fog(r.sky,id==='astrea'?42:65,id==='astrea'?142:185);
    renderPanel();
  }
  function setZone(id){
    for(const child of scene.children){
      if(child===player||child.isLight)continue;
      if(child.userData&&child.userData.astreaZone)child.visible=child.userData.astreaZone===id;
      else child.visible=id===null;
    }
    if(id&&!zoneGroups[id])zoneGroups[id]=buildZone(id);
    if(id&&zoneGroups[id])zoneGroups[id].visible=true;
  }
  function buildZone(id){
    const r=regions.find(x=>x.id===id),g=new THREE.Group();g.userData.astreaZone=id;scene.add(g);
    const mat=(color,roughness=.95)=>new THREE.MeshStandardMaterial({color,roughness});
    function biomeTexture(kind){
      const canvas=document.createElement('canvas');canvas.width=256;canvas.height=256;
      const ctx=canvas.getContext('2d');let base='#65894a';
      if(kind==='solkar')base='#c5a05d';else if(kind==='frostholm')base='#c5dbe2';else if(kind==='drakorys')base='#554a47';
      ctx.fillStyle=base;ctx.fillRect(0,0,256,256);
      let seed=kind.length*193+7;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
      for(let i=0;i<1800;i++){
        const x=rand()*256,y=rand()*256,rad=.4+rand()*2.5;
        if(kind==='elarion')ctx.fillStyle=['#416d3a','#799953','#9aa85b','#3d6033'][Math.floor(rand()*4)];
        else if(kind==='solkar')ctx.fillStyle=['#e0c17a','#a9874b','#d0ad68','#b89555'][Math.floor(rand()*4)];
        else if(kind==='frostholm')ctx.fillStyle=['#edf6f6','#9bbbc9','#c7e0e6','#8ba8b8'][Math.floor(rand()*4)];
        else if(kind==='drakorys')ctx.fillStyle=['#332f31','#75615a','#51413e','#9b4c35'][Math.floor(rand()*4)];
        else ctx.fillStyle=['#477542','#789451','#8e9b56','#554d36'][Math.floor(rand()*4)];
        ctx.globalAlpha=.18+rand()*.36;ctx.beginPath();ctx.ellipse(x,y,rad,rad*(.45+rand()),rand()*3.14,0,Math.PI*2);ctx.fill();
      }
      if(kind==='elarion'){
        for(let i=0;i<70;i++){ctx.globalAlpha=.35;ctx.strokeStyle=i%2?'#c0b66a':'#a3b66b';ctx.lineWidth=1;ctx.beginPath();const x=rand()*256,y=rand()*256;ctx.moveTo(x,y);ctx.lineTo(x+rand()*2-1,y-2-rand()*4);ctx.stroke();}
      }
      ctx.globalAlpha=1;const tex=new THREE.CanvasTexture(canvas);tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(8,8);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=Math.min(4,renderer?.capabilities?.getMaxAnisotropy?.()||1);return tex;
    }
    const ocean=new THREE.Mesh(new THREE.PlaneGeometry(320,320),new THREE.MeshStandardMaterial({color:0x1d6388,roughness:.32,metalness:.12}));ocean.rotation.x=-Math.PI/2;ocean.position.y=-.22;g.add(ocean);
    const beachMat=new THREE.MeshStandardMaterial({map:biomeTexture('solkar'),roughness:1});
    const beach=new THREE.Mesh(new THREE.PlaneGeometry(96,96),beachMat);beach.rotation.x=-Math.PI/2;beach.position.y=-.105;g.add(beach);
    // Relief procédural avec collines douces et centre dégagé pour le joueur.
    const terrainGeo=new THREE.PlaneGeometry(84,84,64,64),pos=terrainGeo.attributes.position;
    for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getY(i),fade=Math.min(1,Math.max(0,(Math.max(Math.abs(x),Math.abs(z))-7)/17));let h=(Math.sin(x*.19+id.length)*.55+Math.cos(z*.17-id.length)*.42+Math.sin((x+z)*.11)*.3)*fade;h+=Math.max(0,Math.sin(x*.075+id.length)*Math.cos(z*.09))*1.25*fade;pos.setZ(i,h);}
    terrainGeo.computeVertexNormals();
    const floor=new THREE.Mesh(terrainGeo,new THREE.MeshStandardMaterial({map:biomeTexture(id),color:0xffffff,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.045;floor.receiveShadow=true;g.add(floor);
    const rng=(n)=>{let x=Math.sin(n*127.1+(id.length*17))*43758.5453;return x-Math.floor(x)};
    for(let i=0;i<44;i++){
      const x=(rng(i+2)-.5)*82,z=(rng(i+100)-.5)*82;if(Math.abs(x)<5&&Math.abs(z)<7)continue;
      if(id==='van'){
        const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,2.2,5),mat(0x61472f));trunk.position.set(x,1.1,z);g.add(trunk);
        const crown=new THREE.Mesh(new THREE.ConeGeometry(1.25,3.4,6),mat(i%3?0x2d693b:0x43854a));crown.position.set(x,3.3,z);g.add(crown);
      } else if(id==='beurg'){
        const dune=new THREE.Mesh(new THREE.SphereGeometry(1+rng(i+400)*2,7,5),mat(i%2?0xd9b66e:0xb98a49));dune.scale.set(2,.38,1.2);dune.position.set(x,.15,z);g.add(dune);
        if(i%6===0){const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(1.1,0),mat(0x8b765a));rock.position.set(x,1,z);g.add(rock)}
      } else if(id==='night'){
        const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(1.4+rng(i+300),0),mat(i%2?0xd4e6eb:0x718c9a));rock.scale.y=1.5;rock.position.set(x,.9,z);g.add(rock);
        if(i%4===0){const ice=new THREE.Mesh(new THREE.ConeGeometry(.65,2.6,5),mat(0x8fd8ef));ice.position.set(x,2,z);g.add(ice)}
      } else {
        const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(1+rng(i+500),0),mat(i%2?0x3a3434:0x68504b));rock.position.set(x,.7,z);g.add(rock);
        if(i%5===0){const lava=new THREE.Mesh(new THREE.CylinderGeometry(.45,.65,.08,8),new THREE.MeshStandardMaterial({color:0xff5b19,emissive:0xc92b0c,emissiveIntensity:.7}));lava.position.set(x,.12,z);g.add(lava)}
      }
    }
    const hull=new THREE.Mesh(new THREE.BoxGeometry(4,.7,1.3),mat(0x694329));hull.position.set(-34,.45,-34);g.add(hull);
    const mast=new THREE.Mesh(new THREE.CylinderGeometry(.09,.12,4,5),mat(0x593b24));mast.position.set(-34,2.5,-34);g.add(mast);
    const sail=new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.3),mat(0xe7dfc7));sail.position.set(-33.4,2.8,-34);g.add(sail);
    // Les créatures sans modèle GLB final ne sont pas instanciées.
    return g;
  }
  // Pas de combat de créature dans une région tant qu'un modèle GLB réel n'est pas intégré.
  function hitFromPlayer(){return false}
  window.ASTREA_BOUNDS=currentRegion.bounds;
  if(currentRegion.id!=='astrea'){setZone(currentRegion.id);player.position.set(0,0,5);window.ASTREA_BOUNDS=currentRegion.bounds;scene.background=new THREE.Color(currentRegion.sky);scene.fog=new THREE.Fog(currentRegion.sky,65,185);if(collisionBoxes)collisionBoxes.forEach(c=>c.active=false)}
  return {open:()=>{renderPanel();panel.hidden=false},getState:()=>({...save,region:currentRegion.id}),travel,hitFromPlayer};
}

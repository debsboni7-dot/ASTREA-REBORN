// ASTREA REBORN — systèmes monde v1
// Monnaie, continents, voyages maritimes, royaumes et créatures.
// Les créatures procédurales sont provisoires et seront remplacées par les GLB finaux.
export function initAstreaWorld({ THREE, scene, player, hint, collisionBoxes, equipWeapon, addItem, renderer }) {
  const SAVE_KEY = 'astrea-world-save-v1';
  const regions = [
    { id:'village', name:'Village d’Astrea', biome:'Plaine verdoyante', color:0x6b9b52, sky:0x9dc5d0, price:0, bounds:{minX:-21,maxX:21,minZ:-117,maxZ:1}, description:'Ton point de départ : la grande ville médiévale.' },
    { id:'elarion', name:'Elarion', biome:'Continent des forêts', color:0x477a43, sky:0x9fc8b5, price:100, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Forêts anciennes, ruines et ressources rares.' },
    { id:'solkar', name:'Solkar', biome:'Désert doré', color:0xc9a15b, sky:0xe5c99a, price:150, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Dunes, canyons et routes caravanières.' },
    { id:'frostholm', name:'Frostholm', biome:'Terres glacées', color:0xb8d8e5, sky:0x9ebacb, price:200, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Montagnes enneigées et mammouths ancestraux.' },
    { id:'drakorys', name:'Drakorys', biome:'Archipel volcanique', color:0x554b4a, sky:0x9d7772, price:250, bounds:{minX:-42,maxX:42,minZ:-42,maxZ:42}, description:'Îles volcaniques, cavernes et dragons.' }
  ];
  const defaults = { coins:500, region:'village', kingdoms:[], discovered:['village'], inventory:['Épée de départ'], resources:{bois:0,pierre:0,herbes:0,ecaille:0,ivoire:0}, potions:1, equipment:'Épée de départ', defeated:[], claimedQuests:[], questStep:0, level:1, xp:0, hp:100, maxHp:100 };
  let save = defaults;
  try { const old=JSON.parse(localStorage.getItem(SAVE_KEY)||'null'); if(old&&typeof old==='object') save={...defaults,...old,resources:{...defaults.resources,...(old.resources||{})},inventory:Array.isArray(old.inventory)?old.inventory:defaults.inventory,claimedQuests:Array.isArray(old.claimedQuests)?old.claimedQuests:[]}; } catch {}
  let currentRegion = regions.find(r=>r.id===save.region) || regions[0];
  let boatTrips = 0;
  const zoneGroups = {};
  const creatureState = {
    dragon:{name:'Dragon ancien',hp:420,maxHp:420,reward:350,region:'drakorys',color:0x9c3434},
    mammoth:{name:'Mammouth ancestral',hp:260,maxHp:260,reward:180,region:'frostholm',color:0x92704d}
  };
  for(const k of Object.keys(creatureState)){const hp=save[k+'Hp'];if(Number.isFinite(hp))creatureState[k].hp=Math.max(0,Math.min(creatureState[k].maxHp,hp));}
  function persist(){ try { localStorage.setItem(SAVE_KEY,JSON.stringify({...save,region:currentRegion.id,dragonHp:creatureState.dragon.hp,mammothHp:creatureState.mammoth.hp})); } catch {} }
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
      const unlocked=save.discovered.includes(r.id)||r.id==='village';
      const isCurrent=currentRegion.id===r.id;
      const action=button(isCurrent?'ZONE ACTUELLE':unlocked?'VOYAGER':'Voyager — '+r.price+' couronnes',()=>travel(r.id),isCurrent||(!unlocked&&save.coins<r.price));
      panel.append(makeCard(r.name+' · '+r.biome,r.description+' '+(r.price?'Coût du premier voyage : '+r.price+' couronnes.':'Départ gratuit.'),[action]));
    }
    panel.append(el('h3',{},'🚢 VOYAGE PAR OCÉAN'));
    panel.append(makeCard('Navire d’Astrea','Les traversées relient les continents. Le premier voyage vers une région coûte son tarif ; les retours vers les régions découvertes sont gratuits.',[
      button('EMBARQUER',()=>{boatTrips++;hint.textContent='Voyage maritime prêt : choisis un continent dans le menu Monde.';panel.scrollTop=0;},false)
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
      save.coins-=5000;save.kingdoms.push({name,region:regionSelect.value,level:1,population:10,createdAt:Date.now()});persist();hint.textContent='Le pays '+name+' a été fondé !';renderPanel();
    },save.coins<5000));
    if(save.kingdoms.length){panel.append(el('h3',{},'📜 TES PAYS'));save.kingdoms.forEach(k=>panel.append(makeCard(k.name+' — Niveau '+k.level,k.population+' habitants · Région : '+(regions.find(r=>r.id===k.region)?.name||k.region),[
      button('Développer (1 000 💰)',()=>{if(save.coins<1000){hint.textContent='Il te manque des couronnes.';return}save.coins-=1000;k.level++;k.population+=25;persist();renderPanel()},save.coins<1000)
    ])))}
    panel.append(el('h3',{},'🐉 CRÉATURES MYTHIQUES'));
    for(const id of ['dragon','mammoth']){
      const c=creatureState[id],region=regions.find(r=>r.id===c.region);
      panel.append(makeCard(c.name+' — '+c.hp+'/'+c.maxHp+' PV',region.name+' · Récompense : '+c.reward+' couronnes. Va dans cette région pour l’affronter.',[
        button('VOYAGER ET COMBATTRE',()=>{if(currentRegion.id!==c.region){travel(c.region);renderPanel()}else{fightCreature(id);renderPanel()}},false),
        button('ATTAQUER ⚔',()=>{if(currentRegion.id!==c.region){hint.textContent='Voyage d’abord vers '+region.name+'.';return}fightCreature(id);renderPanel()},currentRegion.id!==c.region||c.hp<=0)
      ]));
    }
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
      button('RAMASSER DES RESSOURCES',()=>{
        save.resources.bois+=2;save.resources.pierre+=2;save.resources.herbes+=1;persist();hint.textContent='Ressources de test collectées : 2 bois, 2 pierres, 1 herbe.';renderPanel();
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
          while(save.xp>=save.level*100){save.xp-=save.level*100;save.level++;save.maxHp+=10;save.hp=save.maxHp}
          persist();hint.textContent='Quête terminée : +'+q.reward+' Couronnes et '+q.xp+' XP.';renderPanel();
        },claimed||!q.done)
      ]));
    });
    panel.append(el('h3',{},'🎒 PROGRESSION'));
    panel.append(makeCard('État du monde','Couronnes : '+save.coins+' · Niveau : '+save.level+' · Continents : '+save.discovered.length+'/'+regions.length+' · Pays : '+save.kingdoms.length+' · Voyages cette session : '+boatTrips,[
      button('SAUVEGARDER',()=>{persist();hint.textContent='Progression du monde sauvegardée.';}),
      button('RÉINITIALISER LES PV',()=>{save.hp=save.maxHp;persist();hint.textContent='PV restaurés.';renderPanel();})
    ]));
  }
  function travel(id){
    const r=regions.find(x=>x.id===id);if(!r)return;
    const unlocked=save.discovered.includes(id)||id==='village';
    if(!unlocked){if(save.coins<r.price){hint.textContent='Pas assez de couronnes pour voyager.';return}save.coins-=r.price;save.discovered.push(id)}
    currentRegion=r;save.region=id;persist();
    if(id==='village'){setZone(null);player.position.set(0,0,-12);hint.textContent='Retour au village d’Astrea.';}
    else {setZone(id);player.position.set(0,0,5);hint.textContent='Bienvenue sur '+r.name+'. Explore la zone et rencontre ses créatures.';}
    window.ASTREA_BOUNDS=r.bounds;
    if(collisionBoxes)collisionBoxes.forEach(c=>c.active=id==='village');
    scene.background=new THREE.Color(r.sky);scene.fog=new THREE.Fog(r.sky,id==='village'?42:65,id==='village'?142:185);
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
    const floor=new THREE.Mesh(new THREE.PlaneGeometry(84,84),new THREE.MeshStandardMaterial({map:biomeTexture(id),color:0xffffff,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.045;g.add(floor);
    const rng=(n)=>{let x=Math.sin(n*127.1+(id.length*17))*43758.5453;return x-Math.floor(x)};
    for(let i=0;i<44;i++){
      const x=(rng(i+2)-.5)*82,z=(rng(i+100)-.5)*82;if(Math.abs(x)<5&&Math.abs(z)<7)continue;
      if(id==='elarion'){
        const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.18,.28,2.2,5),mat(0x61472f));trunk.position.set(x,1.1,z);g.add(trunk);
        const crown=new THREE.Mesh(new THREE.ConeGeometry(1.25,3.4,6),mat(i%3?0x2d693b:0x43854a));crown.position.set(x,3.3,z);g.add(crown);
      } else if(id==='solkar'){
        const dune=new THREE.Mesh(new THREE.SphereGeometry(1+rng(i+400)*2,7,5),mat(i%2?0xd9b66e:0xb98a49));dune.scale.set(2,.38,1.2);dune.position.set(x,.15,z);g.add(dune);
        if(i%6===0){const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(1.1,0),mat(0x8b765a));rock.position.set(x,1,z);g.add(rock)}
      } else if(id==='frostholm'){
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
    if(id==='frostholm')addCreatureModel(g,'mammoth',-7,0,-9);
    if(id==='drakorys')addCreatureModel(g,'dragon',8,0,-11);
    return g;
  }
  function addCreatureModel(g,id,x,y,z){
    const data=creatureState[id],root=new THREE.Group();root.position.set(x,y,z);root.userData.creatureId=id;g.add(root);
    const material=new THREE.MeshStandardMaterial({color:data.color,roughness:.82,metalness:.04}),ivory=new THREE.MeshStandardMaterial({color:0xe8d8b0,roughness:.5});
    const part=(geo,ma,px,py,pz,sx=1,sy=1,sz=1)=>{const m=new THREE.Mesh(geo,ma);m.position.set(px,py,pz);m.scale.set(sx,sy,sz);root.add(m);return m};
    if(id==='mammoth'){
      part(new THREE.SphereGeometry(1,10,8),material,0,1.8,0,1.55,1.05,1.05);part(new THREE.SphereGeometry(.68,9,7),material,0,2.25,-.95,.85,1,.8);
      part(new THREE.CylinderGeometry(.12,.2,.9,7),material,0,1.65,-1.5).rotation.x=-.35;
      for(const side of [-1,1])part(new THREE.ConeGeometry(.14,.85,7),ivory,side*.43,1.95,-1.45).rotation.x=-1.2;
      for(const sx of [-.9,.9])for(const sz of [-.6,.6])part(new THREE.CylinderGeometry(.2,.25,.85,6),material,sx,.55,sz);
      part(new THREE.SphereGeometry(.18,7,5),ivory,-.25,2.5,-1.45,.6,.7,.6);
    } else {
      part(new THREE.SphereGeometry(1,10,8),material,0,1.8,0,1.45,.8,1.9);part(new THREE.SphereGeometry(.45,9,7),material,0,2.15,-1.65,.75,.75,1);
      part(new THREE.ConeGeometry(.22,.8,7),ivory,0,2.55,-2.05).rotation.x=-1.3;
      for(const sx of [-.8,.8])for(const sz of [-1,1])part(new THREE.CylinderGeometry(.15,.22,.8,6),material,sx,.5,sz);
      const tail=part(new THREE.ConeGeometry(.2,1.5,6),material,0,1.7,2.05);tail.rotation.x=Math.PI/2;
      for(const side of [-1,1]){
        const wingGeo=new THREE.BufferGeometry();wingGeo.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,side*2.1,.5,.4,side*1.8,-.15,1.1,0,-.35,.7],3));wingGeo.setIndex([0,1,2,0,2,3]);wingGeo.computeVertexNormals();
        const wing=new THREE.Mesh(wingGeo,new THREE.MeshStandardMaterial({color:data.color,side:THREE.DoubleSide,roughness:.85}));wing.position.set(side*.95,2.15,.1);root.add(wing);
      }
    }
    data.root=root;
  }
  function applyCreatureDamage(id,damage){
    const c=creatureState[id];if(!c||c.hp<=0)return false;
    c.hp=Math.max(0,c.hp-Math.max(1,Math.round(damage)));save.coins+=3;save.xp+=5;
    if(id==='dragon')save.resources.ecaille+=1;else save.resources.ivoire+=1;
    while(save.xp>=save.level*100){save.xp-=save.level*100;save.level++;save.maxHp+=10;save.hp=save.maxHp}
    if(c.hp===0){save.coins+=c.reward;if(!save.defeated.includes(id))save.defeated.push(id);hint.textContent=c.name+' vaincu ! Butin et '+c.reward+' couronnes obtenus.'}
    else hint.textContent=c.name+' touché : '+Math.round(damage)+' dégâts — '+c.hp+'/'+c.maxHp+' PV.';
    if(c.root){c.root.rotation.y+=.24;if(c.hp===0)c.root.visible=false}
    persist();return true;
  }
  function fightCreature(id){
    const c=creatureState[id];if(!c||c.hp<=0){hint.textContent='Cette créature a déjà été vaincue. Elle reviendra plus tard.';return}
    applyCreatureDamage(id,Math.max(1,55+(save.level-1)*5));
  }
  function hitFromPlayer(damage,reach){
    if(currentRegion.id==='village')return false;
    let nearest=null,nearestId=null,nearestDistance=Infinity;
    for(const id of ['dragon','mammoth']){
      const c=creatureState[id];if(!c||c.region!==currentRegion.id||c.hp<=0||!c.root||!c.root.visible)continue;
      const distance=Math.hypot(player.position.x-c.root.getWorldPosition(new THREE.Vector3()).x,player.position.z-c.root.getWorldPosition(new THREE.Vector3()).z);
      if(distance<nearestDistance){nearest=c;nearestId=id;nearestDistance=distance}
    }
    if(!nearest)return false;
    if(nearestDistance>Math.max(2,reach+1.0)){hint.textContent='Approche-toi de la créature pour la toucher.';return true}
    applyCreatureDamage(nearestId,damage);renderPanel();return true;
  }
  window.ASTREA_BOUNDS=currentRegion.bounds;
  if(currentRegion.id!=='village'){setZone(currentRegion.id);player.position.set(0,0,5);window.ASTREA_BOUNDS=currentRegion.bounds;scene.background=new THREE.Color(currentRegion.sky);scene.fog=new THREE.Fog(currentRegion.sky,65,185);if(collisionBoxes)collisionBoxes.forEach(c=>c.active=false)}
  return {open:()=>{renderPanel();panel.hidden=false},getState:()=>({...save,region:currentRegion.id}),travel,hitFromPlayer};
}

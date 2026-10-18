// ASTREA REBORN — arsenal 3D procédural, sans fichiers externes.
export const ASTREA_WEAPONS = [
 {id:'basic-sword',name:'Épée classique',type:'sword',level:1,rank:'Débutant',damage:12,speed:1.15,reach:2.1,color:0xbfcbd5,skill:'Frappe simple'},
 {id:'throwing-knives',name:'Couteaux de lancer',type:'throwing',level:2,rank:'Débutant',damage:9,speed:1.65,reach:3.8,color:0xcbd6df,skill:'Jet rapide'},
 {id:'wood-staff',name:'Bâton de combat',type:'staff',level:3,rank:'Débutant',damage:10,speed:1.3,reach:2.5,color:0x8d643d,skill:'Balayage'},
 {id:'training-daggers',name:'Dagues d’entraînement',type:'daggers',level:4,rank:'Débutant',damage:8,speed:1.8,reach:1.7,color:0xa8b8c6,skill:'Double entaille'},
 {id:'katana',name:'Katana du voyageur',type:'katana',level:5,rank:'Novice',damage:15,speed:1.55,reach:2.25,color:0xe1e9f1,skill:'Coupe éclair'},
 {id:'battle-axe',name:'Hache de bataille',type:'axe',level:6,rank:'Novice',damage:19,speed:.82,reach:2.15,color:0x9aa8b5,skill:'Frappe lourde'},
 {id:'war-hammer',name:'Marteau de guerre',type:'hammer',level:7,rank:'Novice',damage:23,speed:.68,reach:2,color:0x8b9aa8,skill:'Écrasement'},
 {id:'short-bow',name:'Arc court',type:'bow',level:8,rank:'Novice',damage:13,speed:1.2,reach:7,color:0x8e623c,skill:'Tir précis'},
 {id:'double-blades',name:'Lames jumelles',type:'dual',level:9,rank:'Apprenti',damage:14,speed:1.75,reach:1.9,color:0xb9c7d5,skill:'Danse des lames'},
 {id:'spear',name:'Lance du garde',type:'spear',level:10,rank:'Apprenti',damage:17,speed:1.05,reach:3.2,color:0xabb7c4,skill:'Estoc'},
 {id:'crossbow',name:'Arbalète du pisteur',type:'crossbow',level:11,rank:'Apprenti',damage:18,speed:.9,reach:8,color:0x805a37,skill:'Trait perforant'},
 {id:'gauntlets',name:'Gantelets de combat',type:'gauntlets',level:12,rank:'Apprenti',damage:11,speed:1.9,reach:1.45,color:0x9daab6,skill:'Rafale de poings'},
 {id:'greatsword',name:'Épée à deux mains',type:'greatsword',level:13,rank:'Confirmé',damage:25,speed:.72,reach:2.65,color:0xc2cbd4,skill:'Fendoir'},
 {id:'scythe',name:'Faux du crépuscule',type:'scythe',level:14,rank:'Confirmé',damage:22,speed:.9,reach:2.8,color:0xaaa8c6,skill:'Arc lunaire'},
 {id:'trident',name:'Trident aquatique',type:'trident',level:15,rank:'Confirmé',damage:21,speed:1,reach:3,color:0x49c9d6,skill:'Vague trident'},
 {id:'scepter',name:'Sceptre arcanique',type:'scepter',level:16,rank:'Confirmé',damage:20,speed:1.1,reach:5,color:0x9d72f2,skill:'Orbe arcanique'},
 {id:'sun-sword',name:'Épée du Soleil',type:'sun',level:17,rank:'Expert',damage:29,speed:1.25,reach:2.35,color:0xffb83d,skill:'Éruption solaire'},
 {id:'abyss-blade',name:'Lame Abyssale',type:'abyss',level:18,rank:'Expert',damage:31,speed:1.05,reach:2.45,color:0x8e56dc,skill:'Frappe abyssale'},
 {id:'celestial-spear',name:'Lance Céleste',type:'celestial',level:19,rank:'Expert',damage:28,speed:1.15,reach:3.5,color:0x7bd9ff,skill:'Pluie céleste'},
 {id:'magic-staff',name:'Bâton des arcanes',type:'staff',level:20,rank:'Expert',damage:26,speed:1.05,reach:5.5,color:0x63baff,skill:'Onde mystique'},
 {id:'divine-sword',name:'Épée Divine',type:'divine',level:21,rank:'Maître',damage:36,speed:1.2,reach:2.5,color:0xffe58b,skill:'Jugement divin'},
 {id:'cosmic-blade',name:'Lame Cosmique',type:'cosmic',level:22,rank:'Maître',damage:38,speed:1.15,reach:2.6,color:0x8c9dff,skill:'Rupture stellaire'},
 {id:'chaos-weapon',name:'Arme du Chaos',type:'chaos',level:23,rank:'Maître',damage:40,speed:1.1,reach:2.55,color:0xff5c85,skill:'Chaos déchaîné'},
 {id:'hakai-sword',name:'Sword of Hakai',type:'hakai',level:24,rank:'Maître',damage:43,speed:1.05,reach:2.7,color:0x9c65ff,skill:'Destruction'},
 {id:'shin-hakai',name:'Shin Hakai Sword',type:'shin',level:25,rank:'Légendaire',damage:48,speed:1.2,reach:2.8,color:0xff67d4,skill:'Hakai absolu'},
 {id:'twin-daggers',name:'Dagues du phénix',type:'daggers',level:26,rank:'Légendaire',damage:33,speed:2,reach:1.9,color:0xff6a42,skill:'Plumes ardentes'},
 {id:'royal-crossbow',name:'Arbalète royale',type:'crossbow',level:27,rank:'Légendaire',damage:39,speed:1,reach:9,color:0xf2cf79,skill:'Trait royal'},
 {id:'storm-axe',name:'Hache de tempête',type:'axe',level:28,rank:'Légendaire',damage:45,speed:.85,reach:2.4,color:0x64d9f2,skill:'Foudre écrasante'},
 {id:'divine-sword-dawn',name:'Épée divine : Aube',type:'divine',level:29,rank:'Mythique',damage:52,speed:1.25,reach:2.65,color:0xffd66b,skill:'Premier rayon'},
 {id:'divine-sword-tide',name:'Épée divine : Marée',type:'trident',level:30,rank:'Mythique',damage:53,speed:1.18,reach:2.8,color:0x3be0e4,skill:'Déferlante'},
 {id:'divine-sword-tempest',name:'Épée divine : Tempête',type:'cosmic',level:31,rank:'Mythique',damage:55,speed:1.35,reach:2.7,color:0x7dbdff,skill:'Orage astral'},
 {id:'divine-sword-ember',name:'Épée divine : Brasier',type:'sun',level:32,rank:'Mythique',damage:57,speed:1.2,reach:2.7,color:0xff633a,skill:'Brasier royal'},
 {id:'divine-sword-eclipse',name:'Épée divine : Éclipse',type:'abyss',level:33,rank:'Divine',damage:62,speed:1.3,reach:2.8,color:0x9b65ff,skill:'Éclipse totale'},
 {id:'divine-sword-infinity',name:'Épée divine : Infini',type:'cosmic',level:34,rank:'Divine',damage:66,speed:1.25,reach:2.9,color:0x75e7ff,skill:'Singularité'},
 {id:'divine-sword-astrea',name:'Épée divine : ASTREA',type:'shin',level:35,rank:'Divine',damage:75,speed:1.4,reach:3,color:0xffe6a0,skill:'Sentence d’Astrea'}
];
export function createWeaponModel(THREE, weapon){
 const root=new THREE.Group();
 const metal=new THREE.MeshStandardMaterial({color:weapon.color,metalness:.72,roughness:.26,emissive:weapon.color,emissiveIntensity:weapon.rank==='Divine'?.22:.04});
 const dark=new THREE.MeshStandardMaterial({color:0x292d38,metalness:.35,roughness:.55});
 const glow=new THREE.MeshStandardMaterial({color:weapon.color,emissive:weapon.color,emissiveIntensity:.85,metalness:.25,roughness:.2});
 const wood=new THREE.MeshStandardMaterial({color:0x79502f,roughness:.85});
 const part=(geo,mat,x,y,z,rx=0,ry=0,rz=0)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.rotation.set(rx,ry,rz);root.add(m);return m};
 const box=(w,h,d,mat,x,y,z,rx=0,ry=0,rz=0)=>part(new THREE.BoxGeometry(w,h,d),mat,x,y,z,rx,ry,rz);
 const cyl=(r1,r2,h,mat,x,y,z,rz=0)=>part(new THREE.CylinderGeometry(r1,r2,h,8),mat,x,y,z,0,0,rz);
 const blade=(w,h,mat,x=0,y=.7,z=0)=>{box(w*.72,h*.72,.065,mat,x,y,z);part(new THREE.ConeGeometry(w*.5,h*.3,4),mat,x,y+h*.5,z,0,0,Math.PI)};
 const handle=(length=.48)=>{cyl(.055,.06,length,dark,0,-.18,0);box(.34,.07,.11,glow,0,.02,0)};
 const ring=(r,t,mat,x,y,z,rx=0,ry=0,rz=0)=>part(new THREE.TorusGeometry(r,t,6,16),mat,x,y,z,rx,ry,rz);
 // Every named item has its own model instance, level, damage, reach, speed and skill.
 switch(weapon.type){
 case 'sword':case 'katana':case 'greatsword':case 'sun':case 'abyss':case 'divine':case 'cosmic':case 'chaos':case 'hakai':case 'shin':
  handle();blade(weapon.type==='greatsword'?.42:.23,weapon.type==='greatsword'?1.45:1.02,metal,0,.63,0);
  box(.48,.09,.12,glow,0,.12,0);
  if(['sun','divine','cosmic','chaos','hakai','shin'].includes(weapon.type)){ring(.22,.025,glow,0,.65,0,0,0,Math.PI/2);part(new THREE.OctahedronGeometry(.12),glow,0,.12,.08)}
  if(weapon.type==='katana')box(.4,.045,.08,glow,0,.12,0,0,0,.25);
  if(weapon.type==='greatsword')box(.52,.13,.15,dark,0,-.18,0);
  if(weapon.type==='sun')for(let i=0;i<4;i++)part(new THREE.ConeGeometry(.06,.22,5),glow,Math.cos(i*Math.PI/2)*.23,.65,Math.sin(i*Math.PI/2)*.12,0,0,Math.PI);
  if(weapon.type==='abyss')ring(.19,.035,glow,0,.66,0,0,0,Math.PI/2);
  if(weapon.type==='chaos')for(let i=0;i<3;i++)box(.08,.6,.07,glow,(i-1)*.13,.68,.03,0,0,(i-1)*.24);
  if(weapon.type==='hakai'||weapon.type==='shin')for(let i=0;i<3;i++)part(new THREE.ConeGeometry(.08,.25,5),glow,(i-1)*.14,.95,.02,0,0,Math.PI);
  break;
 case 'daggers':case 'dual':
  for(const side of [-1,1]){box(.07,.4,.08,dark,side*.22,-.13,0);box(.18,.08,.08,glow,side*.22,.09,0);blade(.13,.64,metal,side*.22,.47,0)}
  break;
 case 'throwing':
  blade(.13,.65,metal,0,.3,0);box(.06,.27,.07,dark,0,-.13,0);box(.24,.05,.08,glow,0,.02,0);break;
 case 'axe':
  handle(.75);box(.11,.9,.11,dark,0,.4,0);part(new THREE.ConeGeometry(.38,.65,5),metal,.22,.72,0,0,0,-Math.PI/2);box(.08,.16,.18,glow,.1,.72,0);break;
 case 'hammer':
  handle(.82);box(.65,.35,.3,metal,0,.64,0);box(.12,.43,.34,dark,0,.64,0);box(.68,.07,.32,glow,0,.64,.02);break;
 case 'staff':case 'scepter':
  cyl(.055,.075,1.55,wood,0,.48,0);ring(.17,.035,glow,0,1.25,0,0,0,Math.PI/2);part(new THREE.OctahedronGeometry(.19),glow,0,1.28,0);if(weapon.type==='scepter')for(let i=0;i<3;i++)part(new THREE.SphereGeometry(.055,8,6),metal,Math.cos(i*2.1)*.22,1.1,Math.sin(i*2.1)*.12);break;
 case 'spear':case 'celestial':case 'trident':
  cyl(.045,.055,1.95,wood,0,.42,0);
  if(weapon.type==='trident'){blade(.12,.55,metal,0,1.45,0);for(const side of [-1,1]){cyl(.035,.04,.6,metal,side*.18,1.35,0,side*.25);part(new THREE.ConeGeometry(.075,.22,5),glow,side*.28,1.7,0,0,0,Math.PI)}}
  else{blade(.19,weapon.type==='celestial'?.8:.6,metal,0,1.45,0);if(weapon.type==='celestial')ring(.2,.025,glow,0,1.5,0,0,0,Math.PI/2)}break;
 case 'scythe':
  cyl(.05,.065,1.8,dark,0,.38,0);part(new THREE.TorusGeometry(.48,.065,6,16,Math.PI),metal,0,1.3,0,0,0,Math.PI/2);blade(.2,.55,glow,.35,1.38,0);break;
 case 'bow':
  part(new THREE.TorusGeometry(.52,.045,6,16,Math.PI),wood,0,.58,0,0,0,Math.PI/2);box(.025,1.02,.025,glow,0,.58,0);blade(.12,.52,metal,0,.75,.03);break;
 case 'crossbow':
  box(.12,.95,.12,wood,0,.48,0);box(.82,.12,.14,dark,0,.92,0);box(.78,.04,.08,glow,0,.96,0);blade(.1,.5,metal,0,1.13,0);box(.15,.35,.14,dark,0,.03,0);break;
 case 'gauntlets':
  for(const side of [-1,1]){box(.23,.38,.23,metal,side*.2,.35,0);for(let i=0;i<3;i++)part(new THREE.ConeGeometry(.055,.25,5),glow,side*.2+(i-1)*.065,.68,.02,0,0,0)}break;
 default:handle();blade(.23,1,metal);
 }
 root.traverse(o=>{if(o.isMesh){o.castShadow=false;o.receiveShadow=false}});
 root.scale.setScalar(weapon.type==='greatsword'?1.05:1);
 return root;
}

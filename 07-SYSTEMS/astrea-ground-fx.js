// ASTREA REBORN — textures de sol locales + SFX/VFX légers, sans dépendance audio externe.
export function initAstreaGroundFX({THREE,scene,player}) {
  if(!THREE||!scene||scene.userData.astreaGroundFX)return;
  scene.userData.astreaGroundFX=true;
  const loader=new THREE.TextureLoader();
  const coarse=window.matchMedia('(pointer: coarse)').matches||innerWidth<=800;
  const aniso=2;
  const textureDefs=[
    {name:'terre sèche',url:'./03-TEXTURES/terrain/dirt-1.jpg',repeat:[3,4],patches:[[-5,22,8,11],[7,42,7,10],[-9,58,9,12],[4,78,10,11]]},
    {name:'roche',url:'./03-TEXTURES/terrain/rock-pack/roche_moussue.png',repeat:[2,2],patches:[[-35,34,10,8],[34,51,12,9],[-39,77,13,10]]},
    {name:'sable sec',url:'./03-TEXTURES/terrain/sand-pack/sable_plage_sec.png',repeat:[5,2],patches:[[-30,119,17,7],[8,121,22,6]]},
    {name:'sable humide',url:'./03-TEXTURES/terrain/sand-pack/sable_plage_mouille.png',repeat:[4,2],patches:[[-30,126,16,4],[9,126,21,4]]},
    {name:'pavés',url:'./03-TEXTURES/terrain/paving-pack/dalles_pierre.png',repeat:[3,3],patches:[[0,-8,5.5,5],[0,-25,4,5]]},
    {name:'herbe',url:'./03-TEXTURES/terrain/grass-1.jpg',repeat:[8,8],patches:[[-28,15,12,13],[29,20,12,12],[-26,51,13,15],[26,72,14,14]]}
  ];
  const groundGroup=new THREE.Group();groundGroup.name='ASTREA_Ground_Texture_Biomes';scene.add(groundGroup);
  let textureReady=0;
  const terrainHeight=(x,z)=>{const central=Math.abs(x)<19&&z>-124&&z<18;let h=(Math.sin(x*.085+z*.021)*.12+Math.cos(z*.073-x*.018)*.10+Math.sin((x-z)*.047)*.07);if(!central){const hills=[[-27,-24,1.05,8],[27,-42,.9,10],[-30,-70,1.25,11],[29,-96,1.05,9],[-24,18,.72,10],[34,24,.9,12]];for(const q of hills){const dx=x-q[0],dz=z-q[1];h+=q[2]*Math.exp(-(dx*dx+dz*dz)/(q[3]*q[3]));}}else h*=.38;return h;};
  const patchShape=(cx,cz,rx,rz,seed)=>{
    const s=new THREE.Shape();const n=13;
    for(let i=0;i<n;i++){
      const a=i/n*Math.PI*2;
      const wobble=0.78+0.22*Math.sin(a*3+seed)*Math.cos(a*2+seed*.7);
      const x=cx+Math.cos(a)*rx*wobble,z=cz+Math.sin(a)*rz*wobble;
      if(i===0)s.moveTo(x,-z);else s.lineTo(x,-z);
    }
    s.closePath();const geo=new THREE.ShapeGeometry(s,1);const pos=geo.attributes.position;for(let k=0;k<pos.count;k++){const wx=pos.getX(k),wz=-pos.getY(k);pos.setZ(k,terrainHeight(wx,wz)+.014);}geo.computeVertexNormals();return geo;
  };
  textureDefs.forEach((def,di)=>{
    loader.load(def.url,tex=>{
      tex.wrapS=tex.wrapT=THREE.RepeatWrapping;tex.repeat.set(...def.repeat);tex.colorSpace=THREE.SRGBColorSpace;tex.anisotropy=Math.min(aniso,rendererAniso());
      const mat=new THREE.MeshStandardMaterial({map:tex,color:0xffffff,roughness:1,metalness:0,side:THREE.DoubleSide,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1});
      def.patches.forEach((p,i)=>{
        const mesh=new THREE.Mesh(patchShape(p[0],p[1],p[2],p[3],di*9+i),mat);
        mesh.rotation.x=-Math.PI/2;mesh.position.y=-.06+di*.0007;mesh.renderOrder=2;mesh.name='ASTREA_Ground_'+def.name;groundGroup.add(mesh);
      });
      textureReady++;
      window.ASTREA_GROUND_TEXTURES={loaded:textureReady,total:textureDefs.length,names:textureDefs.filter(d=>groundGroup.children.some(o=>o.name==='ASTREA_Ground_'+d.name)).map(d=>d.name)};
    },undefined,err=>console.warn('Texture de sol indisponible : '+def.url,err));
  });
  function rendererAniso(){return window.ASTREA_RENDERER?.capabilities?.getMaxAnisotropy?.()||2;}

  // Audio synthétisé après le premier geste utilisateur : aucun MP3 externe à télécharger.
  let audioCtx=null;
  function audio(){
    try{const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!audioCtx)audioCtx=new C();if(audioCtx.state==='suspended')audioCtx.resume();return audioCtx}catch(_){return null}
  }
  function tone(freq,duration,type='sawtooth',gain=.045,slide=0){
    const c=audio();if(!c)return;
    const osc=c.createOscillator(),g=c.createGain(),now=c.currentTime;
    osc.type=type;osc.frequency.setValueAtTime(freq,now);if(slide)osc.frequency.exponentialRampToValueAtTime(Math.max(35,freq+slide),now+duration);
    g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(gain,now+.012);g.gain.exponentialRampToValueAtTime(.0001,now+duration);
    osc.connect(g);g.connect(c.destination);osc.start(now);osc.stop(now+duration+.02);
  }
  function noise(duration=.13,gain=.035,highpass=500){
    const c=audio();if(!c)return;
    const n=Math.max(1,Math.floor(c.sampleRate*duration)),buf=c.createBuffer(1,n,c.sampleRate),data=buf.getChannelData(0);
    for(let i=0;i<n;i++)data[i]=(Math.random()*2-1)*(1-i/n);
    const src=c.createBufferSource(),filter=c.createBiquadFilter(),g=c.createGain(),now=c.currentTime;
    src.buffer=buf;filter.type='highpass';filter.frequency.value=highpass;g.gain.setValueAtTime(gain,now);g.gain.exponentialRampToValueAtTime(.0001,now+duration);
    src.connect(filter);filter.connect(g);g.connect(c.destination);src.start(now);src.stop(now+duration);
  }
  function sfx(kind){
    if(kind==='jump'){tone(190,.12,'sine',.035,140);noise(.08,.012,900)}
    else if(kind==='hit'){tone(105,.16,'triangle',.07,-48);noise(.12,.06,170)}
    else if(kind==='ultimate'){tone(120,.32,'sawtooth',.06,620);tone(420,.28,'sine',.045,420);noise(.28,.035,1200)}
    else {tone(330,.12,'sawtooth',.035,-210);noise(.11,.028,750)}
  }

  const effects=[];
  const colors={attack:0xdffcff,hit:0xffd06b,special:0x56cfff,ultimate:0xb17cff,ultimatePlus:0xff5fbd};
  function burst(kind){
    if(!player)return;
    const color=colors[kind]||colors.attack;
    const origin=new THREE.Vector3(player.position.x,player.position.y+1.05,player.position.z);
    const group=new THREE.Group();group.position.copy(origin);group.rotation.y=player.rotation.y;scene.add(group);
    const slash=new THREE.Mesh(new THREE.TorusGeometry(kind==='ultimatePlus'?1.25:0.92,.045,6,24,Math.PI*1.32),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.94,blending:THREE.AdditiveBlending,depthWrite:false}));
    slash.rotation.set(.15,0,Math.PI*.12);slash.scale.set(1.15,.8,1);group.add(slash);
    const sparkCount=kind==='ultimatePlus'?28:kind==='ultimate'?20:kind==='special'?13:8;
    const geo=new THREE.BufferGeometry(),positions=new Float32Array(sparkCount*3),vel=[];
    for(let i=0;i<sparkCount;i++){
      const a=Math.random()*Math.PI*2,speed=.8+Math.random()*(kind==='attack'?2.4:4.8);
      positions[i*3]=(Math.random()-.5)*.45;positions[i*3+1]=(Math.random()-.5)*.6;positions[i*3+2]=(Math.random()-.5)*.45;
      vel.push(new THREE.Vector3(Math.cos(a)*speed,.4+Math.random()*speed*.6,Math.sin(a)*speed));
    }
    geo.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const points=new THREE.Points(geo,new THREE.PointsMaterial({color,size:kind==='ultimatePlus'?.19:.12,transparent:true,opacity:1,blending:THREE.AdditiveBlending,depthWrite:false,sizeAttenuation:true}));
    group.add(points);
    const ring=new THREE.Mesh(new THREE.RingGeometry(.3,.38,24),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.7,side:THREE.DoubleSide,depthWrite:false}));
    ring.rotation.x=-Math.PI/2;ring.position.y=-.78;group.add(ring);
    effects.push({group,slash,points,ring,geo,vel,age:0,life:kind==='attack'?.28:kind==='special'?.58:.8,kind});
    sfx(kind==='ultimate'||kind==='ultimatePlus'?'ultimate':kind==='hit'?'hit':'slash');
  }
  const map=[['attack','attack','attack'],['specialAttack','special','special'],['ultimateUltimate','ultimatePlus','ultimate'],['jump','jump','jump']];
  map.forEach(([id,kind,sound])=>document.getElementById(id)?.addEventListener('click',()=>{if(kind==='jump'){sfx('jump');return}burst(kind)}));
  // Une frappe peut toucher la cible sans bouton VFX séparé : écoute les changements de statut.
  const hint=document.getElementById('hint');let lastHint='';
  if(hint&&window.MutationObserver){new MutationObserver(()=>{const t=hint.textContent||'';if(t!==lastHint&&/touch|frapp|combo|ultime|PV|vaincu/i.test(t)){lastHint=t;burst(/ultime\+/i.test(t)?'ultimatePlus':/ultime/i.test(t)?'ultimate':'hit')}}).observe(hint,{childList:true,subtree:true,characterData:true})}
  window.ASTREA_FX_TICK=(dt)=>{
    for(let i=effects.length-1;i>=0;i--){
      const e=effects[i];e.age+=dt;const p=Math.min(1,e.age/e.life);
      e.slash.rotation.y=p*1.9;e.slash.scale.set(1+p*.9,.8+p*.7,1);e.slash.material.opacity=(1-p)*.92;
      e.points.material.opacity=1-p;e.ring.scale.setScalar(1+p*4);e.ring.material.opacity=(1-p)*.6;
      const a=e.geo.attributes.position;
      for(let j=0;j<e.vel.length;j++){a.array[j*3]+=e.vel[j].x*dt;a.array[j*3+1]+=e.vel[j].y*dt;a.array[j*3+2]+=e.vel[j].z*dt;e.vel[j].y-=5*dt}
      a.needsUpdate=true;
      if(p>=1){scene.remove(e.group);e.geo.dispose();e.points.material.dispose();e.slash.geometry.dispose();e.slash.material.dispose();e.ring.geometry.dispose();e.ring.material.dispose();effects.splice(i,1)}
    }
  };
  window.ASTREA_SFX_VFX={play:sfx,burst};
  return window.ASTREA_SFX_VFX;
}

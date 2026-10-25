// ASTREA REBORN — amélioration visuelle : plein jour, horizon et profondeur.
 // Dépend uniquement de Three.js déjà chargé par index.html. Pas de nouveaux téléchargements.
export function initAstreaVisualUpgrade({THREE,scene}) {
  if (!THREE || !scene || scene.userData.astreaVisualUpgrade) return;
  scene.userData.astreaVisualUpgrade = true;

  // Éclairage de plein jour : tons naturels, ciel clair, brume lointaine légère.
  scene.background = new THREE.Color(0x9bc9e8);
  scene.fog = new THREE.Fog(0x9bc9e8, 72, 205);
  scene.traverse(o => {
    if (o.isLight && o.isDirectionalLight) {
      if (o.position.y > 5) { o.color.set(0xfff0d5); o.intensity = Math.max(o.intensity, 2.4); }
    }
  });

  const skyGroup = new THREE.Group();
  skyGroup.name = 'ASTREA_Daylight_Horizon';
  scene.add(skyGroup);

  // Soleil visible, doux, sans shader ni post-traitement coûteux.
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(5.2, 16, 12),
    new THREE.MeshBasicMaterial({color:0xfff2c1, fog:false})
  );
  sun.position.set(-76, 67, -158);
  skyGroup.add(sun);
  const sunHalo = new THREE.Mesh(
    new THREE.SphereGeometry(7.4, 16, 12),
    new THREE.MeshBasicMaterial({color:0xffe6a0, transparent:true, opacity:.12, depthWrite:false, fog:false})
  );
  sunHalo.position.copy(sun.position);
  skyGroup.add(sunHalo);

  // Nuages lointains faits de quelques volumes simples : silhouette lisible à l'horizon.
  const cloudMat = new THREE.MeshBasicMaterial({color:0xf4f8f5, transparent:true, opacity:.68, fog:false, depthWrite:false});
  let seed=7411;
  const rand=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};
  for(let i=0;i<11;i++){
    const cloud=new THREE.Group();
    const x=(rand()-.5)*230, y=43+rand()*22, z=-95-rand()*110;
    const blobs=3+Math.floor(rand()*3);
    for(let j=0;j<blobs;j++){
      const puff=new THREE.Mesh(new THREE.SphereGeometry(1,8,6),cloudMat);
      puff.position.set((j-(blobs-1)/2)*2.5,rand()*1.1,rand()*1.2);
      puff.scale.set(2.7+rand()*2.4, .65+rand()*.65, 1.4+rand()*1.2);
      cloud.add(puff);
    }
    cloud.position.set(x,y,z);
    skyGroup.add(cloud);
  }

  // Crêtes verdoyantes au loin pour supprimer l'impression de plaine infinie.
  const ridgeMats=[
    new THREE.MeshStandardMaterial({color:0x587b5a,roughness:1,fog:true}),
    new THREE.MeshStandardMaterial({color:0x739064,roughness:1,fog:true}),
    new THREE.MeshStandardMaterial({color:0x879b70,roughness:1,fog:true})
  ];
  const ridgeGeo=new THREE.IcosahedronGeometry(1,1);
  const ridges=ridgeMats.map(mat=>new THREE.InstancedMesh(ridgeGeo,mat,18));
  const dummy=new THREE.Object3D();
  for(let i=0;i<54;i++){
    const angle=i/54*Math.PI*2;
    const radius=100+(i%4)*12;
    const x=Math.cos(angle)*radius;
    const z=-28+Math.sin(angle)*radius*.88;
    const k=i%3;
    dummy.position.set(x, -1.8+(i%4)*.35, z);
    dummy.rotation.set(0,angle*.37,0);
    dummy.scale.set(11+(i%5)*3, 4+(i%4)*2.2, 14+(i%6)*2);
    dummy.updateMatrix();
    ridges[k].setMatrixAt(Math.floor(i/3),dummy.matrix);
  }
  ridges.forEach((mesh,k)=>{mesh.count=18;mesh.instanceMatrix.needsUpdate=true;mesh.frustumCulled=false;mesh.name='ASTREA_Horizon_Ridge_'+k;scene.add(mesh);});

  // Quelques pierres et touffes hautes près du terrain extérieur, sans collision fictive.
  const rockGeo=new THREE.DodecahedronGeometry(1,0);
  const rockMat=new THREE.MeshStandardMaterial({color:0x777c6d,roughness:1});
  const rocks=new THREE.InstancedMesh(rockGeo,rockMat,34);
  for(let i=0;i<34;i++){
    const angle=i*2.3999632297, radius=27+(i%5)*5;
    const x=Math.cos(angle)*radius, z=-25+Math.sin(angle)*radius*1.45;
    if(Math.abs(x)<20 && z>-118 && z<2) { dummy.position.set(0,-500,0); dummy.scale.setScalar(0.001); }
    else { dummy.position.set(x, .1, z); dummy.scale.set(.45+(i%3)*.22,.28+(i%4)*.12,.5+(i%2)*.2); }
    dummy.rotation.set(i*.2,angle,0);dummy.updateMatrix();rocks.setMatrixAt(i,dummy.matrix);
  }
  rocks.instanceMatrix.needsUpdate=true;rocks.name='ASTREA_Outdoor_Rocks';scene.add(rocks);
  window.ASTREA_VISUAL_UPGRADE = {version:'1.0', lighting:'bright-daylight', horizon:'clouds-and-ridges'};
}

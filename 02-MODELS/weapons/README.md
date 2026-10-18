# Armes 3D

## Armes disponibles
- `sword-meshy.glb` : épée Meshy légère conservée comme solution de secours.
- `converted/divine-red-sword-4643.glb` : première version GLB convertie depuis l'export FBX Meshy.
- `converted/divine-red-sword-4744.glb` : seconde version GLB convertie depuis l'export FBX Meshy.
- `Meshy_AI_A_divine_red_sword_fo_1018004643_texture_fbx.zip` et `Meshy_AI_A_divine_red_sword_fo_1018004744_texture_fbx.zip` : archives originales conservées.
- `source-divine-sword/` : fichiers FBX extraits des deux archives, conservés comme sources.
- Les textures PBR sont rangées dans `03-TEXTURES/weapons/divine-sword/` : couleur, metallic, normal et roughness.

## État de l'intégration
Le prototype `index.html` essaie maintenant de charger `converted/divine-red-sword-4643.glb` en premier et revient à `sword-meshy.glb` si le chargement échoue. L'épée est positionnée relativement au personnage pour le test, mais son orientation et son point d'attache exact dans la main doivent encore être vérifiés visuellement sur Chrome Android.

## Optimisation mobile
Les deux fichiers GLB ont été convertis par Blender dans GitHub Actions. Une nouvelle passe tente d'utiliser les cartes PBR du dépôt et de réduire leur résolution embarquée à 1024 px. Ne supprimer aucune archive source ni l'épée de secours avant validation visuelle et mesure du chargement sur téléphone.

# Armes 3D

## Armes disponibles
- `sword-meshy.glb` : épée Meshy légère conservée comme solution de secours.
- `converted/divine-red-sword-4643.glb` : première version GLB convertie depuis l'export FBX Meshy.
- `converted/divine-red-sword-4744.glb` : seconde version GLB convertie depuis l'export FBX Meshy.
- `Meshy_AI_A_divine_red_sword_fo_1018004643_texture_fbx.zip` et `Meshy_AI_A_divine_red_sword_fo_1018004744_texture_fbx.zip` : archives originales conservées.
- `source-divine-sword/` : fichiers FBX extraits des deux archives, conservés comme sources.
- Les textures PBR sont rangées dans `03-TEXTURES/weapons/divine-sword/` : couleur, metallic, normal et roughness.

## État de l'intégration
Le prototype `index.html` essaie de charger `converted/divine-red-sword-4643.glb` en premier et revient à `sword-meshy.glb` si le chargement échoue. L'épée est positionnée relativement au personnage pour le test, mais son orientation et son point d'attache exact dans la main doivent encore être vérifiés visuellement sur Chrome Android. Cette attache est approximative : aucun lien au squelette de la main n'a encore été confirmé.

## Optimisation mobile — conversion terminée
GitHub Actions a converti les deux exports FBX avec Blender et a terminé avec succès. Les textures embarquées sont redimensionnées à un maximum de 1024 px et exportées en JPEG qualité 82 pour les GLB de jeu. Les fichiers générés pèsent actuellement :
- `divine-red-sword-4643.glb` : 1 671 992 octets (environ 1,59 Mio).
- `divine-red-sword-4744.glb` : 2 234 024 octets (environ 2,13 Mio).

Les archives source, FBX et textures d'origine restent conservés. La réduction de taille est confirmée par les fichiers générés, mais la fidélité visuelle des cartes PBR et les performances réelles doivent encore être contrôlées sur téléphone. Ne supprimer ni les sources ni l'épée de secours avant ce test.

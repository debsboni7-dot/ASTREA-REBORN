# Importer le personnage Meshy comme héros principal

Le jeu est maintenant configuré pour privilégier le modèle FBX Meshy dans `02-MODELS/characters/astrea-meshy/`. Si le modèle n'est pas encore importé, il conserve automatiquement `hero.glb` comme solution de repli.

## Importation depuis Android

1. Télécharge le paquet préparé `astrea-meshy-character-upload.zip` fourni dans la conversation.
2. Ouvre le dépôt GitHub `debsboni7-dot/ASTREA-REBORN`.
3. Va dans `02-MODELS/characters/` puis choisis **Add file → Upload files**.
4. Téléverse le ZIP et nomme-le exactement `astrea-meshy-upload.zip`.
5. Valide le commit sur la branche `main`.
6. Dans l'onglet **Actions**, attends que **Importer le personnage Meshy d'Astrea** termine. Le workflow extrait le FBX et les textures dans `02-MODELS/characters/astrea-meshy/`.

Le paquet contient le FBX du personnage et ses textures couleur, normale, métallique et rugosité. L'animation de course séparée n'est pas dans ce paquet réduit : elle est volontairement gardée à part pour ne pas activer une animation non retargetée et risquer de casser les déplacements/collisions.

## À savoir

- Le modèle FBX garde son squelette intégré et ses matériaux texturés.
- Le jeu utilise FBXLoader pour charger le personnage ; `hero.glb` reste le repli si le fichier manque ou échoue au chargement.
- Les animations restent désactivées dans le jeu en attendant la correction du root-motion et la vérification du retargeting.
- Après l'importation, ouvre la page du jeu et recharge-la. Il faudra encore confirmer visuellement le rendu sur le téléphone.

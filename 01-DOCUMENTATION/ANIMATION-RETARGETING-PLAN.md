# ASTREA — Compatibilité des animations

## Résultat de l'inspection automatique

Le rapport technique complet est dans `ANIMATION-COMPATIBILITY-REPORT.json`. Le workflow Blender a terminé avec succès.

| Fichier | Résultat |
|---|---|
| `02-MODELS/characters/hero.glb` | Squelette `Armature` avec 19 os et 6 animations intégrées : idle, jump, run, walk-casual, walk et wave |
| `02-MODELS/characters/main-character-meshy.glb` | Aucun squelette ni animation détecté |
| `02-MODELS/characters/base-male.glb` | Modèle provisoire sans squelette |
| `02-MODELS/characters/base-female.glb` | Modèle provisoire sans squelette |
| `04-ANIMATIONS/anim-idle.glb` | 24 actions importées, mais aucun objet Armature détecté par Blender |
| `04-ANIMATIONS/anim-walk.glb` | 24 actions importées, mais aucun objet Armature détecté par Blender |
| `04-ANIMATIONS/anim-attack-1.glb` | 24 actions importées, mais aucun objet Armature détecté par Blender |
| `04-ANIMATIONS/anim-attack-2.glb` | 24 actions importées, mais aucun objet Armature détecté par Blender |
| `04-ANIMATIONS/anim-attack-3.glb` | 24 actions importées, mais aucun objet Armature détecté par Blender |

## Ce que cela signifie

Les animations intégrées à `hero.glb` sont celles dont la compatibilité avec le squelette de ce personnage est la plus prometteuse. Les cinq GLB du dossier `04-ANIMATIONS` ont une structure différente : l'inspection trouve des actions séparées par objets, pas un squelette utilisable directement comme celui de `hero.glb`. Charger simplement leur première action sur le héros ne suffit donc pas et peut ne rien animer ou animer la mauvaise cible.

## Changements déjà faits dans le jeu

- Le jeu mémorise les animations intégrées au héros et utilise celles nommées `idle_Armature` et `walk_Armature` (avec solutions de repli) pour l'arrêt et le déplacement.
- Les cinq GLB externes d'animation n'ont pas de squelette source exploitable selon le rapport : le jeu ne les télécharge plus en partie et ne prétend pas les retargeter.
- Le héros riggé possède une animation procédurale de secours (inactivité, marche, saut et combos) si aucun clip intégré compatible n'est trouvé ; cela ne remplace pas encore de véritables clips d'attaque riggés.
- Les coups gardent pour l'instant le mouvement visuel de l'épée et les dégâts de combat. Les trois animations d'attaque externes ne sont pas encore considérées comme intégrées au personnage.

## Travail restant — nécessaire avant de déclarer toutes les animations compatibles

1. Retargeter les animations idle, marche et trois attaques vers un squelette commun.
2. Rendre les bases masculine et féminine compatibles avec ce squelette, ou remplacer ces bases provisoires par des personnages riggés.
3. Tester en jeu chaque clip, le combo complet, les transitions idle/marche et la performance sur Chrome Android.
4. Ne déclarer une animation « validée » qu'après avoir vérifié qu'elle anime bien le personnage attendu.

**Important :** le workflow de contrôle a réussi, mais cela signifie que l'inspection a fonctionné — pas que les cinq animations externes sont déjà compatibles.

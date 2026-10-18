# Audit des modèles 3D — ASTREA REBORN
Date : 18 octobre 2026

## Personnages et créatures présents

| Fichier | Constat dans le dépôt | Utilisation retenue |
|---|---|---|
| `02-MODELS/characters/astrea-meshy-character-upload.zip` | Archive utilisateur de 15 410 983 octets ; contient le FBX Meshy et les textures. | **Personnage joueur prioritaire** ; extraction FBX/textures en mémoire au lancement. |
| `02-MODELS/characters/hero.glb` | Modèle riggé ; rapport d'inspection : 19 os et 6 clips intégrés (idle, jump, run, walk-casual, walk, wave). | **Repli réel** si l'archive Meshy ne charge pas. |
| `02-MODELS/characters/main-character-meshy.glb` | 2 meshes ; aucun squelette ni clip détecté dans le rapport. | Conservé comme asset source, pas utilisé comme joueur animé. |
| `02-MODELS/characters/character-extra.glb` | Modèle 3D réel présent dans le dépôt. | Cible d'entraînement / personnage ennemi. |
| `02-MODELS/characters/young-adventurer.glb` | Modèle 3D réel présent dans le dépôt. | Guide et PNJ du village. |
| `02-MODELS/characters/base-male.glb` | 30 meshes ; aucun squelette détecté dans le rapport. | PNJ statique de secours seulement ; pas une source d'animation. |
| `02-MODELS/characters/base-female.glb` | 29 meshes ; aucun squelette détecté dans le rapport. | Asset conservé, non utilisé comme personnage joueur actif. |
| `02-MODELS/creatures/humanoid-monster.glb` | Modèle 3D réel de créature présent dans le dépôt. | Disponible pour une future intégration. |
| `02-MODELS/creatures/brown-horse.glb` | Modèle 3D réel de cheval présent dans le dépôt. | Disponible pour une future intégration. |

## Nettoyage appliqué au prototype

- Le joueur, le guide et la cible d'entraînement n'affichent plus de silhouettes fabriquées avec capsules/sphères si leur vrai modèle échoue à charger.
- Les maisons-boîtes de secours ont été retirées : les maisons sont créées seulement si `small-house.glb` se charge.
- Les modèles procéduraux temporaires du dragon et du mammouth ont été supprimés du système Monde. Leurs combats restent désactivés tant que des GLB réels correspondants ne sont pas intégrés.
- Les animations externes du dossier `04-ANIMATIONS/` sont conservées comme sources, mais ne sont plus téléchargées en partie : le rapport indique qu'elles n'ont pas de squelette source exploitable. Le jeu utilise les clips intégrés au modèle quand ils correspondent, sinon une animation procédurale pilotée par les os du modèle riggé.
- Les armes conservent leur modèle 3D dédié (Meshy pour l'épée de base et l'Épée Divine, géométrie propre pour les autres types) et ont des VFX par catégorie : arcs de coupe, projectiles, orbes, anneaux d'impact, particules et effets de technique spéciale.

## Vérifications

- GitHub Actions a réussi le contrôle de syntaxe JavaScript sur le code du prototype après le nettoyage des personnages et l'ajout des animations/VFX.
- Le rendu visuel final, l'attache exacte des armes et les FPS doivent encore être vérifiés dans Chrome Android sur le téléphone cible. Le contrôle de syntaxe ne prouve pas la compatibilité visuelle ni les performances.

## Mise à jour — combos et population
- Le filtre FBX de l'archive Meshy a été corrigé pour permettre le chargement du vrai personnage texturé en priorité.
- Le prototype exploite maintenant les chronologies des démonstrations de combos et d'ultimes. Les HTML de démonstration sont des références 2D et ne sont pas chargés par le jeu.
- Les PNJ actifs utilisent les modèles GLB masculins présents, avec teintes de matériaux ; les matériaux non texturés reçoivent une palette de couleurs. Les PNJ utilisent leurs clips disponibles ou des mouvements procéduraux et se déplacent pacifiquement.
- La ville ajoute un marché, une forge, une mairie, un château et un camp. Les distances d'affichage sont limitées sur mobile.
- Le nombre de PNJ est fixé à 100 instances prévues ; le nombre effectivement chargé doit être vérifié sur l'appareil, car les échecs de chargement d'un asset restent possibles.

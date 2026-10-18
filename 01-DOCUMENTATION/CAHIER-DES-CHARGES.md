# ASTREA REBORN — Cahier des charges maître

## 1. Vision
ASTREA REBORN est un RPG 3D d’action et d’exploration, pensé pour évoluer progressivement d’un prototype jouable vers un jeu plus complet.

## 2. Principes de développement
- Construire par petites étapes testables.
- Priorité à la stabilité et aux performances sur Android.
- Utiliser des modèles GLB et leurs textures uniquement lorsque les fichiers sont réellement disponibles.
- Ne jamais remplacer silencieusement un vrai asset par un faux : les éléments provisoires doivent être identifiés comme placeholders.
- Garder les systèmes séparés et documentés.

## 3. Boucle de jeu
1. Explorer une zone.
2. Rencontrer des personnages et découvrir des lieux.
3. Accepter et accomplir des quêtes.
4. Combattre avec des attaques et des combos.
5. Obtenir des récompenses et débloquer de nouvelles possibilités.

## 4. Monde
Le monde est composé de zones maîtrisées en taille, avec un village, des maisons, des chemins, de la végétation et des points d’intérêt. Les intérieurs et interactions seront ajoutés progressivement.

## 5. Personnage et combat
- Personnage principal masculin.
- Déplacement, course, saut et caméra.
- Épée et attaques de base, puis combos.
- Les animations finales doivent provenir de fichiers disponibles et compatibles.

## 6. Personnages non-joueurs
Les PNJ pourront recevoir des dialogues, des interactions et des routines simples. Chaque comportement doit pouvoir être testé indépendamment.

## 7. Contraintes techniques
- Optimiser le nombre de polygones, les textures, les lumières et les ombres.
- Prévoir une qualité graphique adaptative pour les téléphones modestes.
- Éviter les dépendances inutiles et afficher un message clair en cas de ressource manquante.
- Tester les performances sur appareil mobile réel.

## 8. Organisation des ressources
- `02-MODELS/` : modèles 3D GLB.
- `03-TEXTURES/` : textures et atlas.
- `04-ANIMATIONS/` : animations et notes de compatibilité.
- `05-GAME/` : logique du jeu.
- `06-WORLD/` : zones et environnement.
- `07-SYSTEMS/` : combat, quêtes, inventaire et interactions.
- `08-UI/` : menus et commandes tactiles.
- `09-AUDIO/` : musique et effets sonores.

## 9. État des assets
Les modèles Meshy du personnage principal, de sa course et de l’épée divine doivent être intégrés lorsqu’ils sont accessibles dans le dépôt ou fournis dans la conversation. Leur présence ne doit pas être supposée avant vérification.

## 10. Critères de validation
Chaque ajout doit être vérifié : chargement sans erreur, comportement attendu, compatibilité mobile et absence de régression majeure. Les fonctionnalités incomplètes doivent être documentées.
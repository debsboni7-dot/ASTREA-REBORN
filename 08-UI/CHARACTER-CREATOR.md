# Créateur de personnage ASTREA

## Objectif
Le joueur crée son avatar avant d'entrer dans le monde. Le système vise une expérience de personnalisation inspirée des créateurs de RPG d'action, sans reproduire les ressources propriétaires d'un autre jeu.

## Options du prototype
- Deux bases : masculin et féminin.
- Taille réglable de 1,60 m à 2,10 m, par pas de 1 cm.
- Trois corpulences : fine, normale, robuste.
- Cinq teintes de peau.
- Coiffures : courtes, ébouriffées, longues, queue-de-cheval, chauve.
- Huit couleurs de cheveux et cinq couleurs d'yeux.
- Six palettes de tenue.
- Aperçu 3D tournant et sauvegarde locale, plus export JSON.

## Fichier
08-UI/character-creator.html

L'atelier est un prototype 3D procédural côté interface et utilise Three.js depuis un CDN : une connexion Internet est requise. Les silhouettes de l'aperçu sont provisoires, composées de primitives 3D.

Deux bases GLB provisoires ont été générées avec Blender dans `02-MODELS/characters/base-male.glb` et `02-MODELS/characters/base-female.glb` (environ 190 Ko chacune). Si une configuration est sauvegardée dans le navigateur, `index.html` charge la base correspondant au genre choisi et applique la taille, la peau, les cheveux, les yeux, la tenue et une variation de corpulence. Sans configuration enregistrée, le jeu continue de charger le héros Meshy habituel.

**Limite importante :** les deux GLB de base sont des modèles stylisés non riggés. Ils peuvent se déplacer avec le joueur, mais ils ne possèdent pas encore de squelette/animations propres. Les coiffures proposées dans l'atelier ne sont pas toutes modélisées dans ces bases. L'intégration est donc réelle mais encore partielle.

## Format de configuration exporté
Le fichier astrea-personnage.json contient schemaVersion: 1, le genre, la taille en centimètres et mètres, la corpulence, les couleurs et la coiffure.

## Limites à traiter ensuite
- Produire des modèles de base masculin et féminin plus détaillés, avec topologie propre.
- Remplacer les primitives par des éléments de personnage modulaires compatibles avec un même squelette.
- Ajouter un squelette et des animations compatibles aux bases GLB.
- Compléter les variantes de coiffure et affiner les proportions selon la corpulence.
- Ajouter des contrôles de proportions du visage, des yeux, du nez, de la bouche, des accessoires et des tenues.
- Valider le résultat sur Chrome Android et optimiser le nombre de matériaux/draw calls.
- Les sauvegardes sont locales à ce navigateur/appareil ; il n'y a pas encore de compte cloud ni de synchronisation.

## Validation
Tester les boutons masculin/féminin, les limites 1,60 m et 2,10 m, toutes les coiffures et couleurs, la rotation au doigt et l'export JSON. Vérifier sur Chrome Android que la configuration sauvegardée est bien chargée dans le prototype principal, puis contrôler le rendu de chaque option.

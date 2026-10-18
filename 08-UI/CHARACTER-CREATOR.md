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

L'atelier est un prototype 3D procédural côté interface et utilise Three.js depuis un CDN : une connexion Internet est requise. Les silhouettes sont provisoires, composées de primitives 3D. Elles ne sont pas des modèles finaux sculptés et ne remplacent pas le GLB Meshy du héros.

## Format de configuration exporté
Le fichier astrea-personnage.json contient schemaVersion: 1, le genre, la taille en centimètres et mètres, la corpulence, les couleurs et la coiffure.

## Limites à traiter ensuite
- Produire des modèles de base masculin et féminin plus détaillés, avec topologie propre.
- Remplacer les primitives par des éléments de personnage modulaires compatibles avec un même squelette.
- Relier la configuration sauvegardée au modèle réellement chargé dans index.html.
- Ajouter des contrôles de proportions du visage, des yeux, du nez, de la bouche, des accessoires et des tenues.
- Valider le résultat sur Chrome Android et optimiser le nombre de matériaux/draw calls.
- Les sauvegardes sont locales à ce navigateur/appareil ; il n'y a pas encore de compte cloud ni de synchronisation.

## Validation
Tester les boutons masculin/féminin, les limites 1,60 m et 2,10 m, toutes les coiffures et couleurs, la rotation au doigt et l'export JSON. Ne marquer l'intégration au jeu comme terminée qu'après un chargement réel de la configuration dans le prototype principal.

# ASTREA REBORN

Prototype de RPG 3D d'action et d'exploration, développé progressivement avec une priorité à la stabilité et aux performances mobiles.

## Tester le prototype
Ouvrir [`index.html`](./index.html) dans un navigateur avec Internet actif : Three.js est chargé depuis un CDN. Le prototype propose déplacement tactile/clavier, saut, attaque test, caméra et un petit village de démonstration.

**Important :** le personnage, les maisons et la végétation visibles dans cette première version sont des formes provisoires. Les modèles Meshy réels, l'animation de course et l'épée divine ne sont pas encore confirmés comme intégrés.

## Structure
- `01-DOCUMENTATION/` : cahier des charges, feuille de route, journal des changements et inventaire des assets.
- `02-MODELS/` : modèles 3D GLB.
- `03-TEXTURES/` : textures et atlas.
- `04-ANIMATIONS/` : animations et notes d'intégration.
- `05-GAME/` : logique de jeu.
- `06-WORLD/` : zones et environnement.
- `07-SYSTEMS/` : systèmes de jeu.
- `08-UI/` : interface et commandes.
- `09-AUDIO/` : audio.

Les vrais assets ne seront déclarés intégrés qu'après vérification de leur présence et de leur chargement.

## Documentation supplémentaire
- [Architecture technique](./01-DOCUMENTATION/ARCHITECTURE.md)
- [Procédure d'intégration des assets Meshy](./01-DOCUMENTATION/INTEGRATION-ASSETS.md)
- [Guide de contribution](./01-DOCUMENTATION/CONTRIBUTION.md)
- [Tests manuels](./tests/README.md)
- [Données descriptives du village de démonstration](./data/world-village.json)

## État honnête des assets
Le personnage principal Meshy, son animation de course et l'épée divine ne sont pas marqués comme intégrés tant que les fichiers sources et leur chargement n'ont pas été vérifiés.
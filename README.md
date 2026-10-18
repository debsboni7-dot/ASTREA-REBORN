# ASTREA REBORN

Prototype de RPG 3D d'action et d'exploration, avec priorité à la stabilité et aux performances mobiles.

## Tester le prototype
Ouvrir `index.html` avec Internet actif : Three.js et GLTFLoader sont chargés depuis jsDelivr. Le prototype inclut commandes tactiles/clavier, saut, caméra, attaque, chargement des modèles GLB du personnage et de l'épée, maisons Meshy et textures d'herbe/pavage.

Le chargement des animations d'attaque, de marche et d'inactivité est tenté à la demande. La compatibilité des clips avec le squelette du personnage doit encore être vérifiée visuellement sur le navigateur cible.

## Assets importés
Les fichiers réels du dépôt historique `ASTREA-ASSETS` ont été copiés dans leurs domaines :
- `02-MODELS/` : personnages, armes, bâtiments, créatures, objets et exports FBX source.
- `03-TEXTURES/` : terrain, végétation, bâtiments, environnement et effets.
- `04-ANIMATIONS/` : idle, walk et trois attaques.
- `09-AUDIO/` : aucun son source trouvé pour l'instant ; aucun faux fichier audio n'a été ajouté.

L'inventaire complet des fichiers copiés se trouve dans [ASSETS-IMPORTES.md](./01-DOCUMENTATION/ASSETS-IMPORTES.md), et le statut audio dans [AUDIO-STATUS.md](./01-DOCUMENTATION/AUDIO-STATUS.md).

## Structure
- `01-DOCUMENTATION/` : cahier des charges, architecture, inventaire et procédures.
- `02-MODELS/` : modèles 3D.
- `03-TEXTURES/` : textures et atlas.
- `04-ANIMATIONS/` : animations.
- `05-GAME/` : logique de jeu.
- `06-WORLD/` : zones et environnement.
- `07-SYSTEMS/` : systèmes de jeu.
- `08-UI/` : interface et commandes.
- `09-AUDIO/` : sons, quand les fichiers sources seront disponibles.
- `tests/` : vérifications manuelles.

## Documentation
- [Cahier des charges](./01-DOCUMENTATION/CAHIER-DES-CHARGES.md)
- [Architecture technique](./01-DOCUMENTATION/ARCHITECTURE.md)
- [Procédure d'intégration Meshy](./01-DOCUMENTATION/INTEGRATION-ASSETS.md)
- [Inventaire importé](./01-DOCUMENTATION/ASSETS-IMPORTES.md)
- [Statut audio](./01-DOCUMENTATION/AUDIO-STATUS.md)
- [Tests manuels](./tests/README.md)

## Limites connues
- Le prototype utilise une petite sélection d'assets dans la scène afin d'éviter de charger tous les modèles lourds en même temps sur Android.
- Les exports FBX sont conservés comme sources ; le chargeur actuel du prototype lit les GLB.
- L'import ne prouve pas que tous les rigs et clips d'animation sont compatibles. Il faut vérifier le rendu et les mouvements dans le navigateur mobile.


## Fichiers ajoutés manuellement et prototypes de référence
- [Inventaire des fichiers ajoutés par l'utilisateur](./01-DOCUMENTATION/ASSETS-UTILISATEUR.md)
- [Prototypes historiques conservés](./10-PROTOTYPES/README.md)
- Les deux archives de l'épée divine restent conservées dans `02-MODELS/weapons/`; le workflow extrait leurs fichiers sources et textures dans des sous-dossiers séparés sans écraser les originaux.
- Les packs ZIP de textures restent dans `03-TEXTURES/environment/` et ne sont pas supprimés.
- Les prototypes HTML d'animation présents dans `04-ANIMATIONS/` sont des démonstrations 2D indépendantes ; ils sont conservés et ne sont pas présentés comme des animations 3D directement jouables.

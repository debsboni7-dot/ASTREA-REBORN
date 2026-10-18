# ASTREA REBORN

Prototype de RPG 3D d'action et d'exploration, avec priorité à la stabilité et aux performances mobiles.

## Tester le prototype principal
Ouvrir [le prototype GitHub Pages](https://debsboni7-dot.github.io/ASTREA-REBORN/) si GitHub Pages est activé et publié, ou consulter [`index.html`](./index.html). Garder Internet actif : Three.js et GLTFLoader sont chargés depuis jsDelivr. Le prototype comprend commandes tactiles/clavier, saut, caméra, attaque, une cible d'entraînement, une quête simple, chargement des modèles GLB du personnage et de l'épée divine, maisons et textures d'herbe/pavage.

Le chargement des animations de marche, d'inactivité et d'attaque est tenté à la demande. La compatibilité des clips avec le squelette du personnage doit encore être vérifiée visuellement sur le navigateur cible. L'épée divine est convertie et chargée en priorité, avec une épée de secours en cas d'échec.

## Fichiers ajoutés par l'utilisateur — conservés et classés
- [Inventaire des ajouts et extractions](./01-DOCUMENTATION/ASSETS-UTILISATEUR.md)
- [Épée divine : sources FBX, textures PBR et GLB optimisés](./02-MODELS/weapons/README.md)
- [Packs de textures classés par domaine](./03-TEXTURES/README.md)
- [Prototypes historiques conservés](./10-PROTOTYPES/README.md)
- [Prototype du village mobile V2](./10-PROTOTYPES/legacy/ASTREA-MOBILE-VILLAGE-OPTIMISE-V2.html)
- [Prototype de test des assets](./10-PROTOTYPES/legacy/ASTREA_ASSETS_TEST_CORRIGE.html)
- Les cinq démonstrations HTML de nature, rig, combos et attaques ultimes restent dans `04-ANIMATIONS/`. Ce sont des simulations 2D interactives, distinctes des fichiers GLB d'animation.

## Organisation
- `01-DOCUMENTATION/` : cahier des charges, architecture, inventaires et procédures.
- `02-MODELS/` : modèles 3D classés par domaine ; FBX sources conservés séparément.
- `03-TEXTURES/` : textures, atlas et packs extraits classés par domaine.
- `04-ANIMATIONS/` : clips GLB et démonstrations interactives HTML.
- `05-GAME/` : logique de jeu.
- `06-WORLD/` : zones et environnement.
- `07-SYSTEMS/` : systèmes de jeu.
- `08-UI/` : interface et commandes.
- `09-AUDIO/` : sons quand les sources seront disponibles.
- `10-PROTOTYPES/` : prototypes HTML de référence, séparés du jeu principal.
- `tests/` : vérifications manuelles.

## Documentation
- [Cahier des charges](./01-DOCUMENTATION/CAHIER-DES-CHARGES.md)
- [Architecture technique](./01-DOCUMENTATION/ARCHITECTURE.md)
- [Feuille de route](./01-DOCUMENTATION/ROADMAP.md)
- [Inventaire des modèles, textures et animations](./01-DOCUMENTATION/LISTE-ASSETS.md)
- [Inventaire détaillé des assets importés](./01-DOCUMENTATION/ASSETS-IMPORTES.md)
- [État des fichiers ajoutés par l'utilisateur](./01-DOCUMENTATION/ASSETS-UTILISATEUR.md)
- [État audio](./01-DOCUMENTATION/AUDIO-STATUS.md)
- [Checklist de test mobile](./01-DOCUMENTATION/TESTS-MOBILE.md)
- [Tests manuels](./tests/README.md)

## Limites connues
- Tous les modèles ne sont pas chargés simultanément, pour limiter le risque de ralentissement sur Android.
- Les archives ZIP, FBX d'origine et textures sources sont conservés. Les deux épées divines sont converties en GLB et leur taille est réduite ; le rendu, l'orientation et l'attache dans la main restent à valider visuellement.
- Les démonstrations HTML d'animations ne sont pas des animations 3D glTF.
- Aucun fichier sonore autonome n'a été trouvé dans les dépôts inspectés.
- L'import ne prouve pas que tous les rigs et clips sont compatibles. Le rendu et les mouvements doivent être testés sur Chrome Android.

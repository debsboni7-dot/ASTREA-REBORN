# ASTREA REBORN

Prototype de RPG 3D d'action et d'exploration, avec priorité à la stabilité et aux performances mobiles.

## Tester le prototype principal
Ouvrir [le prototype GitHub Pages](https://debsboni7-dot.github.io/ASTREA-REBORN/) si GitHub Pages est activé et publié, ou consulter [`index.html`](./index.html). Garder Internet actif : Three.js et GLTFLoader sont chargés depuis jsDelivr. Le prototype comprend commandes tactiles/clavier, saut, caméra, combos, quatre attaques ultimes, une attaque ultime ultime de 20 secondes, une cible d'entraînement, une quête simple, maisons et textures d'herbe/pavage. La ville dispose d'une population prévue de 100 PNJ pacifiques basés sur de vrais modèles 3D, avec teintes, textures textiles procédurales pour les matériaux sans texture, déplacements autonomes, animations disponibles et dialogues par métier ; le rendu limite la distance d'affichage pour protéger les performances mobiles. Le marché, la forge, la mairie, le château et le camp sont ajoutés comme lieux 3D. Le personnage Meshy prioritaire est chargé depuis l'archive `02-MODELS/characters/astrea-meshy-character-upload.zip` : le jeu extrait son FBX et ses textures en mémoire. `hero.glb` sert de repli si l'archive ne peut pas être chargée.

Les clips réellement intégrés au personnage sont détectés automatiquement. Le rapport d'inspection indique que les GLB externes d'animation n'ont pas de squelette source exploitable : le jeu ne les télécharge donc plus pendant la partie. Si le personnage n'a pas de clip compatible, une animation procédurale pilotée par les os du vrai modèle riggé sert de secours. La compatibilité et le rendu doivent encore être validés sur Chrome Android. Utiliser le [laboratoire mobile d'animations](./08-UI/animation-lab.html) pour examiner les clips séparément. L'épée divine est convertie et chargée en priorité, avec une épée de secours en cas d'échec.

## Fichiers ajoutés par l'utilisateur — conservés et classés
- [Inventaire des ajouts et extractions](./01-DOCUMENTATION/ASSETS-UTILISATEUR.md)
- [Audit des modèles de personnages et nettoyage des placeholders](./01-DOCUMENTATION/AUDIT-MODELES-PERSONNAGES.md)
- [Épée divine : sources FBX, textures PBR et GLB optimisés](./02-MODELS/weapons/README.md)
- [Packs de textures classés par domaine](./03-TEXTURES/README.md)
- [Prototypes historiques conservés](./10-PROTOTYPES/README.md)
- [Prototype du village mobile V2](./10-PROTOTYPES/legacy/ASTREA-MOBILE-VILLAGE-OPTIMISE-V2.html)
- [Prototype de test des assets](./10-PROTOTYPES/legacy/ASTREA_ASSETS_TEST_CORRIGE.html)
- Les démonstrations HTML de `04-ANIMATIONS/` restent conservées comme références de timing. Les combos de poings/épée, quatre ultimes et la séquence ultime ultime de 20 secondes sont désormais reliés aux commandes du prototype 3D ; les clips externes sans squelette source exploitable ne sont pas chargés en jeu.

## Création de personnage
- [Ouvrir le créateur 3D ASTREA](./08-UI/character-creator.html) — choix masculin/féminin, taille de 1,60 à 2,10 m, corpulence, teintes de peau, coiffures, couleurs des cheveux et des yeux, tenues, rotation de l'aperçu et export JSON.
- [Laboratoire de test des animations](./08-UI/animation-lab.html) — aperçu mobile des clips intégrés et des cinq GLB externes, sans prétendre qu'ils sont déjà retargetés.\n- [Rapport de compatibilité des animations](./01-DOCUMENTATION/ANIMATION-COMPATIBILITY-REPORT.json) et [plan de retargeting](./01-DOCUMENTATION/ANIMATION-RETARGETING-PLAN.md).\n- [Documentation du créateur](./08-UI/CHARACTER-CREATOR.md). La configuration sauvegardée est maintenant lue par `index.html` : le jeu charge la base masculine ou féminine et applique plusieurs options. Ces bases restent provisoires et non riggées ; les animations et la validation sur Chrome Android restent à faire.
- [Générateur Blender des bases de personnage](./tools/create_character_bases.py) et [exécutions GitHub Actions](https://github.com/debsboni7-dot/ASTREA-REBORN/actions).

Les modèles de base du personnage sont disponibles dans [`02-MODELS/characters/base-male.glb`](./02-MODELS/characters/base-male.glb) et [`02-MODELS/characters/base-female.glb`](./02-MODELS/characters/base-female.glb). Ils ont été générés avec Blender par GitHub Actions ; ils sont provisoires et ne sont pas encore riggés.

## Modèles d'environnement créés avec Blender
Les modèles d'arbre fantastique, de groupe de rochers, de cristal d'éther et de buisson fleuri sont dans `02-MODELS/environment/`. Le fichier de scène Blender modifiable est dans `02-MODELS/blender-source/`.

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


## Systèmes du monde (première couche intégrée)
Le bouton **MONDE 🌍** ouvre le prototype des systèmes d’expansion : monnaie en Couronnes, cinq zones/continents, voyages entre régions, sauvegarde locale, fondation et développement d’un pays et navire côtier décoratif. Les régions sont générées à la demande. Les dragons et mammouths factices ont été retirés : ils ne réapparaîtront que lorsque leurs vrais modèles GLB seront disponibles.

- [Module d’expansion du monde](./07-SYSTEMS/astrea-world-expansion.js)
- [Cahier des charges maître complet](./01-DOCUMENTATION/CAHIER-DES-CHARGES.md)

**À tester sur téléphone :** ouvrir MONDE, voyager vers Elarion, puis revenir au Village d’Astrea. Vérifier aussi la persistance après rechargement. Le rendu et les performances n’ont pas été validés sur un appareil réel dans cette modification.


## Systèmes de progression ajoutés
Le panneau **MONDE 🌍** comprend maintenant une première boutique, un inventaire simplifié, des potions, une collecte de matériaux de test, deux recettes d’artisanat, trois quêtes à objectifs, des récompenses d’XP et une montée de niveau avec amélioration des PV. Ces mécaniques sont sauvegardées localement.

Les limites et prochaines étapes sont documentées dans [07-SYSTEMS/README.md](./07-SYSTEMS/README.md). Les armes possèdent maintenant un modèle visuel d'équipement et des VFX de combat légers. Le combat des créatures mythiques reste désactivé jusqu'à l'intégration de modèles GLB réels.

## Améliorations ajoutées — 18 octobre 2026
- Les continents générés utilisent désormais des textures de terrain procédurales (variations de sol) et une bordure de plage sableuse autour de la zone terrestre.
- Les boutons ATTAQUE et TECHNIQUE SPÉCIALE déclenchent des VFX adaptés à l'arme ; les combats de créatures non représentées par un GLB réel sont désactivés.
- Les dragons et mammouths ne sont pas affichés tant que leurs modèles 3D réels ne sont pas disponibles.
- Les contrôles et le rendu doivent encore être vérifiés sur un vrai téléphone Android; le contrôle de syntaxe automatique est en cours pour la dernière modification.

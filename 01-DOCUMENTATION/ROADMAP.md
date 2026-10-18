# Feuille de route ASTREA REBORN

## Phase 1 — Base du prototype
- [x] Cahier des charges maître.
- [x] Scène de test et commandes tactiles/clavier.
- [x] Redimensionnement mobile.

## Phase 2 — Assets
- [x] Recenser les modèles, textures et animations disponibles dans ASTREA-ASSETS.
- [x] Copier les assets dans les dossiers de leur domaine.
- [x] Brancher le personnage GLB, l'épée, les maisons et les textures de terrain au prototype.
- [x] Ajouter le chargement à la demande des clips d'inactivité, de marche et d'attaque.
- [ ] Vérifier visuellement le modèle, l'échelle et les matériaux sur Chrome Android.
- [ ] Vérifier que les clips d'animation correspondent au squelette du personnage.
- [x] Convertir les deux exports FBX de l'épée divine en GLB.
- [ ] Vérifier l'orientation, les textures et le point d'attache de l'épée sur Chrome Android.
- [x] Réduire la taille des textures embarquées et des GLB de l'épée (conversion validée par GitHub Actions ; test mobile restant).

## Phase 2B — Création de personnage
- [x] Ajouter un atelier de création 3D avec bases masculine et féminine provisoires.
- [x] Ajouter une taille réglable de 1,60 m à 2,10 m par pas de 1 cm.
- [x] Ajouter la corpulence, les teintes de peau, les coiffures, les couleurs de cheveux et d'yeux, et les palettes de tenue.
- [x] Ajouter l'export JSON et une sauvegarde locale dans le navigateur.
- [x] Générer les deux modèles de base GLB avec Blender et vérifier que les fichiers sont exportés (validation du workflow GitHub Actions ; validation visuelle mobile restante).
- [x] Ajouter un accès à l'atelier depuis le jeu et lire la configuration sauvegardée pour appliquer la taille et, selon les noms des matériaux, les couleurs au modèle chargé (intégration partielle).
- [ ] Étendre les coiffures à toutes les variantes (la base féminine/masculine ne contient pas encore toutes les coiffures proposées dans l’atelier).
- [ ] Passer des bases provisoires non riggées à des pièces de personnage modulaires avec squelette compatible ; les bases actuelles ne sont pas encore animables par un rig.
- [ ] Tester le créateur sur Chrome Android.

## Phase 3 — Gameplay
- [ ] Déplacement, course et saut avec animation confirmée.
- [ ] Combos d'attaque synchronisés avec l'épée.
- [ ] Interactions avec objets et PNJ.
- [ ] Première quête testée sur téléphone.
- [x] Ajouter une cible d'entraînement, des points de vie et une quête simple dans le prototype (validation Android encore nécessaire).

## Phase 4 — Village
- [ ] Placer progressivement les bâtiments et points d'intérêt importés.
- [ ] Textures de terrain, végétation et environnement.
- [ ] Intérieurs et portes interactives.
- [ ] Profilage et optimisation du rendu mobile.

## Audio
- [ ] Ajouter des sons réels quand les fichiers source seront fournis ou retrouvés.

## Prochaines étapes bloquées par un test réel
- [ ] Ouvrir le prototype sur Chrome Android et confirmer l'affichage sans écran noir.
- [ ] Confirmer le héros, l'épée, les textures, les animations et la quête.
- [ ] Mesurer fluidité, temps de chargement et chauffe sur le Galaxy A06.

## Règle de progression
Un fichier importé n'est pas automatiquement un système terminé : conserver les tâches de compatibilité et de test comme incomplètes jusqu'à vérification en jeu.

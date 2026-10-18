# Journal des changements

## 2026-10-18
- Création du cahier des charges maître et de la structure documentaire.
- Import des modèles GLB/FBX, textures et animations depuis le dépôt public ASTREA-ASSETS.
- Classement des modèles par catégories et des textures par domaine.
- Mise à jour du prototype Three.js : chargement du personnage GLB, de l'épée Meshy, des maisons et des textures herbe/pavage.
- Ajout du chargement à la demande des clips de marche, d'inactivité et d'attaque.
- Aucun fichier audio source trouvé dans ASTREA-ASSETS ; le dossier audio reste prêt à recevoir les sons.
- La compatibilité des rigs et le rendu sur Chrome Android restent à tester.

## 2026-10-18 — Adaptation des ajouts utilisateur
- Conservation des deux archives originales de l'épée divine rouge.
- Extraction des FBX de l'épée et des textures PBR (albedo, metallic, normal, roughness) dans les domaines modèles et textures.
- Extraction des packs de bois, murs/sols, pavés, roche, sable et matériaux supplémentaires dans leurs catégories.
- Copie des prototypes du village mobile et des versions de test dans `10-PROTOTYPES/legacy/`, sans remplacer `index.html`.
- Documentation mise à jour pour distinguer les sources FBX, les clips GLB et les démonstrations HTML 2D.
- Vérification des dépôts : aucun fichier audio autonome trouvé ; aucune musique ou SFX fictif ajouté.

## 2026-10-18 — Gameplay et optimisation mobile
- Ajout d'une cible d'entraînement avec 3 PV et d'une quête de test récompensée par 100 XP après trois coups.
- Le prototype essaie désormais l'épée divine rouge convertie avant l'épée de secours ; le point d'attache reste approximatif et doit être validé visuellement.
- Conversion automatisée réussie des deux exports FBX en GLB via Blender dans GitHub Actions.
- Textures embarquées redimensionnées à 1024 px maximum et exportées en JPEG qualité 82.
- Tailles constatées : 1 671 992 octets pour `divine-red-sword-4643.glb` et 2 234 024 octets pour `divine-red-sword-4744.glb`.
- Les tests réels sur Chrome Android restent nécessaires pour confirmer matériaux, orientation, animations, commandes, fluidité et chauffe.

## 2026-10-18 — Modèles réels, animations et VFX
- Suppression des silhouettes primitives de secours pour le héros, le guide et la cible d'entraînement : seuls les vrais modèles GLB/FBX sont affichés.
- Suppression des maisons-boîtes provisoires ; les maisons ne sont ajoutées que si le GLB réel se charge.
- Correction de l'arsenal : le modèle Meshy classique est réservé à l'épée de base et le modèle divin à l'Épée Divine ; les autres armes gardent leur propre géométrie et leur couleur.
- Ajout de VFX procéduraux légers par arme : arcs de coupe, traits de projectiles, orbes magiques, anneaux d'impact, particules et techniques spéciales.
- Fusion des pistes d'animation séparées par os avant tentative de retargeting ; ajout d'une animation procédurale de secours pilotée par les os du modèle riggé.
- Le contrôle de syntaxe JavaScript est exécuté automatiquement par GitHub Actions ; la validation visuelle et les FPS sur Galaxy A06 restent à effectuer.

- Suppression des dragons et mammouths procéduraux du système Monde : aucun combat de créature n'est proposé sans modèle GLB réel correspondant.

- Les animations externes sans squelette source exploitable ne sont plus téléchargées pendant la partie ; le héros utilise ses clips intégrés ou l'animation procédurale de secours, ce qui évite des téléchargements inutiles sur mobile.

## 2026-10-18 — Combos, ultimes et ville vivante
- Correction du filtre d'extension FBX dans l'archive Meshy : le chargeur peut maintenant trouver le FBX texturé du personnage principal au lieu de tomber systématiquement sur le repli.
- Correction du tinting des PNJ : suppression de l'appel à `makeMat()` hors de sa portée, qui empêchait le chargement des PNJ ; les matériaux sont clonés et les maillages sans texture reçoivent des couleurs cohérentes.
- Connexion des timings des prototypes de combos de poings et d'épée aux os du héros, avec impacts et VFX sur chaque frappe.
- Ajout de quatre variantes d'attaque ultime, sélectionnées à chaque utilisation, et de l'ultime ultime de 20 secondes avec plusieurs phases et impacts.
- Population du village portée à 100 instances de PNJ utilisant les GLB masculins présents, avec teintes de tenues, itinéraires locaux, animations intégrées lorsqu'elles existent, mouvement procédural de secours et dialogues amicaux.
- Ajout du marché, de la forge, de la mairie, du château et du camp d'aventuriers en 3D ; aucun PNJ civil n'attaque le joueur.
- Distance d'affichage et animation des PNJ limitées autour du joueur pour préserver les performances Android. Contrôle syntaxique automatique réussi ; test visuel et FPS réels encore nécessaires.

- Ajout de textures textiles procédurales légères (motif de tissage) et de couleurs de matériaux pour les vêtements/maillages de PNJ dépourvus de texture, avec cache partagé pour limiter la mémoire GPU.

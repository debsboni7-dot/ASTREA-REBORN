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

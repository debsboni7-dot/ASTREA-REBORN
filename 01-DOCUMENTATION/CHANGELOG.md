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

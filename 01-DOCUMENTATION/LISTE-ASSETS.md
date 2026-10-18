# Inventaire des assets ASTREA REBORN

| Asset | Chemin importé | État |
|---|---|---|
| Personnage principal GLB | `02-MODELS/characters/hero.glb` | Branché au chargement du prototype ; test visuel nécessaire |
| Variante du personnage Meshy | `02-MODELS/characters/main-character-meshy.glb` | Importée, non chargée par défaut |
| Personnage supplémentaire | `02-MODELS/characters/character-extra.glb` | Importé |
| Jeune aventurier | `02-MODELS/characters/young-adventurer.glb` | Importé |
| Épée provisoire Meshy | `02-MODELS/weapons/sword-meshy.glb` | Branchée au prototype ; l'échelle reste à vérifier |
| Épée divine rouge — source A/B | `02-MODELS/weapons/source-divine-sword/` | FBX et textures PBR extraits ; conversion en GLB et vérification du matériau encore nécessaires |
| Maison | `02-MODELS/buildings/small-house.glb` | Branchée au chargement du prototype |
| Salle intérieure | `02-MODELS/buildings/interior-room.glb` | Importée ; pas encore chargée dans la scène |
| Pont | `02-MODELS/buildings/footbridge.glb` | Importé ; placement à faire |
| Cheval | `02-MODELS/creatures/brown-horse.glb` | Importé, non chargé par défaut |
| Créature humanoïde | `02-MODELS/creatures/humanoid-monster.glb` | Importée |
| Établi, puits, feu, chariot, diligence, portes et objets | `02-MODELS/props/` | Importés ; placement et interactions à développer |
| Herbe et pavage du village | `03-TEXTURES/terrain/grass-1.jpg`, `paving-village-1.jpg` | Branchés au matériau du terrain et du chemin |
| Terre et roche | `03-TEXTURES/terrain/` | Importées ; application à d'autres surfaces à faire |
| Packs bois et murs/sols | `03-TEXTURES/buildings/wood-pack/`, `walls-floors-pack/` | Extraits depuis les ZIP de l'utilisateur |
| Packs pavés, roche et sable | `03-TEXTURES/terrain/paving-pack/`, `rock-pack/`, `sand-pack/` | Extraits depuis les ZIP de l'utilisateur |
| Pack de matériaux supplémentaires | `03-TEXTURES/environment/material-pack-lot3/` | Extrait ; catégorisation fine à poursuivre selon l'utilisation en jeu |
| Textures PBR de l'épée divine | `03-TEXTURES/weapons/divine-sword/` | Albedo, metallic, normal et roughness extraits pour les deux variantes |
| Ciel, atlas fleurs/fenêtres, éléments et VFX | `03-TEXTURES/` | Importés ; usage à intégrer |
| Marche et inactivité | `04-ANIMATIONS/anim-walk.glb`, `anim-idle.glb` | Chargement à la demande ; compatibilité du rig à vérifier |
| Attaques 1–3 | `04-ANIMATIONS/anim-attack-1.glb` à `anim-attack-3.glb` | Chargement à la demande ; compatibilité du rig à vérifier |
| Démonstrations HTML de nature, rig, combos et ultimes | `04-ANIMATIONS/01-*.html` à `05-*.html` | Prototypes 2D interactifs conservés ; pas des clips 3D glTF |
| Village mobile et anciens tests HTML | `10-PROTOTYPES/legacy/` | Copiés en références séparées ; `index.html` principal n'a pas été remplacé |
| Sons | `09-AUDIO/` | Aucun fichier audio autonome trouvé dans les deux dépôts inspectés |

L'inventaire avec tailles et chemins source est dans [ASSETS-IMPORTES.md](./ASSETS-IMPORTES.md). Les fichiers ajoutés manuellement et extraits des archives sont décrits dans [ASSETS-UTILISATEUR.md](./ASSETS-UTILISATEUR.md).

Les exports FBX sont conservés comme sources : le chargeur actuel du prototype utilise GLB/glTF et ne charge pas directement le FBX.

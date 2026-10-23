# ASTREA REBORN — les 10 prochains modèles 3D prioritaires

Objectif : produire des modèles GLB texturés, cohérents entre eux et optimisés pour le jeu Android. Générer les modèles séparément. Ne pas demander de scène complète.

## Réglages communs
- Format : GLB / glTF 2.0, matériaux PBR et textures intégrées.
- Style : fantasy médiévale réaliste, identité originale ASTREA, couleurs naturelles, détails lisibles en jeu.
- Optimisation : maillage propre, pivots cohérents, textures 1K (2K uniquement si nécessaire), pas de décor invisible, taille raisonnable.
- Échelle : objets à l'échelle humaine ; origine au sol et axe vertical correct.
- Pas de logos, personnages ou modèles copiés d'un jeu commercial.

## Les 10 modèles à créer, par ordre de priorité

### 1. Chêne forestier — `oak_forest.glb`
**Prompt :** Arbre de forêt fantasy médiévale réaliste, grand chêne ancien avec tronc noueux, racines visibles, écorce PBR détaillée, feuillage dense vert naturel avec variations de couleur, silhouette lisible de loin, modèle séparé du sol, pivot au centre de la base, style original ASTREA. GLB optimisé pour instanciation en grand nombre, aucun paysage attaché.

### 2. Pin de montagne — `pine_mountain.glb`
**Prompt :** Pin forestier réaliste pour un RPG fantasy, tronc brun texturé, branches étagées, aiguilles vert profond avec variations, silhouette naturelle et asymétrique, racines modestes, pivot au sol, modèle seul, PBR, optimisé mobile et compatible avec des forêts denses.

### 3. Rocher et amas de pierres — `rock_cluster.glb`
**Prompt :** Amas de rochers naturels de montagne, formes irrégulières, strates géologiques, mousse discrète, textures rocheuses PBR avec albedo, roughness et normal si disponibles, silhouette lisible, aucun sol plat attaché, pivot à la base, modèle modulaire réutilisable pour falaises et chemins.

### 4. Touffe d'herbe — `grass_clump.glb`
**Prompt :** Touffe d'herbe sauvage réaliste avec plusieurs brins distincts, nuances vert olive et vert frais, petites feuilles et base naturelle, géométrie très légère, matériau compatible avec éclairage temps réel, modèle individuel destiné à être dupliqué sur les prairies, pivot au sol.

### 5. Cerf paisible — `deer_rigged.glb`
**Prompt :** Cerf forestier réaliste et original, anatomie crédible, pelage brun texturé, yeux naturels, bois détaillés mais non exagérés, quatre pattes bien séparées, modèle complet riggé avec squelette propre. Prévoir des animations distinctes nommées Idle, Walk, Run et Eat. GLB, matériaux PBR, proportions naturelles.

### 6. Loup sauvage — `wolf_rigged.glb`
**Prompt :** Loup fantasy réaliste mais naturel, pelage gris-brun détaillé, anatomie quadrupède crédible, yeux naturels, expression neutre, modèle riggé propre. Prévoir Idle, Walk, Run, Growl et Attack en clips séparés, racine stable sans déplacement global forcé, GLB optimisé mobile. Il doit être un animal de jeu, pas une copie d'une créature existante.

### 7. Barque d'exploration — `exploration_boat.glb`
**Prompt :** Barque médiévale robuste pour transporter un petit groupe entre les continents d'ASTREA, coque en bois usé avec planches distinctes, cordages, bancs, petit mât et voile pliée, détails PBR, intérieur visible, modèle sans eau ni décor, origine au centre de la coque, dimensions réalistes, GLB optimisé pour Android.

### 8. Forge médiévale — `blacksmith_forge.glb`
**Prompt :** Forge médiévale fantasy autonome, structure en pierre et bois, foyer avec braises, enclume, soufflet, outils suspendus, établi et rangement d'armes, matériaux PBR réalistes, couleurs chaudes, pas de personnage ni de décor autour, portes et éléments clairement séparés si possible, modèle GLB à l'échelle humaine.

### 9. Coffre de quête — `quest_chest.glb`
**Prompt :** Coffre au trésor médiéval fantasy original, bois sombre, ferrures métalliques, serrure lisible, usure crédible, matériaux PBR, couvercle séparé et pivot positionné pour une ouverture animable, origine au sol, modèle compact et optimisé. Pas de pièces ni d'effets flottants attachés.

### 10. Maison forestière — `forest_cabin.glb`
**Prompt :** Petite maison médiévale de garde forestier pour un RPG fantasy réaliste, pierre locale, poutres en bois, toit en bardeaux, cheminée, porte et fenêtres clairement visibles, palette naturelle, textures PBR, échelle humaine, modèle autonome sans terrain ni arbres attachés, GLB optimisé. Prévoir des éléments séparés pour ouvrir la porte.

## Vérifications avant intégration
1. Vérifier que le fichier GLB s'ouvre et que ses textures sont intégrées.
2. Pour les animaux, vérifier le squelette et lire chaque clip dans un visualiseur avant de l'utiliser en jeu.
3. Refuser les clips qui déplacent le personnage hors de son contrôleur, déforment le squelette ou provoquent des poses cassées.
4. Tester un modèle à la fois sur Android avant d'ajouter des dizaines d'instances.
5. Garder les fichiers sources et vérifier les licences avant de redistribuer des modèles tiers.

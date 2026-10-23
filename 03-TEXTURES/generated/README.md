# Textures PBR haute résolution — ASTREA Reborn

L'ancien atlas procédural de 200 tuiles a été retiré : il ne fait plus partie du rendu du jeu.

Le moteur utilise désormais des matériaux photographiques PBR issus de **Poly Haven**, sous licence **CC0** :
- Terrain rocheux : [Rocky Terrain 02](https://polyhaven.com/a/rocky_terrain_02)
- Pavés usés : [Cobblestone 01](https://polyhaven.com/a/cobblestone_01)
- Pierre de murs : [Rustic Stone Wall 02](https://polyhaven.com/a/rustic_stone_wall_02)
- Planches de bois : [Brown Planks 03](https://polyhaven.com/a/brown_planks_03)
- Sol forestier : [Forest Ground 03](https://polyhaven.com/a/forrest_ground_03)
- Terre : [Dirt](https://polyhaven.com/a/dirt)

Le moteur charge les cartes **diffuse, normal OpenGL et roughness** depuis les fichiers JPG de la bibliothèque Poly Haven. Il utilise 2K sur les écrans tactiles/petits appareils pour limiter la mémoire graphique et 4K sur les grands écrans. Les matériaux déjà texturés des modèles GLB, notamment le héros, sont conservés.

**Note technique :** ces textures sont chargées depuis le CDN officiel de Poly Haven au démarrage du jeu ; elles ne sont pas encore copiées localement dans le dépôt. Une connexion internet est donc nécessaire pour les charger, sauf si les cartes sont ensuite mirorées dans le dépôt.

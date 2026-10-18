# Test mobile — ASTREA REBORN

## But
Valider le premier prototype jouable sur Chrome Android avant d'ajouter plus de contenu.

## Lancer
- Ouvrir la page GitHub Pages du dépôt lorsqu'elle est publiée.
- Garder une connexion Internet : le prototype charge Three.js depuis un CDN.
- Recharger la page après chaque mise à jour du dépôt.

## Contrôles
- Flèches tactiles à gauche : déplacement.
- Glisser sur la scène : tourner la caméra.
- SAUT : sauter.
- ATTAQUE : frapper la cible d'entraînement à courte portée.
- Approcher la cible rouge, puis réussir trois coups pour terminer la quête.

## Résultats à vérifier
- [ ] La scène s'affiche sans écran noir.
- [ ] Le personnage Meshy réel se charge ; si son archive échoue, le GLB riggé `hero.glb` sert de secours. Aucune silhouette primitive ne doit apparaître.
- [ ] Le chemin et le terrain affichent leurs textures.
- [ ] Les boutons tactiles répondent.
- [ ] La cible 3D réelle se charge et ses PV diminuent à chaque coup valide.
- [ ] Les attaques affichent des VFX colorés, les techniques spéciales ont un effet plus large et les effets disparaissent sans s'accumuler.
- [ ] La quête affiche « Quête terminée » après le troisième coup.
- [ ] Pas de blocage prolongé ni de chauffe anormale sur le téléphone.

## Limites connues
- Les tests réels sur Galaxy A06 restent à faire ; un succès GitHub Actions ne valide pas le rendu sur téléphone.
- Les animations importées doivent encore être confirmées compatibles avec le squelette du héros.
- Les sons ne sont pas intégrés, car aucun fichier audio source n'a été trouvé.
- La scène est un prototype court, pas encore le RPG complet.

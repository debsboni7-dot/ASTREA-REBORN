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
- COMBO : enchaîner les frappes de poings ou d'épée selon l'arme équipée.
- ULTIME : déclencher une des quatre attaques ultimes ; les variantes défilent à chaque utilisation.
- ULTIME+ : lancer la séquence ultime ultime de 20 secondes, avec plusieurs impacts et VFX.
- PARLER : discuter avec le guide ou le PNJ le plus proche. Les PNJ du village sont pacifiques.
- Approcher la cible rouge, puis réussir trois coups pour terminer la quête.

## Résultats à vérifier
- [ ] La scène s'affiche sans écran noir.
- [ ] Le personnage masculin de Kimi se charge en priorité ; si sa source échoue, le chargeur essaie l’archive Meshy texturée et riggée. Le `hero.glb` local n’est pas utilisé comme héros contrôlable. Aucune silhouette primitive ne doit apparaître.
- [ ] Le chemin et le terrain affichent leurs textures.
- [ ] Les boutons tactiles COMBO, ULTIME et ULTIME+ répondent ; les séquences se terminent sans bloquer les commandes.
- [ ] Le personnage principal chargé depuis l'archive Meshy est visible, texturé et contrôlable.
- [ ] Les combos déclenchent plusieurs impacts, l’attaque peut être mise en file en appuyant pendant un combo, et les variantes poings/épée + magie apparaissent une fois sur trois. L’ultime ultime dure environ 20 secondes.
- [ ] Les 200 PNJ répartis dans les quartiers se déplacent ; ceux proches du joueur jouent une animation intégrée ou procédurale, et font un geste pendant le dialogue sans attaquer le joueur.
- [ ] Le village affiche les lieux Marché, Forge, Mairie, Château et Camp.
- [ ] La cible 3D réelle se charge et ses PV diminuent à chaque coup valide.
- [ ] Les attaques affichent des VFX colorés, les techniques spéciales ont un effet plus large et les effets disparaissent sans s'accumuler.
- [ ] La quête affiche « Quête terminée » après le troisième coup.
- [ ] Pas de blocage prolongé ni de chauffe anormale sur le téléphone.

## Limites connues
- Les tests réels sur Galaxy A06 restent à faire ; un succès GitHub Actions ne valide pas le rendu sur téléphone.
- Les animations externes GLB ne sont pas chargées en partie tant que leur squelette source n'est pas exploitable ; les séquences des prototypes HTML sont pilotées par les os du héros riggé.
- Les sons ne sont pas intégrés, car aucun fichier audio source n'a été trouvé.
- La scène est un prototype court, pas encore le RPG complet.

# Systèmes de jeu ASTREA REBORN

## Première couche jouable
- Déplacement, caméra et collisions dans le prototype principal.
- Arsenal existant et panneau Monde.
- Cinq régions générées à la demande : Village d’Astrea, Elarion, Solkar, Frostholm et Drakorys.
- Couronnes, voyages, régions découvertes et sauvegarde locale.
- Fondation et amélioration de pays (version initiale).
- Navire côtier stylisé (décoratif). Les dragons et mammouths factices ont été retirés en attendant leurs modèles GLB réels.
- Boutique : potions et armes de progression.
- Inventaire simplifié, potion de soin, collecte de ressources et deux recettes d’artisanat.
- Trois quêtes avec conditions, récompenses, XP et montée de niveau.
- Les combats de créatures mythiques sont désactivés jusqu'à l'intégration de modèles GLB réels.

## Limites actuelles à ne pas confondre avec le jeu final
- Les armes achetées sont enregistrées dans la progression du monde; elles ne sont pas toutes reliées au système visuel d’équipement du personnage.
- Les ressources se ramassent avec une action de test; les gisements, arbres récoltables et animations de récolte restent à faire.
- Le navire est décoratif : embarquement, déplacement du bateau, animation de traversée et ports interactifs restent à faire.
- Aucun dragon ni mammouth n'est instancié sans vrai modèle GLB ; leurs combats et récompenses sont désactivés temporairement.
- Les quêtes, l’inventaire et les achats sont une première couche; dialogues, marchands physiques, stock, prix de vente, journal détaillé et artisanat complet restent à développer.
- Les royaumes n’ont pas encore de territoire visible, de construction libre, d’impôts, d’armée, de diplomatie ou de gestion de population avancée.
- Le multijoueur nécessite un serveur externe et une synchronisation dédiée; il n’est pas activé.

## Prochaines priorités
1. Tester la navigation et le panneau Monde sur Chrome Android.
2. Connecter les armes achetées à l’équipement visuel et au combat réel.
3. Créer des interactions dans le village : PNJ, dialogues, marchands et tableaux de quêtes.
4. Ajouter des points de collecte visibles et des coffres aux régions.
5. Connecter PV, potions, ennemis et récompenses au combat standard.
6. Améliorer textures, éclairage, ciel, végétation et optimisation mobile.
7. Implémenter le multijoueur seulement après stabilisation du jeu solo.

Les systèmes ajoutés ici n'ont pas encore été validés par un test de jeu sur un téléphone Android réel.

## Mise à jour — 18 octobre 2026
- Textures de sol générées localement avec CanvasTexture : herbe/forêt, sable, glace/neige et sol volcanique, avec petites variations visuelles et bordure sableuse.
- Les attaques normales et spéciales déclenchent des effets VFX. Le système ne cible plus les créatures mythiques sans modèle GLB réel.
- À faire : IA de combat, animation et poursuite des créatures, attaque ennemie, réapparition, optimisation après test mobile.

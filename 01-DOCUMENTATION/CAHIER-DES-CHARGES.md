# ASTREA REBORN — Cahier des charges maître complet
Version 2.0 — Vision, mécaniques et critères de validation

## 1. Vision générale
ASTREA REBORN est un RPG 3D fantasy d'action, d'exploration, d'aventure et de construction de royaumes, pensé pour Android et les navigateurs mobiles. Le prototype HTML/Three.js reste léger : les systèmes sont introduits de manière modulaire, les zones sont générées à la demande et les ressources finales doivent être de vrais assets disponibles. Aucun placeholder ne doit être présenté comme un modèle final.

## 2. Boucle de jeu principale
Explorer → rencontrer des PNJ/créatures → accepter des quêtes → combattre → obtenir monnaie, matériaux et équipement → débloquer continents → commercer et voyager → fonder et développer un pays → explorer plus loin.

## 3. Personnage joueur et commandes
- Déplacement tactile, joystick, caméra glissée, saut, interaction, attaque et attaque spéciale.
- Personnage principal masculin par défaut, grand, personnalisable via le créateur existant.
- Squelette/animations cohérents, arme attachée à la paume, attaques sans déplacement racine incontrôlé.
- Vie, dégâts, mort/réapparition et progression sauvegardée.
- Options qualité basse/moyenne/haute et réglages adaptés aux téléphones modestes.

## 4. Combat et arsenal
- Armes : épées, katanas, dagues, doubles lames, faux, gantelets, haches, marteaux, grandes lames, arcs, arbalètes, armes de jet, lances, tridents, bâtons et sceptres.
- Chaque arme a un rang propre, de Débutant à Divin, des dégâts, portée, vitesse, combos et techniques.
- Les 10 épées divines doivent être uniques en apparence, couleur, effets et mouvements.
- Esquive/blocage/parade, coups légers/lourds, combos, attaques spéciales, effets visuels légers et dégâts cohérents.
- Armes colorées et correctement tenues; les modèles GLB/textures doivent être réellement présents.

## 5. PNJ, créatures et vie du monde
- PNJ avec modèles 3D réels lorsque disponibles : villageois, marchands, gardes, aventuriers, artisans, nobles et chefs de faction; silhouettes et vêtements variés, couleurs et équipements distincts.
- Dialogues, routines simples, boutiques, services, quêtes et relations/factions.
- Créatures sauvages, ennemis, boss et animaux; dragons et mammouths font partie du bestiaire.
- Dragons : créatures rares/puissantes, régions dangereuses, butin élevé, comportement de boss et récompenses.
- Mammouths : créatures anciennes des régions froides, ressources rares et rencontres dangereuses.
- Les modèles procéduraux sont provisoires tant que les GLB texturés définitifs ne sont pas intégrés.

## 6. Monde, continents et navigation
- Monde en continents/zones aux identités visuelles différentes : région de départ verdoyante, forêts d'Elarion, désert de Solkar, terres froides de Frostholm, archipel volcanique de Drakorys. Les noms sont extensibles.
- Carte du monde, lieux découverts, points d'intérêt, port, navire et voyages océaniques entre continents.
- Coût de voyage affiché, zones verrouillées/déverrouillées, sauvegarde de progression.
- Forêts, plages, montagnes, ruines, cavernes, villages, villes et routes commerciales à construire progressivement.
- Les zones sont chargées à la demande pour préserver les performances.

## 7. Économie et construction de pays
- Monnaie principale : Couronnes. Sources : quêtes, contrats, combat, exploration, vente de ressources.
- Dépenses : voyages, équipement, matériaux, commerces et fondation de pays.
- Fonder un pays nécessite un nom, une région découverte et un coût initial (prototype : 5 000 Couronnes).
- Développement : niveau du pays, population, bâtiments, défense, taxes, production, relations et territoire; les fonctions avancées restent à implémenter après le noyau.
- Sauvegarde locale du solde, des régions découvertes et des pays créés. Pas de faux paiement réel.

## 8. Inventaire, artisanat et progression
- Inventaire, équipement, consommables, matériaux, butin, coffres et sauvegarde.
- Récolte et fabrication : armes, armures, matériaux de construction, potions et nourriture.
- Niveaux joueur, statistiques, compétences, maîtrise d'arme et arbre de talents.
- Marchands avec achat/vente, prix, stock et confirmation de transaction.

## 9. Quêtes et activités
- Quêtes principales, secondaires, exploration, chasse, collecte, escorte et contrats de créatures.
- Objectifs, suivi, dialogue, récompenses et état sauvegardé.
- Tutoriel initial, journaux de quêtes et découvertes de lieux.
- Les récompenses de test doivent être identifiées comme telles.

## 10. Voyage, montures et transport
- Navires pour la traversée des océans; ports et coûts de voyage.
- Montures terrestres à prévoir (chevaux), puis montures rares si les assets sont disponibles.
- Les trajets affichent destination, prix et état du voyage; pas de promesse de monde continu si les zones sont chargées séparément.

## 11. Qualité visuelle et ambiance
- Textures de sol (herbe, terre, pavés, sable, roche), maisons texturées, toits, portes, fenêtres, intérieurs, végétation et fleurs.
- Ciel, brume, cycle jour/nuit, éclairage, eau, effets de feu, sons d'ambiance et musique activée après interaction utilisateur.
- Ombres adaptatives et peu nombreuses; limiter les lumières coûteuses, polygones et appels de rendu. Instancing pour répétitions lorsque possible.
- Éviter le post-traitement lourd sur mobile; préférer textures optimisées, matériaux partagés, atlas et niveaux de détail.
- Identité artistique cohérente; ne pas promettre photoréalisme/60 FPS avant test réel.

## 12. Multijoueur — étape distincte
- Salles privées, code de connexion, synchronisation des positions et animations, combats et PV synchronisés, autorité serveur pour les dégâts et récompenses.
- GitHub Pages seul ne fournit pas de serveur de jeu; un serveur externe est nécessaire.
- Ne pas afficher le mode multijoueur comme opérationnel avant serveur et tests réels.

## 13. Technique et architecture
- Prototype web HTML/CSS/JavaScript + Three.js, GLB/GLTFLoader.
- Modules séparés par système; données du monde en JSON/JS; sauvegardes versionnées.
- Gestion claire des erreurs d'assets; fallback explicitement provisoire.
- Qualité adaptative selon appareil; charger les continents à la demande et libérer les ressources inutilisées.
- Pas de dépendances lourdes sans justification.

## 14. Plan de validation
1. Le jeu démarre sans erreur de syntaxe.
2. Déplacement, caméra, saut et collisions fonctionnent.
3. Inventaire, armes, attaques, PV et récompenses restent cohérents.
4. Chaque continent se charge et se quitte; le joueur reste dans les limites.
5. Monnaie, voyage, fondation de pays et progression persistent après rechargement.
6. Dragons/mammouths visibles, attaquables et récompenses correctes.
7. Tester sur Chrome Android réel; mesurer FPS/mémoire; vérifier que la qualité adaptative ne fait pas régresser les commandes.
8. Toute fonction non testée reste explicitement marquée à vérifier.

## 15. État honnête
Le jeu disponible reste un prototype. Ce cahier des charges décrit l'ensemble visé; tous les systèmes ne sont pas encore finalisés. Le module astrea-world-expansion.js constitue une première couche jouable de monnaie, navigation entre zones générées et fondation de pays. Les combats de dragons et mammouths restent désactivés jusqu'à l'intégration de leurs vrais modèles GLB ; le module ne remplace pas encore les assets finaux, les quêtes narratives, l'artisanat complet ou le multijoueur.

# Architecture technique — ASTREA REBORN

## État actuel
Le point d'entrée exécutable est `index.html`. Il contient actuellement le prototype Three.js et son CSS/JavaScript intégrés. Le rendu est volontairement peu coûteux pour les téléphones Android.

## Règles
- Ne jamais déclarer un modèle Meshy intégré avant d'avoir vérifié le fichier GLB et son chargement.
- Garder un mode de secours lorsque les assets manquent.
- Limiter les ombres, la résolution de rendu et les objets visibles sur mobile.
- Séparer progressivement logique, monde, interface et données sans casser le prototype.
- Ne jamais ajouter de clé API, mot de passe ou jeton dans le dépôt.

## Évolution prévue
1. Stabiliser le prototype actuel.
2. Extraire les styles vers `css/style.css` et la logique vers `js/main.js`.
3. Ajouter un chargeur GLB et des tests d'assets.
4. Remplacer les formes provisoires une par une par les fichiers vérifiés.

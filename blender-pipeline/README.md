# ASTREA Blender Pipeline

Pipeline Blender automatise, isole du prototype jouable.

## Premier test
1. Ouvrir l'onglet **Actions** du dépôt GitHub.
2. Choisir **Build ASTREA 3D asset with Blender**.
3. Appuyer sur **Run workflow**.
4. Une fois le workflow terminé, télécharger l'artefact **astrea-blender-sword**.

## Sorties
- `astrea_sword.blend` : scène Blender éditable.
- `astrea_sword.glb` : modèle exporté pour intégration dans le jeu.
- `astrea_sword_preview.png` : rendu de contrôle.

Le workflow utilise un runner GitHub hébergé. Il ne fournit pas un bureau Blender interactif ni un GPU garanti. Il automatise des créations et exports Blender reproductibles.

# ASTREA Blender Workbench

Isolated Blender automation experiment. This folder does not modify the game runtime or overwrite existing models.

## What it does

- Runs Blender in background mode on a free GitHub-hosted Ubuntu runner.
- Builds a detailed, editable ceremonial longsword from custom mesh geometry, bevelled curves, materials and decorative components.
- Exports a native `.blend` source scene and a glTF Binary `.glb` asset.
- Produces a studio preview PNG and a JSON build report.
- Uploads all outputs as a GitHub Actions artifact (14-day retention).

## Run

Open the repository's Actions tab, choose **ASTREA Blender Workbench**, then select **Run workflow** on branch `feat/blender-cloud-workbench`.

A push changing files in this folder also runs the workflow automatically.

## Important limits

This is a free, temporary CPU-based build runner, not a persistent cloud desktop. It does not provide a live Blender GUI or GPU Pixel Streaming. The artifact is a test asset and is not automatically imported into the playable game. Review the preview and GLB before integration.

import bpy, json, os, sys
from pathlib import Path

ROOT = Path(os.environ.get("GITHUB_WORKSPACE", ".")).resolve()
FILES = [
    "02-MODELS/characters/hero.glb",
    "02-MODELS/characters/main-character-meshy.glb",
    "02-MODELS/characters/base-male.glb",
    "02-MODELS/characters/base-female.glb",
    "04-ANIMATIONS/anim-idle.glb",
    "04-ANIMATIONS/anim-walk.glb",
    "04-ANIMATIONS/anim-attack-1.glb",
    "04-ANIMATIONS/anim-attack-2.glb",
    "04-ANIMATIONS/anim-attack-3.glb",
]
report = {"purpose": "Inspect glTF skeleton and animation compatibility; no source assets are modified.", "files": []}
for rel in FILES:
    path = ROOT / rel
    item = {"path": rel, "exists": path.exists()}
    if not path.exists():
        report["files"].append(item)
        continue
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for block in bpy.data.actions:
        bpy.data.actions.remove(block)
    try:
        bpy.ops.import_scene.gltf(filepath=str(path))
        armatures = []
        for obj in bpy.context.scene.objects:
            if obj.type == "ARMATURE":
                armatures.append({
                    "name": obj.name,
                    "bones": [b.name for b in obj.data.bones],
                    "bone_count": len(obj.data.bones),
                    "animated_bones": sorted({fc.data_path.split('"')[1] for action in bpy.data.actions for fc in action.fcurves if fc.data_path.startswith('pose.bones["')})
                })
        actions = []
        for action in bpy.data.actions:
            tracks = sorted({fc.data_path.split('"')[1] for fc in action.fcurves if fc.data_path.startswith('pose.bones["')})
            actions.append({"name": action.name, "frame_range": [float(action.frame_range[0]), float(action.frame_range[1])], "curve_count": len(action.fcurves), "bone_track_count": len(tracks), "bone_tracks": tracks[:120]})
        item.update({
            "ok": True,
            "object_count": len(bpy.context.scene.objects),
            "mesh_count": sum(o.type == "MESH" for o in bpy.context.scene.objects),
            "armatures": armatures,
            "actions": actions,
            "scene_animation_count": len(bpy.data.actions),
        })
    except Exception as exc:
        item.update({"ok": False, "error": repr(exc)})
    report["files"].append(item)
out = ROOT / "01-DOCUMENTATION/ANIMATION-COMPATIBILITY-REPORT.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print("ASTREA_ANIMATION_REPORT", str(out))
print(json.dumps([{ "path": x["path"], "ok": x.get("ok"), "armatures": [(a["name"], a["bone_count"]) for a in x.get("armatures", [])], "actions": [(a["name"], a["bone_track_count"]) for a in x.get("actions", [])]} for x in report["files"]], ensure_ascii=False))

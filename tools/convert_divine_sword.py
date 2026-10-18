"""ASTREA REBORN: convert Meshy FBX swords to textured GLB using Blender."""
import bpy
import sys
import os
from pathlib import Path

def log(message):
    print("[ASTREA-SWORD-CONVERT] " + str(message))

args = sys.argv[sys.argv.index("--") + 1:]
if len(args) != 3:
    raise SystemExit("Expected: source.fbx texture_directory output.glb")

source = Path(args[0])
texture_dir = Path(args[1])
output = Path(args[2])
if not source.is_file():
    raise SystemExit(f"FBX not found: {source}")
if not texture_dir.is_dir():
    raise SystemExit(f"Texture directory not found: {texture_dir}")

# Start from a clean Blender scene.
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
for datablocks in (bpy.data.materials, bpy.data.images, bpy.data.meshes, bpy.data.armatures):
    # Remove unused data from the initial scene.
    for block in list(datablocks):
        if block.users == 0:
            datablocks.remove(block)

bpy.ops.import_scene.fbx(filepath=str(source), automatic_bone_orientation=False)
mesh_objects = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
if not mesh_objects:
    raise SystemExit(f"No mesh objects imported from {source.name}")

# Prefer the image maps belonging to this exact export.
images = [p for p in texture_dir.iterdir() if p.suffix.lower() in (".png", ".jpg", ".jpeg", ".tif", ".tiff")]
def choose_map(kind):
    words = {
        "base": ("_texture.png", "basecolor", "base_color", "albedo", "diffuse"),
        "metal": ("metallic", "metalness"),
        "rough": ("roughness",),
        "normal": ("normal",),
    }[kind]
    candidates = [p for p in images if any(w in p.name.lower() for w in words)]
    # For base color, exclude all named PBR auxiliary maps.
    if kind == "base":
        candidates = [p for p in candidates if not any(w in p.name.lower() for w in ("metallic", "roughness", "normal"))]
    return candidates[0] if candidates else None

def load_image(path):
    if path is None:
        return None
    try:
        return bpy.data.images.load(str(path), check_existing=True)
    except Exception as exc:
        log(f"Could not load image {path.name}: {exc}")
        return None

base_img = load_image(choose_map("base"))
metal_img = load_image(choose_map("metal"))
rough_img = load_image(choose_map("rough"))
normal_img = load_image(choose_map("normal"))

for obj in mesh_objects:
    for slot in obj.material_slots:
        mat = slot.material
        if mat is None:
            mat = bpy.data.materials.new(name="DivineSword_Material")
            slot.material = mat
        mat.use_nodes = True
        nodes = mat.node_tree.nodes
        links = mat.node_tree.links
        bsdf = next((n for n in nodes if n.type == "BSDF_PRINCIPLED"), None)
        if bsdf is None:
            bsdf = nodes.new("ShaderNodeBsdfPrincipled")
        output_node = next((n for n in nodes if n.type == "OUTPUT_MATERIAL"), None)
        if output_node is None:
            output_node = nodes.new("ShaderNodeOutputMaterial")
        if not any(l.from_node == bsdf and l.to_node == output_node for l in links):
            links.new(bsdf.outputs["BSDF"], output_node.inputs["Surface"])
        if base_img:
            node = nodes.new("ShaderNodeTexImage")
            node.image = base_img
            node.label = "Base Color"
            links.new(node.outputs["Color"], bsdf.inputs["Base Color"])
            base_img.colorspace_settings.name = "sRGB"
        if metal_img and "Metallic" in bsdf.inputs:
            node = nodes.new("ShaderNodeTexImage")
            node.image = metal_img
            node.label = "Metallic"
            metal_img.colorspace_settings.name = "Non-Color"
            links.new(node.outputs["Color"], bsdf.inputs["Metallic"])
        if rough_img and "Roughness" in bsdf.inputs:
            node = nodes.new("ShaderNodeTexImage")
            node.image = rough_img
            node.label = "Roughness"
            rough_img.colorspace_settings.name = "Non-Color"
            links.new(node.outputs["Color"], bsdf.inputs["Roughness"])
        if normal_img:
            tex = nodes.new("ShaderNodeTexImage")
            tex.image = normal_img
            tex.label = "Normal Map Texture"
            normal_img.colorspace_settings.name = "Non-Color"
            normal = nodes.new("ShaderNodeNormalMap")
            links.new(tex.outputs["Color"], normal.inputs["Color"])
            links.new(normal.outputs["Normal"], bsdf.inputs["Normal"])

# Keep only mesh/armature and necessary scene objects selected for export.
bpy.ops.object.select_all(action="DESELECT")
for obj in mesh_objects:
    obj.select_set(True)
    for mat_slot in obj.material_slots:
        if mat_slot.material:
            for node in mat_slot.material.node_tree.nodes:
                if node.type == "TEX_IMAGE" and node.image:
                    try:
                        node.image.pack()
                    except Exception:
                        pass
# Include armatures imported with the sword, if any.
for obj in bpy.context.scene.objects:
    if obj.type == "ARMATURE":
        obj.select_set(True)
bpy.context.view_layer.objects.active = mesh_objects[0]
output.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.export_scene.gltf(
    filepath=str(output),
    export_format="GLB",
    use_selection=True,
    export_apply=True,
    export_image_format="AUTO",
)
if not output.is_file() or output.stat().st_size < 1000:
    raise SystemExit(f"Export failed or too small: {output}")
log(f"Exported {output} ({output.stat().st_size} bytes)")

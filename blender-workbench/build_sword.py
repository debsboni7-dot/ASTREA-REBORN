"""Build a detailed, editable ASTREA sword asset with Blender's Python API.

Run:
  blender --background --python blender-workbench/build_sword.py -- /path/to/output
"""
import bpy
import json
import math
import os
import sys
from mathutils import Vector

args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
OUT = os.path.abspath(args[0] if args else "blender-workbench/output")
os.makedirs(OUT, exist_ok=True)

# Deterministic clean scene.
bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials, bpy.data.cameras, bpy.data.lights):
    for item in list(datablocks):
        if item.users == 0:
            datablocks.remove(item)

def material(name, color, metallic=0.0, roughness=0.45):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1.0)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    return mat

steel = material("ASTREA | Forged silver steel", (0.43, 0.55, 0.64), 0.88, 0.24)
edge = material("ASTREA | Honed blade edge", (0.78, 0.84, 0.88), 0.92, 0.19)
gold = material("ASTREA | Engraved warm gold", (0.72, 0.43, 0.12), 0.82, 0.26)
leather = material("ASTREA | Dark oxblood leather", (0.12, 0.025, 0.018), 0.08, 0.62)
gem = material("ASTREA | Aether sapphire", (0.025, 0.28, 0.68), 0.48, 0.18)

def mesh_object(name, verts, faces, mat, bevel=0.0):
    mesh = bpy.data.meshes.new(name + "Mesh")
    mesh.from_pydata(verts, [], faces)
    mesh.materials.append(mat)
    mesh.update()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    for poly in mesh.polygons:
        poly.use_smooth = True
    if bevel:
        mod = obj.modifiers.new("Machined edge highlights", "BEVEL")
        mod.width = bevel
        mod.segments = 3
        obj.modifiers.new("Weighted corner normals", "WEIGHTED_NORMAL")
    return obj

def bevel_curve(name, points, radius, mat, resolution=4):
    curve = bpy.data.curves.new(name + "Curve", "CURVE")
    curve.dimensions = "3D"
    curve.resolution_u = 16
    curve.bevel_depth = radius
    curve.bevel_resolution = resolution
    spline = curve.splines.new("BEZIER")
    spline.bezier_points.add(len(points) - 1)
    for bp, point in zip(spline.bezier_points, points):
        bp.co = point
        bp.handle_left_type = "AUTO"
        bp.handle_right_type = "AUTO"
    obj = bpy.data.objects.new(name, curve)
    bpy.context.collection.objects.link(obj)
    obj.data.materials.append(mat)
    return obj

def uv_sphere(name, loc, scale, mat):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=24, ring_count=12, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.data.materials.append(mat)
    for face in obj.data.polygons:
        face.use_smooth = True
    return obj

# Blade: a tapered, faceted diamond cross-section with a central fuller.
# Axis Z; blade begins above the guard and ends at a sharp point.
sections = [
    (0.00, 0.205, 0.050),
    (0.12, 0.190, 0.046),
    (0.72, 0.145, 0.036),
    (1.18, 0.090, 0.025),
    (1.43, 0.012, 0.008),
]
verts = []
for z, half_width, half_thick in sections:
    verts.extend([
        (-half_width, 0.0, z), (0.0, -half_thick, z),
        (half_width, 0.0, z), (0.0, half_thick, z),
    ])
faces = []
for row in range(len(sections) - 1):
    for side in range(4):
        a = row * 4 + side
        b = row * 4 + (side + 1) % 4
        c = (row + 1) * 4 + (side + 1) % 4
        d = (row + 1) * 4 + side
        faces.append((a, b, c, d))
faces.extend([(3, 2, 1, 0), tuple(range((len(sections)-1)*4, len(sections)*4))])
blade = mesh_object("Blade | tapered diamond forged geometry", verts, faces, steel, 0.006)
blade["asset_role"] = "main_blade"
blade["design_note"] = "Tapered diamond section, not a primitive placeholder"

# Bright cutting bevels, narrow raised strips following both blade edges.
for sign in (-1, 1):
    bevel_curve("Blade | polished cutting edge", [
        (sign*0.198, -0.004, 0.06),
        (sign*0.185, -0.004, 0.18),
        (sign*0.140, -0.003, 0.72),
        (sign*0.087, -0.002, 1.17),
        (sign*0.010, 0.0, 1.41),
    ], 0.009, edge, 2)

# Narrow central fuller line, a fine metallic inlay.
bevel_curve("Blade | central fuller inlay", [
    (0, -0.047, 0.18), (0, -0.038, 0.72), (0, -0.026, 1.13)
], 0.006, gold, 2)

# Sculpted swept crossguard as a continuous curved bar.
bevel_curve("Guard | swept quillons", [
    (-0.47, 0.0, -0.055), (-0.34, 0.0, 0.025),
    (-0.18, 0.0, 0.075), (0.0, 0.0, 0.045),
    (0.18, 0.0, 0.075), (0.34, 0.0, 0.025),
    (0.47, 0.0, -0.055)
], 0.045, gold, 5)
for sign in (-1, 1):
    uv_sphere("Guard | end cap", (sign*0.47, 0, -0.055), (0.065, 0.055, 0.065), gold)

# Central guard medallion and blue cabochon.
uv_sphere("Guard | central medallion", (0, -0.018, 0.045), (0.105, 0.065, 0.11), gold)
uv_sphere("Guard | sapphire cabochon", (0, -0.078, 0.05), (0.052, 0.025, 0.062), gem)

# Grip with shaped pommel, metal collars and a helical leather wrap.
bpy.ops.mesh.primitive_cylinder_add(vertices=12, radius=0.061, depth=0.39, location=(0, 0, -0.265))
grip = bpy.context.object
grip.name = "Grip | tapered leather core"
grip.data.materials.append(leather)
grip_bevel = grip.modifiers.new("Soft grip edges", "BEVEL")
grip_bevel.width = 0.018
grip_bevel.segments = 3
grip.modifiers.new("Grip weighted normals", "WEIGHTED_NORMAL")

for z in (-0.075, -0.455):
    bpy.ops.mesh.primitive_torus_add(major_radius=0.063, minor_radius=0.012, major_segments=32, minor_segments=8, location=(0, 0, z))
    collar = bpy.context.object
    collar.name = "Grip | gold ferrule"
    collar.data.materials.append(gold)

wrap_points = []
turns = 8
for i in range(161):
    t = i / 160
    angle = t * turns * math.tau
    z = -0.095 - t * 0.335
    radius = 0.064
    wrap_points.append((radius*math.cos(angle), radius*math.sin(angle), z))
# Use a poly spline for a true helical wrap.
wrap_curve = bpy.data.curves.new("Grip | spiral leather binding", "CURVE")
wrap_curve.dimensions = "3D"
wrap_curve.resolution_u = 2
wrap_curve.bevel_depth = 0.008
wrap_curve.bevel_resolution = 2
spline = wrap_curve.splines.new("POLY")
spline.points.add(len(wrap_points)-1)
for p, co in zip(spline.points, wrap_points):
    p.co = (*co, 1)
wrap_obj = bpy.data.objects.new("Grip | spiral leather binding", wrap_curve)
bpy.context.collection.objects.link(wrap_obj)
wrap_obj.data.materials.append(gold)

# Pommel: faceted crown with a blue inset.
uv_sphere("Pommel | gold crown", (0, 0, -0.51), (0.105, 0.085, 0.105), gold)
uv_sphere("Pommel | sapphire inset", (0, -0.078, -0.51), (0.043, 0.018, 0.05), gem)

# Tiny engraved ornaments on the guard.
for sign in (-1, 1):
    bevel_curve("Guard | engraved filigree", [
        (sign*0.20, -0.038, 0.075),
        (sign*0.27, -0.038, 0.10),
        (sign*0.34, -0.035, 0.055),
    ], 0.008, steel, 2)

# Ground plane, camera and studio lighting for a review render.
floor_mat = material("Studio | neutral backdrop", (0.025, 0.035, 0.05), 0.05, 0.82)
bpy.ops.mesh.primitive_plane_add(size=200, location=(0, 0, -0.66))
floor = bpy.context.object
floor.name = "Studio | floor"
floor.data.materials.append(floor_mat)

bpy.ops.object.camera_add(location=(2.9, -5.2, 1.45))
camera = bpy.context.object
camera.name = "Studio | camera"
target = Vector((0, 0, 0.38))
direction = target - camera.location
camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
camera.data.type = "ORTHO"
camera.data.ortho_scale = 2.75
bpy.context.scene.camera = camera

def area_light(name, location, energy, size, color):
    bpy.ops.object.light_add(type="AREA", location=location)
    light = bpy.context.object
    light.name = name
    light.data.energy = energy
    light.data.shape = "DISK"
    light.data.size = size
    light.data.color = color
    light.rotation_euler = (Vector((0,0,0.35))-light.location).to_track_quat("-Z","Y").to_euler()

area_light("Studio | key", (2.0,-3.0,3.4), 520, 3.0, (0.78,0.88,1.0))
area_light("Studio | fill", (-2.5,-1.0,1.6), 300, 2.5, (1.0,0.72,0.43))
area_light("Studio | rim", (0.0,2.2,2.7), 650, 2.0, (0.35,0.62,1.0))

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT" if bpy.app.version >= (4, 2, 0) else "BLENDER_EEVEE"
scene.eevee.taa_render_samples = 48
scene.render.resolution_x = 1200
scene.render.resolution_y = 1200
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = os.path.join(OUT, "astrea-sword-preview.png")
scene.world.color = (0.055, 0.055, 0.055)

# Keep the asset easy to select/edit and export only the sword, not the studio.
sword_objects = [o for o in scene.objects if o.name.startswith(("Blade", "Guard", "Grip", "Pommel"))]
bpy.ops.object.select_all(action="DESELECT")
for obj in sword_objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = blade

blend_path = os.path.join(OUT, "astrea-sword-source.blend")
bpy.ops.wm.save_as_mainfile(filepath=blend_path)

glb_path = os.path.join(OUT, "astrea-sword.glb")
bpy.ops.export_scene.gltf(filepath=glb_path, export_format="GLB",
                          use_selection=True, export_apply=True,
                          export_materials="EXPORT", export_yup=True)

scene.render.filepath = os.path.join(OUT, "astrea-sword-preview.png")
bpy.ops.render.render(write_still=True)

asset_objects = [o for o in sword_objects if o.type == "MESH"]
report = {
    "asset": "ASTREA ceremonial longsword",
    "blender_version": bpy.app.version_string,
    "export": "glTF Binary (.glb)",
    "source": os.path.basename(blend_path),
    "model": os.path.basename(glb_path),
    "preview": "astrea-sword-preview.png",
    "mesh_object_count": len(asset_objects),
    "polygon_count": sum(len(o.data.polygons) for o in asset_objects),
    "materials": sorted({m.name for o in asset_objects for m in o.data.materials if m}),
    "validation": "generated",
}
with open(os.path.join(OUT, "build-report.json"), "w", encoding="utf-8") as f:
    json.dump(report, f, indent=2)
print("ASTREA_BLENDER_WORKBENCH_SUCCESS", json.dumps(report))

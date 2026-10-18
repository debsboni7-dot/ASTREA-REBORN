import bpy
import math
import random
import sys
from mathutils import Vector

random.seed(41)
args = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
out_dir = args[0] if args else "02-MODELS/environment"
blend_path = args[1] if len(args) > 1 else "02-MODELS/blender-source/astrea-environment-pack.blend"
import os
os.makedirs(out_dir, exist_ok=True)
os.makedirs(os.path.dirname(blend_path), exist_ok=True)

def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
    for datablocks in (bpy.data.meshes, bpy.data.curves, bpy.data.materials):
        for item in list(datablocks):
            if item.users == 0:
                datablocks.remove(item)

def mat(name, color, roughness=0.85, metallic=0.0):
    m = bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1.0)
    m.use_nodes = True
    bsdf = m.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    return m

bark = mat("Bark_Warm_Brown", (0.19, 0.075, 0.035))
bark_light = mat("Bark_Highlights", (0.31, 0.13, 0.055))
leaf_dark = mat("Foliage_Deep_Green", (0.035, 0.19, 0.075))
leaf_mid = mat("Foliage_Forest_Green", (0.07, 0.32, 0.11))
leaf_light = mat("Foliage_Sunlit_Green", (0.22, 0.43, 0.12))
stone = mat("Stone_Slate", (0.24, 0.28, 0.31))
stone_light = mat("Stone_Light_Facets", (0.38, 0.42, 0.44))
crystal_blue = mat("Crystal_Aether_Blue", (0.08, 0.52, 0.85), 0.25, 0.18)
crystal_glow = mat("Crystal_Light_Facets", (0.24, 0.82, 1.0), 0.22, 0.12)
flower_gold = mat("Tiny_Golden_Flowers", (1.0, 0.62, 0.08), 0.55)

def assign(obj, material):
    if obj.data and hasattr(obj.data, "materials"):
        obj.data.materials.append(material)
    return obj

def ico(name, loc, scale, material, subdivisions=1, rot=None):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=subdivisions, radius=1, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    if rot:
        obj.rotation_euler = rot
    assign(obj, material)
    return obj

def cylinder(name, a, b, radius1, radius2, material, vertices=7):
    va, vb = Vector(a), Vector(b)
    delta = vb - va
    bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius1, radius2=radius2,
                                    depth=delta.length, location=(va + vb) / 2)
    obj = bpy.context.object
    obj.name = name
    obj.rotation_mode = "QUATERNION"
    obj.rotation_quaternion = delta.to_track_quat("Z", "Y")
    assign(obj, material)
    return obj

def export_asset(filename, label):
    bpy.ops.object.select_all(action="SELECT")
    bpy.context.view_layer.objects.active = bpy.context.selected_objects[0] if bpy.context.selected_objects else None
    bpy.ops.export_scene.gltf(filepath=os.path.join(out_dir, filename), export_format="GLB",
                              use_selection=True, export_apply=True, export_materials="EXPORT",
                              export_yup=True)
    print("ASTREA_MODEL_EXPORTED", label, os.path.join(out_dir, filename))

# 1. Fantasy village tree: tapered trunk, branching limbs and layered polygon foliage.
clear_scene()
cylinder("Tree_Trunk", (0,0,0), (0,0,2.55), 0.28, 0.14, bark, 8)
for i, (a,b,r) in enumerate([
    ((0,0,1.25),(.62,.08,2.15),.13),
    ((0,0,1.55),(-.58,.03,2.35),.12),
    ((0,0,1.8),(.12,.56,2.6),.10),
    ((0,0,1.7),(-.12,-.55,2.45),.10),
]):
    cylinder("Tree_Branch_%02d"%i, a,b,r,.045,bark_light,6)
clusters = [
    ((0,0,3.25),(.92,.82,.95),leaf_mid),
    ((-.62,.02,2.85),(.68,.62,.70),leaf_dark),
    ((.62,.02,2.9),(.70,.63,.74),leaf_mid),
    ((.10,.58,3.0),(.66,.62,.72),leaf_light),
    ((-.08,-.57,3.0),(.68,.61,.72),leaf_dark),
    ((-.20,.18,3.85),(.58,.54,.62),leaf_light),
]
for i,(loc,scale,material) in enumerate(clusters):
    ico("Leaf_Canopy_%02d"%i,loc,scale,material,2,(random.random()*.25,random.random()*.25,random.random()))
# subtle exposed roots
for i in range(5):
    angle=math.tau*i/5
    cylinder("Tree_Root_%02d"%i,(0,0,.22),(.52*math.cos(angle),.52*math.sin(angle),.045),.11,.045,bark,6)
export_asset("fantasy-tree.glb","fantasy-tree")

# 2. Low-poly stone cluster with mossy-looking green accents.
clear_scene()
for i, (loc,scale,rot) in enumerate([
    ((-.52,0,.35),(.66,.52,.52),(.12,.18,.35)),
    ((.28,.12,.42),(.78,.61,.62),(.05,.22,-.2)),
    ((.75,-.18,.24),(.42,.38,.36),(.2,.08,.3)),
    ((-.08,.25,.88),(.43,.39,.48),(.12,.18,.1)),
]):
    ico("Boulder_%02d"%i,loc,scale,stone if i%2==0 else stone_light,1,rot)
export_asset("rock-cluster.glb","rock-cluster")

# 3. Aether crystal deposit: three faceted crystal spikes and a small base rock.
clear_scene()
ico("Crystal_Base_Rock",(0,0,.18),(.82,.63,.32),stone,1)
cylinder("Crystal_Spike_Main",(-.08,0,.20),(-.02,.02,1.75),.31,.025,crystal_blue,6)
cylinder("Crystal_Spike_Left",(-.38,.08,.18),(-.72,.12,1.18),.23,.025,crystal_glow,6)
cylinder("Crystal_Spike_Right",(.32,-.04,.20),(.63,-.08,1.30),.24,.02,crystal_blue,6)
ico("Crystal_Fragment_A",(.25,.34,.34),(.18,.15,.24),crystal_glow,1,(.2,.4,.5))
export_asset("aether-crystal-node.glb","aether-crystal-node")

# 4. Decorative low-poly bush with tiny golden flowers.
clear_scene()
for i, (loc,scale) in enumerate([
    ((-.42,0,.36),(.54,.44,.42)),
    ((.10,.08,.48),(.62,.50,.52)),
    ((.48,-.12,.34),(.48,.42,.39)),
    ((-.08,-.30,.30),(.43,.38,.34)),
]):
    ico("Bush_Leaf_Cluster_%02d"%i,loc,scale,[leaf_dark,leaf_mid,leaf_light][i%3],2)
for i in range(11):
    angle=random.random()*math.tau
    radius=random.uniform(.18,.58)
    z=random.uniform(.40,.78)
    ico("Golden_Flower_%02d"%i,(math.cos(angle)*radius,math.sin(angle)*radius,z),(.045,.045,.045),flower_gold,1)
export_asset("flowering-bush.glb","flowering-bush")

# Save an editable Blender source scene containing a grouped collection of the pack.
clear_scene()
# Rebuild a simple overview layout for convenient editing in Blender.
for idx, (name, center, kind) in enumerate([
    ("TREE",(-3.0,0,0),"tree"),
    ("ROCK",(0,0,0),"rock"),
    ("CRYSTAL",(3.0,0,0),"crystal"),
    ("BUSH",(6.0,0,0),"bush")
]):
    # compact labelled stand-ins in the source scene, while GLBs above contain full models
    if kind=="tree":
        cylinder("Tree_Trunk_Source", (center[0],0,0),(center[0],0,2.3),.22,.12,bark,8)
        for j,loc in enumerate([(center[0],0,2.8),(center[0]-.42,0,2.45),(center[0]+.42,0,2.45)]):
            ico("Tree_Canopy_Source_%d"%j,loc,(.65,.6,.7),leaf_mid,1)
    elif kind=="rock":
        ico("Rock_Source",(center[0],0,.3),(.8,.6,.5),stone,1)
    elif kind=="crystal":
        cylinder("Crystal_Source",(center[0],0,.1),(center[0],0,1.4),.25,.02,crystal_blue,6)
        cylinder("Crystal_Side_Source",(center[0]+.35,0,.1),(center[0]+.55,0,.9),.18,.02,crystal_glow,6)
    else:
        for j in range(3):
            ico("Bush_Source_%d"%j,(center[0]+(j-1)*.35,0,.3),(.45,.4,.4),leaf_mid,1)
bpy.ops.wm.save_as_mainfile(filepath=blend_path)
print("ASTREA_BLEND_SOURCE_SAVED", blend_path)

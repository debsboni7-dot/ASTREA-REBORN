"""Generate lightweight, stylized ASTREA REBORN props with Blender and export GLB."""
import bpy, math, os
from mathutils import Vector
from pathlib import Path

ROOT = Path(os.environ.get("GITHUB_WORKSPACE", "."))
OUT = ROOT / "02-MODELS"
def mat(name, color, metallic=0.0, roughness=0.82):
    m = bpy.data.materials.get(name) or bpy.data.materials.new(name)
    m.diffuse_color = (*color, 1)
    m.use_nodes = True
    bs = m.node_tree.nodes.get("Principled BSDF")
    bs.inputs["Base Color"].default_value = (*color, 1)
    bs.inputs["Metallic"].default_value = metallic
    bs.inputs["Roughness"].default_value = roughness
    return m

BARK = mat("ASTREA_Bark_WarmBrown", (0.20, 0.085, 0.035))
BARK_LIGHT = mat("ASTREA_Bark_Highlight", (0.34, 0.16, 0.06))
LEAF = mat("ASTREA_Leaves_Emerald", (0.075, 0.28, 0.09))
LEAF_LIGHT = mat("ASTREA_Leaves_Sunlit", (0.20, 0.43, 0.11))
LEAF_DARK = mat("ASTREA_Leaves_Shadow", (0.035, 0.16, 0.065))
PINE = mat("ASTREA_Pine_Green", (0.035, 0.22, 0.15))
STONE = mat("ASTREA_Stone_Slate", (0.28, 0.31, 0.34))
STONE_LIGHT = mat("ASTREA_Stone_Light", (0.43, 0.44, 0.42))
WOOD = mat("ASTREA_Barrel_Wood", (0.30, 0.13, 0.045))
WOOD_LIGHT = mat("ASTREA_Barrel_Planks", (0.43, 0.22, 0.075))
IRON = mat("ASTREA_Dark_Iron", (0.13, 0.15, 0.17), 0.72, 0.35)
CRYSTAL_BLUE = mat("ASTREA_Mana_Crystal", (0.06, 0.48, 0.95), 0.18, 0.24)
CRYSTAL_CYAN = mat("ASTREA_Mana_Crystal_Light", (0.28, 0.82, 1.0), 0.12, 0.2)
GLASS = mat("ASTREA_Potion_Glass", (0.55, 0.83, 0.92), 0.08, 0.18)
POTION_RED = mat("ASTREA_Health_Red", (0.78, 0.025, 0.045), 0.0, 0.28)
CORK = mat("ASTREA_Cork", (0.43, 0.23, 0.09))
FERN = mat("ASTREA_Fern_Green", (0.12, 0.38, 0.11))
def clear():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)
def assign(obj, material):
    obj.data.materials.append(material)
    return obj
def cyl(name, loc, radius, depth, material, vertices=12, radius2=None):
    if radius2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=radius, depth=depth, location=loc)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=vertices, radius1=radius, radius2=radius2, depth=depth, location=loc)
    o=bpy.context.object; o.name=name; assign(o,material)
    return o
def sphere(name, loc, scale, material, subdivisions=1):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=subdivisions, radius=1, location=loc)
    o=bpy.context.object; o.name=name; o.scale=scale; assign(o,material)
    return o
def torus(name, loc, major, minor, material):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor, major_segments=16, minor_segments=6, location=loc)
    o=bpy.context.object; o.name=name; assign(o,material)
    return o
def export(rel):
    path=OUT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.object.select_all(action="SELECT")
    bpy.context.view_layer.objects.active = bpy.context.selected_objects[0]
    bpy.ops.export_scene.gltf(filepath=str(path), export_format="GLB", use_selection=True, export_apply=True)
    if not path.exists() or path.stat().st_size < 1000:
        raise RuntimeError("GLB export failed: "+str(path))
    print("[ASTREA-MODELS] Exported", path.relative_to(ROOT), path.stat().st_size, "bytes")

def oak():
    clear()
    cyl("Oak trunk", (0,0,1.05), .23, 2.1, BARK, 10)
    for a in range(5):
        ang=a*math.tau/5
        branch=cyl("Branch", (math.cos(ang)*.28, math.sin(ang)*.28, 1.65+a*.07), .095, .9, BARK_LIGHT, 8, .035)
        branch.rotation_euler[1]=math.cos(ang)*.55
        branch.rotation_euler[0]=math.sin(ang)*.55
    clusters=[(-.55,0,2.35,.72),(.4,.08,2.45,.82),(0,-.45,2.65,.78),(.08,.48,2.8,.72),(-.18,.08,3.15,.75),(.55,-.22,2.9,.56)]
    for i,(x,y,z,r) in enumerate(clusters):
        sphere("Oak foliage %02d"%i,(x,y,z),(r,r*.92,r*.88),[LEAF,LEAF_LIGHT,LEAF_DARK][i%3],2)
    export("vegetation/oak-tree.glb")
def pine():
    clear()
    cyl("Pine trunk",(0,0,1.35),.18,2.7,BARK,9)
    for i,(z,r,h) in enumerate([(1.1,.95,1.65),(1.85,.78,1.55),(2.55,.58,1.35),(3.18,.38,1.1)]):
        cyl("Pine bough layer %d"%i,(0,0,z),r,h,PINE,9,0.02)
    export("vegetation/pine-tree.glb")
def fern_model():
    clear()
    cyl("Fern base",(0,0,.12),.23,.22,LEAF_DARK,8)
    for i in range(9):
        a=i*math.tau/9
        length=.65+(i%3)*.12
        frond=sphere("Fern frond %02d"%i,(math.cos(a)*length*.46,math.sin(a)*length*.46,.38),(length*.62,.075,.055),FERN,1)
        frond.rotation_euler[2]=a
        frond.rotation_euler[1]=-.22
        for j in range(4):
            t=.22+j*.14
            x=math.cos(a)*length*t; y=math.sin(a)*length*t
            leaflet=sphere("Fern leaflet",(x-math.sin(a)*.11,y+math.cos(a)*.11,.34),( .19,.055,.045),LEAF_LIGHT,1)
            leaflet.rotation_euler[2]=a-.5
            leaflet2=sphere("Fern leaflet",(x+math.sin(a)*.11,y-math.cos(a)*.11,.34),(.19,.055,.045),LEAF,1)
            leaflet2.rotation_euler[2]=a+.5
    export("vegetation/fern-cluster.glb")
def rocks():
    clear()
    items=[(-.48,0,.35,.48),(.15,.05,.48,.62),(.55,.15,.27,.34),(-.12,-.4,.24,.32),(.38,-.36,.2,.25)]
    for i,(x,y,z,r) in enumerate(items):
        o=sphere("Rock %02d"%i,(x,y,z),(r,r*.82,r*.72),STONE if i%2==0 else STONE_LIGHT,1)
        o.rotation_euler=(i*.3,i*.55,i*.8)
    export("props/rock-cluster.glb")
def barrel():
    clear()
    cyl("Barrel core",(0,0,.62),.46,1.18,WOOD,14)
    # Slightly bulged vertical staves give the barrel a handcrafted silhouette.
    for i in range(12):
        a=i*math.tau/12
        stave=sphere("Wood stave %02d"%i,(math.cos(a)*.435,math.sin(a)*.435,.62),(.09,.075,.57),WOOD_LIGHT if i%3==0 else WOOD,1)
        stave.rotation_euler[2]=a
    for z in (.18,.48,.83,1.08):
        torus("Iron barrel hoop",(0,0,z),.455,.035,IRON)
    cyl("Barrel lid",(0,0,1.22),.405,.06,WOOD_LIGHT,14)
    export("props/wooden-barrel.glb")
def crystal():
    clear()
    # Three angular mineral shards and small raw stones around their base.
    for i,(x,y,z,r,h) in enumerate([(-.22,0,.72,.22,1.35),(.18,.05,.52,.19,1.0),(.02,-.2,.39,.14,.72)]):
        shard=cyl("Mana crystal shard %02d"%i,(x,y,z),r,h,CRYSTAL_BLUE if i%2==0 else CRYSTAL_CYAN,6,.015)
        shard.rotation_euler[1]=(-.12 if i%2 else .16)
        shard.rotation_euler[0]=.08*i
    for i in range(5):
        a=i*math.tau/5
        sphere("Crystal base stone",(math.cos(a)*.28,math.sin(a)*.28,.12),(.16,.14,.12),STONE,1)
    export("props/mana-crystal-cluster.glb")
def potion():
    clear()
    # Compact stylized bottle with a visible red liquid core and cork stopper.
    sphere("Bottle body",(0,0,.42),(.28,.28,.36),GLASS,2)
    cyl("Bottle neck",(0,0,.76),.115,.22,GLASS,12)
    cyl("Potion liquid",(0,0,.34),.235,.27,POTION_RED,16)
    cyl("Cork stopper",(0,0,.91),.105,.13,CORK,10)
    torus("Bottle collar",(0,0,.79),.115,.025,IRON)
    sphere("Bottle shine",( -.105,-.20,.48),(.035,.025,.12),CRYSTAL_CYAN,1)
    export("props/health-potion.glb")

for build in (oak,pine,fern_model,rocks,barrel,crystal,potion):
    build()
print("[ASTREA-MODELS] All seven low-poly game assets generated.")

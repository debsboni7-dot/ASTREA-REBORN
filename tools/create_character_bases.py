import bpy, os, sys, math
from mathutils import Vector
args=sys.argv[sys.argv.index("--")+1:] if "--" in sys.argv else []
out_dir=args[0] if args else "02-MODELS/characters"
os.makedirs(out_dir,exist_ok=True)

def reset():
    bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.delete(use_global=False)
    for block in bpy.data.materials:
        block.use_fake_user=True

def material(name,color,roughness=.78,metallic=0):
    m=bpy.data.materials.new(name); m.diffuse_color=(*color,1); m.use_nodes=True; m.use_fake_user=True
    bs=m.node_tree.nodes.get("Principled BSDF"); bs.inputs["Base Color"].default_value=(*color,1); bs.inputs["Roughness"].default_value=roughness; bs.inputs["Metallic"].default_value=metallic
    return m

def uv(name,loc,scale,mat,seg=10,rings=8):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg,ring_count=rings,radius=1,location=loc)
    o=bpy.context.object; o.name=name; o.scale=scale; o.data.materials.append(mat); return o
def capsule(name,a,b,r,mat,verts=8):
    a,b=Vector(a),Vector(b); d=b-a
    bpy.ops.mesh.primitive_cone_add(vertices=verts,radius1=r,radius2=r*.82,depth=d.length,location=(a+b)/2)
    o=bpy.context.object; o.name=name; o.rotation_mode="QUATERNION"; o.rotation_quaternion=d.to_track_quat("Z","Y"); o.data.materials.append(mat); return o
def box(name,loc,scale,mat):
    bpy.ops.mesh.primitive_cube_add(size=1,location=loc); o=bpy.context.object;o.name=name;o.scale=scale;o.data.materials.append(mat);return o
def build(gender,path):
    reset()
    skin=material("Skin_Warm",(.58,.32,.19)); cloth=material("Traveler_Tunic",(.10,.25,.48)); trim=material("Gold_Trim",(.72,.48,.13),.4,.4); hair=material("Hair_Dark",(.045,.027,.02)); pants=material("Trousers",(.12,.14,.18)); boots=material("Leather_Boots",(.07,.045,.03))
    f=gender=="female"; shoulder=.31 if f else .35; hip=.29 if f else .27
    # height approx 1.75 m in local units; neutral T-pose, separate unrigged mesh parts
    uv("Head",(0,1.58,0),(.17,.22,.16),skin)
    capsule("Neck",(0,1.34,0),(0,1.43,0),.075,skin)
    uv("Hair_Cap",(0,1.73,-.015),(.18,.09,.17),hair)
    if f:
        uv("Hair_Back",(0,1.47,-.11),(.15,.27,.09),hair)
        for s in [-1,1]: capsule("Long_Hair",(s*.15,1.48,-.02),(s*.16,1.18,-.02),.045,hair,6)
    else:
        for i in range(4):
            uv("Hair_Spike",((i-1.5)*.075,1.79,.015),(.07,.10,.07),hair,7,5)
    uv("Torso",(0,1.08,0),(shoulder,.32,.17),cloth)
    uv("Pelvis",(0,.78,0),(hip,.15,.16),pants)
    box("Belt",(0,.83,.015),(.50,.055,.34),trim)
    for s in [-1,1]:
        uv("Shoulder",(s*.35,1.25,0),(.14,.13,.15),cloth)
        capsule("Upper_Arm",(s*.36,1.23,0),(s*.62,1.23,0),.075,cloth)
        uv("Elbow",(s*.63,1.23,0),(.07,.07,.07),skin)
        capsule("Forearm",(s*.64,1.23,0),(s*.87,1.23,0),.06,skin)
        uv("Hand",(s*.91,1.23,0),(.07,.075,.06),skin)
        capsule("Thigh",(s*.15,.72,0),(s*.17,.43,0),.095,pants)
        capsule("Shin",(s*.17,.43,0),(s*.17,.16,0),.07,pants)
        uv("Boot",(s*.17,.10,.04),(.09,.09,.15),boots)
        uv("Eye",(s*.065,1.60,.145),(.022,.025,.015),trim,7,5)
    uv("Chest_Emblem",(0,1.10,.174),(.055,.075,.018),trim,6,5)
    bpy.ops.object.select_all(action="SELECT")
    bpy.context.view_layer.objects.active=bpy.context.selected_objects[0]
    bpy.ops.export_scene.gltf(filepath=path,export_format="GLB",use_selection=True,export_apply=True,export_materials="EXPORT")
    print("ASTREA_CHARACTER_BASE_EXPORTED",gender,path)
build("male",os.path.join(out_dir,"base-male.glb"))
build("female",os.path.join(out_dir,"base-female.glb"))

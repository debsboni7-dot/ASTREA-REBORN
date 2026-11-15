import bpy, math, os
from mathutils import Vector
OUT=os.environ.get("ASTREA_OUT","build"); os.makedirs(OUT,exist_ok=True)
bpy.ops.object.select_all(action="SELECT"); bpy.ops.object.delete(use_global=False)
def mat(n,c,m=0,r=.35):
 x=bpy.data.materials.new(n); x.diffuse_color=(*c,1); x.use_nodes=True
 s=x.node_tree.nodes.get("Principled BSDF"); s.inputs["Base Color"].default_value=(*c,1); s.inputs["Metallic"].default_value=m; s.inputs["Roughness"].default_value=r
 return x
steel=mat("Forged silver steel",(.48,.58,.68),.88,.22); edge=mat("Honed bright edges",(.82,.88,.92),.92,.16)
gold=mat("Royal engraved gold",(.72,.39,.08),.82,.2); leather=mat("Oxblood leather",(.12,.025,.018),.08,.48)
dark=mat("Recessed fuller",(.035,.055,.075),.65,.3); gem=mat("Blue sapphire",(.015,.12,.38),.7,.12)
def mesh(n,v,f,m,bev=0):
 me=bpy.data.meshes.new(n); me.from_pydata(v,[],f); me.materials.append(m); me.update()
 o=bpy.data.objects.new(n,me); bpy.context.collection.objects.link(o)
 for p in me.polygons:p.use_smooth=True
 if bev:
  b=o.modifiers.new("Micro bevels","BEVEL"); b.width=bev; b.segments=3; o.modifiers.new("Weighted normals","WEIGHTED_NORMAL")
 return o
def cyl(n,r,d,loc,m,verts=48):
 bpy.ops.mesh.primitive_cylinder_add(vertices=verts,radius=r,depth=d,location=loc);o=bpy.context.object;o.name=n;o.data.materials.append(m)
 b=o.modifiers.new("Machined bevel","BEVEL");b.width=.018;b.segments=3;o.modifiers.new("Weighted normals","WEIGHTED_NORMAL");return o
def sphere(n,loc,scale,m):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=32,ring_count=16,location=loc);o=bpy.context.object;o.name=n;o.scale=scale;o.data.materials.append(m);bpy.ops.object.shade_smooth();return o
def tube(n,pts,r,m):
 c=bpy.data.curves.new(n,"CURVE");c.dimensions="3D";s=c.splines.new("BEZIER");s.bezier_points.add(len(pts)-1)
 for p,co in zip(s.bezier_points,pts):p.co=co;p.handle_left_type="AUTO";p.handle_right_type="AUTO"
 c.bevel_depth=r;c.bevel_resolution=4;o=bpy.data.objects.new(n,c);bpy.context.collection.objects.link(o);o.data.materials.append(m);return o
# Forged blade with a real tapered diamond cross-section.
sections=[(.62,.25,.055),(1.05,.255,.052),(2.4,.205,.045),(3.75,.145,.034),(4.45,.075,.021),(4.72,.0,.0)]
v=[];f=[]
for z,w,t in sections:v += [(-w,0,z),(0,-t,z),(w,0,z),(0,t,z)]
for i in range(len(sections)-1):
 a=i*4;b=(i+1)*4
 for j in range(4):f.append((a+j,a+(j+1)%4,b+(j+1)%4,b+j))
f += [(0,1,2,3),tuple(range((len(sections)-1)*4,len(sections)*4))]
blade=mesh("ASTREA | Tapered diamond-section blade",v,f,steel,.008)
mesh("Recessed central fuller",[(-.026,-.057,.95),(.026,-.057,.95),(.019,-.044,3.75),(-.019,-.044,3.75)],[(0,1,2,3)],dark)
for side in (-1,1):mesh("Polished cutting edge",[(side*.205,-.008,1),(side*.255,-.004,1),(side*.075,-.002,4.45),(side*.095,-.002,4.35)],[(0,1,2,3)],edge)
cyl("Gold ricasso collar",.17,.10,(0,0,.58),gold,8)
tube("Swept golden crossguard",[(-.72,0,.48),(-.58,-.015,.57),(-.34,-.025,.67),(0,-.03,.72),(.34,-.025,.67),(.58,-.015,.57),(.72,0,.48)],.075,gold)
for x in (-.62,.62):sphere("Guard terminal",(x,0,.53),(.095,.09,.10),gold)
cyl("Upper grip collar",.145,.13,(0,0,.82),gold,12);cyl("Leather wrapped grip",.105,.72,(0,0,1.24),leather,12)
cyl("Lower grip collar",.145,.12,(0,0,1.64),gold,12)
pts=[]
for i in range(90):
 z=.90+.68*i/89;a=i*.42;pts.append((.108*math.cos(a),.108*math.sin(a),z))
tube("Hand-wound grip binding",pts,.012,gold)
cyl("Pommel neck",.105,.12,(0,0,1.77),gold,16);sphere("Faceted royal pommel",(0,0,1.91),(.19,.14,.19),gold)
sphere("Pommel sapphire",(0,-.132,1.91),(.075,.025,.075),gem)
for x in (-.35,.35):sphere("Guard sapphire pin",(x,-.07,.66),(.045,.025,.045),gem)
floor=mat("Studio charcoal",(.018,.024,.035),.15,.52)
bpy.ops.mesh.primitive_plane_add(size=200,location=(0,0,-.12));p=bpy.context.object;p.name="Studio floor";p.data.materials.append(floor)
def area(n,loc,power,size,color):
 bpy.ops.object.light_add(type="AREA",location=loc);o=bpy.context.object;o.name=n;o.data.energy=power;o.data.shape="DISK";o.data.size=size;o.data.color=color
 o.rotation_euler=(Vector((0,0,2.3))-o.location).to_track_quat("-Z","Y").to_euler()
area("Key softbox",(4,-5,7),950,5,(.78,.86,1));area("Warm rim",(-4,2,5),1200,4,(1,.62,.32));area("Blade strip",(0,-3,2.8),500,3,(.65,.82,1))
bpy.ops.object.camera_add(location=(6,-10,4.4));cam=bpy.context.object;cam.name="Product camera";cam.rotation_euler=(Vector((0,0,2.3))-cam.location).to_track_quat("-Z","Y").to_euler();cam.data.lens=62;bpy.context.scene.camera=cam
sc=bpy.context.scene;sc.render.engine="BLENDER_EEVEE_NEXT" if hasattr(bpy.types,"EEVEE_NEXT") else "BLENDER_EEVEE"
sc.render.resolution_x=1200;sc.render.resolution_y=1200;sc.render.resolution_percentage=100;sc.render.image_settings.file_format="PNG";sc.render.filepath=os.path.join(OUT,"astrea_sword_preview.png")
sc.view_settings.view_transform="Standard"
bpy.ops.object.select_all(action="DESELECT")
for o in sc.objects:
 if o.type in {"MESH","CURVE"} and o.name!="Studio floor":o.select_set(True)
bpy.context.view_layer.objects.active=blade
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(OUT,"astrea_sword.blend"));bpy.ops.render.render(write_still=True)
bpy.ops.object.select_all(action="DESELECT")
for o in sc.objects:
 if o.type in {"MESH","CURVE"} and o.name!="Studio floor":o.select_set(True)
bpy.context.view_layer.objects.active=blade
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT,"astrea_sword.glb"),export_format="GLB",use_selection=True)
print("ASTREA_BLENDER_BUILD_OK")

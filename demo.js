player = {
  x:120,
  z:120,
  a:step = 0
},
objects = [];

// types
// 0 - other
// 1 - fire
// 2 - leaf

// add trees
for (x=10;x--;)
  for (y=10;y--;)
    for (
        X = x*24+Math.random()*24,
        Y = Math.random()*3|0,
        Z = y*24+Math.random()*24,
        objects.push({c:'#632',x:X,y:0,z:Z,s:2,sy:10,h:1}),
        i=12;i--;)
      e = Math.random()*7,
      f = Math.random()*7,
      objects.push({
        c:'hsl(140,60%,'+(50-i*2)+'%',
        x:X+f*Math.cos(e),
        y:Y+9-i/2,
        z:Z+f*Math.sin(e),
        t:2,
        s:8,
        h:1
      });

draw = (e,f) => {
  // 3d

  for (a.width=320,i=30;i--;)
    c.fillStyle = 'hsl(200,40%,'+(50+i)+'%',
    c.fillRect(0,i*4,320,4);

  for (i=30;i--;)
    c.fillStyle = 'hsl(60,40%,'+(50+i)+'%',
    c.fillRect(0,236-i*4,320,4);

  for (f of objects)
    x = f.x - player.x,
    z = f.z - player.z,
    f.X = x * Math.cos(player.a) - z * Math.sin(player.a),
    f.Z = x * Math.sin(player.a) + z * Math.cos(player.a);

  objects.sort((e,f) => f.Z - e.Z);

  for (f of objects)
    if (f.Z > 5 && f.X*120/f.Z < 160)
      c.fillStyle = f.c,
      x = f.s*120/f.Z,
      y = (f.sy||f.s)*120/f.Z,
      c.fillRect(160 + f.X*120/f.Z - x/2, 120 - f.y*120/f.Z-y/2, x, y)
    
  // 2d
//  ;c.fillStyle = '#000';
//  c.fillRect(128-2,240+128-2,4,4);
//
//  for (f of objects) {
//    x = f.x - player.x;
//    z = f.z - player.z;
//    xp = x * Math.cos(player.a) - z * Math.sin(player.a);
//    zp = x * Math.sin(player.a) + z * Math.cos(player.a);
//    c.fillStyle = f.c;
//    c.fillRect(128+xp-f.s/2,240+128+zp-f.s/2,f.s,f.s)
//  }
},

kindle = (e,f) => {
  e.t = 1,
  e.h = 240,
  e.p = (e,f) => {
    e.c = 'hsla('+(Math.random()*50|0)+',100%,'+(50+Math.random()*10|0)+'%,.5',
    e.s = Math.random()*10+6,
    e.h--;
    step%16||objects.push({
      c:e.w?(e.w=0,'#ccc'):'#666',
      x:e.x,
      y:e.y,
      z:e.z,
      h:100,
      p:(e,f)=>{e.h--;e.y+=1/2},
      s:4
    });
    if (step%80==0)
      for (f of objects)
        if (2==f.t && Math.abs(e.x-f.x)+Math.abs(e.z-f.z) < 40 && Math.random()*100<1)
          return kindle(f)
  }
},
kindle(objects[objects.length-1]),

onkeydown = onkeyup = (e,f) => {
  player[e.keyCode] = e.type[5]
},

setInterval((e,f) => {
  player.a += (!!player[39] - !!player[37])/20,
  player.x += !!player[38]*Math.sin(player.a) - !!player[40]*Math.sin(player.a),
  player.z += !!player[38]*Math.cos(player.a) - !!player[40]*Math.cos(player.a),
  // splash water
  player[32] && step%2 && objects.push({
      c:'hsl(200,40%,'+(50+Math.random()*10|0)+'%',
      x:player.x+12*Math.cos(player.a),
      y:-8,
      z:player.z-12*Math.sin(player.a),
      e:2*Math.sin(player.a-1/2),
      f:2*Math.cos(player.a-1/2),
      s:1,
      yv:16,
      p:(e,f)=>{
        e.x+=e.e,
        e.z+=e.f,
        e.y+=e.yv/6,
        e.yv-=3/2,
        e.h--;
        for (f of objects)
          1==f.t && Math.abs(e.x-f.x)+Math.abs(e.z-f.z)<e.s/2+f.s/2 && (
            e.h=0,
            f.h-=2,
            f.w=1
          )
      },
      s:4,
      h:20
    }),
  
  objects = objects.filter((e,f)=>(e.p&&e.p(e),e.h>=0)),
  draw(),
  step++
}, 33)

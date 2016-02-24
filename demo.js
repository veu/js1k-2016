player = {
  x:140,
  z:140,
  a:1
},
entities = [];

// add trees
for (x=12;x--;)
  for (y=12;y--;)
    for (
        entities.push({
          c: '#632',
          x: X = x*24+Math.random()*24,
          y: -2,
          z: Z = y*24+Math.random()*24,
          s: 2,
          S: 14,
          h: 1
        }),
        i=12;i--;)
      f = Math.random()*7,
      entities.push({
        c: 'hsl(150,60%,'+(50-i*2)+'%',
        x: X+f*Math.cos(e = Math.random()*7),
        y: 10-i/2+Math.random()*3|0,
        z: Z+f*Math.sin(e),
        t: 2,
        s: 8,
        h: 1
      });

// burn leafs
burn = (e,f) => {
  e.h = 240,
  e.t = 1,
  e.p = (e,f) => {
    e.h--,
    e.c = 'hsla('+Math.random()*50+',100%,'+(50+Math.random()*10)+'%,.5',
    e.s = Math.random()*10+6;
    // create smoke
    step%16||entities.push({
      c:e.w?(e.w=0,'#ccc'):'#666',
      x:e.x,
      y:e.y,
      z:e.z,
      h:100,
      p:(e,f)=>{
        e.h--,
        e.y+=1/2
      },
      s:4
    });
    // spread fire
    if (step%80==0)
      for (f of entities)
        if (2==f.t && Math.abs(e.x-f.x)+Math.abs(e.z-f.z) < 40 && Math.random()*100<1)
          return burn(f)
  }
},
burn(entities[160]),

onkeydown = onkeyup = (e,f) =>
  player[e.keyCode-32] = e.type[5],

setInterval((e,f) => {
  // move player
  player.a += (!!player[7] - !!player[5])/20,
  player.x += !!player[6]*Math.sin(player.a) - !!player[8]*Math.sin(player.a),
  player.z += !!player[6]*Math.cos(player.a) - !!player[8]*Math.cos(player.a),

  // splash water
  player[0] && entities.push({
      c:'hsl(200,40%,'+(50+Math.random()*10)+'%',
      x:player.x+12*Math.cos(player.a),
      y:-8,
      z:player.z-12*Math.sin(player.a),
      e:2*Math.sin(player.a-1/2),
      f:2*Math.cos(player.a-1/2),
      s:1,
      Y:16,
      p:(e,f)=>{
        e.h--,
        e.x+=e.e,
        e.z+=e.f,
        e.y+=e.Y/6,
        e.Y-=3/2;
        for (f of entities)
          1==f.t && Math.abs(e.x-f.x)+Math.abs(e.z-f.z)<e.s/2+f.s/2 && (
            e.h=0,
            f.h-=9,
            f.w=1
          )
      },
      s:4,
      h:24
    });

  // prepare canvas
  a.width=500,
  c.translate(90,a.height/2-120|0);

  // draw sky
  for (i=30;i--;)
    c.fillStyle = 'hsl(200,40%,'+(50+i)+'%',
    c.fillRect(0,i*4,320,4);

  // update world
  for (f of entities)
    f.p&&f.p(f);
  entities = entities.filter((e,f)=>e.h>=0);

  // draw ground
  for (i=30;i--;)
    c.fillStyle = 'hsl(60,40%,'+(50+i)+'%',
    c.fillRect(0,236-i*4,320,4);

  // calculate z-indexes
  for (f of entities)
    x = f.x - player.x,
    z = f.z - player.z,
    f.X = x * Math.cos(player.a) - z * Math.sin(player.a),
    f.Z = x * Math.sin(player.a) + z * Math.cos(player.a);

  // sort entities
  entities.sort((e,f) => f.Z - e.Z);

  // draw entities
  for (f of entities)
    if (f.Z > 8 && f.X*120/f.Z > -160 && f.X*120/f.Z < 160)
      c.fillStyle = f.c,
      x = f.s*120/f.Z,
      y = (f.S||f.s)*120/f.Z,
      c.fillRect(160 + f.X*120/f.Z - x/2, 120 - f.y*120/f.Z-y/2, x, y);

  // draw map for debugging (needs height ~= 600)
//  c.fillStyle = '#000';
//  c.fillRect(160-2,240+160-2,4,4);
//
//  for (f of entities) {
//    x = f.x - player.x;
//    z = f.z - player.z;
//    xp = x * Math.cos(player.a) - z * Math.sin(player.a);
//    zp = x * Math.sin(player.a) + z * Math.cos(player.a);
//    c.fillStyle = f.c;
//    c.fillRect(160+xp-f.s/2,240+160+zp-f.s/2,f.s,f.s)
//  }

  step++
}, step = 33)

player = {
  x:210,
  z:210,
  h:1
},
entities = [],

color = (e,f,g) =>
  'hsl('+[e,f+'%',50+g+'%'];

// add trees
for (x=20;x--;)
  for (y=20;y--;)
    for (
        // create trunk
        entities.push({
          c: color(i=12,40,-24),
          x: X = x*24+Math.random()*24,
          y: -2,
          z: Z = y*24+Math.random()*24,
          s: 2,
          S: 14,
          h: 1
        });i--;)
      // create leaf
      f = Math.random()*7,
      entities.push({
        c: color(150,60,-i*2),
        x: X+f*Math.cos(e = Math.random()*7),
        y: 10-i/2+Math.random()*3,
        z: Z+f*Math.sin(e),
        t: 2,
        s: 8,
        h: 1
      });

// burn leafs
burn = (e,f) => {
  e.h = 480,
  e.t = 1,
  e.p = (e,f) => {
    e.h--;
    e.c = color(Math.random()*60,100,10),
    e.s = Math.random()*5+6,
    // create smoke
    step%16||entities.push({
      c:color(0,0,e.w?(e.w=0,30):-10),
      x:e.x+Math.random()*3,
      y:e.y,
      z:e.z,
      h:100,
      p:(e,f)=>{
        e.h--;
        e.y+=1/2
      },
      s:4
    }),
    // spread fire
    step%160 || entities.some(
      f => 2==f.t && Math.abs(e.x-f.x)+Math.abs(e.z-f.z) < 40 && Math.random()*100<2 && !burn(f)
    )
  }
},

// start fire
burn(entities[160]),

onkeydown = onkeyup = (e,f) =>
  player[e.keyCode-32] = e.type[5],

setInterval((e,f) => {
  // move player
  player.h += (!!player[7] - !!player[5])/20,
  player.x += !!player[6]*Math.sin(player.h) - !!player[8]*Math.sin(player.h),
  player.z += !!player[6]*Math.cos(player.h) - !!player[8]*Math.cos(player.h),

  // discharge water
  player[0] && entities.push({
      c:color(200,40,Math.random()*10),
      x:player.x+12*Math.cos(player.h),
      y:-8,
      z:player.z-12*Math.sin(player.h),
      e:2*Math.sin(player.h-1/2),
      f:2*Math.cos(player.h-1/2),
      s:1,
      Y:16,
      p:(e,f)=>{
        e.h--;
        e.x+=e.e,
        e.z+=e.f,
        e.y+=e.Y/6,
        e.Y-=3/2;
        for (f of entities)
          1==f.t && Math.abs(e.x-f.x)+Math.abs(e.z-f.z)<e.s/2+f.s/2 && (
            e.h=0,
            f.h-=f.w=9
          )
      },
      s:4,
      h:24
    }),

  // prepare canvas
  a.width=500,
  c.translate(90,a.height/2-120|0);

  // draw sky
  for (i=30;i--;)
    c.fillStyle = color(160,40,i),
    c.fillRect(0,i*4,320,4);

  // update world
  for (f of entities)
    f.p&&f.p(f);
  entities = entities.filter((e,f)=>e.h>=0);

  // draw background forest
  for (i=30;i--;)
    c.fillStyle = color(160,40,i-40),
    c.fillRect(0,220-i*4,320,4);

  // calculate coordinates relative to player
  for (f of entities)
    x = f.x - player.x,
    z = f.z - player.z,
    f.X = x * Math.cos(player.h) - z * Math.sin(player.h),
    f.Z = x * Math.sin(player.h) + z * Math.cos(player.h);

  // sort entities
  entities.sort((e,f) => f.Z - e.Z);

  // draw ground
  for (i=30;i--;)
    c.fillStyle = color(70,40,i),
    c.fillRect(0,236-i*4,320,4);

  // draw entities
  for (f of entities)
    f.Z > 8 && f.X*120/f.Z > -160 && f.X*120/f.Z < 160 &&
      c.fillRect(
        160 + f.X*120/f.Z - (
          c.fillStyle = f.c,
          y = (f.S||f.s)*120/f.Z,
          x = f.s*120/f.Z
        )/2,
        120 - f.y*120/f.Z-y/2,
        x, y
      );

  // draw map for debugging
//  c.fillStyle = color(0,0,-50);
//  c.fillRect(160-2,240+160-2,4,4);
//
//  for (f of entities) {
//    x = f.x - player.x;
//    z = f.z - player.z;
//    xp = x * Math.cos(player.h) - z * Math.sin(player.h);
//    zp = x * Math.sin(player.h) + z * Math.cos(player.h);
//    c.fillStyle = f.c;
//    c.fillRect(160+xp-f.s/2,240+160+zp-f.s/2,f.s,f.s)
//  }

  step++
}, step = 33)

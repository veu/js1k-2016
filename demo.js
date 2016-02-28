entities = [
    playerX = playerZ = playerA = 202
];

// add trees
for (x=16;x--;)
  for (y=16;y--;)
    for (
        // create trunk
        entities.push({
          c: [i=12,60,-20],
          x: X = x*24+Math.random()*24,
          y: -1,
          z: Z = y*24+Math.random()*24,
          s: 2,
          S: 14,
          h: 1
        });i--;) {
      // create grass
      f = Math.random()*7,
      i%2 && entities.push({
        c: [70,60,-i*2],
        x: X+f*Math.cos(e = Math.random()*7),
        y: -8,
        z: Z+f*Math.sin(e),
        s: 1,
        h: 1
      });
      // create leaf
      entities.push({
        c: [150,60,-i*2],
        x: X+f*Math.cos(e = Math.random()*7),
        y: 10-i/2,
        z: Z+f*Math.sin(e),
        s: 8,
        h: 480
      });
    }

// burn a leaf (doubles as object for active keys)
burn = function (e,f,g) {
  e.t = e.p = function (e,f,g) {
    e.h--;
    e.c = [Math.random()*60,100,10],
    e.s = Math.random()*5+6,
    // create smoke
    step%16||entities.push({
      c: [0,0,e.w?(e.w=0,30):-10],
      x: e.x+Math.random()*6,
      y: e.y,
      z: e.z,
      h: 100,
      p: function (e,f,g) {
        e.h--;
        e.y+=1/2
      },
      s: 4
    });
    // spread fire
    entities.some(function (f) {
      return step%160 || f.s==8 && Math.abs(e.x-f.x)+Math.abs(e.z-f.z) < 40 && Math.random()*50<1 && !burn(f)
    });
  }
},

// start fire
burn(entities[160]),

onkeydown = onkeyup = function (e,f,g) {
  burn[e.keyCode-32] = e.type[5]
},

setInterval(function (e,f,g) {
  // move burn
  playerA += (!!burn[7] - !!burn[5])/20,
  playerX += !!burn[6]*Math.sin(playerA) - !!burn[8]*Math.sin(playerA),
  playerZ += !!burn[6]*Math.cos(playerA) - !!burn[8]*Math.cos(playerA),

  // discharge water
  burn[0] && entities.push({
    c: [200,60,Math.random()*5],
    x: playerX+12*Math.cos(playerA),
    y: -8,
    z: playerZ-12*Math.sin(playerA),
    e: 2*Math.sin(playerA-1/2),
    f: 2*Math.cos(playerA-1/2),
    s: 1,
    Y: 8/3,
    p: function (e,f,g) {
      e.h--;
      e.x+=e.e,
      e.z+=e.f,
      e.y+=e.Y-=1/4;
      entities.some(function (f) {
        f.t && Math.abs(e.x-f.x)+Math.abs(e.z-f.z)<e.s/2+f.s/2 && (
          e.h=0,
          f.h-=f.w=9
        )
      });
    },
    s: 3,
    h: 20
  });

  // prepare canvas
  a.width=500,
  c.translate(90,a.height/2-120|0);

  // update entities
  entities.some(function (f) {
    f.p&&f.p(f)
  });

  // draw sky
  for (i=30;i--;)
    c.fillStyle = 'hsl(160,60%,'+(50+i)+'%',
    c.fillRect(0,i*4,320,4);

  // remove entities no longer needed
  entities = entities.filter(function (e,f,g) {
    return e.h>=0
  });

  // draw background forest
  for (i=30;i--;)
    c.fillStyle = 'hsl(160,60%,'+(10+i)+'%',
    c.fillRect(0,220-i*4,320,4);

  // calculate coordinates relative to burn
  entities.some(function (f) {
    f.Z = (f.x - playerX) * Math.sin(playerA) + (f.z - playerZ) * Math.cos(playerA)
  });

  // sort entities
  entities.sort(function (e,f,g) {
    return f.Z - e.Z
  });

  // draw ground
  for (i=30;i--;)
    c.fillStyle = 'hsl(70,60%,'+(50+i)+'%',
    c.fillRect(0,236-i*4,320,4);

  // draw entities
  entities.some(function (f) {
    f.s-4 && f.Z > 160 || f.Z > 8 && Math.abs(e = (f.x - playerX) * Math.cos(playerA)*120/f.Z - (f.z - playerZ) * Math.sin(playerA)*120/f.Z) < 160 &&
      c.fillRect(
        160 + e - (
          c.fillStyle = 'hsl('+[f.c[0],f.c[1]+'%',f.c[2]+f.Z/6+46]+'%',
          y = (f.S||f.s)*120/f.Z,
          x = f.s*120/f.Z
        )/2,
        120 - f.y*120/f.Z-y/2,
        x, y
      )
  });

  step++
}, step = 33)

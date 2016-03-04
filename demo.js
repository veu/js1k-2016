// add trees
for (entities = [playerA = 256]; s = playerX = playerZ = playerA--;)
    for (
        // create trunk
        entities.push({
          c: [i = 12, 60, 30],
          x: X = Math.sqrt(playerA) * 12 * Math.cos(playerA) + Math.random() * 12,
          y: 0,
          z: Z = Math.sqrt(playerA) * 12 * Math.sin(playerA) + Math.random() * 12,
          s: 2,
          S: 16,
          h: 1
        });
        i--;
        // create leaf
        entities.push({
          c: [150, 60, i * 2],
          x: X + f * Math.cos(e = Math.random() * 7),
          y: 10 - i / 2,
          z: Z + f * Math.sin(e),
          s: 8,
          h: 480
        })
    )
      // create fallen fruit
      f = Math.random() * 7,
      i % 2 || entities.push({
        c: [30, 60, i * 2],
        x: X + f * Math.cos(e = Math.random() * 7),
        y: -8,
        z: Z + f * Math.sin(e),
        s: 1,
        h: 1
      });

// burn a leaf (doubles as object for active keys)
entities[30].p = burn = function (e, f, g) {
  // update fire
  e.h--;
  e.c = [Math.random() * 60, 100, 0],
  e.s = Math.random() * 5 + 6,

  // create smoke / fireworks
  s % 16 || entities.push({
    c: [0, 0, e.w ? (e.w = 0, -30) : 10],
    x: e.x + Math.random() * 6,
    y: e.y,
    z: e.z,
    h: 90,
    v: 60,
    p:
      s ? function (e, f, g) {
        e.h--;
        e.y += .5
      } : function (e, f, g) {
        e.h--;
        e.c = [Math.random() * 60, 100, 0],
        e.h < 12 ? e.s += 3 : e.y += 3
      },
    s: 4
  });

  // spread fire
  entities.some(function (f) {
    return(s % 160 || f.s == 8 && Math.abs(e.x - f.x) + Math.abs(e.z - f.z) < 40 && Math.random() * 50 < 1 && (f.p = burn))
  });
},

onkeydown = onkeyup = function (e, f, g) {
  burn[e.keyCode - 32] = e.type[5]
},

setInterval(function (e, f, g) {
  // move player
  playerA += (!!burn[7] - !!burn[5]) / 20,
  playerX += (e = !!burn[6] - !!burn[8]) * Math.sin(playerA),
  playerZ += e * Math.cos(playerA),

  // discharge water
  burn[0] && entities.push({
    c: [200, 60, Math.random() * -5],
    x: playerX + 12 * Math.cos(playerA),
    z: playerZ - 12 * Math.sin(playerA),
    e: playerA - .5,
    s: 2,
    h: 20,
    p: function (e, f, g) {
      e.h--;
      e.x += 2 * Math.sin(e.e),
      e.z += 2 * Math.cos(e.e),
      e.y = 5 - (e.h - 10) * (e.h - 10) / 8,
      entities.some(function (f) {
        f.p == burn && Math.abs(e.x - f.x) + Math.abs(e.z - f.z) < e.s / 2 + f.s / 2 && (
          f.h -= f.w = 9
        )
      });
    }
  });

  // prepare canvas
  c.translate(90, (a.height=a.height) / 2 - 120 | 0);

  // update entities
  entities.some(function (f) {
    f.p && f.p(f)
  });

  // draw sky
  for (i = 30; i--;)
    c.fillStyle = 'hsla(' + [160, 60 + '%', 50 + i + '%', 1],
    c.fillRect(0, i * 4, 320, 4);

  // remove entities no longer needed
  entities = entities.filter(function (e, f, g) {
    return(e.h >= 0)
  });

  // draw background forest
  for (i = 30; i--;)
    c.fillStyle = 'hsla(' + [160, 60 + '%', 10 + i + '%', 1],
    c.fillRect(0, 220 - i * 4, 320, 4);

  // calculate coordinates relative to player
  entities.some(function (f) {
    f.Z = (f.x - playerX) * Math.sin(playerA) + (f.z - playerZ) * Math.cos(playerA)
  });

  // sort entities
  entities.sort(function (e,f,g) {
    return(f.Z - e.Z)
  });

  // draw ground
  for (i = 30; i--;)
    c.fillStyle = 'hsla(' + [10 + 60, 60 + '%', 50 + i + '%', 1],
    c.fillRect(0, 236 - i * 4, 320, 4);

  // draw entities
  entities.some(function (f) {
    !f.v && f.Z > 160 || f.Z < 8 ||
    Math.abs(e = (f.x - playerX) * Math.cos(playerA) * 160 / f.Z - (f.z - playerZ) * Math.sin(playerA) * 160 / f.Z) < 160 && (
      y = (f.S || f.s) * 160 / f.Z,
      c.fillStyle = 'hsla(' + [f.c[0], f.c[1] + '%', f.Z / 6 - f.c[2] + 46 + '%', f.S ? 1 : .8],
      c.fillRect(
        160 + e - f.s * 160 / f.Z / 2,
        120 - f.y * 160 / f.Z - y / 2,
        f.s * 160 / f.Z,
        y
      )
    )
  });

  s--;
}, 33)

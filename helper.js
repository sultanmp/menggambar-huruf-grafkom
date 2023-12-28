function translate(m, dx, dy, dz) {
  // translasi
  m[24] = m[24] + dx;
  m[25] = m[25] + dy;
  m[26] = m[26] + dz;
}

function scale(m) {
  var Sx = 0.999,
    Sy = 0.999,
    Sz = 1.0;

  m[16] = m[16] * Sx;
  m[17] = m[17] * Sy;
  m[18] = m[18] * Sz;
}

function shear(gl, program) {
  var angle = 45;
  var cota = 1 / Math.tan(angle);
  var matriksShear = new Float32Array([1.0, cota, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0]);

  var uMatrix = gl.getUniformLocation(program, 'uMatrix');
  gl.uniformMatrix4fv(uMatrix, false, matriksShear);
}

function rotate(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);
  var mv0 = m[16],
    mv4 = m[17],
    mv8 = m[18];

  m[16] = c * m[16] - s * m[17];
  m[17] = c * m[17] - s * m[18];
  m[18] = c * m[18] - s * m[19];
  m[17] = c * m[17] + s * mv0;
  m[18] = c * m[18] + s * mv4;
  m[19] = c * m[19] + s * mv8;
}

function getprojection(angle, a, zMin, zMax) {
  var ang = Math.tan((angle * 0.5 * Math.PI) / 180); // angle * 0.5
  return [0.5 / ang, 0, 0, 0, 0, (0.5 * a) / ang, 0, 0, 0, 0, -(zMax + zMin) / (zMax - zMin), -1, 0, 0, (-2 * zMax * zMin) / (zMax - zMin), 0];
}

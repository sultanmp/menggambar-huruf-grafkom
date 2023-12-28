document.addEventListener('DOMContentLoaded', function () {
  var canvas = document.getElementById('myCanvas');
  var gl = canvas.getContext('webgl');

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  var colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  var indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

  var vertexShaderCode = document.getElementById('vertexShaderCode').text;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderCode);
  gl.compileShader(vertexShader);

  var fragmentShaderCode = document.getElementById('fragmentShaderCode').text;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderCode);
  gl.compileShader(fragmentShader);

  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  var aPosition = gl.getAttribLocation(program, 'aPosition');
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aPosition);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  var aColor = gl.getAttribLocation(program, 'aColor');
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColor);

  var Pmatrix = gl.getUniformLocation(program, 'uProj');
  var Vmatrix = gl.getUniformLocation(program, 'uView');
  var Mmatrix = gl.getUniformLocation(program, 'uModel');
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  var projmatrix = glMatrix.mat4.create();
  var modmatrix = glMatrix.mat4.create();
  var viewmatrix = glMatrix.mat4.create();

  glMatrix.mat4.perspective(projmatrix, glMatrix.glMatrix.toRadian(90), 1.0, 0.5, 10.0);

  glMatrix.mat4.lookAt(viewmatrix, [0.0, 0.0, 2.0], [0.0, 0.0, -2.0], [0.0, 1.0, 0.0]);

  var theta = glMatrix.glMatrix.toRadian(1);

  var animate = function () {
    glMatrix.mat4.rotate(modmatrix, modmatrix, theta, [0.05, 0.05, 0.05]);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(Pmatrix, false, projmatrix);
    gl.uniformMatrix4fv(Vmatrix, false, viewmatrix);
    gl.uniformMatrix4fv(Mmatrix, false, modmatrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(animate);
  };

  animate();
});

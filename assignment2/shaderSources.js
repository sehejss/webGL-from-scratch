// MultiAttributeColor.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' + // varying variable
  'uniform mat4 u_globalRotation;\n' +
  'uniform mat4 u_transformMatrix;\n' +
  'uniform mat4 u_animateRotate;\n' +
  'void main() {\n' +
  '  gl_Position =  (u_globalRotation * (u_animateRotate * (u_transformMatrix * a_Position)));\n' +
  '  v_Color = a_Color;\n' +  // Pass the data to the fragment shader
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' + // Precision qualifier (See Chapter 6)
  'varying vec4 v_Color;\n' +    // Receive the data from the vertex shader
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';
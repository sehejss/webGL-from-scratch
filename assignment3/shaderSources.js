// MultiAttributeColor.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'varying vec4 v_Color;\n' + // varying variable
  'uniform mat4 u_projectionMatrix;\n' +
  'uniform mat4 u_viewMatrix;\n' +
  'uniform mat4 u_transformMatrix;\n' +
  'attribute vec2 a_TexCoord;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_Position = u_projectionMatrix * u_viewMatrix * u_transformMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +  // Pass the data to the fragment shader
  '  v_TexCoord = a_TexCoord;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' + // Precision qualifier (See Chapter 6)
  'varying vec4 v_Color;\n' +    // Receive the data from the vertex shader
  'uniform sampler2D u_Sampler;\n' +
  'varying vec2 v_TexCoord;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color + texture2D(u_Sampler, v_TexCoord);\n' +
  '}\n';
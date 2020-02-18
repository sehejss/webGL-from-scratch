//GLOBAL VARIABLES
// vertices = []
// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point

eye = [0, 0, 0]
at = [0, 0, -1]
up = [0, 1, 0]

function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');

	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas);
	if (!gl) {
	console.log('Failed to get the rendering context for WebGL');
	return;
	}

	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	console.log('Failed to intialize shaders.');
	return;
	}

	gl.enable(gl.DEPTH_TEST)

  // Register function (event handler) to be called on a mouse press
	// Create a buffer object
  
	// Bind the buffer object to target

	// canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position, u_FragColor);}

	// var globRotX = document.getElementById("globRotSliderX");
	// var globRotY = document.getElementById("globRotSliderY");
	// var globRotZ = document.getElementById("globRotSliderZ");

	// var currentAngleX = globRotX.value;
	// var currentAngleY = globRotY.value;
	// var currentAngleZ = globRotZ.value;

	// var rotationMatrix = new Matrix4();
	// rotationMatrix.setRotate(currentAngleY, 0, 1, 0)
	// var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
	// if (!u_rotationMatrix) {
	//   console.log('Failed to get the storage location of u_rotationMatrix');
	//   return;
	// }
	// gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);


	// globRotX.oninput = function() {
	// 	currentAngleX = globRotX.value;
	// 	var rotationMatrix = new Matrix4();
	// 	rotationMatrix.setRotate(currentAngleX, 1, 0, 0);
	// 	rotationMatrix.rotate(currentAngleY, 0, 1, 0);
	// 	rotationMatrix.rotate(currentAngleZ, 0, 0, 1);
	// 	var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
	// 	if (!u_rotationMatrix) {
	// 	  console.log('Failed to get the storage location of u_rotationMatrix');
	// 	  return;
	// 	}
	// 	gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

	// 	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	// 	drawScene(gl);
	// };

	// globRotY.oninput = function() {
	// 	currentAngleY = globRotY.value;
	// 	var rotationMatrix = new Matrix4();
	// 	rotationMatrix.setRotate(currentAngleX, 1, 0, 0);
	// 	rotationMatrix.rotate(currentAngleY, 0, 1, 0);
	// 	rotationMatrix.rotate(currentAngleZ, 0, 0, 1);
	// 	var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
	// 	if (!u_rotationMatrix) {
	// 	  console.log('Failed to get the storage location of u_rotationMatrix');
	// 	  return;
	// 	}
	// 	gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

	// 	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	// 	drawScene(gl);
	// };

	// globRotZ.oninput = function() {
	// 	currentAngleZ = globRotZ.value;
	// 	var rotationMatrix = new Matrix4();
	// 	rotationMatrix.setRotate(currentAngleX, 1, 0, 0);
	// 	rotationMatrix.rotate(currentAngleY, 0, 1, 0);
	// 	rotationMatrix.rotate(currentAngleZ, 0, 0, 1);
	// 	var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
	// 	if (!u_rotationMatrix) {
	// 	  console.log('Failed to get the storage location of u_rotationMatrix');
	// 	  return;
	// 	}
	// 	gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

	// 	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	// 	drawScene(gl);
	// };

	// var resetButton = document.getElementById('resetButton');
	// resetButton.onclick = function() {
	// 	globRotX.value = 0;
	// 	globRotY.value = 180;
	// 	globRotZ.value = 0;

	// 	rotationMatrix.setRotate(180, 0, 1, 0);
	// 	var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
	// 	if (!u_rotationMatrix) {
	// 	  console.log('Failed to get the storage location of u_rotationMatrix');
	// 	  return;
	// 	}
	// 	gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

	// 	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	// 	drawScene(gl);
	// }



	var u_projectionMatrix = gl.getUniformLocation(gl.program, 'u_projectionMatrix');
	var u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix');

	identityMatrix = new Matrix4();
	identityMatrix.setIdentity();

	lookAtMatrix = new Matrix4();
	//					   eyes			at			up
	lookAtMatrix.setLookAt(0, 0, 0,    0, .5, -1,    0, 1, 0);

	gl.uniformMatrix4fv(u_projectionMatrix, false, identityMatrix.elements);
	gl.uniformMatrix4fv(u_viewMatrix, false, lookAtMatrix.elements);


	canvas.onmousedown = function(ev) {click(ev, canvas);}
		
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
 
	//draw your scene here
	drawScene(gl);
}

//helper function for you to locate coords for drawing lmao
function click(ev, canvas) {

	var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

	console.log("x:" + x)
	console.log("y:" + y)
}


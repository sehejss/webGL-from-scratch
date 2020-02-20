//GLOBAL VARIABLES
// vertices = []
// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point


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

	var fov = 30;
	var aspectRatio = canvas.width/canvas.height;
	var near = 1;
	var far = 300;

	var eye = [0, 1, 0];
	var at = [0, 1, -1];
	var up = [0, 1, 0];

	var u_projectionMatrix = gl.getUniformLocation(gl.program, 'u_projectionMatrix');
	var u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix');

	perspectiveMatrix = new Matrix4();
	perspectiveMatrix.setPerspective(fov, aspectRatio, near, far);

	lookAtMatrix = new Matrix4();
	lookAtMatrix.setLookAt(eye[0], eye[1], eye[2], at[0], at[1], at[2], up[0], up[1], up[2]);

	gl.uniformMatrix4fv(u_projectionMatrix, false, perspectiveMatrix.elements);
	gl.uniformMatrix4fv(u_viewMatrix, false, lookAtMatrix.elements);


	document.onkeydown = function(ev) {
		keydown(ev, gl, u_viewMatrix, lookAtMatrix, eye, at, up);
		drawScene(gl)
	}
		
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);
	//draw your scene here
	drawScene(gl);

}

function keydown(ev, gl, viewMatrix, lookAtMatrix, eye, at, up) {
	var dirX = at[0] - eye[0];
	var dirY = at[1] - eye[1];
	var dirZ = at[2] - eye[2];

	// console.log(dirX);
	// console.log(dirY);
	// console.log(dirZ);
	console.log(at)
	console.log(eye)

	if (ev.keyCode == 87) { // w
		
		eye[0] = eye[0] + dirX;
		eye[2] = eye[2] + dirZ; 

		at[0] = at[0] + dirX;
		at[2] = at[2] + dirZ; 

	} else if (ev.keyCode == 68) { // d
		eye[0] = eye[0] - dirZ;
		eye[2] = eye[2] - dirX; 

		at[0] = at[0] - dirZ; 
		at[2] = at[2] - dirX; 

	} else if (ev.keyCode == 83) { // s

		eye[0] = eye[0] - dirX;
		eye[2] = eye[2] - dirZ; 

		at[0] = at[0] - dirX; 
		at[2] = at[2] - dirZ; 

	} else if (ev.keyCode == 65) { // a

		eye[0] = eye[0] + dirZ;
		eye[2] = eye[2] + dirX; 

		at[0] = at[0] + dirZ; 
		at[2] = at[2] + dirX; 
	}
	
	lookAtMatrix.setLookAt(eye[0], eye[1], eye[2], at[0], at[1], at[2], up[0], up[1], up[2]);
	gl.uniformMatrix4fv(viewMatrix, false, lookAtMatrix.elements);

}

//GLOBAL VARIABLES
// vertices = []
// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point

//sadly this needs to be global
var SUN = 0
var ang = 180 * (Math.PI/180);

var eye = [0, 2, 0];
var up = [0, 1, 0];
var dir = [0, 0, -1];
var rot = [0, -90, 0];

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

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST)

	var fov = 60;
	var aspectRatio = canvas.width/canvas.height;
	var near = 1;
	var far = 300;

	var u_projectionMatrix = gl.getUniformLocation(gl.program, 'u_projectionMatrix');
	var u_viewMatrix = gl.getUniformLocation(gl.program, 'u_viewMatrix');
	var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	var u_LightColor = gl.getUniformLocation(gl.program, 'u_LightColor');
	var u_LightPosition = gl.getUniformLocation(gl.program, 'u_LightPosition');
	var u_AmbientLight = gl.getUniformLocation(gl.program, 'u_AmbientLight');
	var u_getNormalViz = gl.getUniformLocation(gl.program, 'u_normalViz');

	var normButton = document.getElementById("norm");
	var norm = 0;

	// Set the light color (white)
	gl.uniform3f(u_LightColor, 1.0, 1.0, 1.0);
	// Set the ambient light
	gl.uniform3f(u_AmbientLight, 0.5, 0.5, 0.5);

	gl.uniform1i(u_getNormalViz, 0);

	normButton.onclick = function(){
		norm = ((norm == 0) ? 1 : 0);
		console.log()
		gl.uniform1i(u_getNormalViz, norm);
	}
	
	perspectiveMatrix = new Matrix4();
	perspectiveMatrix.setPerspective(fov, aspectRatio, near, far);

	lookAtMatrix = new Matrix4();
	lookAtMatrix.setLookAt(
		eye[0], eye[1], eye[2],
		eye[0]+dir[0], eye[1]+dir[1], eye[2]+dir[2],
		up[0], up[1], up[2]
	);
	gl.uniformMatrix4fv(u_projectionMatrix, false, perspectiveMatrix.elements);
	gl.uniformMatrix4fv(u_viewMatrix, false, lookAtMatrix.elements);


	document.onkeydown = function(ev) {
		keydown(ev, gl, u_viewMatrix, lookAtMatrix);
		drawScene(gl)
	}

	var tick = function() {
		positions = updateSunAngle()
		gl.uniform3f(u_LightPosition, positions[0], positions[1], -7);
		gl.clear(gl.COLOR_BUFFER_BIT);
		drawScene(gl);
		requestAnimationFrame(tick, canvas);
	};
	tick();

}

function keydown(ev, gl, viewMatrix, lookAtMatrix) { // position = eye, rotation = at?

	var step = 2;
	var angle_step = 5;
	var radians = Math.PI / 180;

	if (ev.keyCode == 87) { // w
		eye = vecAdd(scalarMult(step, dir), eye)
	} else if (ev.keyCode == 68) { // d
		ortho = normalize(crossProduct(dir, up))
		eye = vecAdd(scalarMult(step, ortho), eye)
	} else if (ev.keyCode == 83) { // s
		eye = vecAdd(scalarMult(-1 * step, dir), eye)
	} else if (ev.keyCode == 65) { // a
		ortho = normalize(crossProduct(dir, up))
		eye = vecAdd(scalarMult(-1 * step, ortho), eye)
	} else if (ev.keyCode == 81) { // q
		rot[1] -= angle_step;
		dir[0] = Math.cos(rot[1] * radians) * Math.cos(rot[0] * radians);
		dir[1] = Math.sin(rot[0] * radians);
		dir[2] = Math.sin(rot[1] * radians) * Math.cos(rot[0] * radians);
		console.log(rot[1])
	} else if (ev.keyCode == 69) { // e
		rot[1] += angle_step;
		dir[0] = Math.cos(rot[1] * radians) * Math.cos(rot[0] * radians);
		dir[1] = Math.sin(rot[0] * radians);
		dir[2] = Math.sin(rot[1] * radians) * Math.cos(rot[0] * radians);
	} else if (ev.keyCode == 88) { // x
		rot[0] = Math.max(Math.min(rot[0] - angle_step, 80), -80)
		dir[0] = Math.cos(rot[1] * radians) * Math.cos(rot[0] * radians);
		dir[1] = Math.sin(rot[0] * radians);
		dir[2] = Math.sin(rot[1] * radians) * Math.cos(rot[0] * radians);
		console.log(rot[1])
	} else if (ev.keyCode == 50) { // 2
		rot[0] = Math.max(Math.min(rot[0] + angle_step, 80), -80)
		dir[0] = Math.cos(rot[1] * radians) * Math.cos(rot[0] * radians);
		dir[1] = Math.sin(rot[0] * radians);
		dir[2] = Math.sin(rot[1] * radians) * Math.cos(rot[0] * radians);
	}

	lookAtMatrix.setLookAt(
		eye[0], eye[1], eye[2],
		eye[0]+dir[0], eye[1]+dir[1], eye[2]+dir[2],
		up[0], up[1], up[2]
	);
	gl.uniformMatrix4fv(viewMatrix, false, lookAtMatrix.elements);
}

function magnitude(vec) {
	mag = (vec[0] * vec[0]) + (vec[1] * vec[1]) + (vec[2] * vec[2]);
	return Math.sqrt(mag);
}

function normalize(vec) {
	mag = magnitude(vec);
	normX = vec[0] / mag;
	normY = vec[1] / mag;
	normZ = vec[2] / mag;
	return [normX, normY, normZ];
}

function crossProduct(vec1, vec2) {
    crossX = (vec1[1] * vec2[2]) - (vec1[2] * vec2[1]); 
    crossY = (vec1[2] * vec2[0]) - (vec1[0] * vec2[2]); 
	crossZ = (vec1[0] * vec2[1]) - (vec1[1] * vec2[0]);
	return [crossX, crossY, crossZ];
}

function scalarMult(num, vec) {
	prodX = vec[0] * num;
	prodY = vec[1] * num;
	prodZ = vec[2] * num;
	return [prodX, prodY, prodZ];
}

function vecAdd(vec1, vec2) {
	resX = vec1[0] + vec2[0];	
	resY = vec1[1] + vec2[1];
	resZ = vec1[2] + vec2[2];
	return [resX, resY, resZ];
}

function updateSunAngle() {
	sunAngle = SUN * (Math.PI/180);
	if (SUN >= 360) {
		SUN = 0;
	} else {
		SUN += 1;
	}
	var x = 0;
	var y = 0;

	x = 5 * Math.cos(sunAngle)
	y = 5 * Math.sin(sunAngle)

	return [x, y]

}
//GLOBAL VARIABLES
// vertices = []
// var g_points = [];  // The array for the position of a mouse press
// var g_colors = [];  // The array to store the color of a point
var ANGLE_STEP_HEAD = 41.0;
var ANGLE_STEP_LEFT = 81.0;
var ANGLE_STEP_RIGHT = 110.0;

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

	var globRotX = document.getElementById("globRotSliderX");
	var globRotY = document.getElementById("globRotSliderY");
	var globRotZ = document.getElementById("globRotSliderZ");

	var currentAngleX = globRotX.value;
	var currentAngleY = globRotY.value;
	var currentAngleZ = globRotZ.value;

	var rotationMatrix = new Matrix4();
	rotationMatrix.setRotate(currentAngleY, 0, 1, 0)
	var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
	if (!u_rotationMatrix) {
	  console.log('Failed to get the storage location of u_rotationMatrix');
	  return;
	}
	gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);


	globRotX.oninput = function() {
		currentAngleX = globRotX.value;
		var rotationMatrix = new Matrix4();
		rotationMatrix.setRotate(currentAngleX, 1, 0, 0);
		rotationMatrix.rotate(currentAngleY, 0, 1, 0);
		rotationMatrix.rotate(currentAngleZ, 0, 0, 1);
		var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
		if (!u_rotationMatrix) {
		  console.log('Failed to get the storage location of u_rotationMatrix');
		  return;
		}
		gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	};

	globRotY.oninput = function() {
		currentAngleY = globRotY.value;
		var rotationMatrix = new Matrix4();
		rotationMatrix.setRotate(currentAngleX, 1, 0, 0);
		rotationMatrix.rotate(currentAngleY, 0, 1, 0);
		rotationMatrix.rotate(currentAngleZ, 0, 0, 1);
		var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
		if (!u_rotationMatrix) {
		  console.log('Failed to get the storage location of u_rotationMatrix');
		  return;
		}
		gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	};

	globRotZ.oninput = function() {
		currentAngleZ = globRotZ.value;
		var rotationMatrix = new Matrix4();
		rotationMatrix.setRotate(currentAngleX, 1, 0, 0);
		rotationMatrix.rotate(currentAngleY, 0, 1, 0);
		rotationMatrix.rotate(currentAngleZ, 0, 0, 1);
		var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
		if (!u_rotationMatrix) {
		  console.log('Failed to get the storage location of u_rotationMatrix');
		  return;
		}
		gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	};

	var resetButton = document.getElementById('resetButton');
	resetButton.onclick = function() {
		globRotX.value = 0;
		globRotY.value = 180;
		globRotZ.value = 0;

		rotationMatrix.setRotate(180, 0, 1, 0);
		var u_rotationMatrix = gl.getUniformLocation(gl.program, 'u_globalRotation');
		if (!u_rotationMatrix) {
		  console.log('Failed to get the storage location of u_rotationMatrix');
		  return;
		}
		gl.uniformMatrix4fv(u_rotationMatrix, false, rotationMatrix.elements);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}


	canvas.onmousedown = function(ev) {click(ev, canvas);}
		
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	dabAngle = [0, 0, 0];
	var tick = function() {
		dabAngle = animate(dabAngle[0], dabAngle[1], dabAngle[2]);
		drawCreature(gl, dabAngle[0], dabAngle[1], dabAngle[2]);   // Draw the triangle
		requestAnimationFrame(tick, canvas); // Request that the browser calls tick
	  };
	  tick();
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

var g_last = Date.now();
function animate(headAngle, upperLeftArmAngle, rightArmAngle) {
	// Calculate the elapsed time
	var now = Date.now();
	var elapsed = now - g_last;
	g_last = now;

	var newHeadAngle = headAngle + (ANGLE_STEP_HEAD * elapsed) / 1000.0;
	newHeadAngle %= 90;

	var newUpperLeftArmAngle = upperLeftArmAngle + (ANGLE_STEP_LEFT * elapsed) / 1000.0;
	newUpperLeftArmAngle %= 180;

	var newRightArmAngle = rightArmAngle + (ANGLE_STEP_RIGHT * elapsed) / 1000.0;
	newRightArmAngle %= 240;

	//console.log(newHeadAngle)
	return [newHeadAngle, newUpperLeftArmAngle, newRightArmAngle]

}
// range from 0 - 2n, returns between 0 and n, if number is greater than n then its n - (n - number)
function countBackDown(max, number) { // range from 0 - 2n
	if (number > max) {
		return max - (number - max)
	} else {
		return number
	}
}

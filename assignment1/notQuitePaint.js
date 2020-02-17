//GLOBAL VARIABLES
vertices = []
pointCount = 0
needToChange = true;
var g_points = [];  // The array for the position of a mouse press
var g_colors = [];  // The array to store the color of a point

function main() {
	// Retrieve <canvas> element
	var canvas = document.getElementById('webgl');
	// Get the rendering context for WebGL
	var gl = getWebGLContext(canvas, false);
	if (!gl) {
	console.log('Failed to get the rendering context for WebGL');
	return;
	}

	// Initialize shaders
	if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
	console.log('Failed to intialize shaders.');
	return;
	}

	// // Get the storage location of a_Position
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
	console.log('Failed to get the storage location of a_Position');
	return;
	}

	// Get the storage location of u_FragColor
	var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
	if (!u_FragColor) {
	console.log('Failed to get the storage location of u_FragColor');
	return;
	}

  // Register function (event handler) to be called on a mouse press
	// Create a buffer object
  
	// Bind the buffer object to target

	// canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position, u_FragColor);}

	var redSlider = document.getElementById("redSlider");
	var greenSlider = document.getElementById("greenSlider");
	var blueSlider = document.getElementById("blueSlider");

	var tri = document.getElementById("tri");
	var sqa = document.getElementById("sqa");
	var cir = document.getElementById("cir");

	var clearScreen = document.getElementById("clearButton");

	var sizeSlider = document.getElementById("sizeSlider");
	var stepSlider = document.getElementById("stepSlider");

	var colors = [redSlider.value/255, greenSlider.value/255, blueSlider.value/255, 1.0]

	redSlider.onchange = function() {colors = [redSlider.value/255, greenSlider.value/255, blueSlider.value/255, 1.0]};
	greenSlider.onchange = function() {colors = [redSlider.value/255, greenSlider.value/255, blueSlider.value/255, 1.0]};
	blueSlider.onchange = function() {colors = [redSlider.value/255, greenSlider.value/255, blueSlider.value/255, 1.0]};

	var shape = 0

	tri.onclick = function(){shape = 0;}
	sqa.onclick = function(){shape = 1;}
	cir.onclick = function(){shape = 2;}

	clearScreen.onclick = function(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		vertices = [];
		pointCount = 0;
	}

	var step = stepFunction(3);
	var size = sizeSlider.value/2550;

	stepSlider.onchange = function() {
		step = stepFunction(Number(stepSlider.value));
		needToChange = true;
		//console.log(step)
	};
	sizeSlider.onchange	= function() {
		size = sizeSlider.value/2550;
		needToChange = true;
	};

	var isMouseDown = false;

	canvas.onmousedown = function(ev) {
		click(ev, gl, canvas, a_Position, u_FragColor, shape, colors, size, step);
		isMouseDown = true;
		canvas.onmousemove = function(ev) {
			if (isMouseDown == true) {
				click(ev, gl, canvas, a_Position, u_FragColor, shape, colors, size, step);
			}
		}
	}
	canvas.onmouseup = function(ev) {
		isMouseDown = false;
	}
		
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);
}

function click(ev, gl, canvas, a_Position, u_FragColor, shape, colors, size, step) {
	g_points = [];
	g_colors = []; 

	var x = ev.clientX; // x coordinate of a mouse pointer
	var y = ev.clientY; // y coordinate of a mouse pointer
	var rect = ev.target.getBoundingClientRect();

	x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
	y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

	var n = 0;

	if (shape == 0){
		n = initTriangleBuffers(gl, x, y, size)
	}else if(shape == 1){
		n = initSquareBuffers(gl, x, y, size)
	}else if(shape == 2){
		n = initCircleBuffers(gl, x, y, size, step)
	}

	// Store the coordinates to g_points array
	g_points.push([x, y]);
	// Store the coordinates to g_points array
	//console.log(colors)
	g_colors.push(colors);  // Red


	// Clear <canvas>
	gl.clear(gl.COLOR_BUFFER_BIT);

	var len = g_points.length;
	for(var i = 0; i < len; i++) {
	var xy = g_points[i];
	var rgba = g_colors[i];

	// Pass the position of a point to a_Position variable
	gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
	// Pass the color of a point to u_FragColor variable
	gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
	// Draw
	gl.drawArrays(gl.TRIANGLES, 0, n);
	
	//console.log(i)

	}
}

function stepFunction(step){
	switch(step) {
		case 1:
			return 1;
		case 2:
			return 12;
		case 3:
			return 20;
		case 4:
			return 30;
		case 5:
			return 40;
		case 6:
			return 60;
		case 7:
			return 72;
	}
}
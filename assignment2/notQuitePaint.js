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

  // Register function (event handler) to be called on a mouse press
	// Create a buffer object
  
	// Bind the buffer object to target

	// canvas.onmousedown = function(ev) {click(ev, gl, canvas, a_Position, u_FragColor);}

	var clearScreen = document.getElementById("clearButton");

	clearScreen.onclick = function(){
		gl.clear(gl.COLOR_BUFFER_BIT);
		vertices = [];
	}
	
	canvas.onmousedown = function(ev) {click(ev, canvas);}
		
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	gl.clear(gl.COLOR_BUFFER_BIT);

	drawCube(gl, 0.75, 0.75, 0, 0.15);
	console.log("success1")
	drawCube(gl, -0.75, -0.75, 0, 0.15);
	console.log("success2")

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

	// n = initCubeBuffer(gl, x, y, 0, 0.5)

	// // Store the coordinates to g_points array
	// g_points.push([x, y]);
	// // Store the coordinates to g_points array
	// //console.log(colors)
	// g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red


	// // Clear <canvas>
	// gl.clear(gl.COLOR_BUFFER_BIT);

	// var len = g_points.length;
	// for(var i = 0; i < len; i++) {
	// var xy = g_points[i];
	// var rgba = g_colors[i];

	// //console.log(vertices)

	// // Pass the position of a point to a_Position variable
	// gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
	// // Pass the color of a point to u_FragColor variable
	// gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
	// // Draw
	// gl.drawArrays(gl.TRIANGLES, 0, n);
	
	// console.log(i)

	// }
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
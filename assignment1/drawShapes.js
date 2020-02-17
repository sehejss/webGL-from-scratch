function initTriangleBuffers(gl, x, y, size) {
	var vertices_a = [
	  x-size, y-(size/2),   x, y+size,   x+size, y-(size/2) //scale goes here
	];
    var n = 3; // The number of vertices
    
	vertices = vertices.concat(vertices_a)
	
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);


	// Write date into the buffer object
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
	  console.log('Failed to get the storage location of a_Position');
	  return -1;
	}
	// Assign the buffer object to a_Position variable
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  
	// Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
    
    pointCount = pointCount + n;
  
    return pointCount
	//return vertices.length/2; //change this to reflect how many shapes to draw
  }

function initSquareBuffers(gl, x, y, size) {
var vertices_a = [
	x-size, y+size,   x+size, y+size,   x-size, y-size,
	x-size, y-size,   x+size, y+size,   x+size, y-size  //scale goes here
];
var n = 6; // The number of vertices

vertices = vertices.concat(vertices_a)

var vertexBuffer = gl.createBuffer();
if (!vertexBuffer) {
	console.log('Failed to create the buffer object');
	return -1;
}

gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

// Write date into the buffer object
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
if (a_Position < 0) {
	console.log('Failed to get the storage location of a_Position');
	return -1;
}
// Assign the buffer object to a_Position variable
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

// Enable the assignment to a_Position variable
gl.enableVertexAttribArray(a_Position);

pointCount = pointCount + n

return pointCount;
}
  //rewrite to correctly duplicate all triangles :(
function initCircleBuffers(gl, x, y, size, step) {
	var vertices_a = [];
	var vertCount = 0; // The number of vertices per triangle
	var xs = []; 
	var ys = [];

	setSizeAndStep(xs, ys, size, step)
	for (var i = 0; i < xs.length; i+=1) { // segment count goes here
		var vert = [
			x, y,	x+xs[i], y+ys[i],	x+xs[i+1], y+ys[i+1]
		];
		vertices_a = vertices_a.concat(vert);
		vertCount += 3;
    }
    
	vertices = vertices.concat(vertices_a);
	
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	    
	// Write date into the buffer object
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
	  console.log('Failed to get the storage location of a_Position');
	  return -1;
	}
	// Assign the buffer object to a_Position variable
	gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  
	// Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
    
    pointCount = pointCount + vertCount;
  
	return pointCount;
  }

function setSizeAndStep(xs, ys, size, step) {
	if (needToChange == true) {
		for (var i = 0; i <= 360; i+=step) { // segment count goes here
			xs.push(size*Math.cos(i * Math.PI / 180));
			ys.push(size*Math.sin(i * Math.PI / 180));
			console.log(i);
		}
	}
	needToChange == false;
	return;
}


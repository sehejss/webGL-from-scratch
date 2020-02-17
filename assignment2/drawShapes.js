
function drawCube(gl, x, y, z, size){
	var vertices_a = [
		//back face
		x-size, y+size, z+size, 0.0, 1.0, 0.0,
		x+size, y+size, z+size,	0.0, 1.0, 0.0,
		x-size, y-size, z+size, 0.0, 1.0, 0.0,
		x-size, y-size, z+size,	0.0, 1.0, 0.0,
		x+size, y+size, z+size,	0.0, 1.0, 0.0,
		x+size, y-size, z+size,	0.0, 1.0, 0.0,
		//front face
		x-size, y+size, z-size, 1.0, 1.0, 0.0,
		x+size, y+size, z-size, 0.0, 1.0, 0.0,
		x-size, y-size, z-size, 0.0, 1.0, 0.0,
		x-size, y-size, z-size, 0.0, 1.0, 0.0,
		x+size, y+size, z-size, 0.0, 1.0, 0.0,
		x+size, y-size, z-size, 0.0, 1.0, 0.0,
		//right face
		x-size, y+size, z+size, 1.0, 0.0, 0.0,
		x-size, y+size, z-size, 1.0, 0.0, 0.0,
		x-size, y-size, z+size, 1.0, 0.0, 0.0,
		x-size, y-size, z+size, 1.0, 0.0, 0.0,
		x-size, y+size, z-size, 1.0, 0.0, 0.0,
		x-size, y-size, z-size, 1.0, 0.0, 0.0,
		//left face
		x+size, y+size, z+size, 1.0, 0.0, 0.0,
		x+size, y+size, z-size, 1.0, 0.0, 0.0,
		x+size, y-size, z+size, 1.0, 0.0, 0.0,
		x+size, y-size, z+size, 1.0, 0.0, 0.0,
		x+size, y+size, z-size, 1.0, 0.0, 0.0,
		x+size, y-size, z-size, 1.0, 0.0, 0.0,
		//top face
		x-size, y+size, z-size, 1.0, 0.0, 0.0,
		x+size, y+size, z-size, 1.0, 0.0, 0.0,
		x-size, y+size, z+size, 1.0, 0.0, 0.0,
		x-size, y+size, z+size, 1.0, 0.0, 0.0,
		x+size, y+size, z-size, 1.0, 0.0, 0.0,
		x+size, y+size, z+size, 1.0, 0.0, 0.0,
		//bottom face
		x-size, y-size, z-size, 1.0, 0.0, 0.0,  
		x+size, y-size, z-size, 1.0, 0.0, 0.0,
		x-size, y-size, z+size, 1.0, 0.0, 0.0,
		x-size, y-size, z+size, 1.0, 0.0, 0.0,
		x+size, y-size, z-size, 1.0, 0.0, 0.0,
		x+size, y-size, z+size, 1.0, 0.0, 0.0,
	];
	var n = 36; // The number of vertices
	
	//vertices = vertices.concat(vertices_a)
	vertices = new Float32Array(vertices_a)
	
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

	var FSIZE = vertices.BYTES_PER_ELEMENT;
	
	var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
	if (a_Position < 0) {
		console.log('Failed to get the storage location of a_Position');
		return -1;
	}

	gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
	gl.enableVertexAttribArray(a_Position);  // Enable the assignment of the buffer object
  
	// Get the storage location of a_Position, assign buffer and enable
	var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
	if(a_Color < 0) {
	  console.log('Failed to get the storage location of a_Color');
	  return -1;
	}
	gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
	gl.enableVertexAttribArray(a_Color);  // Enable the assignment of the buffer object
	console.log(vertices)
	
	gl.drawArrays(gl.TRIANGLES, 0, n);

}


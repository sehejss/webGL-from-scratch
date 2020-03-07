function initCubeVertexBuffers(gl, colorArray) {
	var Red = colorArray[0];
	var Green = colorArray[1];
	var Blue = colorArray[2];
	// Create a cube
	//    v6----- v5
	//   /|      /|
	//  v1------v0|
	//  | |     | |
	//  | |v7---|-|v4
	//  |/      |/
	//  v2------v3
	// Coordinates
	var vertices = new Float32Array([
	   2.0, 2.0, 2.0,  -2.0, 2.0, 2.0,  -2.0,-2.0, 2.0,   2.0,-2.0, 2.0, // v0-v1-v2-v3 front
	   2.0, 2.0, 2.0,   2.0,-2.0, 2.0,   2.0,-2.0,-2.0,   2.0, 2.0,-2.0, // v0-v3-v4-v5 right
	   2.0, 2.0, 2.0,   2.0, 2.0,-2.0,  -2.0, 2.0,-2.0,  -2.0, 2.0, 2.0, // v0-v5-v6-v1 up
	  -2.0, 2.0, 2.0,  -2.0, 2.0,-2.0,  -2.0,-2.0,-2.0,  -2.0,-2.0, 2.0, // v1-v6-v7-v2 left
	  -2.0,-2.0,-2.0,   2.0,-2.0,-2.0,   2.0,-2.0, 2.0,  -2.0,-2.0, 2.0, // v7-v4-v3-v2 down
	   2.0,-2.0,-2.0,  -2.0,-2.0,-2.0,  -2.0, 2.0,-2.0,   2.0, 2.0,-2.0  // v4-v7-v6-v5 back
	]);
  
	// Colors
	var colors = new Float32Array([
	  Red, Green, Blue,   Red, Green, Blue,   Red, Green, Blue,  Red, Green, Blue,     // v0-v1-v2-v3 front
	  Red, Green, Blue,   Red, Green, Blue,   Red, Green, Blue,  Red, Green, Blue,     // v0-v3-v4-v5 right
	  Red, Green, Blue,   Red, Green, Blue,   Red, Green, Blue,  Red, Green, Blue,     // v0-v5-v6-v1 up
	  Red, Green, Blue,   Red, Green, Blue,   Red, Green, Blue,  Red, Green, Blue,     // v1-v6-v7-v2 left
	  Red, Green, Blue,   Red, Green, Blue,   Red, Green, Blue,  Red, Green, Blue,     // v7-v4-v3-v2 down
	  Red, Green, Blue,   Red, Green, Blue,   Red, Green, Blue,  Red, Green, Blue　    // v4-v7-v6-v5 back
   ]);
  
	// Normal
	var normals = new Float32Array([
	  0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
	  1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
	  0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
	 -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
	  0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,   0.0,-1.0, 0.0,  // v7-v4-v3-v2 down
	  0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0,   0.0, 0.0,-1.0   // v4-v7-v6-v5 back
	]);
  
	// Indices of the vertices
	var indices = new Uint8Array([
	   0, 1, 2,   0, 2, 3,    // front
	   4, 5, 6,   4, 6, 7,    // right
	   8, 9,10,   8,10,11,    // up
	  12,13,14,  12,14,15,    // left
	  16,17,18,  16,18,19,    // down
	  20,21,22,  20,22,23     // back
   ]);
  
	// Write the vertex property to buffers (coordinates, colors and normals)
	if (!initCubeArrayBuffer(gl, 'a_Position', vertices, 3)) return -1;
	if (!initCubeArrayBuffer(gl, 'a_Color', colors, 3)) return -1;
	if (!initCubeArrayBuffer(gl, 'a_Normal', normals, 3)) return -1;
  
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
	// Write the indices to the buffer object
	var indexBuffer = gl.createBuffer();
	if (!indexBuffer) {
		console.log('Failed to create the buffer object');
		return false;
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
  
	return indices.length;
}

function initCubeArrayBuffer(gl, attribute, data, num) {
	// Create a buffer object
	var buffer = gl.createBuffer();
	if (!buffer) {
		console.log('Failed to create the buffer object');
		return false;
	}
	// Write date into the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	// Assign the buffer object to the attribute variable
	var a_attribute = gl.getAttribLocation(gl.program, attribute);
	if (a_attribute < 0) {
		console.log('Failed to get the storage location of ' + attribute);
		return false;
	}
	gl.vertexAttribPointer(a_attribute, num, gl.FLOAT, false, 0, 0);
	// Enable the assignment of the buffer object to the attribute variable
	gl.enableVertexAttribArray(a_attribute);
  
	return true;
}


function initSphereVertexBuffers(gl, colorArray) { // Create a sphere
	var SPHERE_DIV = 13;
  
	var i, ai, si, ci;
	var j, aj, sj, cj;
	var p1, p2;
  
	var positions = [];
	var indices = [];
	var colors = [];

	var Red = colorArray[0]
	var Green = colorArray[1]
	var Blue = colorArray[2]
  
	// Generate coordinates
	for (j = 0; j <= SPHERE_DIV; j++) {
	  aj = j * Math.PI / SPHERE_DIV;
	  sj = Math.sin(aj);
	  cj = Math.cos(aj);
	  for (i = 0; i <= SPHERE_DIV; i++) {
		ai = i * 2 * Math.PI / SPHERE_DIV;
		si = Math.sin(ai);
		ci = Math.cos(ai);
  
		positions.push(si * sj);  // X
		positions.push(cj);       // Y
		positions.push(ci * sj);  // Z

		colors.push(Red);
		colors.push(Green);
		colors.push(Blue);
		
	  }
	}
  
	// Generate indices
	for (j = 0; j < SPHERE_DIV; j++) {
	  for (i = 0; i < SPHERE_DIV; i++) {
		p1 = j * (SPHERE_DIV+1) + i;
		p2 = p1 + (SPHERE_DIV+1);
  
		indices.push(p1);
		indices.push(p2);
		indices.push(p1 + 1);
  
		indices.push(p1 + 1);
		indices.push(p2);
		indices.push(p2 + 1);
	  }
	}
  
	// Write the vertex property to buffers (coordinates and normals)
	// Same data can be used for vertex and normal
	// In order to make it intelligible, another buffer is prepared separately
	if (!initSphereArrayBuffer(gl, 'a_Position', new Float32Array(positions), gl.FLOAT, 3)) return -1;
	if (!initSphereArrayBuffer(gl, 'a_Normal', new Float32Array(positions), gl.FLOAT, 3))  return -1;
	if (!initSphereArrayBuffer(gl, 'a_Color', new Float32Array(colors), gl.FLOAT, 3))  return -1;
	
	// Unbind the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
  
	// Write the indices to the buffer object
	var indexBuffer = gl.createBuffer();
	if (!indexBuffer) {
		console.log('Failed to create the buffer object');
		return -1;
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  
	return indices.length;
}
  
function initSphereArrayBuffer(gl, attribute, data, type, num) {
	// Create a buffer object
	var buffer = gl.createBuffer();
	if (!buffer) {
		console.log('Failed to create the buffer object');
		return false;
	}
	// Write date into the buffer object
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
	// Assign the buffer object to the attribute variable
	var a_attribute = gl.getAttribLocation(gl.program, attribute);
	if (a_attribute < 0) {
		console.log('Failed to get the storage location of ' + attribute);
		return false;
	}
	gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
	// Enable the assignment of the buffer object to the attribute variable
	gl.enableVertexAttribArray(a_attribute);
  
	return true;
}
  
function drawCube(gl, n) {
	gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

function drawSphere(gl, n) {
	gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
}

function drawSky(gl){
	var u_transformationMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	n = initCubeVertexBuffers(gl, [0, 0, 1]);
	flatten = new Matrix4();
	flatten.setScale(32, 64, 32);
	norm = new Matrix4();
	norm.setInverseOf(flatten);
	norm.transpose();

	gl.uniformMatrix4fv(u_transformationMatrix, false, flatten.elements);
	gl.uniformMatrix4fv(u_NormalMatrix, false, norm.elements);

	drawCube(gl, n);
}

function drawFloor(gl){
	var u_transformationMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	n = initCubeVertexBuffers(gl, [0, 1, 0]);
	flatten = new Matrix4();
	flatten.setScale(32, 0, 32);
	norm = new Matrix4();
	norm.setInverseOf(flatten);
	norm.transpose();

	gl.uniformMatrix4fv(u_transformationMatrix, false, flatten.elements);
	gl.uniformMatrix4fv(u_NormalMatrix, false, norm.elements);

	drawCube(gl, n);
}

function drawFloatySphere(gl){
	var u_transformationMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	n = initSphereVertexBuffers(gl, [1, 1, 0]);
	flatten = new Matrix4();
	flatten.setTranslate(-3, 3, -10);
	flatten.scale(1.1, 1.1, 1.1)
	norm = new Matrix4();
	norm.setInverseOf(flatten);
	norm.transpose();

	gl.uniformMatrix4fv(u_transformationMatrix, false, flatten.elements);
	gl.uniformMatrix4fv(u_NormalMatrix, false, norm.elements);

	drawSphere(gl, n);
}

function drawFloatyCube(gl){
	var u_transformationMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
	var u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
	n = initCubeVertexBuffers(gl, [1, 1, 0]);
	flatten = new Matrix4();
	flatten.setScale(0.5, 0.5, 0.5)
	flatten.translate(3, 5.8, -20);
	norm = new Matrix4();
	norm.setInverseOf(flatten);
	norm.transpose();

	gl.uniformMatrix4fv(u_transformationMatrix, false, flatten.elements);
	gl.uniformMatrix4fv(u_NormalMatrix, false, norm.elements);

	drawCube(gl, n);
}


function drawScene(gl) {
	drawSky(gl);
	drawFloor(gl);
	drawFloatyCube(gl);
	drawFloatySphere(gl);
}

function step(num) {
	switch(num) {
		case 1:
			return 1;
		case 2:
			return 3;
		case 3:
			return 5;
		case 4:
			return 7;
	}
}

